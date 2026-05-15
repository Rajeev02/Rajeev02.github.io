import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

/**
 * Private reference page (not linked from main navigation).
 * Use for filling background-verification forms etc.
 * Access via: /#/employment-record
 *
 * NOTE: Compensation details are intentionally excluded from this page.
 * They are stored privately in repository memory only.
 */

type Record = {
  company: string;
  role: string; // Official designation as on payroll / offer letter (used for BGV)
  actualRole?: string; // Day-to-day role used on resume / LinkedIn
  offerDate: string;
  joiningDate: string;
  leavingDate: string;
  tenure: string;
};

const records: Record[] = [
  {
    company: "Plurebus Technology",
    role: "Junior R&D Engineer",
    actualRole: "Android Developer",
    offerDate: "25 Sep 2016",
    joiningDate: "27 Sep 2016",
    leavingDate: "29 Sep 2017",
    tenure: "1 yr 0 mo",
  },
  {
    company: "Dunst Technology Pvt Ltd",
    role: "Junior Android Developer",
    actualRole: "Android Developer",
    offerDate: "14 Dec 2017",
    joiningDate: "14 Dec 2017",
    leavingDate: "14 Mar 2018",
    tenure: "3 mo",
  },
  {
    company: "WildTrails India",
    role: "Software Development Engineer I",
    actualRole: "Android Developer",
    offerDate: "14 Mar 2018",
    joiningDate: "19 Mar 2018",
    leavingDate: "11 Sep 2019",
    tenure: "1 yr 5 mo 23 d",
  },
  {
    company: "LetsVenture Technologies",
    role: "Senior Android Developer",
    actualRole: "Senior React Native Developer (Android & iOS)",
    offerDate: "09 Sep 2019",
    joiningDate: "12 Sep 2019",
    leavingDate: "12 Feb 2026",
    tenure: "6 yr 5 mo",
  },
  {
    company: "SpaceBasic",
    role: "Lead Mobile Engineer",
    actualRole: "Lead Mobile Engineer / Senior React Native Developer",
    offerDate: "01 Feb 2026",
    joiningDate: "16 Feb 2026",
    leavingDate: "29 May 2026",
    tenure: "3 mo 13 d",
  },
];

const EmploymentRecord = () => {
  return (
    <main className="min-h-screen bg-background py-10 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6 flex items-center justify-between gap-4 flex-wrap">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to portfolio
          </Link>
          <button
            onClick={() => window.print()}
            className="text-sm px-3 py-1.5 rounded border border-border hover:bg-muted transition-colors"
          >
            Print
          </button>
        </div>

        <header className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Employment Record</h1>
          <p className="text-sm text-muted-foreground">
            Private reference for background-verification and form-filling. Not linked from
            the main site navigation.
          </p>
        </header>

        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr className="text-left">
                <th className="px-3 py-2 font-semibold">Company</th>
                <th className="px-3 py-2 font-semibold">Official Designation (BGV)</th>
                <th className="px-3 py-2 font-semibold">Actual Role</th>
                <th className="px-3 py-2 font-semibold whitespace-nowrap">Offer Date</th>
                <th className="px-3 py-2 font-semibold whitespace-nowrap">Joining Date</th>
                <th className="px-3 py-2 font-semibold whitespace-nowrap">Leaving Date</th>
                <th className="px-3 py-2 font-semibold whitespace-nowrap">Tenure</th>
              </tr>
            </thead>
            <tbody>
              {records.map((r) => (
                <tr key={r.company} className="border-t border-border">
                  <td className="px-3 py-2 font-medium">{r.company}</td>
                  <td className="px-3 py-2">{r.role}</td>
                  <td className="px-3 py-2 text-muted-foreground">{r.actualRole ?? r.role}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{r.offerDate}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{r.joiningDate}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{r.leavingDate}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{r.tenure}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-muted/30">
              <tr className="border-t border-border">
                <td colSpan={6} className="px-3 py-2 text-right font-semibold">
                  Total actual employment
                </td>
                <td className="px-3 py-2 font-semibold whitespace-nowrap">~9 yr 5 mo</td>
              </tr>
            </tfoot>
          </table>
        </div>

        <p className="mt-4 text-xs text-muted-foreground">
          Note: "Official Designation" matches payroll / offer-letter records used during
          background verification. "Actual Role" reflects day-to-day responsibilities used on
          resume, LinkedIn, and Naukri. ~2.5 month gap between Plurebus (Sep 2017) and Dunst
          (Dec 2017) is excluded. All other transitions were near-continuous.
        </p>
      </div>
    </main>
  );
};

export default EmploymentRecord;
