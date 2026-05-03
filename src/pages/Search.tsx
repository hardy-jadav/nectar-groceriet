import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { products as allProducts } from '../data/products';
import type { Product } from '../types';
import AppLayout from '../components/layout/AppLayout';
import { useCartStore } from '../stores/cartStore';
import { useFilterStore, CATEGORY_TO_PRODUCT_CATEGORIES, BRAND_KEYWORD_MAP } from '../stores/filterStore';

/* ─── Search Product Card ───────────────────────────────────── */
const SearchProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const navigate = useNavigate();
  const addToCart = useCartStore((s) => s.addToCart);

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="bg-white rounded-[18px] border border-[#e2e2e2] p-4 flex flex-col cursor-pointer hover:shadow-md transition-shadow"
    >
      {/* Image */}
      <div className="w-full h-[120px] flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="max-h-full max-w-full object-contain"
        />
      </div>
      {/* Name */}
      <p className="font-bold text-[15px] text-[#181725] mt-3 leading-tight line-clamp-2">
        {product.name}
      </p>
      {/* Unit */}
      <p className="text-[#7c7c7c] text-[12px] mt-0.5">{product.unit}</p>
      {/* Price + Add button */}
      <div className="flex items-center justify-between mt-3">
        <span className="font-bold text-[18px] text-[#181725]">
          ${product.price.toFixed(2)}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product);
          }}
          className="bg-[#53b175] rounded-[12px] w-[45px] h-[45px] flex items-center justify-center cursor-pointer active:opacity-80 transition-opacity flex-shrink-0"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

/* ─── Search Page ───────────────────────────────────────────── */
const Search: React.FC = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const { selectedCategories, selectedBrands, clearFilters, hasActiveFilters } = useFilterStore();

  // Debounce only the text input
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(timer);
  }, [query]);

  // Results computed synchronously — filter changes apply instantly on remount
  const results = useMemo(() => {
    let pool = allProducts;

    if (debouncedQuery.trim()) {
      const q = debouncedQuery.toLowerCase();
      pool = pool.filter(
        (p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
      );
    }

    if (selectedCategories.length > 0) {
      pool = pool.filter((p) =>
        selectedCategories.some((cat) => {
          const productCats = CATEGORY_TO_PRODUCT_CATEGORIES[cat] ?? [];
          return productCats.includes(p.category);
        })
      );
    }

    if (selectedBrands.length > 0) {
      pool = pool.filter((p) =>
        selectedBrands.some((brand) => {
          const keywords = BRAND_KEYWORD_MAP[brand] ?? [];
          return keywords.some((kw) => p.name.toLowerCase().includes(kw));
        })
      );
    }

    return pool;
  }, [debouncedQuery, selectedCategories, selectedBrands]);

  const activeFilters = hasActiveFilters();

  return (
    <AppLayout>
      {/* ── MOBILE LAYOUT (unchanged) ──────────────────── */}
      <div className="lg:hidden pb-28 bg-white min-h-screen">
        {/* Top bar */}
        <div className="pt-14 px-5 pb-4 bg-white">
          <div className="flex items-center gap-3">
            {/* Search input */}
            <div className="flex-1 flex items-center gap-3 bg-[#F2F3F2] rounded-[15px] px-4 py-[14px]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7c7c7c" strokeWidth="2" strokeLinecap="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search Store"
                autoFocus
                className="flex-1 outline-none text-[14px] text-[#181725] placeholder-[#7c7c7c] bg-transparent font-semibold"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="w-6 h-6 bg-[#b3b3b3] rounded-full flex items-center justify-center cursor-pointer flex-shrink-0"
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              )}
            </div>
            {/* Filter icon — navigate to /filters */}
            <div className="ml-1 flex items-center gap-1 flex-shrink-0">
              <button
                onClick={() => navigate('/filters')}
                className="relative w-10 h-10 flex items-center justify-center cursor-pointer"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={activeFilters ? '#53b175' : '#181725'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="4" y1="6" x2="20" y2="6" />
                  <line x1="8" y1="12" x2="16" y2="12" />
                  <line x1="11" y1="18" x2="13" y2="18" />
                </svg>
                {activeFilters && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#53b175] rounded-full" />
                )}
              </button>
              {activeFilters && (
                <button
                  onClick={clearFilters}
                  className="text-[11px] text-[#53b175] font-semibold cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 gap-4 px-5 pb-28">
          {results.map((product) => (
            <SearchProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* ── DESKTOP LAYOUT ────────────────────────────────── */}
      <div className="hidden lg:block bg-[#f2f3f2] min-h-screen pb-12">
        <div className="max-w-7xl mx-auto px-8 pt-6">
          {/* Search header row */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 max-w-2xl flex items-center bg-white rounded-[15px] px-5 py-4 gap-3 border border-[#e2e2e2]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7c7c7c" strokeWidth="2" strokeLinecap="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search Store"
                autoFocus
                className="flex-1 outline-none text-[15px] text-[#181725] placeholder-[#7c7c7c] bg-transparent font-semibold"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="w-6 h-6 bg-[#b3b3b3] rounded-full flex items-center justify-center cursor-pointer flex-shrink-0"
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              )}
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => navigate('/filters')}
                className={`flex items-center gap-2 bg-white rounded-[15px] px-5 py-4 cursor-pointer hover:shadow-sm transition-shadow border ${activeFilters ? 'border-[#53b175]' : 'border-[#e2e2e2]'}`}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={activeFilters ? '#53b175' : '#181725'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="4" y1="6" x2="20" y2="6" />
                  <line x1="8" y1="12" x2="16" y2="12" />
                  <line x1="11" y1="18" x2="13" y2="18" />
                </svg>
                <span className={`font-semibold text-[15px] ${activeFilters ? 'text-[#53b175]' : 'text-[#181725]'}`}>
                  Filters{activeFilters ? ` (${selectedCategories.length + selectedBrands.length})` : ''}
                </span>
              </button>
              {activeFilters && (
                <button
                  onClick={clearFilters}
                  className="text-[13px] text-[#7c7c7c] font-semibold cursor-pointer hover:text-[#181725] transition-colors"
                >
                  Clear all
                </button>
              )}
            </div>
          </div>

          {/* Results count */}
          {(debouncedQuery || activeFilters) && (
            <p className="text-[#7c7c7c] text-[14px] mb-4">
              {results.length} result{results.length !== 1 ? 's' : ''}
              {debouncedQuery ? ` for "${debouncedQuery}"` : ''}
              {activeFilters ? ' (filtered)' : ''}
            </p>
          )}

          {/* 4-col grid */}
          <div className="grid grid-cols-3 gap-4 xl:grid-cols-4">
            {results.map((product) => (
              <SearchProductCard key={product.id} product={product} />
            ))}
          </div>

          {results.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#e2e2e2" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <p className="font-bold text-[20px] text-[#181725] mt-6">No results found</p>
              <p className="text-[#7c7c7c] text-[15px] mt-2">Try searching with different keywords</p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default Search;
