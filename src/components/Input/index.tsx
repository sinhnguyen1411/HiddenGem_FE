import React, { forwardRef } from 'react';
import './index.css';

interface InputProps {
  type?: 'text' | 'email' | 'password' | 'tel' | 'number' | 'search';
  placeholder?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  name?: string;
  id?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  error?: string;
  success?: boolean;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconClick?: () => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  type = 'text',
  placeholder,
  value,
  onChange,
  onFocus,
  onBlur,
  name,
  id,
  required = false,
  disabled = false,
  readOnly = false,
  error,
  success = false,
  size = 'md',
  fullWidth = false,
  className = '',
  leftIcon,
  rightIcon,
  onRightIconClick,
}, ref) => {
  return (
    <div className={`input-wrapper ${fullWidth ? 'input-wrapper--full-width' : ''} ${className}`}>
      <div className={`input-container input-container--${size} ${error ? 'input-container--error' : ''} ${success ? 'input-container--success' : ''}`}>
        {leftIcon && (
          <span className="input__icon input__icon--left">{leftIcon}</span>
        )}
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          name={name}
          id={id}
          required={required}
          disabled={disabled}
          readOnly={readOnly}
          className={`input input--${size}`}
        />
        {rightIcon && (
          <span 
            className={`input__icon input__icon--right ${onRightIconClick ? 'input__icon--clickable' : ''}`}
            onClick={onRightIconClick}
          >
            {rightIcon}
          </span>
        )}
      </div>
      {error && (
        <div className="input__error">{error}</div>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
