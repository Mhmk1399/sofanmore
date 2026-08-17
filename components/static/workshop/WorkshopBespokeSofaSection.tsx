import { Camera, Lightbulb, Ruler, Sofa, Sparkles } from "lucide-react";

import ClayButton from "@/components/ui/ClayButton";

/* =========================================================
   ROOT
========================================================= */

export default function WorkshopBespokeSofaSection() {
  return (
    <section
      aria-labelledby="what-can-you-do-workshop-heading"
      className="
        bg-[var(--brand-ivory)]

        px-3
        py-8

        sm:px-5
        sm:py-10

        lg:px-7
        lg:py-12
      "
    >
      <div className="mx-auto max-w-[var(--site-width)]">
        {/* =====================================================
            MAIN CLAY SURFACE
        ====================================================== */}

        <div
          className="
            clay-surface-soft

            rounded-[28px]

            p-[5px]

            sm:rounded-[32px]
            sm:p-[6px]

            lg:rounded-[36px]
          "
        >
          <div
            className="
              clay-inset

              relative
              overflow-hidden

              rounded-[23px]

              bg-[linear-gradient(135deg,#FFFDF8_0%,#F7F0E6_100%)]

              px-5
              py-6

              sm:rounded-[27px]
              sm:px-7
              sm:py-8

              lg:rounded-[30px]
              lg:px-9
              lg:py-9
            "
          >
            <QuietDecoration />

            {/* =================================================
                INTRO + SERVICE
            ================================================== */}

            <div
              className="
                relative
                z-10

                grid
                gap-8

                lg:grid-cols-[0.78fr_1.22fr]
                lg:items-center
                lg:gap-12

                xl:gap-16
              "
            >
              {/* =================================================
                  LEFT — SECTION INTRO
              ================================================== */}

              <div>
                <span
                  className="
                    font-brand-sans

                    text-[7px]
                    font-bold
                    uppercase

                    tracking-[0.2em]

                    text-[var(--brand-gold-700)]

                    sm:text-[8px]
                  "
                >
                  Start Your Project at the Workshop
                </span>

                <h2
                  id="what-can-you-do-workshop-heading"
                  className="
                    mt-3

                    max-w-[620px]

                    font-brand-display

                    text-[34px]
                    font-semibold
                    leading-[1]

                    tracking-[-0.035em]

                    text-[var(--brand-navy)]

                    sm:text-[42px]

                    lg:text-[48px]
                  "
                >
                  What Can You Do
                  <span className="block">
                    at Our Workshop
                    <span className="text-[var(--brand-gold)]">?</span>
                  </span>
                </h2>

                <p
                  className="
                    mt-5

                    max-w-[560px]

                    font-brand-display

                    text-[18px]
                    font-medium
                    italic
                    leading-[1.45]

                    text-[var(--brand-navy)]

                    sm:text-[20px]
                  "
                >
                  Different projects start in different ways.
                </p>

                <p
                  className="
                    mt-4

                    max-w-[580px]

                    font-brand-sans

                    text-[11px]
                    font-medium
                    leading-[1.75]

                    text-[var(--brand-text-muted)]

                    sm:text-[12px]

                    lg:text-[13px]
                  "
                >
                  Our North West London workshop gives you a practical place to
                  explore the details before work begins.
                </p>
              </div>

              {/* =================================================
                  BESPOKE SOFA PANEL
              ================================================== */}

              <article
                className="
                  clay-surface-soft

                  rounded-[22px]

                  p-[5px]
                "
              >
                <div
                  className="
                    rounded-[18px]

                    bg-[#FFFDF8]/75

                    px-4
                    py-5

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
                      <Sofa size={16} strokeWidth={1.5} />
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
                        Made-to-Measure Sofas
                      </span>

                      <h3
                        className="
                          mt-1.5

                          font-brand-display

                          text-[24px]
                          font-semibold
                          leading-[1.15]

                          text-[var(--brand-navy)]

                          sm:text-[27px]
                        "
                      >
                        Discuss a Bespoke Sofa
                      </h3>
                    </div>
                  </div>

                  {/* BODY */}

                  <div
                    className="
                      mt-5

                      space-y-3

                      font-brand-sans

                      text-[10px]
                      font-medium
                      leading-[1.7]

                      text-[var(--brand-text-muted)]

                      sm:text-[11px]
                    "
                  >
                    <p>
                      Bring photographs, measurements and inspiration for your
                      room.
                    </p>

                    <p>
                      We can discuss the proportions, configuration, comfort,
                      upholstery and visual direction of a made-to-measure sofa
                      designed around your actual space.
                    </p>
                  </div>

                  {/* =================================================
                      BRING WITH YOU
                  ================================================== */}

                  <div
                    className="
                      mt-5

                      grid
                      grid-cols-3
                      gap-2
                    "
                  >
                    <BringItem icon={Camera} label="Room Photos" />

                    <BringItem icon={Ruler} label="Measurements" />

                    <BringItem icon={Lightbulb} label="Inspiration" />
                  </div>

                  {/* =================================================
                      NO TECHNICAL DRAWING
                  ================================================== */}

                  <div
                    className="
                      mt-5

                      rounded-[16px]

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
                          h-7
                          w-7

                          shrink-0

                          items-center
                          justify-center

                          rounded-full

                          bg-[var(--brand-gold)]

                          text-[var(--brand-navy)]
                        "
                      >
                        <Sparkles size={11} strokeWidth={1.6} />
                      </span>

                      <div>
                        <span
                          className="
                            font-brand-sans

                            text-[6px]
                            font-bold
                            uppercase

                            tracking-[0.16em]

                            text-[var(--brand-gold)]
                          "
                        >
                          You Can Start With an Idea
                        </span>

                        <p
                          className="
                            mt-1

                            max-w-[560px]

                            font-brand-display

                            text-[16px]
                            font-medium
                            leading-[1.4]

                            text-white

                            sm:text-[18px]
                          "
                        >
                          You do not need a finished technical drawing before
                          visiting.
                        </p>

                        <p
                          className="
                            mt-1.5

                            max-w-[560px]

                            font-brand-sans

                            text-[8px]
                            font-medium
                            leading-[1.55]

                            text-white/55

                            sm:text-[9px]
                          "
                        >
                          An initial idea, room photograph or catalogue design
                          can be enough to begin the conversation.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* =================================================
                      CTA
                  ================================================== */}

                  <div className="mt-5">
                    <ClayButton
                      href="/services/bespoke-sofas"
                      variant="gold"
                      size="sm"
                      showArrow
                      ariaLabel="Explore bespoke sofas from Sofa N More"
                    >
                      Explore Bespoke Sofas
                    </ClayButton>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   BRING ITEM
========================================================= */

function BringItem({
  icon: Icon,
  label,
}: {
  icon: typeof Camera;
  label: string;
}) {
  return (
    <div
      className="
        flex
        min-h-[72px]
        flex-col

        items-center
        justify-center

        rounded-[14px]

        border
        border-[var(--brand-navy)]/[0.06]

        bg-white/35

        px-2
        py-3

        text-center
      "
    >
      <Icon
        size={13}
        strokeWidth={1.5}
        className="
          text-[var(--brand-gold-700)]
        "
      />

      <span
        className="
          mt-2

          font-brand-sans

          text-[7px]
          font-bold
          leading-[1.3]

          text-[var(--brand-navy)]

          sm:text-[8px]
        "
      >
        {label}
      </span>
    </div>
  );
}

/* =========================================================
   QUIET DECORATION
========================================================= */

function QuietDecoration() {
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

          -right-[70px]
          -top-[85px]

          hidden

          h-[180px]
          w-[180px]

          rounded-full

          border
          border-[var(--brand-gold)]/10

          lg:block
        "
      />
    </div>
  );
}
