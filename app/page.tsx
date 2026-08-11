import AboutSection from "@/components/static/AboutSection";
import LuxuryCtaBanner from "@/components/static/Cta";
import FAQSection from "@/components/static/FAQSection";
import GallerySection from "@/components/static/gallery";
import HeroSection from "@/components/static/HeroSection";
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
        <GallerySection />
        <WhyChooseSection />
        <LuxuryCtaBanner />
        <LatestListingsSection />
        <FAQSection />

        {/* Next sections */}
        <section id="about" />

        <section id="services" />

        <section id="collections" />

        <section id="work" />

        <section id="journal" />

        <section id="contact" />

        <section id="consultation" />
      </main>
    </>
  );
}
