import CommercialSofasPageContent, { commercialSofasFaqs } from "@/components/static/services/commercial-sofas/CommercialSofasPageContent";
import type { Metadata } from "next";

 
 
/* =========================================================
   SEO
========================================================= */

const SITE_URL = "https://sofanmore.co.uk";

const CANONICAL_URL = "https://sofanmore.co.uk/services/commercial-sofas";

const SEO_TITLE =
  "Commercial Sofas London | Bespoke Contract Seating | Sofa N More";

const META_DESCRIPTION =
  "Bespoke commercial sofas in London for restaurants, cafés, hotels, offices and hospitality spaces. Made to measure and built around your project.";

const PAGE_H1 =
  "Bespoke Commercial Sofas in London, Built Around Your Business";

/* =========================================================
   METADATA
========================================================= */

export const metadata: Metadata = {
  title: SEO_TITLE,

  description: META_DESCRIPTION,

  alternates: {
    canonical: CANONICAL_URL,
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,

      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",

    url: CANONICAL_URL,

    siteName: "Sofa N More",

    locale: "en_GB",

    title: SEO_TITLE,

    description: META_DESCRIPTION,
  },

  twitter: {
    card: "summary_large_image",

    title: SEO_TITLE,

    description: META_DESCRIPTION,
  },
};

/* =========================================================
   BREADCRUMB
========================================================= */

const breadcrumbSchema = {
  "@type": "BreadcrumbList",

  "@id": `${CANONICAL_URL}#breadcrumb`,

  itemListElement: [
    {
      "@type": "ListItem",

      position: 1,

      name: "Home",

      item: SITE_URL,
    },

    {
      "@type": "ListItem",

      position: 2,

      name: "Services",

      item: `${SITE_URL}/our-services`,
    },

    {
      "@type": "ListItem",

      position: 3,

      name: "Commercial Sofas",

      item: CANONICAL_URL,
    },
  ],
};

/* =========================================================
   SERVICE
========================================================= */

const serviceSchema = {
  "@type": "Service",

  "@id": `${CANONICAL_URL}#service`,

  url: CANONICAL_URL,

  name: "Bespoke Commercial Sofas in London",

  serviceType: "Commercial sofas and bespoke contract seating",

  description: META_DESCRIPTION,

  provider: {
    "@type": "Organization",

    "@id": `${SITE_URL}/#organization`,

    name: "Sofa N More",

    url: SITE_URL,
  },

  areaServed: {
    "@type": "City",

    name: "London",
  },

  audience: {
    "@type": "Audience",

    audienceType:
      "Restaurants, cafés, hotels, offices, hospitality businesses, interior designers and commercial clients",
  },
};

/* =========================================================
   FAQ
========================================================= */

const faqSchema = {
  "@type": "FAQPage",

  "@id": `${CANONICAL_URL}#faq`,

  url: `${CANONICAL_URL}#faq`,

  name: "Frequently Asked Questions About Commercial Sofas",

  inLanguage: "en-GB",

  mainEntity: commercialSofasFaqs.map((faq) => ({
    "@type": "Question",

    name: faq.question,

    acceptedAnswer: {
      "@type": "Answer",

      text: faq.answer,
    },
  })),
};

/* =========================================================
   WEB PAGE
========================================================= */

const webPageSchema = {
  "@type": "WebPage",

  "@id": `${CANONICAL_URL}#webpage`,

  url: CANONICAL_URL,

  name: SEO_TITLE,

  headline: PAGE_H1,

  description: META_DESCRIPTION,

  inLanguage: "en-GB",

  isPartOf: {
    "@type": "WebSite",

    "@id": `${SITE_URL}/#website`,

    url: SITE_URL,

    name: "Sofa N More",
  },

  about: {
    "@id": `${CANONICAL_URL}#service`,
  },

  breadcrumb: {
    "@id": `${CANONICAL_URL}#breadcrumb`,
  },

  hasPart: {
    "@id": `${CANONICAL_URL}#faq`,
  },
};

/* =========================================================
   STRUCTURED DATA GRAPH
========================================================= */

const structuredData = {
  "@context": "https://schema.org",

  "@graph": [webPageSchema, serviceSchema, breadcrumbSchema, faqSchema],
};

/* =========================================================
   JSON-LD
========================================================= */

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function CommercialSofasPage() {
  return (
    <>
      <JsonLd data={structuredData} />

      <CommercialSofasPageContent />
    </>
  );
}
