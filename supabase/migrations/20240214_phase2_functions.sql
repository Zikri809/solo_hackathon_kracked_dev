-- Nearby stops function
create or replace function public.nearby_stops(
  lat double precision,
  lng double precision,
  radius_meters double precision
) returns setof public.gtfs_stops as $$
  select *
  from public.gtfs_stops
  where st_dwithin(
    location,
    st_setsrid(st_makepoint(lng, lat), 4326)::geography,
    radius_meters
  );
$$ language sql stable;
