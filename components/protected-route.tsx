"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/store/hooks";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAuthenticated, loading, isEmailVerified, isInitialized } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    // Wait for Firebase Auth to initialize
    if (!isInitialized) {
      return;
    }

    if (!isAuthenticated) {
      router.push("/login");
    } else if (!isEmailVerified) {
      router.push("/verify-email");
    }
  }, [isAuthenticated, isEmailVerified, isInitialized, router]);

  // Show loading while Firebase Auth is initializing
  if (!isInitialized || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render children if not authenticated or email not verified
  if (!isAuthenticated || !isEmailVerified) {
    return null;
  }

  return <>{children}</>;
} 