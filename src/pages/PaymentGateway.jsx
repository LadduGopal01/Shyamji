import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { saveBooking, saveDonation, getSettings } from '../utils/storageManager';
import { toast } from 'react-hot-toast';

const PaymentGateway = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const settings = getSettings();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('UPI');

  const { type, seva, formData, amount } = location.state || {};

  useEffect(() => {
    if (!location.state) navigate('/');
  }, [location.state, navigate]);

  const finalAmount = type === 'SEVA' ? seva.price : (amount || 0);

  const handlePayment = () => {
    setIsProcessing(true);
    
    // Simulate payment delay
    setTimeout(() => {
      const id = 'TXN' + Math.random().toString(36).substr(2, 9).toUpperCase();
      const date = new Date().toISOString();
      
      const record = {
        id,
        timestamp: date,
        amount: finalAmount,
        status: 'SUCCESS',
        paymentMethod,
        ...formData
      };

      if (type === 'SEVA') {
        saveBooking({ ...record, sevaId: seva.id, sevaName: seva.name });
      } else {
        saveDonation({ ...record, type: 'DONATION' });
      }

      toast.success('Payment Successful!');
      navigate(`/receipt/${id}`);
    }, 2500);
  };

  if (isProcessing) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-6">
        <div className="w-20 h-20 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin"></div>
        <div className="text-center">
          <h2 className="text-2xl font-divine text-[#800000]">Verifying Payment...</h2>
          <p className="text-gray-500">Please do not refresh or close this page</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 animate-fade-in">
      <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Order Summary */}
        <div className="bg-[#800000] text-white p-12 md:w-2/5">
          <h2 className="text-2xl font-divine mb-8">Order Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between border-b border-white/10 pb-4">
              <span className="text-white/60">Type</span>
              <span className="font-bold">{type === 'SEVA' ? 'Seva Booking' : 'Donation'}</span>
            </div>
            {type === 'SEVA' && (
              <div className="flex justify-between border-b border-white/10 pb-4">
                <span className="text-white/60">Seva</span>
                <span className="font-bold">{seva.name}</span>
              </div>
            )}
            <div className="flex justify-between border-b border-white/10 pb-4">
              <span className="text-white/60">Name</span>
              <span className="font-bold">{formData?.devoteeName || 'Devotee'}</span>
            </div>
            <div className="pt-8">
              <p className="text-white/60 text-sm">Total Payable</p>
              <p className="text-4xl font-bold text-[#d4af37]">₹{finalAmount}</p>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="p-12 md:w-3/5 space-y-8">
          <h2 className="text-2xl font-divine text-[#800000]">Select Payment Method</h2>
          
          <div className="grid grid-cols-1 gap-4">
            <button 
              onClick={() => setPaymentMethod('UPI')}
              className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${
                paymentMethod === 'UPI' ? 'border-[#800000] bg-orange-50' : 'border-gray-100'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#800000] rounded-full flex items-center justify-center text-white">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="font-bold text-[#800000]">UPI / QR Code</p>
                  <p className="text-xs text-gray-500">Google Pay, PhonePe, Paytm</p>
                </div>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                paymentMethod === 'UPI' ? 'border-[#800000]' : 'border-gray-300'
              }`}>
                {paymentMethod === 'UPI' && <div className="w-3 h-3 bg-[#800000] rounded-full"></div>}
              </div>
            </button>

            <button 
              onClick={() => setPaymentMethod('CARD')}
              className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${
                paymentMethod === 'CARD' ? 'border-[#800000] bg-orange-50' : 'border-gray-100'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="font-bold text-[#800000]">Credit / Debit Card</p>
                  <p className="text-xs text-gray-500">Visa, Mastercard, RuPay</p>
                </div>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                paymentMethod === 'CARD' ? 'border-[#800000]' : 'border-gray-300'
              }`}>
                {paymentMethod === 'CARD' && <div className="w-3 h-3 bg-[#800000] rounded-full"></div>}
              </div>
            </button>
          </div>

          {paymentMethod === 'UPI' && (
            <div className="text-center space-y-4 bg-gray-50 p-6 rounded-2xl border border-dashed border-gray-300">
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=${settings.upiId}%26pn=ShyamArpan%26am=${finalAmount}%26cu=INR`} 
                alt="QR Code" 
                className="mx-auto shadow-lg rounded-xl"
              />
              <p className="text-sm font-medium text-gray-500">Scan this QR code to pay using any UPI app</p>
              <p className="text-xs text-[#800000] font-bold">UPI ID: {settings.upiId}</p>
            </div>
          )}

          <button 
            onClick={handlePayment}
            className="btn-primary w-full py-4 text-lg"
          >
            Confirm Payment ₹{finalAmount}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentGateway;
