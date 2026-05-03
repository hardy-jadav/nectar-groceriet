import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../types';

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string, phone?: string) => Promise<boolean>;
  logout: () => void;
  setPhone: (phone: string) => void;
  setLocation: (location: string) => void;
  setAuthenticated: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, _password: string): Promise<boolean> => {
        set({ isLoading: true });
        return new Promise((resolve) => {
          setTimeout(() => {
            const rawName = email.split('@')[0];
            const name = rawName.charAt(0).toUpperCase() + rawName.slice(1);
            // Preserve existing phone/location if already set
            const existing = get().user;
            const user: User = {
              id: '1',
              name,
              email,
              phone: existing?.phone ?? '',
              location: existing?.location ?? '',
            };
            set({ user, isAuthenticated: true, isLoading: false });
            resolve(true);
          }, 1000);
        });
      },

      signup: async (name: string, email: string, _password: string, phone?: string): Promise<boolean> => {
        set({ isLoading: true });
        return new Promise((resolve) => {
          setTimeout(() => {
            const user: User = {
              id: '1',
              name,
              email,
              phone: phone ?? '',
              location: get().user?.location ?? '',
            };
            set({ user, isAuthenticated: true, isLoading: false });
            resolve(true);
          }, 1000);
        });
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      setPhone: (phone: string) => {
        const user = get().user;
        if (user) set({ user: { ...user, phone } });
      },

      setLocation: (location: string) => {
        const user = get().user;
        if (user) set({ user: { ...user, location } });
      },

      // Marks user as authenticated without overwriting any user data
      setAuthenticated: () => {
        const user = get().user;
        if (user) {
          set({ isAuthenticated: true });
        } else {
          // Fallback: create a minimal guest user so the app doesn't break
          set({ isAuthenticated: true, user: { id: '1', name: 'User', email: '', phone: '', location: '' } });
        }
      },
    }),
    {
      name: 'nectar-auth',           // localStorage key
      partialize: (state) => ({      // only persist user + auth, not isLoading
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
