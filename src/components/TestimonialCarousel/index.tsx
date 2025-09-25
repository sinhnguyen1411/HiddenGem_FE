import React from 'react';
import { Carousel } from '@mantine/carousel';
import { Card, Text, Box, Avatar, Stack, Group } from '@mantine/core';
import './index.css';

interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  headline: string;
  quote: string;
  timeAgo: string;
}

interface TestimonialCarouselProps {
  title?: string;
  testimonials: Testimonial[];
  backgroundImage?: string;
  className?: string;
}

const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({ 
  title = "What our Customers", 
  testimonials, 
  backgroundImage,
  className = '' 
}) => {
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className="testimonial-carousel__star">★</span>
      );
    }
    return stars;
  };

  return (
    <Box 
      className={`testimonial-carousel ${className}`}
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {}}
    >
      <Box className="testimonial-carousel__overlay">
        <Box className="testimonial-carousel__content">
          {title && (
            <Box className="testimonial-carousel__title-section">
              <Text className="testimonial-carousel__title">
                {title}
              </Text>
            </Box>
          )}
          
          <Carousel
            withIndicators
            height="auto"
            slideSize="280px"
            slideGap="lg"
            emblaOptions={{ loop: true, align: 'start' }}
            className="testimonial-carousel__slider"
            nextControlIcon={<span className="testimonial-carousel__arrow">→</span>}
            previousControlIcon={<span className="testimonial-carousel__arrow">←</span>}
          >
            {testimonials.map((testimonial) => (
              <Carousel.Slide key={testimonial.id} className="testimonial-carousel__slide">
                <Card className="testimonial-carousel__card" shadow="lg" padding="xl" radius="lg">
                  <Stack gap="md" align="center" className="testimonial-carousel__card-content">
                    {testimonial.avatar ? (
                      <Avatar
                        src={testimonial.avatar}
                        size="xl"
                        radius="xl"
                        className="testimonial-carousel__avatar"
                      />
                    ) : (
                      <Box
                        className="testimonial-carousel__avatar testimonial-carousel__avatar--placeholder"
                        style={{
                          width: 80,
                          height: 80,
                          borderRadius: '50%',
                          backgroundColor: '#E5E7EB',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#9CA3AF',
                          fontSize: '24px',
                          fontWeight: 600,
                          border: '3px solid rgba(255, 255, 255, 0.2)'
                        }}
                      >
                        {testimonial.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </Box>
                    )}
                    
                    <Group gap="xs" className="testimonial-carousel__rating">
                      {renderStars(testimonial.rating)}
                    </Group>
                    
                    <Text className="testimonial-carousel__headline" fw={600} size="lg" ta="center">
                      {testimonial.headline}
                    </Text>
                    
                    <Text className="testimonial-carousel__quote" size="sm" ta="center" c="dimmed">
                      "{testimonial.quote}"
                    </Text>
                    
                    <Stack gap="xs" align="center" className="testimonial-carousel__footer">
                      <Text className="testimonial-carousel__name" fw={500} size="sm" c="green">
                        {testimonial.name}
                      </Text>
                      <Text className="testimonial-carousel__time" size="xs" c="dimmed">
                        {testimonial.timeAgo}
                      </Text>
                    </Stack>
                  </Stack>
                </Card>
              </Carousel.Slide>
            ))}
          </Carousel>
        </Box>
      </Box>
    </Box>
  );
};

export default TestimonialCarousel;
