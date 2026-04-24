import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { products } from "../../data/mock";

function fmt(n: number) {
  return `৳${n.toLocaleString("en-BD")}`;
}

export default function UserWishlist() {
  const wishlist = products.slice(0, 6);
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-white">Wishlist</h1>
        <p className="text-sm text-ink-300">
          Items you've saved for later ({wishlist.length})
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {wishlist.map((p) => (
          <Link
            to={`/product/${p.id}`}
            key={p.id}
            className="glass p-3 glass-hover block"
          >
            <div className="aspect-square rounded-xl overflow-hidden mb-2 bg-bg-800">
              <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="text-xs text-ink-300">{p.category}</div>
                <div className="text-sm text-white font-medium line-clamp-1">
                  {p.name}
                </div>
                <div className="text-sm text-white font-semibold">{fmt(p.price)}</div>
              </div>
              <Heart size={16} className="text-accent-pink shrink-0 mt-1" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
