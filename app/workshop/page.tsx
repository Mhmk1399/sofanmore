import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/site";
import WorkshopHero from "@/components/static/workshop/WorkshopHero";
import WorkshopHighlightsSection from "@/components/static/workshop/WorkshopHighlightsSection";
import WorkingWorkshopSection from "@/components/static/workshop/WorkingWorkshopSection";
import WorkshopBespokeSofaSection from "@/components/static/workshop/WorkshopBespokeSofaSection";
import WorkshopCataloguesSection from "@/components/static/workshop/WorkshopCataloguesSection";
import WorkshopRepairAssessmentSection from "@/components/static/workshop/WorkshopRepairAssessmentSection";
import WorkshopCommercialSeatingSection from "@/components/static/workshop/WorkshopCommercialSeatingSection";
import WorkshopPhotographySection from "@/components/static/workshop/WorkshopPhotographySection";
import PlanningBespokeSofaSection from "@/components/static/workshop/PlanningBespokeSofaSection";
import WorkshopRepairDropOffSection from "@/components/static/workshop/WorkshopRepairDropOffSection";
import WorkshopVisitProcessSection from "@/components/static/workshop/WorkshopVisitProcessSection";
import WorkshopLocationSection from "@/components/static/workshop/WorkshopLocationSection";
import WorkshopServiceAreaSection from "@/components/static/workshop/WorkshopServiceAreaSection";
import FAQSection from "@/components/static/FAQSection";
import WorkshopFinalCTASection from "@/components/static/workshop/WorkshopFinalCTASection";

const CANONICAL_PATH = "/workshop";
const CANONICAL_URL = absoluteUrl(CANONICAL_PATH);
const SEO_TITLE = "Sofa Workshop North West London | Sofa N More";
const META_DESCRIPTION =
  "Visit Sofa N More's sofa workshop in North West London near Cricklewood for bespoke sofa consultations, upholstery, sofa repair and restoration.";
const PRIMARY_IMAGE = absoluteUrl(
  "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/sofa-n-more-workshop-north-west-london.webp",
);
const GOOGLE_MAPS_URL =
  "https://maps.google.com/maps?ll=51.552156,-0.19232&z=12&t=m&hl=en-US&gl=US&mapclient=embed&cid=11170879595232670801";

export const metadata: Metadata = {
  title: SEO_TITLE,
  description: META_DESCRIPTION,
  keywords: [
    "sofa workshop North West London",
    "upholstery workshop London",
    "bespoke sofa workshop London",
    "sofa workshop near Cricklewood",
    "sofa makers North West London",
    "sofa repair workshop North West London",
    "bespoke sofa consultation London",
  ],
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    type: "website",
    url: CANONICAL_URL,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    title: SEO_TITLE,
    description: META_DESCRIPTION,
    images: [
      {
        url: PRIMARY_IMAGE,
        width: 1200,
        height: 630,
        alt: "Sofa N More sofa workshop in North West London",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SEO_TITLE,
    description: META_DESCRIPTION,
    images: [PRIMARY_IMAGE],
  },
};

export type WorkshopFaqItem = {
  question: string;
  answer: string;
  id: number;
};

const workshopFaqs: WorkshopFaqItem[] = [
  {
    id: 1,
    question: "Is Sofa N More a showroom or a working workshop?",
    answer:
      "Sofa N More is primarily a working sofa and upholstery workshop rather than a conventional furniture showroom. We do not keep rows of ready-made sofas for immediate purchase. Instead, you can explore our full catalogue collection, compare fabric samples, discuss a bespoke order, plan commercial seating or arrange repair and restoration work.",
  },
  {
    id: 2,
    question: "Can I visit without an appointment?",
    answer:
      "Yes. Walk-ins are welcome during our customer hours. Appointments are also available and are recommended for detailed consultations, commercial project discussions and large sofa drop-offs.",
  },
  {
    id: 3,
    question: "Is the workshop consultation free?",
    answer:
      "Yes. Initial workshop consultations are free. Bring photographs, measurements, plans or project references so the conversation can be as useful as possible.",
  },
  {
    id: 4,
    question: "Can I view catalogues and fabric samples at the workshop?",
    answer:
      "Yes. Our full catalogue collection and fabric samples are available to explore at the workshop. You can compare styles, colours, textures and upholstery directions before finalising a project.",
  },
  {
    id: 5,
    question: "Can I place an order and make payment at the workshop?",
    answer:
      "Yes. Once the project details have been discussed and agreed, orders and payments can be completed at the workshop.",
  },
  {
    id: 6,
    question: "Can I bring my sofa to the workshop for repair?",
    answer:
      "Yes. Suitable sofas and upholstered pieces can be brought to the workshop. Send photographs before transporting a large item so we can understand the condition and confirm the most suitable drop-off arrangements.",
  },
  {
    id: 7,
    question: "Do you collect sofas for repair or restoration?",
    answer:
      "Yes. A collection service is available. Collection arrangements depend on the size of the item, location and agreed project requirements.",
  },
  {
    id: 8,
    question: "Is parking available?",
    answer:
      "Yes. On-site parking is available at Atlas Business Centre for workshop visitors.",
  },
  {
    id: 9,
    question: "Can I discuss a commercial seating project at the workshop?",
    answer:
      "Yes. We welcome restaurant, café, hotel, office and hospitality seating enquiries. Bring floor plans, photographs, dimensions, quantities and design references where possible.",
  },
  {
    id: 10,
    question: "Where is the workshop?",
    answer:
      "The Sofa N More workshop is at Unit G19, Atlas Business Centre, Oxgate Lane, Staples Corner West, London NW2 7HJ. It is in the Cricklewood and Staples Corner area of North West London, close to Brent Cross West station.",
  },
];

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
      name: "Workshop",
      item: CANONICAL_URL,
    },
  ],
};

