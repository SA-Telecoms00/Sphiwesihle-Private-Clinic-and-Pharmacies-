import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { clinic } from "@/lib/content";

/**
 * Brand lockup used in the header and footer: logo mark + wordmark.
 * The mark sits on a white tile so it reads cleanly on both the light
 * header and the dark footer (the source artwork has an off-white field).
 */
export function Logo({
  inverted = false,
  className,
}: {
  inverted?: boolean;
  className?: string;
}) {
  return (
    <Link
      href="/"
      aria-label={`${clinic.name} — home`}
      className={cn("inline-flex items-center gap-2.5 group", className)}
    >
      <span
        className="grid place-items-center h-9 w-9 overflow-hidden rounded-xl bg-white shadow-soft ring-1 ring-black/5 transition-transform group-hover:scale-105"
        aria-hidden="true"
      >
        <Image
          src="/images/logo/logo-mark.jpg"
          alt=""
          width={36}
          height={36}
          className="h-full w-full object-contain p-0.5"
        />
      </span>
      <span className="leading-tight">
        <span
          className={cn(
            "block font-display font-semibold text-[15px] tracking-tight",
            inverted ? "text-white" : "text-ink"
          )}
        >
          Sphiwesihle
        </span>
        <span
          className={cn(
            "block text-[11px] font-medium",
            inverted ? "text-brand-100" : "text-muted"
          )}
        >
          Private Clinics &amp; Pharmacies
        </span>
      </span>
    </Link>
  );
}
