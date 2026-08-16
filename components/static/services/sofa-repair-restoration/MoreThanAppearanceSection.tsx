import { Eye, Heart, RefreshCw, Sofa, Sparkles } from "lucide-react";

import type { LucideIcon } from "lucide-react";

/* =========================================================
   DATA
========================================================= */

const beforeRestoration = [
  {
    text: "You notice the worn area.",
    icon: Eye,
  },
  {
    text: "You adjust the way you sit.",
    icon: Sofa,
  },
  {
    text: "You cover the section you no longer like.",
    icon: Heart,
  },
  {
    text: "You start looking for replacements.",
    icon: RefreshCw,
  },
] satisfies {
  text: string;
  icon: LucideIcon;
}[];

/* =========================================================
   ROOT
========================================================= */

export default function MoreThanAppearanceSection() {
  return (
    <section
      aria-labelledby="more-than-appearance-heading"
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
                MAIN GRID
            ================================================== */}

            <div
              className="
                relative
                z-10

                grid
                gap-8

                lg:grid-cols-[0.94fr_1.06fr]
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
                    <Heart size={15} strokeWidth={1.5} />
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
                    More Than Appearance
                  </span>
                </div>

                {/* HEADING */}

                <h2
                  id="more-than-appearance-heading"
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
                  Repairing a Sofa Can Be About More Than Appearance
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
                  A damaged or tired sofa changes how you experience the room.
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
                    You notice the area that has worn. You adjust the way you
                    sit. You cover the section you no longer like.
                  </p>

                  <p>
                    Or you begin looking for replacements even though you would
                    rather keep what you have.
                  </p>
                </div>

                {/* KEY STATEMENT */}

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

                      text-[6px]
                      font-bold
                      uppercase

                      tracking-[0.17em]

                      text-[var(--brand-gold-700)]
                    "
                  >
                    What Restoration Changes
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
                    Restoration can change your relationship with the sofa, not
                    just its appearance.
                  </p>
                </div>
              </div>

              {/* =================================================
                  EXPERIENCE PANEL
              ================================================== */}

              <RestorationExperiencePanel />
            </div>

            {/* =================================================
                FINAL STATEMENT
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
                  <Sparkles size={14} strokeWidth={1.6} />
                </span>

                <div>
                  <span
                    className="
                      font-brand-sans

                      text-[6px]
                      font-bold
                      uppercase

                      tracking-[0.18em]

                      text-[var(--brand-gold)]
                    "
                  >
                    A Successful Restoration
                  </span>

                  <p
                    className="
                      mt-1

                      max-w-[920px]

                      font-brand-display

                      text-[18px]
                      font-semibold
                      leading-[1.35]

                      text-white

                      sm:text-[21px]

                      lg:text-[23px]
                    "
                  >
                    The sofa becomes something you enjoy looking at and using
                    again — instead of something you keep meaning to replace.
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
   EXPERIENCE PANEL
========================================================= */

function RestorationExperiencePanel() {
  return (
    <div
      className="
        mx-auto

        w-full
        max-w-[650px]

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
        {/* BEFORE */}

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
            Before Restoration
          </span>

          <h3
            className="
              mt-1.5

              max-w-[480px]

              font-brand-display

              text-[24px]
              font-semibold
              leading-[1.15]

              tracking-[-0.025em]

              text-[var(--brand-navy)]

              sm:text-[27px]
            "
          >
            The sofa slowly becomes something you work around.
          </h3>
        </div>

        {/* PAIN POINTS */}

        <div
          className="
            mt-5

            grid
            gap-2
          "
        >
          {beforeRestoration.map(({ text, icon: Icon }) => (
            <ExperiencePoint key={text} text={text} icon={Icon} />
          ))}
        </div>

        {/* DIVIDER */}

        <div
          className="
            my-5

            h-px

            bg-[var(--brand-navy)]/10
          "
        />

        {/* AFTER */}

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
              <Sofa size={14} strokeWidth={1.5} />
            </span>

            <div>
              <span
                className="
                  font-brand-sans

                  text-[6px]
                  font-bold
                  uppercase

                  tracking-[0.18em]

                  text-[var(--brand-gold)]
                "
              >
                After Restoration
              </span>

              <p
                className="
                  mt-1.5

                  max-w-[450px]

                  font-brand-display

                  text-[20px]
                  font-semibold
                  leading-[1.3]

                  text-white

                  sm:text-[22px]
                "
              >
                It can become a sofa you want to see, sit on and enjoy again.
              </p>
            </div>
          </div>

          <div
            className="
              mt-4

              grid
              gap-2

              sm:grid-cols-3
            "
          >
            <OutcomeItem label="Look at it again" />

            <OutcomeItem label="Use it comfortably" />

            <OutcomeItem label="Want to keep it" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   EXPERIENCE POINT
========================================================= */

function ExperiencePoint({
  text,
  icon: Icon,
}: {
  text: string;
  icon: LucideIcon;
}) {
  return (
    <div
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

          text-[9px]
          font-semibold
          leading-[1.45]

          text-[var(--brand-navy)]

          sm:text-[10px]
        "
      >
        {text}
      </span>
    </div>
  );
}

/* =========================================================
   OUTCOME
========================================================= */

function OutcomeItem({ label }: { label: string }) {
  return (
    <div
      className="
        rounded-[13px]

        border
        border-white/[0.07]

        bg-white/[0.04]

        px-3
        py-2.5

        text-center
      "
    >
      <span
        className="
          font-brand-sans

          text-[7px]
          font-bold
          uppercase

          leading-[1.35]

          tracking-[0.08em]

          text-white/68

          sm:text-[8px]
        "
      >
        {label}
      </span>
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

          -bottom-[125px]
          left-[28%]

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
