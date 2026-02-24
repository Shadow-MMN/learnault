/**
 * Example usage of LayoutWrapper in a Next.js app
 *
 * This shows how to integrate the auth-aware layout wrapper
 * into your Next.js application
 */

"use client";

import { AuthProvider } from "@/contexts/auth-context";
import { LayoutWrapper } from "@/components/layout-wrapper";

// Option 1: Using LayoutWrapper with AuthProvider (Recommended for app router)
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}

/**
 * For pages router, wrap your App component instead:
 *
 * function App({ Component, pageProps }) {
 *   return (
 *     <AuthProvider>
 *       <LayoutWrapper>
 *         <Component {...pageProps} />
 *       </LayoutWrapper>
 *     </AuthProvider>
 *   );
 * }
 */