const workshopSchema = {
  "@type": ["LocalBusiness", "FurnitureStore"],
  "@id": `${CANONICAL_URL}#workshop`,
  name: "Sofa N More Workshop",
  url: CANONICAL_URL,
  image: PRIMARY_IMAGE,
  description:
    "Sofa workshop in North West London for bespoke sofa consultations, upholstery guidance, commercial seating and sofa repair assessments.",
  telephone: siteConfig.phoneInternational,
  email: siteConfig.email,
  priceRange: "GBP",
  address: {
    "@type": "PostalAddress",
    ...siteConfig.address,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 51.552156,
    longitude: -0.19232,
  },
  hasMap: GOOGLE_MAPS_URL,
  parentOrganization: {
    "@id": `${siteConfig.url}/#organization`,
  },
  areaServed: siteConfig.areaServed.map((name) => ({
    "@type": "Place",
    name,
  })),
};

const consultationServiceSchema = {
  "@type": "Service",
  "@id": `${CANONICAL_URL}#consultation`,
  name: "Bespoke sofa consultation London",
  serviceType: "Bespoke sofa consultation",
  url: CANONICAL_URL,
  description:
    "Workshop consultation for bespoke sofas, upholstery, commercial seating and sofa repair projects in North West London.",
  provider: {
    "@id": `${siteConfig.url}/#organization`,
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
      "@type": "City",
      name: "London",
    },
  ],
};

const faqSchema = {
  "@type": "FAQPage",

  "@id": `${CANONICAL_URL}#faq`,

  mainEntity: workshopFaqs.map((faq) => ({
    "@type": "Question",

    name: faq.question,

    acceptedAnswer: {
      "@type": "Answer",

      text: faq.answer,
    },
  })),
};

const webPageSchema = {
  "@type": "WebPage",
  "@id": `${CANONICAL_URL}#webpage`,
  url: CANONICAL_URL,
  name: SEO_TITLE,
  headline: "Sofa Workshop in North West London",
  description: META_DESCRIPTION,
  inLanguage: siteConfig.language,
  isPartOf: {
    "@id": `${siteConfig.url}/#website`,
  },
  about: {
    "@id": `${CANONICAL_URL}#workshop`,
  },
  mainEntity: {
    "@id": `${CANONICAL_URL}#workshop`,
  },
  publisher: {
    "@id": `${siteConfig.url}/#organization`,
  },
  breadcrumb: {
    "@id": `${CANONICAL_URL}#breadcrumb`,
  },
  hasPart: [
    {
      "@id": `${CANONICAL_URL}#consultation`,
    },
    {
      "@id": `${CANONICAL_URL}#faq`,
    },
  ],
  primaryImageOfPage: {
    "@type": "ImageObject",
    "@id": `${CANONICAL_URL}#primaryimage`,
    url: PRIMARY_IMAGE,
    contentUrl: PRIMARY_IMAGE,
    caption: "Sofa N More sofa workshop in North West London",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    webPageSchema,
    workshopSchema,
    consultationServiceSchema,
    faqSchema,
    breadcrumbSchema,
  ],
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

export default function WorkshopPage() {
  return (
    <>
      <JsonLd data={structuredData} />
      <main className="overflow-hidden mt-20 bg-[var(--brand-ivory)]">
        <WorkshopHero />
        <WorkshopHighlightsSection />
        <WorkingWorkshopSection />
        <WorkshopBespokeSofaSection />
        <WorkshopCataloguesSection />
        <WorkshopRepairAssessmentSection />
        <WorkshopCommercialSeatingSection />
        <WorkshopPhotographySection
          images={[
            {
              src: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/sofa-n-more-workshop-north-west-london.webp",
              alt: "Sofa N More sofa and upholstery workshop in North West London",
              label: "Workshop photography",
            },
            {
              src: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/inside-sofa-upholstery-workshop-london.webp",
              alt: "Inside the Sofa N More upholstery workshop in London",
              label: "Inside the upholstery workshop",
            },
            {
              src: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/sofa-repair-workshop-north-west-london.webp",
              alt: "Sofa N More repair workshop in North West London",
              label: "Repair workshop",
            },
            {
              src: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/commercial-seating-workshop-london.webp",
              alt: "Sofa N More commercial seating workshop in London",
              label: "Commercial seating workshop",
            },
          ]}
        />
        <PlanningBespokeSofaSection />
        <WorkshopRepairDropOffSection />
        <WorkshopVisitProcessSection />
        <WorkshopLocationSection />
        <WorkshopServiceAreaSection />
        <FAQSection id="faq" items={workshopFaqs} />
        <WorkshopFinalCTASection />
      </main>
    </>
  );
}
