import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalPolicyPage, type LegalSection } from "@/components/LegalPolicyPage";

export const Route = createFileRoute("/cancellation-refund")({
  head: () => ({
    meta: [
      { title: "Cancellation & Refund Policy — Chaska" },
      {
        name: "description",
        content:
          "Cancellation and refund policy for food pre-booking and orders at Chaska.",
      },
      { property: "og:title", content: "Cancellation & Refund Policy — Chaska" },
      { property: "og:description", content: "How cancellations and refunds work at Chaska." },
    ],
  }),
  component: CancellationRefundPage,
});

const LAST_UPDATED = "[To be updated]";

const sections: LegalSection[] = [
  {
    id: "overview",
    title: "Overview",
    body: [
      "Chaska primarily provides food pre-booking. Food is prepared after an order is confirmed and is served at the designated location. This policy explains how cancellations and refunds are handled.",
    ],
  },
  {
    id: "customer-cancellation",
    title: "Customer Cancellation",
    body: [
      "If you wish to cancel a pre-booking or order, please contact us using the details below as soon as possible and before order preparation begins.",
    ],
  },
  {
    id: "after-preparation",
    title: "Cancellation After Preparation Starts",
    body: [
      "Cancellation is subject to the stage of order preparation. Once order preparation has started, cancellation may not be possible except where required by applicable law or approved by Chaska.",
    ],
  },
  {
    id: "unavailability",
    title: "Item Unavailability",
    body: [
      "Food items are subject to availability. If an ordered item becomes unavailable, we may contact you to suggest an alternative or to adjust your order.",
    ],
  },
  {
    id: "business-cancellation",
    title: "Cancellation by Chaska",
    body: [
      "If Chaska is unable to serve an order for any reason, we will inform the customer and, where applicable, process any refund that may be due in accordance with this policy.",
    ],
  },
  {
    id: "refund-eligibility",
    title: "Refund Eligibility",
    body: [
      "Refund eligibility depends on the applicable cancellation rules in effect at the time of the request and on the stage of order preparation.",
      "Specific refund amounts, deadlines or penalties have not been finalised yet. Where such rules apply, they will be published here once confirmed."
    ],
  },
  {
    id: "refund-method",
    title: "Refund Method",
    body: [
      "Where a refund is approved, it will be processed through the original payment method."
    ],
  },
  {
    id: "refund-processing",
    title: "Refund Processing",
    body: [
      "Approved refunds will be processed within a reasonable time after the refund has been confirmed. The exact timeframe depends on the payment method used.",
    ],
  },
  {
    id: "support",
    title: "Customer Support",
    body: [
      "For questions about cancellations or refunds, please contact us using the details below.",
    ],
  },
  {
    id: "contact",
    title: "Contact Information",
    body: [
      "Business Name: Chaska",
      "Phone: [To be updated]",
      "Email: [To be updated]",
      "Address: [To be updated]",
    ],
  },
];

function CancellationRefundPage() {
  return (
    <LegalPolicyPage
      badge="Legal"
      title="Cancellation & Refund Policy"
      intro="How cancellations and refunds are handled for food pre-bookings and orders at Chaska."
      lastUpdated={LAST_UPDATED}
      sections={sections}
      footerNote={
        <p className="text-center text-sm text-muted-foreground">
          Have a cancellation or refund question?{" "}
          <Link to="/contact" className="font-medium text-primary underline underline-offset-2 hover:opacity-80">
            Contact us
          </Link>
          .
        </p>
      }
    />
  );
}