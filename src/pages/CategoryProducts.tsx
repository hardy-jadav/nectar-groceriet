import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products as allProducts } from '../data/products';
import { ProductCategory } from '../types';
import type { Product } from '../types';
import AppLayout from '../components/layout/AppLayout';
import { useCartStore } from '../stores/cartStore';
import { useFilterStore, CATEGORY_TO_PRODUCT_CATEGORIES, BRAND_KEYWORD_MAP } from '../stores/filterStore';

const categoryMap: Record<string, ProductCategory> = {
  vegetables: ProductCategory.Vegetables,
  fruits: ProductCategory.Fruits,
  meat: ProductCategory.Meat,
  beverages: ProductCategory.Beverages,
  pulses: ProductCategory.Pulses,
  rice: ProductCategory.Rice,
  dairy: ProductCategory.Dairy,
  snacks: ProductCategory.Snacks,
};

const categoryLabels: Record<string, string> = {
  vegetables: 'Vegetables',
  fruits: 'Fruits',
  meat: 'Meat & Fish',
  beverages: 'Beverages',
  pulses: 'Pulses',
  rice: 'Rice',
  dairy: 'Dairy & Eggs',
  snacks: 'Bakery & Snacks',
  'exclusive-offer': 'Exclusive Offer',
  'best-selling': 'Best Selling',
  groceries: 'Groceries',
};

// Returns the right product list for section-based routes
const getSectionProducts = (sectionId: string): Product[] => {
  if (sectionId === 'exclusive-offer') {
    return allProducts.filter((p) => p.discount);
  }
  if (sectionId === 'best-selling') {
    return allProducts.filter((p) => p.rating >= 4.6);
  }
  if (sectionId === 'groceries') {
    const groceryCats = [ProductCategory.Meat, ProductCategory.Pulses, ProductCategory.Rice, ProductCategory.Vegetables, ProductCategory.Dairy];
    return allProducts.filter((p) => groceryCats.includes(p.category as typeof groceryCats[number]));
  }
  return [];
};

/* ─── Inline Product Card ──────────────────────────────────── */
const CategoryProductCard: React.FC<{ product: Product }> = ({ product }) => {
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
          className="bg-[#53b175] rounded-[12px] w-[50px] h-[50px] flex items-center justify-center cursor-pointer active:opacity-80 transition-opacity flex-shrink-0"
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

/* ─── CategoryProducts Page ─────────────────────────────────── */
const CategoryProducts: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const { selectedCategories, selectedBrands, hasActiveFilters } = useFilterStore();

  const isSectionRoute = ['exclusive-offer', 'best-selling', 'groceries'].includes(categoryId ?? '');
  const mappedCategory = (!isSectionRoute && categoryId) ? categoryMap[categoryId] : undefined;

  // When category/brand filters are active, always start from all products
  // so selecting "Rice" on any page shows all Rice products
  const hasActiveCategoryOrBrand = selectedCategories.length > 0 || selectedBrands.length > 0;

  let filtered: Product[] = hasActiveCategoryOrBrand
    ? allProducts
    : isSectionRoute
      ? getSectionProducts(categoryId!)
      : mappedCategory
        ? allProducts.filter((p) => p.category === mappedCategory)
        : allProducts;

  if (filtered.length === 0) filtered = allProducts;

  // Apply category and brand filters
  if (selectedCategories.length > 0) {
    filtered = filtered.filter((p) =>
      selectedCategories.some((cat) => {
        const productCats = CATEGORY_TO_PRODUCT_CATEGORIES[cat] ?? [];
        return productCats.includes(p.category);
      })
    );
  }
  if (selectedBrands.length > 0) {
    filtered = filtered.filter((p) =>
      selectedBrands.some((brand) => {
        const keywords = BRAND_KEYWORD_MAP[brand] ?? [];
        return keywords.some((kw) => p.name.toLowerCase().includes(kw));
      })
    );
  }

  const baseTitle = categoryId ? (categoryLabels[categoryId] ?? categoryId) : 'Products';
  const title = hasActiveCategoryOrBrand
    ? `Filtered Results (${filtered.length})`
    : baseTitle;

  // Sidebar categories for desktop filter panel
  const sidebarCategoryIds = ['vegetables', 'fruits', 'meat', 'beverages', 'pulses', 'rice', 'dairy', 'snacks'];

  return (
    <AppLayout>
      {/* ── MOBILE LAYOUT (unchanged) ──────────────────── */}
      <div className="lg:hidden pb-28 bg-white min-h-screen">
        {/* Custom header */}
        <div className="flex items-center justify-between px-5 pt-12 pb-4 bg-white">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 flex items-center justify-center cursor-pointer"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#181725" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <h1 className="font-bold text-[18px] text-[#181725]">{title}</h1>
          <button
            onClick={() => navigate('/filters')}
            className="w-9 h-9 flex items-center justify-center cursor-pointer relative"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#181725" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="8" y1="12" x2="16" y2="12" />
              <line x1="11" y1="18" x2="13" y2="18" />
            </svg>
            {hasActiveFilters() && (
              <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-[#53b175] rounded-full" />
            )}
          </button>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 gap-4 px-5 pt-4 pb-28">
          {filtered.map((product) => (
            <CategoryProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* ── DESKTOP LAYOUT ────────────────────────────────── */}
      <div className="hidden lg:flex gap-6 max-w-7xl mx-auto px-8 pt-6 pb-12 items-start">
        {/* Left filter sidebar */}
        <aside className="w-64 flex-shrink-0">
          <div className="bg-white rounded-[18px] p-6 sticky top-24">
            <h3 className="font-bold text-[18px] text-[#181725] mb-4">Categories</h3>
            {sidebarCategoryIds.map((id) => (
              <button
                key={id}
                onClick={() => navigate(`/category/${id}`)}
                className={`w-full text-left px-3 py-2 rounded-lg text-[14px] font-medium mb-1 cursor-pointer transition-colors ${
                  categoryId === id
                    ? 'bg-[#53b175] text-white'
                    : 'text-[#181725] hover:bg-gray-50'
                }`}
              >
                {categoryLabels[id]}
              </button>
            ))}

            <div className="border-t border-[#e2e2e2] mt-4 pt-4">
              <h3 className="font-bold text-[18px] text-[#181725] mb-3">Price Range</h3>
              <input
                type="range"
                min="0"
                max="50"
                defaultValue="50"
                className="w-full accent-[#53b175]"
              />
              <div className="flex justify-between text-[13px] text-[#7c7c7c] mt-1">
                <span>$0</span>
                <span>$50</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/filters')}
              className="w-full mt-4 border border-[#53b175] text-[#53b175] font-semibold py-2.5 rounded-[12px] text-[14px] cursor-pointer hover:bg-[#f0faf4] transition-colors"
            >
              More Filters
            </button>
          </div>
        </aside>

        {/* Right: product grid */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <h1 className="font-bold text-[24px] text-[#181725]">{title}</h1>
            <span className="text-[#7c7c7c] text-[14px]">{filtered.length} products</span>
          </div>
          <div className="grid grid-cols-3 gap-4 xl:grid-cols-4">
            {filtered.map((product) => (
              <CategoryProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default CategoryProducts;
