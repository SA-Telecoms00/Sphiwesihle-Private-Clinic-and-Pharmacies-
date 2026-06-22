"use client";

import { useActionState, useEffect } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import {
  TextField,
  SelectField,
  TextAreaField,
  Honeypot,
} from "./fields";
import { submitEnquiry } from "@/app/contact/actions";
import { initialFormState } from "@/lib/validation";
import { serviceOptions } from "@/lib/content";
import { trackEvent } from "@/lib/analytics";

export function EnquiryForm() {
  const [state, action, pending] = useActionState(submitEnquiry, initialFormState);

  useEffect(() => {
    if (state.status === "success") trackEvent("enquiry_submitted");
  }, [state.status]);

  if (state.status === "success") {
    return (
      <div className="rounded-card border border-brand-100 bg-brand-50 p-8 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-brand-600" aria-hidden="true" />
        <h3 className="mt-4 text-xl font-semibold text-ink">Message sent</h3>
        <p className="mt-2 text-ink-soft">{state.message}</p>
      </div>
    );
  }

  const err = state.errors ?? {};

  return (
    <form action={action} noValidate className="relative space-y-5">
      <Honeypot />

      {state.status === "error" && state.message && (
        <p
          role="alert"
          className="rounded-xl border border-danger/30 bg-danger/5 px-4 py-3 text-sm font-medium text-danger"
        >
          {state.message}
        </p>
      )}

      <TextField label="Full name" name="fullName" required error={err.fullName} autoComplete="name" />

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Phone" name="phone" type="tel" required error={err.phone} autoComplete="tel" />
        <TextField label="Email" name="email" type="email" error={err.email} autoComplete="email" />
      </div>

      <SelectField label="Service needed" name="service" error={err.service} defaultValue="">
        <option value="">No specific service</option>
        {serviceOptions.map((o) => (
          <option key={o.value} value={o.label}>
            {o.label}
          </option>
        ))}
      </SelectField>

      <TextAreaField
        label="Message"
        name="message"
        required
        error={err.message}
        placeholder="How can we help you?"
      />

      <button
        type="submit"
        disabled={pending}
        className="inline-flex w-full items-center justify-center gap-2 rounded-pill border border-border bg-bg px-6 py-3.5 text-base font-medium text-ink shadow-soft transition-colors hover:bg-surface hover:border-brand-200 disabled:opacity-60 sm:w-auto"
      >
        {pending ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          <>
            <Send className="h-5 w-5" aria-hidden="true" />
            Send Enquiry
          </>
        )}
      </button>
    </form>
  );
}
