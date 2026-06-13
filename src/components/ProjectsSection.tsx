import { ExternalLink, Users, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    name: "LVX & LVXQ – LetsVenture",
    subtitle: "Investor Platform & Portfolio App",
    period: "Sep 2019 - Feb 2026",
    tech: "React Native",
    teamSize: 9,
    description:
      "Investor-focused fintech applications supporting startup investments, portfolio management, secure authentication, payment workflows, analytics tracking, and release management.",
    skills: [
      "React Native",
      "TypeScript",
      "Firebase",
      "AWS Cognito",
      "Auth0",
      "Sentry",
      "PostHog",
      "Cashfree",
      "Razorpay",
    ],
    webUrl: "https://www.letsventure.com/",
    icon: "/images/apps/lvx.png",
    featured: true,
  },
  {
    name: "Scalix",
    subtitle: "Startup Ecosystem Platform",
    period: "Sep 2019 - Feb 2026",
    tech: "React Native",
    teamSize: 6,
    description:
      "Startup ecosystem platform helping founders access fundraising opportunities, startup perks, service providers, beta customers, business tools, and growth resources.",
    skills: [
      "React Native",
      "TypeScript",
      "Redux Toolkit",
      "React Query",
      "AWS Cognito"
    ],
    featured: true,
  },
  {
    name: "WildTrails",
    subtitle: "Wildlife Discovery & Trip Planning",
    period: "Mar 2018 - Sep 2019",
    tech: "Android (Java)",
    teamSize: 6,
    description:
      "Wildlife discovery and safari planning application optimized for rich media experiences and low-network environments.",
    skills: ["Java", "Android Studio", "REST APIs", "Firebase", "JSON", "Git"],
    webUrl: "https://packages.wildtrails.in/#parks/",
    icon: "/images/apps/forestguide.png",
    featured: true,
  },
  {
    name: "Wanderlust & SIFF",
    subtitle: "VR Travel & Film Festival Apps",
    period: "Dec 2017 - Mar 2018",
    tech: "Android",
    teamSize: 3,
    description:
      "Android applications for VR travel experiences and film-festival schedules with multimedia and ticketing capabilities.",
    skills: [
      "Java",
      "Android Studio",
      "Android SDK",
      "REST APIs",
      "JSON",
      "Multimedia Integration",
      "Git",
    ],
    featured: true,
  },
  {
    name: "Plurebus",
    subtitle: "Entertainment App (BookMyShow-style)",
    period: "Sep 2016 - Sep 2017",
    tech: "Android (Java)",
    teamSize: 1,
    description:
      "Android entertainment platform similar to BookMyShow — discovery and booking experiences for movies, theatre, drama, and live shows, with rich, media-driven user experiences and REST API integrations.",
    skills: ["Java", "Android Studio", "REST APIs", "Firebase", "JSON", "Git"],
    icon: "/images/apps/plurebus.png",
    featured: true,
  },
];

const ProjectsSection = () => {
  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-16 sm:py-20 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="section-heading">
              Production <span className="text-gradient">Applications</span>
            </h2>
            <p className="section-subheading mx-auto px-2">
              Apps I've built that serve thousands of real users
            </p>
          </div>

          {/* Featured Projects */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12">
            {featuredProjects.map((project) => (
              <div
                key={project.name}
                className="glass-card p-4 sm:p-6 hover:border-primary/30 transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  {project.icon ? (
                    <img
                      src={project.icon}
                      alt={`${project.name} icon`}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl object-cover shadow-md"
                    />
                  ) : (
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <span className="text-lg font-bold">
                        {project.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  <span className="px-2 sm:px-3 py-1 text-[10px] sm:text-xs rounded-full bg-secondary text-secondary-foreground">
                    {project.tech}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-semibold mb-1">
                  {project.name}
                </h3>
                <p className="text-primary text-xs sm:text-sm mb-2">
                  {project.subtitle}
                </p>

                <div className="flex items-center gap-3 sm:gap-4 text-[10px] sm:text-xs text-muted-foreground mb-2 sm:mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span className="hidden xs:inline">{project.period}</span>
                    <span className="xs:hidden">
                      {project.period.split(" - ")[0]}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    Team of {project.teamSize}
                  </div>
                </div>

                <p className="text-muted-foreground text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-none">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.skills.slice(0, 5).map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 text-xs rounded bg-secondary/70 text-secondary-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                  {project.skills.length > 5 && (
                    <span className="px-2 py-0.5 text-xs rounded bg-secondary/70 text-secondary-foreground">
                      +{project.skills.length - 5} more
                    </span>
                  )}
                </div>

                {(project.playStoreUrl ||
                  project.appStoreUrl ||
                  project.webUrl) && (
                  <div className="flex flex-wrap gap-2">
                    {project.playStoreUrl && (
                      <Button
                        size="sm"
                        variant="outline"
                        asChild
                        className="gap-1 text-xs"
                      >
                        <a
                          href={project.playStoreUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-3 h-3" />
                          Play Store
                        </a>
                      </Button>
                    )}
                    {project.appStoreUrl && (
                      <Button
                        size="sm"
                        variant="outline"
                        asChild
                        className="gap-1 text-xs"
                      >
                        <a
                          href={project.appStoreUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-3 h-3" />
                          App Store
                        </a>
                      </Button>
                    )}
                    {project.webUrl && (
                      <Button
                        size="sm"
                        variant="outline"
                        asChild
                        className="gap-1 text-xs"
                      >
                        <a
                          href={project.webUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-3 h-3" />
                          Website
                        </a>
                      </Button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>


        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
