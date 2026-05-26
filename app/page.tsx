import HeroSection from "@/components/home/HeroSection";
import ServicesGrid from "@/components/home/ServicesGrid";
import StrengthsSection from "@/components/home/StrengthsSection";
import PartnersSection from "@/components/home/PartnersSection";
import NewsSection from "@/components/home/NewsSection";
import CtaSection from "@/components/home/CtaSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesGrid />
      <StrengthsSection />
      <PartnersSection />
      <NewsSection />
      <CtaSection />
    </>
  );
}
