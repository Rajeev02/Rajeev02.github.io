import { useState, useEffect } from "react";

interface UserProgress {
  completedTopics: string[];
  bookmarkedTopics: string[];
  mockTestScores: Record<number, number>; // testId -> score
  lastVisited: string | null;
}

const DEFAULT_PROGRESS: UserProgress = {
  completedTopics: [],
  bookmarkedTopics: [],
  mockTestScores: {},
  lastVisited: null,
};

export function useProgressTracker() {
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const stored = localStorage.getItem("prepPlatformProgress");
      return stored ? JSON.parse(stored) : DEFAULT_PROGRESS;
    } catch {
      return DEFAULT_PROGRESS;
    }
  });

  useEffect(() => {
    localStorage.setItem("prepPlatformProgress", JSON.stringify(progress));
  }, [progress]);

  const markTopicCompleted = (topicId: string) => {
    setProgress(prev => ({
      ...prev,
      completedTopics: prev.completedTopics.includes(topicId) 
        ? prev.completedTopics 
        : [...prev.completedTopics, topicId]
    }));
  };

  const toggleBookmark = (topicId: string) => {
    setProgress(prev => ({
      ...prev,
      bookmarkedTopics: prev.bookmarkedTopics.includes(topicId)
        ? prev.bookmarkedTopics.filter(id => id !== topicId)
        : [...prev.bookmarkedTopics, topicId]
    }));
  };

  const updateMockTestScore = (testId: number, score: number) => {
    setProgress(prev => ({
      ...prev,
      mockTestScores: { ...prev.mockTestScores, [testId]: score }
    }));
  };

  const setLastVisited = (path: string) => {
    setProgress(prev => ({ ...prev, lastVisited: path }));
  };

  return {
    progress,
    markTopicCompleted,
    toggleBookmark,
    updateMockTestScore,
    setLastVisited,
  };
}
