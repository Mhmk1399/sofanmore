import {
  BriefcaseBusiness,
  Building2,
  Coffee,
  Home,
  Hotel,
  LayoutGrid,
  Sofa,
  Sparkles,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

type CommercialService = {
  title: string;
  eyebrow: string;
  icon: LucideIcon;
  paragraphs: string[];
};

/* =========================================================
   DATA
========================================================= */

const commercialServices: CommercialService[] = [
  {
    eyebrow: "Food & Hospitality",
    title: "Restaurant & Café Interior Design",
    icon: Coffee,
    paragraphs: [
      "A memorable restaurant is experienced before the first plate arrives.",

      "Layout, seating, lighting, materials, colour and atmosphere all contribute to how guests perceive the venue.",

      "We can help bring those elements together into a cohesive restaurant or café interior that reflects the character of the business.",

      "Bespoke sofas, banquette seating and booth seating can also be developed around the layout, helping the seating become part of the interior architecture rather than an addition made at the end.",
    ],
  },

  {
    eyebrow: "Guest Experience",
    title: "Hotel & Hospitality Interiors",
    icon: Hotel,
    paragraphs: [
      "Hospitality interiors should create an immediate sense of place.",

      "From lobby and lounge environments to bars and guest-facing spaces, the design should communicate a clear atmosphere while remaining comfortable and welcoming.",

      "Bespoke sofas, material palettes, textures and spatial composition can be developed as part of the wider interior concept.",
    ],
  },

  {
    eyebrow: "Workplace",
    title: "Office & Workspace Interior Design",
    icon: BriefcaseBusiness,
    paragraphs: [
      "An effective workspace needs more than desks and meeting rooms.",

      "Reception spaces, breakout areas, collaborative zones and informal meeting areas all contribute to how a workplace feels and functions.",

      "Our approach considers both the visual identity of the space and how people need to use it throughout the day.",
    ],
  },
];

/* =========================================================
   ROOT
========================================================= */

export default function InteriorDesignServicesSection({
  residentialId = "residential",
}: {
  residentialId?: string;
}) {
  return (
    <section
      aria-labelledby="interior-design-services-heading"
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
      <div
        className="
          mx-auto
          max-w-[var(--site-width)]
        "
      >
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
            {/* =================================================
                HEADER
            ================================================== */}

            <div
              className="
                grid
                gap-5

                lg:grid-cols-[1fr_0.76fr]
                lg:items-end
                lg:gap-12
              "
            >
              <div>
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
                      w-9

                      bg-[var(--brand-gold)]
                    "
                  />

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
                    Interior Design Services
                  </span>
                </div>

                <h2
                  id="interior-design-services-heading"
                  className="
                    mt-4

                    max-w-[730px]

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
                  Interior Design Services for London Spaces
                  <span className="text-[var(--brand-gold)]">.</span>
                </h2>
              </div>

              <div
                className="
                  max-w-[520px]

                  lg:justify-self-end
                "
              >
                <p
                  className="
                    font-brand-display

                    text-[18px]
                    font-medium
                    italic
                    leading-[1.4]

                    text-[var(--brand-navy)]

                    sm:text-[20px]
                  "
                >
                  Every project has a different starting point.
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
                  Your project might involve one important room or a more
                  complete transformation. Our interior design service can help
                  shape the direction of the space from the initial concept
                  onwards.
                </p>
              </div>
            </div>

            {/* =================================================
                MAIN SERVICE MAP
            ================================================== */}

            <div
              className="
                mt-7

                grid
                gap-4

                lg:mt-8
                lg:grid-cols-[0.82fr_1.18fr]
                lg:gap-5
              "
            >
              <ResidentialPanel id={residentialId} />

              <CommercialPanel />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   RESIDENTIAL
========================================================= */

function ResidentialPanel({ id }: { id: string }) {
  return (
    <article
      id={id}
      className="
        clay-surface-soft
        scroll-mt-24

        rounded-[23px]

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

          lg:px-6
          lg:py-7
        "
      >
        {/* =====================================================
            HEADER
        ====================================================== */}

        <div
          className="
            flex
            items-start

            gap-4
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

              bg-[var(--brand-navy)]

              text-[var(--brand-gold)]
            "
          >
            <Home size={17} strokeWidth={1.5} />
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
              Residential
            </span>

            <h3
              className="
                mt-1.5

                font-brand-display

                text-[24px]
                font-semibold
                leading-[1.1]

                tracking-[-0.025em]

                text-[var(--brand-navy)]

                sm:text-[27px]
              "
            >
              Residential Interior Design
            </h3>
          </div>
        </div>

        {/* =====================================================
            LEAD
        ====================================================== */}

        <p
          className="
            mt-5

            font-brand-display

            text-[18px]
            font-medium
            italic
            leading-[1.4]

            text-[var(--brand-navy)]

            sm:text-[19px]
          "
        >
          A home should reflect the people living inside it.
        </p>

        {/* =====================================================
            COPY
        ====================================================== */}

        <div
          className="
            mt-4

            space-y-3

            font-brand-sans

            text-[10px]
            font-medium
            leading-[1.7]

            text-[var(--brand-text-muted)]

            sm:text-[11px]

            lg:text-[12px]
          "
        >
          <p>
            We create residential interiors around your lifestyle, personal
            taste and the character of the property.
          </p>

          <p>
            That can mean rethinking how a living room is arranged, developing a
            stronger material and colour direction, creating bespoke sofas
            around the dimensions of the room or bringing several spaces
            together under one cohesive design language.
          </p>
        </div>

        {/* =====================================================
            RESIDENTIAL FOCUS
        ====================================================== */}

        <div
          className="
            mt-5

            grid
            grid-cols-2

            gap-2
          "
        >
          <FocusItem
            icon={<LayoutGrid size={13} strokeWidth={1.5} />}
            label="Layout"
          />

          <FocusItem
            icon={<Sparkles size={13} strokeWidth={1.5} />}
            label="Materials"
          />

          <FocusItem
            icon={<Sofa size={13} strokeWidth={1.5} />}
            label="Bespoke Sofas"
          />

          <FocusItem
            icon={<Home size={13} strokeWidth={1.5} />}
            label="Cohesion"
          />
        </div>

        {/* =====================================================
            OUTCOME
        ====================================================== */}

        <div
          className="
            mt-5

            border-t
            border-[var(--brand-navy)]/10

            pt-5
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
            The Objective
          </span>

          <p
            className="
              mt-1.5

              font-brand-display

              text-[19px]
              font-semibold
              leading-[1.3]

              text-[var(--brand-navy)]

              sm:text-[21px]
            "
          >
            Not simply a more beautiful home. A space that feels more like
            yours.
          </p>
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   COMMERCIAL
========================================================= */

function CommercialPanel() {
  return (
    <article
      className="
        clay-surface-strong

        rounded-[23px]

        p-[5px]
      "
    >
      <div
        className="
          overflow-hidden

          rounded-[18px]

          bg-[var(--brand-navy)]

          px-4
          py-5

          sm:px-5
          sm:py-6

          lg:px-6
          lg:py-7
        "
      >
        {/* =====================================================
            COMMERCIAL INTRO
        ====================================================== */}

        <div
          className="
            grid
            gap-5

            sm:grid-cols-[0.72fr_1.28fr]
            sm:items-start
            sm:gap-7
          "
        >
          <div>
            <div
              className="
                flex
                items-start
                gap-4
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

                  text-[var(--brand-navy)]
                "
              >
                <Building2 size={17} strokeWidth={1.5} />
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
                  Commercial
                </span>

                <h3
                  className="
                    mt-1.5

                    font-brand-display

                    text-[24px]
                    font-semibold
                    leading-[1.1]

                    tracking-[-0.025em]

                    text-white

                    sm:text-[27px]
                  "
                >
                  Commercial Interior Design
                </h3>
              </div>
            </div>
          </div>

          <div>
            <p
              className="
                font-brand-display

                text-[18px]
                font-medium
                italic
                leading-[1.4]

                text-white/90

                sm:text-[19px]
              "
            >
              Commercial interiors need to work on several levels at once.
            </p>

            <p
              className="
                mt-3

                font-brand-sans

                text-[10px]
                font-medium
                leading-[1.7]

                text-white/60

                sm:text-[11px]

                lg:text-[12px]
              "
            >
              They need visual identity, they need to support how people use the
              space and they need to create the right impression for customers,
              guests, visitors or employees.
            </p>

            <p
              className="
                mt-3

                font-brand-sans

                text-[10px]
                font-medium
                leading-[1.7]

                text-white/60

                sm:text-[11px]

                lg:text-[12px]
              "
            >
              We develop commercial interior concepts for restaurants, cafés,
              hospitality environments and workplaces, balancing atmosphere with
              the practical requirements of the setting.
            </p>
          </div>
        </div>

        {/* =====================================================
            COMMERCIAL DIVIDER
        ====================================================== */}

        <div
          className="
            mt-6

            flex
            items-center

            gap-3
          "
        >
          <span
            className="
              h-px
              flex-1

              bg-white/10
            "
          />

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
            Commercial Sectors
          </span>

          <span
            className="
              h-px
              flex-1

              bg-white/10
            "
          />
        </div>

        {/* =====================================================
            COMMERCIAL SERVICES
        ====================================================== */}

        <div
          className="
            mt-5

            grid
            gap-2.5

            xl:grid-cols-3
          "
        >
          {commercialServices.map((service) => (
            <CommercialServiceCard key={service.title} service={service} />
          ))}
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   COMMERCIAL SERVICE
========================================================= */

function CommercialServiceCard({ service }: { service: CommercialService }) {
  const Icon = service.icon;

  return (
    <div
      className="
        rounded-[17px]

        border
        border-white/[0.08]

        bg-white/[0.05]

        px-4
        py-4

        shadow-[inset_1px_1px_0_rgba(255,255,255,0.04)]
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
            h-9
            w-9

            shrink-0

            items-center
            justify-center

            rounded-full

            bg-white/[0.07]

            text-[var(--brand-gold)]
          "
        >
          <Icon size={14} strokeWidth={1.5} />
        </span>

        <div>
          <span
            className="
              font-brand-sans

              text-[5px]
              font-bold
              uppercase

              tracking-[0.15em]

              text-[var(--brand-gold)]
            "
          >
            {service.eyebrow}
          </span>

          <h4
            className="
              mt-1

              font-brand-display

              text-[18px]
              font-semibold
              leading-[1.1]

              text-white

              sm:text-[19px]
            "
          >
            {service.title}
          </h4>
        </div>
      </div>

      {/* COPY */}

      <div
        className="
          mt-4

          space-y-2.5
        "
      >
        {service.paragraphs.map((paragraph, index) => (
          <p
            key={index}
            className="
                font-brand-sans

                text-[9px]
                font-medium
                leading-[1.65]

                text-white/58

                sm:text-[10px]
              "
          >
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   FOCUS ITEM
========================================================= */

function FocusItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div
      className="
        clay-surface-soft

        flex
        min-h-[44px]

        items-center
        gap-2.5

        rounded-[14px]

        px-3
        py-2.5
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
        {icon}
      </span>

      <span
        className="
          font-brand-sans

          text-[7px]
          font-bold
          uppercase

          leading-[1.3]

          tracking-[0.09em]

          text-[var(--brand-navy)]

          sm:text-[8px]
        "
      >
        {label}
      </span>
    </div>
  );
}
