import {
  Heart,
  Ruler,
  Search,
  ShieldCheck,
  Sofa,
  Sparkles,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

import ClayButton from "@/components/ui/ClayButton";

/* =========================================================
   TYPES
========================================================= */

type DecisionPoint = {
  number: string;
  title: string;
  text: string;
  icon: LucideIcon;
};

/* =========================================================
   DATA
========================================================= */

const decisionPoints: DecisionPoint[] = [
  {
    number: "01",
    title: "Does It Fit Your Space Perfectly?",
    text: "Finding another sofa with exactly the same proportions may be more difficult than restoring the piece you already have.",
    icon: Ruler,
  },
  {
    number: "02",
    title: "Do You Still Love the Design?",
    text: "Trends change quickly. A sofa with good proportions and a design you still enjoy may deserve another chapter.",
    icon: Sparkles,
  },
  {
    number: "03",
    title: "Does It Have Personal Value?",
    text: "Not every decision can be reduced to replacement cost. A sofa connected to a home, family or particular period of your life may have value beyond its market price.",
    icon: Heart,
  },
  {
    number: "04",
    title: "Is the Sofa Worth Preserving?",
    text: "A well-made or bespoke piece can sometimes justify restoration more readily than replacing it with a lower-quality alternative.",
    icon: ShieldCheck,
  },
  {
    number: "05",
    title: "How Extensive Is the Damage?",
    text: "A relatively contained issue and a sofa requiring extensive work are two very different projects. Understanding the condition first helps you make a more informed decision.",
    icon: Search,
  },
];

/* =========================================================
   ROOT
========================================================= */

export default function RepairRestoreReplaceSection() {
  return (
    <section
      aria-labelledby="repair-restore-replace-heading"
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
                    <Sofa size={15} strokeWidth={1.5} />
                  </span>

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
                    Making the Right Decision
                  </span>
                </div>

                <h2
                  id="repair-restore-replace-heading"
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
                  Repair, Restore or Replace
                  <span className="text-[var(--brand-gold)]">?</span>
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
                  One of the first questions many people have is whether their
                  sofa is actually worth restoring.
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
                  There is no universal answer. The right decision starts with
                  understanding the sofa itself.
                </p>
              </div>
            </div>

            {/* =================================================
                DECISION INTRO
            ================================================== */}

            <div
              className="
                relative
                z-10

                mt-7

                rounded-[19px]

                bg-[var(--brand-navy)]

                px-4
                py-4

                sm:px-5
                sm:py-5
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
                  <Search size={14} strokeWidth={1.6} />
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
                    Consider the Sofa Itself
                  </span>

                  <p
                    className="
                      mt-1

                      max-w-[860px]

                      font-brand-display

                      text-[18px]
                      font-semibold
                      leading-[1.35]

                      text-white

                      sm:text-[20px]

                      lg:text-[22px]
                    "
                  >
                    Before deciding what to do, ask a few simple questions about
                    the piece you already have.
                  </p>
                </div>
              </div>
            </div>

            {/* =================================================
                DECISION POINTS
            ================================================== */}

            <div
              className="
                relative
                z-10

                mt-5

                grid
                gap-3

                md:grid-cols-2

                lg:gap-4
              "
            >
              {decisionPoints.map((item) => (
                <DecisionCard key={item.number} item={item} />
              ))}

              {/* =================================================
                  ASSESSMENT CARD
              ================================================== */}

              <AssessmentCard />
            </div>

            {/* =================================================
                CTA ROW
            ================================================== */}

            <div
              className="
                relative
                z-10

                mt-6

                flex
                flex-col

                gap-4

                border-t
                border-[var(--brand-navy)]/10

                pt-6

                sm:flex-row
                sm:items-center
                sm:justify-between
              "
            >
              <div className="max-w-[620px]">
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
                  Unsure What Your Sofa Needs?
                </span>

                <p
                  className="
                    mt-1.5

                    font-brand-display

                    text-[18px]
                    font-semibold
                    leading-[1.35]

                    text-[var(--brand-navy)]

                    sm:text-[20px]
                  "
                >
                  Send us the details and current condition of your sofa so we
                  can understand the starting point.
                </p>
              </div>

              <ClayButton
                href="#sofa-repair-enquiry"
                variant="gold"
                size="lg"
                showArrow
                className="max-sm:w-full"
                ariaLabel="Send Sofa N More details of your sofa"
              >
                Send Us Details of Your Sofa
              </ClayButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   DECISION CARD
========================================================= */

function DecisionCard({ item }: { item: DecisionPoint }) {
  const Icon = item.icon;

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
        <div
          className="
            flex
            items-start
            justify-between

            gap-4
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

              bg-[var(--brand-navy)]

              text-[var(--brand-gold)]
            "
          >
            <Icon size={14} strokeWidth={1.5} />
          </span>

          <span
            className="
              font-brand-display

              text-[26px]
              font-semibold
              leading-none

              text-[var(--brand-gold-700)]/30
            "
          >
            {item.number}
          </span>
        </div>

        <h3
          className="
            mt-4

            max-w-[470px]

            font-brand-display

            text-[20px]
            font-semibold
            leading-[1.16]

            tracking-[-0.02em]

            text-[var(--brand-navy)]

            sm:text-[22px]
          "
        >
          {item.title}
        </h3>

        <p
          className="
            mt-3

            max-w-[530px]

            font-brand-sans

            text-[13px]
            font-medium
            leading-[1.7]

            text-[var(--brand-text-muted)]

            sm:text-[11px]

            lg:text-[12px]
          "
        >
          {item.text}
        </p>
      </div>
    </article>
  );
}

/* =========================================================
   ASSESSMENT CARD
========================================================= */

function AssessmentCard() {
  return (
    <article
      className="
        rounded-[20px]

        bg-[var(--brand-navy)]

        px-4
        py-5

        sm:px-5
        sm:py-6
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

              text-[13px]
              font-bold
              uppercase

              tracking-[0.17em]

              text-[var(--brand-gold)]
            "
          >
            Why Assessment Matters
          </span>

          <h3
            className="
              mt-1.5

              max-w-[450px]

              font-brand-display

              text-[21px]
              font-semibold
              leading-[1.2]

              text-white

              sm:text-[23px]
            "
          >
            The condition changes the answer.
          </h3>

          <p
            className="
              mt-3

              max-w-[500px]

              font-brand-sans

              text-[13px]
              font-medium
              leading-[1.7]

              text-white/55

              sm:text-[11px]
            "
          >
            A contained issue and a sofa requiring extensive restoration are two
            very different projects. Seeing the current condition helps us
            understand what direction is realistic.
          </p>
        </div>
      </div>
    </article>
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

          -right-[100px]
          -top-[130px]

          hidden

          h-[270px]
          w-[270px]

          rounded-full

          border
          border-[var(--brand-gold)]/10

          lg:block
        "
      />

      <div
        className="
          absolute

          -bottom-[120px]
          left-[30%]

          hidden

          h-[230px]
          w-[420px]

          rounded-full

          bg-white/20

          blur-3xl

          lg:block
        "
      />
    </div>
  );
}
