import type { Metadata } from "next";
import type { ReactNode } from "react";

import { cache } from "react";

import Link from "next/link";

import {
  ChevronRight,
  FolderOpen,
  Hash,
  Images,
  MapPin,
  Sofa,
} from "lucide-react";

import { notFound } from "next/navigation";

import BespokeSofaLeadForm from "@/components/lead-capture/BespokeSofaLeadForm";
import CommercialSofaLeadForm from "@/components/lead-capture/CommercialSofaLeadForm";
import InteriorDesignLeadForm from "@/components/lead-capture/InteriorDesignLeadForm";
import SofaRepairLeadForm from "@/components/lead-capture/SofaRepairLeadForm";
import ClayButton from "@/components/ui/ClayButton";

import { getPublishedProjectBySlug } from "@/lib/project-repository";

import {
  projectServiceLabels,
  projectServiceRoutes,
} from "@/lib/project-service";

import { siteConfig } from "@/lib/site";

import {
  ProjectGallery,
  ProjectHeroMedia,
  type ProjectMediaItem,
} from "./ProjectMedia";

/* =========================================================
   TYPES
========================================================= */

type ProjectDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

/* =========================================================
   CONSTANTS
========================================================= */

const SITE_URL = "https://sofanmore.co.uk";

const BUSINESS_ID = `${SITE_URL}/#business`;
const WEBSITE_ID = `${SITE_URL}/#website`;

/* =========================================================
   PROJECT LOADER

   Important:
   Do not convert unexpected DB/API errors into a false 404.

   A missing project should return null from the repository.
   A real database error should remain a server error.
========================================================= */

const loadProject = cache(async (slug: string) => {
  return getPublishedProjectBySlug(slug);
});

/* =========================================================
   URL HELPER
========================================================= */

function absoluteUrl(value: string) {
  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value;
  }

  return new URL(
    value.startsWith("/") ? value : `/${value}`,
    SITE_URL,
  ).toString();
}

/* =========================================================
   META DESCRIPTION
========================================================= */

function createMetaDescription(value: string, maxLength = 160) {
  const normalized = value.replace(/\s+/g, " ").trim();

  if (normalized.length <= maxLength) {
    return normalized;
  }

  const shortened = normalized
    .slice(0, maxLength - 1)
    .replace(/\s+\S*$/, "")
    .trim();

  return `${shortened}…`;
}

/* =========================================================
   SAFE JSON-LD
========================================================= */

function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

function getProjectEnquiryAnchor(service: keyof typeof projectServiceLabels) {
  if (service === "COMMERCIAL_SOFA") return "commercial-sofa-enquiry";
  if (service === "INTERIOR_DESIGN") return "interior-design-enquiry";
  if (service === "SOFA_REPAIR_RESTORATION") return "sofa-repair-enquiry";
  return "bespoke-sofa-enquiry";
}

function ProjectServiceLeadForm({
  service,
}: {
  service: keyof typeof projectServiceLabels;
}) {
  if (service === "COMMERCIAL_SOFA") return <CommercialSofaLeadForm />;
  if (service === "INTERIOR_DESIGN") return <InteriorDesignLeadForm />;
  if (service === "SOFA_REPAIR_RESTORATION") return <SofaRepairLeadForm />;
  return <BespokeSofaLeadForm />;
}

