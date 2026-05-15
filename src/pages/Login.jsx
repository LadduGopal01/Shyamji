import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFromStorage, STORAGE_KEYS, saveAuthUser } from '../utils/storageManager';
import { toast } from 'react-hot-toast';

import Footer from '../components/Footer';

const Login = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const users = getFromStorage(STORAGE_KEYS.USERS) || [];
    const user = users.find(u => u.id === id && u.password === password);

    if (user) {
      saveAuthUser(user);
      toast.success('Welcome to Admin Panel');
      navigate('/admin/dashboard');
    } else {
      toast.error('Invalid ID or Password');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-pattern">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-md w-full glass-panel p-10 space-y-8 animate-fade-in">
          <div className="text-center space-y-2">
            <div className="w-20 h-20 gradient-shyam rounded-full flex items-center justify-center text-white font-divine text-3xl shadow-xl mx-auto mb-6">
              SA
            </div>
            <h1 className="text-3xl font-divine text-[#800000]">Admin Login</h1>
            <p className="text-gray-500">Shyam Arpan Management Portal</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 ml-1">Admin ID</label>
                <input
                  type="text"
                  required
                  className="divine-input"
                  placeholder="Enter admin id"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 ml-1">Password</label>
                <input
                  type="password"
                  required
                  className="divine-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button type="submit" className="btn-primary w-full py-4 text-lg">
              Login as Admin
            </button>
          </form>

          <div className="text-center pt-4">
            <button 
              onClick={() => navigate('/')}
              className="text-[#800000] hover:underline text-sm font-medium"
            >
              ← Back to Devotee App
            </button>
          </div>
          
          <div className="bg-[#800000]/5 p-4 rounded-xl border border-[#800000]/10 text-[10px] text-gray-400 text-center">
            <p>Demo Login: <b>admin / admin</b></p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
