import { createContext } from "react";

export interface User {
  _id: string;
  name: string;
  email: string;
  profileImageUrl?: string;
  details?: UserDetails;
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
  auth: boolean;
  loading: boolean;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  logout: () => void;
}

export const AuthContext =
  createContext<AuthContextType | null>(null);