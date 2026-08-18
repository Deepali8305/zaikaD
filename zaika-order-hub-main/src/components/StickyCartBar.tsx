import { Link } from "@tanstack/react-router";
import { useCart } from "@/lib/cart";
import { formatCurrency } from "@/lib/order-rules";

export function StickyCartBar() {
  const { count, total } = useCart();
  if (count === 0) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card p-3 shadow-lift md:hidden">
      <Link
        to="/cart"
        className="btn-base btn-primary btn-primary-hover flex w-full justify-between"
      >
        <span>
          {count} {count === 1 ? "Item" : "Items"} | {formatCurrency(total)}
        </span>
        <span>View Cart</span>
      </Link>
    </div>
  );
}
