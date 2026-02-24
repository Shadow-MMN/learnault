/**
 * Authentication types
 */

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role?: "student" | "instructor" | "admin";
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  isProtectedRoute?: boolean;
}
