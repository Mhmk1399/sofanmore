import type { Metadata } from "next";

import AboutClosingSection from "@/components/static/AboutClosingSection";
import AboutCraftsmanshipSection from "@/components/static/AboutCraftsmanshipSection";
import AboutUsIntroSection from "@/components/static/AboutUsIntroSection";
import { absoluteUrl, defaultOgImage, siteConfig } from "@/lib/site";

const CANONICAL_PATH = "/about-us"; 
const CANONICAL_URL = absoluteUrl(CANONICAL_PATH);
const SEO_TITLE = "About Sofa N More | London Bespoke Sofa Makers";
const META_DESCRIPTION =
  "Learn about Sofa N More, a North West London studio creating bespoke sofas, commercial seating, interiors, and sofa restoration work.";
const PRIMARY_IMAGE = absoluteUrl(
  "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/6.webp",
);

export const metadata: Metadata = {
  title: SEO_TITLE,
  description: META_DESCRIPTION,
  alternates: {
    canonical: CANONICAL_PATH,
  },
  openGraph: {
    type: "website",
    url: CANONICAL_PATH,
    title: SEO_TITLE,
    description:
      "Discover the craft, workshop, and approach behind Sofa N More's bespoke sofas and interior services in London.",
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    images: [defaultOgImage],
  },
  twitter: {
    card: "summary_large_image",
    title: SEO_TITLE,
    description: META_DESCRIPTION,
    images: [defaultOgImage.url],
  },
};

const breadcrumbSchema = {
  "@type": "BreadcrumbList",
  "@id": `${CANONICAL_URL}#breadcrumb`,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: siteConfig.url,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "About Sofa N More",
      item: CANONICAL_URL,
    },
  ],
};

const aboutPageSchema = {
  "@type": "AboutPage",
  "@id": `${CANONICAL_URL}#webpage`,
  url: CANONICAL_URL,
  name: SEO_TITLE,
  headline: "About Sofa N More",
  description: META_DESCRIPTION,
  inLanguage: siteConfig.language,
  isPartOf: {
    "@id": `${siteConfig.url}/#website`,
  },
  about: {
    "@id": `${siteConfig.url}/#organization`,
  },
  mainEntity: {
    "@id": `${siteConfig.url}/#organization`,
  },
  publisher: {
    "@id": `${siteConfig.url}/#organization`,
  },
  breadcrumb: {
    "@id": `${CANONICAL_URL}#breadcrumb`,
  },
  primaryImageOfPage: {
    "@type": "ImageObject",
    "@id": `${CANONICAL_URL}#primaryimage`,
    url: PRIMARY_IMAGE,
    contentUrl: PRIMARY_IMAGE,
    caption: "Sofa N More bespoke sofa craftsmanship in London",
  },
  knowsAbout: [
    "Bespoke sofas",
    "Custom seating",
    "Commercial sofas",
    "Interior design",
    "Sofa repair and restoration",
    "Upholstery craftsmanship",
  ],
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [aboutPageSchema, breadcrumbSchema],
};

function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

const page = () => {
  return (
    <>
      <JsonLd data={structuredData} />
      <main>
        <AboutUsIntroSection />
        <AboutCraftsmanshipSection />
        <AboutClosingSection />
      </main>
    </>
  );
};

export default page;
