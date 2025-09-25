import React from 'react';
import { Title, Text } from '../';
import './index.css';

interface AdminStatsCardProps {
  title: string;
  value: string | number;
  icon: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

const AdminStatsCard: React.FC<AdminStatsCardProps> = ({
  title,
  value,
  icon,
  trend,
  className = ''
}) => {
  return (
    <div className={`admin-stats-card ${className}`}>
      <div className="admin-stats-card__icon">
        <Text variant="span" size="lg" className="admin-stats-card__icon-text">
          {icon}
        </Text>
      </div>
      
      <div className="admin-stats-card__content">
        <Text variant="p" size="sm" color="secondary" className="admin-stats-card__title">
          {title}
        </Text>
        
        <div className="admin-stats-card__value-container">
          <Title level="h3" size="xl" color="primary" className="admin-stats-card__value">
            {value}
          </Title>
          
          {trend && (
            <div className={`admin-stats-card__trend admin-stats-card__trend--${trend.isPositive ? 'positive' : 'negative'}`}>
              <Text variant="span" size="xs" color={trend.isPositive ? 'black' : 'black'}>
                {trend.isPositive ? '↗' : '↘'} {Math.abs(trend.value)}%
              </Text>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminStatsCard;
