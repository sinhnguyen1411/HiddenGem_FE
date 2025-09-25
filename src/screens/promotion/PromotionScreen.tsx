import React, { useState, useEffect } from 'react';
import { Footer, Title, Text, Button } from '../../components';
import { promotionsService, Promotion } from '../../services/promotions';
import './PromotionScreen.css';

interface PromotionScreenProps {
  className?: string;
}


const PromotionScreen: React.FC<PromotionScreenProps> = ({ className = '' }) => {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Fetch promotions from API
  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        setLoading(true);
        const response = await promotionsService.getAllPromotions();
        setPromotions(response.data);
      } catch (err) {
        setError('Failed to load promotions');
        console.error('Error fetching promotions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPromotions();
  }, []);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Filter promotions based on category (for now, we'll use all since API doesn't have categories)
  const filteredPromotions = selectedCategory === 'all' 
    ? promotions 
    : promotions.filter(promo => {
        // For now, we'll filter by store name or description
        const searchTerm = selectedCategory.toLowerCase();
        return (
          promo.store?.ten_cua_hang.toLowerCase().includes(searchTerm) ||
          promo.mo_ta?.toLowerCase().includes(searchTerm) ||
          promo.ten_chuong_trinh.toLowerCase().includes(searchTerm)
        );
      });

  // Get featured promotions (first 3)
  const featuredPromotions = promotions.slice(0, 3);
  console.log('featuredPromotions', featuredPromotions)

  const formatDate = (dateString: string) => {
    if (dateString === 'Ongoing') return 'Ongoing';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Generate categories from promotions data
  const promotionCategories = [
    { id: 'all', label: 'All Promotions', count: promotions.length },
    { id: 'coffee', label: 'Coffee', count: promotions.filter(p => p.mo_ta?.toLowerCase().includes('coffee')).length },
    { id: 'food', label: 'Food', count: promotions.filter(p => p.mo_ta?.toLowerCase().includes('food') || p.mo_ta?.toLowerCase().includes('brunch')).length },
    { id: 'drink', label: 'Drinks', count: promotions.filter(p => p.mo_ta?.toLowerCase().includes('drink')).length },
    { id: 'discount', label: 'Discount', count: promotions.filter(p => p.ten_chuong_trinh.toLowerCase().includes('discount')).length }
  ];

  // Static content for hero and other sections
  const promotionHero = {
    title: "Special Offers & Promotions",
    subtitle: "Discover amazing deals and exclusive offers from your favorite coffee shops"
  };

  const howToUse = [
    {
      step: 1,
      title: "Browse Promotions",
      description: "Explore our collection of current promotions and special offers from participating coffee shops.",
      icon: "🔍"
    },
    {
      step: 2,
      title: "Choose Your Deal",
      description: "Select the promotion that interests you and check the participating locations and terms.",
      icon: "🎯"
    },
    {
      step: 3,
      title: "Visit the Shop",
      description: "Go to the participating coffee shop and show the promotion code or mention the offer.",
      icon: "🏪"
    },
    {
      step: 4,
      title: "Enjoy Your Savings",
      description: "Get your discounted coffee and enjoy the savings! Don't forget to leave a review.",
      icon: "☕"
    }
  ];

  const termsAndConditions = [
    "Promotions are valid only at participating coffee shops listed in the offer details.",
    "Each promotion has specific terms and conditions that must be met to qualify for the discount.",
    "Promotion codes are case-sensitive and must be presented at the time of purchase.",
    "Some promotions may have minimum purchase requirements or exclusions on certain items.",
    "Promotions cannot be combined with other offers unless specifically stated.",
    "Expired promotions will not be honored, so please check the validity period before visiting.",
    "The coffee shop reserves the right to modify or cancel promotions at any time.",
    "Promotions are subject to availability and may be limited to certain times or days."
  ];

  if (loading) {
    return (
      <div className={`promotion-screen ${className}`}>
        <div className="promotion-screen__loading">
          <Text>Loading promotions...</Text>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className={`promotion-screen ${className}`}>
        <div className="promotion-screen__error">
          <Title level="h1" size="lg" color="primary">
            {error}
          </Title>
          <Button
            variant="primary"
            size="md"
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className={`promotion-screen ${className}`}>
      {/* Hero Section */}
      <section className="promotion-hero">
        <div className="promotion-hero__overlay"></div>
        <div className="promotion-hero__content">
          <div className="promotion-hero__text">
            <Text className="promotion-hero__highlight" color="white">
              {promotionHero.subtitle}
            </Text>
            <Title level="h1" size="xl" color="white" className="promotion-hero__title">
              {promotionHero.title}
            </Title>
          </div>
        </div>
      </section>

      <main className="promotion-screen__main">
        <div className="promotion-screen__container">
          {/* Featured Promotions Section */}
          <section className="featured-promotions-section">
            <div className="featured-promotions__header">
              <div className="featured-promotions__line"></div>
              <Title level="h2" size="md" color="primary" className="featured-promotions__title">
                Featured Promotions
              </Title>
              <div className="featured-promotions__line"></div>
            </div>

            <div className="featured-promotions__grid">
              {featuredPromotions.map((promotion) => (
                <div key={promotion.id_khuyen_mai} className="featured-promotion-card">
                  <div className="featured-promotion-card__image">
                    <img 
                      src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                      alt={promotion.ten_chuong_trinh} 
                    />
                    <div className="featured-promotion-card__badge">
                      <span className="featured-promotion-card__discount">Special</span>
                    </div>
                  </div>
                  
                  <div className="featured-promotion-card__content">
                    <div className="featured-promotion-card__category">
                      <Text variant="span" size="xs" color="secondary">
                        {promotion.store?.ten_cua_hang || 'Coffee Shop'}
                      </Text>
                    </div>
                    
                    <Title level="h3" size="md" color="primary" className="featured-promotion-card__title">
                      {promotion.ten_chuong_trinh}
                    </Title>
                    
                    <Text variant="p" size="sm" color="secondary" className="featured-promotion-card__description">
                      {promotion.mo_ta || 'Special promotion available at this location.'}
                    </Text>
                    
                    <div className="featured-promotion-card__pricing">
                      <div className="featured-promotion-card__price">
                        <Text variant="span" size="sm" color="muted" className="featured-promotion-card__original-price">
                          Valid until: {formatDate(promotion.ngay_ket_thuc)}
                        </Text>
                      </div>
                      <div className="featured-promotion-card__shops">
                        <Text variant="span" size="xs" color="secondary">
                          {promotion.store?.ten_cua_hang || 'Coffee Shop'}
                        </Text>
                      </div>
                    </div>
                    
                    <div className="featured-promotion-card__code">
                      <div className="featured-promotion-card__code-label">
                        <Text variant="span" size="xs" color="secondary">
                          Promotion ID: {promotion.id_khuyen_mai}
                        </Text>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCopyCode(promotion.id_khuyen_mai.toString())}
                        className="featured-promotion-card__copy-btn"
                      >
                        {copiedCode === promotion.id_khuyen_mai.toString() ? 'Copied!' : 'Copy ID'}
                      </Button>
                    </div>
                    
                    <div className="featured-promotion-card__validity">
                      <Text variant="span" size="xs" color="secondary">
                        Valid until: {formatDate(promotion.ngay_ket_thuc)}
                      </Text>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* How to Use Section */}
          <section className="how-to-use-section">
            <div className="how-to-use__header">
              <Title level="h2" size="xl" color="primary" className="how-to-use__title">
                How to Use Promotions
              </Title>
              <Text variant="p" size="md" color="secondary" className="how-to-use__subtitle">
                Follow these simple steps to redeem your promotions
              </Text>
            </div>

            <div className="how-to-use__steps">
              {howToUse.map((step, index) => (
                <div key={step.step} className="how-to-use__step">
                  <div className="how-to-use__step-number">
                    <span className="how-to-use__step-icon">{step.icon}</span>
                    <div className="how-to-use__step-circle">
                      <span className="how-to-use__step-count">{step.step}</span>
                    </div>
                  </div>
                  
                  <div className="how-to-use__step-content">
                    <Title level="h3" size="md" color="primary" className="how-to-use__step-title">
                      {step.title}
                    </Title>
                    <Text variant="p" size="sm" color="secondary" className="how-to-use__step-description">
                      {step.description}
                    </Text>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Terms and Conditions Section */}
          <section className="terms-section">
            <div className="terms__header">
              <Title level="h2" size="lg" color="primary" className="terms__title">
                Terms & Conditions
              </Title>
              <Text variant="p" size="md" color="secondary" className="terms__subtitle">
                Please read the following terms before using any promotions
              </Text>
            </div>

            <div className="terms__list">
              {termsAndConditions.map((term, index) => (
                <div key={index} className="terms__item">
                  <div className="terms__bullet">•</div>
                  <Text variant="p" size="sm" color="secondary" className="terms__text">
                    {term}
                  </Text>
                </div>
              ))}
          </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PromotionScreen;
