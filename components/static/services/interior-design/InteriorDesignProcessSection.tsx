import {
  Armchair,
  Check,
  ClipboardPenLine,
  Layers3,
  LayoutGrid,
  Palette,
  Sparkles,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

type ProcessStep = {
  number: string;
  label: string;
  title: string;
  description: string;
  secondary?: string;
  icon: LucideIcon;
};

/* =========================================================
   DATA
========================================================= */

const processSteps: ProcessStep[] = [
  {
    number: "01",
    label: "Understand",
    title: "Tell Us About Your Space",
    description:
      "The project starts with a conversation. Share the property or venue, your ideas, practical requirements, inspiration and what you want to change about the existing space.",
    secondary:
      "Plans, photographs, measurements and reference images can all help establish the starting point.",
    icon: ClipboardPenLine,
  },

  {
    number: "02",
    label: "Direction",
    title: "Establish the Design Direction",
    description: "We begin defining how the interior should look and feel.",
    secondary:
      "This can include the overall visual direction, atmosphere, colour relationships, materials, textures and how different parts of the room should connect.",
    icon: Sparkles,
  },

  {
    number: "03",
    label: "Layout",
    title: "Develop the Layout",
    description: "We consider how the space needs to work.",
    secondary:
      "That includes the relationship between key elements of the room, circulation, seating positions and how the layout supports everyday use.",
    icon: LayoutGrid,
  },

  {
    number: "04",
    label: "Refine",
    title: "Refine Materials, Colours & Details",
    description: "Materials and colour give the concept depth.",
    secondary:
      "We explore combinations that support the overall design direction and help create consistency across the interior.",
    icon: Palette,
  },

  {
    number: "05",
    label: "Integrate",
    title: "Integrate Bespoke Sofas & Seating",
    description:
      "Where the project requires it, bespoke sofas and seating can be designed around the dimensions and character of the space.",
    secondary:
      "This creates a stronger connection between the room and one of its most important visual elements.",
    icon: Armchair,
  },

  {
    number: "06",
    label: "Complete",
    title: "Bring the Interior Together",
    description:
      "Once the direction is agreed, the different elements of the project can move towards a cohesive finished environment based on the agreed scope.",
    icon: Layers3,
  },
];

/* =========================================================
   ROOT
========================================================= */

export default function InteriorDesignProcessSection() {
  return (
    <section
      aria-labelledby="interior-design-process-heading"
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
      <div
        className="
          mx-auto
          max-w-[var(--site-width)]
        "
      >
        {/* =====================================================
            MAIN SHELL
        ====================================================== */}

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
                HEADER
            ================================================== */}

            <div
              className="
                grid
                gap-5

                lg:grid-cols-[0.9fr_1.1fr]
                lg:items-end
                lg:gap-12
              "
            >
              <div>
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

                      tracking-[0.22em]

                      text-[var(--brand-gold-700)]

                      sm:text-[9px]
                    "
                  >
                    Our Interior Design Process
                  </span>
                </div>

                <h2
                  id="interior-design-process-heading"
                  className="
                    mt-4

                    max-w-[690px]

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
                  From an Idea to a Complete Interior
                  <span className="text-[var(--brand-gold)]">.</span>
                </h2>
              </div>

              <div
                className="
                  max-w-[560px]

                  lg:justify-self-end
                "
              >
                <p
                  className="
                    font-brand-display

                    text-[18px]
                    font-medium
                    italic
                    leading-[1.4]

                    text-[var(--brand-navy)]

                    sm:text-[20px]
                  "
                >
                  Good interior design is a sequence of decisions.
                </p>

                <p
                  className="
                    mt-3

                    font-brand-sans

                    text-[11px]
                    font-medium
                    leading-[1.7]

                    text-[var(--brand-text-muted)]

                    sm:text-[12px]

                    lg:text-[13px]
                  "
                >
                  Our process helps bring those decisions into one clear
                  direction.
                </p>
              </div>
            </div>

            {/* =================================================
                QUICK PROCESS STRIP
            ================================================== */}

            <div
              className="
                mt-7

                hidden

                rounded-[20px]

                bg-[var(--brand-navy)]

                px-5
                py-4

                md:block

                lg:mt-8
              "
            >
              <ProcessOverview />
            </div>

            {/* =================================================
                STEPS
            ================================================== */}

            <div
              className="
                relative

                mt-6

                grid
                gap-3

                lg:grid-cols-2
                lg:gap-4

                xl:gap-5
              "
            >
              {processSteps.map((step) => (
                <ProcessStepCard key={step.number} step={step} />
              ))}
            </div>

            {/* =================================================
                FINAL STATEMENT
            ================================================== */}

            <div
              className="
                mt-6

                rounded-[20px]

                bg-[var(--brand-navy)]

                px-4
                py-5

                sm:px-5
                sm:py-5

                lg:mt-7
                lg:px-6
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
                  <Check size={14} strokeWidth={2} />
                </span>

                <div>
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
                    The Goal
                  </span>

                  <p
                    className="
                      mt-1

                      max-w-[850px]

                      font-brand-display

                      text-[19px]
                      font-semibold
                      leading-[1.35]

                      text-white

                      sm:text-[21px]

                      lg:text-[23px]
                    "
                  >
                    The goal is not simply to fill a room. It is to create a
                    space in which every major decision feels connected.
                  </p>
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
   PROCESS OVERVIEW
========================================================= */

function ProcessOverview() {
  return (
    <div
      className="
        relative

        grid
        grid-cols-6

        gap-2
      "
    >
      {/* CONNECTOR */}

      <div
        aria-hidden
        className="
          absolute

          left-[7%]
          right-[7%]
          top-[14px]

          h-px

          bg-white/12
        "
      />

      {processSteps.map((step) => {
        const Icon = step.icon;

        return (
          <div
            key={step.number}
            className="
              relative
              z-10

              text-center
            "
          >
            <span
              className="
                mx-auto

                flex
                h-7
                w-7

                items-center
                justify-center

                rounded-full

                border
                border-white/10

                bg-[#19334D]

                text-[var(--brand-gold)]
              "
            >
              <Icon size={11} strokeWidth={1.5} />
            </span>

            <span
              className="
                mt-2
                block

                font-brand-sans

                text-[5px]
                font-bold
                uppercase

                tracking-[0.14em]

                text-[var(--brand-gold)]
              "
            >
              {step.number}
            </span>

            <span
              className="
                mt-0.5
                block

                font-brand-sans

                text-[7px]
                font-semibold

                text-white/65

                lg:text-[8px]
              "
            >
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* =========================================================
   PROCESS STEP CARD
========================================================= */

function ProcessStepCard({ step }: { step: ProcessStep }) {
  const Icon = step.icon;

  return (
    <article
      className="
        clay-surface-soft

        rounded-[20px]

        p-[5px]

        sm:rounded-[22px]
      "
    >
      <div
        className="
          clay-inset

          h-full

          rounded-[16px]

          px-4
          py-4

          sm:px-5
          sm:py-5
        "
      >
        {/* =====================================================
            TOP
        ====================================================== */}

        <div
          className="
            flex
            items-start
            gap-3

            sm:gap-4
          "
        >
          {/* NUMBER */}

          <div
            className="
              flex
              h-11
              w-11

              shrink-0

              flex-col
              items-center
              justify-center

              rounded-full

              bg-[var(--brand-navy)]
            "
          >
            <span
              className="
                font-brand-sans

                text-[5px]
                font-bold
                uppercase

                tracking-[0.1em]

                text-[var(--brand-gold)]
              "
            >
              Step
            </span>

            <span
              className="
                mt-0.5

                font-brand-display

                text-[14px]
                font-semibold
                leading-none

                text-white
              "
            >
              {step.number}
            </span>
          </div>

          {/* TITLE */}

          <div
            className="
              min-w-0
              flex-1
            "
          >
            <div
              className="
                flex
                items-center
                gap-2
              "
            >
              <Icon
                size={12}
                strokeWidth={1.5}
                className="
                  shrink-0

                  text-[var(--brand-gold-700)]
                "
              />

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
                {step.label}
              </span>
            </div>

            <h3
              className="
                mt-1.5

                font-brand-display

                text-[20px]
                font-semibold
                leading-[1.12]

                tracking-[-0.02em]

                text-[var(--brand-navy)]

                sm:text-[22px]
              "
            >
              {step.title}
            </h3>
          </div>
        </div>

        {/* =====================================================
            COPY
        ====================================================== */}

        <div
          className="
            mt-4

            border-t
            border-[var(--brand-navy)]/8

            pt-4
          "
        >
          <p
            className="
              font-brand-sans

              text-[10px]
              font-medium
              leading-[1.68]

              text-[var(--brand-text-muted)]

              sm:text-[11px]

              lg:text-[12px]
            "
          >
            {step.description}
          </p>

          {step.secondary && (
            <p
              className="
                mt-2.5

                font-brand-sans

                text-[10px]
                font-medium
                leading-[1.68]

                text-[var(--brand-text-muted)]

                sm:text-[11px]

                lg:text-[12px]
              "
            >
              {step.secondary}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
