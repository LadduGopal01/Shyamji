import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#fffaf0] overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-64 transition-all">
        {/* Header */}
        <Header
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="flex-1 overflow-y-auto flex flex-col">
          <div className="max-w-7xl mx-auto p-4 md:p-8 flex-1 w-full">
            <Outlet />
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default Layout;