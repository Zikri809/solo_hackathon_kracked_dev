nt
### 5. Create Map Page
**Files**: `src/app/map/page.tsx`
**Change**:
- Create page at `/map`.
- Render `LiveMap` component.

**Verify**:
- Navigate to `/map` and see the map.

## Risks & mitigations
- **Risk**: Missing Mapbox Token.
  - **Mitigation**: Use a placeholder or ask user. Fallback to OpenStreetMap/Leaflet if strictly free (but Mapbox has generous free tier). *Decision*: I will plan for Mapbox but revert to Leaflet if token is an issue.
- **Risk**: Browser Geolocation denied.
  - **Mitigation**: Handle error gracefully, allow manual text entry (fallback to current behavior).

## Rollback plan
- Remove `lat`/`lng` columns (or ignore them).
- Revert `SubmitPriceForm` changes.
- Delete `src/components/map` and `src/app/map`.
