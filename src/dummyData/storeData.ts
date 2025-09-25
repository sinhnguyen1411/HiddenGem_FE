import { Product, Category, FilterGroup, HeroContent } from './types';

// Store Hero Content
export const storeHeroContent: HeroContent = {
  title: "Our Coffee Store",
  subtitle: "Discover premium coffee beans, equipment, and accessories",
  searchPlaceholder: "Search products...",
  primaryButton: "Search",
  secondaryButton: "Browse All",
  backgroundImage: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2061&q=80"
};

// Product Categories
export const categories: Category[] = [
  { id: 'all', name: 'All Products', count: 24 },
  { id: 'coffee', name: 'Coffee Beans', count: 12 },
  { id: 'equipment', name: 'Equipment', count: 8 },
  { id: 'accessories', name: 'Accessories', count: 4 }
];

// All Products Data
export const allProducts: Product[] = [
  // Coffee Products
  {
    id: 1,
    name: "Premium Arabica Blend",
    price: 24.99,
    category: "coffee",
    rating: 4.8,
    image: "coffee1",
    description: "Rich and aromatic coffee blend",
    brand: "Premium Coffee Co."
  },
  {
    id: 2,
    name: "Ethiopian Single Origin",
    price: 18.99,
    category: "coffee",
    rating: 4.9,
    image: "coffee2",
    description: "Exotic single origin coffee",
    brand: "Artisan Roasters"
  },
  {
    id: 3,
    name: "Colombian Dark Roast",
    price: 22.99,
    category: "coffee",
    rating: 4.7,
    image: "coffee3",
    description: "Bold and full-bodied dark roast",
    brand: "Local Blend"
  },
  {
    id: 4,
    name: "Espresso Blend",
    price: 19.99,
    category: "coffee",
    rating: 4.6,
    image: "coffee4",
    description: "Perfect for espresso lovers",
    brand: "Premium Coffee Co."
  },
  {
    id: 5,
    name: "Guatemalan Medium Roast",
    price: 21.99,
    category: "coffee",
    rating: 4.8,
    image: "coffee5",
    description: "Smooth and balanced medium roast",
    brand: "Artisan Roasters"
  },
  {
    id: 6,
    name: "Brazilian Light Roast",
    price: 17.99,
    category: "coffee",
    rating: 4.5,
    image: "coffee6",
    description: "Bright and fruity light roast",
    brand: "Local Blend"
  },
  
  // Equipment Products
  {
    id: 7,
    name: "Espresso Machine Pro",
    price: 299.99,
    category: "equipment",
    rating: 4.9,
    image: "equipment1",
    description: "Professional grade espresso machine",
    brand: "CoffeeTech"
  },
  {
    id: 8,
    name: "Coffee Grinder",
    price: 89.99,
    category: "equipment",
    rating: 4.7,
    image: "equipment2",
    description: "Burr grinder for perfect grind consistency",
    brand: "GrindMaster"
  },
  {
    id: 9,
    name: "French Press",
    price: 45.99,
    category: "equipment",
    rating: 4.5,
    image: "equipment3",
    description: "Classic French press coffee maker",
    brand: "BrewCraft"
  },
  {
    id: 10,
    name: "Pour Over Set",
    price: 35.99,
    category: "equipment",
    rating: 4.6,
    image: "equipment4",
    description: "Complete pour over coffee set",
    brand: "CoffeeTech"
  },
  {
    id: 11,
    name: "Moka Pot",
    price: 29.99,
    category: "equipment",
    rating: 4.4,
    image: "equipment5",
    description: "Traditional Italian moka pot",
    brand: "BrewCraft"
  },
  {
    id: 12,
    name: "AeroPress",
    price: 39.99,
    category: "equipment",
    rating: 4.8,
    image: "equipment6",
    description: "Portable coffee maker",
    brand: "GrindMaster"
  },
  
  // Accessories Products
  {
    id: 13,
    name: "Ceramic Mug Set",
    price: 19.99,
    category: "accessories",
    rating: 4.6,
    image: "accessory1",
    description: "Set of 4 ceramic coffee mugs",
    brand: "CupCraft"
  },
  {
    id: 14,
    name: "Coffee Filters",
    price: 8.99,
    category: "accessories",
    rating: 4.4,
    image: "accessory2",
    description: "Premium coffee filters (100 pack)",
    brand: "FilterPro"
  },
  {
    id: 15,
    name: "Coffee Scale",
    price: 49.99,
    category: "accessories",
    rating: 4.7,
    image: "accessory3",
    description: "Precision coffee scale with timer",
    brand: "ScaleTech"
  },
  {
    id: 16,
    name: "Milk Frother",
    price: 24.99,
    category: "accessories",
    rating: 4.5,
    image: "accessory4",
    description: "Electric milk frother for lattes",
    brand: "FrothMaster"
  }
];

// Filter Groups
export const filterGroups: FilterGroup[] = [
  {
    id: "price",
    title: "Price Range",
    type: "range",
    options: [
      { id: "min", label: "Min", value: 0 },
      { id: "max", label: "Max", value: 500 }
    ]
  },
  {
    id: "rating",
    title: "Rating",
    type: "checkbox",
    options: [
      { id: "5", label: "5+ stars", value: 5, count: 8 },
      { id: "4", label: "4+ stars", value: 4, count: 12 },
      { id: "3", label: "3+ stars", value: 3, count: 16 },
      { id: "2", label: "2+ stars", value: 2, count: 20 },
      { id: "1", label: "1+ stars", value: 1, count: 24 }
    ]
  },
  {
    id: "brand",
    title: "Brand",
    type: "checkbox",
    options: [
      { id: "premium", label: "Premium Coffee Co.", value: "Premium Coffee Co.", count: 6 },
      { id: "artisan", label: "Artisan Roasters", value: "Artisan Roasters", count: 8 },
      { id: "local", label: "Local Blend", value: "Local Blend", count: 4 },
      { id: "coffeetech", label: "CoffeeTech", value: "CoffeeTech", count: 3 },
      { id: "grindmaster", label: "GrindMaster", value: "GrindMaster", count: 2 },
      { id: "brewcraft", label: "BrewCraft", value: "BrewCraft", count: 1 }
    ]
  }
];

// Sort Options
export const sortOptions = [
  { value: "featured", label: "Sort by: Featured" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Rating" },
  { value: "newest", label: "Newest" }
];

// Pagination
export const paginationConfig = {
  itemsPerPage: 8,
  totalPages: 3,
  currentPage: 1
};
