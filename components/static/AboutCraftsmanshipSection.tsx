import Image from "next/image";
import { Crown, Landmark } from "lucide-react";

import ClayButton from "@/components/ui/ClayButton";

/* =========================================================
   CONTENT
========================================================= */

const description =
  "Welcome to Sofa N More, where tradition meets innovation in bespoke sofa craftsmanship. Nestled in London, our family-owned business has been a cornerstone of the city’s interior design landscape for over a decade. We pride ourselves on blending timeless British craftsmanship with contemporary design to create sofa that embodies luxury, quality, and functionality.";

/* =========================================================
   ROOT
========================================================= */

export default function AboutCraftsmanshipSection() {
  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[var(--brand-ivory)]
        px-3
        py-10

        sm:px-5
        sm:py-12

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
        {/* DESKTOP */}
        <div className="hidden lg:block">
          <DesktopComposition />
        </div>

        {/* MOBILE */}
        <div className="lg:hidden">
          <MobileComposition />
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   DESKTOP
========================================================= */

function DesktopComposition() {
  return (
    <div
      className="
        clay-surface-strong
        relative
        overflow-hidden
        rounded-[48px]
        p-[9px]
      "
    >
      <div
        className="
          clay-inset
          relative
          h-[clamp(690px,51vw,790px)]
          overflow-hidden
          rounded-[40px]
          bg-[#F7F0E6]
        "
      >
        {/* =================================================
            REAL IMAGE AREA
        ================================================== */}

        <div
          className="
            absolute
            bottom-[5%]
            right-[3.5%]
            top-[6.5%]
            z-[2]
            w-[59%]
          "
        >
          <div
            className="
              clay-surface-strong
              relative
              h-full
              w-full
              overflow-hidden
              rounded-t-[44%]
              rounded-b-[34px]
              p-[9px]
            "
          >
            <div
              className="
                clay-inset
                relative
                h-full
                w-full
                overflow-hidden
                rounded-t-[43%]
                rounded-b-[27px]
                bg-[#DDD0BE]
              "
            >
              <Image
                src="https://sofanmore.s3.eu-west-2.amazonaws.com/Image/6.webp"
                alt="Sofa N More bespoke sofa craftsmanship in London"
                fill
                preload
                sizes="60vw"
                className="
                  object-cover
                  object-center
                "
              />

              {/* cinematic grading */}

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  bg-[linear-gradient(90deg,rgba(8,20,33,0.16)_0%,transparent_32%,transparent_75%,rgba(8,20,33,0.08)_100%)]
                "
              />

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  bg-[linear-gradient(180deg,rgba(8,20,33,0.10)_0%,transparent_30%,transparent_75%,rgba(8,20,33,0.14)_100%)]
                "
              />
            </div>
          </div>
        </div>

        {/* =================================================
            NAVY ORGANIC PANEL

            فقط یک S-CURVE نرم داریم.
        ================================================== */}

        <svg
          aria-hidden
          viewBox="0 0 1440 820"
          preserveAspectRatio="none"
          className="
            pointer-events-none
            absolute
            inset-0
            z-[5]
            h-full
            w-full
          "
        >
          <defs>
            <linearGradient id="navyAboutNew" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#091827" />

              <stop offset="48%" stopColor="#12253E" />

              <stop offset="100%" stopColor="#0A1A2C" />
            </linearGradient>

            <filter
              id="navyAboutShadowNew"
              x="-20%"
              y="-20%"
              width="150%"
              height="150%"
            >
              <feDropShadow
                dx="10"
                dy="12"
                stdDeviation="16"
                floodColor="#06111D"
                floodOpacity="0.24"
              />
            </filter>
          </defs>

          <path
            d="
              M48 52

              Q48 28
              78 28

              H603

              C666 28
              704 44
              724 83

              C744 122
              753 154
              790 174

              C755 189
              729 207
              710 231

              C680 268
              669 306
              669 350

              V490

              C669 552
              650 591
              616 616

              C581 642
              535 651
              482 651

              H78

              Q48 651
              48 620

              Z
            "
            fill="url(#navyAboutNew)"
            filter="url(#navyAboutShadowNew)"
          />

          {/* soft inner edge */}

          <path
            d="
              M67 68
              Q67 47
              90 47

              H596

              C651 47
              684 60
              702 94
            "
            fill="none"
            stroke="#FFFFFF"
            strokeOpacity="0.08"
            strokeWidth="3"
          />
        </svg>

        {/* =================================================
            NAVY CONTENT
        ================================================== */}

        <div
          className="
            absolute
            left-[6.2%]
            top-[7%]
            z-[30]
            w-[39%]
            max-w-[520px]
          "
        >
          {/* BRAND */}

          <div>
            <div
              className="
                flex
                items-center
                gap-2
                text-[var(--brand-gold)]
              "
            >
              <Crown size={16} strokeWidth={1.45} />

              <span
                className="
                  font-brand-display
                  text-[21px]
                  tracking-[0.18em]
                "
              >
                SNM
              </span>
            </div>

            <div
              className="
                mt-1
                font-brand-sans
                text-[13px]
                font-bold
                uppercase
                tracking-[0.26em]
                text-white/65
              "
            >
              Sofa N More · London
            </div>
          </div>

          {/* EYEBROW */}

          <div
            className="
              mt-11
              flex
              items-center
              gap-3
            "
          >
            <span
              className="
                h-px
                w-6
                bg-[var(--brand-gold)]
              "
            />

            <span
              className="
                font-brand-sans
                text-[12px]
                font-bold
                uppercase
                tracking-[0.27em]
                text-[var(--brand-gold)]
              "
            >
              About Sofa N More
            </span>
          </div>

          {/* TITLE */}

          <h2
            className="
              mt-7
              font-brand-display
              text-[clamp(45px,3.75vw,65px)]
              font-medium
              leading-[0.97]
              tracking-[-0.045em]
              text-[#FFFDF8]
            "
          >
            Crafting Bespoke
            <br />
            sofa with
            <br />
            London
            <br />
            Craftsmanship
            <span
              className="
                text-[var(--brand-gold)]
              "
            >
              .
            </span>
          </h2>

          <div
            className="
              mt-6
              h-[2px]
              w-14
              rounded-full
              bg-[var(--brand-gold)]
            "
          />

          {/* COPY */}

          <p
            className="
              mt-5
              max-w-[475px]
              font-brand-sans
              text-[12px]
              font-medium
              leading-[1.75]
              text-white/72

              xl:text-[13px]
            "
          >
            {description}
          </p>

          {/* CTA */}

          <div className="relative z-10 mt-6">
            <ClayButton href="/contact-us" variant="gold" size="lg" showArrow>
              Contact Us
            </ClayButton>
          </div>
        </div>

        {/* =================================================
            ARCH SCULPTURAL FRAME

            این لایه روی بالای عکس قرار می‌گیرد و
            حس قاب معماری ایجاد می‌کند.
        ================================================== */}

        {/* =================================================
            GOLD ORBIT
        ================================================== */}

        {/* =================================================
            BOTTOM FLOOR WAVE

            فقط یک curve بزرگ و آرام.
        ================================================== */}

        <svg
          aria-hidden
          viewBox="0 0 1440 190"
          preserveAspectRatio="none"
          className="
            pointer-events-none
            absolute
            bottom-0
            left-0
            z-[25]
            h-[23%]
            w-full
          "
        >
          <defs>
            <linearGradient
              id="aboutFloorWaveFixed"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stopColor="#FFFDF8" />

              <stop offset="100%" stopColor="#F0E6D8" />
            </linearGradient>

            <filter
              id="aboutFloorShadowFixed"
              x="-10%"
              y="-50%"
              width="120%"
              height="180%"
            >
              <feDropShadow
                dx="0"
                dy="-7"
                stdDeviation="8"
                floodColor="#A89478"
                floodOpacity="0.12"
              />
            </filter>
          </defs>

          <path
            d="
              M0 78

              C145 25
              244 28
              342 71

              C444 116
              514 122
              603 79

              C681 41
              740 35
              821 72

              C919 117
              1022 120
              1125 82

              C1235 41
              1337 42
              1440 67

              L1440 190
              L0 190
              Z
            "
            fill="url(#aboutFloorWaveFixed)"
            filter="url(#aboutFloorShadowFixed)"
          />

          {/* upper crisp clay highlight */}

          <path
            d="
              M0 78

              C145 25
              244 28
              342 71

              C444 116
              514 122
              603 79

              C681 41
              740 35
              821 72

              C919 117
              1022 120
              1125 82

              C1235 41
              1337 42
              1440 67
            "
            fill="none"
            stroke="#FFFDF8"
            strokeWidth="6"
          />
        </svg>

        {/* =================================================
            IVORY SPHERE
        ================================================== */}

        <div
          aria-hidden
          className="
            clay-sphere
            absolute
            bottom-[5.4%]
            left-[6%]
            z-[35]
            h-[105px]
            w-[105px]
          "
        >
          <div className="clay-sphere-shadow" />
          <div className="clay-sphere-ball" />
        </div>

        {/* gold base line */}

        <div
          aria-hidden
          className="
            absolute
            bottom-[3px]
            left-[3%]
            right-[3%]
            z-40
            h-[2px]
            rounded-full
            bg-[linear-gradient(90deg,transparent,#D7A04A_20%,#D7A04A_80%,transparent)]
          "
        />
      </div>
    </div>
  );
}

/* =========================================================
   MOBILE
========================================================= */

function MobileComposition() {
  return (
    <div
      className="
        clay-surface-strong
        mx-auto
        max-w-[430px]
        rounded-[36px]
        p-[7px]
      "
    >
      <div
        className="
          clay-inset
          relative
          overflow-hidden
          rounded-[29px]
          bg-[var(--brand-ivory-50)]
        "
      >
        {/* ===============================================
            NAVY TOP
        ================================================ */}

        <div
          className="
            relative
            z-10
            overflow-hidden
            bg-[var(--brand-navy)]
            px-5
            pb-32
            pt-6

            min-[390px]:pb-36
          "
        >
          {/* logo / menu */}

          <div
            className="
              flex
              items-start
              justify-between
            "
          >
            <div>
              <div
                className="
                  flex
                  items-center
                  gap-1.5
                  text-[var(--brand-gold)]
                "
              >
                <Crown size={13} strokeWidth={1.5} />

                <span
                  className="
                    font-brand-display
                    text-[15px]
                    tracking-[0.14em]
                  "
                >
                  SNM
                </span>
              </div>

              <p
                className="
                  mt-1
                  font-brand-sans
                  text-[13px]
                  uppercase
                  tracking-[0.2em]
                  text-white/60
                "
              >
                Sofa N More · London
              </p>
            </div>
          </div>

          {/* content */}

          <div className="mt-9">
            <p
              className="
                font-brand-sans
                text-[11px]
                font-bold
                uppercase
                tracking-[0.24em]
                text-[var(--brand-gold)]
              "
            >
              About Sofa N More
            </p>

            <h2
              className="
                mt-4
                font-brand-display
                text-[38px]
                font-medium
                leading-[0.98]
                tracking-[-0.035em]
                text-white

                min-[390px]:text-[42px]
              "
            >
              Crafting Bespoke
              <br />
              sofa with
              <br />
              London
              <br />
              Craftsmanship
              <span
                className="
                  text-[var(--brand-gold)]
                "
              >
                .
              </span>
            </h2>

            <div
              className="
                mt-4
                h-[2px]
                w-12
                bg-[var(--brand-gold)]
              "
            />

            <p
              className="
                mt-4
                font-brand-sans
                text-[11px]
                font-medium
                leading-[1.65]
                text-white/70
              "
            >
              {description}
            </p>

            <div className="relative z-30 mt-5">
              <ClayButton href="/contact-us" variant="gold" size="md" showArrow>
                Contact Us
              </ClayButton>
            </div>
          </div>
        </div>

        {/* ===============================================
            MOBILE WAVE

            این لایه مرز بین navy و image را موجی می‌کند.
        ================================================ */}

        <svg
          aria-hidden
          viewBox="0 0 430 100"
          preserveAspectRatio="none"
          className="
            pointer-events-none
            absolute
            left-0
            top-[620px]
            z-20
            h-[88px]
            w-full

            min-[390px]:top-[650px]
          "
        >
          <path
            d="
              M0 44
              C70 12 122 10 170 38
              C216 65 254 58 290 34
              C336 4 385 17 430 28
              L430 100
              L0 100
              Z
            "
            fill="#F5F2EA"
          />

          <path
            d="
              M0 44
              C70 12 122 10 170 38
              C216 65 254 58 290 34
              C336 4 385 17 430 28
            "
            fill="none"
            stroke="#FFFDF8"
            strokeWidth="5"
          />
        </svg>

        {/* ===============================================
            BADGE
        ================================================ */}

        <div
          className="
            relative
            z-30
            mx-4
            -mt-[66px]
          "
        >
          <div
            className="
              clay-surface-strong
              mx-auto
              flex
              max-w-[250px]
              items-center
              gap-4
              rounded-[25px]
              p-[6px]
            "
          >
            <div
              className="
                clay-inset
                flex
                w-full
                items-center
                gap-4
                rounded-[20px]
                px-4
                py-3
              "
            >
              <div
                className="
                  clay-surface-strong
                  flex
                  h-14
                  w-14
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                "
              >
                <Crown
                  size={23}
                  strokeWidth={1.5}
                  className="
                    text-[var(--brand-gold-700)]
                  "
                />
              </div>

              <div>
                <p
                  className="
                    font-brand-sans
                    text-[11px]
                    font-bold
                    uppercase
                    tracking-[0.17em]
                    text-[var(--brand-navy)]
                  "
                >
                  Family-Owned
                </p>

                <div
                  className="
                    my-1.5
                    h-px
                    w-7
                    bg-[var(--brand-gold)]
                  "
                />

                <p
                  className="
                    font-brand-sans
                    text-[13px]
                    font-bold
                    uppercase
                    tracking-[0.16em]
                    text-[var(--brand-text-muted)]
                  "
                >
                  London Crafted
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ===============================================
            MOBILE IMAGE
        ================================================ */}

        <div
          className="
            relative
            z-10
           
            px-4
            pb-4
            pt-16
          "
        >
          <div
            className="
              clay-surface-strong
              rounded-t-[46%]
              rounded-b-[25px]
              p-[6px]
            "
          >
            <div
              className="
                clay-inset
                relative
                aspect-[0.86/1]
                overflow-hidden
                rounded-t-[45%]
                rounded-b-[20px]
              "
            >
              <Image
                src="https://sofanmore.s3.eu-west-2.amazonaws.com/Image/5.webp"
                alt="Sofa N More London bespoke craftsmanship"
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
                  bg-[linear-gradient(180deg,transparent_45%,rgba(7,19,31,0.15)_100%)]
                "
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   PAGE BACKGROUND
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
          bg-[linear-gradient(180deg,#fffdf8_0%,#f5f2ea_55%,#eadfce_100%)]
        "
      />

      <div
        className="
          clay-sphere
          absolute
          -left-[60px]
          bottom-[16%]
          hidden
          h-[150px]
          w-[150px]
          lg:block
        "
      >
        <div className="clay-sphere-shadow" />
        <div className="clay-sphere-ball" />
      </div>

      <div
        className="
          clay-sphere
          absolute
          right-[2%]
          top-[16%]
          hidden
          h-[28px]
          w-[28px]
          lg:block
        "
      >
        <div className="clay-sphere-ball clay-sphere-ball--gold" />
      </div>
    </div>
  );
}
