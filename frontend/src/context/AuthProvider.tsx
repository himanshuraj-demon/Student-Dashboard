import { useState, useEffect } from "react";
import { AuthContext, type User } from "./AuthContext";
import api from "../services/api";
import { type Note } from "../../constants/types";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState<boolean | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
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

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const [userRes, notesRes] = await Promise.all([
          api.get("/user/me"),
          api.get("/notes"),
        ]);
        setUser(userRes.data.user);
        setNotes(notesRes.data);
        setAuth(true);
      } catch {
        setUser(null);
        setAuth(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

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
        setNotes
      }}>
      {children}
    </AuthContext.Provider>
  );
}
