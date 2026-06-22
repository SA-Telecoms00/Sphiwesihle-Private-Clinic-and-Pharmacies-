import {
  Stethoscope,
  HeartHandshake,
  Baby,
  Activity,
  HeartPulse,
  Syringe,
  ShieldPlus,
  HeartPulse as ChronicIcon,
  ThermometerSnowflake,
  Siren,
} from "lucide-react";
import type { Service } from "./types";

/**
 * The 9 bookable services. Each "Book" CTA deep-links to the booking
 * form with the service preselected, e.g. /contact?service=family-planning
 */
export const services: Service[] = [
  {
    slug: "primary-healthcare",
    title: "Primary Healthcare",
    blurb: "General consultations and check-ups for the whole family.",
    description:
      "Everyday medical care for you and your family — from routine consultations to comprehensive health assessments, with clear treatment plans and trusted referrals when you need them.",
    icon: Stethoscope,
    includes: [
      "General consultations and check-ups",
      "Comprehensive health assessments",
      "Diagnosis and treatment planning",
      "Health education and counseling",
      "Referral services when needed",
    ],
  },
  {
    slug: "family-planning",
    title: "Family Planning",
    blurb: "Confidential contraceptive counseling and family planning.",
    description:
      "Private, judgement-free family planning support — helping you make informed choices about contraception, conception and fertility with qualified guidance.",
    icon: HeartHandshake,
    includes: [
      "Contraceptive counseling and methods",
      "Family planning education",
      "Pre-conception counseling",
      "Fertility awareness methods",
      "Confidential and private consultations",
    ],
  },
  {
    slug: "ante-natal-care",
    title: "Ante-natal Care",
    blurb: "Caring pregnancy check-ups and monitoring.",
    description:
      "Comprehensive care throughout your pregnancy, with regular check-ups, monitoring and guidance to keep you and your baby healthy and prepared for birth.",
    icon: Baby,
    includes: [
      "Regular pregnancy check-ups",
      "Ultrasound referrals and monitoring",
      "Nutritional guidance and counseling",
      "Screening for pregnancy complications",
      "Birth planning and preparation",
    ],
  },
  {
    slug: "intra-natal-care",
    title: "Intra-natal Care",
    blurb: "Labour monitoring, support and delivery assistance.",
    description:
      "Supportive, professional care during labour and delivery, with pain management options and immediate newborn assessment for a safe birth experience.",
    icon: Activity,
    includes: [
      "Labour monitoring and support",
      "Pain management options",
      "Delivery assistance",
      "Emergency obstetric care",
      "Newborn initial assessment",
    ],
  },
  {
    slug: "post-partum-care",
    title: "Post-partum Care",
    blurb: "Recovery support for mother and newborn.",
    description:
      "Dedicated care after birth — supporting your recovery, your baby's health and your wellbeing, including breastfeeding and emotional support.",
    icon: HeartPulse,
    includes: [
      "Mother's recovery monitoring",
      "Newborn health assessments",
      "Breastfeeding support",
      "Post-partum depression screening",
      "Family planning counseling",
    ],
  },
  {
    slug: "immunizations",
    title: "Immunizations",
    blurb: "Childhood, adult, travel and seasonal vaccines.",
    description:
      "Protect your family with vaccinations for every age — following the EPI schedule for children and offering adult, travel and seasonal vaccines with reminders.",
    icon: Syringe,
    includes: [
      "Childhood vaccinations (EPI schedule)",
      "Adult immunizations",
      "Travel vaccines",
      "Flu shots and seasonal vaccines",
      "Vaccination records and reminders",
    ],
  },
  {
    slug: "imci-child-health",
    title: "IMCI Child Health",
    blurb: "Integrated care for growing, healthy children.",
    description:
      "Integrated Management of Childhood Illness — monitoring growth and development, treating common illnesses and supporting parents with practical health education.",
    icon: ShieldPlus,
    includes: [
      "Growth monitoring and development",
      "Treatment of common childhood illnesses",
      "Nutritional assessment and counseling",
      "Deworming programs",
      "Child health education for parents",
    ],
  },
  {
    slug: "chronic-disease-management",
    title: "Chronic Disease Management",
    blurb: "Ongoing care for diabetes, hypertension and more.",
    description:
      "Consistent, structured care for long-term conditions — helping you monitor, manage and stay on top of chronic illness with medication support and regular reviews.",
    icon: ChronicIcon,
    includes: [
      "Diabetes monitoring",
      "Hypertension care",
      "Asthma & COPD management",
      "HIV/AIDS care and support",
      "Medication reviews and adherence support",
    ],
  },
  {
    slug: "minor-ailments",
    title: "Minor Ailments",
    blurb: "Quick treatment for colds, infections and wounds.",
    description:
      "Fast, affordable treatment for everyday health complaints — from colds and infections to wound care and skin conditions, often on the same day.",
    icon: ThermometerSnowflake,
    includes: [
      "Cold and flu treatment",
      "ENT infections",
      "Wound care and dressing",
      "Pain management",
      "Skin conditions and allergies",
    ],
  },
];

/**
 * Emergency care is presented as a distinct, high-visibility section
 * (not a standard bookable card) with Call + WhatsApp CTAs.
 */
export const emergencyCare = {
  slug: "emergency-care",
  title: "Emergency Care",
  blurb:
    "Immediate attention for urgent injuries and acute illness during operating hours.",
  icon: Siren,
  includes: [
    "Immediate injury treatment",
    "Acute illness management",
    "Allergic reactions",
    "Fever and severe pain",
    "Emergency referrals",
  ],
  disclaimer:
    "For life-threatening emergencies, call emergency services or go to the nearest hospital immediately. Our emergency care is available during operating hours.",
} as const;

const serviceBySlug = new Map(services.map((s) => [s.slug, s]));

export function getService(slug: string): Service | undefined {
  return serviceBySlug.get(slug);
}

export function getServiceSlugs(): string[] {
  return services.map((s) => s.slug);
}

/** Options for the booking/enquiry "Select Service" dropdowns (+ "Other"). */
export const serviceOptions: { value: string; label: string }[] = [
  ...services.map((s) => ({ value: s.slug, label: s.title })),
  { value: "other", label: "Other" },
];
