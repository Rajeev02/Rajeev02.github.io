const AboutSection = () => {
  return (
    <section id="about" className="py-16 sm:py-20 md:py-24 relative">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="section-heading text-center mb-8 sm:mb-12">
            About <span className="text-gradient">Me</span>
          </h2>

          <div className="glass-card p-5 sm:p-8 md:p-12">
            <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-muted-foreground leading-relaxed">
              <p>
                Senior Mobile Engineer with{" "}
                <span className="text-foreground font-semibold">
                  9+ years of experience
                </span>{" "}
                in mobile application development, including{" "}
                <span className="text-foreground font-semibold">
                  5+ years building cross-platform Android and iOS applications using React Native
                </span>{" "}
                and 4 years developing Native Android applications using Java.
              </p>
              <p>
                Experienced in delivering mobile solutions across Fintech, SaaS, Travel, Entertainment, and Consumer Technology domains using{" "}
                <span className="text-foreground">
                  React Native, TypeScript, JavaScript, GraphQL, Redux Toolkit, React Query, REST APIs, and Android technologies
                </span>.
              </p>
              <p>
                Owned and executed React Native version upgrades across multiple release cycles, maintaining applications from React Native <span className="text-foreground font-semibold">0.63 through 0.83</span> while ensuring compatibility, stability, and smooth production deployments. Hands-on experience with <span className="text-primary">React Native New Architecture adoption</span>, including Hermes, JSI, Fabric, and TurboModules.
              </p>
              <p>
                Experienced in white-label applications, multi-environment configurations, localization, accessibility, authentication systems, payment integrations, CI/CD automation, release management, and end-to-end mobile application delivery across Android and iOS platforms.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
