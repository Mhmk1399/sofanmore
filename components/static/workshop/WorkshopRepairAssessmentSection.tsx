import {
  Camera,
  Check,
  Hammer,
  PackageOpen,
  Search,
  Truck,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

import ClayButton from "@/components/ui/ClayButton";

/* =========================================================
   TYPES
========================================================= */

type AssessmentStep = {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

/* =========================================================
   DATA
========================================================= */

const assessmentSteps: AssessmentStep[] = [
  {
    number: "01",
    title: "Show Us the Sofa",
    description:
      "Start with clear photographs or arrange to bring the piece to our North West London workshop.",
    icon: Camera,
  },
  {
    number: "02",
    title: "Assess the Condition",
    description:
      "We consider the present condition, what has changed and what you would like to preserve or improve.",
    icon: Search,
  },
  {
    number: "03",
    title: "Plan Drop-Off or Collection",
    description:
      "Suitable pieces can be brought to the workshop, while collection may be available where appropriate.",
    icon: Truck,
  },
];

/* =========================================================
   ROOT
========================================================= */

export default function WorkshopRepairAssessmentSection() {
  return (
    <section
      aria-labelledby="workshop-repair-assessment-heading"
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

            px-5
            py-6

            sm:rounded-[32px]
            sm:px-7
            sm:py-8

            lg:rounded-[36px]
            lg:px-9
            lg:py-9
          "
        >
          <QuietDecoration />

          <div
            className="
              relative
              z-10

              grid
              gap-8

              lg:grid-cols-[0.88fr_1.12fr]
              lg:items-center
              lg:gap-12

              xl:gap-16
            "
          >
            {/* =================================================
                LEFT — COPY
            ================================================== */}

            <div>
              {/* EYEBROW */}

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
                  <Hammer size={15} strokeWidth={1.5} />
                </span>

                <span
                  className="
                    font-brand-sans

                    text-[7px]
                    font-bold
                    uppercase

                    tracking-[0.2em]

                    text-[var(--brand-gold-700)]

                    sm:text-[8px]
                  "
                >
                  Sofa Repair · Workshop Assessment
                </span>
              </div>

              {/* HEADING */}

              <h2
                id="workshop-repair-assessment-heading"
                className="
                  mt-4

                  max-w-[650px]

                  font-brand-display

                  text-[32px]
                  font-semibold
                  leading-[1]

                  tracking-[-0.035em]

                  text-[var(--brand-navy)]

                  sm:text-[39px]

                  lg:text-[44px]
                "
              >
                Arrange a Repair or Restoration Assessment
                <span className="text-[var(--brand-gold)]">.</span>
              </h2>

              {/* LEAD */}

              <p
                className="
                  mt-5

                  max-w-[610px]

                  font-brand-display

                  text-[18px]
                  font-medium
                  leading-[1.45]

                  text-[var(--brand-navy)]

                  sm:text-[20px]
                "
              >
                A worn or damaged sofa does not always need to be replaced.
              </p>

              {/* BODY */}

              <div
                className="
                  mt-4

                  max-w-[660px]

                  space-y-3

                  font-brand-sans

                  text-[10px]
                  font-medium
                  leading-[1.75]

                  text-[var(--brand-text-muted)]

                  sm:text-[11px]

                  lg:text-[12px]
                "
              >
                <p>
                  If the sofa still fits your room, has a design you value or is
                  simply worth keeping, bring photographs or arrange to show us
                  the piece.
                </p>

                <p>
                  Suitable sofas, chairs, cushions and upholstered pieces can be
                  brought to the workshop for assessment.
                </p>
              </div>

              {/* LARGE ITEM NOTE */}

              <div
                className="
                  mt-5

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
                  Bringing a Large Sofa?
                </span>

                <p
                  className="
                    mt-1.5

                    max-w-[590px]

                    font-brand-display

                    text-[17px]
                    font-semibold
                    leading-[1.4]

                    text-[var(--brand-navy)]

                    sm:text-[19px]
                  "
                >
                  Contact us before travelling so we can confirm the most
                  suitable drop-off arrangements.
                </p>
              </div>

              {/* CTA */}

              <div className="mt-6">
                <ClayButton
                  href="/services/sofa-repair-restoration"
                  variant="gold"
                  size="lg"
                  showArrow
                  className="max-sm:w-full"
                  ariaLabel="Explore Sofa N More sofa repair and restoration services"
                >
                  Explore Sofa Repair & Restoration
                </ClayButton>
              </div>
            </div>

            {/* =================================================
                RIGHT — ASSESSMENT FLOW
            ================================================== */}

            <div
              className="
                clay-inset

                rounded-[22px]

                bg-[#FFFDF8]/65

                px-4
                py-5

                sm:px-5
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
                  <Search size={15} strokeWidth={1.6} />
                </span>

                <div>
                  <span
                    className="
                      font-brand-sans

                      text-[6px]
                      font-bold
                      uppercase

                      tracking-[0.18em]

                      text-[var(--brand-gold-700)]
                    "
                  >
                    Assessment First
                  </span>

                  <h3
                    className="
                      mt-1.5

                      max-w-[510px]

                      font-brand-display

                      text-[22px]
                      font-semibold
                      leading-[1.2]

                      text-[var(--brand-navy)]

                      sm:text-[25px]
                    "
                  >
                    Start by understanding the individual piece.
                  </h3>
                </div>
              </div>

              {/* STEPS */}

              <div className="mt-5 grid gap-2.5">
                {assessmentSteps.map((step) => (
                  <AssessmentStepItem key={step.number} step={step} />
                ))}
              </div>

              {/* COLLECTION NOTE */}

              <div
                className="
                  mt-5

                  rounded-[17px]

                  bg-[var(--brand-navy)]

                  px-4
                  py-4
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
                    <PackageOpen size={13} strokeWidth={1.6} />
                  </span>

                  <div>
                    <span
                      className="
                        font-brand-sans

                        text-[6px]
                        font-bold
                        uppercase

                        tracking-[0.16em]

                        text-[var(--brand-gold)]
                      "
                    >
                      Drop-Off or Collection
                    </span>

                    <p
                      className="
                        mt-1

                        max-w-[500px]

                        font-brand-display

                        text-[16px]
                        font-medium
                        leading-[1.4]

                        text-white

                        sm:text-[18px]
                      "
                    >
                      A collection service is also available where appropriate.
                    </p>

                    <p
                      className="
                        mt-1.5

                        font-brand-sans

                        text-[8px]
                        font-medium
                        leading-[1.55]

                        text-white/55

                        sm:text-[9px]
                      "
                    >
                      The most appropriate arrangement depends on the item,
                      location and work required.
                    </p>
                  </div>
                </div>
              </div>

              {/* WHAT CAN BE BROUGHT */}

              <div
                className="
                  mt-5

                  flex
                  flex-wrap
                  gap-x-4
                  gap-y-2

                  border-t
                  border-[var(--brand-navy)]/10

                  pt-4
                "
              >
                <SmallCheck label="Sofas" />
                <SmallCheck label="Chairs" />
                <SmallCheck label="Cushions" />
                <SmallCheck label="Upholstered Pieces" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   ASSESSMENT STEP
========================================================= */

function AssessmentStepItem({ step }: { step: AssessmentStep }) {
  const Icon = step.icon;

  return (
    <div
      className="
        flex
        items-start
        gap-3

        rounded-[16px]

        border
        border-[var(--brand-navy)]/[0.06]

        bg-white/35

        px-3.5
        py-3.5

        sm:px-4
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

          bg-[var(--brand-navy)]

          text-[var(--brand-gold)]
        "
      >
        <Icon size={13} strokeWidth={1.5} />
      </span>

      <div className="min-w-0 flex-1">
        <div
          className="
            flex
            items-start
            justify-between

            gap-3
          "
        >
          <strong
            className="
              font-brand-display

              text-[16px]
              font-semibold
              leading-[1.2]

              text-[var(--brand-navy)]

              sm:text-[17px]
            "
          >
            {step.title}
          </strong>

          <span
            className="
              shrink-0

              font-brand-display

              text-[17px]
              font-semibold

              text-[var(--brand-gold-700)]/25
            "
          >
            {step.number}
          </span>
        </div>

        <p
          className="
            mt-1.5

            font-brand-sans

            text-[8px]
            font-medium
            leading-[1.55]

            text-[var(--brand-text-muted)]

            sm:text-[9px]
          "
        >
          {step.description}
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   SMALL CHECK
========================================================= */

function SmallCheck({ label }: { label: string }) {
  return (
    <div
      className="
        flex
        items-center
        gap-1.5
      "
    >
      <span
        className="
          flex
          h-4
          w-4

          shrink-0

          items-center
          justify-center

          rounded-full

          bg-[var(--brand-navy)]

          text-[var(--brand-gold)]
        "
      >
        <Check size={8} strokeWidth={2.1} />
      </span>

      <span
        className="
          font-brand-sans

          text-[7px]
          font-semibold

          text-[var(--brand-navy)]

          sm:text-[8px]
        "
      >
        {label}
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

          h-[185px]
          w-[185px]

          rounded-full

          border
          border-[var(--brand-gold)]/10

          lg:block
        "
      />
    </div>
  );
}
