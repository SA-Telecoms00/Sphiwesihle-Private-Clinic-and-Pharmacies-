import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/lib/content";

export function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group relative flex flex-col rounded-card border border-border bg-bg p-6 shadow-soft transition-all hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-card focus-visible:-translate-y-0.5"
    >
      <span className="grid place-items-center h-12 w-12 rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </span>
      <h3 className="mt-4 text-lg font-semibold text-ink">{service.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
        {service.blurb}
      </p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-700">
        Learn More
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      </span>
    </Link>
  );
}
