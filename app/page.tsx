import type { Metadata } from "next";

import AboutSection from "@/components/static/AboutSection";
import LuxuryCtaBanner from "@/components/static/Cta";
import FAQSection from "@/components/static/FAQSection";
import HeroSection from "@/components/static/HeroSection";
import HomeSeoDescriptionSection from "@/components/static/HomeSeoDescriptionSection";
import LatestListingsSection from "@/components/static/LatestListingsSection";
import ServicesSection from "@/components/static/servicesSection";
import WhyChooseSection from "@/components/static/WhyChooseSection";

export const demoProjects: ProjectProduct[] = [
  {
    id: "demo-project-1",
    productCode: 1001,
    name: "Sculptural Navy Sofa",
    imageUrl: "/assets/images/1.webp",
    description:
      "A made-to-measure sofa shaped around a contemporary London living space, combining deep navy upholstery with generous proportions and a refined architectural silhouette.",
  },

  {
    id: "demo-project-2",
    productCode: 1002,
    name: "Curved Hospitality Seating",
    imageUrl: "/assets/images/2.webp",
    description:
      "Bespoke seating developed for a hospitality interior, balancing comfort, durability and a clean visual rhythm throughout the space.",
  },

  {
    id: "demo-project-3",
    productCode: 1003,
    name: "Warm Contemporary Interior",
    imageUrl: "/assets/images/3.webp",
    description:
      "A layered interior concept built around warm neutrals, considered proportions and bespoke pieces designed to feel naturally connected to the architecture.",
  },

  {
    id: "demo-project-4",
    productCode: 1004,
    name: "Restored Statement Sofa",
    imageUrl: "/assets/images/4.webp",
    description:
      "A carefully restored sofa given a renewed structure, refreshed upholstery and a cleaner finish while preserving the character of the original piece.",
  },
];
import { defaultOgImage, siteConfig } from "@/lib/site";
import ProjectsSliderSection, {
  ProjectProduct,
} from "@/components/global/ProjectsSliderSection";

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

export default function HomePage() {
  return (
    <main>
      {/* ABOVE THE FOLD — render immediately */}
      <HeroSection />

      <AboutSection />
      <ProjectsSliderSection products={demoProjects}  />
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
        <LatestListingsSection />
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
