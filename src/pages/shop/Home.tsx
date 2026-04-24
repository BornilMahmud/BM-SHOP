import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { useStore } from "../../use-store";
import { Sparkles, Flame, Star, ShoppingBag } from "lucide-react";

function fmt(n: number) {
  return `৳${n.toLocaleString("en-BD")}`;
}

export default function Home() {
  const { products, addToCart } = useStore();
  const [cat, setCat] = useState("All");
  const cats = useMemo(
    () => ["All", ...Array.from(new Set(products.map((p) => p.category)))],
    [products]
  );
  const trending = products.slice(0, 8);
  const list = useMemo(
    () =>
      cat === "All" ? products : products.filter((p) => p.category === cat),
    [cat, products]
  );
  return (
    <div className="space-y-10">
      <section className="glass p-8 md:p-12 relative overflow-hidden">
        <div className="absolute -right-24 -top-24 w-80 h-80 rounded-full bg-brand-gradient opacity-30 blur-3xl" />
        <div className="relative max-w-2xl">
          <span className="chip-info mb-4 inline-flex">
            <Sparkles size={12} /> New season deals
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
            Shop smarter with{" "}
            <span className="bg-brand-gradient bg-clip-text text-transparent">
              BM SHOP
            </span>
          </h1>
          <p className="text-ink-200 mt-3 text-lg">
            Thousands of products, fast COD delivery across Bangladesh, and
            exclusive offers every week.
          </p>
          <div className="flex gap-3 mt-6">
            <a href="#trending" className="btn-primary">
              <ShoppingBag size={16} /> Shop trending
            </a>
            <Link to="/admin" className="btn-ghost">
              Admin dashboard
            </Link>
          </div>
        </div>
      </section>

      <section id="trending">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Flame className="text-accent-pink" size={18} />
            <h2 className="text-xl font-bold text-white">Trending now</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {trending.map((p) => (
            <Link
              key={p.id}
              to={`/product/${p.id}`}
              className="glass p-3 glass-hover block"
            >
              <div className="aspect-square rounded-xl overflow-hidden mb-2 bg-bg-800">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-xs text-ink-300">{p.category}</div>
              <div className="text-white font-semibold truncate">{p.name}</div>
              <div className="flex items-center justify-between mt-1">
                <div className="text-white font-bold">{fmt(p.price)}</div>
                <div className="flex items-center gap-0.5 text-accent-orange text-xs">
                  <Star size={12} fill="currentColor" /> 4.{5 + (p.sales % 4)}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <h2 className="text-xl font-bold text-white">All products</h2>
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {list.map((p) => (
            <div key={p.id} className="glass p-3 glass-hover">
              <Link to={`/product/${p.id}`}>
                <div className="aspect-square rounded-xl overflow-hidden mb-2 bg-bg-800">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-xs text-ink-300">{p.category}</div>
                <div className="text-white font-semibold truncate">{p.name}</div>
              </Link>
              <div className="flex items-center justify-between mt-2">
                <div className="text-white font-bold">{fmt(p.price)}</div>
                <button
                  onClick={() => addToCart(p.id)}
                  className="btn-primary !px-3 !py-1.5 text-xs"
                >
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
