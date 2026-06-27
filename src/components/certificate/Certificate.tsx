import React, { useRef } from 'react';
import { CertificateProps } from './types';
import { generateCertificateId } from './utils';
import { CertificateHeader } from './CertificateHeader';
import { CertificateStats } from './CertificateStats';
import { SkillsSection } from './SkillsSection';
import { Signature } from './Signature';
import { QRVerification } from './QRVerification';
import { DownloadButton } from './DownloadButton';
import { Globe, GraduationCap, Link as LinkIcon } from 'lucide-react';

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
          {/* Border Design - Multiple Layers */}
          <div className="absolute inset-0 border-[4px] border-white z-20 pointer-events-none"></div>
          <div className="absolute top-[8px] left-[8px] right-[8px] bottom-[48px] border-[16px] border-[#0a192f] z-10 pointer-events-none"></div>
          <div className="absolute top-[28px] left-[28px] right-[28px] bottom-[68px] border-[2px] border-[#d4af37] z-10 pointer-events-none"></div>

          {/* Corner geometric cutouts (White triangles covering the blue border) */}
          <div className="absolute top-[8px] left-[8px] w-12 h-12 bg-white z-20" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}></div>
          <div className="absolute top-[8px] right-[8px] w-12 h-12 bg-white z-20" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%)' }}></div>
          <div className="absolute bottom-[48px] left-[8px] w-12 h-12 bg-white z-20" style={{ clipPath: 'polygon(0 0, 0 100%, 100% 100%)' }}></div>
          <div className="absolute bottom-[48px] right-[8px] w-12 h-12 bg-white z-20" style={{ clipPath: 'polygon(100% 0, 0 100%, 100% 100%)' }}></div>

          {/* Golden corner accents inside */}
          <div className="absolute top-[26px] left-[26px] w-8 h-8 border-t-[4px] border-l-[4px] border-[#d4af37] z-20"></div>
          <div className="absolute top-[26px] right-[26px] w-8 h-8 border-t-[4px] border-r-[4px] border-[#d4af37] z-20"></div>
          <div className="absolute bottom-[66px] left-[26px] w-8 h-8 border-b-[4px] border-l-[4px] border-[#d4af37] z-20"></div>
          <div className="absolute bottom-[66px] right-[26px] w-8 h-8 border-b-[4px] border-r-[4px] border-[#d4af37] z-20"></div>

          {/* Top Left Ribbon */}
          <div className="absolute top-0 left-[70px] z-30 flex flex-col items-center">
            <svg width="80" height="140" viewBox="0 0 80 140" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0H80V120L40 140L0 120V0Z" fill="#0a192f" stroke="#d4af37" strokeWidth="3"/>
              <path d="M5 0V116.5L40 134L75 116.5V0" stroke="#d4af37" strokeWidth="1"/>
            </svg>
            <div className="absolute top-[40px] text-[#d4af37] font-bold text-3xl font-serif">PG</div>
            <div className="absolute top-[70px] w-8 h-[2px] bg-[#d4af37] -rotate-45"></div>
          </div>

          {/* Top Right Gold Seal */}
          <div className="absolute top-[40px] right-[60px] z-30">
            {/* Ribbons */}
            <svg className="absolute -bottom-16 left-1/2 -translate-x-1/2" width="60" height="90" viewBox="0 0 60 90" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 0L15 90L30 75L45 90L55 0H5Z" fill="#0a192f" stroke="#d4af37" strokeWidth="2"/>
            </svg>
            {/* Seal */}
            <div className="relative w-36 h-36">
              <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
                <defs>
                  <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#bf953f" />
                    <stop offset="25%" stopColor="#fcf6ba" />
                    <stop offset="50%" stopColor="#b38728" />
                    <stop offset="75%" stopColor="#fbf5b7" />
                    <stop offset="100%" stopColor="#aa771c" />
                  </linearGradient>
                </defs>
                {/* Spiky outer ring */}
                <path d="M50 2L55 10L64 7L66 16L75 16L74 25L82 28L78 36L85 41L79 48L85 55L78 60L82 68L74 71L75 80L66 80L64 89L55 86L50 94L45 86L36 89L34 80L25 80L26 71L18 68L22 60L15 55L21 48L15 41L22 36L18 28L26 25L25 16L34 16L36 7L45 10L50 2Z" fill="url(#gold)" />
                {/* Inner circles */}
                <circle cx="50" cy="50" r="38" fill="#0a192f" stroke="#d4af37" strokeWidth="2" strokeDasharray="4 2"/>
                <circle cx="50" cy="50" r="34" fill="#0a192f" stroke="#d4af37" strokeWidth="1"/>
              </svg>
              {/* Seal Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-[#d4af37]">
                <svg className="w-5 h-5 mb-1" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                </svg>
                <div className="text-[9px] font-bold tracking-widest text-center leading-tight">CERTIFIED<br/>ACHIEVER</div>
              </div>
            </div>
          </div>

          {/* Main Content Wrapper */}
          <div className="relative z-10 flex-1 flex flex-col pt-[70px] pb-6 px-[100px]">
            
            <CertificateHeader 
              name={name} 
              assessmentTitle={assessmentTitle} 
              score={score}
              totalQuestions={totalQuestions}
            />
            
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

            {/* Pre-Footer Verification & Signature Section */}
            <div className="flex items-center justify-between mt-auto mb-2 relative">
              {/* Divider line */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-slate-300"></div>
              
              <div className="w-[60%] flex items-center gap-8 pt-6">
                {/* Certificate ID */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-16 bg-[#0a192f] rounded-b-xl flex items-center justify-center border-t-2 border-[#d4af37] relative shadow-md">
                    <svg className="absolute -top-1 w-10 h-12 text-[#d4af37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                      <path d="m9 12 2 2 4-4"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-500 tracking-wider">CERTIFICATE ID</div>
                    <div className="font-bold text-slate-800">{certificateId}</div>
                    <div className="text-[10px] text-slate-500 max-w-[140px] mt-1 leading-tight">A unique ID to verify the authenticity of this certificate.</div>
                  </div>
                </div>

                {/* QR Code */}
                <div className="h-16 w-[1px] bg-slate-300 mx-2"></div>
                <QRVerification 
                  certificateId={certificateId} 
                  verificationUrl={verificationUrl} 
                />
              </div>
              
              <div className="w-[35%] pt-4 border-l border-slate-200 pl-8">
                <Signature />
              </div>
            </div>
            
          </div>

          {/* Solid Navy Footer */}
          <div className="absolute bottom-0 left-0 right-0 h-[48px] bg-[#0a192f] z-30 flex items-center justify-between px-16 text-white text-[11px]">
            {/* Left */}
            <div className="flex items-center gap-3">
              <Globe className="w-4 h-4 text-[#d4af37]" />
              <div>
                <div className="font-bold tracking-wide">Preparation Guide</div>
                <div className="text-slate-400 text-[9px]">Software Engineering Learning Platform</div>
              </div>
            </div>

            {/* Middle */}
            <div className="flex items-center gap-3 border-x border-slate-700 px-8 h-full">
              <GraduationCap className="w-4 h-4 text-[#d4af37]" />
              <div className="text-slate-300">Empowering developers to learn, prepare and build exceptional careers.</div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-2 text-[#d4af37]">
              <LinkIcon className="w-3 h-3" />
              <span className="font-medium tracking-wide">rajeev02.github.io</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
