import { useState, useEffect } from "react";
import { Clock, Play, CheckCircle, Lock, ArrowRight, ArrowLeft, CheckCircle2, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockTestsData, MockTest } from "../../data/mockTests";

export default function MockTestEngine() {
  const [tests, setTests] = useState<MockTest[]>(mockTestsData);
  const [activeTest, setActiveTest] = useState<MockTest | null>(null);
  
  // Test State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [evaluatedAnswers, setEvaluatedAnswers] = useState<Record<number, boolean>>({});
  const [isAutoAdvancing, setIsAutoAdvancing] = useState(false);
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
    setEvaluatedAnswers({});
    setIsAutoAdvancing(false);
    setIsSubmitted(false);
    setTimeLeft(test.durationMinutes * 60);
  };

  const handleSelectAnswer = (optionIndex: number) => {
    if (evaluatedAnswers[currentQuestionIndex]) return; // Prevent changing answer if evaluated
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: optionIndex
    }));
  };

  const handleNext = () => {
    if (selectedAnswers[currentQuestionIndex] === undefined) return;
    
    if (!evaluatedAnswers[currentQuestionIndex]) {
      setEvaluatedAnswers(prev => ({ ...prev, [currentQuestionIndex]: true }));
      setIsAutoAdvancing(true);
      setTimeout(() => {
        setIsAutoAdvancing(false);
        setCurrentQuestionIndex(prev => prev + 1);
      }, 3000);
    }
  };

  const handleFinishNext = () => {
    if (selectedAnswers[currentQuestionIndex] === undefined) return;
    
    if (!evaluatedAnswers[currentQuestionIndex]) {
      setEvaluatedAnswers(prev => ({ ...prev, [currentQuestionIndex]: true }));
      setIsAutoAdvancing(true);
      setTimeout(() => {
        setIsAutoAdvancing(false);
        finishTest();
      }, 3000);
    }
  };

  const calculateScore = () => {
    if (!activeTest) return 0;
    let score = 0;
    activeTest.questions.forEach((q, index) => {
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
    const questions = activeTest.questions;
    
    if (isSubmitted) {
      const score = calculateScore();
      const percentage = (score / questions.length) * 100;
      
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fade-in">
          <div className="text-center max-w-lg w-full p-8 border border-border rounded-2xl bg-card shadow-sm">
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-2">Test Completed!</h2>
            <p className="text-muted-foreground mb-6">You have successfully submitted {activeTest.title}.</p>
            
            <div className="bg-secondary/50 p-6 rounded-xl mb-8 border border-border">
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Your Score</p>
              <div className="text-5xl font-bold text-primary mb-2">
                {score} <span className="text-2xl text-muted-foreground">/ {questions.length}</span>
              </div>
              <p className="text-lg font-medium">({percentage.toFixed(0)}%)</p>
            </div>
            
            <div className="flex gap-4 w-full">
              <Button onClick={() => setActiveTest(null)} className="flex-1" variant="outline" size="lg">
                Return
              </Button>
              <Button onClick={() => handleStartTest(activeTest)} className="flex-1" size="lg">
                Retry <RotateCcw className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      );
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
      <div className="max-w-4xl mx-auto min-h-[70vh] flex flex-col animate-fade-in pb-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 pb-6 border-b border-border">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-md ${
                currentQuestion.type === 'Coding' 
                  ? 'bg-blue-500/10 text-blue-500' 
                  : 'bg-primary/10 text-primary'
              }`}>
                {currentQuestion.type || "Theory"}
              </span>
              <p className="text-muted-foreground text-sm font-medium">Question {currentQuestionIndex + 1} of {questions.length}</p>
            </div>
            <h2 className="text-2xl font-bold">{activeTest.title}</h2>
          </div>
          <div className="mt-4 sm:mt-0 flex flex-col items-end">
            <div className="flex items-center gap-2 bg-secondary/50 px-4 py-2 rounded-lg border border-border">
              <Clock className="w-5 h-5 text-primary" />
              <span className={`font-mono text-xl font-bold ${timeLeft < 300 ? 'text-destructive' : ''}`}>
                {formatTime(timeLeft)}
              </span>
            </div>
            <span className="text-xs text-muted-foreground mt-2">
              {currentQuestion.timeMinutes} mins allotted for this question
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
              const isEvaluated = evaluatedAnswers[currentQuestionIndex] || false;
              const isSelected = selectedAnswers[currentQuestionIndex] === idx;
              const isCorrectOption = idx === currentQuestion.correctAnswer;
              
              let buttonStyle = "border-border hover:border-primary/50 bg-card hover:bg-secondary/20";
              let dotStyle = "border-muted-foreground";
              
              if (isEvaluated) {
                if (isCorrectOption) {
                  buttonStyle = "border-green-500 bg-green-500/10 shadow-sm";
                  dotStyle = "border-green-500";
                } else if (isSelected) {
                  buttonStyle = "border-destructive bg-destructive/10 shadow-sm";
                  dotStyle = "border-destructive";
                } else {
                  buttonStyle = "border-border bg-card opacity-50 cursor-not-allowed";
                }
              } else if (isSelected) {
                buttonStyle = "border-primary bg-primary/5 shadow-sm";
                dotStyle = "border-primary";
              }

              return (
                <button
                  key={idx}
                  disabled={isEvaluated}
                  onClick={() => handleSelectAnswer(idx)}
                  className={`w-full text-left p-5 rounded-xl border-2 transition-all ${buttonStyle}`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 mt-0.5 flex items-center justify-center ${dotStyle}`}>
                      {isSelected && !isEvaluated && <div className="w-3 h-3 rounded-full bg-primary" />}
                      {isEvaluated && isCorrectOption && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                      {isEvaluated && isSelected && !isCorrectOption && <div className="w-3 h-3 rounded-full bg-destructive" />}
                    </div>
                    <span className={`text-base leading-relaxed ${isSelected || (isEvaluated && isCorrectOption) ? "font-medium" : ""}`}>
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
            disabled={currentQuestionIndex === 0 || isAutoAdvancing || evaluatedAnswers[currentQuestionIndex]}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Previous
          </Button>

          <div className="flex items-center gap-4">
            <Button variant="ghost" className="text-muted-foreground hover:text-destructive" onClick={() => setActiveTest(null)}>
              Cancel Test
            </Button>

            {currentQuestionIndex === questions.length - 1 ? (
              <Button 
                onClick={handleFinishNext} 
                disabled={selectedAnswers[currentQuestionIndex] === undefined || isAutoAdvancing}
                className="flex items-center gap-2"
              >
                {isAutoAdvancing ? 'Finishing...' : 'Submit Test'} <CheckCircle className="w-4 h-4" />
              </Button>
            ) : (
              <Button 
                onClick={handleNext}
                disabled={selectedAnswers[currentQuestionIndex] === undefined || isAutoAdvancing}
                className="flex items-center gap-2"
              >
                {isAutoAdvancing ? 'Evaluating...' : 'Check & Next'} <ArrowRight className="w-4 h-4" />
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
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Timed Mock Assessments</h1>
        <p className="text-muted-foreground text-lg">
          {tests.length} comprehensive tests simulating real-world interview loops (Theory, Coding, Behavioural).
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
              <div className="mt-auto space-y-3">
                <div className="w-full flex items-center justify-between p-3 bg-card border border-border rounded-lg">
                  <span className="text-sm font-medium">Score</span>
                  <span className="font-bold text-primary">{test.score} / {test.questions.length}</span>
                </div>
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={() => handleStartTest(test)}
                >
                  Retry Assessment <RotateCcw className="w-4 h-4 ml-2" />
                </Button>
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
