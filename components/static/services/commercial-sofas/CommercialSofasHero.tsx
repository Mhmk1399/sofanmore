import Image from "next/image";

import { Building2, Check } from "lucide-react";

import ClayButton from "@/components/ui/ClayButton";

/* =========================================================
   CONFIG
========================================================= */

const HERO_IMAGE = "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/44.webp";

/* =========================================================
   ROOT
========================================================= */

export default function CommercialSofasHero({
  id = "service",
}: {
  id?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby="commercial-sofas-hero-heading"
      className="
        relative scroll-mt-24
        overflow-hidden
        bg-[var(--brand-ivory)]

        px-3
        pb-8
        pt-5 mt-20

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
            MAIN SHELL
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

              bg-[linear-gradient(135deg,#FFFDF8_0%,#F7F1E8_55%,#EEE3D5_100%)]

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
            <div
              className="
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

              <div
                className="
                  relative
                  z-10
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
                    <Building2 size={15} strokeWidth={1.5} />
                  </span>

                  <div>
                    <span
                      className="
                        block

                        font-brand-sans
                        text-[13px]
                        font-bold
                        uppercase
                        tracking-[0.2em]

                        text-[var(--brand-gold-700)]

                        sm:text-[11px]
                      "
                    >
                      Commercial Sofas & Seating · London
                    </span>

                    <span
                      className="
                        mt-1
                        block

                        font-brand-sans
                        text-[12px]
                        font-medium

                        text-[var(--brand-text-muted)]
                      "
                    >
                      Made to measure for commercial spaces
                    </span>
                  </div>
                </div>

                {/* H1 */}

                <h1
                  id="commercial-sofas-hero-heading"
                  className="
                    mt-6

                    max-w-[720px]

                    font-brand-display

                    text-[32px]
                    font-semibold
                    leading-[0.98]

                    tracking-normal

                    text-[var(--brand-navy)]

                    min-[390px]:text-[34px]

                    sm:text-[40px]

                    lg:text-[42px] xl:text-[46px]
                  "
                >
                  Bespoke Commercial Sofas &amp; Seating in London, Made to
                  Measure for Your Business
                  <span className="text-[var(--brand-gold)]">.</span>
                </h1>

                {/* LEAD */}

                <p
                  className="
                    mt-6

                    max-w-[610px]

                    font-brand-display

                    text-[19px]
                    font-semibold
                    italic
                    leading-[1.35]

                    text-[var(--brand-navy)]

                    sm:text-[21px]

                    lg:text-[22px]
                  "
                >
                  Your space needs more than seating that simply looks good.
                </p>

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
                    href="#commercial-sofa-enquiry"
                    variant="gold"
                    size="lg" 
                    showArrow fullWidth
                    className="max-sm:w-full lg:w-auto! max-w-full !min-w-0 !whitespace-normal [&_.snm-button__label]:py-2 [&_.snm-button__label]:leading-snug"
                    ariaLabel="Request a commercial seating quote"
                  >
                    Request a Commercial Seating Quote
                  </ClayButton>

                  <ClayButton
                    href="#commercial-sofa-enquiry"
                    variant="navy"
                    size="lg" fullWidth
                    showArrow
                    className="max-sm:w-full lg:w-auto!  max-w-full !min-w-0 !whitespace-normal [&_.snm-button__label]:py-2 [&_.snm-button__label]:leading-snug"
                    ariaLabel="Send plans and measurements for your commercial seating project"
                  >
                    Send Plans &amp; Measurements
                  </ClayButton>
                </div>

                {/* BODY */}

                <div
                  className="
                    mt-5

                    max-w-[650px]

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
                    At Sofa N More, we design and manufacture bespoke commercial
                    sofas and contract seating in London for restaurants, cafés,
                    hotels, offices and hospitality spaces where comfort,
                    layout, durability and brand character all matter.
                  </p>

                  <p>
                    From custom restaurant seating, sofas and banquettes to
                    booth seating, upholstered commercial chairs, hotel lounge
                    seating and office sofas, every project is developed around
                    the exact space, intended use and requirements of the
                    business.
                  </p>

                  <p>
                    Choose the dimensions, configuration, upholstery, materials
                    and finishing details that suit your project. Every
                    commercial seating project is made to order around your
                    business and space rather than selected from ready-made
                    stock.
                  </p>
                </div>

                {/* =================================================
                    QUICK TRUST POINTS
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
                  <TrustPoint>Made to Measure</TrustPoint>

                  <TrustPoint>London Workshop</TrustPoint>

                  <TrustPoint>Commercial Projects</TrustPoint>
                  <TrustPoint note="No Ready-Made Stock">
                    Made to Order
                  </TrustPoint>
                </div>
              </div>

              {/* =================================================
                  IMAGE
              ================================================== */}

              <div
                className="
                  relative

                  mx-auto

                  w-full
                  max-w-[720px]
                "
              >
                <HeroImage />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   TRUST POINT
========================================================= */

function TrustPoint({
  children,
  note,
}: {
  children: React.ReactNode;
  note?: string;
}) {
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

          text-[11px]
          font-bold
          uppercase

          tracking-[0.1em]

          text-[var(--brand-navy)]

          sm:text-[12px]
        "
      >
        {children}
        {note && (
          <span className="mt-1 block text-[11px] font-medium normal-case tracking-normal text-[var(--brand-text-muted)]">
            {note}
          </span>
        )}
      </span>
    </div>
  );
}

/* =========================================================
   IMAGE
========================================================= */

function HeroImage() {
  return (
    <div
      className="
        clay-surface-strong

        relative

        rounded-[27px]
        p-[6px]

        sm:rounded-[32px]
        sm:p-[7px]
      "
    >
      <div
        className="
          clay-inset

          relative
          overflow-hidden

          rounded-[21px]

          bg-[#E8DED1]

          p-[5px]

          sm:rounded-[25px]
          sm:p-[6px]
        "
      >
        {/* ===============================================
            IMAGE WELL
        ================================================ */}

        <div
          className="
            relative

            aspect-[5/3]

            w-full

            overflow-hidden

            rounded-[17px]

            bg-[#DED4C7]

            sm:rounded-[20px]
          "
        >
          <Image
            src={HERO_IMAGE}
            alt="Bespoke commercial sofa and contract seating project by Sofa N More in London"
            fill
            preload
            sizes="(max-width: 1023px) 100vw, 52vw"
            className="
              
              object-cover object-center
            "
          />

          {/* very subtle contrast layer */}

          <div
            aria-hidden
            className="
              pointer-events-none

              absolute
              inset-0

              bg-[linear-gradient(180deg,transparent_70%,rgba(11,25,41,0.08)_100%)]
            "
          />
        </div>

        {/* ===============================================
            IMAGE CAPTION
        ================================================ */}

        <div
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
          <div>
            <span
              className="
                block

                font-brand-sans

                text-[13px]
                font-bold
                uppercase

                tracking-[0.16em]

                text-[var(--brand-gold-700)]
              "
            >
              Commercial Seating
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
              Designed around the space.
            </p>
          </div>

          <span
            className="
              hidden

              font-brand-sans

              text-[13px]
              font-bold
              uppercase

              tracking-[0.14em]

              text-[var(--brand-text-muted)]

              sm:block
            "
          >
            London · Sofa N More
          </span>
        </div>
      </div>
    </div>
  );
}
