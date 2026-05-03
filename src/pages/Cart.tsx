import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../stores/cartStore';
import { useOrderStore } from '../stores/orderStore';
import AppLayout from '../components/layout/AppLayout';

/* ─── Checkout bottom sheet ─────────────────────────────────── */
interface CheckoutSheetProps {
  total: number;
  onClose: () => void;
  onPlaceOrder: () => Promise<void>;
}

const ChevronRight: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7c7c7c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18l6-6-6-6" />
  </svg>
);

type PaymentMethod = 'upi' | 'cod' | '';

const CheckoutSheet: React.FC<CheckoutSheetProps> = ({ total, onClose, onPlaceOrder }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [payment, setPayment] = useState<PaymentMethod>('');

  const handlePlaceOrder = async () => {
    if (!payment) {
      onClose();
      navigate('/order-error');
      return;
    }
    setLoading(true);
    await onPlaceOrder();
    setLoading(false);
  };

  return (
    <>
      {/* Dim overlay */}
      <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose} />
      {/* Sheet */}
      <div className="bg-white rounded-t-[20px] fixed bottom-0 left-0 right-0 max-w-[414px] mx-auto px-6 pt-6 pb-10 z-50">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-[22px] text-[#181725]">Checkout</h2>
          <button onClick={onClose} className="text-[#181725] text-[24px] leading-none cursor-pointer">×</button>
        </div>
        <div className="border-b border-[#e2e2e2]" />

        {/* Delivery row */}
        <div className="flex items-center justify-between py-4 border-b border-[#e2e2e2]">
          <span className="text-[#7c7c7c] text-[16px]">Delivery</span>
          <div className="flex items-center gap-1">
            <span className="text-[#181725] text-[16px]">Select Method</span>
            <ChevronRight />
          </div>
        </div>

        {/* Payment method selection */}
        <div className="py-4 border-b border-[#e2e2e2]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[#7c7c7c] text-[16px]">Payment</span>
          </div>
          {/* UPI option */}
          <button
            onClick={() => { setPayment('upi'); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-[12px] border-2 mb-2 cursor-pointer transition-all ${
              payment === 'upi' ? 'border-[#53b175] bg-[#f0faf4]' : 'border-[#e2e2e2]'
            }`}
          >
            <div className="w-8 h-8 rounded-full bg-[#6739B7] flex items-center justify-center flex-shrink-0">
              <span className="text-white text-[11px] font-bold">UPI</span>
            </div>
            <span className={`font-semibold text-[15px] ${payment === 'upi' ? 'text-[#53b175]' : 'text-[#181725]'}`}>
              UPI Payment
            </span>
            {payment === 'upi' && (
              <svg className="ml-auto" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#53b175" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </button>
          {/* Cash on Delivery option */}
          <button
            onClick={() => { setPayment('cod'); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-[12px] border-2 cursor-pointer transition-all ${
              payment === 'cod' ? 'border-[#53b175] bg-[#f0faf4]' : 'border-[#e2e2e2]'
            }`}
          >
            <div className="w-8 h-8 rounded-full bg-[#F8A44C] flex items-center justify-center flex-shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                <rect x="2" y="7" width="20" height="14" rx="2" />
                <path d="M16 7V5a2 2 00-2-2h-4a2 2 00-2 2v2" />
                <line x1="12" y1="12" x2="12" y2="16" />
                <line x1="10" y1="14" x2="14" y2="14" />
              </svg>
            </div>
            <span className={`font-semibold text-[15px] ${payment === 'cod' ? 'text-[#53b175]' : 'text-[#181725]'}`}>
              Cash on Delivery
            </span>
            {payment === 'cod' && (
              <svg className="ml-auto" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#53b175" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </button>
        </div>

        {/* Promo Code row */}
        <div className="flex items-center justify-between py-4 border-b border-[#e2e2e2]">
          <span className="text-[#7c7c7c] text-[16px]">Promo Code</span>
          <div className="flex items-center gap-1">
            <span className="text-[#181725] text-[16px]">Pick discount</span>
            <ChevronRight />
          </div>
        </div>

        {/* Total Cost row */}
        <div className="flex items-center justify-between py-4 border-b border-[#e2e2e2]">
          <span className="text-[#7c7c7c] text-[16px]">Total Cost</span>
          <div className="flex items-center gap-1">
            <span className="font-bold text-[#181725] text-[16px]">${total.toFixed(2)}</span>
            <ChevronRight />
          </div>
        </div>

        {/* Terms */}
        <p className="text-[#7c7c7c] text-[13px] mt-4">
          By placing an order you agree to our{' '}
          <span className="font-bold text-[#181725]">Terms</span>
          {' '}And{' '}
          <span className="font-bold text-[#181725]">Conditions</span>
        </p>

        {/* Place Order button */}
        <button
          onClick={handlePlaceOrder}
          disabled={loading}
          className="w-full bg-[#53b175] text-white font-semibold text-[18px] py-[18px] rounded-[19px] mt-5 disabled:opacity-60 cursor-pointer active:opacity-80 transition-opacity"
        >
          {loading ? 'Placing Order...' : 'Place Order'}
        </button>
      </div>
    </>
  );
};

/* ─── Desktop Payment Selector ──────────────────────────────── */
interface DesktopPaymentSelectorProps {
  payment: PaymentMethod;
  setPayment: (p: PaymentMethod) => void;
}

const DesktopPaymentSelector: React.FC<DesktopPaymentSelectorProps> = ({ payment, setPayment }) => (
  <div className="space-y-2">
    <button
      onClick={() => setPayment('upi')}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-[12px] border-2 cursor-pointer transition-all ${
        payment === 'upi' ? 'border-[#53b175] bg-[#f0faf4]' : 'border-[#e2e2e2]'
      }`}
    >
      <div className="w-8 h-8 rounded-full bg-[#6739B7] flex items-center justify-center flex-shrink-0">
        <span className="text-white text-[11px] font-bold">UPI</span>
      </div>
      <span className={`font-semibold text-[15px] ${payment === 'upi' ? 'text-[#53b175]' : 'text-[#181725]'}`}>
        UPI Payment
      </span>
      {payment === 'upi' && (
        <svg className="ml-auto" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#53b175" strokeWidth="2.5">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      )}
    </button>
    <button
      onClick={() => setPayment('cod')}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-[12px] border-2 cursor-pointer transition-all ${
        payment === 'cod' ? 'border-[#53b175] bg-[#f0faf4]' : 'border-[#e2e2e2]'
      }`}
    >
      <div className="w-8 h-8 rounded-full bg-[#F8A44C] flex items-center justify-center flex-shrink-0">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
          <rect x="2" y="7" width="20" height="14" rx="2" />
          <line x1="12" y1="12" x2="12" y2="16" />
          <line x1="10" y1="14" x2="14" y2="14" />
        </svg>
      </div>
      <span className={`font-semibold text-[15px] ${payment === 'cod' ? 'text-[#53b175]' : 'text-[#181725]'}`}>
        Cash on Delivery
      </span>
      {payment === 'cod' && (
        <svg className="ml-auto" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#53b175" strokeWidth="2.5">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      )}
    </button>
  </div>
);

/* ─── Cart Page ─────────────────────────────────────────────── */
const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { items, removeFromCart, updateQuantity, totalPrice } = useCartStore();
  const placeOrder = useOrderStore((state) => state.placeOrder);
  const [showCheckout, setShowCheckout] = useState(false);
  const [desktopPayment, setDesktopPayment] = useState<PaymentMethod>('');
  const [desktopLoading, setDesktopLoading] = useState(false);

  const total = totalPrice();

  const handlePlaceOrder = async () => {
    const success = await placeOrder(items, 'Default Address');
    setShowCheckout(false);
    if (success) {
      navigate('/order-success');
    } else {
      navigate('/order-error');
    }
  };

  const handleDesktopPlaceOrder = async () => {
    if (!desktopPayment) {
      navigate('/order-error');
      return;
    }
    setDesktopLoading(true);
    const success = await placeOrder(items, 'Default Address');
    setDesktopLoading(false);
    if (success) {
      navigate('/order-success');
    } else {
      navigate('/order-error');
    }
  };

  return (
    <AppLayout>
      {/* ── MOBILE LAYOUT (unchanged) ──────────────────── */}
      <div className="lg:hidden bg-white min-h-screen pb-32 relative">
        {/* Header */}
        <div className="pt-14 pb-4 flex items-center justify-center">
          <h1 className="font-bold text-[20px] text-[#181725]">My Cart</h1>
        </div>
        <div className="border-b border-[#e2e2e2]" />

        {items.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-20 px-8">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#e2e2e2" strokeWidth="1.5">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            <p className="font-bold text-[18px] text-[#181725] mt-6">Your cart is empty</p>
            <p className="text-[#7c7c7c] text-[14px] mt-2 text-center">Add some fresh groceries to get started</p>
            <button
              onClick={() => navigate('/home')}
              className="mt-6 bg-[#53b175] text-white font-semibold text-[16px] px-8 py-[14px] rounded-[19px] cursor-pointer"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <>
            {/* Cart items */}
            <div className="overflow-y-auto">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="relative py-5 px-5 flex items-center gap-4 border-b border-[#e2e2e2]"
                >
                  {/* Product image */}
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-[70px] h-[70px] object-contain flex-shrink-0"
                  />

                  {/* Center info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-[16px] text-[#181725] truncate">{item.product.name}</p>
                    <p className="text-[#7c7c7c] text-[13px] mt-0.5">{item.product.unit}</p>
                    {/* Qty row */}
                    <div className="mt-3 flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-[40px] h-[40px] border border-[#e2e2e2] rounded-[17px] flex items-center justify-center text-[#181725] text-xl cursor-pointer"
                      >
                        —
                      </button>
                      <span className="text-[#181725] font-semibold text-[16px] w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-[40px] h-[40px] border border-[#53b175] rounded-[17px] flex items-center justify-center cursor-pointer"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#53b175" strokeWidth="2.5" strokeLinecap="round">
                          <line x1="12" y1="5" x2="12" y2="19" />
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <span className="font-bold text-[#181725] text-[18px] flex-shrink-0">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>

                  {/* Remove button */}
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="absolute top-5 right-5 text-[#b3b3b3] cursor-pointer"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            {/* Fixed bottom bar */}
            <div className="fixed bottom-0 left-0 right-0 max-w-[414px] mx-auto pb-24 px-5 bg-white pt-4">
              <button
                onClick={() => setShowCheckout(true)}
                className="w-full bg-[#53b175] text-white font-semibold text-[18px] py-[18px] rounded-[19px] flex items-center justify-center relative cursor-pointer"
              >
                Go to Checkout
                <span className="absolute right-3 bg-[#489E68] text-white text-[14px] px-3 py-1 rounded-[9px]">
                  ${total.toFixed(2)}
                </span>
              </button>
            </div>
          </>
        )}
      </div>

      {/* ── DESKTOP LAYOUT ────────────────────────────────── */}
      <div className="hidden lg:block bg-[#f2f3f2] min-h-screen">
        {items.length === 0 ? (
          <div className="max-w-7xl mx-auto px-8 pt-16 flex flex-col items-center justify-center py-20">
            <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="#e2e2e2" strokeWidth="1.5">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            <p className="font-bold text-[24px] text-[#181725] mt-8">Your cart is empty</p>
            <p className="text-[#7c7c7c] text-[16px] mt-3 text-center">Add some fresh groceries to get started</p>
            <button
              onClick={() => navigate('/home')}
              className="mt-8 bg-[#53b175] text-white font-semibold text-[17px] px-10 py-[16px] rounded-[19px] cursor-pointer hover:bg-[#44a367] transition-colors"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto px-8 pt-8 pb-12 flex gap-8 items-start">
            {/* Left: cart items */}
            <div className="flex-1 bg-white rounded-[18px] overflow-hidden">
              <div className="px-6 py-5 border-b border-[#e2e2e2]">
                <h1 className="font-bold text-[22px] text-[#181725]">My Cart</h1>
              </div>
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="relative py-5 px-6 flex items-center gap-5 border-b border-[#e2e2e2]"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-[80px] h-[80px] object-contain flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-[17px] text-[#181725] truncate">{item.product.name}</p>
                    <p className="text-[#7c7c7c] text-[13px] mt-0.5">{item.product.unit}</p>
                    <div className="mt-3 flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-[38px] h-[38px] border border-[#e2e2e2] rounded-[14px] flex items-center justify-center text-[#181725] text-lg cursor-pointer hover:border-[#53b175] transition-colors"
                      >
                        —
                      </button>
                      <span className="text-[#181725] font-semibold text-[16px] w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-[38px] h-[38px] border border-[#53b175] rounded-[14px] flex items-center justify-center cursor-pointer hover:bg-[#f0faf4] transition-colors"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#53b175" strokeWidth="2.5" strokeLinecap="round">
                          <line x1="12" y1="5" x2="12" y2="19" />
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <span className="font-bold text-[#181725] text-[20px] flex-shrink-0">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-[#b3b3b3] cursor-pointer hover:text-red-400 transition-colors ml-2"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            {/* Right: sticky order summary */}
            <div className="w-80 flex-shrink-0 sticky top-24">
              <div className="bg-white rounded-[18px] p-6">
                <h2 className="font-bold text-[20px] text-[#181725] mb-5">Order Summary</h2>
                <div className="space-y-3">
                  <div className="flex justify-between text-[15px]">
                    <span className="text-[#7c7c7c]">Subtotal</span>
                    <span className="font-semibold text-[#181725]">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[15px]">
                    <span className="text-[#7c7c7c]">Delivery Fee</span>
                    <span className="font-semibold text-[#53b175]">Free</span>
                  </div>
                  <div className="border-t border-[#e2e2e2] pt-3 flex justify-between text-[16px]">
                    <span className="font-bold text-[#181725]">Total</span>
                    <span className="font-bold text-[#181725]">${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Promo code input */}
                <div className="mt-5 flex gap-2">
                  <input
                    placeholder="Promo code"
                    className="flex-1 border border-[#e2e2e2] rounded-[12px] px-3 py-2.5 text-[14px] outline-none focus:border-[#53b175] transition-colors"
                  />
                  <button className="bg-[#53b175] text-white px-4 rounded-[12px] text-[14px] font-semibold cursor-pointer hover:bg-[#44a367] transition-colors">
                    Apply
                  </button>
                </div>

                {/* Payment methods */}
                <div className="mt-5">
                  <h3 className="font-semibold text-[15px] text-[#181725] mb-3">Payment Method</h3>
                  <DesktopPaymentSelector payment={desktopPayment} setPayment={setDesktopPayment} />
                </div>

                <button
                  onClick={handleDesktopPlaceOrder}
                  disabled={desktopLoading}
                  className="w-full bg-[#53b175] text-white font-semibold text-[17px] py-[16px] rounded-[19px] mt-6 cursor-pointer active:opacity-80 disabled:opacity-60 hover:bg-[#44a367] transition-colors"
                >
                  {desktopLoading ? 'Placing Order...' : `Place Order — $${total.toFixed(2)}`}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Checkout sheet */}
      {showCheckout && (
        <CheckoutSheet
          total={total}
          onClose={() => setShowCheckout(false)}
          onPlaceOrder={handlePlaceOrder}
        />
      )}
    </AppLayout>
  );
};

export default Cart;
