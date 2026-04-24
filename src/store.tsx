import { useCallback, useMemo, useState, type ReactNode } from "react";
import type { CartItem } from "./types";
import { products as PRODUCTS } from "./data/mock";
import { StoreCtx, type StoreState } from "./store-ctx";

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = useCallback((productId: string, qty = 1) => {
    setCart((prev) => {
      const idx = prev.findIndex((c) => c.productId === productId);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + qty };
        return next;
      }
      return [...prev, { productId, qty }];
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart((prev) => prev.filter((c) => c.productId !== productId));
  }, []);

  const setQty = useCallback((productId: string, qty: number) => {
    setCart((prev) =>
      prev
        .map((c) => (c.productId === productId ? { ...c, qty } : c))
        .filter((c) => c.qty > 0)
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const cartCount = useMemo(
    () => cart.reduce((s, it) => s + it.qty, 0),
    [cart]
  );

  const cartSubtotal = useMemo(() => {
    return cart.reduce((sum, it) => {
      const p = PRODUCTS.find((pp) => pp.id === it.productId);
      return sum + (p ? p.price * it.qty : 0);
    }, 0);
  }, [cart]);

  const value: StoreState = {
    products: PRODUCTS,
    cart,
    addToCart,
    removeFromCart,
    setQty,
    clearCart,
    cartCount,
    cartSubtotal,
  };
  return <StoreCtx.Provider value={value}>{children}</StoreCtx.Provider>;
}
