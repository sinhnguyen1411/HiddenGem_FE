import React from 'react';
import { Card, Title, Text, Button } from '../';
import { Product } from '../../dummyData';
import './index.css';

interface ProductCardProps {
  product: Product;
  variant?: 'featured' | 'store';
  showRating?: boolean;
  showQuickView?: boolean;
  onAddToCart?: (product: Product) => void;
  onQuickView?: (product: Product) => void;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  variant = 'featured',
  showRating = false,
  showQuickView = false,
  onAddToCart,
  onQuickView,
  className = ''
}) => {
  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  const handleQuickView = () => {
    if (onQuickView) {
      onQuickView(product);
    }
  };

  return (
    <Card 
      variant="elevated" 
      padding="lg" 
      shadow={variant === 'featured' ? "md" : "sm"} 
      hover 
      className={`product-card ${className}`}
    >
      <div className="product-image-placeholder">
        <Text variant="p" size="sm" color="secondary">{product.image}</Text>
      </div>
      
      <div className="product-info">
        <Title level="h3" size={variant === 'featured' ? 'lg' : 'md'} color="primary">
          {product.name}
        </Title>
        
        {product.description && (
          <Text variant="p" size="md" color="secondary">
            {product.description}
          </Text>
        )}
        
        {showRating && (
          <div className="product-rating">
            <span className="stars">★★★★★</span>
            <span className="rating-text">({product.rating})</span>
          </div>
        )}
        
        <Text variant="p" size="lg" weight="semibold" color="accent">
          ${product.price}
        </Text>
      </div>
      
      <div className="product-actions">
        <Button 
          variant="primary" 
          size="sm" 
          className="add-to-cart"
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
        
        {showQuickView && (
          <Button 
            variant="outline" 
            size="sm" 
            className="quick-view"
            onClick={handleQuickView}
          >
            Quick View
          </Button>
        )}
      </div>
    </Card>
  );
};

export default ProductCard;
