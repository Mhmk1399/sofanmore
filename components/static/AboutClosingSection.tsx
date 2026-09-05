import Link from "next/link";

import {
  ArrowUpRight,
  Armchair,
  Building2,
  Crown,
  Hammer,
  Layers3,
  MapPin,
} from "lucide-react";

import ClayButton from "@/components/ui/ClayButton";

/* =========================================================
   DATA
========================================================= */

const services = [
  {
    title: "Bespoke sofa",
    description:
      "Made-to-measure sofas, chairs and sofa handcrafted around your space, style and requirements.",
    href: "/services/bespoke-sofas",
    icon: Armchair,
  },
  {
    title: "Interior Design",
    description:
      "Tailored residential and commercial interiors combining thoughtful design with lasting craftsmanship.",
    href: "/services/interior-design",
    icon: Layers3,
  },
  {
    title: "Repair & Restoration",
    description:
      "Expert sofa restoration and reupholstery designed to preserve character and extend the life of treasured pieces.",
    href: "/services/sofa-repair-restoration",
    icon: Hammer,
  },
  {
    title: "Commercial sofa",
    description:
      "Bespoke sofa solutions for offices, hospitality spaces and distinctive commercial interiors.",
    href: "/services/commercial-sofas",
    icon: Building2,
  },
];

/* =========================================================
   ROOT
========================================================= */

