import { Link, NavLink, Outlet } from "react-router-dom";
import { ShoppingCart, User } from "lucide-react";
import Logo from "../components/Logo";
import { useStore } from "../use-store";

export default function ShopLayout() {
  const { cartCount } = useStore();
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-20 backdrop-blur-xl bg-bg-900/70 border-b border-bg-border">
        <div className="max-w-7xl mx-auto flex items-center gap-4 px-4 lg:px-8 h-16">
          <Link to="/">
            <Logo />
          </Link>
          <nav className="hidden md:flex items-center gap-6 ml-6 text-sm text-ink-200">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? "text-white" : "hover:text-white"
              }
            >
              Home
            </NavLink>
            <a className="hover:text-white cursor-pointer">Categories</a>
            <a className="hover:text-white cursor-pointer">Deals</a>
            <a className="hover:text-white cursor-pointer">About</a>
          </nav>
          <div className="flex-1" />
          <Link to="/admin" className="btn-ghost hidden md:inline-flex">
            Admin
          </Link>
          <button className="btn-ghost !px-2.5" aria-label="Account">
            <User size={16} />
          </button>
          <Link
            to="/cart"
            className="relative btn-ghost !px-2.5"
            aria-label="Cart"
          >
            <ShoppingCart size={16} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent-pink text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </header>
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
          <Outlet />
        </div>
      </main>
      <footer className="border-t border-bg-border py-6 text-center text-xs text-ink-300">
        © {new Date().getFullYear()} BM SHOP · Built with React + Vite +
        Tailwind
      </footer>
    </div>
  );
}
