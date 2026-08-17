import Link from "next/link";

import {
  Building2,
  Check,
  MapPin,
  Navigation,
  Route,
  Sofa,
} from "lucide-react";

import ClayButton from "@/components/ui/ClayButton";

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
  "Finchley",
];

const serviceLinks = [
  {
    label: "Bespoke Sofas",
    href: "/services/bespoke-sofas",
  },
  {
    label: "Commercial Sofas",
    href: "/services/commercial-sofas",
  },
  {
    label: "Interior Design",
    href: "/services/interior-design",
  },
  {
    label: "Sofa Repair & Restoration",
    href: "/services/sofa-repair-restoration",
  },
];

/* =========================================================
   ROOT
========================================================= */

export default function NorthWestLondonServiceAreaSection({
  id = "north-west-london-services",
}: {
  id?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby="north-west-london-service-area-heading"
      className="
        scroll-mt-24

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

                lg:grid-cols-[0.9fr_1.1fr]
                lg:items-center
                lg:gap-12

                xl:gap-16
              "
            >
              {/* =================================================
                  LOCAL CONTENT
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
                    <MapPin size={15} strokeWidth={1.5} />
                  </span>

                  <div>
                    <span
                      className="
                        block

                        font-brand-sans

                        text-[8px]
                        font-bold
                        uppercase

                        tracking-[0.2em]

                        text-[var(--brand-gold-700)]

                        sm:text-[9px]
                      "
                    >
                      Our North West London Base
                    </span>

                    <span
                      className="
                        mt-1
                        block

                        font-brand-sans

                        text-[8px]
                        font-medium

                        text-[var(--brand-text-muted)]

                        sm:text-[9px]
                      "
                    >
                      Staples Corner · London NW2
                    </span>
                  </div>
                </div>

                {/* H2 */}

                <h2
                  id="north-west-london-service-area-heading"
                  className="
                    mt-5

                    max-w-[780px]

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
                  Serving Cricklewood, Brent Cross & Surrounding Areas
                  <span className="text-[var(--brand-gold)]">.</span>
                </h2>

                {/* BODY */}

                <p
                  className="
                    mt-6

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
                  Our North West London base is positioned close to Cricklewood,
                  Staples Corner, Brent Cross and Neasden.
                </p>

                {/* =================================================
                    ADDRESS
                ================================================== */}

                <div
                  className="
                    mt-6

                    rounded-[20px]

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
                      <Building2 size={15} strokeWidth={1.5} />
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
                        Sofa N More
                      </span>

                      <address
                        className="
                          mt-2

                          not-italic

                          font-brand-sans

                          text-[11px]
                          font-medium
                          leading-[1.7]

                          text-white/70

                          sm:text-[12px]
                        "
                      >
                        <strong
                          className="
                            block

                            font-brand-display

                            text-[19px]
                            font-semibold

                            text-white

                            sm:text-[21px]
                          "
                        >
                          Unit G19, Atlas Business Centre
                        </strong>

                        <span className="mt-1 block">
                          Oxgate Lane, Staples Corner West
                        </span>

                        <span className="block">London NW2 7HJ</span>
                      </address>
                    </div>
                  </div>
                </div>

                {/* =================================================
                    PROJECT NOTE
                ================================================== */}

                <div
                  className="
                    mt-5

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
                    Include Your Project Location
                  </span>

                  <p
                    className="
                      mt-1.5

                      max-w-[590px]

                      font-brand-display

                      text-[19px]
                      font-semibold
                      leading-[1.35]

                      text-[var(--brand-navy)]

                      sm:text-[21px]
                    "
                  >
                    Tell us the postcode when contacting us so we can give you
                    more relevant information from the beginning.
                  </p>
                </div>

                {/* CTA */}

                <div className="mt-7">
                  <ClayButton
                    href="/contact-us"
                    variant="gold"
                    size="lg"
                    showArrow
                    className="max-sm:w-full"
                    ariaLabel="Discuss a North West London project with Sofa N More"
                  >
                    Discuss a North West London Project
                  </ClayButton>
                </div>
              </div>

              {/* =================================================
                  AREA PANEL
              ================================================== */}

              <LocalAreasPanel />
            </div>

            {/* =================================================
                SERVICE / POSTCODE NOTE
            ================================================== */}

            <div
              className="
                relative
                z-10

                mt-7

                grid
                gap-4

                lg:mt-9
                lg:grid-cols-[1.05fr_0.95fr]
              "
            >
              {/* PROJECT SUITABILITY */}

              <div
                className="
                  clay-surface-soft

                  rounded-[21px]

                  p-[5px]
                "
              >
                <div
                  className="
                    clay-inset

                    h-full

                    rounded-[17px]

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
                      <Route size={15} strokeWidth={1.5} />
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
                        Every Project Is Different
                      </span>

                      <h3
                        className="
                          mt-1.5

                          max-w-[560px]

                          font-brand-display

                          text-[22px]
                          font-semibold
                          leading-[1.2]

                          text-[var(--brand-navy)]

                          sm:text-[24px]
                        "
                      >
                        Location is one part of understanding the project.
                      </h3>
                    </div>
                  </div>

                  <p
                    className="
                      mt-4

                      max-w-[650px]

                      font-brand-sans

                      text-[10px]
                      font-medium
                      leading-[1.7]

                      text-[var(--brand-text-muted)]

                      sm:text-[11px]
                    "
                  >
                    Project suitability, collection, delivery, measuring visits
                    and installation requirements depend on the individual
                    service and postcode.
                  </p>

                  <div
                    className="
                      mt-4

                      grid
                      gap-2

                      sm:grid-cols-2
                    "
                  >
                    <ProjectDetail label="Project suitability" />
                    <ProjectDetail label="Collection & delivery" />
                    <ProjectDetail label="Measuring visits" />
                    <ProjectDetail label="Installation requirements" />
                  </div>
                </div>
              </div>

              {/* =================================================
                  SERVICE LINKS
              ================================================== */}

              <div
                className="
                  rounded-[21px]

                  bg-[var(--brand-navy)]

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
                    <Sofa size={15} strokeWidth={1.5} />
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
                      Services From Our London Base
                    </span>

                    <h3
                      className="
                        mt-1.5

                        max-w-[500px]

                        font-brand-display

                        text-[22px]
                        font-semibold
                        leading-[1.2]

                        text-white

                        sm:text-[24px]
                      "
                    >
                      Explore the service that matches your project.
                    </h3>
                  </div>
                </div>

                <nav
                  aria-label="Sofa N More service pages"
                  className="
                    mt-5

                    grid
                    gap-2
                  "
                >
                  {serviceLinks.map((service) => (
                    <Link
                      key={service.href}
                      href={service.href}
                      className="
                        group

                        flex
                        items-center
                        justify-between

                        gap-3

                        rounded-[13px]

                        border
                        border-white/[0.07]

                        bg-white/[0.04]

                        px-3
                        py-2.5

                        font-brand-sans

                        text-[9px]
                        font-semibold

                        text-white/70

                        transition-all
                        duration-300

                        hover:border-[var(--brand-gold)]/35
                        hover:bg-white/[0.07]
                        hover:text-white

                        focus-visible:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-[var(--brand-gold)]

                        sm:text-[10px]
                      "
                    >
                      <span>{service.label}</span>

                      <Navigation
                        size={11}
                        strokeWidth={1.6}
                        className="
                          shrink-0

                          text-[var(--brand-gold)]

                          transition-transform
                          duration-300

                          group-hover:translate-x-0.5
                        "
                      />
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   LOCAL AREAS PANEL
========================================================= */

function LocalAreasPanel() {
  return (
    <aside
      aria-label="Areas near Sofa N More in North West London"
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

          rounded-[21px]

          px-4
          py-5

          sm:rounded-[24px]
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
            <MapPin size={16} strokeWidth={1.5} />
          </span>

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
              Nearby Areas
            </span>

            <h3
              className="
                mt-1.5

                max-w-[490px]

                font-brand-display

                text-[24px]
                font-semibold
                leading-[1.15]

                tracking-[-0.025em]

                text-[var(--brand-navy)]

                sm:text-[27px]
              "
            >
              Residential & commercial enquiries across nearby areas.
            </h3>

            <p
              className="
                mt-3

                max-w-[520px]

                font-brand-sans

                text-[10px]
                font-medium
                leading-[1.65]

                text-[var(--brand-text-muted)]

                sm:text-[11px]
              "
            >
              We welcome suitable enquiries from North West London and
              surrounding neighbourhoods, including:
            </p>
          </div>
        </div>

        {/* =====================================================
            AREAS
        ====================================================== */}

        <div
          className="
            mt-5

            grid
            grid-cols-2
            gap-2

            sm:grid-cols-3
          "
        >
          {localAreas.map((area) => (
            <AreaItem key={area} area={area} />
          ))}
        </div>

        {/* =====================================================
            LOCAL BASE
        ====================================================== */}

        <div
          className="
            mt-5

            rounded-[17px]

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
                h-8
                w-8

                shrink-0

                items-center
                justify-center

                rounded-full

                bg-[var(--brand-gold)]

                text-[var(--brand-navy)]
              "
            >
              <Navigation size={13} strokeWidth={1.6} />
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
                Based at Staples Corner West
              </span>

              <p
                className="
                  mt-1

                  max-w-[480px]

                  font-brand-display

                  text-[17px]
                  font-medium
                  leading-[1.35]

                  text-white

                  sm:text-[19px]
                "
              >
                Close to Cricklewood, Brent Cross and Neasden.
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

/* =========================================================
   AREA ITEM
========================================================= */

function AreaItem({ area }: { area: string }) {
  return (
    <div
      className="
        clay-surface-soft

        flex
        min-h-[43px]

        items-center
        gap-2

        rounded-[13px]

        px-2.5
        py-2
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

          bg-[var(--brand-navy)]

          text-[var(--brand-gold)]
        "
      >
        <MapPin size={8} strokeWidth={1.7} />
      </span>

      <span
        className="
          font-brand-sans

          text-[7px]
          font-bold
          leading-[1.3]

          text-[var(--brand-navy)]

          sm:text-[8px]
        "
      >
        {area}
      </span>
    </div>
  );
}

/* =========================================================
   PROJECT DETAIL
========================================================= */

function ProjectDetail({ label }: { label: string }) {
  return (
    <div
      className="
        flex
        items-center
        gap-2.5

        rounded-[13px]

        bg-white/35

        px-3
        py-2.5
      "
    >
      <span
        className="
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
        <Check size={8} strokeWidth={2.1} />
      </span>

      <span
        className="
          font-brand-sans

          text-[8px]
          font-semibold

          text-[var(--brand-navy)]

          sm:text-[9px]
        "
      >
        {label}
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
