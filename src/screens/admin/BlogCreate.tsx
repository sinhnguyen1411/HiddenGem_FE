import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Title, Text, Button, Input } from '../../components';
import { blogService } from '../../services/blog';
import './BlogCreate.css';

interface BlogCreateProps {
  className?: string;
}

interface BlogForm {
  tieu_de: string;
  noi_dung: string;
}

const defaultForm: BlogForm = {
  tieu_de: '',
  noi_dung: ''
};

const BlogCreate: React.FC<BlogCreateProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const formRef = useRef<HTMLFormElement | null>(null);
  const [form, setForm] = useState<BlogForm>(defaultForm);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  // Check if we're in edit mode
  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      loadBlogForEdit(Number(id));
    }
  }, [id]);

  const loadBlogForEdit = async (blogId: number) => {
    try {
      setLoading(true);
      setError(null);
      const blog = await blogService.getById(blogId);
      if (blog) {
        setForm({
          tieu_de: blog.tieu_de,
          noi_dung: blog.noi_dung
        });
      } else {
        setError('Blog not found');
      }
    } catch (err) {
      setError('Failed to load blog for editing');
      console.error('Error loading blog:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateField = (name: keyof BlogForm, value: any) => {
    setForm(prev => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.tieu_de || !form.noi_dung) {
      setError('Please fill in both title and content');
      return;
    }

    setIsSubmitting(true);
    try {
      if (isEditMode && id) {
        // Update existing blog
        await blogService.update(Number(id), {
          tieu_de: form.tieu_de,
          noi_dung: form.noi_dung
        });
      } else {
        // Create new blog
        await blogService.create({
          tieu_de: form.tieu_de,
          noi_dung: form.noi_dung
        });
      }
      navigate('/admin/blogs');
    } catch (err: any) {
      setError(isEditMode ? 'Failed to update blog' : 'Failed to create blog');
      console.error('Error saving blog:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className={`blog-create ${className}`}>
        <div className="blog-create__loading">
          <Text variant="p" size="md" color="muted">Loading blog...</Text>
        </div>
      </div>
    );
  }

  return (
    <div className={`blog-create ${className}`}>
      <div className="blog-create__header">
        <div className="blog-create__header-left">
          <Title level="h1" size="xl" color="primary">
            {isEditMode ? 'Edit Blog Post' : 'Create Blog Post'}
          </Title>
          <Text variant="p" size="md" color="secondary">
            {isEditMode ? 'Update the blog post content' : 'Add a new blog post with title and content'}
          </Text>
        </div>
        <div className="blog-create__header-right">
          <Button variant="secondary" size="md" onClick={() => navigate('/admin/blogs')}>Cancel</Button>
          <Button variant="primary" size="md" onClick={() => formRef.current?.requestSubmit()} disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : (isEditMode ? 'Update' : 'Create')}
          </Button>
        </div>
      </div>

      <form ref={formRef} className="blog-create__form" onSubmit={handleSubmit}>
        <div className="blog-create__content">
          <div className="blog-create__card">
            <div className="blog-create__field">
              <label className="blog-create__label">Title *</label>
              <Input 
                value={form.tieu_de} 
                onChange={(e) => updateField('tieu_de', e.target.value)} 
                placeholder="Enter blog title" 
                fullWidth 
              />
            </div>

            <div className="blog-create__field">
              <label className="blog-create__label">Content *</label>
              <textarea 
                className="blog-create__textarea" 
                value={form.noi_dung} 
                onChange={(e) => updateField('noi_dung', e.target.value)} 
                placeholder="Write your blog content..." 
                rows={15} 
              />
            </div>
          </div>
        </div>

        {error && (
          <div className="blog-create__error">
            <Text variant="p" size="sm" color="primary">{error}</Text>
          </div>
        )}

        <div className="blog-create__footer-actions">
          <Button variant="secondary" size="md" onClick={() => navigate('/admin/blogs')}>Cancel</Button>
          <Button variant="primary" size="md" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : (isEditMode ? 'Update Blog' : 'Create Blog')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BlogCreate;
