import { useState, useEffect } from "react";
import { Clock, Play, CheckCircle, Lock, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
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
  locked: false,
}));

// Sample questions to simulate a real test
const sampleQuestions = [
  {
    id: 1,
    text: "What is the primary advantage of the New Architecture (JSI) in React Native?",
    options: [
      "It allows for synchronous communication between JS and Native without JSON serialization.",
      "It completely removes the need for Native Modules.",
      "It automatically converts JavaScript code into native Swift/Kotlin code.",
      "It runs JavaScript on the main UI thread."
    ],
    correctAnswer: 0,
  },
  {
    id: 2,
    text: "Which of the following is true about Hermes in React Native?",
    options: [
      "It is a UI rendering engine that replaces Yoga.",
      "It is an open-source JavaScript engine optimized for React Native.",
      "It is a state management library like Redux.",
      "It is a testing framework for end-to-end testing."
    ],
    correctAnswer: 1,
  },
  {
    id: 3,
    text: "In React Native, how do you prevent a heavy JavaScript computation from dropping UI frames?",
    options: [
      "Use `InteractionManager.runAfterInteractions` or offload to a native thread/Web Worker.",
      "Increase the thread priority using `Thread.setPriority(High)`.",
      "Wrap the computation in a `useEffect` with an empty dependency array.",
      "Wrap the entire component in `React.memo`."
    ],
    correctAnswer: 0,
  },
  {
    id: 4,
    text: "What is the purpose of `useNativeDriver: true` in the Animated API?",
    options: [
      "It automatically generates native Swift/Kotlin animation code.",
      "It sends the entire animation graph to the native UI thread once, preventing frame drops if the JS thread blocks.",
      "It forces the animation to run at 120 FPS on supported devices.",
      "It disables JavaScript entirely during the animation."
    ],
    correctAnswer: 1,
  },
  {
    id: 5,
    text: "How does Fabric improve the rendering pipeline in the New Architecture?",
    options: [
      "It replaces JavaScript with WebAssembly for faster execution.",
      "It uses a virtual DOM that runs exclusively on a background thread.",
      "It allows UI creation and layout to happen synchronously, preventing layout jumps and 'white flashes'.",
      "It pre-compiles all React components into static HTML."
    ],
    correctAnswer: 2,
  }
];

