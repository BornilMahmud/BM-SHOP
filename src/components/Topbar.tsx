import { Bell, Search, Sparkles } from "lucide-react";

interface Props {
  onOpenAI: () => void;
}

export default function Topbar({ onOpenAI }: Props) {
  return (
    <header className="sticky top-0 z-20 backdrop-blur-xl bg-bg-900/60 border-b border-bg-border">
      <div className="flex items-center gap-3 px-4 lg:px-8 h-16">
        <div className="flex-1 max-w-xl">
          <label className="relative block">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400"
            />
            <input
              placeholder="Search products, orders, customers…"
              className="input pl-9"
            />
          </label>
        </div>
        <button
          onClick={onOpenAI}
          className="btn-primary hidden md:inline-flex"
          aria-label="Open BM Smart Assistant"
        >
          <Sparkles size={16} />
          Ask BM Assistant
        </button>
        <button className="btn-ghost" aria-label="Notifications">
          <Bell size={16} />
        </button>
        <div className="w-9 h-9 rounded-full bg-brand-gradient flex items-center justify-center text-white font-semibold">
          A
        </div>
      </div>
    </header>
  );
}
