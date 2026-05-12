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
                I am a senior mobile engineer based in <span className="text-foreground font-semibold">Bengaluru, India</span>, building <span className="text-primary">cross-platform Android and iOS apps</span> from a single <span className="text-primary">React Native</span> codebase.
              </p>
              <p>
                With <span className="text-foreground font-semibold">9+ years</span> of experience, I have shipped secure, scalable mobile products across fintech, student housing, travel, and consumer platforms — with <span className="text-primary">7 apps on the Play Store</span> and <span className="text-primary">4 on the App Store</span>, owning delivery, releases, and production support on both platforms.
              </p>
              <p>
                My career started with around <span className="text-foreground font-semibold">4 years of native Android development in Java</span> (last hands-on in 2020) before moving to React Native for end-to-end Android + iOS delivery. I am comfortable with the iOS build, signing, and release pipeline via React Native, while <span className="text-foreground">native iOS development (Swift / Objective-C)</span> is not part of my hands-on experience.
              </p>
              <p>
                Most recently, I worked on a new <span className="text-foreground font-semibold">React Native</span> mobile app at <a href="https://www.spacebasic.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">SpaceBasic</a>, focused on modernising the hostel and student housing mobile experience. Before that, I led mobile delivery at <a href="https://www.letsventure.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">LetsVenture</a> for investor products including <span className="text-primary">LVX</span> and <span className="text-primary">LVXQ</span>.
              </p>
              <p>
                I specialise in <span className="text-foreground">authentication</span>, <span className="text-foreground">payments</span>, <span className="text-foreground">analytics</span>, <span className="text-foreground">push notifications</span>, <span className="text-foreground">deep linking</span>, <span className="text-foreground">performance optimisation</span>, and end-to-end Play Store / App Store release ownership. I use <span className="text-foreground">AI-assisted engineering tools</span> — GitHub Copilot, Claude, OpenAI Codex, and Google Gemini — to accelerate development, refactoring, debugging, and review workflows.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
