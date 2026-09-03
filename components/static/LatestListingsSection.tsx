"use client";

import Image from "next/image";
import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { useEffect, useRef, useState } from "react";

/* =========================================================
   TYPES
========================================================= */

type Listing = {
  id: number;
  badge: string;
  date: string;
  title: string;
  description: string;
  image: string;
  href: string;
  featured?: boolean;
};

/* =========================================================
   DATA
========================================================= */

const listings: Listing[] = [
  {
    id: 1,
    badge: "Bespoke",
    date: "08 AUG 2026",
    title: "Bespoke sofa Opportunity",
    description: "Discover our latest handcrafted sofa opportunity in London.",
    image: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/1.webp",
    href: "/blog/bespoke-sofas-opportunity",
  },

  {
    id: 2,
    badge: "Featured",
    date: "10 AUG 2026",
    title: "New London Interior Project",
    description:
      "A new bespoke interior project combining craftsmanship, comfort and refined materials.",
    image: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/7.webp",
    href: "/blog/london-interior-project",
    featured: true,
  },

  {
    id: 3,
    badge: "Workshop",
    date: "11 AUG 2026",
    title: "Latest Sofa N More Update",
    description:
      "Explore the latest from our London workshop and bespoke design studio.",
    image: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/5.webp",
    href: "/blog/workshop-update",
  },
];

/* =========================================================
   ROOT
========================================================= */

