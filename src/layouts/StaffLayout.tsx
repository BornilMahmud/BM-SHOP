import { LayoutDashboard, ScanBarcode, ShoppingBag } from "lucide-react";
import PanelShell from "../components/PanelShell";

export default function StaffLayout() {
  return (
    <PanelShell
      title="Staff panel"
      subtitle="Staff panel"
      nav={[
        { to: "/staff/panel", label: "Overview", icon: LayoutDashboard, end: true },
        { to: "/staff/pos", label: "POS", icon: ScanBarcode },
        { to: "/staff/orders", label: "Orders", icon: ShoppingBag },
      ]}
    />
  );
}
