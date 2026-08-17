import Link from "next/link";

import { Check, Ruler, Users } from "lucide-react";

/* =========================================================
   DATA
========================================================= */

const practicalQuestions = [
  "Who will use the sofa?",
  "How frequently will it be used?",
  "How many people should it accommodate?",
  "What floor area is available?",
  "Will it pass through the entrance, corridor, lift or staircase?",
  "What seat depth and height will feel appropriate?",
  "How does it relate to the architecture?",
  "What materials surround it?",
  "Is it intended for a home, restaurant, hotel or workplace?",
  "Does an existing sofa need replacing, or could it be restored?",
];

/* =========================================================
   ROOT
========================================================= */

export default function DesignedAroundUseSection() {
  return (
    <section
      aria-labelledby="designed-around-use-heading"
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

                lg:grid-cols-[0.82fr_1.18fr]
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
                    <Ruler size={15} strokeWidth={1.5} />
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
                    Practical Design Matters
                  </span>
                </div>

                {/* H2 */}

                <h2
                  id="designed-around-use-heading"
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

                    lg:text-[clamp(45px,3.7vw,58px)]
                  "
                >
                  Designed Around Use, Not Only Appearance
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
                  A sofa may look impressive in a photograph and still be
                  unsuitable for the room.
                </p>

                {/* BODY */}

                <p
                  className="
                    mt-5

                    max-w-[640px]

                    font-brand-sans

                    text-[12px]
                    font-medium
                    leading-[1.75]

                    text-[var(--brand-text-muted)]

                    sm:text-[13px]

                    lg:text-[14px]
                  "
                >
                  A considered project looks beyond appearance and asks how the
                  sofa, seating or wider interior needs to work in everyday use.
                </p>

                {/* KEY IDEA */}

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
                    Form + Function
                  </span>

                  <p
                    className="
                      mt-1.5

                      max-w-[560px]

                      font-brand-display

                      text-[20px]
                      font-semibold
                      leading-[1.35]

                      text-[var(--brand-navy)]

                      sm:text-[22px]
                    "
                  >
                    Practical decisions are part of the design — not something
                    considered after it.
                  </p>
                </div>
              </div>

              {/* =================================================
                  QUESTIONS PANEL
              ================================================== */}

              <PracticalQuestionsPanel />
            </div>

            {/* =================================================
                FINAL STATEMENT
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

                lg:mt-9
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

                      tracking-[0.18em]

                      text-[var(--brand-gold)]
                    "
                  >
                    Beyond the First Impression
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
                    These are the decisions that allow the finished result to
                    remain useful after the first impression.
                  </p>
                </div>
              </div>
            </div>

            {/* =================================================
                QUIET INTERNAL LINKS
            ================================================== */}

            <div
              className="
                relative
                z-10

                mt-5

                flex
                flex-wrap
                items-center

                gap-x-2
                gap-y-1.5
              "
            >
              <span
                className="
                  mr-1

                  font-brand-sans

                  text-[7px]
                  font-bold
                  uppercase

                  tracking-[0.14em]

                  text-[var(--brand-text-muted)]
                "
              >
                Explore:
              </span>

              <ServiceTextLink
                href="/services/bespoke-sofas"
                label="Bespoke Sofas"
              />

              <Separator />

              <ServiceTextLink
                href="/services/commercial-sofas"
                label="Commercial Sofas"
              />

              <Separator />

              <ServiceTextLink
                href="/services/interior-design"
                label="Interior Design"
              />

              <Separator />

              <ServiceTextLink
                href="/services/sofa-repair-restoration"
                label="Sofa Repair & Restoration"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   PRACTICAL QUESTIONS PANEL
========================================================= */

function PracticalQuestionsPanel() {
  return (
    <div
      className="
        mx-auto

        w-full
        max-w-[720px]

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

              bg-[var(--brand-navy)]

              text-[var(--brand-gold)]
            "
          >
            <Users size={15} strokeWidth={1.5} />
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
              Questions That Shape the Result
            </span>

            <h3
              className="
                mt-1.5

                max-w-[530px]

                font-brand-display

                text-[23px]
                font-semibold
                leading-[1.18]

                tracking-[-0.025em]

                text-[var(--brand-navy)]

                sm:text-[26px]
              "
            >
              Before choosing how it looks, understand how it needs to work.
            </h3>
          </div>
        </div>

        {/* QUESTIONS */}

        <div
          className="
            mt-5

            grid
            gap-x-6
            gap-y-2.5

            sm:grid-cols-2
          "
        >
          {practicalQuestions.map((question) => (
            <QuestionRow key={question} question={question} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   QUESTION ROW
========================================================= */

function QuestionRow({ question }: { question: string }) {
  return (
    <div
      className="
        flex
        items-start
        gap-2.5

        border-b
        border-[var(--brand-navy)]/[0.07]

        py-2.5
      "
    >
      <span
        className="
          mt-[2px]

          flex
          h-5
          w-5

          shrink-0

          items-center
          justify-center

          rounded-full

          bg-[var(--brand-navy)]

          text-[var(--brand-gold)]
        "
      >
        <Check size={9} strokeWidth={2} />
      </span>

      <p
        className="
          font-brand-sans

          text-[9px]
          font-semibold
          leading-[1.55]

          text-[var(--brand-navy)]

          sm:text-[10px]

          lg:text-[11px]
        "
      >
        {question}
      </p>
    </div>
  );
}

/* =========================================================
   QUIET INTERNAL LINK
========================================================= */

function ServiceTextLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="
        font-brand-sans

        text-[8px]
        font-semibold

        text-[var(--brand-navy)]

        underline
        decoration-[var(--brand-gold)]/45
        decoration-1
        underline-offset-4

        transition-colors
        duration-200

        hover:text-[var(--brand-gold-700)]

        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-[var(--brand-gold)]
        focus-visible:ring-offset-2

        sm:text-[9px]
      "
    >
      {label}
    </Link>
  );
}

function Separator() {
  return (
    <span
      aria-hidden
      className="
        text-[8px]
        text-[var(--brand-navy)]/20
      "
    >
      /
    </span>
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

          -bottom-[125px]
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
