import { Product, Testimonial, Service, LocationInfo, HeroContent } from './types';

// Hero Section Data
export const heroContent: HeroContent = {
  title: "Welcome to Our Coffee Shop",
  subtitle: "Experience the finest coffee and cozy atmosphere",
  searchPlaceholder: "Search products...",
  primaryButton: "Order Now",
  secondaryButton: "View Menu",
  backgroundImage: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
};

// Featured Products Data
export const featuredProducts: Product[] = [
  {
    id: 1,
    name: "Premium Arabica Blend",
    price: 12.99,
    category: "coffee",
    rating: 4.8,
    image: "coffee1",
    description: "Rich and aromatic coffee blend"
  },
  {
    id: 2,
    name: "Ethiopian Single Origin",
    price: 15.99,
    category: "coffee",
    rating: 4.9,
    image: "coffee2",
    description: "Exotic single origin coffee"
  },
  {
    id: 3,
    name: "Colombian Dark Roast",
    price: 13.99,
    category: "coffee",
    rating: 4.7,
    image: "coffee3",
    description: "Bold and full-bodied dark roast"
  },
  {
    id: 4,
    name: "Espresso Blend",
    price: 14.99,
    category: "coffee",
    rating: 4.6,
    image: "coffee4",
    description: "Perfect for espresso lovers"
  }
];

// About Us Content
export const aboutContent = {
  title: "About Our Coffee Shop",
  description1: "We are passionate about bringing you the finest coffee experience. Our beans are carefully selected from the best coffee regions around the world, and our skilled baristas craft each cup with love and attention to detail.",
  description2: "Since 2010, we have been serving our community with exceptional coffee, delicious pastries, and a warm, welcoming atmosphere that makes you feel at home.",
  buttonText: "Learn More",
  imagePlaceholder: "About Us Image"
};

// Services Data
export const services: Service[] = [
  {
    id: 1,
    title: "Fresh Coffee",
    description: "Daily roasted beans",
    icon: "coffee-icon"
  },
  {
    id: 2,
    title: "Pastries",
    description: "Homemade baked goods",
    icon: "pastry-icon"
  },
  {
    id: 3,
    title: "WiFi",
    description: "Free internet access",
    icon: "wifi-icon"
  },
  {
    id: 4,
    title: "Events",
    description: "Private party hosting",
    icon: "event-icon"
  }
];

// Testimonials Data
export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    text: "Best coffee in town! The atmosphere is perfect for working.",
    rating: 5,
    location: "Local Customer"
  },
  {
    id: 2,
    name: "Mike Chen",
    text: "Amazing pastries and friendly staff. Highly recommended!",
    rating: 5,
    location: "Regular Customer"
  },
  {
    id: 3,
    name: "Emily Davis",
    text: "Love the cozy vibe and the coffee is always perfect.",
    rating: 5,
    location: "Coffee Lover"
  }
];

// Location & Hours Data
export const locationInfo: LocationInfo = {
  address: "123 Coffee Street\nDowntown District\nCity, State 12345",
  hours: "Monday - Friday: 6:00 AM - 8:00 PM\nSaturday - Sunday: 7:00 AM - 9:00 PM",
  contact: "Phone: (555) 123-4567\nEmail: info@coffeeshop.com"
};

// Newsletter Content
export const newsletterContent = {
  title: "Stay Updated",
  subtitle: "Subscribe to our newsletter for special offers and updates",
  placeholder: "Enter your email address",
  buttonText: "Subscribe"
};
