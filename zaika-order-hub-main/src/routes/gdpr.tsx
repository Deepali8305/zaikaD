import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalPolicyPage, type LegalSection } from "@/components/LegalPolicyPage";

export const Route = createFileRoute("/gdpr")({
  head: () => ({
    meta: [
      { title: "GDPR — Chaska" },
      {
        name: "description",
        content:
          "GDPR-related rights and protections, where legally applicable, for personal data processed by Chaska.",
      },
      { property: "og:title", content: "GDPR (Where Applicable) — Chaska" },
      { property: "og:description", content: "Your data protection rights under the GDPR, where applicable." },
    ],
  }),
  component: GdprPage,
});

const LAST_UPDATED = "[To be updated]";

const sections: LegalSection[] = [
  {
    id: "overview",
    title: "Overview (Where Applicable)",
    body: [
      "This page describes GDPR-related rights and protections that apply to the processing of personal data where the European General Data Protection Regulation (GDPR) is legally applicable to Chaska's processing in a particular case.",
      "This page does not claim that Chaska is “GDPR Certified”. Where the GDPR does not apply to a particular processing activity, the protections described here may not apply.",
    ],
  },
  {
    id: "rights",
    title: "Your Rights Under the GDPR (Where Applicable)",
    body: [
      "Where the GDPR applies, you may have the following rights in relation to your personal data:",
      "Access — the right to obtain a copy of the personal data we hold about you",
      "Rectification — the right to correct inaccurate or incomplete personal data",
      "Erasure — the right to request deletion of your personal data, where applicable",
      "Restriction of processing — the right to request that we limit how we process your data",
      "Objection — the right to object to certain processing, where applicable",
      "Data portability — the right to receive your personal data in a structured, commonly used format, where applicable",
      "Withdrawal of consent — where processing is based on consent, the right to withdraw it at any time",
    ],
  },
  {
    id: "privacy-requests",
    title: "Making a Privacy Request",
    body: [
      "To exercise any applicable right, or if you have a question or complaint about how we process your personal data, please contact us using the details below. We will evaluate your request in accordance with applicable law.",
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

function GdprPage() {
  return (
    <LegalPolicyPage
      badge="Privacy & Data Protection"
      title="GDPR (Where Applicable)"
      intro="GDPR-related rights and protections apply where legally applicable to the processing of personal data."
      lastUpdated={LAST_UPDATED}
      sections={sections}
      footerNote={
        <p className="text-center text-sm text-muted-foreground">
          Have questions about GDPR compliance?{" "}
          <Link to="/contact" className="font-medium text-primary underline underline-offset-2 hover:opacity-80">
            Contact us
          </Link>
          .
        </p>
      }
    />
  );
}