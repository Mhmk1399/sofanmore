import {
  CalendarDays,
  Check,
  CreditCard,
  FileText,
  Images,
  Palette,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

type WorkshopStep = {
  number: string;
  title: string;
  description: string;
  note?: string;
  icon: LucideIcon;
  featured?: boolean;
};

/* =========================================================
   DATA
========================================================= */

const workshopSteps: WorkshopStep[] = [
  {
    number: "01",
    title: "Visit or Arrange an Appointment",
    description:
      "Walk-ins are welcome during our customer hours, and appointments are available when you would prefer a dedicated project discussion.",
    note: "Appointments are particularly useful for detailed bespoke sofa consultations, commercial briefs and large repair drop-offs.",
    icon: CalendarDays,
  },
  {
    number: "02",
    title: "Share Your Project",
    description:
      "Bring photographs, dimensions, plans, reference images or the upholstered item itself.",
    note: "The more relevant information you provide, the more useful the initial conversation can be.",
    icon: Images,
  },
  {
    number: "03",
    title: "Explore Catalogues & Fabrics",
    description:
      "Browse our full catalogue collection and examine available fabric samples in person.",
    note: "We can discuss which options are most relevant to the appearance and practical needs of the project.",
    icon: Palette,
  },
  {
    number: "04",
    title: "Define the Direction",
    description:
      "The next step may involve agreeing dimensions, configuration, upholstery, repair requirements or a more detailed project specification.",
    icon: FileText,
  },
  {
    number: "05",
    title: "Place an Order or Agree the Next Step",
    description:
      "Once the appropriate details are clear, you can place an order and make payment at the workshop.",
    note: "For repair and restoration projects, we can agree whether the item should be dropped off, collected or assessed further.",
    icon: CreditCard,
    featured: true,
  },
];

/* =========================================================
   ROOT
========================================================= */

export default function WorkshopVisitProcessSection() {
  return (
    <section
      aria-labelledby="workshop-visit-process-heading"
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
            MAIN CLAY SHELL
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

            <div
              className="
                relative
                z-10

                grid
                gap-8

                lg:grid-cols-[0.34fr_0.66fr]
                lg:items-start
                lg:gap-12

                xl:gap-16
              "
            >
              {/* =================================================
                  LEFT — INTRO
              ================================================== */}

              <div className="lg:sticky lg:top-28">
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
                  Your Workshop Visit
                </span>

                <h2
                  id="workshop-visit-process-heading"
                  className="
                    mt-3

                    max-w-[520px]

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
                  How a Workshop
                  <span className="block">
                    Visit Works
                    <span className="text-[var(--brand-gold)]">.</span>
                  </span>
                </h2>

                <p
                  className="
                    mt-5

                    max-w-[470px]

                    font-brand-sans

                    text-[13px]
                    font-medium
                    leading-[1.75]

                    text-[var(--brand-text-muted)]

                    sm:text-[11px]

                    lg:text-[12px]
                  "
                >
                  From the first conversation to an agreed order, repair
                  arrangement or project brief, the workshop gives you a
                  practical place to work through the details.
                </p>

                {/* QUIET SUMMARY */}

                <div
                  className="
                    mt-6

                    flex
                    flex-wrap

                    gap-x-4
                    gap-y-2
                  "
                >
                  <SummaryPoint text="Walk-ins welcome" />
                  <SummaryPoint text="Appointments available" />
                  <SummaryPoint text="Free consultation" />
                </div>
              </div>

              {/* =================================================
                  RIGHT — STEPS
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
                    overflow-hidden

                    rounded-[18px]

                    bg-[#FFFDF8]/70

                    px-4

                    sm:px-5
                  "
                >
                  {workshopSteps.map((step, index) => (
                    <VisitStep
                      key={step.number}
                      step={step}
                      isLast={index === workshopSteps.length - 1}
                    />
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
   VISIT STEP
========================================================= */

function VisitStep({ step, isLast }: { step: WorkshopStep; isLast: boolean }) {
  const Icon = step.icon;

  if (step.featured) {
    return (
      <article
        className="
          my-4

          rounded-[18px]

          bg-[var(--brand-navy)]

          px-4
          py-5

          sm:px-5
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
          {/* NUMBER */}

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

              font-brand-display

              text-[14px]
              font-semibold

              text-[var(--brand-navy)]
            "
          >
            {step.number}
          </span>

          {/* CONTENT */}

          <div className="min-w-0 flex-1">
            <div
              className="
                flex
                items-start
                justify-between

                gap-4
              "
            >
              <div>
                <span
                  className="
                    font-brand-sans

                    text-[13px]
                    font-bold
                    uppercase

                    tracking-[0.17em]

                    text-[var(--brand-gold)]
                  "
                >
                  Final Step
                </span>

                <h3
                  className="
                    mt-1

                    max-w-[650px]

                    font-brand-display

                    text-[20px]
                    font-semibold
                    leading-[1.2]

                    text-white

                    sm:text-[23px]
                  "
                >
                  {step.title}
                </h3>
              </div>

              <Icon
                size={17}
                strokeWidth={1.5}
                className="
                  hidden
                  shrink-0

                  text-[var(--brand-gold)]

                  sm:block
                "
              />
            </div>

            <p
              className="
                mt-3

                max-w-[680px]

                font-brand-sans

                text-[12px]
                font-medium
                leading-[1.65]

                text-white/75

                sm:text-[13px]
              "
            >
              {step.description}
            </p>

            {step.note && (
              <p
                className="
                  mt-2

                  max-w-[680px]

                  font-brand-sans

                  text-[11px]
                  font-medium
                  leading-[1.6]

                  text-white/50

                  sm:text-[12px]
                "
              >
                {step.note}
              </p>
            )}
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      className={`
        py-5

        sm:py-6

        ${!isLast ? "border-b border-[var(--brand-navy)]/[0.08]" : ""}
      `}
    >
      <div
        className="
          flex
          items-start
          gap-3

          sm:gap-4
        "
      >
        {/* NUMBER */}

        <span
          className="
            flex
            h-10
            w-10

            shrink-0

            items-center
            justify-center

            rounded-full

            bg-[var(--brand-navy)]

            font-brand-display

            text-[14px]
            font-semibold

            text-[var(--brand-gold)]
          "
        >
          {step.number}
        </span>

        {/* CONTENT */}

        <div className="min-w-0 flex-1">
          <div
            className="
              flex
              items-start
              justify-between

              gap-4
            "
          >
            <h3
              className="
                max-w-[650px]

                font-brand-display

                text-[19px]
                font-semibold
                leading-[1.2]

                text-[var(--brand-navy)]

                sm:text-[22px]
              "
            >
              {step.title}
            </h3>

            <span
              className="
                hidden

                h-8
                w-8

                shrink-0

                items-center
                justify-center

                rounded-full

                bg-[var(--brand-navy)]/[0.05]

                text-[var(--brand-gold-700)]

                sm:flex
              "
            >
              <Icon size={13} strokeWidth={1.5} />
            </span>
          </div>

          <p
            className="
              mt-2.5

              max-w-[680px]

              font-brand-sans

              text-[12px]
              font-medium
              leading-[1.65]

              text-[var(--brand-text-muted)]

              sm:text-[13px]
            "
          >
            {step.description}
          </p>

          {step.note && (
            <p
              className="
                mt-2

                max-w-[680px]

                font-brand-sans

                text-[11px]
                font-medium
                leading-[1.6]

                text-[var(--brand-text-muted)]/75

                sm:text-[12px]
              "
            >
              {step.note}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   SUMMARY POINT
========================================================= */

function SummaryPoint({ text }: { text: string }) {
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

          bg-[var(--brand-gold)]

          text-[var(--brand-navy)]
        "
      >
        <Check size={8} strokeWidth={2} />
      </span>

      <span
        className="
          font-brand-sans

          text-[13px]
          font-semibold

          text-[var(--brand-navy)]

          sm:text-[11px]
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

          -right-[90px]
          -top-[100px]

          hidden

          h-[190px]
          w-[190px]

          rounded-full

          border
          border-[var(--brand-gold)]/10

          lg:block
        "
      />

      <div
        className="
          clay-surface-soft

          absolute

          right-[6%]
          top-[8%]

          hidden

          h-10
          w-10

          rounded-full

          opacity-35

          lg:block
        "
      />
    </div>
  );
}
