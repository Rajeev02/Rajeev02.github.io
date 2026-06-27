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
          className="relative w-[1122px] min-w-[1122px] h-[793px] bg-white text-slate-900 shadow-2xl overflow-hidden flex flex-col"
          style={{ 
            fontFamily: "'Inter', sans-serif",
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f1f5f9' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
          }}
        >
          {/* Border Design */}
          <div className="absolute inset-0 border-[16px] border-slate-900 m-6"></div>
          <div className="absolute inset-0 border-2 border-amber-500 m-[30px]"></div>

          {/* Corner Decorations */}
          <div className="absolute top-[34px] left-[34px] w-16 h-16 border-t-4 border-l-4 border-amber-500"></div>
          <div className="absolute top-[34px] right-[34px] w-16 h-16 border-t-4 border-r-4 border-amber-500"></div>
          <div className="absolute bottom-[34px] left-[34px] w-16 h-16 border-b-4 border-l-4 border-amber-500"></div>
          <div className="absolute bottom-[34px] right-[34px] w-16 h-16 border-b-4 border-r-4 border-amber-500"></div>

          {/* Golden Corner Accents */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-amber-500 -rotate-45 origin-top-left -translate-x-16 -translate-y-16"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-amber-500 -rotate-45 origin-bottom-right translate-x-16 translate-y-16"></div>

          {/* Main Content Wrapper */}
          <div className="relative z-10 flex-1 flex flex-col pt-16 pb-12 px-20">
            
            <CertificateHeader name={name} assessmentTitle={assessmentTitle} />
            
            <div className="flex-1 flex flex-col justify-center">
              <CertificateStats 
                score={score}
                totalQuestions={totalQuestions}
                level={level}
                duration={duration}
                issuedDate={issuedDate}
              />
              
              <SkillsSection skills={skills} />
            </div>

            {/* Footer Section */}
            <div className="flex items-end justify-between border-t-2 border-slate-200 pt-6 mt-auto">
              <div className="w-[45%]">
                <QRVerification 
                  certificateId={certificateId} 
                  verificationUrl={verificationUrl} 
                />
              </div>
              <div className="w-[30%] pb-4">
                <Signature />
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};
