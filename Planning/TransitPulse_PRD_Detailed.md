**TRANSITPULSE MALAYSIA**

Product Requirements Document

*"Community Transit Utility for Malaysia's Last Mile"*

| Version | 1.0 |
| :---- | :---- |
| **Date** | February 14, 2026 |
| **Status** | Draft for Hackathon |
| **Author** | TransitPulse Team |
| **Platform** | Progressive Web App (PWA) |

# **Table of Contents**

**1\. Executive Summary**

**2\. Product Vision**

*    2.1 Problem Statement  
*    2.2 Solution Overview  
*    2.3 Target Users

**3\. UI/UX Design System: "Transit Pulse" Theme**

*    3.1 Design Philosophy  
*    3.2 Color System  
*    3.3 Typography  
*    3.4 Component Library  
*    3.5 Navigation Architecture

**4\. Functional Requirements**

*    4.1 Core Features  
*    4.2 User Stories

**5\. Technical Architecture**

*    5.1 Technology Stack  
*    5.2 System Architecture  
*    5.3 Data Models

**6\. Implementation Roadmap**

**7\. Success Metrics**

**8\. Appendix**

# **1\. Executive Summary**

TransitPulse Malaysia is a community-driven Progressive Web App designed to solve the "last-mile problem" in Malaysian public transportation. By integrating real-time transit data from data.gov.my with community-powered hazard reporting, we create a digital utility that makes everyday commuting safer, more predictable, and more accessible for B40 users and urban commuters across Malaysia.

Built on Next.js 15, Supabase, and modern PWA technologies, TransitPulse delivers native app-like performance while maintaining zero installation friction. Our unique "Transit Pulse" UI theme draws inspiration from Malaysian transport culture—bold, high-contrast, and immediately recognizable—while ensuring accessibility for users on low-end smartphones.

# **2\. Product Vision**

## **2.1 Problem Statement**

Malaysian commuters face three critical pain points:

**Unreliable Last-Mile Transit:** Feeder buses (myBAS) and connecting services lack real-time tracking, forcing users to wait in extreme heat with no visibility into arrival times.

**Fragmented Walkability:** Pedestrian infrastructure between stations is inconsistent, with broken shelters, poor lighting, and hazardous walkways that discourage multimodal transit.

**Safety & Infrastructure Gaps:** Potholes, flooding, and lighting failures go unreported for weeks, creating unnecessary risks for daily commuters, especially in B40 communities.

## **2.2 Solution Overview**

TransitPulse addresses these challenges through three core capabilities:

* Real-Time Transit Tracking: Live vehicle positions for Prasarana (LRT/MRT), KTMB, and myBAS feeder services using GTFS-RT protocol.  
* Sheltered Path Routing: Intelligent routing that prioritizes covered walkways, air-conditioned tunnels, and indoor connections between transit nodes.  
* Urban Alert System: Community-powered hazard reporting with geo-tagged photos, enabling rapid municipal response and peer-to-peer safety awareness.

## **2.3 Target Users**

| Persona | Primary Need | Key Feature |
| :---- | :---- | :---- |
| **B40 Commuter(Age 25-45)** | Reliable feeder bus tracking to reduce wait times in suburban areas | Live myBAS Tracking with ETA predictions |
| **Student / Office Worker(Age 18-35)** | Sheltered routes to avoid extreme heat between stations | Sheltered Path Routing with indoor waypoints |
| **Community Advocate(Age 30-60)** | Report infrastructure issues in their neighborhood | Urban Alert with photo upload & status tracking |

# **3\. UI/UX Design System: "Transit Pulse" Theme**

## **3.1 Design Philosophy**

The "Transit Pulse" design system rejects generic material design in favor of a bold, culturally-rooted aesthetic inspired by Malaysian public transport signage. Our design principles prioritize:

* High Contrast & Legibility: Deep purples, electric blues, and vibrant teals ensure readability under harsh sunlight and low-light conditions.  
* Transit-Inspired Geometry: Chunky pill-shaped buttons, thick borders, and bold iconography echo the visual language of MRT/LRT station signage.  
* Community Warmth: Rounded corners, friendly micro-interactions, and encouraging copy that position the app as a helpful neighbor, not a corporate tool.  
* Performance-First: Every animation is GPU-accelerated, every image is optimized, and critical UI loads in under 1 second on 3G networks.

## **3.2 Color System**

Our palette draws from the vibrant colors of Malaysian transit lines and urban environments:

