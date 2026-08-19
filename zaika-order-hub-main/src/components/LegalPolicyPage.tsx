import type { ReactNode } from "react";

export type LegalSection = {
  id: string;
  title: string;
  body: string[];
};

/**
 * Shared, consistent layout for all legal / compliance pages.
 * Uses the existing light-green card design and shows a "Last Updated" date.
 */
export function LegalPolicyPage({
  badge,
  title,
  intro,
  lastUpdated,
  sections,
  footerNote,
}: {
  badge: string;
  title: string;
  intro: string;
  lastUpdated: string;
  sections: LegalSection[];
  footerNote?: ReactNode;
}) {
  return (
    <div className="pb-24 md:pb-0">
      <section className="bg-surface">
        <div className="container-page py-14 text-center">
          <p className="inline-flex rounded-full bg-accent px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-accent-foreground">
            {badge}
          </p>
          <h1 className="mt-5 font-display text-3xl font-semibold sm:text-4xl">{title}</h1>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">{intro}</p>
          <p className="mx-auto mt-4 inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-1.5 text-xs text-muted-foreground">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-3.5" aria-hidden="true">
              <path d="M22 12h-2.17a6.1 6.1 0 0 1-1.5 1.67 5.38 5.38 0 0 1-8.21.67 19.53 19.53 0 0 1-1.36-4.86A6 6 0 0 1 2.83 3.86a8 8 0 0 1-1.55 3.68 3.68.05.05 0 0 1 2.91 1.04 5.79 5.79 0 0 1-8.49-8.49 7 7 0 0 1" />
            </svg>
            Last Updated: {lastUpdated}
          </p>
        </div>
      </section>

      <section className="container-page py-12">
        <div className="mx-auto max-w-3xl space-y-6">
          {sections.map((section) => (
            <article key={section.id} id={section.id} className="card-surface p-6 sm:p-7">
              <h2 className="text-lg font-semibold text-foreground">{section.title}</h2>
              <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">
                {section.body.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </article>
          ))}
          {footerNote && <div className="card-surface p-6 sm:p-7">{footerNote}</div>}
        </div>
      </section>
    </div>
  );
}