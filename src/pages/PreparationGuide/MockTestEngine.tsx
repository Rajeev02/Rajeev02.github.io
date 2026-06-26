import { useState } from "react";
import { Clock, Play, CheckCircle, Lock, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MockTest {
  id: number;
  title: string;
  description: string;
  durationMinutes: number;
  completed: boolean;
  score: number | null;
  locked: boolean;
}

const mockTestsData: MockTest[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  title: `Assessment Set ${i + 1}`,
  description: i === 0 
    ? "Core JS, React Native basics, Array DSA, and basic Testing." 
    : "Advanced Architecture, Threading, Graph DSA, and E2E Testing.",
  durationMinutes: 60,
  completed: false,
  score: null,
  locked: false, // Unlock all tests
}));

export default function MockTestEngine() {
  const [tests, setTests] = useState<MockTest[]>(mockTestsData);
  const [activeTest, setActiveTest] = useState<MockTest | null>(null);

  if (activeTest) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fade-in">
        <div className="text-center max-w-lg p-8 border border-border rounded-2xl bg-card shadow-sm">
          <Play className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">{activeTest.title} (Active)</h2>
          <p className="text-muted-foreground mb-6">
            The mock test is currently active. Ensure you have a quiet environment for the next {activeTest.durationMinutes} minutes.
          </p>
          <div className="text-4xl font-mono font-bold text-primary mb-8 border border-primary/20 bg-primary/5 p-4 rounded-xl">
            {activeTest.durationMinutes}:00
          </div>
          <Button variant="destructive" onClick={() => setActiveTest(null)} className="w-full">
            End Test Early
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in pb-12">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">1-Hour Mock Assessments</h1>
        <p className="text-muted-foreground text-lg">
          10 comprehensive tests simulating real-world interview loops (Theory, Coding, Behavioural).
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tests.map((test) => (
          <div 
            key={test.id} 
            className={`border rounded-2xl p-6 transition-all ${
              test.locked 
                ? "bg-secondary/20 border-border opacity-70" 
                : "bg-card border-border shadow-sm hover:border-primary/50 hover:shadow-md"
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 rounded-lg ${test.locked ? "bg-muted text-muted-foreground" : "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"}`}>
                {test.locked ? <Lock className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
              </div>
              <div className="flex items-center gap-1 text-xs font-semibold text-muted-foreground bg-secondary px-2 py-1 rounded-md">
                <Clock className="w-3 h-3" />
                {test.durationMinutes}m
              </div>
            </div>
            
            <h3 className="text-xl font-bold mb-2">{test.title}</h3>
            <p className="text-sm text-muted-foreground mb-6 line-clamp-2">
              {test.description}
            </p>

            <Button 
              className="w-full" 
              variant={test.locked ? "secondary" : "default"}
              disabled={test.locked}
              onClick={() => setActiveTest(test)}
            >
              {test.locked ? "Locked" : "Start Assessment"}
              {!test.locked && <Play className="w-4 h-4 ml-2" />}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
