"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import { Logo } from "./logo";
import { Container } from "@/components/ui/container";
import { Cta } from "@/components/ui/cta";
import { cn } from "@/lib/cn";
import { nav, clinic } from "@/lib/content";
import { trackEvent } from "@/lib/analytics";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Close mobile menu on route change.
  useEffect(() => setOpen(false), [pathname]);

  // Subtle elevation once scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 bg-bg/90 backdrop-blur-md transition-shadow",
        scrolled ? "shadow-soft border-b border-border" : "border-b border-transparent"
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4">
        <Logo />

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden md:flex items-center gap-1">
          {nav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={cn(
                "px-3.5 py-2 rounded-pill text-sm font-medium transition-colors",
                isActive(link.href)
                  ? "text-brand-700 bg-brand-50"
                  : "text-ink-soft hover:text-ink hover:bg-surface"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <a
            href={clinic.phoneHref}
            onClick={() => trackEvent("call_click", { location: "header" })}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-pill text-sm font-medium text-ink-soft hover:text-brand-700 hover:bg-surface transition-colors"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {clinic.phoneDisplay}
          </a>
          <Cta href="/contact" event="book_click" eventData={{ location: "header" }} size="sm">
            Book Now
          </Cta>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="md:hidden inline-grid place-items-center h-10 w-10 rounded-xl text-ink hover:bg-surface"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </Container>

      {/* Mobile nav */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="md:hidden border-t border-border bg-bg"
      >
        <Container className="py-4">
          <nav aria-label="Mobile" className="flex flex-col gap-1">
            {nav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={cn(
                  "px-4 py-3 rounded-xl text-base font-medium",
                  isActive(link.href)
                    ? "text-brand-700 bg-brand-50"
                    : "text-ink hover:bg-surface"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-3 flex flex-col gap-2">
            <Cta href="/contact" event="book_click" eventData={{ location: "mobile_menu" }} size="lg">
              Book Now
            </Cta>
            <a
              href={clinic.phoneHref}
              onClick={() => trackEvent("call_click", { location: "mobile_menu" })}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-pill text-base font-medium border border-border text-ink hover:bg-surface"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {clinic.phoneDisplay}
            </a>
          </div>
        </Container>
      </div>
    </header>
  );
}
