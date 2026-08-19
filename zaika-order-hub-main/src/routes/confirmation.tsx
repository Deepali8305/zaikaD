import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { loadOrder, type PlacedOrder } from "@/lib/order-storage";
import { formatCurrency, toWhatsAppNumber } from "@/lib/order-rules";

export const Route = createFileRoute("/confirmation")({
  head: () => ({
    meta: [
      { title: "Order Confirmed — Chaska" },
      {
        name: "description",
        content: "Your Chaska order invoice with items, total and serving time.",
      },
      { property: "og:title", content: "Order Confirmed — Chaska" },
      { property: "og:description", content: "Your order invoice and serving details." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ConfirmationPage,
});

function buildWhatsAppText(order: PlacedOrder) {
  const items = order.items.map((i) => `${i.name} × ${i.qty}`).join("\n");
  const timing =
    order.orderType === "SAME_DAY"
      ? `Requested Serving Time:\n${order.scheduledTime} (today)`
      : `Scheduled Date: ${order.scheduledDate}\nScheduled Time: ${order.scheduledTime}`;
  return `Your order from Chaska has been confirmed.

Order ID: ${order.orderId}

Order Type: ${order.orderType === "SAME_DAY" ? "Same Day" : "Pre-Order"}

Items:
${items}

Total: ${formatCurrency(order.total)}

${timing}

Payment: ${order.paymentMethod} (${order.paymentStatus})

Thank you for ordering from Chaska.`;
}

function ConfirmationPage() {
  const [order, setOrder] = useState<PlacedOrder | null>(null);
  const [ready, setReady] = useState(false);
  const autoOpenedRef = useRef(false);

  useEffect(() => {
    setOrder(loadOrder());
    setReady(true);
  }, []);

  // Automatically open WhatsApp with the invoice as soon as the order is confirmed,
  // so the invoice is ready to send to the customer's number right away.
  useEffect(() => {
    if (!order || autoOpenedRef.current) return;
    autoOpenedRef.current = true;
    const t = setTimeout(() => {
      const link = `https://wa.me/${toWhatsAppNumber(order.phone)}?text=${encodeURIComponent(
        buildWhatsAppText(order),
      )}`;
      window.open(link, "_blank", "noopener,noreferrer");
    }, 1200);
    return () => clearTimeout(t);
  }, [order]);

  if (!ready) {
    return (
      <div className="container-page py-16">
        <div className="card-surface h-48 animate-pulse" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container-page py-16 text-center">
        <h1 className="font-display text-3xl font-semibold">No recent order found</h1>
        <p className="mt-2 text-muted-foreground">
          Your order details are only available right after placing an order.
        </p>
        <Link to="/menu" className="btn-base btn-primary btn-primary-hover mt-6">
          Browse the Menu
        </Link>
      </div>
    );
  }

  const waLink = `https://wa.me/${toWhatsAppNumber(order.phone)}?text=${encodeURIComponent(
    buildWhatsAppText(order),
  )}`;

  return (
    <div className="container-page py-10 print:py-0">
      <div className="rounded-2xl border border-primary/30 bg-accent/60 p-5">
        <h1 className="font-display text-2xl font-semibold">Order confirmed</h1>
        <p className="mt-1 text-sm">
          Thank you, {order.name}. Your order <strong>{order.orderId}</strong> has been received.
        </p>
      </div>

      <section className="card-surface mt-6 p-6">
        <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border pb-4">
          <div>
            <h2 className="font-display text-xl font-semibold">Chaska</h2>
            <p className="text-sm text-muted-foreground">Order Invoice</p>
          </div>
          <div className="text-sm text-muted-foreground sm:text-right">
            <p>
              Order ID: <span className="font-medium text-foreground">{order.orderId}</span>
            </p>
            <p>
              Order Type:{" "}
              <span className="font-medium text-foreground">
                {order.orderType === "SAME_DAY" ? "Same Day" : "Pre-Order"}
              </span>
            </p>
          </div>
        </header>

        <div className="grid gap-6 py-5 sm:grid-cols-2">
          <div className="space-y-1 text-sm">
            <h3 className="text-sm font-semibold uppercase tracking-wide">Customer</h3>
            <p className="text-muted-foreground">{order.name}</p>
            <p className="text-muted-foreground">+91 {order.phone.replace(/\D/g, "").slice(-10)}</p>
            <p className="text-muted-foreground">{order.email}</p>
          </div>
          <div className="space-y-1 text-sm">
            <h3 className="text-sm font-semibold uppercase tracking-wide">Timing</h3>
            {order.orderType === "SAME_DAY" ? (
              <>
                <p className="text-muted-foreground">Order Time: {order.orderTime}</p>
                <p className="text-muted-foreground">
                  Requested Serving Time: {order.scheduledTime}
                </p>
                <p className="text-muted-foreground">
                  Minimum Serving Time: {order.minimumServingTime}
                </p>
              </>
            ) : (
              <>
                <p className="text-muted-foreground">Scheduled Date: {order.scheduledDate}</p>
                <p className="text-muted-foreground">Scheduled Time: {order.scheduledTime}</p>
              </>
            )}
            <p className="text-muted-foreground">Order Status: {order.orderStatus}</p>
          </div>
        </div>

        <table className="w-full border-t border-border text-sm">
          <thead>
            <tr className="text-left text-muted-foreground">
              <th className="py-2 font-medium">Item</th>
              <th className="py-2 text-center font-medium">Qty</th>
              <th className="py-2 text-right font-medium">Price</th>
              <th className="py-2 text-right font-medium">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item) => (
              <tr key={item.name} className="border-t border-border">
                <td className="py-2">{item.name}</td>
                <td className="py-2 text-center">{item.qty}</td>
                <td className="py-2 text-right">{formatCurrency(item.price)}</td>
                <td className="py-2 text-right">{formatCurrency(item.subtotal)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t border-border font-semibold">
              <td className="py-3" colSpan={3}>
                Total Amount
              </td>
              <td className="py-3 text-right">{formatCurrency(order.total)}</td>
            </tr>
          </tfoot>
        </table>

        <div className="mt-4 space-y-1 border-t border-border pt-4 text-sm text-muted-foreground">
          <p>Payment Method: {order.paymentMethod}</p>
          <p>Payment Status: {order.paymentStatus}</p>
          {order.instructions && <p>Special Instructions: {order.instructions}</p>}
        </div>
      </section>

      <div className="mt-6 space-y-3 print:hidden">
        <p className="rounded-2xl border border-primary/30 bg-accent/60 p-3 text-sm text-muted-foreground">
          We've opened WhatsApp with your invoice ready to send — just tap Send. If it didn't open,
          use the button below.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-base btn-primary btn-primary-hover"
          >
            Send invoice to my WhatsApp
          </a>
          <button type="button" onClick={() => window.print()} className="btn-base btn-outline">
            Print invoice
          </button>
          <Link to="/menu" className="btn-base btn-soft">
            Order something else
          </Link>
        </div>
      </div>
    </div>
  );
}
