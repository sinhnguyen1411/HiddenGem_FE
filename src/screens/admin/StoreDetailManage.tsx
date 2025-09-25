import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Title, Text, Button, Input, AdminStatsCard } from '../../components';
import { Cafe } from '../../services/types';
import './StoreDetailManage.css';

interface StoreDetailManageProps {
  className?: string;
}

const StoreDetailManage: React.FC<StoreDetailManageProps> = ({ className = '' }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('overview');
  const [store, setStore] = useState<Cafe | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Partial<Cafe>>({});

  useEffect(() => {
    if (id) {
      // First try to get from location state (if navigated from store list)
      if (location.state?.store) {
        setStore(location.state.store);
        setEditForm(location.state.store);
        return;
      }

      // If not in state, this would require a separate API call
      // For now, we'll show a message that store data is not available
      setStore(null);
    }
  }, [id, location.state]);

  if (!store) {
    return (
      <div className={`store-detail-manage ${className}`}>
        <div className="store-detail-manage__not-found">
          <Title level="h1" size="xl" color="primary">
            Store Not Found
          </Title>
          <Text variant="p" size="md" color="secondary">
            {location.state?.store 
              ? 'Store data is not available. Please navigate from the store list.'
              : 'The store you\'re looking for doesn\'t exist or data is not available.'
            }
          </Text>
          <Button
            variant="primary"
            size="md"
            onClick={() => navigate('/admin/stores')}
            className="store-detail-manage__back-btn"
          >
            Back to Stores
          </Button>
        </div>
      </div>
    );
  }

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // In a real app, this would make an API call
    console.log('Saving store:', editForm);
    setIsEditing(false);
    // Update the store state with the edited data
    setStore({ ...store, ...editForm });
  };

  const handleCancel = () => {
    setEditForm(store);
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof Cafe, value: any) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getStatusLabel = (statusId: number | null | undefined) => {
    switch (statusId) {
      case 1:
        return 'Waiting for Approval';
      case 2:
        return 'Active';
      case 3:
        return 'Deleted';
      default:
        return 'Unknown';
    }
  };

  const getStatusClass = (statusId: number | null | undefined) => {
    switch (statusId) {
      case 1:
        return 'pending';
      case 2:
        return 'active';
      case 3:
        return 'deleted';
      default:
        return 'unknown';
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'details', label: 'Store Details', icon: '🏪' },
    { id: 'products', label: 'Products', icon: '☕' },
    { id: 'reviews', label: 'Reviews', icon: '⭐' },
    { id: 'analytics', label: 'Analytics', icon: '📈' },
    { id: 'settings', label: 'Settings', icon: '⚙️' }
  ];

  const renderOverview = () => (
    <div className="store-detail-manage__overview">
      <div className="store-detail-manage__stats-grid">
        <AdminStatsCard
          title="Store ID"
          value={store.id_cua_hang.toString()}
          icon="🆔"
          trend={{ value: 0, isPositive: true }}
        />
        <AdminStatsCard
          title="Average Rating"
          value={parseFloat(store.diem_danh_gia_trung_binh).toFixed(1)}
          icon="⭐"
          trend={{ value: 0, isPositive: true }}
        />
        <AdminStatsCard
          title="Total Views"
          value={store.luot_xem.toString()}
          icon="👁️"
          trend={{ value: 0, isPositive: true }}
        />
        <AdminStatsCard
          title="Owner ID"
          value={store.id_chu_so_huu.toString()}
          icon="👤"
          trend={{ value: 0, isPositive: true }}
        />
      </div>

      <div className="store-detail-manage__info-cards">
        <div className="store-detail-manage__info-card">
          <Title level="h3" size="md" color="primary">
            Store Status
          </Title>
          <div className="store-detail-manage__status-info">
            <div className={`store-detail-manage__status-badge store-detail-manage__status-badge--${getStatusClass(store.id_trang_thai)}`}>
              {getStatusLabel(store.id_trang_thai)}
            </div>
          </div>
        </div>

        <div className="store-detail-manage__info-card">
          <Title level="h3" size="md" color="primary">
            Store Information
          </Title>
          <div className="store-detail-manage__contact-info">
            <Text variant="p" size="sm" color="primary">
              🏪 {store.ten_cua_hang}
            </Text>
            <Text variant="p" size="sm" color="primary">
              📝 {store.mo_ta || 'No description available'}
            </Text>
            <Text variant="p" size="sm" color="primary">
              📅 Created: {new Date(store.ngay_tao).toLocaleDateString()}
            </Text>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDetails = () => (
    <div className="store-detail-manage__details">
      <div className="store-detail-manage__form-section">
        <Title level="h3" size="lg" color="primary">
          Store Information
        </Title>
        
        <div className="store-detail-manage__form-grid">
          <div className="store-detail-manage__form-group">
            <label className="store-detail-manage__label">Store Name</label>
            <Input
              type="text"
              value={isEditing ? editForm.ten_cua_hang || '' : store.ten_cua_hang}
              onChange={(e) => handleInputChange('ten_cua_hang', e.target.value)}
              disabled={!isEditing}
              className="store-detail-manage__input"
            />
          </div>

          <div className="store-detail-manage__form-group">
            <label className="store-detail-manage__label">Store ID</label>
            <Input
              type="text"
              value={store.id_cua_hang.toString()}
              disabled={true}
              className="store-detail-manage__input"
            />
          </div>

          <div className="store-detail-manage__form-group">
            <label className="store-detail-manage__label">Owner ID</label>
            <Input
              type="text"
              value={store.id_chu_so_huu.toString()}
              disabled={true}
              className="store-detail-manage__input"
            />
          </div>

          <div className="store-detail-manage__form-group">
            <label className="store-detail-manage__label">Description</label>
            <Input
              type="text"
              value={isEditing ? editForm.mo_ta || '' : store.mo_ta || ''}
              onChange={(e) => handleInputChange('mo_ta', e.target.value)}
              disabled={!isEditing}
              className="store-detail-manage__input"
            />
          </div>

          <div className="store-detail-manage__form-group">
            <label className="store-detail-manage__label">Average Rating</label>
            <Input
              type="text"
              value={parseFloat(store.diem_danh_gia_trung_binh).toFixed(1)}
              disabled={true}
              className="store-detail-manage__input"
            />
          </div>

          <div className="store-detail-manage__form-group">
            <label className="store-detail-manage__label">Total Views</label>
            <Input
              type="text"
              value={store.luot_xem.toString()}
              disabled={true}
              className="store-detail-manage__input"
            />
          </div>

          <div className="store-detail-manage__form-group">
            <label className="store-detail-manage__label">Status ID</label>
            <Input
              type="text"
              value={store.id_trang_thai?.toString() || 'Not set'}
              disabled={true}
              className="store-detail-manage__input"
            />
          </div>

          <div className="store-detail-manage__form-group">
            <label className="store-detail-manage__label">Location ID</label>
            <Input
              type="text"
              value={store.id_vi_tri?.toString() || 'Not set'}
              disabled={true}
              className="store-detail-manage__input"
            />
          </div>

          <div className="store-detail-manage__form-group">
            <label className="store-detail-manage__label">Created Date</label>
            <Input
              type="text"
              value={new Date(store.ngay_tao).toLocaleDateString()}
              disabled={true}
              className="store-detail-manage__input"
            />
          </div>
        </div>

        <div className="store-detail-manage__form-actions">
          {isEditing ? (
            <>
              <Button
                variant="primary"
                size="md"
                onClick={handleSave}
                className="store-detail-manage__save-btn"
              >
                Save Changes
              </Button>
              <Button
                variant="outline"
                size="md"
                onClick={handleCancel}
                className="store-detail-manage__cancel-btn"
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button
              variant="primary"
              size="md"
              onClick={handleEdit}
              className="store-detail-manage__edit-btn"
            >
              Edit Store
            </Button>
          )}
        </div>
      </div>
    </div>
  );

  const renderProducts = () => (
    <div className="store-detail-manage__products">
      <div className="store-detail-manage__section-header">
        <Title level="h3" size="lg" color="primary">
          Store Products
        </Title>
        <Button
          variant="primary"
          size="md"
          className="store-detail-manage__add-product-btn"
        >
          + Add Product
        </Button>
      </div>
      
      <div className="store-detail-manage__products-placeholder">
        <Text variant="p" size="md" color="muted">
          Product management interface would go here. This would include:
        </Text>
        <ul className="store-detail-manage__feature-list">
          <li>Product listing with images and details</li>
          <li>Add/Edit/Delete products</li>
          <li>Product categories and pricing</li>
          <li>Inventory management</li>
          <li>Product status and availability</li>
        </ul>
      </div>
    </div>
  );

  const renderReviews = () => (
    <div className="store-detail-manage__reviews">
      <div className="store-detail-manage__section-header">
        <Title level="h3" size="lg" color="primary">
          Customer Reviews
        </Title>
        <div className="store-detail-manage__review-stats">
          <Text variant="p" size="md" color="primary">
            Average Rating: {parseFloat(store.diem_danh_gia_trung_binh).toFixed(1)} ⭐
          </Text>
          <Text variant="p" size="sm" color="muted">
            Total Views: {store.luot_xem}
          </Text>
        </div>
      </div>
      
      <div className="store-detail-manage__reviews-placeholder">
        <Text variant="p" size="md" color="muted">
          Review management interface would go here. This would include:
        </Text>
        <ul className="store-detail-manage__feature-list">
          <li>Review listing with customer details</li>
          <li>Review moderation tools</li>
          <li>Response to reviews</li>
          <li>Review analytics and insights</li>
        </ul>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="store-detail-manage__analytics">
      <Title level="h3" size="lg" color="primary">
        Store Analytics
      </Title>
      
      <div className="store-detail-manage__analytics-placeholder">
        <Text variant="p" size="md" color="muted">
          Analytics dashboard would go here. This would include:
        </Text>
        <ul className="store-detail-manage__feature-list">
          <li>Visitor statistics and trends</li>
          <li>Revenue and sales data</li>
          <li>Popular products and categories</li>
          <li>Customer demographics</li>
          <li>Performance metrics and KPIs</li>
        </ul>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="store-detail-manage__settings">
      <Title level="h3" size="lg" color="primary">
        Store Settings
      </Title>
      
      <div className="store-detail-manage__settings-placeholder">
        <Text variant="p" size="md" color="muted">
          Settings management would go here. This would include:
        </Text>
        <ul className="store-detail-manage__feature-list">
          <li>Store status and visibility settings</li>
          <li>Notification preferences</li>
          <li>Payment and billing settings</li>
          <li>Security and access controls</li>
          <li>Integration settings</li>
        </ul>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'details':
        return renderDetails();
      case 'products':
        return renderProducts();
      case 'reviews':
        return renderReviews();
      case 'analytics':
        return renderAnalytics();
      case 'settings':
        return renderSettings();
      default:
        return renderOverview();
    }
  };

  return (
    <div className={`store-detail-manage ${className}`}>
      <div className="store-detail-manage__header">
        <div className="store-detail-manage__header-left">
          <Button
            variant="outline"
            size="md"
            onClick={() => navigate('/admin/stores')}
            className="store-detail-manage__back-btn"
          >
            ← Back to Stores
          </Button>
          <div className="store-detail-manage__title-section">
            <Title level="h1" size="xl" color="primary" className="store-detail-manage__title">
              {store.ten_cua_hang}
            </Title>
            <Text variant="p" size="md" color="secondary" className="store-detail-manage__subtitle">
              ID: {store.id_cua_hang} • Owner: {store.id_chu_so_huu}
            </Text>
          </div>
        </div>
        
        <div className="store-detail-manage__header-right">
          <div className="store-detail-manage__store-image">
            <img 
              src={'https://via.placeholder.com/80x80/8B4513/FFFFFF?text=☕'} 
              alt={store.ten_cua_hang} 
              className="store-detail-manage__image" 
            />
          </div>
        </div>
      </div>

      <div className="store-detail-manage__tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`store-detail-manage__tab ${
              activeTab === tab.id ? 'store-detail-manage__tab--active' : ''
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="store-detail-manage__tab-icon">{tab.icon}</span>
            <Text variant="span" size="sm" color={activeTab === tab.id ? 'primary' : 'muted'}>
              {tab.label}
            </Text>
          </button>
        ))}
      </div>

      <div className="store-detail-manage__content">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default StoreDetailManage;
