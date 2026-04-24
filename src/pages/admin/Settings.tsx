import { useState } from "react";

export default function AdminSettings() {
  const [shipping, setShipping] = useState(130);
  const [cod, setCod] = useState(20);
  const [bkash, setBkash] = useState(true);
  const [nagad, setNagad] = useState(true);
  const [card, setCard] = useState(true);

  return (
    <div className="space-y-5 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-white">System Settings</h1>
        <p className="text-sm text-ink-300">
          Configure shipping, payments, and store info.
        </p>
      </div>

      <div className="glass p-5 space-y-4">
        <div className="section-title">Shipping</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-ink-300">
              Flat shipping rate (BDT)
            </label>
            <input
              type="number"
              className="input"
              value={shipping}
              onChange={(e) => setShipping(Number(e.target.value))}
            />
          </div>
          <div>
            <label className="text-xs text-ink-300">
              Cash-on-delivery fee (BDT)
            </label>
            <input
              type="number"
              className="input"
              value={cod}
              onChange={(e) => setCod(Number(e.target.value))}
            />
          </div>
        </div>
      </div>

      <div className="glass p-5 space-y-3">
        <div className="section-title">Payment methods</div>
        {[
          { k: "bkash", label: "bKash", v: bkash, set: setBkash },
          { k: "nagad", label: "Nagad", v: nagad, set: setNagad },
          { k: "card", label: "Card (SSLCommerz)", v: card, set: setCard },
        ].map((row) => (
          <label
            key={row.k}
            className="flex items-center justify-between p-3 rounded-xl bg-bg-800 border border-bg-border cursor-pointer"
          >
            <span className="text-white">{row.label}</span>
            <input
              type="checkbox"
              checked={row.v}
              onChange={(e) => row.set(e.target.checked)}
              className="w-4 h-4 accent-brand-400"
            />
          </label>
        ))}
      </div>

      <div className="glass p-5 space-y-4">
        <div className="section-title">Store info</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-ink-300">Store name</label>
            <input className="input" defaultValue="BM SHOP" />
          </div>
          <div>
            <label className="text-xs text-ink-300">Support email</label>
            <input className="input" defaultValue="support@bmshop.com" />
          </div>
          <div>
            <label className="text-xs text-ink-300">Phone</label>
            <input className="input" defaultValue="+8801712345678" />
          </div>
          <div>
            <label className="text-xs text-ink-300">Currency</label>
            <input className="input" defaultValue="BDT" />
          </div>
        </div>
        <div className="flex justify-end">
          <button className="btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  );
}
