import Image from "next/image";

import { Check, Hammer, Heart, Camera, Sparkles } from "lucide-react";

import ClayButton from "@/components/ui/ClayButton";

/* =========================================================
   CONFIG
========================================================= */

const HERO_IMAGE =
  "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/Repair.webp";

const heroPoints = [
  { label: "Full Reupholstery", note: "Complete upholstery renewal" },
  {
    label: "Foam & Comfort Renewal",
    note: "Restore support and seating comfort",
  },
  {
    label: "Wood & Frame Restoration",
    note: "Repair and restore suitable structural elements",
  },
  {
    label: "London Workshop",
    note: "Professional restoration in North West London",
  },
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

                        text-[13px]
                        font-bold
                        uppercase

                        tracking-[0.2em]

                        text-[var(--brand-gold-700)]

                        sm:text-[11px]
                      "
                    >
                      Sofa Reupholstery & Restoration
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
                  Sofa Reupholstery, Restoration & Major Repairs in London
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
                  Professional sofa reupholstery and restoration for sofas that
                  need more than a small cosmetic fix.
                </p>

                <div className="mt-6 grid min-w-0 gap-3 sm:flex sm:flex-wrap sm:items-center">
                  <ClayButton
                    href="#sofa-repair-enquiry"
                    variant="gold"
                    size="lg"
                    showArrow
                    fullWidth
                    className="max-w-full lg:w-auto! !min-w-0 !whitespace-normal !leading-snug max-sm:w-full [&_.snm-button__label]:whitespace-normal"
                    ariaLabel="Request a Sofa Restoration Assessment"
                  >
                    Request a Sofa Restoration Assessment
                  </ClayButton>
                  <ClayButton
                    href="#sofa-repair-enquiry"
                    variant="navy"
                    size="lg"
                    fullWidth
                    startIcon={<Camera size={16} strokeWidth={1.7} />}
                    className="max-w-full lg:w-auto! !min-w-0 !whitespace-normal !leading-snug max-sm:w-full [&_.snm-button__label]:whitespace-normal"
                    ariaLabel="Send Photos for Assessment"
                  >
                    Send Photos for Assessment
                  </ClayButton>
                </div>

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
                    Sofa N More works on substantial restoration projects
                    including complete reupholstery, fabric renewal, foam and
                    comfort replacement, wood and frame restoration, and
                    projects where several parts of the sofa need attention
                    together.
                  </p>
                  <p>
                    Our service is designed for sofas that are worth restoring -
                    whether because of their quality, comfort, dimensions,
                    character or value to the owner.
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
                    <HeroPoint
                      key={point.label}
                      label={point.label}
                      note={point.note}
                    />
                  ))}
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

function HeroPoint({ label, note }: { label: string; note: string }) {
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
        {label}
        <span className="mt-1 block text-[11px] font-medium normal-case leading-relaxed tracking-normal text-[var(--brand-text-muted)]">
          {note}
        </span>
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
            alt="Sofa reupholstery and restoration craftsmanship at Sofa N More in London"
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

                  text-[13px]
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

                text-[13px]
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
