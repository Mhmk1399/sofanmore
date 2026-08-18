import {
  BriefcaseBusiness,
  Building2,
  Coffee,
  Hotel,
  LampDesk,
  LayoutDashboard,
  PanelsTopLeft,
  Sparkles,
  Store,
  UtensilsCrossed,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

import ClayButton from "@/components/ui/ClayButton";

/* =========================================================
   TYPES
========================================================= */

type CommercialSpace = {
  icon: LucideIcon;
  title: string;
  number: string;
};

/* =========================================================
   DATA
========================================================= */

const commercialSpaces: CommercialSpace[] = [
  {
    icon: UtensilsCrossed,
    title: "Restaurants",
    number: "01",
  },
  {
    icon: Coffee,
    title: "Cafés",
    number: "02",
  },
  {
    icon: BriefcaseBusiness,
    title: "Offices",
    number: "03",
  },
  {
    icon: Hotel,
    title: "Hospitality Interiors",
    number: "04",
  },
  {
    icon: PanelsTopLeft,
    title: "Reception Spaces",
    number: "05",
  },
  {
    icon: LampDesk,
    title: "Workspaces",
    number: "06",
  },
  {
    icon: LayoutDashboard,
    title: "Interior Design Projects",
    number: "07",
  },
];

/* =========================================================
   ROOT
========================================================= */

export default function CommercialSofaProjectsSection() {
  return (
    <section
      aria-labelledby="commercial-bespoke-heading"
      className="
        relative
        overflow-hidden

        bg-[var(--brand-ivory)]

        px-3
        py-10

        sm:px-5
        sm:py-12

        lg:px-7
        lg:py-16
      "
    >
 
      <div
        className="
          relative
          z-10

          mx-auto
          max-w-[var(--site-width)]
        "
      >
        {/* =====================================================
            OUTER CLAY SHELL
        ====================================================== */}

        <div
          className="
            clay-surface-strong

            relative

            rounded-[34px]
            p-[7px]

            sm:rounded-[42px]

            lg:rounded-[50px]
            lg:p-[9px]
          "
        >
          <div
            className="
              clay-inset

              relative
              overflow-hidden

              rounded-[28px]

              bg-[linear-gradient(145deg,#FFFDF8_0%,#F5EEE4_50%,#EADCCB_100%)]

              px-4
              py-6

              sm:rounded-[35px]
              sm:px-6
              sm:py-8

              lg:rounded-[41px]
              lg:px-10
              lg:py-10

              xl:px-12
              xl:py-12
            "
          >
            <ArchitecturalBackground />

            {/* =================================================
                DESKTOP
            ================================================== */}

            <div
              className="
                relative
                z-20

                hidden

                grid-cols-[0.82fr_1.18fr]
                gap-6

                lg:grid

                xl:gap-8
              "
            >
              {/* =============================================
                  NAVY STORY PANEL
              ============================================== */}

              <CommercialStoryPanel />

              {/* =============================================
                  COMMERCIAL MATRIX
              ============================================== */}

              <div
                className="
                  flex
                  flex-col
                "
              >
                <div
                  className="
                    grid
                    flex-1
                    grid-cols-2
                    gap-4
                  "
                >
                  <CommercialSpaceCard
                    item={commercialSpaces[0]}
                    size="large"
                  />

                  <CommercialSpaceCard
                    item={commercialSpaces[1]}
                    size="standard"
                  />

                  <CommercialSpaceCard
                    item={commercialSpaces[2]}
                    size="standard"
                  />

                  <CommercialSpaceCard
                    item={commercialSpaces[3]}
                    size="standard"
                  />

                  <CommercialSpaceCard
                    item={commercialSpaces[4]}
                    size="standard"
                  />

                  <CommercialSpaceCard
                    item={commercialSpaces[5]}
                    size="standard"
                  />

                  <div className="col-span-2">
                    <WideCommercialCard item={commercialSpaces[6]} />
                  </div>
                </div>

                <div className="mt-5">
                  <CommercialCTA />
                </div>
              </div>
            </div>

            {/* =================================================
                MOBILE
            ================================================== */}

            <div
              className="
                relative
                z-20

                lg:hidden
              "
            >
              <MobileHeader />

              <div
                className="
                  mt-6

                  grid
                  grid-cols-2
                  gap-3
                "
              >
                {commercialSpaces.slice(0, 6).map((item) => (
                  <MobileCommercialCard key={item.number} item={item} />
                ))}

                <div className="col-span-2">
                  <MobileCommercialCard item={commercialSpaces[6]} wide />
                </div>
              </div>

              <div className="mt-5">
                <CommercialCTA mobile />
              </div>
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

function CommercialStoryPanel() {
  return (
    <div
      className="
        clay-surface-strong

        relative

        rounded-[34px]
        p-[7px]
      "
    >
      <div
        className="
          clay-dark

          relative
          h-full

          min-h-[690px]

          overflow-hidden

          rounded-[28px]

          px-8
          py-9

          xl:px-10
          xl:py-10
        "
      >
        {/* ===============================================
            DECORATIVE ORBITS
        ================================================ */}

        <div
          aria-hidden
          className="
            absolute

            -right-[110px]
            -top-[95px]

            h-[340px]
            w-[340px]

            rounded-full

            border
            border-[var(--brand-gold)]/18
          "
        />

        <div
          aria-hidden
          className="
            absolute

            -right-[50px]
            -top-[35px]

            h-[220px]
            w-[220px]

            rounded-full

            border
            border-white/[0.06]
          "
        />

        <div
          aria-hidden
          className="
            absolute

            right-[72px]
            top-[52px]

            h-[22px]
            w-[22px]

            rounded-full

            bg-[radial-gradient(circle_at_30%_30%,#FFE7AC_0%,#D7A04A_52%,#915A18_100%)]

            shadow-[0_12px_22px_rgba(215,160,74,0.28)]
          "
        />

        {/* ===============================================
            CONTENT
        ================================================ */}

        <div
          className="
            relative
            z-10

            flex
            h-full
            flex-col
          "
        >
          {/* EYEBROW */}

          <div
            className="
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

                bg-[var(--brand-gold)]

                text-[var(--brand-navy)]
              "
            >
              <Building2 size={17} strokeWidth={1.5} />
            </div>

            <span
              className="
                font-brand-sans

                text-[8px]
                font-bold
                uppercase

                tracking-[0.22em]

                text-[var(--brand-gold)]
              "
            >
              Commercial & Hospitality
            </span>
          </div>

          {/* HEADING */}

          <h2
            id="commercial-bespoke-heading"
            className="
              mt-9

              max-w-[520px]

              font-brand-display

              text-[46px]
              font-medium
              leading-[0.96]

              tracking-[-0.04em]

              text-white

              xl:text-[54px]
            "
          >
            Bespoke Sofas
            <br />
            for More Than
            <br />
            Homes
            <span
              className="
                text-[var(--brand-gold)]
              "
            >
              .
            </span>
          </h2>

          {/* DIVIDER */}

          <div
            className="
              mt-7

              flex
              items-center
              gap-3
            "
          >
            <span
              className="
                h-[2px]
                w-14

                rounded-full

                bg-[var(--brand-gold)]
              "
            />

            <span
              className="
                h-[5px]
                w-[5px]

                rounded-full

                bg-[var(--brand-gold)]
              "
            />
          </div>

          {/* COPY */}

          <div
            className="
              mt-7

              max-w-[510px]

              space-y-5

              font-brand-sans

              text-[13px]
              font-medium
              leading-[1.78]

              text-white/64

              xl:text-[14px]
            "
          >
            <p>
              Our custom sofa and seating service is also available for
              businesses, designers and commercial projects.
            </p>

            <p>
              We can help create bespoke seating and made-to-measure pieces for
              hospitality, workspaces, reception areas and other professional
              interiors.
            </p>
          </div>

          {/* ===============================================
              SIGNATURE STATEMENT
          ================================================ */}

          <div
            className="
              mt-auto
              pt-10
            "
          >
            <div
              className="
                rounded-[24px]

                border
                border-white/[0.08]

                bg-white/[0.04]

                p-5
              "
            >
              <Sparkles
                size={17}
                strokeWidth={1.5}
                className="
                  text-[var(--brand-gold)]
                "
              />

              <p
                className="
                  mt-4

                  max-w-[390px]

                  font-brand-display

                  text-[22px]
                  font-medium
                  leading-[1.25]

                  text-white
                "
              >
                Designed around the project, the space and the people who will
                use it.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   COMMERCIAL SPACE CARD
========================================================= */

function CommercialSpaceCard({
  item,
  size,
}: {
  item: CommercialSpace;
  size: "large" | "standard";
}) {
  const Icon = item.icon;

  return (
    <article
      className="
        clay-surface-soft

        group

        rounded-[27px]
        p-[5px]

        transition-transform
        duration-500
        ease-[cubic-bezier(0.22,1,0.36,1)]

        hover:-translate-y-1
      "
    >
      <div
        className={`
          clay-inset

          relative

          flex
          h-full
          flex-col

          overflow-hidden

          rounded-[22px]

          px-5
          py-5

          ${size === "large" ? "min-h-[220px]" : "min-h-[205px]"}
        `}
      >
        <CardArchitecture />

        {/* TOP */}

        <div
          className="
            relative
            z-10

            flex
            items-start
            justify-between
            gap-4
          "
        >
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
              size={19}
              strokeWidth={1.5}
              className="
                text-[var(--brand-gold-700)]
              "
            />
          </div>

          <span
            className="
              font-brand-display

              text-[31px]
              leading-none

              text-[var(--brand-navy)]/[0.09]
            "
          >
            {item.number}
          </span>
        </div>

        {/* CONTENT */}

        <div
          className="
            relative
            z-10

            mt-auto
            pt-7
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
            Commercial Space
          </span>

          <h3
            className="
              mt-2.5

              max-w-[280px]

              font-brand-display

              text-[23px]
              font-semibold
              leading-[1.04]

              tracking-[-0.025em]

              text-[var(--brand-navy)]

              xl:text-[25px]
            "
          >
            {item.title}
          </h3>
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   WIDE COMMERCIAL CARD
========================================================= */

function WideCommercialCard({ item }: { item: CommercialSpace }) {
  const Icon = item.icon;

  return (
    <article
      className="
        clay-surface-soft

        rounded-[27px]

        p-[5px]
      "
    >
      <div
        className="
          clay-inset

          relative
          overflow-hidden

          rounded-[22px]

          px-6
          py-5
        "
      >
        <div
          aria-hidden
          className="
            absolute

            -bottom-[105px]
            right-[8%]

            h-[205px]
            w-[165px]

            rounded-t-[50%]

            border-[14px]
            border-[#E8DCCB]/48
          "
        />

        <div
          className="
            relative
            z-10

            flex
            items-center
            justify-between

            gap-7
          "
        >
          <div
            className="
              flex
              items-center
              gap-5
            "
          >
            <div
              className="
                flex
                h-14
                w-14

                shrink-0

                items-center
                justify-center

                rounded-full

                bg-[var(--brand-navy)]

                text-[var(--brand-gold)]
              "
            >
              <Icon size={21} strokeWidth={1.5} />
            </div>

            <div>
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
                Designed in Collaboration
              </span>

              <h3
                className="
                  mt-2

                  font-brand-display

                  text-[27px]
                  font-semibold
                  leading-[1.04]

                  tracking-[-0.025em]

                  text-[var(--brand-navy)]
                "
              >
                {item.title}
              </h3>
            </div>
          </div>

          <span
            className="
              font-brand-display

              text-[37px]

              text-[var(--brand-navy)]/[0.09]
            "
          >
            {item.number}
          </span>
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   COMMERCIAL CTA
========================================================= */

function CommercialCTA({ mobile = false }: { mobile?: boolean }) {
  return (
    <div
      className="
        clay-surface-strong

        rounded-[27px]

        p-[6px]
      "
    >
      <div
        className="
          clay-inset

          relative
          overflow-hidden

          rounded-[21px]

          px-5
          py-5

          lg:px-6
          lg:py-6
        "
      >
        {/* DECOR */}

        <div
          aria-hidden
          className="
            absolute

            -right-[45px]
            -top-[55px]

            h-[130px]
            w-[130px]

            rounded-full

            border
            border-[var(--brand-gold)]/18
          "
        />

        <div
          className={`
            relative
            z-10

            ${mobile ? "space-y-5" : "flex items-center justify-between gap-7"}
          `}
        >
          <div
            className="
              flex
              items-start
              gap-4
            "
          >
            <div
              className="
                flex
                h-12
                w-12

                shrink-0

                items-center
                justify-center

                rounded-full

                bg-[var(--brand-navy)]

                text-[var(--brand-gold)]
              "
            >
              <Store size={18} strokeWidth={1.5} />
            </div>

            <div>
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
                Planning a Commercial Project?
              </span>

              <p
                className="
                  mt-1.5

                  max-w-[560px]

                  font-brand-display

                  text-[19px]
                  font-semibold
                  leading-[1.22]

                  text-[var(--brand-navy)]

                  sm:text-[21px]
                "
              >
                Explore our dedicated London service for restaurants, cafés,
                offices and hospitality interiors.
              </p>
            </div>
          </div>

          <div
            className={`
              shrink-0

              ${mobile ? "w-full" : ""}
            `}
          >
            <ClayButton
              href="/services/commercial-sofas"
              variant="navy"
              size="lg"
              showArrow
              fullWidth={mobile}
            >
              Explore Commercial Projects
            </ClayButton>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   MOBILE HEADER
========================================================= */

function MobileHeader() {
  return (
    <div
      className="
        clay-surface-strong

        rounded-[27px]

        p-[6px]
      "
    >
      <div
        className="
          clay-dark

          relative
          overflow-hidden

          rounded-[21px]

          px-5
          py-6
        "
      >
        {/* ORBIT */}

        <div
          aria-hidden
          className="
            absolute

            -right-[80px]
            -top-[80px]

            h-[210px]
            w-[210px]

            rounded-full

            border
            border-[var(--brand-gold)]/17
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

                bg-[var(--brand-gold)]

                text-[var(--brand-navy)]
              "
            >
              <Building2 size={16} strokeWidth={1.5} />
            </div>

            <span
              className="
                font-brand-sans

                text-[7px]
                font-bold
                uppercase

                tracking-[0.2em]

                text-[var(--brand-gold)]
              "
            >
              Commercial & Hospitality
            </span>
          </div>

          <h2
            id="commercial-bespoke-heading-mobile"
            className="
              mt-6

              font-brand-display

              text-[35px]
              font-medium
              leading-[0.97]

              tracking-[-0.035em]

              text-white

              min-[390px]:text-[39px]
            "
          >
            Bespoke Sofas & Seating for More Than Homes
            <span className="text-[var(--brand-gold)]">.</span>
          </h2>

          <p
            className="
              mt-5

              font-brand-sans

              text-[10px]
              font-medium
              leading-[1.7]

              text-white/64
            "
          >
            Our custom sofa and seating service is also available for
            businesses, designers and commercial projects.
          </p>

          <p
            className="
              mt-3

              font-brand-sans

              text-[10px]
              leading-[1.7]

              text-white/48
            "
          >
            We can create bespoke seating and made-to-measure pieces for
            restaurants, cafés, offices, hospitality interiors, reception spaces
            and workspaces.
          </p>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   MOBILE CARD
========================================================= */

function MobileCommercialCard({
  item,
  wide = false,
}: {
  item: CommercialSpace;
  wide?: boolean;
}) {
  const Icon = item.icon;

  return (
    <article
      className="
        clay-surface-soft

        h-full

        rounded-[20px]

        p-[5px]
      "
    >
      <div
        className={`
          clay-inset

          relative

          h-full

          overflow-hidden

          rounded-[16px]

          px-3.5
          py-4

          ${wide ? "flex items-center gap-4" : "min-h-[145px]"}
        `}
      >
        <div
          aria-hidden
          className="
            absolute

            -bottom-[55px]
            -right-[40px]

            h-[105px]
            w-[90px]

            rounded-t-[50%]

            border-[8px]
            border-[#E8DCCB]/45
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
              clay-surface-strong

              flex
              h-10
              w-10

              items-center
              justify-center

              rounded-full
            "
          >
            <Icon
              size={16}
              strokeWidth={1.5}
              className="
                text-[var(--brand-gold-700)]
              "
            />
          </div>
        </div>

        <div
          className={`
            relative
            z-10

            ${wide ? "flex-1" : "mt-5"}
          `}
        >
          <span
            className="
              font-brand-sans

              text-[6px]
              font-bold
              uppercase

              tracking-[0.14em]

              text-[var(--brand-gold-700)]
            "
          >
            {item.number}
          </span>

          <h3
            className="
              mt-1.5

              font-brand-display

              text-[17px]
              font-semibold
              leading-[1.04]

              text-[var(--brand-navy)]
            "
          >
            {item.title}
          </h3>
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   CARD ARCHITECTURE
========================================================= */

function CardArchitecture() {
  return (
    <>
      <div
        aria-hidden
        className="
          absolute

          -bottom-[75px]
          -right-[48px]

          h-[145px]
          w-[120px]

          rounded-t-[50%]

          border-[11px]
          border-[#E8DCCB]/48
        "
      />

      <div
        aria-hidden
        className="
          absolute

          right-[22px]
          top-[22px]

          h-[7px]
          w-[7px]

          rounded-full

          bg-[var(--brand-gold)]/45
        "
      />
    </>
  );
}

/* =========================================================
   ARCHITECTURAL BACKGROUND
========================================================= */

function ArchitecturalBackground() {
  return (
    <>
      {/* TOP CURVE */}

      <svg
        aria-hidden
        viewBox="0 0 1400 320"
        preserveAspectRatio="none"
        className="
          pointer-events-none

          absolute
          left-0
          top-0

          z-0

          hidden

          h-[280px]
          w-full

          lg:block
        "
      >
        <path
          d="
            M0 0

            H1400
            V76

            C1262 40
             1153 43
             1051 104

            C930 176
             805 192
             688 154

            C566 114
             448 79
             328 92

            C203 106
             91 78
             0 42

            Z
          "
          fill="#F2E8DA"
          opacity="0.66"
        />

        <path
          d="
            M0 58

            C109 88
             215 117
             330 103

            C449 89
             566 121
             688 163

            C808 204
             936 184
             1056 112

            C1151 55
             1262 52
             1400 86
          "
          fill="none"
          stroke="#FFFDF8"
          strokeWidth="6"
          opacity="0.55"
        />
      </svg>

      {/* FLUTED LEFT DETAIL */}

      <div
        aria-hidden
        className="
          pointer-events-none

          absolute
          bottom-0
          left-[3%]

          z-0

          hidden

          h-[145px]

          gap-[8px]

          lg:flex
        "
      >
        {[0, 1, 2, 3].map((item) => (
          <span
            key={item}
            className="
              h-full
              w-[7px]

              rounded-t-full

              bg-[#E6D9C8]
            "
          />
        ))}
      </div>

      {/* RIGHT ARCH */}

      <div
        aria-hidden
        className="
          pointer-events-none

          absolute

          -right-[105px]
          bottom-[4%]

          z-0

          hidden

          h-[340px]
          w-[240px]

          rounded-l-[50%]

          border-[16px]
          border-[#E8DCCB]/33

          lg:block
        "
      />
    </>
  );
}

/* =========================================================
   SECTION BACKGROUND
========================================================= */

function SectionBackground() {
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

          bg-[linear-gradient(180deg,#F5F2EA_0%,#FFFDF8_50%,#EEE2D2_100%)]
        "
      />

      {/* GOLD RING */}

      <div
        className="
          absolute

          -left-[110px]
          top-[180px]

          hidden

          h-[250px]
          w-[250px]

          rounded-full

          border-[3px]
          border-[var(--brand-gold)]/38

          lg:block
        "
      />

      {/* IVORY SPHERE */}

      <div
        className="
          clay-sphere

          absolute

          -right-[43px]
          bottom-[100px]

          hidden

          h-[135px]
          w-[135px]

          lg:block
        "
      >
        <div className="clay-sphere-shadow" />

        <div className="clay-sphere-ball" />
      </div>
    </div>
  );
}
