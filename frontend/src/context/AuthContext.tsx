import { createContext } from "react";
import {type Note,type Todo } from "../../constants/types";
import {type Feedback } from "../../constants/feedbacktypes";

export interface User {
  _id: string;
  name: string;
  email: string;
  profileImageUrl?: string;
  details?: UserDetails;
  role:string
}
export interface UserDetails {
  cpi: number;
  totalCredits: number;
  creditsCompleted: number;
  currentSemester: number;
  bio: string;
  branch: string;
  linkedin: string;
  github: string;
  codeforcesHandle: string;
  codechefHandle: string;
  streak: number;
  totalStudyHours: number;
}


interface AuthContextType {
  user: User | null;
  auth: boolean | null;
  loading: boolean;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setAuth: React.Dispatch<React.SetStateAction<boolean | null>>;
  logout: () => void;
  notes:Note[];
  setNotes:React.Dispatch<React.SetStateAction<Note[] | []>>;
  todos:Todo[];
  setTodos:React.Dispatch<React.SetStateAction<Todo[] | []>>;
  checkAuth: () => Promise<void>;
  yourCourses: string[];
  setYourCourses: React.Dispatch<React.SetStateAction<string[]>>;
  feedbacks: Feedback[];
  setFeedbacks: React.Dispatch<React.SetStateAction<Feedback[]>>;
}

export const AuthContext =
  createContext<AuthContextType | null>(null);