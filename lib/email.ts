import "server-only";
import { Resend } from "resend";
import { clinic } from "@/lib/content";

/**
 * Transactional email wrapper. Activates when RESEND_API_KEY (and optionally
 * RESEND_FROM) are configured; otherwise it degrades gracefully by logging
 * the submission server-side so nothing is lost in development.
 */
const apiKey = process.env.RESEND_API_KEY;
const from = process.env.RESEND_FROM ?? "Sphiwesihle Clinic <onboarding@resend.dev>";
const to = process.env.CONTACT_INBOX ?? clinic.email;

export const emailConfigured = Boolean(apiKey);

export async function sendNotification({
  subject,
  html,
  replyTo,
}: {
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<{ ok: boolean }> {
  if (!apiKey) {
    // Graceful stub — keep a server-side record until Resend is configured.
    console.info(
      `[email:stub] (set RESEND_API_KEY to deliver) To: ${to}\nSubject: ${subject}\nReply-To: ${replyTo ?? "-"}\n${html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()}`
    );
    return { ok: true };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      subject,
      html,
      ...(replyTo ? { replyTo } : {}),
    });
    if (error) {
      console.error("[email] Resend error:", error);
      return { ok: false };
    }
    return { ok: true };
  } catch (err) {
    console.error("[email] send failed:", err);
    return { ok: false };
  }
}

/** Tiny helper to render a labelled HTML row. */
export function row(label: string, value: string): string {
  return `<tr><td style="padding:6px 12px;color:#6b7a77;font:14px sans-serif">${label}</td><td style="padding:6px 12px;color:#0f1f1d;font:600 14px sans-serif">${escapeHtml(value)}</td></tr>`;
}

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
