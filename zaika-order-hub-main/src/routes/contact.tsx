import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { isValidIndianMobile } from "@/lib/order-rules";
import { sendContactToSheet } from "@/lib/google-sheets";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Chaska" },
      {
        name: "description",
        content:
          "Get in touch with Chaska. Find our location, call us, or send a message.",
      },
      { property: "og:title", content: "Contact Us — Chaska" },
      {
        property: "og:description",
        content: "Reach out to Chaska for orders, queries, or feedback.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  function validate(): string[] {
    const list: string[] = [];
    if (name.trim().length < 2) list.push("Please enter your name.");
    if (!isValidIndianMobile(phone)) list.push("Please enter a valid 10-digit mobile number.");
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) list.push("Please enter a valid email address.");
    if (subject.trim().length < 2) list.push("Please enter a subject.");
    if (message.trim().length < 10) list.push("Please enter a message (at least 10 characters).");
    return list;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const list = validate();
    setErrors(list);
    if (list.length > 0) return;

    setSending(true);
    await sendContactToSheet({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
    });

    setSubmitted(true);
    setSending(false);
    setName("");
    setPhone("");
    setEmail("");
    setSubject("");
    setMessage("");
  }

  return (
    <div className="pb-24 md:pb-0">
      {/* Hero */}
      <section className="bg-surface">
        <div className="container-page py-14 text-center">
          <p className="inline-flex rounded-full bg-accent px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-accent-foreground">
            Get In Touch
          </p>
          <h1 className="mt-5 font-display text-3xl font-semibold sm:text-4xl">Contact Us</h1>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Have a question, special request, or feedback? We'd love to hear from you. Reach out and
            we'll get back to you as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="container-page -mt-2 grid gap-4 sm:grid-cols-3">
        <div className="card-surface flex flex-col items-center p-6 text-center">
          <span className="grid size-12 place-items-center rounded-full bg-accent text-accent-foreground">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-5">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </span>
          <h3 className="mt-3 font-semibold">Phone</h3>
          <p className="mt-1 text-sm text-muted-foreground">+91 8305994105</p>
          <p className="text-sm text-muted-foreground">Mon–Sun, 7:30 AM – 7:00 PM</p>
        </div>

        <div className="card-surface flex flex-col items-center p-6 text-center">
          <span className="grid size-12 place-items-center rounded-full bg-accent text-accent-foreground">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-5">
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </span>
          <h3 className="mt-3 font-semibold">Email</h3>
          <p className="mt-1 text-sm text-muted-foreground">hello@chaska.com</p>
          <p className="text-sm text-muted-foreground">We reply within 24 hours</p>
        </div>

        <div className="card-surface flex flex-col items-center p-6 text-center">
          <span className="grid size-12 place-items-center rounded-full bg-accent text-accent-foreground">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-5">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </span>
          <h3 className="mt-3 font-semibold">Location</h3>
          <p className="mt-1 text-sm text-muted-foreground">Chaska</p>
          <p className="text-sm text-muted-foreground">Bhopal, Madhya Pradesh</p>
        </div>
      </section>

      {/* Map + Form */}
      <section className="container-page mt-10 grid gap-8 lg:grid-cols-2">
        {/* Map */}
        <div className="card-surface overflow-hidden">
          <iframe
            title="Chaska Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117251.56325598541!2d77.35096083716855!3d23.259338974498725!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c428f8fd68fbd%3A0x2155716d572d4f8!2sBhopal%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: "400px" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Contact Form */}
        <div>
          {submitted ? (
            <div className="card-surface flex flex-col items-center p-10 text-center">
              <span className="grid size-16 place-items-center rounded-full bg-primary/10 text-primary">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-8">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </span>
              <h2 className="mt-4 font-display text-2xl font-semibold">Message Sent!</h2>
              <p className="mt-2 text-muted-foreground">
                Thank you for reaching out. We'll get back to you soon.
              </p>
              <button
                type="button"
                className="btn-base btn-primary btn-primary-hover mt-6"
                onClick={() => setSubmitted(false)}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <div className="card-surface p-6">
              <h2 className="font-display text-xl font-semibold">Send us a message</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Fill out the form and we'll get back to you shortly.
              </p>

              <div className="mt-5 space-y-4">
                <div>
                  <label htmlFor="c-name" className="mb-1 block text-sm font-medium">
                    Your Name
                  </label>
                  <input
                    id="c-name"
                    className="field-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    maxLength={80}
                    autoComplete="name"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="c-phone" className="mb-1 block text-sm font-medium">
                      Phone Number
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="rounded-lg border border-input px-3 py-2 text-sm text-muted-foreground">
                        +91
                      </span>
                      <input
                        id="c-phone"
                        className="field-input"
                        inputMode="numeric"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="10-digit number"
                        maxLength={14}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="c-email" className="mb-1 block text-sm font-medium">
                      Email
                    </label>
                    <input
                      id="c-email"
                      type="email"
                      className="field-input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      maxLength={120}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="c-subject" className="mb-1 block text-sm font-medium">
                    Subject
                  </label>
                  <input
                    id="c-subject"
                    className="field-input"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    maxLength={120}
                    placeholder="e.g., Catering enquiry, Feedback"
                  />
                </div>

                <div>
                  <label htmlFor="c-message" className="mb-1 block text-sm font-medium">
                    Message
                  </label>
                  <textarea
                    id="c-message"
                    className="field-input min-h-32"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    maxLength={1000}
                    placeholder="Write your message here..."
                  />
                </div>

                {errors.length > 0 && (
                  <ul
                    role="alert"
                    className="space-y-1 rounded-2xl border border-destructive/40 bg-destructive/10 p-4 text-sm font-medium text-destructive"
                  >
                    {errors.map((err) => (
                      <li key={err}>{err}</li>
                    ))}
                  </ul>
                )}

                <button
                  type="button"
                  disabled={sending}
                  className="btn-base btn-primary btn-primary-hover w-full disabled:cursor-not-allowed disabled:opacity-60"
                  onClick={handleSubmit}
                >
                  {sending ? "Sending..." : "Send Message"}
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Operating Hours */}
      <section className="container-page mt-10 pb-10">
        <div className="card-surface grid gap-6 p-6 sm:grid-cols-3">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide">Order Placement</h3>
            <p className="mt-2 text-sm text-muted-foreground">7:30 AM – 7:00 PM, daily</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide">WhatsApp Support</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Chat with us on WhatsApp for quick queries
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide">Delivery Area</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              We deliver across Bhopal. Contact us for availability.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
