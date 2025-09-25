import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Title, Text, Button, Input, AdminStatsCard } from '../../components';
import { User } from '../../services/types';
import './UserDetailManage.css';

interface UserDetailManageProps {
  className?: string;
}

const UserDetailManage: React.FC<UserDetailManageProps> = ({ className = '' }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('overview');
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Partial<User>>({});

  useEffect(() => {
    if (id) {
      // First try to get from location state (if navigated from user list)
      if (location.state?.user) {
        setUser(location.state.user);
        setEditForm(location.state.user);
        return;
      }

      // If not in state, this would require a separate API call
      // For now, we'll show a message that user data is not available
      setUser(null);
    }
  }, [id, location.state]);

  if (!user) {
    return (
      <div className={`user-detail-manage ${className}`}>
        <div className="user-detail-manage__not-found">
          <Title level="h1" size="xl" color="primary">
            User Not Found
          </Title>
          <Text variant="p" size="md" color="secondary">
            {location.state?.user 
              ? 'User data is not available. Please navigate from the user list.'
              : 'The user you\'re looking for doesn\'t exist or data is not available.'
            }
          </Text>
          <Button
            variant="primary"
            size="md"
            onClick={() => navigate('/admin/users')}
            className="user-detail-manage__back-btn"
          >
            Back to Users
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
    console.log('Saving user:', editForm);
    setIsEditing(false);
    // Update the user state with the edited data
    setUser({ ...user, ...editForm });
  };

  const handleCancel = () => {
    setEditForm(user);
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof User, value: any) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }));
  };


  const getRoleBadge = (role: string) => {
    return (
      <span className={`user-detail-manage__role-badge user-detail-manage__role-badge--${role}`}>
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </span>
    );
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'activity', label: 'Activity', icon: '📈' },
    { id: 'orders', label: 'Orders', icon: '🛒' },
    { id: 'settings', label: 'Settings', icon: '⚙️' }
  ];

  const renderOverview = () => (
    <div className="user-detail-manage__overview">
      <div className="user-detail-manage__stats-grid">
        <AdminStatsCard
          title="User ID"
          value={user.id_user.toString()}
          icon="🆔"
          trend={{ value: 0, isPositive: true }}
        />
        <AdminStatsCard
          title="Role"
          value={user.role.charAt(0).toUpperCase() + user.role.slice(1)}
          icon="👤"
          trend={{ value: 0, isPositive: true }}
        />
        <AdminStatsCard
          title="Account Status"
          value="Active"
          icon="✅"
          trend={{ value: 0, isPositive: true }}
        />
        <AdminStatsCard
          title="Member Since"
          value={new Date(user.joined_at).toLocaleDateString()}
          icon="📅"
          trend={{ value: 0, isPositive: true }}
        />
      </div>

      <div className="user-detail-manage__info-cards">
        <div className="user-detail-manage__info-card">
          <Title level="h3" size="md" color="primary">
            Account Status
          </Title>
          <div className="user-detail-manage__status-info">
            {getRoleBadge(user.role)}
          </div>
        </div>

        <div className="user-detail-manage__info-card">
          <Title level="h3" size="md" color="primary">
            Contact Information
          </Title>
          <div className="user-detail-manage__contact-info">
            <Text variant="p" size="sm" color="primary">
              📧 {user.email}
            </Text>
            <Text variant="p" size="sm" color="primary">
              📞 {user.phone_number}
            </Text>
            <Text variant="p" size="sm" color="primary">
              👤 {user.username}
            </Text>
          </div>
        </div>

        <div className="user-detail-manage__info-card">
          <Title level="h3" size="md" color="primary">
            Account Details
          </Title>
          <div className="user-detail-manage__account-info">
            <Text variant="p" size="sm" color="primary">
              <strong>Joined:</strong> {new Date(user.joined_at).toLocaleDateString()}
            </Text>
            <Text variant="p" size="sm" color="primary">
              <strong>User ID:</strong> {user.id_user}
            </Text>
            <Text variant="p" size="sm" color="primary">
              <strong>Member for:</strong> {Math.floor((new Date().getTime() - new Date(user.joined_at).getTime()) / (1000 * 60 * 60 * 24))} days
            </Text>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="user-detail-manage__profile">
      <div className="user-detail-manage__form-section">
        <Title level="h3" size="lg" color="primary">
          User Profile
        </Title>
        
        <div className="user-detail-manage__form-grid">
          <div className="user-detail-manage__form-group">
            <label className="user-detail-manage__label">Full Name</label>
            <Input
              type="text"
              value={isEditing ? editForm.full_name || '' : user.full_name}
              onChange={(e) => handleInputChange('full_name', e.target.value)}
              disabled={!isEditing}
              className="user-detail-manage__input"
            />
          </div>

          <div className="user-detail-manage__form-group">
            <label className="user-detail-manage__label">Username</label>
            <Input
              type="text"
              value={isEditing ? editForm.username || '' : user.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
              disabled={!isEditing}
              className="user-detail-manage__input"
            />
          </div>

          <div className="user-detail-manage__form-group">
            <label className="user-detail-manage__label">Email</label>
            <Input
              type="email"
              value={isEditing ? editForm.email || '' : user.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              disabled={!isEditing}
              className="user-detail-manage__input"
            />
          </div>

          <div className="user-detail-manage__form-group">
            <label className="user-detail-manage__label">Phone Number</label>
            <Input
              type="text"
              value={isEditing ? editForm.phone_number || '' : user.phone_number}
              onChange={(e) => handleInputChange('phone_number', e.target.value)}
              disabled={!isEditing}
              className="user-detail-manage__input"
            />
          </div>

          <div className="user-detail-manage__form-group">
            <label className="user-detail-manage__label">Role</label>
            <select
              value={isEditing ? editForm.role || 'customer' : user.role}
              onChange={(e) => handleInputChange('role', e.target.value)}
              disabled={!isEditing}
              className="user-detail-manage__select"
            >
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
              <option value="moderator">Moderator</option>
            </select>
          </div>
        </div>

        <div className="user-detail-manage__form-actions">
          {isEditing ? (
            <>
              <Button
                variant="primary"
                size="md"
                onClick={handleSave}
                className="user-detail-manage__save-btn"
              >
                Save Changes
              </Button>
              <Button
                variant="outline"
                size="md"
                onClick={handleCancel}
                className="user-detail-manage__cancel-btn"
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button
              variant="primary"
              size="md"
              onClick={handleEdit}
              className="user-detail-manage__edit-btn"
            >
              Edit Profile
            </Button>
          )}
        </div>
      </div>
    </div>
  );

  const renderActivity = () => (
    <div className="user-detail-manage__activity">
      <Title level="h3" size="lg" color="primary">
        User Activity
      </Title>
      
      <div className="user-detail-manage__activity-placeholder">
        <Text variant="p" size="md" color="muted">
          Activity tracking would go here. This would include:
        </Text>
        <ul className="user-detail-manage__feature-list">
          <li>Login history and patterns</li>
          <li>Recent actions and interactions</li>
          <li>Page views and navigation</li>
          <li>Feature usage statistics</li>
          <li>Time spent on platform</li>
        </ul>
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="user-detail-manage__orders">
      <div className="user-detail-manage__section-header">
        <Title level="h3" size="lg" color="primary">
          Order History
        </Title>
        <Text variant="p" size="md" color="secondary">
          Order management for user: {user.full_name}
        </Text>
      </div>
      
      <div className="user-detail-manage__orders-placeholder">
        <Text variant="p" size="md" color="muted">
          Order management would go here. This would include:
        </Text>
        <ul className="user-detail-manage__feature-list">
          <li>Order listing with details and status</li>
          <li>Order history and tracking</li>
          <li>Refund and return management</li>
          <li>Order analytics and insights</li>
        </ul>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="user-detail-manage__settings">
      <Title level="h3" size="lg" color="primary">
        User Settings
      </Title>
      
      <div className="user-detail-manage__settings-placeholder">
        <Text variant="p" size="md" color="muted">
          Settings management would go here. This would include:
        </Text>
        <ul className="user-detail-manage__feature-list">
          <li>Notification preferences</li>
          <li>Privacy settings</li>
          <li>Account security options</li>
          <li>Data export and deletion</li>
          <li>Communication preferences</li>
        </ul>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'profile':
        return renderProfile();
      case 'activity':
        return renderActivity();
      case 'orders':
        return renderOrders();
      case 'settings':
        return renderSettings();
      default:
        return renderOverview();
    }
  };

  return (
    <div className={`user-detail-manage ${className}`}>
      <div className="user-detail-manage__header">
        <div className="user-detail-manage__header-left">
          <Button
            variant="outline"
            size="md"
            onClick={() => navigate('/admin/users')}
            className="user-detail-manage__back-btn"
          >
            ← Back to Users
          </Button>
          <div className="user-detail-manage__title-section">
            <Title level="h1" size="xl" color="primary" className="user-detail-manage__title">
              {user.full_name}
            </Title>
            <Text variant="p" size="md" color="secondary" className="user-detail-manage__subtitle">
              {user.email} • {user.username}
            </Text>
          </div>
        </div>
        
        <div className="user-detail-manage__header-right">
          <div className="user-detail-manage__user-avatar">
            <img src={'https://icons.veryicon.com/png/o/miscellaneous/two-color-webpage-small-icon/user-244.png'} alt={user.full_name} className="user-detail-manage__avatar-img" />
          </div>
        </div>
      </div>

      <div className="user-detail-manage__tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`user-detail-manage__tab ${
              activeTab === tab.id ? 'user-detail-manage__tab--active' : ''
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="user-detail-manage__tab-icon">{tab.icon}</span>
            <Text variant="span" size="sm" color={activeTab === tab.id ? 'primary' : 'muted'}>
              {tab.label}
            </Text>
          </button>
        ))}
      </div>

      <div className="user-detail-manage__content">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default UserDetailManage;
