import React, { useState, useEffect } from 'react';
import { Title, Text, Button, AdminStatsCard } from '../../components';
import { contentService } from '../../services/content';
import './ContentManage.css';

interface ContentManageProps {
  className?: string;
}

interface ContentItem {
  slug: string;
  title: string;
  content: string;
  lastUpdated: string;
}

// Default content categories
const contentCategories = [
  {
    slug: 'about',
    title: 'About Us',
    description: 'Company information and story'
  },
  {
    slug: 'testimonials',
    title: 'Testimonials',
    description: 'Customer reviews and feedback'
  }
];

const ContentManage: React.FC<ContentManageProps> = ({ className = '' }) => {
  // API data states
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  
  // Edit states
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');

  // Fetch content on component mount and when screen comes into focus
  const fetchContent = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const contentData: ContentItem[] = [];
      
      // Fetch content for each category
      for (const category of contentCategories) {
        try {
          const response = await contentService.getContent(category.slug);
          contentData.push({
            slug: category.slug,
            title: category.title,
            content: response.data.content || '',
            lastUpdated: new Date().toISOString()
          });
        } catch (error) {
          console.warn(`Failed to fetch content for ${category.slug}:`, error);
          // Add empty content if fetch fails
          contentData.push({
            slug: category.slug,
            title: category.title,
            content: '',
            lastUpdated: new Date().toISOString()
          });
        }
      }
      
      setContentItems(contentData);
    } catch (error) {
      console.error('Error fetching content:', error);
      setError('Failed to load content');
    } finally {
      setIsLoading(false);
    }
  };

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

  const handleEdit = (item: ContentItem) => {
    setEditingItem(item.slug);
    setEditContent(item.content);
  };

  const handleSave = async (slug: string) => {
    try {
      setIsSaving(true);
      setError(null);
      
      await contentService.updateContent(slug, { content: editContent });
      
      // Update local state
      setContentItems(prev => prev.map(item => 
        item.slug === slug 
          ? { ...item, content: editContent, lastUpdated: new Date().toISOString() }
          : item
      ));
      
      setEditingItem(null);
      setEditContent('');
    } catch (error) {
      console.error('Error saving content:', error);
      setError('Failed to save content');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setEditingItem(null);
    setEditContent('');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Statistics
  const statsData = [
    {
      title: 'Total Categories',
      value: contentCategories.length.toString(),
      icon: '📄',
      trend: { value: 0, isPositive: true }
    },
    {
      title: 'Updated Today',
      value: contentItems.filter(item => {
        const today = new Date().toDateString();
        const itemDate = new Date(item.lastUpdated).toDateString();
        return today === itemDate;
      }).length.toString(),
      icon: '✏️',
      trend: { value: 0, isPositive: true }
    },
    {
      title: 'About Content',
      value: contentItems.find(item => item.slug === 'about')?.content ? 'Has Content' : 'Empty',
      icon: 'ℹ️',
      trend: { value: 0, isPositive: true }
    },
    {
      title: 'Testimonials',
      value: contentItems.find(item => item.slug === 'testimonials')?.content ? 'Has Content' : 'Empty',
      icon: '💬',
      trend: { value: 0, isPositive: true }
    }
  ];

  if (isLoading) {
    return (
      <div className={`content-manage ${className}`}>
        <div className="content-manage__loading">
          <Text variant="p" size="lg" color="primary">Loading content...</Text>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`content-manage ${className}`}>
        <div className="content-manage__error">
          <Text variant="p" size="lg" color="primary">{error}</Text>
          <Button
            variant="primary"
            size="md"
            onClick={() => window.location.reload()}
            className="content-manage__retry-btn"
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`content-manage ${className}`}>
      <div className="content-manage__header">
        <div className="content-manage__header-left">
          <Title level="h1" size="xl" color="primary" className="content-manage__title">
            Content Management
          </Title>
          <Text variant="p" size="md" color="secondary" className="content-manage__subtitle">
            Manage website content for About and Testimonials sections
          </Text>
        </div>
      </div>

      <div className="content-manage__stats">
        {statsData.map((stat, index) => (
          <AdminStatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
            className="content-manage__stat-card"
          />
        ))}
      </div>

      <div className="content-manage__content-section">
        {contentItems.map((item) => {
          const category = contentCategories.find(cat => cat.slug === item.slug);
          const isEditing = editingItem === item.slug;
          
          return (
            <div key={item.slug} className="content-manage__content-card">
              <div className="content-manage__content-header">
                <div className="content-manage__content-title-section">
                  <Title level="h2" size="lg" color="primary" className="content-manage__content-title">
                    {item.title}
                  </Title>
                  <Text variant="p" size="sm" color="secondary" className="content-manage__content-description">
                    {category?.description}
                  </Text>
                </div>
                <div className="content-manage__content-actions">
                  {isEditing ? (
                    <div className="content-manage__edit-actions">
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleSave(item.slug)}
                        disabled={isSaving}
                        className="content-manage__save-btn"
                      >
                        {isSaving ? 'Saving...' : 'Save'}
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={handleCancel}
                        disabled={isSaving}
                        className="content-manage__cancel-btn"
                      >
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleEdit(item)}
                      className="content-manage__edit-btn"
                    >
                      Edit
                    </Button>
                  )}
                </div>
              </div>

              <div className="content-manage__content-body">
                {isEditing ? (
                  <div className="content-manage__edit-section">
                    <Text variant="span" size="sm" color="primary" className="content-manage__edit-label">
                      Content (Markdown supported)
                    </Text>
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="content-manage__edit-textarea"
                      placeholder="Enter content here... (Markdown formatting supported)"
                      rows={10}
                    />
                  </div>
                ) : (
                  <div className="content-manage__content-display">
                    {item.content ? (
                      <div className="content-manage__content-text">
                        <pre className="content-manage__content-pre">
                          {item.content}
                        </pre>
                      </div>
                    ) : (
                      <Text variant="p" size="md" color="muted" className="content-manage__empty-content">
                        No content available. Click Edit to add content.
                      </Text>
                    )}
                  </div>
                )}
              </div>

              <div className="content-manage__content-footer">
                <Text variant="span" size="xs" color="muted" className="content-manage__last-updated">
                  Last updated: {formatDate(item.lastUpdated)}
                </Text>
                <Text variant="span" size="xs" color="muted" className="content-manage__character-count">
                  {item.content.length} characters
                </Text>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContentManage;
