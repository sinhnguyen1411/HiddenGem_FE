import React, { useState, useEffect } from 'react';
import { meService, UserProfile } from '../../services/me';
import { UpdateProfileRequest } from '../../services/types';
import { Button, Input, Text, Title } from '../index';
import './ProfileEditModal.css';

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile | null;
  onProfileUpdated: () => void;
}

const ProfileEditModal: React.FC<ProfileEditModalProps> = ({
  isOpen,
  onClose,
  userProfile,
  onProfileUpdated
}) => {
  const [formData, setFormData] = useState<UpdateProfileRequest>({
    full_name: '',
    phone_number: '',
    email: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize form data when modal opens or userProfile changes
  useEffect(() => {
    if (isOpen && userProfile) {
      setFormData({
        full_name: userProfile.full_name || '',
        phone_number: userProfile.phone_number || '',
        email: userProfile.email || ''
      });
      setError(null);
    }
  }, [isOpen, userProfile]);

  const handleInputChange = (field: keyof UpdateProfileRequest, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userProfile) return;

    try {
      setLoading(true);
      setError(null);
      
      const response = await meService.updateProfile(formData);
      onProfileUpdated();
      onClose();
    } catch (err) {
      console.error('Failed to update profile:', err);
      setError('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="profile-edit-modal-overlay" onClick={handleClose}>
      <div className="profile-edit-modal" onClick={(e) => e.stopPropagation()}>
        <div className="profile-edit-modal-header">
          <div className="profile-edit-modal-title">
            <div className="profile-edit-icon">
              <svg width="25" height="2" viewBox="0 0 25 2" fill="none">
                <rect width="25" height="2" fill="currentColor"/>
              </svg>
            </div>
            <Title level="h2" size="lg" color="primary">Edit Profile</Title>
          </div>
        </div>

        <form className="profile-edit-form" onSubmit={handleSubmit}>
          <div className="profile-edit-content">
            {/* Basic Information Section */}
            <div className="form-section">
              <div className="form-row">
                <div className="form-field">
                  <Text variant="span" size="sm" color="primary">First Name</Text>
                  <Input
                    type="text"
                    value={formData.full_name?.split(' ')[0] || ''}
                    onChange={(e) => {
                      const lastName = formData.full_name?.split(' ').slice(1).join(' ') || '';
                      handleInputChange('full_name', `${e.target.value} ${lastName}`.trim());
                    }}
                    placeholder="Enter first name"
                    disabled={loading}
                    size="lg"
                  />
                </div>
                <div className="form-field">
                  <Text variant="span" size="sm" color="primary">Last Name</Text>
                  <Input
                    type="text"
                    value={formData.full_name?.split(' ').slice(1).join(' ') || ''}
                    onChange={(e) => {
                      const firstName = formData.full_name?.split(' ')[0] || '';
                      handleInputChange('full_name', `${firstName} ${e.target.value}`.trim());
                    }}
                    placeholder="Enter last name"
                    disabled={loading}
                    size="lg"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <Text variant="span" size="sm" color="primary">Email Address</Text>
                  <Input
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Enter email address"
                    disabled={loading}
                    size="lg"
                  />
                </div>
                <div className="form-field">
                  <Text variant="span" size="sm" color="primary">Phone Number</Text>
                  <Input
                    type="tel"
                    value={formData.phone_number || ''}
                    onChange={(e) => handleInputChange('phone_number', e.target.value)}
                    placeholder="Enter phone number"
                    disabled={loading}
                    size="lg"
                  />
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="form-error">
                <span className="error-icon">⚠</span>
                <Text variant="p" size="sm" color="primary">{error}</Text>
              </div>
            )}

            {/* Action Buttons */}
            <div className="form-actions">
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={handleClose}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileEditModal;
