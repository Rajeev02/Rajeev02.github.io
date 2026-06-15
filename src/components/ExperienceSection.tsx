import { MapPin, Calendar, ExternalLink } from "lucide-react";

const experiences = [
  {
    company: "LETSVENTURE TECHNOLOGIES PRIVATE LIMITED",
    companyUrl: "https://www.letsventure.com/",
    role: "Senior React Native Developer (Promoted from Android Developer & Senior Android Developer)",
    location: "Bengaluru",
    period: "Sep 2019 - Feb 2026",
    description:
      "Domain: Fintech | SaaS | Startup Ecosystem",
    products: ["LVX", "LVXQ", "Scalix"],
    highlights: [
      "Contributed to fintech products serving startup founders and investors across the LetsVenture ecosystem.",
      "Designed and developed cross-platform Android and iOS applications using React Native, TypeScript, GraphQL, Redux Toolkit, React Query, and REST APIs.",
      "Owned and executed React Native version upgrades across multiple release cycles, maintaining applications from React Native 0.63 through 0.83 while ensuring compatibility and production stability.",
      "Contributed to React Native New Architecture adoption, including Hermes, JSI, Fabric, and TurboModules, as part of platform modernization efforts.",
      "Delivered 60+ production releases across Android and iOS platforms, including feature launches, framework upgrades, bug fixes, performance improvements, and compliance updates.",
      "Built reusable white-label applications supporting multiple products and business use cases from a shared codebase.",
      "Managed Development, QA, UAT, Staging, and Production environments using environment-based configurations and release workflows.",
      "Implemented multi-language, multi-theme, and accessibility features to improve localization and user experience.",
      "Integrated AWS Cognito, Auth0, OAuth, JWT authentication, Razorpay, and Cashfree payment solutions.",
      "Developed and maintained native integrations including Camera, Location Services, Push Notifications, Deep Linking, Device Permissions, Analytics, and Crash Reporting.",
      "Automated Android and iOS build, testing, and deployment pipelines using Fastlane and GitHub Actions.",
      "Participated in architecture discussions, technical planning, code reviews, performance optimization, and Agile delivery processes.",
      "Mentored junior developers and contributed to engineering standards, development practices, and knowledge-sharing initiatives."
    ],
  },
  {
    company: "WILDTRAILS TECHNOLOGY PRIVATE LIMITED",
    companyUrl: "https://packages.wildtrails.in/#parks/",
    role: "Software Engineer (Android Developer)",
    location: "Bengaluru",
    period: "Mar 2018 - Sep 2019",
    description:
      "Built wildlife discovery and trip-planning Android applications.",
    products: ["WildTrails App", "Wildlife LiveUpdates"],
    highlights: [
      "Developed Android applications using Java for wildlife exploration and safari planning platforms.",
      "Integrated REST APIs and optimized application performance for low-network environments.",
      "Improved application stability, responsiveness, and overall user experience.",
      "Collaborated with product, backend, and QA teams for feature delivery and production releases."
    ],
  },
  {
    company: "DUNST TECHNOLOGIES PRIVATE LIMITED",
    companyUrl: "https://www.linkedin.com/company/dunst-nolan-pvt-ltd/",
    role: "Junior Android Developer",
    location: "Bengaluru",
    period: "Dec 2017 - Mar 2018",
    description: "Developed VR travel and film festival Android applications.",
    products: ["Wanderlust", "SIFF"],
    highlights: [
      "Developed Android application features using Java for travel and event management platforms.",
      "Implemented notifications, multimedia content delivery, scheduling, and ticketing workflows.",
      "Integrated REST APIs and supported production deployments and maintenance activities."
    ],
  },
  {
    company: "PLUREBUS TECHNOLOGIES PRIVATE LIMITED",
    companyUrl: "https://www.linkedin.com/company/plurebus/",
    role: "Junior R&D Engineer (Android Developer)",
    location: "Bengaluru",
    period: "Sep 2016 - Sep 2017",
    description:
      "Built entertainment-platform Android features and integrations (similar to BookMyShow).",
    products: ["Plurebus Android App"],
    highlights: [
      "Developed Android applications using Java for entertainment discovery and booking platforms.",
      "Implemented search, booking workflows, multimedia content delivery, and REST API integrations.",
      "Collaborated with backend and product teams to improve application performance and reliability."
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
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-border md:left-1/2 md:-translate-x-1/2" />

            <div className="space-y-8 sm:space-y-12">
              {experiences.map((exp, index) => (
                <div
                  key={exp.company + exp.period}
                  className={`relative pl-6 sm:pl-8 md:pl-0 ${
                    index % 2 === 0 ? "md:pr-[52%]" : "md:pl-[52%]"
                  }`}
                >
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
