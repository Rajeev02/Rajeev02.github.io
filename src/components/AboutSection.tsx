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
                  5+ years building cross-platform applications with React Native
                </span>{" "}
                and 4 years in Native Android development.
              </p>
              <p>
                Experienced in developing scalable{" "}
                <span className="text-primary">
                  Android and iOS applications
                </span>{" "}
                across Fintech, SaaS, Travel, and Consumer Technology domains using React Native, TypeScript, GraphQL, Redux Toolkit, React Query, and REST APIs.
              </p>
              <p>
                Led React Native upgrades from version{" "}
                <span className="text-foreground font-semibold">0.63 to 0.83</span>{" "}
                and successfully migrated applications from Legacy Architecture to New Architecture using <span className="text-primary">Hermes, JSI, Fabric, and TurboModules</span>. Experienced in white-label applications, multi-environment setups, localization, accessibility, payment integrations, authentication systems, CI/CD automation, and release management.
              </p>
              <p>
                Delivered 60+ Android and iOS production releases while working closely with product, design, QA, and backend teams in <span className="text-foreground font-semibold">Agile environments</span>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
