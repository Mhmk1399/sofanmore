import Image from "next/image";

import { Building2, MapPin, Palette, Sofa } from "lucide-react";

import ClayButton from "@/components/ui/ClayButton";

/* =========================================================
   ROOT
========================================================= */

export default function InteriorDesignLondonBaseSection() {
  return (
    <section
      aria-labelledby="interior-design-london-base-heading"
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
      <div className="mx-auto max-w-[var(--site-width)]">
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
                MAIN GRID
            ================================================== */}

            <div
              className="
                grid
                gap-8

                lg:grid-cols-[0.92fr_1.08fr]
                lg:items-center
                lg:gap-12

                xl:gap-16
              "
            >
              {/* =================================================
                  IMAGE / LONDON BASE
              ================================================== */}

              <LondonBaseVisual />

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

                      shrink-0

                      items-center
                      justify-center

                      rounded-full

                      bg-[var(--brand-navy)]

                      text-[var(--brand-gold)]
                    "
                  >
                    <MapPin size={15} strokeWidth={1.5} />
                  </span>

                  <div>
                    <span
                      className="
                        block

                        font-brand-sans

                        text-[8px]
                        font-bold
                        uppercase

                        tracking-[0.2em]

                        text-[var(--brand-gold-700)]

                        sm:text-[9px]
                      "
                    >
                      Sofa N More · London
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
                      North West London
                    </span>
                  </div>
                </div>

                {/* HEADING */}

                <h2
                  id="interior-design-london-base-heading"
                  className="
                    mt-5

                    max-w-[710px]

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
                  Interior Design from Our London Base
                  <span className="text-[var(--brand-gold)]">.</span>
                </h2>

                {/* INTRO */}

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
                  "
                >
                  Sofa N More is based in North West London and works with
                  clients looking to create tailored residential and commercial
                  spaces.
                </p>

                {/* BODY */}

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
                  Our interior design service brings together creative direction
                  and our experience in bespoke sofas, allowing the seating and
                  wider interior to be considered as part of one project.
                </p>

                {/* =================================================
                    CONNECTED APPROACH
                ================================================== */}

                <div
                  className="
                    mt-6

                    grid
                    gap-2.5

                    sm:grid-cols-2
                  "
                >
                  <ApproachItem
                    icon={<Palette size={14} strokeWidth={1.5} />}
                    eyebrow="Interior Direction"
                    title="Creative thinking across the space."
                  />

                  <ApproachItem
                    icon={<Sofa size={14} strokeWidth={1.5} />}
                    eyebrow="Bespoke Sofa Experience"
                    title="Seating developed with the interior."
                  />
                </div>

                {/* =================================================
                    ADDRESS
                ================================================== */}

                <div
                  className="
                    mt-6

                    rounded-[20px]

                    bg-[var(--brand-navy)]

                    px-4
                    py-4

                    sm:px-5
                    sm:py-5
                  "
                >
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

                        bg-[var(--brand-gold)]

                        text-[var(--brand-navy)]
                      "
                    >
                      <Building2 size={14} strokeWidth={1.5} />
                    </span>

                    <div>
                      <span
                        className="
                          font-brand-sans

                          text-[6px]
                          font-bold
                          uppercase

                          tracking-[0.18em]

                          text-[var(--brand-gold)]
                        "
                      >
                        Our London Base
                      </span>

                      <address
                        className="
                          mt-2

                          not-italic

                          font-brand-sans

                          text-[11px]
                          font-medium
                          leading-[1.65]

                          text-white/72

                          sm:text-[12px]
                        "
                      >
                        <strong
                          className="
                            block

                            font-brand-display

                            text-[18px]
                            font-semibold

                            text-white

                            sm:text-[20px]
                          "
                        >
                          Sofa N More
                        </strong>

                        <span className="mt-1 block">
                          Unit G19, Atlas Business Centre
                        </span>

                        <span className="block">
                          Oxgate Lane, Staples Corner West
                        </span>

                        <span className="block">London NW2 7HJ</span>
                      </address>
                    </div>
                  </div>
                </div>

                {/* =================================================
                    CTA
                ================================================== */}

                <div className="mt-7">
                  <ClayButton
                    href="/contact-us"
                    variant="gold"
                    size="lg"
                    showArrow
                    className="max-sm:w-full"
                    ariaLabel="Book an interior design consultation with Sofa N More"
                  >
                    Book an Interior Design Consultation
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
   LONDON BASE VISUAL
========================================================= */

function LondonBaseVisual() {
  return (
    <figure
      className="
        mx-auto

        w-full
        max-w-[650px]

        clay-surface-strong

        rounded-[27px]
        p-[6px]

        sm:rounded-[31px]
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

          sm:rounded-[24px]
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
            src="/assets/site/69.webp"
            alt="Sofa N More London workshop"
            fill
            sizes="(max-width: 1023px) 100vw, 46vw"
            className="
              object-cover
              object-center
            "
          />
        </div>

        {/* CAPTION */}

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
              <MapPin size={14} strokeWidth={1.5} />
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
                Based in London
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
                Design with a local foundation.
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
            NW2 · London
          </span>
        </figcaption>
      </div>
    </figure>
  );
}

/* =========================================================
   APPROACH ITEM
========================================================= */

function ApproachItem({
  icon,
  eyebrow,
  title,
}: {
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
}) {
  return (
    <div
      className="
        clay-surface-soft

        flex
        items-start
        gap-3

        rounded-[17px]

        px-3.5
        py-3.5
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
        {icon}
      </span>

      <div>
        <span
          className="
            font-brand-sans

            text-[5px]
            font-bold
            uppercase

            tracking-[0.14em]

            text-[var(--brand-gold-700)]
          "
        >
          {eyebrow}
        </span>

        <p
          className="
            mt-1

            font-brand-display

            text-[15px]
            font-semibold
            leading-[1.25]

            text-[var(--brand-navy)]

            sm:text-[16px]
          "
        >
          {title}
        </p>
      </div>
    </div>
  );
}
