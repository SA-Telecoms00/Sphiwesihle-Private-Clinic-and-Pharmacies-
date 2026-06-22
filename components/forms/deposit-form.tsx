"use client";

import { useActionState } from "react";
import { Loader2, ShieldCheck, CreditCard } from "lucide-react";
import { TextField, Honeypot } from "./fields";
import { startDeposit, initialDepositState } from "@/app/book/actions";
import { trackEvent } from "@/lib/analytics";

export function DepositForm({
  amountZar,
  service,
}: {
  amountZar: number;
  service?: string;
}) {
  const [state, action, pending] = useActionState(startDeposit, initialDepositState);

  return (
    <form
      action={action}
      noValidate
      className="relative space-y-4"
      onSubmit={() => trackEvent("deposit_started", { amount: amountZar })}
    >
      <Honeypot />
      {service && <input type="hidden" name="service" value={service} />}

      {state.status === "error" && state.message && (
        <p role="alert" className="rounded-xl border border-danger/30 bg-danger/5 px-4 py-3 text-sm font-medium text-danger">
          {state.message}
        </p>
      )}

      <TextField label="Your name" name="name" autoComplete="name" placeholder="Optional" />
      <TextField label="Email for receipt" name="email" type="email" required autoComplete="email" />

      <button
        type="submit"
        disabled={pending}
        className="inline-flex w-full items-center justify-center gap-2 rounded-pill bg-brand-600 px-6 py-3.5 text-base font-medium text-white shadow-soft transition-colors hover:bg-brand-700 disabled:opacity-60"
      >
        {pending ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
            Redirecting to secure checkout…
          </>
        ) : (
          <>
            <CreditCard className="h-5 w-5" aria-hidden="true" />
            Pay R{amountZar} deposit
          </>
        )}
      </button>

      <p className="flex items-center justify-center gap-1.5 text-xs text-muted">
        <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
        Secured by Paystack · we never see your card details
      </p>
    </form>
  );
}
