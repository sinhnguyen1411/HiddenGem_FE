import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Text, Title, Button } from '../../components';
import { useAuth } from '../../components/AuthProvider';
import './AdminProfile.css';

interface AdminProfileProps {
  className?: string;
}

const AdminProfile: React.FC<AdminProfileProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className={`admin-profile ${className}`}>
      <div className="admin-profile__header">
        <div className="admin-profile__breadcrumbs">
          <Text variant="span" size="sm" color="secondary">Pages / Users</Text>
          <Text variant="span" size="xl" color="primary" className="admin-profile__breadcrumbs-current">Users</Text>
        </div>

        <button className="admin-profile__back" onClick={handleBack} aria-label="Back">
          <Text variant="span" size="md" color="white">Back</Text>
        </button>
      </div>

      <div className="admin-profile__card">
        <div className="admin-profile__identity">
          <div className="admin-profile__avatar" aria-hidden="true" />
          <div className="admin-profile__who">
            <Text variant="p" size="lg" color="black" className="admin-profile__name">
              {user?.username || 'Admin User'}
            </Text>
            <Text variant="p" size="sm" color="black" className="admin-profile__email admin-profile__muted">
              {user?.email || 'admin@example.com'}
            </Text>
          </div>
        </div>

        <div className="admin-profile__grid">
          <div className="admin-profile__field">
            <Text variant="span" size="sm" color="black" className="admin-profile__label">Full Name</Text>
            <div className="admin-profile__input" aria-readonly>
              <Text variant="span" size="sm" color="black" className="admin-profile__placeholder admin-profile__muted">
                {user?.username || 'Your First Name'}
              </Text>
            </div>
          </div>

          <div className="admin-profile__field">
            <Text variant="span" size="sm" color="black" className="admin-profile__label">Nick Name</Text>
            <div className="admin-profile__input" aria-readonly>
              <Text variant="span" size="sm" color="black" className="admin-profile__placeholder admin-profile__muted">
                {user?.username || 'Your First Name'}
              </Text>
            </div>
          </div>

          <div className="admin-profile__field">
            <Text variant="span" size="sm" color="black" className="admin-profile__label">Gender</Text>
            <div className="admin-profile__input" aria-readonly>
              <Text variant="span" size="sm" color="black" className="admin-profile__placeholder admin-profile__muted">—</Text>
            </div>
          </div>

          <div className="admin-profile__field">
            <Text variant="span" size="sm" color="black" className="admin-profile__label">Country</Text>
            <div className="admin-profile__input" aria-readonly>
              <Text variant="span" size="sm" color="black" className="admin-profile__placeholder admin-profile__muted">—</Text>
            </div>
          </div>

          <div className="admin-profile__field">
            <Text variant="span" size="sm" color="black" className="admin-profile__label">Time Zone</Text>
            <div className="admin-profile__input" aria-readonly>
              <Text variant="span" size="sm" color="black" className="admin-profile__placeholder admin-profile__muted">—</Text>
            </div>
          </div>

          <div className="admin-profile__field">
            <Text variant="span" size="sm" color="black" className="admin-profile__label">Language</Text>
            <div className="admin-profile__input" aria-readonly>
              <Text variant="span" size="sm" color="black" className="admin-profile__placeholder admin-profile__muted">—</Text>
            </div>
          </div>
        </div>

        <div className="admin-profile__emailSection">
          <div className="admin-profile__emailIcon" aria-hidden="true" />
          <div className="admin-profile__emailText">
            <Text variant="span" size="md" color="black">Your email Address</Text>
            <div className="admin-profile__emailMeta">
              <Text variant="span" size="sm" color="black">{user?.email || 'admin@example.com'}</Text>
              <Text variant="span" size="sm" color="black" className="admin-profile__muted">1 month ago</Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;