export default function MockTestEngine() {
  const [tests, setTests] = useState<MockTest[]>(mockTestsData);
  const [activeTest, setActiveTest] = useState<MockTest | null>(null);
  
  // Test State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  // Timer logic
  useEffect(() => {
    if (activeTest && !isSubmitted && timeLeft > 0) {
      const timerId = setTimeout(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    } else if (timeLeft === 0 && activeTest && !isSubmitted) {
      setIsSubmitted(true); // Auto submit when time runs out
    }
  }, [timeLeft, activeTest, isSubmitted]);

  const handleStartTest = (test: MockTest) => {
    setActiveTest(test);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setIsSubmitted(false);
    setTimeLeft(test.durationMinutes * 60);
  };

  const handleSelectAnswer = (optionIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: optionIndex
    }));
  };

  const calculateScore = () => {
    let score = 0;
    sampleQuestions.forEach((q, index) => {
      if (selectedAnswers[index] === q.correctAnswer) {
        score += 1;
      }
    });
    return score;
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const finishTest = () => {
    setIsSubmitted(true);
    // Mark test as completed in the list
    if (activeTest) {
      const score = calculateScore();
      setTests(tests.map(t => t.id === activeTest.id ? { ...t, completed: true, score } : t));
    }
  };

  if (activeTest) {
    if (isSubmitted) {
      const score = calculateScore();
      const percentage = (score / sampleQuestions.length) * 100;
      
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fade-in">
          <div className="text-center max-w-lg w-full p-8 border border-border rounded-2xl bg-card shadow-sm">
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-2">Test Completed!</h2>
            <p className="text-muted-foreground mb-6">You have successfully submitted {activeTest.title}.</p>
            
            <div className="bg-secondary/50 p-6 rounded-xl mb-8 border border-border">
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Your Score</p>
              <div className="text-5xl font-bold text-primary mb-2">
                {score} <span className="text-2xl text-muted-foreground">/ {sampleQuestions.length}</span>
              </div>
              <p className="text-lg font-medium">({percentage.toFixed(0)}%)</p>
            </div>
            
            <Button onClick={() => setActiveTest(null)} className="w-full" size="lg">
              Return to Assessments
            </Button>
          </div>
        </div>
      );
    }

    const currentQuestion = sampleQuestions[currentQuestionIndex];

    return (
      <div className="max-w-4xl mx-auto min-h-[70vh] flex flex-col animate-fade-in pb-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 pb-6 border-b border-border">
          <div>
            <h2 className="text-2xl font-bold">{activeTest.title}</h2>
            <p className="text-muted-foreground text-sm">Question {currentQuestionIndex + 1} of {sampleQuestions.length}</p>
          </div>
          <div className="mt-4 sm:mt-0 flex items-center gap-2 bg-secondary/50 px-4 py-2 rounded-lg border border-border">
            <Clock className="w-5 h-5 text-primary" />
            <span className={`font-mono text-xl font-bold ${timeLeft < 300 ? 'text-destructive' : ''}`}>
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>

        {/* Question Area */}
        <div className="flex-1">
          <h3 className="text-xl md:text-2xl font-medium leading-relaxed mb-8">
            {currentQuestion.text}
          </h3>

          <div className="space-y-4">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = selectedAnswers[currentQuestionIndex] === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelectAnswer(idx)}
                  className={`w-full text-left p-5 rounded-xl border-2 transition-all ${
                    isSelected 
                      ? "border-primary bg-primary/5 shadow-sm" 
                      : "border-border hover:border-primary/50 bg-card hover:bg-secondary/20"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 mt-0.5 flex items-center justify-center ${
                      isSelected ? "border-primary" : "border-muted-foreground"
                    }`}>
                      {isSelected && <div className="w-3 h-3 rounded-full bg-primary" />}
                    </div>
                    <span className={`text-base leading-relaxed ${isSelected ? "font-medium" : ""}`}>
                      {option}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="mt-12 flex items-center justify-between pt-6 border-t border-border">
          <Button 
            variant="outline" 
            onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
            disabled={currentQuestionIndex === 0}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Previous
          </Button>

          <div className="flex items-center gap-4">
            <Button variant="ghost" className="text-muted-foreground hover:text-destructive" onClick={() => setActiveTest(null)}>
              Cancel Test
            </Button>

            {currentQuestionIndex === sampleQuestions.length - 1 ? (
              <Button onClick={finishTest} className="flex items-center gap-2">
                Submit Test <CheckCircle className="w-4 h-4" />
              </Button>
            ) : (
              <Button 
                onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                className="flex items-center gap-2"
              >
                Next <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>
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
            className={`border rounded-2xl p-6 transition-all flex flex-col ${
              test.locked 
                ? "bg-secondary/20 border-border opacity-70" 
                : test.completed
                  ? "bg-primary/5 border-primary/20"
                  : "bg-card border-border shadow-sm hover:border-primary/50 hover:shadow-md"
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 rounded-lg ${
                test.locked 
                  ? "bg-muted text-muted-foreground" 
                  : test.completed
                    ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
              }`}>
                {test.locked ? <Lock className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
              </div>
              <div className="flex items-center gap-1 text-xs font-semibold text-muted-foreground bg-secondary px-2 py-1 rounded-md">
                <Clock className="w-3 h-3" />
                {test.durationMinutes}m
              </div>
            </div>
            
            <h3 className="text-xl font-bold mb-2">{test.title}</h3>
            <p className="text-sm text-muted-foreground mb-6 line-clamp-2 flex-1">
              {test.description}
            </p>

            {test.completed && test.score !== null ? (
              <div className="w-full flex items-center justify-between p-3 bg-card border border-border rounded-lg mt-auto">
                <span className="text-sm font-medium">Score</span>
                <span className="font-bold text-primary">{test.score} / {sampleQuestions.length}</span>
              </div>
            ) : (
              <Button 
                className="w-full mt-auto" 
                variant={test.locked ? "secondary" : "default"}
                disabled={test.locked}
                onClick={() => handleStartTest(test)}
              >
                {test.locked ? "Locked" : "Start Assessment"}
                {!test.locked && <Play className="w-4 h-4 ml-2" />}
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
