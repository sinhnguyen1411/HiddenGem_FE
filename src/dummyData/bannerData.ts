import { Banner } from './types';

export const banners: Banner[] = [
  {
    id: 1,
    title: 'Summer Coffee Special',
    description: 'Enjoy our refreshing iced coffee collection',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090a?w=800&h=400&fit=crop',
    link: '/promotion/summer-special',
    position: 'hero',
    status: 'active',
    priority: 1,
    startDate: '2024-06-01T00:00:00Z',
    endDate: '2024-08-31T23:59:59Z',
    createdAt: '2024-05-15T10:00:00Z',
    updatedAt: '2024-05-15T10:00:00Z',
    createdBy: 'admin@hiddengems.com',
    clicks: 1250,
    impressions: 15000
  },
  {
    id: 2,
    title: 'New Store Opening',
    description: 'Visit our newest location in downtown',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=400&fit=crop',
    link: '/location/new-store',
    position: 'sidebar',
    status: 'active',
    priority: 2,
    startDate: '2024-05-01T00:00:00Z',
    endDate: '2024-07-31T23:59:59Z',
    createdAt: '2024-04-20T14:30:00Z',
    updatedAt: '2024-04-20T14:30:00Z',
    createdBy: 'admin@hiddengems.com',
    clicks: 890,
    impressions: 12000
  },
  {
    id: 3,
    title: 'Coffee Bean Sale',
    description: 'Premium beans at discounted prices',
    image: 'https://images.unsplash.com/photo-1559056199-5c63ed4c4dac?w=800&h=400&fit=crop',
    link: '/store/coffee-beans',
    position: 'banner',
    status: 'inactive',
    priority: 3,
    startDate: '2024-04-01T00:00:00Z',
    endDate: '2024-04-30T23:59:59Z',
    createdAt: '2024-03-25T09:15:00Z',
    updatedAt: '2024-03-25T09:15:00Z',
    createdBy: 'admin@hiddengems.com',
    clicks: 2100,
    impressions: 25000
  },
  {
    id: 4,
    title: 'Loyalty Program',
    description: 'Join our rewards program today',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&h=400&fit=crop',
    link: '/loyalty',
    position: 'popup',
    status: 'active',
    priority: 4,
    startDate: '2024-01-01T00:00:00Z',
    endDate: '2024-12-31T23:59:59Z',
    createdAt: '2023-12-15T16:45:00Z',
    updatedAt: '2024-01-10T11:20:00Z',
    createdBy: 'admin@hiddengems.com',
    clicks: 3400,
    impressions: 45000
  },
  {
    id: 5,
    title: 'Holiday Special',
    description: 'Festive drinks and treats',
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=800&h=400&fit=crop',
    link: '/promotion/holiday',
    position: 'hero',
    status: 'draft',
    priority: 5,
    startDate: '2024-12-01T00:00:00Z',
    endDate: '2024-12-31T23:59:59Z',
    createdAt: '2024-11-01T08:30:00Z',
    updatedAt: '2024-11-01T08:30:00Z',
    createdBy: 'admin@hiddengems.com',
    clicks: 0,
    impressions: 0
  }
];

export const bannerStatuses = [
  { id: 'active', label: 'Active', color: 'success' },
  { id: 'inactive', label: 'Inactive', color: 'muted' },
  { id: 'draft', label: 'Draft', color: 'warning' },
  { id: 'archived', label: 'Archived', color: 'danger' }
];

export const bannerPositions = [
  { id: 'hero', label: 'Hero Section' },
  { id: 'banner', label: 'Top Banner' },
  { id: 'sidebar', label: 'Sidebar' },
  { id: 'popup', label: 'Popup' },
  { id: 'footer', label: 'Footer' }
];

export const bannerSortOptions = [
  { id: 'title', label: 'Title A-Z' },
  { id: 'priority', label: 'Priority' },
  { id: 'status', label: 'Status' },
  { id: 'createdAt', label: 'Created Date' },
  { id: 'startDate', label: 'Start Date' },
  { id: 'clicks', label: 'Most Clicks' },
  { id: 'impressions', label: 'Most Impressions' }
];

export const bannerFilterConfig = {
  searchPlaceholder: 'Search banners...',
  statusLabel: 'Status',
  positionLabel: 'Position',
  sortLabel: 'Sort by'
};
