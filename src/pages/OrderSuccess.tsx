import React from 'react';
import { useNavigate } from 'react-router-dom';
import orderAcceptedImg from '../assets/order accepted .png';

const OrderSuccess: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* ── MOBILE LAYOUT (unchanged) ──────────────────── */}
      <div className="lg:hidden min-h-screen max-w-[414px] mx-auto flex flex-col relative overflow-hidden bg-white">
        {/* Background blobs */}
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-pink-200 opacity-40 blur-3xl pointer-events-none" />
        <div className="absolute top-40 -left-20 w-56 h-56 rounded-full bg-green-200 opacity-40 blur-3xl pointer-events-none" />
        <div className="absolute bottom-40 right-0 w-48 h-48 rounded-full bg-yellow-200 opacity-40 blur-3xl pointer-events-none" />

        {/* Center section */}
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          {/* Order accepted illustration */}
          <img
            src={orderAcceptedImg}
            alt="Order accepted"
            className="w-[260px] h-[260px] object-contain"
          />

          <h1 className="font-bold text-[26px] text-[#181725] text-center mt-6 leading-snug">
            Your Order has been<br />accepted
          </h1>
          <p className="text-[#7c7c7c] text-center text-[14px] mt-3 leading-relaxed px-8">
            Your items has been placed and is on<br />it's way to being processed
          </p>
        </div>

        {/* Bottom section */}
        <div className="px-6 pb-12">
          <button
            onClick={() => navigate('/home')}
            className="w-full bg-[#53b175] text-white font-semibold text-[18px] py-[18px] rounded-[19px] cursor-pointer active:opacity-80 transition-opacity"
          >
            Track Order
          </button>
          <button
            onClick={() => navigate('/home')}
            className="w-full mt-4 text-[#181725] font-semibold text-[16px] text-center cursor-pointer"
          >
            Back to home
          </button>
        </div>
      </div>

      {/* ── DESKTOP: Centered card ──────────────────────── */}
      <div className="hidden lg:flex min-h-screen items-center justify-center bg-[#f2f3f2] p-8">
        <div className="bg-white rounded-[24px] shadow-xl w-full max-w-md px-10 py-12 flex flex-col items-center relative overflow-hidden">
          {/* Background blobs inside card */}
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-pink-100 blur-2xl opacity-60 pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-green-100 blur-2xl opacity-60 pointer-events-none" />

          {/* Image */}
          <img
            src={orderAcceptedImg}
            alt="Order accepted"
            className="w-[200px] h-[200px] object-contain relative z-10 mb-6"
          />

          {/* Text */}
          <h1 className="font-bold text-[28px] text-[#181725] text-center leading-snug mb-3 relative z-10">
            Your Order has been accepted
          </h1>
          <p className="text-[#7c7c7c] text-center text-[15px] leading-relaxed mb-10 relative z-10">
            Your items has been placed and is on it's way to being processed
          </p>

          {/* Buttons */}
          <button
            onClick={() => navigate('/home')}
            className="w-full bg-[#53b175] text-white font-semibold text-[17px] py-[16px] rounded-[19px] mb-4 cursor-pointer hover:bg-[#44a367] transition-colors relative z-10"
          >
            Track Order
          </button>
          <button
            onClick={() => navigate('/home')}
            className="text-[#181725] font-semibold text-[15px] cursor-pointer relative z-10 hover:text-[#53b175] transition-colors"
          >
            Back to home
          </button>
        </div>
      </div>
    </>
  );
};

export default OrderSuccess;
