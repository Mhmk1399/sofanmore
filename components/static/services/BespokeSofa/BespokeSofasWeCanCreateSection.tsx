import {
  Armchair,
  BedDouble,
  Sofa,
  Sparkles,
  UsersRound,
} from "lucide-react";
import ClayButton from "@/components/ui/ClayButton";

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
      "Create a sofa around the dimensions, comfort and character of your room rather than trying to make a standard model fit.",
    secondary:
      "From compact sofas for London apartments to larger statement seating, the proportions, upholstery and details can be tailored around your project.",
    icon: Sofa,
    featured: true,
  },

  {
    id: "chairs-armchairs",
    number: "02",
    eyebrow: "Individual Seating",
    title: "Custom Chairs & Armchairs",
    description:
      "Commission seating designed around the look and feel you want, with considered proportions, upholstery and finishing details.",
    icon: Armchair,
  },

  {
    id: "benches-ottomans",
    number: "03",
    eyebrow: "Made for the Space",
    title: "Bespoke Benches & Seating",
    description:
      "Custom bench seating can make better use of difficult layouts, alcoves and spaces where conventional pieces do not work.",
    icon: UsersRound,
  },

  {
    id: "beds-headboards",
    number: "04",
    eyebrow: "Beyond Seating",
    title: "Beds, Headboards & Bespoke Pieces",
    description:
      "Looking for something beyond seating? Talk to us about made-to-measure pieces for bedrooms, dining spaces and other areas of your interior.",
    secondary:
      "We can explore the requirements of the project and recommend the most suitable approach.",
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
      <SectionBackground />

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
                      text-[8px]
                      font-bold
                      uppercase
                      tracking-[0.25em]

                      text-[var(--brand-gold-700)]

                      sm:text-[9px]
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
                  Bespoke Sofas
                  <br className="hidden sm:block" />& Pieces We Can Create
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
                  Every project is different, but our bespoke sofa and seating
                  service can include custom pieces for living, dining, working
                  and hospitality spaces.
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
                      text-[7px]
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

            <div aria-hidden className="relative z-20">
              {bespokePieces.map((item) => (
                <span
                  key={item.id}
                  id={item.id}
                  className="block scroll-mt-24"
                />
              ))}
            </div>

            {/* =================================================
                DESKTOP EDITORIAL GRID
            ================================================== */}

            <div
              className="
                relative
                z-20

                mt-9

                hidden

                grid-cols-[1.05fr_0.95fr]
                gap-5

                lg:grid
              "
            >
              {/* =============================================
                  FEATURED SOFA CARD
              ============================================== */}

              <FeaturedSofaCard item={featured} />

              {/* =============================================
                  SUPPORTING CARDS
              ============================================== */}

              <div
                className="
                  grid
                  grid-cols-2
                  gap-5
                "
              >
                <SupportingCard item={supporting[0]} />

                <SupportingCard item={supporting[1]} />

                <div className="col-span-2">
                  <WideSupportingCard item={supporting[2]} />
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

                mt-7

                space-y-3

                lg:hidden
              "
            >
              <MobileFeaturedCard item={featured} />

              {supporting.map((item) => (
                <MobilePieceCard key={item.id} item={item} />
              ))}
            </div>

            {/* =================================================
                COMMERCIAL LINK
            ================================================== */}

            <div
              className="
                relative
                z-20

                mt-7

                lg:mt-9
              "
            >
              <CommercialProjectCallout />
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
      className="
        clay-surface-strong
        group

        relative
        min-h-[570px]

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

          px-8
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
              text-[8px]
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
              text-[42px]
              font-medium
              leading-[0.98]
              tracking-[-0.035em]

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

              text-white/68
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

                text-white/52
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
      className="
        clay-surface-soft

        group

        min-h-[330px]

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

          px-6
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
              text-[7px]
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
              tracking-[-0.03em]

              text-[var(--brand-navy)]
            "
          >
            {item.title}
          </h3>

          <p
            className="
              mt-4

              font-brand-sans
              text-[11px]
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
      className="
        clay-surface-soft

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

          px-6
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
            grid-cols-[auto_1fr]

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
              max-w-[520px]
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
                  text-[7px]
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
                  text-[29px]

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
                text-[29px]
                font-semibold
                leading-[1.03]
                tracking-[-0.03em]

                text-[var(--brand-navy)]
              "
            >
              {item.title}
            </h3>

            <p
              className="
                mt-4

                font-brand-sans
                text-[11px]
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
                  text-[10px]
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
   MOBILE FEATURED
========================================================= */

function MobileFeaturedCard({
  item,
}: {
  item: (typeof bespokePieces)[number];
}) {
  const Icon = item.icon;

  return (
    <article
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
          pb-5
          pt-5
        "
      >
        <div
          className="
            flex
            items-center
            justify-between
          "
        >
          <div
            className="
              flex
              h-11
              w-11

              items-center
              justify-center

              rounded-full

              bg-[var(--brand-gold)]

              text-[var(--brand-navy)]
            "
          >
            <Icon size={19} strokeWidth={1.5} />
          </div>

          <span
            className="
              font-brand-display
              text-[34px]

              text-white/10
            "
          >
            {item.number}
          </span>
        </div>

        <span
          className="
            mt-6
            block

            font-brand-sans
            text-[7px]
            font-bold
            uppercase
            tracking-[0.18em]

            text-[var(--brand-gold)]
          "
        >
          {item.eyebrow}
        </span>

        <h3
          className="
            mt-3

            font-brand-display
            text-[30px]
            font-medium
            leading-[1]
            tracking-[-0.03em]

            text-white
          "
        >
          {item.title}
          <span className="text-[var(--brand-gold)]">.</span>
        </h3>

        <p
          className="
            mt-4

            font-brand-sans
            text-[11px]
            leading-[1.7]

            text-white/68
          "
        >
          {item.description}
        </p>

        {item.secondary && (
          <p
            className="
              mt-3

              font-brand-sans
              text-[10px]
              leading-[1.65]

              text-white/48
            "
          >
            {item.secondary}
          </p>
        )}

        <div className="mt-6">
          <SofaIllustration />
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   MOBILE SUPPORTING CARD
========================================================= */

function MobilePieceCard({ item }: { item: (typeof bespokePieces)[number] }) {
  const Icon = item.icon;

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

          relative

          flex
          items-start

          gap-4

          overflow-hidden

          rounded-[17px]

          px-4
          py-4
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

        <div className="min-w-0">
          <div
            className="
              flex
              items-center
              justify-between

              gap-3
            "
          >
            <span
              className="
                font-brand-sans
                text-[6px]
                font-bold
                uppercase
                tracking-[0.15em]

                text-[var(--brand-gold-700)]
              "
            >
              {item.eyebrow}
            </span>

            <span
              className="
                font-brand-display
                text-[22px]

                text-[var(--brand-navy)]/[0.10]
              "
            >
              {item.number}
            </span>
          </div>

          <h3
            className="
              mt-2

              font-brand-display
              text-[21px]
              font-semibold
              leading-[1.05]

              text-[var(--brand-navy)]
            "
          >
            {item.title}
          </h3>

          <p
            className="
              mt-2.5

              font-brand-sans
              text-[10px]
              leading-[1.65]

              text-[var(--brand-text-muted)]
            "
          >
            {item.description}
          </p>

          {item.secondary && (
            <p
              className="
                mt-2

                font-brand-sans
                text-[9px]
                leading-[1.6]

                text-[var(--brand-text-muted)]
              "
            >
              {item.secondary}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   COMMERCIAL PROJECT CALLOUT
========================================================= */

function CommercialProjectCallout() {
  return (
    <div
      className="
        clay-surface-strong

        rounded-[25px]

        p-[6px]
      "
    >
      <div
        className="
          clay-inset

          flex
          flex-col

          gap-5

          rounded-[20px]

          px-5
          py-5

          sm:flex-row
          sm:items-center
          sm:justify-between

          lg:px-7
        "
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
            <Sparkles size={19} strokeWidth={1.5} />
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
              Hospitality & Commercial
            </span>

            <p
              className="
                mt-1.5
                max-w-[650px]

                font-brand-display
                text-[19px]
                font-semibold
                leading-[1.25]

                text-[var(--brand-navy)]

                sm:text-[21px]
              "
            >
              Planning bespoke seating for a restaurant, café, office or
              hospitality space?
            </p>
          </div>
        </div>

        {/*
          URL فعلی سرویس تجاری پروژه حفظ شده.
          متن قابل مشاهده دیگر از واژه‌ی sofa استفاده نمی‌کند.
        */}

        <ClayButton
          href="/services/commercial-sofas"
          showArrow
          className="
            group

            inline-flex

            shrink-0

            items-center
            justify-between

            gap-4

            rounded-full

            bg-[var(--brand-navy)]

            px-5
            py-3.5

            font-brand-sans
            text-[8px]
            font-bold
            uppercase
            tracking-[0.13em]

            text-white

            transition-transform
            duration-300

            hover:-translate-y-[1px]

            sm:justify-center
          "
        >
          Commercial Projects
        
        </ClayButton>
      </div>
    </div>
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

          bg-[linear-gradient(180deg,#EFE4D5_0%,#FFFDF8_50%,#F5F2EA_100%)]
        "
      />

      {/* LEFT GOLD RING */}

      <div
        className="
          absolute
          -left-[95px]
          top-[170px]

          hidden

          h-[230px]
          w-[230px]

          rounded-full

          border-[3px]
          border-[var(--brand-gold)]/45

          lg:block
        "
      />

      {/* RIGHT SPHERE */}

      <div
        className="
          clay-sphere

          absolute
          -right-[40px]
          bottom-[120px]

          hidden

          h-[125px]
          w-[125px]

          lg:block
        "
      >
        <div className="clay-sphere-shadow" />

        <div className="clay-sphere-ball" />
      </div>
    </div>
  );
}
