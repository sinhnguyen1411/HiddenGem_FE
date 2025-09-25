import { Product } from './types';

// Store Detail Hero Content
export const storeDetailHero = {
  title: "Premium Coffee Store",
  subtitle: "Experience the finest coffee in a cozy atmosphere",
  address: "123 Coffee Street, Downtown District",
  rating: 4.8,
  reviewCount: 127,
  isOpen: true,
  hours: "6:00 AM - 8:00 PM",
  phone: "(555) 123-4567",
  backgroundImage: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
};

// Store Features
export const storeFeatures = [
  {
    id: 1,
    title: "Free WiFi",
    description: "High-speed internet for remote work",
    icon: "wifi-icon"
  },
  {
    id: 2,
    title: "Outdoor Seating",
    description: "Enjoy your coffee in our garden area",
    icon: "outdoor-icon"
  },
  {
    id: 3,
    title: "Pet Friendly",
    description: "Bring your furry friends along",
    icon: "pet-icon"
  },
  {
    id: 4,
    title: "Live Music",
    description: "Weekly acoustic performances",
    icon: "music-icon"
  }
];

// Store Hours
export const storeHours = [
  { day: "Monday", hours: "6:00 AM - 8:00 PM" },
  { day: "Tuesday", hours: "6:00 AM - 8:00 PM" },
  { day: "Wednesday", hours: "6:00 AM - 8:00 PM" },
  { day: "Thursday", hours: "6:00 AM - 8:00 PM" },
  { day: "Friday", hours: "6:00 AM - 9:00 PM" },
  { day: "Saturday", hours: "7:00 AM - 9:00 PM" },
  { day: "Sunday", hours: "7:00 AM - 8:00 PM" }
];

// Featured Products for this store
export const featuredStoreProducts: Product[] = [
  {
    id: 1,
    name: "Signature Blend",
    price: 4.99,
    category: "coffee",
    rating: 4.9,
    image: "signature-blend",
    description: "Our house specialty blend",
    brand: "Premium Coffee Co."
  },
  {
    id: 2,
    name: "Artisan Pastry",
    price: 3.99,
    category: "food",
    rating: 4.7,
    image: "artisan-pastry",
    description: "Freshly baked daily",
    brand: "Local Bakery"
  },
  {
    id: 3,
    name: "Cold Brew",
    price: 5.99,
    category: "coffee",
    rating: 4.8,
    image: "cold-brew",
    description: "Smooth and refreshing",
    brand: "Premium Coffee Co."
  },
  {
    id: 4,
    name: "Avocado Toast",
    price: 8.99,
    category: "food",
    rating: 4.6,
    image: "avocado-toast",
    description: "Healthy and delicious",
    brand: "Local Kitchen"
  }
];

// Store Reviews
export const storeReviews = [
  {
    id: 1,
    author: "Sarah Johnson",
    rating: 5,
    date: "2 days ago",
    text: "Amazing coffee and atmosphere! The baristas are so friendly and the WiFi is perfect for working.",
    helpful: 12
  },
  {
    id: 2,
    author: "Mike Chen",
    rating: 5,
    date: "1 week ago",
    text: "Best coffee in town! The outdoor seating is perfect for sunny days. Highly recommend the signature blend.",
    helpful: 8
  },
  {
    id: 3,
    author: "Emily Davis",
    rating: 4,
    date: "2 weeks ago",
    text: "Great place to study or work. The music is not too loud and the coffee is consistently good.",
    helpful: 5
  },
  {
    id: 4,
    author: "David Wilson",
    rating: 5,
    date: "3 weeks ago",
    text: "Love that it's pet friendly! My dog enjoys the outdoor area while I work. The staff is wonderful.",
    helpful: 15
  }
];

// Store Gallery Images
export const storeGallery = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "Coffee shop interior"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "Coffee brewing station"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "Outdoor seating area"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "Coffee beans and equipment"
  }
];

// Store Contact Information
export const storeContact = {
  phone: "(555) 123-4567",
  email: "info@premiumcoffee.com",
  website: "www.premiumcoffee.com",
  socialMedia: {
    instagram: "@premiumcoffee",
    facebook: "Premium Coffee Store",
    twitter: "@premiumcoffee"
  }
};

// Store Policies
export const storePolicies = {
  wifi: "Free WiFi available for customers",
  parking: "Street parking available, validated parking in nearby garage",
  accessibility: "Wheelchair accessible entrance and restrooms",
  pets: "Pet-friendly outdoor seating area",
  reservations: "Reservations recommended for groups of 6+",
  payment: "We accept cash, credit cards, and mobile payments"
};
