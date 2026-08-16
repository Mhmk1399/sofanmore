import {
  LayoutGrid,
  Lightbulb,
  Palette,
  Sofa,
  Sparkles,
  UtensilsCrossed,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

import ClayButton from "@/components/ui/ClayButton";

/* =========================================================
   DATA
========================================================= */

const atmospherePoints = [
  "Intimate",
  "Social",
  "Relaxed",
  "Energetic",
  "Refined",
];

const designExamples = [
  {
    title: "Create a Focal Point",
    text: "A curved banquette can give the room a clear visual anchor.",
    icon: Sparkles,
  },
  {
    title: "Use Difficult Areas",
    text: "Wall seating can turn an awkward part of the venue into useful space.",
    icon: Sofa,
  },
  {
    title: "Build Visual Identity",
    text: "A rich upholstery colour can become part of the character of the room.",
    icon: Palette,
  },
  {
    title: "Structure the Layout",
    text: "A carefully composed seating plan can make the venue feel more deliberate.",
    icon: LayoutGrid,
  },
] satisfies {
  title: string;
  text: string;
  icon: LucideIcon;
}[];

/* =========================================================
   ROOT
========================================================= */

export default function RestaurantCafeInteriorsSection() {
  return (
    <section
      aria-labelledby="restaurant-cafe-interiors-heading"
      className="
        bg-[var(--brand-ivory)]
        px-3
        py-9

        sm:px-5
        sm:py-11

        lg:px-7
        lg:py-14
      "
    >
      <div className="mx-auto max-w-[var(--site-width)]">
        <div
          className="
            clay-surface-strong

            rounded-[30px]
            p-[6px]

            sm:rounded-[36px]
            sm:p-[7px]

            lg:rounded-[42px]
            lg:p-[8px]
          "
        >
          <div
            className="
              clay-inset

              overflow-hidden
              rounded-[24px]

              bg-[linear-gradient(135deg,#FFFDF8_0%,#F7F1E8_58%,#EFE5D8_100%)]

              px-5
              py-6

              sm:rounded-[29px]
              sm:px-7
              sm:py-8

              lg:rounded-[34px]
              lg:px-10
              lg:py-10
            "
          >
            {/* =================================================
                MAIN GRID
            ================================================== */}

            <div
              className="
                grid
                gap-8

                lg:grid-cols-[0.93fr_1.07fr]
                lg:items-center
                lg:gap-12

                xl:gap-16
              "
            >
              {/* =================================================
                  CONTENT
              ================================================== */}

              <div>
                <div className="flex items-center gap-3">
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
                    <UtensilsCrossed size={15} strokeWidth={1.5} />
                  </span>

                  <span
                    className="
                      font-brand-sans

                      text-[8px]
                      font-bold
                      uppercase

                      tracking-[0.22em]

                      text-[var(--brand-gold-700)]

                      sm:text-[9px]
                    "
                  >
                    Restaurant & Café Interiors
                  </span>
                </div>

                {/* HEADING */}

                <h2
                  id="restaurant-cafe-interiors-heading"
                  className="
                    mt-4

                    max-w-[720px]

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
                  Restaurant & Café Interiors That Guests Remember
                  <span className="text-[var(--brand-gold)]">.</span>
                </h2>

                {/* LEAD */}

                <p
                  className="
                    mt-6

                    max-w-[610px]

                    font-brand-display

                    text-[19px]
                    font-medium
                    italic
                    leading-[1.4]

                    text-[var(--brand-navy)]

                    sm:text-[21px]
                  "
                >
                  Restaurants and cafés are especially dependent on atmosphere.
                </p>

                {/* BODY */}

                <div
                  className="
                    mt-5

                    max-w-[650px]

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
                    The relationship between seating, lighting, materials and
                    layout helps determine whether a venue feels intimate,
                    social, relaxed, energetic or refined.
                  </p>

                  <p>
                    Thoughtful design can help different areas serve different
                    purposes while still feeling like part of the same concept.
                  </p>
                </div>

                {/* ATMOSPHERE */}

                <div className="mt-6">
                  <span
                    className="
                      font-brand-sans

                      text-[6px]
                      font-bold
                      uppercase

                      tracking-[0.17em]

                      text-[var(--brand-gold-700)]
                    "
                  >
                    The Atmosphere Can Feel
                  </span>

                  <div
                    className="
                      mt-2.5

                      flex
                      flex-wrap

                      gap-2
                    "
                  >
                    {atmospherePoints.map((point) => (
                      <span
                        key={point}
                        className="
                            clay-surface-soft

                            rounded-full

                            px-3
                            py-2

                            font-brand-sans

                            text-[7px]
                            font-bold
                            uppercase

                            tracking-[0.1em]

                            text-[var(--brand-navy)]

                            sm:text-[8px]
                          "
                      >
                        {point}
                      </span>
                    ))}
                  </div>
                </div>

                {/* BESPOKE SERVICE BRIDGE */}

                <div
                  className="
                    mt-6

                    border-l-2
                    border-[var(--brand-gold)]

                    pl-4
                  "
                >
                  <span
                    className="
                      font-brand-sans

                      text-[6px]
                      font-bold
                      uppercase

                      tracking-[0.17em]

                      text-[var(--brand-gold-700)]
                    "
                  >
                    Made-to-Measure Seating
                  </span>

                  <p
                    className="
                      mt-1.5

                      max-w-[600px]

                      font-brand-display

                      text-[20px]
                      font-semibold
                      leading-[1.35]

                      text-[var(--brand-navy)]

                      sm:text-[22px]
                    "
                  >
                    Bespoke commercial sofas can be developed as part of the
                    wider interior direction.
                  </p>
                </div>

                <p
                  className="
                    mt-4

                    max-w-[620px]

                    font-brand-sans

                    text-[11px]
                    font-medium
                    leading-[1.7]

                    text-[var(--brand-text-muted)]

                    sm:text-[12px]

                    lg:text-[13px]
                  "
                >
                  For projects requiring made-to-measure seating, our bespoke
                  commercial sofa service can be integrated into the wider
                  interior direction.
                </p>

                {/* CTA */}

                <div className="mt-7">
                  <ClayButton
                    href="/contact-us"
                    variant="gold"
                    size="lg"
                    showArrow
                    className="max-sm:w-full"
                    ariaLabel="Discuss a hospitality interior design project with Sofa N More"
                  >
                    Discuss a Hospitality Project
                  </ClayButton>
                </div>
              </div>

              {/* =================================================
                  EXPERIENCE PANEL
              ================================================== */}

              <HospitalityExperiencePanel />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   HOSPITALITY EXPERIENCE PANEL
========================================================= */

function HospitalityExperiencePanel() {
  return (
    <div
      className="
        mx-auto
        w-full
        max-w-[660px]

        clay-surface-strong

        rounded-[27px]
        p-[6px]

        sm:rounded-[31px]
        sm:p-[7px]
      "
    >
      <div
        className="
          overflow-hidden

          rounded-[21px]

          bg-[var(--brand-navy)]

          px-4
          py-5

          sm:rounded-[24px]
          sm:px-6
          sm:py-6
        "
      >
        {/* HEADER */}

        <div
          className="
            flex
            items-start
            gap-3
          "
        >
          <span
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
            <Lightbulb size={15} strokeWidth={1.5} />
          </span>

          <div>
            <span
              className="
                font-brand-sans

                text-[6px]
                font-bold
                uppercase

                tracking-[0.18em]

                text-[var(--brand-gold)]
              "
            >
              Designed With Purpose
            </span>

            <h3
              className="
                mt-1.5

                max-w-[450px]

                font-brand-display

                text-[24px]
                font-semibold
                leading-[1.15]

                tracking-[-0.025em]

                text-white

                sm:text-[27px]
              "
            >
              Small design decisions can completely change how a venue feels.
            </h3>
          </div>
        </div>

        {/* EXAMPLES */}

        <div
          className="
            mt-6

            grid
            gap-2.5

            sm:grid-cols-2
          "
        >
          {designExamples.map(({ title, text, icon: Icon }) => (
            <DesignExample key={title} title={title} text={text} icon={Icon} />
          ))}
        </div>

        {/* CONNECTION */}

        <div
          className="
            mt-5

            border-t
            border-white/10

            pt-5
          "
        >
          <span
            className="
              font-brand-sans

              text-[6px]
              font-bold
              uppercase

              tracking-[0.17em]

              text-[var(--brand-gold)]
            "
          >
            One Interior Direction
          </span>

          <p
            className="
              mt-1.5

              max-w-[520px]

              font-brand-display

              text-[18px]
              font-medium
              leading-[1.35]

              text-white/90

              sm:text-[20px]
            "
          >
            Seating, lighting, materials and layout should reinforce the same
            atmosphere — not compete for attention.
          </p>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   DESIGN EXAMPLE
========================================================= */

function DesignExample({
  title,
  text,
  icon: Icon,
}: {
  title: string;
  text: string;
  icon: LucideIcon;
}) {
  return (
    <article
      className="
        rounded-[16px]

        border
        border-white/[0.08]

        bg-white/[0.045]

        px-3.5
        py-3.5

        shadow-[inset_1px_1px_0_rgba(255,255,255,0.04)]
      "
    >
      <div
        className="
          flex
          items-start
          gap-3
        "
      >
        <span
          className="
            flex
            h-8
            w-8

            shrink-0

            items-center
            justify-center

            rounded-full

            bg-white/[0.07]

            text-[var(--brand-gold)]
          "
        >
          <Icon size={13} strokeWidth={1.5} />
        </span>

        <div>
          <h4
            className="
              font-brand-display

              text-[16px]
              font-semibold
              leading-[1.2]

              text-white

              sm:text-[17px]
            "
          >
            {title}
          </h4>

          <p
            className="
              mt-1.5

              font-brand-sans

              text-[9px]
              font-medium
              leading-[1.6]

              text-white/55

              sm:text-[10px]
            "
          >
            {text}
          </p>
        </div>
      </div>
    </article>
  );
}
