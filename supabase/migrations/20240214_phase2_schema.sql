-- Enable PostGIS extension
create extension if not exists postgis schema extensions;

-- Create profiles table
create table public.profiles (
  id uuid references auth.users(id) on delete cascade not null primary key,
  display_name text,
  pref_lang text check (pref_lang in ('en', 'ms')) default 'en',
  nric_hash text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create favorites table
create table public.favorites (
  id serial primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  stop_id text not null, -- FK to gtfs_stops added later or kept loose for now
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create urban_alerts table
create table public.urban_alerts (
  id serial primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  location geography(POINT) not null,
  image_url text,
  category text check (category in ('pothole', 'lighting', 'flooding', 'other')) not null,
  description text,
  status text check (status in ('pending', 'verified', 'resolved')) default 'pending' not null,
  upvotes integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create GTFS tables
create table public.gtfs_stops (
  stop_id text primary key,
  stop_name text not null,
  location geography(POINT) not null,
  wheelchair_accessible int default 0
);

create table public.gtfs_routes (
  route_id text primary key,
  route_short_name text,
  route_long_name text,
  route_type int,
  route_color text,
  route_text_color text
);

create table public.gtfs_trips (
  trip_id text primary key,
  route_id text references public.gtfs_routes(route_id),
  service_id text,
  direction_id int
);

create table public.gtfs_stop_times (
  trip_id text references public.gtfs_trips(trip_id),
  stop_id text references public.gtfs_stops(stop_id),
  arrival_time text,
  departure_time text,
  stop_sequence int,
  primary key (trip_id, stop_sequence)
);

-- Add spatial indices
create index gtfs_stops_location_idx on public.gtfs_stops using GIST (location);
create index urban_alerts_location_idx on public.urban_alerts using GIST (location);
