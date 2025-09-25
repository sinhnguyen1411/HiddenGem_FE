import React, { useRef } from 'react';
import { Carousel } from '@mantine/carousel';
import { Box, Container, Text, TextInput } from '@mantine/core';
import Autoplay from 'embla-carousel-autoplay';
import './index.css';
import Button from '../Button';

interface HeroSlide {
  id: string;
  image: string;
  title: string;
  subtitle: string;
}

interface HeroCarouselProps {
  slides: HeroSlide[];
  className?: string;
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({ slides, className = '' }) => {
  const autoplay = useRef(Autoplay({ delay: 5000 }));

  return (
    <Box className={`hero-carousel ${className}`}>
      <Carousel
        withIndicators
        withControls
        height="500px"
        plugins={[autoplay.current]}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={() => autoplay.current.play()}
        emblaOptions={{ loop: true }}
        className="hero-carousel__slider"
        nextControlIcon={<span className="hero-carousel__arrow">→</span>}
        previousControlIcon={<span className="hero-carousel__arrow">←</span>}
      >
        {slides.map((slide) => (
          <Carousel.Slide key={slide.id} className="hero-carousel__slide">
            <Box 
              className="hero-carousel__background"
              style={{ 
                backgroundImage: slide.image ? `url(${slide.image})` : 'none',
                backgroundColor: slide.image ? 'transparent' : '#E5E7EB'
              }}
            >
              <Container size="lg" className="hero-carousel__content">
                <Box className="hero-carousel__text-content">
                  <Text className="hero-carousel__title">
                    {slide.title}
                  </Text>
                  <Text className="hero-carousel__subtitle">
                    {slide.subtitle}
                  </Text>
                </Box>
                
                <Box className="hero-carousel__search-section">
                  <TextInput
                    placeholder="Enter your location"
                    className="hero-carousel__search-input"
                    size="lg"
                  />
                  <Button
                    size="lg" 
                    className="hero-carousel__search-button"
                    variant="primary"
                  >
                    Search
                  </Button>
                </Box>
              </Container>
            </Box>
          </Carousel.Slide>
        ))}
      </Carousel>
    </Box>
  );
};

export default HeroCarousel;
