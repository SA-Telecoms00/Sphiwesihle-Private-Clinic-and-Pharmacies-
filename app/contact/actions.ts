"use server";

import { headers } from "next/headers";
import { bookingSchema, enquirySchema, type FormState } from "@/lib/validation";
import { rateLimit, clientIpFromHeaders } from "@/lib/rate-limit";
import { sendNotification, row, escapeHtml } from "@/lib/email";
import { services, clinic } from "@/lib/content";

function serviceLabel(value: string): string {
  if (value === "other") return "Other";
  return services.find((s) => s.slug === value)?.title ?? value;
}

function fieldErrors(
  flatten: { fieldErrors: Record<string, string[] | undefined> }
): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(flatten.fieldErrors)) {
    if (v && v[0]) out[k] = v[0];
  }
  return out;
}

async function guard(): Promise<FormState | null> {
  const h = await headers();
  const ip = clientIpFromHeaders(h);
  const { ok } = rateLimit(`form:${ip}`, { limit: 5, windowMs: 60_000 });
  if (!ok) {
    return {
      status: "error",
      message: "Too many submissions. Please try again in a minute.",
    };
  }
  return null;
}

export async function submitBooking(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  // Honeypot — bots fill hidden fields; pretend success.
  if (formData.get("company")) return { status: "success" };

  const limited = await guard();
  if (limited) return limited;

  const parsed = bookingSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    service: formData.get("service"),
    date: formData.get("date"),
    time: formData.get("time"),
    additionalInfo: formData.get("additionalInfo") ?? "",
    consent: formData.get("consent") ?? "",
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      errors: fieldErrors(parsed.error.flatten()),
    };
  }

  const d = parsed.data;
  const html = `
    <h2 style="font:600 18px sans-serif;color:#0f1f1d">New appointment booking</h2>
    <table style="border-collapse:collapse">
      ${row("Name", `${d.firstName} ${d.lastName}`)}
      ${row("Email", d.email)}
      ${row("Phone", d.phone)}
      ${row("Service", serviceLabel(d.service))}
      ${row("Preferred date", d.date)}
      ${row("Preferred time", d.time)}
      ${d.additionalInfo ? row("Notes", d.additionalInfo) : ""}
    </table>
    <p style="font:13px sans-serif;color:#6b7a77">Submitted via ${escapeHtml(clinic.name)} website.</p>
  `;

  const { ok } = await sendNotification({
    subject: `New booking — ${d.firstName} ${d.lastName} (${serviceLabel(d.service)})`,
    html,
    replyTo: d.email,
  });

  if (!ok) {
    return {
      status: "error",
      message:
        "Sorry, we couldn't submit your booking. Please call or WhatsApp us instead.",
    };
  }

  return {
    status: "success",
    message:
      "Thank you! Your booking request has been received. You will receive confirmation via SMS and email.",
  };
}

export async function submitEnquiry(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  if (formData.get("company")) return { status: "success" };

  const limited = await guard();
  if (limited) return limited;

  const parsed = enquirySchema.safeParse({
    fullName: formData.get("fullName"),
    phone: formData.get("phone"),
    email: formData.get("email") ?? "",
    service: formData.get("service") ?? "",
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      errors: fieldErrors(parsed.error.flatten()),
    };
  }

  const d = parsed.data;
  const html = `
    <h2 style="font:600 18px sans-serif;color:#0f1f1d">New enquiry</h2>
    <table style="border-collapse:collapse">
      ${row("Name", d.fullName)}
      ${row("Phone", d.phone)}
      ${d.email ? row("Email", d.email) : ""}
      ${d.service ? row("Service needed", d.service) : ""}
      ${row("Message", d.message)}
    </table>
    <p style="font:13px sans-serif;color:#6b7a77">Submitted via ${escapeHtml(clinic.name)} website.</p>
  `;

  const { ok } = await sendNotification({
    subject: `New enquiry — ${d.fullName}`,
    html,
    replyTo: d.email || undefined,
  });

  if (!ok) {
    return {
      status: "error",
      message:
        "Sorry, we couldn't send your enquiry. Please call or WhatsApp us instead.",
    };
  }

  return {
    status: "success",
    message: "Thanks for reaching out! We'll get back to you as soon as we can.",
  };
}
