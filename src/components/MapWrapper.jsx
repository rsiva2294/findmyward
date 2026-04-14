import React, { useEffect, useMemo } from 'react';
import * as turf from '@turf/turf';
import { MapContainer, TileLayer, GeoJSON, Marker, useMap, useMapEvents, Tooltip, LayersControl, LayerGroup } from 'react-leaflet';
const { BaseLayer, Overlay } = LayersControl;
import L from 'leaflet';

const ZONE_COLORS = {
  'East Zone-I': '#2563EB',    // Primary Blue
  'North Zone-II': '#059669',  // Darker Green
  'Central Zone-III': '#D97706', // Strong Amber
  'South Zone-IV': '#DC2626',  // Red
  'West Zone-V': '#C026D3'     // Fuchsia (High contrast vs Blue)
};

const getZoneColor = (zone) => ZONE_COLORS[zone] || '#6366F1'; // Default indigo

// Simple helper to darken hex colors
const darkenColor = (hex, percent) => {
  const num = parseInt(hex.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) - amt;
  const G = (num >> 8 & 0x00FF) - amt;
  const B = (num & 0x0000FF) - amt;
  return "#" + (0x1000000 + (R < 255 ? R < 0 ? 0 : R : 255) * 0x10000 + (G < 255 ? G < 0 ? 0 : G : 255) * 0x100 + (B < 255 ? B < 0 ? 0 : B : 255)).toString(16).slice(1);
};

// Create a pulsating dot for the user location
const createUserIcon = () => {
  return L.divIcon({
    className: 'custom-user-marker',
    html: `
      <div style="
        width: 16px; 
        height: 16px; 
        background-color: #4F46E5; 
        border-radius: 50%; 
        border: 3px solid white;
        box-shadow: 0 0 10px rgba(79, 70, 229, 0.6);
      "></div>
      <div style="
        position: absolute;
        top: -8px;
        left: -8px;
        width: 32px;
        height: 32px;
        background-color: rgba(79, 70, 229, 0.2);
        border-radius: 50%;
        animation: pulse 2s infinite ease-out;
      "></div>
      <style>
        @keyframes pulse {
          0% { transform: scale(0.5); opacity: 1; }
          100% { transform: scale(2); opacity: 0; }
        }
      </style>
    `,
    iconSize: [16, 16],
    iconAnchor: [8, 8]
  });
};

// Component to handle map clicks
function ClickHandler({ onMapClick }) {
  useMapEvents({
    click(e) {
      if (onMapClick) onMapClick(e.latlng);
    },
  });
  return null;
}

// Component to re-center the map when focus changes
function MapFocusController({ focusLocation }) {
  const map = useMap();
  useEffect(() => {
    if (focusLocation) {
      map.setView(focusLocation, 15, {
        animate: true,
        duration: 1
      });
    }
  }, [focusLocation, map]);
  return null;
}


// Component to render Zone Labels at the calculated centers
const ZoneLabels = ({ geojsonData }) => {
  const labels = useMemo(() => {
    if (!geojsonData || !geojsonData.features) return [];
    
    const zones = [...new Set(geojsonData.features.map(f => f.properties?.zone))].filter(Boolean);
    
    return zones.map(zoneName => {
      try {
        const zoneFeatures = geojsonData.features.filter(f => f.properties?.zone === zoneName);
        const collection = turf.featureCollection(zoneFeatures);
        const center = turf.centerOfMass(collection);
        
        // Extract Roman Numeral from zone name (e.g., "West Zone-V" -> "V")
        const roman = zoneName.split('-')[1];
        const nameOnly = zoneName.split(' ')[0].toUpperCase();
        
        return {
          id: zoneName,
          name: `${nameOnly} - ZONE ${roman}`,
          position: [center.geometry.coordinates[1], center.geometry.coordinates[0]]
        };
      } catch (e) {
        console.error("Error calculating center for zone", zoneName, e);
        return null;
      }
    }).filter(Boolean);
  }, [geojsonData]);

  return labels.map(label => (
    <Marker 
      key={label.id} 
      position={label.position} 
      icon={L.divIcon({ className: 'zone-label-icon', html: '' })}
      interactive={false}
    >
      <Tooltip 
        permanent 
        direction="center" 
        className="zone-name-tag"
        offset={[0, 0]}
      >
        {label.name}
      </Tooltip>
    </Marker>
  ));
};

