import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppFab } from "@/components/layout/whatsapp-fab";
import { ClinicJsonLd } from "@/components/seo/json-ld";
import { clinic, siteUrl } from "@/lib/content";

const display = Sora({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${clinic.name} — ${clinic.tagline}`,
    template: `%s · ${clinic.shortName}`,
  },
  description: clinic.about,
  applicationName: clinic.name,
  keywords: [
    "private clinic Pretoria",
    "pharmacy Pretoria",
    "affordable healthcare",
    "family planning",
    "antenatal care",
    "immunizations",
    "chronic disease management",
  ],
  openGraph: {
    type: "website",
    locale: "en_ZA",
    siteName: clinic.name,
    title: `${clinic.name} — ${clinic.tagline}`,
    description: clinic.about,
    url: siteUrl,
    images: [
      {
        url: "/images/logo/logo-full.jpg",
        width: 1200,
        height: 630,
        alt: clinic.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${clinic.name} — ${clinic.tagline}`,
    description: clinic.about,
    images: ["/images/logo/logo-full.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-bg text-ink">
        <ClinicJsonLd />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-pill focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppFab />
        <Analytics />
      </body>
    </html>
  );
}
