import {
  Home,
  Sparkles,
} from "lucide-react";

import ClayButton from "@/components/ui/ClayButton";

/* =========================================================
   ROOT
========================================================= */

export default function InteriorDesignFinalCTASection() {
  return (
    <section
      aria-labelledby="interior-design-final-cta-heading"
      className="
        bg-[var(--brand-ivory)]

        px-3
        pb-12
        pt-8

        sm:px-5
        sm:pb-14
        sm:pt-10

        lg:px-7
        lg:pb-20
        lg:pt-12
      "
    >
      <div className="mx-auto max-w-[var(--site-width)]">
        {/* =====================================================
            OUTER CLAY SHELL
        ====================================================== */}

        <div
          className="
            clay-surface-strong

            rounded-[32px]
            p-[7px]

            sm:rounded-[38px]

            lg:rounded-[44px]
            lg:p-[9px]
          "
        >
          <div
            className="
              clay-dark

              relative
              overflow-hidden

              rounded-[25px]

              px-5
              py-7

              sm:rounded-[31px]
              sm:px-7
              sm:py-9

              lg:rounded-[35px]
              lg:px-11
              lg:py-11

              xl:px-14
              xl:py-12
            "
          >
            <SubtleBackground />

            <div
              className="
                relative
                z-10

                grid
                gap-8

                lg:grid-cols-[1.15fr_0.85fr]
                lg:items-center
                lg:gap-14
              "
            >
              {/* =================================================
                  CONTENT
              ================================================== */}

              <div>
                {/* EYEBROW */}

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

                      bg-[var(--brand-gold)]

                      text-[var(--brand-navy)]
                    "
                  >
                    <Sparkles
                      size={15}
                      strokeWidth={1.5}
                    />
                  </span>

                  <span
                    className="
                      font-brand-sans

                      text-[7px]
                      font-bold
                      uppercase

                      tracking-[0.22em]

                      text-[var(--brand-gold)]

                      sm:text-[8px]
                    "
                  >
                    Start Your Interior Project
                  </span>
                </div>

                {/* HEADING */}

                <h2
                  id="interior-design-final-cta-heading"
                  className="
                    mt-5

                    max-w-[760px]

                    font-brand-display

                    text-[39px]
                    font-semibold
                    leading-[0.98]

                    tracking-[-0.04em]

                    text-white

                    min-[390px]:text-[43px]

                    sm:text-[50px]

                    lg:text-[clamp(48px,4vw,62px)]
                  "
                >
                  Ready to Reimagine
                  <br className="hidden sm:block" />
                  Your Space
                  <span className="text-[var(--brand-gold)]">
                    ?
                  </span>
                </h2>

                {/* LEAD */}

                <p
                  className="
                    mt-6

                    max-w-[650px]

                    font-brand-display

                    text-[20px]
                    font-medium
                    italic
                    leading-[1.4]

                    text-white/90

                    sm:text-[22px]
                  "
                >
                  You do not need to begin
                  with all the answers.
                </p>

                {/* BODY */}

                <div
                  className="
                    mt-5

                    max-w-[700px]

                    space-y-4

                    font-brand-sans

                    text-[12px]
                    font-medium
                    leading-[1.75]

                    text-white/60

                    sm:text-[13px]

                    lg:text-[14px]
                  "
                >
                  <p>
                    Start with the space you have
                    and the way you want it to feel.
                  </p>

                  <p>
                    Whether you are creating a more
                    personal home, developing a
                    restaurant, transforming a
                    hospitality environment or
                    rethinking a workplace, we can
                    help bring the ideas together
                    into one clear interior direction.
                  </p>
                </div>

                {/* =================================================
                    CTA
                ================================================== */}

                <div
                  className="
                    mt-7

                    grid
                    gap-3

                    sm:flex
                    sm:flex-wrap
                    sm:items-center
                  "
                >
                  <ClayButton
                    href="/contact-us"
                    variant="gold"
                    size="lg"
                    showArrow
                    className="max-sm:w-full"
                    ariaLabel="Start your interior design project with Sofa N More"
                  >
                    Start Your Interior Design Project
                  </ClayButton>

                  <ClayButton
                    href="/contact-us"
                    variant="ivory"
                    size="lg"
                    showArrow
                    className="max-sm:w-full"
                    ariaLabel="Book an interior design consultation with Sofa N More"
                  >
                    Book a Design Consultation
                  </ClayButton>
                </div>
              </div>

              {/* =================================================
                  SIMPLE SUPPORTING PANEL
              ================================================== */}

              <div
                className="
                  rounded-[22px]

                  border
                  border-white/[0.08]

                  bg-white/[0.045]

                  p-5

                  shadow-[inset_1px_1px_0_rgba(255,255,255,0.05)]

                  sm:p-6
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

                      bg-white/[0.07]

                      text-[var(--brand-gold)]
                    "
                  >
                    <Home
                      size={16}
                      strokeWidth={1.5}
                    />
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
                      Begin With the Space
                    </span>

                    <p
                      className="
                        mt-1.5

                        max-w-[390px]

                        font-brand-display

                        text-[23px]
                        font-semibold
                        leading-[1.2]

                        text-white

                        sm:text-[25px]
                      "
                    >
                      We can help turn individual
                      ideas into one connected
                      interior.
                    </p>
                  </div>
                </div>

                {/* DIVIDER */}

                <div
                  className="
                    my-5
                    h-px

                    bg-white/[0.08]
                  "
                />

                <p
                  className="
                    max-w-[430px]

                    font-brand-sans

                    text-[10px]
                    font-medium
                    leading-[1.7]

                    text-white/48

                    sm:text-[11px]
                  "
                >
                  Share your space, photographs,
                  plans, inspiration or simply
                  describe what you would like to
                  change. The conversation can
                  start from there.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   SUBTLE BACKGROUND
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

          -right-[90px]
          -top-[125px]

          h-[260px]
          w-[260px]

          rounded-full

          border
          border-[var(--brand-gold)]/15
        "
      />

      <div
        className="
          absolute

          -right-[35px]
          -top-[75px]

          h-[175px]
          w-[175px]

          rounded-full

          border
          border-white/[0.05]
        "
      />

      <div
        className="
          absolute

          -bottom-[130px]
          left-[10%]

          h-[240px]
          w-[440px]

          rounded-full

          bg-white/[0.025]

          blur-3xl
        "
      />
    </div>
  );
}