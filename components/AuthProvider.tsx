"use client";

import { useEffect } from "react";
import { onAuthStateChanged, setPersistence, browserLocalPersistence, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAppDispatch } from "@/lib/store/hooks";
import { setUser, setInitialized } from "@/lib/store/slices/authSlice";

// Helper function to serialize Firebase User
const serializeUser = (user: User | null) => {
  if (!user) return null;
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    emailVerified: user.emailVerified,
    photoURL: user.photoURL,
  };
};

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Set Firebase Auth persistence to LOCAL (persists across browser sessions)
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        console.log("Firebase Auth persistence set to LOCAL");
      })
      .catch((error) => {
        console.error("Error setting Firebase Auth persistence:", error);
      });

    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Auth state changed:", user ? "User signed in" : "User signed out");
      // Serialize the user before dispatching to Redux
      const serializedUser = serializeUser(user);
      dispatch(setUser(serializedUser));
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [dispatch]);

  return <>{children}</>;
} 