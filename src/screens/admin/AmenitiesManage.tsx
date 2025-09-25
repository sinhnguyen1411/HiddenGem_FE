import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Title, Text, Button, Input, AdminStatsCard, AdminTable } from '../../components';
import './AmenitiesManage.css';

interface AmenitiesManageProps {
  className?: string;
}

interface AmenityItem {
  id: number;
  title: string;
  description: string;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

const amenityItems: AmenityItem[] = [
  {
    id: 1,
    title: 'Free WiFi',
    description: 'Complimentary high-speed internet access for customers',
    isAvailable: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 2,
    title: 'Outdoor Seating',
    description: 'Patio and outdoor tables for al fresco dining',
    isAvailable: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 3,
    title: 'Meeting Room',
    description: 'Private space for meetings and small events',
    isAvailable: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 4,
    title: 'Pet Friendly',
    description: 'Welcome to bring well-behaved pets',
    isAvailable: false,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 5,
    title: 'Power Outlets',
    description: 'Convenient charging stations for laptops and devices',
    isAvailable: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 6,
    title: 'Air Conditioning',
    description: 'Climate-controlled environment for comfort',
    isAvailable: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 7,
    title: 'Live Music',
    description: 'Occasional live performances and acoustic sessions',
    isAvailable: false,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 8,
    title: 'Kids Play Area',
    description: 'Designated space for children to play safely',
    isAvailable: false,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  }
];

const statusOptions = ['All', 'Available', 'Unavailable'];

const AmenitiesManage: React.FC<AmenitiesManageProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('title-asc');
  
  // Filter and sort amenities
  const filteredAndSortedAmenities = useMemo(() => {
    let filtered = amenityItems.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All' || 
                           (statusFilter === 'Available' && item.isAvailable) ||
                           (statusFilter === 'Unavailable' && !item.isAvailable);
      
      return matchesSearch && matchesStatus;
    });

    // Sort amenities
    filtered.sort((a, b) => {
      const [sortKey, direction] = sortBy.split('-');
      const isAsc = direction === 'asc';
      
      let aValue: any = a[sortKey as keyof AmenityItem];
      let bValue: any = b[sortKey as keyof AmenityItem];
      
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
      title: 'Total Amenities',
      value: amenityItems.length.toString(),
      icon: '🏪',
      trend: { value: 2, isPositive: true }
    },
    {
      title: 'Available',
      value: amenityItems.filter(item => item.isAvailable).length.toString(),
      icon: '✅',
      trend: { value: 1, isPositive: true }
    },
    {
      title: 'Unavailable',
      value: amenityItems.filter(item => !item.isAvailable).length.toString(),
      icon: '❌',
      trend: { value: 1, isPositive: false }
    },
    {
      title: 'Recently Added',
      value: amenityItems.filter(item => {
        const daysDiff = (new Date().getTime() - new Date(item.createdAt).getTime()) / (1000 * 60 * 60 * 24);
        return daysDiff <= 7;
      }).length.toString(),
      icon: '🆕',
      trend: { value: 1, isPositive: true }
    }
  ];

  const handleViewAmenity = (amenity: AmenityItem) => {
    navigate(`/admin/introductions/amenities/${amenity.id}`);
  };

  const handleEditAmenity = (amenity: AmenityItem) => {
    navigate(`/admin/introductions/amenities/${amenity.id}/edit`);
  };

  const handleDeleteAmenity = (amenity: AmenityItem) => {
    if (window.confirm(`Are you sure you want to delete "${amenity.title}"?`)) {
      console.log('Delete amenity:', amenity.id);
      // In a real app, this would make an API call
    }
  };

  const handleAddAmenity = () => {
    navigate('/admin/introductions/amenities/new');
  };

  const getStatusBadge = (isAvailable: boolean) => {
    return (
      <span className={`amenities-manage__status-badge ${isAvailable ? 'amenities-manage__status-badge--available' : 'amenities-manage__status-badge--unavailable'}`}>
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
      label: 'Amenity',
      sortable: true,
      width: '300px',
      render: (value: string, item: AmenityItem) => (
        <div className="amenities-manage__amenity-info">
          <Text variant="p" size="sm" color="primary" className="amenities-manage__amenity-title">
            {value}
          </Text>
          <Text variant="p" size="xs" color="muted" className="amenities-manage__amenity-description">
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
    <div className={`amenities-manage ${className}`}>
      <div className="amenities-manage__header">
        <div className="amenities-manage__header-left">
          <Title level="h1" size="xl" color="primary" className="amenities-manage__title">
            Amenities Management
          </Title>
          <Text variant="p" size="md" color="secondary" className="amenities-manage__subtitle">
            Manage additional facilities and services for customers
          </Text>
        </div>
        <div className="amenities-manage__header-right">
          <Button variant="secondary" size="md" onClick={() => navigate('/admin/introductions')}>
            Back
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={handleAddAmenity}
            className="amenities-manage__add-btn"
          >
            + Add Amenity
          </Button>
        </div>
      </div>

      <div className="amenities-manage__stats">
        {statsData.map((stat, index) => (
          <AdminStatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
            className="amenities-manage__stat-card"
          />
        ))}
      </div>

      <div className="amenities-manage__filters">
        <div className="amenities-manage__filter-group">
          <Input
            type="text"
            placeholder="Search amenities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="amenities-manage__search-input"
          />
        </div>
        
        <div className="amenities-manage__filter-group">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="amenities-manage__filter-select"
          >
            {statusOptions.map(status => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className="amenities-manage__filter-group">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="amenities-manage__filter-select"
          >
            <option value="title-asc">Title A-Z</option>
            <option value="title-desc">Title Z-A</option>
            <option value="updatedAt-desc">Recently Updated</option>
            <option value="updatedAt-asc">Oldest Updated</option>
          </select>
        </div>
      </div>

      <div className="amenities-manage__table-section">
        <AdminTable
          data={filteredAndSortedAmenities}
          columns={tableColumns}
          onView={handleViewAmenity}
          onEdit={handleEditAmenity}
          onDelete={handleDeleteAmenity}
          emptyMessage="No amenities found matching your criteria"
        />
      </div>
    </div>
  );
};

export default AmenitiesManage;
