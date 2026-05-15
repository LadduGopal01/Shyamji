import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBookings, getDonations, getSettings } from '../utils/storageManager';
import { toast } from 'react-hot-toast';

const ReceiptPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const settings = getSettings();
  const [record, setRecord] = useState(null);

  useEffect(() => {
    const all = [...getBookings(), ...getDonations()];
    const found = all.find(r => r.id === id);
    if (found) setRecord(found);
  }, [id]);

  const handleDownload = () => {
    window.print();
  };

  const handleWhatsApp = () => {
    toast.success('Receipt link shared to ' + record.mobile);
  };

  if (!record) return null;

  return (
    <div className="max-w-3xl mx-auto py-12 animate-fade-in">
      <div className="flex justify-between items-center mb-8 no-print">
        <h1 className="text-2xl font-divine text-[#800000]">Booking Confirmed!</h1>
        <div className="flex gap-4">
          <button onClick={handleDownload} className="btn-secondary text-sm flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download PDF
          </button>
          <button onClick={handleWhatsApp} className="btn-primary text-sm bg-green-600 hover:bg-green-700 border-none flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Share on WhatsApp
          </button>
        </div>
      </div>

      <div className="receipt-paper p-12 max-w-2xl mx-auto border border-orange-100 rounded-lg">
        <div className="text-center space-y-2 mb-12 border-b border-gray-100 pb-8">
          <h2 className="text-3xl font-divine text-[#800000]">{settings.mandirName}</h2>
          <p className="text-sm text-gray-500 font-medium tracking-[0.2em] uppercase">Seva Confirmation Receipt</p>
          <p className="text-xs text-gray-400">Khatu, Sikar, Rajasthan - 332602</p>
        </div>

        <div className="grid grid-cols-2 gap-y-6 text-sm">
          <div>
            <p className="text-gray-400 uppercase text-[10px] font-bold">Receipt No.</p>
            <p className="font-bold text-[#800000]">#{record.id.slice(-6)}</p>
          </div>
          <div className="text-right">
            <p className="text-gray-400 uppercase text-[10px] font-bold">Date & Time</p>
            <p className="font-bold">{new Date(record.timestamp).toLocaleString()}</p>
          </div>

          <div className="col-span-2 border-t border-dashed border-gray-200 pt-6">
            <p className="text-gray-400 uppercase text-[10px] font-bold mb-4">Devotee Details</p>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500">Name:</span>
                <span className="font-bold text-gray-800">{record.devoteeName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Mobile:</span>
                <span className="font-bold text-gray-800">{record.mobile}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Gotra:</span>
                <span className="font-bold text-gray-800">{record.gotra || 'N/A'}</span>
              </div>
            </div>
          </div>

          <div className="col-span-2 border-t border-dashed border-gray-200 pt-6">
            <p className="text-gray-400 uppercase text-[10px] font-bold mb-4">Seva Details</p>
            <div className="bg-orange-50/50 p-4 rounded-xl space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Service:</span>
                <span className="font-bold text-[#800000]">{record.sevaName || 'General Donation'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Booking Date:</span>
                <span className="font-bold text-gray-800">{record.bookingDate || '-'}</span>
              </div>
              {record.familyMembers && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Family Members:</span>
                  <span className="font-bold text-gray-800 text-right max-w-[200px]">{record.familyMembers}</span>
                </div>
              )}
            </div>
          </div>

          <div className="col-span-2 border-t border-gray-100 pt-8 mt-4">
            <div className="flex justify-between items-center bg-[#800000] text-white p-6 rounded-2xl">
              <div>
                <p className="text-white/60 text-xs uppercase font-bold">Total Amount Paid</p>
                <p className="text-3xl font-bold">₹{record.amount}</p>
              </div>
              <div className="text-right">
                <p className="text-white/60 text-xs uppercase font-bold">Status</p>
                <p className="text-xl font-bold text-green-400 flex items-center gap-2">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  SUCCESS
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex justify-between items-end opacity-50">
          <div className="text-[10px] space-y-1">
            <p>Computer generated receipt.</p>
            <p>No signature required.</p>
            <p>Verification: {record.id}</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-[#800000] rounded-full mx-auto mb-2 flex items-center justify-center text-white font-divine text-xs">STAMP</div>
            <p className="text-[10px] font-bold">Mandir Office</p>
          </div>
        </div>
      </div>
      
      <div className="text-center mt-12 no-print">
        <button 
          onClick={() => navigate('/')}
          className="text-[#800000] hover:underline font-medium"
        >
          ← Return to Home
        </button>
      </div>
    </div>
  );
};

export default ReceiptPage;
