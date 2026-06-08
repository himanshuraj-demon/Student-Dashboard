import { useState, useEffect } from "react";
import axios from "axios";
import { AuthContext, type User } from "./AuthContext";
import api from "../hooks/api";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(false);
  const logout = (): void => {
    setUser(null);
    setAuth(false);
  };

  useEffect(() => {
    
    const checkAuth = async () => {
      try {
        const res = await api.get("/user/me");
        setUser(res.data.user);
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
        setUser,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
