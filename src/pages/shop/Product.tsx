import { Link, useParams, useNavigate } from "react-router-dom";
import { useStore } from "../../use-store";
import { Star, ShoppingCart, Truck, ShieldCheck } from "lucide-react";

function fmt(n: number) {
  return `৳${n.toLocaleString("en-BD")}`;
}

export default function ProductPage() {
  const { id } = useParams();
  const { products, addToCart } = useStore();
  const navigate = useNavigate();
  const p = products.find((x) => x.id === id);
  if (!p)
    return (
      <div className="glass p-8 text-center">
        <div className="text-lg text-white mb-2">Product not found</div>
        <Link to="/" className="btn-primary">
          Go home
        </Link>
      </div>
    );
  const related = products
    .filter((x) => x.category === p.category && x.id !== p.id)
    .slice(0, 4);
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass p-4">
          <div className="aspect-square rounded-xl overflow-hidden bg-bg-800">
            <img
              src={p.image}
              alt={p.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <div className="text-xs text-ink-300 uppercase tracking-wider">
              {p.category}
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mt-1">
              {p.name}
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-0.5 text-accent-orange">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>
              <span className="text-xs text-ink-300">
                {120 + (p.sales % 300)} reviews
              </span>
            </div>
          </div>

          <div className="text-3xl font-extrabold text-white">
            {fmt(p.price)}
          </div>

          <p className="text-ink-200 leading-relaxed">
            Premium {p.name.toLowerCase()} crafted for everyday use. Fast
            delivery within 2-3 business days. 7-day easy returns. COD
            available nationwide.
          </p>

          <div className="flex items-center gap-3">
            <button
              onClick={() => addToCart(p.id)}
              className="btn-primary flex-1"
            >
              <ShoppingCart size={16} /> Add to cart
            </button>
            <button
              onClick={() => {
                addToCart(p.id);
                navigate("/checkout");
              }}
              className="btn-ghost flex-1"
            >
              Buy now
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="glass p-3 flex items-center gap-2 text-sm">
              <Truck size={16} className="text-brand-200" /> COD available
            </div>
            <div className="glass p-3 flex items-center gap-2 text-sm">
              <ShieldCheck size={16} className="text-accent-green" /> 7-day
              returns
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-white mb-4">
            You may also like
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {related.map((r) => (
              <Link
                key={r.id}
                to={`/product/${r.id}`}
                className="glass p-3 glass-hover"
              >
                <div className="aspect-square rounded-xl overflow-hidden mb-2 bg-bg-800">
                  <img
                    src={r.image}
                    alt={r.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-sm text-white truncate">{r.name}</div>
                <div className="text-white font-bold">{fmt(r.price)}</div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
