import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { customers, orders, products, salesSeries } from "../../data/mock";

function fmt(n: number) {
  return `৳${n.toLocaleString("en-BD")}`;
}

const COLORS = ["#7161FF", "#E96BD8", "#5BA8FF", "#49E0A6", "#FF9A5A"];

export default function AdminAnalytics() {
  const nonCancelled = orders.filter((o) => o.status !== "cancelled");
  const revenue = nonCancelled.reduce((s, o) => s + o.total, 0);
  const avgOrder = nonCancelled.length > 0 ? Math.round(revenue / nonCancelled.length) : 0;

  const byCategory = Object.entries(
    products.reduce<Record<string, number>>((acc, p) => {
      acc[p.category] = (acc[p.category] || 0) + p.sales * p.price;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  const bySegment = (["new", "regular", "vip"] as const).map((s) => ({
    name: s,
    value: customers.filter((c) => c.segment === s).length,
  }));

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-white">Analytics</h1>
        <p className="text-sm text-ink-300">
          Revenue insights, top categories, and customer segments.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="stat-card">
          <div className="text-xs text-ink-300 uppercase">Revenue</div>
          <div className="text-xl font-bold text-white">{fmt(revenue)}</div>
        </div>
        <div className="stat-card">
          <div className="text-xs text-ink-300 uppercase">Orders</div>
          <div className="text-xl font-bold text-white">{orders.length}</div>
        </div>
        <div className="stat-card">
          <div className="text-xs text-ink-300 uppercase">AOV</div>
          <div className="text-xl font-bold text-white">{fmt(avgOrder)}</div>
        </div>
        <div className="stat-card">
          <div className="text-xs text-ink-300 uppercase">Conversion</div>
          <div className="text-xl font-bold text-white">3.8%</div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <div className="xl:col-span-2 glass p-5">
          <div className="section-title mb-4">Revenue trend</div>
          <div style={{ width: "100%", height: 260 }}>
            <ResponsiveContainer>
              <LineChart data={salesSeries}>
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
                  formatter={(v) => fmt(Number(v))}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#7161FF"
                  strokeWidth={3}
                  dot={{ r: 3, fill: "#E96BD8" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass p-5">
          <div className="section-title mb-4">Customer segments</div>
          <div style={{ width: "100%", height: 260 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={bySegment}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={95}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {bySegment.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "#181730",
                    border: "1px solid #262445",
                    borderRadius: 12,
                    color: "#E7E5F4",
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="glass p-5">
        <div className="section-title mb-4">Revenue by category</div>
        <div style={{ width: "100%", height: 280 }}>
          <ResponsiveContainer>
            <BarChart data={byCategory}>
              <CartesianGrid stroke="#262445" strokeDasharray="3 3" />
              <XAxis dataKey="name" stroke="#8B86A8" fontSize={11} />
              <YAxis stroke="#8B86A8" fontSize={11} width={60} />
              <Tooltip
                contentStyle={{
                  background: "#181730",
                  border: "1px solid #262445",
                  borderRadius: 12,
                  color: "#E7E5F4",
                }}
                formatter={(v) => fmt(Number(v))}
              />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {byCategory.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
