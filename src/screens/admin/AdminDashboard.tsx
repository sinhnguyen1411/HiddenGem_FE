import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Title, Text, Button, AdminStatsCard } from '../../components';
import { adminService } from '../../services/admin';
import './AdminDashboard.css';

interface AdminDashboardProps {
  className?: string;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch dashboard data function
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Try to fetch from admin dashboard first
      try {
        const response = await adminService.dashboard();
        console.log('Admin dashboard API response:', response.data);
        setDashboardData(response.data);
      } catch (adminError) {
        console.warn('Admin dashboard API failed, trying alternative approach:', adminError);
        
        // If admin dashboard fails, we can try to get data from other sources
        // For now, we'll set some default data structure
        setDashboardData({
          users: 0,
          shops: 0,
          stores: 0,
          reviews: 0,
          vouchers: 0,
          promos: 0
        });
      }
    } catch (err) {
      setError('Failed to load dashboard data');
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch dashboard data on component mount
  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Fetch data when component comes into focus
  useEffect(() => {
    const handleFocus = () => {
      fetchDashboardData();
    };

    window.addEventListener('focus', handleFocus);
    fetchDashboardData();

    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  // Format numbers with commas
  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  // Generate stats data from API response - only show available data
  const generateStatsData = () => {
    if (!dashboardData) return [];
    
    const stats = [];
    
    // Only add stats for data that exists and is not null/undefined
    if (typeof dashboardData.users === 'number') {
      stats.push({
        title: 'Total Users',
        value: formatNumber(dashboardData.users),
        icon: '👥',
        trend: { value: 12, isPositive: true }
      });
    }
    
    if (typeof dashboardData.shops === 'number') {
      stats.push({
        title: 'Coffee Shops',
        value: formatNumber(dashboardData.shops),
        icon: '🏪',
        trend: { value: 5, isPositive: true }
      });
    }
    
    if (typeof dashboardData.stores === 'number') {
      stats.push({
        title: 'Stores',
        value: formatNumber(dashboardData.stores),
        icon: '🏬',
        trend: { value: 3, isPositive: true }
      });
    }
    
    if (typeof dashboardData.reviews === 'number') {
      stats.push({
        title: 'Reviews',
        value: formatNumber(dashboardData.reviews),
        icon: '💬',
        trend: { value: 8, isPositive: true }
      });
    }
    
    if (typeof dashboardData.vouchers === 'number') {
      stats.push({
        title: 'Vouchers',
        value: formatNumber(dashboardData.vouchers),
        icon: '🎫',
        trend: { value: 2, isPositive: true }
      });
    }
    
    if (typeof dashboardData.promos === 'number') {
      stats.push({
        title: 'Promotions',
        value: formatNumber(dashboardData.promos),
        icon: '🎯',
        trend: { value: 4, isPositive: true }
      });
    }
    
    // Add any additional fields that might be in the API response
    Object.keys(dashboardData).forEach(key => {
      if (typeof dashboardData[key] === 'number' && !['users', 'shops', 'stores', 'reviews', 'vouchers', 'promos'].includes(key)) {
        stats.push({
          title: key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' '),
          value: formatNumber(dashboardData[key]),
          icon: '📊',
          trend: { value: 0, isPositive: true }
        });
      }
    });
    
    return stats;
  };

  const statsData = generateStatsData();

  const quickActions = [
    { label: 'Manage Stores', path: '/admin/stores', icon: '🏪' },
    { label: 'Manage Promotions', path: '/admin/store/promotion/manage', icon: '🎯' },
    { label: 'Manage Users', path: '/admin/users', icon: '👥' },
    { label: 'Manage Banners', path: '/admin/banners', icon: '📢' }
  ];

  const handleQuickAction = (path: string) => {
    navigate(path);
  };

  if (loading) {
    return (
      <div className={`admin-dashboard ${className}`}>
        <div className="admin-dashboard__loading">
          <Text>Loading dashboard data...</Text>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`admin-dashboard ${className}`}>
        <div className="admin-dashboard__error">
          <Title level="h1" size="lg" color="primary">
            {error}
          </Title>
          <Button
            variant="primary"
            size="md"
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`admin-dashboard ${className}`}>
      <div className="admin-dashboard__welcome">
        <div className="admin-dashboard__welcome-content">
          <Title level="h1" size="xl" color="primary" className="admin-dashboard__title">
            Welcome back, Admin! 👋
          </Title>
          <Text variant="p" size="md" color="secondary" className="admin-dashboard__subtitle">
            Here's what's happening with your coffee shop platform today.
          </Text>
        </div>
        <div className="admin-dashboard__welcome-actions">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchDashboardData}
            disabled={loading}
            className="admin-dashboard__refresh-btn"
          >
            {loading ? 'Refreshing...' : 'Refresh Data'}
          </Button>
        </div>
      </div>

      <div className="admin-dashboard__stats">
        {statsData.length > 0 ? (
          statsData.map((stat, index) => (
            <AdminStatsCard
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              trend={stat.trend}
              className="admin-dashboard__stat-card"
            />
          ))
        ) : (
          <div className="admin-dashboard__no-stats">
            <Text variant="p" size="md" color="secondary">
              No dashboard data available. Check console for API response details.
            </Text>
          </div>
        )}
      </div>

      {/* Debug section - only show in development */}
      {process.env.NODE_ENV === 'development' && dashboardData && (
        <div className="admin-dashboard__debug">
          <Title level="h3" size="md" color="primary" className="admin-dashboard__debug-title">
            Debug: Available API Data
          </Title>
          <div className="admin-dashboard__debug-content">
            <pre className="admin-dashboard__debug-json">
              {JSON.stringify(dashboardData, null, 2)}
            </pre>
          </div>
        </div>
      )}

      <div className="admin-dashboard__sections">
        <div className="admin-dashboard__section">
          <Title level="h2" size="lg" color="primary" className="admin-dashboard__section-title">
            Quick Actions
          </Title>
          <Text variant="p" size="md" color="secondary" className="admin-dashboard__section-description">
            Manage your platform efficiently with these quick access tools.
          </Text>
          <div className="admin-dashboard__actions-grid">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="primary"
                size="lg"
                onClick={() => handleQuickAction(action.path)}
                className="admin-dashboard__action-btn"
              >
                <span className="admin-dashboard__action-icon">{action.icon}</span>
                {action.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="admin-dashboard__section">
          <Title level="h2" size="lg" color="primary" className="admin-dashboard__section-title">
            Recent Activity
          </Title>
          <Text variant="p" size="md" color="secondary" className="admin-dashboard__section-description">
            Latest updates and activities on your platform.
          </Text>
          <div className="admin-dashboard__activity-list">
            <div className="admin-dashboard__activity-item">
              <div className="admin-dashboard__activity-icon">🆕</div>
              <div className="admin-dashboard__activity-content">
                <Text variant="p" size="sm" color="primary" className="admin-dashboard__activity-text">
                  New coffee shop "Brew & Beans" registered
                </Text>
                <Text variant="p" size="xs" color="secondary" className="admin-dashboard__activity-time">
                  2 hours ago
                </Text>
              </div>
            </div>
            <div className="admin-dashboard__activity-item">
              <div className="admin-dashboard__activity-icon">⭐</div>
              <div className="admin-dashboard__activity-content">
                <Text variant="p" size="sm" color="primary" className="admin-dashboard__activity-text">
                  5 new reviews received for "Coffee Corner"
                </Text>
                <Text variant="p" size="xs" color="secondary" className="admin-dashboard__activity-time">
                  4 hours ago
                </Text>
              </div>
            </div>
            <div className="admin-dashboard__activity-item">
              <div className="admin-dashboard__activity-icon">🎯</div>
              <div className="admin-dashboard__activity-content">
                <Text variant="p" size="sm" color="primary" className="admin-dashboard__activity-text">
                  "Summer Special" promotion created
                </Text>
                <Text variant="p" size="xs" color="secondary" className="admin-dashboard__activity-time">
                  6 hours ago
                </Text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
