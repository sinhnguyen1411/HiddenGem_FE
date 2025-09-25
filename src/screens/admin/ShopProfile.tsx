import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Text, Input, Button, useLoading } from '../../components';
import { useAuth } from '../../components/AuthProvider';
import { cafesService } from '../../services/cafes';
import { Cafe } from '../../services/types';
import './ShopProfile.css';

interface ShopProfileProps {
  className?: string;
}

const ShopProfile: React.FC<ShopProfileProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showLoading, hideLoading } = useLoading();
  const [panelMode, setPanelMode] = useState<'menu' | 'change-password' | 'edit-profile'>('menu');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  // Store data states
  const [storeData, setStoreData] = useState<Cafe | null>(null);
  const [loading, setLoading] = useState(true);
  const [storeError, setStoreError] = useState<string | null>(null);

  // Fetch store data on component mount
  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        setLoading(true);
        setStoreError(null);
        showLoading('Loading store profile...');
        
        // For now, we'll fetch the first store from the list
        // In a real app, you might have a specific store ID for the current user
        const response = await cafesService.list(1, 1);
        if (response.data.items.length > 0) {
          const store = response.data.items[0];
          setStoreData(store);
        } else {
          setStoreError('No store data found');
        }
      } catch (error) {
        console.error('Error fetching store data:', error);
        setStoreError('Failed to load store data');
      } finally {
        setLoading(false);
        hideLoading();
      }
    };

    fetchStoreData();
  }, [showLoading, hideLoading]);

  const goEditStore = () => navigate('/admin/store/profile/edit');

  const openChangePassword = () => {
    setPanelMode('change-password');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setError(null);
  };

  const cancelChangePassword = () => {
    setPanelMode('menu');
    setError(null);
  };

  const onSavePassword = () => {
    setError(null);
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('New password and confirmation do not match');
      return;
    }
    // Here would be API call to change password.
    setPanelMode('menu');
  };

  // Edit profile state
  const [editName, setEditName] = useState<string>(user?.username || '');
  const [editEmail, setEditEmail] = useState<string>(user?.email || '');
  const [editMobile, setEditMobile] = useState<string>(user?.phone_number || '');
  const [editLocation, setEditLocation] = useState<string>('');

  const openEditProfile = () => {
    setPanelMode('edit-profile');
    setEditName(user?.username || '');
    setEditEmail(user?.email || '');
    setEditMobile('');
    setEditLocation('');
    setError(null);
  };

  const cancelEditProfile = () => {
    setPanelMode('menu');
    setError(null);
  };

  const onSaveProfile = () => {
    setError(null);
    if (!editName || !editEmail || !editMobile || !editLocation) {
      setError('Please fill in all fields');
      return;
    }
    // Here would be API call to save profile changes.
    setPanelMode('menu');
  };

  if (loading) {
    return (
      <div className={`shop-profile ${className}`}>
        <div className="shop-profile__loading">
          <Text variant="p" size="md" color="muted">Loading store profile...</Text>
        </div>
      </div>
    );
  }

  if (storeError) {
    return (
      <div className={`shop-profile ${className}`}>
        <div className="shop-profile__error">
          <Text variant="p" size="md" color="primary">{storeError}</Text>
        </div>
      </div>
    );
  }

  return (
    <div className={`shop-profile ${className}`}>
      <div className="shop-profile__top">
        <div className="shop-profile__cover">
          <div className="shop-profile__photo" aria-hidden="true" />
          <div className="shop-profile__topRight">
            <div className="shop-profile__titleRow">
              <Text variant="p" size="xl" color="black" className="shop-profile__storeName">
                {storeData?.ten_cua_hang || 'Store Name'}
              </Text>
              <button className="shop-profile__editBtn" onClick={goEditStore} aria-label="Edit store">
                <Text variant="p" size="md" color="black">Edit</Text>
              </button>
            </div>
            <div className="shop-profile__details">
              <Text variant="p" size="md" color="black">
                {storeData?.mo_ta || 'Store description not available'}
              </Text>
            </div>
            <div className="shop-profile__details">
              <Text variant="p" size="md" color="black">
                Rating: {storeData?.diem_danh_gia_trung_binh || 'N/A'} ⭐
              </Text>
              <Text variant="p" size="md" color="black">
                Views: {storeData?.luot_xem || 0}
              </Text>
              <Text variant="p" size="md" color="black">
                Store ID: {storeData?.id_cua_hang || 'N/A'}
              </Text>
            </div>
            <div className="shop-profile__contacts">
              <div className="shop-profile__contactItem">
                <span className="shop-profile__icon shop-profile__icon--phone" />
                <Text variant="p" size="md" color="black">{user?.phone_number || ''}</Text>
              </div>
              <div className="shop-profile__contactItem">
                <span className="shop-profile__icon shop-profile__icon--email" />
                <Text variant="p" size="md" color="black">{user?.email || ''}</Text>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="shop-profile__bottom">
        <div className="shop-profile__ownerCard">
          <div className="shop-profile__ownerHeader">
            <div className="shop-profile__ownerAvatar" aria-hidden="true">
            <img src={'https://icons.veryicon.com/png/o/miscellaneous/two-color-webpage-small-icon/user-244.png'} alt={user?.full_name} className="shop-profile__ownerAvatar" />

              </div>
            <div>
              <Text variant="p" size="md" color="black">{user?.username || 'LE THACH PHUOC'}</Text>
              <Text variant="p" size="sm" color="black" className="shop-profile__muted">{user?.email || 'phuoc@gmail.com'}</Text>
            </div>
          </div>
          <div className="shop-profile__ownerField">
            <Text variant="p" size="sm" color="black">Name</Text>
            <Text variant="p" size="sm" color="black" className="shop-profile__subtle">{user?.username || 'LE THACH PHUOC'}</Text>
          </div>
          <div className="shop-profile__divider" />
          <div className="shop-profile__ownerField shop-profile__ownerField--row">
            <div className="shop-profile__ownerFieldCol">
              <Text variant="p" size="sm" color="black">Email account</Text>
              <Text variant="p" size="sm" color="black" className="shop-profile__subtle">{user?.email || 'phuoc@gmail.com'}</Text>
            </div>
            <div className="shop-profile__ownerFieldCol">
              <Text variant="p" size="sm" color="black">Mobile number </Text>
              <Text variant="p" size="sm" color="black" className="shop-profile__subtle">{user?.phone_number || ''}</Text>
            </div>
          </div>
          <div className="shop-profile__divider" />
          <div className="shop-profile__ownerField">
            <Text variant="p" size="sm" color="black">Location</Text>
          </div>
        </div>

        <div className="shop-profile__menuCard">
          {panelMode === 'menu' && (
            <>
              <Text variant="p" size="md" color="black" className="shop-profile__menuHeader">Becom a vendor</Text>
              <Text variant="p" size="md" color="black">Account</Text>

              <button className="shop-profile__menuItem" onClick={openEditProfile}>
                <span className="shop-profile__menuIcon shop-profile__menuIcon--profile" />
                <Text variant="p" size="sm" color="black">Edit profile</Text>
                <span className="shop-profile__menuChevron" />
              </button>

              <button className="shop-profile__menuItem" onClick={openChangePassword}>
                <span className="shop-profile__menuIcon shop-profile__menuIcon--password" />
                <Text variant="p" size="sm" color="black">Change password</Text>
                <span className="shop-profile__menuChevron" />
              </button>

              <button className="shop-profile__menuItem" onClick={() => navigate('/admin/privacy')}>
                <span className="shop-profile__menuIcon shop-profile__menuIcon--privacy" />
                <Text variant="p" size="sm" color="black">Privacy</Text>
                <span className="shop-profile__menuChevron" />
              </button>

              <button className="shop-profile__menuItem" onClick={() => navigate('/admin/store/menu/manage')}>
                <span className="shop-profile__menuIcon shop-profile__menuIcon--store" />
                <Text variant="p" size="sm" color="black">Edit my store</Text>
                <span className="shop-profile__menuChevron" />
              </button>

              <button className="shop-profile__menuItem" onClick={() => navigate('/admin/help-support')}>
                <span className="shop-profile__menuIcon shop-profile__menuIcon--help" />
                <Text variant="p" size="sm" color="black">Help & Support</Text>
                <span className="shop-profile__menuChevron" />
              </button>

              <button className="shop-profile__menuItem" onClick={() => navigate('/admin/terms')}>
                <span className="shop-profile__menuIcon shop-profile__menuIcon--terms" />
                <Text variant="p" size="sm" color="black">Terms and Policies</Text>
                <span className="shop-profile__menuChevron" />
              </button>
            </>
          )}

          {panelMode === 'change-password' && (
            <div className="shop-profile__changePassword">
              <Text variant="p" size="md" color="black" className="shop-profile__menuHeader">Change password</Text>

              <div className="shop-profile__formField">
                <Text variant="p" size="sm" color="black">Current password</Text>
                <Input
                  type="password"
                  placeholder="Enter current password"
                  fullWidth
                  value={currentPassword}
                  onChange={(e: any) => setCurrentPassword(e.target.value)}
                />
              </div>

              <div className="shop-profile__formField">
                <Text variant="p" size="sm" color="black">New password</Text>
                <Input
                  type="password"
                  placeholder="Enter new password"
                  fullWidth
                  value={newPassword}
                  onChange={(e: any) => setNewPassword(e.target.value)}
                />
              </div>

              <div className="shop-profile__formField">
                <Text variant="p" size="sm" color="black">Confirm password</Text>
                <Input
                  type="password"
                  placeholder="Re-enter new password"
                  fullWidth
                  value={confirmPassword}
                  onChange={(e: any) => setConfirmPassword(e.target.value)}
                />
              </div>

              {error && (
                <Text variant="p" size="sm" color="black" className="shop-profile__error">{error}</Text>
              )}

              <div className="shop-profile__actions">
                <Button variant="primary" onClick={onSavePassword}>Save</Button>
                <Button variant="secondary" onClick={cancelChangePassword}>Cancel</Button>
              </div>
            </div>
          )}

          {panelMode === 'edit-profile' && (
            <div className="shop-profile__editProfile">
              <Text variant="p" size="md" color="black" className="shop-profile__menuHeader">Edit profile</Text>

              <div className="shop-profile__formField">
                <Text variant="p" size="sm" color="black">Name</Text>
                <Input
                  type="text"
                  placeholder="Enter name"
                  fullWidth
                  value={editName}
                  onChange={(e: any) => setEditName(e.target.value)}
                />
              </div>

              <div className="shop-profile__formField">
                <Text variant="p" size="sm" color="black">Email</Text>
                <Input
                  type="email"
                  placeholder="Enter email"
                  fullWidth
                  value={editEmail}
                  onChange={(e: any) => setEditEmail(e.target.value)}
                />
              </div>

              <div className="shop-profile__formField">
                <Text variant="p" size="sm" color="black">Mobile</Text>
                <Input
                  type="tel"
                  placeholder="Enter mobile number"
                  fullWidth
                  value={editMobile}
                  onChange={(e: any) => setEditMobile(e.target.value)}
                />
              </div>

              <div className="shop-profile__formField">
                <Text variant="p" size="sm" color="black">Location</Text>
                <Input
                  type="text"
                  placeholder="Enter location"
                  fullWidth
                  value={editLocation}
                  onChange={(e: any) => setEditLocation(e.target.value)}
                />
              </div>

              {error && (
                <Text variant="p" size="sm" color="black" className="shop-profile__error">{error}</Text>
              )}

              <div className="shop-profile__actions">
                <Button variant="primary" onClick={onSaveProfile}>Save</Button>
                <Button variant="secondary" onClick={cancelEditProfile}>Cancel</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopProfile;


