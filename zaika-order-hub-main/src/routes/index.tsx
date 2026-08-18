import { createFileRoute, Link } from "@tanstack/react-router";
import heroImage from "@/assets/hero.jpg";
import { CATEGORIES, MENU, POPULAR_IDS } from "@/data/menu";
import { MenuCard } from "@/components/MenuCard";
import { ImportantNotice } from "@/components/ImportantNotice";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Zaika Cloud Kitchen — Freshly Cooked Meals, Pre-Booked" },
      {
        name: "description",
        content:
          "Pre-book freshly prepared breakfast, thalis, curries, rice and noodles from Zaika Cloud Kitchen. Same-day orders supported with a 2-hour minimum serving time.",
      },
      { property: "og:title", content: "Zaika Cloud Kitchen — Freshly Cooked Meals" },
      {
        property: "og:description",
        content:
          "Pre-book fresh home-style meals. Orders accepted 7:30 AM to 7:00 PM, same-day serving in 2 hours.",
      },
    ],
  }),
  component: Home,
});

const STEPS = [
  { title: "Choose your food", text: "Browse the menu and add what you would like to your cart." },
  { title: "Pick your timing", text: "Select same day or pre-book for a later date and time." },
  { title: "Confirm your order", text: "Review the summary, confirm and receive your invoice." },
  { title: "Freshly prepared", text: "We cook after confirmation and serve at your chosen time." },
];

function Home() {
  const popular = POPULAR_IDS.map((id) => MENU.find((m) => m.id === id)).filter(
    (m): m is NonNullable<typeof m> => Boolean(m),
  );

  return (
    <div className="pb-24 md:pb-0">
      <section className="bg-surface">
        <div className="container-page grid items-center gap-10 py-14 lg:grid-cols-2 lg:py-20">
          <div>
            <p className="inline-flex rounded-full bg-accent px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-accent-foreground">
              Pre-booking cloud kitchen
            </p>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-tight sm:text-5xl">
              Freshly prepared meals, ready exactly when you need them
            </h1>
            <p className="mt-4 max-w-xl text-base text-muted-foreground">
              Zaika Cloud Kitchen cooks every order fresh. Pre-book your meal for a later date, or
              place a same-day order with a minimum serving time of two hours.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/menu" className="btn-base btn-primary btn-primary-hover">
                View Menu
              </Link>
              <Link to="/order" className="btn-base btn-outline">
                Start Your Order
              </Link>
            </div>
          </div>
          <img
            src={heroImage}
            alt="Freshly prepared Indian meal spread with thali, parathas, curries and tea"
            width={1600}
            height={1104}
            className="w-full rounded-3xl object-cover shadow-lift"
          />
        </div>
      </section>

      <section className="container-page py-14">
        <h2 className="font-display text-2xl font-semibold sm:text-3xl">Menu categories</h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to="/menu"
              className="card-surface px-4 py-5 text-center text-sm font-semibold transition-shadow hover:shadow-lift"
            >
              {cat.label}
            </Link>
          ))}
        </div>
      </section>

      <section className="container-page pb-14">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">Popular dishes</h2>
          <Link to="/menu" className="text-sm font-semibold text-primary hover:underline">
            See full menu
          </Link>
        </div>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {popular.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section className="bg-surface py-14">
        <div className="container-page grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">
              About Zaika Cloud Kitchen
            </h2>
            <p className="mt-4 text-muted-foreground">
              We are a cloud kitchen focused on freshly cooked, home-style Indian food. There is no
              dine-in floor and no pre-cooked trays waiting under a lamp — each order is prepared
              after it is confirmed, which is why we work primarily on a pre-booking model.
            </p>
            <p className="mt-3 text-muted-foreground">
              Tell us when you need your food, and we plan our kitchen around your timing.
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">How ordering works</h2>
            <ol className="mt-4 space-y-3">
              {STEPS.map((step, i) => (
                <li key={step.title} className="card-surface flex gap-4 p-4">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-accent text-sm font-semibold text-accent-foreground">
                    {i + 1}
                  </span>
                  <span>
                    <span className="block font-semibold">{step.title}</span>
                    <span className="block text-sm text-muted-foreground">{step.text}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="container-page py-14">
        <ImportantNotice />
      </section>

      <section className="container-page pb-4">
        <div className="card-surface grid gap-6 p-6 sm:grid-cols-3">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide">Order placement</h2>
            <p className="mt-2 text-sm text-muted-foreground">7:30 AM – 7:00 PM, daily</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide">Same-day orders</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Minimum 2 hours serving time; may be served earlier.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide">Order updates</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Your invoice and confirmation are sent to the WhatsApp number you provide.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
