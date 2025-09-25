import React from 'react';
import { Carousel } from '@mantine/carousel';
import { Card, Image, Text, Box, Group, Stack } from '@mantine/core';
import './index.css';

interface CoffeeShop {
  id: string;
  name: string;
  image: string;
  distance: string;
  rating: number;
  uptime: string;
  priceRange: string;
  location: string;
}

interface CoffeeListCarouselProps {
  title?: string;
  shops: CoffeeShop[];
  className?: string;
}

const CoffeeListCarousel: React.FC<CoffeeListCarouselProps> = ({ 
  title = "ALL COFFEES", 
  shops, 
  className = '' 
}) => {
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="coffee-list-carousel__star coffee-list-carousel__star--filled">★</span>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="coffee-list-carousel__star coffee-list-carousel__star--half">★</span>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="coffee-list-carousel__star coffee-list-carousel__star--empty">★</span>
      );
    }

    return stars;
  };

  return (
    <Box className={`coffee-list-carousel ${className}`}>
      {title && (
        <Text className="coffee-list-carousel__title">
          {title}
        </Text>
      )}
      
      <Carousel
        withIndicators
        height="auto"
        slideSize="300px"
        slideGap="lg"
        emblaOptions={{ loop: false, align: 'start' }}
        className="coffee-list-carousel__slider"
        nextControlIcon={<span className="coffee-list-carousel__arrow">→</span>}
        previousControlIcon={<span className="coffee-list-carousel__arrow">←</span>}
      >
        {shops.map((shop) => (
          <Carousel.Slide key={shop.id} className="coffee-list-carousel__slide">
            <Card className="coffee-list-carousel__card" shadow="sm" padding="lg" radius="md" withBorder>
              <Card.Section className="coffee-list-carousel__image-section">
                {shop.image ? (
                  <Image
                    src={shop.image}
                    alt={shop.name}
                    height={200}
                    className="coffee-list-carousel__image"
                  />
                ) : (
                  <Box 
                    className="coffee-list-carousel__image coffee-list-carousel__image--placeholder"
                    style={{ 
                      height: 200,
                      backgroundColor: '#E5E7EB',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#9CA3AF',
                      fontSize: '14px',
                      fontWeight: 500
                    }}
                  >
                    No Image
                  </Box>
                )}
              </Card.Section>

              <Stack gap="sm" className="coffee-list-carousel__content">
                <Group justify="space-between" align="flex-start">
                  <Group gap="xs" align="center">
                    <span className="coffee-list-carousel__location-icon">📍</span>
                    <Text size="sm" c="dimmed" className="coffee-list-carousel__distance">
                      {shop.distance}
                    </Text>
                  </Group>
                  
                  <Group gap="xs" align="center">
                    {renderStars(shop.rating)}
                  </Group>
                </Group>

                <Text className="coffee-list-carousel__name" fw={600} size="lg">
                  {shop.name}
                </Text>

                <Box className="coffee-list-carousel__details">
                  <Text size="sm" c="dimmed" className="coffee-list-carousel__uptime">
                    Uptime: {shop.uptime}
                  </Text>
                  <Text size="sm" c="dimmed" className="coffee-list-carousel__price">
                    Price: {shop.priceRange}
                  </Text>
                </Box>
              </Stack>
            </Card>
          </Carousel.Slide>
        ))}
      </Carousel>
    </Box>
  );
};

export default CoffeeListCarousel;
