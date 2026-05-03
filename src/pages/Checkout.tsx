import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../stores/cartStore';
import { useOrderStore } from '../stores/orderStore';
import AppLayout from '../components/layout/AppLayout';

type PaymentMethod = 'upi' | 'cod' | '';

const ChevronRight: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7c7c7c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18l6-6-6-6" />
  </svg>
);

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { items, totalPrice } = useCartStore();
  const placeOrder = useOrderStore((state) => state.placeOrder);
  const [payment, setPayment] = useState<PaymentMethod>('');
  const [loading, setLoading] = useState(false);

  const total = totalPrice();

  const handlePlaceOrder = async () => {
    if (!payment) {
      navigate('/order-error');
      return;
    }
    setLoading(true);
    const success = await placeOrder(items, 'Default Address');
    setLoading(false);
    if (success) {
      navigate('/order-success');
    } else {
      navigate('/order-error');
    }
  };

  if (items.length === 0) {
    return (
      <AppLayout>
        <div className="min-h-screen flex flex-col items-center justify-center px-8 bg-white">
          <p className="font-bold text-[18px] text-[#181725]">Your cart is empty</p>
          <button
            onClick={() => navigate('/home')}
            className="mt-6 bg-[#53b175] text-white font-semibold text-[16px] px-8 py-[14px] rounded-[19px] cursor-pointer"
          >
            Start Shopping
          </button>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      {/* ── MOBILE ─────────────────────────────────────── */}
      <div className="lg:hidden bg-white min-h-screen pb-32">
        <div className="pt-14 pb-4 flex items-center justify-center relative px-5">
          <button onClick={() => navigate(-1)} className="absolute left-5 cursor-pointer">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#181725" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <h1 className="font-bold text-[20px] text-[#181725]">Checkout</h1>
        </div>
        <div className="border-b border-[#e2e2e2]" />

        {/* Delivery row */}
        <div className="flex items-center justify-between py-4 px-5 border-b border-[#e2e2e2]">
          <span className="text-[#7c7c7c] text-[16px]">Delivery</span>
          <div className="flex items-center gap-1">
            <span className="text-[#181725] text-[16px]">Select Method</span>
            <ChevronRight />
          </div>
        </div>

        {/* Payment */}
        <div className="py-4 px-5 border-b border-[#e2e2e2]">
          <span className="text-[#7c7c7c] text-[16px] block mb-3">Payment</span>
          <button
            onClick={() => setPayment('upi')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-[12px] border-2 mb-2 cursor-pointer transition-all ${payment === 'upi' ? 'border-[#53b175] bg-[#f0faf4]' : 'border-[#e2e2e2]'}`}
          >
            <div className="w-8 h-8 rounded-full bg-[#6739B7] flex items-center justify-center flex-shrink-0">
              <span className="text-white text-[11px] font-bold">UPI</span>
            </div>
            <span className={`font-semibold text-[15px] ${payment === 'upi' ? 'text-[#53b175]' : 'text-[#181725]'}`}>UPI Payment</span>
            {payment === 'upi' && (
              <svg className="ml-auto" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#53b175" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </button>
          <button
            onClick={() => setPayment('cod')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-[12px] border-2 cursor-pointer transition-all ${payment === 'cod' ? 'border-[#53b175] bg-[#f0faf4]' : 'border-[#e2e2e2]'}`}
          >
            <div className="w-8 h-8 rounded-full bg-[#F8A44C] flex items-center justify-center flex-shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                <rect x="2" y="7" width="20" height="14" rx="2" />
                <line x1="12" y1="12" x2="12" y2="16" />
                <line x1="10" y1="14" x2="14" y2="14" />
              </svg>
            </div>
            <span className={`font-semibold text-[15px] ${payment === 'cod' ? 'text-[#53b175]' : 'text-[#181725]'}`}>Cash on Delivery</span>
            {payment === 'cod' && (
              <svg className="ml-auto" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#53b175" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </button>
        </div>

        {/* Promo Code */}
        <div className="flex items-center justify-between py-4 px-5 border-b border-[#e2e2e2]">
          <span className="text-[#7c7c7c] text-[16px]">Promo Code</span>
          <div className="flex items-center gap-1">
            <span className="text-[#181725] text-[16px]">Pick discount</span>
            <ChevronRight />
          </div>
        </div>

        {/* Total Cost */}
        <div className="flex items-center justify-between py-4 px-5 border-b border-[#e2e2e2]">
          <span className="text-[#7c7c7c] text-[16px]">Total Cost</span>
          <div className="flex items-center gap-1">
            <span className="font-bold text-[#181725] text-[16px]">${total.toFixed(2)}</span>
            <ChevronRight />
          </div>
        </div>

        {/* Terms + Place Order */}
        <div className="px-5 pt-4">
          <p className="text-[#7c7c7c] text-[13px]">
            By placing an order you agree to our{' '}
            <span className="font-bold text-[#181725]">Terms</span>
            {' '}And{' '}
            <span className="font-bold text-[#181725]">Conditions</span>
          </p>
          <button
            onClick={handlePlaceOrder}
            disabled={loading}
            className="w-full bg-[#53b175] text-white font-semibold text-[18px] py-[18px] rounded-[19px] mt-5 disabled:opacity-60 cursor-pointer active:opacity-80 transition-opacity"
          >
            {loading ? 'Placing Order...' : 'Place Order'}
          </button>
        </div>
      </div>

      {/* ── DESKTOP ─────────────────────────────────────── */}
      <div className="hidden lg:block bg-[#f2f3f2] min-h-screen">
        <div className="max-w-3xl mx-auto px-8 pt-10 pb-12">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[#7c7c7c] mb-6 cursor-pointer hover:text-[#181725] transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
            <span className="text-[15px]">Back to Cart</span>
          </button>

          <div className="bg-white rounded-[18px] p-8">
            <h1 className="font-bold text-[24px] text-[#181725] mb-6">Checkout</h1>

            {/* Delivery */}
            <div className="flex items-center justify-between py-4 border-b border-[#e2e2e2]">
              <span className="text-[#7c7c7c] text-[16px]">Delivery</span>
              <div className="flex items-center gap-1 cursor-pointer">
                <span className="text-[#181725] text-[16px]">Select Method</span>
                <ChevronRight />
              </div>
            </div>

            {/* Payment */}
            <div className="py-5 border-b border-[#e2e2e2]">
              <span className="text-[#7c7c7c] text-[16px] block mb-3">Payment Method</span>
              <div className="space-y-2">
                <button
                  onClick={() => setPayment('upi')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-[12px] border-2 cursor-pointer transition-all ${payment === 'upi' ? 'border-[#53b175] bg-[#f0faf4]' : 'border-[#e2e2e2]'}`}
                >
                  <div className="w-8 h-8 rounded-full bg-[#6739B7] flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-[11px] font-bold">UPI</span>
                  </div>
                  <span className={`font-semibold text-[15px] ${payment === 'upi' ? 'text-[#53b175]' : 'text-[#181725]'}`}>UPI Payment</span>
                  {payment === 'upi' && (
                    <svg className="ml-auto" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#53b175" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </button>
                <button
                  onClick={() => setPayment('cod')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-[12px] border-2 cursor-pointer transition-all ${payment === 'cod' ? 'border-[#53b175] bg-[#f0faf4]' : 'border-[#e2e2e2]'}`}
                >
                  <div className="w-8 h-8 rounded-full bg-[#F8A44C] flex items-center justify-center flex-shrink-0">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                      <rect x="2" y="7" width="20" height="14" rx="2" />
                      <line x1="12" y1="12" x2="12" y2="16" />
                      <line x1="10" y1="14" x2="14" y2="14" />
                    </svg>
                  </div>
                  <span className={`font-semibold text-[15px] ${payment === 'cod' ? 'text-[#53b175]' : 'text-[#181725]'}`}>Cash on Delivery</span>
                  {payment === 'cod' && (
                    <svg className="ml-auto" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#53b175" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Promo Code */}
            <div className="flex items-center justify-between py-4 border-b border-[#e2e2e2]">
              <span className="text-[#7c7c7c] text-[16px]">Promo Code</span>
              <div className="flex items-center gap-1 cursor-pointer">
                <span className="text-[#181725] text-[16px]">Pick discount</span>
                <ChevronRight />
              </div>
            </div>

            {/* Total Cost */}
            <div className="flex items-center justify-between py-4 border-b border-[#e2e2e2]">
              <span className="text-[#7c7c7c] text-[16px]">Total Cost</span>
              <span className="font-bold text-[#181725] text-[16px]">${total.toFixed(2)}</span>
            </div>

            <p className="text-[#7c7c7c] text-[13px] mt-5">
              By placing an order you agree to our{' '}
              <span className="font-bold text-[#181725]">Terms</span>
              {' '}And{' '}
              <span className="font-bold text-[#181725]">Conditions</span>
            </p>

            <button
              onClick={handlePlaceOrder}
              disabled={loading}
              className="w-full bg-[#53b175] text-white font-semibold text-[17px] py-[16px] rounded-[19px] mt-5 cursor-pointer hover:bg-[#44a367] disabled:opacity-60 transition-colors"
            >
              {loading ? 'Placing Order...' : `Place Order — $${total.toFixed(2)}`}
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Checkout;
