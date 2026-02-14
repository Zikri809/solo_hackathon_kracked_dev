## Goal
Implement Phase 3: Live Map & Transit Visualization, enabling users to view real-time transit data on an interactive map.

## Assumptions
- `next-auth` is working.
- `NEXT_PUBLIC_MAPBOX_TOKEN` is set in `.env.local`.
- `fetch-gtfs-rt` Edge Function is deployed and accessible.
- Dependencies: `mapbox-gl` (v2/3), `react-map-gl`, `@types/mapbox-gl` will be installed.

## Plan
### 1. Install Map Dependencies
- **Files**: `package.json`
- **Change**: Install `mapbox-gl`, `@types/mapbox-gl`, `react-map-gl`.
- **Verify**: `npm list mapbox-gl` returns version.

### 2. Create Map Component Shell
- **Files**: `components/map/TransitMap.tsx`, `app/page.tsx`
- **Change**: Create basic `TransitMap` component using `react-map-gl`. Replace content in `app/page.tsx` with this map.
- **Verify**: Home page displays a map (even if blank/loading) or at least the container.

### 3. Implement User Geolocation
- **Files**: `hooks/useGeolocation.ts`, `components/map/TransitMap.tsx`
- **Change**: Create hook to access `navigator.geolocation` or use `react-map-gl`'s `GeolocateControl`. Update Map to center on user or default (KL Sentral).
- **Verify**: Browser prompts for location; Map centers on user.

### 4. Create Transit Data Hook
- **Files**: `hooks/useTransitData.ts`
- **Change**: Implement `useTransitData` using TanStack Query to poll `fetch-gtfs-rt` every 10s.
- **Verify**: `console.log` shows data arrays arriving every 10s.

### 5. Create Vehicle Markers Layer
- **Files**: `components/map/VehicleMarkers.tsx`, `components/map/TransitMap.tsx`
- **Change**: Create component to render `Marker` for each vehicle. Differentiate types (Bus/Rail) by color/icon.
- **Verify**: Moving markers appear on the map representing vehicles.

### 6. Create Stop Markers Layer
- **Files**: `hooks/useNearbyStops.ts`, `components/map/StopMarkers.tsx`
- **Change**: Fetch stops (initially maybe just static or visible region). Render as clickable points.
- **Verify**: Bus stops appear on the map.

### 7. Transit Details Drawer
- **Files**: `components/map/TransitDrawer.tsx`, `app/page.tsx`
- **Change**: Add a generic drawer component (using shadcn `Drawer`) to show details when a marker is clicked.
- **Verify**: Clicking a vehicle/stop opens the drawer with details.

### 8. Map Controls & Polish
- **Files**: `components/map/MapControls.tsx`
- **Change**: Add Zoom, Geolocate (if custom), and Layer toggle buttons. Add Loading skeletons.
- **Verify**: Controls function correctly.

## Risks & mitigations
- **Mapbox Token**: Missing token will cause map failure. -> Check `.env.local` first.
- **Performance**: Too many DOM markers lag. -> Use `react-map-gl` Source/Layer (WebGL) for stops if >100.
- **Mobile**: Touch events on map vs drawer. -> Ensure drawer `z-index` and touch handling is correct.

## Rollback plan
- Revert `app/page.tsx` to previous state.
- Delete `components/map/` and `hooks/useTransitData.ts`.
