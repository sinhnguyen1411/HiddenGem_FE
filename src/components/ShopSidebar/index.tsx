import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Text } from '../';
import './index.css';

interface ShopSidebarProps {
  className?: string;
}

interface MenuItem {
  id: string;
  label: string;
  icon?: string;
  path?: string;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: '📊',
    path: '/admin/dashboard'
  },
  // {
  //   id: 'introductions',
  //   label: 'Introductions',
  //   icon: '📝',
  //   children: [
  //     { id: 'introductions-service', label: 'Service', path: '/admin/introductions/service/manage' },
  //     { id: 'introductions-client', label: 'Client', path: '/admin/introductions/client/manage' },
  //     { id: 'introductions-pay', label: 'Pay', path: '/admin/introductions/pay/manage' },
  //     { id: 'introductions-parking', label: 'Parking', path: '/admin/introductions/parking/manage' },
  //     { id: 'introductions-amenities', label: 'Amenities', path: '/admin/introductions/amenities/manage' }
  //   ]
  // },
  {
    id: 'store',
    label: 'Store',
    icon: '🏪',
    children: [
      // { id: 'store-menu', label: 'Menu', path: '/admin/store/menu/manage' },
      // { id: 'store-category', label: 'Category', path: '/admin/store/category/manage' },
      { id: 'store-review', label: 'Review', path: '/admin/store/review/manage' },
      { id: 'store-promotion', label: 'Promotion Program', path: '/admin/store/promotion/manage' }
    ]
  }
];

const ShopSidebar: React.FC<ShopSidebarProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>(['introductions', 'store']);

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleItemClick = (item: MenuItem) => {
    if (item.path) {
      navigate(item.path);
    } else if (item.children) {
      toggleExpanded(item.id);
    }
  };

  const isActive = (item: MenuItem): boolean => {
    if (item.path) {
      return location.pathname === item.path;
    }
    if (item.children) {
      return item.children.some(child => child.path === location.pathname);
    }
    return false;
  };

  const renderMenuItem = (item: MenuItem, level: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.id);
    const active = isActive(item);

    return (
      <div key={item.id} className={`shop-sidebar__item shop-sidebar__item--level-${level}`}>
        <button
          className={`shop-sidebar__item-button ${active ? 'shop-sidebar__item-button--active' : ''}`}
          onClick={() => handleItemClick(item)}
        >
          <span className="shop-sidebar__item-icon">{item.icon}</span>
          <Text variant="span" size="sm" color={active ? 'primary' : 'secondary'} className="shop-sidebar__item-label">
            {item.label}
          </Text>
          {hasChildren && (
            <span className={`shop-sidebar__item-arrow ${isExpanded ? 'shop-sidebar__item-arrow--expanded' : ''}`}>
              ▼
            </span>
          )}
        </button>
        
        {hasChildren && isExpanded && (
          <div className="shop-sidebar__submenu">
            {item.children!.map(child => renderMenuItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <aside className={`shop-sidebar ${className}`}>
      <div className="shop-sidebar__header">
        <div className="shop-sidebar__logo">
          <div className="shop-sidebar__logo-icon">☕</div>
          <Text variant="span" size="md" color="primary" className="shop-sidebar__logo-text">
            Hidden Gems
          </Text>
        </div>
        <Text variant="p" size="xs" color="secondary" className="shop-sidebar__subtitle">
          Shop Portal
        </Text>
      </div>

      <nav className="shop-sidebar__nav">
        <div className="shop-sidebar__menu">
          {menuItems.map(item => renderMenuItem(item))}
        </div>
      </nav>

      <div className="shop-sidebar__footer">
        <Text variant="p" size="xs" color="muted" className="shop-sidebar__footer-text">
          © 2024 Hidden Gems
        </Text>
      </div>
    </aside>
  );
};

export default ShopSidebar;
