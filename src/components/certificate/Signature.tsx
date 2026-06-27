import React from 'react';

export const Signature: React.FC = () => {
  return (
    <div className="flex flex-col items-start px-2">
      <div 
        className="text-3xl text-slate-800 mb-2 italic"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        Rajeev Joshi
      </div>
      <div className="h-[1px] w-48 bg-slate-200 mb-2"></div>
      <p className="font-bold text-slate-800 text-[10px] tracking-widest uppercase">
        Rajeev Joshi
      </p>
      <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-0.5">
        Founder & Instructor
      </p>
    </div>
  );
};
