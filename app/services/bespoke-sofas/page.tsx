import BespokesofaPageContent, { bespokesofaFaqs } from "@/components/static/services/BespokeSofa/BespokeFurniturePageContent";
import { defaultOgImage, siteConfig } from "@/lib/site";
import type { Metadata } from "next";

 
 
/* =========================================================
   CONSTANTS
========================================================= */

const SITE_URL = "https://sofanmore.co.uk";

const CANONICAL_URL = "https://sofanmore.co.uk/services/bespoke-sofas";

const SEO_TITLE = "Bespoke sofa London | Custom-Made | Sofa N More";

const META_DESCRIPTION =
  "Bespoke sofa handcrafted in London and made around your space. Custom sofas, chairs, benches and more, tailored in size, style and finish.";

const OG_TITLE = "Bespoke sofa in London | Sofa N More";

const OG_DESCRIPTION =
  "Discover custom-made sofa designed around your space, style and everyday life, handcrafted by Sofa N More in London.";

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

      name: "Bespoke sofa",

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

  name: "Bespoke sofa in London",

  serviceType: "Bespoke sofa",

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
