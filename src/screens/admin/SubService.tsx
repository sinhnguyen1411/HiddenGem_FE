import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Title, Text, Button, AdminStatsCard } from '../../components';
import './SubService.css';

interface SubServiceProps {
  className?: string;
}

interface ServiceType {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  itemCount: number;
  activeCount: number;
  isEnabled: boolean;
  lastUpdated: string;
}

const serviceTypes: ServiceType[] = [
  {
    id: 'service',
    title: 'Service',
    description: 'Manage your coffee shop services and offerings',
    icon: '☕',
    color: '#8B4513',
    itemCount: 12,
    activeCount: 8,
    isEnabled: true,
    lastUpdated: '2024-01-15T10:00:00Z'
  },
  {
    id: 'client',
    title: 'Client',
    description: 'Customer service and client management features',
    icon: '👥',
    color: '#4A90E2',
    itemCount: 6,
    activeCount: 4,
    isEnabled: true,
    lastUpdated: '2024-01-12T14:30:00Z'
  },
  {
    id: 'pay',
    title: 'Pay',
    description: 'Payment processing and billing options',
    icon: '💳',
    color: '#50C878',
    itemCount: 8,
    activeCount: 6,
    isEnabled: true,
    lastUpdated: '2024-01-10T09:15:00Z'
  },
  {
    id: 'parking',
    title: 'Parking',
    description: 'Parking facilities and management',
    icon: '🅿️',
    color: '#FF6B35',
    itemCount: 4,
    activeCount: 0,
    isEnabled: false,
    lastUpdated: '2024-01-08T16:45:00Z'
  },
  {
    id: 'amenities',
    title: 'Amenities',
    description: 'Additional facilities and services',
    icon: '🏪',
    color: '#9B59B6',
    itemCount: 10,
    activeCount: 7,
    isEnabled: true,
    lastUpdated: '2024-01-05T11:20:00Z'
  }
];

const SubService: React.FC<SubServiceProps> = ({ className = '' }) => {
  const navigate = useNavigate();

  const handleManageService = (serviceId: string) => {
    navigate(`/admin/introductions/${serviceId}/manage`);
  };

  const handleEditService = (serviceId: string) => {
    navigate(`/admin/introductions/${serviceId}/edit`);
  };

  const handleToggleService = (serviceId: string) => {
    console.log('Toggle service:', serviceId);
    // In a real app, this would make an API call
  };

  const getStatusBadge = (isEnabled: boolean) => {
    return (
      <span className={`sub-service__status-badge ${isEnabled ? 'sub-service__status-badge--active' : 'sub-service__status-badge--inactive'}`}>
        {isEnabled ? 'Active' : 'Inactive'}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Statistics
  const statsData = [
    {
      title: 'Total Services',
      value: serviceTypes.length.toString(),
      icon: '📋',
      trend: { value: 2, isPositive: true }
    },
    {
      title: 'Active Services',
      value: serviceTypes.filter(s => s.isEnabled).length.toString(),
      icon: '✅',
      trend: { value: 1, isPositive: true }
    },
    {
      title: 'Total Items',
      value: serviceTypes.reduce((sum, s) => sum + s.itemCount, 0).toString(),
      icon: '📝',
      trend: { value: 5, isPositive: true }
    },
    {
      title: 'Active Items',
      value: serviceTypes.reduce((sum, s) => sum + s.activeCount, 0).toString(),
      icon: '🎯',
      trend: { value: 3, isPositive: true }
    }
  ];

  return (
    <div className={`sub-service ${className}`}>
      <div className="sub-service__header">
        <div className="sub-service__header-left">
          <Title level="h1" size="xl" color="primary" className="sub-service__title">
            Service Management
          </Title>
          <Text variant="p" size="md" color="secondary" className="sub-service__description">
            Manage your coffee shop services and features
          </Text>
        </div>
        <div className="sub-service__header-right">
          <Button variant="secondary" size="md" onClick={() => navigate('/admin/introductions')}>
            Back
          </Button>
          <Button variant="primary" size="md" onClick={() => navigate('/admin/introductions/settings')}>
            Settings
          </Button>
        </div>
      </div>

      <div className="sub-service__stats">
        {statsData.map((stat, index) => (
          <AdminStatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
            className="sub-service__stat-card"
          />
        ))}
      </div>

      <div className="sub-service__content">
        <div className="sub-service__grid">
          {serviceTypes.map((serviceType) => (
            <div key={serviceType.id} className={`sub-service__card ${!serviceType.isEnabled ? 'sub-service__card--disabled' : ''}`}>
              <div className="sub-service__card-header">
                <div className="sub-service__card-icon" style={{ backgroundColor: serviceType.color }}>
                  {serviceType.icon}
                </div>
                <div className="sub-service__card-info">
                  <div className="sub-service__card-title-row">
                    <Title level="h3" size="md" color="primary" className="sub-service__card-title">
                      {serviceType.title}
                    </Title>
                    {getStatusBadge(serviceType.isEnabled)}
                  </div>
                  <Text variant="p" size="sm" color="secondary" className="sub-service__card-description">
                    {serviceType.description}
                  </Text>
                  <div className="sub-service__card-meta">
                    <Text variant="span" size="xs" color="muted">
                      {serviceType.activeCount}/{serviceType.itemCount} items active
                    </Text>
                    <Text variant="span" size="xs" color="muted">
                      • Updated {formatDate(serviceType.lastUpdated)}
                    </Text>
                  </div>
                </div>
              </div>

              <div className="sub-service__card-actions">
                <div className="sub-service__card-toggle">
                  <label className="sub-service__toggle">
                    <input
                      type="checkbox"
                      checked={serviceType.isEnabled}
                      onChange={() => handleToggleService(serviceType.id)}
                    />
                    <span className="sub-service__toggle-slider"></span>
                  </label>
                  <Text variant="span" size="xs" color="secondary">
                    {serviceType.isEnabled ? 'Enabled' : 'Disabled'}
                  </Text>
                </div>
                <div className="sub-service__card-buttons">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleManageService(serviceType.id)}
                    className="sub-service__manage-btn"
                  >
                    Manage
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditService(serviceType.id)}
                    className="sub-service__edit-btn"
                  >
                    Edit
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubService;
