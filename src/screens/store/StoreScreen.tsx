import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Footer, Text, Button, Input, StoreCard } from '../../components';
import { cafesService } from '../../services/cafes';
import { Cafe } from '../../services/types';
import './StoreScreen.css';

interface StoreScreenProps {
  className?: string;
}


// Helper function to safely convert rating to number
const getRating = (rating: string | number): number => {
  if (typeof rating === 'string') {
    return parseFloat(rating) || 0;
  }
  return rating || 0;
};

const StoreScreen: React.FC<StoreScreenProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  const [stores, setStores] = useState<Cafe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('relevance');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  const handleViewStoreDetail = (storeId: number) => {
    navigate(`/store/${storeId}`);
  };

  // Fetch stores from API
  const fetchStores = async (page: number = 1, search: string = '') => {
    try {
      setLoading(true);
      setError(null);
      
      let response: any;
      if (search.trim()) {
        response = await cafesService.search(search);
      } else {
        response = await cafesService.list(page, 12);
      }
      
      if (page === 1) {
        setStores(response.data.items);
      } else {
        setStores(prev => [...prev, ...response.data.items]);
      }
      
      setTotalResults(response.data.total);
      setHasMore(response.data.items.length === 12);
      setCurrentPage(page);
    } catch (err) {
      setError('Failed to load stores');
      console.error('Error fetching stores:', err);
    } finally {
      setLoading(false);
    }
  };

  // Load stores on component mount
  useEffect(() => {
    fetchStores(1, '');
  }, []);

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchStores(1, searchQuery);
  };

  // Handle load more
  const handleLoadMore = () => {
    if (!loading && hasMore) {
      fetchStores(currentPage + 1, searchQuery);
    }
  };

  // Handle sort change
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
    // Since API doesn't support sorting, we'll sort client-side
    const sortedStores = [...stores].sort((a, b) => {
      switch (e.target.value) {
        case 'rating':
          return getRating(b.diem_danh_gia_trung_binh) - getRating(a.diem_danh_gia_trung_binh);
        case 'name':
          return a.ten_cua_hang.localeCompare(b.ten_cua_hang);
        default:
          return 0;
      }
    });
    setStores(sortedStores);
  };

  return (
    <div className={`store-screen ${className}`}>
      {/* Store Hero Section */}
      <section className="store-hero">
        <div className="store-hero__container">
          <div className="hero-content">
            <form className="hero-search" onSubmit={handleSearch}>
              <Input 
                type="text" 
                placeholder="Search for coffee shops, cafes, or locations..."
                className="hero-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button variant="primary" size="lg" className="hero-search-button" type="submit">
                Search
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Sort By Section */}
      <section className="sort-section">
        <div className="container">
          <div className="sort-controls">
            <div className="sort-left">
              <Text variant="p" size="md" color="secondary">
                Sort by:
              </Text>
              <select className="sort-select" value={sortBy} onChange={handleSortChange}>
                <option value="relevance">Relevance</option>
                <option value="rating">Rating</option>
                <option value="name">Name</option>
              </select>
            </div>
            <div className="sort-right">
              <Text variant="p" size="md" color="secondary">
                {totalResults} results found
              </Text>
            </div>
          </div>
        </div>
      </section>


      {/* Store Content */}
      <main className="store-main">
        <div className="container">
          {/* Loading State */}
          {loading && stores.length === 0 && (
            <div className="loading-container">
              <Text variant="p" size="lg" color="primary">Loading stores...</Text>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="error-container">
              <Text variant="p" size="lg" color="primary">{error}</Text>
              <Button variant="primary" onClick={() => fetchStores(1, searchQuery)}>
                Try Again
              </Button>
            </div>
          )}

          {/* Stores Grid */}
          {!loading && !error && (
            <div className="stores-section">
              <div className="stores-grid">
                {stores.map((store) => (
                  <StoreCard 
                    key={store.id_cua_hang} 
                    store={store} 
                    onViewDetails={handleViewStoreDetail}
                  />
                ))}
              </div>

              {/* Load More Button */}
              {hasMore && (
                <div className="load-more-section">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="load-more-btn"
                    onClick={handleLoadMore}
                    disabled={loading}
                  >
                    {loading ? 'Loading...' : 'Load More'}
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>


      <Footer />
    </div>
  );
};

export default StoreScreen;
