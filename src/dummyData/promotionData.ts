// Promotion Page Data
export const promotionHero = {
  title: "Special Offers & Promotions",
  subtitle: "Discover amazing deals and exclusive offers from your favorite coffee shops",
  backgroundImage: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
};

// Featured Promotions
export const featuredPromotions = [
  {
    id: 1,
    title: "50% Off First Order",
    description: "Get 50% off your first order at any participating coffee shop. Valid for new customers only.",
    discount: "50%",
    originalPrice: "$20.00",
    discountedPrice: "$10.00",
    validUntil: "2024-12-31",
    code: "WELCOME50",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    isActive: true,
    category: "New Customer",
    participatingShops: 15
  },
  {
    id: 2,
    title: "Buy 2 Get 1 Free",
    description: "Purchase any two coffee drinks and get the third one absolutely free. Mix and match any drinks!",
    discount: "33%",
    originalPrice: "$15.00",
    discountedPrice: "$10.00",
    validUntil: "2024-11-30",
    code: "B2G1FREE",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    isActive: true,
    category: "Bulk Deal",
    participatingShops: 8
  },
  {
    id: 3,
    title: "Happy Hour Special",
    description: "Enjoy 30% off all drinks during our happy hour from 2 PM to 5 PM, Monday to Friday.",
    discount: "30%",
    originalPrice: "$12.00",
    discountedPrice: "$8.40",
    validUntil: "2024-12-15",
    code: "HAPPY30",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    isActive: true,
    category: "Time Limited",
    participatingShops: 12
  }
];

// All Promotions
export const allPromotions = [
  {
    id: 1,
    title: "Weekend Brunch Special",
    description: "Enjoy our special brunch menu with 25% off all items every weekend.",
    discount: "25%",
    originalPrice: "$24.00",
    discountedPrice: "$18.00",
    validUntil: "2024-12-31",
    code: "BRUNCH25",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    isActive: true,
    category: "Weekend",
    participatingShops: 6
  },
  {
    id: 2,
    title: "Student Discount",
    description: "Show your student ID and get 20% off all drinks and pastries.",
    discount: "20%",
    originalPrice: "$10.00",
    discountedPrice: "$8.00",
    validUntil: "2025-06-30",
    code: "STUDENT20",
    image: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    isActive: true,
    category: "Student",
    participatingShops: 20
  },
  {
    id: 3,
    title: "Loyalty Rewards",
    description: "Earn points with every purchase and redeem them for free drinks and treats.",
    discount: "Free",
    originalPrice: "$0.00",
    discountedPrice: "$0.00",
    validUntil: "Ongoing",
    code: "LOYALTY",
    image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    isActive: true,
    category: "Loyalty",
    participatingShops: 25
  },
  {
    id: 4,
    title: "Early Bird Special",
    description: "Get 15% off all breakfast items when you order before 9 AM.",
    discount: "15%",
    originalPrice: "$16.00",
    discountedPrice: "$13.60",
    validUntil: "2024-12-31",
    code: "EARLY15",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    isActive: true,
    category: "Early Bird",
    participatingShops: 10
  },
  {
    id: 5,
    title: "Group Discount",
    description: "Bring 4 or more friends and get 20% off your entire order.",
    discount: "20%",
    originalPrice: "$40.00",
    discountedPrice: "$32.00",
    validUntil: "2024-12-31",
    code: "GROUP20",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    isActive: true,
    category: "Group",
    participatingShops: 7
  },
  {
    id: 6,
    title: "Seasonal Special",
    description: "Try our limited-time seasonal drinks with 10% off this month.",
    discount: "10%",
    originalPrice: "$14.00",
    discountedPrice: "$12.60",
    validUntil: "2024-11-30",
    code: "SEASON10",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    isActive: true,
    category: "Seasonal",
    participatingShops: 18
  }
];

// Promotion Categories
export const promotionCategories = [
  { id: 'all', label: 'All Promotions', count: 6 },
  { id: 'new-customer', label: 'New Customer', count: 1 },
  { id: 'bulk-deal', label: 'Bulk Deal', count: 1 },
  { id: 'time-limited', label: 'Time Limited', count: 1 },
  { id: 'weekend', label: 'Weekend', count: 1 },
  { id: 'student', label: 'Student', count: 1 },
  { id: 'loyalty', label: 'Loyalty', count: 1 },
  { id: 'early-bird', label: 'Early Bird', count: 1 },
  { id: 'group', label: 'Group', count: 1 },
  { id: 'seasonal', label: 'Seasonal', count: 1 }
];

// How to Use Promotions
export const howToUse = [
  {
    step: 1,
    title: "Browse Promotions",
    description: "Explore our collection of current promotions and special offers from participating coffee shops.",
    icon: "🔍"
  },
  {
    step: 2,
    title: "Choose Your Deal",
    description: "Select the promotion that interests you and check the participating locations and terms.",
    icon: "🎯"
  },
  {
    step: 3,
    title: "Visit the Shop",
    description: "Go to the participating coffee shop and show the promotion code or mention the offer.",
    icon: "🏪"
  },
  {
    step: 4,
    title: "Enjoy Your Savings",
    description: "Get your discounted coffee and enjoy the savings! Don't forget to leave a review.",
    icon: "☕"
  }
];

// Terms and Conditions
export const termsAndConditions = [
  "Promotions are valid only at participating coffee shops listed in the offer details.",
  "Each promotion has specific terms and conditions that must be met to qualify for the discount.",
  "Promotion codes are case-sensitive and must be presented at the time of purchase.",
  "Some promotions may have minimum purchase requirements or exclusions on certain items.",
  "Promotions cannot be combined with other offers unless specifically stated.",
  "Expired promotions will not be honored, so please check the validity period before visiting.",
  "The coffee shop reserves the right to modify or cancel promotions at any time.",
  "Promotions are subject to availability and may be limited to certain times or days."
];
