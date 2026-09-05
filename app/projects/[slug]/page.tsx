import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";

import { cache } from "react";

import Image from "next/image";
import Link from "next/link";
import { connection } from "next/server";
import { notFound } from "next/navigation";

import {
  ArrowRight,
  CheckCircle2,
  FileText,
  Hash,
  Images,
  Layers3,
  MapPin,
  Sofa,
  Wrench,
} from "lucide-react";

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

import { defaultOgImage, siteConfig } from "@/lib/site";

import { ProjectGallery, type ProjectMediaItem } from "./ProjectMedia";

/* =========================================================
   TYPES
========================================================= */

type ProjectDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

type StorySection = {
  id: string;
  navLabel: string;
  title: string;
  body: string;
  icon: LucideIcon;
};

/* =========================================================
   CONSTANTS
========================================================= */

const SITE_URL = "https://sofanmore.co.uk";

const BUSINESS_ID = `${SITE_URL}/#business`;
const WEBSITE_ID = `${SITE_URL}/#website`;

/* =========================================================
   PROJECT LOADER
========================================================= */

const loadProject = cache(async (slug: string) => {
  await connection();

  return getPublishedProjectBySlug(slug);
});

/* =========================================================
   HELPERS
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

function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

function getProjectEnquiryAnchor(service: keyof typeof projectServiceLabels) {
  if (service === "COMMERCIAL_SOFA") {
    return "commercial-sofa-enquiry";
  }

  if (service === "INTERIOR_DESIGN") {
    return "interior-design-enquiry";
  }

  if (service === "SOFA_REPAIR_RESTORATION") {
    return "sofa-repair-enquiry";
  }

  return "bespoke-sofa-enquiry";
}

/* =========================================================
   LEAD FORM

   IMPORTANT:
   Existing forms remain unchanged.
========================================================= */

