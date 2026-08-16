import {
  LayoutGrid,
  Maximize2,
  Palette,
  Route,
  UsersRound,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

type Benefit = {
  number: string;
  icon: LucideIcon;
  title: string;
  lead: string;
  body?: string;
};

/* =========================================================
   DATA
========================================================= */

const benefits: Benefit[] = [
  {
    number: "01",

    icon: LayoutGrid,

    title: "Made to Fit the Layout",

    lead: "Commercial spaces rarely follow standard sofa dimensions.",

    body: "Bespoke sizing means your seating can respond to the actual room, circulation routes and available footprint instead of forcing the room around a predefined product.",
  },

  {
    number: "02",

    icon: Palette,

    title: "Designed Around Your Brand",

    lead: "Your interior is part of how customers experience your business.",

    body: "Shape, proportion, upholstery, colour and finishing details can all contribute to the visual language of your restaurant, café, hotel or office. The sofa becomes part of the brand experience rather than an afterthought.",
  },

  {
    number: "03",

    icon: UsersRound,

    title: "Built Around How the Space Is Used",

    lead: "A sofa in a hotel lobby has a different job from a restaurant booth.",

    body: "An office breakout sofa has different requirements from seating inside a café. The right solution begins by understanding how people will actually interact with the space.",
  },

  {
    number: "04",

    icon: Maximize2,

    title: "Better Use of Valuable Space",

    lead: "Awkward corners, wall runs and unusual layouts can become valuable seating areas when the sofa is designed around the room.",

    body: "Made-to-measure sofas, booths and banquettes allow more deliberate use of the available footprint.",
  },

  {
    number: "05",

    icon: Route,

    title: "One Clear Design Direction",

    lead: "Instead of trying to combine unrelated ready-made products, bespoke commercial sofas can be developed as part of one coherent visual concept.",

    body: "That helps the finished space feel intentional from one area to the next.",
  },
];

/* =========================================================
   ROOT
========================================================= */

export default function WhyChooseCommercialSofasSection() {
  return (
    <section
      aria-labelledby="why-commercial-sofas-heading"
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
                    Why Bespoke
                  </span>
                </div>

                <h2
                  id="why-commercial-sofas-heading"
                  className="
                    mt-4

                    max-w-[680px]

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
                  Why Choose Bespoke Commercial Sofas
                  <span className="text-[var(--brand-gold)]">?</span>
                </h2>
              </div>

              <p
                className="
                  max-w-[560px]

                  font-brand-sans

                  text-[11px]
                  font-medium
                  leading-[1.72]

                  text-[var(--brand-text-muted)]

                  sm:text-[12px]

                  lg:justify-self-end
                  lg:text-[13px]
                "
              >
                Commercial seating needs to work with the layout, the people
                using the space and the identity of the business. A bespoke
                approach gives you greater control over each of those decisions.
              </p>
            </div>

            {/* =================================================
                BENEFITS
            ================================================== */}

            <div
              className="
                mt-7
                space-y-2.5

                lg:mt-8
              "
            >
              {benefits.map((benefit) => (
                <BenefitRow key={benefit.number} benefit={benefit} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   BENEFIT ROW
========================================================= */

function BenefitRow({ benefit }: { benefit: Benefit }) {
  const Icon = benefit.icon;

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
          lg:grid-cols-[0.36fr_0.64fr]
          lg:items-center
          lg:gap-8
        "
      >
        {/* =====================================================
            TITLE SIDE
        ====================================================== */}

        <div
          className="
            flex
            items-start
            gap-3

            sm:gap-4
          "
        >
          {/* ICON */}

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

          {/* TITLE */}

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
                {benefit.number}
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

                max-w-[320px]

                font-brand-display

                text-[20px]
                font-semibold
                leading-[1.08]

                tracking-[-0.02em]

                text-[var(--brand-navy)]

                sm:text-[22px]
              "
            >
              {benefit.title}
            </h3>
          </div>
        </div>

        {/* =====================================================
            COPY SIDE
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
              font-brand-sans

              text-[10px]
              font-semibold
              leading-[1.65]

              text-[var(--brand-navy)]

              sm:text-[11px]

              lg:text-[12px]
            "
          >
            {benefit.lead}
          </p>

          {benefit.body && (
            <p
              className="
                mt-2

                max-w-[760px]

                font-brand-sans

                text-[10px]
                font-medium
                leading-[1.68]

                text-[var(--brand-text-muted)]

                sm:text-[11px]

                lg:text-[12px]
              "
            >
              {benefit.body}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
