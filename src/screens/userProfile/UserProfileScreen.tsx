import React, { useState, useEffect, useCallback } from 'react';
import { Button, Footer, ProfileEditModal, useLoading, Title, Text, Input } from '../../components';
import { useAuth } from '../../components/AuthProvider';
import { meService, UserProfile } from '../../services/me';
import { authService, ChangePasswordRequest } from '../../services/auth';
import './UserProfileScreen.css';
import { useNavigate } from 'react-router-dom';

interface UserProfileScreenProps {
  className?: string;
}

const UserProfileScreen: React.FC<UserProfileScreenProps> = ({ className = '' }) => {
  const { logout } = useAuth();
  const { showLoading, hideLoading } = useLoading();
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  // Change password modal state
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  
  // Password visibility state
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  console.log('userProfile', userProfile)

  const fetchUserProfile = useCallback(async () => {
    try {
      setLoading(true);
      showLoading('Loading profile...');
      const profile = await meService.getProfile();
      setUserProfile(profile.data);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch user profile:', err);
      setError('Failed to load profile data');
    } finally {
      setLoading(false);
      hideLoading();
    }
  }, [showLoading, hideLoading]);

  // Fetch user profile data
  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleModalClose = () => {
    setIsEditModalOpen(false);
  };

  const handleChangePasswordClick = () => {
    setIsChangePasswordModalOpen(true);
    setPasswordError(null);
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setShowOldPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);
  };

  const handleChangePasswordModalClose = () => {
    setIsChangePasswordModalOpen(false);
    setPasswordError(null);
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setShowOldPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);
  };

  const validatePasswords = () => {
    if (!oldPassword.trim()) {
      setPasswordError('Current password is required');
      return false;
    }
    if (!newPassword.trim()) {
      setPasswordError('New password is required');
      return false;
    }
    if (newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters');
      return false;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match');
      return false;
    }
    if (oldPassword === newPassword) {
      setPasswordError('New password must be different from current password');
      return false;
    }
    return true;
  };

  const handleSubmitChangePassword = async () => {
    if (!validatePasswords()) {
      return;
    }

    try {
      setIsChangingPassword(true);
      setPasswordError(null);

      const payload: ChangePasswordRequest = {
        current_password: oldPassword,
        new_password: newPassword
      };

      await authService.changePassword(payload);
      
      // Success - close modal and show success message
      handleChangePasswordModalClose();
      alert('Password changed successfully!');
      
    } catch (err: any) {
      console.error('Error changing password:', err);
      setPasswordError(err.response?.data?.message || 'Failed to change password. Please try again.');
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleProfileUpdated = () => {
    fetchUserProfile();
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently removed.'
    );

    if (!confirmed) return;

    try {
      showLoading('Deleting your account...');
      await meService.deleteAccount();
      // Clean up auth data and redirect to home
      logout();
      navigate('/');
      // The logout function should handle redirecting to login/home
    } catch (err) {
      console.error('Failed to delete account:', err);
      setError('Failed to delete account. Please try again.');
    } finally {
      hideLoading();
    }
  };

  // Sample data for other sections (to be updated later)
  const profileData = {
    name: "I am Cat, 21",
    bio: "So be careful, the snobbish cat",
    favoriteCoffeeShops: [
      { id: 1, image: "/api/placeholder/88/96", name: "Coffee Shop 1" },
      { id: 2, image: "/api/placeholder/88/96", name: "Coffee Shop 2" },
      { id: 3, image: "/api/placeholder/88/96", name: "Coffee Shop 3" },
      { id: 4, image: "/api/placeholder/88/96", name: "Coffee Shop 4" },
      { id: 5, image: "/api/placeholder/88/96", name: "Coffee Shop 5" },
      { id: 6, image: "/api/placeholder/88/96", name: "Coffee Shop 6" },
      { id: 7, image: "/api/placeholder/88/96", name: "Coffee Shop 7" },
      { id: 8, image: "/api/placeholder/88/96", name: "Coffee Shop 8" },
      { id: 9, image: "/api/placeholder/88/96", name: "Coffee Shop 9" }
    ],
    reviewPhotos: [
      { id: 1, image: "/api/placeholder/88/96", count: 12 },
      { id: 2, image: "/api/placeholder/88/96", count: 12 },
      { id: 3, image: "/api/placeholder/88/96", count: 12 },
      { id: 4, image: "/api/placeholder/88/96", count: 1 }
    ],
  };

  // Loading state
  if (loading) {
    return (
      <div className={`user-profile-screen ${className}`}>
        <main className="profile-main">
          <div className="profile-container">
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading profile...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={`user-profile-screen ${className}`}>
        <main className="profile-main">
          <div className="profile-container">
            <div className="error-container">
              <p>Error: {error}</p>
              <button onClick={() => window.location.reload()}>Retry</button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className={`user-profile-screen ${className}`}>
      <main className="profile-main">
        <div className="profile-container">
          {/* Avatar Section */}
          <div className="avatar-section">
            <div className="avatar-card">
              <div className="avatar-image">
                <img src={'https://icons.veryicon.com/png/o/miscellaneous/two-color-webpage-small-icon/user-244.png'} alt="Profile" />
              </div>
              <div className="avatar-actions">
                <Button variant='primary' onClick={handleChangePasswordClick}>
                  Change Password
                </Button>
                <Button
                  variant='danger'
                  onClick={handleDeleteAccount}
                >
                  Delete Account
                </Button>
              </div>
            </div>
          </div>

          {/* Profile Info Section */}
          <div className="profile-info-section">
            <div className="profile-header">
              <h1 className="profile-name">
                {userProfile?.full_name || userProfile?.username || 'User'}
              </h1>
              <button className="edit-btn" onClick={handleEditClick}>Edit</button>
            </div>
            <p className="profile-bio">
              {userProfile?.email || 'No bio available'}
            </p>
            {userProfile?.phone_number && (
              <p className="profile-phone">
                📞 {userProfile.phone_number}
              </p>
            )}
            {userProfile?.role && (
              <p className="profile-role">
                👤 {userProfile.role}
              </p>
            )}
          </div>

          {/* Favorite Coffee Shops Section */}
          {/* <div z> */}

          {/* Review Coffee Shops Section */}
          {/* <div className="photos-section">
            <div className="photos-header">
              <div className="photos-title-group">
                <h3 className="photos-title">Review coffee shop</h3>
                <span className="photos-count">37</span>
              </div>
              <button className="view-detail-btn">View Detail</button>
            </div>
            <div className="photos-grid">
              {profileData.reviewPhotos.map((photo) => (
                <div key={photo.id} className="photo-item review-photo">
                  <img src={photo.image} alt="Review" />
                  <div className="photo-overlay">
                    <span className="photo-count">{photo.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div> */}
        </div>
      </main>

      <Footer />

      {/* Profile Edit Modal */}
      <ProfileEditModal
        isOpen={isEditModalOpen}
        onClose={handleModalClose}
        userProfile={userProfile}
        onProfileUpdated={handleProfileUpdated}
      />

      {/* Change Password Modal */}
      {isChangePasswordModalOpen && (
        <div className="change-password-modal-overlay" onClick={handleChangePasswordModalClose}>
          <div className="change-password-modal" onClick={(e) => e.stopPropagation()}>
            <div className="change-password-modal-header">
              <Title level="h3" size="lg" color="primary">Change Password</Title>
              <button className="change-password-modal-close" onClick={handleChangePasswordModalClose}>×</button>
            </div>
            <div className="change-password-modal-content">
              <div className="change-password-form">
                <div className="change-password-field">
                  <Text variant="p" size="md" color="secondary" className="change-password-label">Current Password *</Text>
                  <div className="change-password-input-container">
                    <Input
                      type={showOldPassword ? "text" : "password"}
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      placeholder="Enter your current password"
                      className="change-password-input"
                      disabled={isChangingPassword}
                    />
                    <button
                      type="button"
                      className="change-password-toggle"
                      onClick={() => setShowOldPassword(!showOldPassword)}
                      disabled={isChangingPassword}
                    >
                      {showOldPassword ? '👁️' : '👁️‍🗨️'}
                    </button>
                  </div>
                </div>
                
                <div className="change-password-field">
                  <Text variant="p" size="md" color="secondary" className="change-password-label">New Password *</Text>
                  <div className="change-password-input-container">
                    <Input
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter your new password"
                      className="change-password-input"
                      disabled={isChangingPassword}
                    />
                    <button
                      type="button"
                      className="change-password-toggle"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      disabled={isChangingPassword}
                    >
                      {showNewPassword ? '👁️' : '👁️‍🗨️'}
                    </button>
                  </div>
                </div>
                
                <div className="change-password-field">
                  <Text variant="p" size="md" color="secondary" className="change-password-label">Confirm New Password *</Text>
                  <div className="change-password-input-container">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm your new password"
                      className="change-password-input"
                      disabled={isChangingPassword}
                    />
                    <button
                      type="button"
                      className="change-password-toggle"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      disabled={isChangingPassword}
                    >
                      {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                    </button>
                  </div>
                </div>
                
                {passwordError && (
                  <div className="change-password-error">
                    <Text variant="p" size="sm" color="primary">{passwordError}</Text>
                  </div>
                )}
                
                <div className="change-password-modal-actions">
                  <Button 
                    variant="secondary" 
                    size="md" 
                    onClick={handleChangePasswordModalClose}
                    disabled={isChangingPassword}
                  >
                    Cancel
                  </Button>
                  <Button 
                    variant="primary" 
                    size="md" 
                    onClick={handleSubmitChangePassword}
                    disabled={isChangingPassword || !oldPassword.trim() || !newPassword.trim() || !confirmPassword.trim()}
                  >
                    {isChangingPassword ? 'Changing...' : 'Change Password'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileScreen;