import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import BottomNav from '../common/BottomNav';
import { useCartStore } from '../../stores/cartStore';
import { useAuthStore } from '../../stores/authStore';
import logoSvg from '../../assets/logo.svg';

interface AppLayoutProps {
  children: React.ReactNode;
}

/* ─── Desktop Top Header ─────────────────────────────────────── */
const DesktopHeader: React.FC = () => {
  const navigate = useNavigate();
  const totalItems = useCartStore((state) => state.totalItems());
  const user = useAuthStore((state) => state.user);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate('/search');
    }
  };

  return (
    <header className="hidden lg:flex fixed top-0 left-0 right-0 z-40 bg-white border-b border-[#e2e2e2] h-16 items-center px-8 gap-6">
      {/* Logo */}
      <button
        onClick={() => navigate('/home')}
        className="flex items-center gap-2 flex-shrink-0 cursor-pointer"
      >
        <img
          src={logoSvg}
          alt="Nectar"
          className="w-[28px] h-[32px]"
          style={{ filter: 'invert(55%) sepia(60%) saturate(600%) hue-rotate(95deg) brightness(90%)' }}
        />
        <span className="text-[#53b175] font-bold text-2xl">nectar</span>
      </button>

      {/* Search bar */}
      <div className="flex-1 max-w-2xl flex items-center bg-[#F2F3F2] rounded-[15px] px-4 py-2.5 gap-3">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7c7c7c" strokeWidth="2" strokeLinecap="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleSearchKeyDown}
          placeholder="Search Store"
          className="flex-1 outline-none text-[14px] text-[#181725] placeholder-[#7c7c7c] bg-transparent font-semibold"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="w-5 h-5 bg-[#b3b3b3] rounded-full flex items-center justify-center cursor-pointer flex-shrink-0"
          >
            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-4 ml-auto flex-shrink-0">
        {/* Cart button */}
        <button
          onClick={() => navigate('/cart')}
          className="relative cursor-pointer w-10 h-10 flex items-center justify-center hover:bg-gray-50 rounded-full"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#181725" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          {totalItems > 0 && (
            <span className="absolute -top-0.5 -right-0.5 bg-[#53b175] text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-0.5">
              {totalItems > 99 ? '99+' : totalItems}
            </span>
          )}
        </button>

        {/* User avatar */}
        <button
          onClick={() => navigate('/account')}
          className="w-9 h-9 bg-[#53b175] rounded-full flex items-center justify-center cursor-pointer flex-shrink-0 hover:bg-[#44a367] transition-colors"
        >
          <span className="text-white text-[14px] font-bold">
            {user?.name ? user.name[0].toUpperCase() : 'U'}
          </span>
        </button>
      </div>
    </header>
  );
};

/* ─── Desktop Left Sidebar ───────────────────────────────────── */
const DesktopSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const totalItems = useCartStore((state) => state.totalItems());

  const navItems = [
    {
      label: 'Shop',
      path: '/home',
      icon: (active: boolean) => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill={active ? '#53b175' : 'none'} stroke={active ? '#53b175' : '#7c7c7c'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
    },
    {
      label: 'Explore',
      path: '/explore',
      icon: (active: boolean) => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={active ? '#53b175' : '#7c7c7c'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
      ),
    },
    {
      label: 'Cart',
      path: '/cart',
      badge: totalItems,
      icon: (active: boolean) => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={active ? '#53b175' : '#7c7c7c'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
      ),
    },
    {
      label: 'Favourites',
      path: '/favorites',
      icon: (active: boolean) => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill={active ? '#53b175' : 'none'} stroke={active ? '#53b175' : '#7c7c7c'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      ),
    },
    {
      label: 'Account',
      path: '/account',
      icon: (active: boolean) => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={active ? '#53b175' : '#7c7c7c'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
  ];

  const sidebarCategories = [
    { id: 'vegetables', label: 'Vegetables' },
    { id: 'fruits', label: 'Fruits' },
    { id: 'meat', label: 'Meat & Fish' },
    { id: 'beverages', label: 'Beverages' },
    { id: 'pulses', label: 'Pulses' },
    { id: 'rice', label: 'Rice' },
    { id: 'dairy', label: 'Dairy & Eggs' },
    { id: 'snacks', label: 'Bakery & Snacks' },
  ];

  return (
    <aside className="hidden lg:flex fixed left-0 top-16 bottom-0 w-56 bg-white border-r border-[#e2e2e2] flex-col z-30 overflow-y-auto">
      {/* Nav items */}
      <nav className="pt-4 px-3">
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl cursor-pointer font-medium text-[15px] mb-1 transition-colors ${
                active
                  ? 'bg-[#53b175]/10 text-[#53b175]'
                  : 'text-[#181725] hover:bg-gray-50'
              }`}
            >
              {item.icon(active)}
              <span>{item.label}</span>
              {item.label === 'Cart' && item.badge !== undefined && item.badge > 0 && (
                <span className={`ml-auto text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1 ${
                  active ? 'bg-[#53b175] text-white' : 'bg-[#53b175] text-white'
                }`}>
                  {item.badge > 99 ? '99+' : item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Divider + Categories */}
      <div className="border-t border-[#e2e2e2] mx-3 mt-4" />
      <p className="text-[#7c7c7c] text-xs font-semibold uppercase px-4 mt-4 mb-2 tracking-wider">
        Categories
      </p>
      <div className="px-3 pb-6">
        {sidebarCategories.map((cat) => {
          const active = location.pathname === `/category/${cat.id}`;
          return (
            <button
              key={cat.id}
              onClick={() => navigate(`/category/${cat.id}`)}
              className={`w-full flex items-center gap-2 px-4 py-2 text-[14px] cursor-pointer rounded-lg mb-0.5 transition-colors text-left ${
                active
                  ? 'bg-[#53b175]/10 text-[#53b175] font-medium'
                  : 'text-[#181725] hover:bg-gray-50'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>
    </aside>
  );
};

/* ─── AppLayout ──────────────────────────────────────────────── */
const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#f2f3f2]">
      {/* Desktop top header */}
      <DesktopHeader />

      {/* Desktop sidebar */}
      <DesktopSidebar />

      {/* Main content */}
      <main className="lg:ml-56 lg:pt-16 min-h-screen">
        {children}
      </main>

      {/* Mobile bottom nav only */}
      <BottomNav />
    </div>
  );
};

export default AppLayout;