| Color Name | Hex Code | Usage | Accessibility |
| :---- | :---- | :---- | :---- |
| **Deep Purple** | **\#581C87** | Primary brand, headers, CTAs | WCAG AAA on white |
| **Transit Blue** | **\#1E40AF** | Active routes, real-time indicators | WCAG AAA on white |
| **Electric Teal** | **\#0D9488** | Alerts, notifications, success states | WCAG AA on white |
| **Sunset Orange** | **\#EA580C** | Warnings, delays, hazards | WCAG AA on white |
| **Monsoon Gray** | **\#374151** | Body text, secondary info | WCAG AAA on white |
| **Cloud White** | **\#F9FAFB** | Backgrounds, cards | Base layer |
| **Night Sky** | **\#111827** | Dark mode background | WCAG AAA with teal |
| **Neon Highlight** | **\#FBBF24** | Interactive elements in dark mode | WCAG AA on dark |

## **3.3 Typography**

Font System: Inter for UI, JetBrains Mono for arrival times and technical data.

* Display (36px/Bold): App title, empty states \- "Where to next?"  
* Heading 1 (24px/Semibold): Section headers \- "Live Departures"  
* Heading 2 (18px/Semibold): Card titles \- "Pasar Seni Station"  
* Body (16px/Regular): Descriptions, alerts, user-generated content  
* Caption (14px/Regular): Timestamps, secondary info, disclaimers  
* Monospace (14px/Medium): ETAs, arrival times \- "3 min" "12:45 PM"

## **3.4 Component Library**

Our shadcn/ui-based components are customized with the Transit Pulse theme:

| Component | Description | Customization |
| :---- | :---- | :---- |
| **Transit Card** | Displays route info, live status, ETA | Thick 3px border, pill-shaped badge for status, pulse animation for "arriving soon" |
| **Map Pin** | Marks stations, stops, user location | Chunky icons with drop shadow, color-coded by line (purple=MRT, blue=LRT, teal=bus) |
| **Alert Drawer** | Bottom sheet for hazard reporting | Swipe-to-dismiss, photo upload preview, auto-geolocation chip |
| **Sheltered Route Badge** | Indicates indoor/covered segments | Umbrella icon \+ "80% sheltered" percentage in teal pill |
| **Live Pulse Indicator** | Shows real-time data freshness | Animated dot \+ "Updated 5s ago" in monospace font |
| **Action Button (Primary)** | Main CTAs \- "Find Route", "Report Issue" | Deep purple background, 48px height, rounded-full, haptic feedback on mobile |
| **Skeleton Loader** | Loading states for transit cards | Shimmer animation in brand colors, preserves layout to prevent CLS |
| **Toast Notification** | Success/error feedback | Top-right position, 4-second auto-dismiss, includes undo action for reports |

## **3.5 Navigation Architecture**

Adaptive Navigation: Mobile-first design with platform-specific patterns.

**Mobile (≤768px):** Bottom navigation bar with 4 tabs. Fixed position with safe-area-inset-bottom for notched devices. Haptic feedback on tab switch.

* Home (🏠): Live map view with nearest stops  
* Routes (🚍): Saved favorites and recent searches  
* Alerts (⚠️): Community hazard feed  
* Profile (👤): Settings, language toggle, saved preferences

**Desktop (\>768px):** Persistent left sidebar (240px width) with collapsible sections. Map takes center stage with details panel on right (400px width).

* Sidebar: Logo, navigation links, quick filters (e.g., "Show only buses")  
* Main Panel: Full-screen map with zoom controls and layer toggles  
* Details Panel: Selected route info, stop schedules, real-time alerts

# **4\. Functional Requirements**

## **4.1 Core Features**

### **Feature 1: Real-Time Transit Tracking**

Description: Display live vehicle positions for all Prasarana (LRT/MRT) and KTMB trains, plus myBAS feeder buses where data is available.

User Flow:

* User opens app → Map loads with user location (geolocation permission)  
* System fetches GTFS-RT feed via Supabase Edge Function  
* Vehicles appear as animated markers on Mapbox GL JS map  
* User taps vehicle → Drawer shows route name, next stops, ETA  
* Real-time updates every 10 seconds with WebSocket connection

Acceptance Criteria:

* Vehicle positions update within 1 second of GTFS-RT feed refresh  
* Map supports smooth panning/zooming with 60fps on mid-range Android devices  
* Offline mode shows last cached positions with "Offline \- Last updated \[time\]" badge  
* Color-coded markers match official line colors (purple=MRT Kajang, etc.)

### **Feature 2: Sheltered Path Routing**

Description: Calculate pedestrian routes between stations that prioritize covered walkways, air-conditioned tunnels, and indoor shopping malls.

User Flow:

* User enters destination station in search bar  
* System calculates multiple route options using Mapbox Directions API  
* Routes ranked by: (1) % sheltered, (2) total distance, (3) elevation gain  
* Route card displays: "85% Sheltered • 12 min walk • Via Pavilion KL"  
* User selects route → Turn-by-turn navigation with shelter indicators

