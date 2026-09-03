import SofaRepairPageContent, {
  sofaRepairFaqs,
} from "@/components/static/services/sofa-repair-restoration/SofaRepairPageContent";
import { defaultOgImage } from "@/lib/site";
import type { Metadata } from "next";

/* =========================================================
   SEO CONSTANTS
========================================================= */

const SITE_URL = "https://sofanmore.co.uk";

const CANONICAL_URL =
  "https://sofanmore.co.uk/services/sofa-repair-restoration";

const SEO_TITLE = "Sofa Repair & Restoration London | Sofa N More";

const META_DESCRIPTION =
  "Professional sofa repair and restoration in London. Bring worn, damaged or much-loved sofas back to life with skilled craftsmanship from Sofa N More.";

const PAGE_H1 = "Sofa Repair & Restoration in London, Made to Last Again";

const OG_TITLE = "Sofa Repair & Restoration in London | Sofa N More";

/*
  The OG description supplied for this page was incomplete,
  so we temporarily use META_DESCRIPTION here.
*/
const OG_DESCRIPTION = META_DESCRIPTION;

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

      name: "Sofa Repair & Restoration",

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

  name: "Sofa Repair & Restoration in London",

  serviceType: "Sofa Repair and Restoration",

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
      "Homeowners, businesses and clients looking to repair, restore or renew existing sofas",
  },
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
  hasPart: {
    "@id": `${CANONICAL_URL}#faq`,
  },

  breadcrumb: {
    "@id": `${CANONICAL_URL}#breadcrumb`,
  },
};

const faqSchema = {
  "@type": "FAQPage",

  "@id": `${CANONICAL_URL}#faq`,

  url: `${CANONICAL_URL}#faq`,

  name: "Frequently Asked Questions About Sofa Repair & Restoration",

  inLanguage: "en-GB",

  mainEntity: sofaRepairFaqs.map((faq) => ({
    "@type": "Question",

    name: faq.question,

    acceptedAnswer: {
      "@type": "Answer",

      text: faq.answer,
    },
  })),
};
/* =========================================================
   STRUCTURED DATA

   FAQPage will be added later from the same FAQ source
   used by the visible FAQ component.
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

export default function SofaRepairRestorationPage() {
  return (
    <>
      <JsonLd data={structuredData} />

      <SofaRepairPageContent />
    </>
  );
}
