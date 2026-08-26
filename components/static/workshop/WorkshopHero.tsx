import Link from "next/link";
import Image from "next/image";

import {
  CalendarDays,
  Car,
  Clock3,
  Hammer,
  MapPin,
  MoveUpRight,
  Sparkles,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

import ClayButton from "@/components/ui/ClayButton";

/* =========================================================
   CONFIG
========================================================= */

const GOOGLE_MAPS_DIRECTIONS_URL =
  "https://www.google.com/maps/place/Sofa+N+More/@51.5683486,-0.2356159,17z/data=!3m1!4b1!4m6!3m5!1s0x4876111726173097:0x9b06efce5680b451!8m2!3d51.5683486!4d-0.233041!16s%2Fg%2F11vr7trx_f?entry=ttu&g_ep=EgoyMDI2MDgxMi4wIKXMDSoASAFQAw%3D%3D";

/* =========================================================
   TYPES
========================================================= */

type WorkshopServiceLink = {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
};

type WorkshopFact = {
  label: string;
  value: string;
  icon: LucideIcon;
};

/* =========================================================
   DATA
========================================================= */

const workshopFacts: WorkshopFact[] = [
  {
    label: "Workshop Hours",
    value: "8:00 AM – 6:00 PM",
    icon: Clock3,
  },
  {
    label: "Visits",
    value: "Walk-ins Welcome",
    icon: CalendarDays,
  },
  {
    label: "Consultation",
    value: "Free of Charge",
    icon: Sparkles,
  },
  {
    label: "Access",
    value: "Customer Parking",
    icon: Car,
  },
];

/* =========================================================
   ROOT
========================================================= */

export default function WorkshopHero() {
  return (
    <section
      aria-labelledby="workshop-hero-heading"
      className="
        relative
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

              bg-[linear-gradient(135deg,#FFFDF8_0%,#F7F1E8_57%,#EEE3D5_100%)]

              px-5
              py-6

              sm:rounded-[29px]
              sm:px-7
              sm:py-8

              lg:rounded-[34px]
              lg:px-10
              lg:py-10

              xl:px-12
              xl:py-11
            "
          >
            <QuietClayDecoration />

            {/* =================================================
                MAIN GRID
            ================================================== */}

            <div
              className="
                relative
                z-10

                grid
                gap-8

                lg:grid-cols-[1.04fr_0.96fr]
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

                <div
                  className="
                    flex
                    items-center
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
                    <Hammer size={15} strokeWidth={1.5} />
                  </span>

                  <div>
                    <span
                      className="
                        block

                        font-brand-sans

                        text-[7px]
                        font-bold
                        uppercase

                        tracking-[0.21em]

                        text-[var(--brand-gold-700)]

                        sm:text-[8px]
                      "
                    >
                      Sofa N More · London NW2
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
                      Cricklewood · Staples Corner · North West London
                    </span>
                  </div>
                </div>

                {/* H1 */}

                <h1
                  id="workshop-hero-heading"
                  className="
                    mt-6

                    max-w-[820px]

                    font-brand-display

                    text-[39px]
                    font-semibold
                    leading-[0.98]

                    tracking-[-0.04em]

                    text-[var(--brand-navy)]

                    min-[390px]:text-[43px]

                    sm:text-[52px]

                    lg:text-[clamp(50px,4.35vw,68px)]
                  "
                >
                  Our Working Sofa & Upholstery Workshop in North West London
                  <span className="text-[var(--brand-gold)]">.</span>
                </h1>

                {/* LEAD */}

                <p
                  className="
                    mt-6

                    max-w-[700px]

                    font-brand-display

                    text-[19px]
                    font-medium
                    italic
                    leading-[1.42]

                    text-[var(--brand-navy)]

                    sm:text-[22px]
                  "
                >
                  A real London workshop where bespoke sofas are discussed,
                  ordered, made and restored.
                </p>

                {/* BODY */}

                <div
                  className="
                    mt-5

                    max-w-[720px]

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
                    Visit Sofa N More near Cricklewood and Staples Corner to
                    explore our full catalogue collection, compare upholstery
                    fabrics, discuss a made-to-measure sofa, plan a commercial
                    seating project or bring an existing sofa for repair and
                    restoration.
                  </p>

                  <p>
                    Walk-ins are welcome, appointments are available and
                    workshop consultations are free.
                  </p>
                </div>

                {/* VISIT NOTE */}

                <div
                  className="
                    mt-6

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
                    Planning a Detailed Visit?
                  </span>

                  <p
                    className="
                      mt-1.5

                      max-w-[640px]

                      font-brand-display

                      text-[19px]
                      font-semibold
                      leading-[1.35]

                      text-[var(--brand-navy)]

                      sm:text-[21px]
                    "
                  >
                    For large sofa drop-offs or detailed project consultations,
                    contact us before travelling so we can prepare for your
                    visit.
                  </p>
                </div>

                {/* =================================================
                    PRIMARY ACTIONS
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
                    ariaLabel="Plan a free visit to the Sofa N More workshop"
                  >
                    Plan Your Free Workshop Visit
                  </ClayButton>

                  <ClayButton
                    href={GOOGLE_MAPS_DIRECTIONS_URL}
                    variant="navy"
                    target="_blank"
                    size="lg"
                    startIcon={<MapPin size={16} strokeWidth={1.6} />}
                    className="max-sm:w-full"
                    ariaLabel="Get directions to the Sofa N More workshop"
                  >
                    Get Directions
                  </ClayButton>
                </div>
              </div>

              {/* =================================================
                  RIGHT — WORKSHOP PANEL
              ================================================== */}

              <WorkshopVisitPanel />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   WORKSHOP VISIT PANEL
========================================================= */

function WorkshopVisitPanel() {
  return (
    <aside
      aria-label="Workshop visit information"
      className="
        mx-auto

        w-full
        max-w-[660px]

        clay-surface-soft

        rounded-[26px]

        p-[5px]

        sm:rounded-[30px]
        sm:p-[6px]
      "
    >
      <div
        className="
          rounded-[21px]

          bg-[#FFFDF8]/70

          px-4
          py-5

          sm:rounded-[24px]
          sm:px-6
          sm:py-6
        "
      >
        <div
          className="
            mb-5
            overflow-hidden
            rounded-[20px]
            border
            border-white/65
            bg-[#E9E0D4]
            p-[4px]
            shadow-[0_10px_24px_rgba(79,57,32,0.08)]
          "
        >
          <div
            className="
              relative
              aspect-[4/3]
              overflow-hidden
              rounded-[16px]
              sm:aspect-[16/10]
            "
          >
            <Image
              src="/assets/site/30.webp"
              alt="Sofa N More working sofa and upholstery workshop in North West London"
              fill
              preload
              sizes="(max-width: 1023px) 100vw, 42vw"
              className="object-cover object-top"
            />

            <div
              aria-hidden
              className="
                absolute
                inset-0
                bg-[linear-gradient(180deg,rgba(18,37,62,0.02)_0%,rgba(18,37,62,0.08)_48%,rgba(18,37,62,0.56)_100%)]
              "
            />

          
          </div>
        </div>

        {/* =====================================================
            ADDRESS
        ====================================================== */}

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
              Visit Our Working Workshop
            </span>

            <address
              className="
                mt-1.5

                not-italic
              "
            >
              <strong
                className="
                  block

                  font-brand-display

                  text-[23px]
                  font-semibold
                  leading-[1.2]

                  text-[var(--brand-navy)]

                  sm:text-[26px]
                "
              >
                Sofa N More
              </strong>

              <p
                className="
                  mt-2

                  font-brand-sans

                  text-[10px]
                  font-medium
                  leading-[1.65]

                  text-[var(--brand-text-muted)]

                  sm:text-[11px]
                "
              >
                Unit G19, Atlas Business Centre
                <br />
                Oxgate Lane, Staples Corner West
                <br />
                London NW2 7HJ
              </p>
            </address>
          </div>
        </div>

        {/* =====================================================
            QUICK FACTS
        ====================================================== */}

        <div
          className="
            mt-5

            grid
            grid-cols-2
            gap-2
          "
        >
          {workshopFacts.map(({ label, value, icon: Icon }) => (
            <WorkshopFactItem
              key={label}
              label={label}
              value={value}
              icon={Icon}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}

/* =========================================================
   WORKSHOP FACT
========================================================= */

function WorkshopFactItem({ label, value, icon: Icon }: WorkshopFact) {
  return (
    <div
      className="
        clay-surface-soft

        rounded-[15px]

        px-3
        py-3
      "
    >
      <Icon
        size={13}
        strokeWidth={1.5}
        className="
          text-[var(--brand-gold-700)]
        "
      />

      <span
        className="
          mt-2
          block

          font-brand-sans

          text-[6px]
          font-bold
          uppercase

          tracking-[0.13em]

          text-[var(--brand-text-muted)]
        "
      >
        {label}
      </span>

      <strong
        className="
          mt-1
          block

          font-brand-sans

          text-[8px]
          font-semibold
          leading-[1.35]

          text-[var(--brand-navy)]

          sm:text-[9px]
        "
      >
        {value}
      </strong>
    </div>
  );
}

/* =========================================================
   WORKSHOP SERVICE LINK
========================================================= */

function WorkshopServiceRow({ service }: { service: WorkshopServiceLink }) {
  const Icon = service.icon;

  return (
    <Link
      href={service.href}
      aria-label={`Explore ${service.title}`}
      className="
        group

        flex
        items-center
        gap-3

        rounded-[15px]

        border
        border-[var(--brand-navy)]/[0.07]

        bg-white/35

        px-3
        py-3

        transition-colors
        duration-200

        hover:bg-white/60

        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-[var(--brand-gold)]
        focus-visible:ring-offset-2
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

          bg-[var(--brand-navy)]

          text-[var(--brand-gold)]
        "
      >
        <Icon size={13} strokeWidth={1.5} />
      </span>

      <div className="min-w-0 flex-1">
        <strong
          className="
            block

            font-brand-display

            text-[15px]
            font-semibold
            leading-[1.2]

            text-[var(--brand-navy)]

            sm:text-[16px]
          "
        >
          {service.title}
        </strong>

        <p
          className="
            mt-1

            font-brand-sans

            text-[8px]
            font-medium
            leading-[1.5]

            text-[var(--brand-text-muted)]

            sm:text-[9px]
          "
        >
          {service.description}
        </p>
      </div>

      <MoveUpRight
        size={13}
        strokeWidth={1.6}
        className="
          shrink-0

          text-[var(--brand-gold-700)]

          transition-transform
          duration-200

          group-hover:-translate-y-0.5
          group-hover:translate-x-0.5
        "
      />
    </Link>
  );
}

/* =========================================================
   QUIET CLAY DECORATION
========================================================= */

function QuietClayDecoration() {
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

          -right-[80px]
          -top-[95px]

          hidden

          h-[210px]
          w-[210px]

          rounded-full

          border
          border-[var(--brand-gold)]/12

          lg:block
        "
      />

      <div
        className="
          clay-surface-soft

          absolute

          right-[5%]
          top-[7%]

          hidden

          h-14
          w-14

          rounded-full

          opacity-45

          lg:block
        "
      />

      <div
        className="
          absolute

          bottom-0
          left-[8%]

          hidden

          h-px
          w-[180px]

          bg-[linear-gradient(90deg,transparent,var(--brand-gold),transparent)]

          opacity-20

          lg:block
        "
      />
    </div>
  );
}
