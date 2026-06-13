import { Smartphone, Cloud, BarChart3, CreditCard, Cog, Sparkles } from "lucide-react";

const skillCategories = [
  {
    title: "Cross-Platform Mobile Dev",
    icon: Smartphone,
    skills: ["React Native", "TypeScript", "JavaScript (ES6+)", "Expo", "React Navigation", "Redux Toolkit", "React Query", "Context API", "AsyncStorage", "GraphQL", "REST APIs"]
  },
  {
    title: "Android Development",
    icon: Smartphone,
    skills: ["Java", "Android SDK", "Android Studio", "Activities & Fragments", "Android Application Lifecycle", "Play Store Deployment", "Native Android Integrations"]
  },
  {
    title: "iOS Development",
    icon: Smartphone,
    skills: ["Xcode", "CocoaPods", "iOS Build Configuration", "Provisioning Profiles", "Certificates & Signing", "App Store Connect", "TestFlight Distribution", "App Store Deployment", "Native iOS Integrations"]
  },
  {
    title: "React Native Architecture",
    icon: Cog,
    skills: ["Hermes Engine", "JavaScript Interface (JSI)", "Fabric Renderer", "TurboModules", "Native Module Development", "React Native Bridge Architecture", "React Native New Architecture Concepts"]
  },
  {
    title: "React Native Internals",
    icon: Cog,
    skills: ["JavaScript Thread", "UI/Main Thread", "Shadow Thread", "Native Thread", "React Native Rendering Pipeline", "Bridge Communication", "Performance Optimization", "Memory Management"]
  },
  {
    title: "Architecture & Methods",
    icon: Sparkles,
    skills: ["MVVM", "Clean Architecture", "SOLID Principles", "Design Patterns", "Modular Architecture", "Agile Scrum", "Sprint Planning", "Code Reviews"]
  },
  {
    title: "Native Integrations",
    icon: Smartphone,
    skills: ["Authentication", "Camera", "GPS & Location Services", "Push Notifications", "Deep Linking", "Device Permissions", "File Upload & Download", "Payment Gateway Integrations", "Third-Party SDK Integrations"]
  },
  {
    title: "Backend & Cloud Services",
    icon: Cloud,
    skills: ["Firebase", "AWS Cognito", "Auth0", "Branch", "PostHog", "Sentry"]
  },
  {
    title: "Security & Payments",
    icon: CreditCard,
    skills: ["OAuth", "JWT Authentication", "Razorpay", "Cashfree", "Secure Authentication Workflows"]
  },
  {
    title: "Testing & Quality",
    icon: BarChart3,
    skills: ["Jest", "Unit Testing", "Integration Testing", "Detox", "E2E Testing"]
  },
  {
    title: "DevOps & Release Eng",
    icon: BarChart3,
    skills: ["CI/CD Pipelines", "Play Store Releases", "App Store Releases", "Crash Monitoring", "Release Automation", "Hotfix Management"]
  },
  {
    title: "Tools",
    icon: Cog,
    skills: ["Git", "GitHub", "Bitbucket", "Postman", "VS Code", "Android Studio", "Xcode", "Jira", "Confluence"]
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
