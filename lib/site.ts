export const siteConfig = {
  name: "Sofa N More",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://sofanmore.co.uk").replace(
    /\/$/,
    "",
  ),
  description:
    "Bespoke sofas, commercial seating, interior design, and sofa repair and restoration handcrafted in London.",
  locale: "en_GB",
  language: "en-GB",
  email: "info@sofanmore.co.uk",
  phoneDisplay: "+44 7400 577844",
  phoneHref: "tel:+447400577844",
  phoneInternational: "+447400577844",
  whatsappNumber: "+447400577844",
  address: {
    streetAddress:
      "Unit G19, Atlas Business Centre, Oxgate Lane, Staples Corner West",
    addressLocality: "London",
    postalCode: "NW2 7HJ",
    addressCountry: "GB",
  },
  areaServed: [
    "North West London",
    "Cricklewood",
    "Staples Corner",
    "Brent Cross",
    "Neasden",
    "Dollis Hill",
    "Hendon",
    "Golders Green",
    "Willesden Green",
    "West Hampstead",
    "Kilburn",
    "Hampstead",
    "Colindale",
    "Wembley",
    "Finchley",
  ],
} as const;

export type SiteRoute = {
  path: string;
  priority: number;
  changeFrequency: "weekly" | "monthly" | "yearly";
  images?: string[];
};

export const siteRoutes: SiteRoute[] = [
  {
    path: "/",
    priority: 1,
    changeFrequency: "weekly",
    images: ["https://sofanmore.s3.eu-west-2.amazonaws.com/Image/herodesktop.webp", "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/7.webp"],
  },
  {
    path: "/services",
    priority: 0.95,
    changeFrequency: "monthly",
    images: ["https://sofanmore.s3.eu-west-2.amazonaws.com/Image/1.webp", "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/2.webp"],
  },
  {
    path: "/services/bespoke-sofas",
    priority: 0.9,
    changeFrequency: "monthly",
    images: ["https://sofanmore.s3.eu-west-2.amazonaws.com/Image/bespoke-sofa-london-sofa-n-more.webp"],
  },
  {
    path: "/services/commercial-sofas",
    priority: 0.9,
    changeFrequency: "monthly",
    images: ["https://sofanmore.s3.eu-west-2.amazonaws.com/Image/2.webp", "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/Office.webp"],
  },
  {
    path: "/services/interior-design",
    priority: 0.9,
    changeFrequency: "monthly",
    images: ["https://sofanmore.s3.eu-west-2.amazonaws.com/Image/Interior.webp", "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/3.webp"],
  },
  {
    path: "/services/sofa-repair-restoration",
    priority: 0.9,
    changeFrequency: "monthly",
    images: ["https://sofanmore.s3.eu-west-2.amazonaws.com/Image/Repair.webp", "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/5.webp"],
  },
  {
    path: "/gallery",
    priority: 0.75,
    changeFrequency: "monthly",
    images: [
      "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/1.webp",
      "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/2.webp",
      "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/3.webp",
      "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/4.webp",
    ],
  },
  {
    path: "/projects",
    priority: 0.82,
    changeFrequency: "monthly",
    images: ["https://sofanmore.s3.eu-west-2.amazonaws.com/Image/1.webp", "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/2.webp"],
  },
  {
    path: "/workshop",
    priority: 0.82,
    changeFrequency: "monthly",
    images: [
      "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/Craftsmanship+close-up.webp",
      "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/7.webp",
      "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/bespoke-sofa-london-sofa-n-more.webp",
    ],
  },
  {
    path: "/about-us",
    priority: 0.7,
    changeFrequency: "yearly",
    images: ["https://sofanmore.s3.eu-west-2.amazonaws.com/Image/6.webp"],
  },
  {
    path: "/contact-us",
    priority: 0.75,
    changeFrequency: "yearly",
    images: ["https://sofanmore.s3.eu-west-2.amazonaws.com/Image/4.webp"],
  },
  {
    path: "/faqs",
    priority: 0.65,
    changeFrequency: "monthly",
  },
  {
    path: "/blog",
    priority: 0.65,
    changeFrequency: "monthly",
    images: ["https://sofanmore.s3.eu-west-2.amazonaws.com/Image/Craftsmanship+close-up.webp"],
  },
  {
    path: "/privacy-policy",
    priority: 0.35,
    changeFrequency: "yearly",
  },
  {
    path: "/terms-and-conditions",
    priority: 0.4,
    changeFrequency: "yearly",
  },
];

export function absoluteUrl(path = "/") {
  if (/^https?:\/\//.test(path)) return path;

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return `${siteConfig.url}${normalizedPath}`;
}

export const defaultOgImage = {
  url: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/herodesktop.webp",
  width: 1200,
  height: 630,
  alt: "Sofa N More bespoke sofa and interior craftsmanship in London",
};
