import { NavLink, Link } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  BarChart3,
  Megaphone,
  Settings,
  ScanBarcode,
  Warehouse,
  Store,
  LogOut,
} from "lucide-react";
import Logo from "./Logo";
import clsx from "clsx";
import { useAuth } from "../auth/use-auth";

const NAV = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/products", label: "Products", icon: Package },
  { to: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { to: "/admin/customers", label: "Customers", icon: Users },
  { to: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/admin/marketing", label: "Marketing", icon: Megaphone },
  { to: "/admin/inventory", label: "Inventory", icon: Warehouse },
  { to: "/admin/pos", label: "POS", icon: ScanBarcode },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const { user, role, signOutUser } = useAuth();
  return (
    <aside className="hidden lg:flex w-64 shrink-0 flex-col gap-2 p-5 glass rounded-none border-r border-bg-border bg-bg-800/60 min-h-screen sticky top-0">
      <div className="mb-4">
        <Logo />
      </div>
      <nav className="flex flex-col gap-1">
        {NAV.map((n) => (
          <NavLink
            key={n.to}
            to={n.to}
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
            {user?.displayName || user?.email?.split("@")[0] || "Admin"}
          </div>
          <div className="text-xs text-ink-300 truncate">
            {user?.email ?? "owner@bmshop.com"}
          </div>
          {role && (
            <div className="mt-1 inline-block text-[10px] uppercase tracking-wider text-brand-200 bg-brand-800/40 rounded px-1.5 py-0.5">
              {role}
            </div>
          )}
        </div>
        {user && (
          <button
            onClick={() => signOutUser()}
            className="mt-3 w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-sm text-ink-200 hover:text-white hover:bg-bg-card"
          >
            <LogOut size={16} /> Sign out
          </button>
        )}
      </div>
    </aside>
  );
}
