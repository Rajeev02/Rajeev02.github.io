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
                I am a senior mobile engineer based in{" "}
                <span className="text-foreground font-semibold">
                  Bengaluru, India
                </span>
                , building{" "}
                <span className="text-primary">
                  scalable cross-platform Android and iOS applications
                </span>{" "}
                using <span className="text-primary">React Native</span>, Expo,
                TypeScript, Redux Toolkit, and React Query.
              </p>
              <p>
                With{" "}
                <span className="text-foreground font-semibold">9+ years</span>{" "}
                of overall experience &mdash; including{" "}
                <span className="text-foreground font-semibold">
                  5+ years working as a React Native developer
                </span>{" "}
                &mdash; I have built and shipped mobile applications across{" "}
                <span className="text-foreground">fintech</span>,{" "}
                <span className="text-foreground">founder tooling</span>,{" "}
                <span className="text-foreground">student housing</span>,{" "}
                <span className="text-foreground">travel</span>, and{" "}
                <span className="text-foreground">consumer platforms</span>,
                owning end-to-end delivery and release ownership on both Play
                Store and App Store.
              </p>
              <p>
                Most recently, I worked as a Lead Mobile Engineer on a new React
                Native application for a student housing and hostel management
                platform. Before that, I spent{" "}
                <span className="text-foreground font-semibold">6+ years</span>{" "}
                at{" "}
                <a
                  href="https://www.letsventure.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  LetsVenture
                </a>{" "}
                as a Senior React Native Developer (official designation: Senior
                Android Developer), independently shipping investor-facing
                fintech products including{" "}
                <span className="text-primary">LVX</span>,{" "}
                <span className="text-primary">LVXQ</span>, and{" "}
                <span className="text-primary">Scalix</span>.
              </p>
              <p>
                My earlier experience includes native{" "}
                <span className="text-foreground">
                  Android development in Java
                </span>{" "}
                before transitioning into end-to-end React Native mobile
                engineering. I specialise in{" "}
                <span className="text-foreground">authentication</span>,{" "}
                <span className="text-foreground">payments</span>,{" "}
                <span className="text-foreground">analytics</span>,{" "}
                <span className="text-foreground">push notifications</span>,{" "}
                <span className="text-foreground">deep linking</span>,{" "}
                <span className="text-foreground">crash monitoring</span>,{" "}
                <span className="text-foreground">CI/CD pipelines</span>, and
                end-to-end app lifecycle management.
              </p>
              <p>
                I also use{" "}
                <span className="text-foreground">
                  modern debugging, refactoring, code review, and development
                  productivity workflows
                </span>{" "}
                to ship reliable mobile experiences faster.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
