import { Link } from "@tanstack/react-router";
import { useCart } from "@/lib/cart";
import { formatCurrency } from "@/lib/order-rules";

const NAV: { to: "/" | "/menu" | "/order"; label: string; hash?: string }[] = [
  { to: "/", label: "Home" },
  { to: "/", hash: "about", label: "About" },
  { to: "/menu", label: "Menu" },
  { to: "/order", label: "Order" },
];

export function SiteHeader() {
  const { count, total } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/90 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2" aria-label="Chaska home">
          <span className="grid size-9 place-items-center rounded-full bg-primary text-primary-foreground font-display text-lg font-bold">
            C
          </span>
          <span className="leading-tight">
            <span className="block font-display text-base font-semibold">Chaska</span>
            <span className="block text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              Cloud Kitchen
            </span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              {...(item.hash ? { hash: item.hash } : {})}
              {...(item.hash
                ? {}
                : { activeProps: { className: "bg-accent text-accent-foreground" } })}
              className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link to="/cart" className="btn-base btn-primary btn-primary-hover px-4 py-2 text-sm">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-4"
          >
            <circle cx="9" cy="20" r="1" />
            <circle cx="18" cy="20" r="1" />
            <path d="M2 3h2l2.6 12.4a1 1 0 0 0 1 .8h9.7a1 1 0 0 0 1-.8L20 7H6" />
          </svg>
          <span>{count > 0 ? `${count} · ${formatCurrency(total)}` : "Cart"}</span>
        </Link>
      </div>
    </header>
  );
}
