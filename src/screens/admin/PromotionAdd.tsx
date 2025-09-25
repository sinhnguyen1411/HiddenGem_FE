import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Title, Text, Button, Input } from '../../components';
import './PromotionAdd.css';

interface PromotionAddProps {
  className?: string;
}

interface PromotionFormData {
  promotionName: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'inactive' | 'draft' | 'expired';
  discountType: 'percentage' | 'fixed' | 'buy_x_get_y';
  discountValue: number;
  minOrderAmount: number;
  maxDiscountAmount: number;
  usageLimit: number;
  images: File[];
}

const PromotionAdd: React.FC<PromotionAddProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState<PromotionFormData>({
    promotionName: '',
    description: '',
    startDate: '',
    endDate: '',
    status: 'draft',
    discountType: 'percentage',
    discountValue: 0,
    minOrderAmount: 0,
    maxDiscountAmount: 0,
    usageLimit: 0,
    images: []
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'number') {
      setFormData(prev => ({
        ...prev,
        [name]: value === '' ? 0 : Number(value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleDateTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newImages = [...formData.images, ...files];
    setFormData(prev => ({
      ...prev,
      images: newImages
    }));

    // Create previews for new images
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(prev => [...prev, ...newPreviews]);
  };

  const handleRemoveImage = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    
    setFormData(prev => ({
      ...prev,
      images: newImages
    }));
    setImagePreviews(newPreviews);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Validate required fields
      if (!formData.promotionName.trim()) {
        throw new Error('Promotion name is required');
      }
      if (!formData.description.trim()) {
        throw new Error('Description is required');
      }
      if (!formData.startDate) {
        throw new Error('Start date is required');
      }
      if (!formData.endDate) {
        throw new Error('End date is required');
      }
      if (new Date(formData.startDate) >= new Date(formData.endDate)) {
        throw new Error('End date must be after start date');
      }
      if (formData.discountValue <= 0) {
        throw new Error('Discount value must be greater than 0');
      }

      // In a real app, this would make an API call
      console.log('Creating promotion:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      navigate('/admin/store/promotion/manage');
    } catch (err: any) {
      setError(err.message || 'Failed to create promotion');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/admin/store/promotion/manage');
  };

  const getDiscountPlaceholder = () => {
    switch (formData.discountType) {
      case 'percentage':
        return 'Enter percentage (e.g., 20 for 20%)';
      case 'fixed':
        return 'Enter amount in dollars (e.g., 5 for $5)';
      case 'buy_x_get_y':
        return 'Enter number of free items (e.g., 1 for Buy 2 Get 1 Free)';
      default:
        return 'Enter discount value';
    }
  };

  return (
    <div className={`promotion-add ${className}`}>
      <div className="promotion-add__header">
        <div className="promotion-add__header-left">
          <Button variant="secondary" size="sm" onClick={handleCancel} className="promotion-add__back-btn">
            ← Back
          </Button>
          <Title level="h1" size="xl" color="primary" className="promotion-add__title">
            Add New Promotion
          </Title>
        </div>
        <div className="promotion-add__header-right">
          <Button variant="outline" size="md" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="primary" size="md" onClick={() => {}} disabled={isSubmitting}>
            {isSubmitting ? 'Creating...' : 'Create Promotion'}
          </Button>
        </div>
      </div>

      <div className="promotion-add__content">
        <form className="promotion-add__form" onSubmit={handleSubmit}>
          {error && (
            <div className="promotion-add__error">
              <Text variant="p" size="sm" color="accent">
                {error}
              </Text>
            </div>
          )}

          <div className="promotion-add__section">
            <Title level="h3" size="md" color="primary" className="promotion-add__section-title">
              Basic Information
            </Title>
            
            <div className="promotion-add__form-group">
              <Text variant="p" size="sm" color="primary" className="promotion-add__label-text">
                Promotion Name *
              </Text>
              <Input
                type="text"
                name="promotionName"
                value={formData.promotionName}
                onChange={handleInputChange}
                placeholder="Enter promotion name"
                className="promotion-add__input"
                required
              />
            </div>

            <div className="promotion-add__form-group">
              <Text variant="p" size="sm" color="primary" className="promotion-add__label-text">
                Description *
              </Text>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter promotion description"
                className="promotion-add__textarea"
                rows={4}
                required
              />
            </div>
          </div>

          <div className="promotion-add__section">
            <Title level="h3" size="md" color="primary" className="promotion-add__section-title">
              Time Period
            </Title>
            
            <div className="promotion-add__form-row">
              <div className="promotion-add__form-group">
                <Text variant="p" size="sm" color="primary" className="promotion-add__label-text">
                  Start Date *
                </Text>
                <input
                  type="datetime-local"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleDateTimeChange}
                  className="promotion-add__input"
                  required
                />
              </div>

              <div className="promotion-add__form-group">
                <Text variant="p" size="sm" color="primary" className="promotion-add__label-text">
                  End Date *
                </Text>
                <input
                  type="datetime-local"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleDateTimeChange}
                  className="promotion-add__input"
                  required
                />
              </div>
            </div>
          </div>

          <div className="promotion-add__section">
            <Title level="h3" size="md" color="primary" className="promotion-add__section-title">
              Discount Settings
            </Title>
            
            <div className="promotion-add__form-row">
              <div className="promotion-add__form-group">
                <Text variant="p" size="sm" color="primary" className="promotion-add__label-text">
                  Discount Type *
                </Text>
                <select
                  name="discountType"
                  value={formData.discountType}
                  onChange={handleInputChange}
                  className="promotion-add__select"
                  required
                >
                  <option value="percentage">Percentage Off</option>
                  <option value="fixed">Fixed Amount Off</option>
                  <option value="buy_x_get_y">Buy X Get Y Free</option>
                </select>
              </div>

              <div className="promotion-add__form-group">
                <Text variant="p" size="sm" color="primary" className="promotion-add__label-text">
                  Discount Value *
                </Text>
                <input
                  type="number"
                  name="discountValue"
                  value={formData.discountValue}
                  onChange={handleInputChange}
                  placeholder={getDiscountPlaceholder()}
                  className="promotion-add__input"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>

            <div className="promotion-add__form-row">
              <div className="promotion-add__form-group">
                <Text variant="p" size="sm" color="primary" className="promotion-add__label-text">
                  Minimum Order Amount
                </Text>
                <input
                  type="number"
                  name="minOrderAmount"
                  value={formData.minOrderAmount}
                  onChange={handleInputChange}
                  placeholder="Enter minimum order amount"
                  className="promotion-add__input"
                  min="0"
                  step="0.01"
                />
              </div>

              <div className="promotion-add__form-group">
                <Text variant="p" size="sm" color="primary" className="promotion-add__label-text">
                  Maximum Discount Amount
                </Text>
                <input
                  type="number"
                  name="maxDiscountAmount"
                  value={formData.maxDiscountAmount}
                  onChange={handleInputChange}
                  placeholder="Enter maximum discount amount"
                  className="promotion-add__input"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            <div className="promotion-add__form-group">
              <Text variant="p" size="sm" color="primary" className="promotion-add__label-text">
                Usage Limit
              </Text>
              <input
                type="number"
                name="usageLimit"
                value={formData.usageLimit}
                onChange={handleInputChange}
                placeholder="Enter usage limit (0 for unlimited)"
                className="promotion-add__input"
                min="0"
              />
            </div>
          </div>

          <div className="promotion-add__section">
            <Title level="h3" size="md" color="primary" className="promotion-add__section-title">
              Images
            </Title>
            
            <div className="promotion-add__form-group">
              <Text variant="p" size="sm" color="primary" className="promotion-add__label-text">
                Promotion Images
              </Text>
              <div className="promotion-add__image-upload">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="promotion-add__file-input"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  onClick={() => fileInputRef.current?.click()}
                  className="promotion-add__upload-btn"
                >
                  Choose Images
                </Button>
                <Text variant="p" size="xs" color="muted" className="promotion-add__upload-hint">
                  Select multiple images (PNG, JPG, GIF)
                </Text>
              </div>
            </div>

            {imagePreviews.length > 0 && (
              <div className="promotion-add__image-previews">
                <Text variant="p" size="sm" color="primary" className="promotion-add__preview-title">
                  Selected Images:
                </Text>
                <div className="promotion-add__preview-grid">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="promotion-add__preview-item">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="promotion-add__preview-image"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoveImage(index)}
                        className="promotion-add__remove-btn"
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="promotion-add__section">
            <Title level="h3" size="md" color="primary" className="promotion-add__section-title">
              Status
            </Title>
            
            <div className="promotion-add__form-group">
              <Text variant="p" size="sm" color="primary" className="promotion-add__label-text">
                Status
              </Text>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="promotion-add__select"
              >
                <option value="draft">Draft</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="promotion-add__form-actions">
            <Button variant="outline" size="md" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="primary" size="md" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create Promotion'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PromotionAdd;
