import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ImportantNotice } from "@/components/ImportantNotice";
import { useCart } from "@/lib/cart";
import { nextSequence, saveOrder } from "@/lib/order-storage";
import { sendOrderToSheet } from "@/lib/google-sheets";
import {
  buildOrderId,
  earliestSameDayServing,
  formatCurrency,
  formatMinutes,
  isValidIndianMobile,
  minutesOfDay,
  orderWindowState,
  parseTimeValue,
  servingSlots,
  toDateValue,
  toTimeValue,
  validateTiming,
  type OrderType,
  MAX_PRE_BOOKING_DAYS,
} from "@/lib/order-rules";

// ⚠️ REPLACE with your actual UPI ID and merchant name
const UPI_ID = "zaikakitchen@upi";
const UPI_NAME = "Zaika Cloud Kitchen";

export const Route = createFileRoute("/order")({
  head: () => ({
    meta: [
      { title: "Place Your Order — Zaika Cloud Kitchen" },
      {
        name: "description",
        content:
          "Place a same-day or pre-booked order with Zaika Cloud Kitchen. Orders accepted 7:30 AM to 7:00 PM; same-day serving takes a minimum of 2 hours.",
      },
      { property: "og:title", content: "Place Your Order — Zaika Cloud Kitchen" },
      {
        property: "og:description",
        content: "One simple form for same-day orders and pre-bookings.",
      },
    ],
  }),
  component: OrderPage,
});

type Payment = "UPI_ONLINE" | "CASH";

