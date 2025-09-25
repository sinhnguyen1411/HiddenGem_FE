import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Title, Text, Button, Input } from '../../components';
import './CategoryAdd.css';

interface CategoryAddProps {
  className?: string;
}

const statusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'draft', label: 'Draft' }
];

const CategoryAdd: React.FC<CategoryAddProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'active'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Validate form
      if (!formData.title.trim()) {
        throw new Error('Category title is required');
      }
      if (!formData.description.trim()) {
        throw new Error('Description is required');
      }

      // In a real app, this would make an API call
      console.log('Creating new category:', formData);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Navigate back to manage screen
      navigate('/admin/store/category/manage');
    } catch (err: any) {
      setError(err.message || 'An error occurred while creating the category');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/admin/store/category/manage');
  };

  return (
    <div className={`category-add ${className}`}>
      <div className="category-add__header">
        <div className="category-add__header-left">
          <Title level="h1" size="xl" color="primary" className="category-add__title">
            Add New Category
          </Title>
          <Text variant="p" size="md" color="secondary" className="category-add__description">
            Create a new menu category for organizing your items
          </Text>
        </div>
        <div className="category-add__header-right">
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

      <div className="category-add__content">
        <form ref={formRef} className="category-add__form" onSubmit={handleSubmit}>
          <div className="category-add__form-group">
            <label htmlFor="title" className="category-add__label">
              <Text variant="p" size="sm" color="primary" className="category-add__label-text">
                Category Title *
              </Text>
            </label>
            <Input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter category title"
              className="category-add__input"
              required
            />
          </div>

          <div className="category-add__form-group">
            <label htmlFor="description" className="category-add__label">
              <Text variant="p" size="sm" color="primary" className="category-add__label-text">
                Description *
              </Text>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter category description"
              className="category-add__textarea"
              rows={4}
              required
            />
          </div>

          <div className="category-add__form-group">
            <label htmlFor="status" className="category-add__label">
              <Text variant="p" size="sm" color="primary" className="category-add__label-text">
                Status *
              </Text>
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="category-add__select"
              required
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {error && (
            <div className="category-add__error">
              <Text variant="p" size="sm" color="accent">
                {error}
              </Text>
            </div>
          )}

          <div className="category-add__form-actions">
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
              {isSubmitting ? 'Creating...' : 'Create Category'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryAdd;
