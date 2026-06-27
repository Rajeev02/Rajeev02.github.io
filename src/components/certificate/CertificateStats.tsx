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
      bg: 'bg-emerald-50',
      label: 'Score',
      value: `${percentage}%`,
      subtext: percentage === 100 ? 'Perfect Score' : 'Performance'
    },
    {
      icon: <ClipboardList className="w-6 h-6 text-blue-600" />,
      bg: 'bg-blue-50',
      label: 'Questions',
      value: `${score} / ${totalQuestions}`,
      subtext: 'Correct Answers'
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-purple-600" />,
      bg: 'bg-purple-50',
      label: 'Level',
      value: level,
      subtext: 'Performance'
    },
    {
      icon: <Clock className="w-6 h-6 text-amber-600" />,
      bg: 'bg-amber-50',
      label: 'Duration',
      value: `${duration} min`,
      subtext: 'Time Taken'
    },
    {
      icon: <Calendar className="w-6 h-6 text-slate-700" />,
      bg: 'bg-slate-100',
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
          className="flex items-center gap-4 bg-white px-4 py-3 rounded-xl border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.04)] min-w-[170px]"
        >
          <div className={`p-2.5 rounded-full ${stat.bg}`}>
            {stat.icon}
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">{stat.label}</span>
            <span className="font-bold text-slate-800 text-lg leading-none">{stat.value}</span>
            <span className="text-[10px] text-slate-500 mt-1 leading-none font-medium">{stat.subtext}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
