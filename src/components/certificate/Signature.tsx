import React from 'react';

export const Signature: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center px-8">
      <div 
        className="text-4xl text-slate-800 mb-2"
        style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}
      >
        Rajeev Joshi
      </div>
      <div className="h-[2px] w-48 bg-slate-200 mb-2"></div>
      <p className="font-bold text-slate-800 text-sm tracking-widest uppercase">
        RAJEEV JOSHI
      </p>
      <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">
        FOUNDER & INSTRUCTOR
      </p>
      <p className="text-xs text-slate-500 uppercase tracking-widest">
        PREPARATION GUIDE
      </p>
    </div>
  );
};
