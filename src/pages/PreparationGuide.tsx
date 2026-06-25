import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Lock, FileText, Folder, ChevronRight, Menu, X, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const ACCESS_HASH = "cb7926f58653d799fa54fdf0803d1a66434fd0d3a75f61855405d539eb836abf";

// Helper function to hash password
async function sha256(message: string) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  return hashHex;
}

export default function PreparationGuide() {
  const [isLocked, setIsLocked] = useState(true);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [data, setData] = useState<any>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeFile, setActiveFile] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Check session on load
  useEffect(() => {
    const sessionAuth = sessionStorage.getItem("prepAuth");
    if (sessionAuth === "true") {
      setIsLocked(false);
      loadData();
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const hash = await sha256(password);
    if (hash === ACCESS_HASH) {
      sessionStorage.setItem("prepAuth", "true");
      setIsLocked(false);
      setError("");
      loadData();
    } else {
      setError("Incorrect password");
      setPassword("");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("prepAuth");
    setIsLocked(true);
    setData(null);
    setActiveFile(null);
  };

  const loadData = async () => {
    try {
      const response = await fetch("/prepration/embedded_data.js");
      const text = await response.text();
      // Remove 'const embeddedFileData = ' and ';'
      const jsonStr = text.replace("const embeddedFileData =", "").replace(/;\\s*$/, "").trim();
      // It's technically JS object syntax, not strictly JSON in some cases, but the original was generated as JSON.
      // Let's try JSON.parse, if it fails, fallback to eval (since we trust this internal file).
      let parsedData;
      try {
        parsedData = JSON.parse(jsonStr);
      } catch (err) {
        // Fallback since the file is trusted and local
        parsedData = new Function("return " + jsonStr)();
      }
      setData(parsedData);
      const categories = Object.keys(parsedData);
      if (categories.length > 0) {
        setActiveCategory(categories[0]);
      }
    } catch (err) {
      console.error("Failed to load preparation data:", err);
    }
  };

  if (isLocked) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-24 pb-16 flex items-center justify-center min-h-[80vh]">
          <div className="max-w-md w-full mx-4 glass-card p-8 rounded-2xl animate-fade-up">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-primary/10 rounded-full">
                <Lock className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-center mb-2">Preparation Guide</h1>
            <p className="text-muted-foreground text-center mb-8 text-sm">
              Please enter the access code to view the interview preparation materials.
            </p>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter access code"
                  className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  autoFocus
                />
              </div>
              {error && <p className="text-destructive text-sm text-center">{error}</p>}
              <Button type="submit" className="w-full py-6 text-md font-semibold">
                Unlock Access
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  const categories = data ? Object.keys(data) : [];

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
          
          <div className="flex-1 overflow-y-auto p-2">
            {categories.map((category) => (
              <div key={category} className="mb-4">
                <button
                  onClick={() => setActiveCategory(activeCategory === category ? null : category)}
                  className="flex items-center justify-between w-full p-2 text-sm font-medium rounded-lg hover:bg-secondary/50 transition-colors"
                >
                  <span className="truncate">{category}</span>
                  <ChevronRight className={`w-4 h-4 transition-transform ${activeCategory === category ? "rotate-90" : ""}`} />
                </button>
                
                {activeCategory === category && (
                  <div className="mt-1 ml-4 space-y-1 border-l border-border pl-2">
                    {data[category].map((file: any) => (
                      <button
                        key={file.name}
                        onClick={() => {
                          setActiveFile(file);
                          setSidebarOpen(false);
                        }}
                        className={`flex items-center gap-2 w-full p-2 text-xs rounded-md transition-colors text-left ${
                          activeFile?.name === file.name 
                            ? "bg-primary/20 text-primary font-medium" 
                            : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                        }`}
                      >
                        <FileText className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">{file.name.replace(".md", "")}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-border">
            <Button variant="outline" className="w-full justify-center text-sm" onClick={handleLogout}>
              <Lock className="w-4 h-4 mr-2" />
              Lock & Exit
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col h-full overflow-hidden bg-background">
          {/* Topbar for mobile */}
          <div className="md:hidden p-4 border-b border-border flex items-center gap-3 bg-background z-30">
            <Button variant="outline" size="icon" onClick={() => setSidebarOpen(true)}>
              <Menu className="w-5 h-5" />
            </Button>
            <span className="font-medium truncate">{activeFile ? activeFile.name.replace(".md", "") : "Select a topic"}</span>
          </div>

          <div className="flex-1 overflow-y-auto p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
              {!activeFile ? (
                <div className="flex flex-col items-center justify-center h-full min-h-[50vh] text-muted-foreground opacity-70">
                  <FileText className="w-16 h-16 mb-4" />
                  <p className="text-lg">Select a file from the sidebar to view</p>
                </div>
              ) : (
                <div className="animate-fade-in pb-20">
                  <div className="mb-6 pb-4 border-b border-border flex items-center justify-between">
                    <h1 className="text-2xl md:text-3xl font-bold">{activeFile.name.replace(".md", "")}</h1>
                    <Button variant="ghost" size="sm" onClick={() => setActiveFile(null)} className="md:hidden">
                      <ArrowLeft className="w-4 h-4 mr-2" /> Back
                    </Button>
                  </div>
                  <div className="space-y-8">
                    {activeFile.content.split(/\\n(?=##\\s|####\\s)/).map((section: string, index: number) => {
                      if (!section.trim()) return null;
                      // Remove any leading --- that might look weird at the top of a card
                      const cleanedSection = section.replace(/^\\s*---\\s*\\n/, "");
                      return (
                        <div key={index} className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                          <div className="p-6 md:p-8 prose prose-sm md:prose-base dark:prose-invert max-w-none prose-pre:bg-secondary prose-pre:border prose-pre:border-border prose-headings:text-foreground prose-a:text-primary prose-strong:text-foreground prose-h2:mt-0 prose-h4:mt-0 prose-hr:hidden">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                              {cleanedSection}
                            </ReactMarkdown>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
