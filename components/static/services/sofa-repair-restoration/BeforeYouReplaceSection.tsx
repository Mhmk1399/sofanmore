import {
  Camera,
  Heart,
  History,
  LayoutTemplate,
  MessageSquareText,
  Search,
  ShieldCheck,
  Sofa,
  Sparkles,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

/* =========================================================
   DATA
========================================================= */

const restorationReasons = [
  {
    icon: LayoutTemplate,
    title: "It Still Fits the Room",
    text: "The proportions and scale still work well in your space.",
  },
  {
    icon: Heart,
    title: "It Has Personal Meaning",
    text: "The sofa carries memories or value that cannot simply be replaced.",
  },
  {
    icon: Sparkles,
    title: "You Love Its Character",
    text: "The shape, style or presence of the sofa is still worth preserving.",
  },
  {
    icon: ShieldCheck,
    title: "It Was Made to Last",
    text: "The underlying piece may be worth restoring rather than discarding.",
  },
] satisfies {
  icon: LucideIcon;
  title: string;
  text: string;
}[];

const assessmentInputs = [
  {
    number: "01",
    icon: MessageSquareText,
    label: "What Changed?",
    text: "Tell us what no longer looks, feels or works as it should.",
  },
  {
    number: "02",
    icon: Camera,
    label: "Show the Condition",
    text: "Photographs can help us understand the visible condition of the sofa.",
  },
  {
    number: "03",
    icon: Search,
    label: "Assess What Can Be Saved",
    text: "We can then consider the most appropriate restoration direction.",
  },
] satisfies {
  number: string;
  icon: LucideIcon;
  label: string;
  text: string;
}[];

/* =========================================================
   ROOT
========================================================= */

export default function BeforeYouReplaceSection() {
  return (
    <section
      aria-labelledby="before-you-replace-heading"
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
                MAIN GRID
            ================================================== */}

            <div
              className="
                relative
                z-10

                grid
                gap-8

                lg:grid-cols-[0.92fr_1.08fr]
                lg:items-center
                lg:gap-12

                xl:gap-16
              "
            >
              {/* =================================================
                  LEFT / COPY
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

                      bg-[var(--brand-navy)]

                      text-[var(--brand-gold)]
                    "
                  >
                    <History size={15} strokeWidth={1.5} />
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
                    Before Replacing
                  </span>
                </div>

                {/* HEADING */}

                <h2
                  id="before-you-replace-heading"
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
                  Before You Replace It, See What Can Be Restored
                  <span className="text-[var(--brand-gold)]">.</span>
                </h2>

                {/* LEAD */}

                <p
                  className="
                    mt-6

                    max-w-[620px]

                    font-brand-display

                    text-[19px]
                    font-medium
                    italic
                    leading-[1.4]

                    text-[var(--brand-navy)]

                    sm:text-[21px]
                  "
                >
                  It is easy to assume that a tired or damaged sofa has reached
                  the end of its life.
                </p>

                {/* KEY INTERRUPT */}

                <div
                  className="
                    mt-5

                    border-l-2
                    border-[var(--brand-gold)]

                    pl-4
                  "
                >
                  <p
                    className="
                      font-brand-display

                      text-[23px]
                      font-semibold
                      leading-[1.25]

                      text-[var(--brand-navy)]

                      sm:text-[26px]
                    "
                  >
                    That is not always the case.
                  </p>
                </div>

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
                    If the proportions still work for your room, the sofa has
                    personal meaning, you love its character or the piece was
                    made to a standard you want to preserve, professional
                    restoration may be worth exploring.
                  </p>

                  <p>The first step is not deciding how much work it needs.</p>
                </div>

                {/* FIRST STEP */}

                <div
                  className="
                    mt-6

                    rounded-[18px]

                    bg-[var(--brand-navy)]

                    px-4
                    py-4

                    sm:px-5
                    sm:py-5
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
                    The First Step
                  </span>

                  <p
                    className="
                      mt-1.5

                      max-w-[580px]

                      font-brand-display

                      text-[19px]
                      font-semibold
                      leading-[1.35]

                      text-white

                      sm:text-[21px]
                    "
                  >
                    Understand what can realistically be saved.
                  </p>
                </div>
              </div>

              {/* =================================================
                  RIGHT / ASSESSMENT PANEL
              ================================================== */}

              <RestorationAssessmentPanel />
            </div>

            {/* =================================================
                WHAT WE NEED TO UNDERSTAND
            ================================================== */}

            <div
              className="
                relative
                z-10

                mt-7

                border-t
                border-[var(--brand-navy)]/10

                pt-6

                lg:mt-9
                lg:pt-8
              "
            >
              <div
                className="
                  flex
                  flex-col

                  gap-2

                  sm:flex-row
                  sm:items-end
                  sm:justify-between
                "
              >
                <div>
                  <span
                    className="
                      font-brand-sans

                      text-[7px]
                      font-bold
                      uppercase

                      tracking-[0.18em]

                      text-[var(--brand-gold-700)]
                    "
                  >
                    A Simple Starting Point
                  </span>

                  <h3
                    className="
                      mt-1.5

                      max-w-[660px]

                      font-brand-display

                      text-[23px]
                      font-semibold
                      leading-[1.2]

                      text-[var(--brand-navy)]

                      sm:text-[27px]
                    "
                  >
                    Show us the sofa as it is now.
                  </h3>
                </div>

                <p
                  className="
                    max-w-[460px]

                    font-brand-sans

                    text-[10px]
                    font-medium
                    leading-[1.65]

                    text-[var(--brand-text-muted)]

                    sm:text-[11px]
                  "
                >
                  Tell us what has changed, show us the current condition and
                  let us assess the most appropriate direction.
                </p>
              </div>

              <div
                className="
                  mt-5

                  grid
                  gap-2.5

                  sm:grid-cols-3
                "
              >
                {assessmentInputs.map(({ number, icon: Icon, label, text }) => (
                  <AssessmentStep
                    key={number}
                    number={number}
                    icon={Icon}
                    label={label}
                    text={text}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   RESTORATION ASSESSMENT PANEL
========================================================= */

function RestorationAssessmentPanel() {
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

          rounded-[21px]

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
            <Sofa size={16} strokeWidth={1.5} />
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
              Worth Exploring?
            </span>

            <h3
              className="
                mt-1.5

                max-w-[460px]

                font-brand-display

                text-[24px]
                font-semibold
                leading-[1.15]

                tracking-[-0.025em]

                text-[var(--brand-navy)]

                sm:text-[27px]
              "
            >
              Restoration can make sense for more than one reason.
            </h3>
          </div>
        </div>

        {/* REASONS */}

        <div
          className="
            mt-5

            grid
            gap-2.5

            sm:grid-cols-2
          "
        >
          {restorationReasons.map(({ icon: Icon, title, text }) => (
            <RestorationReason
              key={title}
              icon={Icon}
              title={title}
              text={text}
            />
          ))}
        </div>

        {/* BOTTOM MESSAGE */}

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
              <Search size={13} strokeWidth={1.7} />
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
                Assess First
              </span>

              <p
                className="
                  mt-1

                  font-brand-display

                  text-[17px]
                  font-medium
                  leading-[1.35]

                  text-white

                  sm:text-[19px]
                "
              >
                You do not need to know what needs repairing before you contact
                us.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   RESTORATION REASON
========================================================= */

function RestorationReason({
  icon: Icon,
  title,
  text,
}: {
  icon: LucideIcon;
  title: string;
  text: string;
}) {
  return (
    <article
      className="
        clay-surface-soft

        rounded-[17px]

        px-3.5
        py-3.5
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

            bg-[var(--brand-navy)]

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

              text-[var(--brand-navy)]

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

              text-[var(--brand-text-muted)]

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

/* =========================================================
   ASSESSMENT STEP
========================================================= */

function AssessmentStep({
  number,
  icon: Icon,
  label,
  text,
}: {
  number: string;
  icon: LucideIcon;
  label: string;
  text: string;
}) {
  return (
    <article
      className="
        clay-surface-soft

        rounded-[18px]

        p-[5px]
      "
    >
      <div
        className="
          clay-inset

          h-full

          rounded-[14px]

          px-3.5
          py-3.5
        "
      >
        <div
          className="
            flex
            items-center
            justify-between

            gap-3
          "
        >
          <span
            className="
              flex
              h-8
              w-8

              items-center
              justify-center

              rounded-full

              bg-[var(--brand-navy)]

              text-[var(--brand-gold)]
            "
          >
            <Icon size={13} strokeWidth={1.5} />
          </span>

          <span
            className="
              font-brand-display

              text-[19px]
              font-semibold

              text-[var(--brand-gold-700)]/45
            "
          >
            {number}
          </span>
        </div>

        <h4
          className="
            mt-3

            font-brand-display

            text-[17px]
            font-semibold
            leading-[1.2]

            text-[var(--brand-navy)]

            sm:text-[18px]
          "
        >
          {label}
        </h4>

        <p
          className="
            mt-1.5

            font-brand-sans

            text-[9px]
            font-medium
            leading-[1.6]

            text-[var(--brand-text-muted)]

            sm:text-[10px]
          "
        >
          {text}
        </p>
      </div>
    </article>
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
          left-[28%]

          hidden

          h-[220px]
          w-[400px]

          rounded-full

          bg-white/20

          blur-3xl

          lg:block
        "
      />
    </div>
  );
}
