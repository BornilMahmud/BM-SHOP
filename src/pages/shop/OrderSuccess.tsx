import { Link, useParams } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

export default function OrderSuccess() {
  const { id } = useParams();
  return (
    <div className="glass p-10 text-center max-w-xl mx-auto">
      <div className="mx-auto w-16 h-16 rounded-full bg-accent-green/15 border border-accent-green/40 flex items-center justify-center mb-4">
        <CheckCircle2 size={28} className="text-accent-green" />
      </div>
      <h1 className="text-2xl font-bold text-white">Order placed!</h1>
      <p className="text-ink-200 mt-2">
        Your order <span className="font-mono text-white">{id}</span> is
        confirmed. We'll send updates to your phone.
      </p>
      <div className="flex gap-2 justify-center mt-5">
        <Link to="/" className="btn-primary">
          Continue shopping
        </Link>
        <Link to="/admin/orders" className="btn-ghost">
          Track in admin
        </Link>
      </div>
    </div>
  );
}
