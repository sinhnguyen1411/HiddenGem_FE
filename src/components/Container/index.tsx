import React from 'react';
import './index.css';

interface ContainerProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  center?: boolean;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({
  children,
  size = 'lg',
  padding = 'md',
  center = true,
  className = '',
}) => {
  return (
    <div className={`container container--${size} container--padding-${padding} ${center ? 'container--center' : ''} ${className}`}>
      {children}
    </div>
  );
};

export default Container;
