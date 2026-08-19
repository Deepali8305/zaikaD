import { createFileRoute, Link } from "@tanstack/react-router";
import {
  IMPORTANT_NOTICE,
  ORDER_WINDOW_TEXT,
  SAME_DAY_MIN_LEAD_MINUTES,
} from "@/lib/order-rules";

export const Route = createFileRoute("/terms-and-conditions")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — Chaska" },
      {
        name: "description",
        content:
          "Read the Terms & Conditions for Chaska, including food safety, FSSAI compliance, ordering, pricing, payments, cancellations, privacy, DPDP, and GDPR.",
      },
      { property: "og:title", content: "Terms & Conditions — Chaska" },
      {
        property: "og:description",
        content:
          "The rules and policies that apply when you browse the Chaska website or place an order.",
      },
    ],
  }),
  component: TermsAndConditionsPage,
});

type Section = {
  id: string;
  title: string;
  body: string[];
};

const LAST_UPDATED = "[DD/MM/YYYY]";

const sections: Section[] = [
  {
    id: "introduction",
    title: "Introduction",
    body: [
      "These Terms & Conditions apply when you browse this website or place a food pre-booking or order with Chaska.",
      "By using this website or submitting an order, you agree to these Terms & Conditions. Please read them carefully before ordering.",
      "Chaska is a food pre-booking service and is not a food-delivery service. Food is pre-booked and served at the designated location; we do not provide home delivery, delivery partners, delivery tracking or delivery charges.",
    ],
  },
  {
    id: "pre-booking-ordering",
    title: "Pre-Booking and Ordering",
    body: [
      "Chaska primarily offers food pre-booking. To pre-book a meal, select a valid date and an available serving time through the order form.",
      "Same-day orders are also supported.",
      "All orders are placed through the single order form available on this website.",
      "Food is served at the designated farmhouse/location at the date and serving time you have selected.",
    ],
  },
  {
    id: "order-timing",
    title: "Order Timing",
    body: [
      ORDER_WINDOW_TEXT,
      "No orders can be submitted outside these hours.",
      "Orders may be scheduled for a future date (pre-booking) or for the same day, subject to the serving-time rules below.",
    ],
  },
  {
    id: "same-day-orders",
    title: "Same-Day Orders",
    body: [
      `Same-day orders require a minimum serving time of ${SAME_DAY_MIN_LEAD_MINUTES / 60} hours.`,
      "Depending on the selected food item and availability, the order may be served earlier. We will do our best to serve your order as soon as it is ready.",
    ],
  },
  {
    id: "menu-pricing",
    title: "Menu and Pricing",
    body: [
      "Menu items, descriptions and prices may change from time to time without prior notice.",
      "The applicable price at the time the order is confirmed will generally apply.",
      "The final payable amount will be shown to you before you submit your order.",
      "Images on the menu are for representation purposes unless stated otherwise.",
    ],
  },
  {
    id: "food-availability",
    title: "Food Availability",
    body: [
      "Food items are subject to availability.",
      "If an ordered item becomes unavailable, we may contact you to suggest an alternative or to adjust your order.",
    ],
  },
  {
    id: "customer-information",
    title: "Customer Information",
    body: [
      "When placing an order, you must provide accurate information, including your name, WhatsApp/mobile number and email address.",
      "These details may be used for order confirmation, issuing your invoice and order-related communication.",
    ],
  },
  {
    id: "order-confirmation",
    title: "Order Confirmation",
    body: [
      "Before submitting an order, please check all order details, including the items, date, serving time and total amount.",
      "An order is treated as submitted once you have reviewed the order summary, agreed to these Terms & Conditions and confirmed submission through the order form.",
      "An order becomes confirmed when it is accepted and confirmed by Chaska. The order confirmation and invoice will be sent using the contact details you provided.",
    ],
  },
  {
    id: "payment",
    title: "Payment",
    body: [
      "The following payment methods are currently available on this website: UPI (online) and Cash Payment.",
      "For UPI (online) payment, a QR code is shown during checkout. Scan it with any UPI app (such as Google Pay, PhonePe or Paytm) to complete payment, then share the payment screenshot via WhatsApp for faster confirmation.",
      "Chaska does not store complete payment card details unless specifically required and lawfully permitted.",
      "Customers must not provide confidential payment credentials through the order form, email, WhatsApp or other communication channels.",
    ],
  },
  {
    id: "cancellation",
    title: "Cancellation and Refund",
    body: [
      "You may request cancellation of an order by contacting Chaska using the contact details provided below.",
      "Cancellation is subject to the stage of order preparation.",
      "Once order preparation has started, cancellation may not be possible except where required by applicable law or approved by Chaska.",
      "Refund eligibility depends on the applicable cancellation rules in effect at the time of the request.",
      "Where a refund is approved, it will be processed through the original payment method.",
      "Any specific cancellation window or refund amount, if applicable, will be stated here once confirmed: [Cancellation/refund details to be updated].",
    ],
  },
  {
    id: "privacy",
    title: "Privacy and Data Protection",
    body: [
      "Chaska collects personal information that is necessary to process and manage your order, such as your name, WhatsApp/mobile number, email address, order details, date and serving time.",
      "This information is collected and used for order processing and order-related communication, including order confirmation and sending your invoice.",
      "Personal information is not sold to third parties.",
      "We use reasonable security measures to protect personal information against unauthorised access, disclosure, alteration, loss or misuse.",
      "To the extent applicable, we handle digital personal data in accordance with the Digital Personal Data Protection Act, 2023 (DPDP Act) and other applicable data protection requirements.",
      "Depending on the circumstances, you may have rights relating to your personal data, including the right to access, correct or request deletion of your information, and to raise a grievance.",
      "You may contact us regarding your personal information and applicable privacy rights using the contact details provided below.",
    ],
  },
  {
    id: "gdpr",
    title: "GDPR (Where Applicable)",
    body: [
      "The General Data Protection Regulation (GDPR) applies only where it is applicable to our processing of your personal data. We do not claim that this website is fully GDPR compliant unless this has been legally verified.",
      "Where GDPR applies, you may have relevant privacy rights, including rights to access, rectify, erase or restrict processing of your personal data, and to object to certain processing.",
      "You may contact us regarding privacy requests using the contact details provided below.",
    ],
  },
  {
    id: "fssai",
    title: "Food Safety and FSSAI Compliance",
    body: [
      "Chaska operates in accordance with applicable food safety and hygiene requirements under the Food Safety and Standards Act, 2006 and applicable FSSAI regulations.",
      "The FSSAI License/Registration number, when displayed, will be the valid number belonging to the applicable Food Business Operator.",
    ],
  },
  {
    id: "policy-changes",
    title: "Policy Changes",
    body: [
      "Chaska may update these Terms & Conditions from time to time.",
      `The latest version will be published on this website with a revised "Last Updated" date (Last updated: ${LAST_UPDATED}).`,
    ],
  },
  {
    id: "contact",
    title: "Contact Information",
    body: [
      "For questions, complaints, order-related issues or privacy requests, you may contact Chaska at:",
      "Business Name: Chaska",
      "Phone Number: [To be updated]",
      "Email: [To be updated]",
      "Address: [To be updated]",
      "FSSAI License Number: [To be updated]",
      "Company/Registration Details: [To be updated]",
      "We will make reasonable efforts to review and respond to your queries within a reasonable time.",
    ],
  },
  {
    id: "governing-law",
    title: "Governing Law",
    body: [
      "These Terms & Conditions will be governed by the applicable laws of India.",
      "Any disputes will be subject to the jurisdiction of the competent courts/authorities as applicable.",
    ],
  },
];
function TermsAndConditionsPage() {
  return (
    <div className="pb-24 md:pb-0">
      {/* Hero */}
      <section className="bg-surface">
        <div className="container-page py-14 text-center">
          <p className="inline-flex rounded-full bg-accent px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-accent-foreground">
            Policies
          </p>
          <h1 className="mt-5 font-display text-3xl font-semibold sm:text-4xl">
            Terms &amp; Conditions
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            These Terms &amp; Conditions apply when you browse this website or place an order with
            Chaska. Please read them carefully before ordering.
          </p>
          <p className="mx-auto mt-4 max-w-2xl rounded-2xl border border-primary/30 bg-accent/60 p-4 text-sm text-foreground">
            {IMPORTANT_NOTICE}
          </p>
        </div>
      </section>

      {/* Body */}
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

          <div className="card-surface p-6 text-center sm:p-7">
            <p className="text-sm text-muted-foreground">
              Have questions about these Terms? We're happy to help.
            </p>
            <Link to="/contact" className="btn-base btn-primary btn-primary-hover mt-4">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

