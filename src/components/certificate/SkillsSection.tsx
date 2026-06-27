import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { SkillsSectionProps } from './types';

export const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
  if (!skills || skills.length === 0) return null;

  return (
    <div className="w-full max-w-4xl mx-auto mb-6">
      <div className="flex items-center justify-center gap-4 mb-4">
        <div className="h-[1px] bg-[#d4af37] w-12"></div>
        <h4 className="text-sm font-bold text-[#0a192f] uppercase tracking-[0.2em] px-2">
          Skills Validated
        </h4>
        <div className="h-[1px] bg-[#d4af37] w-12"></div>
      </div>
      
      <div className="flex flex-wrap justify-center gap-3">
        {skills.map((skill, index) => (
          <div 
            key={index}
            className="flex items-center gap-2 px-4 py-1.5 bg-white border border-slate-200 rounded-full text-[11px] text-[#0a192f] font-bold shadow-sm"
          >
            <CheckCircle2 className="w-[18px] h-[18px] fill-emerald-500 text-white" />
            <span className="tracking-wide">{skill}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
