import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Title, Text, Button, Input } from '../../components';
import './MenuAdd.css';

interface MenuAddProps {
  className?: string;
}

const sizeOptions = ['Regular', 'Medium', 'Large', 'Extra Large'];
const statusOptions = [
  { value: 'available', label: 'Available' },
  { value: 'unavailable', label: 'Unavailable' },
  { value: 'out-of-stock', label: 'Out of Stock' }
];

const MenuAdd: React.FC<MenuAddProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    status: 'available',
    sizes: [] as string[]
  });
  
  const [images, setImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSizeChange = (size: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      sizes: checked 
        ? [...prev.sizes, size]
        : prev.sizes.filter(s => s !== size)
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages(prev => [...prev, ...files]);
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Validate form
      if (!formData.name.trim()) {
        throw new Error('Menu name is required');
      }
      if (!formData.description.trim()) {
        throw new Error('Description is required');
      }
      if (!formData.price.trim()) {
        throw new Error('Price is required');
      }
      if (formData.sizes.length === 0) {
        throw new Error('At least one size must be selected');
      }
      if (images.length === 0) {
        throw new Error('At least one image is required');
      }

      // In a real app, this would make an API call
      console.log('Creating new menu item:', {
        ...formData,
        images: images.map(img => img.name)
      });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Navigate back to manage screen
      navigate('/admin/store/menu/manage');
    } catch (err: any) {
      setError(err.message || 'An error occurred while creating the menu item');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/admin/store/menu/manage');
  };

  return (
    <div className={`menu-add ${className}`}>
      <div className="menu-add__header">
        <div className="menu-add__header-left">
          <Title level="h1" size="xl" color="primary" className="menu-add__title">
            Add New Menu Item
          </Title>
          <Text variant="p" size="md" color="secondary" className="menu-add__description">
            Create a new menu item with pricing and availability options
          </Text>
        </div>
        <div className="menu-add__header-right">
          <Button variant="secondary" size="md" onClick={handleCancel}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            size="md" 
            onClick={() => formRef.current?.requestSubmit()} 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating...' : 'Create'}
          </Button>
        </div>
      </div>

      <div className="menu-add__content">
        <form ref={formRef} className="menu-add__form" onSubmit={handleSubmit}>
          <div className="menu-add__form-row">
            <div className="menu-add__form-group">
              <label htmlFor="name" className="menu-add__label">
                <Text variant="p" size="sm" color="primary" className="menu-add__label-text">
                  Menu Name *
                </Text>
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter menu item name"
                className="menu-add__input"
                required
              />
            </div>

            <div className="menu-add__form-group">
              <label htmlFor="price" className="menu-add__label">
                <Text variant="p" size="sm" color="primary" className="menu-add__label-text">
                  Price *
                </Text>
              </label>
              <Input
                id="price"
                name="price"
                type="text"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="e.g., $4.50"
                className="menu-add__input"
                required
              />
            </div>
          </div>

          <div className="menu-add__form-group">
            <label htmlFor="description" className="menu-add__label">
              <Text variant="p" size="sm" color="primary" className="menu-add__label-text">
                Description *
              </Text>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter detailed description of the menu item"
              className="menu-add__textarea"
              rows={4}
              required
            />
          </div>

          <div className="menu-add__form-row">
            <div className="menu-add__form-group">
              <label className="menu-add__label">
                <Text variant="p" size="sm" color="primary" className="menu-add__label-text">
                  Available Sizes *
                </Text>
              </label>
              <div className="menu-add__size-options">
                {sizeOptions.map(size => (
                  <label key={size} className="menu-add__size-option">
                    <input
                      type="checkbox"
                      checked={formData.sizes.includes(size)}
                      onChange={(e) => handleSizeChange(size, e.target.checked)}
                      className="menu-add__size-checkbox"
                    />
                    <span className="menu-add__size-label">{size}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="menu-add__form-group">
              <label htmlFor="status" className="menu-add__label">
                <Text variant="p" size="sm" color="primary" className="menu-add__label-text">
                  Status *
                </Text>
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="menu-add__select"
                required
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="menu-add__form-group">
            <label htmlFor="images" className="menu-add__label">
              <Text variant="p" size="sm" color="primary" className="menu-add__label-text">
                Images *
              </Text>
            </label>
            <div className="menu-add__image-upload">
              <input
                id="images"
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="menu-add__file-input"
              />
              <label htmlFor="images" className="menu-add__file-label">
                <div className="menu-add__file-content">
                  <Text variant="p" size="md" color="primary">
                    📷 Upload Images
                  </Text>
                  <Text variant="p" size="sm" color="muted">
                    Click to select multiple images
                  </Text>
                </div>
              </label>
            </div>
            
            {images.length > 0 && (
              <div className="menu-add__image-preview">
                <Text variant="p" size="sm" color="secondary" className="menu-add__preview-title">
                  Selected Images ({images.length}):
                </Text>
                <div className="menu-add__image-list">
                  {images.map((image, index) => (
                    <div key={index} className="menu-add__image-item">
                      <Text variant="span" size="xs" color="muted" className="menu-add__image-name">
                        {image.name}
                      </Text>
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="menu-add__remove-image"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {error && (
            <div className="menu-add__error">
              <Text variant="p" size="sm" color="accent">
                {error}
              </Text>
            </div>
          )}

          <div className="menu-add__form-actions">
            <Button 
              variant="secondary" 
              size="md" 
              type="button" 
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              variant="primary" 
              size="md" 
              type="submit" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating...' : 'Create Menu Item'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MenuAdd;
