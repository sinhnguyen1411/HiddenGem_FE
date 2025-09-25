import { User, UserStatus, UserRole, UserFilter } from './types';

// User Status Options
export const userStatuses: UserStatus[] = [
  { id: 'all', label: 'All Users', color: 'primary' },
  { id: 'active', label: 'Active', color: 'success' },
  { id: 'inactive', label: 'Inactive', color: 'muted' },
  { id: 'suspended', label: 'Suspended', color: 'danger' },
  { id: 'pending', label: 'Pending', color: 'warning' }
];

// User Role Options
export const userRoles: UserRole[] = [
  { id: 'all', label: 'All Roles', color: 'primary' },
  { id: 'customer', label: 'Customer', color: 'success' },
  { id: 'admin', label: 'Admin', color: 'danger' },
  { id: 'moderator', label: 'Moderator', color: 'warning' }
];

// User Filter Configuration
export const userFilter: UserFilter = {
  searchPlaceholder: 'Search users by name, email, or location...',
  statusLabel: 'Status',
  roleLabel: 'Role',
  sortLabel: 'Sort by'
};

// Sample Users Data
export const users: User[] = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@email.com',
    phone: '(555) 123-4567',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    role: 'customer',
    status: 'active',
    joinDate: '2023-01-15',
    lastLogin: '2024-01-15',
    totalOrders: 24,
    totalSpent: 1250.50,
    favoriteStores: ['Premium Coffee Store', 'Brew & Beans'],
    location: {
      city: 'Downtown',
      state: 'CA',
      country: 'USA'
    },
    preferences: {
      notifications: true,
      newsletter: true,
      darkMode: false
    },
    socialMedia: {
      instagram: '@johnsmith',
      twitter: '@johnsmith'
    }
  },
  {
    id: 2,
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@email.com',
    phone: '(555) 234-5678',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    role: 'customer',
    status: 'active',
    joinDate: '2023-02-20',
    lastLogin: '2024-01-14',
    totalOrders: 18,
    totalSpent: 890.25,
    favoriteStores: ['Coffee Corner', 'Morning Brew'],
    location: {
      city: 'Midtown',
      state: 'CA',
      country: 'USA'
    },
    preferences: {
      notifications: true,
      newsletter: false,
      darkMode: true
    },
    socialMedia: {
      instagram: '@sarahj',
      facebook: 'Sarah Johnson'
    }
  },
  {
    id: 3,
    firstName: 'Mike',
    lastName: 'Chen',
    email: 'mike.chen@email.com',
    phone: '(555) 345-6789',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    role: 'admin',
    status: 'active',
    joinDate: '2022-11-10',
    lastLogin: '2024-01-15',
    totalOrders: 0,
    totalSpent: 0,
    favoriteStores: [],
    location: {
      city: 'Uptown',
      state: 'CA',
      country: 'USA'
    },
    preferences: {
      notifications: true,
      newsletter: true,
      darkMode: true
    }
  },
  {
    id: 4,
    firstName: 'Emily',
    lastName: 'Davis',
    email: 'emily.davis@email.com',
    phone: '(555) 456-7890',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    role: 'customer',
    status: 'inactive',
    joinDate: '2023-03-05',
    lastLogin: '2023-12-20',
    totalOrders: 8,
    totalSpent: 320.75,
    favoriteStores: ['Artisan Roasters'],
    location: {
      city: 'Downtown',
      state: 'CA',
      country: 'USA'
    },
    preferences: {
      notifications: false,
      newsletter: false,
      darkMode: false
    }
  },
  {
    id: 5,
    firstName: 'David',
    lastName: 'Wilson',
    email: 'david.wilson@email.com',
    phone: '(555) 567-8901',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    role: 'customer',
    status: 'active',
    joinDate: '2023-04-18',
    lastLogin: '2024-01-13',
    totalOrders: 32,
    totalSpent: 1680.00,
    favoriteStores: ['Bean There', 'Coffee Corner', 'Premium Coffee Store'],
    location: {
      city: 'Midtown',
      state: 'CA',
      country: 'USA'
    },
    preferences: {
      notifications: true,
      newsletter: true,
      darkMode: true
    },
    socialMedia: {
      instagram: '@davidw',
      facebook: 'David Wilson',
      twitter: '@davidw'
    }
  },
  {
    id: 6,
    firstName: 'Lisa',
    lastName: 'Brown',
    email: 'lisa.brown@email.com',
    phone: '(555) 678-9012',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    role: 'moderator',
    status: 'active',
    joinDate: '2023-01-30',
    lastLogin: '2024-01-15',
    totalOrders: 5,
    totalSpent: 150.25,
    favoriteStores: ['Café Mocha'],
    location: {
      city: 'Uptown',
      state: 'CA',
      country: 'USA'
    },
    preferences: {
      notifications: true,
      newsletter: true,
      darkMode: false
    }
  },
  {
    id: 7,
    firstName: 'Robert',
    lastName: 'Taylor',
    email: 'robert.taylor@email.com',
    phone: '(555) 789-0123',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    role: 'customer',
    status: 'suspended',
    joinDate: '2023-05-12',
    lastLogin: '2023-11-15',
    totalOrders: 12,
    totalSpent: 450.00,
    favoriteStores: ['Espresso Express'],
    location: {
      city: 'Downtown',
      state: 'CA',
      country: 'USA'
    },
    preferences: {
      notifications: false,
      newsletter: false,
      darkMode: true
    }
  },
  {
    id: 8,
    firstName: 'Jennifer',
    lastName: 'Lee',
    email: 'jennifer.lee@email.com',
    phone: '(555) 890-1234',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    role: 'customer',
    status: 'active',
    joinDate: '2023-06-25',
    lastLogin: '2024-01-14',
    totalOrders: 15,
    totalSpent: 720.50,
    favoriteStores: ['Bean There', 'Morning Brew'],
    location: {
      city: 'Midtown',
      state: 'CA',
      country: 'USA'
    },
    preferences: {
      notifications: true,
      newsletter: true,
      darkMode: true
    },
    socialMedia: {
      instagram: '@jenniferl',
      facebook: 'Jennifer Lee'
    }
  },
  {
    id: 9,
    firstName: 'Michael',
    lastName: 'Garcia',
    email: 'michael.garcia@email.com',
    phone: '(555) 901-2345',
    avatar: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    role: 'customer',
    status: 'pending',
    joinDate: '2024-01-10',
    lastLogin: '2024-01-10',
    totalOrders: 0,
    totalSpent: 0,
    favoriteStores: [],
    location: {
      city: 'Uptown',
      state: 'CA',
      country: 'USA'
    },
    preferences: {
      notifications: true,
      newsletter: true,
      darkMode: false
    }
  },
  {
    id: 10,
    firstName: 'Amanda',
    lastName: 'Martinez',
    email: 'amanda.martinez@email.com',
    phone: '(555) 012-3456',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    role: 'customer',
    status: 'active',
    joinDate: '2023-07-15',
    lastLogin: '2024-01-12',
    totalOrders: 28,
    totalSpent: 1120.75,
    favoriteStores: ['Coffee Corner', 'Premium Coffee Store', 'Bean There'],
    location: {
      city: 'Downtown',
      state: 'CA',
      country: 'USA'
    },
    preferences: {
      notifications: true,
      newsletter: false,
      darkMode: true
    },
    socialMedia: {
      instagram: '@amandam',
      twitter: '@amandam'
    }
  }
];

// Sort Options for Users
export const userSortOptions = [
  { value: "name-asc", label: "Name: A to Z" },
  { value: "name-desc", label: "Name: Z to A" },
  { value: "email-asc", label: "Email: A to Z" },
  { value: "email-desc", label: "Email: Z to A" },
  { value: "join-desc", label: "Newest Members" },
  { value: "join-asc", label: "Oldest Members" },
  { value: "orders-desc", label: "Most Orders" },
  { value: "orders-asc", label: "Least Orders" },
  { value: "spent-desc", label: "Highest Spenders" },
  { value: "spent-asc", label: "Lowest Spenders" }
];

// Location Options
export const locationOptions = [
  { value: "all", label: "All Locations" },
  { value: "downtown", label: "Downtown" },
  { value: "midtown", label: "Midtown" },
  { value: "uptown", label: "Uptown" }
];
