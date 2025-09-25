import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Title, Text, Button, AdminStatsCard, AdminTable } from '../../components';
import { promotionsService, Promotion } from '../../services/promotions';
import { cafesService } from '../../services/cafes';
import './PromotionManage.css';

interface PromotionManageProps {
  className?: string;
}

// Extended interface for display purposes
interface PromotionDisplayItem extends Promotion {
  status: 'active' | 'inactive' | 'draft' | 'expired';
  discountType: 'percentage' | 'fixed' | 'buy_x_get_y';
  discountValue: number;
  minOrderAmount?: number;
  maxDiscountAmount?: number;
  usageLimit?: number;
  usedCount: number;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

// Helper function to determine promotion status based on dates
const getPromotionStatus = (startDate: string, endDate: string): 'active' | 'inactive' | 'draft' | 'expired' => {
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  if (now < start) return 'draft';
  if (now > end) return 'expired';
  return 'active';
};

// Helper function to map API data to display format
const mapPromotionToDisplay = (promotion: Promotion): PromotionDisplayItem => {
  const status = getPromotionStatus(promotion.ngay_bat_dau, promotion.ngay_ket_thuc);
  
  return {
    ...promotion,
    status,
    discountType: 'percentage', // Default since API doesn't provide this
    discountValue: 0, // Default since API doesn't provide this
    usedCount: 0, // Default since API doesn't provide this
    createdAt: promotion.ngay_bat_dau,
    updatedAt: promotion.ngay_ket_thuc
  };
};


const PromotionManage: React.FC<PromotionManageProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  const { storeId } = useParams<{ storeId?: string }>();
  
