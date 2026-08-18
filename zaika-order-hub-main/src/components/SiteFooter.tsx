import { Link } from "@tanstack/react-router";
import { ORDER_WINDOW_TEXT } from "@/lib/order-rules";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border bg-surface">
      <div className="container-page grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <h2 className="font-display text-xl font-semibold">Zaika Cloud Kitchen</h2>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            Freshly prepared home-style meals, available for pre-booking and same-day ordering.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide">Ordering</h3>
          <p className="mt-2 text-sm text-muted-foreground">{ORDER_WINDOW_TEXT}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Same-day orders: minimum 2 hours serving time.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide">Quick links</h3>
          <ul className="mt-2 space-y-1 text-sm">
            <li>
              <Link to="/menu" className="text-muted-foreground hover:text-foreground">
                Menu
              </Link>
            </li>
            <li>
              <Link to="/cart" className="text-muted-foreground hover:text-foreground">
                Cart
              </Link>
            </li>
            <li>
              <Link to="/order" className="text-muted-foreground hover:text-foreground">
                Place an order
              </Link>
            </li>
            <li>
              <Link to="/reviews" className="text-muted-foreground hover:text-foreground">
                Reviews
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-muted-foreground hover:text-foreground">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Zaika Cloud Kitchen. All rights reserved.
      </div>
    </footer>
  );
}
