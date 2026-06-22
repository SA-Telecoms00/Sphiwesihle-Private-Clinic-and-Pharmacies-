import { z } from "zod";
import { getServiceSlugs } from "@/lib/content";
import { timeSlots } from "@/lib/booking";

const serviceValues = new Set([...getServiceSlugs(), "other"]);
const timeSlotSet = new Set(timeSlots);

// Lenient SA phone: digits, spaces, dashes, parens, optional +; 10–15 digits.
const phone = z
  .string()
  .trim()
  .min(10, "Please enter a valid phone number")
  .max(20)
  .regex(/^[+\d][\d\s()-]{8,}$/, "Please enter a valid phone number");

const name = (label: string) =>
  z.string().trim().min(2, `${label} is required`).max(60);

export const bookingSchema = z.object({
  firstName: name("First name"),
  lastName: name("Last name"),
  email: z.string().trim().email("Please enter a valid email address").max(120),
  phone,
  service: z
    .string()
    .min(1, "Please select a service")
    .refine((v) => serviceValues.has(v), "Please select a service"),
  date: z
    .string()
    .min(1, "Please choose a date")
    .refine((d) => !Number.isNaN(Date.parse(d)), "Please choose a valid date"),
  time: z
    .string()
    .min(1, "Please choose a time")
    .refine((v) => timeSlotSet.has(v), "Please choose a time"),
  additionalInfo: z.string().trim().max(1000).optional().or(z.literal("")),
  consent: z
    .union([z.literal("on"), z.literal("true"), z.literal(true)])
    .refine((v) => v === "on" || v === "true" || v === true, {
      message: "Consent is required to book",
    }),
});

export const enquirySchema = z.object({
  fullName: name("Full name"),
  phone,
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .max(120)
    .optional()
    .or(z.literal("")),
  service: z.string().trim().max(60).optional().or(z.literal("")),
  message: z.string().trim().min(5, "Please enter a message").max(2000),
});

export type BookingInput = z.infer<typeof bookingSchema>;
export type EnquiryInput = z.infer<typeof enquirySchema>;

/** Shape returned by both server actions to drive the form UI. */
export type FormState = {
  status: "idle" | "success" | "error";
  message?: string;
  /** Field-level errors keyed by field name. */
  errors?: Record<string, string>;
};

export const initialFormState: FormState = { status: "idle" };
