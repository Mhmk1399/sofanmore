import { Armchair, BedDouble, Sofa, UsersRound } from "lucide-react";

/* =========================================================
   DATA
========================================================= */

const bespokePieces = [
  {
    id: "corner-modular-sofas",
    number: "01",
    eyebrow: "Signature Seating",
    title: "Bespoke Sofas",
    description:
      "Create a bespoke sofa around the exact dimensions, comfort requirements and character of your room instead of adapting your space around a standard model.",
    secondary:
      "From compact sofas for London apartments to larger statement pieces, the proportions, depth, configuration, upholstery and finishing details can be tailored around your project.",
    icon: Sofa,
    featured: true,
  },

  {
    id: "chairs-armchairs",
    number: "02",
    eyebrow: "Individual Seating",
    title: "Custom Chairs & Armchairs",
    description:
      "Commission custom chairs and armchairs designed around the proportions, comfort, fabric and finishing details you want.",
    icon: Armchair,
  },

  {
    id: "benches-ottomans",
    number: "03",
    eyebrow: "Made for the Space",
    title: "Bespoke Benches & Seating",
    description:
      "Custom bench seating can make better use of alcoves, awkward layouts and spaces where standard furniture cannot provide the right fit.",
    icon: UsersRound,
  },

  {
    id: "beds-headboards",
    number: "04",
    eyebrow: "Beyond Seating",
    title: "Beds, Headboards & Bespoke Pieces",
    description:
      "Looking for something beyond a sofa? We can also create made-to-measure beds, headboards and selected bespoke furniture pieces designed around the dimensions and requirements of your space.",
    secondary:
      "Share your measurements, photographs or design ideas and we can explore the most suitable approach for your project.",
    icon: BedDouble,
  },
];

/* =========================================================
   ROOT
========================================================= */

