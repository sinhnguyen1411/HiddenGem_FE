import React, { forwardRef, useImperativeHandle, useState } from 'react';
import './index.css';

interface LoadingModalProps {
  className?: string;
}

export interface LoadingModalRef {
  show: (message?: string) => void;
  hide: () => void;
}

const LoadingModal = forwardRef<LoadingModalRef, LoadingModalProps>(({ 
  className = '' 
}, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('Loading...');

  useImperativeHandle(ref, () => ({
    show: (newMessage?: string) => {
      if (newMessage) {
        setMessage(newMessage);
      }
      setIsOpen(true);
    },
    hide: () => {
      setIsOpen(false);
    }
  }));

  if (!isOpen) return null;

  return (
    <div className={`loading-modal ${className}`}>
      <div className="loading-modal__overlay">
        <div className="loading-modal__content">
          <div className="loading-modal__spinner">
            <div className="loading-modal__spinner-circle"></div>
          </div>
          <p className="loading-modal__message">{message}</p>
        </div>
      </div>
    </div>
  );
});

LoadingModal.displayName = 'LoadingModal';

export default LoadingModal;
