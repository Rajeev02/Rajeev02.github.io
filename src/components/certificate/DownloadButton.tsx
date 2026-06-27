import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import { Download } from 'lucide-react';
import { Button } from '../ui/button';

interface DownloadButtonProps {
  certificateRef: React.RefObject<HTMLDivElement>;
  fileName: string;
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({ certificateRef, fileName }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (!certificateRef.current) return;
    
    try {
      setIsDownloading(true);
      
      // Wait for fonts before exporting
      await document.fonts.ready;
      // Add a tiny extra delay to ensure rendering is completely settled
      await new Promise(resolve => setTimeout(resolve, 150));
      
      const canvas = await html2canvas(certificateRef.current, {
        scale: 4, // High quality for printing
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
        imageTimeout: 0
      });
      
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = `${fileName.replace(/\s+/g, '_')}_Certificate.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Failed to generate certificate:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Button 
      onClick={handleDownload} 
      disabled={isDownloading}
      className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white font-medium shadow-md transition-all duration-200"
    >
      <Download className="w-4 h-4 mr-2" />
      {isDownloading ? 'Preparing High-Quality PDF...' : 'Download Certificate'}
    </Button>
  );
};
