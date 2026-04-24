import { useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import { products } from "../../data/mock";

function fmt(n: number) {
  return `৳${n.toLocaleString("en-BD")}`;
}

export default function AdminProducts() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const cats = useMemo(
    () => ["All", ...Array.from(new Set(products.map((p) => p.category)))],
    []
  );
  const list = useMemo(() => {
    return products.filter((p) => {
      if (cat !== "All" && p.category !== cat) return false;
      if (q && !p.name.toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    });
  }, [q, cat]);
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">Products</h1>
          <p className="text-sm text-ink-300">
            {products.length} total products · {list.length} matching
          </p>
        </div>
        <button className="btn-primary">
          <Plus size={16} /> Add product
        </button>
      </div>

      <div className="glass p-4 flex flex-wrap gap-2 items-center">
        <label className="relative flex-1 min-w-[220px]">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400"
          />
          <input
            className="input pl-9"
            placeholder="Search products…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </label>
        <div className="flex flex-wrap gap-1.5">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={
                c === cat
                  ? "chip bg-brand-gradient text-white border-transparent"
                  : "chip hover:border-brand-400/60"
              }
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {list.map((p) => (
          <div key={p.id} className="glass p-4 glass-hover">
            <div className="aspect-[4/3] rounded-xl overflow-hidden mb-3 bg-bg-800 relative">
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2">
                <span
                  className={
                    p.status === "active"
                      ? "chip-success"
                      : p.status === "draft"
                      ? "chip-warning"
                      : "chip-danger"
                  }
                >
                  {p.status}
                </span>
              </div>
            </div>
            <div className="text-xs text-ink-300">{p.category}</div>
            <div className="text-white font-semibold truncate">{p.name}</div>
            <div className="flex items-center justify-between mt-2">
              <div className="text-white font-bold">{fmt(p.price)}</div>
              <div
                className={p.stock < 15 ? "chip-warning" : "chip-info"}
              >
                Stock {p.stock}
              </div>
            </div>
            <div className="mt-3 flex gap-2">
              <button className="btn-ghost flex-1">Edit</button>
              <button className="btn-primary flex-1">View</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
