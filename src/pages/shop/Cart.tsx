import { Link } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useStore } from "../../use-store";

function fmt(n: number) {
  return `৳${n.toLocaleString("en-BD")}`;
}

export default function Cart() {
  const { cart, products, setQty, removeFromCart, cartSubtotal } = useStore();
  const SHIPPING = 130;

  if (cart.length === 0)
    return (
      <div className="glass p-10 text-center">
        <div className="text-xl text-white mb-3">Your cart is empty</div>
        <Link to="/" className="btn-primary">
          Continue shopping
        </Link>
      </div>
    );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 glass p-4">
        <h1 className="text-xl font-bold text-white mb-4">Your cart</h1>
        <div className="space-y-3">
          {cart.map((c) => {
            const p = products.find((x) => x.id === c.productId)!;
            return (
              <div
                key={c.productId}
                className="flex items-center gap-3 p-3 rounded-xl bg-bg-800 border border-bg-border"
              >
                <img
                  src={p.image}
                  alt=""
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-white truncate">{p.name}</div>
                  <div className="text-xs text-ink-300">{p.category}</div>
                  <div className="text-white font-bold mt-1">
                    {fmt(p.price)}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    className="btn-ghost !px-2 !py-1"
                    onClick={() => setQty(c.productId, c.qty - 1)}
                  >
                    <Minus size={12} />
                  </button>
                  <div className="w-8 text-center">{c.qty}</div>
                  <button
                    className="btn-ghost !px-2 !py-1"
                    onClick={() => setQty(c.productId, c.qty + 1)}
                  >
                    <Plus size={12} />
                  </button>
                </div>
                <button
                  className="btn-ghost !px-2 !py-1"
                  onClick={() => removeFromCart(c.productId)}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <aside className="glass p-5 h-fit sticky top-20">
        <div className="section-title mb-3">Summary</div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-ink-300">Subtotal</span>
            <span className="text-white">{fmt(cartSubtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-ink-300">Shipping</span>
            <span className="text-white">{fmt(SHIPPING)}</span>
          </div>
          <div className="flex justify-between text-base font-bold border-t border-bg-border pt-2 mt-2">
            <span className="text-white">Total</span>
            <span className="text-white">{fmt(cartSubtotal + SHIPPING)}</span>
          </div>
        </div>
        <Link to="/checkout" className="btn-primary w-full mt-4">
          Proceed to checkout
        </Link>
      </aside>
    </div>
  );
}
