import { MapPin, Calendar, ExternalLink } from "lucide-react";

const experiences = [
  {
    company: "LETSVENTURE TECHNOLOGIES PRIVATE LIMITED",
    companyUrl: "https://www.letsventure.com/",
    role: "Senior React Native Developer / Senior Android Developer",
    location: "Bengaluru",
    period: "Sep 2019 - Feb 2026",
    description:
      "Domain: Fintech | SaaS | Startup Ecosystem",
    products: ["LVX", "LVXQ", "Scalix"],
    highlights: [
      "Led end-to-end development of investor-focused fintech applications across Android and iOS platforms using React Native and TypeScript.",
      "Architected scalable and maintainable mobile solutions using Redux Toolkit, React Query, GraphQL, and REST APIs.",
      "Delivered 60+ successful production releases across Android and iOS while ensuring platform stability, performance, and compliance.",
      "Implemented secure authentication and authorization workflows using AWS Cognito, Auth0, JWT Authentication, and OAuth.",
      "Integrated payment gateways including Razorpay and Cashfree to support secure financial transactions.",
      "Developed and maintained native integrations for Camera, Location Services, Push Notifications, Device Permissions, and Payment SDKs.",
      "Implemented Deep Linking, Universal Links, Firebase Cloud Messaging (FCM), Branch.io, and notification workflows to improve user engagement.",
      "Optimized application performance through rendering improvements, memory optimization, API caching strategies, and efficient state management.",
      "Participated in React Native New Architecture adoption initiatives involving Hermes, JSI, Fabric Renderer, and TurboModules.",
      "Collaborated with Product Managers, Designers, Backend Engineers, QA Teams, and Business Stakeholders throughout the product lifecycle.",
      "Conducted code reviews, technical discussions, release planning, sprint estimations, and mentoring activities for development teams.",
      "Managed Play Store and App Store releases, production hotfixes, crash monitoring, and CI/CD automation processes."
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
      "Developed Android application features for wildlife exploration and safari planning platforms",
      "Integrated REST APIs and optimized application performance for low-bandwidth and remote-network environments",
      "Improved application stability, responsiveness, and overall user experience",
      "Collaborated with backend and product teams to deliver new mobile features and product enhancements"
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
      "Developed Android application features for VR travel and event-management applications with REST API integrations",
      "Implemented multimedia content delivery, event scheduling, notifications, and ticketing workflows",
      "Optimized application performance and user experience",
      "Supported maintenance and feature enhancement activities"
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
      "Developed Android application features for a movie, theatre, drama, and live-event discovery platform similar to BookMyShow",
      "Implemented event listings, booking workflows, multimedia content, and search experiences",
      "Integrated REST APIs and customer booking functionalities",
      "Collaborated with backend and product teams to improve scalability, performance, and application stability",
      "Contributed to bug fixing, optimization, and platform enhancements"
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
