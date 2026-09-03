import Image from "next/image";

import { Armchair, Building2, Eye, Home, Sparkles } from "lucide-react";

import ClayButton from "@/components/ui/ClayButton";

/* =========================================================
   DATA
========================================================= */

const galleryItems = [
  {
    id: 1,
    image: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/7.webp",
    eyebrow: "Residential",
    title: "Bespoke Living",
    icon: Home,
  },

  {
    id: 2,
    image: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/bespokesofa.webp",
    eyebrow: "Made to Measure",
    title: "Signature Sofas",
    icon: Armchair,
  },

  {
    id: 3,
    image: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/Interior.webp",
    eyebrow: "Interior",
    title: "Complete Spaces",
    icon: Sparkles,
  },

  {
    id: 4,
    image: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/Office.webp",
    eyebrow: "Commercial",
    title: "Business & Hospitality",
    icon: Building2,
  },
];

/* =========================================================
   ROOT
========================================================= */

export default function SeeWhatWeCreateSection() {
  return (
    <section
      aria-labelledby="see-what-we-create-heading"
      className="
        relative
        overflow-hidden
        bg-[var(--brand-ivory)]

        px-3
        py-10

        sm:px-5
        sm:py-12

        lg:px-7
        lg:py-16
      "
    >
 
      <div
        className="
          relative
          z-10

          mx-auto
          max-w-[var(--site-width)]
        "
      >
        {/* =====================================================
            OUTER SHELL
        ====================================================== */}

        <div
          className="
            clay-surface-strong
            relative

            rounded-[34px]
            p-[7px]

            sm:rounded-[42px]

            lg:rounded-[50px]
            lg:p-[9px]
          "
        >
          <div
            className="
              clay-inset
              relative
              overflow-hidden

              rounded-[28px]

              bg-[linear-gradient(145deg,#FFFDF8_0%,#F5EEE4_50%,#EADCCB_100%)]

              px-4
              py-6

              sm:rounded-[35px]
              sm:px-6
              sm:py-8

              lg:rounded-[41px]
              lg:px-10
              lg:py-10

              xl:px-12
              xl:py-12
            "
          >
            <ArchitecturalBackground />

            {/* =================================================
                HEADER
            ================================================== */}

            <div
              className="
                relative
                z-20

                grid
                gap-6

                lg:grid-cols-[1fr_0.72fr]
                lg:items-end
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
                      h-px
                      w-9

                      bg-[var(--brand-gold)]
                    "
                  />

                  <span
                    className="
                      font-brand-sans
                      text-[8px]
                      font-bold
                      uppercase
                      tracking-[0.25em]

                      text-[var(--brand-gold-700)]

                      sm:text-[9px]
                    "
                  >
                    Selected Work
                  </span>
                </div>

                <h2
                  id="see-what-we-create-heading"
                  className="
                    mt-5
                    max-w-[720px]

                    font-brand-display
                    text-[40px]
                    font-semibold
                    leading-[0.97]
                    tracking-[-0.04em]

                    text-[var(--brand-navy)]

                    min-[390px]:text-[44px]

                    sm:text-[51px]

                    lg:text-[clamp(50px,4.4vw,68px)]
                  "
                >
                  See What
                  <br className="hidden sm:block" />
                  We Create
                  <span className="text-[var(--brand-gold)]">.</span>
                </h2>
              </div>

              <div
                className="
                  max-w-[510px]

                  lg:justify-self-end
                "
              >
                <p
                  className="
                    font-brand-display
                    text-[20px]
                    font-medium
                    italic
                    leading-[1.38]

                    text-[var(--brand-navy)]

                    sm:text-[21px]
                  "
                >
                  The best way to understand bespoke design is to see it.
                </p>

                <p
                  className="
                    mt-4

                    font-brand-sans
                    text-[12px]
                    font-medium
                    leading-[1.75]

                    text-[var(--brand-text-muted)]

                    sm:text-[13px]

                    lg:text-[14px]
                  "
                >
                  Explore our recent work to discover custom sofas, seating,
                  bespoke pieces and interiors created for residential and
                  commercial spaces.
                </p>
              </div>
            </div>

            {/* =================================================
                DESKTOP GALLERY
            ================================================== */}

            <div
              className="
                relative
                z-20

                mt-9

                hidden
                min-h-[720px]

                grid-cols-12
                grid-rows-2
                gap-5

                lg:grid

                xl:gap-6
              "
            >
              {/* =============================================
                  FEATURED IMAGE
              ============================================== */}

              <div
                className="
                  col-span-7
                  row-span-2
                "
              >
                <GalleryCard item={galleryItems[0]} featured priority />
              </div>

              {/* =============================================
                  TOP RIGHT
              ============================================== */}

              <div
                className="
                  col-span-5
                "
              >
                <GalleryCard item={galleryItems[1]} />
              </div>

              {/* =============================================
                  BOTTOM RIGHT SPLIT
              ============================================== */}

              <div
                className="
                  col-span-5

                  grid
                  grid-cols-2
                  gap-5

                  xl:gap-6
                "
              >
                <GalleryCard item={galleryItems[2]} compact />

                <GalleryCard item={galleryItems[3]} compact />
              </div>
            </div>

            {/* =================================================
                MOBILE GALLERY
            ================================================== */}

            <div
              className="
                relative
                z-20

                mt-7

                lg:hidden
              "
            >
              <MobileGallery />
            </div>

            {/* =================================================
                CTA STRIP
            ================================================== */}

            <div
              className="
                relative
                z-20

                mt-6

                lg:mt-8
              "
            >
              <GalleryCTA />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   DESKTOP GALLERY CARD
========================================================= */

function GalleryCard({
  item,
  featured = false,
  compact = false,
  priority = false,
}: {
  item: (typeof galleryItems)[number];
  featured?: boolean;
  compact?: boolean;
  priority?: boolean;
}) {
  const Icon = item.icon;

  return (
    <article
      className="
        clay-surface-strong

        group

        h-full

        rounded-[31px]
        p-[6px]

        transition-transform
        duration-500
        ease-[cubic-bezier(0.22,1,0.36,1)]

        hover:-translate-y-1
      "
    >
      <div
        className="
          clay-inset

          relative
          h-full

          overflow-hidden

          rounded-[25px]
          p-[6px]
        "
      >
        <div
          className="
            relative
            h-full
            min-h-[260px]

            overflow-hidden

            rounded-[20px]
          "
        >
          <Image
            src={item.image}
            alt={`${item.title} by Sofa N More`}
            fill
            preload={priority}
            sizes={
              featured
                ? "(max-width: 1023px) 100vw, 60vw"
                : compact
                  ? "(max-width: 1023px) 100vw, 22vw"
                  : "(max-width: 1023px) 100vw, 40vw"
            }
            className="
              object-cover
              object-center

              transition-transform
              duration-[900ms]
              ease-[cubic-bezier(0.22,1,0.36,1)]

              group-hover:scale-[1.04]
            "
          />

          {/* IMAGE GRADING */}

          <div
            className="
              pointer-events-none

              absolute
              inset-0

              bg-[linear-gradient(180deg,rgba(8,20,34,0.03)_0%,transparent_48%,rgba(8,20,34,0.52)_100%)]
            "
          />

          <div
            className="
              pointer-events-none

              absolute
              inset-0

              bg-[linear-gradient(90deg,rgba(255,253,248,0.08),transparent_24%,transparent_80%,rgba(8,20,34,0.08))]
            "
          />

          {/* INNER EDGE */}

          <div
            className="
              pointer-events-none

              absolute
              inset-[7px]

              rounded-[16px]

              border
              border-white/25
            "
          />

          {/* =================================================
              TOP BADGE
          ================================================== */}

          <div
            className="
              absolute
              left-4
              top-4

              z-10
            "
          >
            <div
              className="
                clay-surface-soft

                rounded-full

                p-[4px]
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-2

                  rounded-full

                  bg-[rgba(255,253,248,0.92)]

                  px-3
                  py-2
                "
              >
                <Icon
                  size={12}
                  strokeWidth={1.5}
                  className="
                    text-[var(--brand-gold-700)]
                  "
                />

                <span
                  className="
                    font-brand-sans
                    text-[6px]
                    font-bold
                    uppercase
                    tracking-[0.15em]

                    text-[var(--brand-navy)]
                  "
                >
                  {item.eyebrow}
                </span>
              </div>
            </div>
          </div>

          {/* =================================================
              BOTTOM LABEL
          ================================================== */}

          <div
            className={`
              absolute

              bottom-0
              left-0
              right-0

              z-10

              ${compact ? "p-4" : featured ? "p-6 xl:p-7" : "p-5"}
            `}
          >
            <span
              className="
                font-brand-sans
                text-[7px]
                font-bold
                uppercase
                tracking-[0.18em]

                text-[var(--brand-gold)]
              "
            >
              Sofa N More · London
            </span>

            <h3
              className={`
                mt-2

                font-brand-display
                font-medium
                leading-[1]

                tracking-[-0.03em]

                text-white

                ${
                  featured
                    ? "text-[36px] xl:text-[42px]"
                    : compact
                      ? "text-[20px]"
                      : "text-[28px]"
                }
              `}
            >
              {item.title}
              <span className="text-[var(--brand-gold)]">.</span>
            </h3>
          </div>
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   MOBILE GALLERY
========================================================= */

function MobileGallery() {
  return (
    <div className="space-y-3">
      {/* =====================================================
          HERO IMAGE
      ====================================================== */}

      <MobileFeaturedGalleryCard item={galleryItems[0]} />

      {/* =====================================================
          SECONDARY GRID
      ====================================================== */}

      <div
        className="
          grid
          grid-cols-2
          gap-3
        "
      >
        <MobileSmallGalleryCard item={galleryItems[1]} />

        <MobileSmallGalleryCard item={galleryItems[2]} />
      </div>

      {/* =====================================================
          WIDE IMAGE
      ====================================================== */}

      <MobileWideGalleryCard item={galleryItems[3]} />
    </div>
  );
}

/* =========================================================
   MOBILE FEATURED
========================================================= */

function MobileFeaturedGalleryCard({
  item,
}: {
  item: (typeof galleryItems)[number];
}) {
  const Icon = item.icon;

  return (
    <article
      className="
        clay-surface-strong

        rounded-[26px]

        p-[5px]
      "
    >
      <div
        className="
          clay-inset

          rounded-[21px]

          p-[5px]
        "
      >
        <div
          className="
            relative

            aspect-[1.05/0.82]

            overflow-hidden

            rounded-[17px]
          "
        >
          <Image
            src={item.image}
            alt={`${item.title} by Sofa N More`}
            fill
            sizes="100vw"
            className="
              object-cover
              object-center
            "
          />

          <div
            className="
              absolute
              inset-0

              bg-[linear-gradient(180deg,transparent_40%,rgba(8,20,34,0.58)_100%)]
            "
          />

          <div
            className="
              absolute
              left-3
              top-3
            "
          >
            <div
              className="
                flex
                items-center
                gap-2

                rounded-full

                bg-[#FFFDF8]/90

                px-3
                py-2

                backdrop-blur-sm
              "
            >
              <Icon
                size={11}
                className="
                  text-[var(--brand-gold-700)]
                "
              />

              <span
                className="
                  font-brand-sans
                  text-[6px]
                  font-bold
                  uppercase
                  tracking-[0.13em]

                  text-[var(--brand-navy)]
                "
              >
                {item.eyebrow}
              </span>
            </div>
          </div>

          <div
            className="
              absolute
              bottom-4
              left-4
              right-4
            "
          >
            <span
              className="
                font-brand-sans
                text-[6px]
                font-bold
                uppercase
                tracking-[0.16em]

                text-[var(--brand-gold)]
              "
            >
              Selected Work
            </span>

            <h3
              className="
                mt-1.5

                font-brand-display
                text-[27px]
                font-medium
                leading-none

                text-white
              "
            >
              {item.title}
              <span className="text-[var(--brand-gold)]">.</span>
            </h3>
          </div>
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   MOBILE SMALL
========================================================= */

function MobileSmallGalleryCard({
  item,
}: {
  item: (typeof galleryItems)[number];
}) {
  const Icon = item.icon;

  return (
    <article
      className="
        clay-surface-soft

        rounded-[21px]

        p-[5px]
      "
    >
      <div
        className="
          clay-inset

          h-full

          rounded-[17px]

          p-[4px]
        "
      >
        <div
          className="
            relative

            aspect-[0.9/1]

            overflow-hidden

            rounded-[14px]
          "
        >
          <Image
            src={item.image}
            alt={`${item.title} by Sofa N More`}
            fill
            sizes="50vw"
            className="
              object-cover
              object-center
            "
          />

          <div
            className="
              absolute
              inset-0

              bg-[linear-gradient(180deg,transparent_42%,rgba(8,20,34,0.62)_100%)]
            "
          />

          <div
            className="
              absolute
              left-3
              top-3
            "
          >
            <div
              className="
                flex
                h-8
                w-8

                items-center
                justify-center

                rounded-full

                bg-[#FFFDF8]/90

                text-[var(--brand-gold-700)]
              "
            >
              <Icon size={13} strokeWidth={1.5} />
            </div>
          </div>

          <div
            className="
              absolute
              bottom-3
              left-3
              right-3
            "
          >
            <span
              className="
                font-brand-sans
                text-[5px]
                font-bold
                uppercase
                tracking-[0.14em]

                text-[var(--brand-gold)]
              "
            >
              {item.eyebrow}
            </span>

            <h3
              className="
                mt-1

                font-brand-display
                text-[17px]
                font-medium
                leading-[1.03]

                text-white
              "
            >
              {item.title}
            </h3>
          </div>
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   MOBILE WIDE
========================================================= */

function MobileWideGalleryCard({
  item,
}: {
  item: (typeof galleryItems)[number];
}) {
  const Icon = item.icon;

  return (
    <article
      className="
        clay-surface-soft

        rounded-[22px]

        p-[5px]
      "
    >
      <div
        className="
          clay-inset

          rounded-[17px]

          p-[4px]
        "
      >
        <div
          className="
            relative

            aspect-[1.5/0.72]

            overflow-hidden

            rounded-[14px]
          "
        >
          <Image
            src={item.image}
            alt={`${item.title} by Sofa N More`}
            fill
            sizes="100vw"
            className="
              object-cover
              object-center
            "
          />

          <div
            className="
              absolute
              inset-0

              bg-[linear-gradient(90deg,rgba(8,20,34,0.58)_0%,rgba(8,20,34,0.20)_55%,transparent_100%)]
            "
          />

          <div
            className="
              absolute

              bottom-4
              left-4
              top-4

              flex
              max-w-[55%]
              flex-col
              justify-end
            "
          >
            <div
              className="
                flex
                h-8
                w-8

                items-center
                justify-center

                rounded-full

                bg-[var(--brand-gold)]

                text-[var(--brand-navy)]
              "
            >
              <Icon size={13} strokeWidth={1.5} />
            </div>

            <span
              className="
                mt-auto

                font-brand-sans
                text-[5px]
                font-bold
                uppercase
                tracking-[0.14em]

                text-[var(--brand-gold)]
              "
            >
              {item.eyebrow}
            </span>

            <h3
              className="
                mt-1

                font-brand-display
                text-[19px]
                font-medium
                leading-[1.02]

                text-white
              "
            >
              {item.title}
            </h3>
          </div>
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
        clay-surface-strong

        rounded-[27px]

        p-[6px]
      "
    >
      <div
        className="
          clay-inset

          relative
          overflow-hidden

          rounded-[21px]

          px-5
          py-5

          sm:px-6
          sm:py-6
        "
      >
        {/* DECORATIVE ARCH */}

        <div
          aria-hidden
          className="
            absolute

            -bottom-[85px]
            right-[7%]

            h-[165px]
            w-[135px]

            rounded-t-[50%]

            border-[12px]
            border-[#E8DCCB]/45
          "
        />

        {/* GOLD DETAIL */}

        <div
          aria-hidden
          className="
            absolute

            right-[20%]
            top-[-48px]

            hidden

            h-[105px]
            w-[105px]

            rounded-full

            border
            border-[var(--brand-gold)]/20

            sm:block
          "
        />

        <div
          className="
            relative
            z-10

            flex
            flex-col

            gap-5

            sm:flex-row
            sm:items-center
            sm:justify-between

            lg:gap-8
          "
        >
          {/* COPY */}

          <div
            className="
              flex
              items-start
              gap-4
            "
          >
            <div
              className="
                flex
                h-12
                w-12

                shrink-0

                items-center
                justify-center

                rounded-full

                bg-[var(--brand-navy)]

                text-[var(--brand-gold)]
              "
            >
              <Eye size={18} strokeWidth={1.5} />
            </div>

            <div>
              <span
                className="
                  font-brand-sans
                  text-[7px]
                  font-bold
                  uppercase
                  tracking-[0.18em]

                  text-[var(--brand-gold-700)]
                "
              >
                Explore Our Work
              </span>

              <p
                className="
                  mt-1.5
                  max-w-[660px]

                  font-brand-display
                  text-[20px]
                  font-semibold
                  leading-[1.22]

                  text-[var(--brand-navy)]

                  sm:text-[22px]

                  lg:text-[24px]
                "
              >
                Discover bespoke sofas, seating and complete interiors created
                for spaces across London.
              </p>
            </div>
          </div>

          {/* CTA */}

          <div
            className="
              shrink-0

              sm:w-auto
            "
          >
            <ClayButton
              href="/gallery"
              variant="gold"
              size="lg"
              showArrow
              className="max-sm:w-full"
              
            >
              View Our Gallery
            </ClayButton>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   ARCHITECTURAL BACKGROUND
========================================================= */

function ArchitecturalBackground() {
  return (
    <>
      {/* ===================================================
          TOP WAVE
      ==================================================== */}

      <svg
        aria-hidden
        viewBox="0 0 1400 320"
        preserveAspectRatio="none"
        className="
          pointer-events-none

          absolute
          left-0
          top-0

          z-0

          hidden

          h-[275px]
          w-full

          lg:block
        "
      >
        <path
          d="
            M0 0
            H1400
            V72

            C1260 38
             1145 42
             1048 103

            C932 175
             805 192
             689 154

            C565 113
             450 80
             328 92

            C205 104
             93 79
             0 42

            Z
          "
          fill="#F2E8DA"
          opacity="0.67"
        />

        <path
          d="
            M0 57

            C109 88
             215 116
             330 103

            C450 90
             565 121
             689 163

            C809 204
             937 184
             1053 112

            C1149 53
             1264 52
             1400 84
          "
          fill="none"
          stroke="#FFFDF8"
          strokeWidth="6"
          opacity="0.56"
        />
      </svg>

      {/* ===================================================
          LEFT FLUTES
      ==================================================== */}

      <div
        aria-hidden
        className="
          pointer-events-none

          absolute

          bottom-0
          left-[3%]

          z-0

          hidden

          h-[150px]

          gap-[8px]

          lg:flex
        "
      >
        {[0, 1, 2, 3].map((item) => (
          <span
            key={item}
            className="
              h-full
              w-[7px]

              rounded-t-full

              bg-[#E6D9C8]

              shadow-[inset_1px_0_1px_rgba(255,255,255,0.7)]
            "
          />
        ))}
      </div>

      {/* ===================================================
          RIGHT ARCH
      ==================================================== */}

      <div
        aria-hidden
        className="
          pointer-events-none

          absolute

          -right-[110px]
          bottom-[4%]

          z-0

          hidden

          h-[350px]
          w-[245px]

          rounded-l-[50%]

          border-[16px]
          border-[#E8DCCB]/33

          lg:block
        "
      />
    </>
  );
}

/* =========================================================
   SECTION BACKGROUND
========================================================= */

function SectionBackground() {
  return (
    <div
      aria-hidden
      className="
        pointer-events-none

        absolute
        inset-0

        overflow-hidden
      "
    >
      <div
        className="
          absolute
          inset-0

          bg-[linear-gradient(180deg,#F5F2EA_0%,#FFFDF8_50%,#EEE2D2_100%)]
        "
      />

      {/* GOLD RING */}

      <div
        className="
          absolute

          -left-[110px]
          top-[180px]

          hidden

          h-[250px]
          w-[250px]

          rounded-full

          border-[3px]
          border-[var(--brand-gold)]/38

          lg:block
        "
      />

      {/* IVORY SPHERE */}

      <div
        className="
          clay-sphere

          absolute

          -right-[43px]
          bottom-[105px]

          hidden

          h-[135px]
          w-[135px]

          lg:block
        "
      >
        <div className="clay-sphere-shadow" />
        <div className="clay-sphere-ball" />
      </div>
    </div>
  );
}
