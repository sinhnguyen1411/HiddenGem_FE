import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Footer, Button, Input, Text, Title } from "../../components";
import { blogService, BlogPost } from "../../services/blog";
import "./BlogScreen.css";

interface BlogScreenProps {
  className?: string;
}

const BlogScreen: React.FC<BlogScreenProps> = ({ className = "" }) => {
  const navigate = useNavigate();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [visiblePosts, setVisiblePosts] = useState(8);

  const fetchBlogPosts = async () => {
    try {
      setLoading(true);
      const response = await blogService.list(searchQuery);
      setBlogPosts(response.data.items);
    } catch (err) {
      setError("Failed to load blog posts");
      console.error("Error fetching blog posts:", err);
    } finally {
      setLoading(false);
    }
  };

  const searchWithCurrentQuery = () => {
    fetchBlogPosts();
  };

  // Fetch blog posts from API
  useEffect(() => {
    fetchBlogPosts();
  }, []);

  // Filter posts based on search
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.tieu_de.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.noi_dung.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const displayedPosts = filteredPosts.slice(0, visiblePosts);

  // Get featured post (first post)
  const featuredPost = blogPosts[0];

  const handleLoadMore = () => {
    setVisiblePosts((prev) => Math.min(prev + 4, filteredPosts.length));
  };

  const handleBlogClick = (post: BlogPost) => {
    navigate(`/blog/${post.id_blog}`, { state: { blogPost: post } });
  };

  // Format date for display
  const formatDate = (dateString?: string) => {
    if (!dateString) return "Unknown date";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return "Unknown date";
    }
  };

  // Create excerpt from content if not provided
  const getExcerpt = (content: string, maxLength: number = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + "...";
  };


  // Static content for hero and filters
  const blogHeroContent = {
    highlightText: "Latest news, tips, and insights",
    mainTitle: "Coffee Blog & Articles",
    searchPlaceholder: "Search articles...",
    searchButtonText: "Search"
  };

  const blogFilters = {
    searchPlaceholder: "Search articles...",
    topicsLabel: "Topics",
    loadMoreText: "LOAD MORE"
  };

  if (loading) {
    return (
      <div className={`blog-screen ${className}`}>
        <div className="blog-screen__loading">
          <Text>Loading blog posts...</Text>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className={`blog-screen ${className}`}>
        <div className="blog-screen__error">
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
    <div className={`blog-screen ${className}`}>
      {/* Hero Banner Section */}
      <section className="blog-hero">
        <div className="blog-hero__overlay"></div>
        <div className="blog-hero__content">
          <div className="blog-hero__text">
            <Text className="blog-hero__highlight" color="white">
              {blogHeroContent.highlightText}
            </Text>
            <Title
              level="h1"
              size="xl"
              color="white"
              className="blog-hero__title"
            >
              {blogHeroContent.mainTitle}
            </Title>
          </div>
          <div className="blog-hero__search">
            <div className="blog-hero__search-container">
              <Input
                type="text"
                placeholder={blogHeroContent.searchPlaceholder}
                className="blog-hero__search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                variant="primary"
                size="lg"
                className="blog-hero__search-button"
                onClick={searchWithCurrentQuery}
              >
                {blogHeroContent.searchButtonText}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <main className="blog-screen__main">
        <div className="blog-screen__container">
          {/* Section Title */}
          <section className="blog-section-title">
            <Text className="blog-section-title__subtitle" color="secondary">
              {blogFilters.topicsLabel}
            </Text>
            <Title
              level="h2"
              size="xl"
              color="primary"
              className="blog-section-title__title"
            >
              Latest blog posts
            </Title>
          </section>

          {/* Featured Blog Post */}
          {featuredPost && (
            <section className="blog-featured">
              <div className="blog-featured__content">
                <div className="blog-featured__meta">
                  <Text className="blog-featured__date" color="secondary">
                    {formatDate(featuredPost.thoi_gian_tao)}
                  </Text>
                  {featuredPost.author && (
                    <Text className="blog-featured__author" color="secondary">
                      By {featuredPost.author}
                    </Text>
                  )}
                </div>
                <Title
                  level="h3"
                  size="lg"
                  color="primary"
                  className="blog-featured__title"
                >
                  {featuredPost.tieu_de}
                </Title>
                <div className="blog-featured__excerpt">
                  <Text
                    color="secondary"
                    className="blog-featured__paragraph"
                  >
                    {getExcerpt(featuredPost.noi_dung, 200)}
                  </Text>
                </div>
                <Button
                  variant="outline"
                  size="md"
                  className="blog-featured__button"
                  onClick={() => handleBlogClick(featuredPost)}
                >
                  Read More
                </Button>
              </div>
            </section>
          )}

          {/* Blog Posts Grid */}
          <section className="blog-posts">
            <div className="blog-posts__grid">
              {displayedPosts.map((post) => (
                <article key={post.id_blog} className="blog-post-card">
                  <div className="blog-post-card__content">
                    <div className="blog-post-card__meta">
                      {post.author && (
                        <Text
                          className="blog-post-card__author"
                          color="secondary"
                        >
                          {post.author}
                        </Text>
                      )}
                      <Text className="blog-post-card__date" color="secondary">
                        {formatDate(post.thoi_gian_tao)}
                      </Text>
                    </div>
                    <Title
                      level="h4"
                      size="md"
                      color="primary"
                      className="blog-post-card__title"
                    >
                      {post.tieu_de}
                    </Title>
                    <Text className="blog-post-card__excerpt" color="secondary">
                      {getExcerpt(post.noi_dung)}
                    </Text>
                    <Button
                      variant="outline"
                      size="sm"
                      className="blog-post-card__button"
                      onClick={() => handleBlogClick(post)}
                    >
                      Read More
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Load More Button */}
          {visiblePosts < filteredPosts.length && (
            <section className="blog-load-more">
              <Button
                variant="primary"
                size="lg"
                className="blog-load-more__button"
                onClick={handleLoadMore}
              >
                {blogFilters.loadMoreText}
              </Button>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogScreen;
