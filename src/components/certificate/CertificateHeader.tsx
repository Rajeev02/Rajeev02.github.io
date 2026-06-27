import React from 'react';
import { GraduationCap } from 'lucide-react';

interface CertificateHeaderProps {
  name: string;
  assessmentTitle: string;
  score: number;
  totalQuestions: number;
}

export const CertificateHeader: React.FC<CertificateHeaderProps> = ({ name, assessmentTitle, score, totalQuestions }) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  return (
    <div className="flex flex-col items-start w-full">
      {/* Brand Logo & Name */}
      <div className="flex items-center gap-3 mb-12">
        <div className="bg-[#1a73e8] p-2 rounded-lg text-white">
          <GraduationCap className="w-8 h-8" />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-xl text-slate-800 tracking-tight leading-none">
            Preparation Guide
          </span>
          <span className="text-[11px] font-medium text-slate-500 uppercase tracking-widest mt-1">
            Software Engineering Learning Platform
          </span>
        </div>
      </div>

      <div className="mb-6">
        <h1 className="text-sm font-bold text-[#1a73e8] uppercase tracking-[0.2em] mb-3">
          Certificate of Completion
        </h1>
        <p className="text-slate-500 font-medium text-sm">
          This is to certify that
        </p>
      </div>
      
      <div className="mb-6 w-full">
        <h2 className="text-6xl font-bold text-slate-900 tracking-tight mb-6">
          {name}
        </h2>
        
        <p className="text-slate-600 text-lg max-w-2xl leading-relaxed">
          has successfully completed the assessment <span className="font-bold text-slate-900">{assessmentTitle}</span>, achieving a score of <span className="font-bold text-emerald-600">{score} out of {totalQuestions} ({percentage}%)</span>.
        </p>
      </div>
    </div>
  );
};
