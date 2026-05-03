import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import mapIllustration from '../assets/map-illustration.png';
import groceryBag from '../assets/grocery-bag.png';

const zones = ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Gandhinagar', 'Anand'];
const areasByZone: Record<string, string[]> = {
  Ahmedabad:   ['Satellite', 'Bopal', 'Prahlad Nagar', 'Navrangpura', 'Maninagar', 'Vastrapur', 'Gota', 'Chandkheda'],
  Surat:       ['Adajan', 'Athwa', 'Vesu', 'Piplod', 'Katargam', 'Udhna'],
  Vadodara:    ['Alkapuri', 'Fatehgunj', 'Gotri', 'Karelibaug', 'Manjalpur'],
  Rajkot:      ['Kalawad Road', 'Mavdi', 'Raiya Road', 'University Road', 'Bhaktinagar'],
  Gandhinagar: ['Sector 1', 'Sector 7', 'Sector 11', 'Sector 21', 'Sector 28'],
  Anand:       ['Anand Town', 'Karamsad', 'Vidyanagar', 'Vallabh Vidyanagar'],
};

const Dropdown: React.FC<{
  label: string;
  value: string;
  placeholder: string;
  options: string[];
  open: boolean;
  onToggle: () => void;
  onSelect: (v: string) => void;
}> = ({ label, value, placeholder, options, open, onToggle, onSelect }) => (
  <div className="mb-6">
    <p className="text-[#7c7c7c] text-sm mb-2">{label}</p>
    <div className="relative">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between border border-[#e2e2e2] rounded-xl px-4 py-4 bg-white text-base cursor-pointer hover:border-[#53b175] transition-colors"
      >
        <span className={value ? 'text-[#181725] font-medium' : 'text-[#c8c8c8]'}>{value || placeholder}</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7c7c7c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform ${open ? 'rotate-180' : ''}`}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <div className="absolute top-full left-0 right-0 bg-white border border-[#e2e2e2] rounded-xl mt-1 z-50 shadow-lg overflow-hidden">
          {options.map((o) => (
            <button key={o} onClick={() => onSelect(o)} className={`w-full text-left px-4 py-3 text-base transition-colors cursor-pointer ${value === o ? 'text-[#53b175] font-semibold bg-[#f0faf4]' : 'text-[#181725] hover:bg-gray-50'}`}>
              {o}
            </button>
          ))}
        </div>
      )}
    </div>
  </div>
);

const LocationSelect: React.FC = () => {
  const navigate = useNavigate();
  const setAuthenticated = useAuthStore((s) => s.setAuthenticated);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const [zone, setZone] = useState('Ahmedabad');
  const [area, setArea] = useState('');
  const [zoneOpen, setZoneOpen] = useState(false);
  const [areaOpen, setAreaOpen] = useState(false);

  const setLocation = useAuthStore((s) => s.setLocation);
  const handleSubmit = async () => {
    if (!isAuthenticated) setAuthenticated();
    setLocation(`${area ? area + ', ' : ''}${zone}`);
    navigate('/home');
  };

  return (
    <>
      {/* ── MOBILE ─────────────────────────────────────────────── */}
      <div className="lg:hidden min-h-screen max-w-[414px] mx-auto relative overflow-hidden bg-white flex flex-col">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-[#f4a9a8]/50 blur-[90px]" />
          <div className="absolute top-24 -left-20 w-64 h-64 rounded-full bg-[#a8e6be]/40 blur-[80px]" />
          <div className="absolute top-8 right-8 w-40 h-40 rounded-full bg-[#fde68a]/40 blur-[60px]" />
          <div className="absolute -bottom-20 -left-10 w-72 h-72 rounded-full bg-[#f4a9a8]/40 blur-[90px]" />
          <div className="absolute bottom-40 -right-10 w-56 h-56 rounded-full bg-[#a8d8f0]/30 blur-[70px]" />
        </div>

        <div className="relative z-10 flex-1 flex flex-col px-6 pt-14 pb-10">
          <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center rounded-full border border-[#e2e2e2] bg-white/70 mb-6 cursor-pointer">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#181725" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          <div className="flex justify-center mb-6">
            <img src={mapIllustration} alt="Select location" className="w-[160px] h-[160px] object-contain" />
          </div>
          <h2 className="text-[24px] font-bold text-[#181725] text-center mb-3">Select Your Location</h2>
          <p className="text-[#7c7c7c] text-center text-sm leading-relaxed mb-10 px-4">
            Switch on your location to stay in tune with<br />what's happening in your area
          </p>

          <Dropdown label="Your Zone" value={zone} placeholder="Select zone" options={zones} open={zoneOpen}
            onToggle={() => { setZoneOpen(!zoneOpen); setAreaOpen(false); }}
            onSelect={(v) => { setZone(v); setArea(''); setZoneOpen(false); }} />

          <Dropdown label="Your Area" value={area} placeholder="Types of your area" options={areasByZone[zone] ?? []} open={areaOpen}
            onToggle={() => { setAreaOpen(!areaOpen); setZoneOpen(false); }}
            onSelect={(v) => { setArea(v); setAreaOpen(false); }} />

          <button onClick={handleSubmit} className="w-full bg-[#53b175] text-white text-lg font-semibold py-[18px] rounded-[19px] active:opacity-80 transition-opacity cursor-pointer mt-auto">
            Submit
          </button>
        </div>
      </div>

      {/* ── DESKTOP ────────────────────────────────────────────── */}
      <div className="hidden lg:flex min-h-screen">
        {/* Left: image */}
        <div className="w-1/2 xl:w-[55%] relative overflow-hidden bg-[#F2F3F2]">
          <img src={groceryBag} alt="Fresh groceries" className="absolute inset-0 w-full h-full object-cover object-center" />
        </div>

        {/* Right: location form */}
        <div className="w-1/2 xl:w-[45%] flex flex-col items-center justify-center px-16 bg-white">
          <div className="w-full max-w-sm">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[#7c7c7c] hover:text-[#181725] mb-10 cursor-pointer transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
              <span className="text-[14px] font-medium">Back</span>
            </button>

            {/* Map illustration */}
            <div className="flex justify-center mb-6">
              <img src={mapIllustration} alt="Select location" className="w-[120px] h-[120px] object-contain" />
            </div>

            <h2 className="text-[32px] font-bold text-[#181725] text-center mb-2">Select Your Location</h2>
            <p className="text-[#7c7c7c] text-center text-[15px] leading-relaxed mb-10">
              Switch on your location to stay in tune with what's happening in your area
            </p>

            <Dropdown label="Your Zone" value={zone} placeholder="Select zone" options={zones} open={zoneOpen}
              onToggle={() => { setZoneOpen(!zoneOpen); setAreaOpen(false); }}
              onSelect={(v) => { setZone(v); setArea(''); setZoneOpen(false); }} />

            <Dropdown label="Your Area" value={area} placeholder="Types of your area" options={areasByZone[zone] ?? []} open={areaOpen}
              onToggle={() => { setAreaOpen(!areaOpen); setZoneOpen(false); }}
              onSelect={(v) => { setArea(v); setAreaOpen(false); }} />

            <button
              onClick={handleSubmit}
              className="w-full bg-[#53b175] text-white text-[18px] font-semibold py-5 rounded-[19px] hover:bg-[#44a367] transition-colors cursor-pointer shadow-lg shadow-[#53b175]/20 mt-2"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LocationSelect;