Acceptance Criteria:

* Database contains shelter data for top 50 stations in Klang Valley  
* Route calculation completes in \<2 seconds on 4G connection  
* Navigation UI shows umbrella icon next to sheltered segments  
* User can toggle "Prefer sheltered routes" in settings (default: ON)

### **Feature 3: Urban Alert System**

Description: Allow users to report infrastructure hazards (potholes, broken lights, flooding) with geo-tagged photos and community verification.

User Flow:

* User taps "Report Issue" button (floating action button on map)  
* Camera opens → User captures photo of hazard  
* System auto-fills location via GPS \+ reverse geocoding  
* User selects category: Pothole / Lighting / Flooding / Other  
* Optional: Add description (max 200 chars)  
* Submit → Alert posted to community feed with "Pending Verification" status  
* Other users can upvote to escalate priority

Acceptance Criteria:

* Image upload completes in \<5 seconds on 3G connection (max 2MB, auto-compressed)  
* Alert appears on map within 10 seconds of submission  
* Admin dashboard allows municipal workers to mark alerts as "Resolved"  
* Users receive in-app notification when their report is resolved  
* PDPA compliance: No NRIC required, optional nickname display

## **4.2 User Stories**

| ID | As a... | I want to... | So that... |
| :---- | :---- | :---- | :---- |
| **US-01** | B40 commuter | See live ETA for myBAS feeder bus | I don't waste 30 minutes waiting in the heat |
| **US-02** | Office worker | Find sheltered route from KLCC to Pavilion | I arrive at meetings without being soaked in sweat |
| **US-03** | Student | Save favorite stops for daily commute | I can quickly check departures without searching |
| **US-04** | Community advocate | Report broken streetlight near station | Other users are warned and DBKL is notified |
| **US-05** | Tourist | Switch app language to Bahasa Malaysia | I can navigate the interface in my preferred language |
| **US-06** | Senior citizen | View large, high-contrast text | I can read schedules without eye strain |

# **5\. Technical Architecture**

## **5.1 Technology Stack**

| Layer | Technology | Strategic Rationale |
| :---- | :---- | :---- |
| **Framework** | Next.js 15 (App Router) | Server Components for static schedules, Client Components for interactive map |
| **Language** | TypeScript | Type-safe GTFS protocol buffers and Supabase data models |
| **UI Library** | shadcn/ui \+ Tailwind CSS | Customizable components with Transit Pulse theme |
| **PWA Engine** | Serwist | Advanced service worker for offline-first architecture |
| **Database** | Supabase (PostgreSQL \+ PostGIS) | Spatial queries for "nearest stop" calculations |
| **Authentication** | Supabase Auth | Cookie-based sessions with Next.js middleware |
| **Functions** | Supabase Edge Functions (Deno) | Proxy GTFS-RT binary data, bypass CORS |
| **Maps** | Mapbox GL JS | GPU-accelerated vector tiles, custom styling |
| **Hosting** | Vercel | Edge network for \<200ms global latency |
| **State Management** | TanStack Query v5 | Server state caching, optimistic updates, polling |
| **Analytics** | Vercel Analytics \+ PostHog | Privacy-focused event tracking, PDPA compliant |

## **5.2 System Architecture**

High-Level Architecture Diagram (Conceptual):

* CLIENT LAYER: Next.js 15 PWA (Serwist service worker, IndexedDB for offline data)  
* API LAYER: Supabase Edge Functions (GTFS-RT proxy, image processing, auth middleware)  
* DATA LAYER: PostgreSQL with PostGIS (GTFS\_Stops, GTFS\_Routes, UserProfiles, UrbanAlerts)  
* EXTERNAL SERVICES: data.gov.my (GTFS-RT feed), Mapbox (tiles \+ directions), Supabase Storage (alert images)  
* MONITORING: Sentry (error tracking), Vercel Analytics (Web Vitals), PostHog (user behavior)

### **Data Flow: Real-Time Transit Updates**

* → External API: data.gov.my publishes GTFS-RT protobuf every 30 seconds  
* → Supabase Edge Function: Fetches feed, parses binary data, caches in-memory  
* → Next.js Server Component: Calls Edge Function, receives JSON  
* → Client Component: Uses `useQuery` to poll Edge Function, receives updates  
* → Service Worker: Caches last 5 minutes of data for offline fallback

## **5.3 Data Models**

Core Database Schema (PostgreSQL \+ PostGIS):

**Profiles Table:**

* id (UUID, PK) \- Links to auth.users  
* display\_name (TEXT) \- Optional nickname  
* pref\_lang (ENUM: en, ms) \- Interface language  
* nric\_hash (TEXT, NULLABLE) \- SHA-256 hash for PDPA compliance  
* created\_at (TIMESTAMP)

