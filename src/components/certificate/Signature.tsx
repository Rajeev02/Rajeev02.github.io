import React from 'react';

export const Signature: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center px-4">
      <div 
        className="text-[44px] text-[#0a192f] mb-1 -ml-4"
        style={{ fontFamily: "'Great Vibes', cursive" }}
      >
        Rajeev Joshi
      </div>
      <div className="h-[1px] w-56 bg-slate-300 mb-2"></div>
      <p className="font-bold text-[#d4af37] text-[10px] tracking-widest uppercase">
        RAJEEV JOSHI
      </p>
      <p className="text-[9px] text-[#0a192f] font-bold uppercase tracking-widest mt-0.5">
        FOUNDER & INSTRUCTOR
      </p>
      <p className="text-[9px] text-[#0a192f] font-bold uppercase tracking-widest mt-0.5">
        PREPARATION GUIDE
      </p>
    </div>
  );
};
