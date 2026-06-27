import React from 'react';
import { Award, GraduationCap } from 'lucide-react';

interface CertificateHeaderProps {
  name: string;
  assessmentTitle: string;
}

export const CertificateHeader: React.FC<CertificateHeaderProps> = ({ name, assessmentTitle }) => {
  return (
    <div className="flex flex-col items-center text-center mb-8">
      {/* Top Ribbon & Logo */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <div className="p-2 bg-slate-900 rounded-lg">
          <GraduationCap className="w-8 h-8 text-amber-500" />
        </div>
        <div className="text-left">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight leading-none mb-1">
            PREPARATION GUIDE
          </h2>
          <p className="text-xs text-slate-500 font-medium tracking-widest uppercase">
            Software Engineering Learning Platform
          </p>
        </div>
      </div>

      <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3 tracking-wide uppercase" style={{ fontFamily: "'Playfair Display', serif" }}>
        Certificate of Achievement
      </h1>
      
      <p className="text-slate-500 mb-8 font-medium tracking-wide">
        THIS CERTIFIES THAT
      </p>
      
      <div className="relative mb-8">
        <h2 
          className="text-6xl md:text-7xl font-bold text-slate-900 px-12" 
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {name}
        </h2>
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
        <div className="absolute -bottom-5 left-1/2 -translate-x-1/2">
           <div className="w-2 h-2 rotate-45 bg-amber-500"></div>
        </div>
      </div>
      
      <p className="text-slate-500 font-medium tracking-wide uppercase text-sm mb-2 mt-6">
        HAS SUCCESSFULLY COMPLETED
      </p>
      
      <h3 className="text-2xl font-bold text-slate-900 mb-2">
        {assessmentTitle}
      </h3>
    </div>
  );
};
