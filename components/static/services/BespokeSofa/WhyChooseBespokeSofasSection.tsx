import {
  Armchair,
  Home,
  Ruler,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";

/* =========================================================
   DATA
========================================================= */

const benefits = [
  {
    number: "01",

    icon: Ruler,

    eyebrow: "Made to Fit",

    title: "Made to Fit",

    description:
      "Your sofa dimensions are developed around the actual space rather than predetermined by a standard catalogue or ready-made size.",

    secondary:
      "This is especially useful in London properties where alcoves, unusual layouts, period architecture and restricted room proportions can make standard sofas difficult to place.",
  },

  {
    number: "02",

    icon: SlidersHorizontal,

    eyebrow: "Designed Around You",

    title: "Designed Around You",

    description:
      "Choose the elements that matter to you — from dimensions, proportions and seating comfort to fabric, materials and finishing details.",

    secondary:
      "The objective is not to choose the closest available option. It is to create the right one.",
  },

  {
    number: "03",

    icon: Sparkles,

    eyebrow: "Greater Freedom",

    title: "Greater Design Freedom",

    description:
      "A bespoke sofa gives you the freedom to create a piece that complements the wider interior instead of designing the room around standard furniture.",
  },

  {
    number: "04",

    icon: Home,

    eyebrow: "Made for Everyday Life",

    title: "Made for the Way You Use Your Space",

    description:
      "A beautiful sofa still needs to work in everyday life. Comfort, seating requirements, available space and day-to-day use are considered alongside appearance.",

    secondary:
      "The result is a custom sofa designed to fit naturally into your everyday environment.",
  },
];

/* =========================================================
   ROOT
========================================================= */

export default function WhyChooseBespokeSofasSection() {
  return (
    <section
      aria-labelledby="why-choose-bespoke-heading"
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

              bg-[linear-gradient(145deg,#FFFDF8_0%,#F5EEE4_48%,#EDE0D0_100%)]

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

                mx-auto

                max-w-[850px]

                text-center
              "
            >
              <div
                className="
                  flex
                  items-center
                  justify-center
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

                    text-[11px]
                    font-bold
                    uppercase

                    tracking-[0.25em]

                    text-[var(--brand-gold-700)]

                    sm:text-[12px]
                  "
                >
                  Why Bespoke
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
                id="why-choose-bespoke-heading"
                className="
                  mt-5

                  font-brand-display

                  text-[39px]
                  font-semibold
                  leading-[0.97]

                  tracking-[-0.04em]

                  text-[var(--brand-navy)]

                  min-[390px]:text-[43px]

                  sm:text-[50px]

                  lg:text-[clamp(50px,4.5vw,68px)]
                "
              >
                Why Choose a Bespoke Sofa
                <span
                  className="
                    text-[var(--brand-gold)]
                  "
                >
                  ?
                </span>
              </h2>

              <p
                className="
                  mx-auto
                  mt-5

                  max-w-[650px]

                  font-brand-sans

                  text-[12px]
                  font-medium
                  leading-[1.75]

                  text-[var(--brand-text-muted)]

                  sm:text-[13px]

                  lg:text-[14px]
                "
              >
                Because the right sofa should respond to your room, your
                dimensions, your comfort preferences and the way you use the
                space — rather than forcing you to compromise around a standard
                design.
              </p>
            </div>

            <div className="relative z-20 mt-8 grid gap-5 lg:mt-10 lg:grid-cols-[1fr_0.85fr_1fr] lg:items-center">
              <div className="min-w-0 lg:col-start-1 lg:row-start-1">
                <BenefitCard item={benefits[0]} align="left" />
              </div>
              <div className="min-w-0 lg:col-start-3 lg:row-start-1">
                <BenefitCard item={benefits[1]} align="right" />
              </div>
              <div className="min-w-0 lg:col-start-1 lg:row-start-2">
                <BenefitCard item={benefits[2]} align="left" />
              </div>
              <div className="min-w-0 lg:col-start-3 lg:row-start-2">
                <BenefitCard item={benefits[3]} align="right" />
              </div>
              <div className="order-first mx-auto w-full min-w-0 max-w-[330px] lg:order-none lg:col-start-2 lg:row-start-1 lg:row-span-2">
                <CentralBespokeObject />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   DESKTOP BENEFIT CARD
========================================================= */

function BenefitCard({
  item,
  align,
}: {
  item: (typeof benefits)[number];

  align: "left" | "right";
}) {
  const Icon = item.icon;

  return (
    <article
      className="
        clay-surface-soft

        group

        rounded-[30px]

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

          min-h-[285px]

          overflow-hidden

          rounded-[24px]

          px-5 sm:px-6
          py-6

          xl:px-7
          xl:py-7
        "
      >
        <CardArchitecture align={align} />

        {/* TOP */}

        <div
          className="
            relative
            z-10

            flex
            items-start
            justify-between

            gap-5
          "
        >
          {/* ICON */}

          <div
            className="
              clay-surface-strong

              flex
              h-13
              w-13

              items-center
              justify-center

              rounded-full

              p-[5px]
            "
          >
            <div
              className="
                flex
                h-11
                w-11

                items-center
                justify-center

                rounded-full

                bg-[var(--brand-navy)]

                text-[var(--brand-gold)]
              "
            >
              <Icon size={19} strokeWidth={1.5} />
            </div>
          </div>

          <span
            className="
              font-brand-display

              text-[38px]
              leading-none

              text-[var(--brand-navy)]/[0.09]
            "
          >
            {item.number}
          </span>
        </div>

        {/* CONTENT */}

        <div
          className="
            relative
            z-10

            mt-7
          "
        >
          <span
            className="
              font-brand-sans

              text-[13px]
              font-bold
              uppercase

              tracking-[0.19em]

              text-[var(--brand-gold-700)]
            "
          >
            {item.eyebrow}
          </span>

          <h3
            className="
              mt-3

              max-w-[330px]

              font-brand-display

              text-[27px]
              font-semibold
              leading-[1.02]

              tracking-normal

              text-[var(--brand-navy)]

              xl:text-[29px]
            "
          >
            {item.title}
          </h3>

          <p
            className="
              mt-4

              font-brand-sans

              text-[13px]
              font-medium
              leading-[1.7]

              text-[var(--brand-text-muted)]

              xl:text-[12px]
            "
          >
            {item.description}
          </p>

          {item.secondary && (
            <p
              className="
                mt-3

                font-brand-sans

                text-[13px]
                leading-[1.65]

                text-[var(--brand-text-muted)]
              "
            >
              {item.secondary}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   CENTRAL OBJECT
========================================================= */

function CentralBespokeObject() {
  return (
    <div
      className="
        clay-surface-strong

        relative

        rounded-[42px]

        p-[7px]

        shadow-[0_25px_55px_rgba(91,72,47,0.16)]
      "
    >
      <div
        className="
          clay-dark

          relative

          overflow-hidden

          rounded-[35px]

          px-5
          pb-6
          pt-6
        "
      >
        {/* GOLD ORBIT */}

        <svg
          aria-hidden
          viewBox="0 0 400 400"
          className="
            pointer-events-none

            absolute

            -right-[75px]
            -top-[90px]

            h-[310px]
            w-[310px]

            opacity-70
          "
        >
          <circle
            cx="200"
            cy="200"
            r="138"
            fill="none"
            stroke="#D7A04A"
            strokeWidth="2"
          />

          <circle cx="317" cy="122" r="11" fill="#D7A04A" />
        </svg>

        {/* EYEBROW */}

        <div
          className="
            relative
            z-10

            flex
            items-center
            gap-3
          "
        >
          <Armchair
            size={15}
            strokeWidth={1.5}
            className="
              text-[var(--brand-gold)]
            "
          />

          <span
            className="
              font-brand-sans

              text-[11px]
              font-bold
              uppercase

              tracking-[0.18em]

              text-[var(--brand-gold)]
            "
          >
            The Bespoke Difference
          </span>
        </div>

        {/* HEADING */}

        <div
          className="
            relative
            z-10

            mt-6

            text-center
          "
        >
          <span
            className="
              font-brand-display

              text-[18px]
              italic

              text-white/80
            "
          >
            Not the closest option.
          </span>

          <h3
            className={`
              mt-2

              font-brand-display

              font-semibold
              leading-[0.95]

              tracking-normal

              text-white

              text-[34px] xl:text-[38px]
            `}
          >
            The Right
            <br />
            One
            <span
              className="
                text-[var(--brand-gold)]
              "
            >
              .
            </span>
          </h3>
        </div>

        {/* =================================================
            SCULPTURAL SOFA
        ================================================== */}

        <div
          className="
            relative
            z-10

            mt-6
          "
        >
          <CentralSofaSvg />
        </div>

        {/* =================================================
            VALUES
        ================================================== */}

        <div
          className="
            relative
            z-10

            mt-2

            grid
            grid-cols-3

            gap-2
          "
        >
          {["Fit", "Comfort", "Style"].map((item) => (
            <div
              key={item}
              className="
                  rounded-full

                  border
                  border-white/10

                  bg-white/[0.04]

                  px-2
                  py-2

                  text-center
                "
            >
              <span
                className="
                    font-brand-sans

                    text-[11px]
                    font-bold
                    uppercase

                    tracking-normal

                    text-white/85
                  "
              >
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   CENTRAL SOFA SVG
========================================================= */

function CentralSofaSvg() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 500 230"
      className="
        h-auto
        w-full

        overflow-visible

        drop-shadow-[0_20px_18px_rgba(0,0,0,0.30)]
      "
    >
      <defs>
        <linearGradient id="whyBespokeSofa" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3D5973" />

          <stop offset="36%" stopColor="#23435F" />

          <stop offset="70%" stopColor="#142E48" />

          <stop offset="100%" stopColor="#091927" />
        </linearGradient>

        <linearGradient id="whyBespokeGold" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#95601D" />

          <stop offset="50%" stopColor="#E4B760" />

          <stop offset="100%" stopColor="#95601D" />
        </linearGradient>
      </defs>

      {/* SHADOW */}

      <ellipse cx="250" cy="200" rx="190" ry="15" fill="#000" opacity="0.3" />

      {/* BACK */}

      <path
        d="
          M102 125

          C107 74
           140 50
           188 50

          H312

          C360 50
           393 74
           398 125

          C325 110
           175 110
           102 125

          Z
        "
        fill="url(#whyBespokeSofa)"
      />

      {/* CHANNELS */}

      <g fill="none" stroke="#59738A" strokeWidth="2.2" opacity="0.42">
        <path d="M158 68 Q151 93 154 116" />
        <path d="M203 56 Q198 86 200 111" />
        <path d="M250 53 V109" />
        <path d="M297 56 Q302 86 300 111" />
        <path d="M342 68 Q349 93 346 116" />
      </g>

      {/* SEAT */}

      <path
        d="
          M92 116

          C113 106
           147 107
           175 108

          H325

          C353 107
           387 106
           408 116

          L398 174

          C325 185
           175 185
           102 174

          Z
        "
        fill="url(#whyBespokeSofa)"
      />

      {/* LEFT ARM */}

      <path
        d="
          M106 108

          C76 105
           57 125
           61 150

          C65 176
           85 187
           116 177

          L132 116

          C123 111
           115 109
           106 108

          Z
        "
        fill="url(#whyBespokeSofa)"
      />

      {/* RIGHT ARM */}

      <path
        d="
          M394 108

          C424 105
           443 125
           439 150

          C435 176
           415 187
           384 177

          L368 116

          C377 111
           385 109
           394 108

          Z
        "
        fill="url(#whyBespokeSofa)"
      />

      {/* GOLD BASE */}

      <path
        d="
          M106 177

          C177 187
           323 187
           394 177
        "
        fill="none"
        stroke="url(#whyBespokeGold)"
        strokeWidth="7"
        strokeLinecap="round"
      />

      {/* CUSHION */}

      <rect
        x="301"
        y="103"
        width="61"
        height="48"
        rx="15"
        fill="#EFE2CE"
        transform="rotate(7 331 127)"
      />
    </svg>
  );
}

/* =========================================================
   CARD ARCHITECTURE
========================================================= */

function CardArchitecture({ align }: { align: "left" | "right" }) {
  return (
    <div
      aria-hidden
      className={`
        absolute

        -bottom-[95px]

        h-[205px]
        w-[160px]

        rounded-t-[50%]

        border-[13px]
        border-[#E9DDCC]/45

        ${align === "left" ? "-right-[50px]" : "-left-[50px]"}
      `}
    />
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
        viewBox="0 0 1400 300"
        preserveAspectRatio="none"
        className="
          pointer-events-none

          absolute
          left-0
          top-0

          z-0

          hidden

          h-[250px]
          w-full

          lg:block
        "
      >
        <path
          d="
            M0 0

            H1400

            V68

            C1250 34
             1115 45
             1030 111

            C920 196
             774 199
             680 147

            C591 98
             472 71
             343 88

            C206 107
             107 70
             0 32

            Z
          "
          fill="#F3EADD"
          opacity="0.65"
        />

        <path
          d="
            M0 49

            C107 82
             215 116
             342 99

            C469 83
             584 106
             680 157

            C780 210
             925 207
             1035 122

            C1122 55
             1250 47
             1400 80
          "
          fill="none"
          stroke="#FFFDF8"
          strokeWidth="6"
          opacity="0.55"
        />
      </svg>

      {/* SIDE FLUTES */}

      <div
        aria-hidden
        className="
          pointer-events-none

          absolute
          right-[3%]
          top-0

          z-0

          hidden

          h-[165px]

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

                bg-[#E7DAC9]
              "
          />
        ))}
      </div>
    </>
  );
}
