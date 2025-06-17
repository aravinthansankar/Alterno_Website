"use client";

import ProtectedRoute from "@/components/protected-route";

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-900 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-8">Dashboard</h1>
          {/* Add your dashboard content here */}
        </div>
      </div>
    </ProtectedRoute>
  );
} 