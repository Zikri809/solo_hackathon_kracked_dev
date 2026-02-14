# Task: Phase 1 - Database Setup

## Objective
Configure Supabase database schema, RLS policies, and seed initial data.

## Steps
- [x] Create `price_entries` table <!-- id: 0 -->
    - Columns: `id`, `created_at`, `user_id`, `product_name`, `category`, `price`, `unit`, `store_name`, `location`, `submitted_by_name`, `verified`.
    - Indexes: `product_name`, `store_name`, `location`, `created_at`.
- [x] Create `user_profiles` table (optional) <!-- id: 1 -->
- [x] Configure RLS Policies <!-- id: 2 -->
    - Allow public read access to `price_entries`.
    - Allow authenticated users to insert into `price_entries`.
- [x] Enable Realtime <!-- id: 3 -->
    - Enable Realtime replication for `price_entries` table.
- [x] Seed Data <!-- id: 4 -->
    - Insert 5-10 sample records to verify data structure.

## Integration
- Use `supabase-mcp-server` tools to execute SQL migrations.
- Verify table creation with `mcp_supabase-mcp-server_list_tables`.