/* =========================================================
   METADATA
========================================================= */

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;

  const project = await loadProject(slug);

  if (!project) {
    return {
      title: "Project Not Found | Sofa N More",

      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const pagePath = `/projects/${project.slug}`;

  const pageUrl = `${SITE_URL}${pagePath}`;

  const description = createMetaDescription(project.excerpt);

  const coverImage = absoluteUrl(project.coverImageUrl);

  const title = `${project.title} | Sofa N More London`;

  return {
    title,

    description,

    alternates: {
      canonical: pageUrl,
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

      url: pageUrl,

      title,

      description,

      siteName: siteConfig.name,

      locale: siteConfig.locale,

      images: [
        {
          url: coverImage,
          alt: project.title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",

      title,

      description,

      images: [coverImage],
    },
  };
}

/* =========================================================
   PAGE
========================================================= */

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params;

  const project = await loadProject(slug);

  if (!project) {
    notFound();
  }

  const serviceLabel = projectServiceLabels[project.service];

  const serviceRoute = projectServiceRoutes[project.service];

  const enquiryAnchor = getProjectEnquiryAnchor(project.service);

  const pageUrl = `${SITE_URL}/projects/${project.slug}`;

  /* =======================================================
     ALL PROJECT MEDIA

     First image is always the cover.
  ======================================================= */

  const media: ProjectMediaItem[] = [
    {
      id: `cover-${project.slug}`,

      url: project.coverImageUrl,

      alt: project.title,

      label: "Project cover",
    },

    ...project.images.map((image, index) => ({
      id: image.id,

      url: image.url,

      alt: image.alt?.trim() || `${project.title} — project image ${index + 1}`,

      label: `Project image ${index + 1}`,
    })),
  ];

  /* =======================================================
     STORY
  ======================================================= */

  const storySections = [
    {
      number: "01",
      title: "The Brief",
      body: project.brief,
    },

    {
      number: "02",
      title: "The Approach",
      body: project.approach,
    },

    {
      number: "03",
      title: "Materials & Details",
      body: project.details,
    },

    {
      number: "04",
      title: "The Result",
      body: project.result,
    },
  ].filter(
    (
      section,
    ): section is {
      number: string;
      title: string;
      body: string;
    } => Boolean(section.body?.trim()),
  );

  /* =======================================================
     JSON-LD IMAGES
  ======================================================= */

  const schemaImages = media.map((image) => ({
    "@type": "ImageObject",

    contentUrl: absoluteUrl(image.url),

    url: absoluteUrl(image.url),

    caption: image.alt,
  }));

  /* =======================================================
     STRUCTURED DATA
  ======================================================= */

  const structuredData = {
    "@context": "https://schema.org",

    "@graph": [
      /* ---------------------------------------------------
         WEBSITE
      --------------------------------------------------- */

      {
        "@type": "WebSite",

        "@id": WEBSITE_ID,

        url: `${SITE_URL}/`,

        name: siteConfig.name,
      },

      /* ---------------------------------------------------
         BUSINESS
      --------------------------------------------------- */

      {
        "@type": "Organization",

        "@id": BUSINESS_ID,

        name: "Sofa N More",

        url: SITE_URL,

        telephone: "+447400577844",

        email: "info@sofanmore.co.uk",

        address: {
          "@type": "PostalAddress",

          streetAddress:
            "Unit G19, Atlas Business Centre, Oxgate Lane, Staples Corner West",

          addressLocality: "London",

          postalCode: "NW2 7HJ",

          addressCountry: "GB",
        },
      },

      /* ---------------------------------------------------
         PROJECT / CREATIVE WORK
      --------------------------------------------------- */

      {
        "@type": "CreativeWork",

        "@id": `${pageUrl}#project`,

        url: pageUrl,

        name: project.title,

        description: project.excerpt,

        identifier: String(project.projectCode),

        mainEntityOfPage: {
          "@id": `${pageUrl}#webpage`,
        },

        creator: {
          "@id": BUSINESS_ID,
        },

        provider: {
          "@id": BUSINESS_ID,
        },

        about: {
          "@type": "Service",

          name: serviceLabel,

          url: absoluteUrl(serviceRoute),

          provider: {
            "@id": BUSINESS_ID,
          },
        },

        image: schemaImages,
      },

      /* ---------------------------------------------------
         WEB PAGE
      --------------------------------------------------- */

      {
        "@type": "WebPage",

        "@id": `${pageUrl}#webpage`,

        url: pageUrl,

        name: project.title,

        description: project.excerpt,

        isPartOf: {
          "@id": WEBSITE_ID,
        },

        about: {
          "@id": `${pageUrl}#project`,
        },

        mainEntity: {
          "@id": `${pageUrl}#project`,
        },

        primaryImageOfPage: schemaImages[0],

        breadcrumb: {
          "@id": `${pageUrl}#breadcrumb`,
        },
      },

      /* ---------------------------------------------------
         BREADCRUMB
      --------------------------------------------------- */

      {
        "@type": "BreadcrumbList",

        "@id": `${pageUrl}#breadcrumb`,

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

            name: "Projects",

            item: `${SITE_URL}/projects`,
          },

          {
            "@type": "ListItem",

            position: 3,

            name: project.title,

            item: pageUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(structuredData),
        }}
      />

      <main
        className="
          overflow-hidden

          bg-[var(--brand-ivory)]

          px-3 mt-10 md:-mt-6

          pb-16
          pt-[96px]

          sm:px-5
          sm:pb-20
          sm:pt-[108px]

          lg:px-8
          lg:pb-24
          lg:pt-[126px]
        "
      >
        <article
          className="
            mx-auto

            max-w-[var(--site-width)]
          "
        >
      

          {/* =================================================
              HERO
          ================================================== */}

          <header
            className="
              grid

              gap-8

              lg:grid-cols-[0.88fr_1.12fr]
              lg:items-center

              xl:gap-14
            "
          >
            {/* ===============================================
                HERO COPY
            ================================================ */}

            <div
              className="
                max-w-[680px]
              "
            >
              {/* EYEBROW */}

              <div
                className="
                  flex
                  items-center

                  gap-3
                "
              >
                <span
                  className="
                    flex
                    h-8

                    items-center

                    gap-1.5

                    rounded-full

                    border
                    border-[var(--brand-navy)]/[0.06]

                    bg-[#EEE5D9]

                    px-3

                    font-brand-sans

                    text-[8px]
                    font-bold
                    uppercase

                    tracking-[0.14em]

                    text-[var(--brand-navy)]

                    shadow-[inset_1px_1px_2px_rgba(101,73,43,0.06),inset_-1px_-1px_2px_rgba(255,255,255,0.75)]
                  "
                >
                  <Hash
                    size={10}
                    aria-hidden
                    className="
                      text-[var(--brand-gold-700)]
                    "
                  />
                  Project {project.projectCode}
                </span>

                <span
                  aria-hidden
                  className="
                    h-px
                    w-9

                    bg-[var(--brand-gold)]
                  "
                />
              </div>

              {/* H1 */}

              <h1
                className="
                  mt-5

                  font-brand-display

                  text-[42px]
                  font-medium
                  leading-[0.98]

                  tracking-[-0.045em]

                  text-[var(--brand-navy)]

                  sm:text-[58px]

                  lg:text-[64px]

                  xl:text-[72px]
                "
              >
                {project.title}
              </h1>

              {/* DESCRIPTION */}

              <p
                className="
                  mt-6

                  max-w-[620px]

                  font-brand-sans

                  text-[12px]
                  font-medium
                  leading-[1.85]

                  text-[var(--brand-text-muted)]

                  sm:text-[13px]

                  lg:text-[14px]
                "
              >
                {project.excerpt}
              </p>

              {/* META */}

              <div
                className="
                  mt-7

                  grid
                  gap-2

                  sm:grid-cols-2
                "
              >
                <MetaItem
                  icon={<Sofa size={13} />}
                  label="Service"
                  value={serviceLabel}
                />

                {project.locationLabel && (
                  <MetaItem
                    icon={<MapPin size={13} />}
                    label="Location"
                    value={project.locationLabel}
                  />
                )}

                <MetaItem
                  icon={<Images size={13} />}
                  label="Project Images"
                  value={`${media.length} ${
                    media.length === 1 ? "image" : "images"
                  }`}
                />

                <MetaItem
                  icon={<FolderOpen size={13} />}
                  label="Project"
                  value={`#${project.projectCode}`}
                />
              </div>

              {/* ACTIONS */}

              <div
                className="
                  mt-7

                  flex
                  flex-wrap

                  gap-2.5
                "
              >
                {project.images.length > 0 && (
                  <ClayButton
                    href="#project-gallery"
                    variant="gold"
                    size="md"
                    showArrow
                  >
                    Explore Images
                  </ClayButton>
                )}

                <ClayButton
                  href={`#${enquiryAnchor}`}
                  variant="outline"
                  size="md"
                  showArrow
                >
                  Request This Service
                </ClayButton>
              </div>
            </div>

            {/* ===============================================
                HERO IMAGE — CLIENT
            ================================================ */}

            <ProjectHeroMedia images={media} projectTitle={project.title} />
          </header>

          {/* =================================================
              PROJECT STORY
          ================================================== */}

          {storySections.length > 0 && (
            <section
              aria-labelledby="project-story-heading"
              className="
                mt-14

                sm:mt-16

                lg:mt-20
              "
            >
              {/* HEADER */}

              <div
                className="
                  grid
                  gap-4

                  border-b
                  border-[var(--brand-navy)]/[0.08]

                  pb-6

                  lg:grid-cols-[220px_1fr]
                  lg:items-end
                "
              >
                <p
                  className="
                    font-brand-sans

                    text-[8px]
                    font-bold
                    uppercase

                    tracking-[0.18em]

                    text-[var(--brand-gold-700)]
                  "
                >
                  Project Story
                </p>

                <h2
                  id="project-story-heading"
                  className="
                    max-w-[760px]

                    font-brand-display

                    text-[31px]
                    font-medium
                    leading-[1.08]

                    tracking-[-0.03em]

                    text-[var(--brand-navy)]

                    sm:text-[40px]

                    lg:text-[46px]
                  "
                >
                  From brief to finished space.
                </h2>
              </div>

              {/* STORY SHELL */}

              <div
                className="
                  mt-6

                  overflow-hidden

                  rounded-[28px]

                  border
                  border-white/75

                  bg-[#FFFDF8]/65

                  px-5

                  shadow-[0_12px_30px_rgba(79,57,34,0.07),inset_1px_1px_1px_rgba(255,255,255,0.85)]

                  sm:px-7

                  lg:rounded-[34px]
                  lg:px-9
                "
              >
                {storySections.map((section, index) => (
                  <StorySection
                    key={section.title}
                    number={section.number}
                    title={section.title}
                    body={section.body}
                    last={index === storySections.length - 1}
                  />
                ))}
              </div>
            </section>
          )}

          {/* =================================================
              GALLERY
          ================================================== */}

          {project.images.length > 0 && (
            <section
              id="project-gallery"
              aria-labelledby="project-gallery-heading"
              className="
                scroll-mt-[110px]

                mt-14

                sm:mt-16

                lg:mt-20
              "
            >
              <div
                className="
                  mb-7

                  flex
                  flex-col

                  gap-4

                  sm:flex-row
                  sm:items-end
                  sm:justify-between
                "
              >
                <div>
                  <p
                    className="
                      font-brand-sans

                      text-[8px]
                      font-bold
                      uppercase

                      tracking-[0.2em]

                      text-[var(--brand-gold-700)]
                    "
                  >
                    Project Gallery
                  </p>

                  <h2
                    id="project-gallery-heading"
                    className="
                      mt-3

                      font-brand-display

                      text-[34px]
                      font-medium
                      leading-none

                      tracking-[-0.035em]

                      text-[var(--brand-navy)]

                      sm:text-[44px]
                    "
                  >
                    Explore the details.
                  </h2>
                </div>

                <p
                  className="
                    max-w-[360px]

                    font-brand-sans

                    text-[10px]
                    font-medium
                    leading-[1.7]

                    text-[var(--brand-text-muted)]

                    sm:text-[11px]
                  "
                >
                  Select any image to open the full-screen project viewer.
                </p>
              </div>

              <ProjectGallery images={media} projectTitle={project.title} />
            </section>
          )}

          {/* =================================================
              RELATED SERVICE
          ================================================== */}

          <section
            className="
              mt-14

              overflow-hidden

              rounded-[28px]

              border
              border-white/10

              bg-[var(--brand-navy)]

              px-5
              py-7

              shadow-[0_14px_32px_rgba(18,37,62,0.14),inset_1px_1px_1px_rgba(255,255,255,0.05)]

              sm:px-7
              sm:py-8

              lg:mt-20
              lg:rounded-[34px]
              lg:px-9
            "
          >
            <div
              className="
                grid
                gap-6

                sm:grid-cols-[1fr_auto]
                sm:items-center
              "
            >
              <div>
                <p
                  className="
                    font-brand-sans

                    text-[8px]
                    font-bold
                    uppercase

                    tracking-[0.18em]

                    text-[var(--brand-gold)]
                  "
                >
                  Related Service
                </p>

                <h2
                  className="
                    mt-2

                    font-brand-display

                    text-[27px]
                    font-medium

                    text-white

                    sm:text-[32px]
                  "
                >
                  {serviceLabel}
                </h2>

                <p
                  className="
                    mt-2

                    max-w-[600px]

                    font-brand-sans

                    text-[10px]
                    font-medium
                    leading-[1.7]

                    text-white/55

                    sm:text-[11px]
                  "
                >
                  Discover the service behind this Sofa N More project.
                </p>
              </div>

              <ClayButton
                href={serviceRoute}
                variant="ivory"
                size="md"
                showArrow
              >
                View Service
              </ClayButton>
            </div>
          </section>

          <ProjectServiceLeadForm service={project.service} />
        </article>
      </main>
    </>
  );
}

/* =========================================================
   META ITEM
========================================================= */

function MetaItem({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div
      className="
        flex
        min-h-[62px]

        items-center

        gap-3

        rounded-[16px]

        border
        border-[var(--brand-navy)]/[0.055]

        bg-[#F0E7DB]

        px-3.5

        shadow-[inset_1px_1px_3px_rgba(91,65,38,0.055),inset_-1px_-1px_2px_rgba(255,255,255,0.72)]
      "
    >
      <span
        className="
          flex
          h-8
          w-8

          shrink-0

          items-center
          justify-center

          rounded-[10px]

          bg-[var(--brand-navy)]

          text-[var(--brand-gold)]
        "
      >
        {icon}
      </span>

      <span className="min-w-0">
        <span
          className="
            block

            font-brand-sans

            text-[6.5px]
            font-bold
            uppercase

            tracking-[0.12em]

            text-[var(--brand-text-muted)]
          "
        >
          {label}
        </span>

        <span
          className="
            mt-0.5
            block

            truncate

            font-brand-sans

            text-[10px]
            font-bold

            text-[var(--brand-navy)]

            sm:text-[11px]
          "
        >
          {value}
        </span>
      </span>
    </div>
  );
}

/* =========================================================
   STORY SECTION
========================================================= */

function StorySection({
  number,
  title,
  body,
  last,
}: {
  number: string;
  title: string;
  body: string;
  last: boolean;
}) {
  return (
    <section
      className={`
        grid
        gap-4

        py-7

        lg:grid-cols-[220px_minmax(0,1fr)]
        lg:gap-10
        lg:py-9

        ${
          !last
            ? `
              border-b
              border-[var(--brand-navy)]/[0.07]
            `
            : ""
        }
      `}
    >
      <div>
        <span
          className="
            flex
            h-8
            w-8

            items-center
            justify-center

            rounded-[10px]

            bg-[#EEE4D7]

            font-brand-sans

            text-[7px]
            font-bold

            text-[var(--brand-gold-700)]

            shadow-[inset_1px_1px_3px_rgba(91,65,38,0.07),inset_-1px_-1px_2px_rgba(255,255,255,0.8)]
          "
        >
          {number}
        </span>

        <h3
          className="
            mt-3

            font-brand-display

            text-[22px]
            font-medium

            text-[var(--brand-navy)]

            lg:text-[24px]
          "
        >
          {title}
        </h3>
      </div>

      <p
        className="
          max-w-[840px]

          whitespace-pre-line

          font-brand-sans

          text-[11px]
          font-medium
          leading-[1.9]

          text-[var(--brand-text-muted)]

          sm:text-[12px]

          lg:text-[13px]
        "
      >
        {body}
      </p>
    </section>
  );
}
