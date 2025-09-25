import { Store, StoreStatus, StoreFilter } from './types';

// Store Status Options
export const storeStatuses: StoreStatus[] = [
  { id: 'all', label: 'All Stores', color: 'primary' },
  { id: 'active', label: 'Active', color: 'success' },
  { id: 'inactive', label: 'Inactive', color: 'muted' },
  { id: 'pending', label: 'Pending', color: 'warning' }
];

// Store Filter Configuration
export const storeFilter: StoreFilter = {
  searchPlaceholder: 'Search stores by name, address, or owner...',
  statusLabel: 'Status',
  cityLabel: 'City',
  sortLabel: 'Sort by'
};

// Sample Stores Data
export const stores: Store[] = [
  {
    id: 1,
    name: "Premium Coffee Store",
    address: "123 Coffee Street",
    city: "Downtown",
    state: "CA",
    zipCode: "90210",
    phone: "(555) 123-4567",
    email: "info@premiumcoffee.com",
    rating: 4.8,
    reviewCount: 127,
    isActive: true,
    isOpen: true,
    hours: "6:00 AM - 8:00 PM",
    owner: "John Smith",
    createdAt: "2023-01-15",
    updatedAt: "2024-01-10",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    description: "Experience the finest coffee in a cozy atmosphere",
    features: ["Free WiFi", "Outdoor Seating", "Pet Friendly", "Live Music"],
    socialMedia: {
      instagram: "@premiumcoffee",
      facebook: "Premium Coffee Store",
      twitter: "@premiumcoffee"
    }
  },
  {
    id: 2,
    name: "Brew & Beans",
    address: "456 Main Avenue",
    city: "Midtown",
    state: "CA",
    zipCode: "90211",
    phone: "(555) 234-5678",
    email: "hello@brewandbeans.com",
    rating: 4.6,
    reviewCount: 89,
    isActive: true,
    isOpen: false,
    hours: "7:00 AM - 7:00 PM",
    owner: "Sarah Johnson",
    createdAt: "2023-03-22",
    updatedAt: "2024-01-08",
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    description: "Artisan coffee and fresh pastries daily",
    features: ["Free WiFi", "Outdoor Seating", "Fresh Pastries"],
    socialMedia: {
      instagram: "@brewandbeans",
      facebook: "Brew & Beans"
    }
  },
  {
    id: 3,
    name: "Coffee Corner",
    address: "789 Oak Street",
    city: "Uptown",
    state: "CA",
    zipCode: "90212",
    phone: "(555) 345-6789",
    email: "contact@coffeecorner.com",
    rating: 4.9,
    reviewCount: 156,
    isActive: true,
    isOpen: true,
    hours: "5:30 AM - 9:00 PM",
    owner: "Mike Chen",
    createdAt: "2023-02-10",
    updatedAt: "2024-01-12",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    description: "Your neighborhood coffee spot with a warm community feel",
    features: ["Free WiFi", "Pet Friendly", "Live Music", "Study Area"],
    socialMedia: {
      instagram: "@coffeecorner",
      facebook: "Coffee Corner",
      twitter: "@coffeecorner"
    }
  },
  {
    id: 4,
    name: "Artisan Roasters",
    address: "321 Pine Boulevard",
    city: "Downtown",
    state: "CA",
    zipCode: "90210",
    phone: "(555) 456-7890",
    email: "info@artisanroasters.com",
    rating: 4.7,
    reviewCount: 98,
    isActive: false,
    isOpen: false,
    hours: "6:00 AM - 6:00 PM",
    owner: "Emily Davis",
    createdAt: "2023-04-05",
    updatedAt: "2023-12-20",
    image: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    description: "Specialty coffee roasting and brewing",
    features: ["Coffee Roasting", "Tasting Room", "Equipment Sales"],
    socialMedia: {
      instagram: "@artisanroasters",
      facebook: "Artisan Roasters"
    }
  },
  {
    id: 5,
    name: "Morning Brew",
    address: "654 Elm Street",
    city: "Midtown",
    state: "CA",
    zipCode: "90211",
    phone: "(555) 567-8901",
    email: "hello@morningbrew.com",
    rating: 4.5,
    reviewCount: 73,
    isActive: true,
    isOpen: true,
    hours: "5:00 AM - 8:00 PM",
    owner: "David Wilson",
    createdAt: "2023-05-18",
    updatedAt: "2024-01-05",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    description: "Start your day with our signature morning blends",
    features: ["Early Hours", "Drive-Through", "Breakfast Menu"],
    socialMedia: {
      instagram: "@morningbrew",
      facebook: "Morning Brew"
    }
  },
  {
    id: 6,
    name: "Café Mocha",
    address: "987 Maple Drive",
    city: "Uptown",
    state: "CA",
    zipCode: "90212",
    phone: "(555) 678-9012",
    email: "info@cafemocha.com",
    rating: 4.3,
    reviewCount: 45,
    isActive: true,
    isOpen: false,
    hours: "7:00 AM - 6:00 PM",
    owner: "Lisa Brown",
    createdAt: "2023-06-30",
    updatedAt: "2024-01-02",
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    description: "Cozy café with homemade desserts and specialty drinks",
    features: ["Homemade Desserts", "Outdoor Seating", "Free WiFi"],
    socialMedia: {
      instagram: "@cafemocha",
      facebook: "Café Mocha"
    }
  },
  {
    id: 7,
    name: "Espresso Express",
    address: "147 Cedar Lane",
    city: "Downtown",
    state: "CA",
    zipCode: "90210",
    phone: "(555) 789-0123",
    email: "contact@espressoexpress.com",
    rating: 4.4,
    reviewCount: 62,
    isActive: false,
    isOpen: false,
    hours: "6:30 AM - 7:30 PM",
    owner: "Robert Taylor",
    createdAt: "2023-07-12",
    updatedAt: "2023-11-15",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    description: "Quick service coffee for busy professionals",
    features: ["Quick Service", "Mobile Ordering", "Drive-Through"],
    socialMedia: {
      instagram: "@espressoexpress",
      facebook: "Espresso Express"
    }
  },
  {
    id: 8,
    name: "Bean There",
    address: "258 Birch Street",
    city: "Midtown",
    state: "CA",
    zipCode: "90211",
    phone: "(555) 890-1234",
    email: "hello@beanthere.com",
    rating: 4.8,
    reviewCount: 134,
    isActive: true,
    isOpen: true,
    hours: "6:00 AM - 8:30 PM",
    owner: "Jennifer Lee",
    createdAt: "2023-08-25",
    updatedAt: "2024-01-15",
    image: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    description: "Sustainable coffee with a focus on community",
    features: ["Sustainable", "Community Events", "Local Art", "Free WiFi"],
    socialMedia: {
      instagram: "@beanthere",
      facebook: "Bean There",
      twitter: "@beanthere"
    }
  }
];

// Sort Options for Stores
export const storeSortOptions = [
  { value: "name-asc", label: "Name: A to Z" },
  { value: "name-desc", label: "Name: Z to A" },
  { value: "rating-desc", label: "Rating: High to Low" },
  { value: "rating-asc", label: "Rating: Low to High" },
  { value: "reviews-desc", label: "Most Reviews" },
  { value: "reviews-asc", label: "Least Reviews" },
  { value: "created-desc", label: "Newest First" },
  { value: "created-asc", label: "Oldest First" }
];

// City Options
export const cityOptions = [
  { value: "all", label: "All Cities" },
  { value: "downtown", label: "Downtown" },
  { value: "midtown", label: "Midtown" },
  { value: "uptown", label: "Uptown" }
];
