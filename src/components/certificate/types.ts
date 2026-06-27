export interface CertificateProps {
  name: string;
  assessmentTitle: string;
  score: number;
  totalQuestions: number;
  level?: string;
  duration?: number;
  issuedDate?: string;
  certificateId?: string;
  verificationUrl?: string;
  skills?: string[];
}

export interface CertificateStatsProps {
  score: number;
  totalQuestions: number;
  level: string;
  duration: number;
  issuedDate: string;
}

export interface SkillsSectionProps {
  skills: string[];
}

export interface QRVerificationProps {
  certificateId: string;
  verificationUrl?: string;
}
