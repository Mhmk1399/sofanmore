import { Heart, History, Ruler, Sofa, Sparkles } from "lucide-react";

import type { LucideIcon } from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

type SofaType = {
  number: string;
  eyebrow: string;
  title: string;
  icon: LucideIcon;
  lead: string;
  paragraphs: string[];
};

/* =========================================================
   DATA
========================================================= */

const sofaTypes: SofaType[] = [
  {
    number: "01",
    eyebrow: "Modern Sofas",
    title: "Contemporary Sofa Repair",
    icon: Sofa,
    lead: "A modern sofa can still be worth preserving when its size, shape and design continue to work for your home.",
    paragraphs: [
      "If your sofa has become worn or damaged, we can assess its condition and discuss whether repair or restoration is an appropriate solution.",
    ],
  },

  {
    number: "02",
    eyebrow: "Made Around Your Space",
    title: "Bespoke Sofa Restoration",
    icon: Ruler,
    lead: "A sofa made specifically for a room can be difficult to replace.",
    paragraphs: [
      "Its proportions may have been chosen for a particular wall, alcove or layout.",
      "Restoring an existing bespoke sofa can preserve those dimensions while giving the piece renewed life.",
    ],
  },

  {
    number: "03",
    eyebrow: "Pieces With Character",
    title: "Older & Character Sofas",
    icon: History,
    lead: "Age can be part of what makes a sofa worth keeping.",
    paragraphs: [
      "Older pieces often have proportions, detailing and character that are difficult to reproduce through standard retail collections.",
      "Our restoration approach aims to respect what makes the piece distinctive while addressing the areas that need attention.",
    ],
  },

  {
    number: "04",
    eyebrow: "Personal Value",
    title: "Much-Loved Sofas Worth Keeping",
    icon: Heart,
    lead: "Not every reason to restore a sofa is practical. Sometimes you simply want to keep it.",
    paragraphs: [
      "It may have been part of your home for years. It may fit the room perfectly. It may have personal significance.",
      "Or you may simply prefer its design to anything available today.",
      "Those are all good reasons to explore restoration before replacement.",
    ],
  },
];

/* =========================================================
   ROOT
========================================================= */

export default function SofaTypesRepairSection({
  id = "sofa-restoration",
}: {
  id?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby="sofa-types-repair-heading"
      className="
        scroll-mt-24
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

                      text-[8px]
                      font-bold
                      uppercase

                      tracking-[0.22em]

                      text-[var(--brand-gold-700)]

                      sm:text-[9px]
                    "
                  >
                    Different Sofas · Different Stories
                  </span>
                </div>

                <h2
                  id="sofa-types-repair-heading"
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
                  Sofa Repair & Restoration for Different Types of Sofas
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
                  Every sofa arrives with a different history.
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
                  Some need attention because of everyday wear. Some have
                  visible damage. Some have lost the appearance or comfort they
                  once had. Others are older pieces their owners simply do not
                  want to replace.
                </p>
              </div>
            </div>

            {/* =================================================
                APPROACH STATEMENT
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
                    Our Approach
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
                    We shape the restoration around the individual sofa — not a
                    one-size-fits-all repair.
                  </p>
                </div>
              </div>
            </div>

            {/* =================================================
                SOFA TYPES
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
              {sofaTypes.map((item) => (
                <SofaTypeCard key={item.number} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   SOFA TYPE CARD
========================================================= */

function SofaTypeCard({ item }: { item: SofaType }) {
  const Icon = item.icon;

  return (
    <article
      className="
        clay-surface-soft

        rounded-[21px]

        p-[5px]
      "
    >
      <div
        className="
          clay-inset

          h-full

          rounded-[17px]

          px-4
          py-4

          sm:px-5
          sm:py-5

          lg:px-6
          lg:py-6
        "
      >
        {/* =====================================================
            TOP
        ====================================================== */}

        <div
          className="
            flex
            items-start
            justify-between

            gap-4
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

                bg-[var(--brand-navy)]

                text-[var(--brand-gold)]
              "
            >
              <Icon size={15} strokeWidth={1.5} />
            </span>

            <div>
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
                {item.eyebrow}
              </span>

              <h3
                className="
                  mt-1.5

                  max-w-[420px]

                  font-brand-display

                  text-[22px]
                  font-semibold
                  leading-[1.12]

                  tracking-[-0.025em]

                  text-[var(--brand-navy)]

                  sm:text-[24px]
                "
              >
                {item.title}
              </h3>
            </div>
          </div>

          {/* NUMBER */}

          <span
            className="
              shrink-0

              font-brand-display

              text-[27px]
              font-semibold
              leading-none

              text-[var(--brand-gold-700)]/30

              sm:text-[31px]
            "
          >
            {item.number}
          </span>
        </div>

        {/* =====================================================
            LEAD
        ====================================================== */}

        <p
          className="
            mt-5

            max-w-[540px]

            font-brand-display

            text-[17px]
            font-medium
            leading-[1.4]

            text-[var(--brand-navy)]

            sm:text-[18px]
          "
        >
          {item.lead}
        </p>

        {/* =====================================================
            COPY
        ====================================================== */}

        <div
          className="
            mt-4

            space-y-3

            border-t
            border-[var(--brand-navy)]/[0.08]

            pt-4
          "
        >
          {item.paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="
                  font-brand-sans

                  text-[10px]
                  font-medium
                  leading-[1.7]

                  text-[var(--brand-text-muted)]

                  sm:text-[11px]

                  lg:text-[12px]
                "
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* =====================================================
            FOOTER MARK
        ====================================================== */}

       
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
