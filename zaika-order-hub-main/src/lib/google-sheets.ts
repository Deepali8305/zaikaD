/**
 * Google Sheets integration via Google Apps Script Web App.
 *
 * HOW TO SET UP:
 * 1. Go to https://script.google.com and create a new project.
 * 2. Paste this Apps Script code:
 *
 * ------- Google Apps Script Code (paste in script.google.com) -------
 *
 * const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID_HERE';
 *
 * function doPost(e) {
 *   var lock = LockService.getScriptLock();
 *   lock.tryLock(10000);
 *
 *   try {
 *     var data = JSON.parse(e.postData.contents);
 *     var sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(data.sheet);
 *
 *     if (!sheet) {
 *       sheet = SpreadsheetApp.openById(SHEET_ID).insertSheet(data.sheet);
 *       sheet.appendRow(data.headers);
 *       sheet.getRange(1, 1, 1, data.headers.length)
 *         .setFontWeight('bold')
 *         .setBackground('#4CAF50')
 *         .setFontColor('#FFFFFF');
 *     }
 *
 *     sheet.appendRow(data.row);
 *
 *     return ContentService
 *       .createTextOutput(JSON.stringify({ result: 'success' }))
 *       .setMimeType(ContentService.MimeType.JSON);
 *   } catch (error) {
 *     return ContentService
 *       .createTextOutput(JSON.stringify({ result: 'error', error: error.toString() }))
 *       .setMimeType(ContentService.MimeType.JSON);
 *   } finally {
 *     lock.releaseLock();
 *   }
 * }
 *
 * function doGet(e) {
 *   return ContentService
 *     .createTextOutput(JSON.stringify({ result: 'ready' }))
 *     .setMimeType(ContentService.MimeType.JSON);
 * }
 *
 * ------- End Apps Script Code -------
 *
 * 3. Deploy as Web App:
 *    - Click Deploy → New deployment
 *    - Select "Web app"
 *    - Execute as: "Me"
 *    - Who has access: "Anyone"
 *    - Click Deploy and copy the URL
 *
 * 4. Replace the URL below with your deployment URL.
 */

// ⚠️ REPLACE THIS with your actual Google Apps Script Web App URL
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzgqutgP9BZqhhBWoiIoemP6WyUS4kI7XoOfapIlpaZV83x5SI3bzA4VRmgx0xaSe2o6g/exec";

export type SheetPayload = {
  sheet: string;
  headers: string[];
  row: (string | number)[];
};

export async function sendToGoogleSheet(payload: SheetPayload): Promise<boolean> {
  if (APPS_SCRIPT_URL === "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE") {
    console.warn(
      "[Google Sheets] URL not configured. Open src/lib/google-sheets.ts and follow the setup instructions."
    );
    return false;
  }

  try {
    const res = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
    });
    const json = await res.json();
    return json.result === "success";
  } catch (err) {
    console.error("[Google Sheets] Failed to send data:", err);
    return false;
  }
}

/** Send order data to the "Orders" sheet */
export function sendOrderToSheet(order: {
  orderId: string;
  orderType: string;
  name: string;
  phone: string;
  email: string;
  items: { name: string; qty: number; price: number; subtotal: number }[];
  total: number;
  orderDate: string;
  orderTime: string;
  scheduledDate: string;
  scheduledTime: string;
  paymentMethod: string;
  paymentStatus: string;
  orderStatus: string;
  instructions: string;
}) {
  const itemsSummary = order.items.map((i) => `${i.name} x${i.qty}`).join(", ");
  const itemsDetail = order.items
    .map((i) => `${i.name} x${i.qty} = ₹${i.subtotal}`)
    .join(" | ");

  return sendToGoogleSheet({
    sheet: "Orders",
    headers: [
      "Order ID",
      "Order Type",
      "Customer Name",
      "Phone",
      "Email",
      "Items Summary",
      "Items Detail",
      "Total (₹)",
      "Order Date",
      "Order Time",
      "Scheduled Date",
      "Scheduled Time",
      "Payment Method",
      "Payment Status",
      "Order Status",
      "Special Instructions",
      "Timestamp",
    ],
    row: [
      order.orderId,
      order.orderType === "SAME_DAY" ? "Same Day" : "Pre-Order",
      order.name,
      order.phone,
      order.email,
      itemsSummary,
      itemsDetail,
      order.total,
      order.orderDate,
      order.orderTime,
      order.scheduledDate,
      order.scheduledTime,
      order.paymentMethod,
      order.paymentStatus,
      order.orderStatus,
      order.instructions,
      new Date().toISOString(),
    ],
  });
}

/** Send contact form data to the "ContactMessages" sheet */
export function sendContactToSheet(data: {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
}) {
  return sendToGoogleSheet({
    sheet: "ContactMessages",
    headers: ["Name", "Phone", "Email", "Subject", "Message", "Timestamp"],
    row: [data.name, data.phone, data.email, data.subject, data.message, new Date().toISOString()],
  });
}

/** Send review data to the "Reviews" sheet */
export function sendReviewToSheet(data: {
  name: string;
  rating: number;
  foodItem: string;
  review: string;
}) {
  return sendToGoogleSheet({
    sheet: "Reviews",
    headers: ["Name", "Rating", "Food Item", "Review", "Timestamp"],
    row: [data.name, data.rating, data.foodItem, data.review, new Date().toISOString()],
  });
}
