import { Images, Sparkles } from "lucide-react";

import ClayButton from "@/components/ui/ClayButton";

export default function GalleryHero() {
  return (
    <section
      aria-labelledby="gallery-hero-heading"
      className="
        relative mt-6
        overflow-hidden

        bg-[var(--brand-ivory)]

        px-3
        pb-8
        pt-5

        sm:px-5
        sm:pb-10
        sm:pt-7

        lg:px-7
        lg:pb-12
        lg:pt-8
      "
    >
      <div className="mx-auto max-w-[var(--site-width)]">
        {/* =====================================================
            OUTER CLAY SHELL
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
              py-11

              sm:rounded-[29px]
              sm:px-8
              sm:py-14

              lg:rounded-[34px]
              lg:px-12
              lg:py-16
            "
          >
            <ClayDecoration />

            {/* =================================================
                CONTENT
            ================================================== */}

            <div
              className="
                relative
                z-10

                mx-auto
                max-w-[900px]

                text-center
              "
            >
              

              {/* =================================================
                  H1
              ================================================== */}

              <h1
                id="gallery-hero-heading"
                className="
                  mx-auto
                  mt-6

                  max-w-[850px]

                  font-brand-display

                  text-[42px]
                  font-semibold
                  leading-[0.94]

                  tracking-[-0.045em]

                  text-[var(--brand-navy)]

                  min-[390px]:text-[38px]

                  sm:text-[60px]

                  lg:text-[clamp(60px,5.7vw,82px)]
                "
              >
                Spaces Made
                <span className="block">
                  to Be Remembered
                  <span className="text-[var(--brand-gold)]">.</span>
                </span>
              </h1>

              {/* =================================================
                  DESCRIPTION
              ================================================== */}

              <p
                className="
                  mx-auto
                  mt-6

                  max-w-[650px]

                  font-brand-sans

                  text-[12px]
                  font-medium
                  leading-[1.8]

                  text-[var(--brand-text-muted)]

                  sm:text-[13px]

                  lg:text-[14px]
                "
              >
                Explore a selection of bespoke sofas, commercial seating and
                interiors created around individual spaces, requirements and
                ideas.
              </p>

              {/* =================================================
                  CATEGORIES
              ================================================== */}

              <div
                className="
                  mx-auto
                  mt-6

                  flex
                  w-fit
                  max-w-full

                  items-center
                  justify-center
                  gap-2
                "
              >
                <Sparkles
                  size={11}
                  strokeWidth={1.5}
                  className="shrink-0 text-[var(--brand-gold-700)]"
                />

                <span
                  className="
                    font-brand-sans

                    text-[13px]
                    font-bold
                    uppercase

                    tracking-[0.17em]

                    text-[var(--brand-gold-700)]

                    sm:text-[11px]
                  "
                >
                  Bespoke · Commercial · Interiors · Restoration
                </span>
              </div>

              {/* =================================================
                  CTA
              ================================================== */}

              <div
                className="
                  mt-7

                  flex
                  justify-center
                "
              >
                <ClayButton
                  href="#gallery"
                  variant="navy"
                  size="lg"
                  showArrow
                  ariaLabel="Explore the Sofa N More gallery"
                >
                  Explore Our Work
                </ClayButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   QUIET CLAY DECORATION
========================================================= */

function ClayDecoration() {
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
      {/* top right sculptural disc */}

      <div
        className="
          clay-surface-soft

          absolute

          -right-[75px]
          -top-[95px]

          hidden

          h-[210px]
          w-[210px]

          rounded-full

          opacity-60

          md:block
        "
      />

      {/* inset ring */}

      <div
        className="
          absolute

          -right-[25px]
          -top-[45px]

          hidden

          h-[118px]
          w-[118px]

          rounded-full

          border
          border-[var(--brand-gold)]/15

          md:block
        "
      />

      {/* bottom left quiet shape */}

      <div
        className="
          clay-surface-soft

          absolute

          -bottom-[85px]
          -left-[65px]

          hidden

          h-[180px]
          w-[180px]

          rounded-full

          opacity-45

          lg:block
        "
      />

      {/* center soft illumination */}

      <div
        className="
          absolute

          bottom-[-100px]
          left-1/2

          h-[180px]
          w-[480px]

          -translate-x-1/2

          rounded-full

          bg-white/30

           
        "
      />
    </div>
  );
}
