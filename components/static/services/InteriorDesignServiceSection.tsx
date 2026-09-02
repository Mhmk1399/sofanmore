import Image from "next/image";

import {
  Building2,
  Check,
  Home,
  LampDesk,
  LayoutGrid,
  MoveRight,
  Palette,
  Sofa,
  Sparkles,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

import ClayButton from "@/components/ui/ClayButton";

/* =========================================================
   TYPES
========================================================= */

type DesignElement = {
  title: string;
  icon: LucideIcon;
};

type InteriorType = {
  eyebrow: string;
  title: string;
  text: string;
  spaces: string[];
  icon: LucideIcon;
};

/* =========================================================
   DATA
========================================================= */

const designElements: DesignElement[] = [
  {
    title: "Layout",
    icon: LayoutGrid,
  },
  {
    title: "Circulation",
    icon: MoveRight,
  },
  {
    title: "Proportion",
    icon: Sofa,
  },
  {
    title: "Colour",
    icon: Palette,
  },
  {
    title: "Materials",
    icon: Sparkles,
  },
  {
    title: "Texture",
    icon: Sparkles,
  },
  {
    title: "Lighting Direction",
    icon: LampDesk,
  },
  {
    title: "Bespoke Sofas",
    icon: Sofa,
  },
  {
    title: "Commercial Seating",
    icon: Building2,
  },
  {
    title: "Overall Atmosphere",
    icon: Sparkles,
  },
];

const interiorTypes: InteriorType[] = [
  {
    eyebrow: "Residential Interiors",
    title: "Designed Around the Way You Live",
    text: "For residential interiors, the design should reflect the people who live there and the way the home needs to function.",
    spaces: [
      "Living rooms",
      "London apartments",
      "Complete residential spaces",
    ],
    icon: Home,
  },
  {
    eyebrow: "Commercial Interiors",
    title: "Designed Around the Business",
    text: "For commercial interiors, the design should also support the experience, function and identity of the business.",
    spaces: [
      "Restaurant and café interiors",
      "Hotel and hospitality spaces",
      "Office reception areas",
      "Breakout and collaborative spaces",
      "Other commercial environments",
    ],
    icon: Building2,
  },
];

/* =========================================================
   ROOT
========================================================= */

export default function InteriorDesignServiceSection() {
  return (
    <section
      aria-labelledby="interior-design-service-heading"
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
                TOP GRID
            ================================================== */}

            <div
              className="
                relative
                z-10

                grid
                gap-8

                lg:grid-cols-[0.96fr_1.04fr]
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
                    <LayoutGrid size={15} strokeWidth={1.5} />
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
                    Residential & Commercial Interior Design
                  </span>
                </div>

                {/* H2 */}

                <h2
                  id="interior-design-service-heading"
                  className="
                    mt-4

                    max-w-[780px]

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
                  Residential & Commercial Interior Design
                  <span className="text-[var(--brand-gold)]">.</span>
                </h2>

                {/* SUBHEADING */}

                <p
                  className="
                    mt-6

                    max-w-[650px]

                    font-brand-display

                    text-[21px]
                    font-semibold
                    leading-[1.3]

                    text-[var(--brand-navy)]

                    sm:text-[24px]
                  "
                >
                  Bring the Whole Space Into One Clear Direction
                </p>

                {/* LEAD */}

                <p
                  className="
                    mt-5

                    max-w-[640px]

                    font-brand-display

                    text-[18px]
                    font-medium
                    italic
                    leading-[1.45]

                    text-[var(--brand-navy)]

                    sm:text-[20px]
                  "
                >
                  Sometimes the sofa is only one part of the project.
                </p>

                {/* BODY */}

                <div
                  className="
                    mt-5

                    max-w-[690px]

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
                    The layout may feel disconnected. The colour palette may not
                    respond to the available light. Materials may have been
                    selected individually without creating a coherent interior.
                  </p>

                  <p>
                    A commercial space may also need a stronger relationship
                    between its layout, seating and brand identity.
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

                      text-[6px]
                      font-bold
                      uppercase

                      tracking-[0.17em]

                      text-[var(--brand-gold-700)]
                    "
                  >
                    One Connected Interior
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
                    The major elements of the room should work together, not
                    compete for attention.
                  </p>
                </div>

                {/* CTA */}

                <div className="mt-7">
                  <ClayButton
                    href="/services/interior-design"
                    variant="gold"
                    size="lg"
                    showArrow
                    className="max-sm:w-full"
                    ariaLabel="Explore interior design services in North West London"
                  >
                    Explore Interior Design in North West London
                  </ClayButton>
                </div>
              </div>

              {/* =================================================
                  VISUAL
              ================================================== */}

              <InteriorDesignVisual />
            </div>

            {/* =================================================
                DESIGN ELEMENTS
            ================================================== */}

            <div
              className="
                relative
                z-10

                mt-7

                clay-surface-soft

                rounded-[22px]

                p-[5px]

                lg:mt-9
              "
            >
              <div
                className="
                  clay-inset

                  rounded-[18px]

                  px-4
                  py-5

                  sm:px-5
                  sm:py-6
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
                    sm:gap-8
                  "
                >
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
                      Considered Together
                    </span>

                    <h3
                      className="
                        mt-1.5

                        font-brand-display

                        text-[23px]
                        font-semibold
                        leading-[1.2]

                        text-[var(--brand-navy)]

                        sm:text-[26px]
                      "
                    >
                      The elements that shape the complete space.
                    </h3>
                  </div>

                  <p
                    className="
                      max-w-[500px]

                      font-brand-sans

                      text-[9px]
                      font-medium
                      leading-[1.6]

                      text-[var(--brand-text-muted)]

                      sm:text-[10px]
                      sm:text-right
                    "
                  >
                    Layout, materials, light, seating and atmosphere can all
                    influence one another.
                  </p>
                </div>

                <div
                  className="
                    mt-5

                    grid
                    gap-2

                    grid-cols-2

                    sm:grid-cols-3

                    lg:grid-cols-5
                  "
                >
                  {designElements.map(({ title, icon: Icon }) => (
                    <DesignElementItem key={title} title={title} icon={Icon} />
                  ))}
                </div>
              </div>
            </div>

            {/* =================================================
                RESIDENTIAL / COMMERCIAL
            ================================================== */}

            <div
              className="
                relative
                z-10

                mt-4

                grid
                gap-4

                lg:grid-cols-2
              "
            >
              {interiorTypes.map((item) => (
                <InteriorTypeCard key={item.eyebrow} item={item} />
              ))}
            </div>

            {/* =================================================
                SOFA INTEGRATION
            ================================================== */}

            <div
              className="
                relative
                z-10

                mt-6

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
                  grid
                  gap-5

                  lg:grid-cols-[auto_1fr_auto]
                  lg:items-center
                  lg:gap-6
                "
              >
                <span
                  className="
                    flex
                    h-11
                    w-11

                    items-center
                    justify-center

                    rounded-full

                    bg-[var(--brand-gold)]

                    text-[var(--brand-navy)]
                  "
                >
                  <Sofa size={17} strokeWidth={1.5} />
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
                    Bespoke Sofa Expertise
                  </span>

                  <h3
                    className="
                      mt-1.5

                      max-w-[800px]

                      font-brand-display

                      text-[20px]
                      font-semibold
                      leading-[1.3]

                      text-white

                      sm:text-[23px]
                    "
                  >
                    The sofa can be considered as part of the room from the
                    beginning.
                  </h3>

                  <p
                    className="
                      mt-2

                      max-w-[850px]

                      font-brand-sans

                      text-[9px]
                      font-medium
                      leading-[1.65]

                      text-white/55

                      sm:text-[10px]
                    "
                  >
                    Shape, position, dimensions and upholstery can respond to
                    the complete interior instead of being selected separately
                    at the end.
                  </p>
                </div>

                <div className="lg:justify-self-end">
                  <ClayButton
                    href="/services/bespoke-sofas"
                    variant="ivory"
                    size="sm"
                    showArrow
                    ariaLabel="Explore bespoke sofas from Sofa N More"
                  >
                    Explore Bespoke Sofas
                  </ClayButton>
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
   INTERIOR VISUAL
========================================================= */

function InteriorDesignVisual() {
  return (
    <figure
      className="
        mx-auto

        w-full
        max-w-[680px]

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

          p-[5px]

          sm:rounded-[24px]
          sm:p-[6px]
        "
      >
        <div
          className="
            relative

            aspect-[4/3]

            overflow-hidden

            rounded-[17px]

            bg-[#E7DED2]

            sm:rounded-[20px]
          "
        >
          <Image
            src="/assets/site/64.webp"
            alt="Interior design project by Sofa N More in London"
            fill
            sizes="(max-width: 1023px) 100vw, 52vw"
            className="
              object-contain
              object-center
            "
          />
        </div>

        <figcaption
          className="
            px-2
            pb-1
            pt-4

            sm:px-3
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
            The Whole Space
          </span>

          <p
            className="
              mt-1.5

              max-w-[520px]

              font-brand-display

              text-[18px]
              font-semibold
              leading-[1.3]

              text-[var(--brand-navy)]

              sm:text-[20px]
            "
          >
            Layout, colour, materials, light and seating brought into one
            direction.
          </p>
        </figcaption>
      </div>
    </figure>
  );
}

/* =========================================================
   DESIGN ELEMENT
========================================================= */

function DesignElementItem({
  title,
  icon: Icon,
}: {
  title: string;
  icon: LucideIcon;
}) {
  return (
    <div
      className="
        flex
        min-h-[52px]

        items-center
        gap-2.5

        rounded-[14px]

        bg-white/35

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
        <Icon size={11} strokeWidth={1.5} />
      </span>

      <span
        className="
          font-brand-sans

          text-[7px]
          font-bold
          leading-[1.35]

          text-[var(--brand-navy)]

          sm:text-[8px]
        "
      >
        {title}
      </span>
    </div>
  );
}

/* =========================================================
   INTERIOR TYPE CARD
========================================================= */

function InteriorTypeCard({ item }: { item: InteriorType }) {
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

                tracking-[0.17em]

                text-[var(--brand-gold-700)]
              "
            >
              {item.eyebrow}
            </span>

            <h3
              className="
                mt-1.5

                font-brand-display

                text-[21px]
                font-semibold
                leading-[1.2]

                text-[var(--brand-navy)]

                sm:text-[23px]
              "
            >
              {item.title}
            </h3>
          </div>
        </div>

        <p
          className="
            mt-4

            font-brand-sans

            text-[10px]
            font-medium
            leading-[1.7]

            text-[var(--brand-text-muted)]

            sm:text-[11px]
          "
        >
          {item.text}
        </p>

        <div
          className="
            mt-4

            border-t
            border-[var(--brand-navy)]/[0.08]

            pt-4
          "
        >
          <div
            className="
              grid
              gap-2

              sm:grid-cols-2
            "
          >
            {item.spaces.map((space) => (
              <div
                key={space}
                className="
                  flex
                  items-start
                  gap-2
                "
              >
                <span
                  className="
                    mt-[1px]

                    flex
                    h-4
                    w-4

                    shrink-0

                    items-center
                    justify-center

                    rounded-full

                    bg-[var(--brand-navy)]

                    text-[var(--brand-gold)]
                  "
                >
                  <Check size={8} strokeWidth={2.2} />
                </span>

                <span
                  className="
                    font-brand-sans

                    text-[8px]
                    font-semibold
                    leading-[1.45]

                    text-[var(--brand-navy)]

                    sm:text-[9px]
                  "
                >
                  {space}
                </span>
              </div>
            ))}
          </div>
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
