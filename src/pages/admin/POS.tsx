import { useMemo, useState } from "react";
import { Minus, Plus, Trash2, ScanBarcode } from "lucide-react";
import { products } from "../../data/mock";

function fmt(n: number) {
  return `৳${n.toLocaleString("en-BD")}`;
}

interface Line {
  productId: string;
  qty: number;
}

export default function AdminPOS() {
  const [q, setQ] = useState("");
  const [lines, setLines] = useState<Line[]>([]);
  const [receipt, setReceipt] = useState<{
    id: string;
    total: number;
  } | null>(null);

  const results = useMemo(() => {
    if (!q) return products.slice(0, 12);
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q.toLowerCase()) ||
          p.sku.toLowerCase().includes(q.toLowerCase())
      )
      .slice(0, 12);
  }, [q]);

  function add(id: string) {
    setLines((prev) => {
      const idx = prev.findIndex((l) => l.productId === id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + 1 };
        return next;
      }
      return [...prev, { productId: id, qty: 1 }];
    });
  }
  function inc(id: string, d: number) {
    setLines((prev) =>
      prev
        .map((l) => (l.productId === id ? { ...l, qty: l.qty + d } : l))
        .filter((l) => l.qty > 0)
    );
  }
  function remove(id: string) {
    setLines((prev) => prev.filter((l) => l.productId !== id));
  }

  const subtotal = lines.reduce((s, l) => {
    const p = products.find((p) => p.id === l.productId)!;
    return s + p.price * l.qty;
  }, 0);
  const vat = Math.round(subtotal * 0.05);
  const total = subtotal + vat;

  function checkout() {
    if (lines.length === 0) return;
    const id = `POS-${Math.floor(10000 + Math.random() * 90000)}`;
    setReceipt({ id, total });
    setLines([]);
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
      <div className="xl:col-span-2 space-y-5">
        <div>
          <h1 className="text-2xl font-bold text-white">Point of Sale</h1>
          <p className="text-sm text-ink-300">
            Scan, search, and checkout customers in-store.
          </p>
        </div>
        <div className="glass p-4">
          <div className="relative">
            <ScanBarcode
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400"
            />
            <input
              autoFocus
              className="input pl-9"
              placeholder="Scan barcode or search by name / SKU…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {results.map((p) => (
            <button
              key={p.id}
              onClick={() => add(p.id)}
              className="glass p-3 glass-hover text-left"
            >
              <img
                src={p.image}
                alt=""
                className="aspect-square w-full rounded-xl object-cover mb-2"
              />
              <div className="text-sm text-white truncate">{p.name}</div>
              <div className="text-xs text-ink-300">{p.sku}</div>
              <div className="text-white font-bold mt-1">{fmt(p.price)}</div>
            </button>
          ))}
        </div>
      </div>

      <aside className="glass p-5 h-fit sticky top-20">
        <div className="section-title mb-3">Cart</div>
        {lines.length === 0 && (
          <div className="text-sm text-ink-300">
            Scan or click a product to add it.
          </div>
        )}
        <div className="space-y-3 max-h-[50vh] overflow-y-auto">
          {lines.map((l) => {
            const p = products.find((p) => p.id === l.productId)!;
            return (
              <div key={l.productId} className="flex items-center gap-3">
                <img
                  src={p.image}
                  alt=""
                  className="w-10 h-10 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-white truncate">{p.name}</div>
                  <div className="text-xs text-ink-300">{fmt(p.price)}</div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => inc(l.productId, -1)}
                    className="btn-ghost !px-2 !py-1"
                  >
                    <Minus size={12} />
                  </button>
                  <div className="w-6 text-center text-sm">{l.qty}</div>
                  <button
                    onClick={() => inc(l.productId, 1)}
                    className="btn-ghost !px-2 !py-1"
                  >
                    <Plus size={12} />
                  </button>
                </div>
                <button
                  onClick={() => remove(l.productId)}
                  className="btn-ghost !px-2 !py-1"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            );
          })}
        </div>

        <div className="mt-4 space-y-2 border-t border-bg-border pt-4">
          <div className="flex justify-between text-sm">
            <span className="text-ink-300">Subtotal</span>
            <span className="text-white">{fmt(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-ink-300">VAT (5%)</span>
            <span className="text-white">{fmt(vat)}</span>
          </div>
          <div className="flex justify-between text-base font-bold">
            <span className="text-white">Total</span>
            <span className="text-white">{fmt(total)}</span>
          </div>
          <button
            className="btn-primary w-full mt-2"
            disabled={lines.length === 0}
            onClick={checkout}
          >
            Checkout · {fmt(total)}
          </button>
        </div>

        {receipt && (
          <div className="mt-4 p-3 rounded-xl bg-accent-green/10 border border-accent-green/30 text-accent-green text-sm">
            ✓ Receipt {receipt.id} issued · {fmt(receipt.total)}
          </div>
        )}
      </aside>
    </div>
  );
}
