import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalPolicyPage, type LegalSection } from "@/components/LegalPolicyPage";

export const Route = createFileRoute("/dpdpa")({
  head: () => ({
    meta: [
      { title: "DPDPA / Data Protection — Chaska" },
      {
        name: "description",
        content:
          "Data protection information for Chaska in accordance with applicable data-protection requirements, including the DPDPA where applicable.",
      },
      { property: "og:title", content: "DPDPA / Data Protection — Chaska" },
      { property: "og:description", content: "How Chaska protects personal data." },
    ],
  }),
  component: DpdpaPage,
});

const LAST_UPDATED = "[To be updated]";

const sections: LegalSection[] = [
  {
    id: "overview",
    title: "Overview",
    body: [
      "This section explains how Chaska collects, uses, protects and manages personal data. It reflects our compliance with applicable data-protection requirements, including the Digital Personal Data Protection Act, 2023 (DPDPA), where legally applicable.",
      "Please note: this page describes our data-protection practices and does not imply any certificate, compliance badge, government approval or official compliance certification unless one is expressly displayed.",
    ],
  },
  {
    id: "data-collected",
    title: "Personal Data Collected",
    body: [
      "In connection with food pre-booking and ordering, we may collect the following personal data that you provide through the order form:",
      "Name",
      "Phone / WhatsApp number",
      "Email address",
      "Pre-booking / order details, including selected food items, quantities, date and serving time",
      "Notes or special instructions",
      "Payment method selected",
      "If you submit a review or contact message, we also collect the information you provide in those forms.",
    ],
  },
  {
    id: "purpose",
    title: "Purpose of Data Collection",
    body: [
      "We collect personal data to process and manage your pre-booking/order, prepare and schedule your food, generate your invoice, and communicate with you about your order.",
      "We do not collect or use personal data for purposes that are incompatible with these purposes.",
    ],
  },
  {
    id: "order-processing",
    title: "Order / Pre-Booking Processing",
    body: [
      "Your personal data is used to record, confirm and manage your pre-booking or order, and to coordinate the date and serving time you have selected.",
    ],
  },
  {
    id: "communication",
    title: "Customer Communication",
    body: [
      "We use your contact details for order confirmation, sending your invoice and order-related communication. Where applicable, this may be done using the WhatsApp number you provide.",
    ],
  },
  {
    id: "security",
    title: "Data Security",
    body: [
      "We apply reasonable security measures to protect personal data against unauthorised access, disclosure, alteration, loss or misuse.",
    ],
  },
  {
    id: "retention",
    title: "Data Retention",
    body: [
      "We retain personal data only for as long as reasonably necessary to process and manage your order, comply with applicable legal obligations, and resolve queries or disputes.",
    ],
  },
  {
    id: "rights",
    title: "Access, Correction and Deletion Requests",
    body: [
      "Where applicable, you may request access to, correction of, or deletion of the personal data we hold about you. You may also raise a grievance regarding our handling of your data.",
      "We will evaluate such requests in accordance with applicable law and respond within a reasonable time.",
    ],
  },
  {
    id: "grievance",
    title: "Privacy Grievance / Request Process",
    body: [
      "To exercise any applicable rights or to raise a data-protection grievance, please contact us using the details below. We will make reasonable efforts to respond within a reasonable time.",
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

function DpdpaPage() {
  return (
    <LegalPolicyPage
      badge="Privacy & Data Protection"
      title="DPDPA / Data Protection"
      intro="Information about how Chaska collects, uses and protects personal data in accordance with applicable data-protection requirements."
      lastUpdated={LAST_UPDATED}
      sections={sections}
      footerNote={
        <p className="text-center text-sm text-muted-foreground">
          Have a privacy request?{" "}
          <Link to="/contact" className="font-medium text-primary underline underline-offset-2 hover:opacity-80">
            Contact us
          </Link>
          .
        </p>
      }
    />
  );
}