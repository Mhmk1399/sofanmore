import Image from "next/image";

import type { ComponentType, ReactNode } from "react";

import {
  Crown,
  ExternalLink,
  Mail,
  MapPin,
  Navigation,
  Phone,
} from "lucide-react";

import ClayButton from "@/components/ui/ClayButton";

/* =========================================================
   GOOGLE MAPS
========================================================= */

/*
 * لینک اصلی که خودت دادی.
 * برای دکمه Open in Google Maps استفاده می‌شود.
 */
const GOOGLE_MAPS_URL =
  "https://maps.google.com/maps?ll=51.552156,-0.19232&z=12&t=m&hl=en-US&gl=US&mapclient=embed&cid=11170879595232670801";

/*
 * برای iframe یک URL مخصوص render نقشه داریم.
 * مختصات همان لوکیشنی است که خودت فرستادی.
 */
const GOOGLE_MAPS_EMBED_URL =
  "https://www.google.com/maps?q=51.552156,-0.19232&z=16&output=embed";

/* =========================================================
   TYPES
========================================================= */

type ContactItem = {
  title: string;
  value: ReactNode;

  href?: string;

  external?: boolean;

  icon: ComponentType<{
    size?: number;
    strokeWidth?: number;
    className?: string;
  }>;
};

/* =========================================================
   DATA
========================================================= */

const contactItems: ContactItem[] = [
  {
    title: "Workshop",

    value: (
      <>
        Unit G19, Atlas Business Centre,
        <br />
        Oxgate Ln, Staples Corner W,
        <br />
        London NW2 7HJ
      </>
    ),

    href: GOOGLE_MAPS_URL,

    external: true,

    icon: MapPin,
  },

  {
    title: "Phone Number",

    value: "07400 577844",

    href: "tel:07400577844",

    icon: Phone,
  },

  {
    title: "Email Us",

    value: "info@sofanmore.co.uk",

    href: "mailto:info@sofanmore.co.uk",

    icon: Mail,
  },
];

/* =========================================================
   ROOT
========================================================= */

