/**
 * Typed content model — the single source of truth for the site.
 * Swap these data files for a CMS (Sanity/Contentful) later without
 * touching components, as long as the shapes below are preserved.
 */

import type { LucideIcon } from "lucide-react";

/** A bookable clinical service. */
export interface Service {
  /** URL slug, e.g. "family-planning" → /services/family-planning */
  slug: string;
  /** Display title, e.g. "Family Planning" */
  title: string;
  /** One-line summary used on cards and meta descriptions */
  blurb: string;
  /** Longer intro used on the detail page */
  description: string;
  /** Lucide icon component for cards/headers */
  icon: LucideIcon;
  /** Bullet list of what the service includes */
  includes: string[];
}

/** A frequently-asked question. */
export interface Faq {
  question: string;
  answer: string;
}

/** A short trust/benefit statement (icon + label). */
export interface TrustItem {
  label: string;
  icon: LucideIcon;
}

/** A "why choose us" reason (icon + title + copy). */
export interface Reason {
  title: string;
  body: string;
  icon: LucideIcon;
}

/** A compliance / quality badge. */
export interface Badge {
  label: string;
  icon: LucideIcon;
}

/** Primary navigation link. */
export interface NavLink {
  label: string;
  href: string;
}

/** Opening-hours row. */
export interface HoursRow {
  /** e.g. "Mon – Fri" */
  days: string;
  /** e.g. "08:00 – 17:00" or "Closed" */
  hours: string;
  closed?: boolean;
}

/** Clinic identity + contact details. */
export interface Clinic {
  name: string;
  shortName: string;
  tagline: string;
  about: string;
  phoneDisplay: string;
  phoneHref: string; // tel: value
  /** Optional second contact number, displayed alongside the primary. */
  phone2Display?: string;
  phone2Href?: string;
  /** Label for the second number (e.g. "Emergencies"). Defaults to "Call us". */
  phone2Label?: string;
  whatsappNumber: string; // E.164 without +, for wa.me
  whatsappUrl: string;
  /** Primary inbox — also the backend send target (see lib/email.ts) + JSON-LD. */
  email: string;
  /** All public-facing email addresses, displayed equally in footer/contact. */
  emails: string[];
  address: {
    line1: string;
    city: string;
    province: string;
    country: string;
    postalCode?: string;
    /** Used for JSON-LD geo + map; placeholder until confirmed */
    geo: { lat: number; lng: number };
  };
  hours: HoursRow[];
  /** Convenience flags for "Open Today" pill logic */
  openingHours: {
    /** 0=Sun … 6=Sat → [openMinutes, closeMinutes] or null when closed */
    [weekday: number]: [number, number] | null;
  };
}
