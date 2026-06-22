import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Cta } from "@/components/ui/cta";
import { ServiceCard } from "@/components/sections/service-card";
import { Check, ChevronRight, MessageCircle } from "lucide-react";
import { services, getService, getServiceSlugs, clinic, siteUrl } from "@/lib/content";

// 404 for any slug not produced by generateStaticParams.
export const dynamicParams = false;

export function generateStaticParams() {
  return getServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.blurb,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.title} · ${clinic.shortName}`,
      description: service.blurb,
      url: `${siteUrl}/services/${service.slug}`,
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const Icon = service.icon;
  const related = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <section className="bg-surface">
        <Container className="py-12 sm:py-16">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-muted">
            <Link href="/" className="hover:text-brand-700">Home</Link>
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
            <Link href="/services" className="hover:text-brand-700">Services</Link>
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
            <span className="text-ink-soft">{service.title}</span>
          </nav>

          <div className="mt-6 max-w-2xl">
            <span className="grid place-items-center h-14 w-14 rounded-2xl bg-brand-600 text-white shadow-soft">
              <Icon className="h-7 w-7" aria-hidden="true" />
            </span>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink sm:text-5xl text-balance">
              {service.title}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              {service.description}
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Cta
                href={`/contact?service=${service.slug}#book`}
                event="book_click"
                eventData={{ location: "service_page", service: service.slug }}
                size="lg"
              >
                Book {service.title}
              </Cta>
              <Cta
                href={clinic.whatsappUrl}
                event="whatsapp_click"
                eventData={{ location: "service_page", service: service.slug }}
                variant="whatsapp"
                size="lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                Ask on WhatsApp
              </Cta>
            </div>
          </div>
        </Container>
      </section>

      {/* What's included */}
      <section className="bg-bg">
        <Container className="py-14 sm:py-16">
          <h2 className="text-2xl font-semibold text-ink">What this service includes</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {service.includes.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 rounded-xl border border-border bg-bg px-4 py-4 text-sm font-medium text-ink shadow-soft"
              >
                <span className="grid place-items-center h-7 w-7 shrink-0 rounded-full bg-brand-50 text-brand-600">
                  <Check className="h-4 w-4" aria-hidden="true" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Related services */}
      <section className="bg-surface">
        <Container className="py-14 sm:py-16">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-2xl font-semibold text-ink">Related services</h2>
            <Link href="/services" className="text-sm font-medium text-brand-700 hover:text-brand-800">
              View all →
            </Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
