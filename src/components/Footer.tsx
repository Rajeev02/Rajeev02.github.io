const Footer = () => {
  return (
    <footer className="py-6 sm:py-8 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <p className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
            © {new Date().getFullYear()} Rajeev Kumar Joshi. All rights reserved.
          </p>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Built with <span className="text-primary">♥</span> in Bengaluru
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
