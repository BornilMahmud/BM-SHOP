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
