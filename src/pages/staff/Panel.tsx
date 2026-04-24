import { Link } from "react-router-dom";
import { ScanBarcode, ShoppingBag } from "lucide-react";
import { orders } from "../../data/mock";
import { StatusChip } from "../admin/Dashboard";

function fmt(n: number) {
  return `৳${n.toLocaleString("en-BD")}`;
}

export default function StaffPanel() {
  const queue = orders.filter((o) => o.status === "pending" || o.status === "processing").slice(0, 8);
  const totalQueue = queue.reduce((s, o) => s + o.total, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Staff panel</h1>
        <p className="text-sm text-ink-300">
          {queue.length} orders awaiting action · {fmt(totalQueue)} pipeline value
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link to="/staff/pos" className="glass p-5 glass-hover block">
          <ScanBarcode size={22} className="text-brand-300 mb-3" />
          <div className="text-white font-semibold">Open POS</div>
          <div className="text-xs text-ink-300 mt-1">
            Barcode scan · quick checkout · receipts
          </div>
        </Link>
        <Link to="/staff/orders" className="glass p-5 glass-hover block">
          <ShoppingBag size={22} className="text-accent-blue mb-3" />
          <div className="text-white font-semibold">Fulfilment queue</div>
          <div className="text-xs text-ink-300 mt-1">
            Process pending and in-progress orders
          </div>
        </Link>
      </div>

      <div className="glass overflow-hidden">
        <div className="px-4 py-3 border-b border-bg-border text-sm font-semibold text-white">
          To-do queue
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-ink-300">
              <th className="py-3 px-4 font-medium">Order</th>
              <th className="py-3 px-4 font-medium">Customer</th>
              <th className="py-3 px-4 font-medium">Status</th>
              <th className="py-3 px-4 font-medium text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {queue.map((o) => (
              <tr key={o.id} className="border-t border-bg-border">
                <td className="py-3 px-4 text-white font-medium">{o.id}</td>
                <td className="py-3 px-4">{o.customerName}</td>
                <td className="py-3 px-4"><StatusChip status={o.status} /></td>
                <td className="py-3 px-4 text-right text-white">{fmt(o.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
