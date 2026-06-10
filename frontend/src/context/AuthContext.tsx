import { createContext } from "react";
import {type Note } from "../../constants/types";

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
  auth: boolean | null;
  loading: boolean;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setAuth: React.Dispatch<React.SetStateAction<boolean | null>>;
  logout: () => void;
  notes:Note[];
  setNotes:React.Dispatch<React.SetStateAction<Note[] | []>>
}

export const AuthContext =
  createContext<AuthContextType | null>(null);