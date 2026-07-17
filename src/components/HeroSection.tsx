import { Mail, MapPin, Phone, Linkedin, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16 sm:pt-20 pb-12 sm:pb-16">
      {/* Background gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-64 sm:w-96 h-64 sm:h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-64 sm:w-96 h-64 sm:h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-secondary/50 border border-border mb-6 sm:mb-8 animate-fade-up opacity-0">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs sm:text-sm text-muted-foreground">
              Available for opportunities
            </span>
          </div>

          {/* Name */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 animate-fade-up opacity-0 delay-100">
            Rajeev Kumar <span className="text-gradient">Joshi</span>
          </h1>

          {/* Title */}
          <p className="text-lg sm:text-xl md:text-2xl text-primary font-medium mb-4 sm:mb-6 animate-fade-up opacity-0 delay-200 px-2">
            Senior Mobile Engineer | React Native Developer (Android &amp; iOS)
          </p>

          {/* Contact info */}
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-2 sm:gap-4 mb-8 sm:mb-10 animate-fade-up opacity-0 delay-400">
            <div className="flex items-center gap-2 text-muted-foreground text-sm sm:text-base">
              <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
              <span>Bengaluru, India</span>
            </div>
            <a
              href="tel:+918792169096"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm sm:text-base"
            >
              <Phone className="w-4 h-4 text-primary flex-shrink-0" />
              <span>+91 8792169096</span>
            </a>
            <a
              href="mailto:rajeevjoshi91@gmail.com"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm sm:text-base"
            >
              <Mail className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="break-all sm:break-normal">
                rajeevjoshi91@gmail.com
              </span>
            </a>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-4 sm:gap-8 mb-8 sm:mb-10 animate-fade-up opacity-0 delay-400">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-primary">
                9
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">
                Years Experience
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-primary">
                7
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">
                Play Store Apps
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-primary">
                4
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">
                App Store Apps
              </div>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-4 animate-fade-up opacity-0 delay-500 px-2 w-full max-w-sm sm:max-w-none mx-auto">
            <Button
              size="default"
              asChild
              className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 gap-2 text-sm sm:text-base"
            >
              <a href="mailto:rajeevjoshi91@gmail.com">
                <Mail className="w-4 h-4" />
                <span className="hidden xs:inline">Get in Touch</span>
                <span className="xs:hidden">Contact</span>
              </a>
            </Button>
            <Button
              size="default"
              variant="outline"
              asChild
              className="w-full sm:w-auto gap-2 border-border hover:bg-secondary text-sm sm:text-base"
            >
              <a
                href="https://www.linkedin.com/in/rajeev-joshi/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="w-4 h-4" />
                <span className="hidden sm:inline">LinkedIn</span>
                <span className="sm:hidden">LinkedIn</span>
              </a>
            </Button>
            <Button
              size="default"
              variant="outline"
              asChild
              className="w-full sm:w-auto gap-2 border-border hover:bg-secondary text-sm sm:text-base"
            >
              <a
                href="https://github.com/Rajeev02"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-4 h-4" />
                <span className="hidden sm:inline">GitHub</span>
                <span className="sm:hidden">GitHub</span>
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden sm:block">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 rounded-full bg-primary" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
