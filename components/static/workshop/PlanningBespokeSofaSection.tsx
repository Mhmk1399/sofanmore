import {
  Armchair,
  Check,
  DoorOpen,
  Images,
  Palette,
  Ruler,
  Sofa,
  Sparkles,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

import ClayButton from "@/components/ui/ClayButton";

/* =========================================================
   TYPES
========================================================= */

type ConsultationPoint = {
  label: string;
  icon: LucideIcon;
};

/* =========================================================
   DATA
========================================================= */

const consultationPoints: ConsultationPoint[] = [
  {
    label: "The dimensions of the room",
    icon: Ruler,
  },
  {
    label: "The available wall space",
    icon: Ruler,
  },
  {
    label: "Sofa width and depth",
    icon: Sofa,
  },
  {
    label: "Corner, chaise or modular configurations",
    icon: Armchair,
  },
  {
    label: "Seat depth and comfort",
    icon: Sofa,
  },
  {
    label: "Upholstery colours and textures",
    icon: Palette,
  },
  {
    label: "Arm and back profiles",
    icon: Armchair,
  },
  {
    label: "Cushion arrangements",
    icon: Sofa,
  },
  {
    label: "Access through doors, halls, stairs or lifts",
    icon: DoorOpen,
  },
  {
    label: "How the sofa should relate to the wider interior",
    icon: Sparkles,
  },
];

const usefulThings = [
  "Photographs of the room",
  "Approximate wall measurements",
  "Doorway and access measurements",
  "Inspiration images",
  "Preferred colours",
  "Examples of sofas you like",
  "Notes about comfort or seating requirements",
];

/* =========================================================
   ROOT
========================================================= */

export default function PlanningBespokeSofaSection() {
  return (
    <section
      aria-labelledby="planning-bespoke-sofa-heading"
      className="
        bg-[var(--brand-ivory)]

        px-3
        py-8

        sm:px-5
        sm:py-10

        lg:px-7
        lg:py-12
      "
    >
      <div className="mx-auto max-w-[var(--site-width)]">
        {/* =====================================================
            MAIN CLAY SURFACE
        ====================================================== */}

        <div
          className="
            clay-surface-soft

            relative
            overflow-hidden

            rounded-[28px]

            p-[5px]

            sm:rounded-[32px]
            sm:p-[6px]

            lg:rounded-[36px]
          "
        >
          <div
            className="
              clay-inset

              relative
              overflow-hidden

              rounded-[23px]

              bg-[linear-gradient(135deg,#FFFDF8_0%,#F7F0E6_100%)]

              px-5
              py-6

              sm:rounded-[27px]
              sm:px-7
              sm:py-8

              lg:rounded-[30px]
              lg:px-9
              lg:py-9
            "
          >
            <QuietDecoration />

            {/* =================================================
                INTRO
            ================================================== */}

            <div
              className="
                relative
                z-10

                grid
                gap-7

                lg:grid-cols-[0.8fr_1.2fr]
                lg:items-start
                lg:gap-12

                xl:gap-16
              "
            >
              {/* =================================================
                  LEFT — MESSAGE
              ================================================== */}

              <div>
                <div className="flex items-center gap-3">
                  <span
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
                    <Sofa size={15} strokeWidth={1.5} />
                  </span>

                  <span
                    className="
                      font-brand-sans

                      text-[13px]
                      font-bold
                      uppercase

                      tracking-[0.2em]

                      text-[var(--brand-gold-700)]

                      sm:text-[11px]
                    "
                  >
                    Bespoke Sofa Consultation
                  </span>
                </div>

                {/* H2 */}

                <h2
                  id="planning-bespoke-sofa-heading"
                  className="
                    mt-4

                    max-w-[650px]

                    font-brand-display

                    text-[34px]
                    font-semibold
                    leading-[1]

                    tracking-[-0.035em]

                    text-[var(--brand-navy)]

                    sm:text-[42px]

                    lg:text-[48px]
                  "
                >
                  Planning a Bespoke Sofa?
                  <span className="block">
                    Start With the Space
                    <span className="text-[var(--brand-gold)]">.</span>
                  </span>
                </h2>

                {/* LEAD */}

                <p
                  className="
                    mt-5

                    max-w-[590px]

                    font-brand-display

                    text-[19px]
                    font-medium
                    leading-[1.45]

                    text-[var(--brand-navy)]

                    sm:text-[21px]
                  "
                >
                  You do not need to arrive with every decision already made.
                </p>

                {/* COPY */}

                <p
                  className="
                    mt-4

                    max-w-[610px]

                    font-brand-sans

                    text-[13px]
                    font-medium
                    leading-[1.75]

                    text-[var(--brand-text-muted)]

                    sm:text-[11px]

                    lg:text-[12px]
                  "
                >
                  A bespoke sofa project can begin with something as simple as
                  room photographs, approximate measurements and an image that
                  captures the style you like.
                </p>

                {/* SIMPLE STARTING POINTS */}

                <div
                  className="
                    mt-6

                    grid
                    grid-cols-3
                    gap-2
                  "
                >
                  <StartingPoint icon={Images} label="Room Photos" />

                  <StartingPoint icon={Ruler} label="Measurements" />

                  <StartingPoint icon={Sparkles} label="Inspiration" />
                </div>

                {/* CTA */}

                <div className="mt-6">
                  <ClayButton
                    href="/services/bespoke-sofas#bespoke-sofa-enquiry"
                    variant="gold"
                    size="lg"
                    showArrow
                    className="max-sm:w-full"
                    ariaLabel="Discuss a bespoke sofa with Sofa N More"
                  >
                    Discuss a Bespoke Sofa
                  </ClayButton>
                </div>
              </div>

              {/* =================================================
                  RIGHT — CONSULTATION DETAILS
              ================================================== */}

              <div
                className="
                  clay-surface-soft

                  rounded-[22px]

                  p-[5px]
                "
              >
                <div
                  className="
                    rounded-[18px]

                    bg-[#FFFDF8]/70

                    px-4
                    py-5

                    sm:px-5
                    sm:py-6
                  "
                >
                  {/* HEADER */}

                  <span
                    className="
                      font-brand-sans

                      text-[13px]
                      font-bold
                      uppercase

                      tracking-[0.18em]

                      text-[var(--brand-gold-700)]
                    "
                  >
                    During Your Free Workshop Consultation
                  </span>

                  <h3
                    className="
                      mt-1.5

                      max-w-[580px]

                      font-brand-display

                      text-[22px]
                      font-semibold
                      leading-[1.2]

                      text-[var(--brand-navy)]

                      sm:text-[25px]
                    "
                  >
                    We can explore the details that shape the right sofa.
                  </h3>

                  {/* =================================================
                      POINTS
                  ================================================== */}

                  <div
                    className="
                      mt-5

                      grid
                      gap-x-6

                      sm:grid-cols-2
                    "
                  >
                    {consultationPoints.map((point) => (
                      <ConsultationPointItem key={point.label} point={point} />
                    ))}
                  </div>

                  {/* =================================================
                      CATALOGUE NOTE
                  ================================================== */}

                  <div
                    className="
                      mt-5

                      rounded-[17px]

                      bg-[var(--brand-navy)]

                      px-4
                      py-4

                      sm:px-5
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

                          bg-[var(--brand-gold)]

                          text-[var(--brand-navy)]
                        "
                      >
                        <Images size={13} strokeWidth={1.6} />
                      </span>

                      <div>
                        <span
                          className="
                            font-brand-sans

                            text-[13px]
                            font-bold
                            uppercase

                            tracking-[0.16em]

                            text-[var(--brand-gold)]
                          "
                        >
                          A Starting Point, Not a Limitation
                        </span>

                        <p
                          className="
                            mt-1

                            max-w-[580px]

                            font-brand-display

                            text-[16px]
                            font-medium
                            leading-[1.4]

                            text-white

                            sm:text-[18px]
                          "
                        >
                          Our full catalogue collection provides useful starting
                          points, but the finished sofa can be developed around
                          the needs of your space.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* =================================================
                USEFUL THINGS TO BRING
            ================================================== */}

            <div
              className="
                relative
                z-10

                mt-6

                border-t
                border-[var(--brand-navy)]/10

                pt-6
              "
            >
              <div
                className="
                  grid
                  gap-5

                  lg:grid-cols-[0.32fr_0.68fr]
                  lg:items-start
                  lg:gap-10
                "
              >
                <div>
                  <span
                    className="
                      font-brand-sans

                      text-[13px]
                      font-bold
                      uppercase

                      tracking-[0.18em]

                      text-[var(--brand-gold-700)]
                    "
                  >
                    Before Your Visit
                  </span>

                  <h3
                    className="
                      mt-1.5

                      font-brand-display

                      text-[24px]
                      font-semibold
                      leading-[1.15]

                      text-[var(--brand-navy)]

                      sm:text-[28px]
                    "
                  >
                    Useful Things to Bring
                    <span className="text-[var(--brand-gold)]">.</span>
                  </h3>

                  <p
                    className="
                      mt-2

                      max-w-[420px]

                      font-brand-sans

                      text-[12px]
                      font-medium
                      leading-[1.6]

                      text-[var(--brand-text-muted)]

                      sm:text-[13px]
                    "
                  >
                    They do not need to be precise or professionally prepared.
                    Anything that helps us understand the room and your
                    preferences is useful.
                  </p>
                </div>

                {/* LIST */}

                <div
                  className="
                    grid
                    gap-x-6

                    sm:grid-cols-2

                    lg:grid-cols-3
                  "
                >
                  {usefulThings.map((item) => (
                    <UsefulThing key={item} text={item} />
                  ))}
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
   CONSULTATION POINT
========================================================= */

function ConsultationPointItem({ point }: { point: ConsultationPoint }) {
  const Icon = point.icon;

  return (
    <div
      className="
        flex
        items-start
        gap-2.5

        border-b
        border-[var(--brand-navy)]/[0.07]

        py-2.5
      "
    >
      <span
        className="
          mt-[1px]

          flex
          h-5
          w-5

          shrink-0

          items-center
          justify-center

          rounded-full

          bg-[var(--brand-navy)]

          text-[var(--brand-gold)]
        "
      >
        <Icon size={9} strokeWidth={1.6} />
      </span>

      <span
        className="
          font-brand-sans

          text-[11px]
          font-semibold
          leading-[1.5]

          text-[var(--brand-navy)]

          sm:text-[12px]
        "
      >
        {point.label}
      </span>
    </div>
  );
}

/* =========================================================
   STARTING POINT
========================================================= */

function StartingPoint({
  icon: Icon,
  label,
}: {
  icon: LucideIcon;
  label: string;
}) {
  return (
    <div
      className="
        flex
        min-h-[72px]

        flex-col

        items-center
        justify-center

        rounded-[14px]

        border
        border-[var(--brand-navy)]/[0.06]

        bg-white/35

        px-2
        py-3

        text-center
      "
    >
      <Icon
        size={13}
        strokeWidth={1.5}
        className="text-[var(--brand-gold-700)]"
      />

      <span
        className="
          mt-2

          font-brand-sans

          text-[13px]
          font-bold
          leading-[1.3]

          text-[var(--brand-navy)]

          sm:text-[11px]
        "
      >
        {label}
      </span>
    </div>
  );
}

/* =========================================================
   USEFUL THING
========================================================= */

function UsefulThing({ text }: { text: string }) {
  return (
    <div
      className="
        flex
        items-start
        gap-2.5

        border-b
        border-[var(--brand-navy)]/[0.07]

        py-2.5
      "
    >
      <span
        className="
          mt-[1px]

          flex
          h-4
          w-4

          shrink-0

          items-center
          justify-center

          rounded-full

          bg-[var(--brand-gold)]

          text-[var(--brand-navy)]
        "
      >
        <Check size={8} strokeWidth={2.1} />
      </span>

      <span
        className="
          font-brand-sans

          text-[11px]
          font-semibold
          leading-[1.5]

          text-[var(--brand-navy)]

          sm:text-[12px]
        "
      >
        {text}
      </span>
    </div>
  );
}

/* =========================================================
   QUIET DECORATION
========================================================= */

function QuietDecoration() {
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

          -right-[85px]
          -top-[95px]

          hidden

          h-[190px]
          w-[190px]

          rounded-full

          border
          border-[var(--brand-gold)]/10

          lg:block
        "
      />
    </div>
  );
}
