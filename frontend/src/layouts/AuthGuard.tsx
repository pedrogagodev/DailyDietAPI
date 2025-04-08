import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router";

interface AuthGuardProps {
  isPrivate: boolean;
}

export function AuthGuard({ isPrivate }: AuthGuardProps) {
  const { isSignedIn } = useAuth();

  if (isPrivate && !isSignedIn) {
    return <Navigate to="/login" replace />;
  }

  if (!isPrivate && isSignedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
