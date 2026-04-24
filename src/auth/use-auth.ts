import { useContext } from "react";
import { AuthCtx, type AuthState } from "./auth-ctx";

export function useAuth(): AuthState {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