function ProjectServiceLeadForm({
  service,
}: {
  service: keyof typeof projectServiceLabels;
}) {
  if (service === "COMMERCIAL_SOFA") {
    return <CommercialSofaLeadForm />;
  }

  if (service === "INTERIOR_DESIGN") {
    return <InteriorDesignLeadForm />;
  }

  if (service === "SOFA_REPAIR_RESTORATION") {
    return <SofaRepairLeadForm />;
  }

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

  const pageUrl = `${SITE_URL}/projects/${project.slug}`;

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
        defaultOgImage,
      ],
    },

    twitter: {
      card: "summary_large_image",

      title,

      description,

      images: [coverImage, absoluteUrl(defaultOgImage.url)],
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
     MEDIA
  ======================================================= */

  const media: ProjectMediaItem[] = [
    {
      id: `cover-${project.slug}`,
      url: project.coverImageUrl,
      alt: project.title,
      label: "Project cover",
    },

    ...project.images
      .slice()
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((image, index) => ({
        id: image.id,

        url: image.url,

        alt:
          image.alt?.trim() || `${project.title} — project image ${index + 1}`,

        label: `Project image ${index + 1}`,
      })),
  ];

  /* =======================================================
     STORY

     Only sections backed by actual Project data render.
  ======================================================= */

  const rawStorySections = [
    {
      id: "brief",
      navLabel: "The Brief",
      title: "The Brief",
      body: project.brief,
      icon: FileText,
    },

    {
      id: "approach",
      navLabel: "The Approach",
      title: "The Approach",
      body: project.approach,
      icon: Wrench,
    },

    {
      id: "materials",
      navLabel: "Materials",
      title: "Materials & Details",
      body: project.details,
      icon: Layers3,
    },

    {
      id: "result",
      navLabel: "The Result",
      title: "The Result",
      body: project.result,
      icon: CheckCircle2,
    },
  ];

  const storySections = rawStorySections.filter(
    (section): section is StorySection => Boolean(section.body?.trim()),
  );

  const showcaseImages = media.slice(0, 4);

  /* =======================================================
     PAGE NAVIGATION
  ======================================================= */

  const pageNavigation = [
    ...(storySections.length
      ? [
          {
            label: "Overview",
            href: "#overview",
          },
        ]
      : []),

    ...storySections.map((section) => ({
      label: section.navLabel,

      href: `#${section.id}`,
    })),

    ...(project.images.length
      ? [
          {
            label: "Gallery",
            href: "#project-gallery",
          },
        ]
      : []),

    {
      label: "Next Steps",
      href: `#${enquiryAnchor}`,
    },
  ];

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
      {
        "@type": "WebSite",

        "@id": WEBSITE_ID,

        url: `${SITE_URL}/`,

        name: siteConfig.name,
      },

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

      {
        "@type": "CreativeWork",

        "@id": `${pageUrl}#project`,

        url: pageUrl,

        name: project.title,

        headline: project.title,

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
      {/* ===================================================
          SEO SCHEMA
      ==================================================== */}

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

          pb-16
          pt-[82px]

          sm:pb-20
          sm:pt-[96px]

          lg:pb-24 lg:mt-8
          lg:pt-[110px]
        "
      >
        <article>
          {/* =================================================
              CINEMATIC HERO
          ================================================== */}

          <section
            aria-labelledby="project-title"
            className="
              px-3

              sm:px-5

              lg:px-8
            "
          >
            <div
              className="
                relative

                mx-auto

                min-h-[610px]
                max-w-[var(--site-width)]

                overflow-hidden

                rounded-[26px]

                bg-[var(--brand-navy)]

                shadow-[0_18px_45px_rgba(18,37,62,0.15)]

                sm:min-h-[650px]
                sm:rounded-[30px]

                lg:min-h-[690px]
                lg:rounded-[34px]
              "
            >
              {/* =============================================
                  COVER
              ============================================== */}

              <Image
                src={project.coverImageUrl}
                alt={project.title}
                fill
                priority
                draggable={false}
                sizes="100vw"
                className="
                  object-cover
                  object-center
                "
              />

              {/* =============================================
                  CINEMATIC GRADIENT

                  No blur / backdrop-filter.
              ============================================== */}

              <div
                aria-hidden
                className="
                  absolute
                  inset-0

                  bg-[linear-gradient(90deg,rgba(7,15,24,0.82)_0%,rgba(7,15,24,0.56)_38%,rgba(7,15,24,0.16)_68%,rgba(7,15,24,0.28)_100%)]
                "
              />

              <div
                aria-hidden
                className="
                  absolute
                  inset-0

                  bg-[linear-gradient(180deg,rgba(5,12,20,0.18)_0%,transparent_38%,rgba(5,12,20,0.42)_100%)]
                "
              />

              {/* =============================================
                  HERO CONTENT
              ============================================== */}

              <div
                className="
                  relative
                  z-10

                  flex
                  min-h-[610px]

                  flex-col
                  justify-between

                  p-5

                  sm:min-h-[650px]
                  sm:p-7

                  lg:min-h-[690px]
                  lg:p-10
                "
              >
                {/* ===========================================
                    TOP
                ============================================ */}

                <div
                  className="
                    flex

                    items-center
                    justify-between

                    gap-4
                  "
                >
                  <span
                    className="
                      hidden

                      rounded-full

                      border
                      border-white/15

                      bg-[#111820]/75

                      px-3
                      py-2

                      font-brand-sans

                      text-[13px]
                      font-bold
                      uppercase

                      tracking-[0.12em]

                      text-white/80

                      sm:block
                    "
                  >
                    {serviceLabel}
                  </span>
                </div>

                {/* ===========================================
                    BOTTOM GRID
                ============================================ */}

                <div
                  className="
                    grid

                    gap-8

                    lg:grid-cols-[minmax(0,1fr)_330px]
                    lg:items-end

                    xl:gap-14
                  "
                >
                  {/* =========================================
                      MAIN COPY
                  ========================================== */}

                  <div
                    className="
                      max-w-[790px]
                    "
                  >
                    <p
                      className="
                        font-brand-sans

                        text-[11px]
                        font-bold
                        uppercase

                        tracking-[0.2em]

                        text-[var(--brand-gold)]

                        sm:text-[12px]
                      "
                    >
                      Sofa N More Project
                    </p>

                    <h1
                      id="project-title"
                      className="
                        mt-4

                        max-w-[800px]

                        font-brand-display

                        text-[43px]
                        font-medium
                        leading-[0.98]

                        tracking-[-0.045em]

                        text-white

                        sm:text-[58px]

                        lg:text-[68px]

                        xl:text-[76px]
                      "
                    >
                      {project.title}
                    </h1>

                    <p
                      className="
                        mt-5

                        max-w-[590px]

                        font-brand-sans

                        text-[11px]
                        font-medium
                        leading-[1.75]

                        text-white/75

                        sm:text-[12px]

                        lg:text-[13px]
                      "
                    >
                      {project.excerpt}
                    </p>

                    {/* ACTIONS */}

                    <div
                      className="
                        mt-7

                        flex
                        flex-wrap

                        gap-2.5
                      "
                    >
                      <ClayButton
                        href={`#${enquiryAnchor}`}
                        variant="gold"
                        size="md"
                        showArrow
                      >
                        Start a Similar Project
                      </ClayButton>

                      {project.images.length > 0 && (
                        <ClayButton
                          href="#project-gallery"
                          variant="ivory"
                          size="md"
                          showArrow
                        >
                          Explore Gallery
                        </ClayButton>
                      )}
                    </div>
                  </div>

                  {/* =========================================
                      PROJECT SUMMARY
                  ========================================== */}

                  <aside
                    aria-label="Project summary"
                    className="
                      rounded-[22px]

                      border
                      border-white/10

                      bg-[rgba(16,18,19,0.88)]

                      p-4

                      shadow-[0_12px_28px_rgba(0,0,0,0.20)]

                      sm:p-5
                    "
                  >
                    <p
                      className="
                        font-brand-sans

                        text-[13px]
                        font-bold
                        uppercase

                        tracking-[0.17em]

                        text-[var(--brand-gold)]
                      "
                    >
                      Project Summary
                    </p>

                    <div
                      className="
                        mt-3

                        divide-y
                        divide-white/10
                      "
                    >
                      <ProjectSummaryItem
                        icon={Hash}
                        label="Project Code"
                        value={`#${project.projectCode}`}
                      />

                      <ProjectSummaryItem
                        icon={Sofa}
                        label="Service"
                        value={serviceLabel}
                      />

                      {project.locationLabel && (
                        <ProjectSummaryItem
                          icon={MapPin}
                          label="Location"
                          value={project.locationLabel}
                        />
                      )}

                      <ProjectSummaryItem
                        icon={Images}
                        label="Project Images"
                        value={`${media.length} ${
                          media.length === 1 ? "image" : "images"
                        }`}
                      />
                    </div>

                    <div
                      className="
                        mt-4
                      "
                    >
                      <ClayButton
                        href={`#${enquiryAnchor}`}
                        variant="gold"
                        size="md"
                        fullWidth
                        showArrow
                      >
                        Request This Service
                      </ClayButton>
                    </div>
                  </aside>
                </div>
              </div>
            </div>
          </section>

          {/* =================================================
              PROJECT NAV
          ================================================== */}

          {pageNavigation.length > 0 && (
            <nav
              aria-label="Project sections"
              className="
                relative
                z-20

                 mt-2 mb-2

                px-3

                sm:px-5

                lg:px-8
              "
            >
              <div
                className="
                  mx-auto
                  max-w-[calc(var(--site-width)-48px)]

                  overflow-hidden

                  rounded-[22px]

                  border
                  border-[var(--brand-navy)]/[0.07]

                  bg-[#FFFDF8]/95

                  p-1.5

                  shadow-[0_10px_30px_rgba(70,50,30,0.09)]
                "
              >
                <div
                  className="
                    flex

                    gap-1

                    overflow-x-auto

                    [scrollbar-width:none]

                    [&::-webkit-scrollbar]:hidden
                  "
                >
                  {pageNavigation.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="
                        flex
                        h-[44px]

                        shrink-0

                        items-center
                        justify-center

                        rounded-[15px]

                        px-4

                        font-brand-sans

                        text-[11px]
                        font-bold

                        tracking-[0.01em]

                        text-[var(--brand-navy)]/75

                        transition-all
                        duration-300

                        hover:bg-[#F3EBDF]
                        hover:text-[var(--brand-navy)]

                        sm:px-5
                        sm:text-[12px]
                      "
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </nav>
          )}

          {/* =================================================
              STORY OVERVIEW
          ================================================== */}

          {storySections.length > 0 && (
            <section
              id="overview"
              aria-labelledby="overview-heading"
              className="
                scroll-mt-[120px]

                px-3

                sm:px-5

                lg:px-8
              "
            >
              <div
                className="
                  mx-auto
                  max-w-[calc(var(--site-width)-48px)]

                  rounded-b-[28px]

                  border-x
                  border-b
                  border-[var(--brand-navy)]/[0.06]

                  bg-[linear-gradient(180deg,#FFFDF8_0%,#FAF6EF_100%)]

                  p-3
                  pt-7

                  shadow-[0_18px_50px_rgba(70,50,30,0.045)]

                  sm:p-4
                  sm:pt-9

                  lg:p-5
                  lg:pt-10
                "
              >
                <h2 id="overview-heading" className="sr-only">
                  Project Overview
                </h2>

                <div
                  className="
                    grid

                    items-start

                    gap-3

                    md:grid-cols-2

                    xl:grid-cols-4
                  "
                >
                  {storySections.map((section) => (
                    <StoryOverviewCard key={section.id} section={section} />
                  ))}
                </div>
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
                scroll-mt-[120px]

                px-3
                pt-12

                sm:px-5
                sm:pt-14

                lg:px-8
                lg:pt-16
              "
            >
              <div
                className="
                  mx-auto
                  max-w-[calc(var(--site-width)-48px)]
                "
              >
                <div
                  className="
                    mb-8

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

                        text-[13px]
                        font-bold
                        uppercase

                        tracking-[0.18em]

                        text-[var(--brand-gold-700)]
                      "
                    >
                      The Finished Piece
                    </p>

                    <h2
                      id="project-gallery-heading"
                      className="
                        mt-2

                        font-brand-display

                        text-[34px]
                        font-medium
                        leading-none

                        tracking-[-0.035em]

                        text-[var(--brand-navy)]

                        sm:text-[41px]
                      "
                    >
                      Gallery
                    </h2>
                  </div>

                  <p
                    className="
                      max-w-[360px]

                      font-brand-sans

                      text-[12px]
                      font-medium
                      leading-[1.7]

                      text-[var(--brand-text-muted)]

                      sm:text-[13px]
                    "
                  >
                    Open any image to explore the project in full screen.
                  </p>
                </div>

                {/* Existing lightbox/gallery behaviour remains */}

                <ProjectGallery images={media} projectTitle={project.title} />
              </div>
            </section>
          )}

          {/* =================================================
              NEXT STEPS
          ================================================== */}

          <section
            className="
              px-3
              pt-12

              sm:px-5
              sm:pt-14

              lg:px-8
              lg:pt-16
            "
          >
            <div
              className="
                mx-auto

                grid
                max-w-[calc(var(--site-width)-48px)]

                overflow-hidden

                rounded-[30px]

                border
                border-[var(--brand-navy)]/[0.07]

                bg-[linear-gradient(135deg,#FFFDF8_0%,#F7F0E6_100%)]

                shadow-[0_18px_45px_rgba(70,50,30,0.09)]

                lg:grid-cols-[0.88fr_1.12fr]
              "
            >
              {/* ===========================================
                  DARK CTA
              ============================================ */}

              <div
                className="
                  relative

                  overflow-hidden

                  bg-[radial-gradient(circle_at_15%_15%,rgba(191,158,106,0.17),transparent_34%),#151716]

                  px-5
                  py-7

                  sm:px-7
                  sm:py-8

                  lg:px-8
                  lg:py-9
                "
              >
                <div
                  aria-hidden
                  className="
                    absolute

                    -bottom-20
                    -right-12

                    h-48
                    w-48

                    rounded-full

                    border
                    border-white/[0.05]
                  "
                />

                <div
                  className="
                    relative
                    z-10
                  "
                >
                  <p
                    className="
                      font-brand-sans

                      text-[13px]
                      font-bold
                      uppercase

                      tracking-[0.17em]

                      text-[var(--brand-gold)]
                    "
                  >
                    Your Project
                  </p>

                  <h2
                    className="
                      mt-3

                      max-w-[430px]

                      font-brand-display

                      text-[31px]
                      font-medium
                      leading-[1.02]

                      tracking-[-0.035em]

                      text-black

                      sm:text-[37px]
                    "
                  >
                    Let’s create something extraordinary.
                  </h2>

                  <p
                    className="
                      mt-4

                      max-w-[430px]

                      font-brand-sans

                      text-[12px]
                      font-medium
                      leading-[1.75]

                      text-black/60

                      sm:text-[13px]
                    "
                  >
                    Have a similar sofa, interior or restoration project in
                    mind? Tell our team what you’re planning.
                  </p>

                  <div
                    className="
                      mt-6
                    "
                  >
                    <ClayButton
                      href={`#${enquiryAnchor}`}
                      variant="gold"
                      size="md"
                      showArrow
                    >
                      Start Your Project
                    </ClayButton>
                  </div>
                </div>
              </div>

              {/* ===========================================
                  SERVICE
              ============================================ */}

              <div
                className="
                  grid

                  gap-5

                  px-5
                  py-7

                  sm:px-7
                  sm:py-8

                  lg:grid-cols-[1fr_auto]
                  lg:items-center
                  lg:px-8
                "
              >
                <div>
                  <p
                    className="
                      font-brand-sans

                      text-[13px]
                      font-bold
                      uppercase

                      tracking-[0.16em]

                      text-[var(--brand-gold-700)]
                    "
                  >
                    Related Service
                  </p>

                  <h3
                    className="
                      mt-2

                      font-brand-display

                      text-[27px]
                      font-medium

                      tracking-[-0.025em]

                      text-[var(--brand-navy)]
                    "
                  >
                    {serviceLabel}
                  </h3>

                  <p
                    className="
                      mt-3

                      max-w-[480px]

                      font-brand-sans

                      text-[12px]
                      font-medium
                      leading-[1.7]

                      text-[var(--brand-text-muted)]

                      sm:text-[13px]
                    "
                  >
                    Explore the service behind this project or speak with the
                    Sofa N More team about your own requirements.
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
            </div>
          </section>

          {/* =================================================
              EXISTING FORM

              DO NOT MOVE / REMOVE SERVICE FORM LOGIC.
          ================================================== */}

          <div
            className="
              px-3
              pt-10

              sm:px-5
              sm:pt-12

              lg:px-8
              lg:pt-14
            "
          >
            <div
              className="
                mx-auto
                max-w-[var(--site-width)]
              "
            >
              <ProjectServiceLeadForm service={project.service} />
            </div>
          </div>
        </article>
      </main>
    </>
  );
}

/* =========================================================
   PROJECT SUMMARY ITEM
========================================================= */

function ProjectSummaryItem({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div
      className="
        flex
        items-start

        gap-3

        py-3
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

          rounded-[9px]

          border
          border-white/10

          bg-white/[0.05]

          text-[var(--brand-gold)]
        "
      >
        <Icon size={13} strokeWidth={1.5} />
      </span>

      <span
        className="
          min-w-0
        "
      >
        <span
          className="
            block

            font-brand-sans

            text-[13px]
            font-bold
            uppercase

            tracking-[0.11em]

            text-white/45
          "
        >
          {label}
        </span>

        <span
          className="
            mt-1
            block

            font-brand-sans

            text-[12px]
            font-semibold
            leading-[1.4]

            text-white

            sm:text-[13px]
          "
        >
          {value}
        </span>
      </span>
    </div>
  );
}

/* =========================================================
   STORY OVERVIEW CARD
========================================================= */

function StoryOverviewCard({ section }: { section: StorySection }) {
  const Icon = section.icon;

  const normalizedBody = section.body.replace(/\s+/g, " ").trim();

  const isExpandable = normalizedBody.length > 235;

  const content = (
    <>
      {/* ICON + TITLE */}

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
            h-10
            w-10

            shrink-0

            items-center
            justify-center

            rounded-[13px]

            border
            border-[var(--brand-gold)]/20

            bg-[#F2E9DC]

            text-[var(--brand-gold-700)]

            shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]
          "
        >
          <Icon size={15} strokeWidth={1.45} />
        </span>

        <h3
          className="
            min-w-0

            font-brand-display

            text-[22px]
            font-medium
            leading-[1.05]

            tracking-[-0.025em]

            text-[var(--brand-navy)]

            sm:text-[23px]
          "
        >
          {section.title}
        </h3>
      </div>

      {/* SAME TEXT EXPANDS IN PLACE — NO SECOND PARAGRAPH BELOW */}

      <p
        className={`
          mt-5

          whitespace-pre-line

          font-brand-sans

          text-[12px]
          font-medium
          leading-[1.8]

          text-[var(--brand-text-muted)]

          sm:text-[13px]

          ${isExpandable ? "line-clamp-3 group-open/story:line-clamp-none" : ""}
        `}
      >
        {section.body}
      </p>

      {isExpandable && (
        <span
          className="
            pointer-events-auto

            mt-5

            inline-flex
            w-fit

            cursor-pointer

            items-center

            gap-2

            rounded-full

            border
            border-[var(--brand-gold)]/20

            bg-[#F5EEE4]

            px-3.5
            py-2

            font-brand-sans

            text-[11px]
            font-bold
            uppercase

            tracking-[0.08em]

            text-[var(--brand-gold-700)]

            transition-all
            duration-300

            hover:border-[var(--brand-gold)]/35
            hover:bg-[#EEE2D2]
          "
        >
          <span className="group-open/story:hidden">
            Read full {section.navLabel.toLowerCase()}
          </span>

          <span className="hidden group-open/story:inline">Show less</span>

          <ArrowRight
            size={11}
            strokeWidth={1.7}
            className="
              transition-transform
              duration-300

              group-open/story:-rotate-90
            "
          />
        </span>
      )}
    </>
  );

  const cardClassName = `
    min-h-full

    rounded-[22px]

    border
    border-[var(--brand-navy)]/[0.07]

    bg-[linear-gradient(145deg,#FFFDF9_0%,#F9F3EA_100%)]

    px-5
    py-6

    shadow-[0_10px_28px_rgba(70,50,30,0.055)]

    transition-all
    duration-300

    hover:-translate-y-[2px]
    hover:border-[var(--brand-gold)]/20
    hover:shadow-[0_16px_36px_rgba(70,50,30,0.08)]

    sm:px-6
    sm:py-7
  `;

  if (!isExpandable) {
    return (
      <div id={section.id} className={`scroll-mt-[120px] ${cardClassName}`}>
        {content}
      </div>
    );
  }

  return (
    <details
      id={section.id}
      className={`group/story scroll-mt-[120px] ${cardClassName}`}
    >
      <summary
        className="
          pointer-events-none

          list-none

          [&::-webkit-details-marker]:hidden
        "
      >
        {content}
      </summary>
    </details>
  );
}
