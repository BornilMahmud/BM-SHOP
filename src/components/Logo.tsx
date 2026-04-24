export default function Logo({ size = 28 }: { size?: number }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className="rounded-xl bg-brand-gradient shadow-glow flex items-center justify-center text-white font-bold"
        style={{ width: size, height: size, fontSize: size * 0.5 }}
      >
        B
      </div>
      <div className="leading-tight">
        <div className="text-white font-bold tracking-wide">BM SHOP</div>
        <div className="text-[10px] text-ink-300 uppercase tracking-widest">
          Admin Suite
        </div>
      </div>
    </div>
  );
}
