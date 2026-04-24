import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { customers } from "../../data/mock";

function fmt(n: number) {
  return `৳${n.toLocaleString("en-BD")}`;
}

export default function AdminCustomers() {
  const [q, setQ] = useState("");
  const [seg, setSeg] = useState<"all" | "new" | "regular" | "vip">("all");
  const list = useMemo(() => {
    return customers.filter((c) => {
      if (seg !== "all" && c.segment !== seg) return false;
      if (
        q &&
        !c.name.toLowerCase().includes(q.toLowerCase()) &&
        !c.email.toLowerCase().includes(q.toLowerCase())
      )
        return false;
      return true;
    });
  }, [q, seg]);

  const totalSpend = customers.reduce((s, c) => s + c.spent, 0);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-white">Customers</h1>
        <p className="text-sm text-ink-300">
          {customers.length} customers · lifetime value {fmt(totalSpend)}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {(["all", "new", "regular", "vip"] as const).map((s) => {
          const count =
            s === "all"
              ? customers.length
              : customers.filter((c) => c.segment === s).length;
          return (
            <button
              key={s}
              onClick={() => setSeg(s)}
              className={
                seg === s
                  ? "stat-card !p-4 !border-brand-400/60 text-left"
                  : "stat-card !p-4 text-left"
              }
            >
              <div className="text-xs text-ink-300 uppercase">{s}</div>
              <div className="text-2xl font-bold text-white">{count}</div>
            </button>
          );
        })}
      </div>

      <div className="glass p-4">
        <label className="relative block">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400"
          />
          <input
            className="input pl-9"
            placeholder="Search customers…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </label>
      </div>

      <div className="glass overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-ink-300 bg-bg-800/60">
                <th className="py-3 px-4 font-medium">Customer</th>
                <th className="py-3 px-4 font-medium">City</th>
                <th className="py-3 px-4 font-medium">Segment</th>
                <th className="py-3 px-4 font-medium text-right">Orders</th>
                <th className="py-3 px-4 font-medium text-right">Spent</th>
              </tr>
            </thead>
            <tbody>
              {list.map((c) => (
                <tr
                  key={c.id}
                  className="border-t border-bg-border hover:bg-bg-800/40"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-brand-gradient flex items-center justify-center text-white text-xs font-bold">
                        {c.name
                          .split(" ")
                          .map((x) => x[0])
                          .slice(0, 2)
                          .join("")}
                      </div>
                      <div>
                        <div className="text-white">{c.name}</div>
                        <div className="text-xs text-ink-300">{c.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-ink-200">{c.city}</td>
                  <td className="py-3 px-4">
                    <span
                      className={
                        c.segment === "vip"
                          ? "chip bg-brand-gradient text-white border-transparent"
                          : c.segment === "regular"
                          ? "chip-info"
                          : "chip"
                      }
                    >
                      {c.segment}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">{c.orders}</td>
                  <td className="py-3 px-4 text-right text-white">
                    {fmt(c.spent)}
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
