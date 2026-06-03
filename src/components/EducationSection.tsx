import { GraduationCap, Languages } from "lucide-react";

const education = [
  {
    degree: "Master of Computer Applications (MCA)",
    institution: "National Institute of Technology Durgapur",
    startDate: "15 July 2013",
    endDate: "30 June 2016",
    duration: "2 yr 11 mo 15 d",
    result: "6.97 CGPA",
  },
  {
    degree: "Bachelor of Computer Applications (BCA)",
    institution:
      "Dr. Harisingh Gour Vishwavidyalaya (University of Saugar), Sagar",
    startDate: "15 July 2009",
    endDate: "30 June 2012",
    duration: "2 yr 11 mo 15 d",
    result: "75.12%",
  }
];

const languages = ["English (Fluent)", "Hindi (Native)"];

const EducationSection = () => {
  return (
    <section id="education" className="py-16 sm:py-20 md:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="section-heading">
              Education & <span className="text-gradient">Languages</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Education */}
            <div className="glass-card p-4 sm:p-6">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="p-1.5 sm:p-2 rounded-lg bg-primary/10 text-primary">
                  <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold">Education</h3>
              </div>
              
              <div className="space-y-4 sm:space-y-6">
                {education.map((edu, index) => (
                  <div key={index} className="relative pl-3 sm:pl-4 border-l-2 border-primary/30">
                    <h4 className="font-semibold text-sm sm:text-lg">{edu.degree}</h4>
                    <p className="text-muted-foreground text-xs sm:text-base">{edu.institution}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                      {edu.startDate} - {edu.endDate}
                    </p>
                    <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs sm:text-sm text-muted-foreground mt-1">
                      <span>Duration: {edu.duration}</span>
                      <span>Result: {edu.result}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Languages */}
            <div className="glass-card p-4 sm:p-6">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="p-1.5 sm:p-2 rounded-lg bg-primary/10 text-primary">
                  <Languages className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold">Languages</h3>
              </div>
              
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {languages.map((lang) => (
                  <span 
                    key={lang}
                    className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-secondary text-secondary-foreground font-medium text-sm sm:text-base"
                  >
                    {lang}
                  </span>
                ))}
              </div>
              
              <div className="mt-6 sm:mt-8 p-3 sm:p-4 rounded-xl bg-primary/5 border border-primary/20">
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Fluent in both <span className="text-foreground font-medium">English</span> and <span className="text-foreground font-medium">Hindi</span>, enabling effective communication with diverse teams and stakeholders across India.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
