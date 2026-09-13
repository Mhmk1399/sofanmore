import type { Metadata } from "next";

import AboutSection from "@/components/static/AboutSection";
import LuxuryCtaBanner from "@/components/static/Cta";
import FAQSection from "@/components/static/FAQSection";
import HeroSection from "@/components/static/HeroSection";
import HomeSeoDescriptionSection from "@/components/static/HomeSeoDescriptionSection";
import ServicesSection from "@/components/static/servicesSection";
import WhyChooseSection from "@/components/static/WhyChooseSection";
import { absoluteUrl, siteConfig } from "@/lib/site";
import ProjectsSliderSection from "@/components/global/ProjectsSliderSection";
import HomeServiceLeadChooser from "@/components/lead-capture/HomeServiceLeadChooser";

const homeOgImage = {
  url: "/og-image.png?v=home-2026-09-13",
  width: 1200,
  height: 630,
  alt: "Sofa N More bespoke sofa and interior craftsmanship in London",
};

export const metadata: Metadata = {
  title: "Bespoke Sofas, Sofa Repair & Interior Design London",

  description:
    "Sofa N More creates bespoke sofas, commercial seating, interior design projects, and sofa repair and restoration from North West London.",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    url: "/",

    title: "Bespoke Sofas, Sofa Repair & Interior Design London",

    description:
      "Bespoke sofas, commercial seating, interior design, and sofa repair and restoration from Sofa N More in North West London.",

    siteName: siteConfig.name,
    locale: siteConfig.locale,

    images: [homeOgImage],
  },

  twitter: {
    card: "summary_large_image",

    title: "Bespoke Sofas, Sofa Repair & Interior Design London",

    description:
      "Bespoke sofas, commercial seating, interior design, and sofa repair and restoration from Sofa N More in North West London.",

    images: [absoluteUrl(homeOgImage.url)],
  },
};

export default async function HomePage() {
  return (
    <main>
      {/* ABOVE THE FOLD — render immediately */}
      <HeroSection />

      <HomeServiceLeadChooser />
      <AboutSection />
      <ProjectsSliderSection />
      {/* Keep Server shell.
          Client carousel should be isolated internally. */}
      <ServicesSection />

      {/* Below fold */}
      <WhyChooseSection />
      <LuxuryCtaBanner />
      {/* <LatestListingsSection /> */}
      <FAQSection id="faq" />
      <HomeSeoDescriptionSection />
    </main>
  );
}
