import { Section, SectionHeading } from "@/components/ui/section";
import { reasons, badges } from "@/lib/content";

export function WhyChooseUs() {
  return (
    <Section id="why-us">
      <SectionHeading
        eyebrow="Why Sphiwesihle"
        title="Healthcare That Puts You First"
        lead="We combine professional, qualified care with genuine warmth — and pricing that keeps quality healthcare within reach."
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {reasons.map((reason) => (
          <div
            key={reason.title}
            className="flex gap-4 rounded-card border border-border bg-bg p-6 shadow-soft"
          >
            <span className="grid place-items-center h-11 w-11 shrink-0 rounded-xl bg-brand-50 text-brand-600">
              <reason.icon className="h-5.5 w-5.5" aria-hidden="true" />
            </span>
            <div>
              <h3 className="text-base font-semibold text-ink">{reason.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                {reason.body}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Trust badges */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        {badges.map((badge) => (
          <span
            key={badge.label}
            className="inline-flex items-center gap-2 rounded-pill border border-brand-100 bg-brand-50 px-4 py-2 text-sm font-medium text-brand-700"
          >
            <badge.icon className="h-4 w-4" aria-hidden="true" />
            {badge.label}
          </span>
        ))}
      </div>
    </Section>
  );
}
