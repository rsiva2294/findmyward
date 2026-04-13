import React, { useState, useEffect, useCallback } from 'react';
import * as turf from '@turf/turf';
import MapWrapper from './components/MapWrapper';
import WardResultCard from './components/WardResultCard';
import WardSearch from './components/WardSearch';
import { Navigation } from 'lucide-react';
import wardDataUrl from './assets/madurai_wards.geojson?url';
import localityDataUrl from './assets/locality.json?url';
import { flattenLocalityData } from './utils/searchHelper';

function App() {
  const [geojsonData, setGeojsonData] = useState(null);
  const [localityIndex, setLocalityIndex] = useState([]);

  const [userLocation, setUserLocation] = useState(null);
  const [focusLocation, setFocusLocation] = useState(null);

  const [detectedWard, setDetectedWard] = useState(null);
  const [matchedStreetContext, setMatchedStreetContext] = useState(null); // Context when street is selected
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    // Load GeoJSON data
    fetch(wardDataUrl)
      .then(res => res.json())
      .then(data => {
        setGeojsonData(data);
      })
      .catch(err => {
        console.error("Error loading geojson", err);
        setErrorMsg("Failed to load ward boundary data.");
      });

    // Load and index Locality data
    fetch(localityDataUrl)
      .then(res => res.json())
      .then(data => {
        const flatIndex = flattenLocalityData(data);
        setLocalityIndex(flatIndex);
      })
      .catch(err => {
        console.error("Error loading locality data", err);
      });
  }, []);

  // Spatial logic - find by GPS
  const findWardForPoint = useCallback((lat, lng) => {
    if (!geojsonData) return;

    const pt = turf.point([lng, lat]);
    let foundFeature = null;

    turf.featureEach(geojsonData, (currentFeature) => {
      if (!currentFeature.geometry) return;
      try {
        if (currentFeature.geometry.type === 'Polygon' || currentFeature.geometry.type === 'MultiPolygon') {
          if (turf.booleanPointInPolygon(pt, currentFeature)) {
            foundFeature = currentFeature;
          }
        }
      } catch (e) {
        // Safely ignore errors
      }
    });

    if (foundFeature) {
      setDetectedWard(foundFeature);
      setFocusLocation([lat, lng]);
      setMatchedStreetContext(null); // Clear manual street context from GPS use
      setErrorMsg(null);
    } else {
      setDetectedWard(null);
      setMatchedStreetContext(null);
      setErrorMsg("Location not within any mapped ward.");
    }
  }, [geojsonData]);

  // GPS Action
  const detectLocation = () => {
    setLoading(true);
    setErrorMsg(null);
    setDetectedWard(null);
    setMatchedStreetContext(null);

    if (!navigator.geolocation) {
      setErrorMsg("Geolocation is not supported by your browser.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);
        findWardForPoint(latitude, longitude);
        setLoading(false);
      },
      (error) => {
        console.error("Error getting location", error);
        setErrorMsg("Unable to retrieve your location. Please check permissions.");
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  // Manual Click logic
  const handleMapClick = (latlng) => {
    setUserLocation([latlng.lat, latlng.lng]);
    findWardForPoint(latlng.lat, latlng.lng);
  };

  // Manual Array Search logic
  const handleManualSearchSelect = (matchedItem) => {
    if (!geojsonData || !geojsonData.features) return;

    console.log("Searching for ward link:", matchedItem);

    // Find the feature by ward_no - Single Source of Truth Linking
    // Normalise both to numbers for exact comparison
    const targetWardNo = Number(matchedItem.ward_no);

    const feature = geojsonData.features.find(f => {
      const featureWardNo = Number(f.properties?.ward_no);
      return featureWardNo === targetWardNo;
    });

    if (feature) {
      console.log("Found matching GeoJSON feature:", feature.properties);
      setDetectedWard(feature);
      try {
        // Use center of mass or fall back to first coordinate if complex
        const center = turf.centerOfMass(feature);
        const coords = center.geometry.coordinates; // [lng, lat]
        const targetLatLng = [coords[1], coords[0]];

        setFocusLocation(targetLatLng);
        setUserLocation(null); // Do not show GPS marker for manual search
        setErrorMsg(null);

        if (matchedItem.type === 'street') {
          setMatchedStreetContext(`This street belongs to Ward ${matchedItem.ward_no} - ${matchedItem.ward_name}`);
        } else {
          setMatchedStreetContext(null);
        }
      } catch (e) {
        console.warn("Could not calculate center for feature", e);
        // Fallback: zoom to some point in the feature if centerOfMass fails
        setErrorMsg("Zoomed to ward area (approximate center).");
      }
    } else {
      console.error("GeoJSON mismatch for ward number:", targetWardNo);
      setErrorMsg(`Ward polygon data not found for Ward ${targetWardNo}.`);
      setDetectedWard(null);
      setMatchedStreetContext(null);
    }
  };

  const clearSelection = () => {
    setDetectedWard(null);
    setUserLocation(null);
    setErrorMsg(null);
    setMatchedStreetContext(null);
  };

  return (
    <div className="app-container">
      {/* Search Bar */}
      <div className="top-bar animate-slide-up">
        <WardSearch 
          localityIndex={localityIndex} 
          onSelect={handleManualSearchSelect} 
          onDetectLocation={detectLocation}
          isDetecting={loading}
        />
      </div>

      <div className="dev-credit animate-fade-in" style={{ animationDelay: '0.4s' }}>
        <span>Developed by <a href="https://in.linkedin.com/in/sivakaminathan-muthusamy" target="_blank" rel="noopener noreferrer">Sivakaminathan Muthusamy</a></span>
        <span className="separator"></span>
        <span>Part of <a href="https://maduraiguide.in/" target="_blank" rel="noopener noreferrer">Madurai Guide</a></span>
      </div>



      {/* Main Map */}
      <div className="map-container">
        <MapWrapper
          geojsonData={geojsonData}
          userLocation={userLocation}
          focusLocation={focusLocation}
          detectedWard={detectedWard}
          onMapClick={handleMapClick}
        />
      </div>

      {/* Result Bottom Overlay */}
      <div className="result-card-wrapper animate-slide-up" style={{ animationDelay: '0.2s' }}>
        {detectedWard && (
          <WardResultCard
            wardFeature={detectedWard}
            clearSelection={clearSelection}
            matchedStreet={matchedStreetContext}
          />
        )}

        {errorMsg && !detectedWard && (
          <div className="message-card error animate-fade-in">
            {errorMsg}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