  // API data states
  const [promotions, setPromotions] = useState<PromotionDisplayItem[]>([]);
  const [currentStoreId, setCurrentStoreId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Sort state
  const [sortBy, setSortBy] = useState('createdAt-desc');
  
  // Get current store ID
  const getCurrentStoreId = useCallback(async (): Promise<number> => {
    // If storeId is provided in URL params, use it
    if (storeId) {
      return parseInt(storeId);
    }
    
    // Otherwise, get the first store from the user's stores (similar to ShopProfile)
    try {
      const response = await cafesService.list(1, 1);
      if (response.data.items.length > 0) {
        return response.data.items[0].id_cua_hang;
      }
      throw new Error('No store found');
    } catch (error) {
      console.error('Error fetching current store:', error);
      throw new Error('Failed to get current store');
    }
  }, [storeId]);

  // Fetch promotions from API for current store
  const fetchPromotions = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Get current store ID
      const storeId = await getCurrentStoreId();
      setCurrentStoreId(storeId);
      
      // Fetch promotions for the current store
      const response = await promotionsService.listByStore(storeId);
      const mappedPromotions = response.data.map(mapPromotionToDisplay);
      setPromotions(mappedPromotions);
    } catch (error) {
      console.error('Error fetching promotions:', error);
      setError('Failed to load promotions');
    } finally {
      setIsLoading(false);
    }
  }, [getCurrentStoreId]);

  // Fetch promotions on component mount
  useEffect(() => {
    fetchPromotions();
  }, [fetchPromotions]);

  // Fetch data when component comes into focus
  useEffect(() => {
    const handleFocus = () => {
      fetchPromotions();
    };

    window.addEventListener('focus', handleFocus);
    fetchPromotions();

    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, [fetchPromotions]);

  // Sort promotions
  const sortedPromotions = useMemo(() => {
    const sorted = [...promotions];

    // Sort promotions
    sorted.sort((a, b) => {
      const [sortKey, direction] = sortBy.split('-');
      const isAsc = direction === 'asc';
      
      let aValue: any;
      let bValue: any;
      
      switch (sortKey) {
        case 'createdAt':
          aValue = new Date(a.createdAt).getTime();
          bValue = new Date(b.createdAt).getTime();
          break;
        case 'updatedAt':
          aValue = new Date(a.updatedAt).getTime();
          bValue = new Date(b.updatedAt).getTime();
          break;
        case 'ngay_bat_dau':
          aValue = new Date(a.ngay_bat_dau).getTime();
          bValue = new Date(b.ngay_bat_dau).getTime();
          break;
        case 'ten_chuong_trinh':
          aValue = a.ten_chuong_trinh.toLowerCase();
          bValue = b.ten_chuong_trinh.toLowerCase();
          break;
        case 'usedCount':
          aValue = a.usedCount;
          bValue = b.usedCount;
          break;
        default:
          aValue = a[sortKey as keyof PromotionDisplayItem];
          bValue = b[sortKey as keyof PromotionDisplayItem];
      }
      
      if (isAsc) {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return sorted;
  }, [promotions, sortBy]);

  // Statistics
  const statsData = [
    {
      title: 'Total Promotions',
      value: promotions.length.toString(),
      icon: '🎯',
      trend: { value: 2, isPositive: true }
    },
    {
      title: 'Active',
      value: promotions.filter(item => item.status === 'active').length.toString(),
      icon: '✅',
      trend: { value: 1, isPositive: true }
    },
    {
      title: 'Total Usage',
      value: promotions.reduce((sum, item) => sum + item.usedCount, 0).toString(),
      icon: '📈',
      trend: { value: 15, isPositive: true }
    },
    {
      title: 'Draft',
      value: promotions.filter(item => item.status === 'draft').length.toString(),
      icon: '📝',
      trend: { value: 0, isPositive: false }
    }
  ];

  const handleViewPromotion = (promotion: PromotionDisplayItem) => {
    navigate(`/admin/store/promotion/${promotion.id_khuyen_mai}`);
  };

  const handleEditPromotion = (promotion: PromotionDisplayItem) => {
    navigate(`/admin/store/promotion/${promotion.id_khuyen_mai}/edit`);
  };

  const handleDeletePromotion = (promotion: PromotionDisplayItem) => {
    if (window.confirm(`Are you sure you want to delete the promotion "${promotion.ten_chuong_trinh}"?`)) {
      console.log('Delete promotion:', promotion.id_khuyen_mai);
      // In a real app, this would make an API call
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { label: 'Active', className: 'promotion-manage__status-badge--active' },
      inactive: { label: 'Inactive', className: 'promotion-manage__status-badge--inactive' },
      draft: { label: 'Draft', className: 'promotion-manage__status-badge--draft' },
      expired: { label: 'Expired', className: 'promotion-manage__status-badge--expired' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.draft;
    
    return (
      <span className={`promotion-manage__status-badge ${config.className}`}>
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

  const formatDateRange = (startDate: string, endDate: string) => {
    const start = formatDate(startDate);
    const end = formatDate(endDate);
    return `${start} - ${end}`;
  };

  const getDiscountDisplay = (promotion: PromotionDisplayItem) => {
    switch (promotion.discountType) {
      case 'percentage':
        return `${promotion.discountValue}% off`;
      case 'fixed':
        return `$${promotion.discountValue} off`;
      case 'buy_x_get_y':
        return `Buy 2 Get ${promotion.discountValue} Free`;
      default:
        return 'N/A';
    }
  };

  const tableColumns = [
    {
      key: 'ten_chuong_trinh',
      label: 'Promotion Name',
      sortable: true,
      width: '200px',
      render: (value: string, item: PromotionDisplayItem) => (
        <div className="promotion-manage__promotion-info">
          <Text variant="p" size="sm" color="primary" className="promotion-manage__promotion-name">
            {value}
          </Text>
          <Text variant="p" size="xs" color="muted" className="promotion-manage__discount-value">
            {getDiscountDisplay(item)}
          </Text>
        </div>
      )
    },
    {
      key: 'mo_ta',
      label: 'Description',
      width: '250px',
      render: (value: string) => (
        <Text variant="p" size="sm" color="secondary" className="promotion-manage__description">
          {(value || 'No description').length > 80 ? `${(value || 'No description').substring(0, 80)}...` : (value || 'No description')}
        </Text>
      )
    },
    {
      key: 'ngay_bat_dau',
      label: 'Time Period',
      sortable: true,
      width: '180px',
      render: (value: string, item: PromotionDisplayItem) => (
        <div className="promotion-manage__time-info">
          <Text variant="p" size="sm" color="primary" className="promotion-manage__time-range">
            {formatDateRange(item.ngay_bat_dau, item.ngay_ket_thuc)}
          </Text>
          <Text variant="p" size="xs" color="muted" className="promotion-manage__time-days">
            {Math.ceil((new Date(item.ngay_ket_thuc).getTime() - new Date(item.ngay_bat_dau).getTime()) / (1000 * 60 * 60 * 24))} days
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
      key: 'usedCount',
      label: 'Usage',
      sortable: true,
      width: '100px',
      render: (value: number, item: PromotionDisplayItem) => (
        <div className="promotion-manage__usage-info">
          <Text variant="span" size="sm" color="primary" className="promotion-manage__usage-count">
            {value}
          </Text>
          {item.usageLimit && (
            <Text variant="span" size="xs" color="muted" className="promotion-manage__usage-limit">
              /{item.usageLimit}
            </Text>
          )}
        </div>
      )
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

  if (isLoading) {
    return (
      <div className={`promotion-manage ${className}`}>
        <div className="promotion-manage__loading">
          <Text variant="p" size="lg" color="primary">Loading promotions...</Text>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`promotion-manage ${className}`}>
        <div className="promotion-manage__error">
          <Text variant="p" size="lg" color="primary">{error}</Text>
          <Button
            variant="primary"
            size="md"
            onClick={fetchPromotions}
            className="promotion-manage__retry-btn"
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`promotion-manage ${className}`}>
      <div className="promotion-manage__header">
        <div className="promotion-manage__header-left">
          <Title level="h1" size="xl" color="primary" className="promotion-manage__title">
            Promotion Management
          </Title>
          <Text variant="p" size="md" color="secondary" className="promotion-manage__subtitle">
            Manage promotional campaigns and discounts{currentStoreId && ` for Store #${currentStoreId}`}
          </Text>
        </div>
        <div className="promotion-manage__header-right">
          <Button variant="primary" size="md" onClick={() => navigate('/admin/store/promotion/new')}>
            Add New Promotion
          </Button>
          <Button variant="secondary" size="md" onClick={() => navigate('/admin/store')}>
            Back
          </Button>
        </div>
      </div>

      <div className="promotion-manage__stats">
        {statsData.map((stat, index) => (
          <AdminStatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
            className="promotion-manage__stat-card"
          />
        ))}
      </div>

      <div className="promotion-manage__filters">
        <div className="promotion-manage__filter-group">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="promotion-manage__filter-select"
          >
            <option value="createdAt-desc">Newest First</option>
            <option value="createdAt-asc">Oldest First</option>
            <option value="ten_chuong_trinh-asc">Name A-Z</option>
            <option value="ten_chuong_trinh-desc">Name Z-A</option>
            <option value="ngay_bat_dau-asc">Start Date (Earliest)</option>
            <option value="ngay_bat_dau-desc">Start Date (Latest)</option>
            <option value="usedCount-desc">Most Used</option>
            <option value="usedCount-asc">Least Used</option>
          </select>
        </div>
      </div>

      <div className="promotion-manage__table-section">
        <AdminTable
          data={sortedPromotions}
          columns={tableColumns}
          onView={handleViewPromotion}
          onEdit={handleEditPromotion}
          onDelete={handleDeletePromotion}
          emptyMessage={currentStoreId ? `No promotions found for Store #${currentStoreId}` : "No promotions found"}
        />
      </div>
    </div>
  );
};

export default PromotionManage;
