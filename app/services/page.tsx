import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { ServiceDetailBlock } from "@/components/sections/service-detail-block";
import { EmergencyCare } from "@/components/sections/emergency-care";
import { services } from "@/lib/content";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Primary healthcare, family planning, maternal and child health, immunizations, chronic disease management and more — affordable private care in KwaMhlanga.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      {/* Intro */}
      <section className="bg-surface">
        <Container className="py-16 sm:py-20">
          <div className="max-w-2xl">
            <p className="eyebrow text-brand-600">Our Services</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink sm:text-5xl text-balance">
              Complete care, every step of the way
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              From everyday consultations to maternal, child and chronic care,
              our qualified team offers nine core services — plus emergency care
              during operating hours.
            </p>
          </div>

          {/* Anchor jump-nav */}
          <nav aria-label="Jump to a service" className="mt-8 flex flex-wrap gap-2">
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`#${s.slug}`}
                className="rounded-pill border border-border bg-bg px-3.5 py-1.5 text-sm font-medium text-ink-soft hover:border-brand-200 hover:text-brand-700"
              >
                {s.title}
              </Link>
            ))}
            <Link
              href="#emergency-care"
              className="rounded-pill border border-danger/30 bg-danger/5 px-3.5 py-1.5 text-sm font-medium text-danger hover:bg-danger/10"
            >
              Emergency Care
            </Link>
          </nav>
        </Container>
      </section>

      {/* Detailed service sections */}
      <div className="bg-bg">
        <Container className="py-16 sm:py-20">
          <div className="space-y-20">
            {services.map((service, i) => (
              <ServiceDetailBlock key={service.slug} service={service} index={i} />
            ))}
          </div>
        </Container>
      </div>

      <EmergencyCare />
    </>
  );
}
