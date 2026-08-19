import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalPolicyPage, type LegalSection } from "@/components/LegalPolicyPage";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Chaska" },
      {
        name: "description",
        content:
          "How Chaska collects, uses and protects your personal information for food pre-booking and order processing.",
      },
      { property: "og:title", content: "Privacy Policy — Chaska" },
      { property: "og:description", content: "Read how Chaska handles your personal data." },
    ],
  }),
  component: PrivacyPolicyPage,
});

const LAST_UPDATED = "[To be updated]";

const sections: LegalSection[] = [
  {
    id: "intro",
    title: "Introduction",
    body: [
      "This Privacy Policy explains how Chaska collects, uses, shares and protects personal information when you browse this website or place a food pre-booking/order. By using this website or submitting an order, you agree to the practices described here.",
      "Chaska primarily provides food pre-booking. Food is pre-booked and served at the designated location; it is not a food-delivery service.",
    ],
  },
  {
    id: "information-collected",
    title: "Information We Collect",
    body: [
      "When you place a pre-booking or order, we collect the information you provide through the order form, including:",
      "Name",
      "Phone / WhatsApp number",
      "Email address",
      "Pre-booking / order details, including the selected food items, quantities, date and serving time",
      "Any notes or special instructions you choose to add",
      "Payment method selected (we do not store complete payment card details)",
      "If you submit a review or a contact message, we also collect the information you provide in those forms.",
    ],
  },
  {
    id: "purpose",
    title: "Why We Collect This Information",
    body: [
      "We collect this information to process and manage your pre-booking/order, confirm your order, prepare and schedule your food, generate your invoice, and communicate with you about your order.",
      "Your contact details may be used for order confirmation and order-related communication.",
    ],
  },
  {
    id: "usage",
    title: "How We Use Your Information",
    body: [
      "We use your information to complete and manage your pre-booking or order, to send you order confirmation, your invoice and order-update communication, and to respond to your enquiries.",
      "We do not sell your personal information to third parties.",
    ],
  },
  {
    id: "security",
    title: "Data Security",
    body: [
      "We use reasonable security measures to protect the personal information you provide against unauthorised access, disclosure, alteration, loss or misuse.",
    ],
  },
  {
    id: "retention",
    title: "Data Retention",
    body: [
      "We retain personal information only for as long as reasonably necessary to process and manage your order, comply with applicable legal obligations, and resolve any queries or disputes.",
    ],
  },
  {
    id: "sharing",
    title: "Data Sharing",
    body: [
      "We do not sell your personal information. We may share necessary information with service providers that help us operate this website, such as the services used to record and store orders (for example, Google Sheets), to send order-related communication (for example, WhatsApp), and to host and operate the website. Such service providers process information according to their own terms and privacy policies.",
    ],
  },
  {
    id: "rights",
    title: "Your Privacy Rights",
    body: [
      "Where applicable, you may have the right to request access to, correction of, or deletion of the personal information we hold about you, and to raise a grievance regarding our handling of your data.",
      "Depending on where you are located, additional rights may apply, including under the Digital Personal Data Protection Act, 2023 (DPDPA) and, where applicable, the GDPR.",
    ],
  },
  {
    id: "grievance",
    title: "Privacy Grievance / Request Process",
    body: [
      "If you have a question about this policy, want to review or correct your information, or would like to raise a privacy request or grievance, please contact us using the details below. We will make reasonable efforts to respond within a reasonable time.",
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
      "For any privacy or data-related request, you can use the above contact details.",
    ],
  },
];

function PrivacyPolicyPage() {
  return (
    <LegalPolicyPage
      badge="Legal"
      title="Privacy Policy"
      intro="How Chaska collects, uses, shares and protects your personal information."
      lastUpdated={LAST_UPDATED}
      sections={sections}
      footerNote={
        <p className="text-center text-sm text-muted-foreground">
          Have questions about this policy?{" "}
          <Link to="/contact" className="font-medium text-primary underline underline-offset-2 hover:opacity-80">
            Contact us
          </Link>
          .
        </p>
      }
    />
  );
}