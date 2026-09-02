import { Compass, Home, Sofa } from "lucide-react";

import ClayButton from "@/components/ui/ClayButton";

export default function NotFound() {
  return (
    <main
      className="
        relative
            md:mt-20 mt-8
        flex
        min-h-[calc(100svh-80px)]
        items-center

        overflow-hidden

        bg-[var(--brand-ivory)]

        px-3
        

        sm:px-5
        sm:py-10

        lg:px-7
        lg:py-12
      "
    >
      <QuietBackground />

      <div
        className="
          relative
          z-10

          mx-auto
          w-full
          max-w-[var(--site-width)]
        "
      >
        {/* =====================================================
            MAIN CLAY SHELL
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

              bg-[linear-gradient(135deg,#FFFDF8_0%,#F7F1E8_60%,#EEE4D7_100%)]

              px-5
              py-10

              sm:rounded-[29px]
              sm:px-8
              sm:py-14

              lg:rounded-[34px]
              lg:px-12
              lg:py-16
            "
          >
            <ClaySculpture />

            {/* =================================================
                CONTENT
            ================================================== */}

            <div
              className="
                relative
                z-10

                mx-auto
                max-w-[820px]

                text-center
              "
            >
              {/* EYEBROW */}

              <div
                className="
                  clay-surface-soft

                  mx-auto

                  flex
                  w-fit
                  items-center
                  gap-2

                  rounded-full

                  px-3
                  py-2
                "
              >
                <span
                  className="
                    flex
                    h-6
                    w-6

                    items-center
                    justify-center

                    rounded-full

                    bg-[var(--brand-navy)]

                    text-[var(--brand-gold)]
                  "
                >
                  <Compass size={11} strokeWidth={1.6} />
                </span>

                <span
                  className="
                    font-brand-sans

                    text-[7px]
                    font-bold
                    uppercase

                    tracking-[0.2em]

                    text-[var(--brand-navy)]

                    sm:text-[8px]
                  "
                >
                  Page Not Found
                </span>
              </div>

              {/* =================================================
                  404
              ================================================== */}

              <div
                aria-hidden
                className="
                  mt-6

                  flex
                  items-center
                  justify-center

                  gap-2

                  sm:gap-3
                "
              >
                <ClayNumber>4</ClayNumber>

                <ClayZero />

                <ClayNumber>4</ClayNumber>
              </div>

              {/* =================================================
                  COPY
              ================================================== */}

              <h1
                className="
                  mx-auto
                  mt-7

                  max-w-[700px]

                  font-brand-display

                  text-[34px]
                  font-semibold
                  leading-[1]

                  tracking-[-0.035em]

                  text-[var(--brand-navy)]

                  sm:text-[44px]

                  lg:text-[52px]
                "
              >
                This Space Doesn&apos;t Exist Yet
                <span className="text-[var(--brand-gold)]">.</span>
              </h1>

              <p
                className="
                  mx-auto
                  mt-5

                  max-w-[580px]

                  font-brand-sans

                  text-[11px]
                  font-medium
                  leading-[1.75]

                  text-[var(--brand-text-muted)]

                  sm:text-[13px]

                  lg:text-[14px]
                "
              >
                The page may have moved, the address may be incorrect, or you
                may have followed an outdated link. You can return home or
                continue exploring Sofa N More.
              </p>

              {/* =================================================
                  CTAS
              ================================================== */}

              <div
                className="
                  mt-7

                  flex
                  flex-col
                  items-center
                  justify-center

                  gap-3

                  sm:flex-row
                "
              >
                <ClayButton
                  href="/"
                  variant="navy"
                  size="lg"
                  startIcon={<Home size={15} strokeWidth={1.6} />}
                  ariaLabel="Return to the Sofa N More homepage"
                  className="max-sm:w-full"
                >
                  Back to Home
                </ClayButton>

                <ClayButton
                  href="/services"
                  variant="outline"
                  size="lg"
                  showArrow
                  ariaLabel="Explore Sofa N More services"
                  className="max-sm:w-full"
                >
                  Explore Our Services
                </ClayButton>
              </div>

              {/* =================================================
                  QUIET FOOTER
              ================================================== */}

              <div
                className="
                  mx-auto
                  mt-8

                  flex
                  w-fit
                  items-center
                  gap-2

                  border-t
                  border-[var(--brand-navy)]/10

                  px-5
                  pt-5
                "
              >
                <Sofa
                  size={11}
                  strokeWidth={1.5}
                  className="text-[var(--brand-gold-700)]"
                />

                <span
                  className="
                    font-brand-sans

                    text-[7px]
                    font-bold
                    uppercase

                    tracking-[0.17em]

                    text-[var(--brand-text-muted)]
                  "
                >
                  Sofa N More · London
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

/* =========================================================
   CLAY NUMBER
========================================================= */

function ClayNumber({ children }: { children: string }) {
  return (
    <span
      className="
        clay-surface-strong

        flex
        h-[92px]
        w-[72px]

        items-center
        justify-center

        rounded-[22px]

        font-brand-display

        text-[58px]
        font-semibold
        leading-none

        tracking-[-0.06em]

        text-[var(--brand-navy)]

        sm:h-[122px]
        sm:w-[96px]
        sm:rounded-[28px]
        sm:text-[78px]

        lg:h-[138px]
        lg:w-[108px]
        lg:text-[88px]
      "
    >
      {children}
    </span>
  );
}

/* =========================================================
   CLAY ZERO
========================================================= */

function ClayZero() {
  return (
    <div
      className="
        clay-surface-strong

        flex
        h-[92px]
        w-[72px]

        items-center
        justify-center

        rounded-[50%]

        sm:h-[122px]
        sm:w-[96px]

        lg:h-[138px]
        lg:w-[108px]
      "
    >
      <div
        className="
          clay-inset

          flex
          h-[51px]
          w-[34px]

          items-center
          justify-center

          rounded-[50%]

          sm:h-[68px]
          sm:w-[45px]

          lg:h-[77px]
          lg:w-[50px]
        "
      >
        <div
          className="
            h-[22px]
            w-[13px]

            rounded-full

            bg-[var(--brand-gold)]

            sm:h-[29px]
            sm:w-[17px]

            lg:h-[33px]
            lg:w-[19px]
          "
        />
      </div>
    </div>
  );
}

/* =========================================================
   SCULPTURAL DECORATION
========================================================= */

function ClaySculpture() {
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
      {/* TOP RIGHT */}

      <div
        className="
          clay-surface-soft

          absolute

          -right-[75px]
          -top-[80px]

          hidden

          h-[190px]
          w-[190px]

          rounded-full

          opacity-55

          md:block
        "
      />

      <div
        className="
          absolute

          -right-[23px]
          -top-[29px]

          hidden

          h-[90px]
          w-[90px]

          rounded-full

          border
          border-[var(--brand-gold)]/15

          md:block
        "
      />

      {/* BOTTOM LEFT */}

      <div
        className="
          clay-surface-soft

          absolute

          -bottom-[85px]
          -left-[70px]

          hidden

          h-[185px]
          w-[185px]

          rounded-full

          opacity-40

          lg:block
        "
      />
    </div>
  );
}

/* =========================================================
   QUIET PAGE BACKGROUND
========================================================= */

function QuietBackground() {
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

          left-1/2
          top-1/2

          h-[420px]
          w-[700px]

          -translate-x-1/2
          -translate-y-1/2

          rounded-full

          bg-white/30

          blur-3xl
        "
      />
    </div>
  );
}
