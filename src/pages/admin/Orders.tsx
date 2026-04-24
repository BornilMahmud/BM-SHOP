import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { orders } from "../../data/mock";
import { StatusChip } from "./Dashboard";
import type { OrderStatus } from "../../types";

function fmt(n: number) {
  return `৳${n.toLocaleString("en-BD")}`;
}

const STATUS: ("all" | OrderStatus)[] = [
  "all",
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

export default function AdminOrders() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<(typeof STATUS)[number]>("all");

  const list = useMemo(() => {
    return orders.filter((o) => {
      if (status !== "all" && o.status !== status) return false;
      if (
        q &&
        !o.id.toLowerCase().includes(q.toLowerCase()) &&
        !o.customerName.toLowerCase().includes(q.toLowerCase())
      )
        return false;
      return true;
    });
  }, [q, status]);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-white">Orders</h1>
        <p className="text-sm text-ink-300">
          {orders.length} total · showing {list.length}
        </p>
      </div>

      <div className="glass p-4 flex flex-wrap gap-2 items-center">
        <label className="relative flex-1 min-w-[220px]">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400"
          />
          <input
            className="input pl-9"
            placeholder="Search order ID or customer…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </label>
        <div className="flex flex-wrap gap-1.5">
          {STATUS.map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={
                s === status
                  ? "chip bg-brand-gradient text-white border-transparent capitalize"
                  : "chip hover:border-brand-400/60 capitalize"
              }
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="glass overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-ink-300 bg-bg-800/60">
                <th className="py-3 px-4 font-medium">Order</th>
                <th className="py-3 px-4 font-medium">Customer</th>
                <th className="py-3 px-4 font-medium">Items</th>
                <th className="py-3 px-4 font-medium">Payment</th>
                <th className="py-3 px-4 font-medium">Status</th>
                <th className="py-3 px-4 font-medium">Date</th>
                <th className="py-3 px-4 font-medium text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {list.map((o) => (
                <tr
                  key={o.id}
                  className="border-t border-bg-border hover:bg-bg-800/40"
                >
                  <td className="py-3 px-4 text-white font-medium">{o.id}</td>
                  <td className="py-3 px-4">{o.customerName}</td>
                  <td className="py-3 px-4">
                    {o.items.reduce((s, it) => s + it.qty, 0)}
                  </td>
                  <td className="py-3 px-4 uppercase text-xs text-ink-300">
                    {o.payment}
                  </td>
                  <td className="py-3 px-4">
                    <StatusChip status={o.status} />
                  </td>
                  <td className="py-3 px-4 text-ink-300">
                    {new Date(o.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 text-right text-white">
                    {fmt(o.total)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
