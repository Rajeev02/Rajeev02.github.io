import { MapPin, Calendar, ExternalLink } from "lucide-react";

const experiences = [
  {
    company: "LetsVenture Technologies",
    companyUrl: "https://www.letsventure.com/",
    role: "Senior React Native Developer (Official Designation: Senior Android Developer)",
    location: "Bengaluru",
    period: "12 Sep 2019 – 12 Feb 2026",
    description:
      "Owned end-to-end mobile delivery for investor-facing fintech products and founder-focused mobile workflows.",
    products: ["LVX", "LVXQ", "Scalix"],
    highlights: [
      "Joined as an Android Developer; transitioned into React Native within the first year and worked primarily as a Senior React Native Developer for the remainder of the tenure, owning cross-platform Android & iOS delivery as an individual contributor",
      "Owned end-to-end mobile delivery for investor-facing fintech products (LVX, LVXQ) and Scalix for LetsVenture — feature design, implementation, code reviews, releases, and post-release stability",
      "Built and maintained authentication (Auth0, AWS Cognito), payments (Razorpay, Cashfree), analytics (PostHog), crash monitoring (Sentry), deep linking (Branch), and push notifications (Firebase)",
      "Managed Play Store and App Store release cycles end-to-end — versioning, signing, store submissions, hotfix workflows, and CI/CD pipelines for predictable production deployments",
      "Worked closely with backend, product, and design teams; contributed to mobile architecture, navigation, and state-management patterns using Redux Toolkit and React Query",
    ],
  },
  {
    company: "WildTrails India",
    companyUrl: "https://packages.wildtrails.in/#parks/",
    role: "Android Developer (Official Designation: Software Development Engineer I)",
    location: "Bengaluru",
    period: "19 Mar 2018 – 11 Sep 2019",
    description:
      "Built wildlife discovery and trip-planning Android applications.",
    products: ["WildTrails App", "Wildlife LiveUpdates"],
    highlights: [
      "Built Android application features for wildlife discovery, trip planning, and media-rich user experiences",
      "Integrated REST APIs and optimised application performance for low-network safari and remote-field environments",
      "Contributed to mobile stability improvements and user experience enhancements",
    ],
  },
  {
    company: "Dunst Technology Pvt Ltd",
    companyUrl: "https://www.linkedin.com/company/dunst-nolan-pvt-ltd/",
    role: "Android Developer (Official Designation: Junior Android Developer)",
    location: "Bengaluru",
    period: "14 Dec 2017 – 14 Mar 2018",
    description: "Developed VR travel and film festival Android applications.",
    products: ["Wanderlust & SIFF"],
    highlights: [
      "Developed Android application features for VR travel experiences, multimedia content delivery, event schedules, and ticket-related workflows",
      "Worked on performance optimisation and feature implementation for consumer-facing mobile applications",
    ],
  },
  {
    company: "Plurebus Technology",
    companyUrl: "https://www.linkedin.com/company/plurebus/",
    role: "Android Developer (Official Designation: Junior R&D Engineer)",
    location: "Bengaluru",
    period: "27 Sep 2016 – 29 Sep 2017",
    description:
      "Built entertainment-platform Android features and integrations (similar to BookMyShow).",
    products: ["Plurebus Android App"],
    highlights: [
      "Built Android features and API integrations for an entertainment platform similar to BookMyShow, focused on discovery and booking experiences for movies, theatre, drama, and live shows",
      "Worked on rich, media-driven user experiences, listings, schedules, and booking-related workflows, contributing to feature development and overall application enhancements",
    ],
  },
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
                9 years of building production mobile applications
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

                    <h3 className="text-lg sm:text-xl font-semibold mb-2">
                      {exp.role}
                    </h3>

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

                    <p className="text-muted-foreground mb-4">
                      {exp.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {exp.products.map((product) => (
                        <span
                          key={product}
                          className="px-2 py-1 text-xs rounded bg-primary/10 text-primary font-medium"
                        >
                          {product}
                        </span>
                      ))}
                    </div>

                    <ul className="space-y-2">
                      {exp.highlights.slice(0, 4).map((highlight, i) => (
                        <li
                          key={i}
                          className="text-sm text-muted-foreground flex gap-2"
                        >
                          <span className="text-primary mt-1 flex-shrink-0">
                            •
                          </span>
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
