import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import groceryBag from '../assets/grocery-bag.png';
import { useAuthStore } from '../stores/authStore';

const COUNTRY_CODE = '+91';
const REQUIRED_DIGITS = 10;

const PhoneNumber: React.FC = () => {
  const navigate = useNavigate();
  const [number, setNumber] = useState('');
  const [error, setError] = useState('');
  const setPhone = useAuthStore((s) => s.setPhone);

  const isValid = number.length === REQUIRED_DIGITS;

  const handleChange = (val: string) => {
    const digits = val.replace(/\D/g, '');
    if (digits.length <= REQUIRED_DIGITS) {
      setNumber(digits);
      setError('');
    }
  };

  const handleNext = () => {
    if (!isValid) {
      setError(`Please enter a valid ${REQUIRED_DIGITS}-digit mobile number`);
      return;
    }
    setPhone(`${COUNTRY_CODE}${number}`);
    navigate('/otp');
  };

  return (
    <>
      {/* ── MOBILE ─────────────────────────────────────────────── */}
      <div className="lg:hidden min-h-screen max-w-[414px] mx-auto relative overflow-hidden flex flex-col bg-white">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#f9a8a8]/50 blur-[80px]" />
          <div className="absolute top-20 left-0 w-56 h-56 rounded-full bg-[#a8e6c0]/50 blur-[80px]" />
          <div className="absolute top-10 right-20 w-40 h-40 rounded-full bg-[#fde68a]/40 blur-[60px]" />
          <div className="absolute bottom-60 left-10 w-48 h-48 rounded-full bg-[#c7d2fe]/40 blur-[70px]" />
        </div>

        <div className="relative z-10 px-5 pt-14 pb-10 flex flex-col flex-1">
          <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center rounded-full border border-[#e2e2e2] bg-white/70 mb-8 cursor-pointer">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#181725" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
          </button>

          <h2 className="text-[26px] font-bold text-[#181725] mb-8">Enter your mobile number</h2>

          <p className="text-[#7c7c7c] text-sm mb-2">Mobile Number</p>
          <div className={`flex items-center gap-3 border-b-2 pb-3 mb-2 transition-colors ${error ? 'border-red-400' : 'border-[#e2e2e2]'}`}>
            <span className="text-2xl">🇮🇳</span>
            <span className="text-[#181725] font-medium text-lg">{COUNTRY_CODE}</span>
            <input
              type="tel"
              inputMode="numeric"
              pattern="[0-9]*"
              value={number}
              onChange={(e) => handleChange(e.target.value)}
              placeholder="Enter 10-digit number"
              maxLength={REQUIRED_DIGITS}
              autoFocus
              className="flex-1 outline-none text-[#181725] text-lg tracking-widest bg-transparent placeholder-[#c8c8c8] placeholder:tracking-normal placeholder:text-sm"
            />
            <span className="text-[#7c7c7c] text-sm">{number.length}/{REQUIRED_DIGITS}</span>
          </div>
          {error && <p className="text-red-500 text-xs mb-4">{error}</p>}

          <div className="flex justify-end mt-6">
            <button
              onClick={handleNext}
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-opacity cursor-pointer bg-[#53b175] ${isValid ? 'opacity-100' : 'opacity-40'}`}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ── DESKTOP ────────────────────────────────────────────── */}
      <div className="hidden lg:flex min-h-screen">
        <div className="w-1/2 xl:w-[55%] relative overflow-hidden bg-[#F2F3F2]">
          <img src={groceryBag} alt="Fresh groceries" className="absolute inset-0 w-full h-full object-cover object-center" />
        </div>

        <div className="w-1/2 xl:w-[45%] flex flex-col items-center justify-center px-16 bg-white">
          <div className="w-full max-w-sm">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[#7c7c7c] hover:text-[#181725] mb-10 cursor-pointer transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
              <span className="text-[14px] font-medium">Back</span>
            </button>

            <h2 className="text-[32px] font-bold text-[#181725] mb-2">Enter your mobile number</h2>
            <p className="text-[#7c7c7c] text-[16px] mb-10">We'll send a 6-digit OTP to verify</p>

            <label className="text-[#7c7c7c] text-sm font-medium block mb-2">Mobile Number</label>
            <div className={`flex items-center gap-3 border-2 rounded-[15px] px-4 py-4 mb-1 transition-colors ${
              error ? 'border-red-400' : 'focus-within:border-[#53b175] border-[#e2e2e2]'
            }`}>
              <span className="text-2xl">🇮🇳</span>
              <span className="text-[#181725] font-semibold text-lg">{COUNTRY_CODE}</span>
              <input
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                value={number}
                onChange={(e) => handleChange(e.target.value)}
                placeholder="10-digit number"
                maxLength={REQUIRED_DIGITS}
                className="flex-1 outline-none text-[#181725] text-lg bg-transparent placeholder-[#c8c8c8]"
                autoFocus
              />
              <span className={`text-sm font-medium ${isValid ? 'text-[#53b175]' : 'text-[#7c7c7c]'}`}>
                {number.length}/{REQUIRED_DIGITS}
              </span>
            </div>
            {error
              ? <p className="text-red-500 text-xs mb-6">{error}</p>
              : <p className="text-[#7c7c7c] text-xs mb-6">Enter your 10-digit mobile number</p>
            }

            <button
              onClick={handleNext}
              className="w-full bg-[#53b175] text-white text-[18px] font-semibold py-5 rounded-[19px] hover:bg-[#44a367] transition-colors cursor-pointer shadow-lg shadow-[#53b175]/20"
            >
              Send OTP
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PhoneNumber;
