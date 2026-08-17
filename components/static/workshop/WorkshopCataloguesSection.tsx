import { BookOpen, CreditCard, Palette, Sparkles } from "lucide-react";

import ClayButton from "@/components/ui/ClayButton";

/* =========================================================
   ROOT
========================================================= */

export default function WorkshopCataloguesSection() {
  return (
    <section
      aria-labelledby="workshop-catalogues-heading"
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
            MAIN CLAY PANEL
        ====================================================== */}

        <div
          className="
            clay-surface-soft

            relative
            overflow-hidden

            rounded-[26px]

            px-5
            py-6

            sm:rounded-[30px]
            sm:px-7
            sm:py-8

            lg:rounded-[34px]
            lg:px-9
            lg:py-9
          "
        >
          <QuietDecoration />

          <div
            className="
              relative
              z-10

              grid
              gap-8

              lg:grid-cols-[0.82fr_1.18fr]
              lg:items-center
              lg:gap-12

              xl:gap-16
            "
          >
            {/* =================================================
                LEFT — CONTENT
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
                  <BookOpen size={15} strokeWidth={1.5} />
                </span>

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
                  Catalogues · Fabrics · Finishes
                </span>
              </div>

              {/* H2 */}

              <h2
                id="workshop-catalogues-heading"
                className="
                  mt-4

                  max-w-[620px]

                  font-brand-display

                  text-[32px]
                  font-semibold
                  leading-[1]

                  tracking-[-0.035em]

                  text-[var(--brand-navy)]

                  sm:text-[39px]

                  lg:text-[44px]
                "
              >
                Browse Catalogues & Fabric Samples
                <span className="text-[var(--brand-gold)]">.</span>
              </h2>

              {/* LEAD */}

              <p
                className="
                  mt-5

                  max-w-[620px]

                  font-brand-display

                  text-[18px]
                  font-medium
                  leading-[1.45]

                  text-[var(--brand-navy)]

                  sm:text-[20px]
                "
              >
                Explore options in person before finalising the direction of
                your sofa.
              </p>

              {/* BODY */}

              <div
                className="
                  mt-4

                  max-w-[650px]

                  space-y-3

                  font-brand-sans

                  text-[10px]
                  font-medium
                  leading-[1.75]

                  text-[var(--brand-text-muted)]

                  sm:text-[11px]

                  lg:text-[12px]
                "
              >
                <p>
                  Explore our full catalogue collection and compare upholstery
                  fabrics, colours, textures and finishing directions in person.
                </p>

                <p>
                  Seeing materials at the workshop can make it easier to
                  understand how a fabric feels, how colours work together and
                  which options may suit the intended use of the sofa.
                </p>
              </div>

              {/* CTA */}

              <div className="mt-6">
                <ClayButton
                  href="/contact-us"
                  variant="gold"
                  size="lg"
                  showArrow
                  className="max-sm:w-full"
                  ariaLabel="Plan a free consultation at the Sofa N More workshop"
                >
                  Plan a Free Consultation
                </ClayButton>
              </div>
            </div>

            {/* =================================================
                RIGHT — SIMPLE JOURNEY
            ================================================== */}

            <div
              className="
                clay-inset

                rounded-[22px]

                bg-[#FFFDF8]/65

                px-4
                py-5

                sm:px-5
                sm:py-6
              "
            >
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
                At the Workshop
              </span>

              <h3
                className="
                  mt-1.5

                  max-w-[520px]

                  font-brand-display

                  text-[22px]
                  font-semibold
                  leading-[1.2]

                  text-[var(--brand-navy)]

                  sm:text-[25px]
                "
              >
                See, compare and decide with more confidence.
              </h3>

              {/* STEPS */}

              <div className="mt-5 grid gap-2.5">
                <WorkshopStep
                  number="01"
                  icon={BookOpen}
                  title="Browse the Catalogues"
                  text="Explore our available sofa collections and use them as a starting point for your project."
                />

                <WorkshopStep
                  number="02"
                  icon={Palette}
                  title="Compare Fabrics & Finishes"
                  text="See colours, textures and upholstery options in person rather than relying only on a screen."
                />

                <WorkshopStep
                  number="03"
                  icon={CreditCard}
                  title="Confirm & Order"
                  text="Once the project details are agreed, you can place your order and make payment at the workshop."
                  dark
                />
              </div>

              {/* NOTE */}

              <div
                className="
                  mt-5

                  flex
                  items-start
                  gap-2.5

                  border-t
                  border-[var(--brand-navy)]/10

                  pt-4
                "
              >
                <Sparkles
                  size={13}
                  strokeWidth={1.5}
                  className="
                    mt-[2px]
                    shrink-0

                    text-[var(--brand-gold-700)]
                  "
                />

                <p
                  className="
                    max-w-[560px]

                    font-brand-sans

                    text-[8px]
                    font-medium
                    leading-[1.6]

                    text-[var(--brand-text-muted)]

                    sm:text-[9px]
                  "
                >
                  You do not need to know the exact fabric or finish before
                  visiting. The workshop is there to help you compare the
                  options.
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
   WORKSHOP STEP
========================================================= */

function WorkshopStep({
  number,
  icon: Icon,
  title,
  text,
  dark = false,
}: {
  number: string;
  icon: typeof BookOpen;
  title: string;
  text: string;
  dark?: boolean;
}) {
  return (
    <div
      className={`
        flex
        items-start
        gap-3

        rounded-[16px]

        px-3.5
        py-3.5

        sm:px-4

        ${
          dark
            ? "bg-[var(--brand-navy)]"
            : "border border-[var(--brand-navy)]/[0.06] bg-white/35"
        }
      `}
    >
      <span
        className={`
          flex
          h-8
          w-8

          shrink-0

          items-center
          justify-center

          rounded-full

          ${
            dark
              ? "bg-[var(--brand-gold)] text-[var(--brand-navy)]"
              : "bg-[var(--brand-navy)] text-[var(--brand-gold)]"
          }
        `}
      >
        <Icon size={13} strokeWidth={1.5} />
      </span>

      <div className="min-w-0 flex-1">
        <div
          className="
            flex
            items-center
            justify-between

            gap-3
          "
        >
          <strong
            className={`
              font-brand-display

              text-[16px]
              font-semibold
              leading-[1.2]

              sm:text-[17px]

              ${dark ? "text-white" : "text-[var(--brand-navy)]"}
            `}
          >
            {title}
          </strong>

          <span
            className={`
              shrink-0

              font-brand-display

              text-[17px]
              font-semibold

              ${
                dark
                  ? "text-[var(--brand-gold)]/55"
                  : "text-[var(--brand-gold-700)]/25"
              }
            `}
          >
            {number}
          </span>
        </div>

        <p
          className={`
            mt-1.5

            font-brand-sans

            text-[8px]
            font-medium
            leading-[1.55]

            sm:text-[9px]

            ${dark ? "text-white/55" : "text-[var(--brand-text-muted)]"}
          `}
        >
          {text}
        </p>
      </div>
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

          -bottom-[100px]
          -right-[90px]

          hidden

          h-[190px]
          w-[190px]

          rounded-full

          border
          border-[var(--brand-gold)]/10

          lg:block
        "
      />
    </div>
  );
}