const MapWrapper = ({ geojsonData, acData, pcData, userLocation, focusLocation, detectedWard, onMapClick }) => {
  // Default Madurai coordinates
  const maduraiCenter = [9.9252, 78.1198];

  const wardStyle = (feature) => {
    const isSelected = detectedWard && 
      (feature.properties?.ward_no === detectedWard.properties?.ward_no || 
       feature.properties?.ward_name === detectedWard.properties?.ward_name);
       
    const zoneColor = getZoneColor(feature.properties?.zone);
    const darkenedZoneColor = darkenColor(zoneColor, 30);
       
    return {
      fillColor: isSelected ? darkenedZoneColor : zoneColor, 
      weight: isSelected ? 3 : 1,
      opacity: isSelected ? 1 : 0.6,
      color: isSelected ? darkenedZoneColor : '#FFFFFF', // Border color
      fillOpacity: isSelected ? 0.4 : 0.2
    };
  };

  const acStyle = {
    fillColor: '#10B981',
    weight: 2,
    opacity: 0.8,
    color: '#059669',
    fillOpacity: 0.1,
    dashArray: '3'
  };

  const pcStyle = {
    fillColor: '#F59E0B',
    weight: 2,
    opacity: 0.8,
    color: '#D97706',
    fillOpacity: 0.1,
    dashArray: '5, 10'
  };

  return (
    <MapContainer 
      center={maduraiCenter} 
      zoom={12} 
      minZoom={10}
      maxZoom={18}
      maxBounds={[[9.0, 77.0], [10.5, 78.6]]}
      maxBoundsViscosity={1.0}
      style={{ height: '100%', width: '100%' }}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />

      <LayersControl position="topright">
        <Overlay checked name="Wards & Zones">
          <LayerGroup>
            {geojsonData && (
              <GeoJSON 
                data={geojsonData} 
                style={wardStyle}
                onEachFeature={(feature, layer) => {
                  layer.bindTooltip(`
                    <div style="font-family: Inter, sans-serif; padding: 4px;">
                      <div style="font-weight: 800; color: var(--primary); font-size: 13px;">Ward ${feature.properties.ward_no}</div>
                      <div style="font-weight: 600; color: var(--text-main); font-size: 12px; margin-top: 2px;">${feature.properties.ward_name}</div>
                      <div style="font-weight: 500; color: var(--text-muted); font-size: 10px; margin-top: 2px;">${feature.properties.zone}</div>
                    </div>
                  `, { sticky: true, opacity: 0.95, className: 'custom-tooltip' });
                }}
                key={`geojson-${detectedWard ? detectedWard.properties?.ward_no : 'base'}`}
              />
            )}
            <ZoneLabels geojsonData={geojsonData} />
          </LayerGroup>
        </Overlay>

        <Overlay name="Assembly Constituencies">
          {acData && (
            <GeoJSON 
              data={acData} 
              style={acStyle}
              onEachFeature={(feature, layer) => {
                layer.bindTooltip(`
                  <div style="font-family: Inter, sans-serif; padding: 4px;">
                    <div style="font-weight: 800; color: #059669; font-size: 13px;">${feature.properties.ac_name}</div>
                    <div style="font-weight: 600; color: var(--text-main); font-size: 11px;">AC No: ${feature.properties.ac_no}</div>
                  </div>
                `, { sticky: true });
              }}
            />
          )}
        </Overlay>

        <Overlay name="Parliamentary Constituencies">
          {pcData && (
            <GeoJSON 
              data={pcData} 
              style={pcStyle}
              onEachFeature={(feature, layer) => {
                layer.bindTooltip(`
                  <div style="font-family: Inter, sans-serif; padding: 4px;">
                    <div style="font-weight: 800; color: #D97706; font-size: 13px;">${feature.properties.pc_name}</div>
                    <div style="font-weight: 600; color: var(--text-main); font-size: 11px;">PC No: ${feature.properties.pc_no}</div>
                  </div>
                `, { sticky: true });
              }}
            />
          )}
        </Overlay>
      </LayersControl>
      
      <ClickHandler onMapClick={onMapClick} />
      <MapFocusController focusLocation={focusLocation} />

      {userLocation && (
        <Marker position={userLocation} icon={createUserIcon()} />
      )}
    </MapContainer>
  );
};

export default MapWrapper;
