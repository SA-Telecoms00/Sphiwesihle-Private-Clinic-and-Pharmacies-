import { track } from "@vercel/analytics";

/**
 * Pluggable analytics event hook. Centralises conversion events so we can
 * swap or add providers (GA4, PostHog, …) in one place. Currently forwards
 * to Vercel Analytics custom events.
 */
export type AnalyticsEvent =
  | "book_click"
  | "whatsapp_click"
  | "call_click"
  | "booking_submitted"
  | "enquiry_submitted"
  | "deposit_started";

export function trackEvent(
  event: AnalyticsEvent,
  data?: Record<string, string | number | boolean>
): void {
  try {
    track(event, data);
  } catch {
    // Never let analytics break the UI.
  }
}
