import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Lock, FileText, Folder, ChevronRight, Menu, X, ArrowLeft, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism';

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
  const { resolvedTheme } = useTheme();
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
                  <div className="mb-6 pb-4 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h1 className="text-2xl md:text-3xl font-bold mb-2">{activeFile.name.replace(".md", "")}</h1>
                      <div className="flex items-center text-sm text-muted-foreground font-medium">
                        <Clock className="w-4 h-4 mr-1.5" />
                        <span>{Math.ceil(activeFile.content.split(/\\s+/).length / 200)} min read</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => setActiveFile(null)} className="md:hidden self-start">
                      <ArrowLeft className="w-4 h-4 mr-2" /> Back
                    </Button>
                  </div>
                  <div className="bg-transparent sm:bg-card border-none sm:border sm:border-border sm:rounded-2xl overflow-hidden sm:shadow-sm">
                    <div 
                      className="p-4 md:p-12 prose prose-sm md:prose-base dark:prose-invert max-w-[760px] mx-auto text-[#292929] dark:text-[#e5e7eb]"
                      style={{ fontFamily: "'Merriweather', Georgia, serif", fontSize: "17px", lineHeight: "1.8", letterSpacing: "-0.01em" }}
                    >
                      <ReactMarkdown 
                        remarkPlugins={[remarkGfm]}
                        components={{
                          h2: ({node, ...props}) => <h2 className="font-sans text-2xl md:text-[24px] font-[800] mt-[36px] mb-[16px] pb-[8px] border-b border-gray-200 dark:border-gray-800 text-black dark:text-white tracking-[-0.02em] leading-[1.3]" {...props} />,
                          h3: ({node, ...props}) => <h3 className="font-sans text-xl md:text-[20px] font-[800] mt-[36px] mb-[16px] text-black dark:text-white tracking-[-0.02em] leading-[1.3]" {...props} />,
                          h4: ({node, ...props}) => <h4 className="font-sans text-lg md:text-[18px] font-[800] mt-[36px] mb-[16px] text-black dark:text-white tracking-[-0.02em] leading-[1.3]" {...props} />,
                          hr: ({node, ...props}) => <hr className="my-16 border-t-[3px] border-gray-200 dark:border-gray-800 rounded-full" {...props} />,
                          blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-[#1a8917] dark:border-[#a855f7] pl-4 py-2 my-6 text-gray-700 dark:text-gray-300 italic bg-gray-50 dark:bg-gray-800/50 rounded-r-lg font-sans text-[15px]" {...props} />,
                          a: ({node, ...props}) => <a className="text-[#1a8917] dark:text-[#c084fc] hover:underline font-semibold" {...props} />,
                          p: ({node, ...props}) => <p className="mb-[24px]" {...props} />,
                          code: function CodeBlock({node, inline, className, children, ...props}: any) {
                            const match = /language-(\w+)/.exec(className || '');
                            const isDark = resolvedTheme === "dark" || resolvedTheme === "dim";
                            const [copied, setCopied] = useState(false);
                            const codeString = String(children).replace(/\\n$/, '');

                            const handleCopy = () => {
                              navigator.clipboard.writeText(codeString);
                              setCopied(true);
                              setTimeout(() => setCopied(false), 2000);
                            };
                            
                            return !inline && match ? (
                              <div className={`relative group my-8 rounded-lg overflow-hidden border ${isDark ? 'border-[#1f2937] bg-[#030712]' : 'border-gray-200 bg-[#f5f5f5]'}`}>
                                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                  <Button 
                                    size="sm" 
                                    variant="ghost" 
                                    className={`h-8 px-3 text-xs font-sans rounded-md border ${isDark ? 'bg-[#1f2937] hover:bg-[#374151] border-[#374151] text-gray-300' : 'bg-white hover:bg-gray-100 border-gray-300 text-gray-600'} shadow-sm transition-all`}
                                    onClick={handleCopy}
                                  >
                                    {copied ? (
                                      <span className="flex items-center text-green-500">
                                        <span className="mr-1">✓</span> Copied!
                                      </span>
                                    ) : 'Copy'}
                                  </Button>
                                </div>
                                <SyntaxHighlighter
                                  style={(isDark ? vscDarkPlus : vs) as any}
                                  language={match[1]}
                                  PreTag="div"
                                  customStyle={{ margin: 0, padding: '20px', background: 'transparent', fontFamily: "'JetBrains Mono', SFMono-Regular, Consolas, monospace", fontSize: '13px', lineHeight: '1.5' }}
                                  {...props}
                                >
                                  {codeString}
                                </SyntaxHighlighter>
                              </div>
                            ) : (
                              <code 
                                className={`px-[6px] py-[3px] rounded-[4px] font-mono text-[14px] break-words ${isDark ? 'bg-[#030712] text-[#f472b6]' : 'bg-[#f2f2f2] text-[#c53030]'}`} 
                                style={{ fontFamily: "'JetBrains Mono', SFMono-Regular, Consolas, monospace" }}
                                {...props}
                              >
                                {children}
                              </code>
                            );
                          }
                        }}
                      >
                        {activeFile.content}
                      </ReactMarkdown>
                    </div>
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
