import Image from "next/image";

import {
  Armchair,
  Check,
  LayoutGrid,
  Maximize2,
  PackageOpen,
  Ruler,
  Sofa,
  Sparkles,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

import ClayButton from "@/components/ui/ClayButton";

/* =========================================================
   DATA
========================================================= */

const bespokeOptions = [
  "Made-to-measure sofas",
  "Custom corner sofas",
  "Modular sofa configurations",
  "Bespoke armchairs",
  "Upholstered benches",
  "Tailored seating",
  "Selected one-off upholstered pieces",
];

const bespokeReasons = [
  {
    icon: Maximize2,
    text: "Standard sofas are too wide, deep or shallow",
  },
  {
    icon: LayoutGrid,
    text: "You need a particular corner or chaise configuration",
  },
  {
    icon: PackageOpen,
    text: "Delivery access requires a modular approach",
  },
  {
    icon: Sparkles,
    text: "The upholstery must complement an existing interior",
  },
  {
    icon: Armchair,
    text: "You want more control over comfort and proportions",
  },
  {
    icon: Ruler,
    text: "The sofa needs to fit a specific wall, window or architectural feature",
  },
] satisfies {
  icon: LucideIcon;
  text: string;
}[];

/* =========================================================
   ROOT
========================================================= */

export default function BespokeSofasServiceSection() {
  return (
    <section
      aria-labelledby="bespoke-sofas-service-heading"
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
                    <Ruler size={15} strokeWidth={1.5} />
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
                    Bespoke Sofas · Made to Measure
                  </span>
                </div>

                {/* H2 */}

                <h2
                  id="bespoke-sofas-service-heading"
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
                  Bespoke Sofas & Made-to-Measure Seating
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
                  A Sofa Designed Around Your Actual Space
                </p>

                {/* CONTRAST */}

                <div
                  className="
                    mt-5

                    grid
                    gap-2.5
                  "
                >
                  <ApproachRow
                    label="Ready-Made"
                    text="Your room has to accommodate a fixed product."
                    muted
                  />

                  <ApproachRow
                    label="Bespoke"
                    text="The sofa is developed around the room."
                  />
                </div>

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
                    Its dimensions, configuration, comfort, upholstery and
                    visible details can be developed around the room in which it
                    will be used.
                  </p>

                  <p>
                    This can be particularly valuable in London homes where bay
                    windows, alcoves, narrow access, period architecture and
                    compact layouts often make standard sofa sizes difficult to
                    place.
                  </p>
                </div>

                {/* CTA */}

                <div className="mt-7">
                  <ClayButton
                    href="/services/bespoke-sofas"
                    variant="gold"
                    size="lg"
                    showArrow
                    className="max-sm:w-full"
                    ariaLabel="Explore bespoke sofas in North West London"
                  >
                    Explore Bespoke Sofas in North West London
                  </ClayButton>
                </div>
              </div>

              {/* =================================================
                  VISUAL
              ================================================== */}

              <BespokeVisual />
            </div>

            {/* =================================================
                DETAIL GRID
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
              {/* WHAT WE CAN CREATE */}

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
                        Seating shaped around the project.
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
                    {bespokeOptions.map((item) => (
                      <CheckItem key={item} text={item} />
                    ))}
                  </div>
                </div>
              </div>

              {/* WHEN BESPOKE MAKES SENSE */}

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
                      <Ruler size={16} strokeWidth={1.6} />
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
                        When Bespoke Makes Sense
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
                        When the room needs something more specific.
                      </h3>
                    </div>
                  </div>

                  <div
                    className="
                      mt-5

                      grid
                      gap-2
                    "
                  >
                    {bespokeReasons.map(({ text, icon: Icon }) => (
                      <ReasonRow key={text} text={text} icon={Icon} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* =================================================
                CLOSING STATEMENT
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
                    Not simply a different-looking sofa — one that feels as
                    though it belongs to the room.
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
   BESPOKE VISUAL
========================================================= */

function BespokeVisual() {
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
            src="https://sofanmore.s3.eu-west-2.amazonaws.com/Image/71.webp"
            alt="Bespoke sofa designed around a London interior"
            fill
            sizes="(max-width: 1023px) 100vw, 52vw"
            className="
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

              text-[13px]
              font-bold
              uppercase

              tracking-[0.17em]

              text-[var(--brand-gold-700)]
            "
          >
            Designed Around the Room
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
            Dimensions, proportions and configuration developed around the space
            you actually have.
          </p>
        </figcaption>
      </div>
    </figure>
  );
}

/* =========================================================
   APPROACH ROW
========================================================= */

function ApproachRow({
  label,
  text,
  muted = false,
}: {
  label: string;
  text: string;
  muted?: boolean;
}) {
  return (
    <div
      className={`
        flex
        items-center
        gap-3

        rounded-[15px]

        px-3.5
        py-3

        ${muted ? "clay-surface-soft" : "bg-[var(--brand-navy)]"}
      `}
    >
      <span
        className={`
          shrink-0

          font-brand-sans

          text-[13px]
          font-bold
          uppercase

          tracking-[0.15em]

          ${muted ? "text-[var(--brand-gold-700)]" : "text-[var(--brand-gold)]"}
        `}
      >
        {label}
      </span>

      <span
        className={`
          h-4
          w-px

          shrink-0

          ${muted ? "bg-[var(--brand-navy)]/10" : "bg-white/10"}
        `}
      />

      <p
        className={`
          font-brand-sans

          text-[12px]
          font-medium
          leading-[1.5]

          sm:text-[13px]

          ${muted ? "text-[var(--brand-text-muted)]" : "text-white/65"}
        `}
      >
        {text}
      </p>
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
   REASON ROW
========================================================= */

function ReasonRow({ text, icon: Icon }: { text: string; icon: LucideIcon }) {
  return (
    <div
      className="
        flex
        items-center
        gap-3

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
