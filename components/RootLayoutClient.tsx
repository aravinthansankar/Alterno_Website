"use client";
import { usePathname } from "next/navigation";
import DashboardLayout from "@/components/dashboard/dashboard-layout";

export default function RootLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  return isDashboard ? (
    <DashboardLayout>{children}</DashboardLayout>
  ) : (
    <>{children}</>
  );
} 