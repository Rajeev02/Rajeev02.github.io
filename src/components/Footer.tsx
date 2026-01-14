import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

const Footer = () => {
  const [pageViews, setPageViews] = useState<number | null>(null);

  useEffect(() => {
    // Using CountAPI for page view tracking
    const namespace = "rajeev02-github-io";
    const key = "portfolio-visits";
    
    fetch(`https://api.countapi.xyz/hit/${namespace}/${key}`)
      .then(res => res.json())
      .then(data => {
        setPageViews(data.value);
      })
      .catch(() => {
        // Fallback if CountAPI fails
        setPageViews(null);
      });
  }, []);

  return (
    <footer className="py-6 sm:py-8 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <p className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
            © {new Date().getFullYear()} Rajeev Kumar Joshi. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {pageViews !== null && (
              <div className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground">
                <Eye className="w-3.5 h-3.5" />
                <span>{pageViews.toLocaleString()} views</span>
              </div>
            )}
            <p className="text-xs sm:text-sm text-muted-foreground">
              Built with <span className="text-primary">♥</span> in Bengaluru
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
