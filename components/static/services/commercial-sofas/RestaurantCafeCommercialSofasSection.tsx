import { Check, Coffee, UtensilsCrossed } from "lucide-react";

import ClayButton from "@/components/ui/ClayButton";

/* =========================================================
   DATA
========================================================= */

const venueConsiderations = [
  "The dimensions of the venue",
  "Dining layout",
  "Customer flow",
  "Wall and corner spaces",
  "Interior concept",
  "Upholstery direction",
  "Brand colours",
  "Desired atmosphere",
];

/* =========================================================
   ROOT
========================================================= */

export default function RestaurantCafeCommercialSofasSection() {
  return (
    <section
      aria-labelledby="restaurant-cafe-sofas-heading"
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
            <div
              className="
                grid
                gap-8

                lg:grid-cols-[0.96fr_1.04fr]
                lg:items-center
                lg:gap-12

                xl:gap-16
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
                      h-px
                      w-9

                      bg-[var(--brand-gold)]
                    "
                  />

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
                    Hospitality Seating
                  </span>
                </div>

                {/* H2 */}

                <h2
                  id="restaurant-cafe-sofas-heading"
                  className="
                    mt-4

                    max-w-[680px]

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
                  Commercial Sofas for Restaurants & Cafés
                  <span
                    className="
                      text-[var(--brand-gold)]
                    "
                  >
                    .
                  </span>
                </h2>

                {/* INTRO */}

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
                  In hospitality, seating affects far more than appearance.
                </p>

                {/* BODY */}

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
                    It influences how the room feels, how guests interact with
                    the space and how efficiently different areas can be used.
                  </p>

                  <p>
                    A carefully planned combination of bespoke sofas, booths and
                    banquette seating can help create intimate dining areas,
                    define the layout and establish a more memorable interior
                    identity.
                  </p>
                </div>

                {/* =================================================
                    KEY STATEMENT
                ================================================== */}

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
                      max-w-[570px]

                      font-brand-display

                      text-[21px]
                      font-semibold
                      leading-[1.32]

                      text-[var(--brand-navy)]

                      sm:text-[23px]
                    "
                  >
                    Develop the seating around the venue instead of making the
                    venue work around a standard sofa.
                  </p>
                </div>

                {/* FINAL COPY */}

                <p
                  className="
                    mt-6

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
                  Whether you are opening a new restaurant, redesigning an
                  established café or upgrading an existing hospitality space,
                  the seating can become part of the design rather than
                  something added at the end.
                </p>

                {/* CTA */}

                <div
                  className="
                    mt-7

                    sm:w-fit
                  "
                >
                  <ClayButton
                    href="/contact-us"
                    variant="gold"
                    size="lg"
                    showArrow
                    className="max-sm:w-full"
                    ariaLabel="Discuss a restaurant or cafe sofa project"
                  >
                    Discuss a Restaurant or Café Project
                  </ClayButton>
                </div>
              </div>

              {/* =================================================
                  VENUE REQUIREMENTS
              ================================================== */}

              <div
                className="
                  mx-auto

                  w-full
                  max-w-[650px]
                "
              >
                <VenueRequirements />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   VENUE REQUIREMENTS
========================================================= */

function VenueRequirements() {
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
            TOP
        ====================================================== */}

        <div
          className="
            flex
            items-start
            justify-between

            gap-5
          "
        >
          <div>
            <span
              className="
                font-brand-sans

                text-[7px]
                font-bold
                uppercase

                tracking-[0.18em]

                text-[var(--brand-gold-700)]
              "
            >
              Designed Around Your Venue
            </span>

            <h3
              className="
                mt-2

                max-w-[430px]

                font-brand-display

                text-[25px]
                font-semibold
                leading-[1.12]

                tracking-[-0.025em]

                text-[var(--brand-navy)]

                sm:text-[28px]
              "
            >
              Seating decisions that start with the space.
            </h3>
          </div>

          {/* VENUE ICONS */}

          <div
            className="
              hidden

              shrink-0

              items-center
              gap-2

              sm:flex
            "
          >
            <span
              className="
                flex
                h-10
                w-10

                items-center
                justify-center

                rounded-full

                bg-[var(--brand-navy)]

                text-[var(--brand-gold)]
              "
            >
              <UtensilsCrossed size={16} strokeWidth={1.5} />
            </span>

            <span
              className="
                flex
                h-10
                w-10

                items-center
                justify-center

                rounded-full

                bg-[var(--brand-gold)]

                text-[var(--brand-navy)]
              "
            >
              <Coffee size={16} strokeWidth={1.5} />
            </span>
          </div>
        </div>

        {/* =====================================================
            INTRO
        ====================================================== */}

        <p
          className="
            mt-4

            max-w-[520px]

            font-brand-sans

            text-[10px]
            font-medium
            leading-[1.65]

            text-[var(--brand-text-muted)]

            sm:text-[11px]
          "
        >
          Instead of selecting a standard sofa and hoping it works, the seating
          can be developed around:
        </p>

        {/* =====================================================
            CHECKLIST
        ====================================================== */}

        <div
          className="
            mt-5

            grid
            grid-cols-1

            gap-2

            min-[390px]:grid-cols-2
          "
        >
          {venueConsiderations.map((item) => (
            <VenueRequirement key={item} label={item} />
          ))}
        </div>

        {/* =====================================================
            BOTTOM MESSAGE
        ====================================================== */}

        <div
          className="
            mt-5

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
                mt-[2px]

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
              <Check size={13} strokeWidth={2} />
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
                The Result
              </span>

              <p
                className="
                  mt-1

                  font-brand-display

                  text-[17px]
                  font-medium
                  leading-[1.25]

                  text-white

                  sm:text-[19px]
                "
              >
                Seating that feels like part of the interior from day one.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   REQUIREMENT
========================================================= */

function VenueRequirement({ label }: { label: string }) {
  return (
    <div
      className="
        clay-surface-soft

        flex
        min-h-[48px]

        items-center

        gap-3

        rounded-[15px]

        px-3
        py-2.5
      "
    >
      <span
        className="
          flex
          h-6
          w-6

          shrink-0

          items-center
          justify-center

          rounded-full

          bg-[var(--brand-navy)]

          text-[var(--brand-gold)]
        "
      >
        <Check size={11} strokeWidth={2} />
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
        {label}
      </span>
    </div>
  );
}
