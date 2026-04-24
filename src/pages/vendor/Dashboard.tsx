import { Package, TrendingUp, Wallet } from "lucide-react";
import { products, orders } from "../../data/mock";

function fmt(n: number) {
  return `৳${n.toLocaleString("en-BD")}`;
}

export default function VendorDashboard() {
  // MVP: treat first 12 products as "my products"
  const mine = products.slice(0, 12);
  const myIds = new Set(mine.map((p) => p.id));

  const myOrders = orders.filter(
    (o) =>
      o.status !== "cancelled" &&
      o.items.some((it) => myIds.has(it.productId))
  );
  const revenue = myOrders.reduce(
    (s, o) =>
      s +
      o.items
        .filter((it) => myIds.has(it.productId))
        .reduce((x, it) => x + it.qty * it.price, 0),
    0
  );
  const unitsSold = myOrders.reduce(
    (s, o) =>
      s +
      o.items
        .filter((it) => myIds.has(it.productId))
        .reduce((x, it) => x + it.qty, 0),
    0
  );

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-white">Vendor dashboard</h1>
        <p className="text-sm text-ink-300">Snapshot of your store performance</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass p-5">
          <Wallet size={18} className="text-brand-300 mb-2" />
          <div className="text-xs text-ink-300">Revenue</div>
          <div className="text-2xl font-bold text-white">{fmt(revenue)}</div>
        </div>
        <div className="glass p-5">
          <TrendingUp size={18} className="text-accent-green mb-2" />
          <div className="text-xs text-ink-300">Units sold</div>
          <div className="text-2xl font-bold text-white">{unitsSold}</div>
        </div>
        <div className="glass p-5">
          <Package size={18} className="text-accent-blue mb-2" />
          <div className="text-xs text-ink-300">Products listed</div>
          <div className="text-2xl font-bold text-white">{mine.length}</div>
        </div>
      </div>
    </div>
  );
}
