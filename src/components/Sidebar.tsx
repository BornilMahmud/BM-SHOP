import { NavLink } from "react-router-dom";
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
} from "lucide-react";
import Logo from "./Logo";
import clsx from "clsx";

const NAV = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
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
        <NavLink
          to="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-ink-300 hover:text-white hover:bg-bg-card"
        >
          <Store size={18} />
          <span>View Storefront</span>
        </NavLink>
        <div className="mt-3 p-3 rounded-xl bg-card-gradient border border-bg-border">
          <div className="text-xs text-ink-300">Signed in as</div>
          <div className="text-sm text-white font-semibold">Admin</div>
          <div className="text-xs text-ink-300">owner@bmshop.com</div>
        </div>
      </div>
    </aside>
  );
}
