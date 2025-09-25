import { BlogPost, BlogCategory, BlogFilter } from './types';

// Blog Categories
export const blogCategories: BlogCategory[] = [
  { id: 'all', name: 'All Topics', count: 24 },
  { id: 'brewing', name: 'Brewing Methods', count: 8 },
  { id: 'coffee-beans', name: 'Coffee Beans', count: 6 },
  { id: 'recipes', name: 'Recipes', count: 5 },
  { id: 'news', name: 'News & Updates', count: 3 },
  { id: 'reviews', name: 'Reviews', count: 2 }
];

// Featured Blog Post
export const featuredBlogPost: BlogPost = {
  id: 1,
  title: "Why is Restaurant so famous?",
  excerpt: "The site was originally created by a group of friends who shared a passion for discovering unique cafes and creative spaces. Every time they gathered, they shared new places with each other, but it was often difficult to remember and introduce them to others.\n\nFrom that need, the idea of a platform for sharing favorite coffee shops was born - where people can post, review, save favorite places, and search for shops that suit their taste.",
  author: "I am admin",
  publishDate: "May 04, 2020",
  category: "News & Updates",
  image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2061&q=80",
  readTime: "5 min read",
  featured: true
};

// Blog Posts Data
export const blogPosts: BlogPost[] = [
  {
    id: 2,
    title: "Restaurant Will Make You Tons Of Cash. Here's How! History of coffee..",
    excerpt: "Discover the fascinating history of coffee and how restaurants have evolved to become profitable businesses through strategic planning and customer experience.",
    author: "I am admin",
    publishDate: "13 March 2025",
    category: "Brewing Methods",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    readTime: "3 min read",
    featured: false
  },
  {
    id: 3,
    title: "Restaurant Will Make You Tons Of Cash. Here's How! History of coffee..",
    excerpt: "Learn about the art of coffee brewing and how different methods can enhance the flavor profile of your favorite beans.",
    author: "I am admin",
    publishDate: "13 March 2025",
    category: "Brewing Methods",
    image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    readTime: "4 min read",
    featured: false
  },
  {
    id: 4,
    title: "Restaurant Will Make You Tons Of Cash. Here's How! History of coffee..",
    excerpt: "Explore the world of specialty coffee beans and discover new flavors from different regions around the globe.",
    author: "I am admin",
    publishDate: "13 March 2025",
    category: "Coffee Beans",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    readTime: "6 min read",
    featured: false
  },
  {
    id: 5,
    title: "Restaurant Will Make You Tons Of Cash. Here's How! History of coffee..",
    excerpt: "Master the perfect coffee brewing techniques with our comprehensive guide to different brewing methods.",
    author: "I am admin",
    publishDate: "13 March 2025",
    category: "Brewing Methods",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    readTime: "7 min read",
    featured: false
  },
  {
    id: 6,
    title: "Restaurant Will Make You Tons Of Cash. Here's How! History of coffee..",
    excerpt: "Try these delicious coffee-based recipes that will impress your guests and elevate your coffee experience.",
    author: "I am admin",
    publishDate: "13 March 2025",
    category: "Recipes",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
    readTime: "5 min read",
    featured: false
  },
  {
    id: 7,
    title: "Restaurant Will Make You Tons Of Cash. Here's How! History of coffee..",
    excerpt: "Stay updated with the latest news and trends in the coffee industry and our community updates.",
    author: "I am admin",
    publishDate: "13 March 2025",
    category: "News & Updates",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    readTime: "4 min read",
    featured: false
  },
  {
    id: 8,
    title: "Restaurant Will Make You Tons Of Cash. Here's How! History of coffee..",
    excerpt: "Read our detailed reviews of the best coffee shops and cafes in the city, featuring honest opinions and recommendations.",
    author: "I am admin",
    publishDate: "13 March 2025",
    category: "Reviews",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    readTime: "8 min read",
    featured: false
  },
  {
    id: 9,
    title: "Restaurant Will Make You Tons Of Cash. Here's How! History of coffee..",
    excerpt: "Discover the secrets behind perfect coffee extraction and how to achieve the ideal balance of flavors.",
    author: "I am admin",
    publishDate: "13 March 2025",
    category: "Brewing Methods",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    readTime: "6 min read",
    featured: false
  },
  {
    id: 10,
    title: "Restaurant Will Make You Tons Of Cash. Here's How! History of coffee..",
    excerpt: "Learn about sustainable coffee practices and how to make environmentally conscious choices when buying coffee.",
    author: "I am admin",
    publishDate: "13 March 2025",
    category: "Coffee Beans",
    image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    readTime: "5 min read",
    featured: false
  },
  {
    id: 11,
    title: "Restaurant Will Make You Tons Of Cash. Here's How! History of coffee..",
    excerpt: "Create amazing coffee cocktails and specialty drinks that will impress your friends and family.",
    author: "I am admin",
    publishDate: "13 March 2025",
    category: "Recipes",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
    readTime: "4 min read",
    featured: false
  },
  {
    id: 12,
    title: "Restaurant Will Make You Tons Of Cash. Here's How! History of coffee..",
    excerpt: "Get the latest updates on our community events, new features, and exciting announcements.",
    author: "I am admin",
    publishDate: "13 March 2025",
    category: "News & Updates",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    readTime: "3 min read",
    featured: false
  },
  {
    id: 13,
    title: "Restaurant Will Make You Tons Of Cash. Here's How! History of coffee..",
    excerpt: "Read our comprehensive review of the top coffee shops in different neighborhoods and what makes them special.",
    author: "I am admin",
    publishDate: "13 March 2025",
    category: "Reviews",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    readTime: "9 min read",
    featured: false
  }
];

// Blog Filter Options
export const blogFilters: BlogFilter = {
  searchPlaceholder: "Search",
  topicsLabel: "Topics",
  dateFromLabel: "From Date",
  dateToLabel: "To Date",
  loadMoreText: "LOAD MORE"
};

// Hero Banner Content
export const blogHeroContent = {
  highlightText: "Hightlight news, ads, discount, HOT HOT",
  mainTitle: "Find the café, feel the vibe",
  searchPlaceholder: "Enter your location",
  searchButtonText: "Search"
};
