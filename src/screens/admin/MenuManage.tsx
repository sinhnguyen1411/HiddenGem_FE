import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Title, Text, Button, Input, AdminStatsCard, AdminTable } from '../../components';
import './MenuManage.css';

interface MenuManageProps {
  className?: string;
}

interface MenuItem {
  id: number;
  name: string;
  size: string;
  price: string;
  status: 'available' | 'unavailable' | 'out-of-stock';
  image: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: 'Espresso',
    size: 'Regular',
    price: '$2.50',
    status: 'available',
    image: '/images/espresso.jpg',
    description: 'Single or double shot espresso',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 2,
    name: 'Latte',
    size: 'Large',
    price: '$4.00',
    status: 'available',
    image: '/images/latte.jpg',
    description: 'Espresso with steamed milk',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 3,
    name: 'Cappuccino',
    size: 'Medium',
    price: '$3.50',
    status: 'available',
    image: '/images/cappuccino.jpg',
    description: 'Espresso with equal parts steamed milk and foam',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 4,
    name: 'Americano',
    size: 'Regular',
    price: '$2.75',
    status: 'out-of-stock',
    image: '/images/americano.jpg',
    description: 'Espresso with hot water',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 5,
    name: 'Cold Brew',
    size: 'Large',
    price: '$3.25',
    status: 'unavailable',
    image: '/images/cold-brew.jpg',
    description: 'Slow-steeped cold coffee',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 6,
    name: 'Croissant',
    size: 'Regular',
    price: '$3.50',
    status: 'available',
    image: '/images/croissant.jpg',
    description: 'Fresh baked buttery croissant',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 7,
    name: 'Muffin',
    size: 'Regular',
    price: '$2.75',
    status: 'available',
    image: '/images/muffin.jpg',
    description: 'Blueberry or chocolate chip muffin',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 8,
    name: 'Sandwich',
    size: 'Large',
    price: '$8.50',
    status: 'out-of-stock',
    image: '/images/sandwich.jpg',
    description: 'Grilled chicken or turkey sandwich',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  }
];

const statusOptions = ['All', 'Available', 'Unavailable', 'Out of Stock'];
const sizeOptions = ['All', 'Regular', 'Medium', 'Large'];

