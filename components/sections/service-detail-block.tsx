import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { Cta } from "@/components/ui/cta";
import { cn } from "@/lib/cn";
import type { Service } from "@/lib/content";

/**
 * A full service section used on the /services overview page (anchored by
 * slug) and reused on individual detail pages. Layout alternates sides.
 */
export function ServiceDetailBlock({
  service,
  index = 0,
  showDetailLink = true,
}: {
  service: Service;
  index?: number;
  showDetailLink?: boolean;
}) {
  const Icon = service.icon;
  const flip = index % 2 === 1;

  return (
    <div
      id={service.slug}
      className="scroll-mt-24 grid items-center gap-8 lg:grid-cols-2 lg:gap-14"
    >
      <div className={cn(flip && "lg:order-2")}>
        <span className="grid place-items-center h-14 w-14 rounded-2xl bg-brand-50 text-brand-600">
          <Icon className="h-7 w-7" aria-hidden="true" />
        </span>
        <h2 className="mt-4 text-2xl font-semibold text-ink sm:text-3xl">
          {service.title}
        </h2>
        <p className="mt-3 text-ink-soft leading-relaxed">{service.description}</p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Cta
            href={`/contact?service=${service.slug}#book`}
            event="book_click"
            eventData={{ location: "service_detail", service: service.slug }}
          >
            Book {service.title}
          </Cta>
          {showDetailLink && (
            <Link
              href={`/services/${service.slug}`}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-700 hover:text-brand-800"
            >
              Full details
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          )}
        </div>
      </div>

      <ul className={cn("grid gap-3", flip && "lg:order-1")}>
        {service.includes.map((item) => (
          <li
            key={item}
            className="flex items-center gap-3 rounded-xl border border-border bg-bg px-4 py-3.5 text-sm font-medium text-ink shadow-soft"
          >
            <span className="grid place-items-center h-6 w-6 shrink-0 rounded-full bg-brand-50 text-brand-600">
              <Check className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
