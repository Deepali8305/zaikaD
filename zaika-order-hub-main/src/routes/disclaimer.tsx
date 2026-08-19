import { createFileRoute } from "@tanstack/react-router";
import { LegalPolicyPage, type LegalSection } from "@/components/LegalPolicyPage";

export const Route = createFileRoute("/disclaimer")({
  head: () => ({
    meta: [
      { title: "Disclaimer — Chaska" },
      {
        name: "description",
        content:
          "Disclaimer for the Chaska website, including food images, menu, prices and serving times.",
      },
      { property: "og:title", content: "Disclaimer — Chaska" },
      { property: "og:description", content: "Read the Chaska website disclaimer." },
    ],
  }),
  component: DisclaimerPage,
});

const LAST_UPDATED = "[To be updated]";

const sections: LegalSection[] = [
  {
    id: "overview",
    title: "Overview",
    body: [
      "This disclaimer applies to the information, images, menu and services shown on this website. It should be read together with our Terms & Conditions, Privacy Policy and other applicable policies.",
    ],
  },
  {
    id: "images",
    title: "Food Images",
    body: [
      "Food images shown on this website may be for representation purposes unless otherwise stated. The actual prepared food may differ from the images.",
    ],
  },
  {
    id: "menu-availability",
    title: "Menu and Availability",
    body: [
      "Menu items, descriptions and availability may change without prior notice. Food items are subject to availability.",
    ],
  },
  {
    id: "prices",
    title: "Prices",
    body: [
      "Prices shown on the website may change from time to time. The applicable price at the time the order is confirmed will generally apply, and the final payable amount will be shown before you submit your order.",
    ],
  },
  {
    id: "serving-times",
    title: "Serving Times",
    body: [
      "Serving times are subject to food preparation and availability. Same-day orders require a minimum serving time of 2 hours; depending on the selected food item and availability, the order may be served earlier.",
    ],
  },
  {
    id: "policies",
    title: "Please Read This Together With Our Policies",
    body: [
      "The information on this website should be read together with our applicable legal policies. If you have any questions, please contact us.",
    ],
  },
];

function DisclaimerPage() {
  return (
    <LegalPolicyPage
      badge="Legal"
      title="Disclaimer"
      intro="Important information about the images, menu, prices and serving times on this website."
      lastUpdated={LAST_UPDATED}
      sections={sections}
    />
  );
}