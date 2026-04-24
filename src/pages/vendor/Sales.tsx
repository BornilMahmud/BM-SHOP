import { products, orders } from "../../data/mock";

function fmt(n: number) {
  return `৳${n.toLocaleString("en-BD")}`;
}

export default function VendorSales() {
  const mine = products.slice(0, 12);
  const byProduct = new Map<string, { units: number; revenue: number }>();
  mine.forEach((p) => byProduct.set(p.id, { units: 0, revenue: 0 }));

  for (const o of orders) {
    if (o.status === "cancelled") continue;
    for (const it of o.items) {
      const row = byProduct.get(it.productId);
      if (!row) continue;
      row.units += it.qty;
      row.revenue += it.qty * it.price;
    }
  }

  const rows = mine
    .map((p) => ({ p, ...byProduct.get(p.id)! }))
    .sort((a, b) => b.revenue - a.revenue);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-white">Sales</h1>
        <p className="text-sm text-ink-300">Revenue and units by product</p>
      </div>
      <div className="glass overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-ink-300 bg-bg-800/60">
              <th className="py-3 px-4 font-medium">Product</th>
              <th className="py-3 px-4 font-medium text-right">Units</th>
              <th className="py-3 px-4 font-medium text-right">Revenue</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.p.id} className="border-t border-bg-border">
                <td className="py-3 px-4 text-white">{r.p.name}</td>
                <td className="py-3 px-4 text-right">{r.units}</td>
                <td className="py-3 px-4 text-right text-white">{fmt(r.revenue)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
