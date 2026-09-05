import {
  Camera,
  Check,
  ClipboardCheck,
  Hammer,
  MessageSquareText,
  PackageCheck,
  Sparkles,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

type ProcessStep = {
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  secondary?: string;
  icon: LucideIcon;
  featured?: boolean;
  checklist?: string[];
};

/* =========================================================
   DATA
========================================================= */

const processSteps: ProcessStep[] = [
  {
    number: "01",
    eyebrow: "Start With What You Know",
    title: "Tell Us What Has Happened",
    description:
      "Share what you have noticed and what you would like to improve.",
    secondary:
      "It may be visible damage, general wear, loss of comfort or simply a sofa that no longer looks the way you remember it.",
    icon: MessageSquareText,
  },

  {
    number: "02",
    eyebrow: "Help Us See the Sofa",
    title: "Send Photos & Details",
    description:
      "Clear photographs can help us understand the overall condition before discussing the next step.",
    icon: Camera,
    checklist: [
      "A full photograph of the sofa",
      "Close-ups of the affected areas",
      "Approximate dimensions",
      "Any information you know about the sofa",
      "What you want the finished result to achieve",
    ],
  },

  {
    number: "03",
    eyebrow: "Assessment",
    title: "We Assess the Project",
    description:
      "We consider the condition of the piece and the outcome you are looking for.",
    secondary:
      "Where the project is suitable for our repair and restoration service, we can discuss the recommended scope and next steps.",
    icon: ClipboardCheck,
  },

  {
    number: "04",
    eyebrow: "Agree Before Work Begins",
    title: "Agree the Direction",
    description: "Before work begins, the objective should be clear.",
    secondary:
      "What are we preserving? What needs attention? What should the finished sofa feel and look like? This ensures that restoration is based on a shared understanding rather than assumptions.",
    icon: Sparkles,
    featured: true,
  },

  {
    number: "05",
    eyebrow: "Craftsmanship",
    title: "Repair & Restoration",
    description:
      "Once the scope is agreed, the sofa can move through the appropriate restoration process with attention to the original character and requirements of the piece.",
    icon: Hammer,
  },

  {
    number: "06",
    eyebrow: "Back to Your Space",
    title: "Ready to Be Enjoyed Again",
    description:
      "The goal is to return the sofa to your space with renewed purpose — keeping what made it worth saving while addressing the areas that prevented you from enjoying it fully.",
    icon: PackageCheck,
  },
];

/* =========================================================
   ROOT
========================================================= */

export default function SofaRestorationProcessSection() {
  return (
    <section
      aria-labelledby="sofa-restoration-process-heading"
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
        {/* =====================================================
            OUTER SHELL
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

              relative
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
            <SubtleBackground />

            {/* =================================================
                HEADER
            ================================================== */}

            <div
              className="
                relative
                z-10

                grid
                gap-5

                lg:grid-cols-[1fr_0.78fr]
                lg:items-end
                lg:gap-12
              "
            >
              <div>
                <div className="flex items-center gap-3">
                  <span className="h-px w-9 bg-[var(--brand-gold)]" />

                  <span
                    className="
                      font-brand-sans

                      text-[11px]
                      font-bold
                      uppercase

                      tracking-[0.22em]

                      text-[var(--brand-gold-700)]

                      sm:text-[12px]
                    "
                  >
                    Our Restoration Process
                  </span>
                </div>

                <h2
                  id="sofa-restoration-process-heading"
                  className="
                    mt-4

                    max-w-[760px]

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
                  A Restoration Process Built Around the Sofa
                  <span className="text-[var(--brand-gold)]">.</span>
                </h2>
              </div>

              <div className="max-w-[520px] lg:justify-self-end">
                <p
                  className="
                    font-brand-display

                    text-[19px]
                    font-medium
                    italic
                    leading-[1.4]

                    text-[var(--brand-navy)]

                    sm:text-[21px]
                  "
                >
                  You do not need to diagnose the problem before contacting us.
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
                  Start by showing us the sofa. From there, we can work towards
                  understanding its condition and the most appropriate
                  direction.
                </p>
              </div>
            </div>

            {/* =================================================
                QUICK PATH
            ================================================== */}

            <div
              className="
                relative
                z-10

                mt-7

                hidden

                rounded-[20px]

                bg-[var(--brand-navy)]

                px-5
                py-4

                md:block
              "
            >
              <ProcessOverview />
            </div>

            {/* =================================================
                PROCESS GRID
            ================================================== */}

            <div
              className="
                relative
                z-10

                mt-6

                grid
                gap-3

                lg:grid-cols-2
                lg:gap-4
              "
            >
              {processSteps.map((step) => (
                <ProcessStepCard key={step.number} step={step} />
              ))}
            </div>

            {/* =================================================
                FINAL MESSAGE
            ================================================== */}

            <div
              className="
                relative
                z-10

                mt-6

                rounded-[20px]

                bg-[var(--brand-navy)]

                px-4
                py-4

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

                      text-[13px]
                      font-bold
                      uppercase

                      tracking-[0.18em]

                      text-[var(--brand-gold)]
                    "
                  >
                    The Goal
                  </span>

                  <p
                    className="
                      mt-1

                      max-w-[900px]

                      font-brand-display

                      text-[18px]
                      font-semibold
                      leading-[1.35]

                      text-white

                      sm:text-[21px]

                      lg:text-[23px]
                    "
                  >
                    Keep what made the sofa worth saving, while addressing what
                    stopped you from enjoying it.
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
          top-[15px]

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
                h-[30px]
                w-[30px]

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

                text-[13px]
                font-semibold

                text-white/60

                lg:text-[11px]
              "
            >
              {step.eyebrow}
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

  if (step.featured) {
    return <FeaturedStep step={step} />;
  }

  return (
    <article
      className="
        clay-surface-soft

        rounded-[20px]

        p-[5px]
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
        {/* TOP */}

        <div
          className="
            flex
            items-start
            gap-3

            sm:gap-4
          "
        >
          <span
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
          </span>

          <div className="min-w-0 flex-1">
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

                  text-[13px]
                  font-bold
                  uppercase

                  tracking-[0.16em]

                  text-[var(--brand-gold-700)]
                "
              >
                {step.eyebrow}
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

        {/* COPY */}

        <div
          className="
            mt-4

            border-t
            border-[var(--brand-navy)]/[0.08]

            pt-4
          "
        >
          <p
            className="
              font-brand-sans

              text-[13px]
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
                mt-2.5

                font-brand-sans

                text-[13px]
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

          {step.checklist && <PhotoChecklist items={step.checklist} />}
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   FEATURED STEP — 04
========================================================= */

function FeaturedStep({ step }: { step: ProcessStep }) {
  const Icon = step.icon;

  return (
    <article
      className="
        rounded-[20px]

        bg-[var(--brand-navy)]

        px-4
        py-5

        sm:px-5
        sm:py-5
      "
    >
      <div
        className="
          flex
          items-start
          gap-3

          sm:gap-4
        "
      >
        <span
          className="
            flex
            h-11
            w-11

            shrink-0

            flex-col
            items-center
            justify-center

            rounded-full

            bg-[var(--brand-gold)]
          "
        >
          <span
            className="
              font-brand-sans

              text-[5px]
              font-bold
              uppercase

              tracking-[0.1em]

              text-[var(--brand-navy)]/65
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

              text-[var(--brand-navy)]
            "
          >
            {step.number}
          </span>
        </span>

        <div className="min-w-0 flex-1">
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
                text-[var(--brand-gold)]
              "
            />

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
              {step.eyebrow}
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

              text-white

              sm:text-[22px]
            "
          >
            {step.title}
          </h3>
        </div>
      </div>

      <div
        className="
          mt-4

          border-t
          border-white/[0.08]

          pt-4
        "
      >
        <p
          className="
            font-brand-sans

            text-[13px]
            font-medium
            leading-[1.7]

            text-white/65

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

              text-[13px]
              font-medium
              leading-[1.7]

              text-white/55

              sm:text-[11px]

              lg:text-[12px]
            "
          >
            {step.secondary}
          </p>
        )}
      </div>
    </article>
  );
}

/* =========================================================
   PHOTO CHECKLIST
========================================================= */

function PhotoChecklist({ items }: { items: string[] }) {
  return (
    <div
      className="
        mt-4

        rounded-[15px]

        bg-[var(--brand-navy)]

        px-3.5
        py-3.5
      "
    >
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
        Where Possible, Include
      </span>

      <div
        className="
          mt-3

          grid
          gap-2
        "
      >
        {items.map((item) => (
          <div
            key={item}
            className="
              flex
              items-start
              gap-2.5
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
              <Check size={8} strokeWidth={2.2} />
            </span>

            <span
              className="
                font-brand-sans

                text-[11px]
                font-medium
                leading-[1.5]

                text-white/65

                sm:text-[12px]
              "
            >
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   BACKGROUND
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
      <div
        className="
          absolute

          -right-[110px]
          -top-[140px]

          hidden

          h-[290px]
          w-[290px]

          rounded-full

          border
          border-[var(--brand-gold)]/10

          lg:block
        "
      />

      <div
        className="
          absolute

          -bottom-[130px]
          left-[30%]

          hidden

          h-[240px]
          w-[430px]

          rounded-full

          bg-white/20

          blur-3xl

          lg:block
        "
      />
    </div>
  );
}
