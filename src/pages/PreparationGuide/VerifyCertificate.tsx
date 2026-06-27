import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { ShieldCheck, XCircle, ArrowLeft, Loader2, Award, Calendar, Clock, Target, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CertificateData {
  certificateId: string;
  name: string;
  assessmentTitle: string;
  score: number;
  totalQuestions: number;
  level: string;
  duration: number;
  issuedDate: string;
  skills: string[];
}

const VerifyCertificate: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<CertificateData | null>(null);

  useEffect(() => {
    const fetchCertificate = async () => {
      if (!id) {
        setError("No certificate ID provided.");
        setLoading(false);
        return;
      }

      try {
        const docRef = doc(db, "certificates", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setData(docSnap.data() as CertificateData);
        } else {
          setError("Certificate not found. It may be invalid or the ID is incorrect.");
        }
      } catch (err: any) {
        console.error("Error fetching certificate:", err);
        setError("Unable to connect to the verification server. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCertificate();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-amber-500 animate-spin mb-4" />
        <h2 className="text-xl font-bold text-slate-700">Verifying Certificate...</h2>
        <p className="text-slate-500 mt-2">Connecting to secure database</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center border border-slate-200">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Verification Failed</h2>
          <p className="text-slate-600 mb-8">{error}</p>
          <Button asChild className="w-full bg-slate-900 hover:bg-slate-800 text-white">
            <Link to="/preparation-guide">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Platform
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <Button asChild variant="ghost" className="text-slate-600 hover:text-slate-900">
            <Link to="/preparation-guide">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Platform
            </Link>
          </Button>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">
          {/* Header */}
          <div className="bg-emerald-50 border-b border-emerald-100 p-8 flex flex-col sm:flex-row items-center gap-6">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-10 h-10 text-emerald-600" />
            </div>
            <div className="text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wide mb-2">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Verified Authentic
              </div>
              <h1 className="text-2xl font-bold text-slate-900">Valid Certificate Record</h1>
              <p className="text-slate-600 mt-1">This certificate was securely verified against our database.</p>
            </div>
          </div>

          {/* Details */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Recipient Details</h3>
                <p className="text-3xl font-bold text-slate-900 mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {data.name}
                </p>
                <div className="inline-flex items-center gap-2 mt-4 text-slate-700">
                  <Award className="w-5 h-5 text-amber-500" />
                  <span className="font-semibold">{data.assessmentTitle}</span>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Certificate Details</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                    <span className="text-slate-500 flex items-center gap-2"><Target className="w-4 h-4" /> Score</span>
                    <span className="font-bold text-slate-900">{Math.round((data.score / data.totalQuestions) * 100)}%</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                    <span className="text-slate-500 flex items-center gap-2"><Calendar className="w-4 h-4" /> Issued On</span>
                    <span className="font-bold text-slate-900">{new Date(data.issuedDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                    <span className="text-slate-500 flex items-center gap-2"><Clock className="w-4 h-4" /> Duration</span>
                    <span className="font-bold text-slate-900">{data.duration} mins</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Certificate ID</span>
                    <span className="font-mono font-bold text-slate-900">{data.certificateId}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Validated Skills</h3>
              <div className="flex flex-wrap gap-2">
                {data.skills?.map((skill, index) => (
                  <span key={index} className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyCertificate;
