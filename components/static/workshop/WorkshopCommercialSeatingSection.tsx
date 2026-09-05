import {
  Building2,
  Camera,
  FileText,
  Hash,
  LayoutGrid,
  Ruler,
  Sofa,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

import ClayButton from "@/components/ui/ClayButton";

/* =========================================================
   TYPES
========================================================= */

type ProjectDetail = {
  label: string;
  description: string;
  icon: LucideIcon;
};

/* =========================================================
   DATA
========================================================= */

const projectDetails: ProjectDetail[] = [
  {
    label: "Floor Plan",
    description: "Bring the available layout or plan for the commercial space.",
    icon: LayoutGrid,
  },
  {
    label: "Venue Photos",
    description:
      "Photographs help us understand the existing environment and context.",
    icon: Camera,
  },
  {
    label: "Dimensions",
    description:
      "Approximate measurements are enough to begin an initial discussion.",
    icon: Ruler,
  },
  {
    label: "Quantities",
    description: "Tell us how much seating the project may require.",
    icon: Hash,
  },
];

/* =========================================================
   ROOT
========================================================= */

export default function WorkshopCommercialSeatingSection() {
  return (
    <section
      aria-labelledby="workshop-commercial-seating-heading"
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
                LEFT — COPY
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
                  <Building2 size={15} strokeWidth={1.5} />
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
                  Commercial Seating · Workshop Consultation
                </span>
              </div>

              {/* H2 */}

              <h2
                id="workshop-commercial-seating-heading"
                className="
                  mt-4

                  max-w-[650px]

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
                Discuss a Commercial Seating Project
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
                Restaurant, café, hotel and office projects often begin with
                plans rather than products.
              </p>

              {/* BODY */}

              <div
                className="
                  mt-4

                  max-w-[660px]

                  space-y-3

                  font-brand-sans

                  text-[13px]
                  font-medium
                  leading-[1.75]

                  text-[var(--brand-text-muted)]

                  sm:text-[11px]

                  lg:text-[12px]
                "
              >
                <p>
                  Bring your floor plan, venue photographs, dimensions,
                  quantities and design references so we can discuss bespoke
                  sofas, booths, banquettes and other upholstered seating for
                  your commercial space.
                </p>

                <p>
                  The workshop consultation can help turn a visual idea into a
                  more practical seating brief.
                </p>
              </div>

              {/* CTA */}

              <div className="mt-6">
                <ClayButton
                  href="/services/commercial-sofas"
                  variant="gold"
                  size="lg"
                  showArrow
                  className="max-sm:w-full"
                  ariaLabel="Explore commercial sofas and contract seating from Sofa N More"
                >
                  Explore Commercial Sofas
                </ClayButton>
              </div>
            </div>

            {/* =================================================
                RIGHT — PROJECT BRIEF
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

                    bg-[var(--brand-gold)]

                    text-[var(--brand-navy)]
                  "
                >
                  <FileText size={15} strokeWidth={1.6} />
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
                    Bring What You Already Know
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
                    A few project details can be enough to start the
                    conversation.
                  </h3>
                </div>
              </div>

              {/* =================================================
                  DETAILS
              ================================================== */}

              <div
                className="
                  mt-5

                  grid
                  gap-2.5

                  sm:grid-cols-2
                "
              >
                {projectDetails.map((detail) => (
                  <ProjectDetailItem key={detail.label} detail={detail} />
                ))}
              </div>

              {/* =================================================
                  RESULT
              ================================================== */}

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
                    <Sofa size={14} strokeWidth={1.6} />
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
                      From Idea to Seating Brief
                    </span>

                    <p
                      className="
                        mt-1

                        max-w-[500px]

                        font-brand-display

                        text-[17px]
                        font-medium
                        leading-[1.4]

                        text-white

                        sm:text-[19px]
                      "
                    >
                      Discuss how sofas, booths, banquettes and other seating
                      should respond to the space and intended use.
                    </p>
                  </div>
                </div>
              </div>

              {/* =================================================
                  COMMERCIAL TYPES
              ================================================== */}

              <div
                className="
                  mt-4

                  flex
                  flex-wrap

                  gap-x-4
                  gap-y-2
                "
              >
                <ProjectType label="Restaurants" />
                <ProjectType label="Cafés" />
                <ProjectType label="Hotels" />
                <ProjectType label="Offices" />
                <ProjectType label="Hospitality" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   PROJECT DETAIL
========================================================= */

function ProjectDetailItem({ detail }: { detail: ProjectDetail }) {
  const Icon = detail.icon;

  return (
    <div
      className="
        rounded-[16px]

        border
        border-[var(--brand-navy)]/[0.06]

        bg-white/35

        px-3.5
        py-3.5
      "
    >
      <div
        className="
          flex
          items-start
          gap-2.5
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

            bg-[var(--brand-navy)]

            text-[var(--brand-gold)]
          "
        >
          <Icon size={11} strokeWidth={1.5} />
        </span>

        <div>
          <strong
            className="
              block

              font-brand-sans

              text-[11px]
              font-bold

              text-[var(--brand-navy)]

              sm:text-[12px]
            "
          >
            {detail.label}
          </strong>

          <p
            className="
              mt-1

              font-brand-sans

              text-[13px]
              font-medium
              leading-[1.5]

              text-[var(--brand-text-muted)]

              sm:text-[11px]
            "
          >
            {detail.description}
          </p>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   PROJECT TYPE
========================================================= */

function ProjectType({ label }: { label: string }) {
  return (
    <span
      className="
        font-brand-sans

        text-[13px]
        font-bold
        uppercase

        tracking-[0.11em]

        text-[var(--brand-text-muted)]

        sm:text-[11px]
      "
    >
      {label}
    </span>
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

          -bottom-[90px]
          -left-[85px]

          hidden

          h-[180px]
          w-[180px]

          rounded-full

          border
          border-[var(--brand-gold)]/10

          lg:block
        "
      />
    </div>
  );
}
