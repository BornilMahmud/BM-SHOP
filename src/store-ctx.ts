import { createContext } from "react";
import type { CartItem, Product } from "./types";

export interface StoreState {
  products: Product[];
  cart: CartItem[];
  addToCart: (productId: string, qty?: number) => void;
  removeFromCart: (productId: string) => void;
  setQty: (productId: string, qty: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
}

export const StoreCtx = createContext<StoreState | null>(null);
