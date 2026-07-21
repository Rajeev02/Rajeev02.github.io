export type Difficulty = "Beginner" | "Intermediate" | "Advanced" | "Expert";
export type Frequency = 1 | 2 | 3 | 4 | 5;

export interface TopicMetadata {
  id: string;
  title: string;
  readingTimeMinutes: number;
  revisionTimeMinutes: number;
  practiceTimeMinutes: number;
  difficulty?: Difficulty;
  importanceRating?: number; // 1 to 10
  interviewFrequency?: Frequency;
  tags?: string[];
}

export interface CategoryIndex {
  id: string;
  title: string;
  description: string;
  topics: TopicMetadata[];
}

export interface TopicContent {
  metadata: TopicMetadata;
  content: string; // Markdown content
}
