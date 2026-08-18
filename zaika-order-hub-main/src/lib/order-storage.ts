import type { OrderType } from "./order-rules";

export type PlacedOrder = {
  orderId: string;
  orderType: OrderType;
  name: string;
  phone: string;
  email: string;
  items: { name: string; qty: number; price: number; subtotal: number }[];
  total: number;
  orderDate: string;
  orderTime: string;
  scheduledDate: string;
  scheduledTime: string;
  minimumServingTime: string;
  paymentMethod: string;
  paymentStatus: string;
  orderStatus: string;
  instructions: string;
};

const KEY = "zck-last-order";

export function saveOrder(order: PlacedOrder) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(order));
  } catch {
    /* ignore */
  }
}

export function loadOrder(): PlacedOrder | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as PlacedOrder) : null;
  } catch {
    return null;
  }
}

export function nextSequence(): number {
  try {
    const today = new Date().toDateString();
    const raw = localStorage.getItem("zck-seq");
    const parsed = raw ? (JSON.parse(raw) as { day: string; n: number }) : null;
    const n = parsed && parsed.day === today ? parsed.n + 1 : 1;
    localStorage.setItem("zck-seq", JSON.stringify({ day: today, n }));
    return n;
  } catch {
    return 1;
  }
}
