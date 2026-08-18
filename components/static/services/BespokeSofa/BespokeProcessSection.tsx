import {
  ArrowRight,
  Check,
  ClipboardPenLine,
  Hammer,
  Layers3,
  PackageCheck,
  PencilRuler,
  Sparkles,
} from "lucide-react";

/* =========================================================
   DATA
========================================================= */

const processSteps = [
  {
    number: "01",
    eyebrow: "Your Brief",
    title: "Tell Us About Your Project",
    description:
      "Share what you want to create, where it will live and what you need it to do.",
    secondary: "Photos, measurements or inspiration all help.",
    icon: ClipboardPenLine,
    duration: "Day 1",
  },
  {
    number: "02",
    eyebrow: "Design",
    title: "Develop the Design",
    description:
      "We refine dimensions, proportions and details around your space and requirements.",
    icon: PencilRuler,
    duration: "Week 1",
  },
  {
    number: "03",
    eyebrow: "Materials",
    title: "Select Materials & Finishes",
    description:
      "Explore fabrics, colours and finishes to balance appearance, comfort and practicality.",
    icon: Layers3,
    duration: "Week 2",
  },
  {
    number: "04",
    eyebrow: "London Workshop",
    title: "Your Piece Is Made",
    description:
      "Once specification is agreed, your bespoke piece moves into production at our London workshop.",
    icon: Hammer,
    duration: "4–8 Weeks",
    highlight: true,
  },
  {
    number: "05",
    eyebrow: "The Final Step",
    title: "Delivery & Installation",
    description:
      "Your completed piece is delivered with care and positioned ready for you to enjoy.",
    icon: PackageCheck,
    duration: "Final Day",
  },
];

type Step = (typeof processSteps)[number];

/* =========================================================
   ROOT
========================================================= */

