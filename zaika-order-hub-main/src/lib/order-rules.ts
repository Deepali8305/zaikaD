/** Business rules for Zaika Cloud Kitchen ordering. */

export const ORDER_START_MINUTES = 7 * 60 + 30; // 7:30 AM
export const ORDER_END_MINUTES = 19 * 60; // 7:00 PM
export const SAME_DAY_MIN_LEAD_MINUTES = 120; // 2 hours
export const SLOT_INTERVAL_MINUTES = 30;
export const MAX_PRE_BOOKING_DAYS = 30;

/** Slots offered for serving / delivery (07:00 – 22:00). */
export const SERVING_SLOT_START = 7 * 60;
export const SERVING_SLOT_END = 22 * 60;

export type OrderType = "SAME_DAY" | "PRE_ORDER";

export function minutesOfDay(date: Date) {
  return date.getHours() * 60 + date.getMinutes();
}

export function formatMinutes(total: number) {
  const h24 = Math.floor(total / 60);
  const m = total % 60;
  const suffix = h24 >= 12 ? "PM" : "AM";
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h12}:${String(m).padStart(2, "0")} ${suffix}`;
}

export function toTimeValue(total: number) {
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
}

export function parseTimeValue(value: string) {
  const parts = value.split(":");
  const h = Number(parts[0]);
  const m = Number(parts[1]);
  if (Number.isNaN(h) || Number.isNaN(m)) return null;
  return h * 60 + m;
}

export function toDateValue(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export const ORDER_WINDOW_TEXT = `Orders can be placed between ${formatMinutes(
  ORDER_START_MINUTES,
)} and ${formatMinutes(ORDER_END_MINUTES)}.`;

export const IMPORTANT_NOTICE =
  "Important: This app is primarily for pre-booking. Orders can be placed between 7:30 AM and 7:00 PM. For same-day orders, the minimum serving time is 2 hours. Depending on the ordered item, your order may be served earlier.";

/** Is the current clock time inside the order placement window? */
export function orderWindowState(now: Date) {
  const mins = minutesOfDay(now);
  if (mins < ORDER_START_MINUTES) {
    return {
      open: false,
      message: "Orders can be placed between 7:30 AM and 7:00 PM.",
    };
  }
  if (mins > ORDER_END_MINUTES) {
    return {
      open: false,
      message:
        "Orders are currently closed. Orders can be placed between 7:30 AM and 7:00 PM.",
    };
  }
  return { open: true, message: "" };
}

export function earliestSameDayServing(now: Date) {
  return minutesOfDay(now) + SAME_DAY_MIN_LEAD_MINUTES;
}

export function servingSlots() {
  const slots: number[] = [];
  for (let m = SERVING_SLOT_START; m <= SERVING_SLOT_END; m += SLOT_INTERVAL_MINUTES) {
    slots.push(m);
  }
  return slots;
}

export type OrderTimingInput = {
  orderType: OrderType;
  date: string; // yyyy-mm-dd
  time: string; // HH:mm
};

/** Server-safe validation of the timing rules. Returns an error string or null. */
export function validateTiming(input: OrderTimingInput, now: Date): string | null {
  const window = orderWindowState(now);
  if (!window.open) return window.message;

  const minutes = parseTimeValue(input.time);
  if (minutes === null) return "Please select a valid serving/delivery time.";

  const today = toDateValue(now);

  if (input.orderType === "SAME_DAY") {
    if (input.date !== today) return "Same-day orders must be scheduled for today.";
    if (minutes < earliestSameDayServing(now)) {
      return "Same-day orders require a minimum serving time of 2 hours.";
    }
    return null;
  }

  if (!input.date) return "Please select a date for your pre-booking.";
  if (input.date < today) return "The selected date is in the past.";
  if (input.date === today && minutes < earliestSameDayServing(now)) {
    return "Same-day orders require a minimum serving time of 2 hours.";
  }
  const maxDate = new Date(now.getTime());
  maxDate.setDate(maxDate.getDate() + MAX_PRE_BOOKING_DAYS);
  if (input.date > toDateValue(maxDate)) {
    return `Pre-bookings can be made up to ${MAX_PRE_BOOKING_DAYS} days in advance.`;
  }
  return null;
}

export function isValidIndianMobile(raw: string) {
  const digits = raw.replace(/\D/g, "");
  const local = digits.length > 10 ? digits.slice(-10) : digits;
  return /^[6-9]\d{9}$/.test(local);
}

export function toWhatsAppNumber(raw: string) {
  const digits = raw.replace(/\D/g, "");
  const local = digits.length > 10 ? digits.slice(-10) : digits;
  return `91${local}`;
}

export function formatCurrency(amount: number) {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export function buildOrderId(now: Date, sequence: number) {
  const datePart = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(
    now.getDate(),
  ).padStart(2, "0")}`;
  return `ZCK-${datePart}-${String(sequence).padStart(3, "0")}`;
}
