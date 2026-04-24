import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../use-store";

function fmt(n: number) {
  return `৳${n.toLocaleString("en-BD")}`;
}

export default function Checkout() {
  const { cart, products, cartSubtotal, clearCart } = useStore();
  const navigate = useNavigate();
  const [payment, setPayment] = useState<"cod" | "bkash" | "card">("cod");
  const SHIPPING = 130;
  const COD_FEE = payment === "cod" ? 20 : 0;
  const total = cartSubtotal + SHIPPING + COD_FEE;

  function place(e: React.FormEvent) {
    e.preventDefault();
    const id = `ORD-${Math.floor(10000 + Math.random() * 90000)}`;
    clearCart();
    navigate(`/order/${id}`);
  }

  if (cart.length === 0) {
    return (
      <div className="glass p-10 text-center">
        <div className="text-xl text-white mb-3">Nothing to checkout</div>
        <button className="btn-primary" onClick={() => navigate("/")}>
          Back to shop
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <form onSubmit={place} className="lg:col-span-2 space-y-4">
        <div className="glass p-5">
          <div className="section-title mb-3">Shipping details</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input className="input" placeholder="Full name" required />
            <input
              className="input"
              placeholder="Phone (+8801…)"
              required
            />
            <input className="input sm:col-span-2" placeholder="Address" required />
            <input className="input" placeholder="City" required />
            <input className="input" placeholder="Postcode" />
          </div>
        </div>

        <div className="glass p-5 space-y-2">
          <div className="section-title mb-2">Payment method</div>
          {(
            [
              { k: "cod", label: "Cash on Delivery (+৳20)" },
              { k: "bkash", label: "bKash" },
              { k: "card", label: "Card" },
            ] as const
          ).map((opt) => (
            <label
              key={opt.k}
              className={
                payment === opt.k
                  ? "flex items-center gap-3 p-3 rounded-xl border border-brand-400/60 bg-brand-gradient/10 cursor-pointer"
                  : "flex items-center gap-3 p-3 rounded-xl border border-bg-border cursor-pointer"
              }
            >
              <input
                type="radio"
                name="pay"
                checked={payment === opt.k}
                onChange={() => setPayment(opt.k)}
                className="accent-brand-400"
              />
              <span className="text-white">{opt.label}</span>
            </label>
          ))}
        </div>

        <button type="submit" className="btn-primary w-full">
          Place order · {fmt(total)}
        </button>
      </form>

      <aside className="glass p-5 h-fit sticky top-20">
        <div className="section-title mb-3">Order summary</div>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {cart.map((c) => {
            const p = products.find((x) => x.id === c.productId)!;
            return (
              <div key={c.productId} className="flex justify-between text-sm">
                <span className="text-ink-200 truncate pr-2">
                  {p.name} × {c.qty}
                </span>
                <span className="text-white">{fmt(p.price * c.qty)}</span>
              </div>
            );
          })}
        </div>
        <div className="border-t border-bg-border pt-3 mt-3 space-y-1.5 text-sm">
          <div className="flex justify-between">
            <span className="text-ink-300">Subtotal</span>
            <span className="text-white">{fmt(cartSubtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-ink-300">Shipping</span>
            <span className="text-white">{fmt(SHIPPING)}</span>
          </div>
          {COD_FEE > 0 && (
            <div className="flex justify-between">
              <span className="text-ink-300">COD fee</span>
              <span className="text-white">{fmt(COD_FEE)}</span>
            </div>
          )}
          <div className="flex justify-between text-base font-bold border-t border-bg-border pt-2">
            <span className="text-white">Total</span>
            <span className="text-white">{fmt(total)}</span>
          </div>
        </div>
      </aside>
    </div>
  );
}
