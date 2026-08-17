import { Building2, Check, Layers3, Ruler, Sofa, Sparkles } from "lucide-react";

import type { LucideIcon } from "lucide-react";

import ClayButton from "@/components/ui/ClayButton";

/* =========================================================
   TYPES
========================================================= */

type ServiceChoice = {
  number: string;
  question: string;
  service: string;
  description: string;
  href: string;
  cta: string;
  icon: LucideIcon;
};

/* =========================================================
   DATA
========================================================= */

const serviceChoices: ServiceChoice[] = [
  {
    number: "01",
    question: "I Need a New Sofa Made to Particular Dimensions",
    service: "Bespoke Sofas & Made-to-Measure Seating",
    description:
      "For new sofas and upholstered seating designed around a particular room, layout, comfort preference and visual direction.",
    href: "/services/bespoke-sofas",
    cta: "Explore Bespoke Sofas",
    icon: Ruler,
  },

  {
    number: "02",
    question: "I Need Sofas or Seating for a Business",
    service: "Commercial Sofas & Contract Seating",
    description:
      "For restaurants, cafés, hotels, offices, reception spaces and other commercial environments.",
    href: "/services/commercial-sofas",
    cta: "Explore Commercial Sofas",
    icon: Building2,
  },

  {
    number: "03",
    question: "I Need Help Designing the Complete Space",
    service: "Interior Design",
    description:
      "For projects where layout, materials, colours, atmosphere and seating need to work together as one coherent interior.",
    href: "/services/interior-design",
    cta: "Explore Interior Design",
    icon: Layers3,
  },

  {
    number: "04",
    question: "I Want to Keep and Restore My Existing Sofa",
    service: "Sofa Repair & Restoration",
    description:
      "Send photographs and details of the condition so the sofa can be assessed before a suitable direction is recommended.",
    href: "/services/sofa-repair-restoration",
    cta: "Explore Sofa Repair & Restoration",
    icon: Sofa,
  },
];

/* =========================================================
   ROOT
========================================================= */

