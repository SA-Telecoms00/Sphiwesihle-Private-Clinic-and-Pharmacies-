import Link from "next/link";
import { Phone, Mail, MapPin, Clock, ArrowRight, MessageCircle } from "lucide-react";
import { Logo } from "./logo";
import { Container } from "@/components/ui/container";
import { Cta } from "@/components/ui/cta";
import { clinic, nav, services, badges } from "@/lib/content";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-brand-950 text-brand-50/80">
      {/* gradient accent line + ambient glow */}
      <div aria-hidden="true" className="h-1 w-full bg-gradient-to-r from-brand-500 via-leaf-500 to-brand-500" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-0 h-80 w-80 rounded-full bg-brand-500/20 blur-3xl"
      />

      {/* Top CTA band inside footer */}
      <Container className="relative">
        <div className="flex flex-col items-start justify-between gap-6 border-b border-white/10 py-12 md:flex-row md:items-center">
          <div>
            <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl text-balance">
              Ready to feel better? Let&apos;s get you booked.
            </h2>
            <p className="mt-2 text-brand-100/70">
              Same-day appointments available · Walk-ins welcome
            </p>
          </div>
          <div className="flex flex-shrink-0 flex-col gap-3 sm:flex-row">
            <Cta href="/contact#book" event="book_click" eventData={{ location: "footer" }} size="lg" variant="inverse">
              Book Appointment
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Cta>
            <Cta
              href={clinic.whatsappUrl}
              event="whatsapp_click"
              eventData={{ location: "footer" }}
              variant="whatsapp"
              size="lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              WhatsApp
            </Cta>
          </div>
        </div>
      </Container>

      {/* Main footer grid */}
      <Container className="relative py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12">
          {/* About */}
          <div className="lg:col-span-4 lg:pr-6">
            <Logo inverted />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-brand-100/70">
              {clinic.about}
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {badges.map((b) => (
                <li
                  key={b.label}
                  className="inline-flex items-center gap-1.5 rounded-pill bg-white/5 px-2.5 py-1 text-[11px] font-medium text-brand-100 ring-1 ring-white/10"
                >
                  <b.icon className="h-3.5 w-3.5 text-brand-300" aria-hidden="true" />
                  {b.label}
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <nav aria-label="Quick links" className="lg:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/90">
              Explore
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {nav.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-brand-100/70 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/book" className="text-brand-100/70 transition-colors hover:text-white">
                  Book Online
                </Link>
              </li>
            </ul>
          </nav>

          {/* Services */}
          <nav aria-label="Services" className="lg:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/90">
              Services
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {services.slice(0, 6).map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="text-brand-100/70 transition-colors hover:text-white"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/services" className="inline-flex items-center gap-1 font-medium text-brand-300 transition-colors hover:text-white">
                  View all
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </li>
            </ul>
          </nav>

          {/* Contact card */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/90">
              Get in touch
            </h3>
            <ul className="mt-4 space-y-3.5 text-sm">
              <li>
                <a href={clinic.phoneHref} className="group flex items-center gap-3 text-brand-100/80 hover:text-white">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10 group-hover:bg-white/10">
                    <Phone className="h-4 w-4 text-brand-300" aria-hidden="true" />
                  </span>
                  {clinic.phoneDisplay}
                </a>
              </li>
              {clinic.phone2Display && clinic.phone2Href && (
                <li>
                  <a href={clinic.phone2Href} className="group flex items-center gap-3 text-brand-100/80 hover:text-white">
                    <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10 group-hover:bg-white/10">
                      <Phone className="h-4 w-4 text-brand-300" aria-hidden="true" />
                    </span>
                    {clinic.phone2Display}
                  </a>
                </li>
              )}
              {clinic.emails.map((email) => (
                <li key={email}>
                  <a href={`mailto:${email}`} className="group flex items-center gap-3 text-brand-100/80 hover:text-white">
                    <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10 group-hover:bg-white/10">
                      <Mail className="h-4 w-4 text-brand-300" aria-hidden="true" />
                    </span>
                    <span className="break-all">{email}</span>
                  </a>
                </li>
              ))}
              <li className="flex items-start gap-3 text-brand-100/80">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10">
                  <MapPin className="h-4 w-4 text-brand-300" aria-hidden="true" />
                </span>
                <span>
                  {clinic.address.line1},<br />
                  {clinic.address.city}, {clinic.address.province}
                </span>
              </li>
            </ul>

            {/* Hours mini-card */}
            <div className="mt-5 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/90">
                <Clock className="h-4 w-4 text-brand-300" aria-hidden="true" />
                Opening hours
              </p>
              <dl className="mt-2.5 space-y-1.5 text-xs">
                {clinic.hours.map((h) => (
                  <div key={h.days} className="flex justify-between gap-3">
                    <dt className="text-brand-100/60">{h.days}</dt>
                    <dd className={h.closed ? "text-rose-300" : "font-medium text-brand-50"}>
                      {h.hours}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </Container>

      {/* Bottom bar */}
      <div className="relative border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 pb-24 text-center text-xs text-brand-100/60 sm:flex-row sm:pb-6 sm:text-left">
          <p>© {year} {clinic.name}. All rights reserved.</p>
          <p className="flex flex-wrap items-center justify-center gap-x-2">
            <span>{clinic.tagline}</span>
            <span aria-hidden="true">·</span>
            <span>POPIA Compliant</span>
          </p>
        </Container>
      </div>
    </footer>
  );
}
