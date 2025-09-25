// Location Hero Content
export const locationHero = {
  title: "Find Our Coffee Stores",
  subtitle: "Discover our locations and find the perfect spot for your coffee experience",
  searchPlaceholder: "Search by city, address, or store name",
  backgroundImage: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
};

// Store Locations
export const storeLocations = [
  {
    id: 1,
    name: "Downtown Main Store",
    address: "123 Coffee Street, Downtown District",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    phone: "(555) 123-4567",
    email: "downtown@premiumcoffee.com",
    hours: {
      monday: "6:00 AM - 8:00 PM",
      tuesday: "6:00 AM - 8:00 PM",
      wednesday: "6:00 AM - 8:00 PM",
      thursday: "6:00 AM - 8:00 PM",
      friday: "6:00 AM - 9:00 PM",
      saturday: "7:00 AM - 9:00 PM",
      sunday: "7:00 AM - 8:00 PM"
    },
    features: ["Free WiFi", "Outdoor Seating", "Pet Friendly", "Live Music"],
    rating: 4.8,
    reviewCount: 127,
    isOpen: true,
    coordinates: {
      lat: 40.7589,
      lng: -73.9851
    },
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    name: "Central Park Branch",
    address: "456 Park Avenue, Central Park",
    city: "New York",
    state: "NY",
    zipCode: "10022",
    phone: "(555) 234-5678",
    email: "centralpark@premiumcoffee.com",
    hours: {
      monday: "6:30 AM - 7:30 PM",
      tuesday: "6:30 AM - 7:30 PM",
      wednesday: "6:30 AM - 7:30 PM",
      thursday: "6:30 AM - 7:30 PM",
      friday: "6:30 AM - 8:30 PM",
      saturday: "7:30 AM - 8:30 PM",
      sunday: "8:00 AM - 7:00 PM"
    },
    features: ["Free WiFi", "Outdoor Seating", "Parking Available"],
    rating: 4.6,
    reviewCount: 89,
    isOpen: true,
    coordinates: {
      lat: 40.7829,
      lng: -73.9654
    },
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    name: "Brooklyn Heights",
    address: "789 Brooklyn Bridge Road, Brooklyn Heights",
    city: "Brooklyn",
    state: "NY",
    zipCode: "11201",
    phone: "(555) 345-6789",
    email: "brooklyn@premiumcoffee.com",
    hours: {
      monday: "6:00 AM - 8:00 PM",
      tuesday: "6:00 AM - 8:00 PM",
      wednesday: "6:00 AM - 8:00 PM",
      thursday: "6:00 AM - 8:00 PM",
      friday: "6:00 AM - 9:00 PM",
      saturday: "7:00 AM - 9:00 PM",
      sunday: "7:00 AM - 8:00 PM"
    },
    features: ["Free WiFi", "Pet Friendly", "Study Area", "Art Gallery"],
    rating: 4.7,
    reviewCount: 156,
    isOpen: false,
    coordinates: {
      lat: 40.6962,
      lng: -73.9969
    },
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    name: "Queens Plaza",
    address: "321 Queens Boulevard, Long Island City",
    city: "Queens",
    state: "NY",
    zipCode: "11101",
    phone: "(555) 456-7890",
    email: "queens@premiumcoffee.com",
    hours: {
      monday: "5:30 AM - 9:00 PM",
      tuesday: "5:30 AM - 9:00 PM",
      wednesday: "5:30 AM - 9:00 PM",
      thursday: "5:30 AM - 9:00 PM",
      friday: "5:30 AM - 10:00 PM",
      saturday: "6:30 AM - 10:00 PM",
      sunday: "7:00 AM - 9:00 PM"
    },
    features: ["Free WiFi", "24/7 Study Area", "Meeting Rooms", "Parking Available"],
    rating: 4.5,
    reviewCount: 203,
    isOpen: true,
    coordinates: {
      lat: 40.7505,
      lng: -73.9370
    },
    image: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

// Filter Options
export const locationFilters = {
  features: [
    { id: 'wifi', label: 'Free WiFi', count: 4 },
    { id: 'outdoor', label: 'Outdoor Seating', count: 2 },
    { id: 'parking', label: 'Parking Available', count: 2 },
    { id: 'pet-friendly', label: 'Pet Friendly', count: 2 },
    { id: 'study-area', label: 'Study Area', count: 2 },
    { id: 'live-music', label: 'Live Music', count: 1 }
  ],
  cities: [
    { id: 'all', label: 'All Cities', count: 4 },
    { id: 'new-york', label: 'New York', count: 2 },
    { id: 'brooklyn', label: 'Brooklyn', count: 1 },
    { id: 'queens', label: 'Queens', count: 1 }
  ],
  status: [
    { id: 'all', label: 'All Stores', count: 4 },
    { id: 'open', label: 'Open Now', count: 3 },
    { id: 'closed', label: 'Closed', count: 1 }
  ]
};

// Map Configuration
export const mapConfig = {
  center: {
    lat: 40.7589,
    lng: -73.9851
  },
  zoom: 12,
  style: 'roadmap'
};

// Search Suggestions
export const searchSuggestions = [
  "Downtown Main Store",
  "Central Park Branch",
  "Brooklyn Heights",
  "Queens Plaza",
  "New York",
  "Brooklyn",
  "Queens",
  "Coffee near me",
  "Free WiFi",
  "Pet friendly"
];
