import React from 'react';

interface CertificateHeaderProps {
  name: string;
  assessmentTitle: string;
  score: number;
  totalQuestions: number;
}

export const CertificateHeader: React.FC<CertificateHeaderProps> = ({ name, assessmentTitle, score, totalQuestions }) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  return (
    <div className="flex flex-col items-center text-center mb-8">
      {/* Top Logo & Title */}
      <div className="flex flex-col items-center justify-center gap-1 mb-8">
        <div className="flex items-center gap-3">
          {/* Logo SVG matching the design */}
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 14L12 18L20 14V8L12 12L4 8V14Z" fill="#d4af37"/>
            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#0a192f"/>
            <path d="M22 7V16" stroke="#0a192f" strokeWidth="2" strokeLinecap="round"/>
            <path d="M22 16L20 18H24L22 16Z" fill="#0a192f"/>
            <path d="M4 15V19C4 19 8 22 12 22C16 22 20 19 20 19V15C20 15 16 18 12 18C8 18 4 15 4 15Z" fill="#d4af37"/>
          </svg>
          <div className="flex flex-col items-center pt-1">
            <h2 className="text-[26px] font-bold text-[#0a192f] tracking-wide leading-none">
              PREPARATION GUIDE
            </h2>
            <div className="flex items-center gap-2 mt-1 w-full justify-center">
              <div className="h-[1px] w-8 bg-[#d4af37]"></div>
              <p className="text-[10px] text-[#0a192f] font-bold tracking-[0.2em] uppercase">
                LEARN &bull; PRACTICE &bull; SUCCEED
              </p>
              <div className="h-[1px] w-8 bg-[#d4af37]"></div>
            </div>
          </div>
        </div>
      </div>

      <h1 className="text-6xl font-bold text-[#0a192f] tracking-widest uppercase mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
        CERTIFICATE
      </h1>
      
      <div className="flex items-center gap-4 mb-6">
        <div className="h-[2px] w-12 bg-[#d4af37]"></div>
        <p className="text-[#d4af37] font-bold tracking-[0.3em] uppercase text-lg">
          OF ACHIEVEMENT
        </p>
        <div className="h-[2px] w-12 bg-[#d4af37]"></div>
      </div>
      
      <p className="text-slate-500 mb-6 font-semibold tracking-widest text-sm">
        THIS CERTIFIES THAT
      </p>
      
      <div className="relative mb-8">
        <h2 
          className="text-7xl font-medium text-[#0a192f] px-12" 
          style={{ fontFamily: "'Great Vibes', cursive", letterSpacing: '0.02em' }}
        >
          {name}
        </h2>
        <div className="flex items-center justify-center gap-4 mt-6">
          <div className="w-48 h-[1px] bg-slate-300"></div>
          <div className="w-3 h-3 rotate-45 border-2 border-[#d4af37] bg-white"></div>
          <div className="w-48 h-[1px] bg-slate-300"></div>
        </div>
      </div>
      
      <p className="text-slate-500 font-semibold tracking-widest uppercase text-xs mb-2">
        HAS SUCCESSFULLY COMPLETED
      </p>
      
      <h3 className="text-[22px] font-bold text-[#0a192f] mb-1 tracking-wide">
        {assessmentTitle}
      </h3>

      <p className="text-[#0a192f] text-lg font-medium">
        Achieving a score of <span className="font-bold text-green-600">{score} / {totalQuestions} ({percentage}%)</span>
      </p>
    </div>
  );
};
