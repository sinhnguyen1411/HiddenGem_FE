import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Title, Text, Button, Input, AdminTable } from '../../components';
import { cafesService } from '../../services/cafes';
import { adminService } from '../../services/admin';
import { Cafe } from '../../services/types';
import './StoresManage.css';

interface StoresManageProps {
  className?: string;
}

const StoresManage: React.FC<StoresManageProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  const [stores, setStores] = useState<Cafe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [cityFilter, setCityFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name-asc');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [selectedStore, setSelectedStore] = useState<Cafe | null>(null);
  const [approving, setApproving] = useState(false);

  // Fetch stores from API
  useEffect(() => {
    const fetchStores = async () => {
      try {
        setLoading(true);
        const response = await cafesService.list();
        setStores(response.data.items);
      } catch (err) {
        setError('Failed to load stores');
        console.error('Error fetching stores:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, []);

  // Static data for filters
  const storeStatuses = [
    { id: 'all', label: 'All Status' },
    { id: '1', label: 'Waiting for Approval' },
    { id: '2', label: 'Active' },
    { id: '3', label: 'Deleted' }
  ];

  const storeSortOptions = [
    { value: 'name-asc', label: 'Name A-Z' },
    { value: 'name-desc', label: 'Name Z-A' },
    { value: 'rating-desc', label: 'Highest Rating' },
    { value: 'rating-asc', label: 'Lowest Rating' },
    { value: 'views-desc', label: 'Most Views' },
    { value: 'views-asc', label: 'Least Views' },
    { value: 'created-desc', label: 'Newest First' },
    { value: 'created-asc', label: 'Oldest First' }
  ];

  const cityOptions = [
    { value: 'all', label: 'All Cities' },
    { value: 'ho chi minh', label: 'Ho Chi Minh' },
    { value: 'hanoi', label: 'Hanoi' },
    { value: 'da nang', label: 'Da Nang' },
    { value: 'can tho', label: 'Can Tho' },
    { value: 'hue', label: 'Hue' }
  ];

  const storeFilter = {
    searchPlaceholder: 'Search stores...'
  };

  // Filter and sort stores
  const filteredAndSortedStores = useMemo(() => {
    let filtered = stores.filter(store => {
      const matchesSearch = store.ten_cua_hang.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (store.mo_ta && store.mo_ta.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesStatus = statusFilter === 'all' || store.id_trang_thai?.toString() === statusFilter;
      
      // Since we don't have city field in API, we'll consider all cities for now
      const matchesCity = true;
      
      return matchesSearch && matchesStatus && matchesCity;
    });

    // Sort stores
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.ten_cua_hang.localeCompare(b.ten_cua_hang);
        case 'name-desc':
          return b.ten_cua_hang.localeCompare(a.ten_cua_hang);
        case 'rating-desc':
          return parseFloat(b.diem_danh_gia_trung_binh) - parseFloat(a.diem_danh_gia_trung_binh);
        case 'rating-asc':
          return parseFloat(a.diem_danh_gia_trung_binh) - parseFloat(b.diem_danh_gia_trung_binh);
        case 'views-desc':
          return b.luot_xem - a.luot_xem;
        case 'views-asc':
          return a.luot_xem - b.luot_xem;
        case 'created-desc':
          return new Date(b.ngay_tao).getTime() - new Date(a.ngay_tao).getTime();
        case 'created-asc':
          return new Date(a.ngay_tao).getTime() - new Date(b.ngay_tao).getTime();
        default:
          return 0;
      }
    });

    return filtered;
  }, [stores, searchTerm, statusFilter, sortBy]);

  const handleViewStore = (store: Cafe) => {
    navigate(`/admin/stores/${store.id_cua_hang}`, { state: { store } });
  };

  const handleEditStore = (store: Cafe) => {
    navigate(`/admin/stores/${store.id_cua_hang}/edit`);
  };

  const handleDeleteStore = (store: Cafe) => {
    if (window.confirm(`Are you sure you want to delete "${store.ten_cua_hang}"?`)) {
      // In a real app, this would make an API call
      console.log('Delete store:', store.id_cua_hang);
    }
  };

  const handleAddStore = () => {
    setShowAddModal(true);
  };

  const handleApproveStore = (store: Cafe) => {
    setSelectedStore(store);
    setShowApproveModal(true);
  };

  const confirmApproveStore = async () => {
    if (!selectedStore) return;

    try {
      setApproving(true);
      await adminService.reviewStore(selectedStore.id_cua_hang, { action: 'approve' });
      
      // Reload stores data
      const response = await cafesService.list();
      setStores(response.data.items);
      
      setShowApproveModal(false);
      setSelectedStore(null);
    } catch (err) {
      console.error('Error approving store:', err);
      // You could add a toast notification here
    } finally {
      setApproving(false);
    }
  };

  const cancelApproveStore = () => {
    setShowApproveModal(false);
    setSelectedStore(null);
  };

  const handleSort = (key: string, direction: 'asc' | 'desc') => {
    // This would be handled by the table component
    console.log('Sort by:', key, direction);
  };

  const getStatusBadge = (statusId: number | null) => {
    switch (statusId) {
      case 1:
        return (
          <span className="stores-manage__status-badge stores-manage__status-badge--pending">
            Waiting for Approval
          </span>
        );
      case 2:
        return (
          <span className="stores-manage__status-badge stores-manage__status-badge--active">
            Active
          </span>
        );
      case 3:
        return (
          <span className="stores-manage__status-badge stores-manage__status-badge--deleted">
            Deleted
          </span>
        );
      default:
        return (
          <span className="stores-manage__status-badge stores-manage__status-badge--unknown">
            Unknown
          </span>
        );
    }
  };

  const tableColumns = [
    {
      key: 'image',
      label: 'Image',
      width: '80px',
      render: (value: string, item: Cafe) => (
        <div className="stores-manage__store-image">
          <img 
            src={'https://via.placeholder.com/60x60/8B4513/FFFFFF?text=☕'} 
            alt={item.ten_cua_hang} 
            className="stores-manage__image"
          />
        </div>
      )
    },
    {
      key: 'ten_cua_hang',
      label: 'Store Name',
      sortable: true,
      width: '200px',
      render: (value: string, item: Cafe) => (
        <div className="stores-manage__store-info">
          <Text variant="p" size="sm" color="primary" className="stores-manage__store-name">
            {value}
          </Text>
          <Text variant="p" size="xs" color="muted" className="stores-manage__store-owner">
            ID: {item.id_cua_hang}
          </Text>
        </div>
      )
    },
    {
      key: 'mo_ta',
      label: 'Description',
      width: '250px',
      render: (value: string, item: Cafe) => (
        <div className="stores-manage__location">
          <Text variant="p" size="sm" color="primary" className="stores-manage__address">
            {value || 'No description available'}
          </Text>
          <Text variant="p" size="xs" color="muted" className="stores-manage__city">
            Owner ID: {item.id_chu_so_huu}
          </Text>
        </div>
      )
    },
    {
      key: 'diem_danh_gia_trung_binh',
      label: 'Rating',
      sortable: true,
      width: '120px',
      render: (value: string) => (
        <Text variant="span" size="sm" color="primary">
          {parseFloat(value).toFixed(1)} ⭐
        </Text>
      )
    },
    {
      key: 'luot_xem',
      label: 'Views',
      sortable: true,
      width: '100px',
      render: (value: number) => (
        <Text variant="span" size="sm" color="primary">
          {value}
        </Text>
      )
    },
    {
      key: 'id_trang_thai',
      label: 'Status',
      width: '150px',
      render: (value: number | null, item: Cafe) => (
        <div className="stores-manage__status-cell">
          {getStatusBadge(value)}
          {value === 1 && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => handleApproveStore(item)}
              className="stores-manage__approve-btn"
            >
              Approve
            </Button>
          )}
        </div>
      )
    },
    {
      key: 'ngay_tao',
      label: 'Created',
      sortable: true,
      width: '120px',
      render: (value: string) => (
        <Text variant="span" size="sm" color="muted">
          {new Date(value).toLocaleDateString()}
        </Text>
      )
    }
  ];

  if (loading) {
    return (
      <div className={`stores-manage ${className}`}>
        <div className="stores-manage__loading">
          <Text>Loading stores...</Text>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`stores-manage ${className}`}>
        <div className="stores-manage__error">
          <Title level="h1" size="lg" color="primary">
            {error}
          </Title>
          <Button
            variant="primary"
            size="md"
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`stores-manage ${className}`}>
      <div className="stores-manage__header">
        <div className="stores-manage__title-section">
          <Title level="h1" size="xl" color="primary" className="stores-manage__title">
            Store Management
          </Title>
          <Text variant="p" size="md" color="secondary" className="stores-manage__subtitle">
            Manage all coffee shops in your platform
          </Text>
        </div>
        
        <div className="stores-manage__actions">
          <Button
            variant="primary"
            size="md"
            onClick={handleAddStore}
            className="stores-manage__add-btn"
          >
            + Add New Store
          </Button>
        </div>
      </div>

      <div className="stores-manage__filters">
        <div className="stores-manage__filter-group">
          <Input
            type="text"
            placeholder={storeFilter.searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="stores-manage__search-input"
          />
        </div>

        <div className="stores-manage__filter-group">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="stores-manage__filter-select"
          >
            {storeStatuses.map((status) => (
              <option key={status.id} value={status.id}>
                {status.label}
              </option>
            ))}
          </select>
        </div>

        <div className="stores-manage__filter-group">
          <select
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            className="stores-manage__filter-select"
          >
            {cityOptions.map((city) => (
              <option key={city.value} value={city.value}>
                {city.label}
              </option>
            ))}
          </select>
        </div>

        <div className="stores-manage__filter-group">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="stores-manage__filter-select"
          >
            {storeSortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="stores-manage__stats">
        <div className="stores-manage__stat">
          <Text variant="p" size="sm" color="muted" className="stores-manage__stat-label">
            Total Stores
          </Text>
          <Text variant="p" size="lg" color="primary" className="stores-manage__stat-value">
            {filteredAndSortedStores.length}
          </Text>
        </div>
        <div className="stores-manage__stat">
          <Text variant="p" size="sm" color="muted" className="stores-manage__stat-label">
            Active Stores
          </Text>
          <Text variant="p" size="lg" color="primary" className="stores-manage__stat-value">
            {filteredAndSortedStores.filter(store => store.id_trang_thai === 2).length}
          </Text>
        </div>
        <div className="stores-manage__stat">
          <Text variant="p" size="sm" color="muted" className="stores-manage__stat-label">
            Pending Approval
          </Text>
          <Text variant="p" size="lg" color="primary" className="stores-manage__stat-value">
            {filteredAndSortedStores.filter(store => store.id_trang_thai === 1).length}
          </Text>
        </div>
        <div className="stores-manage__stat">
          <Text variant="p" size="sm" color="muted" className="stores-manage__stat-label">
            Total Views
          </Text>
          <Text variant="p" size="lg" color="primary" className="stores-manage__stat-value">
            {filteredAndSortedStores.reduce((sum, store) => sum + store.luot_xem, 0)}
          </Text>
        </div>
        <div className="stores-manage__stat">
          <Text variant="p" size="sm" color="muted" className="stores-manage__stat-label">
            Avg Rating
          </Text>
          <Text variant="p" size="lg" color="primary" className="stores-manage__stat-value">
            {filteredAndSortedStores.length > 0 
              ? (filteredAndSortedStores.reduce((sum, store) => sum + parseFloat(store.diem_danh_gia_trung_binh), 0) / filteredAndSortedStores.length).toFixed(1)
              : '0.0'
            }
          </Text>
        </div>
      </div>

      <div className="stores-manage__table">
        <AdminTable
          columns={tableColumns}
          data={filteredAndSortedStores}
          onSort={handleSort}
          onView={handleViewStore}
          onEdit={handleEditStore}
          onDelete={handleDeleteStore}
          emptyMessage="No stores found matching your criteria"
        />
      </div>

      {showAddModal && (
        <div className="stores-manage__modal-overlay">
          <div className="stores-manage__modal">
            <div className="stores-manage__modal-header">
              <Title level="h2" size="lg" color="primary">
                Add New Store
              </Title>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAddModal(false)}
                className="stores-manage__modal-close"
              >
                ✕
              </Button>
            </div>
            <div className="stores-manage__modal-content">
              <Text variant="p" size="md" color="secondary">
                Store creation form would go here. This is a placeholder for the add store functionality.
              </Text>
            </div>
          </div>
        </div>
      )}

      {showApproveModal && selectedStore && (
        <div className="stores-manage__modal-overlay">
          <div className="stores-manage__modal">
            <div className="stores-manage__modal-header">
              <Title level="h2" size="lg" color="primary">
                Approve Store
              </Title>
              <Button
                variant="outline"
                size="sm"
                onClick={cancelApproveStore}
                className="stores-manage__modal-close"
                disabled={approving}
              >
                ✕
              </Button>
            </div>
            <div className="stores-manage__modal-content">
              <Text variant="p" size="md" color="secondary" className="stores-manage__modal-text">
                Are you sure you want to approve the store "{selectedStore.ten_cua_hang}"?
              </Text>
              <Text variant="p" size="sm" color="muted" className="stores-manage__modal-subtext">
                This action will change the store status to Active and make it visible to customers.
              </Text>
              <div className="stores-manage__modal-actions">
                <Button
                  variant="primary"
                  size="md"
                  onClick={confirmApproveStore}
                  disabled={approving}
                  className="stores-manage__modal-approve-btn"
                >
                  {approving ? 'Approving...' : 'Approve Store'}
                </Button>
                <Button
                  variant="outline"
                  size="md"
                  onClick={cancelApproveStore}
                  disabled={approving}
                  className="stores-manage__modal-cancel-btn"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoresManage;
