import type { Metadata } from "next";

import FaqHero from "@/components/static/FaqHero";
import FAQSection from "@/components/static/FAQSection";
import { absoluteUrl, siteConfig } from "@/lib/site";

const CANONICAL_PATH = "/faq";
const CANONICAL_URL = absoluteUrl(CANONICAL_PATH);
const SEO_TITLE = "FAQs | Bespoke Sofa & Sofa Restoration London";
const META_DESCRIPTION =
  "Answers to common questions about Sofa N More bespoke sofa, water-resistant and fire-retardant upholstery, home staging, interior design, delivery and sustainability.";

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
      "Answers to common questions about Sofa N More bespoke sofas, water-resistant and fire-retardant upholstery, interior design, delivery, and sofa restoration.",
  },
};

const faqItems = [
  {
    id: 1,
    question: "What types of sofa does Sofa N More offer?",
    answer:
      "Sofa N More specialises in bespoke sofa, including sofas, dining tables, beds, and accessories. Each piece is handcrafted in our London workshop to ensure quality and uniqueness.",
  },
  {
    id: 2,
    question: "Can I customise the sofa to fit my space and style?",
    answer:
      "Yes, absolutely. We offer a bespoke service where you can customise every aspect of your sofa, from dimensions to fabric choices, ensuring it complements your home perfectly.",
  },
  {
    id: 3,
    question: "How does the home staging service work?",
    answer:
      "Our home staging service is designed to enhance the appeal of your property for potential buyers. We provide comprehensive staging solutions, including sofa rental and styling, to showcase your home at its best.",
  },
  {
    id: 4,
    question: "Does Sofa N More provide interior design consultations?",
    answer:
      "Yes, we offer personalised interior design consultations to help you create spaces that reflect your taste and lifestyle. Our expert designers work closely with you to develop tailored design concepts and plans.",
  },
  {
    id: 5,
    question:
      "What are the benefits of choosing bespoke sofa over ready-made options?",
    answer:
      "Bespoke sofa offers several advantages, including superior craftsmanship, personalised design to fit your exact requirements, and the use of high-quality materials for durability and longevity.",
  },
  {
    id: 6,
    question: "Does Sofa N More provide office sofa solutions?",
    answer:
      "Yes, we specialise in office sofa solutions tailored to enhance productivity and aesthetics. Our range includes ergonomic desks, stylish storage solutions, and custom-designed pieces to meet your business needs.",
  },
  {
    id: 7,
    question: "How can I schedule a consultation or visit your showroom?",
    answer:
      "You can schedule a consultation by contacting us via phone at 07400 577844. Our showroom is located at Unit G19, Atlas Business Centre, Oxgate Ln, Staples Corner W, London NW2 7HJ.",
  },
  {
    id: 8,
    question: "Does Sofa N More offer delivery and installation services?",
    answer:
      "Yes, we provide comprehensive delivery and installation services for all our sofa products. Our team ensures that your sofa is delivered safely and installed professionally, leaving you with a perfectly furnished space.",
  },
  {
    id: 9,
    question: "What sustainability practices does Sofa N More follow?",
    answer:
      "Sofa N More is committed to sustainability. We use locally sourced materials wherever possible, minimise waste during production, and offer sofa restoration services to extend the life of your pieces.",
  },
  {
    id: 10,
    question:
      "How can I get updates on new products and promotions from Sofa N More?",
    answer:
      "Stay connected with us through our website and social media channels for the latest updates on new products, promotions, and design inspirations.",
  },
  {
    id: 11,
    question: "Are Sofa N More sofas waterproof and fire-resistant?",
    answer:
      "The sofas we make can be specified with water-resistant upholstery and fire-retardant materials. During fabric selection, we confirm the most suitable protective finish for your home, office, restaurant or hospitality project.",
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
      name: "FAQs",
      item: CANONICAL_URL,
    },
  ],
};

const faqPageSchema = {
  "@type": "FAQPage",
  "@id": `${CANONICAL_URL}#webpage`,
  url: CANONICAL_URL,
  name: SEO_TITLE,
  headline: "Frequently Asked Questions",
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
  mainEntity: faqItems.map((faq) => ({
      "@type": "Question",
      "@id": `${CANONICAL_URL}#question-${faq.id}`,
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [faqPageSchema, breadcrumbSchema],
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

export default function FaqsPage() {
  return (
    <main>
      <JsonLd data={structuredData} />
      <FaqHero />
      <FAQSection id="faq" items={faqItems} />
    </main>
  );
}
