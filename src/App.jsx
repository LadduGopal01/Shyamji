import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';
import PublicLayout from './components/PublicLayout';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import AdminBookings from './pages/AdminBookings';
import AdminSevas from './pages/AdminSevas';
import Settings from './pages/Settings';
import Home from './pages/Home';
import SevaDetail from './pages/SevaDetail';
import PaymentGateway from './pages/PaymentGateway';
import ReceiptPage from './pages/ReceiptPage';
import ProtectedRoute from './components/ProtectedRoute';
import { initializeStorage } from './utils/storageManager';

function App() {
  useEffect(() => {
    initializeStorage();
  }, []);

  return (
    <div className="min-h-screen">
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path="seva/:id" element={<SevaDetail />} />
            <Route path="payment" element={<PaymentGateway />} />
            <Route path="receipt/:id" element={<ReceiptPage />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/login" element={<Login />} />
          
          <Route path="/admin" element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="bookings" element={<AdminBookings />} />
            <Route path="sevas" element={<AdminSevas />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;