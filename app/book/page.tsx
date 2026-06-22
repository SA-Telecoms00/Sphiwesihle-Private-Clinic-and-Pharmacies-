import type { Metadata } from "next";
import { Suspense } from "react";
import { ShieldCheck, Wallet, Clock, BadgeCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { BookingForm } from "@/components/forms/booking-form";
import { DepositForm } from "@/components/forms/deposit-form";
import { depositEnabled, depositAmountZar } from "@/lib/paystack";

export const metadata: Metadata = {
  title: "Book an Appointment",
  description:
    "Book your appointment at Sphiwesihle Private Clinics & Pharmacies. Optionally secure your slot with a quick online deposit via Paystack.",
  alternates: { canonical: "/book" },
};

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const { service } = await searchParams;

  return (
    <section className="bg-bg">
      <Container className="py-14 sm:py-20">
        <div className="max-w-2xl">
          <p className="eyebrow text-brand-600">Book an Appointment</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink sm:text-5xl text-balance">
            Reserve your visit in a minute
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">
            Tell us when suits you and we'll confirm your slot by SMS and email.
            Same-day appointments are available for urgent cases.
          </p>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-14">
          <div className="rounded-card border border-border bg-bg p-6 shadow-soft sm:p-8">
            <Suspense fallback={<p className="text-muted">Loading form…</p>}>
              <BookingForm />
            </Suspense>
          </div>

          <aside className="space-y-6">
            {depositEnabled ? (
              <div className="rounded-card border border-brand-100 bg-brand-50 p-6 shadow-soft">
                <h2 className="flex items-center gap-2 text-base font-semibold text-ink">
                  <ShieldCheck className="h-5 w-5 text-brand-600" aria-hidden="true" />
                  Secure your slot (optional)
                </h2>
                <p className="mt-2 text-sm text-ink-soft">
                  Pay a small R{depositAmountZar} deposit to lock in your
                  appointment. It's applied to your visit — pay the rest at the
                  clinic.
                </p>
                <div className="mt-5 rounded-xl bg-bg p-4">
                  <Suspense fallback={null}>
                    <DepositForm amountZar={depositAmountZar} service={service} />
                  </Suspense>
                </div>
              </div>
            ) : (
              <div className="rounded-card border border-border bg-surface p-6 shadow-soft">
                <h2 className="flex items-center gap-2 text-base font-semibold text-ink">
                  <Wallet className="h-5 w-5 text-brand-600" aria-hidden="true" />
                  Flexible payment options
                </h2>
                <ul className="mt-4 space-y-2.5 text-sm text-ink-soft">
                  <li>Cash, debit &amp; credit cards, and mobile payments</li>
                  <li>Most major medical aids accepted</li>
                  <li>Affordable cash rates available</li>
                  <li>Secure online deposits coming soon</li>
                </ul>
              </div>
            )}

            <ul className="space-y-3 rounded-card border border-border bg-bg p-6 text-sm shadow-soft">
              <li className="flex items-center gap-3 text-ink-soft">
                <Clock className="h-5 w-5 text-brand-600" aria-hidden="true" />
                Same-day appointments for urgent cases
              </li>
              <li className="flex items-center gap-3 text-ink-soft">
                <BadgeCheck className="h-5 w-5 text-brand-600" aria-hidden="true" />
                Qualified, friendly healthcare professionals
              </li>
              <li className="flex items-center gap-3 text-ink-soft">
                <ShieldCheck className="h-5 w-5 text-brand-600" aria-hidden="true" />
                POPIA compliant — your data stays private
              </li>
            </ul>
          </aside>
        </div>
      </Container>
    </section>
  );
}
