import GallerySection from "@/components/static/gallery";
import GalleryHero from "@/components/static/GalleryHero";
import type { Metadata } from "next";

export type GalleryCategory =
  | "All"
  | "Bespoke sofa"
  | "Interiors"
  | "Restoration"
  | "Commercial";

export type GalleryItem = {
  id: number;
  title: string;
  category: Exclude<GalleryCategory, "All">;
  image: string;
  alt: string;
};

export const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: "Mayfair Residence",
    category: "Bespoke sofa",
    image: "/assets/images/1.webp",
    alt: "Luxury bespoke navy sofa in London interior",
  },
  {
    id: 2,
    title: "Chelsea Curved Sofa",
    category: "Interiors",
    image: "/assets/images/2.webp",
    alt: "Curved ivory bespoke sofa interior",
  },
  {
    id: 3,
    title: "Fine Upholstery Detail",
    category: "Restoration",
    image: "/assets/images/3.webp",
    alt: "Close-up upholstery craftsmanship",
  },
  {
    id: 4,
    title: "Blue Curve Collection",
    category: "Bespoke sofa",
    image: "/assets/images/4.webp",
    alt: "Deep navy bespoke curved sofa",
  },
  {
    id: 5,
    title: "Hand Restoration",
    category: "Restoration",
    image: "/assets/images/5.webp",
    alt: "Sofa restoration craftsmanship",
  },
  {
    id: 6,
    title: "Dining Composition",
    category: "Interiors",
    image: "/assets/images/6.webp",
    alt: "Luxury bespoke dining interior",
  },
  {
    id: 7,
    title: "Kensington Living Room",
    category: "Interiors",
    image: "/assets/images/7.webp",
    alt: "Elegant London living room",
  },
  {
    id: 8,
    title: "Hospitality Lounge",
    category: "Commercial",
    image: "/assets/images/4.webp",
    alt: "Luxury hospitality interior",
  },
  {
    id: 9,
    title: "Executive Office",
    category: "Commercial",
    image: "/assets/images/2.webp",
    alt: "Executive office sofa",
  },
  {
    id: 10,
    title: "Premium Texture",
    category: "Restoration",
    image: "/assets/images/7.webp",
    alt: "Premium upholstery texture",
  },
  {
    id: 11,
    title: "Sculpted Armchair",
    category: "Bespoke sofa",
    image: "/assets/images/3.webp",
    alt: "Luxury sculptural armchair",
  },
  {
    id: 12,
    title: "Belgravia Project",
    category: "Interiors",
    image: "/assets/images/6.webp",
    alt: "Completed luxury London interior",
  },
];

export const galleryCategories: GalleryCategory[] = [
  "All",
  "Bespoke sofa",
  "Interiors",
  "Restoration",
  "Commercial",
];

/* =========================================================
   SEO CONSTANTS
========================================================= */

const SITE_URL = "https://sofanmore.co.uk";

const CANONICAL_URL = `${SITE_URL}/gallery`;

const SEO_TITLE =
  "Sofa Gallery London | Bespoke Sofas & Interiors | Sofa N More";

const META_DESCRIPTION =
  "Explore the Sofa N More gallery featuring bespoke sofas, commercial seating, interior design and sofa restoration projects across London.";

const PAGE_H1 = "Spaces Made to Be Remembered";

const OG_TITLE = "Bespoke Sofas, Interiors & Restoration Gallery | Sofa N More";

const OG_DESCRIPTION =
  "Explore bespoke sofas, commercial seating, interior design and sofa restoration work from Sofa N More in London.";

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
  },

  twitter: {
    card: "summary_large_image",

    title: OG_TITLE,

    description: OG_DESCRIPTION,
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

      name: "Gallery",

      item: CANONICAL_URL,
    },
  ],
};

/* =========================================================
   IMAGE LIST SCHEMA
========================================================= */

const galleryItemListSchema = {
  "@type": "ItemList",

  "@id": `${CANONICAL_URL}#gallery-items`,

  name: "Sofa N More Gallery",

  numberOfItems: galleryItems.length,

  itemListElement: galleryItems.map((item, index) => ({
    "@type": "ListItem",

    position: index + 1,

    item: {
      "@type": "ImageObject",

      "@id": `${CANONICAL_URL}#image-${item.id}`,

      name: item.title,

      caption: item.alt,

      description: item.alt,

      contentUrl: `${SITE_URL}${item.image}`,

      thumbnailUrl: `${SITE_URL}${item.image}`,

      representativeOfPage: index === 0,

      creator: {
        "@id": `${SITE_URL}/#organization`,
      },
    },
  })),
};

/* =========================================================
   IMAGE GALLERY SCHEMA
========================================================= */

const imageGallerySchema = {
  "@type": "ImageGallery",

  "@id": `${CANONICAL_URL}#gallery`,

  url: CANONICAL_URL,

  name: SEO_TITLE,

  headline: PAGE_H1,

  description: META_DESCRIPTION,

  inLanguage: "en-GB",

  about: {
    "@id": `${SITE_URL}/#organization`,
  },

  provider: {
    "@id": `${SITE_URL}/#organization`,
  },

  publisher: {
    "@id": `${SITE_URL}/#organization`,
  },

  creator: {
    "@id": `${SITE_URL}/#organization`,
  },

  keywords: [
    "bespoke sofas London",
    "commercial sofas",
    "interior design",
    "sofa restoration",
    "upholstery craftsmanship",
  ],

  breadcrumb: {
    "@id": `${CANONICAL_URL}#breadcrumb`,
  },

  mainEntity: {
    "@id": `${CANONICAL_URL}#gallery-items`,
  },

  hasPart: galleryItems.map((item) => ({
    "@id": `${CANONICAL_URL}#image-${item.id}`,
  })),

  isPartOf: {
    "@id": `${SITE_URL}/#website`,
  },
};

/* =========================================================
   WEB PAGE SCHEMA
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
    "@id": `${SITE_URL}/#website`,
  },

  about: {
    "@id": `${SITE_URL}/#organization`,
  },

  publisher: {
    "@id": `${SITE_URL}/#organization`,
  },

  creator: {
    "@id": `${SITE_URL}/#organization`,
  },

  keywords: [
    "bespoke sofa gallery",
    "London sofa makers",
    "custom sofa projects",
    "commercial seating gallery",
    "sofa restoration gallery",
  ],

  breadcrumb: {
    "@id": `${CANONICAL_URL}#breadcrumb`,
  },

  mainEntity: {
    "@id": `${CANONICAL_URL}#gallery`,
  },

  primaryImageOfPage: galleryItems[0]
    ? {
        "@id": `${CANONICAL_URL}#image-${galleryItems[0].id}`,
      }
    : undefined,
};

/* =========================================================
   STRUCTURED DATA GRAPH
========================================================= */

const structuredData = {
  "@context": "https://schema.org",

  "@graph": [
    webPageSchema,
    breadcrumbSchema,
    imageGallerySchema,
    galleryItemListSchema,
  ],
};

/* =========================================================
   SAFE JSON-LD
========================================================= */

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

/* =========================================================
   PAGE
========================================================= */

export default function GalleryPage() {
  return (
    <>
      <JsonLd data={structuredData} />

      <main
        className="
          overflow-hidden

          bg-[var(--brand-ivory)] mt-20
        "
      >
        <GalleryHero />

        <GallerySection />
      </main>
    </>
  );
}
