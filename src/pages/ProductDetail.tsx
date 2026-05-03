import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products as allProducts } from '../data/products';
import { useCartStore } from '../stores/cartStore';
import { useFavoriteStore } from '../stores/favoriteStore';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const addToCart = useCartStore((state) => state.addToCart);
  const { addFavorite, removeFavorite, isFavorite } = useFavoriteStore();
  const [quantity, setQuantity] = useState(1);
  const [detailOpen, setDetailOpen] = useState(true);

  const product = allProducts.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <p className="text-[#7c7c7c] mb-4">Product not found</p>
        <button
          onClick={() => navigate('/home')}
          className="bg-[#53b175] text-white px-6 py-3 rounded-[19px] font-semibold cursor-pointer"
        >
          Go Home
        </button>
      </div>
    );
  }

  const favorite = isFavorite(product.id);

  const handleToggleFavorite = () => {
    if (favorite) {
      removeFavorite(product.id);
    } else {
      addFavorite(product);
    }
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    navigate(-1);
  };

  return (
    <>
      {/* ── MOBILE LAYOUT (unchanged) ──────────────────── */}
      <div className="lg:hidden flex flex-col min-h-screen bg-white relative max-w-[414px] mx-auto">
        {/* Top gray section */}
        <div className="bg-[#F2F3F2] relative flex flex-col" style={{ minHeight: '45vh' }}>
          {/* Top bar: back + share */}
          <div className="flex items-center justify-between px-5 pt-12 pb-4">
            <button
              onClick={() => navigate(-1)}
              className="w-9 h-9 flex items-center justify-center cursor-pointer"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#181725" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            {/* Share icon (right) */}
            <button className="w-9 h-9 flex items-center justify-center cursor-pointer">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#181725" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8"/>
                <polyline points="16 6 12 2 8 6"/>
                <line x1="12" y1="2" x2="12" y2="15"/>
              </svg>
            </button>
          </div>

          {/* Product image */}
          <div className="flex-1 flex items-center justify-center px-8 py-4">
            <img
              src={product.image}
              alt={product.name}
              className="object-contain"
              style={{ maxHeight: '80%', maxWidth: '80%', height: '160px' }}
            />
          </div>

          {/* Pagination dots */}
          <div className="flex items-center justify-center gap-2 pb-5">
            <div className="w-5 h-1.5 bg-[#53b175] rounded-full" />
            <div className="w-1.5 h-1.5 bg-[#c8c8c8] rounded-full" />
            <div className="w-1.5 h-1.5 bg-[#c8c8c8] rounded-full" />
          </div>
        </div>

        {/* Bottom white section */}
        <div className="bg-white rounded-t-[30px] -mt-5 relative z-10 flex-1 px-5 pt-7 pb-32">
          {/* Name + Favourite heart */}
          <div className="flex items-start justify-between mb-1">
            <h1 className="font-bold text-[22px] text-[#181725] leading-tight flex-1 pr-4">
              {product.name}
            </h1>
            {/* Heart / Favourite button */}
            <button
              onClick={handleToggleFavorite}
              className="w-9 h-9 flex items-center justify-center flex-shrink-0 cursor-pointer mt-0.5"
              aria-label={favorite ? 'Remove from favourites' : 'Add to favourites'}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill={favorite ? '#53b175' : 'none'}
                stroke={favorite ? '#53b175' : '#b3b3b3'}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
              </svg>
            </button>
          </div>

          {/* Unit */}
          <p className="text-[14px] text-[#7c7c7c] mb-5">{product.unit}</p>

          {/* Quantity row */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-9 h-9 flex items-center justify-center cursor-pointer"
              >
                <span className="text-[#b3b3b3] text-[24px] font-light leading-none">—</span>
              </button>
              <div className="w-10 h-10 rounded-full border-2 border-[#e2e2e2] flex items-center justify-center">
                <span className="font-semibold text-[#181725] text-[16px]">{quantity}</span>
              </div>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-9 h-9 flex items-center justify-center cursor-pointer"
              >
                <span className="text-[#53b175] text-[24px] font-light leading-none">+</span>
              </button>
            </div>
            <span className="font-bold text-[22px] text-[#181725]">
              ${(product.price * quantity).toFixed(2)}
            </span>
          </div>

          {/* Divider */}
          <div className="h-px bg-[#e2e2e2] mb-4" />

          {/* Product Detail accordion */}
          <div>
            <button
              onClick={() => setDetailOpen((o) => !o)}
              className="w-full flex items-center justify-between py-1 cursor-pointer"
            >
              <span className="font-bold text-[16px] text-[#181725]">Product Detail</span>
              <svg
                width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="#181725" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className={`transition-transform duration-200 ${detailOpen ? 'rotate-180' : ''}`}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {detailOpen && (
              <p className="text-[#7c7c7c] text-[13px] leading-relaxed mt-2 mb-4">
                {product.description}
              </p>
            )}
          </div>

          {/* Divider */}
          <div className="h-px bg-[#e2e2e2] mb-4" />

          {/* Nutritions row */}
          <div className="flex items-center justify-between py-1 mb-4">
            <span className="font-bold text-[16px] text-[#181725]">Nutritions</span>
            <div className="flex items-center gap-2">
              <span className="bg-[#F2F3F2] text-[#181725] text-xs px-2 py-0.5 rounded font-medium">100gr</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#181725" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-[#e2e2e2] mb-4" />

          {/* Review row */}
          <div className="flex items-center justify-between py-1">
            <span className="font-bold text-[16px] text-[#181725]">Review</span>
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {Array.from({ length: 4 }).map((_, i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#F8A44C" stroke="#F8A44C" strokeWidth="1">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#181725" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
          </div>
        </div>

        {/* Add To Basket — fixed bottom */}
        <div className="fixed bottom-0 left-0 right-0 px-5 pb-8 pt-4 bg-white z-20 max-w-[414px] mx-auto">
          <button
            onClick={handleAddToCart}
            className="w-full bg-[#53b175] text-white font-bold text-[18px] rounded-[19px] py-[18px] cursor-pointer active:opacity-90 transition-opacity"
          >
            Add To Basket
          </button>
        </div>
      </div>

      {/* ── DESKTOP: Modal overlay ──────────────────────── */}
      <div className="hidden lg:flex fixed inset-0 z-50 items-center justify-center bg-black/40 backdrop-blur-sm p-8">
        <div className="bg-white rounded-[24px] w-full max-w-4xl flex overflow-hidden shadow-2xl max-h-[90vh]">
          {/* Left: product image section */}
          <div className="w-[45%] bg-[#F2F3F2] flex flex-col items-center justify-center p-10 relative flex-shrink-0">
            {/* Back/close button */}
            <button
              onClick={() => navigate(-1)}
              className="absolute top-5 left-5 w-10 h-10 flex items-center justify-center rounded-full border border-[#e2e2e2] bg-white cursor-pointer hover:bg-gray-50"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#181725" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            {/* Share button */}
            <button className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center rounded-full border border-[#e2e2e2] bg-white cursor-pointer hover:bg-gray-50">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#181725" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8"/>
                <polyline points="16 6 12 2 8 6"/>
                <line x1="12" y1="2" x2="12" y2="15"/>
              </svg>
            </button>
            {/* Product image */}
            <img
              src={product.image}
              alt={product.name}
              className="w-[280px] h-[280px] object-contain"
            />
            {/* Dots */}
            <div className="flex items-center gap-2 mt-6">
              <div className="w-5 h-1.5 bg-[#53b175] rounded-full" />
              <div className="w-1.5 h-1.5 bg-[#c8c8c8] rounded-full" />
              <div className="w-1.5 h-1.5 bg-[#c8c8c8] rounded-full" />
            </div>
          </div>

          {/* Right: product info */}
          <div className="flex-1 flex flex-col overflow-y-auto p-8">
            {/* Name + heart */}
            <div className="flex items-start justify-between mb-1">
              <h1 className="font-bold text-[26px] text-[#181725] leading-tight flex-1 pr-4">
                {product.name}
              </h1>
              <button
                onClick={handleToggleFavorite}
                className="w-10 h-10 flex items-center justify-center flex-shrink-0 cursor-pointer mt-0.5"
                aria-label={favorite ? 'Remove from favourites' : 'Add to favourites'}
              >
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill={favorite ? '#53b175' : 'none'}
                  stroke={favorite ? '#53b175' : '#b3b3b3'}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                </svg>
              </button>
            </div>

            {/* Unit */}
            <p className="text-[#7c7c7c] text-[15px] mb-6">{product.unit}</p>

            {/* Quantity + price row */}
            <div className="flex items-center justify-between mb-6 pb-6 border-b border-[#e2e2e2]">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center cursor-pointer border border-[#e2e2e2] rounded-full hover:bg-gray-50"
                >
                  <span className="text-[#b3b3b3] text-[22px] font-light leading-none">—</span>
                </button>
                <div className="w-12 h-12 rounded-full border-2 border-[#e2e2e2] flex items-center justify-center">
                  <span className="font-semibold text-[18px] text-[#181725]">{quantity}</span>
                </div>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-10 h-10 flex items-center justify-center cursor-pointer border border-[#53b175] rounded-full hover:bg-[#f0faf4]"
                >
                  <span className="text-[#53b175] text-[24px] font-light leading-none">+</span>
                </button>
              </div>
              <span className="font-bold text-[28px] text-[#181725]">
                ${(product.price * quantity).toFixed(2)}
              </span>
            </div>

            {/* Product Detail accordion */}
            <div className="mb-4">
              <button
                onClick={() => setDetailOpen((o) => !o)}
                className="w-full flex items-center justify-between py-1 cursor-pointer"
              >
                <span className="font-bold text-[16px] text-[#181725]">Product Detail</span>
                <svg
                  width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="#181725" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  className={`transition-transform duration-200 ${detailOpen ? 'rotate-180' : ''}`}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {detailOpen && (
                <p className="text-[#7c7c7c] text-[13px] leading-relaxed mt-2">
                  {product.description}
                </p>
              )}
            </div>

            {/* Divider */}
            <div className="h-px bg-[#e2e2e2] mb-4" />

            {/* Nutritions row */}
            <div className="flex items-center justify-between py-1 mb-4">
              <span className="font-bold text-[16px] text-[#181725]">Nutritions</span>
              <div className="flex items-center gap-2">
                <span className="bg-[#F2F3F2] text-[#181725] text-xs px-2 py-0.5 rounded font-medium">100gr</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#181725" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-[#e2e2e2] mb-4" />

            {/* Review row */}
            <div className="flex items-center justify-between py-1 mb-6">
              <span className="font-bold text-[16px] text-[#181725]">Review</span>
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#F8A44C" stroke="#F8A44C" strokeWidth="1">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#181725" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </div>
            </div>

            {/* Add To Basket button */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-[#53b175] text-white font-bold text-[18px] rounded-[19px] py-5 mt-auto cursor-pointer hover:bg-[#44a367] transition-colors"
            >
              Add To Basket
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
