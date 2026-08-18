import Image from "next/image";

import { Check, Hammer, Heart, PhoneCall, Sparkles } from "lucide-react";

import ClayButton from "@/components/ui/ClayButton";

/* =========================================================
   CONFIG
========================================================= */

const HERO_IMAGE = "/assets/images/Repair.webp";

const heroPoints = [
  "Professional Repair",
  "Careful Restoration",
  "London Workshop",
];

/* =========================================================
   ROOT
========================================================= */

export default function SofaRepairHero({ id = "service" }: { id?: string }) {
  return (
    <section
      id={id}
      aria-labelledby="sofa-repair-hero-heading"
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

              relative
              overflow-hidden

              rounded-[24px]

              bg-[linear-gradient(135deg,#FFFDF8_0%,#F7F1E8_56%,#EEE4D6_100%)]

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

                lg:grid-cols-[0.97fr_1.03fr]
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

                        tracking-[0.2em]

                        text-[var(--brand-gold-700)]

                        sm:text-[8px]
                      "
                    >
                      Sofa Repair & Restoration
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
                      Skilled Restoration · London
                    </span>
                  </div>
                </div>

                {/* =================================================
                    H1
                ================================================== */}

                <h1
                  id="sofa-repair-hero-heading"
                  className="
                    mt-6

                    max-w-[780px]

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
                  Sofa Repair & Restoration in London, Made to Last Again
                  <span className="text-[var(--brand-gold)]">.</span>
                </h1>

                {/* =================================================
                    LEAD
                ================================================== */}

                <p
                  className="
                    mt-6

                    max-w-[620px]

                    font-brand-display

                    text-[20px]
                    font-medium
                    italic
                    leading-[1.4]

                    text-[var(--brand-navy)]

                    sm:text-[22px]
                  "
                >
                  Some sofas deserve more than replacing.
                </p>

                {/* =================================================
                    BODY
                ================================================== */}

                <div
                  className="
                    mt-5

                    max-w-[680px]

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
                    A sofa may have years of life, memories and character behind
                    it — even when time, everyday use or damage has changed the
                    way it looks and feels.
                  </p>

                  <p>
                    At Sofa N More, we provide professional sofa repair and
                    restoration in London, helping bring worn, damaged and
                    much-loved sofas back to a condition in which they can be
                    enjoyed again.
                  </p>

                  <p>
                    From contemporary sofas that need careful attention to older
                    pieces worth preserving, every project begins by
                    understanding the sofa, its condition and what you would
                    like to restore.
                  </p>
                </div>

                {/* =================================================
                    CORE MESSAGE
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

                      tracking-[0.17em]

                      text-[var(--brand-gold-700)]
                    "
                  >
                    Another Life
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
                    Because sometimes the right answer isn&apos;t a new sofa.
                    It&apos;s giving the right sofa another life.
                  </p>
                </div>

                {/* =================================================
                    TRUST POINTS
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
                    href="#sofa-repair-enquiry"
                    variant="gold"
                    size="lg"
                    showArrow
                    className="max-sm:w-full"
                    ariaLabel="Request a sofa repair assessment from Sofa N More"
                  >
                    Request a Sofa Repair Assessment
                  </ClayButton>

                  <ClayButton
                    href="tel:+447400577844"
                    variant="navy"
                    size="lg"
                    startIcon={<PhoneCall size={16} strokeWidth={1.7} />}
                    className="max-sm:w-full"
                    ariaLabel="Call Sofa N More about your sofa repair"
                  >
                    Call Our London Team
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
                <RepairHeroVisual />
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
   REPAIR VISUAL
========================================================= */

function RepairHeroVisual() {
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

          bg-[#E5DBCE]

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

            bg-[#DDD3C7]

            sm:rounded-[20px]
          "
        >
          <Image
            src={HERO_IMAGE}
            alt="Sofa repair and restoration craftsmanship at Sofa N More in London"
            fill
            preload
            sizes="(max-width: 1023px) 100vw, 52vw"
            className="
              object-cover
              object-center
            "
          />
        </div>

        {/* =====================================================
            CAPTION
        ====================================================== */}

        <figcaption
          className="
            grid
            gap-3

            px-2
            pb-1
            pt-4

            sm:grid-cols-[1fr_auto]
            sm:items-center
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
              <Heart size={14} strokeWidth={1.5} />
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
                Restore What Is Worth Keeping
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
                Comfort. Character. Craftsmanship.
              </p>
            </div>
          </div>

          <div
            className="
              hidden

              items-center
              gap-2

              sm:flex
            "
          >
            <Sparkles
              size={11}
              strokeWidth={1.5}
              className="
                text-[var(--brand-gold-700)]
              "
            />

            <span
              className="
                font-brand-sans

                text-[6px]
                font-bold
                uppercase

                tracking-[0.14em]

                text-[var(--brand-text-muted)]
              "
            >
              Sofa N More · London
            </span>
          </div>
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
      {/* GOLD ARC */}

      <div
        className="
          absolute

          -right-[100px]
          -top-[125px]

          hidden

          h-[270px]
          w-[270px]

          rounded-full

          border
          border-[var(--brand-gold)]/12

          lg:block
        "
      />

      {/* SECOND ARC */}

      <div
        className="
          absolute

          -right-[35px]
          -top-[65px]

          hidden

          h-[160px]
          w-[160px]

          rounded-full

          border
          border-[var(--brand-navy)]/[0.04]

          lg:block
        "
      />

      {/* SOFT LIGHT */}

      <div
        className="
          absolute

          -bottom-[100px]
          left-[34%]

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
