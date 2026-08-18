import { IMPORTANT_NOTICE } from "@/lib/order-rules";

export function ImportantNotice() {
  return (
    <aside
      className="rounded-2xl border border-primary/30 bg-accent/60 p-5"
      aria-label="Important ordering information"
    >
      <h2 className="text-sm font-semibold uppercase tracking-wide text-accent-foreground">
        Important ordering information
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-foreground">{IMPORTANT_NOTICE}</p>
    </aside>
  );
}
