import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Title, Text, Button } from '../../components';
import { blogService, BlogPost } from '../../services/blog';
import './BlogDetailManage.css';

interface BlogDetailManageProps {
  className?: string;
}

const BlogDetailManage: React.FC<BlogDetailManageProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const blogId = Number(id);
  
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        setError(null);
        const blogData = await blogService.getById(blogId);
        if (blogData) {
          setBlog(blogData);
        } else {
          setError('Blog not found');
        }
      } catch (err) {
        setError('Failed to load blog');
        console.error('Error fetching blog:', err);
      } finally {
        setLoading(false);
      }
    };

    if (blogId) {
      fetchBlog();
    }
  }, [blogId]);

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'Unknown date';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className={`blog-detail-manage ${className}`}>
        <div className="blog-detail-manage__loading">
          <Text variant="p" size="md" color="muted">Loading blog...</Text>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className={`blog-detail-manage ${className}`}>
        <div className="blog-detail-manage__empty">
          <Title level="h2" size="lg" color="primary">Blog not found</Title>
          <Text variant="p" size="md" color="secondary">{error || 'The blog you are looking for does not exist.'}</Text>
          <div className="blog-detail-manage__empty-actions">
            <Button variant="secondary" size="md" onClick={() => navigate('/admin/blogs')}>Back to Blogs</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`blog-detail-manage ${className}`}>
      <div className="blog-detail-manage__header">
        <div className="blog-detail-manage__header-left">
          <Title level="h1" size="xl" color="primary" className="blog-detail-manage__title">
            {blog.tieu_de}
          </Title>
          <div className="blog-detail-manage__meta">
            <Text variant="span" size="sm" color="muted" className="blog-detail-manage__meta-item">
              {formatDate(blog.thoi_gian_tao)}
            </Text>
            <Text variant="span" size="sm" color="muted" className="blog-detail-manage__meta-item">•</Text>
            <Text variant="span" size="sm" color="muted" className="blog-detail-manage__meta-item">
              by {blog.author || 'Unknown Author'}
            </Text>
          </div>
        </div>
        <div className="blog-detail-manage__header-right">
          <Button variant="secondary" size="md" onClick={() => navigate('/admin/blogs')}>Back</Button>
          <Button variant="primary" size="md" onClick={() => navigate(`/admin/blogs/new/${blog.id_blog}`)} className="blog-detail-manage__edit-btn">Edit</Button>
        </div>
      </div>

      <div className="blog-detail-manage__content">
        <div className="blog-detail-manage__left">
          <div className="blog-detail-manage__section">
            <Title level="h2" size="lg" color="primary" className="blog-detail-manage__section-title">Content</Title>
            <div className="blog-detail-manage__body">
              <Text variant="p" size="md" color="primary">{blog.noi_dung}</Text>
            </div>
          </div>
        </div>

        <div className="blog-detail-manage__right">
          <div className="blog-detail-manage__panel">
            <Title level="h3" size="md" color="primary" className="blog-detail-manage__panel-title">Details</Title>
            <div className="blog-detail-manage__panel-row">
              <Text variant="span" size="sm" color="secondary">ID</Text>
              <Text variant="span" size="sm" color="primary">#{blog.id_blog}</Text>
            </div>
            <div className="blog-detail-manage__panel-row">
              <Text variant="span" size="sm" color="secondary">Author</Text>
              <Text variant="span" size="sm" color="primary">{blog.author || 'Unknown'}</Text>
            </div>
            <div className="blog-detail-manage__panel-row">
              <Text variant="span" size="sm" color="secondary">Created</Text>
              <Text variant="span" size="sm" color="primary">{formatDate(blog.thoi_gian_tao)}</Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailManage;
