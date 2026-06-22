import { Hero } from "@/components/sections/hero";
import { TrustStrip } from "@/components/sections/trust-strip";
import { ServicesGrid } from "@/components/sections/services-grid";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { FaqJsonLd } from "@/components/seo/json-ld";

export default function HomePage() {
  return (
    <>
      <FaqJsonLd />
      <Hero />
      <TrustStrip />
      <ServicesGrid />
      <WhyChooseUs />
      <FaqAccordion />
    </>
  );
}
