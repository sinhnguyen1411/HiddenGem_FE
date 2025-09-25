import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Text from '../Text';
import './index.css';

interface AdminSidebarProps {
  className?: string;
}

interface NavItem {
  id: string;
  label: string;
  path: string;
  icon: string;
  children?: NavItem[];
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems: NavItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      path: '/admin/dashboard',
      icon: '📊'
    },
    {
      id: 'users',
      label: 'Users',
      path: '/admin/users',
      icon: '👥'
    },
    {
      id: 'coffee-shops',
      label: 'Stores',
      path: '/admin/stores',
      icon: '🏪'
    },
    {
      id: 'blogs',
      label: 'Blogs',
      path: '/admin/blogs',
      icon: '📝'
    },
    {
      id: 'banner',
      label: 'Banner',
      path: '/admin/banners',
      icon: '🖼️'
    },
    {
      id: 'content',
      label: 'Content',
      path: '/admin/content',
      icon: '📝'
    }
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const isActiveRoute = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className={`admin-sidebar ${className}`}>
      <div className="admin-sidebar__header">
        <div className="admin-sidebar__logo">
          <Text variant="h2" size="lg" color="primary" className="admin-sidebar__logo-text">
            ☕ Admin
          </Text>
        </div>
      </div>

      <nav className="admin-sidebar__nav">
        <ul className="admin-sidebar__nav-list">
          {navigationItems.map((item) => (
            <li key={item.id} className="admin-sidebar__nav-item">
              <button
                className={`admin-sidebar__nav-link ${
                  isActiveRoute(item.path) ? 'admin-sidebar__nav-link--active' : ''
                }`}
                onClick={() => handleNavigation(item.path)}
              >
                <span className="admin-sidebar__nav-icon">{item.icon}</span>
                <Text 
                  variant="span" 
                  size="md" 
                  color={isActiveRoute(item.path) ? 'primary' : 'secondary'}
                  className="admin-sidebar__nav-text"
                >
                  {item.label}
                </Text>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="admin-sidebar__footer">
        <Text variant="p" size="sm" color="muted" className="admin-sidebar__version">
          v1.0.0
        </Text>
      </div>
    </div>
  );
};

export default AdminSidebar;
