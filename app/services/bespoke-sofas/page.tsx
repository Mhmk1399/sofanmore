import BespokesofaPageContent, {
  bespokesofaFaqs,
} from "@/components/static/services/BespokeSofa/BespokeFurniturePageContent";
import { defaultOgImage, siteConfig } from "@/lib/site";
import type { Metadata } from "next";

/* =========================================================
   CONSTANTS
========================================================= */

const SITE_URL = "https://sofanmore.co.uk";

const CANONICAL_URL = "https://sofanmore.co.uk/services/bespoke-sofas";

const SEO_TITLE =
  "Bespoke Sofas London | Custom Made & Made-to-Measure | Sofa N More";

const META_DESCRIPTION =
  "Bespoke sofas handcrafted in London and made to your exact dimensions. Choose size, comfort, fabric and finish. No ready-made stock. Request a custom sofa quote.";

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
  "@context": "https://schema.org",

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

      name: "Bespoke Sofas",

      item: CANONICAL_URL,
    },
  ],
};

/* =========================================================
   SERVICE SCHEMA
========================================================= */

const serviceSchema = {
  "@context": "https://schema.org",

  "@type": "Service",

  "@id": `${CANONICAL_URL}#service`,

  url: CANONICAL_URL,

  name: "Bespoke Sofas in London",

  serviceType: "Bespoke and made-to-measure sofa design and making",

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

    audienceType: "Homeowners, interior designers and commercial clients",
  },
};

/* =========================================================
   WEB PAGE SCHEMA
========================================================= */

const webPageSchema = {
  "@context": "https://schema.org",

  "@type": "WebPage",

  "@id": `${CANONICAL_URL}#webpage`,

  url: CANONICAL_URL,

  name: SEO_TITLE,

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
};

/* =========================================================
   FAQ SCHEMA
========================================================= */

const faqSchema = {
  "@context": "https://schema.org",

  "@type": "FAQPage",

  "@id": `${CANONICAL_URL}#faq`,

  url: `${CANONICAL_URL}#faq`,

  mainEntity: bespokesofaFaqs.map((faq) => ({
    "@type": "Question",

    name: faq.question,

    acceptedAnswer: {
      "@type": "Answer",

      text: faq.answer,
    },
  })),
};

/* =========================================================
   JSON LD
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

export default function BespokesofaPage() {
  return (
    <>
      {/* PAGE */}

      <JsonLd data={webPageSchema} />

      {/* SERVICE */}

      <JsonLd data={serviceSchema} />

      {/* BREADCRUMBS */}

      <JsonLd data={breadcrumbSchema} />

      {/* FAQ */}

      <JsonLd data={faqSchema} />

      {/* VISIBLE PAGE */}

      <BespokesofaPageContent />
    </>
  );
}
