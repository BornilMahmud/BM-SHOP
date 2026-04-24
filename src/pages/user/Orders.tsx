import { orders } from "../../data/mock";
import { StatusChip } from "../admin/Dashboard";

function fmt(n: number) {
  return `৳${n.toLocaleString("en-BD")}`;
}

export default function UserOrders() {
  // MVP: show last 10 orders as "my orders"
  const mine = orders.slice(0, 10);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-white">My orders</h1>
        <p className="text-sm text-ink-300">Recent activity on your account</p>
      </div>
      <div className="glass overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-ink-300 bg-bg-800/60">
                <th className="py-3 px-4 font-medium">Order</th>
                <th className="py-3 px-4 font-medium">Items</th>
                <th className="py-3 px-4 font-medium">Status</th>
                <th className="py-3 px-4 font-medium">Date</th>
                <th className="py-3 px-4 font-medium text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {mine.map((o) => (
                <tr key={o.id} className="border-t border-bg-border hover:bg-bg-800/40">
                  <td className="py-3 px-4 text-white font-medium">{o.id}</td>
                  <td className="py-3 px-4">
                    {o.items.reduce((s, it) => s + it.qty, 0)}
                  </td>
                  <td className="py-3 px-4"><StatusChip status={o.status} /></td>
                  <td className="py-3 px-4 text-ink-300">
                    {new Date(o.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 text-right text-white">{fmt(o.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
