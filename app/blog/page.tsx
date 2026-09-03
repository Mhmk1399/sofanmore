import JournalSection, { journalPosts } from "@/components/static/JournalSection";
import { absoluteUrl, defaultOgImage, siteConfig } from "@/lib/site";
import type { Metadata } from "next";

const CANONICAL_PATH = "/blog";
const CANONICAL_URL = absoluteUrl(CANONICAL_PATH);
const SEO_TITLE = "Sofa N More Journal | Bespoke sofa, Interiors & Craftsmanship";
const META_DESCRIPTION =
  "Explore the Sofa N More journal for bespoke sofa inspiration, London craftsmanship, interior design ideas, upholstery advice and sofa restoration stories.";

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
      "Explore bespoke sofa inspiration, London craftsmanship, interior design ideas, upholstery advice and sofa restoration stories.",
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    images: [defaultOgImage],
  },
  twitter: {
    card: "summary_large_image",
    title: SEO_TITLE,
    description: META_DESCRIPTION,
    images: [defaultOgImage.url],
  },
};

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
      name: "Journal",
      item: CANONICAL_URL,
    },
  ],
};

const blogPostSchemas = journalPosts.map((post) => {
  const postUrl = `${CANONICAL_URL}#post-${post.id}`;
  const imageUrl = absoluteUrl(post.image);

  return {
    "@type": "BlogPosting",
    "@id": postUrl,
    url: postUrl,
    headline: post.title,
    name: post.title,
    description: post.excerpt,
    articleSection: post.category,
    datePublished: post.datePublished,
    dateModified: post.datePublished,
    inLanguage: siteConfig.language,
    image: {
      "@type": "ImageObject",
      url: imageUrl,
      contentUrl: imageUrl,
      caption: post.title,
    },
    author: {
      "@id": `${siteConfig.url}/#organization`,
    },
    publisher: {
      "@id": `${siteConfig.url}/#organization`,
    },
    isPartOf: {
      "@id": `${CANONICAL_URL}#blog`,
    },
    mainEntityOfPage: {
      "@id": `${CANONICAL_URL}#webpage`,
    },
  };
});

const blogItemListSchema = {
  "@type": "ItemList",
  "@id": `${CANONICAL_URL}#posts`,
  name: "Sofa N More Journal Articles",
  numberOfItems: journalPosts.length,
  itemListElement: journalPosts.map((post, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@id": `${CANONICAL_URL}#post-${post.id}`,
    },
  })),
};

const blogSchema = {
  "@type": "Blog",
  "@id": `${CANONICAL_URL}#blog`,
  url: CANONICAL_URL,
  name: SEO_TITLE,
  description: META_DESCRIPTION,
  inLanguage: siteConfig.language,
  publisher: {
    "@id": `${siteConfig.url}/#organization`,
  },
  blogPost: blogPostSchemas.map((post) => ({
    "@id": post["@id"],
  })),
};

const webPageSchema = {
  "@type": "CollectionPage",
  "@id": `${CANONICAL_URL}#webpage`,
  url: CANONICAL_URL,
  name: SEO_TITLE,
  headline: "Stories, Craft & Inspiration",
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
  mainEntity: {
    "@id": `${CANONICAL_URL}#blog`,
  },
  hasPart: {
    "@id": `${CANONICAL_URL}#posts`,
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    webPageSchema,
    blogSchema,
    blogItemListSchema,
    breadcrumbSchema,
    ...blogPostSchemas,
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

const page = () => {
  return (
    <>
      <JsonLd data={structuredData} />
      <main>
        <JournalSection />
      </main>
    </>
  );
};

export default page;