export default function AboutClosingSection() {
  return (
    <section
      aria-labelledby="about-closing-heading"
      className="
        relative
        overflow-hidden
        bg-[var(--brand-ivory)]
        px-3
        pb-12
        pt-8

        sm:px-5
        sm:pb-14

        lg:px-8
        lg:pb-20
        lg:pt-12
      "
    >
      <BackgroundDecor />

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-[var(--site-width)]
        "
      >
        <div
          className="
            clay-surface-strong
            rounded-[34px]
            p-[7px]

            sm:rounded-[40px]

            lg:rounded-[48px]
            lg:p-[9px]
          "
        >
          <div
            className="
              clay-inset
              relative
              overflow-hidden
              rounded-[28px]

              sm:rounded-[34px]

              lg:rounded-[40px]
            "
          >
            {/* =================================================
                DESKTOP
            ================================================== */}

            <div
              className="
                hidden
                min-h-[600px]
                grid-cols-[0.9fr_1.1fr]

                lg:grid
              "
            >
              <DesktopStoryPanel />

              <DesktopServices />
            </div>

            {/* =================================================
                MOBILE
            ================================================== */}

            <div className="lg:hidden">
              <MobileLayout />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   DESKTOP STORY PANEL
========================================================= */

function DesktopStoryPanel() {
  return (
    <div
      className="
        clay-dark
        relative
        flex
        min-h-[600px]
        flex-col
        overflow-hidden
        rounded-[34px]
        px-9
        pb-9
        pt-9

        xl:px-12
        xl:pb-11
        xl:pt-11
      "
    >
      {/* subtle architectural rings */}

      <div
        aria-hidden
        className="
          pointer-events-none
          absolute
          -right-[160px]
          top-[70px]
          h-[430px]
          w-[430px]
          rounded-full
          border
          border-[var(--brand-gold)]/14
        "
      />

      <div
        aria-hidden
        className="
          pointer-events-none
          absolute
          -right-[100px]
          top-[130px]
          h-[310px]
          w-[310px]
          rounded-full
          border
          border-white/[0.06]
        "
      />

      {/* brand */}

      <div className="relative z-10">
        <div
          className="
            flex
            items-center
            gap-2
            text-[var(--brand-gold)]
          "
        >
          <Crown size={17} strokeWidth={1.5} />

          <span
            className="
              font-brand-display
              text-[20px]
              tracking-[0.16em]
            "
          >
            SNM
          </span>
        </div>

        <p
          className="
            mt-1
            font-brand-sans
            text-[13px]
            font-bold
            uppercase
            tracking-[0.25em]
            text-white/50
          "
        >
          Sofa N More · London
        </p>
      </div>

      {/* copy */}

      <div
        className="
          relative
          z-10
          my-auto
          max-w-[540px]
          py-12
        "
      >
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
              w-8
              bg-[var(--brand-gold)]
            "
          />

          <span
            className="
              font-brand-sans
              text-[12px]
              font-bold
              uppercase
              tracking-[0.25em]
              text-[var(--brand-gold)]
            "
          >
            Crafted in London
          </span>
        </div>

        <h2
          id="about-closing-heading"
          className="
            mt-6
            max-w-[520px]
            font-brand-display
            text-[clamp(43px,3.6vw,61px)]
            font-medium
            leading-[0.98]
            tracking-[-0.04em]
            text-[#FFFDF8]
          "
        >
          Bespoke sofa
          <br />
          for Exceptional
          <br />
          Spaces
          <span
            className="
              text-[var(--brand-gold)]
            "
          >
            .
          </span>
        </h2>

        <p
          className="
            mt-6
            max-w-[475px]
            font-brand-sans
            text-[13px]
            font-medium
            leading-[1.8]
            text-white/68

            xl:text-[14px]
          "
        >
          From bespoke sofas and handcrafted sofa to complete interior
          design, commercial sofa and specialist restoration, Sofa N More
          brings London craftsmanship to spaces created around the people who
          use them.
        </p>

        {/* location */}

        <div
          className="
            mt-7
            flex
            items-center
            gap-3
          "
        >
          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              border
              border-[var(--brand-gold)]/25
              bg-white/[0.04]
            "
          >
            <MapPin
              size={16}
              strokeWidth={1.6}
              className="
                text-[var(--brand-gold)]
              "
            />
          </div>

          <div>
            <div
              className="
                font-brand-sans
                text-[12px]
                font-bold
                uppercase
                tracking-[0.15em]
                text-white
              "
            >
              London sofa Studio
            </div>

            <div
              className="
                mt-1
                font-brand-sans
                text-[11px]
                text-white/45
              "
            >
              Bespoke · Interiors · Restoration
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}

      <div
        className="
          relative
          z-10
          flex
          items-center
          gap-5
        "
      >
        <ClayButton href="/contact-us" variant="gold" size="lg" showArrow>
          Start Your Project
        </ClayButton>

        <Link
          href="/gallery"
          className="
            group
            inline-flex
            items-center
            gap-2
            font-brand-sans
            text-[12px]
            font-bold
            uppercase
            tracking-[0.14em]
            text-white/70
            transition-colors
            hover:text-white
          "
        >
          View Our Work
          <ArrowUpRight
            size={13}
            strokeWidth={1.6}
            className="
              text-[var(--brand-gold)]
              transition-transform
              duration-300
              group-hover:-translate-y-0.5
              group-hover:translate-x-0.5
            "
          />
        </Link>
      </div>
    </div>
  );
}

/* =========================================================
   DESKTOP SERVICES
========================================================= */

function DesktopServices() {
  return (
    <div
      className="
        relative
        flex
        flex-col
        px-7
        py-8

        xl:px-9
        xl:py-10
      "
    >
      {/* top label */}

      <div
        className="
          flex
          items-end
          justify-between
          gap-6
        "
      >
        <div>
          <p
            className="
              font-brand-sans
              text-[11px]
              font-bold
              uppercase
              tracking-[0.24em]
              text-[var(--brand-gold-700)]
            "
          >
            Explore Sofa N More
          </p>

          <h3
            className="
              mt-2
              font-brand-display
              text-[29px]
              font-semibold
              leading-[1]
              tracking-[-0.025em]
              text-[var(--brand-navy)]
            "
          >
            What We Create.
          </h3>
        </div>

        <span
          className="
            font-brand-sans
            text-[11px]
            font-bold
            uppercase
            tracking-[0.17em]
            text-[var(--brand-text-muted)]
          "
        >
          London · UK
        </span>
      </div>

      {/* SEO / INTERNAL LINKS */}

      <nav
        aria-label="Sofa N More services"
        className="
          mt-7
          grid
          flex-1
          grid-cols-2
          gap-4
        "
      >
        {services.map((service, index) => (
          <ServiceCard key={service.title} service={service} index={index} />
        ))}
      </nav>
    </div>
  );
}

/* =========================================================
   SERVICE CARD
========================================================= */

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[number];
  index: number;
}) {
  const Icon = service.icon;

  return (
    <Link
      href={service.href}
      className="
        clay-surface-soft
        group
        relative
        flex
        min-h-[205px]
        flex-col
        overflow-hidden
        rounded-[27px]
        p-[6px]
        transition-transform
        duration-500
        ease-[cubic-bezier(0.22,1,0.36,1)]
        hover:-translate-y-1
      "
    >
      <div
        className="
          clay-inset
          relative
          flex
          h-full
          flex-1
          flex-col
          rounded-[21px]
          px-5
          py-5
        "
      >
        {/* number */}

        <span
          className="
            absolute
            right-4
            top-4
            font-brand-display
            text-[13px]
            text-[var(--brand-gold-700)]/45
          "
        >
          0{index + 1}
        </span>

        {/* icon */}

        <div
          className="
            clay-surface-strong
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-full
          "
        >
          <Icon
            size={20}
            strokeWidth={1.5}
            className="
              text-[var(--brand-gold-700)]
            "
          />
        </div>

        {/* title */}

        <h4
          className="
            mt-5
            font-brand-display
            text-[21px]
            font-semibold
            leading-[1.05]
            tracking-[-0.02em]
            text-[var(--brand-navy)]
          "
        >
          {service.title}
        </h4>

        {/* description */}

        <p
          className="
            mt-3
            font-brand-sans
            text-[13px]
            font-medium
            leading-[1.6]
            text-[var(--brand-text-muted)]
          "
        >
          {service.description}
        </p>

        {/* arrow */}

        <div
          className="
            mt-auto
            flex
            items-center
            justify-between
            pt-5
          "
        >
          <span
            className="
              font-brand-sans
              text-[11px]
              font-bold
              uppercase
              tracking-[0.15em]
              text-[var(--brand-navy)]
            "
          >
            Explore Service
          </span>

          <span
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              bg-[var(--brand-navy)]
              text-[var(--brand-gold)]
              transition-transform
              duration-500
              group-hover:rotate-[-8deg]
              group-hover:scale-105
            "
          >
            <ArrowUpRight size={14} strokeWidth={1.6} />
          </span>
        </div>
      </div>
    </Link>
  );
}

