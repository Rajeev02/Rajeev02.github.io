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
                I am an experienced Mobile App Developer based in <span className="text-foreground font-semibold">Bengaluru, India</span>, with extensive expertise in <span className="text-primary">React Native</span> and <span className="text-primary">Android</span>. My career is built on creating high-performance applications that prioritize user experience and scalability.
              </p>
              <p>
                With <span className="text-foreground font-semibold">9+ years</span> of experience building secure, scalable, high-traffic iOS and Android applications, I specialize in delivering high-quality, user-centric applications across industries. My work includes launching <span className="text-primary">7 successful apps on the Play Store</span> and <span className="text-primary">4 on the App Store</span>.
              </p>
              <p>
                Currently, as a <span className="text-foreground font-semibold">Senior Mobile Application Developer</span> at <a href="https://www.letsventure.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">LetsVenture Technologies</a>, I lead development on India's leading startup investment platform, focusing on real-time updates, seamless user experiences, and owning <span className="text-primary">LVX</span> and <span className="text-primary">LVXQ</span> — large-scale fintech apps used by thousands of investors and founders.
              </p>
              <p>
                With a strong foundation in <span className="text-foreground">Agile methodologies</span>, I ensure efficient collaboration and successful project delivery. I'm specialized in <span className="text-foreground">authentication</span>, <span className="text-foreground">payments</span>, <span className="text-foreground">analytics</span>, <span className="text-foreground">real-time systems</span>, <span className="text-foreground">deep linking</span>, and <span className="text-foreground">production-grade mobile architecture</span>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