export default function WhichServiceIsRightSection() {
  return (
    <section
      aria-labelledby="which-service-is-right-heading"
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

                lg:grid-cols-[1fr_0.72fr]
                lg:items-end
                lg:gap-12
              "
            >
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
                    <Sparkles size={15} strokeWidth={1.5} />
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
                    Find Your Starting Point
                  </span>
                </div>

                {/* H2 */}

                <h2
                  id="which-service-is-right-heading"
                  className="
                    mt-4

                    max-w-[760px]

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
                  Which Sofa Service Is Right for You
                  <span className="text-[var(--brand-gold)]">?</span>
                </h2>
              </div>

              {/* HEADER SUPPORT */}

              <div className="max-w-[500px] lg:justify-self-end">
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
                  Start with what you need the project to achieve.
                </p>

                <p
                  className="
                    mt-3

                    font-brand-sans

                    text-[10px]
                    font-medium
                    leading-[1.7]

                    text-[var(--brand-text-muted)]

                    sm:text-[11px]

                    lg:text-[12px]
                  "
                >
                  Each service has a different purpose. Choose the route that
                  most closely matches your requirement and explore the
                  dedicated service page.
                </p>
              </div>
            </div>

            {/* =================================================
                CHOICE GRID
            ================================================== */}

            <div
              className="
                relative
                z-10

                mt-7

                grid
                gap-3

                md:grid-cols-2

                lg:mt-9
                lg:gap-4
              "
            >
              {serviceChoices.map((choice) => (
                <ServiceChoiceCard key={choice.number} choice={choice} />
              ))}
            </div>

            {/* =================================================
                MULTI-SERVICE PROJECT
            ================================================== */}

            <MultiServicePanel />
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   SERVICE CHOICE CARD
========================================================= */

function ServiceChoiceCard({ choice }: { choice: ServiceChoice }) {
  const Icon = choice.icon;

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

          <span
            className="
              font-brand-display

              text-[28px]
              font-semibold
              leading-none

              text-[var(--brand-gold-700)]/30
            "
          >
            {choice.number}
          </span>
        </div>

        {/* =====================================================
            USER NEED
        ====================================================== */}

        <div className="mt-4">
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
            Your Requirement
          </span>

          <h3
            className="
              mt-1.5

              max-w-[500px]

              font-brand-display

              text-[20px]
              font-semibold
              leading-[1.2]

              tracking-[-0.02em]

              text-[var(--brand-navy)]

              sm:text-[22px]
            "
          >
            “{choice.question}”
          </h3>
        </div>

        {/* =====================================================
            CHOOSE
        ====================================================== */}

        <div
          className="
            mt-5

            rounded-[16px]

            bg-[var(--brand-navy)]

            px-3.5
            py-3.5

            sm:px-4
            sm:py-4
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
              <Check size={11} strokeWidth={2.2} />
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
                Choose
              </span>

              <p
                className="
                  mt-1

                  font-brand-display

                  text-[17px]
                  font-semibold
                  leading-[1.3]

                  text-white

                  sm:text-[19px]
                "
              >
                {choice.service}
              </p>
            </div>
          </div>
        </div>

        {/* =====================================================
            DESCRIPTION
        ====================================================== */}

        <p
          className="
            mt-4

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
          {choice.description}
        </p>

        {/* =====================================================
            CTA
        ====================================================== */}

        <div
          className="
            mt-auto

            pt-5
          "
        >
          <ClayButton
            href={choice.href}
            variant="outline"
            size="sm"
            showArrow
            ariaLabel={choice.cta}
          >
            {choice.cta}
          </ClayButton>
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   MULTI SERVICE PANEL
========================================================= */

function MultiServicePanel() {
  return (
    <div
      className="
        relative
        z-10

        mt-5

        rounded-[22px]

        bg-[var(--brand-navy)]

        px-4
        py-5

        sm:px-5
        sm:py-6

        lg:px-6
        lg:py-6
      "
    >
      <div
        className="
          grid
          gap-6

          lg:grid-cols-[0.9fr_1.1fr]
          lg:items-center
          lg:gap-10
        "
      >
        {/* =====================================================
            LEFT
        ====================================================== */}

        <div>
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
              <Layers3 size={15} strokeWidth={1.5} />
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
                More Than One Service?
              </span>

              <h3
                className="
                  mt-1.5

                  max-w-[520px]

                  font-brand-display

                  text-[23px]
                  font-semibold
                  leading-[1.2]

                  text-white

                  sm:text-[26px]
                "
              >
                Some projects naturally overlap.
              </h3>
            </div>
          </div>

          <p
            className="
              mt-4

              max-w-[620px]

              font-brand-sans

              text-[10px]
              font-medium
              leading-[1.7]

              text-white/55

              sm:text-[11px]

              lg:text-[12px]
            "
          >
            Describe the complete requirement rather than separating it into
            several enquiries. We can help determine the most logical starting
            point.
          </p>

          <div className="mt-5">
            <ClayButton
              href="/contact-us"
              variant="ivory"
              size="lg"
              showArrow
              className="max-sm:w-full"
              ariaLabel="Discuss a project involving more than one Sofa N More service"
            >
              Discuss Your Complete Project
            </ClayButton>
          </div>
        </div>

        {/* =====================================================
            EXAMPLES
        ====================================================== */}

        <div
          className="
            grid
            gap-2.5
          "
        >
          <OverlapExample
            title="Restaurant Project"
            text="Interior Design + Commercial Sofas"
            links={[
              {
                label: "Interior Design",
                href: "/services/interior-design",
              },
              {
                label: "Commercial Sofas",
                href: "/services/commercial-sofas",
              },
            ]}
          />

          <OverlapExample
            title="Residential Project"
            text="Interior Design + Bespoke Sofa"
            links={[
              {
                label: "Interior Design",
                href: "/services/interior-design",
              },
              {
                label: "Bespoke Sofas",
                href: "/services/bespoke-sofas",
              },
            ]}
          />

          <OverlapExample
            title="Existing Sofa + New Interior"
            text="Sofa Restoration + Interior Design"
            links={[
              {
                label: "Sofa Repair & Restoration",
                href: "/services/sofa-repair-restoration",
              },
              {
                label: "Interior Design",
                href: "/services/interior-design",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   OVERLAP EXAMPLE
========================================================= */

function OverlapExample({
  title,
  text,
  links,
}: {
  title: string;
  text: string;
  links: {
    label: string;
    href: string;
  }[];
}) {
  return (
    <div
      className="
        rounded-[16px]

        border
        border-white/[0.07]

        bg-white/[0.04]

        px-3.5
        py-3.5

        sm:px-4
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
          <Check size={9} strokeWidth={2.2} />
        </span>

        <div className="min-w-0">
          <span
            className="
              block

              font-brand-sans

              text-[6px]
              font-bold
              uppercase

              tracking-[0.15em]

              text-[var(--brand-gold)]
            "
          >
            {title}
          </span>

          <p
            className="
              mt-1

              font-brand-display

              text-[16px]
              font-semibold
              leading-[1.3]

              text-white

              sm:text-[18px]
            "
          >
            {text}
          </p>

          {/* Internal links */}

          <div
            className="
              mt-2.5

              flex
              flex-wrap
              gap-x-3
              gap-y-1
            "
          >
            {links.map((link) => (
              <ClayButton
                key={link.href}
                href={link.href}
                variant="ivory"
                size="sm"
                showArrow
                ariaLabel={`Explore ${link.label}`}
              >
                {link.label}
              </ClayButton>
            ))}
          </div>
        </div>
      </div>
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
