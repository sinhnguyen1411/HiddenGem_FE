import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Title, Text, Button, Input } from '../../components';
import { bannersService } from '../../services/banners';
import { BannerCreateRequest } from '../../services/types';
import './BannerAdd.css';

interface BannerAddProps {
  className?: string;
}

const BannerAdd: React.FC<BannerAddProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  
  // Form states
  const [formData, setFormData] = useState<BannerCreateRequest>({
    tieu_de: '',
    url_anh: '',
    link_url: '',
    vi_tri: 'Home',
    thu_tu: 1,
    active: 1
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // Check if we're in edit mode
  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      loadBannerForEdit(Number(id));
    }
  }, [id]);

  // Position options
  const positionOptions = [
    { value: 'home_top', label: 'Home' },
    { value: 'Promotion-1', label: 'Promotion-1' },
    { value: 'Promotion-2', label: 'Promotion-2' }
  ];

  const loadBannerForEdit = async (bannerId: number) => {
    try {
      setLoading(true);
      setError(null);
      const banner = await bannersService.getById(bannerId);
      if (banner) {
        setFormData({
          tieu_de: banner.tieu_de || '',
          url_anh: banner.url_anh || '',
          link_url: banner.link_url || '',
          vi_tri: banner.vi_tri || 'Home',
          thu_tu: banner.thu_tu || 1,
          active: banner.active ? 1 : 0
        });
        // Set image preview if URL exists
        if (banner.url_anh) {
          setImagePreview(banner.url_anh);
        }
      } else {
        setError('Banner not found');
      }
    } catch (err) {
      setError('Failed to load banner for editing');
      console.error('Error loading banner:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'thu_tu' ? parseInt(value) || 1 : value
    }));
    if (error) setError(null);
  };

  // Handle image file selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.tieu_de?.trim()) {
      setError('Title is required');
      return;
    }
    
    if (!formData.url_anh?.trim() && !imageFile) {
      setError('Image URL or file is required');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      // If image file is selected, we would need to upload it first
      // For now, we'll use the URL directly
      if (imageFile) {
        // In a real app, you would upload the file to get a URL
        // For demo purposes, we'll use a placeholder
        formData.url_anh = URL.createObjectURL(imageFile);
      }

      if (isEditMode && id) {
        // Update existing banner
        await bannersService.update(Number(id), formData);
      } else {
        // Create new banner
        await bannersService.create(formData);
      }
      navigate('/admin/banners');
    } catch (error) {
      console.error('Error saving banner:', error);
      setError(isEditMode ? 'Failed to update banner. Please try again.' : 'Failed to create banner. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    navigate('/admin/banners');
  };

  if (loading) {
    return (
      <div className={`banner-add ${className}`}>
        <div className="banner-add__loading">
          <Text variant="p" size="md" color="muted">Loading banner...</Text>
        </div>
      </div>
    );
  }

  return (
    <div className={`banner-add ${className}`}>
      <div className="banner-add__header">
        <Title level="h1" size="xl" color="primary" className="banner-add__title">
          {isEditMode ? 'Edit Banner' : 'Add New Banner'}
        </Title>
        <Text variant="p" size="md" color="secondary" className="banner-add__subtitle">
          {isEditMode ? 'Update the banner information' : 'Create a new promotional banner'}
        </Text>
      </div>

      <form onSubmit={handleSubmit} className="banner-add__form">
        {error && (
          <div className="banner-add__error">
            <Text variant="p" size="sm" color="primary">{error}</Text>
          </div>
        )}

        <div className="banner-add__form-group">
          <label htmlFor="tieu_de" className="banner-add__label">
            Title <span className="banner-add__required">*</span>
          </label>
          <Input
            type="text"
            id="tieu_de"
            name="tieu_de"
            value={formData.tieu_de}
            onChange={handleInputChange}
            placeholder="Enter banner title"
            className="banner-add__input"
            required
          />
        </div>

        <div className="banner-add__form-group">
          <label htmlFor="mo_ta" className="banner-add__label">
            Description
          </label>
          <textarea
            id="mo_ta"
            name="mo_ta"
            value={formData.mo_ta || ''}
            onChange={handleInputChange}
            placeholder="Enter banner description"
            className="banner-add__textarea"
            rows={3}
          />
        </div>

        <div className="banner-add__form-group">
          <label htmlFor="vi_tri" className="banner-add__label">
            Position <span className="banner-add__required">*</span>
          </label>
          <select
            id="vi_tri"
            name="vi_tri"
            value={formData.vi_tri}
            onChange={handleInputChange}
            className="banner-add__select"
            required
          >
            {positionOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="banner-add__form-group">
          <label htmlFor="thu_tu" className="banner-add__label">
            Display Order
          </label>
          <Input
            type="number"
            id="thu_tu"
            name="thu_tu"
            value={formData.thu_tu}
            onChange={handleInputChange}
            placeholder="1"
            className="banner-add__input"
          />
        </div>

        <div className="banner-add__form-group">
          <label htmlFor="link_url" className="banner-add__label">
            Link URL
          </label>
          <Input
            type="text"
            id="link_url"
            name="link_url"
            value={formData.link_url || ''}
            onChange={handleInputChange}
            placeholder="https://example.com"
            className="banner-add__input"
          />
        </div>

        <div className="banner-add__form-group">
          <label htmlFor="url_anh" className="banner-add__label">
            Image URL <span className="banner-add__required">*</span>
          </label>
          <Input
            type="text"
            id="url_anh"
            name="url_anh"
            value={formData.url_anh}
            onChange={handleInputChange}
            placeholder="https://example.com/image.jpg"
            className="banner-add__input"
            required
          />
        </div>

        <div className="banner-add__form-group">
          <label htmlFor="image_file" className="banner-add__label">
            Or Upload Image File
          </label>
          <input
            type="file"
            id="image_file"
            accept="image/*"
            onChange={handleImageChange}
            className="banner-add__file-input"
          />
          {imagePreview && (
            <div className="banner-add__image-preview">
              <img src={imagePreview} alt="Preview" className="banner-add__preview-img" />
            </div>
          )}
        </div>

        <div className="banner-add__form-group">
          <label className="banner-add__checkbox-label">
            <input
              type="checkbox"
              checked={formData.active === 1}
              onChange={(e) => setFormData(prev => ({ ...prev, active: e.target.checked ? 1 : 0 }))}
              className="banner-add__checkbox"
            />
            <span className="banner-add__checkbox-text">Active</span>
          </label>
        </div>

        <div className="banner-add__actions">
          <Button
            type="button"
            variant="secondary"
            size="md"
            onClick={handleCancel}
            className="banner-add__cancel-btn"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={isSubmitting}
            className="banner-add__submit-btn"
          >
            {isSubmitting ? (isEditMode ? 'Updating...' : 'Creating...') : (isEditMode ? 'Update Banner' : 'Create Banner')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BannerAdd;
