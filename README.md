# 🗺️ Madurai: FindMyWard

A premium, interactive web application and civic tool covering all 100 wards of the Madurai Corporation. This application empowers citizens to identify their municipal wards and instantly connect with relevant officials.

**Project Context**: This application is the modern successor to the "ZONE FINDER" tool on [Madurai Guide](https://maduraiguide.in/).

![Madurai Ward Map](src/assets/hero.png)

## ✨ Global Features

- **📍 Instant Ward Detection (GPS)**: High-accuracy geolocation to find your ward in one tap.
- **📱 Offline Experience (PWA) [NEW]**: Install the app on your home screen. Works seamlessly without an internet connection by caching maps and contacts.
- **📞 Ward Contacts Directory**: Access a direct directory of officials for every ward, including:
  - **Councillor**: Direct political representation.
  - **Sanitation Dept**: Inspectors and Supervisors for garbage/cleanliness issues.
  - **Engineering Dept**: AE/JE and Skilled Assistants for road and water repairs.
  - **Revenue Dept**: Bill Collectors for tax queries.
  - **Zone Office**: High-level officials for escalation.
- **🗳️ MLA & MP Directory**: Identify your Member of Legislative Assembly and Member of Parliament based on your ward's location, including direct contact actions.
- **🏛️ Head Office & HQ Support**: Dedicated access to Madurai Corporation Head Office (Arignar Anna Maligai) with quick links for grievances, WhatsApp support, and emergency hotlines.
- **🧹 Smart Intent Filtering**: Quick-action pills (Garbage, Road, Water, Tax, Zone) that instantly filter the directory to what you need.
- **🔍 Intelligent Search**: Search through 30,000+ streets and localities in Madurai with real-time suggestions.
- **🗺️ Interactive Map**: 
  - **Multi-Layer Support**: Toggle between Municipal Wards, Assembly Constituencies (AC), and Parliamentary Constituencies (PC).
  - Zone-based color coding for easy identification.
  - Interactive tooltips and high-contrast labels.
  - Boundaries strictly restricted to Madurai city limits.
- **📱 Mobile-First Experience**: Optimized for all devices with a premium "App-like" feel, including safe-area support and glassmorphism UI.

## 🚀 Quick Start

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/rsiva2294/findmyward.git
   cd findmyward
   ```

2. **Install dependencies**:
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

### Building for Production

```bash
npm run build
```

## 🛠️ Built With

- **[React](https://reactjs.org/)**: UI Component Architecture
- **[Leaflet](https://leafletjs.com/)**: Geospatial Mapping Engine
- **[Turf.js](https://turfjs.org/)**: Spatial Intelligence & Point-in-Polygon logic
- **[Vite PWA](https://vite-pwa-org.netlify.app/)**: Offline-first service worker & manifest management
- **[Lucide React](https://lucide.dev/)**: Premium UI Icons

## 📖 Civic Intelligence

The application bridges the gap between geographic data and municipal action:
1. **Spatial Mapping**: Uses GeoJSON boundaries to map coordinates to ward IDs.
2. **Contact Linking**: Dynamically maps ward IDs to a comprehensive database of 600+ municipal officials.
3. **Intent-Based UI**: Designed to help users solve problems (Garbage, Water, Roads) rather than just browsing raw data.

## 🤝 Contributing

We welcome contributions to help improve the accuracy of ward data and locality mappings! Please refer to [DEVELOPER.md](DEVELOPER.md) for technical details and data formats.

## ⚖️ License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

### 👨‍💻 Developed By
**Sivakaminathan Muthusamy**  
[LinkedIn Profile](https://in.linkedin.com/in/sivakaminathan-muthusamy)

*Dedicated to the people of Madurai.* 🏙️
