import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Title, Text, Button, Input, AdminStatsCard, AdminTable } from '../../components';
import './ParkingManage.css';

interface ParkingManageProps {
  className?: string;
}

interface ParkingItem {
  id: number;
  title: string;
  description: string;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

const parkingItems: ParkingItem[] = [
  {
    id: 1,
    title: 'Valet Parking',
    description: 'Full-service valet parking for customers',
    isAvailable: false,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 2,
    title: 'Self Parking',
    description: 'Customer self-parking area with designated spots',
    isAvailable: false,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 3,
    title: 'Reserved Spots',
    description: 'Pre-booked parking spaces for regular customers',
    isAvailable: false,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 4,
    title: 'Street Parking',
    description: 'Metered street parking available nearby',
    isAvailable: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 5,
    title: 'Bike Racks',
    description: 'Secure bicycle parking for eco-friendly customers',
    isAvailable: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 6,
    title: 'Handicap Accessible',
    description: 'Accessible parking spaces for customers with disabilities',
    isAvailable: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  }
];

const statusOptions = ['All', 'Available', 'Unavailable'];

const ParkingManage: React.FC<ParkingManageProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('title-asc');
  
  // Filter and sort parking options
  const filteredAndSortedParking = useMemo(() => {
    let filtered = parkingItems.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All' || 
                           (statusFilter === 'Available' && item.isAvailable) ||
                           (statusFilter === 'Unavailable' && !item.isAvailable);
      
      return matchesSearch && matchesStatus;
    });

    // Sort parking options
    filtered.sort((a, b) => {
      const [sortKey, direction] = sortBy.split('-');
      const isAsc = direction === 'asc';
      
      let aValue: any = a[sortKey as keyof ParkingItem];
      let bValue: any = b[sortKey as keyof ParkingItem];
      
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
      title: 'Total Options',
      value: parkingItems.length.toString(),
      icon: '🅿️',
      trend: { value: 0, isPositive: true }
    },
    {
      title: 'Available',
      value: parkingItems.filter(item => item.isAvailable).length.toString(),
      icon: '✅',
      trend: { value: 0, isPositive: true }
    },
    {
      title: 'Unavailable',
      value: parkingItems.filter(item => !item.isAvailable).length.toString(),
      icon: '❌',
      trend: { value: 0, isPositive: false }
    },
    {
      title: 'Recently Added',
      value: parkingItems.filter(item => {
        const daysDiff = (new Date().getTime() - new Date(item.createdAt).getTime()) / (1000 * 60 * 60 * 24);
        return daysDiff <= 7;
      }).length.toString(),
      icon: '🆕',
      trend: { value: 0, isPositive: true }
    }
  ];

  const handleViewParking = (parking: ParkingItem) => {
    navigate(`/admin/introductions/parking/${parking.id}`);
  };

  const handleEditParking = (parking: ParkingItem) => {
    navigate(`/admin/introductions/parking/${parking.id}/edit`);
  };

  const handleDeleteParking = (parking: ParkingItem) => {
    if (window.confirm(`Are you sure you want to delete "${parking.title}"?`)) {
      console.log('Delete parking option:', parking.id);
      // In a real app, this would make an API call
    }
  };

  const handleAddParking = () => {
    navigate('/admin/introductions/parking/new');
  };

  const getStatusBadge = (isAvailable: boolean) => {
    return (
      <span className={`parking-manage__status-badge ${isAvailable ? 'parking-manage__status-badge--available' : 'parking-manage__status-badge--unavailable'}`}>
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
      label: 'Parking Option',
      sortable: true,
      width: '300px',
      render: (value: string, item: ParkingItem) => (
        <div className="parking-manage__parking-info">
          <Text variant="p" size="sm" color="primary" className="parking-manage__parking-title">
            {value}
          </Text>
          <Text variant="p" size="xs" color="muted" className="parking-manage__parking-description">
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
    <div className={`parking-manage ${className}`}>
      <div className="parking-manage__header">
        <div className="parking-manage__header-left">
          <Title level="h1" size="xl" color="primary" className="parking-manage__title">
            Parking Management
          </Title>
          <Text variant="p" size="md" color="secondary" className="parking-manage__subtitle">
            Manage parking facilities and options for customers
          </Text>
        </div>
        <div className="parking-manage__header-right">
          <Button variant="secondary" size="md" onClick={() => navigate('/admin/introductions')}>
            Back
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={handleAddParking}
            className="parking-manage__add-btn"
          >
            + Add Option
          </Button>
        </div>
      </div>

      <div className="parking-manage__stats">
        {statsData.map((stat, index) => (
          <AdminStatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
            className="parking-manage__stat-card"
          />
        ))}
      </div>

      <div className="parking-manage__filters">
        <div className="parking-manage__filter-group">
          <Input
            type="text"
            placeholder="Search parking options..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="parking-manage__search-input"
          />
        </div>
        
        <div className="parking-manage__filter-group">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="parking-manage__filter-select"
          >
            {statusOptions.map(status => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className="parking-manage__filter-group">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="parking-manage__filter-select"
          >
            <option value="title-asc">Title A-Z</option>
            <option value="title-desc">Title Z-A</option>
            <option value="updatedAt-desc">Recently Updated</option>
            <option value="updatedAt-asc">Oldest Updated</option>
          </select>
        </div>
      </div>

      <div className="parking-manage__table-section">
        <AdminTable
          data={filteredAndSortedParking}
          columns={tableColumns}
          onView={handleViewParking}
          onEdit={handleEditParking}
          onDelete={handleDeleteParking}
          emptyMessage="No parking options found matching your criteria"
        />
      </div>
    </div>
  );
};

export default ParkingManage;