export default function BespokeProcessSection() {
  return (
    <section
      aria-labelledby="bespoke-process-heading"
      className="relative overflow-hidden bg-[var(--brand-ivory)] px-3 py-10 sm:px-5 sm:py-12 lg:px-7 lg:py-16"
    >
 
      <div className="relative z-10 mx-auto max-w-[var(--site-width)]">
        <div className="clay-surface-strong relative rounded-[34px] p-[7px] sm:rounded-[42px] lg:rounded-[50px] lg:p-[9px]">
          <div className="clay-inset relative overflow-hidden rounded-[28px] bg-[linear-gradient(145deg,#FFFDF8_0%,#F5EEE4_52%,#EDE0CF_100%)] px-4 py-6 sm:rounded-[35px] sm:px-6 sm:py-8 lg:rounded-[41px] lg:px-10 lg:py-11 xl:px-12 xl:py-12">
            <ArchitecturalBackground />

            {/* HEADER */}
            <SectionHeader />

            {/* DESKTOP JOURNEY */}
            <div className="relative z-20 mt-12 hidden lg:block">
              <DesktopTimeline />
            </div>

            {/* MOBILE JOURNEY */}
            <div className="relative z-20 mt-8 lg:hidden">
              <MobileTimeline />
            </div>

            {/* COMPLETION */}
            <div className="relative z-20 mt-8 lg:mt-12">
              <CompletionStrip />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   HEADER
========================================================= */

function SectionHeader() {
  return (
    <div className="relative z-20 grid gap-6 lg:grid-cols-[1fr_0.72fr] lg:items-end lg:gap-12">
      <div>
        <div className="flex items-center gap-3">
          <span className="h-px w-9 bg-[var(--brand-gold)]" />
          <span className="font-brand-sans text-[8px] font-bold uppercase tracking-[0.25em] text-[var(--brand-gold-700)] sm:text-[9px]">
            The Bespoke Process
          </span>
        </div>

        <h2
          id="bespoke-process-heading"
          className="mt-5 max-w-[770px] font-brand-display text-[39px] font-semibold leading-[0.97] tracking-[-0.04em] text-[var(--brand-navy)] min-[390px]:text-[43px] sm:text-[50px] lg:text-[clamp(50px,4.5vw,68px)]"
        >
          From an Idea to
          <br className="hidden sm:block" />a Piece Made for You
          <span className="text-[var(--brand-gold)]">.</span>
        </h2>
      </div>

      <div className="max-w-[470px] lg:justify-self-end">
        <p className="font-brand-display text-[20px] font-medium italic leading-[1.35] text-[var(--brand-navy)] sm:text-[21px]">
          Creating something bespoke does not need to feel complicated.
        </p>
        <p className="mt-4 font-brand-sans text-[12px] font-medium leading-[1.7] text-[var(--brand-text-muted)] sm:text-[13px]">
          We guide the process from the first conversation to final delivery,
          with each decision shaped around your space and requirements.
        </p>
        <div className="mt-5 flex items-center gap-3">
          <span className="h-[2px] w-12 rounded-full bg-[var(--brand-gold)]" />
          <span className="h-[5px] w-[5px] rounded-full bg-[var(--brand-gold)]" />
          <span className="font-brand-sans text-[7px] font-bold uppercase tracking-[0.16em] text-[var(--brand-text-muted)]">
            Idea · Design · Make · Deliver
          </span>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   DESKTOP TIMELINE
   
   ✅ NEW UX APPROACH:
   • Horizontal, left-to-right journey (natural reading)
   • Numbered step indicators on a single connecting rail
   • Each card is same size — visually balanced
   • Workshop step is highlighted (dark card) as the "hero"
     stage where the piece is actually made
   • Duration badges add credibility and clarity
   • Arrow separators reinforce forward motion
========================================================= */

function DesktopTimeline() {
  return (
    <div className="relative">
      {/* PROGRESS RAIL */}
      <div className="relative mb-10">
        <div className="absolute left-[3%] right-[3%] top-1/2 h-[2px] -translate-y-1/2 bg-[linear-gradient(90deg,transparent_0%,#D7A04A_10%,#D7A04A_90%,transparent_100%)] opacity-60" />

        <div className="relative grid grid-cols-5 gap-4">
          {processSteps.map((step, i) => (
            <div key={step.number} className="flex flex-col items-center">
              {/* Node */}
              <div className="clay-surface-strong relative z-10 flex h-14 w-14 items-center justify-center rounded-full p-[5px]">
                <div
                  className={`flex h-full w-full items-center justify-center rounded-full ${
                    step.highlight
                      ? "bg-[var(--brand-navy)] text-[var(--brand-gold)]"
                      : "clay-inset text-[var(--brand-gold-700)]"
                  }`}
                >
                  <span className="font-brand-display text-[14px] font-semibold">
                    {step.number}
                  </span>
                </div>
              </div>
              {/* Duration badge */}
              <span className="mt-3 rounded-full bg-white/60 px-2.5 py-1 font-brand-sans text-[7px] font-bold uppercase tracking-[0.14em] text-[var(--brand-navy)] shadow-[inset_1px_1px_2px_rgba(255,255,255,0.9),0_2px_4px_rgba(120,74,20,0.06)]">
                {step.duration}
              </span>
              {/* Arrow separator */}
              {i < processSteps.length - 1 && (
                <ArrowRight
                  size={12}
                  strokeWidth={2}
                  className="pointer-events-none absolute right-[-6px] top-[26px] hidden text-[var(--brand-gold)] xl:block"
                  style={{
                    left: `calc(${(i + 1) * 20}% - 6px)`,
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* STEP CARDS */}
      <div className="grid grid-cols-5 gap-4 xl:gap-5">
        {processSteps.map((step) => (
          <DesktopStepCard key={step.number} step={step} />
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   DESKTOP STEP CARD
========================================================= */

function DesktopStepCard({ step }: { step: Step }) {
  const Icon = step.icon;
  const dark = !!step.highlight;

  return (
    <article className="clay-surface-strong group rounded-[22px] p-[5px] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1">
      <div
        className={`relative flex h-full min-h-[280px] flex-col overflow-hidden rounded-[17px] px-4 py-5 xl:min-h-[300px] xl:px-5 xl:py-6 ${
          dark ? "clay-dark" : "clay-inset"
        }`}
      >
        {/* Decorative arch */}
        <div
          aria-hidden
          className={`absolute -bottom-[70px] -right-[45px] h-[160px] w-[130px] rounded-t-[50%] border-[10px] ${
            dark ? "border-white/[0.05]" : "border-[#E9DDCB]/45"
          }`}
        />

        {/* Icon */}
        <div
          className={`relative z-10 flex h-11 w-11 items-center justify-center rounded-full ${
            dark
              ? "bg-[var(--brand-gold)] text-[var(--brand-navy)]"
              : "bg-[var(--brand-navy)] text-[var(--brand-gold)]"
          }`}
        >
          <Icon size={17} strokeWidth={1.5} />
        </div>

        {/* Copy */}
        <div className="relative z-10 mt-5 flex-1">
          <span
            className={`font-brand-sans text-[7px] font-bold uppercase tracking-[0.18em] ${
              dark ? "text-[var(--brand-gold)]" : "text-[var(--brand-gold-700)]"
            }`}
          >
            {step.eyebrow}
          </span>

          <h3
            className={`mt-2.5 font-brand-display text-[18px] font-semibold leading-[1.1] tracking-[-0.025em] xl:text-[20px] ${
              dark ? "text-white" : "text-[var(--brand-navy)]"
            }`}
          >
            {step.title}
          </h3>

          <p
            className={`mt-3 font-brand-sans text-[10.5px] font-medium leading-[1.6] xl:text-[11px] ${
              dark ? "text-white/64" : "text-[var(--brand-text-muted)]"
            }`}
          >
            {step.description}
          </p>

          {step.secondary && (
            <p
              className={`mt-2 font-brand-sans text-[9.5px] leading-[1.55] xl:text-[10px] ${
                dark ? "text-white/44" : "text-[var(--brand-text-muted)]"
              }`}
            >
              {step.secondary}
            </p>
          )}
        </div>

        {/* Workshop marker */}
        {dark && (
          <div className="relative z-10 mt-4 inline-flex items-center gap-1.5 self-start rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-gold)]" />
            <span className="font-brand-sans text-[6px] font-bold uppercase tracking-[0.14em] text-white/70">
              London Workshop
            </span>
          </div>
        )}
      </div>
    </article>
  );
}

/* =========================================================
   MOBILE TIMELINE
   
   ✅ NEW UX:
   • Vertical timeline with numbered step markers
   • Duration badges kept for clarity
   • Cleaner alignment — icon column stays fixed width
========================================================= */

function MobileTimeline() {
  return (
    <div className="relative">
      {/* Vertical rail */}
      <div
        aria-hidden
        className="absolute bottom-6 left-[27px] top-6 w-px bg-[linear-gradient(180deg,transparent_0%,#D7A04A_8%,#D7A04A_92%,transparent_100%)] opacity-60"
      />

      <div className="space-y-3">
        {processSteps.map((step) => (
          <MobileStepCard key={step.number} step={step} />
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   MOBILE STEP CARD
========================================================= */

function MobileStepCard({ step }: { step: Step }) {
  const Icon = step.icon;
  const dark = !!step.highlight;

  return (
    <div className="relative flex items-stretch gap-3">
      {/* Step number node */}
      <div className="relative z-10 flex shrink-0 flex-col items-center pt-3">
        <div className="clay-surface-strong flex h-[54px] w-[54px] items-center justify-center rounded-full p-[4px]">
          <div
            className={`flex h-full w-full items-center justify-center rounded-full ${
              dark
                ? "bg-[var(--brand-navy)] text-[var(--brand-gold)]"
                : "clay-inset text-[var(--brand-gold-700)]"
            }`}
          >
            <span className="font-brand-display text-[12px] font-semibold">
              {step.number}
            </span>
          </div>
        </div>
      </div>

      {/* Card */}
      <article className="clay-surface-soft flex-1 rounded-[20px] p-[5px]">
        <div
          className={`relative overflow-hidden rounded-[16px] px-4 py-4 ${
            dark ? "clay-dark" : "clay-inset"
          }`}
        >
          <div className="flex items-start gap-3">
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                dark
                  ? "bg-[var(--brand-gold)] text-[var(--brand-navy)]"
                  : "bg-[var(--brand-navy)] text-[var(--brand-gold)]"
              }`}
            >
              <Icon size={15} strokeWidth={1.5} />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <span
                  className={`font-brand-sans text-[6px] font-bold uppercase tracking-[0.16em] ${
                    dark
                      ? "text-[var(--brand-gold)]"
                      : "text-[var(--brand-gold-700)]"
                  }`}
                >
                  {step.eyebrow}
                </span>
                <span
                  className={`rounded-full px-2 py-0.5 font-brand-sans text-[6px] font-bold uppercase tracking-[0.12em] ${
                    dark
                      ? "bg-white/10 text-[var(--brand-gold)]"
                      : "bg-[var(--brand-navy)]/8 text-[var(--brand-navy)]"
                  }`}
                >
                  {step.duration}
                </span>
              </div>

              <h3
                className={`mt-1.5 font-brand-display text-[18px] font-semibold leading-[1.1] tracking-[-0.02em] ${
                  dark ? "text-white" : "text-[var(--brand-navy)]"
                }`}
              >
                {step.title}
              </h3>

              <p
                className={`mt-2 font-brand-sans text-[10px] leading-[1.6] ${
                  dark ? "text-white/64" : "text-[var(--brand-text-muted)]"
                }`}
              >
                {step.description}
              </p>

              {step.secondary && (
                <p
                  className={`mt-1.5 font-brand-sans text-[9px] leading-[1.55] ${
                    dark ? "text-white/44" : "text-[var(--brand-text-muted)]"
                  }`}
                >
                  {step.secondary}
                </p>
              )}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

/* =========================================================
   COMPLETION STRIP
========================================================= */

function CompletionStrip() {
  return (
    <div className="clay-surface-strong rounded-[25px] p-[6px]">
      <div className="clay-inset relative overflow-hidden rounded-[20px] px-5 py-5 sm:px-6">
        <div
          aria-hidden
          className="absolute -bottom-[85px] right-[5%] h-[160px] w-[135px] rounded-t-[50%] border-[12px] border-[#E8DCCB]/45"
        />

        <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--brand-navy)] text-[var(--brand-gold)]">
              <Sparkles size={19} strokeWidth={1.6} />
            </div>

            <div>
              <span className="font-brand-sans text-[7px] font-bold uppercase tracking-[0.18em] text-[var(--brand-gold-700)]">
                One Considered Process
              </span>
              <p className="mt-1.5 font-brand-display text-[19px] font-semibold leading-[1.2] text-[var(--brand-navy)] sm:text-[21px]">
                From your first idea to the final piece in your space.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:w-[300px]">
            {["Considered", "Personal", "Made in London"].map((item) => (
              <div
                key={item}
                className="flex items-center justify-center gap-1 rounded-full border border-[var(--brand-gold)]/25 bg-white/25 px-2 py-2"
              >
                <Check
                  size={8}
                  strokeWidth={2.5}
                  className="text-[var(--brand-gold-700)]"
                />
                <span className="font-brand-sans text-[6px] font-bold uppercase tracking-[0.1em] text-[var(--brand-navy)]">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   ARCHITECTURAL BACKGROUND
========================================================= */

function ArchitecturalBackground() {
  return (
    <>
      <svg
        aria-hidden
        viewBox="0 0 1400 320"
        preserveAspectRatio="none"
        className="pointer-events-none absolute left-0 top-0 z-0 hidden h-[280px] w-full lg:block"
      >
        <path
          d="M0 0 H1400 V86 C1261 43 1140 45 1043 108 C928 184 796 202 684 158 C555 107 441 76 319 92 C198 108 88 79 0 42 Z"
          fill="#F3E9DC"
          opacity="0.68"
        />
        <path
          d="M0 58 C106 88 210 118 321 103 C445 86 555 116 681 166 C801 214 936 194 1046 119 C1141 54 1266 54 1400 95"
          fill="none"
          stroke="#FFFDF8"
          strokeWidth="6"
          opacity="0.55"
        />
      </svg>

      <div
        aria-hidden
        className="pointer-events-none absolute -right-[80px] top-[180px] z-0 hidden h-[350px] w-[235px] rounded-l-[50%] border-[17px] border-[#E9DDCB]/35 lg:block"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[6%] left-[2%] z-0 hidden h-[130px] gap-[8px] lg:flex"
      >
        {[0, 1, 2, 3].map((item) => (
          <span
            key={item}
            className="h-full w-[7px] rounded-full bg-[#E7DAC9]"
          />
        ))}
      </div>
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
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#EEE2D2_0%,#FFFDF8_48%,#F5F2EA_100%)]" />

      <div className="absolute -left-[105px] top-[210px] hidden h-[245px] w-[245px] rounded-full border-[3px] border-[var(--brand-gold)]/45 lg:block" />

      <div className="clay-sphere absolute -right-[45px] bottom-[110px] hidden h-[135px] w-[135px] lg:block">
        <div className="clay-sphere-shadow" />
        <div className="clay-sphere-ball" />
      </div>
    </div>
  );
}
