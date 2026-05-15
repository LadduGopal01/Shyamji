import React, { useState, useEffect } from 'react';
import { getBookings, getDonations } from '../utils/storageManager';

const AdminBookings = () => {
  const [activeTab, setActiveTab] = useState('SEVA');
  const [searchTerm, setSearchTerm] = useState('');
  const [bookings, setBookings] = useState([]);
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    setBookings(getBookings());
    setDonations(getDonations());
  }, []);

  const data = activeTab === 'SEVA' ? bookings : donations;
  
  const filteredData = data.filter(item => 
    item.devoteeName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.mobile?.includes(searchTerm) ||
    item.id?.includes(searchTerm.toUpperCase())
  );

  return (
    <div className="p-4 space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-divine text-[#800000]">Manage Bookings</h1>
          <p className="text-gray-500">View and manage all devotee transactions</p>
        </div>
        
        <div className="flex gap-2 bg-orange-50 p-1 rounded-xl">
          <button 
            onClick={() => setActiveTab('SEVA')}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
              activeTab === 'SEVA' ? 'bg-[#800000] text-white shadow-lg' : 'text-[#800000]/60'
            }`}
          >
            Seva Bookings
          </button>
          <button 
            onClick={() => setActiveTab('DONATION')}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
              activeTab === 'DONATION' ? 'bg-[#800000] text-white shadow-lg' : 'text-[#800000]/60'
            }`}
          >
            Donations
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] border border-orange-100 p-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <span className="absolute left-4 top-1/2 -translate-y-1/2">🔍</span>
            <input 
              type="text" 
              placeholder="Search by name, mobile or transaction id..."
              className="divine-input pl-12"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="btn-secondary flex items-center gap-2">
            <span>📅</span>
            Filter by Date
          </button>
          <button className="btn-primary flex items-center gap-2">
            <span>📥</span>
            Export Excel
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] text-gray-400 uppercase tracking-widest border-b border-gray-100">
                <th className="pb-4">Transaction Details</th>
                <th className="pb-4">Devotee Information</th>
                <th className="pb-4">Seva / Type</th>
                <th className="pb-4 text-right">Amount</th>
                <th className="pb-4 text-center">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredData.map((item) => (
                <tr key={item.id} className="group hover:bg-orange-50/50 transition-colors">
                  <td className="py-4">
                    <p className="text-xs font-bold text-gray-400">#{item.id.slice(-8)}</p>
                    <p className="text-xs text-gray-500">{new Date(item.timestamp).toLocaleString()}</p>
                  </td>
                  <td className="py-4">
                    <p className="font-bold text-gray-800">{item.devoteeName || 'Anonymous'}</p>
                    <div className="flex gap-2 mt-1">
                      <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-bold">
                        {item.mobile || 'N/A'}
                      </span>
                      {item.gotra && (
                        <span className="text-[10px] bg-purple-50 text-purple-600 px-2 py-0.5 rounded font-bold">
                          {item.gotra}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-4">
                    <p className="text-sm text-[#800000] font-medium">{item.sevaName || 'General Donation'}</p>
                    <p className="text-[10px] text-gray-400 capitalize">{item.paymentMethod}</p>
                  </td>
                  <td className="py-4 text-right">
                    <p className="font-bold text-gray-800">₹{item.amount}</p>
                  </td>
                  <td className="py-4 text-center">
                    <a 
                      href={`/receipt/${item.id}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[#d4af37] hover:text-[#800000] transition-colors"
                    >
                      📄
                    </a>
                  </td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan="5" className="py-12 text-center">
                    <div className="flex flex-col items-center gap-2 opacity-30">
                      <span className="text-4xl">📭</span>
                      <p>No transactions found for your search</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminBookings;
