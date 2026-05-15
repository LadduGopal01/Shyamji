import React from 'react';
import { getAuthUser } from '../utils/storageManager';

const Header = ({ onMenuClick }) => {
  const user = getAuthUser();

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-orange-100 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-orange-50 rounded-lg text-[#800000]"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h2 className="text-xl font-divine text-[#800000]">Jai Shree Shyam</h2>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:block text-right">
          <p className="text-sm font-bold text-[#800000]">{user?.name || 'Admin'}</p>
          <p className="text-[10px] text-gray-400 uppercase tracking-widest">{user?.role || 'Mandir Admin'}</p>
        </div>
        <div className="w-10 h-10 gradient-shyam rounded-full flex items-center justify-center text-white border-2 border-[#d4af37]">
          {user?.name?.charAt(0) || 'A'}
        </div>
      </div>
    </header>
  );
};

export default Header;