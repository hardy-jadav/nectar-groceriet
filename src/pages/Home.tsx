import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProductStore } from '../stores/productStore';
import { products as allProducts } from '../data/products';
import { useCartStore } from '../stores/cartStore';
import { useAuthStore } from '../stores/authStore';
import logoSvg from '../assets/logo.svg';
import banner1Img from '../assets/banner.svg';
import banner2Img from '../assets/banner2.svg';
import banner3Img from '../assets/banner3.svg';
import pulseImg from '../assets/pulse.png';
import riceImg from '../assets/rice.png';

const BANNER_IMAGES = [banner1Img, banner2Img, banner3Img];
import AppLayout from '../components/layout/AppLayout';
import SkeletonCard from '../components/common/SkeletonCard';
import type { Product } from '../types';

/* ─── Mobile Product Card ────────────────────────────────────── */
const HomeProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const navigate = useNavigate();
  const addToCart = useCartStore((s) => s.addToCart);
  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="bg-white rounded-[18px] border border-[#e2e2e2] p-3 flex flex-col cursor-pointer w-[174px] flex-shrink-0"
      style={{ boxShadow: '0px 1px 4px rgba(0,0,0,0.06)' }}
    >
      {/* Image */}
      <div className="w-full h-[110px] flex items-center justify-center mb-3">
        <img
          src={product.image}
          alt={product.name}
          className="max-h-full max-w-full object-contain"
        />
      </div>
      {/* Name */}
      <p className="font-bold text-[#181725] text-[14px] leading-tight mb-0.5">
        {product.name}
      </p>
      {/* Unit */}
      <p className="text-[#7c7c7c] text-[12px] mb-3">{product.unit}</p>
      {/* Price + Add */}
      <div className="flex items-center justify-between mt-auto">
        <span className="text-[#181725] font-bold text-[18px]">
          ${product.price.toFixed(2)}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product);
          }}
          className="w-[45px] h-[45px] bg-[#53b175] rounded-full flex items-center justify-center active:opacity-80 transition-opacity cursor-pointer flex-shrink-0"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

/* ─── Mobile Grid Product Card ───────────────────────────────── */
const GridProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const navigate = useNavigate();
  const addToCart = useCartStore((s) => s.addToCart);
  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="bg-white rounded-[18px] border border-[#e2e2e2] p-3 flex flex-col cursor-pointer"
      style={{ boxShadow: '0px 1px 4px rgba(0,0,0,0.06)' }}
    >
      <div className="w-full h-[100px] flex items-center justify-center mb-2">
        <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain" />
      </div>
      <p className="font-bold text-[#181725] text-[13px] leading-tight mb-0.5 line-clamp-1">{product.name}</p>
      <p className="text-[#7c7c7c] text-[11px] mb-2">{product.unit}</p>
      <div className="flex items-center justify-between mt-auto">
        <span className="text-[#181725] font-bold text-[16px]">${product.price.toFixed(2)}</span>
        <button
          onClick={(e) => { e.stopPropagation(); addToCart(product); }}
          className="w-[38px] h-[38px] bg-[#53b175] rounded-full flex items-center justify-center active:opacity-80 cursor-pointer flex-shrink-0"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

/* ─── Desktop Product Card ───────────────────────────────────── */
const DesktopProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const navigate = useNavigate();
  const addToCart = useCartStore((s) => s.addToCart);
  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="bg-white rounded-[18px] border border-[#e2e2e2] p-4 flex flex-col cursor-pointer hover:shadow-md transition-shadow"
      style={{ boxShadow: '0px 1px 4px rgba(0,0,0,0.06)' }}
    >
      <div className="w-full h-[140px] flex items-center justify-center mb-3">
        <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain" />
      </div>
      <p className="font-bold text-[#181725] text-[15px] leading-tight mb-0.5 line-clamp-2">{product.name}</p>
      <p className="text-[#7c7c7c] text-[12px] mb-3">{product.unit}</p>
      <div className="flex items-center justify-between mt-auto">
        <span className="text-[#181725] font-bold text-[18px]">${product.price.toFixed(2)}</span>
        <button
          onClick={(e) => { e.stopPropagation(); addToCart(product); }}
          className="w-[42px] h-[42px] bg-[#53b175] rounded-full flex items-center justify-center active:opacity-80 cursor-pointer flex-shrink-0 hover:bg-[#44a367] transition-colors"
        >
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

