import InteriorDesignPageContent, { interiorDesignFaqs } from "@/components/static/services/interior-design/InteriorDesignPageContent";
import { defaultOgImage, siteConfig } from "@/lib/site";
import type { Metadata } from "next";

 
 
/* =========================================================
   SEO CONSTANTS
========================================================= */

const SITE_URL = "https://sofanmore.co.uk";

const CANONICAL_URL = "https://sofanmore.co.uk/services/interior-design";

const SEO_TITLE =
  "Interior Design London | Residential & Commercial | Sofa N More";

const META_DESCRIPTION =
  "Bespoke interior design in London for homes, restaurants, cafés, hotels and offices. Tailored spaces, bespoke sofas and design from concept to completion.";

const PAGE_H1 =
  "Interior Design in London, Shaped Around the Way You Live & Work";

const OG_TITLE = "Bespoke Interior Design in London | Sofa N More";

const OG_DESCRIPTION =
  "Thoughtful residential and commercial interiors designed around your space, style and the way it needs to work.";

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

    siteName: siteConfig.name,

    locale: siteConfig.locale,

    title: OG_TITLE,

    description: OG_DESCRIPTION,

    images: [defaultOgImage],
  },

  twitter: {
    card: "summary_large_image",

    title: OG_TITLE,

    description: OG_DESCRIPTION,

    images: [defaultOgImage.url],
  },
};

/* =========================================================
   BREADCRUMB SCHEMA
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

      item: `${SITE_URL}/services`,
    },

    {
      "@type": "ListItem",

      position: 3,

      name: "Interior Design",

      item: CANONICAL_URL,
    },
  ],
};

/* =========================================================
   SERVICE SCHEMA
========================================================= */

const serviceSchema = {
  "@type": "Service",

  "@id": `${CANONICAL_URL}#service`,

  url: CANONICAL_URL,

  name: "Interior Design in London",

  serviceType: "Residential and Commercial Interior Design",

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
      "Homeowners, restaurants, cafés, hotels, offices, hospitality businesses and commercial clients",
  },
};

/* =========================================================
   FAQ SCHEMA

   Uses the exact same source as the visible FAQ component.
========================================================= */

const faqSchema = {
  "@type": "FAQPage",

  "@id": `${CANONICAL_URL}#faq`,

  url: `${CANONICAL_URL}#faq`,

  name: "Frequently Asked Questions About Interior Design",

  inLanguage: "en-GB",

  mainEntity: interiorDesignFaqs.map((faq) => ({
    "@type": "Question",

    name: faq.question,

    acceptedAnswer: {
      "@type": "Answer",

      text: faq.answer,
    },
  })),
};

/* =========================================================
   WEB PAGE SCHEMA
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

export default function InteriorDesignPage() {
  return (
    <>
      <JsonLd data={structuredData} />

      <InteriorDesignPageContent />
    </>
  );
}
