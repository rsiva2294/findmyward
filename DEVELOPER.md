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
│   │   ├── MapWrapper.jsx      # Leaflet map implementation
│   │   ├── WardSearch.jsx      # Search UI & autocomplete logic
│   │   └── WardResultCard.jsx  # Dismissible result overlay
│   ├── utils/              # Helper functions
│   │   └── searchHelper.js     # Data flattening & indexing
│   ├── App.jsx             # Main state orchestration
│   ├── index.css           # Global design system & animations
│   └── main.jsx            # React entry point
├── public/                 # Static assets (icons)
└── DEVELOPER.md            # You are here
```

## 📊 Data Architecture

The application relies on two primary data sources located in `src/assets/`:

### 1. `madurai_wards.geojson`
The source of truth for ward boundaries.
- **Properties**: `ward_no`, `ward_name`, `zone`.
- **Logic**: Used for spatial Point-in-Polygon testing and rendering map layers.

### 2. `locality.json`
A mapped index of streets/localities to ward numbers.
- **Structure**: A nested object or array (flattened during initialization).
- **Properties**: `locality_name`, `street_name`, `ward_no`.
- **Normalization**: During indexing, ward numbers are normalized to `Number` types to ensure consistent matching with the GeoJSON features.

## 🧠 Core Logic

### Spatial Search (GPS / Map Click)
Uses **Turf.js** to determine which ward polygon contains a specific `[lat, lng]` coordinate.
- **Method**: `turf.booleanPointInPolygon(point, feature)`
- **Integration**: Handled in `App.jsx` via `findWardForPoint`.

### Manual Search (Locality/Street)
The `locality.json` data is flattened into a searchable index on app mount.
- **Helper**: `flattenLocalityData` in `utils/searchHelper.js`.
- **Matching**: When a street is selected, the app looks up the `ward_no` and then finds the corresponding polygon in the GeoJSON data by numeric ID.

### Map Rendering
Implemented using **React-Leaflet**.
- **Zone Coloring**: Wards are colored based on their `zone` property (East, North, Central, South, West) using a predefined color palette in `MapWrapper.jsx`.
- **Dynamic Updates**: The `key` prop of the `GeoJSON` component is tied to the `detectedWard` ID to force a re-render and highlight the selected ward instantly.

## 🎨 Design System

The application uses **Vanilla CSS** with a focus on premium aesthetics:
- **Glassmorphism**: Translucent panels with blur effects for search and result cards.
- **Animations**: CSS transitions and keyframes (`slide-up`, `fade-in`) for a "live" feel.
- **Variables**: Centrally defined colors in `index.css` for easy theme Management.

## 🛠️ Development Workflow

1. **Adding New Localities**: 
   Add entries to `src/assets/locality.json`. Ensure the `ward_no` matches an existing `ward_no` in the GeoJSON data.
   
2. **Updating Ward Boundaries**: 
   Replace `src/assets/madurai_wards.geojson`. If property names change (e.g., `ward_no` becomes `WardID`), update the matching logic in `App.jsx` and `MapWrapper.jsx`.

3. **Styling Components**: 
   Prefer modifying `index.css` or `App.css` using the existing variable system to maintain visual harmony.

## 🧪 Testing

Currently, testing is manual. When making changes to the search logic:
1. Verify GPS detection in a known location.
2. Search for a street (e.g., "Anna Nagar") and ensure the map zooms to the correct ward.
3. Click a ward polygon directly and verify the details in the result card.

---

*For queries, contact the development team.*
