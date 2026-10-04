import GallerySection from "@/components/static/gallery";
import GalleryHero from "@/components/static/GalleryHero";
import { listActiveGalleryImages } from "@/lib/gallery-image-repository";
import { defaultOgImage, siteConfig } from "@/lib/site";
import type { Metadata } from "next";

const SITE_URL = "https://sofanmore.co.uk";
const CANONICAL_URL = `${SITE_URL}/gallery`;
const SEO_TITLE = "Sofa Gallery London | Upholstery & Interiors | Sofa N More";
const META_DESCRIPTION = "Explore the Sofa N More gallery featuring upholstery, commercial seating, interior design and sofa restoration projects across London.";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: SEO_TITLE, description: META_DESCRIPTION, alternates: { canonical: CANONICAL_URL },
  robots: { index: true, follow: true },
  openGraph: { type: "website", url: CANONICAL_URL, siteName: siteConfig.name, locale: siteConfig.locale, title: SEO_TITLE, description: META_DESCRIPTION, images: [defaultOgImage] },
  twitter: { card: "summary_large_image", title: SEO_TITLE, description: META_DESCRIPTION, images: [defaultOgImage.url] },
};

function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

export default async function GalleryPage() {
  let result: Awaited<ReturnType<typeof listActiveGalleryImages>> = { images: [], pagination: { page: 1, limit: 16, total: 0, totalPages: 1, hasMore: false } };
  try { result = await listActiveGalleryImages(undefined, { page: 1, limit: 16 }); }
  catch (error) { console.error("Gallery could not be loaded", error); }
  const items = result.images;
  const imageItems = items.map((item, index) => ({
    "@type": "ListItem", position: index + 1,
    item: { "@type": "ImageObject", "@id": `${CANONICAL_URL}#image-${item.id}`, name: `Gallery image ${item.code}`, caption: item.description, description: item.description, contentUrl: new URL(item.url, SITE_URL).toString(), thumbnailUrl: new URL(item.url, SITE_URL).toString(), representativeOfPage: index === 0, creator: { "@id": `${SITE_URL}/#organization` } },
  }));
  const structuredData = { "@context": "https://schema.org", "@graph": [
    { "@type": "CollectionPage", "@id": `${CANONICAL_URL}#webpage`, url: CANONICAL_URL, name: SEO_TITLE, description: META_DESCRIPTION, inLanguage: "en-GB", mainEntity: { "@id": `${CANONICAL_URL}#gallery-items` } },
    { "@type": "ItemList", "@id": `${CANONICAL_URL}#gallery-items`, name: "Sofa N More Gallery", numberOfItems: result.pagination.total, itemListElement: imageItems },
    { "@type": "BreadcrumbList", "@id": `${CANONICAL_URL}#breadcrumb`, itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL }, { "@type": "ListItem", position: 2, name: "Gallery", item: CANONICAL_URL }] },
  ] };
  return <><JsonLd data={structuredData} /><main className="mt-8 overflow-hidden bg-[var(--brand-ivory)] md:mt-20"><GalleryHero /><GallerySection initialItems={items} initialPagination={result.pagination} /></main></>;
}
