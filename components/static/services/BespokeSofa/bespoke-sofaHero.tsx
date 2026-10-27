import Image from "next/image";
import ClayButton from "@/components/ui/ClayButton";

export default function BespokesofaHero({ id = "service" }: { id?: string }) {
  return (
    <section
      id={id}
      aria-labelledby="bespoke-sofa-heading"
      className="relative scroll-mt-24 overflow-hidden bg-[var(--brand-ivory)] px-3 pb-6 pt-20 sm:px-5 sm:pb-8 sm:pt-24 lg:px-7 lg:pb-10 lg:pt-28"
    >
      <HeroPageBackground />

      <div className="relative z-10 mx-auto max-w-[var(--site-width)]">
        {/* OUTER CLAY SHELL */}
        <div className="clay-surface-strong relative rounded-[28px] p-[6px] sm:rounded-[36px] sm:p-[7px] lg:rounded-[52px] lg:p-[10px]">
          <div className="clay-inset relative overflow-hidden rounded-[23px] bg-[linear-gradient(145deg,#FFFDF8_0%,#F6EFE4_54%,#EDE0CF_100%)] sm:rounded-[30px] lg:rounded-[43px]">
            <HeroArchitecture />

            {/* CONTENT GRID */}
            <div className="relative z-20 grid gap-6 px-4 py-5 sm:px-6 sm:py-7 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-8 lg:px-10 lg:py-8 xl:gap-12 xl:px-12 xl:py-10">
              {/* COPY */}
              <div className="relative z-30 min-w-0">
                {/* EYEBROW */}
                <div className="flex items-center gap-3">
                  <span className="h-px w-8 bg-[var(--brand-gold)]" />
                  <span className="font-brand-sans text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--brand-gold-700)] sm:text-[12px]">
                    Bespoke Sofas · London
                  </span>
                </div>

                {/* H1 */}
                <h1
                  id="bespoke-sofa-heading"
                  className="mt-4 max-w-[620px] font-brand-display text-[30px] font-medium leading-[1.08] tracking-normal text-[var(--brand-navy)] sm:text-[40px] xl:text-[46px]"
                >
                  Bespoke Sofas in London, <br className="hidden sm:block" />
                  Made to Measure for Your Space
                  <span className="text-[var(--brand-gold)]">.</span>
                </h1>

                {/* GOLD DETAIL */}
                <div className="mt-4 flex items-center gap-3">
                  <span className="h-[2px] w-14 rounded-full bg-[var(--brand-gold)]" />
                  <span className="h-[6px] w-[6px] rounded-full bg-[var(--brand-gold)]" />
                </div>

                {/* LEAD */}
                <p className="mt-4 max-w-[570px] font-brand-display text-[16px] font-medium italic leading-[1.45] text-[var(--brand-navy)] sm:text-[19px]">
                  A bespoke sofa should fit more than a room. It should fit the
                  way you live and the space it was designed for.
                </p>

                {/* DESCRIPTION */}
                <div className="mt-4 max-w-[580px] space-y-3 font-brand-sans text-[14px] font-medium leading-[1.6] text-[var(--brand-text-muted)]">
                  <p>
                    Custom-made sofas, built to your exact dimensions in our
                    North West London workshop.
                  </p>
                  <p className="font-semibold text-[var(--brand-navy)]">
                    We do not sell ready-made sofa stock. Every sofa is designed
                    and made specifically for the customer, the space and the
                    project.
                  </p>
                </div>

                {/* =====================================
                    ENQUIRY ACTIONS
                ====================================== */}
                <div className="mt-5 flex flex-col gap-2.5">
                  <div className="flex flex-col gap-2.5 min-[1440px]:flex-row">
                    <ClayButton
                      href="#bespoke-sofa-enquiry"
                      variant="gold"
                      size="md"
                      fullWidth
                      showArrow
                      className="w-full lg:w-auto! !min-w-0 !whitespace-normal !text-center [&_.snm-button__label]:py-2 [&_.snm-button__label]:leading-snug min-[1440px]:w-auto"
                    >
                      Request a Bespoke Sofa Quote
                    </ClayButton>

                    <ClayButton
                      href="#bespoke-sofa-enquiry"
                      variant="navy"
                      size="md"
                      fullWidth
                      showArrow
                      className="w-full lg:w-auto! !min-w-0 !whitespace-normal !text-center [&_.snm-button__label]:py-2 [&_.snm-button__label]:leading-snug min-[1440px]:w-auto"
                    >
                      Send Measurements &amp; Photos
                    </ClayButton>
                  </div>
                </div>
              </div>

              {/* VISUAL */}
              <div className="relative mx-auto w-full max-w-[680px]">
                {/* SCULPTURAL ARCH */}
                <div className="clay-surface-strong rounded-t-[29%] rounded-b-[24px] p-[6px] sm:p-[8px] sm:rounded-b-[28px] lg:p-[9px] lg:rounded-b-[30px]">
                  <div className="clay-inset relative aspect-[3/2] overflow-hidden rounded-t-[29%] rounded-b-[19px] bg-[#DCD0BE] sm:rounded-b-[23px] lg:aspect-[6/5] lg:rounded-b-[24px]">
                    <Image
                      src="https://sofanmore.s3.eu-west-2.amazonaws.com/Image/bespoke-sofa-london-sofa-n-more.webp"
                      alt="Bespoke sofa handcrafted for a London living room"
                      fill
                      preload
                      sizes="(max-width: 639px) 90vw, (max-width: 1023px) 94vw, 44vw"
                      className="object-cover object-[70%_center]"
                    />

                    {/* IMAGE GRADING */}
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(8,20,35,0.04)_0%,transparent_35%,transparent_65%,rgba(8,20,35,0.20)_100%)]" />
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,253,248,0.08),transparent_25%,transparent_80%,rgba(8,20,35,0.08))]" />

                    {/* INNER EDGE */}
                  </div>
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
   BACKGROUND DECOR
========================================================= */

function HeroPageBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    ></div>
  );
}

/* =========================================================
   ARCHITECTURAL DECOR
========================================================= */

function HeroArchitecture() {
  return (
    <>
      <svg
        aria-hidden
        viewBox="0 0 900 300"
        preserveAspectRatio="none"
        className="pointer-events-none absolute right-0 top-0 z-0 hidden h-[260px] w-[54%] lg:block"
      >
        <path
          d="M900 0 H430 C495 25 525 67 543 113 C560 157 596 184 656 192 C754 206 831 156 900 114 Z"
          fill="#F1E6D7"
          opacity="0.8"
        />
        <path
          d="M440 16 C501 39 526 75 544 119 C561 160 597 186 657 195"
          fill="none"
          stroke="#FFFDF8"
          strokeWidth="5"
          opacity="0.75"
        />
      </svg>

      <div
        aria-hidden
        className="pointer-events-none absolute right-[7%] top-0 z-[1] hidden h-[180px] gap-[8px] lg:flex"
      >
        {[0, 1, 2, 3].map((item) => (
          <span
            key={item}
            className="h-full w-[7px] rounded-b-full bg-[#E7DBCB] shadow-[inset_1px_0_1px_rgba(255,255,255,0.7),inset_-1px_0_2px_rgba(153,129,97,0.12)]"
          />
        ))}
      </div>
    </>
  );
}
