import { cn } from "@/lib/cn";
import { Container } from "./container";

type Tone = "default" | "surface" | "brand";

const toneClasses: Record<Tone, string> = {
  default: "bg-bg",
  surface: "bg-surface",
  brand: "bg-brand-700 text-white",
};

/** A vertical page section with consistent rhythm and optional tone. */
export function Section({
  id,
  tone = "default",
  className,
  containerClassName,
  children,
}: {
  id?: string;
  tone?: Tone;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn("py-16 sm:py-20 lg:py-24", toneClasses[tone], className)}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

/** Standard section heading block: eyebrow + title + optional lead. */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "center",
  inverted = false,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: "center" | "left";
  inverted?: boolean;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left"
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "eyebrow mb-3",
            inverted ? "text-brand-200" : "text-brand-600"
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "text-3xl sm:text-4xl font-semibold text-balance",
          inverted ? "text-white" : "text-ink"
        )}
      >
        {title}
      </h2>
      {lead && (
        <p
          className={cn(
            "mt-4 text-lg leading-relaxed",
            inverted ? "text-brand-50/90" : "text-ink-soft"
          )}
        >
          {lead}
        </p>
      )}
    </div>
  );
}
