import Link from "next/link";

import {
  Armchair,
  BriefcaseBusiness,
  Building2,
  Hammer,
  MapPin,
  MoveUpRight,
  Sofa,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

import ClayButton from "@/components/ui/ClayButton";

/* =========================================================
   TYPES
========================================================= */

type ServiceLink = {
  number: string;
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
};

/* =========================================================
   DATA
========================================================= */

const services: ServiceLink[] = [
  {
    number: "01",
    title: "Bespoke Sofas",
    description:
      "Made-to-measure sofas and seating designed around your dimensions, layout and style.",
    href: "/services/bespoke-sofas",
    icon: Sofa,
  },
  {
    number: "02",
    title: "Commercial Sofas",
    description:
      "Bespoke seating for restaurants, hospitality spaces, offices and commercial interiors.",
    href: "/services/commercial-sofas",
    icon: BriefcaseBusiness,
  },
  {
    number: "03",
    title: "Interior Design",
    description:
      "Residential and commercial interiors developed around the way the space needs to work.",
    href: "/services/interior-design",
    icon: Building2,
  },
  {
    number: "04",
    title: "Sofa Repair & Restoration",
    description:
      "Professional repair and restoration for sofas that are worn, damaged or worth preserving.",
    href: "/services/sofa-repair-restoration",
    icon: Hammer,
  },
];

const localAreas = ["Cricklewood", "Staples Corner", "Brent Cross"];

/* =========================================================
   ROOT
========================================================= */

export default function ServicesHero() {
  return (
    <section
      aria-labelledby="services-hero-heading"
      className="
        relative mt-20
        overflow-hidden

        bg-[var(--brand-ivory)]

        px-3
        pb-8
        pt-5

        sm:px-5
        sm:pb-10
        sm:pt-7

        lg:px-7
        lg:pb-14
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

              bg-[linear-gradient(135deg,#FFFDF8_0%,#F7F1E8_56%,#EEE4D6_100%)]

              px-5
              py-6

              sm:rounded-[29px]
              sm:px-7
              sm:py-8

              lg:rounded-[34px]
              lg:px-9
              lg:py-9

              xl:px-11
              xl:py-10
            "
          >
            <SubtleBackground />

            <div
              className="
                relative
                z-10

                grid
                gap-8

                lg:grid-cols-[1fr_0.92fr]
                lg:items-center
                lg:gap-12

                xl:gap-16
              "
            >
              {/* =================================================
                  LEFT CONTENT
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
                    <Armchair size={15} strokeWidth={1.5} />
                  </span>

                  <div>
                    <span
                      className="
                        block

                        font-brand-sans

                        text-[7px]
                        font-bold
                        uppercase

                        tracking-[0.2em]

                        text-[var(--brand-gold-700)]

                        sm:text-[8px]
                      "
                    >
                      Sofa Services · North West London
                    </span>

                    <div
                      className="
                        mt-1

                        flex
                        items-center
                        gap-1.5
                      "
                    >
                      <MapPin
                        size={10}
                        strokeWidth={1.5}
                        className="
                          text-[var(--brand-text-muted)]
                        "
                      />

                      <span
                        className="
                          font-brand-sans

                          text-[8px]
                          font-medium

                          text-[var(--brand-text-muted)]

                          sm:text-[9px]
                        "
                      >
                        Based at Staples Corner · NW2
                      </span>
                    </div>
                  </div>
                </div>

                {/* =================================================
                    H1
                ================================================== */}

                <h1
                  id="services-hero-heading"
                  className="
                    mt-6

                    max-w-[780px]

                    font-brand-display

                    text-[40px]
                    font-semibold
                    leading-[0.98]

                    tracking-[-0.04em]

                    text-[var(--brand-navy)]

                    min-[390px]:text-[44px]

                    sm:text-[53px]

                    lg:text-[clamp(52px,4.7vw,72px)]
                  "
                >
                  Sofa Services in North West London
                  <span className="text-[var(--brand-gold)]">.</span>
                </h1>

                {/* =================================================
                    LEAD
                ================================================== */}

                <p
                  className="
                    mt-6

                    max-w-[720px]

                    font-brand-display

                    text-[19px]
                    font-medium
                    italic
                    leading-[1.42]

                    text-[var(--brand-navy)]

                    sm:text-[22px]
                  "
                >
                  From one made-to-measure sofa to a complete commercial or
                  residential interior, every successful project starts with
                  understanding the space.
                </p>

                {/* =================================================
                    BODY
                ================================================== */}

                <div
                  className="
                    mt-5

                    max-w-[700px]

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
                    Sofa N More provides specialist sofa and interior services
                    from our North West London base near Cricklewood, Staples
                    Corner and Brent Cross.
                  </p>

                  <p>
                    We work with homeowners, businesses, hospitality venues and
                    design professionals looking for a more considered
                    alternative to standard, off-the-shelf seating.
                  </p>
                </div>

                {/* =================================================
                    LOCAL AREAS
                ================================================== */}

                <div
                  className="
                    mt-6

                    flex
                    flex-wrap
                    gap-2
                  "
                >
                  {localAreas.map((area) => (
                    <span
                      key={area}
                      className="
                        clay-surface-soft

                        inline-flex
                        items-center
                        gap-1.5

                        rounded-full

                        px-3
                        py-2

                        font-brand-sans

                        text-[7px]
                        font-bold
                        uppercase

                        tracking-[0.11em]

                        text-[var(--brand-navy)]

                        sm:text-[8px]
                      "
                    >
                      <MapPin
                        size={9}
                        strokeWidth={1.6}
                        className="
                          text-[var(--brand-gold-700)]
                        "
                      />

                      {area}
                    </span>
                  ))}
                </div>

                {/* =================================================
                    CTAs
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
                    ariaLabel="Discuss your project with Sofa N More"
                  >
                    Discuss Your Project
                  </ClayButton>

                  <ClayButton
                    href="#services"
                    variant="navy"
                    size="lg"
                    showArrow
                    className="max-sm:w-full"
                    ariaLabel="Explore Sofa N More services"
                  >
                    Explore Our Services
                  </ClayButton>
                </div>
              </div>

              {/* =================================================
                  SERVICE NAVIGATOR
              ================================================== */}

              <ServicesNavigator />
            </div>

            {/* =================================================
                CLOSING MESSAGE
            ================================================== */}

            <div
              className="
                relative
                z-10

                mt-7

                border-t
                border-[var(--brand-navy)]/10

                pt-6

                lg:mt-9
              "
            >
              <div
                className="
                  flex
                  flex-col

                  gap-3

                  lg:flex-row
                  lg:items-center
                  lg:justify-between
                "
              >
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
                  One Starting Point · Four Connected Services
                </span>

                <p
                  className="
                    max-w-[800px]

                    font-brand-display

                    text-[16px]
                    font-medium
                    leading-[1.4]

                    text-[var(--brand-navy)]

                    sm:text-[18px]

                    lg:text-right
                  "
                >
                  Whether you need a sofa designed to exact dimensions, seating
                  for a restaurant or office, help creating a complete interior,
                  or an existing sofa restored, we will help you identify the
                  most appropriate starting point.
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
   SERVICES NAVIGATOR
========================================================= */

function ServicesNavigator() {
  return (
    <aside
      aria-label="Explore Sofa N More services"
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
          sm:px-5
          sm:py-6
        "
      >
        {/* HEADER */}

        <div
          className="
            flex
            items-start
            justify-between

            gap-4
          "
        >
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
              Our Four Connected Services
            </span>

            <h2
              className="
                mt-1.5

                max-w-[460px]

                font-brand-display

                text-[24px]
                font-semibold
                leading-[1.15]

                tracking-[-0.025em]

                text-[var(--brand-navy)]

                sm:text-[27px]
              "
            >
              Start with what your project needs.
            </h2>
          </div>

          <span
            className="
              hidden

              h-10
              w-10

              shrink-0

              items-center
              justify-center

              rounded-full

              bg-[var(--brand-navy)]

              text-[var(--brand-gold)]

              sm:flex
            "
          >
            <Armchair size={16} strokeWidth={1.5} />
          </span>
        </div>

        {/* =====================================================
            SERVICE LINKS
        ====================================================== */}

        <nav
          aria-label="Service pages"
          className="
            mt-5

            grid
            gap-2.5
          "
        >
          {services.map((service) => (
            <ServiceNavigationCard key={service.number} service={service} />
          ))}
        </nav>

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
              <MapPin size={13} strokeWidth={1.7} />
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
                North West London Base
              </span>

              <p
                className="
                  mt-1

                  max-w-[450px]

                  font-brand-display

                  text-[17px]
                  font-medium
                  leading-[1.35]

                  text-white

                  sm:text-[19px]
                "
              >
                Near Cricklewood, Staples Corner and Brent Cross.
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

/* =========================================================
   SERVICE NAVIGATION CARD
========================================================= */

function ServiceNavigationCard({ service }: { service: ServiceLink }) {
  const Icon = service.icon;

  return (
    <Link
      href={service.href}
      aria-label={`Explore ${service.title}`}
      className="
        group

        clay-surface-soft

        flex
        items-center
        gap-3

        rounded-[17px]

        px-3.5
        py-3.5

        transition-transform
        duration-300

        hover:-translate-y-[2px]

        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-[var(--brand-gold)]
        focus-visible:ring-offset-2
      "
    >
      {/* ICON */}

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
        <Icon size={15} strokeWidth={1.5} />
      </span>

      {/* COPY */}

      <div className="min-w-0 flex-1">
        <div
          className="
            flex
            items-center
            gap-2
          "
        >
          <span
            className="
              font-brand-sans

              text-[6px]
              font-bold
              uppercase

              tracking-[0.15em]

              text-[var(--brand-gold-700)]
            "
          >
            Service {service.number}
          </span>
        </div>

        <h3
          className="
            mt-1

            font-brand-display

            text-[17px]
            font-semibold
            leading-[1.2]

            text-[var(--brand-navy)]

            sm:text-[18px]
          "
        >
          {service.title}
        </h3>

        <p
          className="
            mt-1

            max-w-[440px]

            font-brand-sans

            text-[8px]
            font-medium
            leading-[1.55]

            text-[var(--brand-text-muted)]

            sm:text-[9px]
          "
        >
          {service.description}
        </p>
      </div>

      {/* ARROW */}

      <span
        aria-hidden
        className="
          flex
          h-8
          w-8

          shrink-0

          items-center
          justify-center

          rounded-full

          border
          border-[var(--brand-navy)]/10

          text-[var(--brand-navy)]

          transition-all
          duration-300

          group-hover:border-[var(--brand-gold)]
          group-hover:bg-[var(--brand-gold)]
        "
      >
        <MoveUpRight size={13} strokeWidth={1.6} />
      </span>
    </Link>
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

          -right-[110px]
          -top-[145px]

          hidden

          h-[300px]
          w-[300px]

          rounded-full

          border
          border-[var(--brand-gold)]/10

          lg:block
        "
      />

      <div
        className="
          absolute

          -right-[20px]
          -top-[50px]

          hidden

          h-[150px]
          w-[150px]

          rounded-full

          border
          border-[var(--brand-navy)]/[0.04]

          lg:block
        "
      />

      <div
        className="
          absolute

          -bottom-[120px]
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
