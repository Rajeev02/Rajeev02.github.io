import React from 'react';
import { CertificateStatsProps } from './types';
import { formatDate } from './utils';

export const CertificateStats: React.FC<CertificateStatsProps> = ({ 
  level, 
  duration, 
  issuedDate 
}) => {
  return (
    <div className="flex flex-wrap gap-12 pt-4">
      <div className="flex flex-col">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Level</span>
        <span className="font-semibold text-slate-800 text-lg leading-none">{level}</span>
      </div>
      
      <div className="flex flex-col">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Duration</span>
        <span className="font-semibold text-slate-800 text-lg leading-none">{duration} min</span>
      </div>
      
      <div className="flex flex-col">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Date Issued</span>
        <span className="font-semibold text-slate-800 text-lg leading-none">{formatDate(issuedDate)}</span>
      </div>
    </div>
  );
};
