import Image from "next/image";
import { Crown, Sparkles } from "lucide-react";

import ClayButton from "@/components/ui/ClayButton";

/* =========================================================
   TYPES
========================================================= */

type LuxuryClayCtaBannerProps = {
  chairSrc?: string;
};

/* =========================================================
   ROOT
========================================================= */

export default function LuxuryClayCtaBanner({
  chairSrc = "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/cta.png",
}: LuxuryClayCtaBannerProps) {
  return (
    <section
      aria-labelledby="dream-project-heading"
      className="
        relative
        overflow-hidden
        bg-[var(--brand-ivory)]
        px-3
        py-12

        sm:px-5 sm:py-14

        lg:px-8 lg:py-20
      "
    >
      {/* section background */}

      <div
        aria-hidden
        className="
          pointer-events-none
          absolute inset-0
          bg-[linear-gradient(180deg,#fffdf8_0%,var(--brand-ivory)_55%,#eee4d5_100%)]
        "
      />

      {/* =============================================
          DESKTOP
      ============================================== */}

      <div className="relative z-10 hidden lg:block">
        <DesktopCTA chairSrc={chairSrc} />
      </div>

      {/* =============================================
          MOBILE
      ============================================== */}

      <div className="relative z-10 lg:hidden">
        <MobileCTA chairSrc={chairSrc} />
      </div>
    </section>
  );
}

/* =========================================================
   DESKTOP
========================================================= */

function DesktopCTA({ chairSrc }: { chairSrc: string }) {
  return (
    <div
      className="
        clay-surface-strong
        relative
        mx-auto
        max-w-[1320px]
        rounded-[48px]
        p-[10px]

        xl:rounded-[54px]
        xl:p-[12px]
      "
    >
      {/* =============================================
          DECOR OUTSIDE MAIN PANEL
      ============================================== */}

      <DesktopOuterDecor />

      {/* =============================================
          INNER PRESSED FRAME
      ============================================== */}

      <div
        className="
          clay-inset
          relative
          overflow-hidden
          rounded-[39px]
          p-[9px]

          xl:rounded-[44px]
          xl:p-[10px]
        "
      >
        {/* ===========================================
            DARK NAVY MAIN PANEL
        ============================================ */}

        <div
          className="
            clay-dark
            relative
            grid
            min-h-[465px]
            grid-cols-[0.88fr_1.12fr]
            overflow-hidden
            rounded-[32px]

            xl:min-h-[510px]
            xl:grid-cols-[0.9fr_1.1fr]
            xl:rounded-[36px]
          "
        >
          {/* subtle left volume */}

          <div
            aria-hidden
            className="
              pointer-events-none
              absolute
              -left-[130px]
              -top-[150px]
              h-[440px]
              w-[440px]
              rounded-full
              bg-white/[0.025]
              shadow-[inset_-35px_-35px_60px_rgba(0,0,0,0.10)]
            "
          />

          {/* ==============================
              COPY
          =============================== */}

          <DesktopCopy />

          {/* ==============================
              VISUAL
          =============================== */}

          <DesktopChairScene chairSrc={chairSrc} />
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   DESKTOP COPY
========================================================= */

function DesktopCopy() {
  return (
    <div
      className="
        relative
        z-20
        flex
        flex-col
        justify-center
        px-12
        py-12

        xl:px-16
      "
    >
      {/* eyebrow */}

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
            rounded-[12px]
            bg-white/[0.05]
            shadow-[inset_2px_2px_3px_rgba(255,255,255,0.07),inset_-2px_-2px_5px_rgba(0,0,0,0.14)]
          "
        >
          <Sparkles
            size={15}
            strokeWidth={1.5}
            className="
              text-[var(--brand-gold)]
            "
          />
        </span>

        <span
          className="
            font-brand-sans
            text-[10px]
            font-bold
            uppercase
            tracking-[0.27em]
            text-[var(--brand-gold)]

            xl:text-[11px]
          "
        >
          Your Best Choice
        </span>
      </div>

      {/* heading */}

      <h2
        id="dream-project-heading"
        className="
          mt-7
          max-w-[520px]
          font-brand-display
          text-[48px]
          font-semibold
          leading-[1]
          tracking-[-0.04em]
          text-[var(--brand-ivory-50)]

          xl:text-[58px]
          2xl:text-[62px]
        "
      >
        Let&apos;s start your
        <br />
        new dream project
        <span
          className="
            text-[var(--brand-gold)]
          "
        >
          .
        </span>
      </h2>

      {/* tiny divider */}

      <div
        className="
          mt-6
          flex
          items-center
          gap-3
        "
      >
        <span
          className="
            h-[2px]
            w-11
            rounded-full
            bg-[var(--brand-gold)]
          "
        />
      </div>

      {/* CTA */}

      <div
        className="
          mt-7
          w-[200px]
        "
      >
        <ClayButton
          href="/services"
          variant="gold"
          size="md"
          fullWidth
          showArrow
          ariaLabel="Get a quote"
        >
          Our Services
        </ClayButton>
      </div>
    </div>
  );
}

/* =========================================================
   DESKTOP CHAIR SCENE
========================================================= */

function DesktopChairScene({ chairSrc }: { chairSrc: string }) {
  return (
    <div
      className="
        relative
        min-h-0
        overflow-visible
      "
    >
      {/* =============================================
          LARGE BACK ARCH
      ============================================== */}

      <div
        aria-hidden
        className="
          clay-surface-strong
          absolute
          -right-[7%]
          top-[5%]
          h-[88%]
          w-[84%]
          rounded-t-[48%]
          rounded-b-[28px]
          p-[9px]
        "
      >
        <div
          className="
            clay-inset
            relative
            h-full
            overflow-hidden
            rounded-t-[48%]
            rounded-b-[23px]
          "
        >
          {/* inner champagne arch */}

          <div
            className="
              absolute
              left-1/2
              top-[6%]
              h-[83%]
              w-[64%]
              -translate-x-1/2
              rounded-t-[50%]
              bg-[linear-gradient(180deg,#f8f0df_0%,#e7d6b5_100%)]
              shadow-[inset_7px_8px_16px_rgba(255,255,255,0.72),inset_-7px_-8px_16px_rgba(138,99,44,0.18)]
            "
          />

          {/* glowing inner recess */}

          <div
            className="
              absolute
              left-1/2
              top-[12%]
              h-[70%]
              w-[47%]
              -translate-x-1/2
              rounded-t-[50%]
              bg-[radial-gradient(ellipse_at_50%_28%,#fff9e9_0%,#ead6aa_47%,#b9904e_100%)]
              shadow-[inset_5px_6px_12px_rgba(255,255,255,0.62),0_0_28px_rgba(215,160,74,0.16)]
            "
          />
        </div>
      </div>

      {/* =============================================
          PEDESTALS
      ============================================== */}

      <div
        aria-hidden
        className="
          clay-surface-soft
          absolute
          bottom-[5%]
          right-[8%]
          z-10
          h-[58px]
          w-[70%]
          rounded-[50%]
        "
      />

      <div
        aria-hidden
        className="
          clay-surface-soft
          absolute
          bottom-[11%]
          right-[16%]
          z-10
          h-[32px]
          w-[56%]
          rounded-[50%]
        "
      />

      {/* =============================================
          CHAIR
      ============================================== */}

      <div
        className="
          absolute
          bottom-[8%]
          right-[2%]
          z-30
          h-[82%]
          w-[80%]
        "
      >
        <Image
          src={chairSrc}
          alt="Luxury bespoke armchair by Sofa N More"
          fill
          sizes="(min-width: 1280px) 48vw, 50vw"
          className="
            object-contain
            object-bottom
            drop-shadow-[0_28px_28px_rgba(4,12,20,0.34)]
          "
        />
      </div>

      {/* =============================================
          GOLD RING
      ============================================== */}

      {/* =============================================
          IVORY SPHERE
      ============================================== */}

      <div
        aria-hidden
        className="
          clay-sphere
          absolute
          bottom-[8%]
          right-[7%]
          z-40
          h-[78px]
          w-[78px]
        "
      >
        <div className="clay-sphere-shadow" />
        <div className="clay-sphere-ball" />
      </div>

      {/* =============================================
          GOLD SPHERE
      ============================================== */}

      <div
        aria-hidden
        className="
          clay-sphere
          absolute
          bottom-[6%]
          right-[17%]
          z-50
          h-[27px]
          w-[27px]
        "
      >
        <div
          className="
            clay-sphere-ball
            clay-sphere-ball--gold
          "
        />
      </div>
    </div>
  );
}

/* =========================================================
   DESKTOP OUTER DECOR
========================================================= */

function DesktopOuterDecor() {
  return (
    <>
      {/* top right ring */}

      {/* gold sphere */}

      <div
        aria-hidden
        className="
          clay-sphere
          absolute
          right-[44px]
          top-[7px]
          z-30
          h-[26px]
          w-[26px]
        "
      >
        <div className="clay-sphere-ball clay-sphere-ball--gold" />
      </div>
    </>
  );
}

/* =========================================================
   MOBILE
========================================================= */

function MobileCTA({ chairSrc }: { chairSrc: string }) {
  return (
    <div
      className="
        clay-surface-strong
        relative
        mx-auto
        max-w-[430px]
        overflow-visible
        rounded-[38px]
        p-[7px]
      "
    >
      {/* right-top external ring */}

      <div
        aria-hidden
        className="
          absolute
          -right-[38px]
          top-[20px]
          z-0
          h-[115px]
          w-[115px]
        "
      >
        <div className="clay-sphere-ring" />
      </div>

      {/* =============================================
          PRESSED SHELL
      ============================================== */}

      <div
        className="
          clay-inset
          relative
          z-10
          rounded-[31px]
          p-[7px]
        "
      >
        {/* ===========================================
            NAVY MAIN PANEL
        ============================================ */}

        <div
          className="
            clay-dark
            relative
            min-h-[680px]
            overflow-hidden
            rounded-[26px]

            min-[390px]:min-h-[735px]
          "
        >
          {/* ===============================
              COPY
          ================================ */}

          <div
            className="
              relative
              z-30
              px-6
              pt-10

              min-[390px]:px-7
              min-[390px]:pt-12
            "
          >
            <div
              className="
                font-brand-sans
                text-[9px]
                font-bold
                uppercase
                tracking-[0.26em]
                text-[var(--brand-gold)]
              "
            >
              Your Best Choice
            </div>

            <h2
              className="
                mt-5
                font-brand-display
                text-[37px]
                font-semibold
                leading-[1.02]
                tracking-[-0.035em]
                text-[var(--brand-ivory-50)]

                min-[390px]:text-[42px]
              "
            >
              Let&apos;s start your
              <br />
              new dream project
              <span className="text-[var(--brand-gold)]">.</span>
            </h2>

            <div
              className="
                mt-5
                h-[2px]
                w-12
                bg-[var(--brand-gold)]
              "
            />

            <div
              className="
                mt-6
                w-full
              "
            >
              <ClayButton
                href="/contact-us"
                variant="gold"
                size="lg"
                fullWidth
                showArrow
                ariaLabel="Get a quote"
              >
                Get a Quote
              </ClayButton>
            </div>
          </div>

          {/* ===========================================
              LOWER SCENE
          ============================================ */}

          <MobileChairScene chairSrc={chairSrc} />
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   MOBILE CHAIR SCENE
========================================================= */

function MobileChairScene({ chairSrc }: { chairSrc: string }) {
  return (
    <div
      className="
        absolute
        inset-x-0
        bottom-0
        h-[55%]

        min-[390px]:h-[57%]
      "
    >
      {/* =============================================
          OUTER ARCH
      ============================================== */}

      <div
        aria-hidden
        className="
          clay-surface-strong
          absolute
          -bottom-[55px]
          left-1/2
          h-[390px]
          w-[350px]
          -translate-x-1/2
          rounded-t-[50%]
          p-[8px]

          min-[390px]:h-[430px]
          min-[390px]:w-[385px]
        "
      >
        <div
          className="
            clay-inset
            relative
            h-full
            overflow-hidden
            rounded-t-[50%]
          "
        >
          {/* champagne layer */}

          <div
            className="
              absolute
              -bottom-[10px]
              left-1/2
              h-[88%]
              w-[81%]
              -translate-x-1/2
              rounded-t-[50%]
              bg-[linear-gradient(180deg,#f7eedc,#e4d0aa)]
              shadow-[inset_6px_7px_13px_rgba(255,255,255,0.65),inset_-6px_-7px_13px_rgba(126,91,39,0.18)]
            "
          />

          {/* glowing inner layer */}

          <div
            className="
              absolute
              -bottom-[5px]
              left-1/2
              h-[78%]
              w-[62%]
              -translate-x-1/2
              rounded-t-[50%]
              bg-[radial-gradient(ellipse_at_50%_24%,#fff9e9,#ebd7ae_50%,#bc9250)]
              shadow-[inset_5px_5px_10px_rgba(255,255,255,0.65)]
            "
          />
        </div>
      </div>

      {/* =============================================
          CHAIR
      ============================================== */}

      <div
        className="
          absolute
          bottom-[5%]
          right-[-11%]
          z-30
          h-[76%]
          w-[92%]
        "
      >
        <Image
          src={chairSrc}
          alt="Luxury Sofa N More bespoke armchair"
          fill
          sizes="430px"
          className="
            object-contain
            object-bottom
            drop-shadow-[0_24px_26px_rgba(0,0,0,0.34)]
          "
        />
      </div>

      {/* =============================================
          PEDESTAL
      ============================================== */}

      <div
        aria-hidden
        className="
          clay-surface-soft
          absolute
          -bottom-[6px]
          right-[3%]
          z-20
          h-[48px]
          w-[72%]
          rounded-[50%]
        "
      />

      <div
        aria-hidden
        className="
          clay-surface-soft
          absolute
          bottom-[18px]
          right-[10%]
          z-20
          h-[26px]
          w-[57%]
          rounded-[50%]
        "
      />

      {/* =============================================
          LEFT GOLD RING
      ============================================== */}

      <div
        aria-hidden
        className="
          absolute
          bottom-[7%]
          -left-[14px]
          z-20
          h-[105px]
          w-[105px]
        "
      >
        <div className="clay-sphere-ring" />
      </div>

      {/* =============================================
          LEFT IVORY SPHERE
      ============================================== */}

      <div
        aria-hidden
        className="
          clay-sphere
          absolute
          bottom-[5%]
          left-[3%]
          z-40
          h-[72px]
          w-[72px]
        "
      >
        <div className="clay-sphere-shadow" />
        <div className="clay-sphere-ball" />
      </div>

      {/* =============================================
          SMALL GOLD SPHERE
      ============================================== */}

      <div
        aria-hidden
        className="
          clay-sphere
          absolute
          bottom-[4%]
          left-[24%]
          z-50
          h-[25px]
          w-[25px]
        "
      >
        <div
          className="
            clay-sphere-ball
            clay-sphere-ball--gold
          "
        />
      </div>
    </div>
  );
}
