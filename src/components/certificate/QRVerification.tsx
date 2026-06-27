import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { QRVerificationProps } from './types';

export const QRVerification: React.FC<QRVerificationProps> = ({ certificateId, verificationUrl }) => {
  const defaultUrl = `https://rajeev02.github.io/#/verify/${certificateId}`;
  const url = verificationUrl || defaultUrl;

  return (
    <div className="flex items-center gap-4">
      <div className="bg-white p-1 rounded-md border border-slate-200">
        <QRCodeSVG value={url} size={50} level="M" />
      </div>
      <div className="max-w-[150px]">
        <h4 className="text-[10px] font-bold text-[#0a192f] uppercase tracking-wider mb-0.5">
          VERIFY CERTIFICATE
        </h4>
        <p className="text-[9px] text-slate-500 leading-tight mb-0.5">
          Scan the QR code or visit the link below to verify this certificate.
        </p>
        <a href={url} className="text-[9px] text-emerald-600 font-bold hover:underline truncate block">
          rajeev02.github.io/#/verify/{certificateId}
        </a>
      </div>
    </div>
  );
};
