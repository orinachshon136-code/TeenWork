
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <svg className="w-8 h-8 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18.5A6.5 6.5 0 1112 5.5a6.5 6.5 0 010 13z"></path></svg>
          <span className="text-2xl font-bold text-slate-800">Noar Avoda</span>
        </div>
        <nav className="hidden md:flex items-center space-x-6 rtl:space-x-reverse text-lg">
          <a href="#" className="text-slate-600 hover:text-cyan-500 transition-colors">חיפוש עבודה</a>
          <a href="#" className="text-slate-600 hover:text-cyan-500 transition-colors">למעסיקים</a>
          <a href="#" className="text-slate-600 hover:text-cyan-500 transition-colors">שאלות ותשובות</a>
        </nav>
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <button className="px-4 py-2 text-md font-semibold text-cyan-600 bg-white border border-cyan-500 rounded-full hover:bg-cyan-50 transition-colors">
                כניסה
            </button>
            <button className="px-4 py-2 text-md font-semibold text-white bg-cyan-500 rounded-full hover:bg-cyan-600 transition-colors">
                הרשמה
            </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
