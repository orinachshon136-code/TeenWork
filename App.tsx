
import React, { useState, useMemo } from 'react';
import { Job } from './types';
import { MOCK_JOBS, JOB_CATEGORIES } from './constants';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import JobCard from './components/JobCard';
import Footer from './components/Footer';
import CareerAdvisor from './components/CareerAdvisor';

const App: React.FC = () => {
  const [jobs] = useState<Job[]>(MOCK_JOBS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            job.employer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            job.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(job.category);
      
      return matchesSearch && matchesCategory;
    });
  }, [jobs, searchTerm, selectedCategories]);

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-gray-800">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-2">
            מצא את העבודה הראשונה שלך
          </h1>
          <p className="text-lg text-slate-600">
            הזדמנויות מותאמות לבני נוער בישראל. בטוח, קל ומתגמל.
          </p>
        </div>
        
        <SearchBar 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          categories={JOB_CATEGORIES}
          selectedCategories={selectedCategories}
          onCategoryToggle={handleCategoryToggle}
        />

        {filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            {filteredJobs.map(job => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-slate-500">לא נמצאו משרות התואמות את החיפוש.</p>
          </div>
        )}
      </main>
      <CareerAdvisor />
      <Footer />
    </div>
  );
};

export default App;
