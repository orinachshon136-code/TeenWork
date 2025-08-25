
import React from 'react';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  categories: string[];
  selectedCategories: string[];
  onCategoryToggle: (category: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm, categories, selectedCategories, onCategoryToggle }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg -mt-20 mb-8 sticky top-24 z-40">
      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-grow w-full">
          <input
            type="text"
            placeholder="חפש לפי תפקיד, חברה או מיקום..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 text-lg border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
        </div>
        <button className="w-full md:w-auto px-8 py-3 text-lg font-bold text-white bg-cyan-500 rounded-lg hover:bg-cyan-600 transition-colors shadow-md">
            חיפוש
        </button>
      </div>
      <div className="mt-4 flex flex-wrap gap-2 justify-center">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => onCategoryToggle(category)}
            className={`px-4 py-1.5 text-sm font-semibold rounded-full border-2 transition-colors ${
              selectedCategories.includes(category)
                ? 'bg-cyan-500 border-cyan-500 text-white'
                : 'bg-white border-slate-300 text-slate-600 hover:bg-slate-100 hover:border-slate-400'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
