import React from 'react';
import { SkillsSectionProps } from './types';

export const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
  if (!skills || skills.length === 0) return null;

  return (
    <div className="w-full mb-6">
      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
        Skills Validated
      </h4>
      
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <div 
            key={index}
            className="inline-flex items-center justify-center h-6 px-3 bg-slate-50 border border-slate-200 rounded-full text-[11px] font-medium text-slate-700"
          >
            {skill}
          </div>
        ))}
      </div>
    </div>
  );
};
