import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Clock, ArrowLeft, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { fetchTopicContent } from "@/lib/contentParser";
import { TopicContent } from "@/types/content";

export default function TopicViewer() {
  const { categoryId, topicId } = useParams();
  const navigate = useNavigate();
  const { resolvedTheme } = useTheme();
  
  const [data, setData] = useState<TopicContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (categoryId && topicId) {
      setLoading(true);
      fetchTopicContent(categoryId, topicId).then((content) => {
        setData(content);
        setLoading(false);
      });
    }
  }, [categoryId, topicId]);

  if (loading) {
    return <div className="flex justify-center items-center h-64 text-muted-foreground animate-pulse">Loading content...</div>;
  }

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <h2 className="text-2xl font-bold mb-2">Topic Not Found</h2>
        <p className="text-muted-foreground mb-4">The requested preparation topic could not be loaded.</p>
        <Button onClick={() => navigate("/preparation-guide")}>Return to Dashboard</Button>
      </div>
    );
  }

  const { metadata, content } = data;

  return (
    <div className="animate-fade-in pb-20">
      {/* Header with Metadata */}
      <div className="mb-6 pb-6 border-b border-border">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className={`px-2 py-1 text-xs font-semibold rounded-md ${
            metadata.difficulty === 'Beginner' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
            metadata.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
            metadata.difficulty === 'Advanced' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400' :
            'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
          }`}>
            {metadata.difficulty}
          </span>
          <span className="px-2 py-1 text-xs font-medium rounded-md bg-secondary text-secondary-foreground flex items-center gap-1">
            <Clock className="w-3 h-3" /> {metadata.readingTimeMinutes}m Read
          </span>
          <span className="px-2 py-1 text-xs font-medium rounded-md bg-secondary text-secondary-foreground flex items-center gap-1">
            <BarChart className="w-3 h-3" /> {metadata.practiceTimeMinutes}m Practice
          </span>
          <span className="px-2 py-1 text-xs font-medium rounded-md bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
            Freq: {"★".repeat(metadata.interviewFrequency)}{"☆".repeat(5 - metadata.interviewFrequency)}
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-4">{metadata.title}</h1>
        
        <div className="flex gap-2 flex-wrap">
          {metadata.tags.map(tag => (
            <span key={tag} className="text-xs text-muted-foreground border border-border px-2 py-0.5 rounded-full">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Markdown Content Renderer */}
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
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              code: function CodeBlock({node, inline, className, children, ...props}: any) {
                const match = /language-(\w+)/.exec(className || '');
                const isDark = resolvedTheme === "dark" || resolvedTheme === "dim";
                const [copied, setCopied] = useState(false);
                const codeString = String(children).replace(/\n$/, '');

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
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
