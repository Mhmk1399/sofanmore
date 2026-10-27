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

const SEO_TITLE =
  "Sofa Reupholstery, Repair & Restoration London | Sofa N More";

const META_DESCRIPTION =
  "Professional sofa reupholstery, restoration and substantial repair in London. Fabric renewal, foam replacement, wood and frame restoration for sofas worth keeping. Send photos for an assessment.";

const PAGE_H1 = "Sofa Reupholstery, Restoration & Major Repairs in London.";

const OG_TITLE = SEO_TITLE;

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

      name: "Sofa Reupholstery & Restoration",

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

  name: "Sofa Reupholstery, Restoration & Major Repairs in London",

  serviceType: "Sofa Reupholstery, Repair and Restoration",

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
      "Homeowners and businesses looking for substantial sofa reupholstery, foam and comfort renewal, wood or frame restoration",
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

  name: "Frequently Asked Questions About Sofa Reupholstery & Restoration",

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
   STRUCTURED DATA: FAQPage shares the visible FAQ source.
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
