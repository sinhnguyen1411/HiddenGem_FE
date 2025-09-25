import React from 'react';
import './index.css';

interface TitleProps {
  children: React.ReactNode;
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  align?: 'left' | 'center' | 'right';
  color?: 'primary' | 'secondary' | 'accent' | 'white' | 'black';
  className?: string;
}

const Title: React.FC<TitleProps> = ({
  children,
  level = 'h2',
  size = 'md',
  align = 'left',
  color = 'black',
  className = '',
}) => {
  const titleClass = `title title--${size} title--${align} title--${color} ${className}`;
  
  switch (level) {
    case 'h1':
      return <h1 className={titleClass}>{children}</h1>;
    case 'h2':
      return <h2 className={titleClass}>{children}</h2>;
    case 'h3':
      return <h3 className={titleClass}>{children}</h3>;
    case 'h4':
      return <h4 className={titleClass}>{children}</h4>;
    case 'h5':
      return <h5 className={titleClass}>{children}</h5>;
    case 'h6':
      return <h6 className={titleClass}>{children}</h6>;
    default:
      return <h2 className={titleClass}>{children}</h2>;
  }
};

export default Title;
