import ProtectedRoute from "@/components/protected-route";
import React from "react";

export default function withProtectedRoute<P extends object>(
  PageComponent: React.ComponentType<P>
): React.ComponentType<P> {
  const ProtectedPage = (props: P) => (
    <ProtectedRoute>
      <PageComponent {...props} />
    </ProtectedRoute>
  );
  return ProtectedPage;
} 