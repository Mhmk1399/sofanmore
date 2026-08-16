import { Home, MoveRight, Palette, Sparkles, Sofa, Truck } from "lucide-react";

import type { LucideIcon } from "lucide-react";

import ClayButton from "@/components/ui/ClayButton";

/* =========================================================
   DATA
========================================================= */

const changingInteriorReasons = [
  {
    title: "Redesigned Living Room",
    icon: Home,
  },
  {
    title: "New Colour Palette",
    icon: Palette,
  },
  {
    title: "Different Material Direction",
    icon: Sparkles,
  },
  {
    title: "House Move",
    icon: Truck,
  },
  {
    title: "Change in Personal Taste",
    icon: Sofa,
  },
] satisfies {
  title: string;
  icon: LucideIcon;
}[];

/* =========================================================
   ROOT
========================================================= */

export default function SofaRestorationChangingInteriorsSection() {
  return (
    <section
      aria-labelledby="sofa-restoration-changing-interiors-heading"
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

            <div
              className="
                relative
                z-10

                grid
                gap-8

                lg:grid-cols-[0.94fr_1.06fr]
                lg:items-center
                lg:gap-12

                xl:gap-16
              "
            >
              {/* =================================================
                  CONTENT
              ================================================== */}

              <div>
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
                    <Palette size={15} strokeWidth={1.5} />
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
                    When the Room Changes
                  </span>
                </div>

                <h2
                  id="sofa-restoration-changing-interiors-heading"
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
                  Sofa Restoration for Changing Interiors
                  <span className="text-[var(--brand-gold)]">.</span>
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
                  Sometimes a sofa is still worth keeping even when the room
                  around it has changed.
                </p>

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
                    A redesigned living room, a new colour palette, a different
                    material direction, a house move or simply a change in
                    personal taste can all affect how the sofa feels within the
                    space.
                  </p>

                  <p>
                    In these situations, the question may not be whether the
                    sofa still works physically.
                  </p>
                </div>

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
                    The Real Question
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
                    Does the sofa still feel connected to the interior?
                  </p>
                </div>

                <p
                  className="
                    mt-5

                    max-w-[650px]

                    font-brand-sans

                    text-[12px]
                    font-medium
                    leading-[1.75]

                    text-[var(--brand-text-muted)]

                    sm:text-[13px]

                    lg:text-[14px]
                  "
                >
                  Repair and restoration can be considered alongside the wider
                  direction of your space, helping an existing sofa feel
                  relevant again without losing the qualities you wanted to
                  preserve.
                </p>

                {/* CTA */}

                <div className="mt-7">
                  <ClayButton
                    href="/services/interior-design"
                    variant="gold"
                    size="lg"
                    showArrow
                    className="max-sm:w-full"
                    ariaLabel="Explore Sofa N More interior design services in London"
                  >
                    Explore Interior Design in London
                  </ClayButton>
                </div>
              </div>

              {/* =================================================
                  VISUAL PANEL
              ================================================== */}

              <ChangingInteriorPanel />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   CHANGING INTERIOR PANEL
========================================================= */

function ChangingInteriorPanel() {
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
        {/* =====================================================
            ROOM CHANGES
        ====================================================== */}

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
            The Interior May Have Changed
          </span>

          <h3
            className="
              mt-1.5

              max-w-[480px]

              font-brand-display

              text-[24px]
              font-semibold
              leading-[1.15]

              tracking-[-0.025em]

              text-[var(--brand-navy)]

              sm:text-[27px]
            "
          >
            The sofa does not always need to be left behind.
          </h3>
        </div>

        {/* CHANGE REASONS */}

        <div
          className="
            mt-5

            grid
            gap-2

            sm:grid-cols-2
          "
        >
          {changingInteriorReasons.map(({ title, icon: Icon }) => (
            <ChangeReason key={title} title={title} icon={Icon} />
          ))}
        </div>

        {/* TRANSITION */}

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
            <MoveRight size={15} strokeWidth={1.7} className="rotate-90" />
          </span>

          <span
            className="
              h-px
              flex-1

              bg-[var(--brand-navy)]/10
            "
          />
        </div>

        {/* RESTORATION OUTCOME */}

        <div
          className="
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
              <Sofa size={14} strokeWidth={1.5} />
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
                Restoration Can Reconnect It
              </span>

              <p
                className="
                  mt-1.5

                  max-w-[450px]

                  font-brand-display

                  text-[19px]
                  font-semibold
                  leading-[1.3]

                  text-white

                  sm:text-[21px]
                "
              >
                Keep the qualities you love while helping the sofa belong to the
                room again.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   CHANGE REASON
========================================================= */

function ChangeReason({
  title,
  icon: Icon,
}: {
  title: string;
  icon: LucideIcon;
}) {
  return (
    <div
      className="
        clay-surface-soft

        flex
        min-h-[48px]

        items-center
        gap-3

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
        <Icon size={12} strokeWidth={1.5} />
      </span>

      <span
        className="
          font-brand-sans

          text-[8px]
          font-semibold
          leading-[1.35]

          text-[var(--brand-navy)]

          sm:text-[9px]
        "
      >
        {title}
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
