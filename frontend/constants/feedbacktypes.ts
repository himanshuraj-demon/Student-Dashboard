// types.ts
// Shared TypeScript types for the Community Feedback feature.

export type FeedbackType = "semester" | "course" | "general";

export type UserRole = "student" | "adviser";

type User = {
  _id: string;
  name: string;
  details?: {
    branch: string;
  };
};

export type VoteValue = "like" | "dislike" | null;

export interface Feedback {
  _id: string;
  user: User;
  type: FeedbackType;
  semester?: number; // present when type === "semester"
  courseCode?: string; // present when type === "course"
  title: string;
  content: string;
  tags: string[];
  likes: number;
  dislikes: number;
  createdAt: string; // ISO date string
  myVote?: VoteValue; // client-side: how the current user voted, if at all
}

export const FEEDBACK_TAGS = [
  "Exam",
  "Assignment",
  "Project",
  "Internship",
  "Placement",
  "Registration",
] as const;

export type FeedbackTag = (typeof FEEDBACK_TAGS)[number];

export type SortOption = "newest" | "mostHelpful" | "mostLiked";

export type GroupFilter = "all" | FeedbackType;

export interface NewFeedbackPayload {
  type: FeedbackType;
  semester?: number;
  courseCode?: string;
  title: string;
  content: string;
  tags: string[];
}