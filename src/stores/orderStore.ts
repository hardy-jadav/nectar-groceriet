import { create } from 'zustand';
import type { CartItem, Order } from '../types';
import { OrderStatus } from '../types';

interface OrderStore {
  currentOrder: Order | null;
  orders: Order[];
  isLoading: boolean;
  placeOrder: (items: CartItem[], address: string) => Promise<boolean>;
  clearCurrentOrder: () => void;
}

export const useOrderStore = create<OrderStore>((set, get) => ({
  currentOrder: null,
  orders: [],
  isLoading: false,

  placeOrder: async (items: CartItem[], address: string): Promise<boolean> => {
    set({ isLoading: true });
    return new Promise((resolve) => {
      setTimeout(() => {
        const success = Math.random() > 0.2;
        if (success) {
          const total = items.reduce(
            (sum, item) => sum + item.product.price * item.quantity,
            0
          );
          const order: Order = {
            id: `ORD-${Date.now()}`,
            items,
            total,
            status: OrderStatus.Confirmed,
            createdAt: new Date().toISOString(),
            address,
          };
          set({
            currentOrder: order,
            orders: [...get().orders, order],
            isLoading: false,
          });
          resolve(true);
        } else {
          set({ isLoading: false });
          resolve(false);
        }
      }, 2000);
    });
  },

  clearCurrentOrder: () => set({ currentOrder: null }),
}));
