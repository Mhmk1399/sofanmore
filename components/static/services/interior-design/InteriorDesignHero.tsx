import Image from "next/image";

import { Check, Home, PhoneCall, Sparkles } from "lucide-react";

import ClayButton from "@/components/ui/ClayButton";

/* =========================================================
   CONFIG
========================================================= */
const PHONE_NUMBER = "+447400577844";
const HERO_IMAGE = "/assets/images/Interior.webp";

const heroPoints = [
  "Residential Interiors",
  "Commercial Spaces",
  "Bespoke Sofas",
];

/* =========================================================
   ROOT
========================================================= */

export default function InteriorDesignHero({ id = "service" }: { id?: string }) {
  return (
    <section
      id={id}
      aria-labelledby="interior-design-hero-heading"
      className="
        relative mt-20 scroll-mt-24
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

              relative
              overflow-hidden

              rounded-[24px]

              bg-[linear-gradient(135deg,#FFFDF8_0%,#F7F1E8_56%,#EFE5D8_100%)]

              px-5
              py-6

              sm:rounded-[29px]
              sm:px-7
              sm:py-8

              lg:rounded-[34px]
              lg:px-9
              lg:py-9

              xl:px-11
              xl:py-10
            "
          >
            <SubtleBackground />

            <div
              className="
                relative
                z-10

                grid
                gap-8

                lg:grid-cols-[0.96fr_1.04fr]
                lg:items-center
                lg:gap-12

                xl:gap-16
              "
            >
              {/* =================================================
                  CONTENT
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

                      items-center
                      justify-center

                      rounded-full

                      bg-[var(--brand-navy)]

                      text-[var(--brand-gold)]
                    "
                  >
                    <Sparkles size={15} strokeWidth={1.5} />
                  </span>

                  <div>
                    <span
                      className="
                        block

                        font-brand-sans

                        text-[7px]
                        font-bold
                        uppercase

                        tracking-[0.2em]

                        text-[var(--brand-gold-700)]

                        sm:text-[8px]
                      "
                    >
                      Interior Design · London
                    </span>

                    <span
                      className="
                        mt-1
                        block

                        font-brand-sans

                        text-[9px]
                        font-medium

                        text-[var(--brand-text-muted)]
                      "
                    >
                      Residential & Commercial Interiors
                    </span>
                  </div>
                </div>

                {/* =================================================
                    H1
                ================================================== */}

                <h1
                  id="interior-design-hero-heading"
                  className="
                    mt-6

                    max-w-[760px]

                    font-brand-display

                    text-[39px]
                    font-semibold
                    leading-[0.98]

                    tracking-[-0.04em]

                    text-[var(--brand-navy)]

                    min-[390px]:text-[43px]

                    sm:text-[51px]

                    lg:text-[clamp(49px,4.3vw,66px)]
                  "
                >
                  Interior Design in London, Shaped Around the Way You Live &
                  Work
                  <span
                    className="
                      text-[var(--brand-gold)]
                    "
                  >
                    .
                  </span>
                </h1>

                {/* =================================================
                    LEAD
                ================================================== */}

                <p
                  className="
                    mt-6

                    max-w-[650px]

                    font-brand-display

                    text-[19px]
                    font-medium
                    italic
                    leading-[1.4]

                    text-[var(--brand-navy)]

                    sm:text-[21px]

                    lg:text-[22px]
                  "
                >
                  A beautiful interior should do more than look impressive. It
                  should feel completely natural to the people who use it.
                </p>

                {/* =================================================
                    BODY
                ================================================== */}

                <div
                  className="
                    mt-5

                    max-w-[670px]

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
                    At Sofa N More, we create bespoke interior design solutions
                    in London for residential and commercial spaces, bringing
                    together layout, colour, materials, bespoke sofas and
                    carefully considered details to create interiors that feel
                    coherent from the moment you enter.
                  </p>

                  <p>
                    Whether you are redesigning your home, transforming a
                    restaurant or café, creating a more welcoming office or
                    developing a complete hospitality interior, every project
                    begins with the same question:
                  </p>
                </div>

                {/* =================================================
                    CORE QUESTION
                ================================================== */}

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

                      tracking-[0.18em]

                      text-[var(--brand-gold-700)]
                    "
                  >
                    The Starting Point
                  </span>

                  <p
                    className="
                      mt-1.5

                      max-w-[590px]

                      font-brand-display

                      text-[21px]
                      font-semibold
                      leading-[1.3]

                      text-[var(--brand-navy)]

                      sm:text-[24px]
                    "
                  >
                    How should this space look, feel and work for you?
                  </p>
                </div>

                {/* =================================================
                    FINAL COPY
                ================================================== */}

                <p
                  className="
                    mt-5

                    max-w-[650px]

                    font-brand-sans

                    text-[12px]
                    font-medium
                    leading-[1.75]

                    text-[var(--brand-text-muted)]

                    sm:text-[13px]

                    lg:text-[14px]
                  "
                >
                  From the first idea through to the finished interior, we help
                  turn that answer into a space with purpose, character and a
                  clear point of view.
                </p>

                {/* =================================================
                    QUICK POINTS
                ================================================== */}

                <div
                  className="
                    mt-6

                    flex
                    flex-wrap

                    gap-x-5
                    gap-y-2.5
                  "
                >
                  {heroPoints.map((point) => (
                    <HeroPoint key={point} label={point} />
                  ))}
                </div>

                {/* =================================================
                    CTA
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
                    href="#interior-design-enquiry"
                    variant="gold"
                    size="lg"
                    showArrow
                    className="max-sm:w-full"
                    ariaLabel="Start your interior design project with Sofa N More"
                  >
                    Start Your Interior Design Project
                  </ClayButton>

                     <ClayButton
                    href={`tel:${PHONE_NUMBER}`}
                    variant="navy"
                    size="lg"
                    startIcon={<PhoneCall size={16} strokeWidth={1.7} />}
                    className="max-sm:w-full"
                    ariaLabel="Call Sofa N More"
                  >
                    Call Us
                  </ClayButton>
                </div>
              </div>

              {/* =================================================
                  IMAGE
              ================================================== */}

              <div
                className="
                  mx-auto

                  w-full
                  max-w-[720px]
                "
              >
                <InteriorHeroImage />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   HERO POINT
========================================================= */

function HeroPoint({ label }: { label: string }) {
  return (
    <div
      className="
        flex
        items-center
        gap-2
      "
    >
      <span
        className="
          flex
          h-5
          w-5

          shrink-0

          items-center
          justify-center

          rounded-full

          bg-[var(--brand-navy)]

          text-[var(--brand-gold)]
        "
      >
        <Check size={10} strokeWidth={2} />
      </span>

      <span
        className="
          font-brand-sans

          text-[8px]
          font-bold
          uppercase

          tracking-[0.1em]

          text-[var(--brand-navy)]

          sm:text-[9px]
        "
      >
        {label}
      </span>
    </div>
  );
}

/* =========================================================
   HERO IMAGE
========================================================= */

function InteriorHeroImage() {
  return (
    <figure
      className="
        clay-surface-strong

        rounded-[27px]
        p-[6px]

        sm:rounded-[32px]
        sm:p-[7px]
      "
    >
      <div
        className="
          clay-inset

          overflow-hidden

          rounded-[21px]

          bg-[#E6DDD1]

          p-[5px]

          sm:rounded-[25px]
          sm:p-[6px]
        "
      >
        {/* IMAGE */}

        <div
          className="
            relative

            aspect-[4/3]

            w-full

            overflow-hidden

            rounded-[17px]

            bg-[#DED5CA]

            sm:rounded-[20px]
          "
        >
          <Image
            src={HERO_IMAGE}
            alt="Bespoke interior design project by Sofa N More in London"
            fill
            preload
            sizes="(max-width: 1023px) 100vw, 52vw"
            className="
               object-cover
            "
          />
        </div>

        {/* =====================================================
            CAPTION
        ====================================================== */}

        <figcaption
          className="
            flex
            items-center
            justify-between

            gap-4

            px-2
            pb-1
            pt-4

            sm:px-3
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
              <Home size={14} strokeWidth={1.5} />
            </span>

            <div>
              <span
                className="
                  block

                  font-brand-sans

                  text-[6px]
                  font-bold
                  uppercase

                  tracking-[0.16em]

                  text-[var(--brand-gold-700)]
                "
              >
                Designed as One Interior
              </span>

              <p
                className="
                  mt-1

                  font-brand-display

                  text-[16px]
                  font-semibold

                  text-[var(--brand-navy)]

                  sm:text-[18px]
                "
              >
                Space. Material. Sofa. Detail.
              </p>
            </div>
          </div>

          <span
            className="
              hidden

              font-brand-sans

              text-[6px]
              font-bold
              uppercase

              tracking-[0.14em]

              text-[var(--brand-text-muted)]

              sm:block
            "
          >
            Sofa N More · London
          </span>
        </figcaption>
      </div>
    </figure>
  );
}

/* =========================================================
   SUBTLE BACKGROUND
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
      {/* VERY SUBTLE GOLD ARC */}

      <div
        className="
          absolute

          -right-[100px]
          -top-[130px]

          hidden

          h-[270px]
          w-[270px]

          rounded-full

          border
          border-[var(--brand-gold)]/12

          lg:block
        "
      />

      {/* SMALL IVORY LIGHT */}

      <div
        className="
          absolute

          -bottom-[100px]
          left-[35%]

          hidden

          h-[220px]
          w-[390px]

          rounded-full

          bg-white/20

          blur-3xl

          lg:block
        "
      />
    </div>
  );
}
