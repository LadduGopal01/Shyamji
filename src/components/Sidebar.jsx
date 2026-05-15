import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { clearAuthUser } from '../utils/storageManager';

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuthUser();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: '📊' },
    { name: 'Seva Bookings', path: '/admin/bookings', icon: '📅' },
    { name: 'Manage Sevas', path: '/admin/sevas', icon: '🕉️' },
    { name: 'Settings', path: '/admin/settings', icon: '⚙️' },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 w-64 gradient-shyam text-white z-50 transform transition-transform duration-300 lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-divine text-xl">
              SA
            </div>
            <div>
              <h2 className="font-divine text-lg leading-none">Admin Panel</h2>
              <p className="text-[10px] text-[#d4af37] font-bold tracking-widest uppercase">Shyam Arpan</p>
            </div>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) => `
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                  ${isActive 
                    ? 'bg-white/10 text-[#d4af37] border-l-4 border-[#d4af37]' 
                    : 'hover:bg-white/5 text-white/70 hover:text-white'}
                `}
              >
                <span>{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/10">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-white/5 text-red-300 transition-all"
          >
            <span>🚪</span>
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;