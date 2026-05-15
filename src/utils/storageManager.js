// Storage Manager - Handle all localStorage operations for Khatu Shyam Seva
const STORAGE_KEYS = {
  USERS: 'shyam_users',
  SEVAS: 'shyam_sevas',
  BOOKINGS: 'shyam_bookings',
  DONATIONS: 'shyam_donations',
  SETTINGS: 'shyam_settings',
  AUTH_USER: 'shyam_authUser'
};

const DEFAULT_USERS = [
  { id: 'admin', name: 'Mandir Admin', password: 'admin', role: 'ADMIN' }
];

const DEFAULT_SEVAS = [
  { 
    id: 's1', 
    name: 'Janmashtami Special Seva', 
    category: 'Festival', 
    price: 2100, 
    slots: 100, 
    description: 'Special puja and bhog on Janmashtami',
    image: 'https://images.unsplash.com/photo-1590050752117-23a9d7fc2431?q=80&w=500&auto=format&fit=crop'
  },
  { 
    id: 's2', 
    name: 'Shyam Baba Shringar', 
    category: 'Shringar', 
    price: 5100, 
    slots: 5, 
    description: 'Grand Shringar of Baba Shyam with fresh flowers',
    image: 'https://images.unsplash.com/photo-1544923246-77307dd654ca?q=80&w=500&auto=format&fit=crop'
  },
  { 
    id: 's3', 
    name: 'Chappan Bhog Seva', 
    category: 'Bhog', 
    price: 11000, 
    slots: 2, 
    description: 'Offering of 56 types of delicacies to Baba',
    image: 'https://images.unsplash.com/photo-1621911488244-33f93efd97cd?q=80&w=500&auto=format&fit=crop'
  },
  { 
    id: 's4', 
    name: 'Daily Aarti Seva', 
    category: 'Aarti', 
    price: 501, 
    slots: 50, 
    description: 'Participation in the divine morning/evening aarti',
    image: 'https://images.unsplash.com/photo-1536627217140-692790903332?q=80&w=500&auto=format&fit=crop'
  },
  { 
    id: 's5', 
    name: 'Prasad Seva', 
    category: 'Prasad', 
    price: 251, 
    slots: 200, 
    description: 'Distribution of holy prasad to devotees',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=500&auto=format&fit=crop'
  },
  { 
    id: 's6', 
    name: 'Deep Daan', 
    category: 'Deep Daan', 
    price: 101, 
    slots: 500, 
    description: 'Lighting lamps in the temple premises',
    image: 'https://images.unsplash.com/photo-1545229831-7d63ef83e851?q=80&w=500&auto=format&fit=crop'
  }
];

const DEFAULT_SETTINGS = {
  mandirName: 'Shyam Mandir, Khatu',
  whatsappNumber: '919876543210',
  upiId: 'khatushyam@upi',
  receiptPrefix: 'SA'
};

export const initializeStorage = () => {
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(DEFAULT_USERS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.SEVAS)) {
    localStorage.setItem(STORAGE_KEYS.SEVAS, JSON.stringify(DEFAULT_SEVAS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.SETTINGS)) {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(DEFAULT_SETTINGS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.BOOKINGS)) {
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify([]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.DONATIONS)) {
    localStorage.setItem(STORAGE_KEYS.DONATIONS, JSON.stringify([]));
  }
};

export const getFromStorage = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

export const saveToStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Seva operations
export const getSevas = () => getFromStorage(STORAGE_KEYS.SEVAS) || DEFAULT_SEVAS;
export const saveSevas = (sevas) => saveToStorage(STORAGE_KEYS.SEVAS, sevas);

// Booking operations
export const getBookings = () => getFromStorage(STORAGE_KEYS.BOOKINGS) || [];
export const saveBooking = (booking) => {
  const bookings = getBookings();
  bookings.unshift(booking); // Newest first
  saveToStorage(STORAGE_KEYS.BOOKINGS, bookings);
};

// Donation operations
export const getDonations = () => getFromStorage(STORAGE_KEYS.DONATIONS) || [];
export const saveDonation = (donation) => {
  const donations = getDonations();
  donations.unshift(donation);
  saveToStorage(STORAGE_KEYS.DONATIONS, donations);
};

// Auth operations
export const getAuthUser = () => getFromStorage(STORAGE_KEYS.AUTH_USER);
export const saveAuthUser = (user) => saveToStorage(STORAGE_KEYS.AUTH_USER, user);
export const clearAuthUser = () => localStorage.removeItem(STORAGE_KEYS.AUTH_USER);

export const getSettings = () => getFromStorage(STORAGE_KEYS.SETTINGS) || DEFAULT_SETTINGS;
export const saveSettings = (settings) => saveToStorage(STORAGE_KEYS.SETTINGS, settings);

export { STORAGE_KEYS };
