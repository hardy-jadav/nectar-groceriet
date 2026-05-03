import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFilterStore } from '../stores/filterStore';

const CATEGORIES = ['Fruits', 'Vegetables', 'Meat', 'Beverages', 'Dairy & Eggs', 'Snacks', 'Rice', 'Pulses'];
const BRANDS = ['Individual Collection', 'Cocola', 'Ifad', 'Kazi Farmas'];

const CheckboxRow: React.FC<{
  label: string;
  checked: boolean;
  onToggle: () => void;
}> = ({ label, checked, onToggle }) => (
  <div className="flex items-center gap-4 cursor-pointer py-1" onClick={onToggle}>
    {checked ? (
      <div className="bg-[#53b175] rounded-[6px] w-6 h-6 flex items-center justify-center flex-shrink-0">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
    ) : (
      <div className="border-2 border-[#e2e2e2] rounded-[6px] w-6 h-6 bg-white flex-shrink-0" />
    )}
    <span className={`text-[16px] ${checked ? 'text-[#53b175]' : 'text-[#181725]'}`}>
      {label}
    </span>
  </div>
);

const Filters: React.FC = () => {
  const navigate = useNavigate();
  const { selectedCategories, selectedBrands, setFilters } = useFilterStore();

  const [localCats, setLocalCats] = useState<string[]>(selectedCategories);
  const [localBrands, setLocalBrands] = useState<string[]>(selectedBrands);

  const toggle = (list: string[], item: string) =>
    list.includes(item) ? list.filter((x) => x !== item) : [...list, item];

  const handleApply = () => {
    setFilters(localCats, localBrands);
    navigate(-1);
  };

  return (
    <>
      {/* ── MOBILE ──────────────────────────────────────── */}
      <div className="lg:hidden min-h-screen bg-[#F2F3F2] max-w-[414px] mx-auto relative pb-32">
        {/* Header */}
        <div className="flex items-center pt-14 pb-4 px-5">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 flex items-center justify-center cursor-pointer text-[#181725] text-[26px] leading-none"
          >
            ×
          </button>
          <h1 className="flex-1 text-center font-bold text-[20px] text-[#181725]">Filters</h1>
          <div className="w-9" />
        </div>

        {/* White card */}
        <div className="bg-white rounded-[18px] mx-4 mt-2 px-5 py-6">
          <h2 className="font-bold text-[22px] text-[#181725] mb-5">Categories</h2>
          <div className="flex flex-col gap-5">
            {CATEGORIES.map((cat) => (
              <CheckboxRow
                key={cat}
                label={cat}
                checked={localCats.includes(cat)}
                onToggle={() => setLocalCats((prev) => toggle(prev, cat))}
              />
            ))}
          </div>

          <h2 className="font-bold text-[22px] text-[#181725] mt-8 mb-5">Brand</h2>
          <div className="flex flex-col gap-5">
            {BRANDS.map((brand) => (
              <CheckboxRow
                key={brand}
                label={brand}
                checked={localBrands.includes(brand)}
                onToggle={() => setLocalBrands((prev) => toggle(prev, brand))}
              />
            ))}
          </div>
        </div>

        {/* Apply button */}
        <div className="fixed bottom-0 left-0 right-0 max-w-[414px] mx-auto px-5 pb-10">
          <button
            onClick={handleApply}
            className="w-full bg-[#53b175] text-white text-[18px] font-semibold py-[18px] rounded-[19px] cursor-pointer active:opacity-80 transition-opacity"
          >
            Apply Filter
          </button>
        </div>
      </div>

      {/* ── DESKTOP: centered dialog ────────────────────── */}
      <div className="hidden lg:flex fixed inset-0 z-50 items-center justify-center bg-black/40 backdrop-blur-sm p-8">
        <div className="bg-white rounded-[24px] w-full max-w-lg shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-8 py-6 border-b border-[#e2e2e2]">
            <h1 className="font-bold text-[22px] text-[#181725]">Filters</h1>
            <button
              onClick={() => navigate(-1)}
              className="w-9 h-9 flex items-center justify-center text-[#181725] text-[24px] cursor-pointer hover:bg-gray-100 rounded-full leading-none"
            >
              ×
            </button>
          </div>

          {/* Scrollable body */}
          <div className="px-8 py-6 max-h-[60vh] overflow-y-auto">
            <h2 className="font-bold text-[18px] text-[#181725] mb-4">Categories</h2>
            <div className="flex flex-col gap-4 mb-6">
              {CATEGORIES.map((cat) => (
                <CheckboxRow
                  key={cat}
                  label={cat}
                  checked={localCats.includes(cat)}
                  onToggle={() => setLocalCats((prev) => toggle(prev, cat))}
                />
              ))}
            </div>

            <h2 className="font-bold text-[18px] text-[#181725] mb-4">Brand</h2>
            <div className="flex flex-col gap-4">
              {BRANDS.map((brand) => (
                <CheckboxRow
                  key={brand}
                  label={brand}
                  checked={localBrands.includes(brand)}
                  onToggle={() => setLocalBrands((prev) => toggle(prev, brand))}
                />
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="px-8 pb-8">
            <button
              onClick={handleApply}
              className="w-full bg-[#53b175] text-white text-[17px] font-semibold py-[16px] rounded-[19px] cursor-pointer hover:bg-[#44a367] transition-colors"
            >
              Apply Filter
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Filters;
