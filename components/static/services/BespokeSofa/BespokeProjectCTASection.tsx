import { Armchair, Check, MapPin, Ruler, Sparkles } from "lucide-react";

import ClayButton from "@/components/ui/ClayButton";

/* =========================================================
   DATA
========================================================= */

const projectPoints = [
  {
    icon: Ruler,
    label: "Your Space",
    text: "Dimensions, proportions and how the room needs to work.",
  },
  {
    icon: Armchair,
    label: "Your Requirements",
    text: "The comfort, configuration and purpose you need.",
  },
  {
    icon: Sparkles,
    label: "Your Finish",
    text: "Upholstery, colour, texture and the final visual direction.",
  },
];

/* =========================================================
   ROOT
========================================================= */

export default function BespokeProjectCTASection() {
  return (
    <section
      aria-labelledby="bespoke-final-cta-heading"
      className="
        bg-[var(--brand-ivory)]

        px-3
        pb-12
        pt-8

        sm:px-5
        sm:pb-14
        sm:pt-10

        lg:px-7
        lg:pb-20
        lg:pt-12
      "
    >
      <div className="mx-auto max-w-[var(--site-width)]">
        {/* =====================================================
            OUTER CLAY SHELL
        ====================================================== */}

        <div
          className="
            clay-surface-strong

            rounded-[32px]
            p-[7px]

            sm:rounded-[38px]

            lg:rounded-[44px]
            lg:p-[9px]
          "
        >
          <div
            className="
              clay-dark

              relative
              overflow-hidden

              rounded-[25px]

              px-5
              py-7

              sm:rounded-[31px]
              sm:px-7
              sm:py-9

              lg:rounded-[35px]
              lg:px-11
              lg:py-11

              xl:px-14
              xl:py-12
            "
          >
            <SubtleBackground />

            {/* =================================================
                CONTENT
            ================================================== */}

            <div
              className="
                relative
                z-10

                grid
                gap-8

                lg:grid-cols-[1.12fr_0.88fr]
                lg:items-center
                lg:gap-14
              "
            >
              {/* =================================================
                  LEFT
              ================================================== */}

              <div>
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
                      flex
                      h-9
                      w-9

                      shrink-0

                      items-center
                      justify-center

                      rounded-full

                      bg-[var(--brand-gold)]

                      text-[var(--brand-navy)]
                    "
                  >
                    <Sparkles size={15} strokeWidth={1.5} />
                  </span>

                  <span
                    className="
                      font-brand-sans

                      text-[13px]
                      font-bold
                      uppercase

                      tracking-[0.22em]

                      text-[var(--brand-gold)]

                      sm:text-[11px]
                    "
                  >
                    Start Your Bespoke Project
                  </span>
                </div>

                {/* HEADING */}

                <h2
                  id="bespoke-final-cta-heading"
                  className="
                    mt-5

                    max-w-[690px]

                    font-brand-display

                    text-[39px]
                    font-semibold
                    leading-[0.98]

                    tracking-[-0.04em]

                    text-white

                    min-[390px]:text-[43px]

                    sm:text-[50px]

                    lg:text-[clamp(48px,4vw,62px)]
                  "
                >
                  Have Something
                  <br className="hidden sm:block" />
                  Specific in Mind
                  <span className="text-[var(--brand-gold)]">?</span>
                </h2>

                {/* LEAD */}

                <p
                  className="
                    mt-6

                    max-w-[610px]

                    font-brand-display

                    text-[20px]
                    font-medium
                    italic
                    leading-[1.4]

                    text-white/90

                    sm:text-[22px]
                  "
                >
                  You do not need to find a piece that is almost right.
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

                    text-white/60

                    sm:text-[13px]

                    lg:text-[14px]
                  "
                >
                  <p>
                    Tell us about your room, your idea and what you want the
                    finished piece to achieve.
                  </p>

                  <p>
                    We&apos;ll help you explore a bespoke solution designed
                    around your space.
                  </p>
                </div>

                {/* CTA */}

                <div
                  className="
                    mt-7

                    grid
                    gap-3

                    sm:flex
                    sm:flex-wrap
                    sm:items-center
                  "
                >
                  <ClayButton
                    href="/contact-us"
                    variant="gold"
                    size="lg"
                    showArrow
                    className="max-sm:w-full"
                    ariaLabel="Get a bespoke quote from Sofa N More"
                  >
                    Get a Bespoke Quote
                  </ClayButton>

                  <ClayButton
                    href="/contact-us"
                    variant="ivory"
                    size="lg"
                    showArrow
                    className="max-sm:w-full"
                    ariaLabel="Discuss your bespoke sofa project with Sofa N More"
                  >
                    Discuss Your Project
                  </ClayButton>
                </div>

                {/* SUPPORT LINE */}

                <div
                  className="
                    mt-5

                    flex
                    items-start
                    gap-2.5
                  "
                >
                  <span
                    className="
                      mt-[2px]

                      flex
                      h-5
                      w-5

                      shrink-0

                      items-center
                      justify-center

                      rounded-full

                      border
                      border-[var(--brand-gold)]/30

                      text-[var(--brand-gold)]
                    "
                  >
                    <Check size={9} strokeWidth={2} />
                  </span>

                  <p
                    className="
                      max-w-[450px]

                      font-brand-sans

                      text-[12px]
                      font-medium
                      leading-[1.65]

                      text-white/45

                      sm:text-[13px]
                    "
                  >
                    Start with your room, measurements, inspiration or simply an
                    idea of what you would like to create.
                  </p>
                </div>
              </div>

              {/* =================================================
                  RIGHT PANEL
              ================================================== */}

              <ProjectPanel />
            </div>

            {/* =================================================
                FOOTER
            ================================================== */}

            <div
              className="
                relative
                z-10

                mt-7

                flex
                flex-col

                gap-3

                border-t
                border-white/[0.08]

                pt-5

                sm:flex-row
                sm:items-center
                sm:justify-between

                lg:mt-9
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-2.5
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

                    bg-white/[0.06]

                    text-[var(--brand-gold)]
                  "
                >
                  <MapPin size={13} strokeWidth={1.5} />
                </span>

                <div>
                  <span
                    className="
                      block

                      font-brand-sans

                      text-[13px]
                      font-bold
                      uppercase

                      tracking-[0.15em]

                      text-[var(--brand-gold)]
                    "
                  >
                    Sofa N More
                  </span>

                  <span
                    className="
                      mt-0.5
                      block

                      font-brand-sans

                      text-[11px]
                      font-medium

                      text-white/45
                    "
                  >
                    North West London
                  </span>
                </div>
              </div>

              <span
                className="
                  font-brand-sans

                  text-[13px]
                  font-bold
                  uppercase

                  tracking-[0.16em]

                  text-white/25

                  sm:text-right
                "
              >
                Designed Around Your Space
                <span className="mx-2 text-[var(--brand-gold)]/45">·</span>
                Made in London
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   PROJECT PANEL
========================================================= */

function ProjectPanel() {
  return (
    <div
      className="
        rounded-[22px]

        border
        border-white/[0.08]

        bg-white/[0.045]

        p-5

        shadow-[inset_1px_1px_0_rgba(255,255,255,0.05)]

        sm:p-6
      "
    >
      {/* HEADER */}

      <div>
        <span
          className="
            font-brand-sans

            text-[13px]
            font-bold
            uppercase

            tracking-[0.18em]

            text-[var(--brand-gold)]
          "
        >
          Designed Around You
        </span>

        <h3
          className="
            mt-2

            max-w-[440px]

            font-brand-display

            text-[24px]
            font-semibold
            leading-[1.18]

            text-white

            sm:text-[27px]
          "
        >
          Begin with what you need the sofa to do.
        </h3>

        <p
          className="
            mt-3

            max-w-[460px]

            font-brand-sans

            text-[13px]
            font-medium
            leading-[1.7]

            text-white/48

            sm:text-[11px]
          "
        >
          From proportion and comfort to upholstery and finishing details, each
          decision can be developed around your project.
        </p>
      </div>

      {/* POINTS */}

      <div
        className="
          mt-5
          space-y-2.5
        "
      >
        {projectPoints.map(({ icon: Icon, label, text }) => (
          <div
            key={label}
            className="
                flex
                items-start
                gap-3

                rounded-[16px]

                border
                border-white/[0.07]

                bg-white/[0.035]

                px-3.5
                py-3.5
              "
          >
            <span
              className="
                  flex
                  h-9
                  w-9

                  shrink-0

                  items-center
                  justify-center

                  rounded-full

                  bg-white/[0.07]

                  text-[var(--brand-gold)]
                "
            >
              <Icon size={14} strokeWidth={1.5} />
            </span>

            <div>
              <span
                className="
                    font-brand-sans

                    text-[13px]
                    font-bold
                    uppercase

                    tracking-[0.13em]

                    text-white/80

                    sm:text-[11px]
                  "
              >
                {label}
              </span>

              <p
                className="
                    mt-1

                    font-brand-sans

                    text-[12px]
                    font-medium
                    leading-[1.6]

                    text-white/42

                    sm:text-[13px]
                  "
              >
                {text}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* BOTTOM MESSAGE */}

      <div
        className="
          mt-5

          border-t
          border-white/[0.08]

          pt-5
        "
      >
        <p
          className="
            font-brand-display

            text-[17px]
            font-medium
            leading-[1.35]

            text-white/88

            sm:text-[19px]
          "
        >
          The result should feel made for the room — because it is.
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   SUBTLE BACKGROUND
========================================================= */

function SubtleBackground() {
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
      {/* GOLD ARC */}

      <div
        className="
          absolute

          -right-[90px]
          -top-[125px]

          h-[260px]
          w-[260px]

          rounded-full

          border
          border-[var(--brand-gold)]/15
        "
      />

      {/* SECOND ARC */}

      <div
        className="
          absolute

          -right-[35px]
          -top-[75px]

          h-[175px]
          w-[175px]

          rounded-full

          border
          border-white/[0.05]
        "
      />

      {/* SOFT LIGHT */}

      <div
        className="
          absolute

          -bottom-[140px]
          left-[12%]

          h-[250px]
          w-[430px]

          rounded-full

          bg-white/[0.025]

          blur-3xl
        "
      />
    </div>
  );
}
