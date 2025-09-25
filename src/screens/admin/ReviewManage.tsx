import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Title, Text, Button, Input, AdminStatsCard, AdminTable } from '../../components';
import { cafesService } from '../../services/cafes';
import './ReviewManage.css';

interface ReviewManageProps {
  className?: string;
}

interface ReviewItem {
  id: number;
  userReviewed: string;
  content: string;
  rating: number;
  status: 'published' | 'pending' | 'rejected' | 'hidden';
  createdAt: string;
  updatedAt: string;
  menuItem?: string;
  orderId?: string;
}

interface ApiReviewItem {
  id_danh_gia: number;
  id_user: number;
  id_cua_hang: number;
  diem_danh_gia: number;
  binh_luan: string;
  trang_thai: string;
  thoi_gian_tao: string;
  user_name: string;
}

interface StoreInfo {
  id_cua_hang: number;
  ten_cua_hang: string;
}

// Helper function to map API review data to ReviewItem with store info
const mapApiReviewToReviewItem = (apiReview: ApiReviewItem, storeInfo: StoreInfo): ReviewItem => {
  // Map status from API to our display status
  const getStatus = (trang_thai: string): 'published' | 'pending' | 'rejected' | 'hidden' => {
    switch (trang_thai) {
      case 'da_duyet':
        return 'published';
      case 'cho_duyet':
        return 'pending';
      case 'tu_choi':
        return 'rejected';
      case 'an':
        return 'hidden';
      default:
        return 'pending';
    }
  };

  return {
    id: apiReview.id_danh_gia,
    userReviewed: apiReview.user_name || `User #${apiReview.id_user}`,
    content: apiReview.binh_luan,
    rating: apiReview.diem_danh_gia,
    status: getStatus(apiReview.trang_thai),
    createdAt: apiReview.thoi_gian_tao,
    updatedAt: apiReview.thoi_gian_tao,
    menuItem: storeInfo.ten_cua_hang, // Use store name as menu item for context
    orderId: `Store #${storeInfo.id_cua_hang}` // Use store ID as order ID for context
  };
};

const statusOptions = ['All', 'Published', 'Pending', 'Rejected', 'Hidden'];
const ratingOptions = ['All', '5 Stars', '4 Stars', '3 Stars', '2 Stars', '1 Star'];

