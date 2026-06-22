import type { Metadata } from "next";
import { Suspense } from "react";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Cta } from "@/components/ui/cta";
import { BookingForm } from "@/components/forms/booking-form";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { clinic } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact & Booking",
  description:
    "Book an appointment or send an enquiry to Sphiwesihle Private Clinics & Pharmacies in KwaMhlanga. Call, WhatsApp, or use our online booking form.",
  alternates: { canonical: "/contact" },
};

const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
  `${clinic.address.line1}, ${clinic.address.city}, ${clinic.address.province}`
)}&z=14&output=embed`;

export default function ContactPage() {
  return (
    <>
      {/* Intro */}
      <section className="bg-surface">
        <Container className="py-14 sm:py-16">
          <div className="max-w-2xl">
            <p className="eyebrow text-brand-600">Contact &amp; Booking</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink sm:text-5xl text-balance">
              Book your visit or get in touch
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              Reserve an appointment online, or reach us directly by phone or
              WhatsApp. Walk-ins are welcome — booking just helps reduce waiting.
            </p>
          </div>

          {/* Quick contact cards */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <a
              href={clinic.phoneHref}
              className="flex items-center gap-3 rounded-card border border-border bg-bg p-4 shadow-soft hover:border-brand-200"
            >
              <span className="grid place-items-center h-10 w-10 rounded-xl bg-brand-50 text-brand-600">
                <Phone className="h-5 w-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-xs text-muted">Call us</span>
                <span className="block text-sm font-semibold text-ink">{clinic.phoneDisplay}</span>
              </span>
            </a>
            {clinic.phone2Display && clinic.phone2Href && (
              <a
                href={clinic.phone2Href}
                className="flex items-center gap-3 rounded-card border border-border bg-bg p-4 shadow-soft hover:border-brand-200"
              >
                <span className="grid place-items-center h-10 w-10 rounded-xl bg-brand-50 text-brand-600">
                  <Phone className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-xs text-muted">Call us</span>
                  <span className="block text-sm font-semibold text-ink">{clinic.phone2Display}</span>
                </span>
              </a>
            )}
            <a
              href={clinic.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-card border border-border bg-bg p-4 shadow-soft hover:border-brand-200"
            >
              <span className="grid place-items-center h-10 w-10 rounded-xl bg-whatsapp/10 text-whatsapp-dark">
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-xs text-muted">WhatsApp</span>
                <span className="block text-sm font-semibold text-ink">Chat with us</span>
              </span>
            </a>
            {clinic.emails.map((email) => (
              <a
                key={email}
                href={`mailto:${email}`}
                className="flex items-center gap-3 rounded-card border border-border bg-bg p-4 shadow-soft hover:border-brand-200"
              >
                <span className="grid place-items-center h-10 w-10 rounded-xl bg-brand-50 text-brand-600">
                  <Mail className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs text-muted">Email</span>
                  <span className="block truncate text-sm font-semibold text-ink">{email}</span>
                </span>
              </a>
            ))}
            <div className="flex items-center gap-3 rounded-card border border-border bg-bg p-4 shadow-soft">
              <span className="grid place-items-center h-10 w-10 rounded-xl bg-brand-50 text-brand-600">
                <MapPin className="h-5 w-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-xs text-muted">Visit</span>
                <span className="block text-sm font-semibold text-ink">{clinic.address.city}, {clinic.address.province}</span>
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* Booking form + sidebar */}
      <section id="book" className="scroll-mt-24 bg-bg">
        <Container className="py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-14">
            <div>
              <h2 className="text-2xl font-semibold text-ink sm:text-3xl">
                Book an appointment
              </h2>
              <p className="mt-2 text-ink-soft">
                Fill in your details and we'll confirm your slot.
              </p>
              <div className="mt-8 rounded-card border border-border bg-bg p-6 shadow-soft sm:p-8">
                <Suspense fallback={<p className="text-muted">Loading form…</p>}>
                  <BookingForm />
                </Suspense>
              </div>
            </div>

            {/* Hours + address sidebar */}
            <aside className="space-y-6">
              <div className="rounded-card border border-border bg-surface p-6 shadow-soft">
                <h3 className="flex items-center gap-2 text-base font-semibold text-ink">
                  <Clock className="h-5 w-5 text-brand-600" aria-hidden="true" />
                  Opening Hours
                </h3>
                <dl className="mt-4 space-y-2.5 text-sm">
                  {clinic.hours.map((h) => (
                    <div key={h.days} className="flex justify-between gap-4">
                      <dt className="text-ink-soft">{h.days}</dt>
                      <dd className={h.closed ? "font-medium text-danger" : "font-medium text-ink"}>
                        {h.hours}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="rounded-card border border-border bg-surface p-6 shadow-soft">
                <h3 className="flex items-center gap-2 text-base font-semibold text-ink">
                  <MapPin className="h-5 w-5 text-brand-600" aria-hidden="true" />
                  Our Location
                </h3>
                <p className="mt-3 text-sm text-ink-soft">
                  {clinic.address.line1}
                  <br />
                  {clinic.address.city}, {clinic.address.province}
                  <br />
                  {clinic.address.country}
                </p>
                {/* TODO: confirm exact street address & coordinates with client */}
                <Cta
                  href={clinic.whatsappUrl}
                  event="whatsapp_click"
                  eventData={{ location: "contact_sidebar" }}
                  variant="whatsapp"
                  size="sm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  Message on WhatsApp
                </Cta>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* Map */}
      <section aria-label="Map" className="bg-bg">
        <Container className="pb-16 sm:pb-20">
          <div className="overflow-hidden rounded-card border border-border shadow-soft">
            <iframe
              title={`Map showing ${clinic.name}`}
              src={mapSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[360px] w-full"
            />
          </div>
        </Container>
      </section>

      {/* Enquiry form */}
      <section className="bg-surface">
        <Container className="py-16 sm:py-20">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-2xl font-semibold text-ink sm:text-3xl text-center">
              Have a question?
            </h2>
            <p className="mt-2 text-center text-ink-soft">
              Send us an enquiry and our team will get back to you.
            </p>
            <div className="mt-8 rounded-card border border-border bg-bg p-6 shadow-soft sm:p-8">
              <EnquiryForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
