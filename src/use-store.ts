import { useContext } from "react";
import { StoreCtx } from "./store-ctx";

export function useStore() {
  const s = useContext(StoreCtx);
  if (!s) throw new Error("useStore outside StoreProvider");
  return s;
}
