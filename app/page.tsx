import AboutSection from "@/components/static/AboutSection";
import LuxuryCtaBanner from "@/components/static/Cta";
import FAQSection from "@/components/static/FAQSection";
import HeroSection from "@/components/static/HeroSection";
import HomeSeoDescriptionSection from "@/components/static/HomeSeoDescriptionSection";
import LatestListingsSection from "@/components/static/LatestListingsSection";
import ServicesSection from "@/components/static/servicesSection";
import WhyChooseSection from "@/components/static/WhyChooseSection";

export default function HomePage() {
  return (
    <>
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />

        <WhyChooseSection />
        <LuxuryCtaBanner />
        <LatestListingsSection />
        <FAQSection id="faq" />
        <HomeSeoDescriptionSection />
      </main>
    </>
  );
}
