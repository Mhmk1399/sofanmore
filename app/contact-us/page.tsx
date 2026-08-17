import type { Metadata } from "next";

import ContactFormSection from "@/components/static/ContactFormSection";
import ContactHeroSection from "@/components/static/ContactHeroSection";
import { absoluteUrl, siteConfig } from "@/lib/site";

const CANONICAL_PATH = "/contact-us";
const CANONICAL_URL = absoluteUrl(CANONICAL_PATH);
const SEO_TITLE = "Contact Sofa N More | Bespoke Sofa Consultation London";
const META_DESCRIPTION =
  "Contact Sofa N More in North West London to discuss bespoke sofas, commercial seating, interior design, or sofa repair and restoration.";

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
      "Start a bespoke sofa, commercial seating, interior design, or sofa restoration project with Sofa N More.",
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
      name: "Contact",
      item: CANONICAL_URL,
    },
  ],
};

const contactPointSchema = {
  "@type": "ContactPoint",
  "@id": `${CANONICAL_URL}#contact-point`,
  contactType: "customer service",
  telephone: siteConfig.phoneInternational,
  email: siteConfig.email,
  areaServed: siteConfig.areaServed.map((name) => ({
    "@type": "Place",
    name,
  })),
  availableLanguage: ["English"],
};

const contactPageSchema = {
  "@type": "ContactPage",
  "@id": `${CANONICAL_URL}#webpage`,
  url: CANONICAL_URL,
  name: SEO_TITLE,
  headline: "Contact Sofa N More",
  description: META_DESCRIPTION,
  inLanguage: siteConfig.language,
  isPartOf: {
    "@id": `${siteConfig.url}/#website`,
  },
  about: {
    "@id": `${siteConfig.url}/#organization`,
  },
  publisher: {
    "@id": `${siteConfig.url}/#organization`,
  },
  breadcrumb: {
    "@id": `${CANONICAL_URL}#breadcrumb`,
  },
  mainEntity: {
    "@id": `${CANONICAL_URL}#contact-point`,
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [contactPageSchema, contactPointSchema, breadcrumbSchema],
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
        <ContactHeroSection />
        <ContactFormSection />
      </main>
    </>
  );
};

export default page;