const MenuManage: React.FC<MenuManageProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sizeFilter, setSizeFilter] = useState('All');
  const [sortBy, setSortBy] = useState('name-asc');
  
  // Filter and sort menu items
  const filteredAndSortedMenus = useMemo(() => {
    let filtered = menuItems.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All' || 
                           (statusFilter === 'Available' && item.status === 'available') ||
                           (statusFilter === 'Unavailable' && item.status === 'unavailable') ||
                           (statusFilter === 'Out of Stock' && item.status === 'out-of-stock');
      const matchesSize = sizeFilter === 'All' || item.size === sizeFilter;
      
      return matchesSearch && matchesStatus && matchesSize;
    });

    // Sort menu items
    filtered.sort((a, b) => {
      const [sortKey, direction] = sortBy.split('-');
      const isAsc = direction === 'asc';
      
      let aValue: any = a[sortKey as keyof MenuItem];
      let bValue: any = b[sortKey as keyof MenuItem];
      
      if (sortKey === 'createdAt' || sortKey === 'updatedAt') {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }
      
      if (sortKey === 'price') {
        aValue = parseFloat(aValue.replace('$', ''));
        bValue = parseFloat(bValue.replace('$', ''));
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
  }, [searchTerm, statusFilter, sizeFilter, sortBy]);

  // Statistics
  const statsData = [
    {
      title: 'Total Items',
      value: menuItems.length.toString(),
      icon: '🍽️',
      trend: { value: 2, isPositive: true }
    },
    {
      title: 'Available',
      value: menuItems.filter(item => item.status === 'available').length.toString(),
      icon: '✅',
      trend: { value: 1, isPositive: true }
    },
    {
      title: 'Out of Stock',
      value: menuItems.filter(item => item.status === 'out-of-stock').length.toString(),
      icon: '⚠️',
      trend: { value: 1, isPositive: false }
    },
    {
      title: 'Recently Added',
      value: menuItems.filter(item => {
        const daysDiff = (new Date().getTime() - new Date(item.createdAt).getTime()) / (1000 * 60 * 60 * 24);
        return daysDiff <= 7;
      }).length.toString(),
      icon: '🆕',
      trend: { value: 1, isPositive: true }
    }
  ];

  const handleViewMenu = (menu: MenuItem) => {
    navigate(`/admin/store/menu/${menu.id}`);
  };

  const handleEditMenu = (menu: MenuItem) => {
    navigate(`/admin/store/menu/${menu.id}/edit`);
  };

  const handleDeleteMenu = (menu: MenuItem) => {
    if (window.confirm(`Are you sure you want to delete "${menu.name}"?`)) {
      console.log('Delete menu item:', menu.id);
      // In a real app, this would make an API call
    }
  };

  const handleAddMenu = () => {
    navigate('/admin/store/menu/new');
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      available: { label: 'Available', className: 'menu-manage__status-badge--available' },
      unavailable: { label: 'Unavailable', className: 'menu-manage__status-badge--unavailable' },
      'out-of-stock': { label: 'Out of Stock', className: 'menu-manage__status-badge--out-of-stock' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.unavailable;
    
    return (
      <span className={`menu-manage__status-badge ${config.className}`}>
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
      key: 'name',
      label: 'Menu Name',
      sortable: true,
      width: '200px',
      render: (value: string, item: MenuItem) => (
        <div className="menu-manage__menu-info">
          <Text variant="p" size="sm" color="primary" className="menu-manage__menu-name">
            {value}
          </Text>
          <Text variant="p" size="xs" color="muted" className="menu-manage__menu-description">
            {item.description}
          </Text>
        </div>
      )
    },
    {
      key: 'size',
      label: 'Size',
      sortable: true,
      width: '100px',
      render: (value: string) => (
        <Text variant="span" size="sm" color="secondary">
          {value}
        </Text>
      )
    },
    {
      key: 'price',
      label: 'Price',
      sortable: true,
      width: '100px',
      render: (value: string) => (
        <Text variant="span" size="sm" color="primary" className="menu-manage__price">
          {value}
        </Text>
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
    <div className={`menu-manage ${className}`}>
      <div className="menu-manage__header">
        <div className="menu-manage__header-left">
          <Title level="h1" size="xl" color="primary" className="menu-manage__title">
            Menu Management
          </Title>
          <Text variant="p" size="md" color="secondary" className="menu-manage__subtitle">
            Manage your coffee shop menu items and pricing
          </Text>
        </div>
        <div className="menu-manage__header-right">
          <Button variant="secondary" size="md" onClick={() => navigate('/admin/store')}>
            Back
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={handleAddMenu}
            className="menu-manage__add-btn"
          >
            + Add Menu Item
          </Button>
        </div>
      </div>

      <div className="menu-manage__stats">
        {statsData.map((stat, index) => (
          <AdminStatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
            className="menu-manage__stat-card"
          />
        ))}
      </div>

      <div className="menu-manage__filters">
        <div className="menu-manage__filter-group">
          <Input
            type="text"
            placeholder="Search menu items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="menu-manage__search-input"
          />
        </div>
        
        <div className="menu-manage__filter-group">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="menu-manage__filter-select"
          >
            {statusOptions.map(status => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className="menu-manage__filter-group">
          <select
            value={sizeFilter}
            onChange={(e) => setSizeFilter(e.target.value)}
            className="menu-manage__filter-select"
          >
            {sizeOptions.map(size => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        <div className="menu-manage__filter-group">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="menu-manage__filter-select"
          >
            <option value="name-asc">Name A-Z</option>
            <option value="name-desc">Name Z-A</option>
            <option value="price-asc">Price Low-High</option>
            <option value="price-desc">Price High-Low</option>
            <option value="size-asc">Size A-Z</option>
            <option value="size-desc">Size Z-A</option>
            <option value="updatedAt-desc">Recently Updated</option>
            <option value="updatedAt-asc">Oldest Updated</option>
          </select>
        </div>
      </div>

      <div className="menu-manage__table-section">
        <AdminTable
          data={filteredAndSortedMenus}
          columns={tableColumns}
          onView={handleViewMenu}
          onEdit={handleEditMenu}
          onDelete={handleDeleteMenu}
          emptyMessage="No menu items found matching your criteria"
        />
      </div>
    </div>
  );
};

export default MenuManage;
