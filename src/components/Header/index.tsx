import React from 'react';
import { useLocation } from 'react-router-dom';
import TopSettings from './TopSettings';
import NavBar from './NavBar';
import MainMenu from './MainMenu';
import './index.css';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  
  if (isAuthPage) {
    return null; // Don't show navigation on auth pages
  }
  
  return (
    <header className={`header ${className}`}>
      <MainMenu />
      <NavBar />
    </header>
  );
};

export default Header;
