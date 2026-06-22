import { ChevronDown } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { faqs as allFaqs, type Faq } from "@/lib/content";

/**
 * FAQ accordion built on native <details>/<summary> — fully accessible and
 * keyboard-operable with no client JavaScript.
 */
export function FaqAccordion({
  faqs = allFaqs,
  heading = true,
}: {
  faqs?: Faq[];
  heading?: boolean;
}) {
  return (
    <Section id="faq" tone="surface">
      <div className="mx-auto max-w-3xl">
        {heading && (
          <SectionHeading
            eyebrow="Good to Know"
            title="Frequently Asked Questions"
            lead="Everything you need to know before your visit. Still unsure? Call or WhatsApp us anytime."
          />
        )}
        <div className="mt-10 divide-y divide-border overflow-hidden rounded-card border border-border bg-bg">
          {faqs.map((faq) => (
            <details key={faq.question} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left font-medium text-ink marker:hidden hover:bg-surface focus-visible:bg-surface">
                <span>{faq.question}</span>
                <ChevronDown
                  className="h-5 w-5 shrink-0 text-brand-600 transition-transform duration-200 group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <div className="px-5 pb-5 -mt-1 text-sm leading-relaxed text-ink-soft">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}
