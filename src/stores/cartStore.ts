import { create } from 'zustand';
import type { CartItem, Product } from '../types';

interface CartStore {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],

  addToCart: (product: Product) => {
    const existing = get().items.find((item) => item.product.id === product.id);
    if (existing) {
      set({
        items: get().items.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      });
    } else {
      set({ items: [...get().items, { product, quantity: 1 }] });
    }
  },

  removeFromCart: (id: string) => {
    set({ items: get().items.filter((item) => item.product.id !== id) });
  },

  updateQuantity: (id: string, qty: number) => {
    if (qty <= 0) {
      get().removeFromCart(id);
      return;
    }
    set({
      items: get().items.map((item) =>
        item.product.id === id ? { ...item, quantity: qty } : item
      ),
    });
  },

  clearCart: () => set({ items: [] }),

  totalItems: () => get().items.reduce((sum, item) => sum + item.quantity, 0),

  totalPrice: () =>
    get().items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    ),
}));
