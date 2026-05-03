import React from 'react';
import { useNavigate } from 'react-router-dom';
import heroBg from '../assets/onboarding-hero.png';
import heroBgDesktop from '../assets/onboarding-hero-Desktop.jpeg';
import logoSvg from '../assets/logo.svg';

const Onboarding: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* ── MOBILE layout ─────────────────────────────────────── */}
      <div className="lg:hidden min-h-screen max-w-[414px] mx-auto relative overflow-hidden bg-black">
        <img
          src={heroBg}
          alt="Delivery person"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-12 flex flex-col items-center">
          <img src={logoSvg} alt="Nectar" className="w-9 h-10 mb-5" />
          <h1 className="text-[32px] font-bold text-white text-center leading-tight mb-3">
            Welcome<br />to our store
          </h1>
          <p className="text-white/80 text-center text-[15px] leading-relaxed mb-8">
            Get your groceries in as fast as one hour
          </p>
          <button
            onClick={() => navigate('/auth')}
            className="w-full bg-[#53b175] text-white text-[18px] font-semibold py-[18px] rounded-[19px] transition-opacity active:opacity-80 cursor-pointer"
          >
            Get Started
          </button>
        </div>
      </div>

      {/* ── DESKTOP layout ────────────────────────────────────── */}
      <div className="hidden lg:flex min-h-screen">
        {/* Left: full-height image */}
        <div className="w-1/2 xl:w-[55%] relative overflow-hidden">
          <img
            src={heroBgDesktop}
            alt="Fresh groceries"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Subtle dark gradient on right edge for blending */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10" />
        </div>

        {/* Right: content panel */}
        <div className="w-1/2 xl:w-[45%] flex flex-col items-center justify-center px-16 bg-white relative">
          {/* Logo */}
          <div className="flex items-center gap-4 mb-12">
            <div className="w-16 h-16 bg-[#53b175] rounded-2xl flex items-center justify-center">
              <img src={logoSvg} alt="Nectar" className="w-9 h-10" />
            </div>
            <span className="text-[40px] font-bold text-[#181725]">nectar</span>
          </div>

          {/* Heading */}
          <h1 className="text-[42px] font-bold text-[#181725] text-center leading-tight mb-4">
            Welcome to<br />our store
          </h1>

          {/* Subtitle */}
          <p className="text-[#7c7c7c] text-center text-[18px] leading-relaxed mb-10 max-w-sm">
            Get your groceries delivered fresh to your door in as fast as one hour.
          </p>

          {/* CTA Button */}
          <button
            onClick={() => navigate('/auth')}
            className="w-full max-w-sm bg-[#53b175] text-white text-[20px] font-semibold py-5 rounded-[19px] hover:bg-[#44a367] transition-colors cursor-pointer shadow-lg shadow-[#53b175]/30"
          >
            Get Started
          </button>

          {/* Tagline */}
          <p className="text-[#b3b3b3] text-[14px] mt-6 tracking-widest uppercase">
            online groceries
          </p>
        </div>
      </div>
    </>
  );
};

export default Onboarding;
