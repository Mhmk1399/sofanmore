import {
  Building2,
  Check,
  Coffee,
  Hotel,
  LayoutGrid,
  Map,
  Sofa,
  Sparkles,
  Users,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

import ClayButton from "@/components/ui/ClayButton";

/* =========================================================
   TYPES
========================================================= */

type CommercialEnvironment = {
  title: string;
  icon: LucideIcon;
};

type ProjectExample = {
  eyebrow: string;
  title: string;
  text: string;
  icon: LucideIcon;
};

/* =========================================================
   DATA
========================================================= */

const commercialEnvironments: CommercialEnvironment[] = [
  {
    title: "Restaurants",
    icon: Coffee,
  },
  {
    title: "Cafés",
    icon: Coffee,
  },
  {
    title: "Hotels",
    icon: Hotel,
  },
  {
    title: "Hospitality Spaces",
    icon: Users,
  },
  {
    title: "Offices",
    icon: Building2,
  },
  {
    title: "Reception Areas",
    icon: Building2,
  },
  {
    title: "Breakout Spaces",
    icon: Users,
  },
  {
    title: "Waiting Areas",
    icon: Sofa,
  },
  {
    title: "Lounges",
    icon: Sofa,
  },
  {
    title: "Customer-Facing Interiors",
    icon: Sparkles,
  },
];

const commercialSeatingTypes = [
  "Freestanding commercial sofas",
  "Restaurant banquette seating",
  "Booth seating",
  "Upholstered wall seating",
  "Reception sofas",
  "Office breakout sofas",
  "Hotel lounge seating",
  "Made-to-measure fixed seating",
];

const projectExamples: ProjectExample[] = [
  {
    eyebrow: "Restaurant",
    title: "Follow the Wall",
    text: "A made-to-measure banquette can follow a precise wall and support the layout around it.",
    icon: Coffee,
  },
  {
    eyebrow: "Café",
    title: "Use the Corner Better",
    text: "Compact bespoke seating can help make better use of space that standard products may leave underused.",
    icon: LayoutGrid,
  },
  {
    eyebrow: "Hotel",
    title: "Set the Character",
    text: "Statement sofas can help establish the visual direction and atmosphere of a lobby or lounge.",
    icon: Hotel,
  },
  {
    eyebrow: "Office",
    title: "Create One Identity",
    text: "Reception and breakout seating can be developed around a consistent wider workplace direction.",
    icon: Building2,
  },
];

/* =========================================================
   ROOT
========================================================= */

export default function CommercialSofasServiceSection() {
  return (
    <section
      aria-labelledby="commercial-sofas-service-heading"
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
                    <Building2 size={15} strokeWidth={1.5} />
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
                    Commercial Sofas · Contract Seating
                  </span>
                </div>

                {/* H2 */}

                <h2
                  id="commercial-sofas-service-heading"
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
                  Commercial Sofas & Contract Seating
                  <span className="text-[var(--brand-gold)]">.</span>
                </h2>

                {/* SUB HEADING */}

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
                  Seating Designed Around the Business
                </p>

                {/* LEAD */}

                <p
                  className="
                    mt-5

                    max-w-[650px]

                    font-brand-display

                    text-[18px]
                    font-medium
                    italic
                    leading-[1.45]

                    text-[var(--brand-navy)]

                    sm:text-[20px]
                  "
                >
                  Commercial sofas have a different responsibility from seating
                  in a private home.
                </p>

                {/* BODY */}

                <div
                  className="
                    mt-5

                    max-w-[680px]

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
                    They need to support the way customers, guests, visitors or
                    employees use the space. They must work with the layout and
                    contribute to the atmosphere and identity of the business.
                  </p>

                  <p>
                    They may also need to solve space-planning challenges that
                    standard commercial products cannot address.
                  </p>
                </div>

                {/* CORE POINTS */}

                <div
                  className="
                    mt-6

                    grid
                    gap-2.5

                    sm:grid-cols-3
                  "
                >
                  <Principle title="Layout" text="Work with the floor plan." />

                  <Principle
                    title="Use"
                    text="Support how people use the space."
                  />

                  <Principle
                    title="Identity"
                    text="Belong to the wider interior."
                  />
                </div>

                {/* CTA */}

                <div className="mt-7">
                  <ClayButton
                    href="/services/commercial-sofas"
                    variant="gold"
                    size="lg"
                    showArrow
                    className="max-sm:w-full"
                    ariaLabel="Explore commercial sofas and contract seating"
                  >
                    Explore Commercial Sofas & Contract Seating
                  </ClayButton>
                </div>
              </div>

              {/* =================================================
                  PROJECT EXAMPLES
              ================================================== */}

              <CommercialProjectPanel />
            </div>

            {/* =================================================
                DETAIL PANELS
            ================================================== */}

            <div
              className="
                relative
                z-10

                mt-7

                grid
                gap-4

                lg:mt-9
                lg:grid-cols-2
              "
            >
              {/* =================================================
                  ENVIRONMENTS
              ================================================== */}

              <div
                className="
                  clay-surface-soft

                  rounded-[22px]

                  p-[5px]
                "
              >
                <div
                  className="
                    clay-inset

                    h-full

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
                      <Map size={15} strokeWidth={1.5} />
                    </span>

                    <div>
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
                        Where We Work
                      </span>

                      <h3
                        className="
                          mt-1.5

                          font-brand-display

                          text-[22px]
                          font-semibold
                          leading-[1.2]

                          text-[var(--brand-navy)]

                          sm:text-[24px]
                        "
                      >
                        Seating for different commercial environments.
                      </h3>
                    </div>
                  </div>

                  <div
                    className="
                      mt-5

                      grid
                      gap-2

                      sm:grid-cols-2
                    "
                  >
                    {commercialEnvironments.map(({ title, icon: Icon }) => (
                      <EnvironmentItem key={title} title={title} icon={Icon} />
                    ))}
                  </div>
                </div>
              </div>

              {/* =================================================
                  SEATING TYPES
              ================================================== */}

              <div
                className="
                  clay-surface-soft

                  rounded-[22px]

                  p-[5px]
                "
              >
                <div
                  className="
                    clay-inset

                    h-full

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

                          text-[13px]
                          font-bold
                          uppercase

                          tracking-[0.17em]

                          text-[var(--brand-gold-700)]
                        "
                      >
                        What We Can Create
                      </span>

                      <h3
                        className="
                          mt-1.5

                          font-brand-display

                          text-[22px]
                          font-semibold
                          leading-[1.2]

                          text-[var(--brand-navy)]

                          sm:text-[24px]
                        "
                      >
                        Bespoke seating shaped around the project.
                      </h3>
                    </div>
                  </div>

                  <div
                    className="
                      mt-5

                      grid
                      gap-2

                      sm:grid-cols-2
                    "
                  >
                    {commercialSeatingTypes.map((item) => (
                      <CheckItem key={item} text={item} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* =================================================
                FINAL STATEMENT
            ================================================== */}

            <div
              className="
                relative
                z-10

                mt-6

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
                  <LayoutGrid size={14} strokeWidth={1.6} />
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
                    Developed Around the Project
                  </span>

                  <p
                    className="
                      mt-1

                      max-w-[980px]

                      font-brand-display

                      text-[18px]
                      font-semibold
                      leading-[1.35]

                      text-white

                      sm:text-[21px]

                      lg:text-[23px]
                    "
                  >
                    Instead of choosing unrelated products from a catalogue,
                    seating can be developed around the floor plan, intended use
                    and visual direction of the space.
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
   COMMERCIAL PROJECT PANEL
========================================================= */

function CommercialProjectPanel() {
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
            Different Spaces · Different Requirements
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
            The seating should respond to the business.
          </h3>
        </div>

        {/* PROJECT EXAMPLES */}

        <div
          className="
            mt-5

            grid
            gap-2.5

            sm:grid-cols-2
          "
        >
          {projectExamples.map((example) => (
            <ProjectExampleCard key={example.eyebrow} example={example} />
          ))}
        </div>

        {/* BOTTOM */}

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
              <Sparkles size={13} strokeWidth={1.6} />
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
                One Connected Direction
              </span>

              <p
                className="
                  mt-1

                  max-w-[460px]

                  font-brand-display

                  text-[17px]
                  font-medium
                  leading-[1.35]

                  text-white

                  sm:text-[19px]
                "
              >
                Space planning, practical use and visual identity considered
                together.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   PROJECT EXAMPLE
========================================================= */

function ProjectExampleCard({ example }: { example: ProjectExample }) {
  const Icon = example.icon;

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
          <span
            className="
              font-brand-sans

              text-[13px]
              font-bold
              uppercase

              tracking-[0.15em]

              text-[var(--brand-gold-700)]
            "
          >
            {example.eyebrow}
          </span>

          <h4
            className="
              mt-1

              font-brand-display

              text-[17px]
              font-semibold
              leading-[1.2]

              text-[var(--brand-navy)]

              sm:text-[18px]
            "
          >
            {example.title}
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
            {example.text}
          </p>
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   PRINCIPLE
========================================================= */

function Principle({ title, text }: { title: string; text: string }) {
  return (
    <div
      className="
        clay-surface-soft

        rounded-[15px]

        px-3
        py-3
      "
    >
      <span
        className="
          font-brand-sans

          text-[13px]
          font-bold
          uppercase

          tracking-[0.15em]

          text-[var(--brand-gold-700)]
        "
      >
        {title}
      </span>

      <p
        className="
          mt-1

          font-brand-sans

          text-[11px]
          font-semibold
          leading-[1.45]

          text-[var(--brand-navy)]

          sm:text-[12px]
        "
      >
        {text}
      </p>
    </div>
  );
}

/* =========================================================
   ENVIRONMENT ITEM
========================================================= */

function EnvironmentItem({
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
        items-center
        gap-2.5

        rounded-[13px]

        bg-white/35

        px-3
        py-2.5
      "
    >
      <span
        className="
          flex
          h-6
          w-6

          shrink-0

          items-center
          justify-center

          rounded-full

          bg-[var(--brand-navy)]

          text-[var(--brand-gold)]
        "
      >
        <Icon size={10} strokeWidth={1.5} />
      </span>

      <span
        className="
          font-brand-sans

          text-[11px]
          font-semibold
          leading-[1.4]

          text-[var(--brand-navy)]

          sm:text-[12px]
        "
      >
        {title}
      </span>
    </div>
  );
}

/* =========================================================
   CHECK ITEM
========================================================= */

function CheckItem({ text }: { text: string }) {
  return (
    <div
      className="
        flex
        items-start
        gap-2.5

        rounded-[13px]

        bg-white/35

        px-3
        py-2.5
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

          text-[11px]
          font-semibold
          leading-[1.45]

          text-[var(--brand-navy)]

          sm:text-[12px]
        "
      >
        {text}
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
