import { Building2, Check, Ruler, Sofa, Sparkles } from "lucide-react";

import ClayButton from "@/components/ui/ClayButton";

/* =========================================================
   DATA
========================================================= */

const londonHomeTypes = [
  "London Apartments",
  "Period Properties",
  "Unusual Layouts",
  "Space-Conscious Rooms",
];

/* =========================================================
   ROOT
========================================================= */

export default function BespokeSofasForLondonHomesSection() {
  return (
    <section
      aria-labelledby="bespoke-sofas-london-heading"
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
      <SectionBackground />

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

              lg:min-h-[730px]
              lg:rounded-[41px]
              lg:px-10
              lg:py-10

              xl:px-12
              xl:py-12
            "
          >
            <ArchitecturalBackground />

            {/* =================================================
                MAIN GRID
            ================================================== */}

            <div
              className="
                relative
                z-20

                grid

                gap-9

                lg:min-h-[630px]
                lg:grid-cols-[1.08fr_0.92fr]
                lg:items-center
                lg:gap-12

                xl:gap-16
              "
            >
              {/* =================================================
                  VISUAL
              ================================================== */}

              <div
                className="
                  order-2

                  lg:order-1
                "
              >
                <LondonRoomFitVisual />
              </div>

              {/* =================================================
                  COPY
              ================================================== */}

              <div
                className="
                  order-1

                  relative
                  z-30

                  lg:order-2
                  lg:pr-3

                  xl:pr-7
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
                    Made for London Living
                  </span>
                </div>

                {/* H2 */}

                <h2
                  id="bespoke-sofas-london-heading"
                  className="
                    mt-5

                    max-w-[640px]

                    font-brand-display

                    text-[39px]
                    font-semibold
                    leading-[0.97]

                    tracking-[-0.04em]

                    text-[var(--brand-navy)]

                    min-[390px]:text-[43px]

                    sm:text-[50px]

                    lg:text-[clamp(48px,4.15vw,64px)]
                  "
                >
                  Bespoke Sofas for
                  <br className="hidden xl:block" />
                  London Homes
                  <span className="text-[var(--brand-gold)]">.</span>
                </h2>

                {/* INTRO */}

                <p
                  className="
                    mt-6

                    max-w-[550px]

                    font-brand-display

                    text-[20px]
                    font-medium
                    italic
                    leading-[1.38]

                    text-[var(--brand-navy)]

                    sm:text-[21px]

                    lg:text-[22px]
                  "
                >
                  Finding the right sofa is often harder than finding one you
                  like.
                </p>

                {/* PROBLEM LINES */}

                <div
                  className="
                    mt-6

                    space-y-2.5
                  "
                >
                  <ProblemLine>
                    The width may work but the depth does not.
                  </ProblemLine>

                  <ProblemLine>
                    The style may be right but the fabric is wrong.
                  </ProblemLine>

                  <ProblemLine>
                    Or a room may need proportions that simply are not available
                    from standard collections.
                  </ProblemLine>
                </div>

                {/* KEY MESSAGE */}

                <div
                  className="
                    clay-surface-soft

                    mt-6

                    rounded-[24px]

                    p-[5px]
                  "
                >
                  <div
                    className="
                      clay-inset

                      relative
                      overflow-hidden

                      rounded-[19px]

                      px-5
                      py-5
                    "
                  >
                    <div
                      aria-hidden
                      className="
                        absolute

                        -bottom-[65px]
                        -right-[45px]

                        h-[130px]
                        w-[110px]

                        rounded-t-[50%]

                        border-[10px]
                        border-[#E9DDCC]/50
                      "
                    />

                    <div
                      className="
                        relative
                        z-10
                      "
                    >
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
                        The Bespoke Difference
                      </span>

                      <p
                        className="
                          mt-2

                          font-brand-display

                          text-[21px]
                          font-semibold
                          leading-[1.26]

                          text-[var(--brand-navy)]

                          sm:text-[23px]
                        "
                      >
                        A bespoke sofa gives you more control over those
                        decisions.
                      </p>
                    </div>
                  </div>
                </div>

                {/* BODY */}

                <div
                  className="
                    mt-6

                    max-w-[565px]

                    space-y-4

                    font-brand-sans

                    text-[12px]
                    font-medium
                    leading-[1.75]

                    text-[var(--brand-text-muted)]

                    sm:text-[13px]

                    lg:text-[14px]
                  "
                >
                  <p>
                    Instead of adapting the room around a sofa, the sofa can be
                    developed around the room.
                  </p>

                  <p>
                    That makes custom-made seating particularly useful for
                    apartments, period properties, unusual layouts and interiors
                    where every centimetre matters.
                  </p>
                </div>

                {/* TAGS */}

                <div
                  className="
                    mt-6

                    flex
                    flex-wrap

                    gap-2
                  "
                >
                  {londonHomeTypes.map((item) => (
                    <span
                      key={item}
                      className="
                        clay-surface-soft

                        rounded-full

                        px-3
                        py-2

                        font-brand-sans

                        text-[7px]
                        font-bold
                        uppercase

                        tracking-[0.11em]

                        text-[var(--brand-navy)]
                      "
                    >
                      {item}
                    </span>
                  ))}
                </div>

                {/* CTA */}

                <div
                  className="
                    mt-7

                    sm:w-fit

                    lg:mt-8
                  "
                >
                  <ClayButton
                    href="/contact-us"
                    variant="gold"
                    size="lg"
                    showArrow
                    className="max-sm:w-full"
                  >
                    Discuss a Bespoke Sofa
                  </ClayButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   PROBLEM LINE
========================================================= */

function ProblemLine({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="
        flex
        items-start

        gap-3
      "
    >
      <span
        className="
          mt-[8px]

          h-[5px]
          w-[5px]

          shrink-0

          rounded-full

          bg-[var(--brand-gold)]
        "
      />

      <p
        className="
          font-brand-sans

          text-[12px]
          font-medium
          leading-[1.65]

          text-[var(--brand-text-muted)]

          sm:text-[13px]
        "
      >
        {children}
      </p>
    </div>
  );
}

/* =========================================================
   LONDON ROOM FIT VISUAL
========================================================= */

function LondonRoomFitVisual() {
  return (
    <div
      className="
        relative

        mx-auto

        min-h-[590px]
        w-full
        max-w-[720px]

        sm:min-h-[650px]

        lg:min-h-[640px]
      "
    >
      {/* =====================================================
          MAIN ARCH
      ====================================================== */}

      <div
        className="
          clay-surface-strong

          absolute

          inset-x-[2%]
          bottom-[26px]
          top-0

          rounded-t-[48%]
          rounded-b-[32px]

          p-[7px]

          sm:inset-x-[5%]
          sm:p-[9px]
        "
      >
        <div
          className="
            clay-inset

            relative

            h-full

            overflow-hidden

            rounded-t-[47%]
            rounded-b-[25px]

            bg-[linear-gradient(180deg,#EEE2D2_0%,#F7F0E5_52%,#E5D6C1_100%)]
          "
        >
          {/* ===============================================
              LONDON WINDOW
          ================================================ */}

          <div
            className="
              absolute

              left-1/2
              top-[8%]

              h-[30%]
              w-[31%]

              -translate-x-1/2

              rounded-t-[48%]

              border-[7px]
              border-[#E6D9C7]

              bg-[linear-gradient(180deg,#D8DEE0_0%,#EEF0ED_55%,#DED8CD_100%)]

              shadow-[inset_0_8px_18px_rgba(53,65,72,0.08)]
            "
          >
            <div
              className="
                absolute
                left-1/2
                top-0

                h-full
                w-px

                -translate-x-1/2

                bg-[#B8AE9F]/70
              "
            />

            <div
              className="
                absolute
                left-0
                top-[54%]

                h-px
                w-full

                bg-[#B8AE9F]/70
              "
            />

            {/* skyline */}

            <svg
              aria-hidden
              viewBox="0 0 200 110"
              preserveAspectRatio="none"
              className="
                absolute
                inset-x-[5%]
                bottom-[4%]

                h-[52%]
                w-[90%]
              "
            >
              <path
                d="
                  M0 110
                  V77
                  H20
                  V55
                  H35
                  V68
                  H52
                  V43
                  H67
                  V62
                  H86
                  V34
                  H98
                  V66
                  H116
                  V51
                  H132
                  V72
                  H151
                  V46
                  H166
                  V65
                  H183
                  V54
                  H200
                  V110
                  Z
                "
                fill="#6A7680"
                opacity="0.32"
              />
            </svg>
          </div>

          {/* ===============================================
              PERIOD WALL DETAILS
          ================================================ */}

          <div
            className="
              absolute

              left-[8%]
              right-[8%]
              top-[43%]

              h-px

              bg-[#D3C3AD]/65
            "
          />

          <div
            className="
              absolute

              bottom-[15%]
              left-[7%]
              right-[7%]

              h-[12%]

              rounded-[22px]

              border
              border-[#D5C6B1]/60
            "
          />

          {/* ===============================================
              FLOOR
          ================================================ */}

          <svg
            aria-hidden
            viewBox="0 0 700 240"
            preserveAspectRatio="none"
            className="
              pointer-events-none

              absolute
              inset-x-0
              bottom-0

              h-[38%]
              w-full
            "
          >
            <path
              d="
                M0 240
                V103
                L350 18
                L700 103
                V240
                Z
              "
              fill="#E3D5C1"
              opacity="0.62"
            />

            <g fill="none" stroke="#C7B49C" strokeWidth="1.5" opacity="0.32">
              <path d="M350 18 L105 240" />
              <path d="M350 18 L220 240" />
              <path d="M350 18 L480 240" />
              <path d="M350 18 L595 240" />

              <path d="M80 132 H620" />
              <path d="M38 178 H662" />
            </g>
          </svg>

          {/* ===============================================
              ROOM DIMENSIONS
          ================================================ */}

          <svg
            aria-hidden
            viewBox="0 0 700 620"
            preserveAspectRatio="none"
            className="
              pointer-events-none

              absolute
              inset-0

              h-full
              w-full
            "
          >
            {/* WIDTH */}

            <line
              x1="112"
              y1="490"
              x2="588"
              y2="490"
              stroke="#D7A04A"
              strokeWidth="2"
            />

            <line
              x1="112"
              y1="478"
              x2="112"
              y2="502"
              stroke="#D7A04A"
              strokeWidth="2"
            />

            <line
              x1="588"
              y1="478"
              x2="588"
              y2="502"
              stroke="#D7A04A"
              strokeWidth="2"
            />

            {/* DEPTH */}

            <line
              x1="585"
              y1="330"
              x2="585"
              y2="465"
              stroke="#D7A04A"
              strokeWidth="2"
            />

            <line
              x1="575"
              y1="330"
              x2="595"
              y2="330"
              stroke="#D7A04A"
              strokeWidth="2"
            />

            <line
              x1="575"
              y1="465"
              x2="595"
              y2="465"
              stroke="#D7A04A"
              strokeWidth="2"
            />
          </svg>

          {/* ===============================================
              BESPOKE SOFA
          ================================================ */}

          <div
            className="
              absolute

              bottom-[17%]
              left-1/2

              z-10

              w-[82%]

              -translate-x-1/2
            "
          >
            <LondonSofaSvg />
          </div>

          {/* ===============================================
              DIMENSION LABEL
          ================================================ */}

          <div
            className="
              clay-surface-soft

              absolute

              bottom-[9%]
              left-1/2

              z-20

              -translate-x-1/2

              rounded-full

              px-4
              py-2
            "
          >
            <div
              className="
                flex
                items-center
                gap-2
              "
            >
              <Ruler
                size={11}
                strokeWidth={1.5}
                className="
                  text-[var(--brand-gold-700)]
                "
              />

              <span
                className="
                  whitespace-nowrap

                  font-brand-sans

                  text-[6px]
                  font-bold
                  uppercase

                  tracking-[0.16em]

                  text-[var(--brand-navy)]

                  sm:text-[7px]
                "
              >
                Developed Around the Room
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          LONDON BADGE
      ====================================================== */}

      <div
        className="
          clay-surface-strong

          absolute

          left-0
          top-[18%]

          z-30

          rounded-[22px]

          p-[5px]
        "
      >
        <div
          className="
            clay-inset

            flex
            items-center
            gap-3

            rounded-[17px]

            px-3
            py-3

            sm:px-4
          "
        >
          <div
            className="
              flex
              h-10
              w-10

              items-center
              justify-center

              rounded-full

              bg-[var(--brand-navy)]

              text-[var(--brand-gold)]
            "
          >
            <Building2 size={16} strokeWidth={1.5} />
          </div>

          <div>
            <span
              className="
                block

                font-brand-sans

                text-[6px]
                font-bold
                uppercase

                tracking-[0.15em]

                text-[var(--brand-gold-700)]
              "
            >
              Designed for
            </span>

            <strong
              className="
                mt-0.5
                block

                font-brand-display

                text-[15px]
                font-semibold

                text-[var(--brand-navy)]
              "
            >
              London Homes
            </strong>
          </div>
        </div>
      </div>

      {/* =====================================================
          FIT BADGE
      ====================================================== */}

      <div
        className="
          clay-surface-strong

          absolute

          right-0
          top-[40%]

          z-30

          rounded-[22px]

          p-[5px]
        "
      >
        <div
          className="
            clay-inset

            flex
            items-center
            gap-2.5

            rounded-[17px]

            px-3
            py-3
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

              bg-[var(--brand-gold)]

              text-[var(--brand-navy)]
            "
          >
            <Check size={16} strokeWidth={1.8} />
          </div>

          <div>
            <span
              className="
                block

                font-brand-sans

                text-[6px]
                font-bold
                uppercase

                tracking-[0.15em]

                text-[var(--brand-gold-700)]
              "
            >
              Better Fit
            </span>

            <span
              className="
                mt-0.5
                block

                font-brand-display

                text-[14px]
                font-semibold

                text-[var(--brand-navy)]
              "
            >
              Every cm matters.
            </span>
          </div>
        </div>
      </div>

      {/* =====================================================
          GOLD ORBIT
      ====================================================== */}

      <svg
        aria-hidden
        viewBox="0 0 500 500"
        className="
          pointer-events-none

          absolute

          -right-[2%]
          -top-[3%]

          z-10

          h-[42%]
          w-[42%]
        "
      >
        <path
          d="
            M58 408

            C85 209
             211 76
             410 67
          "
          fill="none"
          stroke="#D7A04A"
          strokeWidth="2"
        />

        <circle cx="410" cy="67" r="13" fill="#D7A04A" />
      </svg>
    </div>
  );
}

/* =========================================================
   SOFA SVG
========================================================= */

function LondonSofaSvg() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 650 250"
      className="
        h-auto
        w-full

        overflow-visible

        drop-shadow-[0_22px_20px_rgba(8,20,34,0.23)]
      "
    >
      <defs>
        <linearGradient id="londonSofaNavy" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#385975" />

          <stop offset="35%" stopColor="#21415E" />

          <stop offset="72%" stopColor="#122D47" />

          <stop offset="100%" stopColor="#081827" />
        </linearGradient>

        <linearGradient id="londonSofaGold" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#93601D" />

          <stop offset="50%" stopColor="#E4B964" />

          <stop offset="100%" stopColor="#93601D" />
        </linearGradient>
      </defs>

      {/* SHADOW */}

      <ellipse
        cx="325"
        cy="218"
        rx="250"
        ry="19"
        fill="#0B1929"
        opacity="0.17"
      />

      {/* BACK */}

      <path
        d="
          M116 130

          C120 73
           162 46
           220 46

          H430

          C488 46
           530 73
           534 130

          C443 110
           207 110
           116 130

          Z
        "
        fill="url(#londonSofaNavy)"
      />

      {/* CHANNELS */}

      <g fill="none" stroke="#5B768D" strokeWidth="2.5" opacity="0.38">
        <path d="M177 66 Q168 95 173 119" />
        <path d="M223 53 Q216 87 220 113" />
        <path d="M273 48 Q268 83 271 110" />
        <path d="M325 47 V109" />
        <path d="M377 48 Q382 83 379 110" />
        <path d="M427 53 Q434 87 430 113" />
        <path d="M473 66 Q482 95 477 119" />
      </g>

      {/* SEAT */}

      <path
        d="
          M100 120

          C121 108
           154 106
           186 108

          H464

          C496 106
           529 108
           550 120

          L538 190

          C454 203
           196 203
           112 190

          Z
        "
        fill="url(#londonSofaNavy)"
      />

      {/* LEFT ARM */}

      <path
        d="
          M110 110

          C74 108
           54 133
           59 163

          C64 194
           90 205
           124 193

          L142 119

          C132 113
           121 111
           110 110

          Z
        "
        fill="url(#londonSofaNavy)"
      />

      {/* RIGHT ARM */}

      <path
        d="
          M540 110

          C576 108
           596 133
           591 163

          C586 194
           560 205
           526 193

          L508 119

          C518 113
           529 111
           540 110

          Z
        "
        fill="url(#londonSofaNavy)"
      />

      {/* CUSHIONS */}

      <rect
        x="400"
        y="107"
        width="72"
        height="57"
        rx="18"
        fill="#E9DDCB"
        transform="rotate(7 436 135)"
      />

      <rect
        x="176"
        y="109"
        width="67"
        height="53"
        rx="17"
        fill="#C9B98D"
        opacity="0.86"
        transform="rotate(-6 210 135)"
      />

      {/* GOLD BASE */}

      <path
        d="
          M118 193

          C210 204
           440 204
           532 193
        "
        fill="none"
        stroke="url(#londonSofaGold)"
        strokeWidth="7"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* =========================================================
   ARCHITECTURAL BACKGROUND
========================================================= */

function ArchitecturalBackground() {
  return (
    <>
      {/* ===================================================
          TOP LEFT LAYER
      ==================================================== */}

      <svg
        aria-hidden
        viewBox="0 0 900 360"
        preserveAspectRatio="none"
        className="
          pointer-events-none

          absolute
          left-0
          top-0

          z-0

          hidden

          h-[320px]
          w-[56%]

          lg:block
        "
      >
        <path
          d="
            M0 0
            H670

            C584 33
             535 89
             516 150

            C496 216
             449 250
             367 269

            C238 299
             116 277
             0 235

            Z
          "
          fill="#F2E8DA"
          opacity="0.74"
        />

        <path
          d="
            M0 246

            C120 287
             241 306
             370 278

            C457 258
             503 217
             522 155
          "
          fill="none"
          stroke="#FFFDF8"
          strokeWidth="6"
          opacity="0.65"
        />
      </svg>

      {/* ===================================================
          RIGHT ARCH
      ==================================================== */}

      <div
        aria-hidden
        className="
          pointer-events-none

          absolute

          -right-[100px]
          bottom-[5%]

          z-0

          hidden

          h-[360px]
          w-[250px]

          rounded-l-[50%]

          border-[16px]
          border-[#E8DCCB]/35

          lg:block
        "
      />

      {/* ===================================================
          FLUTED DETAIL
      ==================================================== */}

      <div
        aria-hidden
        className="
          pointer-events-none

          absolute

          right-[3%]
          top-0

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

              rounded-b-full

              bg-[#E7DAC8]

              shadow-[inset_1px_0_1px_rgba(255,255,255,0.7)]
            "
          />
        ))}
      </div>
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

          bg-[linear-gradient(180deg,#F5F2EA_0%,#FFFDF8_48%,#EEE2D2_100%)]
        "
      />

      {/* GOLD RING */}

      <div
        className="
          absolute

          -left-[105px]
          top-[180px]

          hidden

          h-[240px]
          w-[240px]

          rounded-full

          border-[3px]
          border-[var(--brand-gold)]/40

          lg:block
        "
      />

      {/* IVORY SPHERE */}

      <div
        className="
          clay-sphere

          absolute

          -right-[42px]
          bottom-[90px]

          hidden

          h-[130px]
          w-[130px]

          lg:block
        "
      >
        <div className="clay-sphere-shadow" />
        <div className="clay-sphere-ball" />
      </div>
    </div>
  );
}
