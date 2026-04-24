import { useState, type FormEvent } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { Loader2, LogIn, Mail } from "lucide-react";
import { useAuth } from "../../auth/use-auth";
import { HOME_BY_ROLE, sanitizeNextPath } from "../../auth/auth-ctx";
import { firebaseConfigured } from "../../lib/firebase";
import Logo from "../../components/Logo";

function GithubGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden fill="currentColor">
      <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.8.1-.8.1-.8 1.2.1 1.9 1.3 1.9 1.3 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.3.5-2.4 1.3-3.2-.1-.3-.6-1.6.1-3.3 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.7.2 3 .1 3.3.8.8 1.3 1.9 1.3 3.2 0 4.7-2.8 5.7-5.5 6 .4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6A12 12 0 0 0 12 .3z"/>
    </svg>
  );
}

function GoogleGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden>
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.2 3.6l6.85-6.85C35.9 2.36 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.14-3.09-.4-4.55H24v9.02h12.9c-.56 3.02-2.26 5.57-4.82 7.29l7.73 6c4.52-4.17 7.17-10.31 7.17-17.76z"/>
      <path fill="#FBBC05" d="M10.54 28.59a14.5 14.5 0 0 1 0-9.18l-7.98-6.19A23.97 23.97 0 0 0 0 24c0 3.88.93 7.55 2.56 10.78l7.98-6.19z"/>
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.9-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.17 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
      <path fill="none" d="M0 0h48v48H0z"/>
    </svg>
  );
}

export default function Login() {
  const { signIn, signInGoogle, signInGithub, error, user, role, loading, clearError } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState<"email" | "google" | "github" | null>(null);
  const location = useLocation();

  if (user && role && !loading) {
    const params = new URLSearchParams(location.search);
    const safeNext = sanitizeNextPath(params.get("next"));
    return <Navigate to={safeNext || HOME_BY_ROLE[role]} replace />;
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy("email");
    try {
      await signIn(email, password);
    } catch {
      // error surfaced via context
    } finally {
      setBusy(null);
    }
  }

  async function onProvider(provider: "google" | "github") {
    setBusy(provider);
    try {
      if (provider === "google") await signInGoogle();
      else await signInGithub();
    } catch {
      // context
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-bg-900">
      <div className="w-full max-w-md glass p-8">
        <div className="flex flex-col items-center gap-2 mb-6">
          <Logo />
          <h1 className="text-xl font-semibold text-white mt-2">Welcome back</h1>
          <p className="text-sm text-ink-300">Sign in to your BM SHOP account</p>
        </div>

        {!firebaseConfigured && (
          <div className="mb-4 text-xs p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200">
            Firebase not configured — set <code>VITE_FIREBASE_*</code> in <code>.env</code>.
          </div>
        )}

        {error && (
          <div className="mb-4 text-xs p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-200 capitalize">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="flex flex-col gap-3">
          <label className="text-xs text-ink-300">Email
            <input
              type="email"
              required
              value={email}
              onChange={(e) => { clearError(); setEmail(e.target.value); }}
              className="input mt-1"
              placeholder="you@example.com"
              autoComplete="email"
            />
          </label>
          <label className="text-xs text-ink-300">Password
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => { clearError(); setPassword(e.target.value); }}
              className="input mt-1"
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </label>
          <button type="submit" disabled={busy !== null} className="btn-primary w-full mt-1">
            {busy === "email" ? <Loader2 size={16} className="animate-spin" /> : <LogIn size={16} />}
            Sign in
          </button>
        </form>

        <div className="flex items-center gap-3 my-5 text-xs text-ink-400">
          <div className="flex-1 h-px bg-bg-border" />
          or continue with
          <div className="flex-1 h-px bg-bg-border" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => onProvider("google")}
            disabled={busy !== null}
            className="btn-ghost justify-center"
          >
            {busy === "google" ? <Loader2 size={16} className="animate-spin" /> : <GoogleGlyph />}
            Google
          </button>
          <button
            type="button"
            onClick={() => onProvider("github")}
            disabled={busy !== null}
            className="btn-ghost justify-center"
          >
            {busy === "github" ? <Loader2 size={16} className="animate-spin" /> : <GithubGlyph />}
            GitHub
          </button>
        </div>

        <div className="mt-6 text-xs text-ink-300 text-center">
          <Mail size={12} className="inline mr-1 -mt-0.5" />
          No account?{" "}
          <Link to="/signup" className="text-brand-300 hover:underline">Create one</Link>
        </div>
      </div>
    </div>
  );
}
