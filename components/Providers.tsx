"use client";

import { Provider } from "react-redux";
import { store } from "@/lib/store";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import AuthProvider from "@/components/AuthProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthProvider>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
          <Toaster richColors position="top-center" />
        </ThemeProvider>
      </AuthProvider>
    </Provider>
  );
} 