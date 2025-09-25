import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Title, Text, Button, Input, AdminStatsCard, AdminTable } from '../../components';
import { bannersService } from '../../services/banners';
import { Banner } from '../../services/types';
import './BannerManage.css';

interface BannerManageProps {
  className?: string;
}

// Hardcoded configuration data
const bannerStatuses = [
  { id: 'active', label: 'Active', color: 'success' },
  { id: 'inactive', label: 'Inactive', color: 'muted' },
  { id: 'draft', label: 'Draft', color: 'warning' },
  { id: 'archived', label: 'Archived', color: 'danger' }
];

const bannerPositions = [
  { id: 'Home', label: 'Home' },
  { id: 'Promotion-1', label: 'Promotion-1' },
  { id: 'Promotion-2', label: 'Promotion-2' }
];

const bannerSortOptions = [
  { id: 'tieu_de', label: 'Title A-Z' },
  { id: 'thu_tu', label: 'Priority' },
  { id: 'active', label: 'Status' },
  { id: 'thoi_gian_tao', label: 'Created Date' }
];

const bannerFilterConfig = {
  searchPlaceholder: 'Search banners...',
  statusLabel: 'Status',
  positionLabel: 'Position',
  sortLabel: 'Sort by'
};

type BannerStatus = 'active' | 'inactive' | 'draft' | 'archived';
type BannerPosition = 'Home' | 'Promotion-1' | 'Promotion-2';

