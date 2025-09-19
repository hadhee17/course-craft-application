import React, { createContext, useContext, useEffect, useState } from "react";
import * as authService from "../services/authService";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // try to load current user (backend: /auth/me)
    (async () => {
      try {
        const res = await authService.getCurrentUser();
        setUser(res.data.user || null);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const login = async (email, password) => {
    const res = await authService.loginReq(email, password);
    setUser(res.data.user || null);
    return res;
  };
  const signup = async (payload) => {
    const res = await authService.signupReq(payload);
    setUser(res.data.user || null);
    return res;
  };
  const logout = async () => {
    await authService.logoutReq();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
