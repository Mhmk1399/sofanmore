import { Building2, Check, Sofa } from "lucide-react";

import ClayButton from "@/components/ui/ClayButton";

/* =========================================================
   DATA
========================================================= */

const projectTypes = [
  "Statement Sofas",
  "Restaurant Banquettes",
  "Hotel Lounge Seating",
  "Complete Seating Concepts",
];

/* =========================================================
   ROOT
========================================================= */

export default function CommercialSofasFinalCTASection() {
  return (
    <section
      aria-labelledby="commercial-final-cta-heading"
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
      <div
        className="
          mx-auto
          max-w-[var(--site-width)]
        "
      >
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
                gap-9

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

                      items-center
                      justify-center

                      rounded-full

                      bg-[var(--brand-gold)]

                      text-[var(--brand-navy)]
                    "
                  >
                    <Building2 size={15} strokeWidth={1.5} />
                  </span>

                  <span
                    className="
                      font-brand-sans

                      text-[13px]
                      font-bold
                      uppercase

                      tracking-[0.22em]

                      text-[var(--brand-gold)]

                      sm:text-[11px]
                    "
                  >
                    Start a Commercial Project
                  </span>
                </div>

                {/* HEADING */}

                <h2
                  id="commercial-final-cta-heading"
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
                  Planning a
                  <br className="hidden sm:block" />
                  Commercial Space
                  <span
                    className="
                      text-[var(--brand-gold)]
                    "
                  >
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
                  Your sofas should work as hard as the rest of your interior.
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

                    text-white/60

                    sm:text-[13px]

                    lg:text-[14px]
                  "
                >
                  <p>
                    Tell us about the venue, the layout and what you need the
                    seating to achieve.
                  </p>

                  <p>
                    Whether you need a single statement sofa, restaurant
                    banquette seating, a series of hotel lounge sofas or a
                    complete bespoke seating concept, we can help develop a
                    solution around your space.
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
                    ariaLabel="Request a commercial sofa quote"
                  >
                    Request a Commercial Sofa Quote
                  </ClayButton>

                  <ClayButton
                    href="/contact-us"
                    variant="ivory"
                    size="lg"
                    showArrow
                    className="max-sm:w-full"
                    ariaLabel="Tell Sofa N More about your commercial project"
                  >
                    Tell Us About Your Project
                  </ClayButton>
                </div>
              </div>

              {/* =================================================
                  SIMPLE PROJECT PANEL
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
                    <Sofa size={17} strokeWidth={1.5} />
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
                      Built Around Your Brief
                    </span>

                    <h3
                      className="
                        mt-1.5

                        max-w-[390px]

                        font-brand-display

                        text-[23px]
                        font-semibold
                        leading-[1.18]

                        text-white

                        sm:text-[25px]
                      "
                    >
                      Start with what the space needs to achieve.
                    </h3>
                  </div>
                </div>

                {/* PROJECT TYPES */}

                <div
                  className="
                    mt-5

                    space-y-2.5
                  "
                >
                  {projectTypes.map((item) => (
                    <div
                      key={item}
                      className="
                        flex
                        items-center
                        gap-3

                        border-b
                        border-white/[0.07]

                        pb-2.5

                        last:border-b-0
                        last:pb-0
                      "
                    >
                      <span
                        className="
                          flex
                          h-5
                          w-5

                          shrink-0

                          items-center
                          justify-center

                          rounded-full

                          bg-[var(--brand-gold)]

                          text-[var(--brand-navy)]
                        "
                      >
                        <Check size={10} strokeWidth={2} />
                      </span>

                      <span
                        className="
                          font-brand-sans

                          text-[12px]
                          font-semibold

                          text-white/72

                          sm:text-[13px]
                        "
                      >
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                {/* BOTTOM */}

                <p
                  className="
                    mt-5

                    border-t
                    border-white/[0.08]

                    pt-4

                    font-brand-sans

                    text-[12px]
                    font-medium
                    leading-[1.65]

                    text-white/42

                    sm:text-[13px]
                  "
                >
                  Share your venue details, dimensions, drawings, photographs or
                  references and we can begin the conversation from there.
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
      {/* GOLD LINE */}

      <div
        className="
          absolute

          -right-[85px]
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

      {/* BOTTOM LIGHT */}

      <div
        className="
          absolute

          -bottom-[130px]
          left-[12%]

          h-[240px]
          w-[420px]

          rounded-full

          bg-white/[0.025]

          blur-3xl
        "
      />
    </div>
  );
}