/* =========================================================
   MOBILE
========================================================= */

function MobileLayout() {
  return (
    <div>
      {/* NAVY MAIN */}

      <div
        className="
          clay-dark
          relative
          overflow-hidden
          rounded-[25px]
          px-5
          pb-7
          pt-7
        "
      >
        <div
          aria-hidden
          className="
            absolute
            -right-[120px]
            top-[110px]
            h-[290px]
            w-[290px]
            rounded-full
            border
            border-[var(--brand-gold)]/12
          "
        />

        <div
          className="
            relative
            z-10
          "
        >
          <div
            className="
              flex
              items-center
              gap-2
              text-[var(--brand-gold)]
            "
          >
            <Crown size={14} strokeWidth={1.5} />

            <span
              className="
                font-brand-display
                text-[16px]
                tracking-[0.16em]
              "
            >
              SNM
            </span>
          </div>

          <p
            className="
              mt-8
              font-brand-sans
              text-[11px]
              font-bold
              uppercase
              tracking-[0.24em]
              text-[var(--brand-gold)]
            "
          >
            Crafted in London
          </p>

          <h2
            id="about-closing-heading"
            className="
              mt-4
              font-brand-display
              text-[39px]
              font-medium
              leading-[0.97]
              tracking-[-0.04em]
              text-white

              min-[390px]:text-[43px]
            "
          >
            Bespoke sofa
            <br />
            for Exceptional
            <br />
            Spaces
            <span
              className="
                text-[var(--brand-gold)]
              "
            >
              .
            </span>
          </h2>

          <div
            className="
              mt-5
              h-[2px]
              w-11
              bg-[var(--brand-gold)]
            "
          />

          <p
            className="
              mt-5
              font-brand-sans
              text-[11px]
              font-medium
              leading-[1.7]
              text-white/68
            "
          >
            From bespoke sofas and handcrafted sofa to interior design,
            commercial sofa and specialist restoration, Sofa N More brings
            London craftsmanship to spaces designed around you.
          </p>

          {/* location */}

          <div
            className="
              mt-6
              flex
              items-center
              gap-3
            "
          >
            <div
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-full
                border
                border-[var(--brand-gold)]/25
              "
            >
              <MapPin
                size={14}
                className="
                  text-[var(--brand-gold)]
                "
              />
            </div>

            <span
              className="
                font-brand-sans
                text-[11px]
                font-bold
                uppercase
                tracking-[0.13em]
                text-white/75
              "
            >
              Bespoke sofa Studio · London
            </span>
          </div>

          <div className="mt-7">
            <ClayButton
              href="/contact-us"
              variant="gold"
              size="lg"
              fullWidth
              showArrow
            >
              Start Your Project
            </ClayButton>
          </div>
        </div>
      </div>

      {/* SERVICES */}

      <div
        className="
          px-3
          pb-4
          pt-7
        "
      >
        <p
          className="
            font-brand-sans
            text-[11px]
            font-bold
            uppercase
            tracking-[0.22em]
            text-[var(--brand-gold-700)]
          "
        >
          Explore Sofa N More
        </p>

        <h3
          className="
            mt-2
            font-brand-display
            text-[27px]
            font-semibold
            text-[var(--brand-navy)]
          "
        >
          What We Create.
        </h3>

        <nav
          aria-label="Sofa N More services"
          className="
            mt-5
            space-y-3
          "
        >
          {services.map((service, index) => (
            <MobileServiceRow
              key={service.title}
              service={service}
              index={index}
            />
          ))}
        </nav>

        <Link
          href="/gallery"
          className="
            mt-6
            flex
            items-center
            justify-center
            gap-2
            font-brand-sans
            text-[12px]
            font-bold
            uppercase
            tracking-[0.14em]
            text-[var(--brand-navy)]
          "
        >
          Explore Our London Projects
          <ArrowUpRight
            size={13}
            className="
              text-[var(--brand-gold-700)]
            "
          />
        </Link>
      </div>
    </div>
  );
}

