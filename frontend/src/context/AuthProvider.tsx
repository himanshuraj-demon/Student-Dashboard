import { useState, useEffect, useCallback } from "react";
import { AuthContext, type User } from "./AuthContext";
import api from "../services/api";
import { type Note, type Todo } from "../../constants/types";
import {type Feedback } from "../../constants/feedbacktypes";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState<boolean | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [yourCourses, setYourCourses] = useState<string[]>([]);
  const logout = async () => {
    try {
      await api.post(
        "/user/logout",
        {},
        {
          withCredentials: true,
        },
      );
    } catch (err) {
      console.log(err);
    } finally {
      setUser(null);
      setAuth(false);
      setNotes([]);
      setTodos([]);
      setYourCourses([]);
      setLoading(false);
    }
  };

  const checkAuth = useCallback(async () => {
    try {
      const [userRes, notesRes, todoRes, coursesRes,feedbackRes] = await Promise.all([
        api.get("/user/me"),
        api.get("/notes"),
        api.get("/todos"),
        api.get("/user/your-courses"),
        api.get("/feedback")
      ]);

      setUser(userRes.data.user);
      setNotes(notesRes.data);
      setFeedbacks(feedbackRes.data)
      setTodos(todoRes.data);
      setYourCourses(coursesRes.data.codes ?? []);

      setAuth(true);
    } catch {
      setUser(null);
      setAuth(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const id = setTimeout(() => {
      void checkAuth();
    }, 0);

    return () => clearTimeout(id);
  }, [checkAuth]);

  return (
    <AuthContext.Provider
      value={{
        user,
        auth,
        loading,
        setAuth,
        setUser,
        logout,
        notes,
        setNotes,
        todos,
        setTodos,
        checkAuth,
        yourCourses,
        setYourCourses,
        feedbacks,
        setFeedbacks,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
