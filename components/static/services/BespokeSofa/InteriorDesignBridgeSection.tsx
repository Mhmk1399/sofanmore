import {
  Armchair,
  Layers3,
  LayoutTemplate,
  Palette,
  Sparkles,
} from "lucide-react";

import ClayButton from "@/components/ui/ClayButton";

/* =========================================================
   DATA
========================================================= */

const interiorElements = [
  {
    icon: Armchair,
    label: "Bespoke Sofa",
  },

  {
    icon: LayoutTemplate,
    label: "Layout",
  },

  {
    icon: Layers3,
    label: "Materials",
  },

  {
    icon: Palette,
    label: "Finishes",
  },
];

/* =========================================================
   ROOT
========================================================= */

export default function InteriorDesignBridgeSection() {
  return (
    <section
      aria-labelledby="interior-design-bridge-heading"
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

              bg-[linear-gradient(145deg,#FFFDF8_0%,#F5EEE4_48%,#EADCCB_100%)]

              px-4
              py-6

              sm:rounded-[35px]
              sm:px-6
              sm:py-8

              lg:min-h-[720px]
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

                lg:min-h-[620px]
                lg:grid-cols-[0.88fr_1.12fr]
                lg:items-center
                lg:gap-12

                xl:gap-16
              "
            >
              {/* =================================================
                  CONTENT
              ================================================== */}

              <div
                className="
                  relative
                  z-20

                  lg:pl-3

                  xl:pl-6
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
                    Beyond a Single Piece
                  </span>
                </div>

                {/* H2 */}

                <h2
                  id="interior-design-bridge-heading"
                  className="
                    mt-5

                    max-w-[650px]

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
                  Designed to Work
                  <br className="hidden sm:block" />
                  With the Rest of
                  <br className="hidden xl:block" />
                  Your Interior
                  <span
                    className="
                      text-[var(--brand-gold)]
                    "
                  >
                    .
                  </span>
                </h2>

                {/* INTRO */}

                <p
                  className="
                    mt-6

                    max-w-[535px]

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
                  Sometimes one bespoke piece is all a room needs.
                </p>

                {/* BODY */}

                <div
                  className="
                    mt-6

                    max-w-[565px]

                    space-y-4

                    font-brand-sans

                    text-[12px]
                    font-medium
                    leading-[1.78]

                    text-[var(--brand-text-muted)]

                    sm:text-[13px]

                    lg:text-[14px]
                  "
                >
                  <p>
                    Other projects require seating, materials, layout and
                    finishes to work together as part of a complete interior.
                  </p>

                  <p>
                    If your project extends beyond a single bespoke piece, our
                    Interior Design service can help develop a more complete
                    environment around the way you want the space to look, feel
                    and function.
                  </p>
                </div>

                {/* =================================================
                    DESIGN SHIFT
                ================================================== */}

                <div
                  className="
                    clay-surface-soft

                    mt-7

                    rounded-[25px]
                    p-[5px]
                  "
                >
                  <div
                    className="
                      clay-inset

                      relative
                      overflow-hidden

                      rounded-[20px]

                      px-5
                      py-5
                    "
                  >
                    <div
                      aria-hidden
                      className="
                        absolute

                        -bottom-[70px]
                        -right-[45px]

                        h-[135px]
                        w-[110px]

                        rounded-t-[50%]

                        border-[10px]
                        border-[#E8DCCB]/48
                      "
                    />

                    <div
                      className="
                        relative
                        z-10

                        grid
                        grid-cols-[1fr_auto_1fr]

                        items-center
                        gap-3
                      "
                    >
                      <div>
                        <span
                          className="
                            font-brand-sans

                            text-[6px]
                            font-bold
                            uppercase

                            tracking-[0.16em]

                            text-[var(--brand-gold-700)]
                          "
                        >
                          Start With
                        </span>

                        <p
                          className="
                            mt-1.5

                            font-brand-display

                            text-[18px]
                            font-semibold
                            leading-[1.1]

                            text-[var(--brand-navy)]

                            sm:text-[20px]
                          "
                        >
                          One Bespoke Piece
                        </p>
                      </div>

                      <div
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
                        <Sparkles size={14} strokeWidth={1.5} />
                      </div>

                      <div className="text-right">
                        <span
                          className="
                            font-brand-sans

                            text-[6px]
                            font-bold
                            uppercase

                            tracking-[0.16em]

                            text-[var(--brand-gold-700)]
                          "
                        >
                          Expand Into
                        </span>

                        <p
                          className="
                            mt-1.5

                            font-brand-display

                            text-[18px]
                            font-semibold
                            leading-[1.1]

                            text-[var(--brand-navy)]

                            sm:text-[20px]
                          "
                        >
                          A Complete Interior
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* =================================================
                    ELEMENTS
                ================================================== */}

                <div
                  className="
                    mt-6

                    grid
                    grid-cols-2

                    gap-2

                    sm:grid-cols-4
                  "
                >
                  {interiorElements.map(({ icon: Icon, label }) => (
                    <div
                      key={label}
                      className="
                          clay-surface-soft

                          rounded-[17px]

                          p-[4px]
                        "
                    >
                      <div
                        className="
                            clay-inset

                            flex
                            min-h-[78px]

                            flex-col

                            items-center
                            justify-center

                            gap-2

                            rounded-[13px]

                            px-2
                            py-3

                            text-center
                          "
                      >
                        <Icon
                          size={15}
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

                              tracking-[0.1em]

                              text-[var(--brand-navy)]
                            "
                        >
                          {label}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* =================================================
                    CTA
                ================================================== */}

                <div
                  className="
                    mt-7

                    sm:w-fit

                    lg:mt-8
                  "
                >
                  <ClayButton
                    href="/services/interior-design"
                    variant="gold"
                    size="lg"
                    showArrow
                    className="max-sm:w-full"
                  >
                    Explore Interior Design
                  </ClayButton>
                </div>
              </div>

              {/* =================================================
                  INTERIOR VISUAL
              ================================================== */}

              <div
                className="
                  relative

                  min-h-[530px]

                  sm:min-h-[610px]

                  lg:min-h-[620px]
                "
              >
                <CompleteInteriorVisual />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   COMPLETE INTERIOR VISUAL
========================================================= */

function CompleteInteriorVisual() {
  return (
    <div
      className="
        relative

        h-full
        min-h-[530px]

        sm:min-h-[610px]

        lg:min-h-[620px]
      "
    >
      {/* =====================================================
          LARGE ARCH ROOM
      ====================================================== */}

      <div
        className="
          clay-surface-strong

          absolute

          inset-x-[2%]
          bottom-[28px]
          top-0

          rounded-t-[48%]
          rounded-b-[30px]

          p-[7px]

          sm:inset-x-[5%]
          sm:p-[9px]

          lg:inset-x-[2%]
        "
      >
        <div
          className="
            clay-inset

            relative
            h-full

            overflow-hidden

            rounded-t-[47%]
            rounded-b-[23px]

            bg-[linear-gradient(180deg,#EDE1D0_0%,#F7F0E5_54%,#DED0BC_100%)]
          "
        >
          {/* ===============================================
              WALL PANELS
          ================================================ */}

          <div
            className="
              absolute

              left-[8%]
              right-[8%]
              top-[11%]

              h-[39%]

              rounded-t-[46%]

              border
              border-[#D4C4AE]/70
            "
          />

          <div
            className="
              absolute

              left-1/2
              top-[11%]

              h-[39%]
              w-px

              -translate-x-1/2

              bg-[#D4C4AE]/55
            "
          />

          <div
            className="
              absolute

              left-[29%]
              top-[17%]

              h-[27%]
              w-px

              bg-[#D4C4AE]/40
            "
          />

          <div
            className="
              absolute

              right-[29%]
              top-[17%]

              h-[27%]
              w-px

              bg-[#D4C4AE]/40
            "
          />

          {/* ===============================================
              WALL ART
          ================================================ */}

          <div
            className="
              clay-surface-soft

              absolute

              left-1/2
              top-[19%]

              z-10

              h-[90px]
              w-[72px]

              -translate-x-1/2

              rounded-t-[36px]
              rounded-b-[8px]

              p-[4px]

              sm:h-[112px]
              sm:w-[88px]
            "
          >
            <div
              className="
                clay-inset

                relative
                h-full

                overflow-hidden

                rounded-t-[32px]
                rounded-b-[5px]
              "
            >
              <div
                className="
                  absolute

                  left-[22%]
                  top-[22%]

                  h-[45%]
                  w-[56%]

                  rounded-full

                  border-[2px]
                  border-[var(--brand-gold)]/45
                "
              />

              <div
                className="
                  absolute

                  bottom-[18%]
                  left-[31%]

                  h-[26%]
                  w-[38%]

                  rounded-t-full

                  bg-[var(--brand-navy)]/80
                "
              />
            </div>
          </div>

          {/* ===============================================
              FLOOR
          ================================================ */}

          <svg
            aria-hidden
            viewBox="0 0 700 260"
            preserveAspectRatio="none"
            className="
              pointer-events-none

              absolute
              bottom-0
              left-0

              h-[42%]
              w-full
            "
          >
            <path
              d="
                M0 260
                V112

                L350 22
                L700 112

                V260

                Z
              "
              fill="#DED0BC"
              opacity="0.68"
            />

            <g fill="none" stroke="#BFAA91" strokeWidth="1.5" opacity="0.28">
              <path d="M350 22 L70 260" />
              <path d="M350 22 L210 260" />
              <path d="M350 22 L490 260" />
              <path d="M350 22 L630 260" />

              <path d="M76 147 H624" />
              <path d="M35 200 H665" />
            </g>
          </svg>

          {/* ===============================================
              RUG
          ================================================ */}

          <div
            className="
              absolute

              bottom-[8%]
              left-1/2

              z-[2]

              h-[21%]
              w-[68%]

              -translate-x-1/2

              rounded-[50%]

              bg-[#D5C5AE]

              shadow-[inset_0_4px_10px_rgba(255,255,255,0.28),0_12px_25px_rgba(74,54,32,0.08)]
            "
          />

          {/* ===============================================
              SOFA
          ================================================ */}

          <div
            className="
              absolute

              bottom-[16%]
              left-1/2

              z-10

              w-[76%]

              -translate-x-1/2
            "
          >
            <InteriorSofaSvg />
          </div>

          {/* ===============================================
              SIDE TABLE
          ================================================ */}

          <div
            className="
              absolute

              bottom-[20%]
              right-[8%]

              z-10

              h-[62px]
              w-[68px]

              sm:h-[75px]
              sm:w-[80px]
            "
          >
            <div
              className="
                absolute
                left-1/2
                top-0

                h-[13px]
                w-full

                -translate-x-1/2

                rounded-full

                bg-[linear-gradient(90deg,#9A621B,#E1B45D,#925B18)]

                shadow-[0_7px_10px_rgba(90,58,18,0.17)]
              "
            />

            <div
              className="
                absolute
                left-1/2
                top-[11px]

                h-[48px]
                w-[5px]

                -translate-x-1/2

                rounded-full

                bg-[var(--brand-navy)]
              "
            />

            <div
              className="
                absolute
                bottom-0
                left-1/2

                h-[6px]
                w-[48px]

                -translate-x-1/2

                rounded-full

                bg-[var(--brand-navy)]
              "
            />
          </div>

          {/* ===============================================
              FLOOR LAMP
          ================================================ */}

          <div
            className="
              absolute

              bottom-[21%]
              left-[9%]

              z-10

              h-[190px]
              w-[80px]

              sm:h-[230px]
              sm:w-[95px]
            "
          >
            <div
              className="
                absolute

                left-[48%]
                top-[30%]

                h-[62%]
                w-[4px]

                -translate-x-1/2

                rounded-full

                bg-[var(--brand-navy)]
              "
            />

            <div
              className="
                absolute

                left-[48%]
                top-[8%]

                h-[52px]
                w-[72px]

                -translate-x-1/2

                rounded-t-[50%]
                rounded-b-[14px]

                bg-[#EADCC8]

                shadow-[inset_5px_5px_10px_rgba(255,255,255,0.35),0_8px_18px_rgba(59,44,27,0.12)]
              "
            />

            <div
              className="
                absolute

                bottom-0
                left-[48%]

                h-[7px]
                w-[48px]

                -translate-x-1/2

                rounded-full

                bg-[var(--brand-gold)]
              "
            />
          </div>

          {/* ===============================================
              INTERIOR LABEL
          ================================================ */}

          <div
            className="
              clay-surface-soft

              absolute

              bottom-[5%]
              left-1/2

              z-30

              -translate-x-1/2

              rounded-full

              px-4
              py-2
            "
          >
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
              Sofa · Layout · Materials · Finish
            </span>
          </div>
        </div>
      </div>

      {/* =====================================================
          FLOATING MATERIAL PALETTE
      ====================================================== */}

      <div
        className="
          clay-surface-strong

          absolute

          left-0
          top-[22%]

          z-30

          rounded-[22px]

          p-[5px]
        "
      >
        <div
          className="
            clay-inset

            rounded-[17px]

            px-3
            py-3
          "
        >
          <div
            className="
              flex
              items-center
              gap-2.5
            "
          >
            <Layers3
              size={15}
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

                tracking-[0.14em]

                text-[var(--brand-navy)]
              "
            >
              Material Palette
            </span>
          </div>

          <div
            className="
              mt-3

              flex
              gap-2
            "
          >
            <span
              className="
                h-8
                w-8

                rounded-full

                bg-[var(--brand-navy)]

                shadow-[inset_2px_2px_4px_rgba(255,255,255,0.12)]
              "
            />

            <span
              className="
                h-8
                w-8

                rounded-full

                bg-[#D9C8B0]

                shadow-[inset_2px_2px_4px_rgba(255,255,255,0.45)]
              "
            />

            <span
              className="
                h-8
                w-8

                rounded-full

                bg-[#EEE5D8]

                shadow-[inset_2px_2px_4px_rgba(255,255,255,0.45)]
              "
            />

            <span
              className="
                h-8
                w-8

                rounded-full

                bg-[var(--brand-gold)]

                shadow-[inset_2px_2px_4px_rgba(255,255,255,0.25)]
              "
            />
          </div>
        </div>
      </div>

      {/* =====================================================
          COMPLETE INTERIOR BADGE
      ====================================================== */}

      <div
        className="
          clay-surface-strong

          absolute

          bottom-[3%]
          right-0

          z-30

          rounded-[23px]

          p-[5px]
        "
      >
        <div
          className="
            clay-dark

            flex
            items-center
            gap-3

            rounded-[18px]

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

              shrink-0

              items-center
              justify-center

              rounded-full

              bg-[var(--brand-gold)]

              text-[var(--brand-navy)]
            "
          >
            <Sparkles size={16} strokeWidth={1.5} />
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

                text-[var(--brand-gold)]
              "
            >
              Complete Approach
            </span>

            <strong
              className="
                mt-0.5
                block

                whitespace-nowrap

                font-brand-display

                text-[14px]
                font-semibold

                text-white
              "
            >
              One Considered Interior
            </strong>
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

          -right-[3%]
          -top-[4%]

          z-10

          h-[43%]
          w-[43%]
        "
      >
        <defs>
          <radialGradient id="interiorBridgeGoldBall" cx="30%" cy="25%" r="75%">
            <stop offset="0%" stopColor="#FFE8AE" />

            <stop offset="48%" stopColor="#D7A04A" />

            <stop offset="100%" stopColor="#935B18" />
          </radialGradient>
        </defs>

        <path
          d="
            M48 410

            C80 205
             207 77
             416 63
          "
          fill="none"
          stroke="#D7A04A"
          strokeWidth="2"
        />

        <circle cx="416" cy="63" r="14" fill="url(#interiorBridgeGoldBall)" />
      </svg>
    </div>
  );
}

/* =========================================================
   INTERIOR SOFA SVG
========================================================= */

function InteriorSofaSvg() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 650 250"
      className="
        h-auto
        w-full

        overflow-visible

        drop-shadow-[0_22px_20px_rgba(8,20,34,0.22)]
      "
    >
      <defs>
        <linearGradient id="interiorBridgeNavy" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3B5C78" />

          <stop offset="35%" stopColor="#22435F" />

          <stop offset="72%" stopColor="#122D47" />

          <stop offset="100%" stopColor="#081827" />
        </linearGradient>

        <linearGradient id="interiorBridgeGold" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#93601D" />

          <stop offset="50%" stopColor="#E4B963" />

          <stop offset="100%" stopColor="#93601D" />
        </linearGradient>
      </defs>

      {/* SHADOW */}

      <ellipse
        cx="325"
        cy="219"
        rx="245"
        ry="18"
        fill="#0B1929"
        opacity="0.16"
      />

      {/* BACK */}

      <path
        d="
          M118 130

          C122 74
           163 47
           221 47

          H429

          C487 47
           528 74
           532 130

          C443 111
           207 111
           118 130

          Z
        "
        fill="url(#interiorBridgeNavy)"
      />

      {/* CHANNELS */}

      <g fill="none" stroke="#5A758C" strokeWidth="2.4" opacity="0.36">
        <path d="M179 67 Q171 95 175 119" />
        <path d="M225 54 Q218 87 222 113" />
        <path d="M274 49 Q269 83 272 110" />
        <path d="M325 48 V109" />
        <path d="M376 49 Q381 83 378 110" />
        <path d="M425 54 Q432 87 428 113" />
        <path d="M471 67 Q479 95 475 119" />
      </g>

      {/* SEAT */}

      <path
        d="
          M102 120

          C123 108
           155 107
           187 109

          H463

          C495 107
           527 108
           548 120

          L536 189

          C451 202
           199 202
           114 189

          Z
        "
        fill="url(#interiorBridgeNavy)"
      />

      {/* LEFT ARM */}

      <path
        d="
          M112 110

          C77 108
           56 133
           61 162

          C66 193
           90 204
           125 192

          L143 119

          C133 113
           122 111
           112 110

          Z
        "
        fill="url(#interiorBridgeNavy)"
      />

      {/* RIGHT ARM */}

      <path
        d="
          M538 110

          C573 108
           594 133
           589 162

          C584 193
           560 204
           525 192

          L507 119

          C517 113
           528 111
           538 110

          Z
        "
        fill="url(#interiorBridgeNavy)"
      />

      {/* CUSHIONS */}

      <rect
        x="400"
        y="107"
        width="71"
        height="57"
        rx="18"
        fill="#E8DCC9"
        transform="rotate(7 435 135)"
      />

      <rect
        x="181"
        y="108"
        width="65"
        height="52"
        rx="17"
        fill="#CDBD8D"
        opacity="0.92"
        transform="rotate(-6 213 134)"
      />

      {/* GOLD BASE */}

      <path
        d="
          M120 192

          C210 203
           440 203
           530 192
        "
        fill="none"
        stroke="url(#interiorBridgeGold)"
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
      {/* TOP CURVE */}

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

          h-[280px]
          w-full

          lg:block
        "
      >
        <path
          d="
            M0 0

            H1400
            V72

            C1260 37
             1143 43
             1046 103

            C930 175
             802 193
             688 155

            C565 114
             449 79
             328 92

            C204 105
             91 79
             0 43

            Z
          "
          fill="#F2E8DA"
          opacity="0.68"
        />

        <path
          d="
            M0 58

            C110 88
             214 116
             330 103

            C449 90
             565 121
             688 163

            C808 204
             937 184
             1052 112

            C1148 53
             1265 52
             1400 84
          "
          fill="none"
          stroke="#FFFDF8"
          strokeWidth="6"
          opacity="0.56"
        />
      </svg>

      {/* RIGHT ARCH */}

      <div
        aria-hidden
        className="
          pointer-events-none

          absolute

          -right-[105px]
          bottom-[5%]

          z-0

          hidden

          h-[350px]
          w-[245px]

          rounded-l-[50%]

          border-[16px]
          border-[#E8DCCB]/34

          lg:block
        "
      />

      {/* FLUTED DETAIL */}

      <div
        aria-hidden
        className="
          pointer-events-none

          absolute

          left-[3%]
          bottom-0

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

          bg-[linear-gradient(180deg,#EEE2D2_0%,#FFFDF8_48%,#F5F2EA_100%)]
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

          -right-[43px]
          bottom-[100px]

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
