import React from 'react';
import { Target, ClipboardList, TrendingUp, Clock, Calendar } from 'lucide-react';
import { CertificateStatsProps } from './types';
import { formatDate } from './utils';

export const CertificateStats: React.FC<CertificateStatsProps> = ({ 
  score, 
  totalQuestions, 
  level, 
  duration, 
  issuedDate 
}) => {
  const percentage = Math.round((score / totalQuestions) * 100);

  const stats = [
    {
      icon: <Target className="w-6 h-6 text-emerald-600" />,
      label: 'Score',
      value: `${percentage}%`,
      subtext: 'Performance'
    },
    {
      icon: <ClipboardList className="w-6 h-6 text-blue-600" />,
      label: 'Questions',
      value: `${score} / ${totalQuestions}`,
      subtext: 'Correct Answers'
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-purple-600" />,
      label: 'Level',
      value: level,
      subtext: 'Difficulty'
    },
    {
      icon: <Clock className="w-6 h-6 text-amber-600" />,
      label: 'Duration',
      value: `${duration} min`,
      subtext: 'Time Taken'
    },
    {
      icon: <Calendar className="w-6 h-6 text-slate-600" />,
      label: 'Date Issued',
      value: formatDate(issuedDate),
      subtext: 'Keep Learning!'
    }
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-8">
      {stats.map((stat, index) => (
        <div 
          key={index}
          className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300 min-w-[160px]"
        >
          <div className="p-2 bg-slate-50 rounded-lg">
            {stat.icon}
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{stat.label}</span>
            <span className="font-bold text-slate-800 leading-tight">{stat.value}</span>
            <span className="text-[10px] text-slate-500 mt-0.5">{stat.subtext}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