/* =========================================================
   MOBILE SERVICE
========================================================= */

function MobileServiceRow({
  service,
  index,
}: {
  service: (typeof services)[number];
  index: number;
}) {
  const Icon = service.icon;

  return (
    <Link
      href={service.href}
      className="
        clay-surface-soft
        group
        block
        rounded-[21px]
        p-[5px]
      "
    >
      <div
        className="
          clay-inset
          flex
          items-center
          gap-3
          rounded-[17px]
          px-3
          py-3
        "
      >
        <div
          className="
            clay-surface-strong
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-full
          "
        >
          <Icon
            size={18}
            strokeWidth={1.5}
            className="
              text-[var(--brand-gold-700)]
            "
          />
        </div>

        <div
          className="
            min-w-0
            flex-1
          "
        >
          <div
            className="
              flex
              items-center
              justify-between
              gap-3
            "
          >
            <h4
              className="
                font-brand-display
                text-[18px]
                font-semibold
                leading-none
                text-[var(--brand-navy)]
              "
            >
              {service.title}
            </h4>

            <span
              className="
                font-brand-display
                text-[13px]
                text-[var(--brand-gold-700)]/50
              "
            >
              0{index + 1}
            </span>
          </div>

          <p
            className="
              mt-2
              line-clamp-2
              font-brand-sans
              text-[11px]
              leading-[1.5]
              text-[var(--brand-text-muted)]
            "
          >
            {service.description}
          </p>
        </div>

        <ArrowUpRight
          size={15}
          strokeWidth={1.6}
          className="
            shrink-0
            text-[var(--brand-gold-700)]
          "
        />
      </div>
    </Link>
  );
}

/* =========================================================
   BACKGROUND
========================================================= */

function BackgroundDecor() {
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
          inset-0
          bg-[linear-gradient(180deg,#F5F2EA_0%,#FFFDF8_52%,#EFE5D7_100%)]
        "
      />

      {/* large arch */}

      <div
        className="
          clay-surface-soft
          absolute
          -bottom-[170px]
          right-[4%]
          hidden
          h-[390px]
          w-[320px]
          rounded-t-[50%]
          p-[9px]
          opacity-55

          lg:block
        "
      >
        <div
          className="
            clay-inset
            h-full
            rounded-t-[50%]
          "
        />
      </div>

      {/* ivory sphere */}

      <div
        className="
          clay-sphere
          absolute
          -left-8
          bottom-[60px]
          hidden
          h-[125px]
          w-[125px]

          lg:block
        "
      >
        <div className="clay-sphere-shadow" />
        <div className="clay-sphere-ball" />
      </div>

      {/* gold sphere */}

      <div
        className="
          clay-sphere
          absolute
          bottom-[52px]
          right-[8%]
          hidden
          h-[24px]
          w-[24px]

          lg:block
        "
      >
        <div className="clay-sphere-ball clay-sphere-ball--gold" />
      </div>
    </div>
  );
}
