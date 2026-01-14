import { Mail, Phone, MapPin, Linkedin, Github, Twitter, Facebook, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const ContactSection = () => {
  return (
    <section id="contact" className="py-16 sm:py-20 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="section-heading mb-3 sm:mb-4">
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <p className="section-subheading mx-auto mb-8 sm:mb-12 px-2">
            Interested in discussing opportunities or collaborations? I'd love to hear from you.
          </p>
          
          <div className="glass-card p-5 sm:p-8 md:p-12">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10">
              <a 
                href="mailto:rajeevjoshi91@gmail.com"
                className="flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-secondary/50 transition-colors group"
              >
                <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                  <Mail className="w-6 h-6" />
                </div>
                <div className="text-center">
                  <p className="font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">rajeevjoshi91@gmail.com</p>
                </div>
              </a>
              
              <a 
                href="tel:+918792169096"
                className="flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-secondary/50 transition-colors group"
              >
                <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                  <Phone className="w-6 h-6" />
                </div>
                <div className="text-center">
                  <p className="font-medium">Phone</p>
                  <p className="text-sm text-muted-foreground">+91 8792169096</p>
                </div>
              </a>
              
              <div className="flex flex-col items-center gap-3 p-4 rounded-xl">
                <div className="p-3 rounded-xl bg-primary/10 text-primary">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="text-center">
                  <p className="font-medium">Location</p>
                  <p className="text-sm text-muted-foreground">Bengaluru, India</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-4">
              <Button size="default" asChild className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 text-sm sm:text-base">
                <a href="mailto:rajeevjoshi91@gmail.com">
                  <Mail className="w-4 h-4" />
                  <span className="hidden xs:inline">Send Email</span>
                  <span className="xs:hidden">Email</span>
                </a>
              </Button>
              <Button size="default" variant="outline" asChild className="gap-2 border-border hover:bg-secondary text-sm sm:text-base">
                <a href="https://www.linkedin.com/in/rajeev-joshi/" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-4 h-4" />
                  <span className="hidden sm:inline">LinkedIn</span>
                </a>
              </Button>
              <Button size="default" variant="outline" asChild className="gap-2 border-border hover:bg-secondary text-sm sm:text-base">
                <a href="https://github.com/Rajeev02" target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4" />
                  <span className="hidden sm:inline">GitHub</span>
                </a>
              </Button>
              <Button size="default" variant="outline" asChild className="gap-2 border-border hover:bg-secondary text-sm sm:text-base">
                <a href="https://x.com/Rajeev_Joshi91" target="_blank" rel="noopener noreferrer">
                  <Twitter className="w-4 h-4" />
                  <span className="hidden sm:inline">X</span>
                </a>
              </Button>
              <Button size="default" variant="outline" asChild className="gap-2 border-border hover:bg-secondary text-sm sm:text-base hidden md:inline-flex">
                <a href="https://www.facebook.com/RajeevJoshi05" target="_blank" rel="noopener noreferrer">
                  <Facebook className="w-4 h-4" />
                  <span className="hidden lg:inline">Facebook</span>
                </a>
              </Button>
              <Button size="default" variant="outline" asChild className="gap-2 border-border hover:bg-secondary text-sm sm:text-base">
                <a href="https://rajeev02.github.io" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4" />
                  <span className="hidden sm:inline">Portfolio</span>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
