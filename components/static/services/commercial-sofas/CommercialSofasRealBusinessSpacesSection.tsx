import {
  Check,
  LayoutGrid,
  MoveRight,
  Ruler,
  Sofa,
  SwatchBook,
} from "lucide-react";

/* =========================================================
   DATA
========================================================= */

const bespokeControls = [
  {
    icon: Ruler,
    label: "Size",
  },
  {
    icon: LayoutGrid,
    label: "Shape",
  },
  {
    icon: SwatchBook,
    label: "Upholstery",
  },
  {
    icon: Sofa,
    label: "Layout",
  },
];

/* =========================================================
   ROOT
========================================================= */

export default function CommercialSofasRealBusinessSpacesSection() {
  return (
    <section
      aria-labelledby="commercial-real-spaces-heading"
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

              bg-[linear-gradient(135deg,#FFFDF8_0%,#F7F1E8_56%,#EFE5D8_100%)]

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
            <div
              className="
                grid
                gap-8

                lg:grid-cols-[0.95fr_1.05fr]
                lg:items-center
                lg:gap-14

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
                    Designed for Business
                  </span>
                </div>

                <h2
                  id="commercial-real-spaces-heading"
                  className="
                    mt-5

                    max-w-[690px]

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
                  Commercial Sofas Designed for Real Business Spaces
                  <span className="text-[var(--brand-gold)]">.</span>
                </h2>

                <p
                  className="
                    mt-6

                    max-w-[560px]

                    font-brand-display

                    text-[19px]
                    font-medium
                    italic
                    leading-[1.4]

                    text-[var(--brand-navy)]

                    sm:text-[21px]
                  "
                >
                  A commercial interior has different demands from a private
                  home.
                </p>

                <div
                  className="
                    mt-5

                    max-w-[610px]

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
                    Seating may be used throughout the day, needs to work with
                    customer flow and floor plans, and often has to support a
                    clear visual identity.
                  </p>

                  <p>
                    Standard sofa sizes can leave awkward gaps, waste valuable
                    space or force the rest of the room to work around the
                    seating.
                  </p>
                </div>

                <div
                  className="
                    mt-6

                    border-l-2
                    border-[var(--brand-gold)]

                    pl-4
                  "
                >
                  <p
                    className="
                      font-brand-display

                      text-[22px]
                      font-semibold
                      leading-[1.3]

                      text-[var(--brand-navy)]

                      sm:text-[24px]
                    "
                  >
                    A bespoke commercial sofa gives you more control.
                  </p>
                </div>

                <p
                  className="
                    mt-5

                    max-w-[610px]

                    font-brand-sans

                    text-[12px]
                    font-medium
                    leading-[1.75]

                    text-[var(--brand-text-muted)]

                    sm:text-[13px]

                    lg:text-[14px]
                  "
                >
                  We can develop the size, shape, proportions, upholstery and
                  layout around the requirements of your venue, helping create a
                  more coherent and practical interior without sacrificing
                  comfort or appearance.
                </p>
              </div>

              {/* =================================================
                  SIMPLE COMPARISON
              ================================================== */}

              <div
                className="
                  mx-auto
                  w-full
                  max-w-[650px]
                "
              >
                <SimpleComparison />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   SIMPLE COMPARISON
========================================================= */

function SimpleComparison() {
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

          p-4

          sm:rounded-[24px]
          sm:p-5

          lg:p-6
        "
      >
        {/* =====================================================
            SMALL INTRO
        ====================================================== */}

        <div
          className="
            flex
            items-center
            justify-between
            gap-4
          "
        >
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
              The Difference
            </span>

            <h3
              className="
                mt-1.5

                font-brand-display

                text-[23px]
                font-semibold
                leading-[1.1]

                text-[var(--brand-navy)]

                sm:text-[26px]
              "
            >
              Standard vs Bespoke
            </h3>
          </div>
        </div>

        {/* =====================================================
            STANDARD
        ====================================================== */}

        <div
          className="
            mt-6

            rounded-[20px]

            border
            border-[var(--brand-navy)]/8

            bg-white/25

            px-4
            py-5

            sm:px-5
          "
        >
          <div
            className="
              flex
              items-start

              gap-4
            "
          >
            <div
              className="
                clay-surface-soft

                flex
                h-11
                w-11

                shrink-0

                items-center
                justify-center

                rounded-full
              "
            >
              <Sofa
                size={18}
                strokeWidth={1.5}
                className="
                  text-[var(--brand-text-muted)]
                "
              />
            </div>

            <div>
              <span
                className="
                  font-brand-sans

                  text-[13px]
                  font-bold
                  uppercase

                  tracking-[0.16em]

                  text-[var(--brand-text-muted)]
                "
              >
                Standard Sofa
              </span>

              <p
                className="
                  mt-2

                  font-brand-display

                  text-[20px]
                  font-semibold
                  leading-[1.25]

                  text-[var(--brand-navy)]

                  sm:text-[22px]
                "
              >
                The room has to work around the sofa.
              </p>

              <p
                className="
                  mt-2

                  font-brand-sans

                  text-[13px]
                  font-medium
                  leading-[1.6]

                  text-[var(--brand-text-muted)]

                  sm:text-[11px]
                "
              >
                Fixed dimensions can create awkward gaps, restrict layouts and
                waste useful floor space.
              </p>
            </div>
          </div>
        </div>

        {/* =====================================================
            ARROW
        ====================================================== */}

        <div
          className="
            flex
            justify-center

            py-3
          "
        >
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

              shadow-[0_7px_15px_rgba(153,101,30,0.16)]
            "
          >
            <MoveRight
              size={16}
              strokeWidth={1.8}
              className="
                rotate-90

                sm:rotate-0
              "
            />
          </span>
        </div>

        {/* =====================================================
            BESPOKE
        ====================================================== */}

        <div
          className="
            rounded-[20px]

            bg-[var(--brand-navy)]

            px-4
            py-5

            sm:px-5
          "
        >
          <div
            className="
              flex
              items-start

              gap-4
            "
          >
            <div
              className="
                flex
                h-11
                w-11

                shrink-0

                items-center
                justify-center

                rounded-full

                bg-[var(--brand-gold)]

                text-[var(--brand-navy)]
              "
            >
              <Check size={18} strokeWidth={1.8} />
            </div>

            <div>
              <span
                className="
                  font-brand-sans

                  text-[13px]
                  font-bold
                  uppercase

                  tracking-[0.16em]

                  text-[var(--brand-gold)]
                "
              >
                Bespoke Commercial Sofa
              </span>

              <p
                className="
                  mt-2

                  font-brand-display

                  text-[20px]
                  font-semibold
                  leading-[1.25]

                  text-white

                  sm:text-[22px]
                "
              >
                The sofa is developed around the room.
              </p>

              <p
                className="
                  mt-2

                  font-brand-sans

                  text-[13px]
                  font-medium
                  leading-[1.6]

                  text-white/60

                  sm:text-[11px]
                "
              >
                Dimensions, proportions and configuration can be developed
                around the available space and the way the venue needs to work.
              </p>
            </div>
          </div>
        </div>

        {/* =====================================================
            CONTROL ROW
        ====================================================== */}

        <div
          className="
            mt-5

            border-t
            border-[var(--brand-navy)]/10

            pt-5
          "
        >
          <p
            className="
              text-center

              font-brand-sans

              text-[13px]
              font-bold
              uppercase

              tracking-[0.16em]

              text-[var(--brand-gold-700)]
            "
          >
            More control over
          </p>

          <div
            className="
              mt-4

              grid
              grid-cols-4

              gap-2
            "
          >
            {bespokeControls.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="
                    text-center
                  "
              >
                <span
                  className="
                      clay-surface-soft

                      mx-auto

                      flex
                      h-9
                      w-9

                      items-center
                      justify-center

                      rounded-full
                    "
                >
                  <Icon
                    size={14}
                    strokeWidth={1.5}
                    className="
                        text-[var(--brand-gold-700)]
                      "
                  />
                </span>

                <span
                  className="
                      mt-2
                      block

                      font-brand-sans

                      text-[13px]
                      font-bold
                      uppercase

                      tracking-[0.09em]

                      text-[var(--brand-navy)]

                      sm:text-[13px]
                    "
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
