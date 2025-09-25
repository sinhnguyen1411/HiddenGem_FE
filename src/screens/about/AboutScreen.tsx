import React, { useState, useEffect } from 'react';
import { Footer, Title, Text, Button, Input } from '../../components';
import { contentService } from '../../services/content';
import './AboutScreen.css';

interface AboutScreenProps {
  className?: string;
}

interface ContentData {
  about: string;
  testimonials: string;
}

const AboutScreen: React.FC<AboutScreenProps> = ({ className = '' }) => {
  // Content state
  const [content, setContent] = useState<ContentData>({
    about: '',
    testimonials: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch content function
  const fetchContent = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const [aboutResponse, testimonialsResponse] = await Promise.all([
        contentService.getContent('about'),
        contentService.getContent('testimonials')
      ]);
      
      setContent({
        about: aboutResponse.data.content || '',
        testimonials: testimonialsResponse.data.content || ''
      });
    } catch (error) {
      console.error('Error fetching content:', error);
      setError('Failed to load content');
      // Set fallback content
      setContent({
        about: 'Welcome to HiddenGems - your gateway to discovering unique coffee shops and creative spaces.',
        testimonials: 'Discover what our community says about their favorite coffee experiences.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch content on component mount
  useEffect(() => {
    fetchContent();
  }, []);

  // Fetch data when component comes into focus
  useEffect(() => {
    const handleFocus = () => {
      fetchContent();
    };

    window.addEventListener('focus', handleFocus);
    fetchContent();

    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  const scrollToTeam = () => {
    const teamSection = document.getElementById('team-section');
    if (teamSection) {
      teamSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`about-screen ${className}`}>
      
      {/* Hero Banner Section */}
      <section className="about-hero">
        <div className="about-hero__overlay"></div>
        <div className="about-hero__content">
          <div className="about-hero__text">
            <Text className="about-hero__highlight" color="white">
              Hightlight news, ads, discount, HOT HOT
            </Text>
            <Title level="h1" size="xl" color="white" className="about-hero__title">
              Find the café, feel the vibe
            </Title>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="about-main-content">
        <div className="about-main-content__container">
          <div className="about-main-content__sections">
            {/* About Section */}
            <div className="about-content-section">
              <div className="about-content-section__image">
                <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="About us" />
              </div>
              <div className="about-content-section__text">
                <Title level="h3" size="xl" color="primary" className="about-content-section__title">
                  About HiddenGems
                </Title>
                <div className="about-content-section__content">
                  {isLoading ? (
                    <Text variant="p" size="md" color="secondary" className="about-content-section__paragraph">
                      Loading content...
                    </Text>
                  ) : error ? (
                    <Text variant="p" size="md" color="secondary" className="about-content-section__paragraph">
                      {content.about || 'Welcome to HiddenGems - your gateway to discovering unique coffee shops and creative spaces.'}
                    </Text>
                  ) : (
                    <div className="about-content-section__dynamic-content">
                      {content.about.split('\n').map((paragraph, index) => (
                        paragraph.trim() && (
                          <Text 
                            key={index} 
                            variant="p" 
                            size="md" 
                            color="secondary" 
                            className="about-content-section__paragraph"
                          >
                            {paragraph}
                          </Text>
                        )
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Testimonials Section */}
            <div className="about-content-section about-content-section--reverse">
              <div className="about-content-section__text">
                <Title level="h3" size="xl" color="primary" className="about-content-section__title">
                  What Our Community Says
                </Title>
                <div className="about-content-section__content">
                  {isLoading ? (
                    <Text variant="p" size="md" color="secondary" className="about-content-section__paragraph">
                      Loading testimonials...
                    </Text>
                  ) : error ? (
                    <Text variant="p" size="md" color="secondary" className="about-content-section__paragraph">
                      {content.testimonials || 'Discover what our community says about their favorite coffee experiences.'}
                    </Text>
                  ) : (
                    <div className="about-content-section__dynamic-content">
                      {content.testimonials.split('\n').map((paragraph, index) => (
                        paragraph.trim() && (
                          <Text 
                            key={index} 
                            variant="p" 
                            size="md" 
                            color="secondary" 
                            className="about-content-section__paragraph"
                          >
                            {paragraph}
                          </Text>
                        )
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="about-content-section__image">
                <img src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="Testimonials" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="about-team" id="team-section">
        <div className="about-team__container">
          <div className="about-team__content">
            <Title level="h2" size="xl" color="primary" className="about-team__title">
              We Help To Achieve<br />Awesome Experience
            </Title>
            <Text variant="p" size="md" color="secondary" className="about-team__description">
              We believe that every coffee shop has a story, and every visit is a memorable experience. This website is a community diary where people continue to write their own coffee journeys.
            </Text>
            <Button variant="primary" size="lg" className="about-team__button">
              View All Team
            </Button>
          </div>
          
          <div className="about-team__grid">
            <div className="about-team__member">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" alt="Team member 1" />
            </div>
            <div className="about-team__member">
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" alt="Team member 3" />
            </div>
            <div className="about-team__member">
              <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" alt="Team member 4" />
            </div>
            <div className="about-team__member">
              <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" alt="Team member 5" />
            </div>
            <div className="about-team__member">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" alt="Team member 6" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutScreen;