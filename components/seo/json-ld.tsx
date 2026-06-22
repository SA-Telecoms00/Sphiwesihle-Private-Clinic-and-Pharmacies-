import { clinic, siteUrl, services, faqs } from "@/lib/content";

/** Renders a JSON-LD script block. */
function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Structured data is static and trusted (built from our content layer).
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** MedicalClinic / LocalBusiness schema for local search. */
export function ClinicJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": ["MedicalClinic", "Pharmacy", "LocalBusiness"],
    "@id": `${siteUrl}/#clinic`,
    name: clinic.name,
    description: clinic.about,
    url: siteUrl,
    telephone: `+27${clinic.phoneDisplay.replace(/\D/g, "").replace(/^0/, "")}`,
    email: clinic.email,
    image: `${siteUrl}/images/logo/logo-full.jpg`,
    priceRange: "ZAR",
    currenciesAccepted: "ZAR",
    medicalSpecialty: services.map((s) => s.title),
    address: {
      "@type": "PostalAddress",
      streetAddress: clinic.address.line1,
      addressLocality: clinic.address.city,
      addressRegion: clinic.address.province,
      postalCode: clinic.address.postalCode,
      addressCountry: "ZA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: clinic.address.geo.lat,
      longitude: clinic.address.geo.lng,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "17:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday"],
        opens: "08:00",
        closes: "13:00",
      },
    ],
  };
  return <JsonLd data={data} />;
}

/** FAQPage schema — eligible for rich results. */
export function FaqJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
  return <JsonLd data={data} />;
}
