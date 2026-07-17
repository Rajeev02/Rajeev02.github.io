import { useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { fetchCategories } from "@/lib/contentParser";
import { CategoryIndex } from "@/types/content";
import { Button } from "@/components/ui/button";
import { ChevronRight, Folder, FileText, Menu, X } from "lucide-react";

export default function Layout() {
  const [categories, setCategories] = useState<CategoryIndex[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  const location = useLocation();

  useEffect(() => {
    fetchCategories().then(setCategories);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      <div className="pt-[56px] sm:pt-[64px] flex-1 flex overflow-hidden h-[calc(100vh)]">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div className={`
          fixed md:static inset-y-0 left-0 z-50 w-72 bg-secondary/30 border-r border-border
          transform transition-transform duration-300 ease-in-out pt-[56px] md:pt-0
          flex flex-col h-full
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}>
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h2 className="font-semibold text-lg flex items-center gap-2">
              <Folder className="w-5 h-5 text-primary" />
              Topics
            </h2>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSidebarOpen(false)}>
              <X className="w-5 h-5" />
            </Button>
          </div>
          
          <div className="p-4 border-b border-border space-y-2">
            <Link to="/preparation-guide">
              <Button variant={location.pathname === "/preparation-guide" ? "secondary" : "ghost"} className="w-full justify-start">
                Dashboard
              </Button>
            </Link>
            <Link to="/preparation-guide/mock-test">
              <Button variant={location.pathname === "/preparation-guide/mock-test" ? "secondary" : "ghost"} className="w-full justify-start text-purple-500 hover:text-purple-600">
                Mock Tests (1-Hour)
              </Button>
            </Link>
          </div>

          <div className="flex-1 overflow-y-auto p-2">
            {categories.map((category) => (
              <div key={category.id} className="mb-4">
                <button
                  onClick={() => setActiveCategory(activeCategory === category.id ? null : category.id)}
                  className="flex items-center justify-between w-full p-2 text-sm font-medium rounded-lg hover:bg-secondary/50 transition-colors"
                >
                  <span className="truncate">{category.title}</span>
                  <ChevronRight className={`w-4 h-4 transition-transform ${activeCategory === category.id ? "rotate-90" : ""}`} />
                </button>
                
                {activeCategory === category.id && (
                  <div className="mt-1 ml-4 space-y-1 border-l border-border pl-2">
                    {category.topics.map((topic) => {
                      const isActive = location.pathname.includes(`/topic/${category.id}/${topic.id}`);
                      return (
                        <Link
                          key={topic.id}
                          to={`/preparation-guide/topic/${category.id}/${topic.id}`}
                          onClick={() => setSidebarOpen(false)}
                          className={`flex items-center gap-2 w-full p-2 text-xs rounded-md transition-colors text-left ${
                            isActive 
                              ? "bg-primary/20 text-primary font-medium" 
                              : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                          }`}
                        >
                          <FileText className="w-3 h-3 flex-shrink-0" />
                          <span className="truncate">{topic.title}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col h-full overflow-hidden bg-background">
          <div className="md:hidden p-4 border-b border-border flex items-center gap-3 bg-background z-30">
            <Button variant="outline" size="icon" onClick={() => setSidebarOpen(true)}>
              <Menu className="w-5 h-5" />
            </Button>
            <span className="font-medium truncate">Menu</span>
          </div>

          <div className="flex-1 overflow-y-auto p-4 md:p-8">
            <div className="max-w-4xl mx-auto pb-20">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
