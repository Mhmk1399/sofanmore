import Image from "next/image";
import { Armchair, Crown, Hammer, Landmark, ShieldCheck } from "lucide-react";
import ClayButton from "../ui/ClayButton";

/* =========================================================
   DATA
========================================================= */

const heritageText =
  "Founded over 12 years ago in the heart of London, Sofa N More began as a passion project to redefine sofa making. From our humble beginnings, we’ve grown into a trusted name in bespoke sofa, serving discerning clients across the capital and beyond.";

const craftsmanshipText =
  "At Sofa N More, craftsmanship is at the core of everything we do. Our skilled artisans meticulously handcraft each piece of sofa using locally sourced materials, ensuring every sofa, chair, and dining table meets our exacting standards of quality and durability. From the initial concept to the final finish, our commitment to superior craftsmanship is unwavering.";

const highlights = [
  {
    title: "Founded\nin London",
    icon: Landmark,
  },
  {
    title: "Handcrafted\nQuality",
    icon: Armchair,
  },
  {
    title: "12+ Years\nExperience",
    icon: ShieldCheck,
  },
];

/* =========================================================
   ROOT
========================================================= */

export default function AboutUsIntroSection() {
  return (
    <section
      id="about-intro"
      className="
        relative overflow-hidden
        bg-[var(--brand-ivory)]
        px-3 py-10
        sm:px-5 sm:py-12
        lg:px-8 lg:py-16 mt-12
      "
    >
      <AboutUsDecorations />

      <div className="relative z-10 mx-auto max-w-[var(--site-width)]">
        {/* ========================= DESKTOP ========================= */}
        <div className="hidden lg:block">
          <DesktopAboutUsCard />
        </div>

        {/* ========================= MOBILE ========================= */}
        <div className="lg:hidden">
          <MobileAboutUsCard />
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   DESKTOP
========================================================= */

function DesktopAboutUsCard() {
  return (
    <div
      className="
        clay-surface-strong
        relative rounded-[42px] p-[10px]
      "
    >
      <div
        className="
          clay-inset
          relative overflow-hidden rounded-[34px]
          px-8 pb-8 pt-8
          xl:px-10 xl:pb-10 xl:pt-10
        "
      >
        <div
          className="
            grid items-center justify-center  
            lg:grid-cols-2
          "
        >
          {/* LEFT CONTENT */}
          <div className="flex min-h-full flex-col">
            <AboutEyebrow />

            <h2
              className="
                mt-6
                max-w-[520px]
                font-brand-display
                text-[clamp(44px,4vw,78px)]
                font-semibold
                leading-[0.98]
                tracking-[-0.04em]
                text-[var(--brand-navy)]
              "
            >
              Our Heritage
              <span className="text-[var(--brand-gold)]">.</span>
            </h2>

            <p
              className="
                mt-6 max-w-[560px]
                font-brand-sans
                text-[15px]
                font-medium leading-[1.8]
                text-[var(--brand-text-muted)]
              "
            >
              {heritageText}
            </p>

            <div className="mt-8 max-w-[560px]">
              <CraftsmanshipCard />
            </div>

            <div className="mt-7">
              <ClayButton
                href="/services"
                variant="gold"
                size="lg"
                showArrow
                ariaLabel="Discover our story"
              >
                Discover Our Services
              </ClayButton>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative">
            <div
              className="
                clay-surface-strong
                relative rounded-[38px] p-[8px]
              "
            >
              <div
                className="
                  clay-inset
                  relative overflow-hidden rounded-[30px]
                  h-140
                "
              >
                <Image
                src="https://sofanmore.s3.eu-west-2.amazonaws.com/Image/53.webp"
                  alt="Craftsman handcrafting bespoke sofa in the Sofa N More London workshop"
                  fill
                  preload
                  className=" object-center"
                  sizes="(max-width: 1279px) 42vw, 560px"
                />

                <div
                  className="
                    pointer-events-none absolute inset-0
                    bg-[linear-gradient(180deg,rgba(255,255,255,0.04),transparent_25%,rgba(10,18,29,0.10))]
                  "
                />
              </div>
            </div>

            {/* FLOATING YEARS BADGE */}
            <div
              className="
                absolute right-[-20px] top-[90px]
                z-20
              "
            >
              <YearsBadge />
            </div>
          </div>
        </div>

        {/* BOTTOM HIGHLIGHTS */}
        <div
          className="
            mt-8
            grid grid-cols-3 gap-4
          "
        >
          {highlights.map((item) => (
            <HighlightCard
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   MOBILE
========================================================= */

function MobileAboutUsCard() {
  return (
    <div
      className="
        clay-surface-strong
        relative rounded-[32px] p-[8px]
      "
    >
      <div
        className="
          clay-inset
          relative overflow-hidden rounded-[26px]
          px-4 pb-5 pt-5
          sm:px-5 sm:pb-6 sm:pt-6
        "
      >
        <AboutEyebrow />

        <h2
          className="
            mt-5
            max-w-[260px]
            font-brand-display
            text-[44px]
            font-semibold
            leading-[0.97]
            tracking-[-0.04em]
            text-[var(--brand-navy)]
            min-[390px]:text-[50px]
          "
        >
          Our Heritage
          <span className="text-[var(--brand-gold)]">.</span>
        </h2>

        <p
          className="
            mt-4
            font-brand-sans
            text-[13px]
            font-medium leading-[1.75]
            text-[var(--brand-text-muted)]
          "
        >
          {heritageText}
        </p>

        {/* IMAGE */}
        <div className="relative mt-6">
          <div
            className="
              clay-surface-strong
              rounded-[28px] p-[6px]
            "
          >
            <div
              className="
                clay-inset
                relative overflow-hidden rounded-[22px]
                aspect-[1.05/1]
              "
            >
              <Image
                src="https://sofanmore.s3.eu-west-2.amazonaws.com/Image/3.webp"
                alt="Craftsman handcrafting bespoke sofa in the Sofa N More London workshop"
                fill
                className="object-cover object-center"
                sizes="100vw"
              />

              <div
                className="
                  pointer-events-none absolute inset-0
                  bg-[linear-gradient(180deg,rgba(255,255,255,0.05),transparent_28%,rgba(9,18,29,0.10))]
                "
              />
            </div>
          </div>

          <div className="absolute right-[-10px] top-[18px] z-20">
            <YearsBadge mobile />
          </div>
        </div>

        {/* CRAFTSMANSHIP BOX */}
        <div className="mt-5">
          <CraftsmanshipCard mobile />
        </div>

        {/* CTA */}
        <div className="mt-5">
          <ClayButton
            href="/services"
            variant="gold"
            size="lg"
            fullWidth
            showArrow
            ariaLabel="Discover our story"
          >
            Discover Our Services
          </ClayButton>
        </div>

        {/* STACKED HIGHLIGHTS */}
        <div className="mt-5 space-y-3">
          {highlights.map((item) => (
            <HighlightRow
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   SMALL PARTS
========================================================= */

function AboutEyebrow() {
  return (
    <div
      className="
        clay-surface-soft
        inline-flex w-fit items-center gap-2
        rounded-full px-4 py-2
      "
    >
      <Crown
        size={15}
        strokeWidth={1.8}
        className="text-[var(--brand-gold-700)]"
      />

      <span
        className="
          font-brand-sans
          text-[10px]
          font-bold uppercase
          tracking-[0.18em]
          text-[var(--brand-gold-700)]
        "
      >
        About Us
      </span>
    </div>
  );
}

function CraftsmanshipCard({ mobile = false }: { mobile?: boolean }) {
  return (
    <div
      className={`
        clay-surface-soft
        rounded-[28px]
        p-[7px]
      `}
    >
      <div
        className={`
          clay-inset
          rounded-[22px]
          ${mobile ? "px-4 py-4" : "grid grid-cols-[74px_1fr] gap-4 px-5 py-5"}
        `}
      >
        {mobile ? (
          <div className="flex items-start gap-3">
            <IconCircle>
              <Hammer
                size={22}
                strokeWidth={1.8}
                className="text-[var(--brand-gold-700)]"
              />
            </IconCircle>

            <div className="min-w-0 flex-1">
              <h3
                className="
                  font-brand-display
                  text-[20px]
                  font-semibold
                  leading-[1.1]
                  text-[var(--brand-navy)]
                "
              >
                Craftsmanship Excellence
              </h3>

              <div className="mt-2 h-px w-10 bg-[var(--brand-gold)]" />

              <p
                className="
                  mt-3
                  font-brand-sans
                  text-[11px]
                  font-medium leading-[1.7]
                  text-[var(--brand-text-muted)]
                "
              >
                {craftsmanshipText}
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="pt-1">
              <IconCircle>
                <Hammer
                  size={28}
                  strokeWidth={1.8}
                  className="text-[var(--brand-gold-700)]"
                />
              </IconCircle>
            </div>

            <div className="min-w-0">
              <h3
                className="
                  font-brand-display
                  text-[18px]
                  font-semibold
                  leading-[1.15]
                  text-[var(--brand-navy)]
                  xl:text-[19px]
                "
              >
                Craftsmanship Excellence
              </h3>

              <div className="mt-3 h-px w-11 bg-[var(--brand-gold)]" />

              <p
                className="
                  mt-4
                  font-brand-sans
                  text-[13px]
                  font-medium leading-[1.75]
                  text-[var(--brand-text-muted)]
                "
              >
                {craftsmanshipText}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function YearsBadge({ mobile = false }: { mobile?: boolean }) {
  return (
    <div
      className={`
        rounded-full border-[3px]
        border-[var(--brand-gold)]
        bg-[var(--brand-navy)]
        text-white
        shadow-[0_12px_24px_rgba(11,25,41,0.16)]
        ${mobile ? "h-[84px] w-[84px]" : "h-[112px] w-[112px]"}
      `}
    >
      <div
        className="
          flex h-full w-full flex-col items-center justify-center
          text-center
        "
      >
        <Crown
          size={mobile ? 14 : 18}
          strokeWidth={1.8}
          className="text-[var(--brand-gold)]"
        />

        <span
          className={`
            mt-1 font-brand-display font-semibold leading-none
            ${mobile ? "text-[18px]" : "text-[28px]"}
          `}
        >
          12+
        </span>

        <span
          className={`
            font-brand-sans font-bold uppercase tracking-[0.12em]
            text-[var(--brand-gold)]
            ${mobile ? "text-[10px]" : "text-[12px]"}
          `}
        >
          Years
        </span>

        <span className="mt-1 h-px w-4 bg-[var(--brand-gold)]" />
      </div>
    </div>
  );
}

function HighlightCard({
  title,
  icon: Icon,
}: {
  title: string;
  icon: React.ComponentType<{
    size?: number;
    strokeWidth?: number;
    className?: string;
  }>;
}) {
  return (
    <div className="clay-surface-soft rounded-[24px] p-[6px]">
      <div
        className="
          clay-inset
          flex min-h-[118px] items-center gap-4
          rounded-[20px] px-5 py-4
        "
      >
        <IconCircle small>
          <Icon
            size={26}
            strokeWidth={1.8}
            className="text-[var(--brand-gold-700)]"
          />
        </IconCircle>

        <div className="min-w-0">
          <h4
            className="
              whitespace-pre-line
              font-brand-display
              text-[18px]
              font-semibold
              leading-[1.08]
              text-[var(--brand-navy)]
            "
          >
            {title}
          </h4>

          <div className="mt-3 h-px w-7 bg-[var(--brand-gold)]" />
        </div>
      </div>
    </div>
  );
}

function HighlightRow({
  title,
  icon: Icon,
}: {
  title: string;
  icon: React.ComponentType<{
    size?: number;
    strokeWidth?: number;
    className?: string;
  }>;
}) {
  return (
    <div className="clay-surface-soft rounded-[22px] p-[5px]">
      <div
        className="
          clay-inset
          flex items-center gap-3
          rounded-[18px]
          px-3 py-3
        "
      >
        <IconCircle small>
          <Icon
            size={21}
            strokeWidth={1.8}
            className="text-[var(--brand-gold-700)]"
          />
        </IconCircle>

        <div className="min-w-0">
          <h4
            className="
              whitespace-pre-line
              font-brand-display
              text-[17px]
              font-semibold
              leading-[1.08]
              text-[var(--brand-navy)]
            "
          >
            {title}
          </h4>

          <div className="mt-2 h-px w-7 bg-[var(--brand-gold)]" />
        </div>
      </div>
    </div>
  );
}

function IconCircle({
  children,
  small = false,
}: {
  children: React.ReactNode;
  small?: boolean;
}) {
  return (
    <div
      className={`
        clay-surface-strong
        flex shrink-0 items-center justify-center
        rounded-full
        ${small ? "h-14 w-14" : "h-[72px] w-[72px]"}
      `}
    >
      {children}
    </div>
  );
}

/* =========================================================
   DECORATIONS
========================================================= */

function AboutUsDecorations() {
  return (
    <>
      {/* LEFT ARCH LINE */}
      <div
        aria-hidden
        className="
          absolute left-[-140px] top-[160px]
          hidden h-[420px] w-[280px]
          lg:block
        "
      >
        <div className="clay-surface-soft h-full w-full rounded-t-[180px] rounded-b-[48px] p-[10px] opacity-80">
          <div className="clay-inset h-full w-full rounded-t-[170px] rounded-b-[38px]" />
        </div>
      </div>

      {/* LEFT PEDESTAL */}
      <div
        aria-hidden
        className="
          absolute bottom-[22px] left-[8px]
          hidden lg:block
        "
      >
        <div className="relative h-[150px] w-[120px]">
          <div className="clay-surface-soft absolute bottom-0 left-0 h-[110px] w-[110px] rounded-[28px]" />
          <div className="clay-sphere absolute bottom-[36px] left-[8px] h-[92px] w-[92px]">
            <div className="clay-sphere-shadow" />
            <div className="clay-sphere-ball" />
          </div>
          <div className="clay-sphere absolute bottom-[8px] left-[86px] h-[28px] w-[28px]">
            <div className="clay-sphere-ball clay-sphere-ball--gold" />
          </div>
        </div>
      </div>

      {/* RIGHT GOLD RING */}
      <div
        aria-hidden
        className="
          absolute bottom-[32px] right-[110px]
          hidden h-[110px] w-[90px]
          lg:block
        "
      >
        <div
          className="
            h-full w-full rounded-[50%]
            border-[3px] border-[var(--brand-gold)]/75
            shadow-[inset_1px_1px_1px_rgba(255,255,255,0.4),0_4px_10px_rgba(138,101,41,0.12)]
          "
        />
      </div>

      {/* MOBILE SPHERE */}
      <div
        aria-hidden
        className="
          absolute bottom-4 right-3
          h-14 w-14 lg:hidden
        "
      >
        <div className="clay-sphere h-full w-full">
          <div className="clay-sphere-ball" />
        </div>
      </div>

      {/* MOBILE GOLD BALL */}
      <div
        aria-hidden
        className="
          absolute bottom-3 left-4
          h-5 w-5 lg:hidden
        "
      >
        <div className="clay-sphere h-full w-full">
          <div className="clay-sphere-ball clay-sphere-ball--gold" />
        </div>
      </div>
    </>
  );
}
