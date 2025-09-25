import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Footer, Text, StoreCard, MapComponent } from '../../components';
import { cafesService } from '../../services/cafes';
import { Cafe } from '../../services/types';
import './LocationScreen.css';
import StoreDetail from "../../assets/images/store-detail.png";

interface LocationScreenProps {
  className?: string;
}

const LocationScreen: React.FC<LocationScreenProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  const [stores, setStores] = useState<Cafe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch stores from API
  useEffect(() => {
    const fetchStores = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await cafesService.list(1, 12);
        setStores(response.data.items);
      } catch (err) {
        setError('Failed to load stores');
        console.error('Error fetching stores:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, []);

  const handleViewDetails = (storeId: number) => {
    navigate(`/store/${storeId}`);
  };

  const handleStoreClick = (store: Cafe) => {
    navigate(`/store/${store.id_cua_hang}`);
  };


  return (
    <div className={`location-screen ${className}`}>

      {/* Hero Banner */}
      <section className="hero-banner">
        <div className="banner-overlay">
          <div className="hero-overlay-background">
            <img src={StoreDetail} alt="Store background" />
          </div>
          <div className="banner-content">
            <div className="banner-text">
              <p className="banner-highlight">Hightlight news, ads, discount, HOT HOT</p>
              <h1 className="banner-title">Find the café, feel the vibe</h1>
            </div>
            <div className="banner-search">
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Enter your location"
                  className="search-input"
                />
                <button className="search-btn">Search</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <div className="location-search">
          <h2 className="location-title">coffee shop near you</h2>
          <button className="look-around-btn">Look around here</button>
        </div>
        <div className="map-container">
          <div className="map-overlay">

          </div>
          <MapComponent
            stores={stores}
            center={[10.8231, 106.6297]} // Ho Chi Minh City coordinates
            zoom={13}
            searchRadius={2000} // 2km radius
            onStoreClick={handleStoreClick}
            className="location-map"
          />
        </div>
      </section>

      {/* Stores Section */}
      <main className="stores-main">
        <div className="stores-container">
          <div className="stores-header">
            <h2 className="stores-title">Related Stores</h2>
            <div className="stores-controls">
              <div className="pagination-dots">
                <span className="dot active"></span>
                <span className="dot"></span>
              </div>
            </div>
          </div>

          <div className="stores-grid">
            {loading ? (
              <div className="loading-container">
                <Text variant="p" size="lg" color="primary">Loading stores...</Text>
              </div>
            ) : error ? (
              <div className="error-container">
                <Text variant="p" size="lg" color="primary">{error}</Text>
              </div>
            ) : (
              stores.map((store) => (
                <StoreCard
                  key={store.id_cua_hang}
                  store={store}
                  onViewDetails={handleViewDetails}
                />
              ))
            )}
          </div>

          <div className="load-more-section">
            <button className="load-more-btn">LOAD MORE</button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LocationScreen;