import { Armchair, Layers3, Palette, Ruler } from "lucide-react";
import Image from "next/image";

/* =========================================================
   DATA
========================================================= */

const designBenefits = [
  {
    icon: Ruler,
    title: "Proportion",
    description: "Dimensions developed around the space.",
  },
  {
    icon: Armchair,
    title: "Comfort",
    description: "Depth and form considered around how you live.",
  },
  {
    icon: Layers3,
    title: "Materials",
    description: "Greater freedom over materials and upholstery.",
  },
  {
    icon: Palette,
    title: "Finish",
    description: "Details and appearance tailored to the project.",
  },
];

/* =========================================================
   ROOT
========================================================= */

export default function CustomsofaForYourSpaceSection() {
  return (
    <section
      aria-labelledby="custom-sofa-space-heading"
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
        <div
          className="
            clay-surface-strong
            relative
            rounded-[34px]
            p-[7px]
            sm:rounded-[40px]
            lg:rounded-[48px]
            lg:p-[9px]
          "
        >
          <div
            className="
              clay-inset
              relative
              overflow-hidden
              rounded-[28px]
              bg-[linear-gradient(145deg,#FFFDF8_0%,#F5EEE4_58%,#EBDECD_100%)]
              px-4
              py-6
              sm:rounded-[34px]
              sm:px-6
              sm:py-8
              lg:min-h-[720px]
              lg:rounded-[39px]
              lg:px-10
              lg:py-10
              xl:px-12
              xl:py-12
            "
          >
            <ArchitecturalBackground />

            {/* MAIN GRID */}
            <div
              className="
                relative
                z-20
                grid
                gap-9
                lg:min-h-[620px]
                lg:grid-cols-[0.86fr_1.14fr]
                lg:items-center
                lg:gap-12
                xl:gap-16
              "
            >
              {/* COPY */}
              <div
                className="
                  relative
                  z-20
                  lg:pl-3
                  xl:pl-6
                "
              >
                {/* EYEBROW */}
                <div className="flex items-center gap-3">
                  <span className="h-px w-8 bg-[var(--brand-gold)]" />
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
                    Designed Around You
                  </span>
                </div>

                {/* H2 */}
                <h2
                  id="custom-sofa-space-heading"
                  className="
                    mt-5
                    max-w-[590px]
                    font-brand-display
                    text-[38px]
                    font-semibold
                    leading-[0.98]
                    tracking-[-0.04em]
                    text-[var(--brand-navy)]
                    min-[390px]:text-[42px]
                    sm:text-[47px]
                    lg:mt-6
                    lg:text-[clamp(46px,4vw,62px)]
                  "
                >
                  Custom sofa Designed for
                  <br className="hidden xl:block" />
                  Your Space
                  <span className="text-[var(--brand-gold)]">.</span>
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
                    leading-[1.35]
                    text-[var(--brand-navy)]
                    lg:text-[22px]
                  "
                >
                  No two homes, rooms or projects are exactly alike.
                </p>

                {/* BODY */}
                <div
                  className="
                    mt-5
                    max-w-[555px]
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
                    A sofa that looks right in a showroom may be too deep for a
                    London living room. A standard bench may leave valuable
                    space unused. The right dimensions may exist, but not in the
                    fabric, finish or style you want.
                  </p>

                  <p
                    className="
                      font-brand-display
                      text-[20px]
                      font-semibold
                      leading-[1.3]
                      text-[var(--brand-navy)]
                    "
                  >
                    Bespoke sofa removes those compromises.
                  </p>

                  <p>
                    We design and make custom sofa around your individual
                    requirements, giving you greater control over proportion,
                    comfort, materials and appearance.
                  </p>

                  <p>
                    Whether you already have a clear design in mind or simply
                    know what you need the sofa to achieve, our team can
                    help turn the idea into a finished piece made specifically
                    for your space.
                  </p>
                </div>

                {/* GOLD SIGNATURE */}
                <div className="mt-7 flex items-center gap-3">
                  <span className="h-[2px] w-14 rounded-full bg-[var(--brand-gold)]" />
                  <span className="h-[6px] w-[6px] rounded-full bg-[var(--brand-gold)]" />
                  <span
                    className="
                      font-brand-sans
                      text-[7px]
                      font-bold
                      uppercase
                      tracking-[0.18em]
                      text-[var(--brand-text-muted)]
                    "
                  >
                    Made to Measure
                  </span>
                </div>
              </div>

              {/* VISUAL STAGE */}
              <div
                className="
                  relative
                  min-h-[510px]
                   lg:min-h-[620px]
                "
              >
                <ImageStage />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   IMAGE STAGE
========================================================= */

function ImageStage() {
  return (
    <div
      className="
        relative
        h-full
        min-h-[510px]
         lg:min-h-[620px]
      "
    >
      {/* =====================================================
          OUTER ARCH FRAME
      ====================================================== */}
      <div
        className="
          clay-surface-strong
          absolute
          inset-x-[2%]
          bottom-[38px]
          top-0
          rounded-t-[48%]
          rounded-b-[28px]
          p-[7px]
          sm:inset-x-[7%]
          sm:p-[9px]
          lg:inset-x-[3%]
        "
      >
        <div
          className="
            clay-inset
            relative
            h-140
            overflow-hidden
            rounded-t-[47%]
            rounded-b-[21px]
          "
        >
          {/* IMAGE */}
          <Image
            src="/assets/images/Craftsmanship close-up.webp"
            alt="Craftsperson finishing bespoke sofa upholstery in a London workshop"
            fill
            sizes="(max-width: 1024px) 90vw, 55vw"
            className="object-cover object-center"
            priority
          />

          {/* SUBTLE OVERLAY — preserves legibility of cards */}
          <div
            className="
              pointer-events-none
              absolute
              inset-0
              bg-[linear-gradient(180deg,rgba(8,23,40,0.08)_0%,rgba(8,23,40,0.22)_100%)]
            "
          />

          {/* MEASUREMENT LABEL */}
          <div
            className="
              clay-surface-soft
              absolute
              bottom-[13%]
              left-1/2
              z-20
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
                text-[7px]
                font-bold
                uppercase
                tracking-[0.17em]
                text-[var(--brand-navy)]
              "
            >
              Made to Your Dimensions
            </span>
          </div>

          {/* SIDE DIMENSION LINE */}
          <div
            className="
              absolute
              right-[6%]
              top-[37%]
              z-20
              flex
              items-center
              gap-2
            "
          >
            <span className="h-[92px] w-px bg-[var(--brand-gold)]/65" />
            <span
              className="
                font-brand-sans
                text-[6px]
                font-bold
                uppercase
                tracking-[0.16em]
                text-[var(--brand-gold)]
                [writing-mode:vertical-rl]
              "
            >
              Your Proportions
            </span>
          </div>
        </div>
      </div>

      {/* =====================================================
          FLOATING BENEFIT CARDS
      ====================================================== */}

      {/* TOP-LEFT */}
      <div className="absolute left-0 top-[23%] z-30">
        <FloatingDetail icon={Ruler} label="Proportion" />
      </div>

      {/* TOP-RIGHT */}
      <div className="absolute right-0 top-[34%] z-30">
        <FloatingDetail icon={Armchair} label="Comfort" />
      </div>

      {/* BOTTOM-LEFT */}
      <div className="absolute bottom-[8%] left-[5%] z-30 hidden sm:block">
        <FloatingDetail icon={Layers3} label="Materials" />
      </div>

      {/* BOTTOM-RIGHT */}
      <div className="absolute bottom-[5%] right-[4%] z-30 hidden sm:block">
        <FloatingDetail icon={Palette} label="Finish" />
      </div>

      {/* MOBILE BOTTOM BENEFIT PILLS (sm and below) */}
      <div
        className="
          absolute
          inset-x-0
          bottom-0
          z-40
          grid
          grid-cols-2
          gap-2
          px-2
          sm:hidden
        "
      >
        {designBenefits.slice(2).map(({ icon: Icon, title }) => (
          <div key={title} className="clay-surface-soft rounded-[17px] p-[4px]">
            <div
              className="
                clay-inset
                flex
                items-center
                justify-center
                gap-2
                rounded-[13px]
                px-2
                py-2.5
              "
            >
              <Icon
                size={13}
                strokeWidth={1.5}
                className="text-[var(--brand-gold-700)]"
              />
              <span
                className="
                  font-brand-sans
                  text-[7px]
                  font-bold
                  uppercase
                  tracking-[0.1em]
                  text-[var(--brand-navy)]
                "
              >
                {title}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   FLOATING DETAIL CARD
========================================================= */

function FloatingDetail({
  icon: Icon,
  label,
}: {
  icon: typeof Ruler;
  label: string;
}) {
  return (
    <div
      className="
        clay-surface-strong
        rounded-[20px]
        p-[5px]
        shadow-[0_12px_24px_rgba(83,67,46,0.12)]
      "
    >
      <div
        className="
          clay-inset
          flex
          items-center
          gap-2.5
          rounded-[15px]
          px-3
          py-2.5
          sm:px-4
          sm:py-3
        "
      >
        <div
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-[var(--brand-navy)]
            text-[var(--brand-gold)]
          "
        >
          <Icon size={15} strokeWidth={1.5} />
        </div>
        <span
          className="
            whitespace-nowrap
            font-brand-sans
            text-[7px]
            font-bold
            uppercase
            tracking-[0.12em]
            text-[var(--brand-navy)]
            sm:text-[8px]
          "
        >
          {label}
        </span>
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
      <svg
        aria-hidden
        viewBox="0 0 900 360"
        preserveAspectRatio="none"
        className="
          pointer-events-none
          absolute
          right-0
          top-0
          z-0
          hidden
          h-[310px]
          w-[58%]
          lg:block
        "
      >
        <path
          d="M900 0 H460 C510 24 543 63 560 109 C579 160 620 184 681 192 C766 202 836 169 900 129 Z"
          fill="#F1E6D7"
          opacity="0.82"
        />
        <path
          d="M475 18 C527 41 549 74 564 112 C585 160 621 184 683 193"
          fill="none"
          stroke="#FFFDF8"
          strokeWidth="6"
          opacity="0.65"
        />
      </svg>

      <svg
        aria-hidden
        viewBox="0 0 1400 210"
        preserveAspectRatio="none"
        className="
          pointer-events-none
          absolute
          bottom-0
          left-0
          z-0
          h-[150px]
          w-full
          opacity-80
        "
      >
        <path
          d="M0 105 C145 57 264 59 373 98 C487 140 585 146 694 105 C810 62 918 55 1034 93 C1160 134 1279 126 1400 76 L1400 210 L0 210 Z"
          fill="#F8F1E7"
        />
        <path
          d="M0 105 C145 57 264 59 373 98 C487 140 585 146 694 105 C810 62 918 55 1034 93 C1160 134 1279 126 1400 76"
          fill="none"
          stroke="#FFFDF8"
          strokeWidth="6"
          opacity="0.75"
        />
      </svg>
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
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#F5F2EA_0%,#FFFDF8_48%,#EFE4D5_100%)]" />

      {/* LEFT SPHERE */}
      <div
        className="
          clay-sphere
          absolute
          -left-[45px]
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

      {/* GOLD RING */}
      <div
        className="
          absolute
          -right-[80px]
          top-[120px]
          hidden
          h-[210px]
          w-[210px]
          rounded-full
          border-[3px]
          border-[var(--brand-gold)]/55
          lg:block
        "
      />
    </div>
  );
}
