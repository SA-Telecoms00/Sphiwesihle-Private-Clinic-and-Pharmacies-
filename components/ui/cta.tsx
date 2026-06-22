"use client";

import { Button, type ButtonVariant, type ButtonSize } from "./button";
import { trackEvent, type AnalyticsEvent } from "@/lib/analytics";

/**
 * A call-to-action link that fires an analytics event on click.
 * Used for conversion actions (Book / WhatsApp / Call).
 */
export function Cta({
  href,
  event,
  eventData,
  variant,
  size,
  className,
  children,
  ...rest
}: {
  href: string;
  event: AnalyticsEvent;
  eventData?: Record<string, string | number | boolean>;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">) {
  return (
    <Button
      href={href}
      variant={variant}
      size={size}
      className={className}
      onClick={() => trackEvent(event, eventData)}
      {...rest}
    >
      {children}
    </Button>
  );
}
