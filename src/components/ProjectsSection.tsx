import { ExternalLink, Smartphone, Users, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    name: "LetsVenture (LVX)",
    subtitle: "Investment/Finance Platform",
    period: "Sept 2019 - Present",
    tech: "React Native → Capacitor",
    teamSize: 9,
    description: "Led Android app development to create a user-friendly investment platform. Focused on real-time updates and a tailored newsfeed for investors.",
    skills: ["React Native", "JavaScript", "Firebase", "AWS Cognito", "Auth0", "Sentry", "PostHog", "Cashfree", "Push Notifications"],
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.lv",
    appStoreUrl: "https://apps.apple.com/in/app/letsventure/id1073504019",
    featured: true
  },
  {
    name: "LVXQ",
    subtitle: "Investor Portfolio & Engagement App",
    period: "2023 - Present",
    tech: "Capacitor",
    teamSize: 5,
    description: "Built a modern Capacitor-based investor portfolio app with secure login, portfolio tracking, startup insights, deep linking, and analytics.",
    skills: ["Capacitor", "TypeScript", "Auth0", "Branch", "PostHog", "Sentry"],
    featured: true
  },
  {
    name: "Scalix",
    subtitle: "Startup Founder Growth App",
    period: "Dec 2022 - July 2023",
    tech: "React Native",
    teamSize: 5,
    description: "Developed an integrated platform for startup founders to access community, capital, and customers. Worked in an Agile Scrum environment.",
    skills: ["React Native", "JavaScript", "Firebase", "AWS Cognito", "Auth0", "Chat", "Sentry"],
    featured: true
  },
  {
    name: "WildTrails",
    subtitle: "Wildlife Tourism App",
    period: "Mar 2018 - Sept 2019",
    tech: "Android (Java)",
    teamSize: 6,
    description: "Developed the app from scratch, supporting all Android devices. Implemented responsive UI for enhanced user experience in wildlife tourism.",
    skills: ["Java", "MVP", "Retrofit", "Glide", "Firebase"],
    playStoreUrl: "https://packages.wildtrails.in/#parks/",
    featured: true
  },
  {
    name: "Wildlife LiveUpdates",
    subtitle: "Real-time Wildlife Sightings",
    period: "Jan 2019 - Sept 2019",
    tech: "Android (Java)",
    teamSize: 6,
    description: "Developed features for real-time wildlife sighting updates with trip planning module and media gallery.",
    skills: ["Java", "MVP", "Retrofit", "Glide", "Firebase"],
    featured: false
  },
  {
    name: "Wanderlust",
    subtitle: "VR Travel App",
    period: "Dec 2017 - Mar 2018",
    tech: "Android",
    teamSize: 5,
    description: "Developed interactive and immersive VR travel experiences with 360-degree views and user experience enhancements.",
    skills: ["Java", "MVC", "Google Maps API", "REST API", "VR Libraries"],
    featured: false
  },
  {
    name: "SIFF",
    subtitle: "Film Festival App",
    period: "Dec 2017 - Mar 2018",
    tech: "Android",
    teamSize: 5,
    description: "Developed an app for booking film festival tickets and viewing show timings with multimedia API integration.",
    skills: ["Java", "MVC", "Google Maps API", "REST API", "Multimedia"],
    featured: false
  },
  {
    name: "Plurebus",
    subtitle: "Entertainment App",
    period: "Sept 2016 - Sept 2017",
    tech: "Android (Java)",
    teamSize: 6,
    description: "Developed an entertainment app connecting users with theaters and movies. Focused on responsive UI design and third-party library integration.",
    skills: ["Java", "Retrofit", "Glide", "Firebase"],
    featured: false
  }
];

const ProjectsSection = () => {
  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

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
                  <div className="p-2 sm:p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                    <Smartphone className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <span className="px-2 sm:px-3 py-1 text-[10px] sm:text-xs rounded-full bg-secondary text-secondary-foreground">
                    {project.tech}
                  </span>
                </div>
                
                <h3 className="text-lg sm:text-xl font-semibold mb-1">{project.name}</h3>
                <p className="text-primary text-xs sm:text-sm mb-2">{project.subtitle}</p>
                
                <div className="flex items-center gap-3 sm:gap-4 text-[10px] sm:text-xs text-muted-foreground mb-2 sm:mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span className="hidden xs:inline">{project.period}</span>
                    <span className="xs:hidden">{project.period.split(' - ')[0]}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    Team of {project.teamSize}
                  </div>
                </div>
                
                <p className="text-muted-foreground text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-none">{project.description}</p>
                
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.skills.slice(0, 5).map((skill) => (
                    <span key={skill} className="px-2 py-0.5 text-xs rounded bg-secondary/70 text-secondary-foreground">
                      {skill}
                    </span>
                  ))}
                  {project.skills.length > 5 && (
                    <span className="px-2 py-0.5 text-xs rounded bg-secondary/70 text-secondary-foreground">
                      +{project.skills.length - 5} more
                    </span>
                  )}
                </div>
                
                {(project.playStoreUrl || project.appStoreUrl) && (
                  <div className="flex gap-2">
                    {project.playStoreUrl && (
                      <Button size="sm" variant="outline" asChild className="gap-1 text-xs">
                        <a href={project.playStoreUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-3 h-3" />
                          Play Store
                        </a>
                      </Button>
                    )}
                    {project.appStoreUrl && (
                      <Button size="sm" variant="outline" asChild className="gap-1 text-xs">
                        <a href={project.appStoreUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-3 h-3" />
                          App Store
                        </a>
                      </Button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Supporting Projects */}
          <div className="text-center mb-4 sm:mb-6">
            <h3 className="text-lg sm:text-xl font-semibold text-muted-foreground">More Projects</h3>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {otherProjects.map((project) => (
              <div 
                key={project.name}
                className="glass-card p-3 sm:p-4 hover:border-primary/30 transition-all duration-300"
              >
                <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                  <Smartphone className="w-3 h-3 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                  <h4 className="font-semibold text-sm sm:text-base truncate">{project.name}</h4>
                </div>
                <p className="text-[10px] sm:text-xs text-primary mb-0.5 sm:mb-1 truncate">{project.subtitle}</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground">{project.period}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