const BannerManage: React.FC<BannerManageProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  
  // API data states
  const [banners, setBanners] = useState<Banner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<BannerStatus | 'all'>('all');
  const [positionFilter, setPositionFilter] = useState<BannerPosition | 'all'>('all');
  const [sortBy, setSortBy] = useState('thu_tu-asc');
  
  // Fetch banners function
  const fetchBanners = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await bannersService.list();
      setBanners(response.data);
    } catch (error) {
      console.error('Error fetching banners:', error);
      setError('Failed to load banners');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch banners on component mount and when screen comes into focus
  useEffect(() => {
    fetchBanners();
  }, []);

  // Fetch data when component comes into focus
  useEffect(() => {
    const handleFocus = () => {
      fetchBanners();
    };

    // Add focus event listener
    window.addEventListener('focus', handleFocus);
    
    // Also fetch when component mounts (in case it's already focused)
    fetchBanners();

    // Cleanup
    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, []);
  
  // Filter and sort banners
  const filteredAndSortedBanners = useMemo(() => {
    let filtered = banners.filter(banner => {
      const matchesSearch = (banner.tieu_de || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (banner.mo_ta || '').toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || (banner.active ? 'active' : 'inactive') === statusFilter;
      const matchesPosition = positionFilter === 'all' || banner.vi_tri === positionFilter;
      
      return matchesSearch && matchesStatus && matchesPosition;
    });

    // Sort banners
    filtered.sort((a, b) => {
      const [sortKey, direction] = sortBy.split('-');
      const isAsc = direction === 'asc';
      
      let aValue: any = a[sortKey as keyof Banner];
      let bValue: any = b[sortKey as keyof Banner];
      
      if (sortKey === 'thoi_gian_tao') {
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
  }, [banners, searchTerm, statusFilter, positionFilter, sortBy]);

  // Statistics
  const statsData = [
    {
      title: 'Total Banners',
      value: banners.length.toString(),
      icon: '📢',
      trend: { value: 8, isPositive: true }
    },
    {
      title: 'Active',
      value: banners.filter(banner => banner.active).length.toString(),
      icon: '✅',
      trend: { value: 5, isPositive: true }
    },
    {
      title: 'Home Position',
      value: banners.filter(banner => banner.vi_tri === 'Home').length.toString(),
      icon: '🏠',
      trend: { value: 3, isPositive: true }
    },
    {
      title: 'Promotion Banners',
      value: banners.filter(banner => banner.vi_tri?.includes('Promotion')).length.toString(),
      icon: '🎯',
      trend: { value: 2, isPositive: true }
    }
  ];

  const handleViewBanner = (banner: Banner) => {
    navigate(`/admin/banners/new/${banner.id_banner}`);
  };

  const handleEditBanner = (banner: Banner) => {
    navigate(`/admin/banners/new/${banner.id_banner}`);
  };

  const handleDeleteBanner = async (banner: Banner) => {
    if (window.confirm(`Are you sure you want to delete "${banner.tieu_de || 'this banner'}"?`)) {
      try {
        // Note: There's no delete method in the current API, but we can implement it
        console.log('Delete banner:', banner.id_banner);
        // await bannersService.delete(banner.id_banner);
        // Refresh the list after deletion
        const response = await bannersService.list();
        setBanners(response.data);
      } catch (error) {
        console.error('Error deleting banner:', error);
        setError('Failed to delete banner');
      }
    }
  };

  const handleAddBanner = () => {
    navigate('/admin/banners/new');
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = bannerStatuses.find(s => s.id === status);
    return (
      <span className={`banner-manage__status-badge banner-manage__status-badge--${statusConfig?.color || 'muted'}`}>
        {statusConfig?.label || status}
      </span>
    );
  };

  const getPositionBadge = (position: string) => {
    const positionConfig = bannerPositions.find(p => p.id === position);
    return (
      <span className="banner-manage__position-badge">
        {positionConfig?.label || position}
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
      key: 'link_url',
      label: 'Image',
      width: '100px',
      render: (value: string, item: Banner) => (
        <div className="banner-manage__image">
          <img src={item.url_anh} alt={item.tieu_de || 'Banner'} className="banner-manage__image-img" />
        </div>
      )
    },
    {
      key: 'tieu_de',
      label: 'Title',
      sortable: true,
      width: '250px',
      render: (value: string, item: Banner) => (
        <div className="banner-manage__banner-info">
          <Text variant="p" size="sm" color="primary" className="banner-manage__banner-title">
            {item.tieu_de || 'Untitled Banner'}
          </Text>
          <Text variant="p" size="xs" color="muted" className="banner-manage__banner-description">
            {item.mo_ta || 'No description'}
          </Text>
          <div className="banner-manage__banner-meta">
            <Text variant="span" size="xs" color="muted">
              Order: {item.thu_tu} • {getPositionBadge(item.vi_tri || 'Home')}
            </Text>
          </div>
        </div>
      )
    },
    {
      key: 'active',
      label: 'Status',
      width: '100px',
      render: (value: boolean) => getStatusBadge(value ? 'active' : 'inactive')
    },
    {
      key: 'vi_tri',
      label: 'Position',
      width: '120px',
      render: (value: string) => getPositionBadge(value || 'Home')
    },
    {
      key: 'thu_tu',
      label: 'Order',
      sortable: true,
      width: '80px',
      render: (value: number) => (
        <Text variant="span" size="sm" color="primary">
          {value}
        </Text>
      )
    },
    {
      key: 'thoi_gian_tao',
      label: 'Created',
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
      <div className={`banner-manage ${className}`}>
        <div className="banner-manage__loading">
          <Text variant="p" size="lg" color="primary">Loading banners...</Text>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`banner-manage ${className}`}>
        <div className="banner-manage__error">
          <Text variant="p" size="lg" color="primary">{error}</Text>
          <Button
            variant="primary"
            size="md"
            onClick={() => window.location.reload()}
            className="banner-manage__retry-btn"
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`banner-manage ${className}`}>
      <div className="banner-manage__header">
        <div className="banner-manage__header-left">
          <Title level="h1" size="xl" color="primary" className="banner-manage__title">
            Banner Management
          </Title>
          <Text variant="p" size="md" color="secondary" className="banner-manage__subtitle">
            Manage promotional banners and advertisements
          </Text>
        </div>
        <div className="banner-manage__header-right">
          <Button
            variant="primary"
            size="md"
            onClick={handleAddBanner}
            className="banner-manage__add-btn"
          >
            + New Banner
          </Button>
        </div>
      </div>

      <div className="banner-manage__stats">
        {statsData.map((stat, index) => (
          <AdminStatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
            className="banner-manage__stat-card"
          />
        ))}
      </div>

      <div className="banner-manage__filters">
        <div className="banner-manage__filter-group">
          <Input
            type="text"
            placeholder={bannerFilterConfig.searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="banner-manage__search-input"
          />
        </div>
        
        <div className="banner-manage__filter-group">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as BannerStatus | 'all')}
            className="banner-manage__filter-select"
          >
            <option value="all">All Status</option>
            {bannerStatuses.map(status => (
              <option key={status.id} value={status.id}>
                {status.label}
              </option>
            ))}
          </select>
        </div>

        <div className="banner-manage__filter-group">
          <select
            value={positionFilter}
            onChange={(e) => setPositionFilter(e.target.value as BannerPosition | 'all')}
            className="banner-manage__filter-select"
          >
            <option value="all">All Positions</option>
            {bannerPositions.map(position => (
              <option key={position.id} value={position.id}>
                {position.label}
              </option>
            ))}
          </select>
        </div>

        <div className="banner-manage__filter-group">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="banner-manage__filter-select"
          >
            {bannerSortOptions.map(option => (
              <option key={`${option.id}-asc`} value={`${option.id}-asc`}>
                {option.label} (A-Z)
              </option>
            ))}
            {bannerSortOptions.map(option => (
              <option key={`${option.id}-desc`} value={`${option.id}-desc`}>
                {option.label} (Z-A)
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="banner-manage__table-section">
        <AdminTable
          data={filteredAndSortedBanners}
          columns={tableColumns}
          onView={handleViewBanner}
          onEdit={handleEditBanner}
          onDelete={handleDeleteBanner}
          emptyMessage="No banners found matching your criteria"
        />
      </div>
    </div>
  );
};

export default BannerManage;
