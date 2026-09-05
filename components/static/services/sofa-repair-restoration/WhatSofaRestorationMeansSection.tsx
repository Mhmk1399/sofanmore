import { Armchair, Layers3, ShieldCheck, Sofa, Sparkles } from "lucide-react";

import type { LucideIcon } from "lucide-react";

/* =========================================================
   DATA
========================================================= */

const restorationAreas = [
  {
    anchorIds: ["sofa-reupholstery", "commercial-upholstery"],
    title: "Appearance",
    text: "The visible condition, upholstery and details that shape how the sofa looks.",
    icon: Sparkles,
  },
  {
    anchorIds: ["cushion-refilling"],
    title: "Comfort",
    text: "How the sofa supports you and how comfortable it feels in everyday use.",
    icon: Armchair,
  },
  {
    title: "Structure",
    text: "The underlying condition of the piece and the areas that may need attention.",
    icon: ShieldCheck,
  },
  {
    title: "Combined Restoration",
    text: "Where appropriate, several elements can be considered together as one restoration project.",
    icon: Layers3,
  },
] satisfies {
  anchorIds?: string[];
  title: string;
  text: string;
  icon: LucideIcon;
}[];

/* =========================================================
   ROOT
========================================================= */

export default function WhatSofaRestorationMeansSection() {
  return (
    <section
      aria-labelledby="what-sofa-restoration-means-heading"
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

                lg:grid-cols-[0.92fr_1.08fr]
                lg:items-center
                lg:gap-12

                xl:gap-16
              "
            >
              {/* =================================================
                  CONTENT
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
                    Understanding Restoration
                  </span>
                </div>

                {/* HEADING */}

                <h2
                  id="what-sofa-restoration-means-heading"
                  className="
                    mt-4

                    max-w-[700px]

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
                  What Does Sofa Restoration Mean
                  <span className="text-[var(--brand-gold)]">?</span>
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
                  Restoration is not simply about making an old sofa look new.
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
                    It is about understanding what should be preserved, what
                    needs attention and how the piece can continue to work in
                    your home.
                  </p>

                  <p>
                    Depending on the condition of the sofa and the agreed scope,
                    the process may focus on its appearance, comfort, structure
                    or a combination of different elements.
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
                    Preserve What Matters
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
                    The goal is not to erase the sofa&apos;s identity.
                  </p>
                </div>
              </div>

              {/* =================================================
                  RESTORATION AREAS
              ================================================== */}

              <RestorationAreasPanel />
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

                      text-[13px]
                      font-bold
                      uppercase

                      tracking-[0.18em]

                      text-[var(--brand-gold)]
                    "
                  >
                    The Objective
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
                    Help recover the qualities that made you want to keep the
                    sofa in the first place.
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
   RESTORATION AREAS PANEL
========================================================= */

function RestorationAreasPanel() {
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
        {/* HEADER */}

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
            What Restoration May Address
          </span>

          <h3
            className="
              mt-1.5

              max-w-[500px]

              font-brand-display

              text-[24px]
              font-semibold
              leading-[1.15]

              tracking-[-0.025em]

              text-[var(--brand-navy)]

              sm:text-[27px]
            "
          >
            The right scope depends on the individual sofa.
          </h3>

          <p
            className="
              mt-3

              max-w-[510px]

              font-brand-sans

              text-[13px]
              font-medium
              leading-[1.65]

              text-[var(--brand-text-muted)]

              sm:text-[11px]
            "
          >
            Restoration does not have to mean changing everything. The areas
            that need attention can be considered around the condition of the
            piece and what you want to preserve.
          </p>
        </div>

        {/* ITEMS */}

        <div
          className="
            mt-5

            grid
            gap-2.5

            sm:grid-cols-2
          "
        >
          {restorationAreas.map(({ anchorIds, title, text, icon: Icon }) => (
            <RestorationArea
              key={title}
              anchorIds={anchorIds}
              title={title}
              text={text}
              icon={Icon}
            />
          ))}
        </div>

        {/* BOTTOM */}

        <div
          className="
            mt-5

            border-t
            border-[var(--brand-navy)]/10

            pt-5
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
                mt-[6px]

                h-2
                w-2

                shrink-0

                rounded-full

                bg-[var(--brand-gold)]
              "
            />

            <p
              className="
                max-w-[500px]

                font-brand-display

                text-[17px]
                font-medium
                leading-[1.35]

                text-[var(--brand-navy)]

                sm:text-[19px]
              "
            >
              Preserve what still works. Address what no longer does.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   RESTORATION AREA
========================================================= */

function RestorationArea({
  anchorIds,
  title,
  text,
  icon: Icon,
}: {
  anchorIds?: string[];
  title: string;
  text: string;
  icon: LucideIcon;
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
      {anchorIds?.map((anchorId) => (
        <span
          key={anchorId}
          id={anchorId}
          aria-hidden
          className="block h-0 scroll-mt-24"
        />
      ))}

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

              text-[17px]
              font-semibold
              leading-[1.2]

              text-[var(--brand-navy)]

              sm:text-[18px]
            "
          >
            {title}
          </h4>

          <p
            className="
              mt-1.5

              font-brand-sans

              text-[12px]
              font-medium
              leading-[1.6]

              text-[var(--brand-text-muted)]

              sm:text-[13px]
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
