import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Footer, Button, Text, Title } from "../../components";
import { blogService, BlogPost } from "../../services/blog";
import "./BlogDetailScreen.css";

interface BlogDetailScreenProps {
  className?: string;
}

const BlogDetailScreen: React.FC<BlogDetailScreenProps> = ({ className = "" }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogPost = async () => {
      if (!id) {
        setError("Blog post ID not found");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        // First try to get from location state (if navigated from blog list)
        if (location.state?.blogPost) {
          setBlogPost(location.state.blogPost);
          setLoading(false);
          return;
        }

        // If not in state, fetch from API list and find the specific post
        const response = await blogService.list();
        const post = response.data.items.find(p => p.id_blog === parseInt(id));
        
        if (post) {
          setBlogPost(post);
        } else {
          setError("Blog post not found");
        }
      } catch (err) {
        setError("Failed to load blog post");
        console.error("Error fetching blog post:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, [id, location.state]);

  const handleBackToBlog = () => {
    navigate("/blog");
  };

  if (loading) {
    return (
      <div className={`blog-detail-screen ${className}`}>
        <div className="blog-detail-screen__loading">
          <Text>Loading...</Text>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !blogPost) {
    return (
      <div className={`blog-detail-screen ${className}`}>
        <div className="blog-detail-screen__error">
          <Title level="h1" size="lg" color="primary">
            {error || "Blog post not found"}
          </Title>
          <Button
            variant="primary"
            size="md"
            onClick={handleBackToBlog}
            className="blog-detail-screen__back-button"
          >
            Back to Blog
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

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


  return (
    <div className={`blog-detail-screen ${className}`}>
      <main className="blog-detail-screen__main">
        <div className="blog-detail-screen__container">
          {/* Back Button */}
          <div className="blog-detail-screen__navigation">
            <Button
              variant="outline"
              size="md"
              onClick={handleBackToBlog}
              className="blog-detail-screen__back-button"
            >
              ← Back to Blog
            </Button>
          </div>

          {/* Blog Post Header */}
          <header className="blog-detail-screen__header">
            <div className="blog-detail-screen__meta">
              <Text className="blog-detail-screen__date" color="secondary">
                {formatDate(blogPost.thoi_gian_tao)}
              </Text>
              {blogPost.author && (
                <Text className="blog-detail-screen__author" color="secondary">
                  By {blogPost.author}
                </Text>
              )}
            </div>
            <Title
              level="h1"
              size="xl"
              color="primary"
              className="blog-detail-screen__title"
            >
              {blogPost.tieu_de}
            </Title>
            {blogPost.noi_dung && (
              <Text className="blog-detail-screen__excerpt" color="secondary">
                {blogPost.noi_dung.length > 200 ? `${blogPost.noi_dung.substring(0, 200)}...` : blogPost.noi_dung}
              </Text>
            )}
          </header>


          {/* Blog Post Content */}
          <article className="blog-detail-screen__content">
            <div className="blog-detail-screen__content-body">
              {blogPost.noi_dung
                .split("\n")
                .map((paragraph, index) => (
                  <Text
                    key={index}
                    color="primary"
                    className="blog-detail-screen__paragraph"
                  >
                    {paragraph}
                  </Text>
                ))}
            </div>
          </article>

          {/* Blog Post Footer */}
          <footer className="blog-detail-screen__footer">
            <div className="blog-detail-screen__actions">
              <Button
                variant="outline"
                size="md"
                onClick={handleBackToBlog}
                className="blog-detail-screen__action-button"
              >
                Back to Blog
              </Button>
            </div>
          </footer>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogDetailScreen;
