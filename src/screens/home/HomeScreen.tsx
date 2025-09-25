import React, { useState, useEffect } from 'react';
import { Footer, Title, Text, Button, Input, StoreCard } from '../../components';
import { bannersService } from '../../services/banners';
import { cafesService } from '../../services/cafes';
import { Banner, Cafe } from '../../services/types';
import { users } from '../../dummyData/usersData';
import './HomeScreen.css';
import HomeStory from "../../assets/images/home-story.png";
import HomeReview from "../../assets/images/home-review.png";
import HomeNewsletter from "../../assets/images/home-newsletter.png";
import { useNavigate } from 'react-router-dom';
import { contentService } from '../../services';


const TestimonialCard: React.FC<{ testimonial: any }> = ({ testimonial }) => {
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={`star ${i <= rating ? 'filled' : ''}`}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="testimonial-card">
      <div className="testimonial-content">
        <div className="testimonial-quote">
          <Text variant="p" size="sm" color="secondary">
            "{testimonial.text}"
          </Text>
        </div>
        <div className="testimonial-author">
          <Text variant="p" size="sm" color="primary" className="author-name">
            {testimonial.name}
          </Text>
          <Text variant="p" size="sm" color="secondary" className="author-time">
            {testimonial.timeAgo}
          </Text>
        </div>
        <div className="testimonial-title">
          <Text variant="p" size="sm" color="primary">
            {testimonial.title}
          </Text>
        </div>
        <div className="testimonial-rating">
          {renderStars(testimonial.rating)}
        </div>
      </div>
      <div className="testimonial-avatar">
        <img src={testimonial.avatar} alt={testimonial.name} />
      </div>
    </div>
  );
};

const HomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [isLoadingBanners, setIsLoadingBanners] = useState(true);
  const [bannerError, setBannerError] = useState<string | null>(null);
  
  // Cafe data states
  const [cafes, setCafes] = useState<Cafe[]>([]);
  const [isLoadingCafes, setIsLoadingCafes] = useState(true);
  const [cafeError, setCafeError] = useState<string | null>(null);

  const [content, setContent] = useState<string>('');

  // Fetch banners on component mount
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        setIsLoadingBanners(true);
        setBannerError(null);
        const response = await bannersService.list({ vi_tri: 'home_top', active: 1 });
        console.log('bannersService', response.data);
        setBanners(response.data);
      } catch (error) {
        console.error('Error fetching banners:', error);
        setBannerError('Failed to load hero images');
        // Fallback to placeholder images
        setBanners([]);
      } finally {
        setIsLoadingBanners(false);
      }
    };

    fetchBanners();
  }, []);

  // Fetch cafes on component mount
  useEffect(() => {
    const fetchCafes = async () => {
      try {
        setIsLoadingCafes(true);
        setCafeError(null);
        const response = await cafesService.list(1, 12); // First page, 12 items
        setCafes(response.data.items);
      } catch (error) {
        console.error('Error fetching cafes:', error);
        setCafeError('Failed to load cafes');
        setCafes([]);
      } finally {
        setIsLoadingCafes(false);
      }
    };

    fetchCafes();
  }, []);

    // Fetch cafes on component mount
    useEffect(() => {
      const fetchContent = async () => {
        try {
          setIsLoadingCafes(true);
          setContent('');
          const response = await contentService.getContent('about'); // First page, 12 items
          console.log('fetchContent', response.data);
          // setContent(response.data);
        } catch (error) {
          console.error('Error fetching content:', error);
          setContent('');
        } finally {
          setIsLoadingCafes(false);
        }
      };
  
      fetchContent();
    }, []);

  // Get hero images from banners, sorted by thu_tu (order)
  const heroImages = banners
    .sort((a, b) => a.thu_tu - b.thu_tu)
    .map(banner => banner.url_anh);

    const heroImageTitle = banners?.[currentSlide]?.tieu_de || '';
    const heroImageSubtitle = banners?.[currentSlide]?.mo_ta || '';

  const hiddenGemsStory = {
    id: 1,
    name: `${users[2].firstName} ${users[2].lastName}`,
    role: "Coffee Enthusiast & Food Blogger",
    text: "Hidden Gems has completely transformed my coffee experience! As someone who travels frequently for work, I've visited countless coffee shops, but none compare to the authentic flavors and warm atmosphere I've found here. The baristas truly understand their craft, and every cup tells a story. From their signature single-origin blends to the cozy corner nooks perfect for remote work, this place has become my second home. The community here is incredible - I've made lifelong friends over shared tables and morning conversations. It's not just about the coffee; it's about the connection, the culture, and the passion that goes into every single brew.",
    timeAgo: "2 weeks ago",
    avatar: users[2].avatar
  };

  const testimonials = [
    {
      id: 1,
      name: `${users[4].firstName} ${users[4].lastName}`,
      text: "The best coffee I've had in the city! The baristas are incredibly knowledgeable and the atmosphere is perfect for both work and relaxation.",
      timeAgo: "3 days ago",
      title: "Exceptional coffee experience",
      rating: 5,
      avatar: users[4].avatar
    },
    {
      id: 2,
      name: `${users[3].firstName} ${users[3].lastName}`,
      text: "As a busy professional, I appreciate the quality coffee and quiet environment. The staff remembers my order and always greets me with a smile.",
      timeAgo: "1 week ago",
      title: "Perfect for remote work",
      rating: 4,
      avatar: users[3].avatar
    },
    {
      id: 3,
      name: `${users[7].firstName} ${users[7].lastName}`,
      text: "Hidden Gems truly lives up to its name. The single-origin beans and expert brewing techniques make every visit a delightful experience.",
      timeAgo: "5 days ago",
      title: "A true hidden gem",
      rating: 5,
      avatar: users[7].avatar
    }
  ];

  // Use cafes from API instead of dummy data
  const allCoffees = cafes;

  const handleViewStoreDetail = (storeId: number) => {
    console.log('View store details:', storeId);
    navigate(`/store/${storeId}`);
  };

  return (
    <div className="home-container">
      {/* Hero Section with Image Slider */}
      <section className="hero-section">
        <div className="hero-slider">
          <div className="hero-images">
            {isLoadingBanners ? (
              <div className="hero-image active loading">
                <div className="loading-spinner">
                  <Text variant="p" size="md" color="white">Loading...</Text>
                </div>
              </div>
            ) : heroImages.length > 0 ? (
              heroImages.map((image, index) => (
                <img 
                  key={index} 
                  src={image}
                  alt={`Hero banner ${index + 1}`}
                  className={`hero-image ${index === currentSlide ? 'active' : ''}`}
                />
              ))
            ) : (
              <div className="hero-image active error">
                <div className="error-message">
                  <Text variant="p" size="md" color="white">
                    {bannerError || 'No hero images available'}
                  </Text>
                </div>
              </div>
            )}
          </div>
          
          <div className="hero-search">
            <div className="search-slogan">
              <Text variant="p" size="md" color="white" className="highlight-text">
                {heroImageSubtitle}
              </Text>
              <Title level="h1" size="xl" color="white">
                {heroImageTitle}
              </Title>
            </div>
            <div className="search-form">
              <div className="search-input-container">
                <Input 
                  type="text" 
                  placeholder="Enter your location"
                  className="search-input"
                />
                <Button variant="primary" size="lg" className="search-button">
                  Search
                </Button>
              </div>
            </div>
          </div>

          {/* Slider Controls - only show if we have images and not loading */}
          {!isLoadingBanners && heroImages.length > 1 && (
            <div className="slider-controls">
              <div className="slider-dots">
                {heroImages.map((_, index) => (
                  <button
                    key={index}
                    className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
                    onClick={() => setCurrentSlide(index)}
                  />
                ))}
              </div>
              <div className="slider-arrows">
                <button 
                  className="slider-arrow left"
                  onClick={() => setCurrentSlide((prev) => prev > 0 ? prev - 1 : heroImages.length - 1)}
                >
                  ‹
                </button>
                <button 
                  className="slider-arrow right"
                  onClick={() => setCurrentSlide((prev) => prev < heroImages.length - 1 ? prev + 1 : 0)}
                >
                  ›
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* All Coffees Section */}
      <section className="all-coffees-section">
        <div className="section-background"></div>
        <div className="section-content">
          <Title level="h2" size="xl" color="primary" className="section-title">
            All Coffees
          </Title>
          
          {isLoadingCafes ? (
            <div className="coffees-loading">
              <Text variant="p" size="lg" color="primary">Loading cafes...</Text>
            </div>
          ) : cafeError ? (
            <div className="coffees-error">
              <Text variant="p" size="lg" color="primary">{cafeError}</Text>
            </div>
          ) : allCoffees.length > 0 ? (
            <>
              <div className="coffees-grid">
                {allCoffees.map((coffee) => (
                  <StoreCard 
                    key={coffee.id_cua_hang} 
                    store={coffee} 
                    onViewDetails={handleViewStoreDetail}
                  />
                ))}
              </div>
              <div className="pagination-dots">
                {Array.from({ length: Math.ceil(allCoffees.length / 4) }, (_, i) => (
                  <button key={i} className={`pagination-dot ${i === 0 ? 'active' : ''}`} />
                ))}
              </div>
            </>
          ) : (
            <div className="coffees-empty">
              <Text variant="p" size="lg" color="secondary">No cafes available</Text>
            </div>
          )}
        </div>
      </section>

      {/* What our Customers Section */}
      <section className="customers-section">
        <div className="customers-background">
          <img src={HomeReview} alt="Coffee background" />
        </div>
        <div className="customers-content">
          <div className="customers-header">
            <div className="customers-line"></div>
            <Title level="h2" size="lg" color="white" className="customers-title">
              What our Customers
            </Title>
            <div className="customers-line"></div>
          </div>
          
          <div className="testimonials-grid">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* Hidden Gems Stories Section */}
      <section className="hidden-gems-stories-section">
        <div className="stories-background">
          <img src={HomeStory} alt="Coffee background" />
        </div>
        <div className="stories-content">
          <div className="stories-header">
            <Title level="h2" size="lg" color="primary" className="stories-title">
              Hidden Gems Stories
            </Title>
            <Text variant="p" size="md" color="secondary" className="stories-subtitle">
              Our customers has amazing things to say about us
            </Text>
          </div>
          
          <div className="story-card">
            <div className="story-content">
              <div className="story-quote">
                <Text variant="p" size="lg" color="primary">
                  "
                </Text>
              </div>
              <Text variant="p" size="md" color="secondary" className="story-text">
                {hiddenGemsStory.text}
              </Text>
              <div className="story-author">
                <Text variant="p" size="lg" color="primary" className="author-name">
                  {hiddenGemsStory.name}
                </Text>
                <Text variant="p" size="md" color="secondary" className="author-role">
                  {hiddenGemsStory.role}
                </Text>
                <Text variant="p" size="sm" color="secondary" className="story-time">
                  {hiddenGemsStory.timeAgo}
                </Text>
              </div>
            </div>
            <div className="story-avatar">
              <img src={hiddenGemsStory.avatar} alt={hiddenGemsStory.name} />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="newsletter-background">
          <img src={HomeNewsletter} alt="Newsletter background" />
        </div>
        <div className="newsletter-content">
          <div className="newsletter-text">
            <Title level="h2" size="xl" color="white" className="newsletter-title">
              Subscribe to get the Latest News
            </Title>
            <Text variant="p" size="md" color="white" className="newsletter-subtitle">
              Don't miss out on our latest news, updates, tips and special offers
            </Text>
          </div>
          <div className="newsletter-form">
            <div className="form-container">
              <Input 
                type="email" 
                placeholder="Enter your mail"
                className="newsletter-input"
              />
              <Button variant="primary" size="lg" className="newsletter-button">
                Suscribe
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomeScreen;
