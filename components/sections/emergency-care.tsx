import { Container } from "@/components/ui/container";
import { Cta } from "@/components/ui/cta";
import { Phone, MessageCircle, AlertTriangle, Check } from "lucide-react";
import { emergencyCare, clinic } from "@/lib/content";

export function EmergencyCare() {
  const Icon = emergencyCare.icon;
  return (
    <section id="emergency-care" className="bg-bg scroll-mt-24">
      <Container className="py-16 sm:py-20">
        <div className="overflow-hidden rounded-card border border-danger/20 bg-gradient-to-br from-rose-50 to-bg shadow-soft">
          <div className="grid gap-8 p-8 sm:p-10 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-pill bg-danger/10 px-3 py-1.5 text-sm font-semibold text-danger">
                <Icon className="h-4 w-4" aria-hidden="true" />
                Emergency Care
              </span>
              <h2 className="mt-4 text-2xl font-semibold text-ink sm:text-3xl">
                Urgent care when you need it most
              </h2>
              <p className="mt-3 text-ink-soft leading-relaxed">
                {emergencyCare.blurb}
              </p>

              <div
                role="note"
                className="mt-5 flex items-start gap-3 rounded-xl border border-warning/30 bg-warning/10 p-4 text-sm text-ink"
              >
                <AlertTriangle className="h-5 w-5 shrink-0 text-warning" aria-hidden="true" />
                <p>{emergencyCare.disclaimer}</p>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Cta
                  href={clinic.phoneHref}
                  event="call_click"
                  eventData={{ location: "emergency" }}
                  variant="danger"
                  size="lg"
                >
                  <Phone className="h-5 w-5" aria-hidden="true" />
                  Call {clinic.phoneDisplay}
                </Cta>
                <Cta
                  href={clinic.whatsappUrl}
                  event="whatsapp_click"
                  eventData={{ location: "emergency" }}
                  variant="whatsapp"
                  size="lg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-5 w-5" aria-hidden="true" />
                  WhatsApp Us
                </Cta>
              </div>
            </div>

            <ul className="grid gap-3 sm:grid-cols-1">
              {emergencyCare.includes.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 rounded-xl bg-bg/70 px-4 py-3 text-sm font-medium text-ink shadow-soft"
                >
                  <span className="grid place-items-center h-6 w-6 shrink-0 rounded-full bg-danger/10 text-danger">
                    <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
