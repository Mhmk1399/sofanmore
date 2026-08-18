import Image from "next/image";
import { Crown, Diamond, Landmark, Sparkles } from "lucide-react";

import type { LucideIcon } from "lucide-react";

import ClayButton from "../ui/ClayButton";

/* =========================================================
   TYPES
========================================================= */

type FeatureCard = {
  title: string;
  description: string;
  icon: LucideIcon;
};

/* =========================================================
   DATA
========================================================= */

const featureCards: FeatureCard[] = [
  {
    title: "Handcrafted in London",
    description: "Expert craftsmanship rooted in British heritage.",
    icon: Landmark,
  },
  {
    title: "Bespoke Design",
    description: "Tailored to your vision. Made exclusively for you.",
    icon: Sparkles,
  },
  {
    title: "Premium Materials",
    description: "The finest materials, chosen to last.",
    icon: Diamond,
  },
];

/* =========================================================
   ROOT
========================================================= */

export default function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="
        relative
        overflow-hidden
        bg-[var(--brand-ivory)]
        px-3
        py-12
        text-[var(--brand-navy)]

        sm:px-5
        lg:px-8
        lg:py-20
      "
    >
      {/* background light */}
      <div
        aria-hidden
        className="
          pointer-events-none
          absolute inset-0
          bg-[radial-gradient(circle_at_50%_42%,rgba(255,255,255,0.72),rgba(245,242,234,0.10)_58%,rgba(235,225,211,0.32)_100%)]
        "
      />

      {/* ===============================
          DESKTOP
      =============================== */}

      <div className="relative z-10 hidden lg:block">
        <DesktopAbout />
      </div>

      {/* ===============================
          MOBILE
      =============================== */}

      <div className="relative z-10 lg:hidden">
        <MobileAbout />
      </div>
    </section>
  );
}

/* =========================================================
   DESKTOP
========================================================= */

