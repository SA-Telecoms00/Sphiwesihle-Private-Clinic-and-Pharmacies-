import type { Clinic, NavLink } from "./types";

/**
 * Brand + contact details. NOTE: address and geo coordinates are
 * placeholders pending client confirmation (see README).
 */
export const clinic: Clinic = {
  name: "Sphiwesihle Private Clinics & Pharmacies",
  shortName: "Sphiwesihle Clinic",
  tagline: "Affordable Private Healthcare You Can Trust",
  about:
    "Sphiwesihle Private Clinics & Pharmacies provides affordable, professional primary healthcare to the Pretoria community — from everyday consultations and chronic care to maternal and child health, all delivered with warmth and respect.",
  phoneDisplay: "071 970 9788",
  phoneHref: "tel:0719709788",
  phone2Display: "074 388 8452",
  phone2Href: "tel:0743888452",
  whatsappNumber: "27719709788",
  whatsappUrl: "https://wa.me/27719709788",
  email: "info@sphiwesihleclinics.co.za",
  emails: ["info@sphiwesihleclinics.co.za", "admin@sphiwesihleclinics.co.za"],
  address: {
    line1: "123 Healthcare Avenue",
    city: "Pretoria",
    province: "Gauteng",
    country: "South Africa",
    postalCode: "0001",
    // Placeholder: Pretoria CBD. Replace with confirmed clinic coordinates.
    geo: { lat: -25.7479, lng: 28.2293 },
  },
  hours: [
    { days: "Monday – Friday", hours: "08:00 – 17:00" },
    { days: "Saturday & Public Holidays", hours: "08:00 – 13:00" },
    { days: "Sunday", hours: "Closed", closed: true },
  ],
  // Minutes from midnight. Mon–Fri 08:00–17:00, Sat 08:00–13:00, Sun closed.
  openingHours: {
    0: null, // Sunday
    1: [480, 1020],
    2: [480, 1020],
    3: [480, 1020],
    4: [480, 1020],
    5: [480, 1020],
    6: [480, 780], // Saturday
  },
};

export const nav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

/**
 * Whether the clinic is currently open, in Africa/Johannesburg time.
 * Public holidays are not accounted for (no calendar source yet); Saturday
 * hours are used as a reasonable approximation.
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
