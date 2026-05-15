import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSevas } from '../utils/storageManager';

const SevaDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [seva, setSeva] = useState(null);
  const [formData, setFormData] = useState({
    devoteeName: '',
    mobile: '',
    gotra: '',
    address: '',
    bookingDate: new Date().toISOString().split('T')[0],
    familyMembers: ''
  });

  useEffect(() => {
    const allSevas = getSevas();
    const found = allSevas.find(s => s.id === id);
    if (found) setSeva(found);
    else navigate('/');
  }, [id, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/payment', { state: { type: 'SEVA', seva, formData } });
  };

  if (!seva) return null;

  return (
    <div className="max-w-5xl mx-auto py-8 space-y-8 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left: Info */}
        <div className="space-y-6">
          <button 
            onClick={() => navigate('/')}
            className="text-[#800000] hover:underline flex items-center gap-2 mb-4"
          >
            ← Back to Sevas
          </button>
          
          <img 
            src={seva.image} 
            alt={seva.name} 
            className="w-full h-80 object-cover rounded-[2rem] shadow-xl"
          />
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-divine text-[#800000]">{seva.name}</h1>
              <span className="bg-orange-100 text-[#800000] px-4 py-1 rounded-full text-xs font-bold uppercase">
                {seva.category}
              </span>
            </div>
            <p className="text-gray-600 leading-relaxed text-lg">{seva.description}</p>
            
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="bg-white p-4 rounded-2xl border border-orange-50">
                <p className="text-xs text-gray-400 uppercase font-bold">Seva Amount</p>
                <p className="text-2xl font-bold text-[#d4af37]">₹{seva.price}</p>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-orange-50">
                <p className="text-xs text-gray-400 uppercase font-bold">Daily Slots</p>
                <p className="text-2xl font-bold text-[#800000]">{seva.slots}</p>
              </div>
            </div>

            <div className="bg-[#800000]/5 p-6 rounded-[1.5rem] border border-[#800000]/10">
              <h3 className="font-bold text-[#800000] mb-2">Important Instructions:</h3>
              <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
                <li>Please provide correct Gotra for Sankalp.</li>
                <li>Receipt will be generated instantly after payment.</li>
                <li>Seva photo/video will be shared on WhatsApp if applicable.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right: Booking Form */}
        <div className="glass-panel p-8 sticky top-24">
          <h2 className="text-2xl font-divine text-[#800000] mb-6">Booking Details</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 ml-1">Devotee Name *</label>
              <input 
                required
                type="text" 
                placeholder="Enter full name"
                className="divine-input"
                value={formData.devoteeName}
                onChange={(e) => setFormData({...formData, devoteeName: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 ml-1">Mobile Number *</label>
                <input 
                  required
                  type="tel" 
                  placeholder="10-digit number"
                  className="divine-input"
                  value={formData.mobile}
                  onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 ml-1">Gotra</label>
                <input 
                  type="text" 
                  placeholder="e.g. Kashyap"
                  className="divine-input"
                  value={formData.gotra}
                  onChange={(e) => setFormData({...formData, gotra: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 ml-1">Select Date *</label>
              <input 
                required
                type="date" 
                min={new Date().toISOString().split('T')[0]}
                className="divine-input"
                value={formData.bookingDate}
                onChange={(e) => setFormData({...formData, bookingDate: e.target.value})}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 ml-1">Family Members Name (Optional)</label>
              <textarea 
                placeholder="Enter names for group sankalp"
                className="divine-input h-20 resize-none"
                value={formData.familyMembers}
                onChange={(e) => setFormData({...formData, familyMembers: e.target.value})}
              ></textarea>
            </div>

            <div className="pt-4">
              <button type="submit" className="btn-gold w-full py-4 text-lg shadow-xl shadow-gold/20">
                Proceed to Pay ₹{seva.price}
              </button>
              <p className="text-center text-[10px] text-gray-400 mt-3">
                By proceeding, you agree to our Terms and Mandir Rules.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SevaDetail;
