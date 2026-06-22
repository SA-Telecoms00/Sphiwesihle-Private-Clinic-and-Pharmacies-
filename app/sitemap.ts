import type { MetadataRoute } from "next";
import { siteUrl, getServiceSlugs } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = ["", "/services", "/contact", "/book"].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const serviceRoutes = getServiceSlugs().map((slug) => ({
    url: `${siteUrl}/services/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes];
}
