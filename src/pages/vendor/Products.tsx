import { products } from "../../data/mock";

function fmt(n: number) {
  return `৳${n.toLocaleString("en-BD")}`;
}

export default function VendorProducts() {
  const mine = products.slice(0, 12);
  return (
    <div className="space-y-5">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">My products</h1>
          <p className="text-sm text-ink-300">{mine.length} items listed</p>
        </div>
        <button className="btn-primary">Add product</button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {mine.map((p) => (
          <div key={p.id} className="glass p-3">
            <div className="aspect-square rounded-xl overflow-hidden mb-2 bg-bg-800">
              <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
            </div>
            <div className="text-xs text-ink-300">{p.category}</div>
            <div className="text-sm text-white font-medium line-clamp-1">{p.name}</div>
            <div className="flex items-center justify-between mt-1">
              <div className="text-sm text-white font-semibold">{fmt(p.price)}</div>
              <div className="text-xs text-ink-300">Stock: {p.stock}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
