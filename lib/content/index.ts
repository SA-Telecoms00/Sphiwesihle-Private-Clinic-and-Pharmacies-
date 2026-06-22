/**
 * Content barrel — import the whole content layer from one place:
 *   import { clinic, services, faqs } from "@/lib/content";
 *
 * To add a service or FAQ, edit the relevant file in this folder; every
 * page and component reads from here, so changes propagate automatically.
 */
export * from "./types";
export * from "./clinic";
export * from "./services";
export * from "./faqs";
export * from "./highlights";

/** Canonical site URL, used for metadata, sitemap and JSON-LD. */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://sphiwesihleclinic.co.za";
