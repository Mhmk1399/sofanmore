import { Building2, MapPin, Navigation, Truck } from "lucide-react";

/* =========================================================
   DATA
========================================================= */

const localAreas = [
  "Cricklewood",
  "Staples Corner",
  "Brent Cross",
  "Neasden",
  "Dollis Hill",
  "Hendon",
  "Golders Green",
  "Willesden Green",
  "West Hampstead",
  "Kilburn",
  "Hampstead",
  "Colindale",
  "Wembley",
];

/* =========================================================
   ROOT
========================================================= */

export default function WorkshopServiceAreaSection() {
  return (
    <section
      aria-labelledby="workshop-service-area-heading"
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

            relative
            overflow-hidden

            rounded-[28px]

            px-5
            py-6

            sm:rounded-[32px]
            sm:px-7
            sm:py-8

            lg:rounded-[36px]
            lg:px-9
            lg:py-9
          "
        >
          <QuietDecoration />

          {/* =================================================
              MAIN CONTENT
          ================================================== */}

          <div
            className="
              relative
              z-10

              grid
              gap-8

              lg:grid-cols-[0.72fr_1.28fr]
              lg:items-start
              lg:gap-12

              xl:gap-16
            "
          >
            {/* =================================================
                LEFT — INTRO
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
                  <MapPin size={15} strokeWidth={1.5} />
                </span>

                <span
                  className="
                    font-brand-sans

                    text-[13px]
                    font-bold
                    uppercase

                    tracking-[0.2em]

                    text-[var(--brand-gold-700)]

                    sm:text-[11px]
                  "
                >
                  Sofa N More · London NW2
                </span>
              </div>

              {/* H2 */}

              <h2
                id="workshop-service-area-heading"
                className="
                  mt-4

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
                Based in North West London,
                <span className="block">
                  Working Across London
                  <span className="text-[var(--brand-gold)]">.</span>
                </span>
              </h2>

              <p
                className="
                  mt-5

                  max-w-[550px]

                  font-brand-display

                  text-[18px]
                  font-medium
                  leading-[1.45]

                  text-[var(--brand-navy)]

                  sm:text-[20px]
                "
              >
                Our workshop is particularly convenient for clients across
                Cricklewood, Staples Corner and surrounding parts of North West
                London.
              </p>

              <p
                className="
                  mt-4

                  max-w-[560px]

                  font-brand-sans

                  text-[13px]
                  font-medium
                  leading-[1.75]

                  text-[var(--brand-text-muted)]

                  sm:text-[11px]

                  lg:text-[12px]
                "
              >
                Our working sofa and upholstery workshop is based in London NW2,
                giving local residential and commercial clients a practical
                place to visit, discuss projects and arrange suitable workshop
                services.
              </p>

              {/* LOCATION */}

              <div
                className="
                  mt-6

                  flex
                  items-start
                  gap-3

                  border-l-2
                  border-[var(--brand-gold)]

                  pl-4
                "
              >
                <Navigation
                  size={15}
                  strokeWidth={1.5}
                  className="
                    mt-0.5
                    shrink-0

                    text-[var(--brand-gold-700)]
                  "
                />

                <div>
                  <span
                    className="
                      font-brand-sans

                      text-[13px]
                      font-bold
                      uppercase

                      tracking-[0.16em]

                      text-[var(--brand-gold-700)]
                    "
                  >
                    North West London Workshop
                  </span>

                  <p
                    className="
                      mt-1

                      font-brand-sans

                      text-[12px]
                      font-semibold
                      leading-[1.6]

                      text-[var(--brand-navy)]

                      sm:text-[13px]
                    "
                  >
                    Unit G19, Atlas Business Centre, Oxgate Lane, Staples Corner
                    West, London NW2 7HJ
                  </p>
                </div>
              </div>
            </div>

            {/* =================================================
                RIGHT — AREAS
            ================================================== */}

            <div
              className="
                clay-inset

                rounded-[22px]

                bg-[#FFFDF8]/60

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
                  <Building2 size={15} strokeWidth={1.6} />
                </span>

                <div>
                  <span
                    className="
                      font-brand-sans

                      text-[13px]
                      font-bold
                      uppercase

                      tracking-[0.18em]

                      text-[var(--brand-gold-700)]
                    "
                  >
                    Areas Around Our Workshop
                  </span>

                  <h3
                    className="
                      mt-1.5

                      max-w-[600px]

                      font-brand-display

                      text-[22px]
                      font-semibold
                      leading-[1.2]

                      text-[var(--brand-navy)]

                      sm:text-[25px]
                    "
                  >
                    Convenient for clients across North West London.
                  </h3>
                </div>
              </div>

              {/* =================================================
                  AREAS GRID
              ================================================== */}

              <ul
                className="
                  mt-5

                  grid
                  grid-cols-2

                  gap-x-3
                  gap-y-2

                  sm:grid-cols-3

                  xl:grid-cols-4
                "
              >
                {localAreas.map((area) => (
                  <AreaItem key={area} area={area} />
                ))}

                <li
                  className="
                    col-span-2

                    flex
                    min-h-[48px]

                    items-center
                    gap-2.5

                    rounded-[14px]

                    border
                    border-[var(--brand-gold)]/20

                    bg-[var(--brand-gold)]/[0.06]

                    px-3
                    py-2.5

                    sm:col-span-3

                    xl:col-span-4
                  "
                >
                  <span
                    className="
                      h-1.5
                      w-1.5

                      shrink-0

                      rounded-full

                      bg-[var(--brand-gold)]
                    "
                  />

                  <span
                    className="
                      font-brand-sans

                      text-[11px]
                      font-semibold
                      leading-[1.5]

                      text-[var(--brand-navy)]

                      sm:text-[12px]
                    "
                  >
                    Nearby parts of North West London
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* =================================================
              WIDER LONDON
          ================================================== */}

          <div
            className="
              relative
              z-10

              mt-6

              rounded-[19px]

              bg-[var(--brand-navy)]

              px-4
              py-5

              sm:px-5

              lg:px-6
            "
          >
            <div
              className="
                grid
                gap-5

                md:grid-cols-[0.9fr_1.1fr]
                md:items-center
                md:gap-8
              "
            >
              {/* WIDER LONDON */}

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
                  <MapPin size={14} strokeWidth={1.6} />
                </span>

                <div>
                  <span
                    className="
                      font-brand-sans

                      text-[13px]
                      font-bold
                      uppercase

                      tracking-[0.17em]

                      text-[var(--brand-gold)]
                    "
                  >
                    Wider London Projects
                  </span>

                  <p
                    className="
                      mt-1

                      max-w-[520px]

                      font-brand-display

                      text-[17px]
                      font-medium
                      leading-[1.4]

                      text-white

                      sm:text-[19px]
                    "
                  >
                    We also welcome suitable residential and commercial projects
                    from wider London.
                  </p>
                </div>
              </div>

              {/* LOGISTICS */}

              <div
                className="
                  flex
                  items-start
                  gap-3

                  border-t
                  border-white/10

                  pt-4

                  md:border-l
                  md:border-t-0

                  md:pl-6
                  md:pt-0
                "
              >
                <Truck
                  size={16}
                  strokeWidth={1.5}
                  className="
                    mt-0.5

                    shrink-0

                    text-[var(--brand-gold)]
                  "
                />

                <div>
                  <span
                    className="
                      font-brand-sans

                      text-[13px]
                      font-bold
                      uppercase

                      tracking-[0.17em]

                      text-[var(--brand-gold)]
                    "
                  >
                    Collection · Visits · Delivery · Installation
                  </span>

                  <p
                    className="
                      mt-1.5

                      max-w-[650px]

                      font-brand-sans

                      text-[12px]
                      font-medium
                      leading-[1.65]

                      text-white/60

                      sm:text-[13px]
                    "
                  >
                    Collection, site visits, delivery and installation
                    requirements depend on the type of project, item and
                    postcode.
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
   AREA ITEM
========================================================= */

function AreaItem({ area }: { area: string }) {
  return (
    <li
      className="
        flex
        min-h-[46px]

        items-center
        gap-2.5

        rounded-[14px]

        border
        border-[var(--brand-navy)]/[0.06]

        bg-white/35

        px-3
        py-2.5
      "
    >
      <span
        className="
          h-1.5
          w-1.5

          shrink-0

          rounded-full

          bg-[var(--brand-gold)]
        "
      />

      <span
        className="
          font-brand-sans

          text-[11px]
          font-semibold
          leading-[1.4]

          text-[var(--brand-navy)]

          sm:text-[12px]
        "
      >
        {area}
      </span>
    </li>
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

          -right-[85px]
          -top-[95px]

          hidden

          h-[185px]
          w-[185px]

          rounded-full

          border
          border-[var(--brand-gold)]/10

          lg:block
        "
      />
    </div>
  );
}
