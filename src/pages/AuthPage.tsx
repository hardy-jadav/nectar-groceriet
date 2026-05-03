import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import logoSvg from '../assets/logo.svg';
import groceryBag from '../assets/grocery-bag.png';

interface LoginErrors { email?: string; password?: string; }
interface SignupErrors { name?: string; email?: string; password?: string; }

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const passwordStrength = (pw: string): { label: string; color: string; width: string } => {
  if (pw.length === 0) return { label: '', color: '', width: '0%' };
  if (pw.length < 6) return { label: 'Too short', color: 'bg-red-400', width: '25%' };
  if (pw.length < 8 || !/[A-Z]/.test(pw) || !/\d/.test(pw))
    return { label: 'Weak', color: 'bg-orange-400', width: '50%' };
  if (!/[^a-zA-Z0-9]/.test(pw))
    return { label: 'Medium', color: 'bg-yellow-400', width: '75%' };
  return { label: 'Strong', color: 'bg-[#53b175]', width: '100%' };
};

/* ── Eye toggle icon ── */
const EyeIcon: React.FC<{ show: boolean }> = ({ show }) =>
  show ? (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7c7c7c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  ) : (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7c7c7c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  );

/* ── Underline field ── */
const Field: React.FC<{
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  error?: string;
  rightEl?: React.ReactNode;
}> = ({ label, type = 'text', value, onChange, placeholder, error, rightEl }) => (
  <div className="mb-6">
    <p className="text-[#7c7c7c] text-sm font-semibold mb-2">{label}</p>
    <div className="flex items-center border-b border-[#e2e2e2] pb-2 focus-within:border-[#53b175] transition-colors">
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 outline-none text-[#181725] text-base bg-transparent placeholder-[#c8c8c8]"
      />
      {rightEl}
    </div>
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

/* ── CarrotLogo ── */
const CarrotLogo: React.FC = () => (
  <div className="flex justify-center mb-8">
    <div className="w-14 h-14 bg-[#53b175] rounded-2xl flex items-center justify-center">
      <img src={logoSvg} alt="Nectar" className="w-8 h-9" />
    </div>
  </div>
);

/* ── Login form ── */
const LoginForm: React.FC<{ onSwitch: () => void }> = ({ onSwitch }) => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState<LoginErrors>({});

  const validate = () => {
    const e: LoginErrors = {};
    if (!email) e.email = 'Email is required';
    else if (!EMAIL_RE.test(email)) e.email = 'Enter a valid email address';
    if (!password) e.password = 'Password is required';
    else if (password.length < 6) e.password = 'Password must be at least 6 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;
    const ok = await login(email, password);
    if (ok) navigate('/signin');
  };

  return (
    <div>
      <CarrotLogo />
      <h2 className="text-[26px] font-bold text-[#181725] mb-1">Loging</h2>
      <p className="text-[#7c7c7c] text-base mb-8">Enter your emails and password</p>

      <Field label="Email" type="email" value={email} onChange={setEmail}
        placeholder="imshuvo97@gmail.com" error={errors.email} />

      <Field label="Password" type={showPw ? 'text' : 'password'} value={password}
        onChange={setPassword} placeholder="••••••••" error={errors.password}
        rightEl={<button type="button" onClick={() => setShowPw(!showPw)} className="cursor-pointer"><EyeIcon show={showPw} /></button>} />

      <div className="flex justify-end mb-8">
        <button className="text-[#181725] text-sm font-medium cursor-pointer">Forgot Password?</button>
      </div>

      <button onClick={handleLogin} disabled={isLoading}
        className="w-full bg-[#53b175] text-white text-lg font-semibold py-[18px] rounded-[19px] cursor-pointer disabled:opacity-60 active:opacity-80 transition-opacity">
        {isLoading ? 'Logging in...' : 'Log In'}
      </button>

      <p className="text-center text-[#181725] text-sm mt-6 font-medium">
        Don't have an account?{' '}
        <button onClick={onSwitch} className="text-[#53b175] font-semibold cursor-pointer">Singup</button>
      </p>
    </div>
  );
};

/* ── Signup form ── */
const SignupForm: React.FC<{ onSwitch: () => void }> = ({ onSwitch }) => {
  const { signup, isLoading } = useAuthStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState<SignupErrors>({});

  const emailValid = EMAIL_RE.test(email);
  const strength = passwordStrength(password);

  const validate = () => {
    const e: SignupErrors = {};
    if (!name.trim()) e.name = 'Username is required';
    if (!email) e.email = 'Email is required';
    else if (!emailValid) e.email = 'Enter a valid email address';
    if (!password) e.password = 'Password is required';
    else if (password.length < 6) e.password = 'Password must be at least 6 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSignup = async () => {
    if (!validate()) return;
    const ok = await signup(name, email, password);
    if (ok) onSwitch();
  };

  return (
    <div>
      <CarrotLogo />
      <h2 className="text-[26px] font-bold text-[#181725] mb-1">Sign Up</h2>
      <p className="text-[#7c7c7c] text-base mb-6">Enter your credentials to continue</p>

      <Field label="Username" value={name} onChange={setName} placeholder="Your name" error={errors.name} />

      <Field label="Email" type="email" value={email} onChange={setEmail}
        placeholder="imshuvo97@gmail.com" error={errors.email}
        rightEl={email && emailValid ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#53b175" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : undefined} />

      {/* Password with strength indicator */}
      <div className="mb-6">
        <p className="text-[#7c7c7c] text-sm font-semibold mb-2">Password</p>
        <div className="flex items-center border-b border-[#e2e2e2] pb-2 focus-within:border-[#53b175] transition-colors">
          <input
            type={showPw ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="flex-1 outline-none text-[#181725] text-base bg-transparent placeholder-[#c8c8c8]"
          />
          <button type="button" onClick={() => setShowPw(!showPw)} className="cursor-pointer">
            <EyeIcon show={showPw} />
          </button>
        </div>
        {password && (
          <div className="mt-2">
            <div className="h-1 rounded-full bg-[#e2e2e2] overflow-hidden">
              <div className={`h-full rounded-full transition-all duration-300 ${strength.color}`} style={{ width: strength.width }} />
            </div>
            <p className={`text-xs mt-1 font-medium ${strength.color.replace('bg-', 'text-').replace('[#53b175]', '[#53b175]')}`}>{strength.label}</p>
          </div>
        )}
        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
      </div>

      <p className="text-[#7c7c7c] text-xs mb-6 leading-relaxed">
        By continuing you agree to our{' '}
        <span className="text-[#53b175] font-semibold">Terms of Service</span>
        {' '}and{' '}
        <span className="text-[#53b175] font-semibold">Privacy Policy</span>.
      </p>

      <button onClick={handleSignup} disabled={isLoading}
        className="w-full bg-[#53b175] text-white text-lg font-semibold py-[18px] rounded-[19px] cursor-pointer disabled:opacity-60 active:opacity-80 transition-opacity">
        {isLoading ? 'Creating account...' : 'Sign Up'}
      </button>

      <p className="text-center text-[#181725] text-sm mt-6 font-medium">
        Already have an account?{' '}
        <button onClick={onSwitch} className="text-[#53b175] font-semibold cursor-pointer">Login</button>
      </p>
    </div>
  );
};

/* ── Auth background (mobile blobs) ── */
const Blobs: React.FC = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-[#f4a9a8]/60 blur-[90px]" />
    <div className="absolute top-24 -left-20 w-64 h-64 rounded-full bg-[#a8e6be]/50 blur-[80px]" />
    <div className="absolute top-8 right-8 w-40 h-40 rounded-full bg-[#fde68a]/50 blur-[60px]" />
    <div className="absolute -bottom-20 -left-10 w-72 h-72 rounded-full bg-[#f4a9a8]/50 blur-[90px]" />
  </div>
);

/* ── Main AuthPage ── */
const AuthPage: React.FC = () => {
  const [tab, setTab] = useState<'login' | 'signup'>('login');

  return (
    <>
      {/* ── MOBILE ─────────────────────────────────────────────── */}
      <div className="lg:hidden min-h-screen max-w-[414px] mx-auto relative bg-white overflow-hidden flex flex-col">
        <Blobs />

        {/* Tab bar */}
        <div className="relative z-10 flex border-b border-[#e2e2e2] mt-14">
          {(['login', 'signup'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-3 text-sm font-semibold cursor-pointer transition-colors ${
                tab === t
                  ? 'text-[#181725] border-b-2 border-[#53b175]'
                  : 'text-[#7c7c7c]'
              }`}
            >
              {t === 'login' ? 'log in' : 'sign up'}
            </button>
          ))}
        </div>

        {/* Form */}
        <div className="relative z-10 flex-1 px-6 pt-6 pb-10 overflow-y-auto">
          {tab === 'login'
            ? <LoginForm onSwitch={() => setTab('signup')} />
            : <SignupForm onSwitch={() => setTab('login')} />
          }
        </div>
      </div>

      {/* ── DESKTOP ────────────────────────────────────────────── */}
      <div className="hidden lg:flex min-h-screen">
        {/* Left: grocery bag image */}
        <div className="w-1/2 xl:w-[55%] relative overflow-hidden bg-[#F2F3F2]">
          <img src={groceryBag} alt="Fresh groceries" className="absolute inset-0 w-full h-full object-cover object-center" />
        </div>

        {/* Right: form panel */}
        <div className="w-1/2 xl:w-[45%] flex flex-col items-center justify-center px-16 bg-white relative overflow-hidden">
          <Blobs />
          <div className="relative z-10 w-full max-w-sm">
            {/* Tab switcher */}
            <div className="flex border-b border-[#e2e2e2] mb-8">
              {(['login', 'signup'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`flex-1 pb-3 text-[15px] font-semibold cursor-pointer transition-colors ${
                    tab === t
                      ? 'text-[#181725] border-b-2 border-[#53b175]'
                      : 'text-[#7c7c7c] hover:text-[#181725]'
                  }`}
                >
                  {t === 'login' ? 'Log In' : 'Sign Up'}
                </button>
              ))}
            </div>

            {tab === 'login'
              ? <LoginForm onSwitch={() => setTab('signup')} />
              : <SignupForm onSwitch={() => setTab('login')} />
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthPage;
