import React, { createContext, useContext, useRef } from 'react';
import LoadingModal, { LoadingModalRef } from '../LoadingModal';

interface LoadingContextValue {
  showLoading: (message?: string) => void;
  hideLoading: () => void;
}

const LoadingContext = createContext<LoadingContextValue | undefined>(undefined);

interface LoadingProviderProps {
  children: React.ReactNode;
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
  const loadingModalRef = useRef<LoadingModalRef>(null);

  const showLoading = (message?: string) => {
    loadingModalRef.current?.show(message);
  };

  const hideLoading = () => {
    loadingModalRef.current?.hide();
  };

  const value: LoadingContextValue = {
    showLoading,
    hideLoading
  };

  return (
    <LoadingContext.Provider value={value}>
      {children}
      <LoadingModal ref={loadingModalRef} />
    </LoadingContext.Provider>
  );
};

export const useLoading = (): LoadingContextValue => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};