const ReviewManage: React.FC<ReviewManageProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  
  // API data states
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [userStores, setUserStores] = useState<StoreInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [ratingFilter, setRatingFilter] = useState('All');
  const [storeFilter, setStoreFilter] = useState('All');
  const [sortBy, setSortBy] = useState('createdAt-desc');
  
  // Get all user stores
  const getAllUserStores = useCallback(async (): Promise<StoreInfo[]> => {
    try {
      // Get all stores for the user (assuming they own all stores they can see)
      const response = await cafesService.list(1, 100); // Get up to 100 stores
      const stores = response.data.items.map(store => ({
        id_cua_hang: store.id_cua_hang,
        ten_cua_hang: store.ten_cua_hang
      }));
      
      if (stores.length === 0) {
        throw new Error('No stores found');
      }
      
      return stores;
    } catch (error) {
      console.error('Error fetching user stores:', error);
      throw new Error('Failed to get user stores');
    }
  }, []);

  // Fetch reviews from API for all user stores
  const fetchReviews = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Get all user stores
      const stores = await getAllUserStores();
      setUserStores(stores);
      
      // Fetch reviews from all stores
      const allReviews: ReviewItem[] = [];
      
      for (const store of stores) {
        try {
          const response = await cafesService.getReviews(store.id_cua_hang);
          const storeReviews = response.data.items.map(apiReview => 
            mapApiReviewToReviewItem(apiReview, store)
          );
          allReviews.push(...storeReviews);
        } catch (storeError) {
          console.warn(`Failed to fetch reviews for store ${store.ten_cua_hang}:`, storeError);
          // Continue with other stores even if one fails
        }
      }
      
      setReviews(allReviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      setError('Failed to load reviews');
    } finally {
      setIsLoading(false);
    }
  }, [getAllUserStores]);

  // Fetch reviews on component mount
  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  // Fetch data when component comes into focus
  useEffect(() => {
    const handleFocus = () => {
      fetchReviews();
    };

    window.addEventListener('focus', handleFocus);
    fetchReviews();

    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, [fetchReviews]);
  
  // Filter and sort reviews
  const filteredAndSortedReviews = useMemo(() => {
    let filtered = reviews.filter(item => {
      const matchesSearch = item.userReviewed.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (item.menuItem && item.menuItem.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesStatus = statusFilter === 'All' || 
                           (statusFilter === 'Published' && item.status === 'published') ||
                           (statusFilter === 'Pending' && item.status === 'pending') ||
                           (statusFilter === 'Rejected' && item.status === 'rejected') ||
                           (statusFilter === 'Hidden' && item.status === 'hidden');
      const matchesRating = ratingFilter === 'All' || 
                           (ratingFilter === '5 Stars' && item.rating === 5) ||
                           (ratingFilter === '4 Stars' && item.rating === 4) ||
                           (ratingFilter === '3 Stars' && item.rating === 3) ||
                           (ratingFilter === '2 Stars' && item.rating === 2) ||
                           (ratingFilter === '1 Star' && item.rating === 1);
      const matchesStore = storeFilter === 'All' || 
                          (item.menuItem && item.menuItem === storeFilter);
      
      return matchesSearch && matchesStatus && matchesRating && matchesStore;
    });

    // Sort reviews
    filtered.sort((a, b) => {
      const [sortKey, direction] = sortBy.split('-');
      const isAsc = direction === 'asc';
      
      let aValue: any = a[sortKey as keyof ReviewItem];
      let bValue: any = b[sortKey as keyof ReviewItem];
      
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
  }, [reviews, searchTerm, statusFilter, ratingFilter, storeFilter, sortBy]);

  // Statistics
  const statsData = [
    {
      title: 'Total Reviews',
      value: reviews.length.toString(),
      icon: '⭐',
      trend: { value: 3, isPositive: true }
    },
    {
      title: 'Published',
      value: reviews.filter(item => item.status === 'published').length.toString(),
      icon: '✅',
      trend: { value: 2, isPositive: true }
    },
    {
      title: 'Pending',
      value: reviews.filter(item => item.status === 'pending').length.toString(),
      icon: '⏳',
      trend: { value: 1, isPositive: true }
    },
    {
      title: 'Avg Rating',
      value: reviews.length > 0 ? (reviews.reduce((sum, item) => sum + item.rating, 0) / reviews.length).toFixed(1) : '0.0',
      icon: '📊',
      trend: { value: 0.2, isPositive: true }
    }
  ];

  const handleViewReview = (review: ReviewItem) => {
    navigate(`/admin/store/review/${review.id}`);
  };

  const handleEditReview = (review: ReviewItem) => {
    navigate(`/admin/store/review/${review.id}/edit`);
  };

  const handleDeleteReview = (review: ReviewItem) => {
    if (window.confirm(`Are you sure you want to delete this review from ${review.userReviewed}?`)) {
      console.log('Delete review:', review.id);
      // In a real app, this would make an API call
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      published: { label: 'Published', className: 'review-manage__status-badge--published' },
      pending: { label: 'Pending', className: 'review-manage__status-badge--pending' },
      rejected: { label: 'Rejected', className: 'review-manage__status-badge--rejected' },
      hidden: { label: 'Hidden', className: 'review-manage__status-badge--hidden' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    
    return (
      <span className={`review-manage__status-badge ${config.className}`}>
        {config.label}
      </span>
    );
  };

  const renderStars = (rating: number) => {
    return (
      <div className="review-manage__stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`review-manage__star ${star <= rating ? 'review-manage__star--filled' : ''}`}
          >
            ★
          </span>
        ))}
        <Text variant="span" size="xs" color="muted" className="review-manage__rating-text">
          ({rating}/5)
        </Text>
      </div>
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
      key: 'userReviewed',
      label: 'User & Store',
      sortable: true,
      width: '200px',
      render: (value: string, item: ReviewItem) => (
        <div className="review-manage__user-info">
          <Text variant="p" size="sm" color="primary" className="review-manage__user-name">
            {value}
          </Text>
          {item.menuItem && (
            <Text variant="p" size="xs" color="muted" className="review-manage__store-name">
              📍 {item.menuItem}
            </Text>
          )}
          {item.orderId && (
            <Text variant="p" size="xs" color="secondary" className="review-manage__store-id">
              {item.orderId}
            </Text>
          )}
        </div>
      )
    },
    {
      key: 'content',
      label: 'Content',
      width: '300px',
      render: (value: string) => (
        <Text variant="p" size="sm" color="secondary" className="review-manage__content">
          {(value?.length || 0) > 100 ? `${value.substring(0, 100)}...` : value}
        </Text>
      )
    },
    {
      key: 'rating',
      label: 'Rating',
      sortable: true,
      width: '120px',
      render: (value: number) => renderStars(value)
    },
    {
      key: 'status',
      label: 'Status',
      width: '120px',
      render: (value: string) => getStatusBadge(value)
    },
    {
      key: 'createdAt',
      label: 'Date',
      sortable: true,
      width: '100px',
      render: (value: string) => (
        <Text variant="span" size="sm" color="muted">
          {formatDate(value)}
        </Text>
      )
    }
  ];

  // Loading state
  if (isLoading) {
    return (
      <div className={`review-manage ${className}`}>
        <div className="review-manage__loading">
          <Text variant="p" size="md" color="muted">Loading reviews...</Text>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={`review-manage ${className}`}>
        <div className="review-manage__error">
          <Text variant="p" size="md" color="primary">{error}</Text>
          <Button variant="primary" size="md" onClick={fetchReviews} className="review-manage__retry-btn">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`review-manage ${className}`}>
      <div className="review-manage__header">
        <div className="review-manage__header-left">
          <Title level="h1" size="xl" color="primary" className="review-manage__title">
            Review Management
          </Title>
          <Text variant="p" size="md" color="secondary" className="review-manage__subtitle">
            Manage customer reviews and feedback{userStores.length > 0 && ` from ${userStores.length} store${userStores.length > 1 ? 's' : ''}`}
          </Text>
        </div>
        <div className="review-manage__header-right">
          <Button variant="secondary" size="md" onClick={() => navigate('/admin/store')}>
            Back
          </Button>
        </div>
      </div>

      <div className="review-manage__stats">
        {statsData.map((stat, index) => (
          <AdminStatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
            className="review-manage__stat-card"
          />
        ))}
      </div>

      <div className="review-manage__filters">
        <div className="review-manage__filter-group">
          <Input
            type="text"
            placeholder="Search reviews..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="review-manage__search-input"
          />
        </div>
        
        <div className="review-manage__filter-group">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="review-manage__filter-select"
          >
            {statusOptions.map(status => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className="review-manage__filter-group">
          <select
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
            className="review-manage__filter-select"
          >
            {ratingOptions.map(rating => (
              <option key={rating} value={rating}>
                {rating}
              </option>
            ))}
          </select>
        </div>

        <div className="review-manage__filter-group">
          <select
            value={storeFilter}
            onChange={(e) => setStoreFilter(e.target.value)}
            className="review-manage__filter-select"
          >
            <option value="All">All Stores</option>
            {userStores.map(store => (
              <option key={store.id_cua_hang} value={store.ten_cua_hang}>
                {store.ten_cua_hang}
              </option>
            ))}
          </select>
        </div>

        <div className="review-manage__filter-group">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="review-manage__filter-select"
          >
            <option value="createdAt-desc">Newest First</option>
            <option value="createdAt-asc">Oldest First</option>
            <option value="rating-desc">Highest Rating</option>
            <option value="rating-asc">Lowest Rating</option>
            <option value="userReviewed-asc">User A-Z</option>
            <option value="userReviewed-desc">User Z-A</option>
          </select>
        </div>
      </div>

      <div className="review-manage__table-section">
        <AdminTable
          data={filteredAndSortedReviews}
          columns={tableColumns}
          onView={handleViewReview}
          onEdit={handleEditReview}
          onDelete={handleDeleteReview}
          emptyMessage={userStores.length > 0 ? `No reviews found${storeFilter !== 'All' ? ` for ${storeFilter}` : ' from your stores'}` : "No reviews found"}
        />
      </div>
    </div>
  );
};

export default ReviewManage;
