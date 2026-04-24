import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  ShoppingBag,
  Users,
  Eye,
  TrendingUp,
} from "lucide-react";
import { customers, orders, products, salesSeries } from "../../data/mock";
import { Link } from "react-router-dom";

function formatBDT(n: number) {
  return `৳${n.toLocaleString("en-BD")}`;
}

function StatCard({
  label,
  value,
  delta,
  icon: Icon,
  accent,
}: {
  label: string;
  value: string;
  delta: number;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  accent: string;
}) {
  const up = delta >= 0;
  return (
    <div className="stat-card">
      <div className="flex items-center justify-between">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: accent }}
        >
          <Icon size={18} className="text-white" />
        </div>
        <div
          className={
            up
              ? "chip-success flex items-center"
              : "chip-danger flex items-center"
          }
        >
          {up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          {Math.abs(delta).toFixed(1)}%
        </div>
      </div>
      <div>
        <div className="text-xs text-ink-300 uppercase tracking-wider">
          {label}
        </div>
        <div className="text-2xl font-bold text-white mt-1">{value}</div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const totalRevenue = orders
    .filter((o) => o.status !== "cancelled")
    .reduce((s, o) => s + o.total, 0);
  const todayOrders = orders.filter(
    (o) => new Date(o.createdAt).toDateString() === new Date().toDateString()
  ).length;
  const activeCustomers = customers.length;
  const [liveVisitors, setLiveVisitors] = useState(57);
  useEffect(() => {
    const i = setInterval(() => {
      setLiveVisitors(42 + Math.floor(Math.random() * 30));
    }, 5000);
    return () => clearInterval(i);
  }, []);

  const topProducts = [...products]
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 5);

  const recent = orders.slice(0, 6);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">Welcome back 👋</h1>
          <p className="text-sm text-ink-300">
            Here's what's happening with your shop today.
          </p>
        </div>
        <div className="flex gap-2">
          <Link to="/admin/pos" className="btn-ghost">
            Open POS
          </Link>
          <Link to="/admin/products" className="btn-primary">
            + Add Product
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <StatCard
          label="Total Revenue"
          value={formatBDT(totalRevenue)}
          delta={12.4}
          icon={DollarSign}
          accent="linear-gradient(135deg,#7161FF,#5B4BFF)"
        />
        <StatCard
          label="Orders Today"
          value={String(todayOrders)}
          delta={8.1}
          icon={ShoppingBag}
          accent="linear-gradient(135deg,#E96BD8,#7161FF)"
        />
        <StatCard
          label="Active Customers"
          value={String(activeCustomers)}
          delta={4.9}
          icon={Users}
          accent="linear-gradient(135deg,#5BA8FF,#7161FF)"
        />
        <StatCard
          label="Live Visitors"
          value={String(liveVisitors)}
          delta={-2.3}
          icon={Eye}
          accent="linear-gradient(135deg,#49E0A6,#5BA8FF)"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <div className="xl:col-span-2 glass p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="section-title">Revenue · Last 14 days</div>
              <div className="text-xs text-ink-300 flex items-center gap-1 mt-1">
                <TrendingUp size={12} className="text-accent-green" /> +18.6% vs
                prev period
              </div>
            </div>
            <div className="flex gap-2">
              <button className="chip">14d</button>
              <button className="chip">30d</button>
              <button className="chip">90d</button>
            </div>
          </div>
          <div style={{ width: "100%", height: 280 }}>
            <ResponsiveContainer>
              <AreaChart
                data={salesSeries}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7161FF" stopOpacity={0.45} />
                    <stop offset="100%" stopColor="#7161FF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#262445" strokeDasharray="3 3" />
                <XAxis dataKey="label" stroke="#8B86A8" fontSize={11} />
                <YAxis stroke="#8B86A8" fontSize={11} width={50} />
                <Tooltip
                  contentStyle={{
                    background: "#181730",
                    border: "1px solid #262445",
                    borderRadius: 12,
                    color: "#E7E5F4",
                  }}
                  formatter={(v) => formatBDT(Number(v))}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#7161FF"
                  strokeWidth={2.5}
                  fill="url(#g1)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="section-title">Top Products</div>
            <Link to="/admin/products" className="text-xs text-brand-200">
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {topProducts.map((p, i) => (
              <div key={p.id} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-gradient flex items-center justify-center text-white text-xs font-bold">
                  {i + 1}
                </div>
                <img
                  src={p.image}
                  alt=""
                  className="w-10 h-10 rounded-xl object-cover border border-bg-border"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-white truncate">{p.name}</div>
                  <div className="text-xs text-ink-300">
                    {p.sales} sold · {formatBDT(p.price)}
                  </div>
                </div>
                <div
                  className={
                    p.stock < 15 ? "chip-warning" : "chip-success"
                  }
                >
                  Stock {p.stock}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <div className="glass p-5">
          <div className="section-title mb-4">Orders by day</div>
          <div style={{ width: "100%", height: 220 }}>
            <ResponsiveContainer>
              <BarChart data={salesSeries}>
                <CartesianGrid stroke="#262445" strokeDasharray="3 3" />
                <XAxis dataKey="label" stroke="#8B86A8" fontSize={11} />
                <YAxis stroke="#8B86A8" fontSize={11} width={30} />
                <Tooltip
                  contentStyle={{
                    background: "#181730",
                    border: "1px solid #262445",
                    borderRadius: 12,
                    color: "#E7E5F4",
                  }}
                />
                <Bar dataKey="orders" fill="#E96BD8" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="xl:col-span-2 glass p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="section-title">Recent Orders</div>
            <Link to="/admin/orders" className="text-xs text-brand-200">
              View all
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-ink-300">
                  <th className="py-2 pr-4 font-medium">Order</th>
                  <th className="py-2 pr-4 font-medium">Customer</th>
                  <th className="py-2 pr-4 font-medium">Payment</th>
                  <th className="py-2 pr-4 font-medium">Status</th>
                  <th className="py-2 pr-4 font-medium text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((o) => (
                  <tr
                    key={o.id}
                    className="border-t border-bg-border hover:bg-bg-800/40"
                  >
                    <td className="py-2.5 pr-4 text-white">{o.id}</td>
                    <td className="py-2.5 pr-4">{o.customerName}</td>
                    <td className="py-2.5 pr-4 uppercase text-xs text-ink-300">
                      {o.payment}
                    </td>
                    <td className="py-2.5 pr-4">
                      <StatusChip status={o.status} />
                    </td>
                    <td className="py-2.5 pr-4 text-right text-white">
                      {formatBDT(o.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export function StatusChip({ status }: { status: string }) {
  const map: Record<string, string> = {
    pending: "chip-warning",
    processing: "chip-info",
    shipped: "chip-info",
    delivered: "chip-success",
    cancelled: "chip-danger",
  };
  return <span className={map[status] || "chip"}>{status}</span>;
}