**Favorites Table:**

* id (SERIAL, PK)  
* user\_id (UUID, FK → Profiles)  
* stop\_id (TEXT, FK → GTFS\_Stops)  
* created\_at (TIMESTAMP)

**UrbanAlerts Table:**

* id (SERIAL, PK)  
* user\_id (UUID, FK → Profiles)  
* location (GEOGRAPHY POINT) \- PostGIS spatial type  
* image\_url (TEXT) \- Supabase Storage path  
* category (ENUM: pothole, lighting, flooding, other)  
* description (TEXT, max 200 chars)  
* status (ENUM: pending, verified, resolved)  
* upvotes (INTEGER, default 0\)  
* created\_at (TIMESTAMP)

**GTFS Standard Tables (from data.gov.my):**

* GTFS\_Stops: stop\_id (PK), stop\_name, location (GEOGRAPHY), wheelchair\_accessible  
* GTFS\_Routes: route\_id (PK), route\_short\_name, route\_type, route\_color  
* GTFS\_Trips: trip\_id (PK), route\_id (FK), service\_id, direction\_id  
* GTFS\_StopTimes: trip\_id (FK), stop\_id (FK), arrival\_time, departure\_time, stop\_sequence

# **6\. Implementation Roadmap**

> The roadmap is split into two tracks: **Hackathon Sprint** (Phases 0–5, ~48 hours) for a working demo, and **Post-Hackathon** (Phases 6–10, ~2 months) for production readiness.

---

## **Hackathon Sprint — 48-Hour Plan**

---

### **Phase 0: Project Setup & Design Foundation (4 hours)**

**Scope:** Bootstrap the entire development environment, establish the design system, and ensure every team member can run the project locally.

**Key Tasks:**
1. Initialize Next.js 15 project with App Router and TypeScript strict mode
2. Install and configure shadcn/ui component library
3. Set up Tailwind CSS with Transit Pulse custom theme tokens (colors, fonts, spacing)
4. Create Supabase project with PostGIS extension enabled
5. Configure environment variables (`.env.local`) for Supabase URL, anon key, Mapbox token
6. Set up Git repository with branch protection and PR template
7. Create base layout (`app/layout.tsx`) with Inter + JetBrains Mono font loading
8. Build a static "Hello TransitPulse" landing page to validate the design system renders correctly

**Deliverables:**
- Working dev server (`npm run dev`) with Transit Pulse theme applied
- Supabase project with PostGIS enabled and database connection verified
- Git repo with initial commit and team access configured
- Tailwind config with all 8 brand colors and typography scale

**Dependencies:** None (this is the foundation)

**Risks:**
- PostGIS extension activation may require Supabase Pro plan → Verify free-tier support first
- Mapbox token rate limits on free tier → Use development token with localhost restriction

**Success Criteria:**
- [x] Dev server runs without errors on all team members' machines
- [x] UI renders with correct brand colors and typography
- [x] Supabase dashboard shows PostGIS extension as active
- [x] Environment variables are documented and `.env.example` is committed

---

### **Phase 1: PWA Core & Offline Shell (6 hours)**

**Scope:** Transform the Next.js app into a fully installable Progressive Web App with offline capabilities and mobile-optimized shell.

