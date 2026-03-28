"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  initMockUsers,
  getCurrentSession,
  mockLogin,
  mockSignup,
  mockLogout,
  mockForgotPassword,
  mockResetPassword,
  mockVerifyOtp,
  mockUpdateProfilePicture,
} from "@/lib/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initMockUsers();
    const session = getCurrentSession();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (session) setUser(session);
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const session = mockLogin({ email, password });
    setUser(session);
    return session;
  };

  const signup = async (userData) => {
    const result = mockSignup(userData);
    return result; // returns { userId, email, otp }
  };

  const verifyOtp = async (email, otp) => {
    const session = mockVerifyOtp(email, otp);
    setUser(session);
    return session;
  };

  const updateProfilePicture = async (email, imageDataUrl) => {
    const session = mockUpdateProfilePicture(email, imageDataUrl);
    setUser(session);
    return session;
  };

  const logout = () => {
    mockLogout();
    setUser(null);
  };

  const forgotPassword = async (email) => {
    return mockForgotPassword(email);
  };

  const resetPassword = async (email, newPassword, token) => {
    return mockResetPassword(email, newPassword, token);
  };

  const value = {
    user,
    loading,
    login,
    signup,
    verifyOtp,
    updateProfilePicture,
    logout,
    forgotPassword,
    resetPassword,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
