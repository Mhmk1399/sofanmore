import {
  Check,
  CornerDownRight,
  LayoutGrid,
  Lightbulb,
  MoveRight,
  Ruler,
  Sofa,
  SunMedium,
  Waypoints,
} from "lucide-react";

/* =========================================================
   DATA
========================================================= */

const spaceInputs = [
  {
    label: "Proportions",
    icon: Ruler,
  },
  {
    label: "Natural Light",
    icon: SunMedium,
  },
  {
    label: "Architecture",
    icon: LayoutGrid,
  },
  {
    label: "Circulation",
    icon: Waypoints,
  },
  {
    label: "Limitations",
    icon: CornerDownRight,
  },
  {
    label: "Possibilities",
    icon: Lightbulb,
  },
];

const designExamples = [
  {
    title: "A Sofa That Fits the Wall",
    text:
      "Instead of accepting an awkward gap, the sofa can be developed around the dimensions of the room.",
    icon: Sofa,
  },

  {
    title: "A Layout That Follows Movement",
    text:
      "Seating can respond to how people naturally enter, move through and use the space.",
    icon: Waypoints,
  },

  {
    title: "Colour That Works With the Light",
    text:
      "The palette can respond to the natural light already present instead of competing with it.",
    icon: SunMedium,
  },

  {
    title: "Corners With a Purpose",
    text:
      "Unusual or overlooked areas can become intentional parts of the finished interior.",
    icon: LayoutGrid,
  },
];

/* =========================================================
   ROOT
========================================================= */

