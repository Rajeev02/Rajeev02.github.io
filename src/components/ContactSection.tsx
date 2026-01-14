import { Mail, Phone, MapPin, ExternalLink, Linkedin, Github, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";

// Social links with Lucide icons and brand colors
const socialLinks = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/rajeev-joshi/",
    icon: Linkedin,
    color: "text-[#0A66C2]"
  },
  {
    name: "GitHub",
    url: "https://github.com/Rajeev02",
    icon: Github,
    color: "text-foreground"
  },
  {
    name: "X",
    url: "https://x.com/Rajeev_Joshi91",
    iconImage: "/images/social/x.png"
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/RajeevJoshi05",
    icon: Facebook,
    color: "text-[#1877F2]"
  }
];

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
          
          <div className="glass-card p-4 sm:p-8 md:p-12">
            {/* Contact Info Grid - Responsive */}
            <div className="grid grid-cols-1 xs:grid-cols-3 gap-3 sm:gap-6 mb-6 sm:mb-10">
              <a 
                href="mailto:rajeevjoshi91@gmail.com"
                className="flex flex-row xs:flex-col items-center gap-3 p-3 sm:p-4 rounded-xl hover:bg-secondary/50 transition-colors group"
              >
                <div className="p-2.5 sm:p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="text-left xs:text-center">
                  <p className="font-medium text-sm sm:text-base">Email</p>
                  <p className="text-xs sm:text-sm text-muted-foreground break-all xs:break-normal">rajeevjoshi91@gmail.com</p>
                </div>
              </a>
              
              <a 
                href="tel:+918792169096"
                className="flex flex-row xs:flex-col items-center gap-3 p-3 sm:p-4 rounded-xl hover:bg-secondary/50 transition-colors group"
              >
                <div className="p-2.5 sm:p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="text-left xs:text-center">
                  <p className="font-medium text-sm sm:text-base">Phone</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">+91 8792169096</p>
                </div>
              </a>
              
              <div className="flex flex-row xs:flex-col items-center gap-3 p-3 sm:p-4 rounded-xl">
                <div className="p-2.5 sm:p-3 rounded-xl bg-primary/10 text-primary">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="text-left xs:text-center">
                  <p className="font-medium text-sm sm:text-base">Location</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Bengaluru, India</p>
                </div>
              </div>
            </div>
            
            {/* Social Icons - Lucide Icons with Brand Colors */}
            <div className="flex items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 sm:p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors group"
                  title={social.name}
                >
                  {social.icon ? (
                    <social.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${social.color}`} />
                  ) : (
                    <img 
                      src={social.iconImage} 
                      alt={social.name}
                      className="w-5 h-5 sm:w-6 sm:h-6 object-contain dark:invert"
                    />
                  )}
                </a>
              ))}
            </div>

            {/* Action Buttons - Mobile Responsive */}
            <div className="flex flex-col xs:flex-row items-center justify-center gap-2 sm:gap-3">
              <Button size="default" asChild className="w-full xs:w-auto bg-primary text-primary-foreground hover:bg-primary/90 gap-2 text-sm sm:text-base">
                <a href="mailto:rajeevjoshi91@gmail.com">
                  <Mail className="w-4 h-4" />
                  Send Email
                </a>
              </Button>
              <Button size="default" variant="outline" asChild className="w-full xs:w-auto gap-2 border-border hover:bg-secondary text-sm sm:text-base">
                <a href="https://rajeev02.github.io" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4" />
                  View Portfolio
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
