import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { Download, Award } from 'lucide-react';
import { Button } from './ui/button';

interface CertificateProps {
  name: string;
  assessmentTitle: string;
  score: number;
  totalQuestions: number;
}

export const Certificate: React.FC<CertificateProps> = ({ name, assessmentTitle, score, totalQuestions }) => {
  const certificateRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const percentage = Math.round((score / totalQuestions) * 100);
  const date = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handleDownload = async () => {
    if (!certificateRef.current) return;
    
    try {
      setIsDownloading(true);
      // Wait for font rendering just in case
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2, // Higher quality
        useCORS: true,
        backgroundColor: '#ffffff'
      });
      
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = `${name.replace(/\s+/g, '_')}_Certificate.png`;
      link.click();
    } catch (error) {
      console.error("Failed to generate certificate:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 mt-8 w-full max-w-3xl mx-auto">
      <Button 
        onClick={handleDownload} 
        disabled={isDownloading}
        className="w-full sm:w-auto bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-white font-bold"
      >
        <Download className="w-4 h-4 mr-2" />
        {isDownloading ? 'Generating...' : 'Download Certificate'}
      </Button>

      {/* Certificate Visual */}
      <div className="w-full overflow-x-auto pb-4">
        <div 
          ref={certificateRef}
          className="relative min-w-[700px] w-full aspect-[1.414/1] bg-white text-zinc-900 border-[12px] border-double border-zinc-200 p-12 flex flex-col items-center justify-center text-center shadow-lg mx-auto"
          style={{ fontFamily: "'Times New Roman', Times, serif" }}
        >
          {/* Decorative Corner Ornaments (CSS pseudo-like approach) */}
          <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-zinc-300"></div>
          <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-zinc-300"></div>
          <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-zinc-300"></div>
          <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-zinc-300"></div>

          <Award className="w-16 h-16 text-amber-500 mb-6" />
          
          <h1 className="text-4xl md:text-5xl font-extrabold uppercase tracking-widest text-zinc-800 mb-2">
            Certificate of Completion
          </h1>
          <p className="text-lg text-zinc-500 italic mb-10">This certifies that</p>
          
          <h2 className="text-5xl md:text-6xl font-bold text-amber-600 mb-10 border-b-2 border-zinc-300 pb-2 px-12 inline-block" style={{ fontFamily: "cursive" }}>
            {name}
          </h2>
          
          <p className="text-xl text-zinc-700 mb-4">has successfully completed the assessment:</p>
          <h3 className="text-2xl font-bold text-zinc-800 mb-8">{assessmentTitle}</h3>
          
          <p className="text-lg text-zinc-600 mb-12">
            Achieving a score of <span className="font-bold">{score} / {totalQuestions} ({percentage}%)</span>
          </p>
          
          <div className="flex justify-between w-full px-12 mt-auto pt-8 border-t border-zinc-200">
            <div className="text-center">
              <p className="font-bold text-lg border-b border-zinc-400 pb-1 px-4">{date}</p>
              <p className="text-sm text-zinc-500 mt-1 uppercase tracking-wider">Date Awarded</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-lg border-b border-zinc-400 pb-1 px-4" style={{ fontFamily: "cursive" }}>Rajeev Joshi</p>
              <p className="text-sm text-zinc-500 mt-1 uppercase tracking-wider">Instructor</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
