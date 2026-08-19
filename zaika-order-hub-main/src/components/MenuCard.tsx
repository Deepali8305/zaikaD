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
  const [showDetails, setShowDetails] = useState(false);

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
        onClick={() => setShowDetails(true)}
        className="aspect-[4/3] w-full cursor-pointer object-cover transition-opacity hover:opacity-90"
      />
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3
              className="cursor-pointer text-base font-semibold hover:text-primary"
              onClick={() => setShowDetails(true)}
              title="View details"
            >
              {item.name}
            </h3>
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

      {showDetails && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="item-details-title"
          onClick={() => setShowDetails(false)}
        >
          <div
            className="card-surface max-h-[90vh] w-full max-w-md overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={item.image}
              alt={item.name}
              className="aspect-[4/3] w-full object-cover"
            />
            <div className="p-5">
              <div className="flex items-start justify-between gap-3">
                <h2 id="item-details-title" className="font-display text-xl font-semibold">
                  {item.name}
                </h2>
                <button
                  type="button"
                  onClick={() => setShowDetails(false)}
                  aria-label="Close details"
                  className="grid size-8 shrink-0 place-items-center rounded-full hover:bg-muted"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-5" aria-hidden="true">
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
              {item.description && (
                <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
              )}
              <p className="mt-3 font-display text-lg font-semibold">
                {item.price === null ? "Price on request" : formatCurrency(item.price)}
              </p>

              {item.included && item.included.length > 0 && (
                <div className="mt-4 border-t border-border pt-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wide">Included</h3>
                  <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                    {item.included.map((inc) => (
                      <li key={inc} className="flex items-start gap-2">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true">
                          <circle cx="12" cy="12" r="10" />
                          <path d="m9 12 2 2 4-4" />
                        </svg>
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {orderable ? (
                <button
                  type="button"
                  className="btn-base btn-primary btn-primary-hover mt-5 w-full"
                  onClick={() => {
                    handleAddToCart();
                    setShowDetails(false);
                  }}
                >
                  Add to Cart
                </button>
              ) : (
                <button
                  type="button"
                  disabled
                  className="btn-base btn-outline mt-5 w-full cursor-not-allowed opacity-60"
                >
                  Currently Unavailable
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
