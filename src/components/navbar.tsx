"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";

export interface NavbarProps {
  /**
   * Whether to show the navbar
   */
  isVisible?: boolean;
  /**
   * Callback when logout is clicked
   */
  onLogout?: () => void;
}

/**
 * Navigation Bar Component
 * Shows different navigation based on authentication state
 */
export function Navbar({ isVisible = true, onLogout }: NavbarProps) {
  const { user, isAuthenticated, logout } = useAuth();

  if (!isVisible) {
    return null;
  }

  const handleLogout = async () => {
    try {
      await logout();
      onLogout?.();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-xl text-blue-600"
        >
          <span>🎓</span>
          <span>Learnault</span>
        </Link>

        {/* Navigation Items */}
        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
          >
            Home
          </Link>

          {isAuthenticated ? (
            <>
              <Link
                href="/courses"
                className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
              >
                Courses
              </Link>
              <Link
                href="/dashboard"
                className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
              >
                Dashboard
              </Link>
              <Link
                href="/profile"
                className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
              >
                Profile
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/about"
                className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
              >
                About
              </Link>
              <Link
                href="/features"
                className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
              >
                Features
              </Link>
            </>
          )}
        </div>

        {/* Auth Section */}
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <span className="hidden text-sm text-gray-600 sm:inline">
                Welcome, {user?.name}
              </span>
              <button
                onClick={handleLogout}
                className="rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-100"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
