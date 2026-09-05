import Image from "next/image";

import {
  Check,
  Crown,
  Hammer,
  MapPin,
  Navigation,
  Ruler,
  Sparkles,
} from "lucide-react";

import ClayButton from "@/components/ui/ClayButton";

/* =========================================================
   DATA
========================================================= */

const workshopDetails = {
  name: "Sofa N More",

  addressLines: [
    "Unit G19, Atlas Business Centre",
    "Oxgate Lane, Staples Corner West",
    "London NW2 7HJ",
  ],

  location: "North West London",
};

/* =========================================================
   ROOT
========================================================= */

export default function MadeInLondonSection() {
  return (
    <section
      aria-labelledby="made-in-london-heading"
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
        {/* =====================================================
            OUTER SHELL
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

              bg-[linear-gradient(145deg,#FFFDF8_0%,#F5EEE4_51%,#EADCCB_100%)]

              px-4
              py-6

              sm:rounded-[35px]
              sm:px-6
              sm:py-8

              lg:min-h-[720px]
              lg:rounded-[41px]
              lg:px-10
              lg:py-10

              xl:px-12
              xl:py-12
            "
          >
            <ArchitecturalBackground />

            {/* =================================================
                MAIN GRID
            ================================================== */}

            <div
              className="
                relative
                z-20

                grid
                gap-9

                lg:min-h-[620px]
                lg:grid-cols-[1.08fr_0.92fr]
                lg:items-center
                lg:gap-12

                xl:gap-16
              "
            >
              {/* =================================================
                  WORKSHOP VISUAL
              ================================================== */}

              <div
                className="
                  relative
                  min-h-[490px]

                  sm:min-h-[580px]

                  lg:min-h-[620px]
                "
              >
                <WorkshopVisual />
              </div>

              {/* =================================================
                  CONTENT
              ================================================== */}

              <div
                className="
                  relative
                  z-20

                  lg:pr-3

                  xl:pr-7
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
                    London Craftsmanship
                  </span>
                </div>

                {/* HEADING */}

                <h2
                  id="made-in-london-heading"
                  className="
                    mt-5

                    max-w-[610px]

                    font-brand-display

                    text-[40px]
                    font-semibold
                    leading-[0.97]

                    tracking-[-0.04em]

                    text-[var(--brand-navy)]

                    min-[390px]:text-[44px]

                    sm:text-[51px]

                    lg:text-[clamp(50px,4.3vw,68px)]
                  "
                >
                  Made in
                  <br className="hidden sm:block" />
                  London
                  <span className="text-[var(--brand-gold)]">.</span>
                </h2>

                {/* INTRO */}

                <p
                  className="
                    mt-6

                    max-w-[545px]

                    font-brand-display

                    text-[20px]
                    font-medium
                    italic
                    leading-[1.38]

                    text-[var(--brand-navy)]

                    sm:text-[21px]

                    lg:text-[22px]
                  "
                >
                  Designed, developed and crafted from our London workshop.
                </p>

                {/* BODY */}

                <div
                  className="
                    mt-6

                    max-w-[565px]

                    space-y-4

                    font-brand-sans

                    text-[12px]
                    font-medium
                    leading-[1.78]

                    text-[var(--brand-text-muted)]

                    sm:text-[13px]

                    lg:text-[14px]
                  "
                >
                  <p>
                    Sofa N More creates bespoke sofas, seating and custom pieces
                    from its London workshop, combining design, material
                    selection and craftsmanship around individual spaces.
                  </p>

                  <p>
                    Being able to discuss a project directly with the people
                    involved in creating it also makes it easier to explore the
                    details that standard designs cannot accommodate.
                  </p>

                  <p
                    className="
                      font-semibold

                      text-[var(--brand-navy)]
                    "
                  >
                    Our workshop is located in North West London.
                  </p>
                </div>

                {/* =================================================
                    VALUES
                ================================================== */}

                <div
                  className="
                    mt-7

                    grid
                    grid-cols-3

                    gap-2.5
                  "
                >
                  <ValueItem icon={Hammer} label="London Workshop" />

                  <ValueItem icon={Ruler} label="Made to Measure" />

                  <ValueItem icon={Sparkles} label="Made with Care" />
                </div>

                {/* =================================================
                    ADDRESS CARD
                ================================================== */}

                <div className="mt-7">
                  <WorkshopAddressCard />
                </div>

                {/* =================================================
                    CTA
                ================================================== */}

                <div
                  className="
                    mt-7

                    sm:w-fit

                    lg:mt-8
                  "
                >
                  <ClayButton
                    href="/contact-us"
                    variant="gold"
                    size="lg"
                    showArrow
                    className="max-sm:w-full"
                  >
                    Contact Our London Workshop
                  </ClayButton>
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
   WORKSHOP VISUAL
========================================================= */

function WorkshopVisual() {
  return (
    <div
      className="
        relative
        h-full
        min-h-[490px]

        sm:min-h-[580px]

        lg:min-h-[620px]
      "
    >
      {/* =====================================================
          LARGE ARCH
      ====================================================== */}

      <div
        className="
          clay-surface-strong

          absolute

          inset-x-[2%]
          bottom-[28px]
          top-0

          rounded-t-[48%]
          rounded-b-[30px]

          p-[7px]

          sm:inset-x-[5%]
          sm:p-[9px]

          lg:inset-x-[2%]
        "
      >
        <div
          className="
            clay-inset

            relative
            h-full

            overflow-hidden

            rounded-t-[47%]
            rounded-b-[23px]

            bg-[#D8CABA]
          "
        >
          <Image
            src="https://sofanmore.s3.eu-west-2.amazonaws.com/Image/Repair.webp"
            alt="Sofa N More London workshop craftsmanship"
            fill
            sizes="(max-width: 1023px) 100vw, 54vw"
            className="
              object-cover
              object-center
            "
          />

          {/* DARK GRADING */}

          <div
            className="
              pointer-events-none

              absolute
              inset-0

              bg-[linear-gradient(180deg,rgba(8,20,34,0.03)_0%,transparent_45%,rgba(8,20,34,0.42)_100%)]
            "
          />

          <div
            className="
              pointer-events-none

              absolute
              inset-0

              bg-[linear-gradient(90deg,rgba(255,253,248,0.10),transparent_30%,transparent_78%,rgba(11,25,41,0.12))]
            "
          />

          {/* INNER BORDER */}

          <div
            className="
              pointer-events-none

              absolute
              inset-[8px]

              rounded-t-[47%]
              rounded-b-[17px]

              border
              border-white/30
            "
          />

          {/* =================================================
              BOTTOM IMAGE LABEL
          ================================================== */}

          <div
            className="
              absolute
              bottom-5
              left-5
              right-5

              z-20
            "
          >
            <div
              className="
                flex
                items-end
                justify-between

                gap-5
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

                    text-[var(--brand-gold)]
                  "
                >
                  Crafted in London
                </span>

                <p
                  className="
                    mt-1

                    max-w-[270px]

                    font-brand-display

                    text-[19px]
                    font-medium
                    leading-[1.16]

                    text-white

                    sm:text-[23px]
                  "
                >
                  From the first idea to the final detail.
                </p>
              </div>

              <div
                className="
                  hidden

                  h-11
                  w-11

                  shrink-0

                  items-center
                  justify-center

                  rounded-full

                  border
                  border-white/20

                  bg-white/10

                  backdrop-blur-sm

                  sm:flex
                "
              >
                <Hammer
                  size={18}
                  strokeWidth={1.5}
                  className="
                    text-[var(--brand-gold)]
                  "
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          MADE IN LONDON BADGE
      ====================================================== */}

      <div
        className="
          clay-surface-strong

          absolute

          left-0
          top-[19%]

          z-30

          rounded-[24px]

          p-[5px]
        "
      >
        <div
          className="
            clay-dark

            flex
            items-center
            gap-3

            rounded-[19px]

            px-3
            py-3

            sm:px-4
          "
        >
          <div
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
            <Crown size={16} strokeWidth={1.5} />
          </div>

          <div>
            <span
              className="
                block

                font-brand-sans

                text-[13px]
                font-bold
                uppercase

                tracking-[0.15em]

                text-[var(--brand-gold)]
              "
            >
              Sofa N More
            </span>

            <strong
              className="
                mt-0.5
                block

                font-brand-display

                text-[15px]
                font-semibold

                text-white
              "
            >
              Made in London
            </strong>
          </div>
        </div>
      </div>

      {/* =====================================================
          NW LONDON BADGE
      ====================================================== */}

      <div
        className="
          clay-surface-strong

          absolute

          bottom-[3%]
          right-0

          z-30

          rounded-[22px]

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

            sm:px-4
          "
        >
          <div
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
            <MapPin size={17} strokeWidth={1.5} />
          </div>

          <div>
            <span
              className="
                block

                font-brand-sans

                text-[13px]
                font-bold
                uppercase

                tracking-[0.15em]

                text-[var(--brand-gold-700)]
              "
            >
              Workshop
            </span>

            <strong
              className="
                mt-0.5
                block

                whitespace-nowrap

                font-brand-display

                text-[14px]
                font-semibold

                text-[var(--brand-navy)]
              "
            >
              North West London
            </strong>
          </div>
        </div>
      </div>

      {/* =====================================================
          GOLD ORBIT
      ====================================================== */}

      <svg
        aria-hidden
        viewBox="0 0 500 500"
        className="
          pointer-events-none

          absolute

          -right-[3%]
          -top-[4%]

          z-10

          h-[45%]
          w-[45%]
        "
      >
        <defs>
          <radialGradient id="madeLondonGoldSphere" cx="30%" cy="25%" r="72%">
            <stop offset="0%" stopColor="#FFE8AD" />

            <stop offset="48%" stopColor="#D7A04A" />

            <stop offset="100%" stopColor="#955D19" />
          </radialGradient>
        </defs>

        <path
          d="
            M45 405

            C76 200
             205 72
             416 62
          "
          fill="none"
          stroke="#D7A04A"
          strokeWidth="2"
        />

        <circle cx="416" cy="62" r="14" fill="url(#madeLondonGoldSphere)" />
      </svg>
    </div>
  );
}

/* =========================================================
   VALUE ITEM
========================================================= */

function ValueItem({
  icon: Icon,
  label,
}: {
  icon: typeof Hammer;
  label: string;
}) {
  return (
    <div
      className="
        clay-surface-soft

        rounded-[18px]

        p-[4px]
      "
    >
      <div
        className="
          clay-inset

          flex
          min-h-[82px]

          flex-col

          items-center
          justify-center

          gap-2

          rounded-[14px]

          px-2
          py-3

          text-center
        "
      >
        <Icon
          size={16}
          strokeWidth={1.5}
          className="
            text-[var(--brand-gold-700)]
          "
        />

        <span
          className="
            font-brand-sans

            text-[13px]
            font-bold
            uppercase

            leading-[1.4]

            tracking-[0.1em]

            text-[var(--brand-navy)]

            sm:text-[13px]
          "
        >
          {label}
        </span>
      </div>
    </div>
  );
}

/* =========================================================
   ADDRESS CARD
========================================================= */

function WorkshopAddressCard() {
  return (
    <address
      className="
        clay-surface-strong

        not-italic

        rounded-[26px]

        p-[6px]
      "
    >
      <div
        className="
          clay-inset

          relative

          overflow-hidden

          rounded-[21px]

          px-4
          py-4

          sm:px-5
          sm:py-5
        "
      >
        {/* ARCH */}

        <div
          aria-hidden
          className="
            absolute

            -bottom-[75px]
            -right-[35px]

            h-[150px]
            w-[120px]

            rounded-t-[50%]

            border-[11px]
            border-[#E8DCCB]/45
          "
        />

        <div
          className="
            relative
            z-10

            flex
            items-start
            gap-4
          "
        >
          {/* ICON */}

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
            <Navigation size={18} strokeWidth={1.5} />
          </div>

          {/* CONTENT */}

          <div
            className="
              min-w-0
              flex-1
            "
          >
            <div
              className="
                flex
                flex-wrap

                items-center
                justify-between

                gap-3
              "
            >
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
                  London Workshop
                </span>

                <h3
                  className="
                    mt-1

                    font-brand-display

                    text-[20px]
                    font-semibold

                    text-[var(--brand-navy)]
                  "
                >
                  {workshopDetails.name}
                </h3>
              </div>

              <div
                className="
                  hidden

                  items-center
                  gap-2

                  rounded-full

                  border
                  border-[var(--brand-gold)]/25

                  px-3
                  py-2

                  sm:flex
                "
              >
                <Check
                  size={11}
                  strokeWidth={1.7}
                  className="
                    text-[var(--brand-gold-700)]
                  "
                />

                <span
                  className="
                    font-brand-sans

                    text-[13px]
                    font-bold
                    uppercase

                    tracking-[0.13em]

                    text-[var(--brand-navy)]
                  "
                >
                  {workshopDetails.location}
                </span>
              </div>
            </div>

            <div
              className="
                mt-3

                font-brand-sans

                text-[13px]
                font-medium
                leading-[1.65]

                text-[var(--brand-text-muted)]

                sm:text-[11px]
              "
            >
              {workshopDetails.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </address>
  );
}

/* =========================================================
   ARCHITECTURAL BACKGROUND
========================================================= */

function ArchitecturalBackground() {
  return (
    <>
      {/* ===================================================
          TOP CURVE
      ==================================================== */}

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
            V73

            C1266 41
             1148 44
             1051 102

            C935 171
             801 194
             687 156

            C562 115
             453 81
             329 92

            C202 103
             93 80
             0 43

            Z
          "
          fill="#F2E8DA"
          opacity="0.7"
        />

        <path
          d="
            M0 57

            C112 89
             214 116
             330 104

            C450 91
             562 122
             686 164

            C806 205
             941 182
             1055 112

            C1150 54
             1267 53
             1400 84
          "
          fill="none"
          stroke="#FFFDF8"
          strokeWidth="6"
          opacity="0.58"
        />
      </svg>

      {/* ===================================================
          LEFT FLUTES
      ==================================================== */}

      <div
        aria-hidden
        className="
          pointer-events-none

          absolute

          bottom-0
          left-[3%]

          z-0

          hidden

          h-[150px]

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

              bg-[#E5D8C7]

              shadow-[inset_1px_0_1px_rgba(255,255,255,0.7)]
            "
          />
        ))}
      </div>

      {/* ===================================================
          RIGHT ARCH
      ==================================================== */}

      <div
        aria-hidden
        className="
          pointer-events-none

          absolute

          -right-[105px]
          bottom-[4%]

          z-0

          hidden

          h-[350px]
          w-[245px]

          rounded-l-[50%]

          border-[16px]
          border-[#E8DCCB]/34

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

          bg-[linear-gradient(180deg,#EEE2D2_0%,#FFFDF8_48%,#F5F2EA_100%)]
        "
      />

      {/* LEFT GOLD RING */}

      <div
        className="
          absolute

          -left-[105px]
          top-[180px]

          hidden

          h-[240px]
          w-[240px]

          rounded-full

          border-[3px]
          border-[var(--brand-gold)]/42

          lg:block
        "
      />

      {/* RIGHT SPHERE */}

      <div
        className="
          clay-sphere

          absolute

          -right-[43px]
          bottom-[110px]

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
