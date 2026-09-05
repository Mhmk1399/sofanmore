import Image from "next/image";

import { Building2, Eye, Home, Hotel, Sofa } from "lucide-react";

import type { LucideIcon } from "lucide-react";

import ClayButton from "@/components/ui/ClayButton";

/* =========================================================
   TYPES
========================================================= */

type GalleryItem = {
  id: number;
  image: string;
  eyebrow: string;
  title: string;
  icon: LucideIcon;
};

/* =========================================================
   DATA

   Replace these image paths with real completed
   Sofa N More interior projects whenever available.
========================================================= */

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    image: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/Interior.webp",
    eyebrow: "Residential",
    title: "London Interior",
    icon: Home,
  },
  {
    id: 2,
    image: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/Staging.webp",
    eyebrow: "Hospitality",
    title: "Guest-Focused Interior",
    icon: Hotel,
  },
  {
    id: 3,
    image: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/Office.webp",
    eyebrow: "Workspace",
    title: "Commercial Interior",
    icon: Building2,
  },
  {
    id: 4,
    image: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/bespokesofa.webp",
    eyebrow: "Bespoke",
    title: "Sofa-Led Interior",
    icon: Sofa,
  },
];

/* =========================================================
   ROOT
========================================================= */

export default function InteriorDesignProjectsGallerySection() {
  return (
    <section
      aria-labelledby="interior-design-work-heading"
      className="
        relative
        overflow-hidden

        bg-[var(--brand-ivory)]

        px-3
        py-9

        sm:px-5
        sm:py-11

        lg:px-7
        lg:py-14
      "
    >
      <GalleryBackground />

      <div
        className="
          relative
          z-10

          mx-auto
          max-w-[var(--site-width)]
        "
      >
        {/* =====================================================
            HEADER
        ====================================================== */}

        <div
          className="
            mb-7

            grid
            gap-5

            lg:mb-9
            lg:grid-cols-[0.9fr_0.75fr]
            lg:items-end
            lg:justify-between
            lg:gap-12
          "
        >
          <div>
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
                  h-9
                  w-9

                  items-center
                  justify-center

                  rounded-full

                  bg-[var(--brand-navy)]

                  text-[var(--brand-gold)]
                "
              >
                <Eye size={15} strokeWidth={1.5} />
              </span>

              <span
                className="
                  font-brand-sans

                  text-[11px]
                  font-bold
                  uppercase

                  tracking-[0.22em]

                  text-[var(--brand-gold-700)]

                  sm:text-[12px]
                "
              >
                Selected Interior Work
              </span>
            </div>

            <h2
              id="interior-design-work-heading"
              className="
                mt-4

                max-w-[700px]

                font-brand-display

                text-[37px]
                font-semibold
                leading-[0.98]

                tracking-[-0.04em]

                text-[var(--brand-navy)]

                min-[390px]:text-[41px]

                sm:text-[48px]

                lg:text-[clamp(46px,3.8vw,60px)]
              "
            >
              See Our Interior Design Work
              <span className="text-[var(--brand-gold)]">.</span>
            </h2>
          </div>

          <div
            className="
              max-w-[520px]

              lg:justify-self-end
            "
          >
            <p
              className="
                font-brand-display

                text-[18px]
                font-medium
                italic
                leading-[1.4]

                text-[var(--brand-navy)]

                sm:text-[20px]
              "
            >
              Interior design is best understood visually.
            </p>

            <p
              className="
                mt-3

                font-brand-sans

                text-[11px]
                font-medium
                leading-[1.7]

                text-[var(--brand-text-muted)]

                sm:text-[12px]

                lg:text-[13px]
              "
            >
              Explore how layout, bespoke sofas, materials, colour and styling
              come together across completed spaces.
            </p>
          </div>
        </div>

        {/* =====================================================
            DESKTOP GALLERY
        ====================================================== */}

        <div
          className="
            hidden

            min-h-[660px]

            grid-cols-12
            grid-rows-2

            gap-3

            lg:grid
          "
        >
          {/* FEATURED */}

          <GalleryCard
            item={galleryItems[0]}
            priority
            className="
              col-span-7
              row-span-2
            "
          />

          {/* TOP RIGHT */}

          <GalleryCard
            item={galleryItems[1]}
            className="
              col-span-5
            "
          />

          {/* BOTTOM RIGHT LEFT */}

          <GalleryCard
            item={galleryItems[2]}
            className="
              col-span-2
            "
            compact
          />

          {/* BOTTOM RIGHT LARGE */}

          <GalleryCard
            item={galleryItems[3]}
            className="
              col-span-3
            "
            compact
          />
        </div>

        {/* =====================================================
            MOBILE / TABLET GALLERY
        ====================================================== */}

        <div
          className="
            grid
            gap-3

            lg:hidden
          "
        >
          {/* FEATURED */}

          <GalleryCard
            item={galleryItems[0]}
            priority
            className="
              aspect-[4/3]

              sm:aspect-[16/10]
            "
          />

          {/* TWO SMALL */}

          <div
            className="
              grid
              grid-cols-2
              gap-3
            "
          >
            <GalleryCard
              item={galleryItems[1]}
              compact
              className="
                aspect-[3/4]

                sm:aspect-[4/3]
              "
            />

            <GalleryCard
              item={galleryItems[2]}
              compact
              className="
                aspect-[3/4]

                sm:aspect-[4/3]
              "
            />
          </div>

          {/* WIDE */}

          <GalleryCard
            item={galleryItems[3]}
            className="
              aspect-[16/9]

              sm:aspect-[2/1]
            "
          />
        </div>

        {/* =====================================================
            CTA
        ====================================================== */}

        <GalleryCTA />
      </div>
    </section>
  );
}

