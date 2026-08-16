import {
  BriefcaseBusiness,
  Building2,
  Hammer,
  Ruler,
  Sofa,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

import ClayButton from "@/components/ui/ClayButton";

/* =========================================================
   TYPES
========================================================= */

type ServiceItem = {
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  useCase: string;
  href: string;
  icon: LucideIcon;
};

/* =========================================================
   DATA
========================================================= */

const services: ServiceItem[] = [
  {
    number: "01",
    eyebrow: "Made to Measure",
    title: "Bespoke Sofas",
    description:
      "For spaces where standard sofa sizes, proportions or configurations do not give you the result you need.",
    useCase:
      "Ideal for awkward layouts, specific dimensions and sofas designed around the room.",
    href: "/services/bespoke-sofa",
    icon: Ruler,
  },
  {
    number: "02",
    eyebrow: "Business & Hospitality",
    title: "Commercial Sofas",
    description:
      "Bespoke commercial seating developed around the practical and visual requirements of your space.",
    useCase:
      "For restaurants, cafés, hotels, offices, hospitality venues and commercial interiors.",
    href: "/services/commercial-sofas",
    icon: BriefcaseBusiness,
  },
  {
    number: "03",
    eyebrow: "Complete Spaces",
    title: "Interior Design",
    description:
      "Residential and commercial interior design for projects that need more than one individual sofa.",
    useCase:
      "For layouts, materials, colour, atmosphere and bespoke sofas brought into one clear direction.",
    href: "/services/interior-design",
    icon: Building2,
  },
  {
    number: "04",
    eyebrow: "Preserve What Works",
    title: "Sofa Repair & Restoration",
    description:
      "Professional repair and restoration for an existing sofa that is worn, damaged or simply worth keeping.",
    useCase:
      "For sofas that already fit the room but need attention before they can be enjoyed again.",
    href: "/services/sofa-repair-restoration",
    icon: Hammer,
  },
];

/* =========================================================
   ROOT
========================================================= */

export default function ConnectedServicesSection({
  id = "services",
}: {
  id?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby="connected-services-heading"
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
                HEADER
            ================================================== */}

            <div
              className="
                relative
                z-10

                grid
                gap-5

                lg:grid-cols-[1fr_0.8fr]
                lg:items-end
                lg:gap-12
              "
            >
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
                    <Sofa size={15} strokeWidth={1.5} />
                  </span>

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
                    Four Specialist Services
                  </span>
                </div>

                <h2
                  id="connected-services-heading"
                  className="
                    mt-4

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
                  Four Sofa Services, One Connected Approach
                  <span className="text-[var(--brand-gold)]">.</span>
                </h2>
              </div>

              <div className="max-w-[560px] lg:justify-self-end">
                <p
                  className="
                    font-brand-display

                    text-[19px]
                    font-medium
                    italic
                    leading-[1.4]

                    text-[var(--brand-navy)]

                    sm:text-[21px]
                  "
                >
                  Not every project begins in the same place.
                </p>

                <p
                  className="
                    mt-3

                    font-brand-sans

                    text-[11px]
                    font-medium
                    leading-[1.7]

                    text-[var(--brand-text-muted)]

                    sm:text-[12px]

                    lg:text-[13px]
                  "
                >
                  Each Sofa N More service has a distinct purpose, process and
                  dedicated page, so you can explore the information most
                  relevant to your project.
                </p>
              </div>
            </div>

            {/* =================================================
                INTRO MESSAGE
            ================================================== */}

            <div
              className="
                relative
                z-10

                mt-7

                rounded-[19px]

                bg-[var(--brand-navy)]

                px-4
                py-4

                sm:px-5
                sm:py-5
              "
            >
              <div
                className="
                  grid
                  gap-3

                  sm:grid-cols-[auto_1fr]
                  sm:items-start
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
                  <Sofa size={14} strokeWidth={1.5} />
                </span>

                <p
                  className="
                    max-w-[1050px]

                    font-brand-display

                    text-[18px]
                    font-semibold
                    leading-[1.4]

                    text-white

                    sm:text-[20px]

                    lg:text-[22px]
                  "
                >
                  Start with the need you have today — a custom sofa, commercial
                  seating, a complete interior or an existing sofa worth
                  restoring.
                </p>
              </div>
            </div>

            {/* =================================================
                SERVICE GRID
            ================================================== */}

            <div
              className="
                relative
                z-10

                mt-5

                grid
                gap-3

                md:grid-cols-2

                lg:gap-4
              "
            >
              {services.map((service) => (
                <ServiceCard key={service.number} service={service} />
              ))}
            </div>

            {/* =================================================
                CLOSING
            ================================================== */}

            <div
              className="
                relative
                z-10

                mt-6

                border-t
                border-[var(--brand-navy)]/10

                pt-6
              "
            >
              <div
                className="
                  flex
                  flex-col
                  gap-2

                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                  sm:gap-8
                "
              >
                <span
                  className="
                    font-brand-sans

                    text-[7px]
                    font-bold
                    uppercase

                    tracking-[0.17em]

                    text-[var(--brand-gold-700)]
                  "
                >
                  Find the Right Starting Point
                </span>

                <p
                  className="
                    max-w-[720px]

                    font-brand-display

                    text-[16px]
                    font-medium
                    leading-[1.45]

                    text-[var(--brand-navy)]

                    sm:text-[17px]
                    sm:text-right
                  "
                >
                  Explore the dedicated service that best matches your project.
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
   SERVICE CARD
========================================================= */

function ServiceCard({ service }: { service: ServiceItem }) {
  const Icon = service.icon;

  return (
    <article
      className="
        clay-surface-soft

        rounded-[21px]

        p-[5px]
      "
    >
      <div
        className="
          clay-inset

          flex
          h-full
          flex-col

          rounded-[17px]

          px-4
          py-4

          sm:px-5
          sm:py-5

          lg:px-6
          lg:py-6
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

            gap-4
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
              <Icon size={15} strokeWidth={1.5} />
            </span>

            <div>
              <span
                className="
                  font-brand-sans

                  text-[6px]
                  font-bold
                  uppercase

                  tracking-[0.16em]

                  text-[var(--brand-gold-700)]
                "
              >
                {service.eyebrow}
              </span>

              <h3
                className="
                  mt-1.5

                  font-brand-display

                  text-[22px]
                  font-semibold
                  leading-[1.12]

                  tracking-[-0.025em]

                  text-[var(--brand-navy)]

                  sm:text-[24px]
                "
              >
                {service.title}
              </h3>
            </div>
          </div>

          <span
            className="
              shrink-0

              font-brand-display

              text-[28px]
              font-semibold
              leading-none

              text-[var(--brand-gold-700)]/30
            "
          >
            {service.number}
          </span>
        </div>

        {/* =====================================================
            DESCRIPTION
        ====================================================== */}

        <p
          className="
            mt-5

            max-w-[560px]

            font-brand-sans

            text-[10px]
            font-medium
            leading-[1.7]

            text-[var(--brand-text-muted)]

            sm:text-[11px]

            lg:text-[12px]
          "
        >
          {service.description}
        </p>

        {/* =====================================================
            BEST FOR
        ====================================================== */}

        <div
          className="
            mt-4

            rounded-[15px]

            bg-[var(--brand-navy)]

            px-3.5
            py-3.5
          "
        >
          <span
            className="
              font-brand-sans

              text-[6px]
              font-bold
              uppercase

              tracking-[0.15em]

              text-[var(--brand-gold)]
            "
          >
            A Good Starting Point For
          </span>

          <p
            className="
              mt-1.5

              font-brand-sans

              text-[9px]
              font-medium
              leading-[1.6]

              text-white/62

              sm:text-[10px]
            "
          >
            {service.useCase}
          </p>
        </div>

        {/* =====================================================
            INTERNAL LINK
        ====================================================== */}

        <div
          className="
            mt-auto
            pt-5
          "
        >
          <ClayButton
            href={service.href}
            variant="outline"
            size="sm"
            showArrow
            ariaLabel={`Explore ${service.title}`}
          >
            Explore {service.title}
          </ClayButton>
        </div>
      </div>
    </article>
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
