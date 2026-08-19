import type { Metadata } from "next";
import type { ReactNode } from "react";

import Image from "next/image";
import Link from "next/link";

import {
  ArrowUpRight,
  ChevronRight,
  FolderOpen,
  Hash,
  MapPin,
  Sofa,
} from "lucide-react";

import ClayButton from "@/components/ui/ClayButton";

import { listPublishedProjects } from "@/lib/project-repository";

import {
  projectServiceLabels,
  projectServiceRoutes,
} from "@/lib/project-service";

import { defaultOgImage, siteConfig } from "@/lib/site";

/* =========================================================
   CONSTANTS
========================================================= */

const SITE_URL = "https://sofanmore.co.uk";

const PAGE_PATH = "/projects";

const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

const PAGE_TITLE = "Sofa & Interior Projects in London | Sofa N More";

const PAGE_DESCRIPTION =
  "Explore completed Sofa N More projects across bespoke sofas, commercial seating, interior design and sofa repair and restoration in London.";

/* =========================================================
   METADATA
========================================================= */

export const metadata: Metadata = {
  title: PAGE_TITLE,

  description: PAGE_DESCRIPTION,

  alternates: {
    canonical: PAGE_URL,
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

    url: PAGE_URL,

    title: PAGE_TITLE,

    description: PAGE_DESCRIPTION,

    siteName: siteConfig.name,

    locale: siteConfig.locale,

    images: [defaultOgImage],
  },

  twitter: {
    card: "summary_large_image",

    title: PAGE_TITLE,

    description: PAGE_DESCRIPTION,

    images: [defaultOgImage.url],
  },
};

/* =========================================================
   DATA
========================================================= */

async function getProjects() {
  try {
    return await listPublishedProjects();
  } catch (error) {
    console.warn("Could not load published projects", error);

    return [];
  }
}

/* =========================================================
   ABSOLUTE URL
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
   SAFE JSON LD
========================================================= */

function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

/* =========================================================
   PAGE
========================================================= */

