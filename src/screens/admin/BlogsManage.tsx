import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Title, Text, Button, Input, AdminStatsCard, AdminTable } from '../../components';
import { blogService, BlogPost } from '../../services/blog';
import './BlogsManage.css';

interface BlogsManageProps {
  className?: string;
}

const BlogsManage: React.FC<BlogsManageProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  
  // Data states
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [authorFilter, setAuthorFilter] = useState('all');
  
  // Sort states
  const [sortColumn, setSortColumn] = useState<string>('thoi_gian_tao');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Fetch blogs data
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await blogService.list(searchTerm || undefined);
        console.log(response.data.items);
        setBlogs(response.data.items || []);
      } catch (err) {
        setError('Failed to fetch blogs');
        console.error('Error fetching blogs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [searchTerm]);

  // Filter and sort blogs
  const filteredAndSortedBlogs = useMemo(() => {
    let filtered = blogs.filter(blog => {
      const matchesSearch = blog.tieu_de.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           blog.noi_dung.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (blog.author && blog.author.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesAuthor = authorFilter === 'all' || 
        (blog.author && blog.author === authorFilter);
      
      return matchesSearch && matchesAuthor;
    });

    // Sort blogs
    filtered.sort((a, b) => {
      let aValue: any = a[sortColumn as keyof BlogPost];
      let bValue: any = b[sortColumn as keyof BlogPost];
      
      if (sortColumn === 'thoi_gian_tao') {
        aValue = new Date(aValue || 0).getTime();
        bValue = new Date(bValue || 0).getTime();
      }
      
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [blogs, searchTerm, authorFilter, sortColumn, sortDirection]);

  // Statistics
  const statsData = [
    {
      title: 'Total Blogs',
      value: blogs.length.toString(),
      icon: '📝',
      trend: { value: 12, isPositive: true }
    },
    {
      title: 'This Month',
      value: blogs.filter(blog => {
        const blogDate = new Date(blog.thoi_gian_tao || '');
        const now = new Date();
        return blogDate.getMonth() === now.getMonth() && blogDate.getFullYear() === now.getFullYear();
      }).length.toString(),
      icon: '📅',
      trend: { value: 8, isPositive: true }
    },
    {
      title: 'Authors',
      value: Array.from(new Set(blogs.map(blog => blog.author).filter(Boolean))).length.toString(),
      icon: '👥',
      trend: { value: 3, isPositive: true }
    },
    {
      title: 'Recent Activity',
      value: blogs.filter(blog => {
        const blogDate = new Date(blog.thoi_gian_tao || '');
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return blogDate > weekAgo;
      }).length.toString(),
      icon: '⚡',
      trend: { value: 15, isPositive: true }
    }
  ];

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const handleViewBlog = (blog: BlogPost) => {
    navigate(`/admin/blogs/${blog.id_blog}`);
  };

  const handleEditBlog = (blog: BlogPost) => {
    navigate(`/admin/blogs/new/${blog.id_blog}`);
  };

  const handleDeleteBlog = async (blog: BlogPost) => {
    if (window.confirm(`Are you sure you want to delete "${blog.tieu_de}"?`)) {
      // try {
      //   await blogService.delete(blog.id_blog);
      //   setBlogs(prev => prev.filter(b => b.id_blog !== blog.id_blog));
      // } catch (err) {
      //   console.error('Error deleting blog:', err);
      //   setError('Failed to delete blog');
      // }
    }
  };

  const handleAddBlog = () => {
    navigate('/admin/blogs/new');
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getAuthorName = (author: string | undefined) => {
    if (!author) return 'Unknown Author';
    return author;
  };

  const getUniqueAuthors = () => {
    const authors = blogs
      .map(blog => blog.author)
      .filter(Boolean);
    return Array.from(new Set(authors));
  };

  const tableColumns = [
    {
      key: 'id_blog',
      label: 'ID',
      width: '60px',
      render: (value: number) => (
        <Text variant="span" size="sm" color="muted">
          #{value}
        </Text>
      )
    },
    {
      key: 'tieu_de',
      label: 'Title',
      sortable: true,
      width: '300px',
      render: (value: string, item: BlogPost) => (
        <div className="blogs-manage__blog-info">
          <Text variant="p" size="sm" color="primary" className="blogs-manage__blog-title">
            {item.tieu_de}
          </Text>
          <Text variant="p" size="xs" color="muted" className="blogs-manage__blog-excerpt">
            {item.noi_dung.length > 100 ? `${item.noi_dung.substring(0, 100)}...` : item.noi_dung}
          </Text>
          <div className="blogs-manage__blog-meta">
            <Text variant="span" size="xs" color="muted">
              by {getAuthorName(item.author)}
            </Text>
          </div>
        </div>
      )
    },
    {
      key: 'author',
      label: 'Author',
      width: '150px',
      render: (value: string | undefined) => (
        <Text variant="span" size="sm" color="secondary">
          {getAuthorName(value)}
        </Text>
      )
    },
    {
      key: 'thoi_gian_tao',
      label: 'Created',
      sortable: true,
      width: '120px',
      render: (value: string) => (
        <Text variant="span" size="sm" color="muted">
          {formatDate(value)}
        </Text>
      )
    }
  ];

  return (
    <div className={`blogs-manage ${className}`}>
      <div className="blogs-manage__header">
        <div className="blogs-manage__header-left">
          <Title level="h1" size="xl" color="primary" className="blogs-manage__title">
            Blog Management
          </Title>
          <Text variant="p" size="md" color="secondary" className="blogs-manage__subtitle">
            Manage your blog posts, drafts, and content strategy
          </Text>
        </div>
        <div className="blogs-manage__header-right">
          <Button
            variant="primary"
            size="md"
            onClick={handleAddBlog}
            className="blogs-manage__add-btn"
          >
            + New Blog Post
          </Button>
        </div>
      </div>

      <div className="blogs-manage__stats">
        {statsData.map((stat, index) => (
          <AdminStatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
            className="blogs-manage__stat-card"
          />
        ))}
      </div>

      <div className="blogs-manage__filters">
        <div className="blogs-manage__filter-group">
          <Input
            type="text"
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="blogs-manage__search-input"
          />
        </div>

        <div className="blogs-manage__filter-group">
          <select
            value={authorFilter}
            onChange={(e) => setAuthorFilter(e.target.value)}
            className="blogs-manage__filter-select"
          >
            <option value="all">All Authors</option>
            {getUniqueAuthors().map(author => (
              <option key={author} value={author}>
                {author}
              </option>
            ))}
          </select>
        </div>

        <div className="blogs-manage__filter-group">
          <select
            value={`${sortColumn}-${sortDirection}`}
            onChange={(e) => {
              const [column, direction] = e.target.value.split('-');
              setSortColumn(column);
              setSortDirection(direction as 'asc' | 'desc');
            }}
            className="blogs-manage__filter-select"
          >
            <option value="tieu_de-asc">Title (A-Z)</option>
            <option value="tieu_de-desc">Title (Z-A)</option>
            <option value="thoi_gian_tao-asc">Created (Oldest)</option>
            <option value="thoi_gian_tao-desc">Created (Newest)</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="blogs-manage__loading">
          <Text variant="p" size="md" color="muted">Loading blogs...</Text>
        </div>
      ) : error ? (
        <div className="blogs-manage__error">
          <Text variant="p" size="md" color="primary">{error}</Text>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => window.location.reload()}
            className="blogs-manage__retry-btn"
          >
            Retry
          </Button>
        </div>
      ) : (
        <div className="blogs-manage__table-section">
          <AdminTable
            data={filteredAndSortedBlogs}
            columns={tableColumns}
            onView={handleViewBlog}
            onEdit={handleEditBlog}
            onDelete={handleDeleteBlog}
            onSort={handleSort}
          />
        </div>
      )}

      {/* Placeholder modals - would be implemented in a real app */}
      <div className="blogs-manage__modals">
        {/* Add/Edit Blog Modal would go here */}
        {/* Delete Confirmation Modal would go here */}
      </div>
    </div>
  );
};

export default BlogsManage;
