import React, { useState, useEffect } from 'react';
import { getSettings, saveSettings } from '../utils/storageManager';
import { toast } from 'react-hot-toast';

const Settings = () => {
  const [settings, setLocalSettings] = useState({
    mandirName: '',
    whatsappNumber: '',
    upiId: '',
    receiptPrefix: ''
  });

  useEffect(() => {
    setLocalSettings(getSettings());
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    saveSettings(settings);
    toast.success('Settings updated successfully');
  };

  return (
    <div className="p-4 max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-divine text-[#800000]">Settings</h1>
        <p className="text-gray-500">Global configuration for Shyam Arpan portal</p>
      </div>

      <div className="bg-white rounded-[2rem] border border-orange-100 p-8 shadow-sm">
        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[#800000] border-b border-orange-50 pb-2">Mandir Identity</h3>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase">Mandir Name</label>
                <input 
                  type="text" 
                  className="divine-input"
                  value={settings.mandirName}
                  onChange={(e) => setLocalSettings({...settings, mandirName: e.target.value})}
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase">Receipt Prefix</label>
                <input 
                  type="text" 
                  className="divine-input"
                  value={settings.receiptPrefix}
                  onChange={(e) => setLocalSettings({...settings, receiptPrefix: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[#800000] border-b border-orange-50 pb-2">Automation & Payments</h3>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase">WhatsApp Number (with code)</label>
                <input 
                  type="text" 
                  className="divine-input"
                  value={settings.whatsappNumber}
                  onChange={(e) => setLocalSettings({...settings, whatsappNumber: e.target.value})}
                />
                <p className="text-[10px] text-gray-400 mt-1">Used for sending automated booking confirmations</p>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase">UPI ID for Payments</label>
                <input 
                  type="text" 
                  className="divine-input"
                  value={settings.upiId}
                  onChange={(e) => setLocalSettings({...settings, upiId: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="pt-8 flex justify-end">
            <button type="submit" className="btn-primary px-12">
              Save Configuration
            </button>
          </div>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-orange-50 p-6 rounded-[2rem] border border-orange-100">
          <p className="text-2xl mb-2">📱</p>
          <h4 className="font-bold text-[#800000]">WhatsApp Bot</h4>
          <p className="text-xs text-gray-500 mt-1">Connected and ready to send receipts</p>
        </div>
        <div className="bg-green-50 p-6 rounded-[2rem] border border-green-100">
          <p className="text-2xl mb-2">☁️</p>
          <h4 className="font-bold text-green-700">Storage Status</h4>
          <p className="text-xs text-gray-500 mt-1">Local Storage is synchronized</p>
        </div>
        <div className="bg-blue-50 p-6 rounded-[2rem] border border-blue-100">
          <p className="text-2xl mb-2">🔒</p>
          <h4 className="font-bold text-blue-700">Security</h4>
          <p className="text-xs text-gray-500 mt-1">SSL Encrypted Communication</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
