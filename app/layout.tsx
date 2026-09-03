import type { Metadata, Viewport } from "next";

import { Manrope, Geist } from "next/font/google";

import "./globals.css";
import Navbar from "@/components/global/Navbar";
import Footer from "@/components/global/Footer";
import Breadcrumbs from "@/components/global/Breadcrumbs";
import SmoothScrollProvider from "@/components/global/SmoothScrollProvider";
import FloatingContactMenu from "@/components/ui/FloatingContactMenu";
import ToastProvider from "@/components/ui/ToastProvider";
import PwaRegister from "@/components/global/PwaRegister";
import { absoluteUrl, defaultOgImage, siteConfig } from "@/lib/site";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Geist({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight:["400"]
 });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  title: {
    default: "Sofa N More | Bespoke Sofas & Interiors London",
    template: "%s | Sofa N More",
  },
  description: siteConfig.description,
  keywords: [
    "bespoke sofas London",
    "custom sofa London",
    "sofa repair London",
    "sofa restoration London",
    "commercial sofas London",
    "interior design London",
    "North West London sofa maker",
  ],
  alternates: {
    canonical: "/",
  },
  manifest: "/manifest.webmanifest",
  category: "home services",
  creator: siteConfig.name,
  publisher: siteConfig.name,
  formatDetection: {
    telephone: false,
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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      {
        url: "/icons/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  openGraph: {
    type: "website",
    url: "/",
    title: "Sofa N More | Bespoke Sofas & Interiors London",
    description: siteConfig.description,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    images: [defaultOgImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sofa N More | Bespoke Sofas & Interiors London",
    description: siteConfig.description,
    images: [defaultOgImage.url],
  },
};

export const viewport: Viewport = {
  themeColor: "#12253e",
  colorScheme: "light",
};

const siteStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "FurnitureStore"],
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      url: siteConfig.url,
      image: absoluteUrl(defaultOgImage.url),
      description: siteConfig.description,
      telephone: siteConfig.phoneInternational,
      email: siteConfig.email,
      priceRange: "GBP",
      address: {
        "@type": "PostalAddress",
        ...siteConfig.address,
      },
      areaServed: siteConfig.areaServed.map((name) => ({
        "@type": "Place",
        name,
      })),
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: siteConfig.name,
      description: siteConfig.description,
      inLanguage: siteConfig.language,
      publisher: {
        "@id": `${siteConfig.url}/#organization`,
      },
    },
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${playfair.variable}`}>
      <body>
        <PwaRegister />
        <ToastProvider />
        <JsonLd data={siteStructuredData} />
        <SmoothScrollProvider />
        <Navbar />
        <Breadcrumbs />
        <FloatingContactMenu
          phone={siteConfig.phoneDisplay}
          whatsapp={siteConfig.whatsappNumber}
          email={siteConfig.email}
          whatsappMessage="Hello Sofa N More, I'd like to discuss a bespoke sofa project."
        />
        {children}
        <Footer />
      </body>
    </html>
  );
}
