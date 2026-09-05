import {
  Armchair,
  BriefcaseBusiness,
  Coffee,
  Hotel,
  Sofa,
  UtensilsCrossed,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

type CommercialSolution = {
  id?: string;
  number: string;
  title: string;
  shortDescription: string;
  paragraphs: string[];
  icon: LucideIcon;
};

/* =========================================================
   DATA
========================================================= */

const commercialSolutions: CommercialSolution[] = [
  {
    number: "01",

    title: "Restaurant Sofas & Banquette Seating",

    shortDescription:
      "Made-to-measure seating developed around dining layouts, customer flow and the character of the venue.",

    paragraphs: [
      "Create restaurant seating around your floor plan instead of adapting your floor plan around standard sofas.",

      "Bespoke restaurant sofas, wall seating, banquettes and booths can help define dining zones, make better use of corners and establish a stronger visual identity throughout the venue.",

      "Whether your concept calls for clean contemporary seating, deep upholstered comfort, a curved banquette or a distinctive statement sofa, the design can be developed around the available space and interior direction.",
    ],

    icon: UtensilsCrossed,
  },

  {
    number: "02",

    title: "Café Sofas & Booth Seating",

    shortDescription:
      "Welcoming custom seating created for compact layouts, walls, corners, windows and social areas.",

    paragraphs: [
      "Café seating needs to feel welcoming while making intelligent use of the room.",

      "Made-to-measure café sofas and booth seating can be developed for compact layouts, window areas, walls, corners and social seating zones.",

      "Dimensions, upholstery, colour and finishing details can all be considered alongside the wider café interior.",
    ],

    icon: Coffee,
  },

  {
    number: "03",

    title: "Hotel & Hospitality Sofas",

    shortDescription:
      "Considered bespoke seating for lobbies, lounges, bars, receptions and other guest-facing interiors.",

    paragraphs: [
      "Hotel lobbies, lounges, bars, reception areas and guest-facing spaces deserve seating that feels considered rather than generic.",

      "We create bespoke hotel and hospitality sofas around the character of the interior, from individual statement sofas to coordinated upholstered seating for larger spaces.",

      "The goal is simple: create seating that looks as though it was always meant to be there.",
    ],

    icon: Hotel,
  },

  {
    number: "04",

    title: "Office & Workspace Sofas",

    shortDescription:
      "Comfortable custom seating for reception areas, breakout spaces, meeting zones and workplace lounges.",

    paragraphs: [
      "Modern workspaces need comfortable places to meet, pause, collaborate and welcome visitors.",

      "Custom office sofas can be developed for reception areas, breakout spaces, informal meeting zones, private offices and shared lounges.",

      "Proportions, upholstery and styling can be selected to complement the wider workplace and company identity.",
    ],

    icon: BriefcaseBusiness,
  },

  {
    id: "banquette-seating",

    number: "05",

    title: "Bespoke Banquette, Booth & Fixed Seating",

    shortDescription:
      "Made-to-measure seating developed around alcoves, corners, columns and unusual commercial layouts.",

    paragraphs: [
      "When every metre matters, fixed and made-to-measure seating can become part of the architecture of the room.",

      "Banquettes, booths and upholstered wall seating can be developed around alcoves, corners, columns and unusual layouts.",

      "This can make underused areas more purposeful while creating a stronger visual structure within restaurants, cafés, hotels and other commercial environments.",
    ],

    icon: Armchair,
  },
];

/* =========================================================
   ROOT
========================================================= */

export default function CommercialSofaSolutionsSection() {
  return (
    <section
      aria-labelledby="commercial-sofa-solutions-heading"
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
            {/* =================================================
                HEADER
            ================================================== */}

            <div
              className="
                grid
                gap-5

                lg:grid-cols-[1fr_0.72fr]
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

                      text-[11px]
                      font-bold
                      uppercase

                      tracking-[0.22em]

                      text-[var(--brand-gold-700)]

                      sm:text-[12px]
                    "
                  >
                    Commercial Seating
                  </span>
                </div>

                <h2
                  id="commercial-sofa-solutions-heading"
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
                  Commercial Sofa Solutions We Can Create
                  <span
                    className="
                      text-[var(--brand-gold)]
                    "
                  >
                    .
                  </span>
                </h2>
              </div>

              <div
                className="
                  max-w-[500px]

                  lg:justify-self-end
                "
              >
                <p
                  className="
                    font-brand-display

                    text-[18px]
                    font-medium
                    italic
                    leading-[1.4]

                    text-[var(--brand-navy)]

                    sm:text-[20px]
                  "
                >
                  Different spaces place different demands on seating.
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
                  That is why each project starts with the room, the people
                  using it and the result the business needs.
                </p>
              </div>
            </div>

            {/* =================================================
                QUICK OVERVIEW
            ================================================== */}

            <div
              className="
                mt-7

                grid
                grid-cols-2

                gap-2

                sm:grid-cols-5
              "
            >
              {commercialSolutions.map(({ number, title, icon: Icon }) => (
                <div
                  key={number}
                  className="
                      clay-surface-soft

                      rounded-[16px]

                      px-3
                      py-3
                    "
                >
                  <div
                    className="
                        flex
                        items-center

                        gap-2
                      "
                  >
                    <Icon
                      size={14}
                      strokeWidth={1.5}
                      className="
                          shrink-0

                          text-[var(--brand-gold-700)]
                        "
                    />

                    <span
                      className="
                          truncate

                          font-brand-sans

                          text-[13px]
                          font-bold
                          uppercase

                          tracking-[0.08em]

                          text-[var(--brand-navy)]
                        "
                    >
                      {getShortLabel(title)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* =================================================
                SOLUTIONS LIST
            ================================================== */}

            <div
              className="
                mt-6
                space-y-2.5

                lg:mt-7
              "
            >
              {commercialSolutions.map((solution, index) => (
                <CommercialSolutionRow
                  key={solution.number}
                  solution={solution}
                  defaultOpen={index === 0}
                />
              ))}
            </div>

            {/* =================================================
                FOOT NOTE
            ================================================== */}

            <div
              className="
                mt-6

                flex
                items-start
                gap-3

                border-t
                border-[var(--brand-navy)]/10

                pt-5
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
                <Sofa size={14} strokeWidth={1.5} />
              </span>

              <p
                className="
                  max-w-[760px]

                  font-brand-sans

                  text-[13px]
                  font-medium
                  leading-[1.65]

                  text-[var(--brand-text-muted)]

                  sm:text-[11px]
                "
              >
                Each solution can be developed around the available dimensions,
                layout, upholstery requirements and visual direction of your
                commercial project.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   SOLUTION ROW
========================================================= */

function CommercialSolutionRow({
  solution,
  defaultOpen = false,
}: {
  solution: CommercialSolution;
  defaultOpen?: boolean;
}) {
  const Icon = solution.icon;

  return (
    <details
      id={solution.id}
      open={defaultOpen}
      className="
        group
        scroll-mt-24

        clay-surface-soft

        overflow-hidden

        rounded-[20px]

        p-[5px]

        sm:rounded-[22px]
      "
    >
      {/* =====================================================
          SUMMARY
      ====================================================== */}

      <summary
        className="
          flex
          cursor-pointer
          list-none

          items-center
          justify-between

          gap-4

          rounded-[16px]

          px-3
          py-3

          outline-none

          marker:hidden

          [&::-webkit-details-marker]:hidden

          sm:px-4
          sm:py-4
        "
      >
        <div
          className="
            flex
            min-w-0

            items-center

            gap-3

            sm:gap-4
          "
        >
          {/* ICON */}

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

              sm:h-11
              sm:w-11
            "
          >
            <Icon size={17} strokeWidth={1.5} />
          </span>

          {/* TITLE */}

          <div
            className="
              min-w-0
            "
          >
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

                  text-[13px]
                  font-bold
                  uppercase

                  tracking-[0.16em]

                  text-[var(--brand-gold-700)]
                "
              >
                {solution.number}
              </span>

              <span
                className="
                  h-px
                  w-4

                  bg-[var(--brand-gold)]/50
                "
              />
            </div>

            <h3
              className="
                mt-1

                font-brand-display

                text-[18px]
                font-semibold
                leading-[1.12]

                tracking-[-0.02em]

                text-[var(--brand-navy)]

                sm:text-[20px]

                lg:text-[22px]
              "
            >
              {solution.title}
            </h3>

            <p
              className="
                mt-1.5

                hidden

                max-w-[760px]

                font-brand-sans

                text-[12px]
                font-medium
                leading-[1.5]

                text-[var(--brand-text-muted)]

                sm:block

                lg:text-[13px]
              "
            >
              {solution.shortDescription}
            </p>
          </div>
        </div>

        {/* =====================================================
            TOGGLE
        ====================================================== */}

        <span
          aria-hidden
          className="
            relative

            flex
            h-9
            w-9

            shrink-0

            items-center
            justify-center

            rounded-full

            border
            border-[var(--brand-gold)]/20

            bg-[#FFFDF8]

            text-[var(--brand-gold-700)]

            transition-transform
            duration-200

            group-open:rotate-45
          "
        >
          <span
            className="
              absolute

              h-px
              w-3.5

              bg-current
            "
          />

          <span
            className="
              absolute

              h-3.5
              w-px

              bg-current
            "
          />
        </span>
      </summary>

      {/* =====================================================
          DETAILS
      ====================================================== */}

      <div
        className="
          px-3
          pb-3

          sm:px-4
          sm:pb-4
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
            lg:grid-cols-[0.34fr_0.66fr]
            lg:gap-8
          "
        >
          {/* SHORT SUMMARY */}

          <div>
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
              Designed for the Space
            </span>

            <p
              className="
                mt-2

                font-brand-display

                text-[17px]
                font-semibold
                leading-[1.3]

                text-[var(--brand-navy)]

                sm:text-[18px]
              "
            >
              {solution.shortDescription}
            </p>
          </div>

          {/* FULL COPY */}

          <div
            className="
              mt-4
              space-y-3

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
            {solution.paragraphs.map((paragraph, index) => (
              <p
                key={index}
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
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </details>
  );
}

/* =========================================================
   SHORT LABEL
========================================================= */

function getShortLabel(title: string) {
  if (title.startsWith("Restaurant")) {
    return "Restaurants";
  }

  if (title.startsWith("Café")) {
    return "Cafés";
  }

  if (title.startsWith("Hotel")) {
    return "Hotels";
  }

  if (title.startsWith("Office")) {
    return "Offices";
  }

  return "Fixed Seating";
}
