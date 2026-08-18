import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getMenuItem } from "@/data/menu";

export type CartLine = { id: string; qty: number };

type CartContextValue = {
  lines: CartLine[];
  detailed: { id: string; name: string; price: number; qty: number; subtotal: number }[];
  count: number;
  total: number;
  add: (id: string, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "zck-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setLines(JSON.parse(raw) as CartLine[]);
    } catch {
      /* ignore corrupt storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* storage unavailable */
    }
  }, [lines, hydrated]);

  const value = useMemo<CartContextValue>(() => {
    const detailed = lines
      .map((line) => {
        const item = getMenuItem(line.id);
        if (!item || item.price === null) return null;
        return {
          id: line.id,
          name: item.name,
          price: item.price,
          qty: line.qty,
          subtotal: item.price * line.qty,
        };
      })
      .filter((v): v is NonNullable<typeof v> => v !== null);

    return {
      lines,
      detailed,
      count: detailed.reduce((sum, l) => sum + l.qty, 0),
      total: detailed.reduce((sum, l) => sum + l.subtotal, 0),
      add: (id, qty = 1) =>
        setLines((prev) => {
          const existing = prev.find((l) => l.id === id);
          if (existing) {
            return prev.map((l) => (l.id === id ? { ...l, qty: l.qty + qty } : l));
          }
          return [...prev, { id, qty }];
        }),
      setQty: (id, qty) =>
        setLines((prev) =>
          qty <= 0
            ? prev.filter((l) => l.id !== id)
            : prev.map((l) => (l.id === id ? { ...l, qty } : l)),
        ),
      remove: (id) => setLines((prev) => prev.filter((l) => l.id !== id)),
      clear: () => setLines([]),
    };
  }, [lines]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
