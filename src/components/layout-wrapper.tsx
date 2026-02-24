"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { Navbar } from "./navbar";
import { Footer } from "./footer";

export interface LayoutWrapperProps {
  /**
   * Child components to render
   */
  children: ReactNode;
}

/**
 * List of routes where navbar should be hidden
 * These routes typically have different navigation styling (e.g., landing page)
 */
const NAVBAR_HIDDEN_ROUTES = ["/login", "/signup", "/"];

/**
 * List of protected routes that require authentication
 * Users will be redirected to login if not authenticated
 */
const PROTECTED_ROUTES = ["/dashboard", "/courses", "/profile", "/settings"];

/**
 * Auth-aware Layout Wrapper Component
 *
 * Provides a consistent layout structure with:
 * - Conditional navbar rendering based on route and auth status
 * - Always-visible footer
 * - Loading state during auth verification
 * - Automatic redirects for protected routes
 *
 * @example
 * ```tsx
 * <AuthProvider>
 *   <LayoutWrapper>
 *     <YourPageContent />
 *   </LayoutWrapper>
 * </AuthProvider>
 * ```
 */
export function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, isLoading, user } = useAuth();
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  /**
   * Handle protected route redirects and navbar visibility
   */
  useEffect(() => {
    // Wait for auth check to complete
    if (isLoading) {
      return;
    }

    setIsAuthChecked(true);

    // Check if current route is protected
    const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
      pathname.startsWith(route),
    );

    if (isProtectedRoute && !isAuthenticated) {
      // Redirect to login if trying to access protected route without authentication
      setIsNavigating(true);
      router.push("/login");
      return;
    }

    // Check if trying to access auth pages while authenticated
    if ((pathname === "/login" || pathname === "/signup") && isAuthenticated) {
      setIsNavigating(true);
      router.push("/dashboard");
      return;
    }
  }, [isLoading, isAuthenticated, pathname, router]);

  /**
   * Determine if navbar should be visible
   * Hide on specific routes or if authentication is being checked
   */
  const shouldShowNavbar = !NAVBAR_HIDDEN_ROUTES.includes(pathname);

  /**
   * Loading state for initial auth check
   */
  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar isVisible={false} />
        <main className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
            <p className="text-gray-600">Loading...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  /**
   * Navigation in progress state
   */
  if (isNavigating) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar isVisible={false} />
        <main className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
            <p className="text-gray-600">Redirecting...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation Bar - conditionally shown */}
      <Navbar isVisible={shouldShowNavbar} />

      {/* Main Content Area */}
      <main className="flex-1">{children}</main>

      {/* Footer - always shown */}
      <Footer />
    </div>
  );
}

/**
 * Provider wrapper for the entire app
 * Combines AuthProvider and LayoutWrapper
 *
 * @example
 * ```tsx
 * // app.tsx or root layout
 * <LayoutWrapperProvider>
 *   <YourAppContent />
 * </LayoutWrapperProvider>
 * ```
 */
export function LayoutWrapperProvider({ children }: { children: ReactNode }) {
  const { AuthProvider } = require("@/contexts/auth-context");

  return (
    <AuthProvider>
      <LayoutWrapper>{children}</LayoutWrapper>
    </AuthProvider>
  );
}