/* ─── Home ──────────────────────────────────────────────────── */
const BANNER_COUNT = BANNER_IMAGES.length;

const groceryTiles = [
  { id: 'pulses', label: 'Pulses', img: pulseImg, bg: '#FAF0E6', color: '#F8A44C' },
  { id: 'rice',   label: 'Rice',   img: riceImg,  bg: '#EAF5EE', color: '#53b175' },
];

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { isLoading, loadProducts } = useProductStore();
  const userLocation = useAuthStore((s) => s.user?.location ?? 'Select Location');

  const [banner, setBanner] = useState(0);

  useEffect(() => { loadProducts(); }, [loadProducts]);
  useEffect(() => {
    const t = setInterval(() => setBanner((p) => (p + 1) % BANNER_COUNT), 3500);
    return () => clearInterval(t);
  }, []);

  const exclusiveOffers = allProducts.filter((p) => p.discount);
  const bestSelling    = allProducts.filter((p) => p.rating >= 4.6).slice(0, 8);
  const groceryGrid    = allProducts.filter((p) =>
    ['meat', 'pulses', 'rice', 'vegetables'].includes(p.category)
  ).slice(0, 8);

  return (
    <AppLayout>
      {/* ── MOBILE LAYOUT (unchanged) ──────────────────── */}
      <div className="lg:hidden pb-28 bg-white min-h-screen">

        {/* ── Header ───────────────────────── */}
        <div className="flex flex-col items-center pt-12 pb-4 px-5 bg-white">
          {/* Carrot logo */}
          <img
            src={logoSvg}
            alt="Nectar"
            className="w-[28px] h-[32px] mb-2"
            style={{ filter: 'invert(55%) sepia(60%) saturate(600%) hue-rotate(95deg) brightness(90%)' }}
          />
          {/* Location */}
          <button
            onClick={() => navigate('/location')}
            className="flex items-center gap-1.5 cursor-pointer"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#181725" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span className="text-[#181725] font-semibold text-[18px]">{userLocation}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#181725" strokeWidth="2.5" strokeLinecap="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>

        {/* ── Search Bar ───────────────────────── */}
        <div className="px-5 pb-5">
          <button
            onClick={() => navigate('/search')}
            className="w-full flex items-center gap-3 bg-[#F2F3F2] rounded-[15px] px-4 py-[14px] cursor-pointer"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7c7c7c" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span className="text-[#7c7c7c] text-[14px] font-semibold">Search Store</span>
          </button>
        </div>

        {/* ── Banner Carousel ───────────────────── */}
        <div className="px-5 mb-6">
          <div className="rounded-[15px] overflow-hidden h-[115px] relative">
            {BANNER_IMAGES.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`banner ${i + 1}`}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${i === banner ? 'opacity-100' : 'opacity-0'}`}
              />
            ))}
          </div>
          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-2.5">
            {Array.from({ length: BANNER_COUNT }).map((_, i) => (
              <button
                key={i}
                onClick={() => setBanner(i)}
                className={`rounded-full transition-all duration-300 cursor-pointer ${
                  i === banner ? 'w-5 h-[6px] bg-[#53b175]' : 'w-[6px] h-[6px] bg-[#c8c8c8]'
                }`}
              />
            ))}
          </div>
        </div>

        {/* ── Exclusive Offer ────────────────────── */}
        <Section
          title="Exclusive Offer"
          onSeeAll={() => navigate('/category/exclusive-offer')}
        >
          <div className="flex gap-3 overflow-x-auto pb-1 px-5 scrollbar-hide">
            {isLoading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="w-[174px] flex-shrink-0"><SkeletonCard /></div>
                ))
              : exclusiveOffers.map((p) => <HomeProductCard key={p.id} product={p} />)
            }
          </div>
        </Section>

        {/* ── Best Selling ──────────────────────── */}
        <Section
          title="Best Selling"
          onSeeAll={() => navigate('/category/best-selling')}
        >
          <div className="flex gap-3 overflow-x-auto pb-1 px-5 scrollbar-hide">
            {isLoading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="w-[174px] flex-shrink-0"><SkeletonCard /></div>
                ))
              : bestSelling.map((p) => <HomeProductCard key={p.id} product={p} />)
            }
          </div>
        </Section>

        {/* ── Groceries ────────────────────────── */}
        <Section
          title="Groceries"
          onSeeAll={() => navigate('/category/groceries')}
        >
          {/* Category tiles */}
          <div className="flex gap-3 overflow-x-auto pb-1 px-5 scrollbar-hide mb-4">
            {groceryTiles.map((tile) => (
              <button
                key={tile.id}
                onClick={() => navigate(`/category/${tile.id}`)}
                className="flex items-center gap-3 rounded-[18px] px-4 flex-shrink-0 cursor-pointer active:opacity-80 transition-opacity"
                style={{ backgroundColor: tile.bg, height: '100px', minWidth: '174px' }}
              >
                <img src={tile.img} alt={tile.label} className="w-[70px] h-[70px] object-contain" />
                <span className="text-[#3E423F] font-bold text-[18px]">{tile.label}</span>
              </button>
            ))}
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-2 gap-3 px-5">
            {isLoading
              ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
              : groceryGrid.slice(0, 4).map((p) => <GridProductCard key={p.id} product={p} />)
            }
          </div>
        </Section>

      </div>

      {/* ── DESKTOP LAYOUT ────────────────────────────────── */}
      <div className="hidden lg:block bg-[#f2f3f2] min-h-screen pb-12">
        <div className="max-w-7xl mx-auto px-8 pt-6">

          {/* Desktop Banner */}
          <div className="rounded-[18px] overflow-hidden h-[220px] mb-8 relative">
            {BANNER_IMAGES.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`banner ${i + 1}`}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${i === banner ? 'opacity-100' : 'opacity-0'}`}
              />
            ))}
            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
              {Array.from({ length: BANNER_COUNT }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setBanner(i)}
                  className={`rounded-full transition-all duration-300 cursor-pointer ${
                    i === banner ? 'w-5 h-[6px] bg-green-500' : 'w-[6px] h-[6px] bg-green-500/50'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Exclusive Offer */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-[#181725] font-bold text-[24px]">Exclusive Offer</h2>
              <button
                onClick={() => navigate('/category/exclusive-offer')}
                className="text-[#53b175] font-semibold text-[16px] cursor-pointer hover:underline"
              >
                See all
              </button>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {isLoading
                ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
                : exclusiveOffers.slice(0, 4).map((p) => <DesktopProductCard key={p.id} product={p} />)
              }
            </div>
          </div>

          {/* Best Selling */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-[#181725] font-bold text-[24px]">Best Selling</h2>
              <button
                onClick={() => navigate('/category/best-selling')}
                className="text-[#53b175] font-semibold text-[16px] cursor-pointer hover:underline"
              >
                See all
              </button>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {isLoading
                ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
                : bestSelling.slice(0, 4).map((p) => <DesktopProductCard key={p.id} product={p} />)
              }
            </div>
          </div>

          {/* Groceries */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-[#181725] font-bold text-[24px]">Groceries</h2>
              <button
                onClick={() => navigate('/category/groceries')}
                className="text-[#53b175] font-semibold text-[16px] cursor-pointer hover:underline"
              >
                See all
              </button>
            </div>
            {/* Category tiles row */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {groceryTiles.map((tile) => (
                <button
                  key={tile.id}
                  onClick={() => navigate(`/category/${tile.id}`)}
                  className="flex items-center gap-4 rounded-[18px] px-6 cursor-pointer active:opacity-80 hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: tile.bg, height: '110px' }}
                >
                  <img src={tile.img} alt={tile.label} className="w-[80px] h-[80px] object-contain" />
                  <span className="text-[#3E423F] font-bold text-[20px]">{tile.label}</span>
                </button>
              ))}
            </div>
            {/* Product grid */}
            <div className="grid grid-cols-4 gap-4">
              {isLoading
                ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
                : groceryGrid.slice(0, 4).map((p) => <DesktopProductCard key={p.id} product={p} />)
              }
            </div>
          </div>

        </div>
      </div>
    </AppLayout>
  );
};

/* ─── Section wrapper (mobile only) ─────────────────────────── */
const Section: React.FC<{
  title: string;
  onSeeAll: () => void;
  children: React.ReactNode;
}> = ({ title, onSeeAll, children }) => (
  <div className="mb-6">
    <div className="flex items-center justify-between px-5 mb-3">
      <h2 className="text-[#181725] font-bold text-[22px]">{title}</h2>
      <button onClick={onSeeAll} className="text-[#53b175] font-semibold text-[16px] cursor-pointer">
        See all
      </button>
    </div>
    {children}
  </div>
);

export default Home;
