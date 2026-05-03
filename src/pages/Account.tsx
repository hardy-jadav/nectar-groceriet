import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import AppLayout from '../components/layout/AppLayout';

const menuItems = [
  { icon: '📦', label: 'Orders', desc: 'Track, return or buy things again' },
  { icon: '👤', label: 'My Details', desc: 'Edit your name, email and phone' },
  { icon: '📍', label: 'Delivery Address', desc: 'Manage your delivery addresses' },
  { icon: '💳', label: 'Payment Methods', desc: 'Credit, debit cards & UPI' },
  { icon: '🏷️', label: 'Promo Code', desc: 'Apply discounts and offers' },
  { icon: '🔔', label: 'Notifications', desc: 'Manage push notifications' },
  { icon: '❓', label: 'Help', desc: 'FAQs, chat support and more' },
  { icon: 'ℹ️', label: 'About', desc: 'Learn more about nectar' },
];

/* ── Avatar helper ── */
const Avatar: React.FC<{ name: string; size?: 'sm' | 'lg' }> = ({ name, size = 'lg' }) => {
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
  const cls = size === 'lg'
    ? 'w-24 h-24 text-[32px]'
    : 'w-14 h-14 text-[20px]';
  return (
    <div className={`${cls} rounded-full bg-[#53b175] flex items-center justify-center text-white font-bold flex-shrink-0`}>
      {initials || '?'}
    </div>
  );
};

const Account: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  const displayName = user?.name?.trim() || 'Guest User';
  const displayEmail = user?.email?.trim() || 'Not set';
  const displayPhone = user?.phone?.trim() || 'Not set';
  const displayLocation = user?.location?.trim() || 'Not selected';

  return (
    <AppLayout>
      {/* ── MOBILE ─────────────────────────────────────────────── */}
      <div className="lg:hidden bg-white min-h-screen pb-28">
        {/* Header */}
        <div className="pt-14 pb-6 flex items-center justify-center border-b border-[#e2e2e2]">
          <h1 className="font-bold text-[20px] text-[#181725]">Account</h1>
        </div>

        {/* Profile card */}
        <div className="flex items-center gap-4 px-5 py-6 border-b border-[#e2e2e2]">
          <Avatar name={displayName} />
          <div>
            <p className="font-bold text-[18px] text-[#181725]">{displayName}</p>
            <p className="text-[#7c7c7c] text-[13px] mt-0.5">{displayEmail}</p>
            {displayPhone !== '—' && (
              <p className="text-[#7c7c7c] text-[13px] mt-0.5">{displayPhone}</p>
            )}
            {displayLocation !== '—' && (
              <p className="text-[#53b175] text-[12px] mt-1 font-medium">📍 {displayLocation}</p>
            )}
          </div>
        </div>

        {/* Menu items */}
        <div className="px-5 mt-2">
          {menuItems.map((item) => (
            <button
              key={item.label}
              className="w-full flex items-center gap-4 py-4 border-b border-[#e2e2e2] cursor-pointer last:border-b-0"
            >
              <span className="text-[22px] flex-shrink-0">{item.icon}</span>
              <div className="flex-1 text-left">
                <p className="font-semibold text-[15px] text-[#181725]">{item.label}</p>
                <p className="text-[#7c7c7c] text-[12px] mt-0.5">{item.desc}</p>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#b3b3b3" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          ))}
        </div>

        {/* Logout */}
        <div className="px-5 mt-6 pb-6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-3 py-4 border-2 border-red-100 rounded-[18px] text-red-500 font-semibold text-[16px] cursor-pointer hover:bg-red-50 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Log Out
          </button>
        </div>
      </div>

      {/* ── DESKTOP ────────────────────────────────────────────── */}
      <div className="hidden lg:block min-h-screen bg-[#f2f3f2]">
        <div className="max-w-7xl mx-auto px-8 py-8">
          <h1 className="font-bold text-[28px] text-[#181725] mb-8">My Account</h1>

          <div className="flex gap-8 items-start">
            {/* Left: Profile card */}
            <div className="w-72 flex-shrink-0">
              <div className="bg-white rounded-[20px] p-6 shadow-sm">
                {/* Avatar + name */}
                <div className="flex flex-col items-center text-center pb-6 border-b border-[#e2e2e2]">
                  <Avatar name={displayName} size="lg" />
                  <h2 className="font-bold text-[20px] text-[#181725] mt-4">{displayName}</h2>
                  <p className="text-[#7c7c7c] text-[14px] mt-1">{displayEmail}</p>
                </div>

                {/* Contact info */}
                <div className="pt-5 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-[18px]">📞</span>
                    <div>
                      <p className="text-[#7c7c7c] text-[11px] uppercase tracking-wide font-medium">Phone</p>
                      <p className="text-[#181725] text-[14px] font-semibold">{displayPhone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[18px]">📍</span>
                    <div>
                      <p className="text-[#7c7c7c] text-[11px] uppercase tracking-wide font-medium">Location</p>
                      <p className="text-[#181725] text-[14px] font-semibold">{displayLocation}</p>
                    </div>
                  </div>
                </div>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="w-full mt-6 flex items-center justify-center gap-2 py-3 bg-red-50 text-red-500 font-semibold text-[15px] rounded-[12px] cursor-pointer hover:bg-red-100 transition-colors"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  Log Out
                </button>
              </div>
            </div>

            {/* Right: Settings grid */}
            <div className="flex-1">
              <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
                {menuItems.map((item) => (
                  <button
                    key={item.label}
                    className="bg-white rounded-[18px] p-6 flex items-start gap-4 cursor-pointer hover:shadow-md transition-shadow text-left shadow-sm group"
                  >
                    <span className="text-[28px] flex-shrink-0">{item.icon}</span>
                    <div>
                      <p className="font-bold text-[15px] text-[#181725] group-hover:text-[#53b175] transition-colors">{item.label}</p>
                      <p className="text-[#7c7c7c] text-[12px] mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </button>
                ))}
              </div>

              {/* User detail info card */}
              <div className="bg-white rounded-[18px] p-6 mt-4 shadow-sm">
                <h3 className="font-bold text-[17px] text-[#181725] mb-4">Your Information</h3>
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { label: 'Full Name', value: displayName },
                    { label: 'Email Address', value: displayEmail },
                    { label: 'Phone Number', value: displayPhone },
                    { label: 'Delivery Location', value: displayLocation },
                  ].map(({ label, value }) => (
                    <div key={label} className="border border-[#e2e2e2] rounded-[12px] px-4 py-3">
                      <p className="text-[#7c7c7c] text-[11px] uppercase tracking-wider font-medium mb-1">{label}</p>
                      <p className="text-[#181725] font-semibold text-[15px]">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Account;
