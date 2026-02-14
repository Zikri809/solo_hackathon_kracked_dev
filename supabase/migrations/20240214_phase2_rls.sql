-- Enable RLS on all tables
alter table public.profiles enable row level security;
alter table public.favorites enable row level security;
alter table public.urban_alerts enable row level security;
alter table public.gtfs_stops enable row level security;
alter table public.gtfs_routes enable row level security;
alter table public.gtfs_trips enable row level security;
alter table public.gtfs_stop_times enable row level security;

-- Profiles: Users can read/write their own data
create policy "Users can view own profile" on public.profiles
  for select using (auth.uid() = id);

create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);

create policy "Users can insert own profile" on public.profiles
  for insert with check (auth.uid() = id);

-- Favorites: Users can read/write their own favorites
create policy "Users can view own favorites" on public.favorites
  for select using (auth.uid() = user_id);

create policy "Users can insert own favorites" on public.favorites
  for insert with check (auth.uid() = user_id);

create policy "Users can delete own favorites" on public.favorites
  for delete using (auth.uid() = user_id);

-- Urban Alerts: Public read, Authenticated write
create policy "Public can view alerts" on public.urban_alerts
  for select using (true);

create policy "Authenticated users can create alerts" on public.urban_alerts
  for insert with check (auth.role() = 'authenticated');

create policy "Users can update own alerts (e.g. resolve)" on public.urban_alerts
  for update using (auth.uid() = user_id);

-- GTFS tables: Public read
create policy "Public can view gtfs_stops" on public.gtfs_stops for select using (true);
create policy "Public can view gtfs_routes" on public.gtfs_routes for select using (true);
create policy "Public can view gtfs_trips" on public.gtfs_trips for select using (true);
create policy "Public can view gtfs_stop_times" on public.gtfs_stop_times for select using (true);
