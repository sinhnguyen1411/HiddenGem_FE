import React from 'react';
import { Carousel } from '@mantine/carousel';
import { Text, Box, Avatar } from '@mantine/core';
import './index.css';

interface Story {
  id: string;
  quote: string;
  authorName: string;
  authorRole: string;
  avatar: string;
}

interface HiddenGemsStoriesCarouselProps {
  title?: string;
  subtitle?: string;
  stories: Story[];
  backgroundColor?: string;
  className?: string;
}

const HiddenGemsStoriesCarousel: React.FC<HiddenGemsStoriesCarouselProps> = ({ 
  title = "Hidden Gems Stories", 
  subtitle = "Our customers has amazing things to say about us",
  stories, 
  backgroundColor = "#FFFFFF",
  className = '' 
}) => {
  return (
    <Box 
      className={`hidden-gems-stories-carousel ${className}`}
      style={{ backgroundColor }}
    >
      <Box className="hidden-gems-stories-carousel__content">
        {/* Header Section */}
        <Box className="hidden-gems-stories-carousel__header">
          <Text className="hidden-gems-stories-carousel__title">
            {title}
          </Text>
          <Text className="hidden-gems-stories-carousel__subtitle">
            {subtitle}
          </Text>
        </Box>
        
        {/* Carousel Section */}
        <Box className="hidden-gems-stories-carousel__carousel-container">
          <Carousel
            withIndicators={false}
            height="auto"
            slideSize="400px"
            slideGap="lg"
            emblaOptions={{ loop: true, align: 'start' }}
            className="hidden-gems-stories-carousel__slider"
            nextControlIcon={<span className="hidden-gems-stories-carousel__arrow">→</span>}
            previousControlIcon={<span className="hidden-gems-stories-carousel__arrow">←</span>}
          >
            {stories.map((story) => (
              <Carousel.Slide key={story.id} className="hidden-gems-stories-carousel__slide">
                <Box className="hidden-gems-stories-carousel__card">
                  {/* Quote Icon */}
                  <Box className="hidden-gems-stories-carousel__quote-icon">
                    <Text className="hidden-gems-stories-carousel__quote-mark">66</Text>
                  </Box>
                  
                  {/* Quote Text */}
                  <Text className="hidden-gems-stories-carousel__quote">
                    {story.quote}
                  </Text>
                  
                  {/* Author Information */}
                  <Box className="hidden-gems-stories-carousel__author">
                    <Text className="hidden-gems-stories-carousel__author-name">
                      {story.authorName}
                    </Text>
                    <Text className="hidden-gems-stories-carousel__author-role">
                      {story.authorRole}
                    </Text>
                  </Box>
                  
                  {/* Author Avatar */}
                  <Box className="hidden-gems-stories-carousel__avatar-container">
                    {story.avatar ? (
                      <Avatar
                        src={story.avatar}
                        size="xl"
                        radius="xl"
                        className="hidden-gems-stories-carousel__avatar"
                      />
                    ) : (
                      <Box
                        className="hidden-gems-stories-carousel__avatar hidden-gems-stories-carousel__avatar--placeholder"
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
                          border: '4px solid var(--color-coffee-medium)',
                          boxShadow: '0 8px 20px rgba(96, 56, 9, 0.2)'
                        }}
                      >
                        {story.authorName.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </Box>
                    )}
                  </Box>
                </Box>
              </Carousel.Slide>
            ))}
          </Carousel>
        </Box>
      </Box>
    </Box>
  );
};

export default HiddenGemsStoriesCarousel;
