"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/protected-route";
import { useAppSelector } from "@/lib/store/hooks";
import { useGetUserStoresQuery } from "@/lib/store/services/onboardingApi";
import { useRouter } from "next/navigation";
import DashboardContent from "@/components/dashboard/dashboard-content";

export default function Dashboard() {
  const { user } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const { data: stores, isLoading } = useGetUserStoresQuery(user?.uid || "");
  const [selectedStore, setSelectedStore] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && stores && stores.length === 0) {
      router.push("/onboarding");
    }
    if (stores && stores.length > 0 && !selectedStore) {
      setSelectedStore(stores[0].id);
    }
  }, [stores, isLoading, router, selectedStore]);

  if (isLoading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <DashboardContent 
        stores={stores || []} 
        selectedStore={selectedStore}
        onStoreChange={setSelectedStore}
      />
    </ProtectedRoute>
  );
} 