export default function ContactHeroSection() {
  return (
    <section
      aria-labelledby="contact-hero-heading"
      className="
        relative
        mt-20
        overflow-hidden

         

        px-3
        py-4

        sm:px-5
        sm:py-5

        lg:bg-[var(--brand-ivory)]
        lg:px-6
        lg:py-8
      "
    >
      {/* =====================================================
          PAGE BACKGROUND
      ====================================================== */}

      <div
        aria-hidden
        className="
          pointer-events-none
          absolute
          inset-0

          hidden

          bg-[linear-gradient(180deg,#FFFDF8_0%,#F5F2EA_52%,#ECE1D2_100%)]

          lg:block
        "
      />

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-[1450px]
        "
      >
        {/* =====================================================
            DESKTOP
        ====================================================== */}

        <div className="hidden lg:block">
          <DesktopContactHero />
        </div>

        {/* =====================================================
            MOBILE
        ====================================================== */}

        <div className="lg:hidden">
          <MobileContactHero />
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   DESKTOP
========================================================= */

function DesktopContactHero() {
  return (
    <div
      className="
        clay-surface-strong
        relative
        overflow-hidden
        rounded-[42px]
        p-[10px]
      "
    >
      <div
        className="
          clay-inset
          relative
          min-h-[940px]
          overflow-hidden
          rounded-[34px]

          bg-[linear-gradient(180deg,#FFFDF8_0%,#F5F2EA_100%)]

          px-12
          py-12

          xl:px-14
          xl:py-14
        "
      >
        {/* ===============================================
            BACKGROUND CURVES
        ================================================ */}

        <DesktopCurves />

        {/* ===============================================
            MAIN GRID
        ================================================ */}

        <div
          className="
            relative
            z-20

            grid
            min-h-[820px]
            grid-cols-[0.94fr_1.06fr]

            items-center

            gap-10

            xl:gap-14
          "
        >
          {/* =================================================
              LEFT CONTENT
          ================================================== */}

          <div
            className="
              relative
              z-20
              flex
              flex-col
            "
          >
            {/* EYEBROW */}

            <div
              className="
                mb-6
                flex
                items-center
                gap-3
              "
            >
              <span
                className="
                  font-brand-sans
                  text-[11px]
                  font-bold
                  uppercase
                  tracking-[0.26em]
                  text-[var(--brand-gold-700)]
                "
              >
                Our Contacts
              </span>
            </div>

            {/* HEADING */}

            <h1
              id="contact-hero-heading"
              className="
                max-w-[540px]

                font-brand-display
                text-[clamp(58px,5vw,78px)]
                font-medium
                leading-[0.96]
                tracking-[-0.045em]

                text-[var(--brand-navy)]
              "
            >
              Get in touch
              <br />
              with us
              <span className="text-[var(--brand-gold)]">.</span>
            </h1>

            {/* LINE */}

            <div
              className="
                mt-5
                flex
                items-center
                gap-3
              "
            >
              <span
                className="
                  h-[2px]
                  w-16
                  rounded-full
                  bg-[var(--brand-gold)]
                "
              />

              <span
                className="
                  h-[6px]
                  w-[6px]
                  rounded-full
                  bg-[var(--brand-gold)]
                "
              />
            </div>

            {/* COPY */}

            <p
              className="
                mt-7
                max-w-[520px]

                font-brand-sans
                text-[16px]
                leading-[1.75]

                text-[var(--brand-text-muted)]

                xl:text-[17px]
              "
            >
              Looking to transform your space with bespoke furniture, expert
              home staging, or innovative interior design? Get in touch with
              Sofa N More today! Located in London, we are dedicated to creating
              tailored solutions that reflect your unique style and enhance your
              living or working environment.
            </p>

            {/* CONTACT CARDS */}

            <div
              className="
                mt-9
                max-w-[555px]
                space-y-4
              "
            >
              {contactItems.map((item) => (
                <DesktopContactCard key={item.title} item={item} />
              ))}
            </div>
          </div>

          {/* =================================================
              RIGHT VISUAL + MAP
          ================================================== */}

          <DesktopVisualAndMap />
        </div>

        {/* ===============================================
            DECORATIVE OBJECTS
        ================================================ */}

        <div
          aria-hidden
          className="
            clay-sphere

            absolute
            bottom-8
            left-[53%]
            z-10

            h-[115px]
            w-[115px]

            xl:h-[128px]
            xl:w-[128px]
          "
        >
          <div className="clay-sphere-shadow" />

          <div className="clay-sphere-ball" />
        </div>

        {/* GOLD RING */}

        <div
          aria-hidden
          className="
            absolute
            right-11
            top-10
            z-10

            h-[120px]
            w-[120px]

            rounded-full

            border-[3px]
            border-[var(--brand-gold)]/85

            shadow-[inset_1px_1px_1px_rgba(255,255,255,0.5),0_8px_20px_rgba(150,103,32,0.12)]
          "
        />

        {/* GOLD SPHERE */}

        <div
          aria-hidden
          className="
            absolute
            right-[88px]
            top-[89px]
            z-20

            h-[21px]
            w-[21px]

            rounded-full

            bg-[radial-gradient(circle_at_30%_30%,#FFE9B8_0%,#D7A04A_50%,#9F6A1F_100%)]

            shadow-[0_10px_20px_rgba(215,160,74,0.28)]
          "
        />
      </div>
    </div>
  );
}

/* =========================================================
   DESKTOP RIGHT SIDE
========================================================= */

function DesktopVisualAndMap() {
  return (
    <div
      className="
        relative
        z-20

        mx-auto

        w-full
        max-w-[680px]

        pb-[235px]
      "
    >
      {/* =================================================
          SHOWROOM ARCH
      ================================================== */}

      <div
        className="
          clay-surface-strong

          relative
          mx-auto

          h-[575px]
          w-full

          rounded-[220px_220px_40px_40px]

          p-[9px]
        "
      >
        <div
          className="
            clay-inset

            relative
            h-full
            overflow-hidden

            rounded-[210px_210px_32px_32px]

            bg-[#E8DDCC]
          "
        >
          <Image
            src="/assets/images/4.webp"
            alt="Luxury Sofa N More showroom interior in London"
            fill
            priority
            sizes="45vw"
            className="
              object-cover
              object-center
            "
          />

          {/* PHOTO GRADING */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0

              bg-[linear-gradient(180deg,rgba(8,20,35,0.06)_0%,transparent_30%,transparent_72%,rgba(8,20,35,0.16)_100%)]
            "
          />

          {/* INNER HIGHLIGHT */}

          <div
            className="
              pointer-events-none
              absolute
              inset-[10px]

              rounded-[195px_195px_26px_26px]

              border
              border-white/35
            "
          />

          {/* BRAND PLAQUE */}

          <div
            className="
              clay-surface-soft

              absolute
              left-8
              top-8

              rounded-[22px]

              px-5
              py-4
            "
          >
            <div
              className="
                flex
                items-center
                gap-2

                text-[var(--brand-gold)]
              "
            >
              <Crown size={14} strokeWidth={1.5} />

              <span
                className="
                  font-brand-display
                  text-[14px]
                  tracking-[0.06em]
                "
              >
                Sofa N More
              </span>
            </div>

            <div
              className="
                mt-1

                font-brand-sans
                text-[8px]
                uppercase
                tracking-[0.22em]

                text-[var(--brand-text-muted)]
              "
            >
              London
            </div>
          </div>
        </div>
      </div>

      {/* =================================================
          FLOATING MAP DOCK
      ================================================== */}

      <div
        className="
          absolute
          bottom-0
          left-1/2
          z-30

          w-[94%]

          -translate-x-1/2
        "
      >
        <WorkshopMapCard />
      </div>
    </div>
  );
}

/* =========================================================
   GOOGLE MAP CARD
========================================================= */

function WorkshopMapCard({ mobile = false }: { mobile?: boolean }) {
  return (
    <div
      className="
        clay-surface-strong

        relative

        rounded-[28px]

        p-[6px]

        shadow-[0_20px_35px_rgba(61,50,36,0.17)]
      "
    >
      <div
        className="
          clay-inset

          rounded-[22px]

          p-4

          sm:p-5
        "
      >
        {/* =================================================
            MAP HEADER
        ================================================== */}

        <div
          className="
            flex
            items-start
            justify-between

            gap-3
          "
        >
          <div
            className="
              flex
              min-w-0
              items-start
              gap-3
            "
          >
            <div
              className="
                clay-surface-strong

                flex
                h-11
                w-11

                shrink-0

                items-center
                justify-center

                rounded-full
              "
            >
              <div
                className="
                  flex
                  h-9
                  w-9

                  items-center
                  justify-center

                  rounded-full

                  bg-[var(--brand-navy)]
                "
              >
                <Navigation
                  size={16}
                  strokeWidth={1.7}
                  className="
                    text-[var(--brand-gold)]
                  "
                />
              </div>
            </div>

            <div className="min-w-0">
              <span
                className="
                  font-brand-sans
                  text-[8px]
                  font-bold
                  uppercase
                  tracking-[0.2em]

                  text-[var(--brand-gold-700)]
                "
              >
                Visit Our Workshop
              </span>

              <h3
                className="
                  mt-1

                  font-brand-display
                  text-[18px]
                  font-semibold
                  leading-[1.05]

                  text-[var(--brand-navy)]

                  sm:text-[20px]
                "
              >
                Sofa N More · London
              </h3>

              {!mobile && (
                <p
                  className="
                    mt-1.5
                    font-brand-sans
                    text-[9px]
                    leading-[1.45]

                    text-[var(--brand-text-muted)]
                  "
                >
                  Unit G19, Atlas Business Centre, Oxgate Ln, London NW2 7HJ
                </p>
              )}
            </div>
          </div>

          {/* OPEN MAP */}

          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="
              clay-surface-soft

              hidden

              shrink-0

              items-center
              gap-2

              rounded-full

              px-4
              py-2.5

              font-brand-sans
              text-[8px]
              font-bold
              uppercase
              tracking-[0.1em]

              text-[var(--brand-navy)]

              transition-transform
              duration-300

              hover:-translate-y-[1px]

              sm:flex
            "
          >
            Open Maps
            <ExternalLink
              size={12}
              strokeWidth={1.6}
              className="
                text-[var(--brand-gold-700)]
              "
            />
          </a>
        </div>

        {/* =================================================
            REAL GOOGLE MAP
        ================================================== */}

        <div
          className="
            clay-surface-strong

            mt-4

            rounded-[20px]

            p-[5px]
          "
        >
          <div
            className={`
              clay-inset

              relative
              overflow-hidden

              rounded-[16px]

              bg-[#E7DDCF]

              ${mobile ? "h-[225px]" : "h-[180px]"}
            `}
          >
            <iframe
              src={GOOGLE_MAPS_EMBED_URL}
              title="Sofa N More workshop location on Google Maps"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              className="
                absolute
                inset-0

                h-full
                w-full

                border-0
              "
            />

            {/* subtle premium grading only */}

            <div
              aria-hidden
              className="
                pointer-events-none

                absolute
                inset-0

                ring-1
                ring-inset
                ring-white/35
              "
            />

            {/* Map location badge */}

            <div
              className="
                pointer-events-none

                absolute
                bottom-3
                left-3

                flex
                items-center
                gap-2

                rounded-full

                bg-[rgba(11,25,41,0.88)]

                px-3
                py-2

                backdrop-blur-sm
              "
            >
              <MapPin
                size={12}
                className="
                  text-[var(--brand-gold)]
                "
              />

              <span
                className="
                  font-brand-sans
                  text-[7px]
                  font-bold
                  uppercase
                  tracking-[0.1em]

                  text-white
                "
              >
                NW2 7HJ · London
              </span>
            </div>
          </div>
        </div>

        {/* =================================================
            MOBILE MAP CTA
        ================================================== */}

        {mobile && (
          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="
              clay-dark

              mt-3

              flex
              min-h-[48px]
              w-full

              items-center
              justify-between

              rounded-[16px]

              px-4

              font-brand-sans
              text-[9px]
              font-bold
              uppercase
              tracking-[0.12em]

              text-white
            "
          >
            <span>Open in Google Maps</span>

            <span
              className="
                clay-surface-strong

                flex
                h-8
                w-8

                items-center
                justify-center

                rounded-full

                text-[var(--brand-navy)]
              "
            >
              <ExternalLink size={13} strokeWidth={1.6} />
            </span>
          </a>
        )}
      </div>
    </div>
  );
}

/* =========================================================
   DESKTOP CONTACT CARD
========================================================= */

function DesktopContactCard({ item }: { item: ContactItem }) {
  const Icon = item.icon;

  const cardContent = (
    <div
      className="
        clay-surface-soft

        rounded-[25px]

        p-[5px]

        transition-all
        duration-300

        hover:-translate-y-[1px]
      "
    >
      <div
        className="
          clay-inset

          flex
          min-h-[108px]

          items-center

          gap-4

          rounded-[20px]

          px-4
          py-4
        "
      >
        {/* ICON */}

        <div
          className="
            clay-surface-strong

            flex
            h-[68px]
            w-[68px]

            shrink-0

            items-center
            justify-center

            rounded-full
          "
        >
          <div
            className="
              flex
              h-[53px]
              w-[53px]

              items-center
              justify-center

              rounded-full

              bg-[linear-gradient(180deg,#163154_0%,#0B1929_100%)]

              shadow-[inset_0_2px_2px_rgba(255,255,255,0.12),0_10px_24px_rgba(11,25,41,0.22)]
            "
          >
            <Icon
              size={24}
              strokeWidth={1.7}
              className="
                text-[var(--brand-gold)]
              "
            />
          </div>
        </div>

        {/* DIVIDER */}

        <div
          aria-hidden
          className="
            h-[54px]
            w-px

            shrink-0

            bg-[linear-gradient(180deg,transparent,#D7A04A_18%,#D7A04A_82%,transparent)]
          "
        />

        {/* CONTENT */}

        <div
          className="
            min-w-0
            flex-1
          "
        >
          <div
            className="
              font-brand-sans
              text-[9px]
              font-bold
              uppercase
              tracking-[0.22em]

              text-[var(--brand-gold-700)]
            "
          >
            {item.title}
          </div>

          <div
            className="
              mt-2

              font-brand-sans
              text-[14px]
              leading-[1.45]

              text-[var(--brand-navy)]
            "
          >
            {item.value}
          </div>
        </div>

        {/* external indicator */}

        {item.external && (
          <ExternalLink
            size={15}
            strokeWidth={1.5}
            className="
              shrink-0
              text-[var(--brand-gold-700)]
            "
          />
        )}
      </div>
    </div>
  );

  if (!item.href) {
    return cardContent;
  }

  return (
    <a
      href={item.href}
      target={item.external ? "_blank" : undefined}
      rel={item.external ? "noopener noreferrer" : undefined}
      className="
        block
        outline-none

        focus-visible:rounded-[25px]
        focus-visible:ring-2
        focus-visible:ring-[var(--brand-gold)]
      "
    >
      {cardContent}
    </a>
  );
}

/* =========================================================
   MOBILE
========================================================= */

function MobileContactHero() {
  return (
    <div
      className="
        clay-surface-strong

        relative
        overflow-hidden

        rounded-[34px]

        p-[7px]
      "
    >
      <div
        className="
          clay-inset

          relative
          overflow-hidden

          rounded-[28px]

          bg-[linear-gradient(180deg,#FFFDF8_0%,#F5F2EA_100%)]

          px-4
          pb-[calc(100px+env(safe-area-inset-bottom))]
          pt-6

          sm:px-5
        "
      >
        <MobileCurves />

        <div
          className="
            relative
            z-20
          "
        >
          {/* =================================================
              HEADER
          ================================================== */}

          <div className="text-center">
            <span
              className="
                font-brand-sans
                text-[9px]
                font-bold
                uppercase
                tracking-[0.24em]

                text-[var(--brand-gold-700)]
              "
            >
              Our Contacts
            </span>

            <h2
              className="
                mx-auto
                mt-4

                max-w-[300px]

                font-brand-display
                text-[42px]
                font-medium
                leading-[0.96]
                tracking-[-0.04em]

                text-[var(--brand-navy)]

                min-[390px]:text-[46px]
              "
            >
              Get in touch
              <br />
              with us
              <span className="text-[var(--brand-gold)]">.</span>
            </h2>

            <div
              className="
                mt-4
                flex
                items-center
                justify-center
                gap-2
              "
            >
              <span
                className="
                  h-[2px]
                  w-10

                  bg-[var(--brand-gold)]
                "
              />

              <span
                className="
                  h-[5px]
                  w-[5px]

                  rounded-full

                  bg-[var(--brand-gold)]
                "
              />

              <span
                className="
                  h-[2px]
                  w-10

                  bg-[var(--brand-gold)]/45
                "
              />
            </div>

            <p
              className="
                mx-auto
                mt-5

                max-w-[320px]

                font-brand-sans
                text-[12px]
                leading-[1.68]

                text-[var(--brand-text-muted)]
              "
            >
              Looking to transform your space with bespoke furniture, expert
              home staging, or innovative interior design? Get in touch with
              Sofa N More today! Located in London, we are dedicated to creating
              tailored solutions that reflect your unique style.
            </p>
          </div>

          {/* =================================================
              IMAGE
          ================================================== */}

          <div className="mt-6">
            <div
              className="
                clay-surface-strong
                rounded-[26px]
                p-[6px]
              "
            >
              <div
                className="
                  clay-inset

                  relative

                  aspect-[1.2/1]

                  overflow-hidden

                  rounded-[20px]

                  bg-[#E8DDCC]
                "
              >
                <Image
                  src="/assets/images/1.webp"
                  alt="Luxury Sofa N More showroom in London"
                  fill
                  sizes="100vw"
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

                    bg-[linear-gradient(180deg,rgba(8,20,35,0.03),transparent_60%,rgba(8,20,35,0.12))]
                  "
                />
              </div>
            </div>
          </div>

          {/* =================================================
              MOBILE GOOGLE MAP
          ================================================== */}

          <div className="mt-4">
            <WorkshopMapCard mobile />
          </div>

          {/* =================================================
              CONTACT DETAILS
          ================================================== */}

          <div
            className="
              mt-4
              space-y-3
            "
          >
            {contactItems.map((item) => (
              <MobileContactCard key={item.title} item={item} />
            ))}
          </div>

          {/* CALL */}

          <div className="mt-5">
            <ClayButton
              href="tel:07400577844"
              variant="gold"
              size="lg"
              fullWidth
              showArrow
            >
              Call Us
            </ClayButton>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   MOBILE CONTACT CARD
========================================================= */

function MobileContactCard({ item }: { item: ContactItem }) {
  const Icon = item.icon;

  const cardContent = (
    <div
      className="
        clay-surface-soft

        rounded-[20px]

        p-[5px]
      "
    >
      <div
        className="
          clay-inset

          flex

          items-center

          gap-3

          rounded-[16px]

          px-3
          py-3
        "
      >
        <div
          className="
            clay-surface-strong

            flex
            h-[52px]
            w-[52px]

            shrink-0

            items-center
            justify-center

            rounded-full
          "
        >
          <div
            className="
              flex
              h-[41px]
              w-[41px]

              items-center
              justify-center

              rounded-full

              bg-[linear-gradient(180deg,#163154_0%,#0B1929_100%)]
            "
          >
            <Icon
              size={18}
              strokeWidth={1.7}
              className="
                text-[var(--brand-gold)]
              "
            />
          </div>
        </div>

        <div
          aria-hidden
          className="
            h-[40px]
            w-px

            shrink-0

            bg-[linear-gradient(180deg,transparent,#D7A04A_15%,#D7A04A_85%,transparent)]
          "
        />

        <div
          className="
            min-w-0
            flex-1
          "
        >
          <div
            className="
              font-brand-sans
              text-[8px]
              font-bold
              uppercase
              tracking-[0.2em]

              text-[var(--brand-gold-700)]
            "
          >
            {item.title}
          </div>

          <div
            className="
              mt-1.5

              font-brand-sans
              text-[12px]
              leading-[1.45]

              text-[var(--brand-navy)]
            "
          >
            {item.value}
          </div>
        </div>

        {item.external && (
          <ExternalLink
            size={14}
            strokeWidth={1.5}
            className="
              shrink-0
              text-[var(--brand-gold-700)]
            "
          />
        )}
      </div>
    </div>
  );

  if (!item.href) {
    return cardContent;
  }

  return (
    <a
      href={item.href}
      target={item.external ? "_blank" : undefined}
      rel={item.external ? "noopener noreferrer" : undefined}
      className="block"
    >
      {cardContent}
    </a>
  );
}

/* =========================================================
   DESKTOP CURVES
========================================================= */

function DesktopCurves() {
  return (
    <>
      {/* ===================================================
          TOP LEFT ARCHITECTURE
      ==================================================== */}

      <svg
        aria-hidden
        viewBox="0 0 900 520"
        preserveAspectRatio="none"
        className="
          pointer-events-none

          absolute
          left-0
          top-0

          z-0

          h-[48%]
          w-[56%]
        "
      >
        <path
          d="
            M0 0

            H630

            C530 44
             482 123
             468 190

            C450 276
             387 340
             280 364

            C189 384
             96 398
             0 440

            Z
          "
          fill="#F7F1E7"
        />

        <path
          d="
            M0 0
            H604

            C526 40
             490 94
             472 152
          "
          fill="none"
          stroke="#FFFFFF"
          strokeOpacity="0.55"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>

      {/* ===================================================
          BOTTOM RIGHT CURVE
      ==================================================== */}

      <svg
        aria-hidden
        viewBox="0 0 1000 420"
        preserveAspectRatio="none"
        className="
          pointer-events-none

          absolute
          bottom-0
          right-0

          z-0

          h-[34%]
          w-[52%]
        "
      >
        <path
          d="
            M1000 420

            H0

            C86 370
             182 344
             294 344

            C432 344
             514 290
             583 228

            C651 167
             736 138
             837 132

            C909 128
             962 140
             1000 157

            Z
          "
          fill="#F3ECE1"
        />

        <path
          d="
            M0 343

            C92 370
             196 367
             295 349

            C430 324
             524 250
             586 207

            C665 152
             746 132
             840 126

            C911 121
             963 131
             1000 146
          "
          fill="none"
          stroke="#FFFFFF"
          strokeOpacity="0.62"
          strokeWidth="5"
          strokeLinecap="round"
        />
      </svg>

      {/* FLUTED GROOVES */}

      <div
        aria-hidden
        className="
          pointer-events-none

          absolute
          bottom-10
          left-8

          z-0

          flex
          items-end

          gap-[10px]
        "
      >
        {[88, 110, 96, 76].map((height, index) => (
          <span
            key={index}
            className="
                w-[7px]

                rounded-full

                bg-[#E9DDCB]

                shadow-[inset_1px_1px_1px_rgba(255,255,255,0.55)]
              "
            style={{
              height: `${height}px`,
            }}
          />
        ))}
      </div>
    </>
  );
}

/* =========================================================
   MOBILE CURVES
========================================================= */

function MobileCurves() {
  return (
    <>
      <svg
        aria-hidden
        viewBox="0 0 400 240"
        preserveAspectRatio="none"
        className="
          pointer-events-none

          absolute
          left-0
          top-0

          z-0

          h-[26%]
          w-full
        "
      >
        <path
          d="
            M0 0
            H400
            V58

            C345 45
             303 64
             270 94

            C236 125
             184 142
             125 145

            C76 148
             38 158
             0 184

            Z
          "
          fill="#F8F2E9"
        />
      </svg>

      <svg
        aria-hidden
        viewBox="0 0 400 220"
        preserveAspectRatio="none"
        className="
          pointer-events-none

          absolute
          bottom-0
          right-0

          z-0

          h-[13%]
          w-[72%]
        "
      >
        <path
          d="
            M400 220

            H0

            C42 183
             84 170
             134 170

            C197 170
             236 145
             274 113

            C311 82
             355 61
             400 56

            Z
          "
          fill="#F4ECE1"
        />
      </svg>
    </>
  );
}
