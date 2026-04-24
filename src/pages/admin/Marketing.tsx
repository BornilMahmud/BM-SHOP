import { Megaphone, Ticket, Tag } from "lucide-react";

const COUPONS = [
  { code: "WELCOME10", off: "10%", uses: 128, limit: 500, status: "active" },
  { code: "SHIPFREE", off: "৳130", uses: 412, limit: 1000, status: "active" },
  { code: "EID2025", off: "15%", uses: 0, limit: 300, status: "scheduled" },
  { code: "FLASH50", off: "50%", uses: 88, limit: 100, status: "ended" },
];

const CAMPAIGNS = [
  {
    name: "Eid Collection",
    reach: 12400,
    ctr: "4.2%",
    revenue: "৳182,500",
    status: "live",
  },
  {
    name: "Back to School",
    reach: 8200,
    ctr: "3.1%",
    revenue: "৳94,000",
    status: "paused",
  },
  {
    name: "VIP Retargeting",
    reach: 1800,
    ctr: "8.6%",
    revenue: "৳124,800",
    status: "live",
  },
];

export default function AdminMarketing() {
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">Marketing</h1>
          <p className="text-sm text-ink-300">
            Coupons and campaigns performance.
          </p>
        </div>
        <button className="btn-primary">
          <Megaphone size={16} /> New campaign
        </button>
      </div>

      <div className="glass p-5">
        <div className="flex items-center gap-2 mb-4">
          <Ticket size={18} className="text-brand-200" />
          <div className="section-title">Coupons</div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-ink-300">
                <th className="py-2 pr-4">Code</th>
                <th className="py-2 pr-4">Discount</th>
                <th className="py-2 pr-4">Usage</th>
                <th className="py-2 pr-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {COUPONS.map((c) => (
                <tr key={c.code} className="border-t border-bg-border">
                  <td className="py-2.5 pr-4 text-white font-mono">{c.code}</td>
                  <td className="py-2.5 pr-4">{c.off}</td>
                  <td className="py-2.5 pr-4">
                    {c.uses} / {c.limit}
                  </td>
                  <td className="py-2.5 pr-4">
                    <span
                      className={
                        c.status === "active"
                          ? "chip-success"
                          : c.status === "scheduled"
                          ? "chip-info"
                          : "chip"
                      }
                    >
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="glass p-5">
        <div className="flex items-center gap-2 mb-4">
          <Tag size={18} className="text-accent-pink" />
          <div className="section-title">Campaigns</div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {CAMPAIGNS.map((c) => (
            <div key={c.name} className="glass !bg-bg-800/60 p-4">
              <div className="flex items-start justify-between">
                <div className="text-white font-semibold">{c.name}</div>
                <span
                  className={c.status === "live" ? "chip-success" : "chip"}
                >
                  {c.status}
                </span>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="text-xs text-ink-300">Reach</div>
                  <div className="text-white font-bold">{c.reach}</div>
                </div>
                <div>
                  <div className="text-xs text-ink-300">CTR</div>
                  <div className="text-white font-bold">{c.ctr}</div>
                </div>
                <div>
                  <div className="text-xs text-ink-300">Revenue</div>
                  <div className="text-white font-bold">{c.revenue}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
