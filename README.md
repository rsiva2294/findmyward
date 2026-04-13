# 🗺️ Madurai: FindMyWard

A premium, interactive web application covering all 100 wards of the Madurai Corporation. This tool provides citizens and visitors with an easy way to identify municipal wards using geographic data.

**Project Context**: This application is being developed to replace/modernize the "ZONE FINDER" tool on [Madurai Guide](https://maduraiguide.in/).

![Madurai Ward Map](src/assets/hero.png)

## ✨ Features

- **📍 Find My Ward (GPS)**: Instant detection of your current ward using high-accuracy geolocation.
- **🔍 Smart Search**: Search through thousands of streets and localities in Madurai with real-time suggestions.
- **🗺️ Interactive Map**: 
  - Zone-based color coding for easy navigation.
  - High-contrast ward labels.
  - Interactive tooltips with ward numbers and names.
  - Smooth zoom and boundaries restricted to Madurai city limits.
- **📱 Responsive Design**: Fully optimized for mobile, tablet, and desktop viewing.
- **⚡ Performance**: Built with Vite and React for near-instant load times and smooth animations.

## 🚀 Quick Start

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/madurai-findmyward.git
   cd madurai-findmyward
   ```

2. **Install dependencies**:
   ```bash
   npm install
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

- **[React](https://reactjs.org/)**: UI Framework
- **[Leaflet](https://leafletjs.com/)**: Mapping Engine
- **[Turf.js](https://turfjs.org/)**: Advanced Geospatial Analysis
- **[Vite](https://vitejs.dev/)**: Frontend Tooling
- **[Lucide React](https://lucide.dev/)**: Premium Icon Suite

## 📖 How it Works

The application uses state-of-the-art spatial logic to map coordinates to municipal boundaries. 
1. **Geometric Matching**: When you click the map or use GPS, the app performs a "Point-in-Polygon" test against GeoJSON ward boundaries.
2. **Locality Index**: A flat JSON database links over 30,000+ street/locality entries to their respective ward numbers for precise manual searching.

## 🤝 Contributing

We welcome contributions to help improve the accuracy of ward data and locality mappings! Please refer to [DEVELOPER.md](DEVELOPER.md) for technical details and data formats.

## ⚖️ License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

### 👨‍💻 Developed By
**Sivakaminathan Muthusamy**  
[LinkedIn Profile](https://in.linkedin.com/in/sivakaminathan-muthusamy)

*Dedicated to the people of Madurai.* 🏙️
