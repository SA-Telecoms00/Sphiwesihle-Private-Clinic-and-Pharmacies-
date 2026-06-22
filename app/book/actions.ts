"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { rateLimit, clientIpFromHeaders } from "@/lib/rate-limit";
import {
  initializeTransaction,
  depositEnabled,
  depositAmountZar,
} from "@/lib/paystack";

export type DepositState = { status: "idle" | "error"; message?: string };
export const initialDepositState: DepositState = { status: "idle" };

const schema = z.object({
  email: z.string().trim().email("Please enter a valid email address"),
  name: z.string().trim().max(80).optional().or(z.literal("")),
  service: z.string().trim().max(60).optional().or(z.literal("")),
});

async function originFromHeaders(): Promise<string> {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  const h = await headers();
  const host = h.get("host") ?? "localhost:3000";
  const proto = h.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  return `${proto}://${host}`;
}

export async function startDeposit(
  _prev: DepositState,
  formData: FormData
): Promise<DepositState> {
  if (formData.get("company")) return { status: "idle" };
  if (!depositEnabled) {
    return { status: "error", message: "Online deposits are not enabled yet." };
  }

  const h = await headers();
  const ip = clientIpFromHeaders(h);
  if (!rateLimit(`deposit:${ip}`, { limit: 5, windowMs: 60_000 }).ok) {
    return { status: "error", message: "Too many attempts. Please try again shortly." };
  }

  const parsed = schema.safeParse({
    email: formData.get("email"),
    name: formData.get("name") ?? "",
    service: formData.get("service") ?? "",
  });
  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.flatten().fieldErrors.email?.[0] ?? "Please check your details.",
    };
  }

  let authorizationUrl: string;
  try {
    const origin = await originFromHeaders();
    const result = await initializeTransaction({
      email: parsed.data.email,
      amountZar: depositAmountZar,
      callbackUrl: `${origin}/book/callback`,
      metadata: {
        name: parsed.data.name || undefined,
        service: parsed.data.service || undefined,
        purpose: "appointment_deposit",
      },
    });
    authorizationUrl = result.authorizationUrl;
  } catch {
    return {
      status: "error",
      message: "We couldn't start the payment. Please try again or pay at the clinic.",
    };
  }

  // Hand off to Paystack's hosted checkout — we never touch card data.
  redirect(authorizationUrl);
}
