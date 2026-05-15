import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSevas } from '../utils/storageManager';

const Home = () => {
  const navigate = useNavigate();
  const [sevas, setSevas] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    setSevas(getSevas());
  }, []);

  const categories = ['All', ...new Set(sevas.map(s => s.category))];

  const filteredSevas = activeCategory === 'All' 
    ? sevas 
    : sevas.filter(s => s.category === activeCategory);

  return (
    <div className="space-y-12 animate-fade-in">
      {/* Hero Section */}
      <section className="relative h-[60vh] rounded-[2.5rem] overflow-hidden shadow-2xl mt-4">
        <img 
          src="https://images.unsplash.com/photo-1544923246-77307dd654ca?q=80&w=1200&auto=format&fit=crop" 
          alt="Khatu Shyam Ji" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-8 md:p-16">
          <h1 className="text-4xl md:text-6xl font-divine text-white mb-4">Jai Shree Shyam</h1>
          <p className="text-xl text-white/90 max-w-2xl mb-8 leading-relaxed">
            Harsh Ki Unchai Se, Khatu Ke Pawan Darbar Se. 
            Baba Shyam Sabki Sunte Hain. Digital seva booking for every devotee.
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => document.getElementById('sevas').scrollIntoView({ behavior: 'smooth' })}
              className="btn-gold px-8 py-3 text-lg"
            >
              Book Seva Now
            </button>
            <button className="bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-3 rounded-full font-medium hover:bg-white/30 transition-all">
              Live Darshan
            </button>
          </div>
        </div>
      </section>

      {/* Featured Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { label: 'Daily Darshan', val: '10k+' },
          { label: 'Sevas Completed', val: '50k+' },
          { label: 'Registered Devotees', val: '1M+' },
          { label: 'Mandir Events', val: '12' }
        ].map((stat, i) => (
          <div key={i} className="glass-panel p-6 text-center">
            <h3 className="text-2xl font-bold text-[#800000]">{stat.val}</h3>
            <p className="text-sm text-[#800000]/60 font-medium uppercase tracking-wider">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* Seva Categories & Booking */}
      <section id="sevas" className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl md:text-4xl font-divine text-[#800000]">Online Seva Booking</h2>
          <p className="text-[#800000]/60">Select from various sevas and participate in temple rituals</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                activeCategory === cat 
                ? 'bg-[#800000] text-white shadow-lg' 
                : 'bg-white text-[#800000] border border-orange-100 hover:border-[#800000]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Seva Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSevas.map(seva => (
            <div key={seva.id} className="divine-card group">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={seva.image} 
                  alt={seva.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-[#800000] uppercase">
                  {seva.category}
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold text-[#800000] group-hover:text-[#a00000] transition-colors">{seva.name}</h3>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">{seva.description}</p>
                <div className="flex items-center justify-between pt-4 border-t border-orange-50">
                  <div className="text-2xl font-bold text-[#d4af37]">₹{seva.price}</div>
                  <button 
                    onClick={() => navigate(`/seva/${seva.id}`)}
                    className="btn-primary"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Donation Section */}
      <section className="gradient-shyam rounded-[2rem] p-8 md:p-16 text-white flex flex-col md:flex-row items-center gap-12 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4af37]/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="relative z-10 space-y-6 flex-1">
          <h2 className="text-3xl md:text-5xl font-divine">General Donation / Daan</h2>
          <p className="text-white/80 text-lg max-w-lg">
            Your contributions help in the development of the temple and social services. 
            Every drop makes an ocean of difference.
          </p>
          <div className="flex gap-4">
            {[101, 501, 1100, 2100].map(amt => (
              <button 
                key={amt}
                onClick={() => navigate('/payment', { state: { type: 'DONATION', amount: amt } })}
                className="bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-2 rounded-lg transition-all"
              >
                ₹{amt}
              </button>
            ))}
          </div>
          <button 
            onClick={() => navigate('/payment', { state: { type: 'DONATION' } })}
            className="btn-gold"
          >
            Custom Amount
          </button>
        </div>
        <div className="flex-1 hidden lg:block">
          <img 
            src="https://images.unsplash.com/photo-1590050752117-23a9d7fc2431?q=80&w=500&auto=format&fit=crop" 
            alt="Donation" 
            className="rounded-3xl shadow-2xl rotate-3 hover:rotate-0 transition-all duration-500"
          />
        </div>
      </section>
    </div>
  );
};

export default Home;
