import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Title, Text, Button, Input, AdminStatsCard, AdminTable } from '../../components';
import './CategoryManage.css';

interface CategoryManageProps {
  className?: string;
}

interface CategoryItem {
  id: number;
  title: string;
  description: string;
  status: 'active' | 'inactive' | 'draft';
  createdAt: string;
  updatedAt: string;
}

const categoryItems: CategoryItem[] = [
  {
    id: 1,
    title: 'Coffee',
    description: 'Hot and cold coffee beverages',
    status: 'active',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 2,
    title: 'Pastries',
    description: 'Fresh baked goods and sweet treats',
    status: 'active',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 3,
    title: 'Food',
    description: 'Lunch items and savory dishes',
    status: 'active',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 4,
    title: 'Beverages',
    description: 'Non-coffee drinks and refreshments',
    status: 'inactive',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 5,
    title: 'Desserts',
    description: 'Sweet treats and dessert items',
    status: 'draft',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 6,
    title: 'Breakfast',
    description: 'Morning meal items and breakfast specials',
    status: 'active',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  }
];

const statusOptions = ['All', 'Active', 'Inactive', 'Draft'];

const CategoryManage: React.FC<CategoryManageProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('title-asc');
  
  // Filter and sort categories
  const filteredAndSortedCategories = useMemo(() => {
    let filtered = categoryItems.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All' || 
                           (statusFilter === 'Active' && item.status === 'active') ||
                           (statusFilter === 'Inactive' && item.status === 'inactive') ||
                           (statusFilter === 'Draft' && item.status === 'draft');
      
      return matchesSearch && matchesStatus;
    });

    // Sort categories
    filtered.sort((a, b) => {
      const [sortKey, direction] = sortBy.split('-');
      const isAsc = direction === 'asc';
      
      let aValue: any = a[sortKey as keyof CategoryItem];
      let bValue: any = b[sortKey as keyof CategoryItem];
      
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
      title: 'Total Categories',
      value: categoryItems.length.toString(),
      icon: '📂',
      trend: { value: 1, isPositive: true }
    },
    {
      title: 'Active',
      value: categoryItems.filter(item => item.status === 'active').length.toString(),
      icon: '✅',
      trend: { value: 1, isPositive: true }
    },
    {
      title: 'Inactive',
      value: categoryItems.filter(item => item.status === 'inactive').length.toString(),
      icon: '❌',
      trend: { value: 0, isPositive: false }
    },
    {
      title: 'Draft',
      value: categoryItems.filter(item => item.status === 'draft').length.toString(),
      icon: '📝',
      trend: { value: 1, isPositive: true }
    }
  ];

  const handleViewCategory = (category: CategoryItem) => {
    navigate(`/admin/store/category/${category.id}`);
  };

  const handleEditCategory = (category: CategoryItem) => {
    navigate(`/admin/store/category/${category.id}/edit`);
  };

  const handleDeleteCategory = (category: CategoryItem) => {
    if (window.confirm(`Are you sure you want to delete "${category.title}"?`)) {
      console.log('Delete category:', category.id);
      // In a real app, this would make an API call
    }
  };

  const handleAddCategory = () => {
    navigate('/admin/store/category/new');
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { label: 'Active', className: 'category-manage__status-badge--active' },
      inactive: { label: 'Inactive', className: 'category-manage__status-badge--inactive' },
      draft: { label: 'Draft', className: 'category-manage__status-badge--draft' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.inactive;
    
    return (
      <span className={`category-manage__status-badge ${config.className}`}>
        {config.label}
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
      label: 'Category Title',
      sortable: true,
      width: '300px',
      render: (value: string, item: CategoryItem) => (
        <div className="category-manage__category-info">
          <Text variant="p" size="sm" color="primary" className="category-manage__category-title">
            {value}
          </Text>
          <Text variant="p" size="xs" color="muted" className="category-manage__category-description">
            {item.description}
          </Text>
        </div>
      )
    },
    {
      key: 'status',
      label: 'Status',
      width: '120px',
      render: (value: string) => getStatusBadge(value)
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
    <div className={`category-manage ${className}`}>
      <div className="category-manage__header">
        <div className="category-manage__header-left">
          <Title level="h1" size="xl" color="primary" className="category-manage__title">
            Category Management
          </Title>
          <Text variant="p" size="md" color="secondary" className="category-manage__subtitle">
            Manage your menu categories and organization
          </Text>
        </div>
        <div className="category-manage__header-right">
          <Button variant="secondary" size="md" onClick={() => navigate('/admin/store')}>
            Back
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={handleAddCategory}
            className="category-manage__add-btn"
          >
            + Add Category
          </Button>
        </div>
      </div>

      <div className="category-manage__stats">
        {statsData.map((stat, index) => (
          <AdminStatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
            className="category-manage__stat-card"
          />
        ))}
      </div>

      <div className="category-manage__filters">
        <div className="category-manage__filter-group">
          <Input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="category-manage__search-input"
          />
        </div>
        
        <div className="category-manage__filter-group">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="category-manage__filter-select"
          >
            {statusOptions.map(status => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className="category-manage__filter-group">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="category-manage__filter-select"
          >
            <option value="title-asc">Title A-Z</option>
            <option value="title-desc">Title Z-A</option>
            <option value="updatedAt-desc">Recently Updated</option>
            <option value="updatedAt-asc">Oldest Updated</option>
          </select>
        </div>
      </div>

      <div className="category-manage__table-section">
        <AdminTable
          data={filteredAndSortedCategories}
          columns={tableColumns}
          onView={handleViewCategory}
          onEdit={handleEditCategory}
          onDelete={handleDeleteCategory}
          emptyMessage="No categories found matching your criteria"
        />
      </div>
    </div>
  );
};

export default CategoryManage;
