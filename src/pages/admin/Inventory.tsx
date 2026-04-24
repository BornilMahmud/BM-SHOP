import { products } from "../../data/mock";
import { Boxes, TrendingDown, AlertTriangle } from "lucide-react";

function fmt(n: number) {
  return `৳${n.toLocaleString("en-BD")}`;
}

const SUPPLIERS = [
  { name: "Dhaka Traders Ltd", items: 42, paid: "৳1,24,500", due: "৳18,200" },
  { name: "Chattogram Imports", items: 28, paid: "৳92,400", due: "৳0" },
  { name: "Sylhet Wholesale", items: 19, paid: "৳34,000", due: "৳6,500" },
];

const EXPENSES = [
  { label: "Warehouse rent", amount: 45000, date: "This month" },
  { label: "Delivery fuel", amount: 12500, date: "This month" },
  { label: "Staff salary", amount: 180000, date: "This month" },
  { label: "Packaging", amount: 8400, date: "This month" },
];

export default function AdminInventory() {
  const low = products.filter((p) => p.stock < 15);
  const totalValue = products.reduce((s, p) => s + p.price * p.stock, 0);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-white">Inventory & ERP</h1>
        <p className="text-sm text-ink-300">
          Stock, suppliers, and expense tracking.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="stat-card">
          <div className="flex items-center gap-2 text-ink-300">
            <Boxes size={14} /> Inventory value
          </div>
          <div className="text-2xl font-bold text-white">{fmt(totalValue)}</div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-2 text-ink-300">
            <AlertTriangle size={14} /> Low stock SKUs
          </div>
          <div className="text-2xl font-bold text-white">{low.length}</div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-2 text-ink-300">
            <TrendingDown size={14} /> Monthly expenses
          </div>
          <div className="text-2xl font-bold text-white">
            {fmt(EXPENSES.reduce((s, e) => s + e.amount, 0))}
          </div>
        </div>
      </div>

      <div className="glass p-5">
        <div className="section-title mb-4">Low stock</div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-ink-300">
                <th className="py-2 pr-4">Product</th>
                <th className="py-2 pr-4">SKU</th>
                <th className="py-2 pr-4">Category</th>
                <th className="py-2 pr-4 text-right">Stock</th>
                <th className="py-2 pr-4 text-right">Price</th>
              </tr>
            </thead>
            <tbody>
              {low.map((p) => (
                <tr key={p.id} className="border-t border-bg-border">
                  <td className="py-2.5 pr-4 text-white">{p.name}</td>
                  <td className="py-2.5 pr-4 text-ink-200 font-mono text-xs">
                    {p.sku}
                  </td>
                  <td className="py-2.5 pr-4">{p.category}</td>
                  <td className="py-2.5 pr-4 text-right">
                    <span className="chip-warning">{p.stock}</span>
                  </td>
                  <td className="py-2.5 pr-4 text-right text-white">
                    {fmt(p.price)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <div className="glass p-5">
          <div className="section-title mb-4">Suppliers</div>
          <div className="space-y-3">
            {SUPPLIERS.map((s) => (
              <div
                key={s.name}
                className="flex items-center justify-between p-3 rounded-xl bg-bg-800 border border-bg-border"
              >
                <div>
                  <div className="text-white font-semibold">{s.name}</div>
                  <div className="text-xs text-ink-300">{s.items} items</div>
                </div>
                <div className="text-right text-sm">
                  <div className="text-white">Paid {s.paid}</div>
                  <div className="text-accent-orange">Due {s.due}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="glass p-5">
          <div className="section-title mb-4">Expenses</div>
          <div className="space-y-3">
            {EXPENSES.map((e) => (
              <div
                key={e.label}
                className="flex items-center justify-between p-3 rounded-xl bg-bg-800 border border-bg-border"
              >
                <div>
                  <div className="text-white">{e.label}</div>
                  <div className="text-xs text-ink-300">{e.date}</div>
                </div>
                <div className="text-white font-bold">{fmt(e.amount)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