**Key Tasks:**
1. Install and configure Serwist (service worker library for Next.js 15)
2. Create PWA manifest (`manifest.json`) with app name, icons (192x192, 512x512), theme color (#581C87)
3. Generate app icons in all required sizes from TransitPulse logo
4. Build offline fallback page with brand styling and "You're offline" messaging
5. Configure service worker caching strategy:
   - **Cache First:** Static assets (CSS, JS, fonts, icons)
   - **Network First:** API responses (transit data)
   - **Stale While Revalidate:** Map tiles
6. Implement mobile install prompt banner (deferred `beforeinstallprompt`)
7. Add `<meta>` tags for PWA (viewport, theme-color, apple-touch-icon)
8. Build adaptive navigation shell:
   - Mobile: Bottom tab bar (Home, Routes, Alerts, Profile)
   - Desktop: Left sidebar (240px, collapsible)

**Deliverables:**
- Installable PWA on Android Chrome and iOS Safari
- Offline page with TransitPulse branding
- Responsive navigation shell (mobile bottom bar + desktop sidebar)
- Service worker registered and caching static assets

**Dependencies:** Phase 0 (project setup complete)

**Risks:**
- iOS Safari has limited PWA support (no push notifications) → Document limitations
- Serwist configuration may conflict with Next.js App Router → Follow Serwist Next.js guide

**Success Criteria:**
- [x] Lighthouse PWA score > 90
- [x] App installable on Android (Add to Home Screen prompt works)
- [x] Offline page renders correctly when network is disabled
- [x] Navigation shell adapts correctly between mobile and desktop breakpoints

---

### **Phase 2: Data Pipeline & GTFS Integration (8 hours)**

**Scope:** Build the real-time data pipeline from data.gov.my GTFS-RT feeds through Supabase Edge Functions to the client, plus set up the core database schema.

**Key Tasks:**
1. Create database migration for core tables:
   - `profiles` (user data, preferences, language)
   - `favorites` (saved stops per user)
   - `urban_alerts` (hazard reports with PostGIS location)
   - `gtfs_stops`, `gtfs_routes`, `gtfs_trips`, `gtfs_stop_times` (transit schedule)
2. Set up Row-Level Security (RLS) policies:
   - Profiles: Users can only read/write their own data
   - Urban Alerts: Public read, authenticated write
   - GTFS tables: Public read-only
3. Build Supabase Edge Function: `fetch-gtfs-rt`
   - Fetch GTFS-RT protobuf feed from data.gov.my
   - Parse binary protobuf → JSON using `pbf` library
   - Cache parsed data in-memory with 30-second TTL
   - Return JSON response with vehicle positions, trip updates
4. Create PostGIS spatial indices on `gtfs_stops.location` and `urban_alerts.location`
5. Write SQL function: `nearby_stops(lat, lng, radius_meters)` using PostGIS `ST_DWithin`
6. Seed database with static GTFS schedule data (stops, routes) from data.gov.my
7. Set up Supabase Realtime subscription for `urban_alerts` table changes
8. Install and configure TanStack Query v5 (QueryClientProvider) for efficient polling

**Deliverables:**
- Complete database schema with RLS policies applied
- Working Edge Function returning live vehicle positions as JSON
- PostGIS spatial queries for "nearest stops" operational
- Static GTFS schedule data seeded in database

**Dependencies:** Phase 0 (Supabase project created)

**Risks:**
- data.gov.my GTFS-RT feed may have downtime → Build mock data fallback
- Protobuf parsing in Deno (Edge Functions) may require specific library → Test `pbf` compatibility
- Rate limiting on data.gov.my API → Implement caching with 30-second TTL

**Success Criteria:**
- [x] Edge Function returns valid JSON with vehicle positions within 1 second
- [x] `nearby_stops` function returns correct stops within specified radius
- [x] RLS policies prevent unauthorized data access (test with anon vs. authenticated)
- [x] Database schema matches PRD data model specification

---

### **Phase 3: Live Map & Transit Visualization (10 hours)**

**Scope:** Integrate Mapbox GL JS for the interactive transit map, render live vehicle positions, and build the stop/route information UI.

**Key Tasks:**
1. Set up Mapbox GL JS with custom Transit Pulse map style:
   - Dark mode base with brand-colored transit lines
   - Custom markers for MRT (purple), LRT (blue), Bus (teal)
2. Implement user geolocation with permission prompt and fallback (default: KL Sentral)
3. Create `useTransitData` custom hook:
   - Fetches vehicle positions from Edge Function every 10 seconds
   - Updates marker positions with smooth CSS transitions
   - Handles errors and offline fallback gracefully
4. Build vehicle marker component:
   - Color-coded by route type (MRT/LRT/Bus)
   - Animated pulse effect for "arriving soon" vehicles
   - Bearing rotation based on vehicle heading
5. Build stop marker layer:
   - Show nearby stops within 2km radius
   - Tap to reveal stop details drawer
6. Create Transit Card component (bottom drawer):
   - Route name, direction, next stops
   - ETA in monospace font with Live Pulse Indicator
   - "Save to Favorites" button
7. Implement map controls:
   - Zoom in/out buttons
   - "Center on me" button
   - Layer toggle (show/hide buses, trains)
8. Add skeleton loaders for map and transit cards during loading states

**Deliverables:**
- Interactive map centered on user location with live vehicle markers
- Tap-to-reveal transit card drawer with route info and ETAs
- Map controls (zoom, center, layer toggle)
- Smooth 60fps marker animations on mid-range devices

**Dependencies:** Phase 2 (Edge Function returning vehicle data)

**Risks:**
- Mapbox GL JS is ~200KB → Lazy load with `next/dynamic` to prevent blocking initial paint
- Frequent marker updates may cause jank → Use `requestAnimationFrame` for smooth transitions
- Free Mapbox tier limited to 50K map loads/month → Sufficient for hackathon, monitor usage

**Success Criteria:**
- [x] Map renders within 2 seconds on 4G connection
- [x] Vehicle markers update position smoothly every 10 seconds
- [x] Transit card displays correct route info and live ETA
- [x] Map maintains 60fps during panning/zooming on test device (mid-range Android)

---

### **Phase 4: Urban Alert System (8 hours)**

**Scope:** Build the complete community hazard reporting flow including photo capture, geo-tagged submission, community feed, and upvoting.

**Key Tasks:**
1. Build "Report Issue" floating action button (FAB) on map view
2. Create Alert Submission Form (bottom sheet drawer):
   - Camera capture using `navigator.mediaDevices` API
   - Gallery upload as fallback
   - Auto-compress images to < 2MB (canvas resize)
   - Auto-fill location via GPS + reverse geocoding (Mapbox Geocoding API)
   - Category selector: Pothole / Lighting / Flooding / Other
   - Optional description textarea (max 200 characters, character counter)
3. Implement image upload to Supabase Storage:
   - Create `alert-images` bucket with public read access
   - Upload via signed URL with progress indicator
   - Generate thumbnail for feed display
4. Create `submitAlert` server action:
   - Validate inputs (category required, image required, location required)
   - Insert into `urban_alerts` table with PostGIS point geometry
   - Return success with alert ID
5. Build Community Alert Feed page:
   - List view sorted by recency (newest first)
   - Each card shows: photo thumbnail, category badge, location name, timestamp, upvote count
   - Filter by category (tabs: All / Pothole / Lighting / Flooding / Other)
6. Implement upvote functionality:
   - One upvote per user per alert (tracked via junction table)
   - Optimistic UI update with rollback on error
7. Show alerts as markers on the map:
   - Warning triangle icon, color-coded by category
   - Cluster nearby alerts at low zoom levels
8. Add alert status indicator: Pending (orange) → Verified (blue) → Resolved (green)

**Deliverables:**
- End-to-end hazard reporting flow (capture → upload → submit → display)
- Community feed with filtering and upvoting
- Alert markers on map with clustering
- Image upload with compression and progress indicator

**Dependencies:** Phase 2 (database schema, Supabase Storage), Phase 3 (map integration)

**Risks:**
- Camera API inconsistent across mobile browsers → Provide file input fallback
- Image compression may be slow on low-end devices → Use Web Worker for off-thread processing
- GPS accuracy in urban canyons → Allow manual pin-drop adjustment on map

**Success Criteria:**
- [ ] Complete alert flow works end-to-end (photo → location → submit → appears on feed)
- [ ] Image upload completes in < 5 seconds on 3G connection
- [ ] Alert appears on map within 10 seconds of submission
- [ ] Upvote persists and prevents duplicate votes per user

---

### **Phase 5: Deployment, Polish & Demo Prep (12 hours)**

**Scope:** Deploy to production, polish the UI, prepare demo materials, and conduct initial user testing.

**Key Tasks:**
1. Deploy to Vercel:
   - Connect GitHub repo to Vercel project
   - Configure environment variables in Vercel dashboard
   - Set up custom domain (transitpulse.my or similar)
   - Enable Vercel Analytics and Speed Insights
2. Performance optimization pass:
   - Run Lighthouse audit and fix any scores below 90
   - Optimize Largest Contentful Paint (LCP) — preload map tiles
   - Ensure Cumulative Layout Shift (CLS) < 0.1 — skeleton loaders
   - Minimize First Input Delay — defer non-critical JS
3. Cross-browser testing:
   - Chrome Android (primary target)
   - Safari iOS
   - Chrome Desktop
   - Firefox Desktop
4. UI polish:
   - Add micro-animations (page transitions, button hover effects)
   - Ensure consistent spacing, colors, and typography across all pages
   - Add empty states ("No alerts in your area yet")
   - Error boundaries with user-friendly messaging
5. Prepare demo:
   - Write demo script (3-minute walkthrough for judges)
   - Seed realistic data (vehicle positions, sample alerts with photos)
   - Test demo on presentation device (ensure stable WiFi)
   - Prepare backup: screen recording of the full flow
6. User testing:
   - Recruit 5–10 users at Taylor's/UM campus
   - Observe first-time app usage, note friction points
   - Quick survey: "Would you use this daily?" (Y/N + why)

**Deliverables:**
- Live production URL on Vercel with custom domain
- Lighthouse scores > 90 (Performance, Accessibility, PWA)
- Polished UI with micro-animations and empty states
- 3-minute demo script and backup screen recording
- User feedback from 5–10 test participants

**Dependencies:** Phases 0–4 (all features built)

**Risks:**
- Vercel cold starts may cause slow initial loads → Enable function warming
- Demo WiFi may be unreliable → Pre-cache demo data in service worker
- Last-minute bugs may surface during user testing → Prioritize critical bug fixes only

**Success Criteria:**
- [ ] Production URL is live and accessible from mobile devices
- [ ] Lighthouse Performance score > 90
- [ ] Demo runs smoothly end-to-end without errors
- [ ] At least 5 users complete the test flow without critical blockers

---

## **Post-Hackathon — Production Readiness (~2 months)**

---

### **Phase 6: Sheltered Path Database & Routing (2 weeks)**

**Scope:** Build the sheltered path dataset and integrate intelligent routing that prioritizes covered walkways.

**Key Tasks:**
1. Manual surveying and mapping of sheltered segments for top 50 Klang Valley stations
2. Create `sheltered_segments` database table with PostGIS LineString geometries
3. Integrate Mapbox Directions API with custom waypoints for sheltered routing
4. Build route comparison UI: display "85% Sheltered • 12 min walk • Via Pavilion KL"
5. Implement turn-by-turn navigation view with shelter indicators (umbrella icons)
6. Add user preference toggle: "Prefer sheltered routes" (default: ON)

**Deliverables:**
- Sheltered segment data for 50+ stations
- Route comparison UI with shelter percentage
- Turn-by-turn navigation with shelter indicators

**Dependencies:** Phase 3 (map integration)

**Success Criteria:**
- [ ] Route calculation completes in < 2 seconds on 4G
- [ ] Sheltered percentage is accurate for mapped stations
- [ ] Users can toggle shelter preference in settings

---

### **Phase 7: Multi-Language Support (1 week)**

**Scope:** Internationalize the app with full Bahasa Malaysia translation support.

**Key Tasks:**
1. Install and configure `next-intl` for i18n support
2. Extract all UI strings into translation files (`en.json`, `ms.json`)
3. Translate all strings to Bahasa Malaysia (native speaker review)
4. Add language toggle in Profile settings
5. Persist language preference in user profile (`pref_lang` column)
6. Ensure RTL/locale-aware formatting for dates, numbers, distances

**Deliverables:**
- Full Bahasa Malaysia translation of all UI text
- Language toggle accessible from Profile tab
- Locale-aware date and distance formatting

**Dependencies:** Phase 5 (stable UI to extract strings from)

**Success Criteria:**
- [ ] All UI text renders correctly in both English and Bahasa Malaysia
- [ ] Language preference persists across sessions
- [ ] No untranslated strings visible in Bahasa mode

---

### **Phase 8: Admin Dashboard (2 weeks)**

**Scope:** Build a web portal for municipal workers (e.g., DBKL) to manage urban alerts and monitor community reports.

**Key Tasks:**
1. Create admin-specific Supabase role with elevated RLS policies
2. Build admin dashboard pages:
   - Alert queue with filters (status, category, location, date range)
   - Map view of all alerts with heat map overlay
   - Individual alert detail view with photo, location, reporter info
3. Implement alert status management (Pending → Verified → Resolved)
4. Add batch operations (mark multiple alerts as resolved)
5. Build resolution notification system (in-app notification to reporter)
6. Create analytics page (alerts per area, resolution time, trending categories)

**Deliverables:**
- Admin login flow with role-based access
- Alert management dashboard with status workflow
- Analytics page with resolution metrics
- Notification system for resolved alerts

**Dependencies:** Phase 4 (alert system), Phase 7 (multi-language for admin UI)

**Success Criteria:**
- [ ] Admin can log in and view all pending alerts
- [ ] Status transitions trigger notifications to reporters
- [ ] Analytics dashboard shows accurate resolution metrics

---

### **Phase 9: Performance Optimization (1 week)**

**Scope:** Optimize the app for low-end devices and slow networks, targeting Lighthouse scores > 95.

**Key Tasks:**
1. Set up Vercel Image Optimization for all user-uploaded photos
2. Implement code splitting with `next/dynamic` for heavy components (map, charts)
3. Add edge caching for GTFS static data (routes, stops) with 1-hour TTL
4. Optimize bundle size: tree-shake unused shadcn/ui components
5. Implement `<link rel="preload">` for critical fonts and map tiles
6. Add resource hints (`dns-prefetch`, `preconnect`) for Supabase and Mapbox domains
7. Profile and fix memory leaks in real-time data subscriptions
8. Implement virtual scrolling for long alert feed lists

**Deliverables:**
- Lighthouse Performance score > 95
- Bundle size < 200KB (first load JS)
- Time to Interactive < 3 seconds on 3G
- Memory-stable over extended usage sessions

**Dependencies:** All previous phases (optimization is holistic)

**Success Criteria:**
- [ ] Lighthouse Performance > 95, Accessibility > 95
- [ ] First load JS bundle < 200KB (gzipped)
- [ ] TTI < 3 seconds on simulated 3G (Lighthouse throttling)
- [ ] No memory leaks after 30 minutes of continuous use

---

### **Phase 10: Beta Launch & Iteration (1 month)**

**Scope:** Launch closed beta with 100 users, gather feedback, fix bugs, and prepare for public release.

**Key Tasks:**
1. Recruit 100 beta users (Taylor's/UM students, community organizers, B40 commuters)
2. Set up feedback collection (in-app feedback button, PostHog surveys)
3. Monitor Sentry for error reports and crash-free session rate
4. Weekly bug triage and fix cycles (Monday triage → Friday deploy)
5. A/B test key features (map default zoom, alert form flow, shelter route prominence)
6. Conduct 5 user interviews (15 min each) for qualitative insights
7. Prepare App Store submission materials (screenshots, description, privacy policy)
8. Final security audit (RLS policies, input sanitization, rate limiting)
9. Write public launch blog post and press kit

**Deliverables:**
- Beta feedback report with prioritized improvement list
- Stable release candidate with < 0.1% crash rate
- App Store submission materials ready
- Public launch blog post and press kit

**Dependencies:** All previous phases

**Success Criteria:**
- [ ] 100 beta users onboarded with > 50% weekly active
- [ ] Crash-free session rate > 99.5%
- [ ] Net Promoter Score > 40 from beta survey
- [ ] All critical and high-severity bugs resolved
- [ ] Security audit passes with no critical findings


# **7\. Success Metrics**

Key Performance Indicators (KPIs) for Measuring Impact:

| Metric Category | Indicator | Target (Month 1\) | Measurement Method |
| :---- | :---- | :---- | :---- |
| **User Adoption** | Monthly Active Users | 5,000 MAU | PostHog analytics |
| **Engagement** | Avg. Sessions per User | 8 sessions/month | Vercel Analytics |
| **Performance** | Time to Interactive | \<3 seconds on 3G | Lighthouse CI |
| **Reliability** | Real-Time Data Accuracy | \>95% uptime | Supabase monitoring |
| **Community Impact** | Urban Alerts Submitted | 200 alerts/month | Database query |
| **Community Impact** | Alert Resolution Rate | \>60% resolved in 30 days | Admin dashboard |
| **Accessibility** | PWA Install Rate | \>20% of visitors | Install prompt analytics |
| **User Satisfaction** | App Store Rating | 4.5+ stars | User reviews (future App Store) |

### **Qualitative Success Signals:**

* User testimonials highlighting reduced commute stress  
* Media coverage in Malaysian tech/transport publications  
* Municipal partnerships (e.g., DBKL pilot for alert integration)  
* Community organizers using app to advocate for infrastructure improvements  
* Students sharing app with peers as "essential campus tool"

# **8\. Appendix**

## **A. Code Best Practices Checklist**

* TypeScript Strict Mode: Enable noUncheckedIndexedAccess, strictNullChecks  
* Component Structure: Colocate styles, use Server Components by default  
* Performance: Lazy load Mapbox (dynamic import), optimize images with next/image  
* Accessibility: ARIA labels, keyboard navigation, color contrast ≥4.5:1  
* Security: Sanitize user input, rate-limit API routes, validate Supabase RLS policies  
* Testing: Vitest for unit tests, Playwright for E2E, Lighthouse CI in GitHub Actions  
* Error Handling: Sentry integration, user-friendly error boundaries  
* Documentation: JSDoc comments, README with setup instructions, Storybook for components

## **B. PDPA Compliance Notes**

* Mandatory Disclosure: Prominent privacy notice in Bahasa Malaysia \+ English on signup  
* Data Minimization: No NRIC collection; optional hashed NRIC for advanced features only  
* User Rights: Delete account option in settings, export data as JSON  
* Third-Party Data: Mapbox, Supabase, Vercel processors listed in privacy policy  
* Retention: Alert images auto-deleted after 90 days if marked "Resolved"  
* Consent: Explicit opt-in for marketing emails, analytics tracking toggle in settings

## **C. Technical Glossary**

| Term | Definition |
| :---- | :---- |
| **GTFS-RT** | General Transit Feed Specification \- Realtime; protocol for live transit data |
| **PostGIS** | PostgreSQL extension for spatial queries (e.g., "nearest stop within 500m") |
| **PWA** | Progressive Web App; web app with native-like features (offline, installable) |
| **Server Component** | Next.js component that runs only on server, reduces client JS bundle |
| **Client Component** | React component that runs in browser, used for interactivity |
| **Edge Function** | Serverless function running on Deno at edge locations for low latency |
| **shadcn/ui** | Copy-paste component library built on Radix UI \+ Tailwind CSS |
| **Serwist** | Service worker library for Next.js 15 with advanced caching strategies |
| **RLS** | Row-Level Security; Supabase feature to restrict database access per user |
| **PDPA** | Personal Data Protection Act 2010 (Malaysia); governs data privacy |

— End of Document —

TransitPulse Malaysia © 2026 | Built for KrackAthon Q1 2026