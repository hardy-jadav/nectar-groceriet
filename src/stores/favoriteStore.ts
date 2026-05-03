import { create } from 'zustand';
import type { Product } from '../types';

interface FavoriteStore {
  favorites: Product[];
  addFavorite: (product: Product) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

export const useFavoriteStore = create<FavoriteStore>((set, get) => ({
  favorites: [],

  addFavorite: (product: Product) => {
    if (!get().isFavorite(product.id)) {
      set({ favorites: [...get().favorites, product] });
    }
  },

  removeFavorite: (id: string) => {
    set({ favorites: get().favorites.filter((p) => p.id !== id) });
  },

  isFavorite: (id: string) => {
    return get().favorites.some((p) => p.id === id);
  },
}));
