import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CATEGORIES, MENU, type CategoryId } from "@/data/menu";
import { MenuCard } from "@/components/MenuCard";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — Chaska" },
      {
        name: "description",
        content:
          "Browse the Chaska menu: breakfast, beverages, snacks, veg, non-veg, rice and noodles, freshly prepared to order.",
      },
      { property: "og:title", content: "Menu — Chaska" },
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
  const items = MENU.filter(
    (item) => item.category === active || (item.alsoIn ?? []).includes(active),
  );

  // Sub-groups shown within the Roti category for a clear structure.
  const rotiGroups: string[] = ["Veg Roti", "Non-Veg Roti", "Parantha"];

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

      {active === "roti" ? (
        <div className="mt-8 space-y-8">
          {rotiGroups.map((group) => {
            const groupItems = items.filter((item) => item.group === group);
            if (groupItems.length === 0) return null;
            return (
              <div key={group}>
                <h2 className="font-display text-lg font-semibold">{group}</h2>
                <div className="mt-3 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {groupItems.map((item) => (
                    <MenuCard key={item.id} item={item} />
                  ))}
                </div>
              </div>
            );
          })}
          {/* Any roti item without a sub-group is still shown. */}
          {items.filter((item) => !item.group).map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <section className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </section>
      )}
    </div>
  );
}
