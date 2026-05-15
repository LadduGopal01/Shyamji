import React, { useState, useEffect } from 'react';
import { getSevas, saveSevas } from '../utils/storageManager';
import { toast } from 'react-hot-toast';

const AdminSevas = () => {
  const [sevas, setSevas] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSeva, setEditingSeva] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    slots: '',
    description: '',
    image: ''
  });

  useEffect(() => {
    setSevas(getSevas());
  }, []);

  const openModal = (seva = null) => {
    if (seva) {
      setEditingSeva(seva);
      setFormData(seva);
    } else {
      setEditingSeva(null);
      setFormData({ name: '', category: '', price: '', slots: '', description: '', image: '' });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let updatedSevas;
    if (editingSeva) {
      updatedSevas = sevas.map(s => s.id === editingSeva.id ? { ...formData, id: s.id } : s);
      toast.success('Seva updated successfully');
    } else {
      const newSeva = { ...formData, id: 's' + Date.now() };
      updatedSevas = [...sevas, newSeva];
      toast.success('New Seva added successfully');
    }
    setSevas(updatedSevas);
    saveSevas(updatedSevas);
    setIsModalOpen(false);
  };

  const deleteSeva = (id) => {
    if (window.confirm('Are you sure you want to delete this seva?')) {
      const updated = sevas.filter(s => s.id !== id);
      setSevas(updated);
      saveSevas(updated);
      toast.success('Seva deleted');
    }
  };

  return (
    <div className="p-4 space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-divine text-[#800000]">Manage Sevas</h1>
          <p className="text-gray-500">Configure seva types, pricing and slots</p>
        </div>
        <button 
          onClick={() => openModal()}
          className="btn-primary flex items-center gap-2"
        >
          <span>➕</span> Add New Seva
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sevas.map((seva) => (
          <div key={seva.id} className="bg-white rounded-[2rem] border border-orange-100 overflow-hidden group hover:shadow-xl transition-all">
            <div className="relative h-40">
              <img src={seva.image} alt={seva.name} className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-[#800000] uppercase">
                {seva.category}
              </div>
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <button 
                  onClick={() => openModal(seva)}
                  className="bg-white p-2 rounded-full text-[#800000] hover:scale-110 transition-transform"
                >
                  ✏️
                </button>
                <button 
                  onClick={() => deleteSeva(seva.id)}
                  className="bg-red-500 p-2 rounded-full text-white hover:scale-110 transition-transform"
                >
                  🗑️
                </button>
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-bold text-[#800000] mb-2">{seva.name}</h3>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-bold">Amount</p>
                  <p className="text-xl font-bold text-[#d4af37]">₹{seva.price}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-gray-400 uppercase font-bold">Daily Slots</p>
                  <p className="text-sm font-bold text-gray-600">{seva.slots}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative w-full max-w-xl bg-white rounded-[2.5rem] shadow-2xl p-8 overflow-y-auto max-h-[90vh]">
            <h2 className="text-2xl font-divine text-[#800000] mb-6">
              {editingSeva ? 'Edit Seva' : 'Add New Seva'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase">Seva Name</label>
                <input 
                  required
                  type="text" 
                  className="divine-input"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase">Category</label>
                  <select 
                    className="divine-input"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    <option value="">Select Category</option>
                    <option value="Festival">Festival</option>
                    <option value="Shringar">Shringar</option>
                    <option value="Bhog">Bhog</option>
                    <option value="Aarti">Aarti</option>
                    <option value="Prasad">Prasad</option>
                    <option value="Deep Daan">Deep Daan</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase">Price (₹)</label>
                  <input 
                    required
                    type="number" 
                    className="divine-input"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase">Total Slots</label>
                  <input 
                    required
                    type="number" 
                    className="divine-input"
                    value={formData.slots}
                    onChange={(e) => setFormData({...formData, slots: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase">Image URL</label>
                  <input 
                    required
                    type="text" 
                    className="divine-input"
                    placeholder="https://..."
                    value={formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase">Description</label>
                <textarea 
                  required
                  className="divine-input h-24 resize-none"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                ></textarea>
              </div>
              <div className="pt-4 flex gap-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn-secondary flex-1">Cancel</button>
                <button type="submit" className="btn-primary flex-1">Save Seva</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSevas;
