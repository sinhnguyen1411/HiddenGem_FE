import React from 'react';
import { Card, Title, Text } from '../';
import './index.css';

interface InfoCardProps {
  title: string;
  description: string;
  icon?: string;
  variant?: 'service' | 'testimonial';
  author?: string;
  className?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({
  title,
  description,
  icon,
  variant = 'service',
  author,
  className = ''
}) => {
  return (
    <Card 
      variant="elevated" 
      padding="lg" 
      shadow="sm" 
      className={`info-card info-card--${variant} ${className}`}
    >
      {icon && (
        <div className="info-card__icon">
          <Text variant="p" size="sm" color="secondary">{icon}</Text>
        </div>
      )}
      
      <Title 
        level="h3" 
        size="md" 
        color="primary" 
        align={variant === 'service' ? 'center' : 'left'}
        className="info-card__title"
      >
        {title}
      </Title>
      
      <Text 
        variant="p" 
        size="sm" 
        color="secondary" 
        align={variant === 'service' ? 'center' : 'left'}
        className={`info-card__description ${variant === 'testimonial' ? 'info-card__description--italic' : ''}`}
      >
        {variant === 'testimonial' ? `"${description}"` : description}
      </Text>
      
      {author && (
        <Text 
          variant="p" 
          size="sm" 
          weight="semibold" 
          color="primary" 
          className="info-card__author"
        >
          - {author}
        </Text>
      )}
    </Card>
  );
};

export default InfoCard;
