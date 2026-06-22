import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Cta } from "@/components/ui/cta";
import { OpenStatusPill } from "@/components/ui/open-status-pill";
import { MessageCircle, CalendarCheck, Star, ShieldCheck, Phone } from "lucide-react";
import { clinic } from "@/lib/content";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-surface">
      {/* Layered premium background: soft brand glows + subtle dot grid */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -right-24 h-[34rem] w-[34rem] rounded-full bg-brand-200/50 blur-3xl" />
        <div className="absolute -bottom-40 -left-32 h-[30rem] w-[30rem] rounded-full bg-leaf-500/10 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage:
              "radial-gradient(var(--color-brand-200) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
            maskImage:
              "radial-gradient(ellipse 70% 60% at 70% 30%, #000 30%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 60% at 70% 30%, #000 30%, transparent 75%)",
          }}
        />
      </div>

      <Container className="relative grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.05fr_1fr] lg:gap-12 lg:py-24">
        {/* Copy */}
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-2 rounded-pill border border-brand-100 bg-bg/70 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-700 shadow-soft backdrop-blur">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            Trusted private healthcare · KwaMhlanga
          </span>

          <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-[3.6rem]">
            Affordable private healthcare you can{" "}
            <span className="relative whitespace-nowrap text-brand-600">
              trust
              <svg
                aria-hidden="true"
                viewBox="0 0 200 12"
                preserveAspectRatio="none"
                className="absolute -bottom-1.5 left-0 h-2.5 w-full text-brand-300"
              >
                <path
                  d="M2 9 C50 2, 150 2, 198 9"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-ink-soft">
            Professional primary care for the whole family — from everyday
            consultations to maternal, child and chronic care — delivered with
            warmth and respect at prices you can afford.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Cta href="/contact#book" event="book_click" eventData={{ location: "hero" }} size="lg">
              <CalendarCheck className="h-5 w-5" aria-hidden="true" />
              Book Appointment
            </Cta>
            <Cta
              href={clinic.whatsappUrl}
              event="whatsapp_click"
              eventData={{ location: "hero" }}
              variant="whatsapp"
              size="lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              WhatsApp Us
            </Cta>
          </div>

          {/* Trust row */}
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <div className="flex items-center gap-2">
              <div className="flex" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                ))}
              </div>
              <span className="text-sm font-medium text-ink-soft">
                5-star rated by our patients
              </span>
            </div>
            <a
              href={clinic.phoneHref}
              className="inline-flex items-center gap-2 text-sm font-medium text-ink-soft hover:text-brand-700"
            >
              <Phone className="h-4 w-4 text-brand-600" aria-hidden="true" />
              {clinic.phoneDisplay}
            </a>
          </div>
        </div>

        {/* Image composition */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative aspect-[4/5] w-full">
            {/* halo ring */}
            <div
              aria-hidden="true"
              className="absolute -inset-3 rounded-[2rem] bg-gradient-to-tr from-brand-600/15 to-transparent"
            />
            {/* main portrait */}
            <div className="relative h-full w-full overflow-hidden rounded-[1.75rem] shadow-lift ring-1 ring-black/5">
              <Image
                src="/images/photos/nurse-portrait.jpg"
                alt="Friendly qualified nurse at Sphiwesihle Private Clinic"
                fill
                priority
                sizes="(min-width: 1024px) 40vw, (min-width: 640px) 28rem, 90vw"
                className="object-cover"
              />
            </div>

            {/* floating: open status (top-left) */}
            <div className="absolute -left-3 top-6 rounded-2xl border border-white/60 bg-bg/85 px-3 py-2.5 shadow-card backdrop-blur sm:-left-6">
              <OpenStatusPill className="bg-transparent !px-0 !py-0" />
              <p className="mt-0.5 pl-[18px] text-[11px] text-muted">Mon–Sun 08:00–17:00</p>
            </div>

            {/* floating: inset consultation photo (bottom-right) */}
            <div className="absolute -bottom-5 -right-3 w-40 overflow-hidden rounded-2xl border-4 border-bg shadow-card sm:-right-6 sm:w-52">
              <div className="relative aspect-[3/2]">
                <Image
                  src="/images/photos/hero-consultation.jpg"
                  alt="Doctor consulting with a patient"
                  fill
                  sizes="13rem"
                  className="object-cover"
                />
              </div>
            </div>

            {/* floating: trust chip (bottom-left) */}
            <div className="absolute -bottom-4 left-2 flex items-center gap-2.5 rounded-2xl border border-white/60 bg-bg/85 px-3.5 py-2.5 shadow-card backdrop-blur sm:left-4">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-brand-50 text-brand-600">
                <ShieldCheck className="h-4.5 w-4.5" aria-hidden="true" />
              </span>
              <span className="text-xs font-semibold leading-tight text-ink">
                Qualified &amp; caring
                <span className="block font-normal text-muted">POPIA compliant</span>
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
