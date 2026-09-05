import { CalendarDays, Car, MessageCircle, Truck } from "lucide-react";

import type { LucideIcon } from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

type WorkshopHighlight = {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

/* =========================================================
   DATA
========================================================= */

const highlights: WorkshopHighlight[] = [
  {
    number: "01",
    title: "Walk-ins & Appointments",
    description:
      "Visit during our customer hours or arrange a dedicated time for a detailed project discussion.",
    icon: CalendarDays,
  },
  {
    number: "02",
    title: "Free Consultation",
    description:
      "Discuss your sofa, seating or interior project without a consultation charge.",
    icon: MessageCircle,
  },
  {
    number: "03",
    title: "On-Site Parking",
    description:
      "Parking is available at Atlas Business Centre for workshop visitors.",
    icon: Car,
  },
  {
    number: "04",
    title: "Repair Drop-Off & Collection",
    description:
      "Bring suitable sofas and upholstered pieces to the workshop or ask about our collection service.",
    icon: Truck,
  },
];

/* =========================================================
   ROOT
========================================================= */

export default function WorkshopHighlightsSection() {
  return (
    <section
      aria-labelledby="workshop-highlights-heading"
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

            rounded-[26px]

            px-4
            py-5

            sm:rounded-[30px]
            sm:px-6
            sm:py-6

            lg:rounded-[34px]
            lg:px-8
            lg:py-7
          "
        >
          {/* =================================================
              HEADER
          ================================================== */}

          <div
            className="
              flex
              flex-col
              gap-2

              sm:flex-row
              sm:items-end
              sm:justify-between
              sm:gap-8
            "
          >
            <div>
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
                Visiting Sofa N More
              </span>

              <h2
                id="workshop-highlights-heading"
                className="
                  mt-2

                  font-brand-display

                  text-[30px]
                  font-semibold
                  leading-[1]

                  tracking-[-0.035em]

                  text-[var(--brand-navy)]

                  sm:text-[36px]

                  lg:text-[40px]
                "
              >
                Workshop Highlights
                <span className="text-[var(--brand-gold)]">.</span>
              </h2>
            </div>

            <p
              className="
                max-w-[430px]

                font-brand-sans

                text-[12px]
                font-medium
                leading-[1.65]

                text-[var(--brand-text-muted)]

                sm:text-right
                sm:text-[13px]
              "
            >
              A practical place to discuss your project, compare options and
              understand the most appropriate next step.
            </p>
          </div>

          {/* =================================================
              HIGHLIGHTS
          ================================================== */}

          <div
            className="
              mt-5

              grid
              gap-2.5

              sm:grid-cols-2

              lg:grid-cols-4
              lg:gap-3
            "
          >
            {highlights.map((item) => (
              <HighlightCard key={item.number} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   HIGHLIGHT CARD
========================================================= */

function HighlightCard({ item }: { item: WorkshopHighlight }) {
  const Icon = item.icon;

  return (
    <article
      className="
        group

        relative
        overflow-hidden

        rounded-[18px]

        border
        border-white/60

        bg-[#FFFDF8]/70

        px-4
        py-4

        shadow-[0_7px_18px_rgba(79,57,32,0.06)]

        transition-transform
        duration-200

        hover:-translate-y-[1px]

        sm:rounded-[20px]
        sm:px-5
        sm:py-5
      "
    >
      {/* subtle top highlight */}

      <div
        aria-hidden
        className="
          pointer-events-none

          absolute
          inset-x-4
          top-0

          h-px

          bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.9),transparent)]
        "
      />

      {/* TOP */}

      <div
        className="
          flex
          items-start
          justify-between

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

            bg-[var(--brand-navy)]

            text-[var(--brand-gold)]
          "
        >
          <Icon size={14} strokeWidth={1.5} />
        </span>

        <span
          className="
            font-brand-display

            text-[22px]
            font-semibold
            leading-none

            text-[var(--brand-gold-700)]/25
          "
        >
          {item.number}
        </span>
      </div>

      {/* COPY */}

      <h3
        className="
          mt-4

          font-brand-display

          text-[19px]
          font-semibold
          leading-[1.15]

          text-[var(--brand-navy)]

          sm:text-[20px]
        "
      >
        {item.title}
      </h3>

      <p
        className="
          mt-2.5

          font-brand-sans

          text-[12px]
          font-medium
          leading-[1.65]

          text-[var(--brand-text-muted)]

          sm:text-[13px]
        "
      >
        {item.description}
      </p>

      {/* QUIET GOLD DETAIL */}

      <div
        aria-hidden
        className="
          mt-4

          h-[2px]
          w-7

          rounded-full

          bg-[var(--brand-gold)]

          opacity-70

          transition-[width]
          duration-200

          group-hover:w-10
        "
      />
    </article>
  );
}
