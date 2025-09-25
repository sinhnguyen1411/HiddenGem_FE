import React from 'react';
import './index.css';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
  fullWidth = false,
  onClick,
  className = '',
  icon,
  iconPosition = 'left',
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`button button--${variant} button--${size} ${fullWidth ? 'button--full-width' : ''} ${className}`}
    >
      {icon && iconPosition === 'left' && (
        <span className="button__icon button__icon--left">{icon}</span>
      )}
      <span className="button__content">{children}</span>
      {icon && iconPosition === 'right' && (
        <span className="button__icon button__icon--right">{icon}</span>
      )}
    </button>
  );
};

export default Button;
