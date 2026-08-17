import { Camera, Check, Hammer, Heart } from "lucide-react";

import ClayButton from "@/components/ui/ClayButton";

/* =========================================================
   CONFIG
========================================================= */

const REPAIR_FORM_ID = "repair-assessment-form";

const WHATSAPP_REPAIR_URL =
  "https://wa.me/447400577844?text=Hi%20Sofa%20N%20More%2C%20I%27d%20like%20to%20send%20details%20and%20photos%20of%20my%20sofa%20for%20a%20repair%20or%20restoration%20assessment.";

/* =========================================================
   DATA
========================================================= */

const repairSteps = [
  "Send us a few photographs",
  "Tell us what has changed",
  "Tell us what you would like to keep",
];

/* =========================================================
   ROOT
========================================================= */

export default function SofaRepairFinalCTASection() {
  return (
    <section
      aria-labelledby="sofa-repair-final-cta-heading"
      className="
        bg-[var(--brand-ivory)]

        px-3
        pb-10
        pt-8

        sm:px-5
        sm:pb-12
        sm:pt-10

        lg:px-7
        lg:pb-16
        lg:pt-12
      "
    >
      <div className="mx-auto max-w-[var(--site-width)]">
        {/* =====================================================
            OUTER CLAY
        ====================================================== */}

        <div
          className="
            clay-surface-strong

            rounded-[28px]

            p-[5px]

            sm:rounded-[34px]
            sm:p-[6px]

            lg:rounded-[38px]
          "
        >
          {/* ===================================================
              DARK CTA
          ==================================================== */}

          <div
            className="
              clay-dark

              relative
              overflow-hidden

              rounded-[23px]

              px-5
              py-7

              sm:rounded-[28px]
              sm:px-7
              sm:py-8

              lg:rounded-[32px]
              lg:px-10
              lg:py-10
            "
          >
            <QuietDecoration />

            <div
              className="
                relative
                z-10

                grid
                gap-8

                lg:grid-cols-[1.08fr_0.92fr]
                lg:items-center
                lg:gap-12

                xl:gap-16
              "
            >
              {/* =================================================
                  LEFT
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

                      bg-[var(--brand-gold)]

                      text-[var(--brand-navy)]
                    "
                  >
                    <Heart size={14} strokeWidth={1.6} />
                  </span>

                  <span
                    className="
                      font-brand-sans

                      text-[7px]
                      font-bold
                      uppercase

                      tracking-[0.2em]

                      text-[var(--brand-gold)]

                      sm:text-[8px]
                    "
                  >
                    Sofa Repair & Restoration
                  </span>
                </div>

                {/* HEADING */}

                <h2
                  id="sofa-repair-final-cta-heading"
                  className="
                    mt-5

                    max-w-[760px]

                    font-brand-display

                    text-[36px]
                    font-semibold
                    leading-[0.98]

                    tracking-[-0.04em]

                    text-white

                    sm:text-[46px]

                    lg:text-[54px]
                  "
                >
                  Before You Say Goodbye
                  <span className="block">
                    to Your Sofa
                    <span className="text-[var(--brand-gold)]">.</span>
                  </span>
                </h2>

                {/* LEAD */}

                <p
                  className="
                    mt-5

                    max-w-[690px]

                    font-brand-display

                    text-[18px]
                    font-medium
                    leading-[1.45]

                    text-white/90

                    sm:text-[21px]
                  "
                >
                  If the sofa still belongs in your home, it may be worth
                  finding out whether it can be given another life.
                </p>

                {/* CLOSING */}

                <p
                  className="
                    mt-5

                    max-w-[570px]

                    font-brand-sans

                    text-[11px]
                    font-medium
                    leading-[1.7]

                    text-white/60

                    sm:text-[12px]
                  "
                >
                  We&apos;ll help you understand the next step.
                </p>

                {/* =================================================
                    CTAS
                ================================================== */}

                <div
                  className="
                    mt-7

                    flex
                    flex-col
                    gap-3

                    sm:flex-row
                    sm:flex-wrap
                  "
                >
                  <ClayButton
                    href={`#${REPAIR_FORM_ID}`}
                    variant="gold"
                    size="lg"
                    showArrow
                    className="max-sm:w-full"
                    ariaLabel="Request a sofa repair assessment"
                  >
                    Request a Sofa Repair Assessment
                  </ClayButton>

                  <ClayButton
                    href={WHATSAPP_REPAIR_URL}
                    variant="ivory"
                    size="lg"
                    startIcon={<Camera size={15} strokeWidth={1.6} />}
                    target="_blank"
                    className="max-sm:w-full"
                    ariaLabel="Send Sofa N More your sofa details and photographs"
                  >
                    Send Us Your Sofa Details
                  </ClayButton>
                </div>
              </div>

              {/* =================================================
                  RIGHT — SIMPLE ACTION PANEL
              ================================================== */}

              <aside
                aria-label="What to send for your sofa repair assessment"
                className="
                  rounded-[22px]

                  border
                  border-white/10

                  bg-white/[0.055]

                  px-4
                  py-5

                  sm:px-5
                  sm:py-6
                "
              >
                <div className="flex items-start gap-3">
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
                    <Hammer size={15} strokeWidth={1.6} />
                  </span>

                  <div>
                    <span
                      className="
                        font-brand-sans

                        text-[6px]
                        font-bold
                        uppercase

                        tracking-[0.17em]

                        text-[var(--brand-gold)]
                      "
                    >
                      Start With What You Know
                    </span>

                    <h3
                      className="
                        mt-1.5

                        max-w-[440px]

                        font-brand-display

                        text-[21px]
                        font-semibold
                        leading-[1.2]

                        text-white

                        sm:text-[24px]
                      "
                    >
                      A few details are enough to begin the assessment.
                    </h3>
                  </div>
                </div>

                {/* STEPS */}

                <div className="mt-5">
                  {repairSteps.map((item, index) => (
                    <RepairStep
                      key={item}
                      number={`0${index + 1}`}
                      text={item}
                    />
                  ))}
                </div>

                {/* FINAL MESSAGE */}

                <div
                  className="
                    mt-5

                    border-t
                    border-white/10

                    pt-4
                  "
                >
                  <p
                    className="
                      font-brand-display

                      text-[16px]
                      font-medium
                      leading-[1.45]

                      text-white/80

                      sm:text-[18px]
                    "
                  >
                    Repair, restore or preserve — the first step is
                    understanding what your sofa needs.
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   REPAIR STEP
========================================================= */

function RepairStep({ number, text }: { number: string; text: string }) {
  return (
    <div
      className="
        flex
        items-center
        gap-3

        border-b
        border-white/[0.08]

        py-3

        last:border-b-0
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

          font-brand-display

          text-[9px]
          font-semibold

          text-[var(--brand-navy)]
        "
      >
        {number}
      </span>

      <span
        className="
          flex-1

          font-brand-sans

          text-[9px]
          font-semibold
          leading-[1.5]

          text-white/70

          sm:text-[10px]
        "
      >
        {text}
      </span>

      <Check
        size={12}
        strokeWidth={1.8}
        className="
          shrink-0

          text-[var(--brand-gold)]
        "
      />
    </div>
  );
}

/* =========================================================
   DECORATION
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
      {/* LARGE QUIET ARC */}

      <div
        className="
          absolute

          -right-[90px]
          -top-[105px]

          hidden

          h-[220px]
          w-[220px]

          rounded-full

          border
          border-[var(--brand-gold)]/15

          lg:block
        "
      />

      {/* INNER ARC */}

      <div
        className="
          absolute

          -right-[32px]
          -top-[48px]

          hidden

          h-[108px]
          w-[108px]

          rounded-full

          border
          border-white/[0.06]

          lg:block
        "
      />
    </div>
  );
}