/* =========================================================
   GALLERY CARD

   IMPORTANT:
   Static article only.
   No Link.
   No button.
   No modal.
   No click behaviour.
========================================================= */

function GalleryCard({
  item,
  priority = false,
  compact = false,
  className = "",
}: {
  item: GalleryItem;
  priority?: boolean;
  compact?: boolean;
  className?: string;
}) {
  const Icon = item.icon;

  return (
    <article
      className={`
        clay-surface-strong

        relative
        min-h-0
        overflow-hidden

        rounded-[23px]

        p-[5px]

        sm:rounded-[27px]
        sm:p-[6px]

        ${className}
      `}
    >
      <div
        className="
          relative

          h-full
          min-h-[220px]
          w-full

          overflow-hidden

          rounded-[18px]

          bg-[#D8D0C5]

          sm:rounded-[21px]
        "
      >
        {/* IMAGE */}

        <Image
          src={item.image}
          alt={`${item.title} by Sofa N More`}
          fill
          preload={priority}
          sizes={
            priority
              ? "(max-width: 1023px) 100vw, 58vw"
              : "(max-width: 767px) 50vw, (max-width: 1023px) 50vw, 32vw"
          }
          className="
            object-cover
            object-center
          "
        />

        {/* ===============================================
            SOFT OVERLAYS
        ================================================ */}

        <div
          aria-hidden
          className="
            absolute
            inset-0

            bg-[linear-gradient(to_bottom,rgba(11,25,41,0.03)_30%,rgba(11,25,41,0.68)_100%)]
          "
        />

        <div
          aria-hidden
          className="
            absolute
            inset-x-0
            top-0

            h-[35%]

            bg-[linear-gradient(to_bottom,rgba(11,25,41,0.22),transparent)]
          "
        />

        {/* ===============================================
            TOP LABEL
        ================================================ */}

        <div
          className="
            absolute
            left-3
            top-3

            flex
            items-center
            gap-2

            sm:left-4
            sm:top-4
          "
        >
          <span
            className="
              flex
              h-8
              w-8

              items-center
              justify-center

              rounded-full

              border
              border-white/15

              bg-[rgba(11,25,41,0.68)]

              text-[var(--brand-gold)]

              backdrop-blur-md
            "
          >
            <Icon size={12} strokeWidth={1.5} />
          </span>

          {!compact && (
            <span
              className="
                rounded-full

                border
                border-white/15

                bg-[rgba(11,25,41,0.65)]

                px-3
                py-2

                font-brand-sans

                text-[13px]
                font-bold
                uppercase

                tracking-[0.16em]

                text-white/82

                backdrop-blur-md

                sm:text-[13px]
              "
            >
              {item.eyebrow}
            </span>
          )}
        </div>

        {/* ===============================================
            BOTTOM LABEL
        ================================================ */}

        <div
          className="
            absolute

            bottom-0
            left-0
            right-0

            p-4

            sm:p-5
          "
        >
          {compact && (
            <span
              className="
                font-brand-sans

                text-[5px]
                font-bold
                uppercase

                tracking-[0.16em]

                text-[var(--brand-gold)]

                sm:text-[13px]
              "
            >
              {item.eyebrow}
            </span>
          )}

          <h3
            className={`
              font-brand-display

              font-semibold
              leading-[1.08]

              tracking-[-0.025em]

              text-white

              ${
                compact
                  ? "mt-1 text-[17px] sm:text-[19px]"
                  : "text-[22px] sm:text-[26px] lg:text-[29px]"
              }
            `}
          >
            {item.title}
          </h3>
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   CTA
========================================================= */

function GalleryCTA() {
  return (
    <div
      className="
        clay-surface-soft

        mt-5

        rounded-[21px]

        px-4
        py-4

        sm:mt-6
        sm:px-5
        sm:py-5
      "
    >
      <div
        className="
          flex
          flex-col

          gap-4

          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <div>
          <span
            className="
              font-brand-sans

              text-[13px]
              font-bold
              uppercase

              tracking-[0.18em]

              text-[var(--brand-gold-700)]
            "
          >
            More Completed Spaces
          </span>

          <p
            className="
              mt-1

              max-w-[560px]

              font-brand-display

              text-[18px]
              font-semibold
              leading-[1.3]

              text-[var(--brand-navy)]

              sm:text-[20px]
            "
          >
            Explore more Sofa N More projects and completed interiors.
          </p>
        </div>

        <ClayButton
          href="/gallery"
          variant="gold"
          size="lg"
          showArrow
          className="max-sm:w-full"
          ariaLabel="View Sofa N More interior design projects"
        >
          View Our Projects
        </ClayButton>
      </div>
    </div>
  );
}

/* =========================================================
   BACKGROUND
========================================================= */

function GalleryBackground() {
  return (
    <div
      aria-hidden
      className="
        pointer-events-none

        absolute
        inset-0
      "
    >
      <div
        className="
          absolute

          -right-[100px]
          top-[6%]

          hidden

          h-[280px]
          w-[280px]

          rounded-full

          border
          border-[var(--brand-gold)]/10

          lg:block
        "
      />

      <div
        className="
          absolute

          -left-[160px]
          bottom-[8%]

          hidden

          h-[300px]
          w-[300px]

          rounded-full

          bg-white/20

          blur-3xl

          lg:block
        "
      />
    </div>
  );
}
