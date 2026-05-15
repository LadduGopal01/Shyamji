import React, { useState, useEffect } from 'react';
import { getBookings, getDonations, getSevas } from '../utils/storageManager';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalCollections: 0,
    totalBookings: 0,
    totalDonations: 0,
    todayCollections: 0
  });

  const [recentBookings, setRecentBookings] = useState([]);

  useEffect(() => {
    const bookings = getBookings();
    const donations = getDonations();
    
    const totalColl = [...bookings, ...donations].reduce((acc, curr) => acc + curr.amount, 0);
    
    const today = new Date().toISOString().split('T')[0];
    const todayColl = [...bookings, ...donations]
      .filter(r => r.timestamp.startsWith(today))
      .reduce((acc, curr) => acc + curr.amount, 0);

    setStats({
      totalCollections: totalColl,
      totalBookings: bookings.length,
      totalDonations: donations.length,
      todayCollections: todayColl
    });

    setRecentBookings(bookings.slice(0, 5));
  }, []);

  return (
    <div className="space-y-8 p-4">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-divine text-[#800000]">Dashboard Overview</h1>
          <p className="text-gray-500">Real-time statistics for Shyam Arpan</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-gray-400">Today's Date</p>
          <p className="text-lg font-bold text-[#800000]">{new Date().toLocaleDateString('en-IN', { dateStyle: 'long' })}</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Today's Collection", val: `₹${stats.todayCollections}`, color: "bg-orange-50", icon: "💰" },
          { label: "Total Bookings", val: stats.totalBookings, color: "bg-blue-50", icon: "📅" },
          { label: "Total Donations", val: stats.totalDonations, color: "bg-green-50", icon: "🙏" },
          { label: "Total Revenue", val: `₹${stats.totalCollections}`, color: "bg-purple-50", icon: "📈" }
        ].map((stat, i) => (
          <div key={i} className={`${stat.color} p-6 rounded-[2rem] border border-black/5 flex items-center justify-between`}>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className="text-2xl font-bold text-gray-800">{stat.val}</h3>
            </div>
            <div className="text-3xl opacity-50">{stat.icon}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Bookings */}
        <div className="lg:col-span-2 bg-white rounded-[2rem] border border-orange-100 p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-[#800000]">Recent Bookings</h2>
            <button className="text-sm text-[#d4af37] font-bold hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] text-gray-400 uppercase tracking-widest border-b border-gray-100">
                  <th className="pb-4">Devotee</th>
                  <th className="pb-4">Seva Name</th>
                  <th className="pb-4">Amount</th>
                  <th className="pb-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentBookings.map((b) => (
                  <tr key={b.id} className="group hover:bg-orange-50/50 transition-colors">
                    <td className="py-4">
                      <p className="font-bold text-gray-800">{b.devoteeName}</p>
                      <p className="text-xs text-gray-400">{b.mobile}</p>
                    </td>
                    <td className="py-4">
                      <p className="text-sm text-gray-600">{b.sevaName}</p>
                    </td>
                    <td className="py-4">
                      <p className="font-bold text-[#d4af37]">₹{b.amount}</p>
                    </td>
                    <td className="py-4">
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-[10px] font-bold">
                        SUCCESS
                      </span>
                    </td>
                  </tr>
                ))}
                {recentBookings.length === 0 && (
                  <tr>
                    <td colSpan="4" className="py-8 text-center text-gray-400 italic">No recent bookings found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions / Reports */}
        <div className="space-y-6">
          <div className="gradient-shyam p-8 rounded-[2rem] text-white">
            <h3 className="text-xl font-divine mb-4">Quick Reports</h3>
            <div className="space-y-3">
              <button className="w-full bg-white/10 hover:bg-white/20 p-4 rounded-2xl flex items-center justify-between transition-all">
                <span>Daily Collection Report</span>
                <span>📥</span>
              </button>
              <button className="w-full bg-white/10 hover:bg-white/20 p-4 rounded-2xl flex items-center justify-between transition-all">
                <span>Festival-wise Report</span>
                <span>📥</span>
              </button>
              <button className="w-full bg-white/10 hover:bg-white/20 p-4 rounded-2xl flex items-center justify-between transition-all">
                <span>Donor List (PDF)</span>
                <span>📥</span>
              </button>
            </div>
          </div>

          <div className="bg-white border border-orange-100 p-8 rounded-[2rem]">
            <h3 className="text-xl font-bold text-[#800000] mb-4">Mandir Updates</h3>
            <div className="space-y-4">
              <div className="flex gap-4 p-3 hover:bg-orange-50 rounded-xl transition-all cursor-pointer">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center text-xl">🪔</div>
                <div>
                  <p className="text-sm font-bold">Ekadashi Special Seva</p>
                  <p className="text-[10px] text-gray-400">Next Ekadashi in 3 days</p>
                </div>
              </div>
              <div className="flex gap-4 p-3 hover:bg-orange-50 rounded-xl transition-all cursor-pointer">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-xl">🔱</div>
                <div>
                  <p className="text-sm font-bold">New Shringar Photos</p>
                  <p className="text-[10px] text-gray-400">Uploaded by Pujari Ji</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
