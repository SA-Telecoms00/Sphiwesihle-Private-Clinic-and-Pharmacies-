import "server-only";

/**
 * Paystack integration (South-Africa-friendly). We NEVER collect raw card
 * data — we initialise a transaction server-side and redirect the customer
 * to Paystack's hosted checkout, then verify the result on callback.
 *
 * Enabled only when PAYSTACK_SECRET_KEY is set, so the whole deposit flow is
 * env-flagged and safe to ship before payments are configured.
 */
const SECRET = process.env.PAYSTACK_SECRET_KEY;
const API = "https://api.paystack.co";

/** Deposit amount in ZAR (major units). Configurable via env. */
export const depositAmountZar = Number(process.env.PAYSTACK_DEPOSIT_AMOUNT ?? 150);

/** Whether the optional deposit flow is available. */
export const depositEnabled = Boolean(SECRET);

export interface InitResult {
  authorizationUrl: string;
  reference: string;
}

export async function initializeTransaction({
  email,
  amountZar,
  callbackUrl,
  metadata,
}: {
  email: string;
  amountZar: number;
  callbackUrl: string;
  metadata?: Record<string, unknown>;
}): Promise<InitResult> {
  if (!SECRET) throw new Error("Paystack is not configured");

  const reference = `sphiwe_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

  const res = await fetch(`${API}/transaction/initialize`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${SECRET}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      amount: Math.round(amountZar * 100), // ZAR → cents
      currency: "ZAR",
      reference,
      callback_url: callbackUrl,
      metadata,
    }),
    cache: "no-store",
  });

  const json = (await res.json()) as {
    status: boolean;
    message: string;
    data?: { authorization_url: string; reference: string };
  };

  if (!res.ok || !json.status || !json.data) {
    throw new Error(json.message || "Failed to initialise payment");
  }

  return {
    authorizationUrl: json.data.authorization_url,
    reference: json.data.reference,
  };
}

export interface VerifyResult {
  success: boolean;
  reference: string;
  amountZar: number;
  customerEmail?: string;
}

export async function verifyTransaction(reference: string): Promise<VerifyResult> {
  if (!SECRET) throw new Error("Paystack is not configured");

  const res = await fetch(`${API}/transaction/verify/${encodeURIComponent(reference)}`, {
    headers: { Authorization: `Bearer ${SECRET}` },
    cache: "no-store",
  });

  const json = (await res.json()) as {
    status: boolean;
    data?: { status: string; amount: number; customer?: { email?: string } };
  };

  const ok = Boolean(json.status && json.data?.status === "success");
  return {
    success: ok,
    reference,
    amountZar: json.data ? json.data.amount / 100 : 0,
    customerEmail: json.data?.customer?.email,
  };
}
