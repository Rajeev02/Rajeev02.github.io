import { Smartphone, Cloud, BarChart3, CreditCard, Cog, Sparkles } from "lucide-react";

const skillCategories = [
  {
    title: "Mobile Development",
    icon: Smartphone,
    skills: ["React Native", "Expo", "TypeScript", "JavaScript", "React Navigation", "Redux Toolkit", "React Query"]
  },
  {
    title: "Native Android Experience",
    icon: Smartphone,
    skills: ["Java", "Android SDK", "Activities & Fragments", "REST API integration", "Play Store release management"]
  },
  {
    title: "Platform & Integrations",
    icon: Cog,
    skills: ["Android & iOS builds", "Xcode", "Android Studio", "Deep linking", "Push notifications", "Permissions", "Native module integration"]
  },
  {
    title: "Backend & Cloud Services",
    icon: Cloud,
    skills: ["Firebase", "Auth0", "AWS Cognito", "Branch", "Sentry", "PostHog"]
  },
  {
    title: "Payments & Security",
    icon: CreditCard,
    skills: ["Cashfree", "Razorpay", "Secure authentication workflows"]
  },
  {
    title: "Release Engineering",
    icon: BarChart3,
    skills: ["Play Store releases", "App Store releases", "CI/CD pipelines", "Crash monitoring", "Hotfix workflows"]
  },
  {
    title: "Engineering Productivity",
    icon: Sparkles,
    skills: ["AI-assisted debugging", "Refactoring workflows", "Code review automation", "Engineering productivity tooling"]
  }
];

const SkillsSection = () => {
  return (
    <section id="skills" className="py-16 sm:py-20 md:py-24 bg-card/30">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="section-heading">
              Core <span className="text-gradient">Expertise</span>
            </h2>
            <p className="section-subheading mx-auto px-2">
              Technologies and tools I use to build exceptional mobile experiences
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {skillCategories.map((category, index) => (
              <div 
                key={category.title}
                className="glass-card p-4 sm:p-6 hover:border-primary/30 transition-all duration-300 group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className="p-1.5 sm:p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                    <category.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <h3 className="font-semibold text-base sm:text-lg">{category.title}</h3>
                </div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {category.skills.map((skill) => (
                    <span key={skill} className="skill-badge">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
