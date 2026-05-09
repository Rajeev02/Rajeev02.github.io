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
                I am a senior mobile engineer based in <span className="text-foreground font-semibold">Bengaluru, India</span>, with strong expertise in <span className="text-primary">React Native</span>, <span className="text-primary">Android</span>, and production-grade mobile delivery across both <span className="text-primary">iOS and Android</span>.
              </p>
              <p>
                With <span className="text-foreground font-semibold">9+ years</span> of experience, I have built secure, scalable mobile products across fintech, student housing, travel, and consumer platforms. My work includes shipping <span className="text-primary">7 apps on the Play Store</span> and <span className="text-primary">4 on the App Store</span>, with ownership across delivery, releases, and production support.
              </p>
              <p>
                Most recently, I worked on a new <span className="text-foreground font-semibold">React Native</span> mobile app at <a href="https://www.spacebasic.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">SpaceBasic</a>, focused on modernising the hostel and student housing mobile experience. Before that, I led development on <a href="https://www.letsventure.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">LetsVenture</a>'s investor-facing mobile platforms including <span className="text-primary">LVX</span> and <span className="text-primary">LVXQ</span>.
              </p>
              <p>
                I specialize in <span className="text-foreground">authentication</span>, <span className="text-foreground">payments</span>, <span className="text-foreground">analytics</span>, <span className="text-foreground">push notifications</span>, <span className="text-foreground">deep linking</span>, <span className="text-foreground">performance optimisation</span>, and <span className="text-foreground">production-grade mobile architecture</span>. I’m currently focused on senior React Native roles where I can contribute as a hands-on engineer with strong product ownership.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
