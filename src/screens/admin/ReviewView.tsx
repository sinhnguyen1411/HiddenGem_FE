import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Title, Text, Button } from '../../components';
import './ReviewView.css';

interface ReviewViewProps {
  className?: string;
}

interface ReviewItem {
  id: number;
  userReviewed: string;
  content: string;
  rating: number;
  status: 'published' | 'pending' | 'rejected' | 'hidden';
  createdAt: string;
  updatedAt: string;
  menuItem?: string;
  orderId?: string;
  userEmail?: string;
  userPhone?: string;
  response?: string;
  responseDate?: string;
}

// Mock data - in a real app, this would be fetched based on the ID
const mockReview: ReviewItem = {
  id: 1,
  userReviewed: 'John Smith',
  content: 'Great coffee and excellent service! The barista was very friendly and the latte was perfectly made. The atmosphere is cozy and perfect for working or catching up with friends. The WiFi is fast and reliable. Will definitely come back again and recommend to others. The staff was knowledgeable about their coffee and helped me choose the perfect drink.',
  rating: 5,
  status: 'published',
  createdAt: '2024-01-15T10:00:00Z',
  updatedAt: '2024-01-15T10:00:00Z',
  menuItem: 'Latte',
  orderId: '#12345',
  userEmail: 'john.smith@email.com',
  userPhone: '+1 (555) 123-4567',
  response: 'Thank you so much for your wonderful review, John! We\'re thrilled that you enjoyed your latte and our service. We look forward to seeing you again soon!',
  responseDate: '2024-01-15T14:30:00Z'
};

const ReviewView: React.FC<ReviewViewProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  
  // In a real app, you would fetch the review data based on the ID
  const review = mockReview;

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      published: { label: 'Published', className: 'review-view__status-badge--published' },
      pending: { label: 'Pending', className: 'review-view__status-badge--pending' },
      rejected: { label: 'Rejected', className: 'review-view__status-badge--rejected' },
      hidden: { label: 'Hidden', className: 'review-view__status-badge--hidden' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    
    return (
      <span className={`review-view__status-badge ${config.className}`}>
        {config.label}
      </span>
    );
  };

  const renderStars = (rating: number) => {
    return (
      <div className="review-view__stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`review-view__star ${star <= rating ? 'review-view__star--filled' : ''}`}
          >
            ★
          </span>
        ))}
        <Text variant="span" size="sm" color="muted" className="review-view__rating-text">
          {rating} out of 5 stars
        </Text>
      </div>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleBack = () => {
    navigate('/admin/store/review/manage');
  };

  const handleEdit = () => {
    navigate(`/admin/store/review/${id}/edit`);
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete this review from ${review.userReviewed}?`)) {
      console.log('Delete review:', review.id);
      // In a real app, this would make an API call
      navigate('/admin/store/review/manage');
    }
  };

  return (
    <div className={`review-view ${className}`}>
      <div className="review-view__header">
        <div className="review-view__header-left">
          <Button variant="secondary" size="sm" onClick={handleBack} className="review-view__back-btn">
            ← Back
          </Button>
          <Title level="h1" size="xl" color="primary" className="review-view__title">
            Review Details
          </Title>
        </div>
        <div className="review-view__header-right">
          <Button variant="outline" size="md" onClick={handleEdit}>
            Edit
          </Button>
          <Button variant="outline" size="md" onClick={handleDelete} className="review-view__delete-btn">
            Delete
          </Button>
        </div>
      </div>

      <div className="review-view__content">
        <div className="review-view__main">
          <div className="review-view__review-card">
            <div className="review-view__review-header">
              <div className="review-view__user-info">
                <Text variant="h3" size="lg" color="primary" className="review-view__user-name">
                  {review.userReviewed}
                </Text>
                <div className="review-view__user-details">
                  {review.userEmail && (
                    <Text variant="p" size="sm" color="muted" className="review-view__user-email">
                      {review.userEmail}
                    </Text>
                  )}
                  {review.userPhone && (
                    <Text variant="p" size="sm" color="muted" className="review-view__user-phone">
                      {review.userPhone}
                    </Text>
                  )}
                </div>
              </div>
              <div className="review-view__review-meta">
                {renderStars(review.rating)}
                <div className="review-view__status-section">
                  {getStatusBadge(review.status)}
                </div>
              </div>
            </div>

            <div className="review-view__review-content">
              <Text variant="p" size="md" color="secondary" className="review-view__content-text">
                {review.content}
              </Text>
            </div>

            <div className="review-view__review-footer">
              <div className="review-view__review-details">
                {review.menuItem && (
                  <div className="review-view__detail-item">
                    <Text variant="span" size="sm" color="muted" className="review-view__detail-label">
                      Menu Item:
                    </Text>
                    <Text variant="span" size="sm" color="primary" className="review-view__detail-value">
                      {review.menuItem}
                    </Text>
                  </div>
                )}
                {review.orderId && (
                  <div className="review-view__detail-item">
                    <Text variant="span" size="sm" color="muted" className="review-view__detail-label">
                      Order ID:
                    </Text>
                    <Text variant="span" size="sm" color="primary" className="review-view__detail-value">
                      {review.orderId}
                    </Text>
                  </div>
                )}
                <div className="review-view__detail-item">
                  <Text variant="span" size="sm" color="muted" className="review-view__detail-label">
                    Reviewed on:
                  </Text>
                  <Text variant="span" size="sm" color="primary" className="review-view__detail-value">
                    {formatDate(review.createdAt)}
                  </Text>
                </div>
              </div>
            </div>
          </div>

          {review.response && (
            <div className="review-view__response-card">
              <div className="review-view__response-header">
                <Text variant="h4" size="md" color="primary" className="review-view__response-title">
                  Your Response
                </Text>
                {review.responseDate && (
                  <Text variant="p" size="sm" color="muted" className="review-view__response-date">
                    {formatDate(review.responseDate)}
                  </Text>
                )}
              </div>
              <div className="review-view__response-content">
                <Text variant="p" size="md" color="secondary" className="review-view__response-text">
                  {review.response}
                </Text>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewView;
