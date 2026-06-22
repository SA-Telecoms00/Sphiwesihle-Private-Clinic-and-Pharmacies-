import type { Clinic, NavLink } from "./types";

/**
 * Brand + contact details. Address confirmed by the client; geo coordinates
 * are approximate for KwaMhlanga — refine with the exact clinic pin if needed.
 */
export const clinic: Clinic = {
  name: "Sphiwesihle Private Clinics & Pharmacies",
  shortName: "Sphiwesihle Clinic",
  tagline: "Affordable Private Healthcare You Can Trust",
  about:
    "Sphiwesihle Private Clinics & Pharmacies provides affordable, professional primary healthcare to the KwaMhlanga community — from everyday consultations and chronic care to maternal and child health, all delivered with warmth and respect.",
  phoneDisplay: "071 970 9788",
  phoneHref: "tel:0719709788",
  phone2Display: "074 388 8452",
  phone2Href: "tel:0743888452",
  whatsappNumber: "27719709788",
  whatsappUrl: "https://wa.me/27719709788",
  email: "info@sphiwesihleclinics.co.za",
  emails: ["info@sphiwesihleclinics.co.za", "admin@sphiwesihleclinics.co.za"],
  address: {
    line1: "Stand No. 1001 Sun City AA",
    city: "KwaMhlanga",
    province: "Mpumalanga",
    country: "South Africa",
    postalCode: "1022",
    // Approximate KwaMhlanga coordinates; refine with the exact clinic pin.
    geo: { lat: -25.4267, lng: 28.6917 },
  },
  hours: [
    { days: "Monday – Sunday", hours: "08:00 – 17:00" },
  ],
  // Minutes from midnight. Open every day 08:00–17:00.
  openingHours: {
    0: [480, 1020], // Sunday
    1: [480, 1020],
    2: [480, 1020],
    3: [480, 1020],
    4: [480, 1020],
    5: [480, 1020],
    6: [480, 1020], // Saturday
  },
};

export const nav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

/**
 * Whether the clinic is currently open, in Africa/Johannesburg time.
 * Open every day 08:00–17:00; public holidays are not accounted for
 * (no calendar source yet).
 */
export function isOpenNow(now: Date = new Date()): boolean {
  // Convert to SAST (UTC+2, no DST) regardless of server timezone.
  const sast = new Date(
    now.toLocaleString("en-US", { timeZone: "Africa/Johannesburg" })
  );
  const window = clinic.openingHours[sast.getDay()];
  if (!window) return false;
  const minutes = sast.getHours() * 60 + sast.getMinutes();
  return minutes >= window[0] && minutes < window[1];
}
