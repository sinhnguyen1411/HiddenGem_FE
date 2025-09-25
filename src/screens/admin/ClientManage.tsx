import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Title, Text, Button, Input, AdminStatsCard, AdminTable } from '../../components';
import './ClientManage.css';

interface ClientManageProps {
  className?: string;
}

interface ClientItem {
  id: number;
  title: string;
  description: string;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

const clientItems: ClientItem[] = [
  {
    id: 1,
    title: 'Loyalty Program',
    description: 'Points-based rewards system for regular customers',
    isAvailable: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 2,
    title: 'Reservations',
    description: 'Table booking system for customers',
    isAvailable: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 3,
    title: 'Feedback System',
    description: 'Customer review and feedback collection',
    isAvailable: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 4,
    title: 'Notifications',
    description: 'SMS and email alerts for customers',
    isAvailable: false,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 5,
    title: 'Customer Support',
    description: 'Live chat and phone support for customers',
    isAvailable: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 6,
    title: 'Membership Benefits',
    description: 'Exclusive perks and discounts for members',
    isAvailable: false,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  }
];

const statusOptions = ['All', 'Available', 'Unavailable'];

const ClientManage: React.FC<ClientManageProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('title-asc');
  
  // Filter and sort clients
  const filteredAndSortedClients = useMemo(() => {
    let filtered = clientItems.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All' || 
                           (statusFilter === 'Available' && item.isAvailable) ||
                           (statusFilter === 'Unavailable' && !item.isAvailable);
      
      return matchesSearch && matchesStatus;
    });

    // Sort clients
    filtered.sort((a, b) => {
      const [sortKey, direction] = sortBy.split('-');
      const isAsc = direction === 'asc';
      
      let aValue: any = a[sortKey as keyof ClientItem];
      let bValue: any = b[sortKey as keyof ClientItem];
      
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
      title: 'Total Features',
      value: clientItems.length.toString(),
      icon: '👥',
      trend: { value: 1, isPositive: true }
    },
    {
      title: 'Available',
      value: clientItems.filter(item => item.isAvailable).length.toString(),
      icon: '✅',
      trend: { value: 1, isPositive: true }
    },
    {
      title: 'Unavailable',
      value: clientItems.filter(item => !item.isAvailable).length.toString(),
      icon: '❌',
      trend: { value: 0, isPositive: false }
    },
    {
      title: 'Recently Added',
      value: clientItems.filter(item => {
        const daysDiff = (new Date().getTime() - new Date(item.createdAt).getTime()) / (1000 * 60 * 60 * 24);
        return daysDiff <= 7;
      }).length.toString(),
      icon: '🆕',
      trend: { value: 2, isPositive: true }
    }
  ];

  const handleViewClient = (client: ClientItem) => {
    navigate(`/admin/introductions/client/${client.id}`);
  };

  const handleEditClient = (client: ClientItem) => {
    navigate(`/admin/introductions/client/${client.id}/edit`);
  };

  const handleDeleteClient = (client: ClientItem) => {
    if (window.confirm(`Are you sure you want to delete "${client.title}"?`)) {
      console.log('Delete client:', client.id);
      // In a real app, this would make an API call
    }
  };

  const handleAddClient = () => {
    navigate('/admin/introductions/client/new');
  };

  const getStatusBadge = (isAvailable: boolean) => {
    return (
      <span className={`client-manage__status-badge ${isAvailable ? 'client-manage__status-badge--available' : 'client-manage__status-badge--unavailable'}`}>
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
      label: 'Feature Title',
      sortable: true,
      width: '300px',
      render: (value: string, item: ClientItem) => (
        <div className="client-manage__client-info">
          <Text variant="p" size="sm" color="primary" className="client-manage__client-title">
            {value}
          </Text>
          <Text variant="p" size="xs" color="muted" className="client-manage__client-description">
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
    <div className={`client-manage ${className}`}>
      <div className="client-manage__header">
        <div className="client-manage__header-left">
          <Title level="h1" size="xl" color="primary" className="client-manage__title">
            Client Management
          </Title>
          <Text variant="p" size="md" color="secondary" className="client-manage__subtitle">
            Manage customer service and client management features
          </Text>
        </div>
        <div className="client-manage__header-right">
          <Button variant="secondary" size="md" onClick={() => navigate('/admin/introductions')}>
            Back
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={handleAddClient}
            className="client-manage__add-btn"
          >
            + Add Feature
          </Button>
        </div>
      </div>

      <div className="client-manage__stats">
        {statsData.map((stat, index) => (
          <AdminStatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
            className="client-manage__stat-card"
          />
        ))}
      </div>

      <div className="client-manage__filters">
        <div className="client-manage__filter-group">
          <Input
            type="text"
            placeholder="Search features..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="client-manage__search-input"
          />
        </div>
        
        <div className="client-manage__filter-group">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="client-manage__filter-select"
          >
            {statusOptions.map(status => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className="client-manage__filter-group">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="client-manage__filter-select"
          >
            <option value="title-asc">Title A-Z</option>
            <option value="title-desc">Title Z-A</option>
            <option value="updatedAt-desc">Recently Updated</option>
            <option value="updatedAt-asc">Oldest Updated</option>
          </select>
        </div>
      </div>

      <div className="client-manage__table-section">
        <AdminTable
          data={filteredAndSortedClients}
          columns={tableColumns}
          onView={handleViewClient}
          onEdit={handleEditClient}
          onDelete={handleDeleteClient}
          emptyMessage="No client features found matching your criteria"
        />
      </div>
    </div>
  );
};

export default ClientManage;
