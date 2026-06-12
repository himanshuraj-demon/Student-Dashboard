import { useState, useEffect, useCallback } from "react";
import { AuthContext, type User } from "./AuthContext";
import api from "../services/api";
import { type Note, type Todo } from "../../constants/types";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState<boolean | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);
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
    }
  };

  const checkAuth = useCallback(async () => {
  try {
    const [userRes, notesRes, todoRes] = await Promise.all([
      api.get("/user/me"),
      api.get("/notes"),
      api.get("/todos"),
    ]);

    setUser(userRes.data.user);
    setNotes(notesRes.data);
    setTodos(todoRes.data);
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
      }}>
      {children}
    </AuthContext.Provider>
  );
}
