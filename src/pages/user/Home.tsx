import { Link } from "react-router-dom";
import { Heart, Package, ShoppingBag } from "lucide-react";
import { useAuth } from "../../auth/use-auth";

export default function UserHome() {
  const { user } = useAuth();
  const name = user?.displayName || user?.email?.split("@")[0] || "there";

  return (
    <div className="flex flex-col gap-6">
      <div className="glass p-6">
        <h2 className="text-xl font-semibold text-white">Welcome back, {name} 👋</h2>
        <p className="text-sm text-ink-300 mt-1">
          Track your orders, manage your wishlist, and shop the latest deals.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link to="/user/orders" className="glass p-5 glass-hover block">
          <Package size={22} className="text-brand-300 mb-3" />
          <div className="text-white font-semibold">My orders</div>
          <div className="text-xs text-ink-300 mt-1">
            View order status and delivery tracking
          </div>
        </Link>
        <Link to="/user/wishlist" className="glass p-5 glass-hover block">
          <Heart size={22} className="text-accent-pink mb-3" />
          <div className="text-white font-semibold">Wishlist</div>
          <div className="text-xs text-ink-300 mt-1">
            Saved items and price drops
          </div>
        </Link>
        <Link to="/" className="glass p-5 glass-hover block">
          <ShoppingBag size={22} className="text-accent-blue mb-3" />
          <div className="text-white font-semibold">Shop</div>
          <div className="text-xs text-ink-300 mt-1">
            Browse trending products and deals
          </div>
        </Link>
      </div>
    </div>
  );
}
