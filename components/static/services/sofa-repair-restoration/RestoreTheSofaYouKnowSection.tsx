import {
  Check,
  CircleHelp,
  Maximize2,
  Palette,
  Scale,
  Sofa,
  Sparkles,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

/* =========================================================
   DATA
========================================================= */

const replacementQuestions = [
  {
    text: "Will the new one fit?",
    icon: Maximize2,
  },
  {
    text: "Will the proportions work?",
    icon: Scale,
  },
  {
    text: "Will it be as comfortable?",
    icon: Sofa,
  },
  {
    text: "Will the fabric look right in the room?",
    icon: Palette,
  },
  {
    text: "Will the quality feel the same?",
    icon: Sparkles,
  },
] satisfies {
  text: string;
  icon: LucideIcon;
}[];

const knownAdvantages = [
  "You already know its scale.",
  "You know how it sits in the space.",
  "You know how the room works around it.",
];

/* =========================================================
   ROOT
========================================================= */

export default function RestoreTheSofaYouKnowSection() {
  return (
    <section
      aria-labelledby="restore-sofa-you-know-heading"
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
            OUTER CLAY SHELL
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
                TOP GRID
            ================================================== */}

            <div
              className="
                relative
                z-10

                grid
                gap-8

                lg:grid-cols-[0.93fr_1.07fr]
                lg:items-center
                lg:gap-12

                xl:gap-16
              "
            >
              {/* =================================================
                  COPY
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
                    Keep What Already Works
                  </span>
                </div>

                {/* HEADING */}

                <h2
                  id="restore-sofa-you-know-heading"
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
                  Restore the Sofa You Already Know Fits
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
                  Replacing a sofa can create a new problem.
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
                    When an existing sofa already works with your room,
                    restoring it can remove much of the uncertainty that comes
                    with starting again.
                  </p>

                  <p>
                    You already understand its proportions, its relationship
                    with the room and how it feels in everyday use.
                  </p>
                </div>

                {/* KEY MESSAGE */}

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

                      text-[13px]
                      font-bold
                      uppercase

                      tracking-[0.17em]

                      text-[var(--brand-gold-700)]
                    "
                  >
                    Build on What Works
                  </span>

                  <p
                    className="
                      mt-1.5

                      max-w-[590px]

                      font-brand-display

                      text-[21px]
                      font-semibold
                      leading-[1.3]

                      text-[var(--brand-navy)]

                      sm:text-[23px]
                    "
                  >
                    Instead of beginning again, restoration can build on
                    something that already belongs.
                  </p>
                </div>
              </div>

              {/* =================================================
                  DECISION PANEL
              ================================================== */}

              <KnownFitPanel />
            </div>

            {/* =================================================
                FINAL STRIP
            ================================================== */}

            <div
              className="
                relative
                z-10

                mt-7

                rounded-[20px]

                bg-[var(--brand-navy)]

                px-4
                py-4

                sm:px-5
                sm:py-5

                lg:mt-9
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
                    A Known Starting Point
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
                    If the sofa already belongs in the room, restoration can
                    focus on helping it work well there again.
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
   KNOWN FIT PANEL
========================================================= */

function KnownFitPanel() {
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
          clay-inset

          overflow-hidden

          rounded-[21px]

          px-4
          py-5

          sm:rounded-[24px]
          sm:px-6
          sm:py-6
        "
      >
        {/* =====================================================
            REPLACEMENT QUESTIONS
        ====================================================== */}

        <div>
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

                bg-[var(--brand-navy)]

                text-[var(--brand-gold)]
              "
            >
              <CircleHelp size={16} strokeWidth={1.5} />
            </span>

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
                Replacing Means New Questions
              </span>

              <h3
                className="
                  mt-1.5

                  max-w-[470px]

                  font-brand-display

                  text-[24px]
                  font-semibold
                  leading-[1.15]

                  tracking-[-0.025em]

                  text-[var(--brand-navy)]

                  sm:text-[27px]
                "
              >
                A new sofa means starting from uncertainty again.
              </h3>
            </div>
          </div>

          {/* QUESTIONS */}

          <div
            className="
              mt-5

              grid
              gap-2
            "
          >
            {replacementQuestions.map(({ text, icon: Icon }) => (
              <div
                key={text}
                className="
                    clay-surface-soft

                    flex
                    items-center
                    gap-3

                    rounded-[14px]

                    px-3
                    py-2.5
                  "
              >
                <span
                  className="
                      flex
                      h-7
                      w-7

                      shrink-0

                      items-center
                      justify-center

                      rounded-full

                      bg-[var(--brand-navy)]

                      text-[var(--brand-gold)]
                    "
                >
                  <Icon size={12} strokeWidth={1.5} />
                </span>

                <span
                  className="
                      font-brand-sans

                      text-[12px]
                      font-semibold
                      leading-[1.4]

                      text-[var(--brand-navy)]

                      sm:text-[13px]
                    "
                >
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* =====================================================
            DIVIDER
        ====================================================== */}

        <div
          className="
            my-5

            h-px
            w-full

            bg-[var(--brand-navy)]/10
          "
        />

        {/* =====================================================
            WHAT YOU ALREADY KNOW
        ====================================================== */}

        <div
          className="
            rounded-[18px]

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
                With Your Existing Sofa
              </span>

              <h3
                className="
                  mt-1.5

                  font-brand-display

                  text-[21px]
                  font-semibold
                  leading-[1.2]

                  text-white

                  sm:text-[23px]
                "
              >
                Some of the biggest questions are already answered.
              </h3>
            </div>
          </div>

          <div
            className="
              mt-4

              space-y-2.5
            "
          >
            {knownAdvantages.map((item) => (
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
                    mt-[2px]

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

                    text-[12px]
                    font-medium
                    leading-[1.55]

                    text-white/70

                    sm:text-[13px]
                  "
                >
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
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

          -right-[105px]
          -top-[135px]

          hidden

          h-[280px]
          w-[280px]

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
          left-[28%]

          hidden

          h-[230px]
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
