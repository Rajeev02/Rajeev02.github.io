import { MapPin, Calendar, ExternalLink } from "lucide-react";

const experiences = [
  {
    company: "LetsVenture Technologies",
    companyUrl: "https://www.letsventure.com/",
    role: "Senior Mobile Application Developer",
    location: "Bengaluru",
    period: "September 2019 – Present",
    description: "Core engineer and technical owner for LetsVenture's fintech and investor mobile ecosystem.",
    products: ["LVX", "LVXQ", "Scalix"],
    highlights: [
      "Led the development of mobile applications for LetsVenture's investment platform, ensuring user-friendly and responsive experiences",
      "Responsible for design, development, and deployment of React Native applications, focusing on enhancing app performance",
      "Developed and launched 2 React Native applications from scratch, showcasing expertise in React Native",
      "Migrated large React Native codebase to Capacitor, improving crash stability and long-term scalability",
      "Integrated Auth0, AWS Cognito, Firebase, PostHog, Sentry, Branch, Cashfree, Razorpay",
      "Took full ownership of Play Store & App Store releases, hotfixes, crash monitoring, and production stability",
      "Collaborated with cross-functional teams including Product Managers, Backend Engineers, QA, and Designers"
    ]
  },
  {
    company: "WildTrails India",
    companyUrl: "https://packages.wildtrails.in/#parks/",
    role: "Software Engineer (Android)",
    location: "Bengaluru",
    period: "March 2018 – September 2019",
    description: "Built wildlife tourism and tracking applications.",
    products: ["WildTrails App", "Wildlife LiveUpdates"],
    highlights: [
      "Developed and maintained Android applications focused on wildlife sightings and tourism",
      "Implemented new features including trip planning module and gallery for images and videos",
      "Developed and launched 2 Android applications from scratch using Java",
      "Optimized UX and performance for low-network field environments"
    ]
  },
  {
    company: "Dunst Technologies",
    companyUrl: "https://www.linkedin.com/company/dunst-nolan-pvt-ltd/",
    role: "Junior Android Developer",
    location: "Bengaluru",
    period: "December 2017 – March 2018",
    description: "Developed VR and event management applications.",
    products: ["Wanderlust", "SIFF"],
    highlights: [
      "Worked on VR-based travel and film festival applications",
      "Created interactive and immersive mobile experiences using Google Maps API, REST API, and multimedia libraries",
      "Developed 2 Android applications from scratch"
    ]
  },
  {
    company: "Plurebus Technologies",
    companyUrl: "https://www.linkedin.com/company/plurebus/",
    role: "Junior R&D Engineer",
    location: "Bengaluru",
    period: "September 2016 – September 2017",
    description: "Built entertainment and media discovery platforms.",
    products: ["Plurebus – Entertainment App"],
    highlights: [
      "Developed consumer entertainment applications connecting users with theaters and movies",
      "Focused on responsive UI design and integration of various third-party libraries",
      "Developed and launched 1 Android application from scratch using Java"
    ]
  }
];

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-16 sm:py-20 md:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="section-heading">
              Professional <span className="text-gradient">Experience</span>
            </h2>
            <p className="section-subheading mx-auto px-2">
              9+ years of building production mobile applications
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-border md:left-1/2 md:-translate-x-1/2" />
            
            <div className="space-y-8 sm:space-y-12">
              {experiences.map((exp, index) => (
                <div 
                  key={exp.company + exp.period}
                  className={`relative pl-6 sm:pl-8 md:pl-0 ${
                    index % 2 === 0 ? "md:pr-[52%]" : "md:pl-[52%]"
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="timeline-dot md:left-1/2 md:-translate-x-1/2" />
                  
                  <div className="glass-card p-4 sm:p-6 hover:border-primary/30 transition-all duration-300">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <a 
                        href={exp.companyUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary font-semibold hover:underline inline-flex items-center gap-1"
                      >
                        {exp.company}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    
                    <h3 className="text-lg sm:text-xl font-semibold mb-2">{exp.role}</h3>
                    
                    <div className="flex flex-col xs:flex-row flex-wrap items-start xs:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                        {exp.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                        {exp.period}
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-4">{exp.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {exp.products.map((product) => (
                        <span key={product} className="px-2 py-1 text-xs rounded bg-primary/10 text-primary font-medium">
                          {product}
                        </span>
                      ))}
                    </div>
                    
                    <ul className="space-y-2">
                      {exp.highlights.slice(0, 4).map((highlight, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex gap-2">
                          <span className="text-primary mt-1 flex-shrink-0">•</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
