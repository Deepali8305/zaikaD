import { createFileRoute, Link } from "@tanstack/react-router";
import { useCart } from "@/lib/cart";
import { formatCurrency } from "@/lib/order-rules";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — Chaska" },
      {
        name: "description",
        content: "Review the items in your Chaska cart before placing your order.",
      },
      { property: "og:title", content: "Your Cart — Chaska" },
      { property: "og:description", content: "Review your items and proceed to order." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { detailed, total, setQty, remove } = useCart();

  return (
    <div className="container-page py-10">
      <h1 className="font-display text-3xl font-semibold sm:text-4xl">Your Cart</h1>

      {detailed.length === 0 ? (
        <div className="card-surface mt-8 p-8 text-center">
          <p className="text-muted-foreground">Your cart is empty.</p>
          <Link to="/menu" className="btn-base btn-primary btn-primary-hover mt-5">
            Browse the Menu
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_20rem]">
          <ul className="space-y-3">
            {detailed.map((line) => (
              <li
                key={line.id}
                className="card-surface flex flex-wrap items-center justify-between gap-4 p-4"
              >
                <div>
                  <p className="font-semibold">{line.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatCurrency(line.price)} each
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 rounded-full border border-border p-1">
                    <button
                      type="button"
                      aria-label={`Decrease quantity of ${line.name}`}
                      onClick={() => setQty(line.id, line.qty - 1)}
                      className="grid size-7 place-items-center rounded-full hover:bg-muted"
                    >
                      −
                    </button>
                    <span className="w-6 text-center text-sm font-medium">{line.qty}</span>
                    <button
                      type="button"
                      aria-label={`Increase quantity of ${line.name}`}
                      onClick={() => setQty(line.id, line.qty + 1)}
                      className="grid size-7 place-items-center rounded-full hover:bg-muted"
                    >
                      +
                    </button>
                  </div>
                  <span className="w-20 text-right font-semibold">
                    {formatCurrency(line.subtotal)}
                  </span>
                  <button
                    type="button"
                    onClick={() => remove(line.id)}
                    className="text-sm font-medium text-destructive hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <aside className="card-surface h-fit p-5">
            <h2 className="text-lg font-semibold">Order summary</h2>
            <dl className="mt-4 space-y-2 text-sm">
              {detailed.map((line) => (
                <div key={line.id} className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">
                    {line.name} × {line.qty}
                  </dt>
                  <dd>{formatCurrency(line.subtotal)}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-4 flex justify-between border-t border-border pt-4 text-base font-semibold">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
            <Link to="/order" className="btn-base btn-primary btn-primary-hover mt-5 w-full">
              Proceed to Order
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}
