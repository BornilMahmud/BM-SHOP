import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  type User,
} from "firebase/auth";
import { auth, firebaseConfigured, googleProvider, githubProvider } from "../lib/firebase";
import {
  assignRoleOnSignup,
  fetchRole,
  supabaseConfigured,
  type Role,
} from "../lib/supabase";
import { AuthCtx, type AuthState } from "./auth-ctx";

async function resolveRole(user: User): Promise<Role> {
  if (!supabaseConfigured) return "user";
  try {
    const existing = await fetchRole(user.uid);
    if (existing) return existing;
    // First signup in the system becomes admin; everyone else is a regular user.
    // The decision + insert happen atomically inside a Postgres SECURITY DEFINER
    // function to avoid a TOCTOU race between concurrent signups.
    return await assignRoleOnSignup(user.uid, user.email);
  } catch {
    return "user";
  }
}

function messageFromError(err: unknown): string {
  if (err && typeof err === "object" && "message" in err) {
    const msg = String((err as { message: unknown }).message);
    // Firebase errors look like "Firebase: Error (auth/invalid-credential)."
    const code = /auth\/([a-z-]+)/i.exec(msg)?.[1];
    if (code) return code.replace(/-/g, " ");
    return msg;
  }
  return "Unknown error";
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<Role | null>(null);
  // If Firebase isn't configured we will never hear back from onAuthStateChanged,
  // so start in the "not loading, not signed in" state immediately.
  const [loading, setLoading] = useState<boolean>(firebaseConfigured);
  const [error, setError] = useState<string | null>(null);

  // Track the most recent UID observed by onAuthStateChanged so that a stale
  // resolveRole() promise can't overwrite state produced by a newer auth event
  // (e.g. sign-out firing while a previous sign-in is still awaiting Supabase).
  const currentUidRef = useRef<string | null>(null);

  useEffect(() => {
    if (!auth) return;
    const unsub = onAuthStateChanged(auth, async (u) => {
      const uid = u?.uid ?? null;
      currentUidRef.current = uid;
      setUser(u);
      if (u) {
        const r = await resolveRole(u);
        if (currentUidRef.current !== uid) return;
        setRole(r);
      } else {
        setRole(null);
      }
      if (currentUidRef.current !== uid) return;
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const run = useCallback(async (fn: () => Promise<unknown>) => {
    setError(null);
    try {
      await fn();
    } catch (e) {
      setError(messageFromError(e));
      throw e;
    }
  }, []);

  const requireAuth = () => {
    if (!auth) throw new Error("Firebase is not configured. Set VITE_FIREBASE_* in .env");
  };

  const signUp = useCallback<AuthState["signUp"]>(async (email, password) => {
    requireAuth();
    await run(() => createUserWithEmailAndPassword(auth!, email, password));
  }, [run]);

  const signIn = useCallback<AuthState["signIn"]>(async (email, password) => {
    requireAuth();
    await run(() => signInWithEmailAndPassword(auth!, email, password));
  }, [run]);

  const signInGoogle = useCallback<AuthState["signInGoogle"]>(async () => {
    requireAuth();
    await run(() => signInWithPopup(auth!, googleProvider));
  }, [run]);

  const signInGithub = useCallback<AuthState["signInGithub"]>(async () => {
    requireAuth();
    await run(() => signInWithPopup(auth!, githubProvider));
  }, [run]);

  const signOutUser = useCallback<AuthState["signOutUser"]>(async () => {
    if (!auth) return;
    await signOut(auth);
  }, []);

  const clearError = useCallback(() => setError(null), []);

  const value: AuthState = {
    loading,
    user,
    role,
    error,
    signUp,
    signIn,
    signInGoogle,
    signInGithub,
    signOutUser,
    clearError,
  };

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}