export default function DesignedAroundYourSpaceSection({
  id = "interior-styling",
}: {
  id?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby="designed-around-space-heading"
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
      <div
        className="
          mx-auto
          max-w-[var(--site-width)]
        "
      >
        {/* =====================================================
            MAIN SHELL
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
                MAIN GRID
            ================================================== */}

            <div
              className="
                grid
                gap-8

                lg:grid-cols-[0.95fr_1.05fr]
                lg:items-center
                lg:gap-12

                xl:gap-16
              "
            >
              {/* =================================================
                  COPY
              ================================================== */}

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
                    Space First
                  </span>
                </div>

                <h2
                  id="designed-around-space-heading"
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
                  Designed Around the Space
                  You Actually Have
                  <span className="text-[var(--brand-gold)]">
                    .
                  </span>
                </h2>

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
                  One of the biggest mistakes
                  in interior design is starting
                  with individual objects
                  instead of the room itself.
                </p>

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

                      text-[13px]
                      font-bold
                      uppercase

                      tracking-[0.17em]

                      text-[var(--brand-gold-700)]
                    "
                  >
                    Our Starting Point
                  </span>

                  <p
                    className="
                      mt-1

                      font-brand-display

                      text-[25px]
                      font-semibold

                      text-[var(--brand-navy)]

                      sm:text-[28px]
                    "
                  >
                    We begin with the space.
                  </p>
                </div>

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
                  We look at the proportions,
                  natural light, architectural
                  features, circulation,
                  limitations and possibilities
                  before individual design
                  decisions are made.
                </p>

                <p
                  className="
                    mt-4

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
                  From there, decisions become
                  easier — because each one has
                  a clear relationship to the
                  room around it.
                </p>
              </div>

              {/* =================================================
                  SPACE FIRST PANEL
              ================================================== */}

              <div
                className="
                  mx-auto

                  w-full
                  max-w-[650px]
                "
              >
                <SpaceFirstPanel />
              </div>
            </div>

            {/* =================================================
                REAL EXAMPLES
            ================================================== */}

            <div
              className="
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

                      text-[13px]
                      font-bold
                      uppercase

                      tracking-[0.18em]

                      text-[var(--brand-gold-700)]
                    "
                  >
                    What This Changes
                  </span>

                  <h3
                    className="
                      mt-1.5

                      font-brand-display

                      text-[23px]
                      font-semibold
                      leading-[1.2]

                      text-[var(--brand-navy)]

                      sm:text-[27px]
                    "
                  >
                    Better decisions,
                    because they belong to the room.
                  </h3>
                </div>
              </div>

              <div
                className="
                  mt-5

                  grid
                  gap-2.5

                  sm:grid-cols-2

                  xl:grid-cols-4
                "
              >
                {designExamples.map(
                  ({
                    title,
                    text,
                    icon: Icon,
                  }) => (
                    <DesignExample
                      key={title}
                      title={title}
                      text={text}
                      icon={<Icon size={14} strokeWidth={1.5} />}
                    />
                  ),
                )}
              </div>
            </div>

            {/* =================================================
                FINAL STATEMENT
            ================================================== */}

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
                  <Check
                    size={13}
                    strokeWidth={2}
                  />
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
                    The Result
                  </span>

                  <p
                    className="
                      mt-1

                      max-w-[760px]

                      font-brand-display

                      text-[18px]
                      font-medium
                      leading-[1.35]

                      text-white

                      sm:text-[20px]
                    "
                  >
                    When the design begins with
                    the architecture, the finished
                    interior feels more connected.
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
   SPACE FIRST PANEL
========================================================= */

function SpaceFirstPanel() {
  return (
    <div
      className="
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
        {/* =====================================================
            STEP 1
        ====================================================== */}

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
                flex
                h-9
                w-9

                shrink-0

                items-center
                justify-center

                rounded-full

                bg-[var(--brand-navy)]

                font-brand-sans

                text-[11px]
                font-bold

                text-[var(--brand-gold)]
              "
            >
              01
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
                Start Here
              </span>

              <h3
                className="
                  mt-1

                  font-brand-display

                  text-[22px]
                  font-semibold

                  text-[var(--brand-navy)]

                  sm:text-[24px]
                "
              >
                Understand the room.
              </h3>
            </div>
          </div>

          {/* SPACE INPUTS */}

          <div
            className="
              mt-5

              grid
              grid-cols-2

              gap-2

              sm:grid-cols-3
            "
          >
            {spaceInputs.map(
              ({
                label,
                icon: Icon,
              }) => (
                <SpaceInput
                  key={label}
                  label={label}
                  icon={
                    <Icon
                      size={13}
                      strokeWidth={1.5}
                    />
                  }
                />
              ),
            )}
          </div>
        </div>

        {/* =====================================================
            TRANSITION
        ====================================================== */}

        <div
          className="
            my-5

            flex
            items-center
            gap-3
          "
        >
          <span
            className="
              h-px
              flex-1

              bg-[var(--brand-navy)]/10
            "
          />

          <span
            className="
              flex
              h-9
              w-9

              items-center
              justify-center

              rounded-full

              bg-[var(--brand-gold)]

              text-[var(--brand-navy)]
            "
          >
            <MoveRight
              size={15}
              strokeWidth={1.7}
              className="
                rotate-90
              "
            />
          </span>

          <span
            className="
              h-px
              flex-1

              bg-[var(--brand-navy)]/10
            "
          />
        </div>

        {/* =====================================================
            STEP 2
        ====================================================== */}

        <div
          className="
            rounded-[18px]

            bg-[var(--brand-navy)]

            px-4
            py-4

            sm:px-5
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

                font-brand-sans

                text-[11px]
                font-bold

                text-[var(--brand-navy)]
              "
            >
              02
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
                Then
              </span>

              <h3
                className="
                  mt-1

                  font-brand-display

                  text-[21px]
                  font-semibold

                  text-white

                  sm:text-[23px]
                "
              >
                Make the design decisions.
              </h3>

              <p
                className="
                  mt-2

                  max-w-[470px]

                  font-brand-sans

                  text-[12px]
                  font-medium
                  leading-[1.65]

                  text-white/58

                  sm:text-[13px]
                "
              >
                Layout, bespoke sofas,
                materials, colour and lighting
                can now respond to something
                real instead of an abstract
                style.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   SPACE INPUT
========================================================= */

function SpaceInput({
  label,
  icon,
}: {
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <div
      className="
        clay-surface-soft

        flex
        min-h-[46px]

        items-center
        gap-2.5

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
        {icon}
      </span>

      <span
        className="
          font-brand-sans

          text-[13px]
          font-bold
          leading-[1.3]

          text-[var(--brand-navy)]

          sm:text-[11px]
        "
      >
        {label}
      </span>
    </div>
  );
}

/* =========================================================
   DESIGN EXAMPLE
========================================================= */

function DesignExample({
  title,
  text,
  icon,
}: {
  title: string;
  text: string;
  icon: React.ReactNode;
}) {
  return (
    <article
      className="
        clay-surface-soft

        rounded-[18px]

        px-4
        py-4
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
        {icon}
      </span>

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
        {title}
      </h4>

      <p
        className="
          mt-2

          font-brand-sans

          text-[12px]
          font-medium
          leading-[1.65]

          text-[var(--brand-text-muted)]

          sm:text-[13px]
        "
      >
        {text}
      </p>
    </article>
  );
}