function OrderPage() {
  const navigate = useNavigate();
  const { detailed, total, clear } = useCart();

  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(id);
  }, []);

  const [orderType, setOrderType] = useState<OrderType>("SAME_DAY");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [payment, setPayment] = useState<Payment>("UPI_ONLINE");
  const [instructions, setInstructions] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const today = now ? toDateValue(now) : "";
  const maxDate = useMemo(() => {
    if (!now) return "";
    const d = new Date(now.getTime());
    d.setDate(d.getDate() + MAX_PRE_BOOKING_DAYS);
    return toDateValue(d);
  }, [now]);

  const windowState = now ? orderWindowState(now) : { open: true, message: "" };
  const earliest = now ? earliestSameDayServing(now) : 0;

  const effectiveDate = orderType === "SAME_DAY" ? today : date;

  const slots = useMemo(() => {
    if (!now) return [] as number[];
    const isToday = effectiveDate === today;
    return servingSlots().filter((slot) => (isToday ? slot >= earliest : true));
  }, [now, effectiveDate, today, earliest]);

  useEffect(() => {
    if (time && !slots.includes(parseTimeValue(time) ?? -1)) setTime("");
  }, [slots, time]);

  function validate(): string[] {
    const list: string[] = [];
    if (detailed.length === 0) list.push("Your cart is empty. Please add items from the menu.");
    if (name.trim().length < 2) list.push("Please enter your name.");
    if (!isValidIndianMobile(phone)) list.push("Please enter a valid 10-digit WhatsApp number.");
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) list.push("Please enter a valid email address.");
    if (!effectiveDate) list.push("Please select a date.");
    if (!time) list.push("Please select a serving/delivery time.");
    if (now && effectiveDate && time) {
      const timingError = validateTiming({ orderType, date: effectiveDate, time }, now);
      if (timingError) list.push(timingError);
    }
    return list;
  }

  function handleSubmitClick(e: React.FormEvent) {
    e.preventDefault();
    const list = validate();
    setErrors(list);
    if (list.length === 0) setShowConfirm(true);
  }

  function finalizeOrder() {
    if (submitting) return;
    const current = new Date();
    const list = validate();
    if (list.length > 0) {
      setErrors(list);
      setShowConfirm(false);
      return;
    }
    setSubmitting(true);

    const order = {
      orderId: buildOrderId(current, nextSequence()),
      orderType,
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      items: detailed.map((l) => ({
        name: l.name,
        qty: l.qty,
        price: l.price,
        subtotal: l.subtotal,
      })),
      total,
      orderDate: toDateValue(current),
      orderTime: formatMinutes(minutesOfDay(current)),
      scheduledDate: effectiveDate,
      scheduledTime: formatMinutes(parseTimeValue(time) ?? 0),
      minimumServingTime: formatMinutes(earliestSameDayServing(current)),
      paymentMethod: payment === "UPI_ONLINE" ? "UPI (Online)" : "Cash on Delivery",
      paymentStatus: "Pending",
      orderStatus: orderType === "SAME_DAY" ? "Order Placed" : "Pre-Booked",
      instructions: instructions.trim(),
    };

    saveOrder(order);

    // Send to Google Sheets (fire-and-forget)
    sendOrderToSheet(order).catch(() => {
      /* non-blocking — order is saved locally regardless */
    });

    clear();
    setShowConfirm(false);
    void navigate({ to: "/confirmation" });
  }

  return (
    <div className="container-page py-10 pb-28 md:pb-16">
      <h1 className="font-display text-3xl font-semibold sm:text-4xl">Place Your Order</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        One form for both same-day orders and pre-bookings — just tell us when you need your food.
      </p>

      <div className="mt-6 max-w-3xl">
        <ImportantNotice />
      </div>

      {!windowState.open && (
        <p
          role="status"
          className="mt-4 max-w-3xl rounded-2xl border border-destructive/40 bg-destructive/10 p-4 text-sm font-medium text-destructive"
        >
          {windowState.message}
        </p>
      )}

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_20rem]">
        <form className="space-y-6" onSubmit={handleSubmitClick} noValidate>
          <fieldset className="card-surface space-y-4 p-5">
            <legend className="px-1 text-sm font-semibold uppercase tracking-wide">
              Customer details
            </legend>
            <div>
              <label htmlFor="name" className="mb-1 block text-sm font-medium">
                Customer Name
              </label>
              <input
                id="name"
                className="field-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                maxLength={80}
                required
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="phone" className="mb-1 block text-sm font-medium">
                  WhatsApp Mobile Number
                </label>
                <div className="flex items-center gap-2">
                  <span className="rounded-lg border border-input px-3 py-2 text-sm text-muted-foreground">
                    +91
                  </span>
                  <input
                    id="phone"
                    className="field-input"
                    inputMode="numeric"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="10-digit number"
                    autoComplete="tel"
                    maxLength={14}
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="mb-1 block text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="field-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  maxLength={120}
                  required
                />
              </div>
            </div>
          </fieldset>

          <fieldset className="card-surface space-y-4 p-5">
            <legend className="px-1 text-sm font-semibold uppercase tracking-wide">
              When would you like your food?
            </legend>
            <div className="grid gap-3 sm:grid-cols-2">
              {(
                [
                  { value: "SAME_DAY", label: "Same Day", hint: "Today, minimum 2 hours from now" },
                  { value: "PRE_ORDER", label: "Pre-Book for Later", hint: "Choose a future date" },
                ] as const
              ).map((opt) => (
                <label
                  key={opt.value}
                  className={
                    orderType === opt.value
                      ? "flex cursor-pointer gap-3 rounded-2xl border border-primary bg-accent/50 p-4"
                      : "flex cursor-pointer gap-3 rounded-2xl border border-border p-4"
                  }
                >
                  <input
                    type="radio"
                    name="orderType"
                    className="mt-1"
                    value={opt.value}
                    checked={orderType === opt.value}
                    onChange={() => {
                      setOrderType(opt.value);
                      setTime("");
                      if (opt.value === "SAME_DAY") setDate("");
                    }}
                  />
                  <span>
                    <span className="block font-semibold">{opt.label}</span>
                    <span className="block text-sm text-muted-foreground">{opt.hint}</span>
                  </span>
                </label>
              ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="date" className="mb-1 block text-sm font-medium">
                  Date
                </label>
                <input
                  id="date"
                  type="date"
                  className="field-input"
                  value={effectiveDate}
                  min={today}
                  max={maxDate}
                  disabled={orderType === "SAME_DAY"}
                  onChange={(e) => setDate(e.target.value)}
                />
                {orderType === "SAME_DAY" && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    Today's date is selected automatically.
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="time" className="mb-1 block text-sm font-medium">
                  Serving / Delivery Time
                </label>
                <select
                  id="time"
                  className="field-input"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                >
                  <option value="">Select a time</option>
                  {slots.map((slot) => (
                    <option key={slot} value={toTimeValue(slot)}>
                      {formatMinutes(slot)}
                    </option>
                  ))}
                </select>
                {now && effectiveDate === today && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    Earliest available today: {formatMinutes(earliest)}
                  </p>
                )}
                {slots.length === 0 && now && (
                  <p className="mt-1 text-xs text-destructive">
                    No serving slots remain for the selected date. Please pre-book for a later date.
                  </p>
                )}
              </div>
            </div>

            <p className="rounded-xl bg-muted p-3 text-sm text-muted-foreground">
              Same-day orders require a minimum serving time of 2 hours. Depending on the ordered
              item, your order may be served earlier.
            </p>
          </fieldset>

          <fieldset className="card-surface space-y-4 p-5">
            <legend className="px-1 text-sm font-semibold uppercase tracking-wide">
              Payment &amp; instructions
            </legend>
            <div className="grid gap-3 sm:grid-cols-2">
              {(
                [
                  { value: "UPI_ONLINE", label: "UPI (Online)" },
                  { value: "CASH", label: "Cash on Delivery" },
                ] as const
              ).map((opt) => (
                <label
                  key={opt.value}
                  className={
                    payment === opt.value
                      ? "flex cursor-pointer items-center gap-3 rounded-2xl border border-primary bg-accent/50 p-4 font-medium"
                      : "flex cursor-pointer items-center gap-3 rounded-2xl border border-border p-4"
                  }
                >
                  <input
                    type="radio"
                    name="payment"
                    value={opt.value}
                    checked={payment === opt.value}
                    onChange={() => setPayment(opt.value)}
                  />
                  {opt.label}
                </label>
              ))}
            </div>
            {/* UPI QR Code Section */}
            {payment === "UPI_ONLINE" && total > 0 && (
              <div className="rounded-2xl border border-primary/30 bg-accent/30 p-5">
                <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
                  <div className="flex flex-col items-center gap-2">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
                        `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(UPI_NAME)}&am=${total}&cu=INR&tn=${encodeURIComponent("Zaika Cloud Kitchen Order")}`
                      )}`}
                      alt="UPI QR Code"
                      width={180}
                      height={180}
                      className="rounded-xl border border-border bg-white p-2"
                    />
                    <span className="text-xs font-medium text-muted-foreground">
                      Scan to pay {formatCurrency(total)}
                    </span>
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <h4 className="font-semibold">Pay via UPI</h4>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Scan this QR code with any UPI app (Google Pay, PhonePe, Paytm, etc.) to complete payment.
                    </p>
                    <div className="mt-3 space-y-1.5">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="font-medium text-muted-foreground">UPI ID:</span>
                        <code className="rounded-lg bg-muted px-2 py-0.5 text-sm font-semibold">
                          {UPI_ID}
                        </code>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="font-medium text-muted-foreground">Amount:</span>
                        <span className="font-semibold text-primary">{formatCurrency(total)}</span>
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {["Google Pay", "PhonePe", "Paytm", "BHIM"].map((app) => (
                        <span
                          key={app}
                          className="inline-flex rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
                        >
                          {app}
                        </span>
                      ))}
                    </div>
                    <p className="mt-3 rounded-xl bg-muted p-3 text-xs text-muted-foreground">
                      After payment, please share the payment screenshot on WhatsApp for faster confirmation.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {payment === "UPI_ONLINE" && total === 0 && (
              <p className="text-sm text-muted-foreground">
                Add items to your cart to see the UPI QR code for payment.
              </p>
            )}

            <div>
              <label htmlFor="instructions" className="mb-1 block text-sm font-medium">
                Special Instructions (optional)
              </label>
              <textarea
                id="instructions"
                className="field-input min-h-24"
                value={instructions}
                maxLength={500}
                onChange={(e) => setInstructions(e.target.value)}
              />
            </div>
          </fieldset>

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
            type="submit"
            disabled={submitting || !windowState.open}
            className="btn-base btn-primary btn-primary-hover w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {submitting ? "Submitting…" : "Submit Order"}
          </button>
        </form>

        <aside className="card-surface h-fit p-5">
          <h2 className="text-lg font-semibold">Order summary</h2>
          {detailed.length === 0 ? (
            <>
              <p className="mt-3 text-sm text-muted-foreground">Your cart is empty.</p>
              <Link to="/menu" className="btn-base btn-soft mt-4 w-full">
                Browse the Menu
              </Link>
            </>
          ) : (
            <>
              <dl className="mt-4 space-y-2 text-sm">
                {detailed.map((line) => (
                  <div key={line.id} className="flex justify-between gap-3">
                    <dt className="text-muted-foreground">
                      {line.name} × {line.qty}
                    </dt>
                    <dd>{formatCurrency(line.subtotal)}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-4 flex justify-between border-t border-border pt-4 font-semibold">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
              <div className="mt-4 space-y-1 border-t border-border pt-4 text-sm text-muted-foreground">
                <p>Order type: {orderType === "SAME_DAY" ? "Same Day" : "Pre-Order"}</p>
                <p>Date: {effectiveDate || "—"}</p>
                <p>
                  Serving time:{" "}
                  {time ? formatMinutes(parseTimeValue(time) ?? 0) : "—"}
                </p>
                {now && effectiveDate === today && (
                  <p>Minimum serving time: {formatMinutes(earliest)}</p>
                )}
              </div>
            </>
          )}
        </aside>
      </div>

      {showConfirm && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-foreground/40 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-title"
        >
          <div className="card-surface w-full max-w-lg p-6">
            <h2 id="confirm-title" className="font-display text-2xl font-semibold">
              Please Note
            </h2>
            <div className="mt-4 space-y-3 text-sm text-muted-foreground">
              <p>This is primarily a pre-booking service.</p>
              <p>Order Time: 7:30 AM – 7:00 PM</p>
              <p>Same-Day Orders: Minimum 2 Hours Serving Time</p>
              <p>Depending on the ordered item, your order may be served earlier.</p>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                className="btn-base btn-outline"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn-base btn-primary btn-primary-hover disabled:opacity-60"
                disabled={submitting}
                onClick={finalizeOrder}
              >
                Confirm &amp; Submit Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
