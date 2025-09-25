import React from 'react';
import './index.css';

interface LinkProps {
  children: React.ReactNode;
  href?: string;
  variant?: 'default' | 'primary' | 'secondary' | 'muted';
  size?: 'sm' | 'md' | 'lg';
  underline?: boolean;
  external?: boolean;
  className?: string;
  onClick?: () => void;
}

const Link: React.FC<LinkProps> = ({
  children,
  href,
  variant = 'default',
  size = 'md',
  underline = false,
  external = false,
  className = '',
  onClick,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  const linkProps = {
    href: href || '#',
    className: `link link--${variant} link--${size} ${underline ? 'link--underline' : ''} ${className}`,
    onClick: handleClick,
    ...(external && { target: '_blank', rel: 'noopener noreferrer' }),
  };

  return <a {...linkProps}>{children}</a>;
};

export default Link;
