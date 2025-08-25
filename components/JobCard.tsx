
import React from 'react';
import { Job } from '../types';
import Tag from './Tag';

interface JobCardProps {
  job: Job;
}

const StarIcon: React.FC<{ className: string }> = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
    </svg>
);

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col overflow-hidden transform hover:-translate-y-1">
      {job.isUrgent && (
        <div className="absolute top-0 right-0 mt-3 -mr-1 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-l-full z-10">
          דחוף!
        </div>
      )}
      <div className="p-6 flex-grow">
        <div className="flex items-start justify-between mb-3">
          <div>
            <span className="text-sm font-semibold text-cyan-600 bg-cyan-50 px-3 py-1 rounded-full">{job.category}</span>
          </div>
          <div className="text-2xl font-bold text-slate-700">
            ₪{job.hourlyRate}<span className="text-base font-normal text-slate-500">/שעה</span>
          </div>
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-1">{job.title}</h3>
        <p className="text-slate-500 mb-4">{job.employer.name}</p>
        
        <div className="flex items-center text-slate-600 text-sm mb-4">
          <svg className="w-4 h-4 mr-1.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
          {job.location}
        </div>
        
        <p className="text-slate-600 text-sm mb-5 leading-relaxed">{job.description}</p>
        
        <div className="flex flex-wrap gap-2">
            {job.tags.map(tag => <Tag key={tag} text={tag} />)}
        </div>
      </div>
      <div className="bg-slate-50 px-6 py-4 flex justify-between items-center border-t border-slate-200">
        <div className="flex items-center">
            <span className="text-sm font-semibold text-slate-700 mr-2">דירוג מעסיק</span>
            <div className="flex items-center">
                <StarIcon className="w-5 h-5 text-amber-400" />
                <span className="text-slate-600 font-bold ml-1">{job.employer.rating.toFixed(1)}</span>
            </div>
        </div>
        <button className="px-5 py-2 text-md font-semibold text-white bg-cyan-500 rounded-full hover:bg-cyan-600 transition-colors shadow-sm hover:shadow-md">
            הגש מועמדות
        </button>
      </div>
    </div>
  );
};

export default JobCard;
