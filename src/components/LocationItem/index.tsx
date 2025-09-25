import React from 'react';
import { Title, Text } from '../';
import './index.css';

interface LocationItemProps {
  title: string;
  content: string;
  className?: string;
}

const LocationItem: React.FC<LocationItemProps> = ({
  title,
  content,
  className = ''
}) => {
  return (
    <div className={`location-item ${className}`}>
      <Title level="h3" size="md" color="primary" className="location-item__title">
        {title}
      </Title>
      <Text variant="p" size="md" color="secondary" className="location-item__content">
        {content.split('\n').map((line, index) => (
          <React.Fragment key={index}>
            {line}
            {index < content.split('\n').length - 1 && <br />}
          </React.Fragment>
        ))}
      </Text>
    </div>
  );
};

export default LocationItem;
