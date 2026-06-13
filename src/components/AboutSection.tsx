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
                  5+ years in React Native
                </span>{" "}
                and 4 years in Native Android development. Experienced in designing, developing, deploying, and maintaining scalable{" "}
                <span className="text-primary">
                  Android and iOS applications
                </span>{" "}
                across Fintech, SaaS, Travel, Entertainment, and Consumer Technology domains.
              </p>
              <p>
                Strong expertise in{" "}
                <span className="text-foreground">
                  React Native, TypeScript, JavaScript, GraphQL, Redux Toolkit, React Query
                </span>
                , Authentication Systems, Payment Gateway Integrations, Analytics, Push Notifications, Deep Linking, Native Module Integrations, CI/CD Pipelines, and Mobile Release Management.
              </p>
              <p>
                Possess strong understanding of{" "}
                <span className="text-foreground font-semibold">
                  React Native architecture and internals
                </span>
                , including <span className="text-primary">Hermes, JSI, Fabric Renderer, TurboModules</span>, React Native Bridge Architecture, JavaScript Thread, UI Thread, Shadow Thread, and Native Module communication.
              </p>
              <p>
                Experienced in building and maintaining production-grade mobile applications while collaborating with Product, Design, Backend, QA, and Business teams in{" "}
                <span className="text-foreground">Agile Scrum environments</span>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
