import { MapPin, Calendar, ExternalLink } from "lucide-react";

const experiences = [
  {
    company: "SpaceBasic",
    companyUrl: "https://www.spacebasic.com/",
    role: "Lead Mobile Engineer",
    location: "Bengaluru",
    period: "February 2026 – May 2026",
    description: "Worked on a new React Native app for hostel and student housing operations.",
    products: ["Student Housing App"],
    highlights: [
      "Worked on development of a new React Native mobile app for Android and iOS",
      "Contributed to architecture, feature delivery, and modernisation of the existing hostel management experience",
      "Supported workflows across student housing operations, communication, and mobile usability improvements",
      "Used Expo-based tooling and modern React Native patterns for delivery readiness"
    ]
  },
  {
    company: "LetsVenture Technologies",
    companyUrl: "https://www.letsventure.com/",
    role: "Senior React Native Developer",
    location: "Bengaluru",
    period: "September 2019 – February 2026",
    description: "Led mobile delivery for LetsVenture's fintech and investor mobile ecosystem.",
    products: ["LVX", "LVXQ", "Scalix"],
    highlights: [
      "Led development of investor-facing mobile apps across React Native, Android, and Capacitor",
      "Built secure onboarding, authentication, payments, push notifications, analytics, and deep linking workflows",
      "Developed and launched mobile products including LVX, LVXQ, and Scalix",
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
    description: "Built wildlife tourism and real-time sightings applications.",
    products: ["WildTrails App", "Wildlife LiveUpdates"],
    highlights: [
      "Built Android app features for wildlife sighting discovery, trip planning, and media-driven user journeys",
      "Implemented API integrations and production app workflows for travel and wildlife users",
      "Developed and launched 2 Android applications from scratch using Java",
      "Optimized UX and performance for low-network field environments"
    ]
  },
  {
    company: "Dunst Technologies",
    companyUrl: "https://www.linkedin.com/company/dunst-nolan-pvt-ltd/",
    role: "Android Application Developer",
    location: "Bengaluru",
    period: "December 2017 – March 2018",
    description: "Developed VR travel and film festival applications.",
    products: ["Wanderlust & SIFF"],
    highlights: [
      "Built Android features for Wanderlust, a VR-based travel experience app with immersive 360-degree content",
      "Built Android features for SIFF, a film festival app for schedules, ticket-related flows, and media content",
      "Contributed to feature development, multimedia experiences, and mobile app delivery"
    ]
  },
  {
    company: "Plurebus Technologies",
    companyUrl: "https://www.linkedin.com/company/plurebus/",
    role: "R&D Engineer",
    location: "Bengaluru",
    period: "September 2016 – September 2017",
    description: "Built entertainment and media discovery platforms.",
    products: ["Plurebus – Entertainment App"],
    highlights: [
      "Contributed to Android application development for an entertainment platform focused on movie discovery and user engagement",
      "Worked on app features, API integration, and mobile delivery",
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
