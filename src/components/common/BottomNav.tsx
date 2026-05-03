import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Store, TextSearch, ShoppingCart, Heart, User } from 'lucide-react';
import { useCartStore } from '../../stores/cartStore';

const items = [
  { label: 'Shop',      path: '/home',      Icon: Store       },
  { label: 'Explore',   path: '/explore',   Icon: TextSearch  },
  { label: 'Cart',      path: '/cart',      Icon: ShoppingCart },
  { label: 'Favourite', path: '/favorites', Icon: Heart       },
  { label: 'Account',   path: '/account',   Icon: User        },
];

const BottomNav: React.FC = () => {
  const navigate   = useNavigate();
  const location   = useLocation();
  const totalItems = useCartStore((state) => state.totalItems());

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#e2e2e2] z-30 lg:hidden">
      <div className="max-w-[414px] mx-auto flex items-center justify-around px-2 py-2">
        {items.map(({ label, path, Icon }) => {
          const active = location.pathname === path;
          const color  = active ? '#53b175' : '#7c7c7c';
          const isCart = label === 'Cart';

          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className="flex flex-col items-center gap-1 px-3 py-1 relative cursor-pointer"
            >
              <div className="relative">
                <Icon
                  size={22}
                  color={color}
                  strokeWidth={1.8}
                  fill={active && (label === 'Shop' || label === 'Favourite') ? color : 'none'}
                />
                {isCart && totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#53b175] text-white text-[10px] font-bold rounded-full min-w-[16px] h-4 flex items-center justify-center px-0.5">
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
              </div>
              <span className={`text-[10px] font-medium ${active ? 'text-[#53b175]' : 'text-[#7c7c7c]'}`}>
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
