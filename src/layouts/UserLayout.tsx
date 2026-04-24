import { Home, Package, Heart } from "lucide-react";
import PanelShell from "../components/PanelShell";

export default function UserLayout() {
  return (
    <PanelShell
      title="My account"
      subtitle="User panel"
      nav={[
        { to: "/user/home", label: "Home", icon: Home, end: true },
        { to: "/user/orders", label: "My orders", icon: Package },
        { to: "/user/wishlist", label: "Wishlist", icon: Heart },
      ]}
    />
  );
}
