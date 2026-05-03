import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFavoriteStore } from '../stores/favoriteStore';
import { useCartStore } from '../stores/cartStore';
import AppLayout from '../components/layout/AppLayout';

const Favorites: React.FC = () => {
  const navigate = useNavigate();
  const { favorites, removeFavorite } = useFavoriteStore();
  const { addToCart, items, updateQuantity } = useCartStore();

  const addAllToCart = () => {
    favorites.forEach((product) => {
      const existing = items.find((i) => i.product.id === product.id);
      if (existing) {
        updateQuantity(product.id, 1);
      } else {
        addToCart(product);
      }
    });
  };

  return (
    <AppLayout>
      {/* ── MOBILE LAYOUT (unchanged) ──────────────────── */}
      <div className="lg:hidden bg-white min-h-screen pb-32">
        {/* Header */}
        <div className="pt-14 pb-4 flex items-center justify-center">
          <h1 className="font-bold text-[20px] text-[#181725]">Favourite</h1>
        </div>
        <div className="border-b border-[#e2e2e2]" />

        {favorites.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-20 px-8">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#e2e2e2" strokeWidth="1.5">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
            </svg>
            <p className="font-bold text-[18px] text-[#181725] mt-6">No favourites yet</p>
            <p className="text-[#7c7c7c] text-[14px] mt-2 text-center">Add products to your favourites while shopping</p>
            <button
              onClick={() => navigate('/home')}
              className="mt-6 bg-[#53b175] text-white font-semibold text-[16px] px-8 py-[14px] rounded-[19px] cursor-pointer"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <>
            {/* Favorites list */}
            <div className="overflow-y-auto">
              {favorites.map((product) => (
                <div
                  key={product.id}
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="flex items-center gap-4 px-5 py-5 border-b border-[#e2e2e2] cursor-pointer"
                >
                  {/* Product image */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-[60px] h-[60px] object-contain flex-shrink-0"
                  />
                  {/* Center info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-[16px] text-[#181725] truncate">{product.name}</p>
                    <p className="text-[#7c7c7c] text-[13px] mt-0.5">{product.unit}</p>
                  </div>
                  {/* Right side: price + chevron */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="font-bold text-[18px] text-[#181725]">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="text-[#7c7c7c] text-[18px]">›</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Fixed bottom: Add All To Cart */}
            <div className="fixed bottom-0 left-0 right-0 max-w-[414px] mx-auto pb-24 px-5 bg-white pt-4">
              <button
                onClick={addAllToCart}
                className="w-full bg-[#53b175] text-white font-semibold text-[18px] py-[18px] rounded-[19px] cursor-pointer"
              >
                Add All To Cart
              </button>
            </div>
          </>
        )}
      </div>

      {/* ── DESKTOP LAYOUT ────────────────────────────────── */}
      <div className="hidden lg:block bg-[#f2f3f2] min-h-screen pb-12">
        <div className="max-w-7xl mx-auto px-8 pt-8">
          {/* Header row */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="font-bold text-[28px] text-[#181725]">Favourite</h1>
            {favorites.length > 0 && (
              <button
                onClick={addAllToCart}
                className="flex items-center gap-2 bg-[#53b175] text-white font-semibold text-[15px] px-6 py-3 rounded-[12px] cursor-pointer hover:bg-[#44a367] transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                Add All To Cart
              </button>
            )}
          </div>

          {favorites.length === 0 ? (
            /* Empty state */
            <div className="bg-white rounded-[18px] shadow-sm flex flex-col items-center justify-center py-20 px-8">
              <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="#e2e2e2" strokeWidth="1.5">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
              </svg>
              <p className="font-bold text-[22px] text-[#181725] mt-8">No favourites yet</p>
              <p className="text-[#7c7c7c] text-[15px] mt-2 text-center">Add products to your favourites while shopping</p>
              <button
                onClick={() => navigate('/home')}
                className="mt-8 bg-[#53b175] text-white font-semibold text-[17px] px-10 py-[16px] rounded-[19px] cursor-pointer hover:bg-[#44a367] transition-colors"
              >
                Browse Products
              </button>
            </div>
          ) : (
            /* Product grid */
            <div className="grid grid-cols-3 xl:grid-cols-4 gap-4">
              {favorites.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-[18px] shadow-sm border border-[#e2e2e2] p-4 flex flex-col cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  {/* Image */}
                  <div className="w-full h-[140px] flex items-center justify-center relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-h-full max-w-full object-contain"
                    />
                    {/* Heart/remove icon */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFavorite(product.id);
                      }}
                      className="absolute top-0 right-0 w-8 h-8 flex items-center justify-center rounded-full bg-white border border-[#e2e2e2] cursor-pointer hover:bg-red-50 transition-colors"
                      aria-label="Remove from favourites"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="#53b175" stroke="#53b175" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                      </svg>
                    </button>
                  </div>

                  {/* Name */}
                  <p className="font-bold text-[15px] text-[#181725] mt-3 leading-tight line-clamp-2">
                    {product.name}
                  </p>
                  {/* Unit */}
                  <p className="text-[#7c7c7c] text-[12px] mt-0.5">{product.unit}</p>

                  {/* Price + Add to Cart */}
                  <div className="flex items-center justify-between mt-3">
                    <span className="font-bold text-[18px] text-[#181725]">
                      ${product.price.toFixed(2)}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                      className="bg-[#53b175] rounded-[12px] w-[45px] h-[45px] flex items-center justify-center cursor-pointer hover:bg-[#44a367] transition-colors flex-shrink-0"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default Favorites;
