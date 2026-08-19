/**
 * Config-driven social media links for the footer "Connect With Us" section.
 *
 * Four icons are always shown: Instagram, Facebook, WhatsApp and Google Maps.
 *
 * - WhatsApp & Google Maps fall back to the real business contact details that are
 *   already used on this site (the business phone number and Bhopal location shown on
 *   the Contact page). Override them with the env vars below.
 * - Instagram & Facebook have no public URL in the project, so they render as
 *   "ready" placeholders and become live the moment a real URL is configured.
 *
 * Configure with (each optional):
 *   VITE_INSTAGRAM_URL   -> https://www.instagram.com/yourhandle
 *   VITE_FACEBOOK_URL    -> https://www.facebook.com/YourPage
 *   VITE_WHATSAPP_NUMBER -> business WhatsApp number (e.g. 918305994105)
 *   VITE_GOOGLE_MAPS_URL -> https://maps.google.com/?q=...  (your business listing)
 */
import type { ReactNode } from "react";

type SocialId = "instagram" | "facebook" | "whatsapp" | "google-maps";

type SocialLink = {
  id: SocialId;
  label: string;
  href?: string; // undefined => "ready" icon awaiting a real link
  ariaLabel: string;
};

/** Business WhatsApp number already shown on the Contact page (fallback). */
const FALLBACK_WHATSAPP_DIGITS = "918305994105";

/** Real "view in Google Maps" link built from the business name + location on this site. */
const FALLBACK_MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  "Chaska, Bhopal, Madhya Pradesh",
)}`;

function resolveHttpsUrl(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  try {
    const url = new URL(trimmed);
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;
    if (!url.hostname || url.hostname === "") return null;
    return url.toString();
  } catch {
    return null;
  }
}

export function getSocialLinks(): SocialLink[] {
  const links: SocialLink[] = [];

  const instagram = resolveHttpsUrl(import.meta.env["VITE_INSTAGRAM_URL"]);
  links.push({
    id: "instagram",
    label: "Instagram",
    ...(instagram ? { href: instagram } : {}),
    ariaLabel: "Chaska on Instagram",
  });

  const facebook = resolveHttpsUrl(import.meta.env["VITE_FACEBOOK_URL"]);
  links.push({
    id: "facebook",
    label: "Facebook",
    ...(facebook ? { href: facebook } : {}),
    ariaLabel: "Chaska on Facebook",
  });

  const configuredWhatsapp = String(
    import.meta.env["VITE_WHATSAPP_NUMBER"] ?? "",
  ).replace(/\D/g, "");
  const whatsappDigits =
    configuredWhatsapp.length >= 10 ? configuredWhatsapp : FALLBACK_WHATSAPP_DIGITS;
  links.push({
    id: "whatsapp",
    label: "WhatsApp",
    href: `https://wa.me/${whatsappDigits}?text=${encodeURIComponent(
      "Hi Chaska! I have an enquiry.",
    )}`,
    ariaLabel: "Chat with Chaska on WhatsApp",
  });

  const maps = resolveHttpsUrl(import.meta.env["VITE_GOOGLE_MAPS_URL"]);
  links.push({
    id: "google-maps",
    label: "Google Maps",
    href: maps ?? FALLBACK_MAPS_URL,
    ariaLabel: "Chaska on Google Maps",
  });

  return links;
}

const ICONS: Record<SocialId, (props: { className?: string }) => ReactNode> = {
  instagram: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  ),
  whatsapp: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.86 9.86 0 0 0 12.04 2zm0 18.15a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.14.16-.29.18-.54.06-.25-.13-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.13-.56-1.35-.77-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.29z" />
    </svg>
  ),
  facebook: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33V22c4.78-.76 8.44-4.92 8.44-9.94z" />
    </svg>
  ),
  "google-maps": ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
};

export function SocialMediaLinks() {
  const links = getSocialLinks();

  return (
    <div className="flex flex-wrap items-center gap-3">
      {links.map((link) => {
        const Icon = ICONS[link.id];

        // Shared visual base: circular, subtle shadow, smooth hover lift + color shift.
        const baseClass =
          "grid size-11 place-items-center rounded-full bg-card text-foreground";

        if (link.href) {
          return (
            <a
              key={link.id}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.ariaLabel}
              title={link.label}
              className={`${baseClass} transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lift hover:bg-primary hover:text-primary-foreground`}
            >
              <Icon className="size-5" />
            </a>
          );
        }

        // No real link yet: show the icon "ready" without fabricating a URL.
        return (
          <span
            key={link.id}
            role="img"
            aria-label={link.ariaLabel}
            title={`${link.label} — link coming soon`}
            className={`${baseClass} cursor-not-allowed opacity-55`}
          >
            <Icon className="size-5" />
          </span>
        );
      })}
    </div>
  );
}