function DesktopAbout() {
  return (
    <div
      className="
        clay-surface-strong
        relative
        mx-auto
        max-w-[1320px]
        overflow-visible
        rounded-[48px]
        p-[10px]
      "
    >
      {/* INNER INSET BODY */}

      <div
        className="
          clay-inset
          relative
          overflow-visible
          rounded-[39px]
          px-10
          pb-28
          pt-12

          xl:px-14
          xl:pb-32
          xl:pt-14
        "
      >
        {/* LEFT SIDE DECOR */}

        <div
          aria-hidden
          className="
            absolute
            -left-[10px]
            top-[150px]
            h-[270px]
            w-[72px]
            rounded-r-[42px]
            border
            border-white/70
            bg-[linear-gradient(145deg,#fffdf8,#eadfce)]
            shadow-[var(--shadow-clay-md)]
          "
        >
          <div
            className="
              absolute
              left-1/2
              top-10
              h-[100px]
              w-px
              -translate-x-1/2
              bg-[var(--brand-gold)]
            "
          />
        </div>

     

        {/* MAIN GRID */}

        <div
          className="
            grid
            grid-cols-[0.93fr_1.07fr]
            items-center
            gap-12

            xl:gap-16
          "
        >
          <AboutCopy />

          <DesktopImage />
        </div>

        {/* FEATURE CARDS */}

        <div
          className="
            absolute
            bottom-6
            left-1/2
            z-20
            grid
            w-[68%]
            -translate-x-1/2
            grid-cols-3
            gap-4
          "
        >
          {featureCards.map((card) => (
            <DesktopFeatureCard key={card.title} card={card} />
          ))}
        </div>
      </div>

     </div>
  );
}

/* =========================================================
   COPY
========================================================= */

function AboutCopy() {
  return (
    <div className="relative z-10 max-w-[520px]">
      {/* Monogram */}

       

      {/* eyebrow */}

      <div className="mb-6 flex items-center gap-4">
        <span
          className="
            font-brand-sans
            text-[10px]
            font-bold
            uppercase
            tracking-[0.2em]
            text-[var(--brand-gold-700)]
          "
        >
          About Sofa N More
        </span>

        <span
          aria-hidden
          className="
            h-px
            w-10
            bg-[var(--brand-gold)]
          "
        />
      </div>

      {/* heading */}

      <h2
        id="about-heading"
        className="
          font-brand-display
          text-[clamp(42px,4vw,58px)]
          font-semibold
          leading-[1.02]
          tracking-[-0.025em]
          text-[var(--brand-navy)]
        "
      >
        Crafted in London.
        <br />
        Designed for
        <br />
        Exceptional Spaces
        <span className="text-[var(--brand-gold)]">.</span>
      </h2>

      {/* body */}

      <p
        className="
          mt-7
          max-w-[470px]
          font-brand-sans
          text-[13px]
          font-medium
          leading-[1.75]
          text-[var(--brand-text-muted)]

          xl:text-[14px]
        "
      >
        Sofa N More creates timeless, bespoke sofa that brings together
        master craftsmanship, refined design and enduring comfort. From concept
        to completion, we offer a personalised service encompassing bespoke
        design, interior design and expert restoration.
      </p>

      <div className="mt-8">
        <ClayButton
          href="/about-us"
          variant="navy"
          size="lg"
          showArrow
          ariaLabel="Discover our story"
        >
          Discover Our Story
        </ClayButton>
      </div>
    </div>
  );
}

/* =========================================================
   DESKTOP IMAGE
========================================================= */

function DesktopImage() {
  return (
    <div
      className="
        clay-surface-strong
        relative
        rounded-[44px]
        p-[12px]
      "
    >
      {/* pressed frame */}

      <div
        className="
          clay-inset
          relative
          h-[430px]
          overflow-hidden
          rounded-[35px]
          p-[8px]

          xl:h-[455px]
        "
      >
        <div
          className="
            relative
            h-full
            overflow-hidden
            rounded-[28px]
          "
        >
          <Image
            src="/assets/images/2.webp"
            alt="Sofa N More bespoke sofa interior"
            fill
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="object-cover object-center"
          />

          <div
            aria-hidden
            className="
              pointer-events-none
              absolute inset-0
              bg-[linear-gradient(135deg,rgba(18,37,62,0.05),transparent_45%)]
            "
          />
        </div>
      </div>

      {/* EST badge */}

      <div
        className="
          clay-surface-strong
          absolute
          -right-7
          top-[33%]
          z-30
          flex
          h-[94px]
          w-[94px]
          items-center
          justify-center
          rounded-full
          p-[6px]
        "
      >
        <div
          className="
            clay-dark
            flex
            h-full
            w-full
            flex-col
            items-center
            justify-center
            rounded-full
            border
            border-[var(--brand-gold)]
            text-center
          "
        >
          <Crown
            size={17}
            strokeWidth={1.5}
            className="
              mb-1
              text-[var(--brand-gold)]
            "
          />

          <span
            className="
              font-brand-display
              text-[11px]
              font-semibold
              leading-[1.05]
              text-[var(--brand-gold-300)]
            "
          >
            EST.
            <br />
            2010
          </span>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   DESKTOP FEATURE
========================================================= */

function DesktopFeatureCard({ card }: { card: FeatureCard }) {
  const Icon = card.icon;

  return (
    <div
      className="
        clay-surface
        flex
        min-h-[118px]
        items-center
        gap-4
        rounded-[26px]
        px-5
        py-4
      "
    >
      <span
        className="
          clay-icon
          flex
          h-[54px]
          w-[54px]
          shrink-0
          items-center
          justify-center
          rounded-[18px]
        "
      >
        <Icon
          size={24}
          strokeWidth={1.4}
          className="text-[var(--brand-gold)]"
        />
      </span>

      <div className="min-w-0">
        <h3
          className="
            font-brand-display
            text-[17px]
            font-semibold
            leading-[1.1]
          "
        >
          {card.title}
        </h3>

        <div
          className="
            my-2
            h-px
            w-10
            bg-[var(--brand-gold)]/50
          "
        />

        <p
          className="
            font-brand-sans
            text-[9px]
            font-medium
            leading-[1.45]
            text-[var(--brand-text-muted)]

            xl:text-[10px]
          "
        >
          {card.description}
        </p>
      </div>
    </div>
  );
}

 

/* =========================================================
   MOBILE
========================================================= */

function MobileAbout() {
  return (
    <div
      className="
        clay-surface-strong
        relative
        mx-auto
        max-w-[430px]
        overflow-visible
        rounded-[34px]
        p-[7px]
      "
    >
      <div
        className="
          clay-inset
          relative
          overflow-visible
          rounded-[28px]
          px-4
          pb-7
          pt-7
        "
      >
        {/* side decorative rail */}

        <div
          aria-hidden
          className="
            absolute
            -left-[7px]
            top-[84px]
            h-[220px]
            w-[44px]
            rounded-r-[28px]
            border
            border-white/70
            bg-[linear-gradient(145deg,#fffdf8,#eadfce)]
            shadow-[var(--shadow-clay-sm)]
          "
        >
          <div
            className="
              absolute
              left-1/2
              top-8
              h-[68px]
              w-px
              -translate-x-1/2
              bg-[var(--brand-gold)]
            "
          />
        </div>

        <MobileCopy />

        <MobileImage />

        <div className="mt-4 space-y-3">
          {featureCards.map((card) => (
            <MobileFeatureCard key={card.title} card={card} />
          ))}
        </div>
      </div>

      <MobileDecorations />
    </div>
  );
}

/* =========================================================
   MOBILE COPY
========================================================= */

function MobileCopy() {
  return (
    <div className="relative z-10 pl-6 pr-2">
      <div className="mb-4 flex items-center gap-3">
        <span
          className="
            font-brand-sans
            text-[8px]
            font-bold
            uppercase
            tracking-[0.17em]
            text-[var(--brand-gold-700)]
          "
        >
          About Sofa N More
        </span>

        <span
          className="
            h-px
            w-7
            bg-[var(--brand-gold)]
          "
        />
      </div>

      <h2
        className="
          font-brand-display
          text-[30px]
          font-semibold
          leading-[1.03]
          tracking-[-0.025em]
          text-[var(--brand-navy)]

          min-[390px]:text-[33px]
        "
      >
        Crafted in London.
        <br />
        Designed for
        <br />
        Exceptional Spaces
        <span className="text-[var(--brand-gold)]">.</span>
      </h2>

      <p
        className="
          mt-5
          max-w-[330px]
          font-brand-sans
          text-[10px]
          font-medium
          leading-[1.6]
          text-[var(--brand-text-muted)]
        "
      >
        Sofa N More creates timeless, bespoke sofa that brings together
        master craftsmanship, refined design and enduring comfort. From concept
        to completion, we offer a personalised service encompassing bespoke
        design, interior design and expert restoration.
      </p>

      <div className="mt-5">
        <ClayButton href="/about-us" variant="navy" size="md" showArrow>
          Discover Our Story
        </ClayButton>
      </div>
    </div>
  );
}

/* =========================================================
   MOBILE IMAGE
========================================================= */

function MobileImage() {
  return (
    <div
      className="
        clay-surface-strong
        relative
        z-10
        mt-6
        rounded-[29px]
        p-[7px]
      "
    >
      <div
        className="
          clay-inset
          relative
          h-[245px]
          overflow-hidden
          rounded-[23px]
          p-[5px]

          min-[390px]:h-[275px]
        "
      >
        <div
          className="
            relative
            h-full
            overflow-hidden
            rounded-[19px]
          "
        >
          <Image
            src="/assets/images/7.webp"
            alt="Sofa N More bespoke sofa interior"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      </div>

      {/* badge */}

      <div
        className="
          clay-surface-strong
          absolute
          -right-4
          -top-7
          z-30
          flex
          h-[78px]
          w-[78px]
          items-center
          justify-center
          rounded-full
          p-[5px]
        "
      >
        <div
          className="
            clay-dark
            flex
            h-full
            w-full
            flex-col
            items-center
            justify-center
            rounded-full
            border
            border-[var(--brand-gold)]
          "
        >
          <Crown
            size={14}
            className="
              mb-1
              text-[var(--brand-gold)]
            "
          />

          <span
            className="
              text-center
              font-brand-display
              text-[9px]
              font-semibold
              leading-[1.05]
              text-[var(--brand-gold-300)]
            "
          >
            EST.
            <br />
            2010
          </span>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   MOBILE FEATURE
========================================================= */

function MobileFeatureCard({ card }: { card: FeatureCard }) {
  const Icon = card.icon;

  return (
    <div
      className="
        clay-surface
        relative
        z-10
        flex
        min-h-[76px]
        items-center
        gap-3
        rounded-[22px]
        px-4
        py-3
      "
    >
      <span
        className="
          clay-icon
          flex
          h-[46px]
          w-[46px]
          shrink-0
          items-center
          justify-center
          rounded-[15px]
        "
      >
        <Icon
          size={20}
          strokeWidth={1.4}
          className="text-[var(--brand-gold)]"
        />
      </span>

      <div className="min-w-0">
        <h3
          className="
            font-brand-display
            text-[14px]
            font-semibold
            leading-[1.1]
          "
        >
          {card.title}
        </h3>

        <p
          className="
            mt-1
            font-brand-sans
            text-[8px]
            font-medium
            leading-[1.4]
            text-[var(--brand-text-muted)]
          "
        >
          {card.description}
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   MOBILE DECOR
========================================================= */

function MobileDecorations() {
  return (
    <>
      {/* bottom left sphere */}

      <div
        aria-hidden
        className="
          clay-sphere
          absolute
          -bottom-[22px]
          -left-[28px]
          z-20
          h-[100px]
          w-[100px]
        "
      >
        <div className="clay-sphere-shadow" />
        <div className="clay-sphere-ball" />
      </div>

      {/* small gold sphere */}

      <div
        aria-hidden
        className="
          clay-sphere
          absolute
          -bottom-[4px]
          left-[48px]
          z-30
          h-[42px]
          w-[42px]
        "
      >
        <div className="clay-sphere-ball clay-sphere-ball--gold" />
      </div>

      {/* right sphere */}

      <div
        aria-hidden
        className="
          clay-sphere
          absolute
          bottom-[100px]
          -right-[32px]
          z-20
          h-[100px]
          w-[100px]
        "
      >
        <div className="clay-sphere-shadow" />
        <div className="clay-sphere-ball" />
      </div>

      {/* gold ring */}

      <div
        aria-hidden
        className="
          absolute
          -bottom-[6px]
          -right-[18px]
          z-30
          h-[105px]
          w-[105px]
        "
      >
        <div className="clay-sphere-ring" />
      </div>
    </>
  );
}
