import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Title, Text, Button, Input, AdminStatsCard, AdminTable } from '../../components';
import './PayManage.css';

interface PayManageProps {
  className?: string;
}

interface PayItem {
  id: number;
  title: string;
  description: string;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

const payItems: PayItem[] = [
  {
    id: 1,
    title: 'Cash Payment',
    description: 'Traditional cash transactions at the counter',
    isAvailable: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 2,
    title: 'Card Payment',
    description: 'Credit and debit card processing',
    isAvailable: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 3,
    title: 'Mobile Payment',
    description: 'Apple Pay, Google Pay, and other mobile wallets',
    isAvailable: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 4,
    title: 'Cryptocurrency',
    description: 'Bitcoin and other cryptocurrency payments',
    isAvailable: false,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 5,
    title: 'Contactless Payment',
    description: 'Tap-to-pay with NFC-enabled cards and devices',
    isAvailable: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 6,
    title: 'Online Prepayment',
    description: 'Pay in advance through our website or app',
    isAvailable: false,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  }
];

const statusOptions = ['All', 'Available', 'Unavailable'];

const PayManage: React.FC<PayManageProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('title-asc');
  
  // Filter and sort payment methods
  const filteredAndSortedPayments = useMemo(() => {
    let filtered = payItems.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All' || 
                           (statusFilter === 'Available' && item.isAvailable) ||
                           (statusFilter === 'Unavailable' && !item.isAvailable);
      
      return matchesSearch && matchesStatus;
    });

    // Sort payment methods
    filtered.sort((a, b) => {
      const [sortKey, direction] = sortBy.split('-');
      const isAsc = direction === 'asc';
      
      let aValue: any = a[sortKey as keyof PayItem];
      let bValue: any = b[sortKey as keyof PayItem];
      
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
      title: 'Total Methods',
      value: payItems.length.toString(),
      icon: '💳',
      trend: { value: 1, isPositive: true }
    },
    {
      title: 'Available',
      value: payItems.filter(item => item.isAvailable).length.toString(),
      icon: '✅',
      trend: { value: 1, isPositive: true }
    },
    {
      title: 'Unavailable',
      value: payItems.filter(item => !item.isAvailable).length.toString(),
      icon: '❌',
      trend: { value: 0, isPositive: false }
    },
    {
      title: 'Recently Added',
      value: payItems.filter(item => {
        const daysDiff = (new Date().getTime() - new Date(item.createdAt).getTime()) / (1000 * 60 * 60 * 24);
        return daysDiff <= 7;
      }).length.toString(),
      icon: '🆕',
      trend: { value: 1, isPositive: true }
    }
  ];

  const handleViewPay = (pay: PayItem) => {
    navigate(`/admin/introductions/pay/${pay.id}`);
  };

  const handleEditPay = (pay: PayItem) => {
    navigate(`/admin/introductions/pay/${pay.id}/edit`);
  };

  const handleDeletePay = (pay: PayItem) => {
    if (window.confirm(`Are you sure you want to delete "${pay.title}"?`)) {
      console.log('Delete payment method:', pay.id);
      // In a real app, this would make an API call
    }
  };

  const handleAddPay = () => {
    navigate('/admin/introductions/pay/new');
  };

  const getStatusBadge = (isAvailable: boolean) => {
    return (
      <span className={`pay-manage__status-badge ${isAvailable ? 'pay-manage__status-badge--available' : 'pay-manage__status-badge--unavailable'}`}>
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
      label: 'Payment Method',
      sortable: true,
      width: '300px',
      render: (value: string, item: PayItem) => (
        <div className="pay-manage__pay-info">
          <Text variant="p" size="sm" color="primary" className="pay-manage__pay-title">
            {value}
          </Text>
          <Text variant="p" size="xs" color="muted" className="pay-manage__pay-description">
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
    <div className={`pay-manage ${className}`}>
      <div className="pay-manage__header">
        <div className="pay-manage__header-left">
          <Title level="h1" size="xl" color="primary" className="pay-manage__title">
            Payment Management
          </Title>
          <Text variant="p" size="md" color="secondary" className="pay-manage__subtitle">
            Manage payment processing and billing options
          </Text>
        </div>
        <div className="pay-manage__header-right">
          <Button variant="secondary" size="md" onClick={() => navigate('/admin/introductions')}>
            Back
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={handleAddPay}
            className="pay-manage__add-btn"
          >
            + Add Method
          </Button>
        </div>
      </div>

      <div className="pay-manage__stats">
        {statsData.map((stat, index) => (
          <AdminStatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
            className="pay-manage__stat-card"
          />
        ))}
      </div>

      <div className="pay-manage__filters">
        <div className="pay-manage__filter-group">
          <Input
            type="text"
            placeholder="Search payment methods..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pay-manage__search-input"
          />
        </div>
        
        <div className="pay-manage__filter-group">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="pay-manage__filter-select"
          >
            {statusOptions.map(status => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className="pay-manage__filter-group">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="pay-manage__filter-select"
          >
            <option value="title-asc">Title A-Z</option>
            <option value="title-desc">Title Z-A</option>
            <option value="updatedAt-desc">Recently Updated</option>
            <option value="updatedAt-asc">Oldest Updated</option>
          </select>
        </div>
      </div>

      <div className="pay-manage__table-section">
        <AdminTable
          data={filteredAndSortedPayments}
          columns={tableColumns}
          onView={handleViewPay}
          onEdit={handleEditPay}
          onDelete={handleDeletePay}
          emptyMessage="No payment methods found matching your criteria"
        />
      </div>
    </div>
  );
};

export default PayManage;
