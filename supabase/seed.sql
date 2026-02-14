-- Seed GTFS Routes (Sample: MRT Kajang Line)
insert into public.gtfs_routes (route_id, route_short_name, route_long_name, route_type, route_color, route_text_color)
values
  ('mrt-kg', 'MRT KG', 'Kajang Line', 1, '581C87', 'FFFFFF')
on conflict (route_id) do nothing;

-- Seed GTFS Stops (Sample: Key stations)
-- Using ST_SetSRID(ST_MakePoint(lng, lat), 4326)::geography
insert into public.gtfs_stops (stop_id, stop_name, location)
values
  ('KG01', 'Kwasa Damansara', st_setsrid(st_makepoint(101.571, 3.176), 4326)::geography),
  ('KG15', 'Muzium Negara', st_setsrid(st_makepoint(101.687, 3.137), 4326)::geography),
  ('KG16', 'Pasar Seni', st_setsrid(st_makepoint(101.696, 3.142), 4326)::geography),
  ('KG18', 'Bukit Bintang', st_setsrid(st_makepoint(101.711, 3.146), 4326)::geography),
  ('KG35', 'Kajang', st_setsrid(st_makepoint(101.792, 2.983), 4326)::geography)
on conflict (stop_id) do nothing;
