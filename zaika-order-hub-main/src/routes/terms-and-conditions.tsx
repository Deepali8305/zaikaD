import { createFileRoute, Link } from "@tanstack/react-router";
import {
  IMPORTANT_NOTICE,
  ORDER_WINDOW_TEXT,
  SAME_DAY_MIN_LEAD_MINUTES,
} from "@/lib/order-rules";

export const Route = createFileRoute("/terms-and-conditions")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — Zaika Cloud Kitchen" },
      {
        name: "description",
        content:
          "Read the Terms & Conditions for ordering from Zaika Cloud Kitchen, including pre-booking, same-day orders, timing, payment, and privacy.",
      },
      { property: "og:title", content: "Terms & Conditions — Zaika Cloud Kitchen" },
      {
        property: "og:description",
        content: "The rules and policies that apply when you place an order with Zaika Cloud Kitchen.",
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

const sections: Section[] = [
  {
    id: "introduction",
    title: "Introduction",
    body: [
      "Welcome to Zaika Cloud Kitchen. These Terms & Conditions (“Terms”) govern your access to and use of this website and the ordering services we provide.",
      "By browsing this website or placing an order, you agree to be bound by these Terms. If you do not agree with any part of these Terms, please do not use our website or place an order.",
    ],
  },
  {
    id: "pre-booking-and-ordering",
    title: "Pre-Booking and Ordering",
    body: [
      "Zaika Cloud Kitchen is primarily a pre-booking food ordering service. Same-day orders are also supported.",
      "Pre-bookings are scheduled orders placed for a future date. To place a pre-booking, please select a valid future date and a serving/delivery time from the available slots.",
      "When you place an order, you confirm that all information provided by you is accurate and complete.",
    ],
  },
  {
    id: "order-timing",
    title: "Order Timing",
    body: [
      ORDER_WINDOW_TEXT,
      "Orders can only be placed within this window. No orders can be submitted outside these hours.",
    ],
  },
  {
    id: "same-day-orders",
    title: "Same-Day Orders",
    body: [
      `Same-day orders require a minimum serving time of ${SAME_DAY_MIN_LEAD_MINUTES / 60} hours.`,
      "Depending on the selected food item and availability, your order may be ready earlier than the minimum serving time. We will do our best to serve your order as soon as it is ready.",
    ],
  },
  {
    id: "menu-and-pricing",
    title: "Menu and Pricing",
    body: [
      "All food items, images, descriptions, and prices shown on the menu are subject to change without prior notice.",
      "Prices are displayed in Indian Rupees (₹). The total payable amount is shown in your order summary before you submit your order.",
      "For items where a price is not shown, the price is provided on request.",
    ],
  },
  {
    id: "food-availability",
    title: "Food Availability",
    body: [
      "Menu items are subject to availability. If an item you have ordered is unavailable, we will contact you to offer a suitable alternative or adjust your order accordingly.",
      "We reserve the right to limit quantities and to refuse or cancel an order at our discretion.",
    ],
  },
  {
    id: "customer-information",
    title: "Customer Information",
    body: [
      "To place an order, we require your name, a valid WhatsApp mobile number, and an email address.",
      "You agree to provide accurate, current, and complete information. We may use the provided contact details to confirm your order and share order updates.",
    ],
  },
  {
    id: "order-confirmation",
    title: "Order Confirmation",
    body: [
      "Your order is considered placed only after you have accepted the Terms & Conditions and submitted the order through the order form.",
      "After submission, an order confirmation with an invoice is generated and shared with you on the WhatsApp number you provided.",
      "Please review your order details carefully before confirming and submitting.",
    ],
  },
  {
    id: "payment",
    title: "Payment",
    body: [
      "We offer online payment via UPI and cash on delivery. The available payment methods are shown on the order form.",
      "For UPI payments, please complete the payment using the provided QR code or UPI ID and share the payment confirmation on WhatsApp for faster order confirmation.",
      "An order is considered confirmed for preparation once the order is submitted and, where applicable, payment is received.",
    ],
  },
  {
    id: "cancellation-and-refund",
    title: "Cancellation and Refund",
    body: [
      "Cancellation and refund policies may vary depending on the stage of your order. For cancellation or refund requests, please contact us using the details provided in the Contact section.",
      "Refunds, where applicable, will be processed to the original payment method. Please allow reasonable time for the refund to reflect in your account.",
    ],
  },
  {
    id: "privacy-and-data-protection",
    title: "Privacy and Data Protection",
    body: [
      "We respect your privacy. The information you provide while placing an order is used only to process and deliver your order and to communicate order-related updates.",
      "We do not sell your personal information to third parties. Your data is handled with reasonable security measures.",
      "For more details on how your information is handled, please refer to our privacy practices or contact us.",
    ],
  },
  {
    id: "policy-changes",
    title: "Policy Changes",
    body: [
      "We may update these Terms & Conditions from time to time. Any changes will be reflected on this page with an updated effective date.",
      "Your continued use of this website after any changes indicates your acceptance of the revised Terms.",
    ],
  },
  {
    id: "contact-information",
    title: "Contact Information",
    body: [
      "If you have any questions, concerns, or feedback regarding these Terms & Conditions or your order, please get in touch with us using the Contact page.",
      "Phone Number: [To be updated]",
      "Email: [To be updated]",
      "Address: [To be updated]",
      "FSSAI License Number: [To be updated]",
      "Company / Registration Details: [To be updated]",
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
            Zaika Cloud Kitchen. Please read them carefully before ordering.
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

