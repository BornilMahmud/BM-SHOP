import { LayoutDashboard, Package, TrendingUp } from "lucide-react";
import PanelShell from "../components/PanelShell";

export default function VendorLayout() {
  return (
    <PanelShell
      title="Vendor dashboard"
      subtitle="Vendor panel"
      nav={[
        { to: "/vendor/dashboard", label: "Dashboard", icon: LayoutDashboard, end: true },
        { to: "/vendor/products", label: "My products", icon: Package },
        { to: "/vendor/sales", label: "Sales", icon: TrendingUp },
      ]}
    />
  );
}
