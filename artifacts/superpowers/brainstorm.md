## Goal
Render "Live Grocery Prices" on a map where users can see prices at specific store locations. Clicking a store marker opens a dialog with the price list for that location.

## Constraints
- `price_entries` table currently stores `location` and `store` as free-text strings.
- No `lat`/`lng` or `geography(Point)` columns exist on `price_entries` to plot on a map.
- The "Live Map" page (`/map`) is linked in navigation but its implementation file structure (`src/app/map`) could not be found in current file listings, implying it may need to be created or recovered.
- Geocoding existing free-text locations ("Tesco Extra, Cheras") is error-prone and requires an external API (Google/Mapbox) which incurs cost/setup.

## Known context
- **Database**: `alerts` table has `coordinates` (likely PostGIS), so the DB supports geospatial queries. `price_entries` does not.
- **Frontend**: Mapbox/Leaflet libraries seem present based on conversation history ("Debugging Bus Movement").
- **User Behavior**: Users are currently entering text for "Store" and "Location" without validation against real coordinates.

## Risks
- **Data Quality**: "Tesco", "Tesco Extra", and "Tesco Cheras" will appear as 3 distinct locations if we rely on text matching, fragmenting the map view.
- **Privacy**: If we use user's current location for submission, we might accidentally reveal their home address if they submit from home.
- **Complexity**: Implementing a "Pick Location" UI on the submission form is non-trivial compared to a simple text input.

## Options (2–4)

### Option 1: Client-Side Geolocation (Recommended for Speed)
- **Schema**: Add `lat` (float) and `lng` (float) columns to `price_entries`.
- **Submission**: Update `SubmitPriceForm` to request `navigator.geolocation` or let users tap a map to pin the store location.
- **Map**: Query `price_entries` and render markers.
- **Pros**: Fastest implementation. No meaningful backend changes (just columns).
- **Cons**: Still relies on user honesty/accuracy. Doesn't group stores perfectly (two users might pin the same store 10 meters apart).

### Option 2: "Stores" Table & Autocomplete (Best Long-term)
- **Schema**: Create `stores` table (`id`, `name`, `coordinates`, `address`).
- **Submission**: User searches for a store (via Google Places API or internal DB) and links the price entry to `store_id`.
- **Map**: Render `stores` markers. Clicking one shows aggregated prices for that `store_id`.
- **Pros**: Clean data. One marker per store.
- **Cons**: High effort. Requires seeding store data or expensive Places API.

### Option 3: Backend Geocoding (Low Effort UI, High Latency)
- **Backend**: Trigger a Supabase Edge Function on insert to geocode the `location` text string and save coordinates.
- **Pros**: No UI change for user.
- **Cons**: Expensive/Slow. "Cheras" is a huge area; pinning the center of Cheras is useless for a specific store.

## Recommendation
**Option 1 (Client-Side Geolocation)** is the most feasible "Superpower" for a hackathon.
It balances implementation speed with functional value. Users are likely at the store when submitting, so capturing their GPS is accurate enough. We can add a "Refine Location" map pin if needed.

## Acceptance criteria
1.  `price_entries` schema updated with `lat` and `lng`.
2.  `SubmitPriceForm` captures user coordinates (or defaults to a central point if denied).
3.  `/map` page created/restored to render a map.
4.  Map displays markers for price entries.
5.  Clicking a marker opens a Dialog showing the product, price, and store name.
