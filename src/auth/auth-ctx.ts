import { createContext } from "react";
import type { User } from "firebase/auth";
import type { Role } from "../lib/supabase";

export interface AuthState {
  loading: boolean;
  user: User | null;
  role: Role | null;
  error: string | null;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInGoogle: () => Promise<void>;
  signInGithub: () => Promise<void>;
  signOutUser: () => Promise<void>;
  clearError: () => void;
}

export const AuthCtx = createContext<AuthState | null>(null);

export const HOME_BY_ROLE: Record<Role, string> = {
  admin: "/admin/dashboard",
  user: "/user/home",
  vendor: "/vendor/dashboard",
  staff: "/staff/panel",
};

/**
 * Clamp a user-supplied `?next=` path to a same-origin absolute path.
 *
 * Rejects anything that doesn't start with a single `/`, which blocks
 * protocol-relative (`//evil.com`), absolute URL (`https://evil.com`) and
 * relative (`foo`) inputs. This prevents both open redirects and the
 * `SecurityError` that React Router's `replaceState` throws when given a
 * cross-origin URL.
 */
export function sanitizeNextPath(next: string | null | undefined): string | null {
  if (!next) return null;
  if (!next.startsWith("/")) return null;
  if (next.startsWith("//")) return null;
  return next;
}
