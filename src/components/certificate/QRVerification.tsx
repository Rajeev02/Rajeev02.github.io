import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { QRVerificationProps } from './types';

export const QRVerification: React.FC<QRVerificationProps> = ({ certificateId, verificationUrl }) => {
  const defaultUrl = `https://rajeev02.github.io/#/verify/${certificateId}`;
  const url = verificationUrl || defaultUrl;

  return (
    <div className="flex items-center gap-4">
      <div className="bg-white p-1 rounded-sm border border-slate-200">
        <QRCodeSVG value={url} size={48} level="M" />
      </div>
      <div className="flex flex-col">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
          Verify Certificate
        </span>
        <span className="text-[10px] text-slate-800 font-mono mb-0.5">ID: {certificateId}</span>
        <a href={url} className="text-[9px] text-[#1a73e8] hover:underline">
          rajeev02.github.io/#/verify
        </a>
      </div>
    </div>
  );
};
