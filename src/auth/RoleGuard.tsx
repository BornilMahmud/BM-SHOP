import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./use-auth";
import type { Role } from "../lib/supabase";
import { HOME_BY_ROLE } from "./auth-ctx";

interface Props {
  allow: Role[];
}

export default function RoleGuard({ allow }: Props) {
  const { loading, user, role } = useAuth();
  const location = useLocation();

  // Fail closed: hold the gate until we have both a user and a role.
  // This covers the initial auth check AND the post-sign-in window where
  // `user` has been set synchronously but `resolveRole` is still awaiting.
  if (loading || (user && !role)) {
    return (
      <div className="min-h-screen flex items-center justify-center text-ink-300">
        Loading…
      </div>
    );
  }

  if (!user) {
    const redirect = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/login?next=${redirect}`} replace />;
  }

  if (!role || !allow.includes(role)) {
    return <Navigate to={role ? HOME_BY_ROLE[role] : "/login"} replace />;
  }

  return <Outlet />;
}
