// Shared TypeScript interfaces for dummy data

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  rating: number;
  image: string;
  description?: string;
  brand?: string;
}

export interface Category {
  id: string;
  name: string;
  count: number;
  icon?: string;
}

export interface Testimonial {
  id: number;
  name: string;
  text: string;
  rating?: number;
  location?: string;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon?: string;
}

export interface LocationInfo {
  address: string;
  hours: string;
  contact: string;
}

export interface FilterOption {
  id: string;
  label: string;
  value: string | number;
  count?: number;
}

export interface FilterGroup {
  id: string;
  title: string;
  type: 'checkbox' | 'range' | 'select';
  options: FilterOption[];
}

export interface HeroContent {
  title: string;
  subtitle: string;
  searchPlaceholder?: string;
  primaryButton: string;
  secondaryButton: string;
  backgroundImage?: string;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  publishDate: string;
  category: string;
  image: string;
  readTime: string;
  featured: boolean;
}

export interface BlogCategory {
  id: string;
  name: string;
  count: number;
}

export interface BlogFilter {
  searchPlaceholder: string;
  topicsLabel: string;
  dateFromLabel: string;
  dateToLabel: string;
  loadMoreText: string;
}

export interface Store {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  email: string;
  rating: number;
  reviewCount: number;
  isActive: boolean;
  isOpen: boolean;
  hours: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
  image: string;
  description?: string;
  features: string[];
  socialMedia?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
}

export interface StoreStatus {
  id: string;
  label: string;
  color: string;
}

export interface StoreFilter {
  searchPlaceholder: string;
  statusLabel: string;
  cityLabel: string;
  sortLabel: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar: string;
  role: 'customer' | 'admin' | 'moderator';
  status: 'active' | 'inactive' | 'suspended' | 'pending';
  joinDate: string;
  lastLogin: string;
  totalOrders: number;
  totalSpent: number;
  favoriteStores: string[];
  location: {
    city: string;
    state: string;
    country: string;
  };
  preferences: {
    notifications: boolean;
    newsletter: boolean;
    darkMode: boolean;
  };
  socialMedia?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
}

export interface UserStatus {
  id: string;
  label: string;
  color: string;
}

export interface UserRole {
  id: string;
  label: string;
  color: string;
}

export interface UserFilter {
  searchPlaceholder: string;
  statusLabel: string;
  roleLabel: string;
  sortLabel: string;
}

export interface Blog {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  authorAvatar: string;
  category: string;
  tags: string[];
  featuredImage: string;
  status: 'published' | 'draft' | 'archived';
  publishedAt: string;
  updatedAt: string;
  views: number;
  likes: number;
  comments: number;
  isFeatured: boolean;
  seoTitle?: string;
  seoDescription?: string;
  readingTime: number; // in minutes
}

export type BlogStatus = 'published' | 'draft' | 'archived';

export interface AdminBlogFilter {
  search: string;
  status: BlogStatus | 'all';
  category: string;
  author: string;
  sortBy: string;
  sortDirection: 'asc' | 'desc';
}

export interface Banner {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  position: 'hero' | 'banner' | 'sidebar' | 'popup' | 'footer';
  status: 'active' | 'inactive' | 'draft' | 'archived';
  priority: number;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  clicks: number;
  impressions: number;
}

export type BannerStatus = 'active' | 'inactive' | 'draft' | 'archived';
export type BannerPosition = 'hero' | 'banner' | 'sidebar' | 'popup' | 'footer';

export interface AdminBannerFilter {
  search: string;
  status: BannerStatus | 'all';
  position: BannerPosition | 'all';
  sortBy: string;
  sortDirection: 'asc' | 'desc';
}
