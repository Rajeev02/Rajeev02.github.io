import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { SkillsSectionProps } from './types';

export const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
  if (!skills || skills.length === 0) return null;

  return (
    <div className="w-full max-w-4xl mx-auto mb-10">
      <div className="flex items-center justify-center gap-4 mb-4">
        <div className="h-px bg-slate-200 flex-1"></div>
        <h4 className="text-sm font-bold text-slate-800 uppercase tracking-widest px-4">
          Skills Validated
        </h4>
        <div className="h-px bg-slate-200 flex-1"></div>
      </div>
      
      <div className="flex flex-wrap justify-center gap-2">
        {skills.map((skill, index) => (
          <div 
            key={index}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 font-medium"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>{skill}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
