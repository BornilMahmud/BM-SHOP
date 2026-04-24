import { NavLink, Outlet, Link } from "react-router-dom";
import { LogOut, Store } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import clsx from "clsx";
import Logo from "./Logo";
import { useAuth } from "../auth/use-auth";

export interface PanelNavItem {
  to: string;
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;
  end?: boolean;
}

interface Props {
  title: string;
  subtitle: string;
  nav: PanelNavItem[];
}

export default function PanelShell({ title, subtitle, nav }: Props) {
  const { user, role, signOutUser } = useAuth();

  return (
    <div className="flex min-h-screen">
      <aside className="hidden lg:flex w-64 shrink-0 flex-col gap-2 p-5 glass rounded-none border-r border-bg-border bg-bg-800/60 min-h-screen sticky top-0">
        <div className="mb-4">
          <Logo />
          <div className="mt-2 text-[11px] uppercase tracking-wider text-ink-300">
            {subtitle}
          </div>
        </div>
        <nav className="flex flex-col gap-1">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end}
              className={({ isActive }) =>
                clsx(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all",
                  isActive
                    ? "bg-brand-gradient text-white shadow-glow"
                    : "text-ink-200 hover:bg-bg-card hover:text-white"
                )
              }
            >
              <n.icon size={18} />
              <span>{n.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto">
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-ink-300 hover:text-white hover:bg-bg-card"
          >
            <Store size={18} />
            <span>View Storefront</span>
          </Link>
          <div className="mt-3 p-3 rounded-xl bg-card-gradient border border-bg-border">
            <div className="text-xs text-ink-300">Signed in as</div>
            <div className="text-sm text-white font-semibold truncate">
              {user?.displayName || user?.email?.split("@")[0] || "Guest"}
            </div>
            <div className="text-xs text-ink-300 truncate">{user?.email ?? "—"}</div>
            {role && (
              <div className="mt-1 inline-block text-[10px] uppercase tracking-wider text-brand-200 bg-brand-800/40 rounded px-1.5 py-0.5">
                {role}
              </div>
            )}
          </div>
          <button
            onClick={() => signOutUser()}
            className="mt-3 w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-sm text-ink-200 hover:text-white hover:bg-bg-card"
          >
            <LogOut size={16} /> Sign out
          </button>
        </div>
      </aside>
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-20 backdrop-blur-xl bg-bg-900/60 border-b border-bg-border">
          <div className="flex items-center gap-3 px-4 lg:px-8 h-16">
            <h1 className="text-lg font-semibold text-white">{title}</h1>
            <div className="flex-1" />
            <div className="text-xs text-ink-300 hidden md:block">
              {user?.email}
            </div>
            <button onClick={() => signOutUser()} className="btn-ghost" aria-label="Sign out">
              <LogOut size={16} />
            </button>
          </div>
        </header>
        <main className="flex-1 p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
