import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchCategories } from "@/lib/contentParser";
import { CategoryIndex } from "@/types/content";
import { BookOpen, Code, Clock, Zap, Target, BookMarked, Trophy } from "lucide-react";

export default function Dashboard() {
  const [categories, setCategories] = useState<CategoryIndex[]>([]);
  const [stats, setStats] = useState({
    totalTopics: 0,
    totalReadingTime: 0,
    totalPracticeTime: 0,
  });

  useEffect(() => {
    fetchCategories().then((cats) => {
      setCategories(cats);
      
      let topics = 0;
      let reading = 0;
      let practice = 0;
      
      cats.forEach(cat => {
        topics += cat.topics.length;
        cat.topics.forEach(t => {
          reading += t.readingTimeMinutes;
          practice += t.practiceTimeMinutes;
        });
      });
      
      setStats({
        totalTopics: topics,
        totalReadingTime: reading,
        totalPracticeTime: practice,
      });
    });
  }, []);

  return (
    <div className="animate-fade-in pb-12">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome Back, Engineer 🚀</h1>
        <p className="text-muted-foreground text-lg">Your ultimate preparation hub for cracking top-tier interviews.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <div className="bg-card border border-border p-5 rounded-2xl shadow-sm flex flex-col">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 rounded-lg">
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="font-semibold text-muted-foreground text-sm">Total Topics</span>
          </div>
          <span className="text-3xl font-bold">{stats.totalTopics}</span>
        </div>
        
        <div className="bg-card border border-border p-5 rounded-2xl shadow-sm flex flex-col">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 rounded-lg">
              <Clock className="w-5 h-5" />
            </div>
            <span className="font-semibold text-muted-foreground text-sm">Est. Reading Time</span>
          </div>
          <span className="text-3xl font-bold">{Math.round(stats.totalReadingTime / 60)}h {stats.totalReadingTime % 60}m</span>
        </div>

        <div className="bg-card border border-border p-5 rounded-2xl shadow-sm flex flex-col">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 rounded-lg">
              <Code className="w-5 h-5" />
            </div>
            <span className="font-semibold text-muted-foreground text-sm">Est. Practice Time</span>
          </div>
          <span className="text-3xl font-bold">{Math.round(stats.totalPracticeTime / 60)}h {stats.totalPracticeTime % 60}m</span>
        </div>

        <div className="bg-card border border-border p-5 rounded-2xl shadow-sm flex flex-col">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400 rounded-lg">
              <Zap className="w-5 h-5" />
            </div>
            <span className="font-semibold text-muted-foreground text-sm">Readiness Score</span>
          </div>
          <span className="text-3xl font-bold">0%</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Learning Modules
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categories.map(cat => (
                <Link key={cat.id} to={cat.topics.length > 0 ? `/preparation-guide/topic/${cat.id}/${cat.topics[0].id}` : "#"} 
                      className="block p-4 border border-border rounded-xl hover:border-primary hover:bg-secondary/50 transition-colors">
                  <h3 className="font-semibold mb-1">{cat.title}</h3>
                  <p className="text-xs text-muted-foreground mb-3">{cat.description}</p>
                  <div className="flex items-center justify-between text-xs font-medium">
                    <span className="text-primary">{cat.topics.length} Topics</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              Next Milestones
            </h2>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center shrink-0">1</div>
                <div>
                  <h4 className="font-medium text-sm">Complete Core JavaScript</h4>
                  <p className="text-xs text-muted-foreground">Master Closures and Scope</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center shrink-0">2</div>
                <div>
                  <h4 className="font-medium text-sm">Take a Mock Test</h4>
                  <p className="text-xs text-muted-foreground">Evaluate your 1-hour performance</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-primary/10 to-purple-500/10 border border-primary/20 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
              <BookMarked className="w-5 h-5 text-primary" />
              Jump Back In
            </h2>
            <p className="text-sm text-muted-foreground mb-4">Pick up exactly where you left off.</p>
            <Link to="/preparation-guide/topic/javascript/closures" className="inline-block w-full text-center bg-primary text-primary-foreground py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors">
              Continue Learning
            </Link>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm mt-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-500" />
              External Resources
            </h2>
            <div className="space-y-3">
              <a href="https://rajeev02.github.io/#/preparation-guide/" target="_blank" rel="noreferrer" className="block p-3 border border-border rounded-xl hover:border-primary hover:bg-secondary/50 transition-colors text-sm font-medium">
                Preparation Guide App
              </a>
              <a href="https://rajeev02.github.io/prepration/" target="_blank" rel="noreferrer" className="block p-3 border border-border rounded-xl hover:border-primary hover:bg-secondary/50 transition-colors text-sm font-medium">
                Preparation Guide (Legacy Static)
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
