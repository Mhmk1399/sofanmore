import Link from "next/link";

import {
  Check,
  ClipboardCheck,
  FileText,
  Images,
  Layers3,
  Sofa,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

type BriefExample = {
  label: string;
  text: string;
  href: string;
};

type SharedDetail = {
  label: string;
};

/* =========================================================
   DATA
========================================================= */

const usefulDetails: SharedDetail[] = [
  { label: "Photographs of the room" },
  { label: "Photographs of an existing sofa" },
  { label: "Approximate measurements" },
  { label: "A floor plan" },
  { label: "A sketch" },
  { label: "Inspiration images" },
  { label: "The type of property or venue" },
  { label: "The project postcode" },
  { label: "Intended use" },
  { label: "Preferred visual direction" },
  { label: "Access considerations" },
  { label: "What is currently not working" },
];

const briefExamples: BriefExample[] = [
  {
    label: "Bespoke Sofas",
    text: "Dimensions, configuration, comfort and upholstery.",
    href: "/services/bespoke-sofas",
  },
  {
    label: "Commercial Sofas",
    text: "The venue, floor plan, quantity and seating requirements.",
    href: "/services/commercial-sofas",
  },
  {
    label: "Interior Design",
    text: "The wider layout, material direction and atmosphere.",
    href: "/services/interior-design",
  },
  {
    label: "Sofa Repair & Restoration",
    text: "The condition of the existing sofa and what has changed.",
    href: "/services/sofa-repair-restoration",
  },
];

/* =========================================================
   ROOT
========================================================= */

export default function HowYourProjectBeginsSection() {
  return (
    <section
      aria-labelledby="how-your-project-begins-heading"
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
                    <ClipboardCheck size={15} strokeWidth={1.5} />
                  </span>

                  <span
                    className="
                      font-brand-sans

                      text-[11px]
                      font-bold
                      uppercase

                      tracking-[0.22em]

                      text-[var(--brand-gold-700)]

                      sm:text-[12px]
                    "
                  >
                    Starting Your Project
                  </span>
                </div>

                <h2
                  id="how-your-project-begins-heading"
                  className="
                    mt-4

                    max-w-[720px]

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
                  How Your Project Begins
                  <span className="text-[var(--brand-gold)]">.</span>
                </h2>
              </div>

              <div className="max-w-[520px] lg:justify-self-end">
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
                  You do not need a complete technical brief before contacting
                  Sofa N More.
                </p>

                <p
                  className="
                    mt-3

                    font-brand-sans

                    text-[13px]
                    font-medium
                    leading-[1.7]

                    text-[var(--brand-text-muted)]

                    sm:text-[11px]

                    lg:text-[12px]
                  "
                >
                  A useful first enquiry can begin with a few clear details. The
                  rest can be refined once the project is better understood.
                </p>
              </div>
            </div>

            {/* =================================================
                STEP 01 + 02
            ================================================== */}

            <div
              className="
                relative
                z-10

                mt-7

                grid
                gap-4

                lg:grid-cols-[0.78fr_1.22fr]
                lg:items-stretch

                lg:mt-9
              "
            >
              <StepCard
                number="01"
                icon={Layers3}
                eyebrow="Choose a Starting Point"
                title="Choose the Closest Service"
              >
                <p>
                  Select the service that most closely reflects what you
                  currently need.
                </p>

                <p>
                  It does not have to be a perfect diagnosis. It simply gives
                  the conversation a starting point.
                </p>

                <ServiceLinks />
              </StepCard>

              <StepCard
                number="02"
                icon={Images}
                eyebrow="Share What You Already Have"
                title="Share the Space or Sofa"
              >
                <p>Depending on the project, useful information may include:</p>

                <div
                  className="
                    mt-4

                    grid
                    gap-x-5
                    gap-y-2

                    sm:grid-cols-2

                    xl:grid-cols-3
                  "
                >
                  {usefulDetails.map((item) => (
                    <DetailItem key={item.label} label={item.label} />
                  ))}
                </div>
              </StepCard>
            </div>

            {/* =================================================
                STEP 03
            ================================================== */}

            <div
              className="
                relative
                z-10

                mt-4

                clay-surface-soft

                rounded-[22px]

                p-[5px]
              "
            >
              <div
                className="
                  clay-inset

                  rounded-[18px]

                  px-4
                  py-5

                  sm:px-5
                  sm:py-6
                "
              >
                <div
                  className="
                    grid
                    gap-5

                    lg:grid-cols-[0.72fr_1.28fr]
                    lg:items-start
                    lg:gap-10
                  "
                >
                  {/* LEFT */}

                  <div>
                    <StepHeader
                      number="03"
                      icon={FileText}
                      eyebrow="Turn Information Into a Brief"
                      title="Clarify the Brief"
                    />

                    <p
                      className="
                        mt-4

                        max-w-[520px]

                        font-brand-sans

                        text-[13px]
                        font-medium
                        leading-[1.7]

                        text-[var(--brand-text-muted)]

                        sm:text-[11px]

                        lg:text-[12px]
                      "
                    >
                      The information that matters depends on the type of
                      project. This is where the initial enquiry becomes a
                      clearer working brief.
                    </p>
                  </div>

                  {/* RIGHT */}

                  <div
                    className="
                      grid
                      gap-2.5

                      sm:grid-cols-2
                    "
                  >
                    {briefExamples.map((item) => (
                      <BriefExampleItem key={item.href} item={item} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* =================================================
                STEP 04
            ================================================== */}

            <div
              className="
                relative
                z-10

                mt-4

                rounded-[21px]

                bg-[var(--brand-navy)]

                px-4
                py-5

                sm:px-5
                sm:py-6

                lg:px-6
              "
            >
              <div
                className="
                  grid
                  gap-5

                  lg:grid-cols-[auto_0.72fr_1.28fr]
                  lg:items-center
                  lg:gap-6
                "
              >
                <span
                  className="
                    flex
                    h-11
                    w-11

                    shrink-0

                    items-center
                    justify-center

                    rounded-full

                    bg-[var(--brand-gold)]

                    font-brand-display

                    text-[16px]
                    font-semibold

                    text-[var(--brand-navy)]
                  "
                >
                  04
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
                    Define the Project
                  </span>

                  <h3
                    className="
                      mt-1.5

                      font-brand-display

                      text-[21px]
                      font-semibold
                      leading-[1.2]

                      text-white

                      sm:text-[24px]
                    "
                  >
                    Define the Appropriate Scope
                  </h3>
                </div>

                <div
                  className="
                    font-brand-sans

                    text-[13px]
                    font-medium
                    leading-[1.7]

                    text-white/58

                    sm:text-[11px]

                    lg:text-[12px]
                  "
                >
                  <p>
                    Once the project is understood, the most appropriate scope,
                    decisions and next steps can be discussed.
                  </p>

                  <p className="mt-2.5">
                    Pricing, timescale and delivery requirements should be based
                    on the actual brief rather than one generic promise for
                    every project.
                  </p>
                </div>
              </div>
            </div>

            {/* =================================================
                CLOSING
            ================================================== */}

            <div
              className="
                relative
                z-10

                mt-5

                flex
                items-start
                gap-3

                border-l-2
                border-[var(--brand-gold)]

                pl-4
              "
            >
              <div>
                <span
                  className="
                    font-brand-sans

                    text-[13px]
                    font-bold
                    uppercase

                    tracking-[0.17em]

                    text-[var(--brand-gold-700)]
                  "
                >
                  Start With What You Know
                </span>

                <p
                  className="
                    mt-1.5

                    max-w-[900px]

                    font-brand-display

                    text-[18px]
                    font-semibold
                    leading-[1.4]

                    text-[var(--brand-navy)]

                    sm:text-[21px]
                  "
                >
                  You do not need every answer before making the first enquiry.
                  The purpose of the process is to make the brief clearer.
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
   STEP CARD
========================================================= */

function StepCard({
  number,
  icon,
  eyebrow,
  title,
  children,
}: {
  number: string;
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <article
      className="
        clay-surface-soft

        rounded-[22px]

        p-[5px]
      "
    >
      <div
        className="
          clay-inset

          h-full

          rounded-[18px]

          px-4
          py-5

          sm:px-5
          sm:py-6
        "
      >
        <StepHeader
          number={number}
          icon={icon}
          eyebrow={eyebrow}
          title={title}
        />

        <div
          className="
            mt-4

            space-y-3

            font-brand-sans

            text-[13px]
            font-medium
            leading-[1.7]

            text-[var(--brand-text-muted)]

            sm:text-[11px]

            lg:text-[12px]
          "
        >
          {children}
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   STEP HEADER
========================================================= */

function StepHeader({
  number,
  icon: Icon,
  eyebrow,
  title,
}: {
  number: string;
  icon: LucideIcon;
  eyebrow: string;
  title: string;
}) {
  return (
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

              text-[13px]
              font-bold
              uppercase

              tracking-[0.16em]

              text-[var(--brand-gold-700)]
            "
          >
            {eyebrow}
          </span>

          <h3
            className="
              mt-1.5

              font-brand-display

              text-[20px]
              font-semibold
              leading-[1.2]

              text-[var(--brand-navy)]

              sm:text-[22px]
            "
          >
            {title}
          </h3>
        </div>
      </div>

      <span
        className="
          shrink-0

          font-brand-display

          text-[27px]
          font-semibold
          leading-none

          text-[var(--brand-gold-700)]/30
        "
      >
        {number}
      </span>
    </div>
  );
}

/* =========================================================
   DETAIL ITEM
========================================================= */

function DetailItem({ label }: { label: string }) {
  return (
    <div
      className="
        flex
        items-start
        gap-2.5

        border-b
        border-[var(--brand-navy)]/[0.07]

        pb-2
      "
    >
      <span
        className="
          mt-[1px]

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

          text-[11px]
          font-semibold
          leading-[1.45]

          text-[var(--brand-navy)]

          sm:text-[12px]
        "
      >
        {label}
      </span>
    </div>
  );
}

/* =========================================================
   SERVICE LINKS — STEP 01
========================================================= */

function ServiceLinks() {
  const links = [
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

  return (
    <nav
      aria-label="Choose a Sofa N More service"
      className="
        !mt-5

        grid
        gap-2
      "
    >
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="
            group

            flex
            items-center
            justify-between

            gap-3

            rounded-[13px]

            border
            border-[var(--brand-navy)]/[0.08]

            bg-white/30

            px-3
            py-2.5

            transition-colors
            duration-200

            hover:bg-white/55

            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-[var(--brand-gold)]
          "
        >
          <span
            className="
              font-brand-sans

              text-[11px]
              font-semibold

              text-[var(--brand-navy)]

              sm:text-[12px]
            "
          >
            {link.label}
          </span>

          <span
            aria-hidden
            className="
              text-[var(--brand-gold-700)]

              transition-transform
              duration-200

              group-hover:translate-x-0.5
            "
          >
            →
          </span>
        </Link>
      ))}
    </nav>
  );
}

/* =========================================================
   BRIEF EXAMPLE
========================================================= */

function BriefExampleItem({ item }: { item: BriefExample }) {
  return (
    <article
      className="
        rounded-[16px]

        bg-[var(--brand-gold)]

        px-3.5
        py-3.5

        sm:px-4
        sm:py-4
      "
    >
      <div className="flex items-start gap-3">
        <span
          className="
            mt-[1px]

            flex
            h-6
            w-6

            shrink-0

            items-center
            justify-center

            rounded-full

            bg-[var(--brand-gold)]

            text-[var(--brand-navy)]
          "
        >
          <Sofa size={10} strokeWidth={1.6} />
        </span>

        <div>
          <Link
            href={item.href}
            className="
              font-brand-display

              text-[16px]
              font-semibold
              leading-[1.25]

              text-white

              underline
              decoration-[var(--brand-gold)]/45
              underline-offset-4

              transition-colors
              duration-200

              hover:text-[var(--brand-gold)]

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[var(--brand-gold)]

              sm:text-[17px]
            "
          >
            {item.label}
          </Link>

          <p
            className="
              mt-1.5

              font-brand-sans

              text-[11px]
              font-medium
              leading-[1.6]

              text-white/55

              sm:text-[12px]
            "
          >
            {item.text}
          </p>
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
