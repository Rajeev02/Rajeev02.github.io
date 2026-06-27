import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { ShieldCheck } from 'lucide-react';
import { QRVerificationProps } from './types';

export const QRVerification: React.FC<QRVerificationProps> = ({ certificateId, verificationUrl }) => {
  const defaultUrl = `https://preparation-guide.vercel.app/verify/${certificateId}`;
  const url = verificationUrl || defaultUrl;

  return (
    <div className="flex items-center gap-6 p-4 rounded-xl">
      {/* Auth Badge */}
      <div className="flex items-center justify-center">
        <div className="relative">
          <ShieldCheck className="w-14 h-14 text-slate-800" strokeWidth={1.5} />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1">
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
          Certificate ID
        </h4>
        <p className="font-mono font-bold text-slate-800 text-sm mb-1">
          {certificateId}
        </p>
        <p className="text-[10px] text-slate-400 max-w-[200px] leading-tight">
          A unique ID to verify the authenticity of this certificate.
        </p>
      </div>

      <div className="flex items-center gap-4 pl-6 border-l border-slate-200">
        <div className="bg-white p-1.5 rounded-lg border border-slate-200 shadow-sm">
          <QRCodeSVG value={url} size={64} level="M" />
        </div>
        <div className="max-w-[180px]">
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
            Verify Certificate
          </h4>
          <p className="text-[10px] text-slate-500 leading-tight mb-1">
            Scan the QR code or visit the link below to verify this certificate.
          </p>
          <a href={url} className="text-[10px] text-emerald-600 font-medium hover:underline truncate block">
            {url.replace(/^https?:\/\//, '')}
          </a>
        </div>
      </div>
    </div>
  );
};
