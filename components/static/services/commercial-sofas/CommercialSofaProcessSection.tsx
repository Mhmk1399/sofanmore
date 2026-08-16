import {
  Check,
  ClipboardPenLine,
  Hammer,
  Layers3,
  PackageCheck,
  PencilRuler,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

type ProcessStep = {
  number: string;
  shortLabel: string;
  title: string;
  description: string;
  secondary?: string;
  icon: LucideIcon;
  highlight?: boolean;
};

/* =========================================================
   DATA
========================================================= */

const processSteps: ProcessStep[] = [
  {
    number: "01",

    shortLabel: "Brief",

    title: "Tell Us About Your Project",

    description:
      "Start by sharing the type of venue, approximate dimensions, floor plans, photographs, reference images and what you want the seating to achieve.",

    secondary:
      "The clearer the brief, the easier it becomes to develop the right solution.",

    icon: ClipboardPenLine,
  },

  {
    number: "02",

    shortLabel: "Layout",

    title: "Define the Layout & Sofa Design",

    description:
      "We explore dimensions, proportions, configuration and design direction around the room and the intended use of the seating.",

    secondary:
      "This can include straight sofas, corner configurations, curved seating, booths, banquettes and other made-to-measure layouts.",

    icon: PencilRuler,
  },

  {
    number: "03",

    shortLabel: "Finishes",

    title: "Select Upholstery & Finishes",

    description:
      "Choose suitable fabrics, colours, textures and finishing details to create the right combination of visual character and practical use.",

    icon: Layers3,
  },

  {
    number: "04",

    shortLabel: "Production",

    title: "Your Commercial Sofas Are Made",

    description:
      "Once the design and specification have been agreed, your sofas move into production.",

    secondary:
      "Each element is produced around the approved project requirements.",

    icon: Hammer,

    highlight: true,
  },

  {
    number: "05",

    shortLabel: "Install",

    title: "Delivery & Installation",

    description:
      "Once completed, your sofas and seating can be delivered and installed according to the agreed project scope.",

    icon: PackageCheck,
  },
];

/* =========================================================
   ROOT
========================================================= */

export default function CommercialSofaProcessSection() {
  return (
    <section
      aria-labelledby="commercial-sofa-process-heading"
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
            MAIN CLAY SHELL
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

              bg-[linear-gradient(135deg,#FFFDF8_0%,#F7F1E8_57%,#EFE5D8_100%)]

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
                    Our Commercial Process
                  </span>
                </div>

                <h2
                  id="commercial-sofa-process-heading"
                  className="
                    mt-4

                    max-w-[650px]

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
                  From Brief to Installation
                  <span
                    className="
                      text-[var(--brand-gold)]
                    "
                  >
                    .
                  </span>
                </h2>
              </div>

              <div
                className="
                  max-w-[570px]

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
                  A commercial sofa project can involve many decisions.
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
                  Our process keeps those decisions focused around the
                  requirements of your space.
                </p>
              </div>
            </div>

            {/* =================================================
                QUICK PROCESS RAIL
            ================================================== */}

            <div
              className="
                mt-7

                hidden

                rounded-[22px]

                bg-[var(--brand-navy)]

                px-5
                py-5

                md:block

                lg:mt-8
                lg:px-7
              "
            >
              <DesktopProcessRail />
            </div>

            {/* =================================================
                MOBILE QUICK PATH
            ================================================== */}

            <div
              className="
                mt-6

                md:hidden
              "
            >
              <MobileProcessRail />
            </div>

            {/* =================================================
                FULL PROCESS
            ================================================== */}

            <div
              className="
                relative

                mt-6

                space-y-2.5

                lg:mt-7
              "
            >
              {processSteps.map((step) => (
                <ProcessRow key={step.number} step={step} />
              ))}
            </div>

            {/* =================================================
                COMPLETION NOTE
            ================================================== */}

            <div
              className="
                mt-6

                flex
                items-start
                gap-3

                border-t
                border-[var(--brand-navy)]/10

                pt-5
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
                <Check size={14} strokeWidth={1.8} />
              </span>

              <p
                className="
                  max-w-[760px]

                  font-brand-sans

                  text-[10px]
                  font-medium
                  leading-[1.65]

                  text-[var(--brand-text-muted)]

                  sm:text-[11px]
                "
              >
                One clear process from your initial brief through design,
                production, delivery and final installation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   DESKTOP PROCESS RAIL
========================================================= */

function DesktopProcessRail() {
  return (
    <div
      className="
        relative

        grid
        grid-cols-5
        gap-4
      "
    >
      {/* CONNECTING LINE */}

      <div
        aria-hidden
        className="
          absolute

          left-[9%]
          right-[9%]
          top-[18px]

          h-px

          bg-white/12
        "
      />

      {processSteps.map((step, index) => {
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
            {/* NODE */}

            <div
              className={`
                mx-auto

                flex
                h-9
                w-9

                items-center
                justify-center

                rounded-full

                ${
                  step.highlight
                    ? "bg-[var(--brand-gold)] text-[var(--brand-navy)]"
                    : "border border-white/12 bg-[#1B3652] text-[var(--brand-gold)]"
                }
              `}
            >
              <Icon size={14} strokeWidth={1.5} />
            </div>

            {/* NUMBER */}

            <span
              className="
                mt-3
                block

                font-brand-sans

                text-[6px]
                font-bold
                uppercase

                tracking-[0.16em]

                text-[var(--brand-gold)]
              "
            >
              {step.number}
            </span>

            {/* LABEL */}

            <span
              className="
                mt-1
                block

                font-brand-sans

                text-[8px]
                font-semibold

                text-white/75

                lg:text-[9px]
              "
            >
              {step.shortLabel}
            </span>

            {index < processSteps.length - 1 && (
              <span className="sr-only">Next step</span>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* =========================================================
   MOBILE PROCESS RAIL
========================================================= */

function MobileProcessRail() {
  return (
    <div
      className="
        clay-surface-soft

        overflow-x-auto

        rounded-[18px]

        px-3
        py-3

        [scrollbar-width:none]

        [&::-webkit-scrollbar]:hidden
      "
    >
      <div
        className="
          flex

          min-w-max

          items-center

          gap-2
        "
      >
        {processSteps.map((step, index) => {
          const Icon = step.icon;

          return (
            <div
              key={step.number}
              className="
                flex
                items-center
                gap-2
              "
            >
              <div
                className={`
                  flex
                  items-center

                  gap-2

                  rounded-full

                  px-3
                  py-2

                  ${
                    step.highlight
                      ? "bg-[var(--brand-navy)] text-white"
                      : "bg-[#FFFDF8] text-[var(--brand-navy)]"
                  }
                `}
              >
                <Icon
                  size={12}
                  strokeWidth={1.5}
                  className={
                    step.highlight
                      ? "text-[var(--brand-gold)]"
                      : "text-[var(--brand-gold-700)]"
                  }
                />

                <span
                  className="
                    font-brand-sans

                    text-[6px]
                    font-bold
                    uppercase

                    tracking-[0.1em]
                  "
                >
                  {step.number} · {step.shortLabel}
                </span>
              </div>

              {index < processSteps.length - 1 && (
                <span
                  aria-hidden
                  className="
                    text-[10px]

                    text-[var(--brand-gold-700)]/55
                  "
                >
                  →
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* =========================================================
   PROCESS ROW
========================================================= */

function ProcessRow({ step }: { step: ProcessStep }) {
  const Icon = step.icon;

  if (step.highlight) {
    return <HighlightedProcessRow step={step} />;
  }

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

          rounded-[16px]

          px-4
          py-4

          sm:px-5
          sm:py-5

          lg:grid
          lg:grid-cols-[0.34fr_0.66fr]
          lg:items-center
          lg:gap-8
        "
      >
        {/* =====================================================
            STEP IDENTITY
        ====================================================== */}

        <div
          className="
            flex
            items-start

            gap-3

            sm:gap-4
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

              bg-[var(--brand-navy)]

              text-[var(--brand-gold)]

              sm:h-11
              sm:w-11
            "
          >
            <Icon size={17} strokeWidth={1.5} />
          </div>

          <div>
            <div
              className="
                flex
                items-center
                gap-2
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
                Step {step.number}
              </span>

              <span
                className="
                  h-px
                  w-5

                  bg-[var(--brand-gold)]/50
                "
              />
            </div>

            <h3
              className="
                mt-1.5

                max-w-[350px]

                font-brand-display

                text-[19px]
                font-semibold
                leading-[1.1]

                tracking-[-0.02em]

                text-[var(--brand-navy)]

                sm:text-[21px]
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

            lg:mt-0
            lg:border-l
            lg:border-t-0
            lg:pl-8
            lg:pt-0
          "
        >
          <p
            className="
              max-w-[760px]

              font-brand-sans

              text-[10px]
              font-medium
              leading-[1.7]

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
                mt-2

                max-w-[760px]

                font-brand-sans

                text-[10px]
                font-medium
                leading-[1.7]

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

/* =========================================================
   HIGHLIGHTED PRODUCTION STEP
========================================================= */

function HighlightedProcessRow({ step }: { step: ProcessStep }) {
  const Icon = step.icon;

  return (
    <article
      className="
        clay-surface-strong

        rounded-[21px]

        p-[5px]

        sm:rounded-[23px]
      "
    >
      <div
        className="
          rounded-[17px]

          bg-[var(--brand-navy)]

          px-4
          py-4

          sm:px-5
          sm:py-5

          lg:grid
          lg:grid-cols-[0.34fr_0.66fr]
          lg:items-center
          lg:gap-8
        "
      >
        {/* =====================================================
            STEP IDENTITY
        ====================================================== */}

        <div
          className="
            flex
            items-start

            gap-3

            sm:gap-4
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

              sm:h-11
              sm:w-11
            "
          >
            <Icon size={17} strokeWidth={1.6} />
          </div>

          <div>
            <div
              className="
                flex
                items-center
                gap-2
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
                Step {step.number}
              </span>

              <span
                className="
                  h-px
                  w-5

                  bg-[var(--brand-gold)]/50
                "
              />
            </div>

            <h3
              className="
                mt-1.5

                max-w-[350px]

                font-brand-display

                text-[19px]
                font-semibold
                leading-[1.1]

                tracking-[-0.02em]

                text-white

                sm:text-[21px]
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
            border-white/10

            pt-4

            lg:mt-0
            lg:border-l
            lg:border-t-0
            lg:pl-8
            lg:pt-0
          "
        >
          <p
            className="
              max-w-[760px]

              font-brand-sans

              text-[10px]
              font-medium
              leading-[1.7]

              text-white/68

              sm:text-[11px]

              lg:text-[12px]
            "
          >
            {step.description}
          </p>

          {step.secondary && (
            <p
              className="
                mt-2

                max-w-[760px]

                font-brand-sans

                text-[10px]
                font-medium
                leading-[1.7]

                text-white/48

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
