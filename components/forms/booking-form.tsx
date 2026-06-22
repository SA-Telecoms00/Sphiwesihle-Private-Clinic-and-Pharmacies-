"use client";

import { useActionState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Loader2, CalendarCheck } from "lucide-react";
import {
  TextField,
  SelectField,
  TextAreaField,
  CheckboxField,
  Honeypot,
} from "./fields";
import { submitBooking } from "@/app/contact/actions";
import { initialFormState } from "@/lib/validation";
import { serviceOptions, clinic } from "@/lib/content";
import { timeSlots, todayISO } from "@/lib/booking";
import { trackEvent } from "@/lib/analytics";

export function BookingForm() {
  const params = useSearchParams();
  const preselected = params.get("service") ?? "";
  const [state, action, pending] = useActionState(submitBooking, initialFormState);

  useEffect(() => {
    if (state.status === "success") trackEvent("booking_submitted");
  }, [state.status]);

  if (state.status === "success") {
    return (
      <div className="rounded-card border border-brand-100 bg-brand-50 p-8 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-brand-600" aria-hidden="true" />
        <h3 className="mt-4 text-xl font-semibold text-ink">Booking received</h3>
        <p className="mt-2 text-ink-soft">{state.message}</p>
        <p className="mt-4 text-sm text-muted">
          Need it sooner? Call{" "}
          <a href={clinic.phoneHref} className="font-medium text-brand-700">
            {clinic.phoneDisplay}
          </a>{" "}
          or message us on WhatsApp.
        </p>
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

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="First name" name="firstName" required error={err.firstName} autoComplete="given-name" />
        <TextField label="Last name" name="lastName" required error={err.lastName} autoComplete="family-name" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Email" name="email" type="email" required error={err.email} autoComplete="email" />
        <TextField label="Phone" name="phone" type="tel" required error={err.phone} autoComplete="tel" />
      </div>

      <SelectField
        label="Select service"
        name="service"
        required
        error={err.service}
        defaultValue={preselected}
      >
        <option value="" disabled>
          Choose a service…
        </option>
        {serviceOptions.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </SelectField>

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Preferred date" name="date" type="date" required error={err.date} min={todayISO()} />
        <SelectField label="Preferred time" name="time" required error={err.time} defaultValue="">
          <option value="" disabled>
            Choose a time…
          </option>
          {timeSlots.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </SelectField>
      </div>

      <TextAreaField
        label="Additional information"
        name="additionalInfo"
        error={err.additionalInfo}
        placeholder="Anything we should know before your visit? (optional)"
      />

      <CheckboxField
        label={`I consent to ${clinic.shortName} collecting and processing my personal information for the purpose of booking an appointment.`}
        name="consent"
        required
        error={err.consent}
      />

      <button
        type="submit"
        disabled={pending}
        className="inline-flex w-full items-center justify-center gap-2 rounded-pill bg-brand-600 px-6 py-3.5 text-base font-medium text-white shadow-soft transition-colors hover:bg-brand-700 disabled:opacity-60 sm:w-auto"
      >
        {pending ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
            Submitting…
          </>
        ) : (
          <>
            <CalendarCheck className="h-5 w-5" aria-hidden="true" />
            Request Appointment
          </>
        )}
      </button>
      <p className="text-xs text-muted">
        Protected under POPIA. We use your details only to manage your booking.
      </p>
    </form>
  );
}
