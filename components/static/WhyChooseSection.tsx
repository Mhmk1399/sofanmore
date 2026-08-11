import Image from "next/image";
import {
  Building2,
  Compass,
  Crown,
  Landmark,
  ShieldCheck,
  Sofa,
} from "lucide-react";
import ClayButton from "../ui/ClayButton";

type WhyChooseSectionProps = {
  desktopImageSrc?: string;
  mobileImageSrc?: string;
};

type FeatureItem = {
  title: string;
  description: string;
  icon: React.ComponentType<{
    size?: number;
    strokeWidth?: number;
    className?: string;
  }>;
};

const features: FeatureItem[] = [
  {
    title: "Handcrafted\nin London",
    description:
      "Made in our London workshop with expert attention to every detail.",
    icon: Landmark,
  },
  {
    title: "Bespoke\nby Design",
    description:
      "Furniture tailored around your space, requirements and lifestyle.",
    icon: Compass,
  },
  {
    title: "Premium\nQuality",
    description:
      "Refined materials, durable construction and uncompromising craftsmanship.",
    icon: ShieldCheck,
  },
  {
    title: "Residential &\nCommercial",
    description:
      "From private homes to offices, hospitality and commercial interiors.",
    icon: Building2,
  },
];

export default function WhyChooseSection({
  desktopImageSrc = "/assets/images/7.webp",
  mobileImageSrc = "/assets/images/2.webp",
}: WhyChooseSectionProps) {
  return (
    <section
      id="why-us"
      aria-labelledby="why-us-heading"
      className="
        relative overflow-hidden
        bg-[var(--brand-ivory)]
        px-3 py-12

        sm:px-5 sm:py-14
        lg:px-8 lg:py-20
      "
    >
      <div
        aria-hidden
        className="
          absolute inset-0
          bg-[linear-gradient(180deg,#fffdf8_0%,#f7efe4_56%,#f4ecdf_100%)]
        "
      />

      {/* =========================
          DESKTOP
      ========================== */}
      <div className="relative z-10 hidden lg:block">
        <DesktopWhyChoose imageSrc={desktopImageSrc} />
      </div>

      {/* =========================
          MOBILE
      ========================== */}
      <div className="relative z-10 lg:hidden">
        <MobileWhyChoose imageSrc={mobileImageSrc} />
      </div>
    </section>
  );
}

/* =========================================================
   DESKTOP
========================================================= */

function DesktopWhyChoose({ imageSrc }: { imageSrc: string }) {
  return (
    <div
      className="
        clay-surface-strong
        relative mx-auto max-w-[1320px]
        rounded-[48px] p-[10px]
      "
    >
      {/* background decoration */}
      <div
        aria-hidden
        className="
          absolute inset-0 overflow-hidden rounded-[48px]
        "
      >
        {/* left arch */}
        <div
          className="
            absolute left-[18px] top-[58px]
            h-[370px] w-[250px]
            rounded-t-[130px]
            border-[24px]
            border-[var(--brand-ivory-50)]
            border-b-0
            opacity-90
            shadow-[var(--shadow-clay-inset)]
          "
        />

        {/* left sphere */}
        <div
          className="
            clay-sphere
            absolute left-[42px] bottom-[110px]
            h-[115px] w-[115px]
          "
        >
          <div className="clay-sphere-shadow" />
          <div className="clay-sphere-ball" />
        </div>

        {/* left podium */}
        <div
          className="
            clay-surface-soft
            absolute bottom-[38px] left-[12px]
            h-[52px] w-[260px]
            rounded-[50%]
          "
        />
        <div
          className="
            clay-surface-soft
            absolute bottom-[0px] left-[54px]
            h-[42px] w-[210px]
            rounded-[50%]
          "
        />

        {/* ring */}
        <div
          className="
            absolute bottom-[34px] left-[74px]
            h-[86px] w-[86px]
          "
        >
          <div className="clay-sphere-ring" />
        </div>

        {/* right sphere */}
        <div
          className="
            clay-sphere
            absolute right-[12px] bottom-[76px]
            h-[120px] w-[120px]
          "
        >
          <div className="clay-sphere-shadow" />
          <div className="clay-sphere-ball" />
        </div>

        {/* gold sphere */}
        <div
          className="
            clay-sphere
            absolute bottom-[18px] right-[86px]
            h-[44px] w-[44px]
          "
        >
          <div className="clay-sphere-ball clay-sphere-ball--gold" />
        </div>
      </div>

      <div
        className="
          relative z-10
          grid grid-cols-[0.9fr_1.1fr]
          gap-10
          px-10 py-8

          xl:px-14 xl:py-10
        "
      >
        <DesktopVisual imageSrc={imageSrc} />
        <DesktopContent />
      </div>
    </div>
  );
}

function DesktopVisual({ imageSrc }: { imageSrc: string }) {
  return (
    <div className="relative flex items-center">
      {/* framed visual */}
      <div
        className="
          clay-surface-strong
          relative ml-8 mt-10
          w-full max-w-[520px]
          rounded-[42px] p-[9px]
        "
      >
        <div
          className="
            clay-inset
            rounded-[34px] p-[8px]
          "
        >
          <div
            className="
              relative h-[500px] overflow-hidden
              rounded-[28px]
            "
          >
            <Image
              src={imageSrc}
              alt="Sofa N More London craftsmanship"
              fill
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="object-cover object-center"
            />
          </div>
        </div>

        {/* navy badge */}
        <div
          className="
            clay-surface-strong
            absolute -left-[38px] top-[36px]
            z-20 flex h-[128px] w-[128px]
            items-center justify-center
            rounded-full p-[6px]
          "
        >
          <div
            className="
              clay-dark
              flex h-full w-full flex-col
              items-center justify-center
              rounded-full border
              border-[var(--brand-gold)]
              text-center
            "
          >
            <Crown
              size={19}
              strokeWidth={1.5}
              className="mb-2 text-[var(--brand-gold)]"
            />
            <span
              className="
                font-brand-display
                text-[18px]
                leading-[1.05]
                text-[var(--brand-ivory-50)]
              "
            >
              London
              <br />
              Crafted
            </span>
            <span className="mt-2 h-px w-7 bg-[var(--brand-gold)]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function DesktopContent() {
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
          rounded-[34px]
          px-10 pb-8 pt-9
          xl:px-12
        "
      >
        <div className="text-center">
          <div className="mb-4 flex items-center justify-center gap-4">
            <span className="h-px w-16 bg-[var(--brand-gold)]/60" />
            <span
              className="
                font-brand-sans
                text-[11px] font-bold uppercase
                tracking-[0.28em]
                text-[var(--brand-gold-700)]
              "
            >
              Why Us
            </span>
            <span className="h-px w-16 bg-[var(--brand-gold)]/60" />
          </div>

          <h2
            id="why-us-heading"
            className="
              font-brand-display
              text-[clamp(36px,3.4vw,60px)]
              font-semibold leading-[1.02]
              tracking-[-0.03em]
              text-[var(--brand-navy)]
            "
          >
            Why Choose Sofa N More?
          </h2>

          <p
            className="
              mx-auto mt-4 max-w-[610px]
              font-brand-sans text-[14px]
              font-medium leading-[1.65]
              text-[var(--brand-text-muted)]
            "
          >
            London craftsmanship, premium materials and bespoke design — created
            to bring lasting comfort, character and functionality to exceptional
            spaces.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4">
          {features.map((item) => (
            <WhyFeatureCard key={item.title} item={item} compact={false} />
          ))}
        </div>

        <div className="mt-8">
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-[42%] bg-[var(--brand-gold)]/35" />
            <span className="h-2 w-2 rounded-full bg-[var(--brand-gold)]/85" />
            <span className="h-px w-[42%] bg-[var(--brand-gold)]/35" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <ClayButton
              href="/contact"
              variant="navy"
              size="lg"
              fullWidth
              showArrow
              startIcon={<Sofa size={18} strokeWidth={1.6} />}
              ariaLabel="Visit our showroom"
              className="!min-h-[66px]"
            >
              Visit Our Showroom
            </ClayButton>

            <ClayButton
              href="/our-work"
              variant="ivory"
              size="lg"
              fullWidth
              showArrow
              ariaLabel="View our portfolio"
              className="!min-h-[66px] border  border-[var(--brand-gold)]/55"
            >
              View Our Portfolio
            </ClayButton>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   MOBILE
========================================================= */

function MobileWhyChoose({ imageSrc }: { imageSrc: string }) {
  return (
    <div
      className="
        clay-surface-strong
        relative mx-auto max-w-[430px]
        overflow-hidden rounded-[34px] p-[7px]
      "
    >
      {/* mobile background decor */}
      <div
        aria-hidden
        className="
          absolute inset-0 overflow-hidden
          rounded-[34px]
        "
      >
        <div
          className="
            absolute left-1/2 top-[0px]
            h-[300px] w-[320px] -translate-x-1/2
            rounded-t-[160px]
            border-[22px]
            border-[var(--brand-ivory-50)]
            border-b-0
            shadow-[var(--shadow-clay-inset)]
          "
        />
        <div
          className="
            clay-sphere
            absolute -right-[36px] top-[14px]
            h-[110px] w-[110px]
          "
        >
          <div className="clay-sphere-shadow" />
          <div className="clay-sphere-ball" />
        </div>

        <div
          className="
            absolute -left-[12px] bottom-[18px]
            h-[70px] w-[70px]
          "
        >
          <div className="clay-sphere-ring" />
        </div>

        <div
          className="
            clay-sphere
            absolute bottom-[14px] right-[12px]
            h-[24px] w-[24px]
          "
        >
          <div className="clay-sphere-ball clay-sphere-ball--gold" />
        </div>
      </div>

      <div
        className="
          relative z-10
          px-4 pb-5 pt-5
        "
      >
        <div className="text-center">
          <div className="mb-3 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[var(--brand-gold)]/60" />
            <span
              className="
                font-brand-sans text-[9px]
                font-bold uppercase
                tracking-[0.26em]
                text-[var(--brand-gold-700)]
              "
            >
              Why Us
            </span>
            <span className="h-px w-8 bg-[var(--brand-gold)]/60" />
          </div>

          <h2
            className="
              font-brand-display
              text-[32px]
              font-semibold
              leading-[1.02]
              tracking-[-0.03em]
              text-[var(--brand-navy)]

              min-[390px]:text-[36px]
            "
          >
            Why Choose
            <br />
            Sofa N More?
          </h2>

          <p
            className="
              mx-auto mt-3 max-w-[290px]
              font-brand-sans text-[11px]
              font-medium leading-[1.45]
              text-[var(--brand-text-muted)]
            "
          >
            London craftsmanship, premium materials and bespoke design — created
            for exceptional spaces.
          </p>
        </div>

        <div
          className="
            clay-surface-strong
            relative mt-5 rounded-[28px] p-[7px]
          "
        >
          <div
            className="
              clay-inset
              rounded-[23px] p-[5px]
            "
          >
            <div
              className="
                relative h-[185px] overflow-hidden
                rounded-[18px]

                min-[390px]:h-[205px]
              "
            >
              <Image
                src={imageSrc}
                alt="Sofa N More craftsmanship"
                fill
                sizes="100vw"
                className="object-cover object-center"
              />
            </div>
          </div>

          <div
            className="
              clay-surface-strong
              absolute -bottom-[14px] right-[14px]
              z-20 flex h-[88px] w-[88px]
              items-center justify-center rounded-full p-[5px]
            "
          >
            <div
              className="
                clay-dark
                flex h-full w-full flex-col
                items-center justify-center
                rounded-full border border-[var(--brand-gold)]
                text-center
              "
            >
              <Crown
                size={14}
                strokeWidth={1.5}
                className="mb-1 text-[var(--brand-gold)]"
              />
              <span
                className="
                  font-brand-display
                  text-[14px]
                  leading-[1.03]
                  text-[var(--brand-ivory-50)]
                "
              >
                London
                <br />
                Crafted
              </span>
            </div>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3">
          {features.map((item) => (
            <WhyFeatureCard key={item.title} item={item} compact />
          ))}
        </div>

        <div className="mt-5 space-y-3">
          <ClayButton
            href="/contact"
            variant="navy"
            size="lg"
            fullWidth
            showArrow
            startIcon={<Sofa size={16} strokeWidth={1.6} />}
            ariaLabel="Visit our showroom"
            className="!min-h-[58px] !justify-between"
          >
            Visit Our Showroom
          </ClayButton>

          <ClayButton
            href="/our-work"
            variant="ivory"
            size="lg"
            fullWidth
            showArrow
            ariaLabel="View our portfolio"
            className="!min-h-[54px] border  border-[var(--brand-gold)]/50"
          >
            View Our Portfolio
          </ClayButton>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   FEATURE CARD
========================================================= */

function WhyFeatureCard({
  item,
  compact,
}: {
  item: FeatureItem;
  compact?: boolean;
}) {
  const Icon = item.icon;

  return (
    <div
      className={`
        clay-surface
        flex items-start gap-3
        rounded-[22px]

        ${compact ? "min-h-[112px] px-3 py-3" : "min-h-[150px] px-5 py-4"}
      `}
    >
      <div
        className={`
          clay-icon
          flex shrink-0 items-center justify-center
          rounded-full

          ${compact ? "h-[48px] w-[48px]" : "h-[58px] w-[58px]"}
        `}
      >
        <Icon
          size={compact ? 21 : 25}
          strokeWidth={1.5}
          className="text-[var(--brand-gold)]"
        />
      </div>

      <div className="min-w-0">
        <h3
          className={`
            font-brand-display
            font-semibold leading-[1.04]
            text-[var(--brand-navy)]

            ${compact ? "text-[14px]" : "text-[19px]"}
          `}
          style={{ whiteSpace: "pre-line" }}
        >
          {item.title}
        </h3>

        <p
          className={`
            mt-2 font-brand-sans font-medium
            leading-[1.42] text-[var(--brand-text-muted)]

            ${compact ? "text-[10px]" : "text-[13px]"}
          `}
        >
          {item.description}
        </p>
      </div>
    </div>
  );
}
