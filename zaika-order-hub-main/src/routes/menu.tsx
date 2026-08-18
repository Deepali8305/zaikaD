import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CATEGORIES, MENU, type CategoryId } from "@/data/menu";
import { MenuCard } from "@/components/MenuCard";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — Zaika Cloud Kitchen" },
      {
        name: "description",
        content:
          "Browse the Zaika Cloud Kitchen menu: breakfast, beverages, snacks, veg, non-veg, rice and noodles, freshly prepared to order.",
      },
      { property: "og:title", content: "Menu — Zaika Cloud Kitchen" },
      {
        property: "og:description",
        content: "Freshly prepared breakfast, thalis, curries, rice and noodles.",
      },
    ],
  }),
  component: MenuPage,
});

function MenuPage() {
  const [active, setActive] = useState<CategoryId>("breakfast");
  const items = MENU.filter((item) => item.category === active);

  return (
    <div className="container-page py-10 pb-28 md:pb-16">
      <header className="max-w-2xl">
        <h1 className="font-display text-3xl font-semibold sm:text-4xl">Our Menu</h1>
        <p className="mt-2 text-muted-foreground">
          Every dish is cooked fresh after your order is confirmed. Choose a category to explore.
        </p>
      </header>

      <div
        role="tablist"
        aria-label="Menu categories"
        className="mt-8 -mx-1 flex gap-2 overflow-x-auto px-1 pb-2"
      >
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            role="tab"
            aria-selected={active === cat.id}
            onClick={() => setActive(cat.id)}
            className={
              active === cat.id
                ? "btn-base btn-primary btn-primary-hover shrink-0 px-5 py-2 text-sm"
                : "btn-base btn-outline shrink-0 px-5 py-2 text-sm"
            }
          >
            {cat.label}
          </button>
        ))}
      </div>

      <section className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((item) => (
          <MenuCard key={item.id} item={item} />
        ))}
      </section>
    </div>
  );
}
