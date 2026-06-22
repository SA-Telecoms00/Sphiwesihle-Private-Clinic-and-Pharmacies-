import { Section, SectionHeading } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { ServiceCard } from "./service-card";
import { services } from "@/lib/content";

export function ServicesGrid({ withHeading = true }: { withHeading?: boolean }) {
  return (
    <Section id="services" tone="surface">
      {withHeading && (
        <SectionHeading
          eyebrow="What We Offer"
          title="Comprehensive Care for Every Stage of Life"
          lead="Nine core services covering primary, maternal, child and chronic health — all under one trusted roof."
        />
      )}
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <ServiceCard key={service.slug} service={service} />
        ))}
      </div>
      <div className="mt-10 text-center">
        <Button href="/services" variant="outline" size="lg">
          View all services &amp; details
        </Button>
      </div>
    </Section>
  );
}
