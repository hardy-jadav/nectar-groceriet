import { create } from 'zustand';
import type { Product, FilterState } from '../types';
import { products as allProducts } from '../data/products';

interface ProductStore {
  products: Product[];
  filteredProducts: Product[];
  isLoading: boolean;
  selectedCategory: string | null;
  filters: FilterState;
  searchQuery: string;
  loadProducts: () => Promise<void>;
  setCategory: (cat: string | null) => void;
  setFilters: (f: FilterState) => void;
  searchProducts: (query: string) => void;
  applyFilters: () => void;
}

const defaultFilters: FilterState = {
  categories: [],
  minPrice: 0,
  maxPrice: 100,
  sortBy: 'none',
};

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  filteredProducts: [],
  isLoading: false,
  selectedCategory: null,
  filters: defaultFilters,
  searchQuery: '',

  loadProducts: async (): Promise<void> => {
    set({ isLoading: true });
    return new Promise((resolve) => {
      setTimeout(() => {
        set({ products: allProducts, filteredProducts: allProducts, isLoading: false });
        resolve();
      }, 800);
    });
  },

  setCategory: (cat: string | null) => {
    set({ selectedCategory: cat });
    get().applyFilters();
  },

  setFilters: (f: FilterState) => {
    set({ filters: f });
    get().applyFilters();
  },

  searchProducts: (query: string) => {
    set({ searchQuery: query });
    get().applyFilters();
  },

  applyFilters: () => {
    const { products, selectedCategory, filters, searchQuery } = get();
    let result = [...products];

    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (filters.categories.length > 0) {
      result = result.filter((p) => filters.categories.includes(p.category));
    }

    result = result.filter(
      (p) => p.price >= filters.minPrice && p.price <= filters.maxPrice
    );

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    if (filters.sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (filters.sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    set({ filteredProducts: result });
  },
}));
