import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import fruitsVegImg from '../assets/Frash Fruits and vegetable.png';
import cookingOilImg from '../assets/Cooking Oli and ghess.png';
import meatFishImg from '../assets/Meat and Fish.png';
import bakeryImg from '../assets/Bakery and snacks.png';
import dairyEggsImg from '../assets/Dairy and Eggs.png';
import beveragesImg from '../assets/Beverages.png';

interface Category {
  id: string;
  label: string;
  img: string;
  bg: string;
  border: string;
  route: string;
}

const categories: Category[] = [
  {
    id: 'vegetables',
    label: 'Fresh Fruits & Vegetable',
    img: fruitsVegImg,
    bg: '#EEF9F0',
    border: '#B7ECC4',
    route: '/category/vegetables',
  },
  {
    id: 'cooking-oil',
    label: 'Cooking Oil & Ghee',
    img: cookingOilImg,
    bg: '#FEF5EE',
    border: '#FACFA2',
    route: '/category/snacks',
  },
  {
    id: 'meat',
    label: 'Meat & Fish',
    img: meatFishImg,
    bg: '#FEF0F0',
    border: '#F5C4C4',
    route: '/category/meat',
  },
  {
    id: 'bakery',
    label: 'Bakery & Snacks',
    img: bakeryImg,
    bg: '#F5F0FE',
    border: '#D4C2F9',
    route: '/category/snacks',
  },
  {
    id: 'dairy',
    label: 'Dairy & Eggs',
    img: dairyEggsImg,
    bg: '#FEFCE8',
    border: '#F0E68C',
    route: '/category/dairy',
  },
  {
    id: 'beverages',
    label: 'Beverages',
    img: beveragesImg,
    bg: '#EEF6FE',
    border: '#B3D5F5',
    route: '/category/beverages',
  },
];

const Explore: React.FC = () => {
  const navigate = useNavigate();

  return (
    <AppLayout>
      {/* ── MOBILE LAYOUT (unchanged) ──────────────────── */}
      <div className="lg:hidden pb-28 bg-white min-h-screen">
        {/* Title */}
        <h1 className="text-center font-bold text-[20px] text-[#181725] pt-14 pb-6">
          Find Products
        </h1>

        {/* Search bar */}
        <div className="px-5 pb-6">
          <button
            onClick={() => navigate('/search')}
            className="w-full flex items-center gap-3 bg-[#F2F3F2] rounded-[15px] px-4 py-[14px] cursor-pointer"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7c7c7c" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span className="text-[#7c7c7c] text-[14px] font-semibold">Search Store</span>
          </button>
        </div>

        {/* Category grid */}
        <div className="grid grid-cols-2 gap-4 px-5">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => navigate(cat.route)}
              className="rounded-[18px] border-2 flex flex-col items-center cursor-pointer active:opacity-80 transition-opacity overflow-hidden"
              style={{
                backgroundColor: cat.bg,
                borderColor: cat.border,
                height: '190px',
              }}
            >
              <div className="flex-1 flex items-center justify-center pt-4 px-4">
                <img
                  src={cat.img}
                  alt={cat.label}
                  className="object-contain"
                  style={{ height: '120px', maxWidth: '100%' }}
                />
              </div>
              <div className="w-full px-3 pb-4 text-left">
                <span className="font-bold text-[16px] text-[#181725] leading-tight block">
                  {cat.label}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ── DESKTOP LAYOUT ────────────────────────────────── */}
      <div className="hidden lg:block bg-[#f2f3f2] min-h-screen pb-12">
        <div className="max-w-7xl mx-auto px-8 pt-6">
          <h1 className="font-bold text-[28px] text-[#181725] mb-6">Find Products</h1>

          {/* Search bar */}
          <div className="max-w-2xl mb-8">
            <button
              onClick={() => navigate('/search')}
              className="w-full flex items-center gap-3 bg-white rounded-[15px] px-5 py-4 cursor-pointer hover:shadow-sm transition-shadow border border-[#e2e2e2]"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7c7c7c" strokeWidth="2" strokeLinecap="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <span className="text-[#7c7c7c] text-[15px] font-semibold">Search Store</span>
            </button>
          </div>

          {/* 4-col category grid */}
          <div className="grid grid-cols-3 gap-5 xl:grid-cols-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => navigate(cat.route)}
                className="rounded-[18px] border-2 flex flex-col items-center cursor-pointer active:opacity-80 hover:shadow-md transition-all overflow-hidden"
                style={{
                  backgroundColor: cat.bg,
                  borderColor: cat.border,
                  height: '220px',
                }}
              >
                <div className="flex-1 flex items-center justify-center pt-5 px-4">
                  <img
                    src={cat.img}
                    alt={cat.label}
                    className="object-contain"
                    style={{ height: '140px', maxWidth: '100%' }}
                  />
                </div>
                <div className="w-full px-4 pb-5 text-left">
                  <span className="font-bold text-[17px] text-[#181725] leading-tight block">
                    {cat.label}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Explore;
