import { create } from 'zustand';

interface FilterStore {
  selectedCategories: string[];
  selectedBrands: string[];
  setFilters: (categories: string[], brands: string[]) => void;
  clearFilters: () => void;
  hasActiveFilters: () => boolean;
}

export const useFilterStore = create<FilterStore>((set, get) => ({
  selectedCategories: [],
  selectedBrands: [],
  setFilters: (categories, brands) =>
    set({ selectedCategories: categories, selectedBrands: brands }),
  clearFilters: () => set({ selectedCategories: [], selectedBrands: [] }),
  hasActiveFilters: () => {
    const { selectedCategories, selectedBrands } = get();
    return selectedCategories.length > 0 || selectedBrands.length > 0;
  },
}));

// Maps filter display label → actual ProductCategory value(s)
export const CATEGORY_TO_PRODUCT_CATEGORIES: Record<string, string[]> = {
  'Fruits':       ['fruits'],
  'Vegetables':   ['vegetables'],
  'Meat':         ['meat'],
  'Beverages':    ['beverages'],
  'Dairy & Eggs': ['dairy'],
  'Snacks':       ['snacks'],
  'Rice':         ['rice'],
  'Pulses':       ['pulses'],
};

// Maps brand display label → keywords matched against product name (no brand field on Product)
export const BRAND_KEYWORD_MAP: Record<string, string[]> = {
  'Individual Collection': ['organic'],
  'Cocola':                ['cola', 'coke', 'pepsi', 'sprite'],
  'Ifad':                  ['juice'],
  'Kazi Farmas':           ['chicken', 'egg'],
};
