import { createFileRoute } from "@tanstack/react-router";
import { LegalPolicyPage, type LegalSection } from "@/components/LegalPolicyPage";

export const Route = createFileRoute("/cookie-policy")({
  head: () => ({
    meta: [
      { title: "Cookie Policy — Chaska" },
      {
        name: "description",
        content:
          "Cookie and data-storage information for the Chaska website, including cart and order memory.",
      },
      { property: "og:title", content: "Cookie Policy — Chaska" },
      { property: "og:description", content: "How the Chaska website uses cookies and local storage." },
    ],
  }),
  component: CookiePolicyPage,
});

const LAST_UPDATED = "[To be updated]";

const sections: LegalSection[] = [
  {
    id: "overview",
    title: "Overview",
    body: [
      "This Cookie Policy explains how this website uses cookies and similar technologies. It only describes the tracking and storage technologies that this website actually uses.",
    ],
  },
  {
    id: "cookies",
    title: "Cookies We Use",
    body: [
      "This website does not use cookies for advertising, analytics or cross-site tracking. We do not use cookies to build advertising profiles or to track you across other websites.",
      "A cookie may be set to remember a small UI preference (such as the state of a sidebar element). This cookie is functional and is not used for advertising or tracking.",
    ],
  },
  {
    id: "local-storage",
    title: "Browser Local / Session Storage",
    body: [
      "To remember your cart, order details and reviews on this device, this website uses your browser's local and session storage. This data stays on your device, is not used to track you across sites, and is not sold to third parties.",
    ],
  },
  {
    id: "control",
    title: "Managing Your Data",
    body: [
      "You can clear your browser's cookies, local storage and session storage through your browser settings at any time. Please note that clearing this data may remove items from your cart or recent order details on this device.",
    ],
  },
  {
    id: "contact",
    title: "Contact Information",
    body: [
      "Business Name: Chaska",
      "Email: [To be updated]",
      "For any questions about this Cookie Policy, please contact us using the details provided in our Privacy Policy or Contact page.",
    ],
  },
];

function CookiePolicyPage() {
  return (
    <LegalPolicyPage
      badge="Privacy & Data Protection"
      title="Cookie Policy"
      intro="How this website uses cookies and browser storage, and how you can manage them."
      lastUpdated={LAST_UPDATED}
      sections={sections}
    />
  );
}