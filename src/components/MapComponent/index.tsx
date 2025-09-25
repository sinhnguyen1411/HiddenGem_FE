import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Cafe } from '../../services/types';
import './MapComponent.css';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom coffee shop icon
const coffeeIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 21h18v-2H3v2zM20 3H4v10c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4V3z" fill="#dc2626"/>
      <path d="M2 21h20v-2H2v2z" fill="#dc2626"/>
    </svg>
  `),
  iconSize: [24, 24],
  iconAnchor: [12, 24],
  popupAnchor: [0, -24],
});

// Custom location pin icon
const locationPinIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="12" fill="#dc2626" stroke="white" stroke-width="3"/>
      <circle cx="16" cy="16" r="6" fill="white"/>
    </svg>
  `),
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

interface MapComponentProps {
  stores: Cafe[];
  center?: [number, number];
  zoom?: number;
  searchRadius?: number;
  onStoreClick?: (store: Cafe) => void;
  className?: string;
}

// Component to handle map updates
const MapUpdater: React.FC<{ center: [number, number]; zoom: number }> = ({ center, zoom }) => {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, zoom);
  }, [map, center, zoom]);
  
  return null;
};

const MapComponent: React.FC<MapComponentProps> = ({
  stores,
  center = [10.8231, 106.6297], // Ho Chi Minh City coordinates
  zoom = 13,
  searchRadius = 2000, // 2km radius
  onStoreClick,
  className = ''
}) => {

  // Helper function to safely convert rating to number
  const getRating = (rating: string | number): number => {
    if (typeof rating === 'string') {
      return parseFloat(rating) || 0;
    }
    return rating || 0;
  };

  // Generate random coordinates around the center for demo purposes
  const generateStoreCoordinates = (store: Cafe, index: number): [number, number] => {
    const baseLat = center[0];
    const baseLng = center[1];
    const radius = 0.05; // ~5km radius
    
    const angle = (index * 137.5) % 360; // Golden angle for distribution
    const distance = (index % 10) / 10 * radius;
    
    const lat = baseLat + distance * Math.cos(angle * Math.PI / 180);
    const lng = baseLng + distance * Math.sin(angle * Math.PI / 180);
    
    return [lat, lng];
  };

  const handleStoreClick = (store: Cafe) => {
    if (onStoreClick) {
      onStoreClick(store);
    }
  };

  return (
    <div className={`map-component ${className}`}>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        className="map-container"
      >
        <MapUpdater center={center} zoom={zoom} />
        
        {/* Tile Layer - Using OpenStreetMap */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {/* Search Radius Circle */}
        <Circle
          center={center}
          radius={searchRadius}
          pathOptions={{
            fillColor: '#f97316',
            fillOpacity: 0.2,
            color: '#f97316',
            weight: 2,
            opacity: 0.5
          }}
        />
        
        {/* Center Location Pin */}
        <Marker position={center} icon={locationPinIcon}>
          <Popup>
            <div className="location-popup">
              <h3>Your Location</h3>
              <p>Searching for coffee shops near here</p>
            </div>
          </Popup>
        </Marker>
        
        {/* Coffee Shop Markers */}
        {stores.map((store, index) => {
          const coordinates = generateStoreCoordinates(store, index);
          return (
            <Marker
              key={store.id_cua_hang}
              position={coordinates}
              icon={coffeeIcon}
              eventHandlers={{
                click: () => handleStoreClick(store)
              }}
            >
              <Popup>
                <div className="store-popup">
                  <h3 className="store-name">{store.ten_cua_hang}</h3>
                  <div className="store-rating">
                    <span className="stars">
                      {'★'.repeat(Math.floor(getRating(store.diem_danh_gia_trung_binh)))}
                      {'☆'.repeat(5 - Math.floor(getRating(store.diem_danh_gia_trung_binh)))}
                    </span>
                    <span className="rating-text">
                      {getRating(store.diem_danh_gia_trung_binh).toFixed(1)}
                    </span>
                  </div>
                  <p className="store-description">
                    {store.mo_ta || 'A wonderful coffee shop with great atmosphere.'}
                  </p>
                  <div className="store-meta">
                    <span className="views">👁 {store.luot_xem} views</span>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
