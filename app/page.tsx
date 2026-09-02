import type { Metadata } from "next";

import AboutSection from "@/components/static/AboutSection";
import LuxuryCtaBanner from "@/components/static/Cta";
import FAQSection from "@/components/static/FAQSection";
import HeroSection from "@/components/static/HeroSection";
import HomeSeoDescriptionSection from "@/components/static/HomeSeoDescriptionSection";
 import ServicesSection from "@/components/static/servicesSection";
import WhyChooseSection from "@/components/static/WhyChooseSection";
import { defaultOgImage, siteConfig } from "@/lib/site";
import ProjectsSliderSection from "@/components/global/ProjectsSliderSection";
 
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

    images: [defaultOgImage],
  },

  twitter: {
    card: "summary_large_image",

    title: "Bespoke Sofas, Sofa Repair & Interior Design London",

    description:
      "Bespoke sofas, commercial seating, interior design, and sofa repair and restoration from Sofa N More in North West London.",

    images: [defaultOgImage.url],
  },
};

 

export default async function HomePage() {
 
  return (
    <main>
      {/* ABOVE THE FOLD — render immediately */}
      <HeroSection />

      <AboutSection />
      <ProjectsSliderSection   />
      {/* Keep Server shell.
          Client carousel should be isolated internally. */}
      <ServicesSection />

      {/* Below fold */}
      <div className="home-deferred-section">
        <WhyChooseSection />
      </div>

      <div className="home-deferred-section">
        <LuxuryCtaBanner />
      </div>

      <div className="home-deferred-section">
        {/* <LatestListingsSection /> */}
      </div>

      <div className="home-deferred-section">
        <FAQSection id="faq" />
      </div>

      <div className="home-deferred-section">
        <HomeSeoDescriptionSection />
      </div>
    </main>
  );
}
