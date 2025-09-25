import React from 'react';
import { Title, Text } from '../';
import { Cafe } from '../../services/types';
import './StoreCard.css';

interface StoreCardProps {
  store: Cafe;
  onViewDetails: (storeId: number) => void;
  className?: string;
}

// Helper function to safely convert rating to number
const getRating = (rating: string | number): number => {
  if (typeof rating === 'string') {
    return parseFloat(rating) || 0;
  }
  return rating || 0;
};

const StoreCard: React.FC<StoreCardProps> = ({ 
  store, 
  onViewDetails, 
  className = '' 
}) => {
  const renderStars = (rating: string | number) => {
    const ratingNumber = getRating(rating);
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={`star ${i <= ratingNumber ? 'filled' : ''}`}>
          ★
        </span>
      );
    }
    return stars;
  };

  // Placeholder image for cafes without images
  const storeImage = 'https://img.freepik.com/premium-vector/coffee-shop-facade-shop-icon-flat-style_2963-235.jpg';

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Handle wishlist functionality
  };

  // Default variant (from HomeScreen)
  return (
    <div className={`store-card store-card--default ${className}`} onClick={() => onViewDetails(store.id_cua_hang)}>
      <div className="store-image-container">
        <img src={storeImage} alt={store.ten_cua_hang} className="store-image" />
        <div className="store-overlay">
          <button className="wishlist-btn" onClick={handleWishlistClick}>
            <span className="wishlist-icon">♡</span>
          </button>
        </div>
      </div>
      
      <div className="store-info">
        <div className="store-details">
          <div className="store-hours-price">
            <Text variant="p" size="sm" color="secondary">
              Views: {store.luot_xem}
            </Text>
          </div>
          
          <Title level="h3" size="md" color="primary" className="store-name">
            {store.ten_cua_hang}
          </Title>
          
          <div className="store-location-rating">
            <div className="location-info">
              <Text variant="p" size="sm" color="secondary">
                {store.mo_ta || 'No description'}
              </Text>
            </div>
            
            <div className="rating-info">
              <div className="stars">
                {renderStars(store.diem_danh_gia_trung_binh)}
              </div>
              <Text variant="p" size="sm" color="secondary">
                {getRating(store.diem_danh_gia_trung_binh).toFixed(1)}
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreCard;
