import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import groceryBag from '../assets/grocery-bag.png';
import logoSvg from '../assets/logo.svg';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const setAuthenticated = useAuthStore((s) => s.setAuthenticated);
  const handleSocial = () => {
    setAuthenticated();
    navigate('/location');
  };

  return (
    <>
      {/* ── MOBILE layout ─────────────────────────────────────── */}
      <div className="lg:hidden min-h-screen max-w-[414px] mx-auto bg-white flex flex-col relative overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none">
          <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full bg-[#f4a9a8]/30 blur-[70px] -translate-x-1/3 translate-y-1/3" />
          <div className="absolute bottom-0 right-0 w-56 h-56 rounded-full bg-[#a8d8f0]/30 blur-[70px] translate-x-1/3 translate-y-1/3" />
        </div>

        <div className="w-full flex-shrink-0" style={{ height: '46%' }}>
          <img src={groceryBag} alt="Fresh groceries" className="w-full h-full object-cover object-center" />
        </div>

        <div className="flex-1 px-6 pt-7 pb-10 flex flex-col relative z-10">
          <h1 className="text-[26px] font-bold text-[#181725] leading-snug mb-6">
            Get your groceries<br />with nectar
          </h1>

          <button
            onClick={() => navigate('/number')}
            className="flex items-center gap-3 border-b border-[#e2e2e2] pb-4 mb-7 w-full text-left cursor-pointer"
          >
            <span className="text-[#7c7c7c] text-lg">🇮🇳</span>
            <span className="text-[#181725] text-base font-medium">+91</span>
          </button>

          <p className="text-center text-[#7c7c7c] text-sm mb-5">Or connect with social media</p>

          <button
            onClick={handleSocial}
            className="w-full flex items-center justify-center gap-4 bg-[#5C8EEC] text-white text-base font-semibold py-[17px] rounded-[19px] mb-4 opacity-40 cursor-not-allowed"
          disabled
          >
            <svg width="22" height="22" viewBox="0 0 48 48">
              <path fill="#ffffff" d="M44.5 20H24v8.5h11.8C34.7 33.9 29.8 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 5.1 29.6 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 20-7.6 20-21 0-1.3-.2-2.7-.5-4z"/>
            </svg>
            Continue with Google
          </button>

          <button
            onClick={handleSocial}
            className="w-full flex items-center justify-center gap-4 bg-[#4A66AC] text-white text-base font-semibold py-[17px] rounded-[19px] opacity-40 cursor-not-allowed"
          disabled
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
            </svg>
            Continue with Facebook
          </button>
        </div>
      </div>

      {/* ── DESKTOP layout — same split as Onboarding ──────────── */}
      <div className="hidden lg:flex min-h-screen">
        {/* Left: grocery bag image */}
        <div className="w-1/2 xl:w-[55%] relative overflow-hidden bg-[#F2F3F2]">
          <img
            src={groceryBag}
            alt="Fresh groceries"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        </div>

        {/* Right: login form panel */}
        <div className="w-1/2 xl:w-[45%] flex flex-col items-center justify-center px-16 bg-white">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-10">
            <div className="w-14 h-14 bg-[#53b175] rounded-2xl flex items-center justify-center">
              <img src={logoSvg} alt="Nectar" className="w-8 h-9" />
            </div>
            <span className="text-[34px] font-bold text-[#181725]">nectar</span>
          </div>

          {/* Heading */}
          <h1 className="text-[32px] font-bold text-[#181725] text-center leading-snug mb-2">
            Get your groceries<br />with nectar
          </h1>
          <p className="text-[#7c7c7c] text-[16px] text-center mb-10">
            Sign in to continue shopping
          </p>

          {/* Phone number row */}
          <button
            onClick={() => navigate('/number')}
            className="flex items-center gap-3 border border-[#e2e2e2] rounded-[15px] px-5 py-4 mb-6 w-full max-w-sm cursor-pointer hover:border-[#53b175] transition-colors group"
          >
            <span className="text-[#7c7c7c] text-xl">🇮🇳</span>
            <span className="text-[#181725] text-base font-medium">+91</span>
            <span className="text-[#7c7c7c] text-sm ml-1">Enter your mobile number</span>
            <svg className="ml-auto" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7c7c7c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 w-full max-w-sm mb-6">
            <div className="flex-1 h-px bg-[#e2e2e2]" />
            <span className="text-[#7c7c7c] text-sm">Or connect with social media</span>
            <div className="flex-1 h-px bg-[#e2e2e2]" />
          </div>

          {/* Google button */}
          <button
            onClick={handleSocial}
            className="w-full max-w-sm flex items-center justify-center gap-4 bg-[#5C8EEC] text-white text-[16px] font-semibold py-4 rounded-[19px] mb-4 opacity-40 cursor-not-allowed"
            disabled
          >
            <svg width="22" height="22" viewBox="0 0 48 48">
              <path fill="#ffffff" d="M44.5 20H24v8.5h11.8C34.7 33.9 29.8 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 5.1 29.6 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 20-7.6 20-21 0-1.3-.2-2.7-.5-4z"/>
            </svg>
            Continue with Google
          </button>

          {/* Facebook button */}
          <button
            onClick={handleSocial}
            className="w-full max-w-sm flex items-center justify-center gap-4 bg-[#4A66AC] text-white text-[16px] font-semibold py-4 rounded-[19px] opacity-40 cursor-not-allowed"
            disabled
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
            </svg>
            Continue with Facebook
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
