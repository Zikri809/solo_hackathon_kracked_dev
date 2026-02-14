-- Add state and city columns to price_entries table
ALTER TABLE price_entries ADD COLUMN IF NOT EXISTS state text;
ALTER TABLE price_entries ADD COLUMN IF NOT EXISTS city text;

-- Seed data with Malaysia locations
INSERT INTO price_entries (product_name, price, unit, store_name, location, state, city, created_at, verified)
VALUES
  -- Kedah - Alor Setar
  ('Fresh Chicken', 9.50, 'kg', 'Pasar Besar Alor Setar', 'Jalan Pegawai', 'Kedah', 'Alor Setar', NOW() - INTERVAL '2 hours', true),
  ('Red Onions', 3.50, 'kg', 'Tesco Mergong', 'Mergong Barrage', 'Kedah', 'Alor Setar', NOW() - INTERVAL '4 hours', true),
  ('Cooking Oil', 29.90, '5kg', 'Econsave', 'Bandar Baru Mergong', 'Kedah', 'Alor Setar', NOW() - INTERVAL '1 day', false),
  ('Mackerel (Ikan Kembung)', 12.00, 'kg', 'Pasar Tani Stadium', 'Stadium Darul Aman', 'Kedah', 'Alor Setar', NOW() - INTERVAL '30 mins', true),
  
  -- Kedah - Kuala Kedah
  ('Local Rice', 26.00, '10kg', 'Kedai Runcit Pak Mat', 'Kuala Kedah', 'Kedah', 'Kuala Kedah', NOW() - INTERVAL '5 hours', true),
  ('Fresh Prawns (Medium)', 35.00, 'kg', 'Pasar Nelayan', 'Jeti Kuala Kedah', 'Kedah', 'Kuala Kedah', NOW() - INTERVAL '1 hour', true),

  -- Kedah - Jitra
  ('Gardenia Bread', 4.50, 'loaf', 'Lotus Jitra', 'Jitra', 'Kedah', 'Jitra', NOW() - INTERVAL '6 hours', true),
  ('Eggs (Grade A)', 14.50, 'tray', 'C-Mart', 'Bandar Darulaman', 'Kedah', 'Jitra', NOW() - INTERVAL '3 hours', false),

  -- Kedah - Sungai Petani
  ('Spinach (Bayam)', 2.00, 'bunch', 'Pasar Pagi SP', 'Sungai Petani', 'Kedah', 'Sungai Petani', NOW() - INTERVAL '1 day', true),
  ('Chicken Breast', 16.00, 'kg', 'Billion Shopping Centre', 'Sungai Petani', 'Kedah', 'Sungai Petani', NOW() - INTERVAL '2 days', true),

  -- KL
  ('Salmon Fillet', 89.00, 'kg', 'Ben''s Independent Grocer', 'Publika', 'Kuala Lumpur', 'Kuala Lumpur', NOW() - INTERVAL '3 hours', true),
  ('Organic Kale', 12.00, 'bunch', 'Jaya Grocer', 'The Gardens Mall', 'Kuala Lumpur', 'Kuala Lumpur', NOW() - INTERVAL '5 hours', true),
  ('Kampung Chicken', 22.00, 'kg', 'Pasar TTDI', 'Taman Tun Dr Ismail', 'Kuala Lumpur', 'TTDI', NOW() - INTERVAL '12 hours', true),

  -- Penang
  ('Char Koay Teow (Raw Ingred.)', 15.00, 'set', 'Market', 'Bayan Baru', 'Pulau Pinang', 'Bayan Lepas', NOW() - INTERVAL '1 day', false),
  ('White Coffee Powder', 18.00, 'pack', 'Sunshine Square', 'Bayan Baru', 'Pulau Pinang', 'Bayan Lepas', NOW() - INTERVAL '2 days', true);
