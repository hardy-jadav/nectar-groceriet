import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import groceryBag from '../assets/grocery-bag.png';

const OTP_LENGTH = 4;

const OTPVerification: React.FC = () => {
  const navigate = useNavigate();
  const setAuthenticated = useAuthStore((s) => s.setAuthenticated);
  const [digits, setDigits] = useState(Array(OTP_LENGTH).fill(''));
  const [resent, setResent] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleResend = () => {
    setDigits(Array(OTP_LENGTH).fill(''));
    setResent(true);
    setTimeout(() => setResent(false), 3000);
    inputRefs.current[0]?.focus();
  };

  const handleChange = (i: number, val: string) => {
    const digit = val.replace(/\D/g, '').slice(-1);
    const next = [...digits];
    next[i] = digit;
    setDigits(next);
    if (digit && i < OTP_LENGTH - 1) inputRefs.current[i + 1]?.focus();
    if (next.every((d) => d !== '')) {
      setTimeout(() => { setAuthenticated(); navigate('/location'); }, 400);
    }
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[i] && i > 0) {
      inputRefs.current[i - 1]?.focus();
    }
  };

  const isComplete = digits.every((d) => d !== '');

  return (
    <>
      {/* ── MOBILE ─────────────────────────────────────────────── */}
      <div className="lg:hidden min-h-screen max-w-[414px] mx-auto relative overflow-hidden bg-white flex flex-col">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-[#f4a9a8]/60 blur-[90px]" />
          <div className="absolute top-24 -left-20 w-64 h-64 rounded-full bg-[#a8e6be]/50 blur-[80px]" />
          <div className="absolute top-8 right-8 w-40 h-40 rounded-full bg-[#fde68a]/50 blur-[60px]" />
          <div className="absolute -bottom-20 -left-10 w-72 h-72 rounded-full bg-[#f4a9a8]/50 blur-[90px]" />
          <div className="absolute bottom-40 -right-10 w-56 h-56 rounded-full bg-[#a8d8f0]/40 blur-[70px]" />
        </div>

        <div className="relative z-10 px-6 pt-14 flex-1 flex flex-col">
          <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center rounded-full border border-[#e2e2e2] bg-white/70 mb-10 cursor-pointer">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#181725" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
          </button>

          <h2 className="text-[26px] font-bold text-[#181725] mb-3">Enter your 4-digit code</h2>
          <p className="text-[#7c7c7c] text-sm mb-10">Enter the OTP sent to your mobile number</p>

          {/* OTP input boxes */}
          <div className="flex gap-4 mb-8">
            {digits.map((d, i) => (
              <input
                key={i}
                ref={(el) => { inputRefs.current[i] = el; }}
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={d}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                autoFocus={i === 0}
                className={`w-16 h-16 text-center text-[24px] font-bold border-2 rounded-[15px] outline-none transition-colors bg-white/80 ${
                  d ? 'border-[#53b175] text-[#181725]' : 'border-[#e2e2e2] text-[#181725]'
                } focus:border-[#53b175]`}
              />
            ))}
          </div>

          <div className="flex items-center justify-between mb-10">
            <button onClick={handleResend} className="text-[#53b175] text-sm font-semibold cursor-pointer">
              {resent ? 'Code sent!' : 'Resend Code'}
            </button>
            <button
              onClick={() => isComplete && navigate('/location')}
              className={`w-14 h-14 rounded-full flex items-center justify-center shadow-md transition-all cursor-pointer bg-[#53b175] ${isComplete ? 'opacity-100' : 'opacity-40'}`}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
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

            <h2 className="text-[32px] font-bold text-[#181725] mb-2">Enter your 4-digit code</h2>
            <p className="text-[#7c7c7c] text-[16px] mb-10">Enter the OTP sent to your mobile number</p>

            <div className="flex gap-4 mb-6">
              {digits.map((d, i) => (
                <input
                  key={i}
                  ref={(el) => { inputRefs.current[i] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={d}
                  onChange={(e) => handleChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  className={`w-16 h-16 text-center text-[24px] font-bold border-2 rounded-[15px] outline-none transition-colors cursor-text ${
                    d ? 'border-[#53b175] text-[#181725]' : 'border-[#e2e2e2] text-[#181725]'
                  } focus:border-[#53b175]`}
                  autoFocus={i === 0}
                />
              ))}
            </div>

            <div className="flex items-center justify-between mb-10">
              <button onClick={handleResend} className="text-[#53b175] text-[15px] font-semibold cursor-pointer hover:underline">
                {resent ? 'Code sent!' : 'Resend Code'}
              </button>
              <span className="text-[#7c7c7c] text-sm">Didn't receive it?</span>
            </div>

            <button
              onClick={() => { if (isComplete) { setAuthenticated(); navigate('/location'); } }}
              disabled={!isComplete}
              className="w-full bg-[#53b175] text-white text-[18px] font-semibold py-5 rounded-[19px] hover:bg-[#44a367] transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-[#53b175]/20"
            >
              Verify
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OTPVerification;
