import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Footer, Title, Text, Button, Input, StoreCard, useAuth } from '../../components';
import { cafesService } from '../../services/cafes';
import { Cafe, CreateReviewRequest } from '../../services/types';
import './StoreDetailScreen.css';
import StoreDetail from "../../assets/images/store-detail.png";

interface ReviewItem {
  id_danh_gia: number;
  id_user: number;
  id_cua_hang: number;
  diem_danh_gia: number;
  binh_luan: string;
  trang_thai: string;
  thoi_gian_tao: string;
  user_name: string;
}


interface StoreDetailScreenProps {
  className?: string;
}

// Helper function to safely convert rating to number
const getRating = (rating: string | number): number => {
  if (typeof rating === 'string') {
    return parseFloat(rating) || 0;
  }
  return rating || 0;
};


const StoreDetailScreen: React.FC<StoreDetailScreenProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated } = useAuth();
  const [store, setStore] = useState<Cafe | null>(null);
  const [relatedStores, setRelatedStores] = useState<Cafe[]>([]);
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reviewsError, setReviewsError] = useState<string | null>(null);
  
  // Review creation states
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewContent, setReviewContent] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewSubmitError, setReviewSubmitError] = useState<string | null>(null);

  // Fetch reviews for the store
  const fetchReviews = async (storeId: number) => {
    try {
      setReviewsLoading(true);
      setReviewsError(null);
      const response = await cafesService.getReviews(storeId);
      setReviews(response.data.items);
    } catch (err) {
      setReviewsError('Failed to load reviews');
      console.error('Error fetching reviews:', err);
    } finally {
      setReviewsLoading(false);
    }
  };

  // Fetch store details on component mount
  useEffect(() => {
    const fetchStoreDetails = async () => {
      if (!id) {
        setError('Store ID not found');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const storeData = await cafesService.detail(parseInt(id));
        setStore(storeData.data);

        // Fetch related stores (first page of cafes)
        const relatedData = await cafesService.list(1, 4);
        setRelatedStores(relatedData.data.items);
      } catch (err) {
        setError('Failed to load store details');
        console.error('Error fetching store details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStoreDetails();
  }, [id]);

  // Fetch reviews when store is loaded
  useEffect(() => {
    if (store && reviews.length === 0) {
      fetchReviews(store.id_cua_hang);
    }
  }, [store, reviews.length]);

  const handleViewDetails = (storeId: number) => {
    navigate(`/store/${storeId}`);
  };

  // Helper functions for reviews
  const renderStars = (rating: number) => {
    return (
      <div className="review-stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`review-star ${star <= rating ? 'review-star--filled' : ''}`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusText = (trang_thai: string) => {
    switch (trang_thai) {
      case 'da_duyet':
        return 'Published';
      case 'cho_duyet':
        return 'Pending';
      case 'tu_choi':
        return 'Rejected';
      case 'an':
        return 'Hidden';
      default:
        return 'Pending';
    }
  };

  // Review submission functions
  const handleCreateReview = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    setShowReviewModal(true);
    setReviewRating(0);
    setReviewContent('');
    setReviewSubmitError(null);
  };

  const handleSubmitReview = async () => {
    if (!store || reviewRating === 0 || !reviewContent.trim()) {
      setReviewSubmitError('Please provide both rating and review content');
      return;
    }

    try {
      setIsSubmittingReview(true);
      setReviewSubmitError(null);

      const reviewData: CreateReviewRequest = {
        rating: reviewRating,
        content: reviewContent.trim()
      };

      await cafesService.createReview(store.id_cua_hang, reviewData);
      
      // Close modal and refresh reviews
      setShowReviewModal(false);
      setReviewRating(0);
      setReviewContent('');
      
      // Refresh reviews to show the new one
      await fetchReviews(store.id_cua_hang);
    } catch (error) {
      console.error('Error submitting review:', error);
      setReviewSubmitError('Failed to submit review. Please try again.');
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const handleCloseReviewModal = () => {
    setShowReviewModal(false);
    setReviewRating(0);
    setReviewContent('');
    setReviewSubmitError(null);
  };

  const handleStarClick = (rating: number) => {
    setReviewRating(rating);
  };

  // Loading state
  if (loading) {
    return (
      <div className={`store-detail-screen ${className}`}>
        <div className="loading-container">
          <Text variant="p" size="lg" color="primary">Loading store details...</Text>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={`store-detail-screen ${className}`}>
        <div className="error-container">
          <Text variant="p" size="lg" color="primary">{error}</Text>
          <Button variant="primary" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  // No store data
  if (!store) {
    return (
      <div className={`store-detail-screen ${className}`}>
        <div className="error-container">
          <Text variant="p" size="lg" color="primary">Store not found</Text>
        </div>
      </div>
    );
  }

  return (
    <div className={`store-detail-screen ${className}`}>
      {/* Hero Banner */}
      <section className="hero-banner">
        <div className="hero-overlay">
          <div className="hero-overlay-background">
            <img src={StoreDetail} alt="Store background" />
          </div>
        </div>
        <div className="hero-content">
          <div className="hero-search">
            <div className="search-slogan">
              <Text variant="p" size="lg" color="white" className="highlight-text">
                Find the perfect coffee shop for your taste
              </Text>
            </div>
            <div className="search-form">
              <div className="search-input-container">
                <Input
                  type="text"
                  placeholder="Search for coffee shops, cafes, or locations..."
                  className="search-input"
                />
                <Button variant="primary" size="lg" className="search-button">
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="store-detail-main">
        <div className="store-detail-container">
          {/* Store Information */}
          <div className="store-info-section">
            <div className="store-header">
              <div className="store-title">
                <Title level="h1" size="xl" color="primary">
                  {store.ten_cua_hang}
                </Title>
                <div className="store-rating">
                  <span className="stars">
                    {'★'.repeat(Math.floor(getRating(store.diem_danh_gia_trung_binh)))}
                    {'☆'.repeat(5 - Math.floor(getRating(store.diem_danh_gia_trung_binh)))}
                  </span>
                  <Text variant="p" size="md" color="secondary">
                    {getRating(store.diem_danh_gia_trung_binh).toFixed(1)} ({store.luot_xem} views)
                  </Text>
                </div>
              </div>
              <div className="store-price">
                <Text variant="p" size="lg" color="primary" className="price">
                  {getRating(store.diem_danh_gia_trung_binh) >= 4 ? '$$$' : getRating(store.diem_danh_gia_trung_binh) >= 3 ? '$$' : '$'}
                </Text>
                <Text variant="p" size="sm" color="secondary">
                  {getRating(store.diem_danh_gia_trung_binh) >= 4 ? 'High-end' : getRating(store.diem_danh_gia_trung_binh) >= 3 ? 'Moderate' : 'Budget'}
                </Text>
              </div>
            </div>

            <div className="store-description">
              <Text variant="p" size="md" color="secondary">
                {store.mo_ta || 'A wonderful coffee shop with great atmosphere and quality beverages.'}
              </Text>
            </div>
          </div>
        </div>


        {/* Reviews Section */}
        <div className="reviews-section">
          <div className="reviews-header">
            <div className="reviews-title-section">
              <Title level="h3" size="lg" color="primary">Customer Reviews</Title>
              <Text variant="p" size="md" color="secondary">
                {reviews.length} review{reviews.length !== 1 ? 's' : ''}
              </Text>
            </div>
            <Button 
              variant="primary" 
              size="md" 
              onClick={handleCreateReview}
              className="create-review-btn"
            >
              {isAuthenticated ? 'Write a Review' : 'Login to Review'}
            </Button>
          </div>

          {reviewsLoading && (
            <div className="reviews-loading">
              <Text variant="p" size="md" color="muted">Loading reviews...</Text>
            </div>
          )}

          {reviewsError && (
            <div className="reviews-error">
              <Text variant="p" size="md" color="primary">{reviewsError}</Text>
              <Button variant="primary" size="sm" onClick={() => store && fetchReviews(store.id_cua_hang)}>
                Retry
              </Button>
            </div>
          )}

          {!reviewsLoading && !reviewsError && reviews.length === 0 && (
            <div className="reviews-empty">
              <Text variant="p" size="md" color="muted">No reviews yet. Be the first to review this store!</Text>
            </div>
          )}

          {!reviewsLoading && !reviewsError && reviews.length > 0 && (
            <div className="reviews-list">
              {reviews.map((review) => (
                <div key={review.id_danh_gia} className="review-item">
                  <div className="review-header">
                    <div className="review-user">
                      <Text variant="p" size="md" color="primary" className="review-user-name">
                        {review.user_name || `User #${review.id_user}`}
                      </Text>
                      <div className="review-rating">
                        {renderStars(review.diem_danh_gia)}
                        <Text variant="span" size="sm" color="muted" className="review-rating-text">
                          ({review.diem_danh_gia}/5)
                        </Text>
                      </div>
                    </div>
                    <div className="review-meta">
                      <Text variant="span" size="sm" color="muted">
                        {formatDate(review.thoi_gian_tao)}
                      </Text>
                      <span className={`review-status review-status--${review.trang_thai}`}>
                        {getStatusText(review.trang_thai)}
                      </span>
                    </div>
                  </div>
                  <div className="review-content">
                    <Text variant="p" size="md" color="secondary">
                      {review.binh_luan}
                    </Text>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Related Stores */}
        <section className="related-stores">
          <div className="related-stores-header">
            <Title level="h2" size="lg" color="primary" className="related-title">
              Related Stores
            </Title>
            <div className="related-controls">
              <button className="prev-btn">‹</button>
              <button className="next-btn">›</button>
            </div>
          </div>
          <div className="related-stores-grid">
            {relatedStores.map((store) => (
              <StoreCard 
                key={store.id_cua_hang} 
                store={store} 
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        </section>
      </main>

      {/* Review Modal */}
      {showReviewModal && (
        <div className="review-modal-overlay" onClick={handleCloseReviewModal}>
          <div className="review-modal" onClick={(e) => e.stopPropagation()}>
            <div className="review-modal-header">
              <Title level="h3" size="lg" color="primary">Write a Review</Title>
              <button className="review-modal-close" onClick={handleCloseReviewModal}>
                ×
              </button>
            </div>
            
            <div className="review-modal-content">
              <div className="review-rating-section">
                <Text variant="p" size="md" color="secondary" className="review-rating-label">
                  Rating *
                </Text>
                <div className="review-star-selector">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      className={`review-star-btn ${star <= reviewRating ? 'review-star-btn--selected' : ''}`}
                      onClick={() => handleStarClick(star)}
                    >
                      ★
                    </button>
                  ))}
                </div>
                {reviewRating > 0 && (
                  <Text variant="p" size="sm" color="muted" className="review-rating-text">
                    {reviewRating} star{reviewRating !== 1 ? 's' : ''}
                  </Text>
                )}
              </div>

              <div className="review-content-section">
                <Text variant="p" size="md" color="secondary" className="review-content-label">
                  Review *
                </Text>
                <textarea
                  className="review-content-textarea"
                  placeholder="Share your experience with this store..."
                  value={reviewContent}
                  onChange={(e) => setReviewContent(e.target.value)}
                  rows={4}
                />
                <Text variant="p" size="sm" color="muted" className="review-content-hint">
                  {reviewContent.length}/500 characters
                </Text>
              </div>

              {reviewSubmitError && (
                <div className="review-error">
                  <Text variant="p" size="sm" color="primary">{reviewSubmitError}</Text>
                </div>
              )}

              <div className="review-modal-actions">
                <Button 
                  variant="secondary" 
                  size="md" 
                  onClick={handleCloseReviewModal}
                  disabled={isSubmittingReview}
                >
                  Cancel
                </Button>
                <Button 
                  variant="primary" 
                  size="md" 
                  onClick={handleSubmitReview}
                  disabled={isSubmittingReview || reviewRating === 0 || !reviewContent.trim()}
                >
                  {isSubmittingReview ? 'Submitting...' : 'Submit Review'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default StoreDetailScreen;
