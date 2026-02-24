"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import type { User, AuthContextType } from "@/types/auth";

/**
 * Auth Context - Provides authentication state and methods
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Auth Provider Component
 * Manages authentication state and provides auth methods
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Check authentication status on mount
   */
  useEffect(() => {
    checkAuth();
  }, []);

  /**
   * Verify if user is authenticated
   * In a real app, this would check with your backend/auth service
   */
  const checkAuth = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Simulate checking auth token from localStorage or making API call
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("auth_token")
          : null;

      if (token) {
        // In a real app, verify token with backend
        const userData =
          typeof window !== "undefined"
            ? JSON.parse(localStorage.getItem("user_data") || "null")
            : null;

        if (userData) {
          setUser(userData);
        }
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to check authentication";
      setError(message);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Log in user with email and password
   */
  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);

      // In a real app, make API call to your auth service
      if (!email || !password) {
        throw new Error("Email and password are required");
      }

      // Mock user data - replace with actual API response
      const mockUser: User = {
        id: "1",
        email,
        name: email.split("@")[0],
        role: "student",
      };

      // Store in localStorage (in real app, store auth token)
      if (typeof window !== "undefined") {
        localStorage.setItem("auth_token", "mock_token");
        localStorage.setItem("user_data", JSON.stringify(mockUser));
      }

      setUser(mockUser);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Login failed";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Log out user and clear authentication
   */
  const logout = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Clear localStorage
      if (typeof window !== "undefined") {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("user_data");
      }

      setUser(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Logout failed";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    login,
    logout,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Hook to use auth context
 * @throws Error if used outside AuthProvider
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