export default function LatestListingsSection() {
  return (
    <section
      id="latest"
      className="
        relative
        overflow-hidden
        bg-[var(--brand-ivory)]
        px-3
        py-12

        sm:px-5
        sm:py-14

        lg:px-8
        lg:py-16
      "
    >
      <SectionBackground />

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-[var(--site-width)]
        "
      >
        {/* =============================================
            MAIN OUTER SHELL
        ============================================== */}

        <div
          className="
            clay-surface-strong
            rounded-[32px]
            p-[7px]

            sm:rounded-[38px]

            lg:rounded-[46px]
            lg:p-[9px]
          "
        >
          <div
            className="
              clay-inset
              relative
              overflow-hidden
              rounded-[26px]

              sm:rounded-[32px]

              lg:rounded-[38px]
            "
          >
            {/* =========================================
                DESKTOP
            ========================================== */}

            <div className="hidden lg:block">
              <DesktopLayout />
            </div>

            {/* =========================================
                MOBILE
            ========================================== */}

            <div className="lg:hidden">
              <MobileLayout />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   DESKTOP
========================================================= */

function DesktopLayout() {
  return (
    <div
      className="
        relative
        min-h-[660px]
        px-10
        pb-11
        pt-10

        xl:min-h-[690px]
        xl:px-14
        xl:pt-12
      "
    >
      {/* =============================================
          ARCH BACKGROUND
      ============================================== */}

      {/* =============================================
          HEADER
      ============================================== */}

      <div
        className="
          relative
          z-20
          flex
          items-start
          justify-between
        "
      >
        <SectionHeading />

        <Link
          href="/blog"
          className="
            group
            mt-6
            inline-flex
            items-center
            gap-3
            font-brand-sans
            text-[10px]
            font-bold
            uppercase
            tracking-[0.18em]
            text-[var(--brand-navy)]
          "
        >
          <span>View All</span>

          <ArrowRight
            size={15}
            strokeWidth={1.6}
            className="
              text-[var(--brand-gold-700)]
              transition-transform
              duration-300
              ease-[cubic-bezier(0.22,1,0.36,1)]
              group-hover:translate-x-1
            "
          />
        </Link>
      </div>

      {/* =============================================
          CARDS
      ============================================== */}

      <div
        className="
          relative
          z-30
          mt-14
          grid
          grid-cols-[1fr_1.12fr_1fr]
          items-end
          gap-5

          xl:gap-7
        "
      >
        {listings.map((listing) => (
          <DesktopCard key={listing.id} listing={listing} />
        ))}
      </div>

      {/* =============================================
          FLOOR
      ============================================== */}

      <div
        aria-hidden
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          z-10
          h-[92px]
        "
      >
        <div
          className="
            absolute
            inset-x-0
            bottom-[58px]
            h-px
            bg-[var(--brand-gold)]/10
          "
        />

        <div
          className="
            absolute
            inset-x-0
            bottom-[36px]
            h-px
            bg-black/[0.035]
          "
        />

        <div
          className="
            absolute
            inset-x-0
            bottom-[14px]
            h-px
            bg-black/[0.025]
          "
        />
      </div>
    </div>
  );
}

/* =========================================================
   SECTION HEADING
========================================================= */

function SectionHeading() {
  return (
    <div className="max-w-[480px]">
      <div
        className="
          flex
          items-center
          gap-3
        "
      >
        <span
          className="
            font-brand-sans
            text-[9px]
            font-bold
            uppercase
            tracking-[0.25em]
            text-[var(--brand-gold-700)]

            xl:text-[10px]
          "
        >
          Latest
        </span>

        <span
          className="
            h-px
            w-12
            bg-[var(--brand-gold)]
          "
        />
      </div>

      <h2
        className="
          mt-4
          font-brand-display
          text-[46px]
          font-semibold
          leading-[0.98]
          tracking-[-0.04em]
          text-[var(--brand-navy)]

          xl:text-[54px]
        "
      >
        Discover What&apos;s New
        <span
          className="
            text-[var(--brand-gold)]
          "
        >
          .
        </span>
      </h2>

      <p
        className="
          mt-4
          max-w-[390px]
          font-brand-sans
          text-[12px]
          font-medium
          leading-[1.7]
          text-[var(--brand-text-muted)]

          xl:text-[13px]
        "
      >
        Explore our latest opportunities, updates and featured listings from
        Sofa N More.
      </p>
    </div>
  );
}

/* =========================================================
   DESKTOP CARD
========================================================= */

function DesktopCard({ listing }: { listing: Listing }) {
  const featured = !!listing.featured;

  return (
    <article
      className={`
        group
        relative
        transition-all
        duration-700
        ease-[cubic-bezier(0.22,1,0.36,1)]

        ${
          featured
            ? `
              z-20
              -translate-y-4
              hover:-translate-y-6
            `
            : `
              z-10
              hover:-translate-y-2
            `
        }
      `}
    >
      {/* gold featured glow */}

      {featured && (
        <div
          aria-hidden
          className="
            absolute
            -inset-[2px]
            rounded-[31px]
            border
            border-[var(--brand-gold)]/60
            opacity-70
          "
        />
      )}

      <div
        className={`
          clay-surface-strong
          relative
          rounded-[29px]
          p-[7px]

          ${featured ? "shadow-[0_20px_34px_rgba(48,40,29,0.14)]" : ""}
        `}
      >
        <div
          className="
            clay-inset
            relative
            overflow-hidden
            rounded-[23px]
            px-4
            pb-5
            pt-4
          "
        >
          {/* IMAGE */}

          <div
            className={`
              clay-surface-strong
              rounded-[23px]
              p-[6px]

              ${featured ? "" : ""}
            `}
          >
            <div
              className={`
                clay-inset
                relative
                overflow-hidden
                rounded-[18px]

                ${featured ? "aspect-[1.15/1]" : "aspect-[1.08/1]"}
              `}
            >
              <Image
                src={listing.image}
                alt={listing.title}
                fill
                sizes="(max-width: 1279px) 32vw, 390px"
                className="
                  object-cover
                  object-center
                  transition-transform
                  duration-[900ms]
                  ease-[cubic-bezier(0.22,1,0.36,1)]
                  group-hover:scale-[1.055]
                "
              />

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,transparent_28%,rgba(8,17,27,0.05)_100%)]
                "
              />
            </div>
          </div>

          {/* META */}

          <div
            className="
              mt-4
              flex
              items-center
              justify-between
              gap-4
            "
          >
            <span
              className={`
                rounded-[9px]
                px-3
                py-1.5
                font-brand-sans
                text-[8px]
                font-bold
                uppercase
                tracking-[0.12em]

                ${
                  featured
                    ? `
                      bg-[linear-gradient(145deg,#e6bc68,#c58a31)]
                      text-white
                      shadow-[inset_1px_1px_2px_rgba(255,255,255,0.35),0_4px_8px_rgba(102,67,19,0.14)]
                    `
                    : `
                      clay-surface-soft
                      text-[var(--brand-navy)]
                    `
                }
              `}
            >
              {listing.badge}
            </span>

            <time
              className="
                whitespace-nowrap
                font-brand-sans
                text-[8px]
                font-semibold
                uppercase
                tracking-[0.08em]
                text-[var(--brand-text-muted)]
              "
            >
              {listing.date}
            </time>
          </div>

          {/* TITLE */}

          <h3
            className={`
              mt-4
              font-brand-display
              font-semibold
              leading-[1.03]
              tracking-[-0.03em]
              text-[var(--brand-navy)]

              ${
                featured
                  ? `
                    text-[31px]
                    xl:text-[34px]
                  `
                  : `
                    text-[27px]
                    xl:text-[30px]
                  `
              }
            `}
          >
            {listing.title}
          </h3>

          {/* DESCRIPTION */}

          <p
            className="
              mt-4
              min-h-[42px]
              font-brand-sans
              text-[10px]
              font-medium
              leading-[1.65]
              text-[var(--brand-text-muted)]

              xl:text-[11px]
            "
          >
            {listing.description}
          </p>

          {/* DIVIDER */}

          <div
            className="
              mt-5
              h-px
              w-full
              bg-[var(--brand-gold)]/20
            "
          />

          {/* CTA */}

          <Link
            href={listing.href}
            className="
              mt-4
              flex
              items-center
              justify-between
              gap-4
            "
          >
            <span
              className="
                flex
                items-center
                gap-3
                font-brand-sans
                text-[9px]
                font-bold
                uppercase
                tracking-[0.13em]
                text-[var(--brand-navy)]
              "
            >
              View Details
              {!featured && (
                <ArrowRight
                  size={13}
                  strokeWidth={1.7}
                  className="
                    text-[var(--brand-gold-700)]
                    transition-transform
                    duration-500
                    group-hover:translate-x-1
                  "
                />
              )}
            </span>

            {featured && (
              <span
                className="
                  clay-surface-strong
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-full
                  text-[var(--brand-gold-700)]
                  transition-all
                  duration-500
                  group-hover:translate-x-1
                  group-hover:scale-105
                "
              >
                <ArrowRight size={17} strokeWidth={1.6} />
              </span>
            )}
          </Link>

          {/* FEATURE GOLD LINE */}

          {featured && (
            <div
              className="
                absolute
                bottom-0
                left-1/2
                h-[2px]
                w-[24%]
                -translate-x-1/2
                rounded-full
                bg-[var(--brand-gold)]
                opacity-70
                transition-all
                duration-700
                group-hover:w-[48%]
              "
            />
          )}
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   DESKTOP ARCH
========================================================= */

function DesktopArch() {
  return (
    <div
      aria-hidden
      className="
        pointer-events-none
        absolute
        left-1/2
        top-[18px]
        z-0
        h-[470px]
        w-[500px]
        -translate-x-1/2
      "
    >
      <div
        className="
          clay-surface-soft
          absolute
          inset-0
          rounded-t-[50%]
          p-[10px]
          opacity-85
        "
      >
        <div
          className="
            clay-inset
            relative
            h-full
            overflow-hidden
            rounded-t-[50%]
          "
        >
          <div
            className="
              absolute
              bottom-0
              left-1/2
              h-[86%]
              w-[78%]
              -translate-x-1/2
              rounded-t-[50%]
              bg-[linear-gradient(180deg,#f9f1e5,#eadfce)]
            "
          />

          <div
            className="
              absolute
              inset-x-[15%]
              top-[8%]
              h-[36%]
              rounded-[50%]
              bg-white/25
               
            "
          />
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   MOBILE
========================================================= */

function MobileLayout() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const frameRef = useRef<number | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  function updateActiveCard() {
    const scroller = scrollerRef.current;

    if (!scroller) return;

    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
    }

    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = null;

      const cards = Array.from(
        scroller.querySelectorAll<HTMLElement>("[data-mobile-card]"),
      );

      if (!cards.length) {
        return;
      }

      const center = scroller.scrollLeft + scroller.clientWidth / 2;

      let closestIndex = 0;
      let closestDistance = Infinity;

      cards.forEach((card, index) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;

        const distance = Math.abs(center - cardCenter);

        if (distance < closestDistance) {
          closestDistance = distance;

          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);
    });
  }

  useEffect(() => {
    updateActiveCard();

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  function goToSlide(index: number) {
    const scroller = scrollerRef.current;

    if (!scroller) return;

    const card =
      scroller.querySelectorAll<HTMLElement>("[data-mobile-card]")[index];

    if (!card) return;

    scroller.scrollTo({
      left: card.offsetLeft - 16,
      behavior: "smooth",
    });
  }

  return (
    <div
      className="
        relative
        overflow-hidden
        px-4
        pb-6
        pt-7

        sm:px-6
        sm:pb-7
      "
    >
      {/* HEADER */}

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
              font-brand-sans
              text-[8px]
              font-bold
              uppercase
              tracking-[0.24em]
              text-[var(--brand-gold-700)]
            "
          >
            Latest
          </span>

          <span
            className="
              h-px
              w-9
              bg-[var(--brand-gold)]
            "
          />
        </div>

        <h2
          className="
            mt-3
            max-w-[330px]
            font-brand-display
            text-[36px]
            font-semibold
            leading-[0.98]
            tracking-[-0.04em]
            text-[var(--brand-navy)]

            min-[390px]:text-[40px]
          "
        >
          Discover What&apos;s New
          <span
            className="
              text-[var(--brand-gold)]
            "
          >
            .
          </span>
        </h2>

        <p
          className="
            mt-4
            max-w-[300px]
            font-brand-sans
            text-[10px]
            font-medium
            leading-[1.65]
            text-[var(--brand-text-muted)]
          "
        >
          Explore our latest opportunities, updates and featured listings from
          Sofa N More.
        </p>
      </div>

      {/* =============================================
          CAROUSEL
      ============================================== */}

      <div
        ref={scrollerRef}
        onScroll={updateActiveCard}
        className="
          -mx-4
          mt-7
          flex
          snap-x
          snap-mandatory
          gap-3
          overflow-x-auto
          overscroll-x-contain
          scroll-smooth
          px-4
          pb-5
          pr-[15%]
          [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden

          sm:-mx-6
          sm:px-6
        "
      >
        {listings.map((listing, index) => (
          <MobileCard
            key={listing.id}
            listing={listing}
            active={activeIndex === index}
          />
        ))}
      </div>

      {/* =============================================
          PAGINATION
      ============================================== */}

      <div
        className="
          mt-1
          flex
          items-center
          justify-center
          gap-2.5
        "
      >
        {listings.map((listing, index) => (
          <button
            key={listing.id}
            type="button"
            aria-label={`Go to listing ${index + 1}`}
            onClick={() => goToSlide(index)}
            className={`
                flex h-11 min-w-11 items-center justify-center
                rounded-full
                transition-all
                duration-500
                ease-[cubic-bezier(0.22,1,0.36,1)]
              `}
          >
            <span
              aria-hidden
              className={`
                  rounded-full
                  transition-all
                  duration-500
                  ease-[cubic-bezier(0.22,1,0.36,1)]

                  ${
                    index === activeIndex
                      ? `
                        h-[7px]
                        w-10
                        bg-[var(--brand-gold)]
                      `
                      : `
                        h-[7px]
                        w-[7px]
                        bg-[var(--brand-navy)]
                      `
                  }
                `}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   MOBILE CARD
========================================================= */

function MobileCard({
  listing,
  active,
}: {
  listing: Listing;
  active: boolean;
}) {
  return (
    <article
      data-mobile-card
      className={`
        group
        w-[84%]
        max-w-[330px]
        shrink-0
        snap-start
        transition-all
        duration-500
        ease-[cubic-bezier(0.22,1,0.36,1)]

        ${active ? "scale-100 opacity-100" : "scale-[0.975] opacity-90"}
      `}
    >
      <div
        className="
          clay-surface-strong
          rounded-[28px]
          p-[6px]
        "
      >
        <div
          className="
            clay-inset
            overflow-hidden
            rounded-[22px]
            px-3
            pb-4
            pt-3
          "
        >
          {/* IMAGE */}

          <div
            className="
              clay-surface-strong
              rounded-[21px]
              p-[5px]
            "
          >
            <div
              className="
                clay-inset
                relative
                aspect-[1.05/1]
                overflow-hidden
                rounded-[17px]
              "
            >
              <Image
                src={listing.image}
                alt={listing.title}
                fill
                draggable={false}
                sizes="84vw"
                className="
                  object-cover
                  object-center
                "
              />

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  bg-[linear-gradient(180deg,rgba(255,255,255,0.06),transparent_30%,rgba(9,22,35,0.07))]
                "
              />
            </div>
          </div>

          {/* META */}

          <div
            className="
              mt-4
              flex
              items-center
              justify-between
              gap-3
            "
          >
            <span
              className={`
                rounded-[8px]
                px-3
                py-1.5
                font-brand-sans
                text-[7px]
                font-bold
                uppercase
                tracking-[0.12em]

                ${
                  listing.featured
                    ? `
                      bg-[linear-gradient(145deg,#e4b85f,#c58a31)]
                      text-white
                    `
                    : `
                      clay-surface-soft
                      text-[var(--brand-navy)]
                    `
                }
              `}
            >
              {listing.badge}
            </span>

            <time
              className="
                font-brand-sans
                text-[7px]
                font-semibold
                uppercase
                tracking-[0.07em]
                text-[var(--brand-text-muted)]
              "
            >
              {listing.date}
            </time>
          </div>

          {/* TITLE */}

          <h3
            className="
              mt-4
              font-brand-display
              text-[27px]
              font-semibold
              leading-[1.02]
              tracking-[-0.03em]
              text-[var(--brand-navy)]
            "
          >
            {listing.title}
          </h3>

          {/* DESCRIPTION */}

          <p
            className="
              mt-3
              min-h-[34px]
              font-brand-sans
              text-[9px]
              font-medium
              leading-[1.6]
              text-[var(--brand-text-muted)]
            "
          >
            {listing.description}
          </p>

          {/* DIVIDER */}

          <div
            className="
              mt-4
              h-px
              bg-[var(--brand-gold)]/20
            "
          />

          {/* CTA */}

          <Link
            href={listing.href}
            className="
              mt-4
              flex
              items-center
              justify-between
            "
          >
            <span
              className="
                font-brand-sans
                text-[8px]
                font-bold
                uppercase
                tracking-[0.13em]
                text-[var(--brand-navy)]
              "
            >
              View Details
            </span>

            <span
              className="
                clay-surface-strong
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                text-[var(--brand-gold-700)]
              "
            >
              <ArrowRight size={16} strokeWidth={1.6} />
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   BACKGROUND DECOR
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
      {/* base */}

      <div
        className="
          absolute
          inset-0
          bg-[linear-gradient(180deg,#fffdf8_0%,#f5f2ea_58%,#eadfce_100%)]
        "
      />

      {/* vertical embossed lines */}
    </div>
  );
}
