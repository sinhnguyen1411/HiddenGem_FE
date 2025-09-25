import React, { useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Title, Text, Button, Input } from '../../components';
import './ServiceAdd.css';

interface ServiceAddProps {
  className?: string;
}

const serviceTypes = {
  service: { title: 'Service', description: 'Add a new service offering' },
  client: { title: 'Client Feature', description: 'Add a new client management feature' },
  pay: { title: 'Payment Method', description: 'Add a new payment method' },
  parking: { title: 'Parking Option', description: 'Add a new parking option' },
  amenities: { title: 'Amenity', description: 'Add a new amenity' }
};

const ServiceAdd: React.FC<ServiceAddProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  const { serviceType } = useParams<{ serviceType: string }>();
  const formRef = useRef<HTMLFormElement>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentServiceType = serviceType as keyof typeof serviceTypes;
  const serviceInfo = serviceTypes[currentServiceType] || serviceTypes.service;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
        throw new Error('Title is required');
      }
      if (!formData.description.trim()) {
        throw new Error('Description is required');
      }

      // In a real app, this would make an API call
      console.log('Creating new item:', {
        type: currentServiceType,
        ...formData
      });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Navigate back to manage screen
      navigate(`/admin/introductions/${currentServiceType}/manage`);
    } catch (err: any) {
      setError(err.message || 'An error occurred while creating the item');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate(`/admin/introductions/${currentServiceType}/manage`);
  };

  return (
    <div className={`service-add ${className}`}>
      <div className="service-add__header">
        <div className="service-add__header-left">
          <Title level="h1" size="xl" color="primary" className="service-add__title">
            Add New {serviceInfo.title}
          </Title>
          <Text variant="p" size="md" color="secondary" className="service-add__description">
            {serviceInfo.description}
          </Text>
        </div>
        <div className="service-add__header-right">
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

      <div className="service-add__content">
        <form ref={formRef} className="service-add__form" onSubmit={handleSubmit}>
          <div className="service-add__form-group">
            <label htmlFor="title" className="service-add__label">
              <Text variant="p" size="sm" color="primary" className="service-add__label-text">
                Title *
              </Text>
            </label>
            <Input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleInputChange}
              placeholder={`Enter ${serviceInfo.title.toLowerCase()} title`}
              className="service-add__input"
              required
            />
          </div>

          <div className="service-add__form-group">
            <label htmlFor="description" className="service-add__label">
              <Text variant="p" size="sm" color="primary" className="service-add__label-text">
                Description *
              </Text>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder={`Enter ${serviceInfo.title.toLowerCase()} description`}
              className="service-add__textarea"
              rows={4}
              required
            />
          </div>

          {error && (
            <div className="service-add__error">
              <Text variant="p" size="sm" color="accent">
                {error}
              </Text>
            </div>
          )}

          <div className="service-add__form-actions">
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
              {isSubmitting ? 'Creating...' : 'Create'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceAdd;
