import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import Footer from './Footer';

const PublicLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#fffaf0] bg-pattern flex flex-col">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 glass-panel mx-4 my-2 px-6 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 gradient-shyam rounded-full flex items-center justify-center text-white font-divine text-xl shadow-lg">
            SA
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#800000] leading-none">Shyam Arpan</h1>
            <p className="text-[10px] text-[#d4af37] font-medium tracking-[0.2em] uppercase">Khatu Shyam Seva</p>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-[#800000] font-medium">
          <Link to="/" className="hover:text-[#d4af37] transition-colors">Home</Link>
          <a href="#sevas" className="hover:text-[#d4af37] transition-colors">Book Seva</a>
          <Link to="/login" className="hover:text-[#d4af37] transition-colors">Admin Login</Link>
        </div>

        <button 
          onClick={() => navigate('/login')}
          className="btn-primary text-sm px-5 py-2"
        >
          My Bookings
        </button>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 pb-20 flex-1 w-full">
        <Outlet />
      </main>

      {/* Shared Footer */}
      <Footer />
    </div>
  );
};

export default PublicLayout;