export default function BespokeSofasWeCanCreateSection() {
  const featured = bespokePieces[0];
  const supporting = bespokePieces.slice(1);

  return (
    <section
      aria-labelledby="bespoke-sofas-we-create-heading"
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

              bg-[linear-gradient(145deg,#FFFDF8_0%,#F6EFE5_54%,#EDE1D1_100%)]

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
            <ArchitecturalDetails />

            {/* =================================================
                HEADER
            ================================================== */}

            <div
              className="
                relative
                z-20

                grid
                gap-6

                lg:grid-cols-[1fr_0.68fr]
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
                      text-[11px]
                      font-bold
                      uppercase
                      tracking-[0.25em]

                      text-[var(--brand-gold-700)]

                      sm:text-[12px]
                    "
                  >
                    Made for Your Interior
                  </span>
                </div>

                <h2
                  id="bespoke-sofas-we-create-heading"
                  className="
                    mt-5
                    max-w-[760px]

                    font-brand-display
                    text-[39px]
                    font-semibold
                    leading-[0.97]
                    tracking-[-0.04em]

                    text-[var(--brand-navy)]

                    min-[390px]:text-[43px]

                    sm:text-[50px]

                    lg:text-[clamp(50px,4.5vw,68px)]
                  "
                >
                  Bespoke Sofas &amp; Seating We Can Create
                  <span className="text-[var(--brand-gold)]">.</span>
                </h2>
              </div>

              <div
                className="
                  max-w-[480px]

                  lg:justify-self-end
                "
              >
                <p
                  className="
                    font-brand-sans
                    text-[12px]
                    font-medium
                    leading-[1.75]

                    text-[var(--brand-text-muted)]

                    sm:text-[13px]

                    lg:text-[14px]
                  "
                >
                  Every project is different. We create bespoke sofas and custom
                  seating for homes, businesses and spaces where standard
                  furniture does not provide the right size, fit or design.
                </p>

                <div
                  className="
                    mt-5
                    flex
                    items-center
                    gap-3
                  "
                >
                  <span
                    className="
                      h-[2px]
                      w-12
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

                  <span
                    className="
                      font-brand-sans
                      text-[13px]
                      font-bold
                      uppercase
                      tracking-[0.15em]

                      text-[var(--brand-text-muted)]
                    "
                  >
                    Designed · Made · Finished
                  </span>
                </div>
              </div>
            </div>

            <div className="relative z-20 mt-7 grid gap-5 lg:mt-9 lg:grid-cols-[1.05fr_0.95fr]">
              <FeaturedSofaCard item={featured} />
              <div className="grid gap-5 sm:grid-cols-2">
                <SupportingCard item={supporting[0]} />
                <SupportingCard item={supporting[1]} />
                <div className="sm:col-span-2">
                  <WideSupportingCard item={supporting[2]} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   FEATURED SOFA CARD
========================================================= */

function FeaturedSofaCard({ item }: { item: (typeof bespokePieces)[number] }) {
  const Icon = item.icon;

  return (
    <article
      id={item.id}
      className="
        clay-surface-strong scroll-mt-28
        group

        relative
        min-h-[420px] lg:min-h-[570px]

        rounded-[34px]
        p-[7px]
      "
    >
      <div
        className="
          clay-dark
          relative

          flex
          h-full
          flex-col

          overflow-hidden

          rounded-[28px]

          px-5 sm:px-8
          pb-8
          pt-8

          xl:px-10
          xl:pb-10
          xl:pt-10
        "
      >
        {/* GOLD ORBIT */}

        <svg
          aria-hidden
          viewBox="0 0 600 500"
          className="
            pointer-events-none
            absolute

            -right-[100px]
            -top-[70px]

            h-[430px]
            w-[500px]

            opacity-70
          "
        >
          <path
            d="
              M110 404
              C123 184 266 73 445 70
            "
            fill="none"
            stroke="#D7A04A"
            strokeWidth="2"
          />

          <circle cx="438" cy="70" r="13" fill="#D7A04A" />
        </svg>

        {/* TOP */}

        <div
          className="
            relative
            z-10

            flex
            items-start
            justify-between
            gap-5
          "
        >
          <div
            className="
              flex
              h-14
              w-14

              items-center
              justify-center

              rounded-full

              bg-[var(--brand-gold)]

              text-[var(--brand-navy)]

              shadow-[inset_3px_3px_5px_rgba(255,255,255,0.3),0_12px_24px_rgba(0,0,0,0.18)]
            "
          >
            <Icon size={25} strokeWidth={1.5} />
          </div>

          <span
            className="
              font-brand-display
              text-[54px]
              leading-none

              text-white/[0.10]
            "
          >
            {item.number}
          </span>
        </div>

        {/* COPY */}

        <div
          className="
            relative
            z-10

            mt-10
            max-w-[500px]
          "
        >
          <span
            className="
              font-brand-sans
              text-[11px]
              font-bold
              uppercase
              tracking-[0.22em]

              text-[var(--brand-gold)]
            "
          >
            {item.eyebrow}
          </span>

          <h3
            className="
              mt-4

              font-brand-display
              text-[32px] sm:text-[42px]
              font-medium
              leading-[0.98]
              tracking-normal

              text-white

              xl:text-[48px]
            "
          >
            {item.title}
            <span className="text-[var(--brand-gold)]">.</span>
          </h3>

          <div
            className="
              mt-5
              h-[2px]
              w-12

              bg-[var(--brand-gold)]
            "
          />

          <p
            className="
              mt-6

              font-brand-sans
              text-[13px]
              font-medium
              leading-[1.75]

              text-white/85
            "
          >
            {item.description}
          </p>

          {item.secondary && (
            <p
              className="
                mt-4

                font-brand-sans
                text-[12px]
                leading-[1.72]

                text-white/80
              "
            >
              {item.secondary}
            </p>
          )}
        </div>

        {/* =================================================
            CODE-DRAWN SOFA
        ================================================== */}

        <div
          className="
            relative
            z-10

            mt-auto
            pt-8
          "
        >
          <SofaIllustration />
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   SUPPORTING CARD
========================================================= */

function SupportingCard({ item }: { item: (typeof bespokePieces)[number] }) {
  const Icon = item.icon;

  return (
    <article
      id={item.id}
      className="
        clay-surface-soft scroll-mt-28

        group

        sm:min-h-[330px]

        rounded-[29px]

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
          flex-col

          overflow-hidden

          rounded-[23px]

          px-5 sm:px-6
          py-6
        "
      >
        <CardArch />

        <div
          className="
            relative
            z-10

            flex
            items-start
            justify-between
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
              size={20}
              strokeWidth={1.5}
              className="
                text-[var(--brand-gold-700)]
              "
            />
          </div>

          <span
            className="
              font-brand-display
              text-[35px]

              text-[var(--brand-navy)]/[0.11]
            "
          >
            {item.number}
          </span>
        </div>

        <div
          className="
            relative
            z-10

            mt-auto
            pt-8
          "
        >
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
            {item.eyebrow}
          </span>

          <h3
            className="
              mt-3

              font-brand-display
              text-[26px]
              font-semibold
              leading-[1.02]
              tracking-normal

              text-[var(--brand-navy)]
            "
          >
            {item.title}
          </h3>

          <p
            className="
              mt-4

              font-brand-sans
              text-[13px]
              leading-[1.68]

              text-[var(--brand-text-muted)]
            "
          >
            {item.description}
          </p>
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   WIDE CARD
========================================================= */

function WideSupportingCard({
  item,
}: {
  item: (typeof bespokePieces)[number];
}) {
  const Icon = item.icon;

  return (
    <article
      id={item.id}
      className="
        clay-surface-soft scroll-mt-28

        rounded-[29px]
        p-[6px]
      "
    >
      <div
        className="
          clay-inset

          relative
          overflow-hidden

          rounded-[23px]

          px-5 sm:px-6
          py-6
        "
      >
        <div
          aria-hidden
          className="
            absolute
            -bottom-[110px]
            right-[7%]

            h-[225px]
            w-[180px]

            rounded-t-[50%]

            border-[14px]
            border-[#E9DDCC]/55
          "
        />

        <div
          className="
            relative
            z-10

            grid
            sm:grid-cols-[auto_minmax(0,1fr)]

            items-start
            gap-5
          "
        >
          <div
            className="
              clay-surface-strong

              flex
              h-14
              w-14

              items-center
              justify-center

              rounded-full
            "
          >
            <Icon
              size={22}
              strokeWidth={1.5}
              className="
                text-[var(--brand-gold-700)]
              "
            />
          </div>

          <div
            className="
              min-w-0 max-w-[520px]
            "
          >
            <div
              className="
                flex
                items-center
                justify-between
                gap-5
              "
            >
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
                {item.eyebrow}
              </span>

              <span
                className="
                  font-brand-display
                  text-[24px] sm:text-[29px]

                  text-[var(--brand-navy)]/[0.10]
                "
              >
                {item.number}
              </span>
            </div>

            <h3
              className="
                mt-3

                max-w-[430px]

                font-brand-display
                text-[24px] sm:text-[29px]
                font-semibold
                leading-[1.03]
                tracking-normal

                text-[var(--brand-navy)]
              "
            >
              {item.title}
            </h3>

            <p
              className="
                mt-4

                font-brand-sans
                text-[13px]
                leading-[1.68]

                text-[var(--brand-text-muted)]
              "
            >
              {item.description}
            </p>

            {item.secondary && (
              <p
                className="
                  mt-3

                  font-brand-sans
                  text-[13px]
                  leading-[1.65]

                  text-[var(--brand-text-muted)]
                "
              >
                {item.secondary}
              </p>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   SOFA ILLUSTRATION
========================================================= */

function SofaIllustration() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 650 210"
      className="
        h-auto
        w-full

        overflow-visible

        drop-shadow-[0_20px_20px_rgba(0,0,0,0.22)]
      "
    >
      <defs>
        <linearGradient id="section3SofaNavy" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#31506F" />

          <stop offset="42%" stopColor="#193753" />

          <stop offset="100%" stopColor="#081827" />
        </linearGradient>

        <linearGradient id="section3SofaSeat" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#264763" />

          <stop offset="100%" stopColor="#0D2235" />
        </linearGradient>

        <linearGradient id="section3Gold" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#A36A20" />

          <stop offset="50%" stopColor="#E5BC68" />

          <stop offset="100%" stopColor="#94601E" />
        </linearGradient>
      </defs>

      {/* floor shadow */}

      <ellipse
        cx="325"
        cy="190"
        rx="250"
        ry="16"
        fill="#000000"
        opacity="0.18"
      />

      {/* back */}

      <path
        d="
          M124 115

          C129 68
           163 43
           218 43

          H432

          C487 43
           521 68
           526 115

          C432 100
           218 100
           124 115

          Z
        "
        fill="url(#section3SofaNavy)"
      />

      {/* channel lines */}

      <g fill="none" stroke="#52708A" strokeWidth="2.5" opacity="0.36">
        <path d="M183 62 Q175 83 178 105" />
        <path d="M231 49 Q225 77 228 101" />
        <path d="M278 45 Q274 76 276 100" />
        <path d="M325 44 V99" />
        <path d="M372 45 Q376 76 374 100" />
        <path d="M419 49 Q425 77 422 101" />
        <path d="M467 62 Q475 83 472 105" />
      </g>

      {/* base */}

      <path
        d="
          M103 108

          C125 99
           159 99
           189 101

          H461

          C491 99
           525 99
           547 108

          L535 170

          C446 183
           204 183
           115 170

          Z
        "
        fill="url(#section3SofaSeat)"
      />

      {/* left arm */}

      <path
        d="
          M115 101

          C79 99
           58 122
           61 149

          C64 177
           88 189
           124 177

          L143 110

          C133 104
           124 102
           115 101

          Z
        "
        fill="url(#section3SofaNavy)"
      />

      {/* right arm */}

      <path
        d="
          M535 101

          C571 99
           592 122
           589 149

          C586 177
           562 189
           526 177

          L507 110

          C517 104
           526 102
           535 101

          Z
        "
        fill="url(#section3SofaNavy)"
      />

      {/* cushion */}

      <rect
        x="382"
        y="96"
        width="74"
        height="56"
        rx="18"
        fill="#EFE5D6"
        transform="rotate(5 419 124)"
      />

      {/* gold rail */}

      <path
        d="
          M120 174

          C215 183
           435 183
           530 174
        "
        fill="none"
        stroke="url(#section3Gold)"
        strokeWidth="7"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* =========================================================
   SMALL CARD ARCH
========================================================= */

function CardArch() {
  return (
    <div
      aria-hidden
      className="
        absolute
        -right-[65px]
        -top-[80px]

        h-[210px]
        w-[170px]

        rounded-b-[50%]

        border-[14px]
        border-[#EADFCF]/55
      "
    />
  );
}

/* =========================================================
   ARCHITECTURAL DETAILS
========================================================= */

function ArchitecturalDetails() {
  return (
    <>
      {/* TOP RIGHT CURVE */}

      <svg
        aria-hidden
        viewBox="0 0 750 300"
        preserveAspectRatio="none"
        className="
          pointer-events-none

          absolute
          right-0
          top-0

          z-0

          hidden

          h-[260px]
          w-[48%]

          lg:block
        "
      >
        <path
          d="
            M750 0

            H390

            C445 31
             472 72
             484 116

            C496 163
             535 184
             592 188

            C655 193
             705 161
             750 131

            Z
          "
          fill="#F1E6D8"
          opacity="0.76"
        />

        <path
          d="
            M403 20

            C454 44
             478 79
             489 119

            C501 162
             535 184
             593 190
          "
          fill="none"
          stroke="#FFFDF8"
          strokeWidth="5"
          opacity="0.68"
        />
      </svg>

      {/* FLUTED DETAILS */}

      <div
        aria-hidden
        className="
          pointer-events-none

          absolute
          right-[4%]
          top-0

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

              rounded-b-full

              bg-[#E6DAC9]

              shadow-[inset_1px_0_1px_rgba(255,255,255,0.65)]
            "
          />
        ))}
      </div>
    </>
  );
}
