// User Profile Information
export const userProfile = {
  id: 1,
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  phone: "(555) 123-4567",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
  joinDate: "January 2023",
  memberLevel: "Gold",
  totalOrders: 47,
  favoriteStore: "Downtown Main Store",
  preferences: {
    newsletter: true,
    smsNotifications: false,
    emailNotifications: true,
    orderUpdates: true
  }
};

// Order History
export const orderHistory = [
  {
    id: 1,
    orderNumber: "ORD-001",
    date: "2024-01-15",
    status: "Delivered",
    total: 24.50,
    items: [
      { name: "Signature Blend Coffee", quantity: 2, price: 8.99 },
      { name: "Croissant", quantity: 1, price: 3.99 },
      { name: "Cappuccino", quantity: 1, price: 4.99 }
    ],
    store: "Downtown Main Store"
  },
  {
    id: 2,
    orderNumber: "ORD-002",
    date: "2024-01-10",
    status: "Delivered",
    total: 18.75,
    items: [
      { name: "Cold Brew", quantity: 1, price: 5.99 },
      { name: "Blueberry Muffin", quantity: 2, price: 6.38 }
    ],
    store: "Central Park Branch"
  },
  {
    id: 3,
    orderNumber: "ORD-003",
    date: "2024-01-05",
    status: "In Progress",
    total: 32.20,
    items: [
      { name: "Premium Coffee Beans", quantity: 1, price: 19.99 },
      { name: "Latte", quantity: 2, price: 6.10 }
    ],
    store: "Brooklyn Heights"
  }
];

// Favorite Items
export const favoriteItems = [
  {
    id: 1,
    name: "Signature Blend Coffee",
    price: 8.99,
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    category: "Coffee",
    lastOrdered: "2024-01-15"
  },
  {
    id: 2,
    name: "Cold Brew",
    price: 5.99,
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090a?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    category: "Coffee",
    lastOrdered: "2024-01-10"
  },
  {
    id: 3,
    name: "Blueberry Muffin",
    price: 3.19,
    image: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    category: "Pastry",
    lastOrdered: "2024-01-10"
  },
  {
    id: 4,
    name: "Cappuccino",
    price: 4.99,
    image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    category: "Coffee",
    lastOrdered: "2024-01-15"
  }
];

// Loyalty Points
export const loyaltyPoints = {
  current: 1250,
  total: 1500,
  nextReward: 250,
  level: "Gold",
  benefits: [
    "Free drink every 10th order",
    "10% discount on all items",
    "Priority customer support",
    "Early access to new products"
  ]
};

// Account Settings
export const accountSettings = {
  personalInfo: {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "(555) 123-4567",
    dateOfBirth: "1990-05-15",
    address: {
      street: "123 Main Street",
      city: "New York",
      state: "NY",
      zipCode: "10001"
    }
  },
  preferences: {
    newsletter: true,
    smsNotifications: false,
    emailNotifications: true,
    orderUpdates: true,
    marketingEmails: false
  },
  security: {
    twoFactorAuth: false,
    lastPasswordChange: "2023-12-01",
    loginHistory: [
      { date: "2024-01-15", location: "New York, NY", device: "Chrome on Windows" },
      { date: "2024-01-10", location: "New York, NY", device: "Safari on iPhone" }
    ]
  }
};

// Profile Statistics
export const profileStats = {
  totalOrders: 47,
  totalSpent: 1247.50,
  averageOrderValue: 26.54,
  favoriteCategory: "Coffee",
  mostOrderedItem: "Signature Blend Coffee",
  memberSince: "January 2023",
  lastOrder: "2024-01-15"
};
