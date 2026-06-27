import React, { useRef } from 'react';
import { CertificateProps } from './types';
import { generateCertificateId } from './utils';
import { CertificateHeader } from './CertificateHeader';
import { CertificateStats } from './CertificateStats';
import { SkillsSection } from './SkillsSection';
import { Signature } from './Signature';
import { QRVerification } from './QRVerification';
import { DownloadButton } from './DownloadButton';

export const Certificate: React.FC<CertificateProps> = ({ 
  name, 
  assessmentTitle, 
  score, 
  totalQuestions,
  level = 'Advanced',
  duration = 45,
  issuedDate = new Date().toISOString(),
  certificateId: providedId,
  verificationUrl,
  skills = ['System Design', 'Architecture', 'Scalability', 'Security', 'Performance']
}) => {
  const certificateRef = useRef<HTMLDivElement>(null);
  const certificateId = providedId || generateCertificateId();

  return (
    <div className="flex flex-col items-center gap-8 mt-8 w-full max-w-[1100px] mx-auto pb-12 font-sans">
      <div className="flex justify-end w-full">
        <DownloadButton certificateRef={certificateRef} fileName={name} />
      </div>

      {/* Certificate Visual Container */}
      <div className="w-full overflow-x-auto pb-8 flex justify-center">
        {/* The Certificate A4 Canvas */}
        <div 
          ref={certificateRef}
          className="relative w-[1122px] min-w-[1122px] h-[793px] bg-white text-slate-900 shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden flex flex-col"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {/* Subtle Background Pattern (Geometric dots) */}
          <div 
            className="absolute inset-0 z-0 opacity-40 pointer-events-none"
            style={{ 
              backgroundImage: "radial-gradient(#e2e8f0 1px, transparent 1px)", 
              backgroundSize: "24px 24px" 
            }}
          ></div>

          {/* Minimalist Accent Border (Left Edge) */}
          <div className="absolute left-0 top-0 bottom-0 w-[16px] bg-[#1a73e8] z-10"></div>
          <div className="absolute inset-0 border border-slate-200 z-10 pointer-events-none"></div>

          {/* Main Content Wrapper - Left Aligned */}
          <div className="relative z-10 flex-1 flex flex-col pt-16 pb-12 px-24 pl-32">
            
            <CertificateHeader 
              name={name} 
              assessmentTitle={assessmentTitle} 
              score={score}
              totalQuestions={totalQuestions}
            />
            
            <div className="mt-8">
              <SkillsSection skills={skills} />
            </div>

            <div className="mt-8">
              <CertificateStats 
                score={score}
                totalQuestions={totalQuestions}
                level={level}
                duration={duration}
                issuedDate={issuedDate}
              />
            </div>

            {/* Footer Section */}
            <div className="flex items-end justify-between mt-auto pt-8">
              <QRVerification 
                certificateId={certificateId} 
                verificationUrl={verificationUrl} 
              />
              
              <Signature />
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};
