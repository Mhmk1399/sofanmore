import type { Metadata } from "next";
import ServicesPageContent, {
  servicesFaqs,
} from "../../components/static/services/ServicesPageContent";
import { defaultOgImage, siteConfig } from "@/lib/site";

/* =========================================================
   SEO CONFIG
========================================================= */

const SITE_URL = "https://sofanmore.co.uk";

const CANONICAL_URL = `${SITE_URL}/services`;

const SEO_TITLE = "Sofa Services North West London | Sofa N More";

const META_DESCRIPTION =
  "Explore bespoke sofas, commercial seating, interior design, and sofa repair and restoration from our North West London base near Cricklewood, Brent Cross and Neasden.";

const PAGE_H1 = "Sofa Services in North West London";

const OG_TITLE = "Bespoke Sofas, Repair & Interior Design in North West London";

/*
  The supplied OG description was truncated after:
  "Discover bespoke sofas, commercial seating, interior design,
   and sofa repair and restoration from Sofa N Mo..."

  Until the complete version is supplied, use the full meta
  description rather than publishing an incomplete sentence.
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

      item: CANONICAL_URL,
    },
  ],
};

const faqSchema = {
  "@type": "FAQPage",

  "@id": `${CANONICAL_URL}#faq`,

  url: `${CANONICAL_URL}#faq`,

  name: "Frequently Asked Questions About Our North West London Sofa Services",

  inLanguage: "en-GB",

  mainEntity: servicesFaqs.map((faq) => ({
    "@type": "Question",

    name: faq.question,

    acceptedAnswer: {
      "@type": "Answer",

      text: faq.answer,
    },
  })),
};

/* =========================================================
   SERVICES ITEM LIST
========================================================= */

const servicesListSchema = {
  "@type": "ItemList",

  "@id": `${CANONICAL_URL}#services`,

  name: "Sofa N More Services",

  numberOfItems: 4,

  itemListElement: [
    {
      "@type": "ListItem",

      position: 1,

      item: {
        "@type": "Service",

        "@id": `${SITE_URL}/services/bespoke-sofas#service`,

        name: "Bespoke Sofas",

        url: `${SITE_URL}/services/bespoke-sofas`,

        serviceType: "Bespoke Sofa Design and Making",

        provider: {
          "@id": `${SITE_URL}/#organization`,
        },

        areaServed: {
          "@type": "City",
          name: "London",
        },
      },
    },

    {
      "@type": "ListItem",

      position: 2,

      item: {
        "@type": "Service",

        "@id": `${SITE_URL}/services/commercial-sofas#service`,

        name: "Commercial Sofas",

        url: `${SITE_URL}/services/commercial-sofas`,

        serviceType: "Bespoke Commercial Sofas and Seating",

        provider: {
          "@id": `${SITE_URL}/#organization`,
        },

        areaServed: {
          "@type": "City",
          name: "London",
        },
      },
    },

    {
      "@type": "ListItem",

      position: 3,

      item: {
        "@type": "Service",

        "@id": `${SITE_URL}/services/interior-design#service`,

        name: "Interior Design",

        url: `${SITE_URL}/services/interior-design`,

        serviceType: "Residential and Commercial Interior Design",

        provider: {
          "@id": `${SITE_URL}/#organization`,
        },

        areaServed: {
          "@type": "City",
          name: "London",
        },
      },
    },

    {
      "@type": "ListItem",

      position: 4,

      item: {
        "@type": "Service",

        "@id": `${SITE_URL}/services/sofa-repair-restoration#service`,

        name: "Sofa Repair & Restoration",

        url: `${SITE_URL}/services/sofa-repair-restoration`,

        serviceType: "Sofa Repair and Restoration",

        provider: {
          "@id": `${SITE_URL}/#organization`,
        },

        areaServed: {
          "@type": "City",
          name: "London",
        },
      },
    },
  ],
};

/* =========================================================
   COLLECTION PAGE SCHEMA
========================================================= */

const webPageSchema = {
  "@type": "CollectionPage",

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
    "@id": `${SITE_URL}/#organization`,
  },

  breadcrumb: {
    "@id": `${CANONICAL_URL}#breadcrumb`,
  },
  hasPart: {
    "@id": `${CANONICAL_URL}#faq`,
  },
  mainEntity: {
    "@id": `${CANONICAL_URL}#services`,
  },
};

/* =========================================================
   LOCAL SERVICE AREA
========================================================= */

const localServiceAreaSchema = {
  "@type": "Service",

  "@id": `${CANONICAL_URL}#north-west-london-services`,

  name: "Sofa Services in North West London",

  description:
    "Bespoke sofas, commercial seating, interior design, and sofa repair and restoration from Sofa N More in North West London.",

  provider: {
    "@id": `${SITE_URL}/#organization`,
  },

  areaServed: [
    {
      "@type": "Place",
      name: "North West London",
    },

    {
      "@type": "Place",
      name: "Cricklewood",
    },

    {
      "@type": "Place",
      name: "Brent Cross",
    },

    {
      "@type": "Place",
      name: "Neasden",
    },
  ],

  hasOfferCatalog: {
    "@type": "OfferCatalog",

    name: "Sofa N More Services",

    itemListElement: [
      {
        "@type": "Offer",

        itemOffered: {
          "@type": "Service",

          name: "Bespoke Sofas",
        },
      },

      {
        "@type": "Offer",

        itemOffered: {
          "@type": "Service",

          name: "Commercial Sofas & Seating",
        },
      },

      {
        "@type": "Offer",

        itemOffered: {
          "@type": "Service",

          name: "Interior Design",
        },
      },

      {
        "@type": "Offer",

        itemOffered: {
          "@type": "Service",

          name: "Sofa Repair & Restoration",
        },
      },
    ],
  },
};

/* =========================================================
   STRUCTURED DATA
========================================================= */

const structuredData = {
  "@context": "https://schema.org",

  "@graph": [
    webPageSchema,
    breadcrumbSchema,
    servicesListSchema,
    localServiceAreaSchema,
    faqSchema,
  ],
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

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={structuredData} />

      <ServicesPageContent />
    </>
  );
}
