# Task: Phase 4 - Price Feed & Realtime

## Objective
Display a list of grocery prices with realtime updates and "Lowest Price" highlighting.

## Steps
- [x] Create `usePrices` Hook <!-- id: 0 -->
    - [x] Fetch data from `price_entries`.
    - [x] Sorting: Newest first default.
    - [x] Subscription: Listen for `INSERT` on `price_entries`.
- [x] Create `PriceCard` Component <!-- id: 1 -->
    - [x] Display: Product Name, Price (large), Unit, Store, Location, Time ago.
    - [x] Logic: Highlight if it's the "Lowest Price" (Badge).
- [x] Implement Feed View <!-- id: 2 -->
    - [x] Grid layout (responsive).
    - [x] Loading states (Skeleton).
    - [x] Empty states.
- [x] Integration <!-- id: 3 -->
    - [x] Connect `usePrices` to the Feed View.
    - [x] Verify realtime updates by manually inserting a row in Supabase.

## Notes
- "Lowest Price" logic might need to be calculated client-side for the MVP or via a Database View if complex.
