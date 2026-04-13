# 👨‍💻 Developer Documentation: Madurai: FindMyWard

This document provides a technical overview of the "Madurai Know Your Ward" application architecture, data structures, and core logic.

## 🎯 Mission & Scope
- **Coverage**: 100% representation of all 100 wards of Madurai Corporation.
- **Goal**: Serve as a modern successor to the "ZONE FINDER" tool at [maduraiguide.in](https://maduraiguide.in/).
- **Credit**: Developed by **Sivakaminathan Muthusamy** ([LinkedIn](https://in.linkedin.com/in/sivakaminathan-muthusamy)).

## 🏗️ Project Structure

```text
madurai-findmyward/
├── src/
│   ├── assets/             # Raw data files (GeoJSON, JSON)
│   ├── components/         # React Components
│   │   ├── MapWrapper.jsx              # Leaflet map implementation
│   │   ├── WardSearch.jsx              # Search UI & autocomplete logic
│   │   ├── WardResultCard.jsx          # Dismissible result overlay
│   │   └── WardContactsBottomSheet.jsx # Official contact directory & filtering
│   ├── utils/              # Helper functions
│   │   └── searchHelper.js     # Data flattening & indexing
│   ├── App.jsx             # Main state orchestration
│   ├── index.css           # Global design system & animations
│   └── main.jsx            # React entry point
├── public/                 # Static assets (icons)
└── DEVELOPER.md            # You are here
```

## 📊 Data Architecture

The application relies on three primary data sources located in `src/assets/`:

### 1. `madurai_wards.geojson`
The source of truth for ward boundaries.
- **Properties**: `ward_no`, `ward_name`, `zone`.
- **Logic**: Used for spatial Point-in-Polygon testing.

### 2. `locality.json`
A mapped index of 30,000+ streets/localities to ward numbers.
- **Properties**: `locality_name`, `street_name`, `ward_no`.

### 3. `madurai_all_zones.json` [NEW]
Official contact directory for all wards and zones.
- **Wards**: Contains `councillor`, `sanitary`, `engineering`, and `bill_collector` details.
- **Zones**: Contains high-level zone office officials.
- **Schema Helper**: Some legacies entries in `councillor_name` contain embedded phone numbers with tabs; the parsing utility in `WardContactsBottomSheet` handles these dynamically.

## 🧠 Core Logic

### Spatial Search (GPS / Map Click)
Uses **Turf.js** (`turf.booleanPointInPolygon`) to map `[lat, lng]` coordinates to ward features.

### Ward Contact Mapping
When a ward is detected, the app performs a lookup in `madurai_all_zones.json`:
1. **Find Ward**: Matches `ward_no` from GeoJSON properties to the contacts database.
2. **Resolve Zone**: Extracts the parent zone officials as a fallback.
3. **Intent Filtering**: Uses a local state in `WardContactsBottomSheet` to filter officials by category (Garbage, Road, etc.), providing a solution-oriented user experience.

### Mobile UI Stacks & Viewports
To handle mobile clipping:
- **`fixed` Positioning**: The result card uses specific fixed positioning to avoid address bar shifts.
- **`100dvh`**: The root container uses Dynamic Viewport Height for consistent mobile rendering.
- **Stacked Actions**: Primary action buttons use a horizontal `flex` layout with optimized `13px` font sizing for narrow mobile screens.

## 🎨 Design System

- **Glassmorphism**: Translucent panels with `backdrop-filter: blur(12px)`.
- **Animations**: CSS keyframes (`sheetSlideUp`, `fadeIn`) for sheet interactions.
- **SEO Support**: Comprehensive meta tags, OpenGraph, and Twitter Card metadata in `index.html`.

## 🛠️ Development Workflow

1. **Updating Contacts**: 
   Modify `src/assets/madurai_all_zones.json`. Ensure the `ward_no` field remains an integer for exact matching.
   
2. **Feature Icons**: 
   Use the **Lucide React** suite. Import new icons into `WardContactsBottomSheet.jsx` for category mapping.

## 🧪 Testing

1. **SEO Validation**: Use tools like "SEO Meta in 1 Click" to verify og-tags.
2. **Mobile Viewport**: Test on Chrome DevTools using "iPhone SE" (narrowest) to verify button alignment.
3. **Contact Parsing**: Verify that names with embedded tabs/phones are cleaned correctly in the UI.

---

*For queries, contact the development team.*
