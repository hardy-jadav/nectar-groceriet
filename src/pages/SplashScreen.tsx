import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logoSvg from '../assets/logo.svg';

const SplashScreen: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/onboarding');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#53b175] flex items-center justify-center">
      <div className="flex items-center gap-4">
        <img src={logoSvg} alt="Nectar logo" className="w-[55px] h-[64px]" />
        <div className="flex flex-col">
          <h1 className="text-[42px] font-bold text-white leading-none tracking-wide">
            nectar
          </h1>
          <p className="text-white/80 tracking-[4px] text-[13px] mt-1">
            online groceriet
          </p>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
