import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Title, Text, Button, Input, AdminStatsCard, AdminTable } from '../../components';
import './ServiceManage.css';

interface ServiceManageProps {
  className?: string;
}

interface ServiceItem {
  id: number;
  title: string;
  description: string;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

const serviceItems: ServiceItem[] = [
  {
    id: 1,
    title: 'Espresso',
    description: 'Single or double shot espresso',
    isAvailable: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 2,
    title: 'Latte',
    description: 'Espresso with steamed milk',
    isAvailable: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 3,
    title: 'Cappuccino',
    description: 'Espresso with equal parts steamed milk and foam',
    isAvailable: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 4,
    title: 'Americano',
    description: 'Espresso with hot water',
    isAvailable: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 5,
    title: 'Cold Brew',
    description: 'Slow-steeped cold coffee',
    isAvailable: false,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 6,
    title: 'Croissant',
    description: 'Fresh baked buttery croissant',
    isAvailable: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 7,
    title: 'Muffin',
    description: 'Blueberry or chocolate chip muffin',
    isAvailable: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 8,
    title: 'Sandwich',
    description: 'Grilled chicken or turkey sandwich',
    isAvailable: false,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  }
];

const statusOptions = ['All', 'Available', 'Unavailable'];

const ServiceManage: React.FC<ServiceManageProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('title-asc');
  
  // Filter and sort services
  const filteredAndSortedServices = useMemo(() => {
    let filtered = serviceItems.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All' || 
                           (statusFilter === 'Available' && item.isAvailable) ||
                           (statusFilter === 'Unavailable' && !item.isAvailable);
      
      return matchesSearch && matchesStatus;
    });

    // Sort services
    filtered.sort((a, b) => {
      const [sortKey, direction] = sortBy.split('-');
      const isAsc = direction === 'asc';
      
      let aValue: any = a[sortKey as keyof ServiceItem];
      let bValue: any = b[sortKey as keyof ServiceItem];
      
      if (sortKey === 'createdAt' || sortKey === 'updatedAt') {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }
      
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (isAsc) {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [searchTerm, statusFilter, sortBy]);

  // Statistics
  const statsData = [
    {
      title: 'Total Services',
      value: serviceItems.length.toString(),
      icon: '☕',
      trend: { value: 2, isPositive: true }
    },
    {
      title: 'Available',
      value: serviceItems.filter(item => item.isAvailable).length.toString(),
      icon: '✅',
      trend: { value: 1, isPositive: true }
    },
    {
      title: 'Unavailable',
      value: serviceItems.filter(item => !item.isAvailable).length.toString(),
      icon: '❌',
      trend: { value: 0, isPositive: false }
    },
    {
      title: 'Recently Added',
      value: serviceItems.filter(item => {
        const daysDiff = (new Date().getTime() - new Date(item.createdAt).getTime()) / (1000 * 60 * 60 * 24);
        return daysDiff <= 7;
      }).length.toString(),
      icon: '🆕',
      trend: { value: 1, isPositive: true }
    }
  ];

  const handleViewService = (service: ServiceItem) => {
    navigate(`/admin/introductions/service/${service.id}`);
  };

  const handleEditService = (service: ServiceItem) => {
    navigate(`/admin/introductions/service/${service.id}/edit`);
  };

  const handleDeleteService = (service: ServiceItem) => {
    if (window.confirm(`Are you sure you want to delete "${service.title}"?`)) {
      console.log('Delete service:', service.id);
      // In a real app, this would make an API call
    }
  };

  const handleAddService = () => {
    navigate('/admin/introductions/service/new');
  };

  const getStatusBadge = (isAvailable: boolean) => {
    return (
      <span className={`service-manage__status-badge ${isAvailable ? 'service-manage__status-badge--available' : 'service-manage__status-badge--unavailable'}`}>
        {isAvailable ? 'Available' : 'Unavailable'}
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

  const tableColumns = [
    {
      key: 'title',
      label: 'Service Title',
      sortable: true,
      width: '300px',
      render: (value: string, item: ServiceItem) => (
        <div className="service-manage__service-info">
          <Text variant="p" size="sm" color="primary" className="service-manage__service-title">
            {value}
          </Text>
          <Text variant="p" size="xs" color="muted" className="service-manage__service-description">
            {item.description}
          </Text>
        </div>
      )
    },
    {
      key: 'isAvailable',
      label: 'Status',
      width: '120px',
      render: (value: boolean) => getStatusBadge(value)
    },
    {
      key: 'updatedAt',
      label: 'Updated',
      sortable: true,
      width: '120px',
      render: (value: string) => (
        <Text variant="span" size="sm" color="muted">
          {formatDate(value)}
        </Text>
      )
    }
  ];

  return (
    <div className={`service-manage ${className}`}>
      <div className="service-manage__header">
        <div className="service-manage__header-left">
          <Title level="h1" size="xl" color="primary" className="service-manage__title">
            Service Management
          </Title>
          <Text variant="p" size="md" color="secondary" className="service-manage__subtitle">
            Manage your coffee shop services and offerings
          </Text>
        </div>
        <div className="service-manage__header-right">
          <Button variant="secondary" size="md" onClick={() => navigate('/admin/introductions')}>
            Back
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={handleAddService}
            className="service-manage__add-btn"
          >
            + Add Service
          </Button>
        </div>
      </div>

      <div className="service-manage__stats">
        {statsData.map((stat, index) => (
          <AdminStatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
            className="service-manage__stat-card"
          />
        ))}
      </div>

      <div className="service-manage__filters">
        <div className="service-manage__filter-group">
          <Input
            type="text"
            placeholder="Search services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="service-manage__search-input"
          />
        </div>
        
        <div className="service-manage__filter-group">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="service-manage__filter-select"
          >
            {statusOptions.map(status => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className="service-manage__filter-group">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="service-manage__filter-select"
          >
            <option value="title-asc">Title A-Z</option>
            <option value="title-desc">Title Z-A</option>
            <option value="updatedAt-desc">Recently Updated</option>
            <option value="updatedAt-asc">Oldest Updated</option>
          </select>
        </div>
      </div>

      <div className="service-manage__table-section">
        <AdminTable
          data={filteredAndSortedServices}
          columns={tableColumns}
          onView={handleViewService}
          onEdit={handleEditService}
          onDelete={handleDeleteService}
          emptyMessage="No services found matching your criteria"
        />
      </div>
    </div>
  );
};

export default ServiceManage;
