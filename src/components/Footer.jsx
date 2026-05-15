import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full py-4 px-4 border-t border-orange-100 bg-white/50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-sm font-bold text-[#800000]">
          Powered By <a 
            href="https://www.botivate.in" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#d4af37] hover:text-[#800000] transition-colors hover:underline font-black"
          >
            Botivate
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
