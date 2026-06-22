import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, XCircle, Info } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { depositEnabled, verifyTransaction } from "@/lib/paystack";
import { clinic } from "@/lib/content";

export const metadata: Metadata = {
  title: "Payment Confirmation",
  robots: { index: false },
};

type Outcome = "success" | "failed" | "unknown";

export default async function CallbackPage({
  searchParams,
}: {
  searchParams: Promise<{ reference?: string; trxref?: string }>;
}) {
  const { reference, trxref } = await searchParams;
  const ref = reference ?? trxref;

  let outcome: Outcome = "unknown";
  let amount = 0;

  if (depositEnabled && ref) {
    try {
      const result = await verifyTransaction(ref);
      outcome = result.success ? "success" : "failed";
      amount = result.amountZar;
    } catch {
      outcome = "unknown";
    }
  }

  const ui = {
    success: {
      icon: <CheckCircle2 className="mx-auto h-14 w-14 text-brand-600" aria-hidden="true" />,
      title: "Deposit received — your slot is secured",
      body: `Thank you! We've received your R${amount} deposit${ref ? ` (ref ${ref})` : ""}. You'll get appointment confirmation via SMS and email. The deposit is applied to your visit.`,
    },
    failed: {
      icon: <XCircle className="mx-auto h-14 w-14 text-danger" aria-hidden="true" />,
      title: "Payment not completed",
      body: "Your payment wasn't completed, so no slot was reserved. You can try again, or simply call or WhatsApp us to book — payment at the clinic is always an option.",
    },
    unknown: {
      icon: <Info className="mx-auto h-14 w-14 text-warning" aria-hidden="true" />,
      title: "We couldn't confirm this payment",
      body: "If money left your account, don't worry — please contact us with your reference and we'll sort it out right away.",
    },
  }[outcome];

  return (
    <section className="bg-surface">
      <Container className="py-20 sm:py-28">
        <div className="mx-auto max-w-xl rounded-card border border-border bg-bg p-8 text-center shadow-soft sm:p-12">
          {ui.icon}
          <h1 className="mt-5 text-2xl font-semibold text-ink sm:text-3xl">{ui.title}</h1>
          <p className="mt-3 text-ink-soft leading-relaxed">{ui.body}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/" variant="outline">Back to Home</Button>
            {outcome !== "success" && (
              <Button href={clinic.whatsappUrl} variant="whatsapp">
                Contact us on WhatsApp
              </Button>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
