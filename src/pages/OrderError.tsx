import React from 'react';
import { useNavigate } from 'react-router-dom';
import errorImg from '../assets/error .png';

const OrderError: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* ── MOBILE LAYOUT (unchanged) ──────────────────── */}
      <div className="lg:hidden fixed inset-0 bg-black/30 z-50 flex items-end justify-center max-w-[414px] mx-auto">
        {/* White card */}
        <div className="bg-white rounded-t-[20px] w-full px-6 pt-6 pb-10">
          {/* X close button */}
          <button
            onClick={() => navigate(-1)}
            className="text-[#181725] text-[24px] leading-none cursor-pointer"
          >
            ×
          </button>

          {/* Error illustration from assets */}
          <div className="flex justify-center my-6">
            <img src={errorImg} alt="Order failed" className="w-[200px] h-[200px] object-contain" />
          </div>

          <h1 className="font-bold text-[26px] text-[#181725] text-center">Oops! Order Failed</h1>
          <p className="text-[#7c7c7c] text-center text-[15px] mt-2">Something went terribly wrong.</p>

          <button
            onClick={() => navigate(-1)}
            className="w-full bg-[#53b175] text-white font-semibold text-[18px] py-[18px] rounded-[19px] mt-6 cursor-pointer"
          >
            Please Try Again
          </button>
          <button
            onClick={() => navigate('/home')}
            className="w-full mt-4 text-[#181725] font-semibold text-[16px] text-center cursor-pointer"
          >
            Back to home
          </button>
        </div>
      </div>

      {/* ── DESKTOP: Centered modal card ──────────────── */}
      <div className="hidden lg:flex fixed inset-0 z-50 items-center justify-center bg-black/40 backdrop-blur-sm p-8">
        <div className="bg-white rounded-[24px] shadow-2xl w-full max-w-md px-10 py-10 flex flex-col items-center">
          {/* Close button */}
          <button
            onClick={() => navigate(-1)}
            className="self-start mb-4 cursor-pointer text-[#181725] w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-[24px] leading-none"
          >
            ×
          </button>

          {/* Error illustration */}
          <img
            src={errorImg}
            alt="Order failed"
            className="w-[180px] h-[180px] object-contain mb-6"
          />

          <h2 className="font-bold text-[28px] text-[#181725] text-center mb-2">
            Oops! Order Failed
          </h2>
          <p className="text-[#7c7c7c] text-center text-[15px] mb-1">
            Something went terribly wrong.
          </p>
          <p className="text-red-500 text-center text-[15px] mb-8">
            Please Select a Payment Method.
          </p>

          <button
            onClick={() => navigate(-1)}
            className="w-full bg-[#53b175] text-white font-semibold text-[17px] py-[16px] rounded-[19px] mb-4 cursor-pointer hover:bg-[#44a367] transition-colors"
          >
            Please Try Again
          </button>
          <button
            onClick={() => navigate('/home')}
            className="text-[#181725] font-semibold text-[15px] cursor-pointer hover:text-[#53b175] transition-colors"
          >
            Back to home
          </button>
        </div>
      </div>
    </>
  );
};

export default OrderError;
