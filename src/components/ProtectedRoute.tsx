import { type ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useApp } from "@/context/AppContext";
import { Loader2 } from "lucide-react";
import { Layout } from "@/components/layout/Layout";

/**
 * Wraps routes that require authentication. Redirects to /login if not signed in.
 * Dashboard and card-input (benefits flow) use this so benefits are only visible after login.
 */
export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isAuthLoading } = useApp();
  const location = useLocation();

  if (isAuthLoading) {
    return (
      <Layout showFooter={false}>
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center">
          <Loader2 className="w-10 h-10 animate-spin text-muted-foreground" />
        </div>
      </Layout>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
