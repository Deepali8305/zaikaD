import { useState, useRef, useEffect } from "react";
import type { MenuItem } from "@/data/menu";
import { useCart } from "@/lib/cart";
import { formatCurrency } from "@/lib/order-rules";

export function MenuCard({ item }: { item: MenuItem }) {
  const { add, lines, setQty } = useCart();
  const cardRef = useRef<HTMLDivElement>(null);

  // Find if this item is already in the cart
  const cartLine = lines.find((l) => l.id === item.id);
  const inCart = !!cartLine;
  const cartQty = cartLine?.qty ?? 0;

  // Local quantity (used only BEFORE first add-to-cart)
  const [localQty, setLocalQty] = useState(1);
  const [showFlyout, setShowFlyout] = useState(false);
  const [flyoutAnimation, setFlyoutAnimation] = useState(false);

  const orderable = item.available && item.price !== null;
  const displayQty = inCart ? cartQty : localQty;

  function handleDecrease() {
    if (inCart) {
      setQty(item.id, cartQty - 1); // setQty handles qty<=0 as remove
    } else {
      setLocalQty((q) => Math.max(1, q - 1));
    }
  }

  function handleIncrease() {
    if (inCart) {
      setQty(item.id, Math.min(20, cartQty + 1));
    } else {
      setLocalQty((q) => Math.min(20, q + 1));
    }
  }

  function handleAddToCart() {
    add(item.id, localQty);
    setLocalQty(1);

    // Trigger flyout card animation
    setShowFlyout(true);
    setFlyoutAnimation(true);
    setTimeout(() => setFlyoutAnimation(false), 600);
    setTimeout(() => setShowFlyout(false), 800);
  }

  return (
    <article ref={cardRef} className="card-surface relative flex flex-col overflow-hidden">
      {/* Flyout animation overlay - mimics food app "added to cart" card */}
      {showFlyout && (
        <div
          className={`absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-primary/90 transition-all duration-500 ${
            flyoutAnimation
              ? "scale-100 opacity-100"
              : "scale-75 opacity-0 -translate-y-6"
          }`}
        >
          <div className="flex flex-col items-center text-primary-foreground">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className="size-10 animate-[bounceIn_0.4s_ease-out]"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
            <p className="mt-2 font-display text-lg font-semibold">Added to Cart!</p>
            <p className="text-sm opacity-90">{item.name} × {inCart ? cartQty : localQty}</p>
          </div>
        </div>
      )}

      <img
        src={item.image}
        alt={item.name}
        loading="lazy"
        width={768}
        height={576}
        className="aspect-[4/3] w-full object-cover"
      />
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-base font-semibold">{item.name}</h3>
            {inCart && (
              <span className="shrink-0 inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-3">
                  <circle cx="9" cy="20" r="1" />
                  <circle cx="18" cy="20" r="1" />
                  <path d="M2 3h2l2.6 12.4a1 1 0 0 0 1 .8h9.7a1 1 0 0 0 1-.8L20 7H6" />
                </svg>
                In Cart
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <span className="font-display text-lg font-semibold">
            {item.price === null ? "Price on request" : formatCurrency(item.price)}
          </span>
          {orderable && (
            <div className="flex items-center gap-1 rounded-full border border-border p-1">
              <button
                type="button"
                onClick={handleDecrease}
                aria-label={`Decrease quantity of ${item.name}`}
                className="grid size-7 place-items-center rounded-full hover:bg-muted"
              >
                −
              </button>
              <span aria-live="polite" className="w-6 text-center text-sm font-medium">
                {displayQty}
              </span>
              <button
                type="button"
                onClick={handleIncrease}
                aria-label={`Increase quantity of ${item.name}`}
                className="grid size-7 place-items-center rounded-full hover:bg-muted"
              >
                +
              </button>
            </div>
          )}
        </div>

        {orderable ? (
          inCart ? (
            <div className="flex items-center gap-2">
              <span className="flex-1 text-center text-sm font-medium text-primary">
                {cartQty} in cart · {formatCurrency((item.price ?? 0) * cartQty)}
              </span>
              <button
                type="button"
                className="btn-base btn-soft px-4 py-2 text-sm"
                onClick={handleAddToCart}
              >
                + Add More
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="btn-base btn-primary btn-primary-hover w-full"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          )
        ) : (
          <button
            type="button"
            disabled
            className="btn-base btn-outline w-full cursor-not-allowed opacity-60"
          >
            Currently Unavailable
          </button>
        )}
      </div>
    </article>
  );
}