export default async function ProjectsPage() {
  const projects = await getProjects();

  /* =======================================================
     SERVICES REPRESENTED IN PROJECTS
  ======================================================= */

  const representedServices = new Set(
    projects.map((project) => project.service),
  ).size;

  /* =======================================================
     STRUCTURED DATA
  ======================================================= */

  const structuredData = {
    "@context": "https://schema.org",

    "@graph": [
      /* ---------------------------------------------------
         COLLECTION PAGE
      --------------------------------------------------- */

      {
        "@type": "CollectionPage",

        "@id": `${PAGE_URL}#webpage`,

        url: PAGE_URL,

        name: PAGE_TITLE,

        description: PAGE_DESCRIPTION,

        isPartOf: {
          "@id": `${SITE_URL}/#website`,
        },

        breadcrumb: {
          "@id": `${PAGE_URL}#breadcrumb`,
        },

        mainEntity: {
          "@id": `${PAGE_URL}#project-list`,
        },
      },

      /* ---------------------------------------------------
         BREADCRUMB
      --------------------------------------------------- */

      {
        "@type": "BreadcrumbList",

        "@id": `${PAGE_URL}#breadcrumb`,

        itemListElement: [
          {
            "@type": "ListItem",

            position: 1,

            name: "Home",

            item: `${SITE_URL}/`,
          },

          {
            "@type": "ListItem",

            position: 2,

            name: "Projects",

            item: PAGE_URL,
          },
        ],
      },

      /* ---------------------------------------------------
         PROJECT LIST
      --------------------------------------------------- */

      {
        "@type": "ItemList",

        "@id": `${PAGE_URL}#project-list`,

        name: "Sofa N More Projects",

        numberOfItems: projects.length,

        itemListOrder: "https://schema.org/ItemListOrderDescending",

        itemListElement: projects.map((project, index) => {
          const url = `${SITE_URL}/projects/${project.slug}`;

          return {
            "@type": "ListItem",

            position: index + 1,

            url,

            name: project.title,

            item: {
              "@type": "CreativeWork",

              "@id": `${url}#project`,

              url,

              name: project.title,

              description: project.excerpt,

              identifier: String(project.projectCode),

              image: absoluteUrl(project.coverImageUrl),

              about: {
                "@type": "Service",

                name: projectServiceLabels[project.service],

                url: absoluteUrl(projectServiceRoutes[project.service]),
              },
            },
          };
        }),
      },
    ],
  };

  return (
    <>
      {/* ===================================================
          STRUCTURED DATA
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

          px-3 mt-10

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
        <div
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

              lg:grid-cols-[minmax(0,1fr)_320px]
              lg:items-end
              lg:gap-12
            "
          >
            {/* ===============================================
                HERO COPY
            ================================================ */}

            <div
              className="
                max-w-[850px]
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
                  aria-hidden
                  className="
                    h-px
                    w-8

                    bg-[var(--brand-gold)]
                  "
                />

                <p
                  className="
                    font-brand-sans

                    text-[8px]
                    font-bold
                    uppercase

                    tracking-[0.2em]

                    text-[var(--brand-gold-700)]

                    sm:text-[9px]
                  "
                >
                  Selected Projects
                </p>
              </div>

              {/* TITLE */}

              <h1
                className="
                  mt-5

                  max-w-[820px]

                  font-brand-display

                  text-[42px]
                  font-medium
                  leading-[0.98]

                  tracking-[-0.045em]

                  text-[var(--brand-navy)]

                  sm:text-[58px]

                  lg:text-[68px]

                  xl:text-[76px]
                "
              >
                Real spaces,
                <br className="hidden sm:block" />
                made personal.
              </h1>

              {/* DESCRIPTION */}

              <p
                className="
                  mt-6

                  max-w-[660px]

                  font-brand-sans

                  text-[12px]
                  font-medium
                  leading-[1.85]

                  text-[var(--brand-text-muted)]

                  sm:text-[13px]

                  lg:text-[14px]
                "
              >
                Explore completed Sofa N More work across bespoke sofas,
                commercial seating, interior design and sofa repair and
                restoration.
              </p>
            </div>

            {/* ===============================================
                SUMMARY PANEL
            ================================================ */}

            {projects.length > 0 && (
              <div
                className="
                  rounded-[24px]

                  border
                  border-white/80

                  bg-[#EEE5D9]

                  p-[5px]

                  shadow-[0_10px_24px_rgba(78,56,33,0.08),inset_1px_1px_2px_rgba(255,255,255,0.85)]

                  lg:rounded-[28px]
                "
              >
                <div
                  className="
                    grid
                    grid-cols-2

                    divide-x
                    divide-[var(--brand-navy)]/[0.07]

                    overflow-hidden

                    rounded-[19px]

                    border
                    border-[var(--brand-navy)]/[0.045]

                    bg-[#F5EEE5]
                  "
                >
                  <HeroMetric
                    value={String(projects.length).padStart(2, "0")}
                    label="Projects"
                  />

                  <HeroMetric
                    value={String(representedServices).padStart(2, "0")}
                    label="Services"
                  />
                </div>
              </div>
            )}
          </header>

          {/* =================================================
              PROJECT SECTION
          ================================================== */}

          <section
            aria-labelledby="project-list-heading"
            className="
              mt-12

              sm:mt-14

              lg:mt-18
            "
          >
         

            {/* ===============================================
                PROJECT GRID
            ================================================ */}

            {projects.length > 0 ? (
              <div
                className="
                  mt-6

                  grid
                  items-stretch

                  gap-4

                  sm:grid-cols-2
                  sm:gap-5

                  xl:grid-cols-3

                  2xl:gap-6
                "
              >
                {projects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <EmptyProjects />
            )}
          </section>

          {/* =================================================
              BOTTOM CTA
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

                lg:grid-cols-[1fr_auto]
                lg:items-center
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
                  Your Project
                </p>

                <h2
                  className="
                    mt-2

                    max-w-[650px]

                    font-brand-display

                    text-[28px]
                    font-medium
                    leading-[1.05]

                    tracking-[-0.025em]

                    text-white

                    sm:text-[34px]
                  "
                >
                  Have a space or sofa in mind?
                </h2>

                <p
                  className="
                    mt-3

                    max-w-[620px]

                    font-brand-sans

                    text-[10px]
                    font-medium
                    leading-[1.75]

                    text-white/55

                    sm:text-[11px]
                  "
                >
                  Tell us what you’re planning and we’ll help you explore the
                  right approach.
                </p>
              </div>

              <div
                className="
                  flex
                  flex-wrap

                  gap-2.5
                "
              >
                <ClayButton
                  href="/contact-us"
                  variant="ivory"
                  size="md"
                  showArrow
                >
                  Start Your Project
                </ClayButton>

                <ClayButton
                  href="/services"
                  variant="outline"
                  size="md"
                  showArrow
                  className="
                    border-white/15
                    text-white
                  "
                >
                  Explore Services
                </ClayButton>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

/* =========================================================
   HERO METRIC
========================================================= */

function HeroMetric({ value, label }: { value: string; label: string }) {
  return (
    <div
      className="
        px-4
        py-4

        sm:px-5
      "
    >
      <span
        className="
          block

          font-brand-display

          text-[25px]
          font-semibold
          leading-none

          text-[var(--brand-navy)]

          sm:text-[29px]
        "
      >
        {value}
      </span>

      <span
        className="
          mt-1.5
          block

          font-brand-sans

          text-[7px]
          font-bold
          uppercase

          tracking-[0.14em]

          text-[var(--brand-text-muted)]
        "
      >
        {label}
      </span>
    </div>
  );
}

/* =========================================================
   PROJECT CARD
========================================================= */

function ProjectCard({
  project,
  index,
}: {
  project: Awaited<ReturnType<typeof listPublishedProjects>>[number];

  index: number;
}) {
  const serviceLabel = projectServiceLabels[project.service];

  return (
    <article
      className="
        h-full
        min-w-0
      "
    >
      <Link
        href={`/projects/${project.slug}`}
        aria-label={`View project: ${project.title}`}
        className="
          group

          flex
          h-full
          min-h-full

          flex-col

          rounded-[24px]

          border
          border-white/80

          bg-[#EEE5D8]

          p-[5px]

          shadow-[0_8px_20px_rgba(76,54,31,0.075),inset_1px_1px_2px_rgba(255,255,255,0.88),inset_-1px_-1px_2px_rgba(84,59,33,0.045)]

          transition-[transform,box-shadow]
          duration-300

          hover:-translate-y-[2px]

          hover:shadow-[0_12px_26px_rgba(76,54,31,0.10),inset_1px_1px_2px_rgba(255,255,255,0.9)]

          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-[var(--brand-gold)]
          focus-visible:ring-offset-2
          focus-visible:ring-offset-[var(--brand-ivory)]

          sm:rounded-[27px]
        "
      >
        {/* =================================================
            IMAGE
        ================================================== */}

        <span
          className="
            relative

            block

            aspect-[4/3]
            w-full

            shrink-0

            overflow-hidden

            rounded-[19px]

            bg-[#DDD2C4]

            sm:rounded-[22px]
          "
        >
          <Image
            src={project.coverImageUrl}
            alt={project.title}
            fill
            sizes="(max-width: 639px) 94vw, (max-width: 1279px) 47vw, 31vw"
            className="
              object-cover
              object-center

              transition-transform
              duration-500
              ease-out

              lg:group-hover:scale-[1.018]
            "
          />

          {/* ===============================================
              LIGHT IMAGE GRADIENT
          ================================================ */}

          <span
            aria-hidden
            className="
              absolute
              inset-0

              bg-gradient-to-t

              from-[#081725]/50

              via-transparent

              to-transparent

              opacity-75

              transition-opacity
              duration-300

              group-hover:opacity-90
            "
          />

          {/* ===============================================
              CODE
          ================================================ */}

          <span
            className="
              absolute

              left-3
              top-3

              inline-flex
              items-center

              gap-1

              rounded-full

              border
              border-white/75

              bg-[#F3EADF]/95

              px-2.5
              py-1.5

              font-brand-sans

              text-[7px]
              font-bold
              uppercase

              tracking-[0.1em]

              text-[var(--brand-navy)]

              shadow-[0_3px_8px_rgba(0,0,0,0.09),inset_1px_1px_1px_rgba(255,255,255,0.85)]
            "
          >
            <Hash
              size={8}
              strokeWidth={1.8}
              className="
                text-[var(--brand-gold-700)]
              "
            />

            {project.projectCode}
          </span>

          {/* ===============================================
              VIEW ICON
          ================================================ */}

          <span
            className="
              absolute

              bottom-3
              right-3

              flex
              h-9
              w-9

              items-center
              justify-center

              rounded-[12px]

              border
              border-white/70

              bg-[#F3EADF]

              text-[var(--brand-navy)]

              shadow-[0_4px_10px_rgba(0,0,0,0.12),inset_1px_1px_1px_rgba(255,255,255,0.85)]

              transition-[transform,background-color]
              duration-200

              group-hover:-translate-y-[1px]
              group-hover:bg-[#FFF8EE]
            "
          >
            <ArrowUpRight size={14} strokeWidth={1.6} />
          </span>
        </span>

        {/* =================================================
            CONTENT

            flex-1 is important:
            all cards stay equal height.
        ================================================== */}

        <span
          className="
            flex
            flex-1
            flex-col

            px-3.5
            pb-3.5
            pt-4

            sm:px-4
            sm:pb-4
          "
        >
          {/* SERVICE */}

          <span
            className="
              flex
              min-h-[18px]

              items-center

              gap-1.5

              font-brand-sans

              text-[7px]
              font-bold
              uppercase

              tracking-[0.14em]

              text-[var(--brand-gold-700)]
            "
          >
            <Sofa size={10} strokeWidth={1.6} />

            {serviceLabel}
          </span>

          {/* TITLE */}

          <span
            className="
              mt-2

              line-clamp-2

              min-h-[52px]

              font-brand-display

              text-[23px]
              font-medium
              leading-[1.08]

              tracking-[-0.025em]

              text-[var(--brand-navy)]

              sm:text-[24px]
            "
          >
            {project.title}
          </span>

          {/* DESCRIPTION */}

          <span
            className="
              mt-3

              line-clamp-3

              min-h-[54px]

              font-brand-sans

              text-[10px]
              font-medium
              leading-[1.7]

              text-[var(--brand-text-muted)]

              sm:text-[11px]
            "
          >
            {project.excerpt}
          </span>

          {/* ===============================================
              CARD FOOTER

              mt-auto pins footer to same location
              in every card.
          ================================================ */}

          <span
            className="
              mt-auto

              flex
              min-h-[38px]

              items-end
              justify-between

              gap-3

              border-t
              border-[var(--brand-navy)]/[0.065]

              pt-3.5
            "
          >
            {/* LOCATION */}

            <span
              className="
                flex
                min-w-0

                items-center

                gap-1.5

                font-brand-sans

                text-[8px]
                font-semibold

                text-[var(--brand-text-muted)]
              "
            >
              {project.locationLabel ? (
                <>
                  <MapPin
                    size={10}
                    strokeWidth={1.6}
                    className="
                      shrink-0

                      text-[var(--brand-gold-700)]
                    "
                  />

                  <span
                    className="
                      truncate
                    "
                  >
                    {project.locationLabel}
                  </span>
                </>
              ) : (
                <span
                  className="
                    opacity-60
                  "
                >
                  Sofa N More
                </span>
              )}
            </span>

            {/* VIEW PROJECT */}

            <span
              className="
                flex
                shrink-0

                items-center

                gap-1

                font-brand-sans

                text-[7px]
                font-bold
                uppercase

                tracking-[0.1em]

                text-[var(--brand-navy)]
              "
            >
              View Project
              <ArrowUpRight
                size={10}
                strokeWidth={1.7}
                className="
                  text-[var(--brand-gold-700)]
                "
              />
            </span>
          </span>
        </span>
      </Link>
    </article>
  );
}

/* =========================================================
   EMPTY STATE
========================================================= */

function EmptyProjects() {
  return (
    <div
      className="
        mt-6

        rounded-[26px]

        border
        border-white/80

        bg-[#EEE5D9]

        p-[5px]

        shadow-[0_8px_20px_rgba(76,54,31,0.065),inset_1px_1px_2px_rgba(255,255,255,0.86)]
      "
    >
      <div
        className="
          flex
          min-h-[190px]

          flex-col

          items-center
          justify-center

          rounded-[21px]

          border
          border-[var(--brand-navy)]/[0.045]

          bg-[#F5EEE5]

          px-6
          py-8

          text-center
        "
      >
        <span
          className="
            flex
            h-10
            w-10

            items-center
            justify-center

            rounded-[13px]

            bg-[var(--brand-navy)]

            text-[var(--brand-gold)]
          "
        >
          <FolderOpen size={17} strokeWidth={1.5} />
        </span>

        <h2
          className="
            mt-4

            font-brand-display

            text-[22px]
            font-medium

            text-[var(--brand-navy)]
          "
        >
          Projects are being prepared.
        </h2>

        <p
          className="
            mt-2

            max-w-[480px]

            font-brand-sans

            text-[10px]
            font-medium
            leading-[1.7]

            text-[var(--brand-text-muted)]

            sm:text-[11px]
          "
        >
          Published projects will appear here as they are added through the Sofa
          N More admin dashboard.
        </p>
      </div>
    </div>
  );
}
