export const ProductCategory = {
  Vegetables: 'vegetables',
  Fruits: 'fruits',
  Meat: 'meat',
  Beverages: 'beverages',
  Pulses: 'pulses',
  Rice: 'rice',
  Snacks: 'snacks',
  Dairy: 'dairy',
} as const;

export type ProductCategory = (typeof ProductCategory)[keyof typeof ProductCategory];

export const OrderStatus = {
  Pending: 'pending',
  Confirmed: 'confirmed',
  Processing: 'processing',
  Delivered: 'delivered',
  Failed: 'failed',
} as const;

export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  unit: string;
  image: string;
  description: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  discount?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  location?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
  address: string;
}

export interface FilterState {
  categories: string[];
  minPrice: number;
  maxPrice: number;
  sortBy: 'price-asc' | 'price-desc' | 'rating' | 'none';
}
