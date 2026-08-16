import Image from "next/image";
import { Armchair, Crown, Phone, Ruler, Sparkles } from "lucide-react";
import ClayButton from "@/components/ui/ClayButton";

/* =========================================================
   CONSTANTS
========================================================= */

const PHONE_NUMBER = "+4407400577844";
const PHONE_DISPLAY = "07400 577 844";

/* =========================================================
   FEATURE DATA
========================================================= */

const features = [
  {
    icon: Ruler,
    label: "Made to Measure",
    description: "Designed around your exact dimensions.",
  },
  {
    icon: Armchair,
    label: "Made in London",
    description: "Bespoke sofa crafted with care.",
  },
  {
    icon: Sparkles,
    label: "Your Finish",
    description: "Choose materials, fabric and details.",
  },
];

/* =========================================================
   HERO
========================================================= */

export default function BespokesofaHero({ id = "service" }: { id?: string }) {
  return (
    <section
      id={id}
      aria-labelledby="bespoke-sofa-heading"
      className="relative scroll-mt-24 overflow-hidden bg-[var(--brand-ivory)] px-3 pb-10 pt-20 sm:px-5 sm:pb-12 sm:pt-24 lg:px-7 lg:pb-16 lg:pt-28"
    >
      <HeroPageBackground />

      <div className="relative z-10 mx-auto max-w-[var(--site-width)]">
        {/* OUTER CLAY SHELL */}
        <div className="clay-surface-strong relative rounded-[28px] p-[6px] sm:rounded-[36px] sm:p-[7px] lg:rounded-[52px] lg:p-[10px]">
          <div className="clay-inset relative overflow-hidden rounded-[23px] bg-[linear-gradient(145deg,#FFFDF8_0%,#F6EFE4_54%,#EDE0CF_100%)] sm:rounded-[30px] lg:min-h-[760px] lg:rounded-[43px]">
            <HeroArchitecture />

            {/* CONTENT GRID */}
            <div className="relative z-20 grid px-4 pb-5 pt-5 sm:px-6 sm:pb-7 sm:pt-7 lg:min-h-[760px] lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-8 lg:px-10 lg:py-10 xl:gap-12 xl:px-14 xl:py-12">
              {/* COPY */}
              <div className="relative z-30 lg:pl-4 xl:pl-8 mb-20">
                {/* BRAND MARK — desktop only */}
                <div className="hidden items-center gap-2 lg:flex">
                  <Crown
                    size={16}
                    strokeWidth={1.5}
                    className="text-[var(--brand-gold-700)]"
                  />
                  <span className="font-brand-display text-[17px] tracking-[0.16em] text-[var(--brand-navy)]">
                    SNM
                  </span>
                  <span className="ml-1 font-brand-sans text-[7px] font-bold uppercase tracking-[0.22em] text-[var(--brand-text-muted)]">
                    London
                  </span>
                </div>

                {/* EYEBROW */}
                <div className="flex items-center gap-3 lg:mt-10">
                  <span className="h-px w-8 bg-[var(--brand-gold)]" />
                  <span className="font-brand-sans text-[8px] font-bold uppercase tracking-[0.25em] text-[var(--brand-gold-700)] sm:text-[9px]">
                    Bespoke sofa · London
                  </span>
                </div>

                {/* H1 */}
                <h1
                  id="bespoke-sofa-heading"
                  className="mt-4 max-w-[620px] font-brand-display  font-medium leading-[0.98] tracking-[-0.04em] text-[var(--brand-navy)] min-[390px]:text-[38px] sm:mt-5 sm:text-[48px] lg:mt-7 lg:text-[clamp(48px,4.5vw,72px)]"
                >
                  Bespoke sofa in London,
                  <br className="hidden sm:block" />
                  Made Around Your Space
                  <span className="text-[var(--brand-gold)]">.</span>
                </h1>

                {/* GOLD DETAIL */}
                <div className="mt-4 flex items-center gap-3 sm:mt-5 lg:mt-7">
                  <span className="h-[2px] w-14 rounded-full bg-[var(--brand-gold)]" />
                  <span className="h-[6px] w-[6px] rounded-full bg-[var(--brand-gold)]" />
                </div>

                {/* LEAD */}
                <p className="mt-4 max-w-[570px] font-brand-display text-[16px] font-medium italic leading-[1.35] text-[var(--brand-navy)] min-[390px]:text-[18px] sm:mt-5 sm:text-[21px] lg:mt-6 lg:text-[23px]">
                  A sofa should fit more than a room. It should fit the way you
                  live.
                </p>

                {/* DESCRIPTION */}
                <div className="mt-4 max-w-[580px] space-y-3 font-brand-sans text-[11.5px] font-medium leading-[1.7] text-[var(--brand-text-muted)] sm:mt-5 sm:space-y-4 sm:text-[13px] lg:text-[14px] lg:leading-[1.75]">
                  <p>
                    At Sofa N More, we create bespoke sofa in London for homes
                    and spaces where standard sizes, limited finishes and
                    off-the-shelf designs simply aren&apos;t enough.
                  </p>
                  <p className="hidden sm:block">
                    From a made-to-measure sofa designed around the proportions
                    of your living room to custom chairs, benches and statement
                    sofa, every project starts with your space, your
                    requirements and the way you want the finished piece to
                    feel.
                  </p>
                  <p className="font-semibold text-[var(--brand-navy)]">
                    Choose the dimensions, materials, fabric, details and finish
                    — create sofa that belongs exactly where it was designed to
                    be.
                  </p>
                </div>

                {/* =====================================
                    CTA GROUP — 3 actions with clear
                    hierarchy. Phone is prominent.
                ====================================== */}
                <div className="mt-6 flex flex-col gap-2.5 sm:mt-7 lg:mt-8">
                  {/* Primary row — Quote + Phone */}
                  <div className="flex flex-col gap-2.5 sm:flex-row sm:items-stretch">
                    <ClayButton
                      href="/contact-us"
                      variant="gold"
                      size="md"
                      showArrow
                      fullWidth
                      className="w-full   sm:flex-1"
                    >
                      Get a Bespoke Quote
                    </ClayButton>

                    <a
                      href={`tel:${PHONE_NUMBER}`}
                      aria-label={`Call Sofa N More on ${PHONE_DISPLAY}`}
                      className="clay-surface-strong group inline-flex items-center justify-center gap-2.5 rounded-full bg-[var(--brand-navy)] px-5 py-3.5 text-white transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 active:translate-y-0 sm:px-4"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--brand-gold)]/95 text-[var(--brand-navy)]">
                        <Phone size={14} strokeWidth={2} />
                      </span>
                      <span className="flex flex-col items-start leading-tight">
                        <span className="font-brand-sans text-[7px] font-bold uppercase tracking-[0.18em] text-[var(--brand-gold)]">
                          Call Us
                        </span>
                        <span className="  text-[14px] tracking-[-0.01em]">
                          {PHONE_DISPLAY}
                        </span>
                      </span>
                    </a>
                  </div>
                </div>
              </div>

              {/* VISUAL */}
              <div className="relative mt-8 min-h-[360px] min-[390px]:min-h-[420px] sm:mt-10 sm:min-h-[500px] lg:mt-0 lg:min-h-[650px]">
                {/* SCULPTURAL ARCH */}
                <div className="clay-surface-strong absolute bottom-[52px] left-1/2 -mt-20 md:-mt-0 top-0 w-[99%] -translate-x-1/2 rounded-t-[29%] rounded-b-[24px] p-[6px] sm:w-[86%] sm:bottom-[60px] sm:p-[8px] sm:rounded-b-[28px] lg:bottom-[45px] lg:w-[96%] lg:p-[9px] lg:rounded-b-[30px] xl:w-[91%]">
                  <div className="clay-inset relative h-100 lg:h-150 overflow-hidden rounded-t-[29%] rounded-b-[19px] bg-[#DCD0BE] sm:rounded-b-[23px] lg:rounded-b-[24px]">
                    <Image
                      src="/assets/images/bespoke-sofa-london-sofa-n-more.webp"
                      alt="Bespoke sofa handcrafted for a luxury London living room"
                      fill
                      priority
                      sizes="(max-width: 1023px) 100vw, 52vw"
                      className="object-cover object-center"
                    />

                    {/* IMAGE GRADING */}
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(8,20,35,0.04)_0%,transparent_35%,transparent_65%,rgba(8,20,35,0.20)_100%)]" />
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,253,248,0.08),transparent_25%,transparent_80%,rgba(8,20,35,0.08))]" />

                    {/* INNER EDGE */}
                  </div>
                </div>
              </div>
            </div>

            {/* FEATURE STRIP */}
            <div className="relative   z-30 mx-4 mb-4 grid md:hidden gap-2 sm:mx-6 sm:grid-cols-3 sm:gap-2.5 lg:absolute lg:bottom-7 lg:left-[3%] lg:mx-0 lg:w-[50%] lg:grid-cols-3 lg:gap-3 xl:left-[4%] xl:w-[48%]">
              {features.map(({ icon: Icon, label, description }) => (
                <div
                  key={label}
                  className="clay-surface-soft rounded-[16px] p-[4px] sm:rounded-[20px] sm:p-[5px]"
                >
                  <div className="clay-inset flex h-full items-center gap-2.5 rounded-[13px] px-2.5 py-2.5 sm:gap-3 sm:rounded-[16px] sm:px-3 sm:py-3">
                    <div className="clay-surface-strong flex h-8 w-8 shrink-0 items-center justify-center rounded-full sm:h-9 sm:w-9">
                      <Icon
                        size={14}
                        strokeWidth={1.5}
                        className="text-[var(--brand-gold-700)] sm:hidden"
                      />
                      <Icon
                        size={16}
                        strokeWidth={1.5}
                        className="hidden text-[var(--brand-gold-700)] sm:block"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="font-brand-sans text-[7px] font-bold uppercase leading-[1.2] tracking-[0.1em] text-[var(--brand-navy)] sm:text-[8px]">
                        {label}
                      </p>
                      <p className="mt-1 hidden font-brand-sans text-[7px] leading-[1.4] text-[var(--brand-text-muted)] xl:block">
                        {description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
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
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#FFFDF8_0%,#F5F2EA_55%,#EEE2D3_100%)]" />

      {/* LEFT ARCH */}
      <div className="clay-surface-soft absolute -left-[150px] top-[240px] hidden h-[430px] w-[250px] rounded-r-[50%] p-[8px] opacity-70 lg:block">
        <div className="clay-inset h-full rounded-r-[50%]" />
      </div>

      {/* RIGHT IVORY SPHERE */}
      <div className="clay-sphere absolute -right-[45px] bottom-[70px] hidden h-[150px] w-[150px] lg:block">
        <div className="clay-sphere-shadow" />
        <div className="clay-sphere-ball" />
      </div>
    </div>
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
