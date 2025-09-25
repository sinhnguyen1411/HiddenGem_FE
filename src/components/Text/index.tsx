import React from 'react';
import './index.css';

interface TextProps {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  color?: 'primary' | 'secondary' | 'accent' | 'muted' | 'white' | 'black';
  align?: 'left' | 'center' | 'right';
  className?: string;
  onClick?: () => void;
}

const Text: React.FC<TextProps> = ({
  children,
  variant = 'p',
  size = 'md',
  weight = 'normal',
  color = 'black',
  align = 'left',
  className = '',
  onClick,
}) => {
  const textClass = `text text--${size} text--${weight} text--${color} text--${align} ${className}`;
  
  switch (variant) {
    case 'h1':
      return <h1 className={textClass} onClick={onClick}>{children}</h1>;
    case 'h2':
      return <h2 className={textClass} onClick={onClick}>{children}</h2>;
    case 'h3':
      return <h3 className={textClass} onClick={onClick}>{children}</h3>;
    case 'h4':
      return <h4 className={textClass} onClick={onClick}>{children}</h4>;
    case 'h5':
      return <h5 className={textClass} onClick={onClick}>{children}</h5>;
    case 'h6':
      return <h6 className={textClass} onClick={onClick}>{children}</h6>;
    case 'span':
      return <span className={textClass} onClick={onClick}>{children}</span>;
    default:
      return <p className={textClass} onClick={onClick}>{children}</p>;
  }
};

export default Text;
