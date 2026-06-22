import {
  CalendarCheck,
  Stethoscope,
  Building2,
  HeartHandshake,
  Globe,
  UserRound,
  Users,
  Wallet,
  MapPin,
  Zap,
  BadgeCheck,
  ShieldCheck,
  Star,
} from "lucide-react";
import type { Badge, Reason, TrustItem } from "./types";

/** Trust strip items shown under the hero. */
export const trustItems: TrustItem[] = [
  { label: "Same Day Appointments", icon: CalendarCheck },
  { label: "Qualified Healthcare Professionals", icon: Stethoscope },
  { label: "Modern Clinic Facilities", icon: Building2 },
  { label: "Friendly & Affordable Care", icon: HeartHandshake },
  { label: "Online Booking Available", icon: Globe },
];

/** "Why Choose Sphiwesihle" reasons. */
export const reasons: Reason[] = [
  {
    title: "Personalized Care",
    body: "Care plans built around you — your history, your needs and your goals.",
    icon: UserRound,
  },
  {
    title: "Professional Staff",
    body: "Qualified, friendly healthcare professionals you can trust.",
    icon: Users,
  },
  {
    title: "Affordable Pricing",
    body: "Transparent, fair pricing and cash rates that work for your budget.",
    icon: Wallet,
  },
  {
    title: "Convenient Locations",
    body: "Easy to reach, with ample free secure parking on site.",
    icon: MapPin,
  },
  {
    title: "Fast Service",
    body: "Short waiting times and same-day appointments for urgent needs.",
    icon: Zap,
  },
];

/** Compliance / quality badges. POPIA (not HIPAA) for South Africa. */
export const badges: Badge[] = [
  { label: "Licensed & Certified", icon: BadgeCheck },
  { label: "POPIA Compliant", icon: ShieldCheck },
  { label: "5-Star Rated", icon: Star },
];
