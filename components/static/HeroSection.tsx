import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  Armchair,
  Building2,
  Crown,
  Diamond,
  Hammer,
  Landmark,
  MoveRight,
  Palette,
  Phone,
  ShieldCheck,
  Star,
} from "lucide-react";
import ClayButton from "../ui/ClayButton";

/* =========================================================
   TYPES
========================================================= */

type Service = {
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  image: string;
  href: string;
};

type TrustItem = {
  title: string;
  subtitle: string;
  icon: LucideIcon;
};

/* =========================================================
   DATA
========================================================= */

const services: Service[] = [
  {
    title: "Bespoke sofa",
    subtitle: "Made for your space",
    description:
      "Custom-designed sofa tailored to your exact specifications and style.",
    icon: Armchair,
    image: "/assets/images/1.webp",
    href: "/services/bespoke-sofas",
  },
  {
    title: "Commercial sofa",
    subtitle: "Built for business",
    description:
      "Durable, elegant sofa solutions for offices, hotels, and restaurants.",
    icon: Building2,
    image: "/assets/images/2.webp",
    href: "/services/commercial-sofas",
  },
  {
    title: "Interior Design",
    subtitle: "Complete environments",
    description:
      "Full interior design services to transform your space from concept to completion.",
    icon: Palette,
    image: "/assets/images/3.webp",
    href: "/services/interior-design",
  },
  {
    title: "Repair & Restoration",
    subtitle: "Expert craftsmanship",
    description:
      "Professional restoration of antique and damaged sofa to its former glory.",
    icon: Hammer,
    image: "/assets/images/4.webp",
    href: "/services/sofa-repair-restoration",
  },
];

const trustItems: TrustItem[] = [
  {
    title: "Handcrafted",
    subtitle: "in London",
    icon: Landmark,
  },
  {
    title: "12+ Years",
    subtitle: "Experience",
    icon: ShieldCheck,
  },
  {
    title: "Premium",
    subtitle: "Materials",
    icon: Diamond,
  },
];

/* =========================================================
   ROOT — semantic <header> for SEO, with JSON-LD
========================================================= */

export default function HeroSection() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": "https://sofanmore.co.uk/#home-services",
    name: "Sofa N More service highlights",
    numberOfItems: services.length,
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.title,
        description: service.description,
        url: `https://sofanmore.co.uk${service.href}`,
        provider: {
          "@id": "https://sofanmore.co.uk/#organization",
        },
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <section
        aria-labelledby="hero-heading"
        className="
          hero-section
          relative
          overflow-hidden
          bg-[var(--brand-ivory)]
          text-[var(--brand-navy)]
          lg:h-[100dvh]
          lg:min-h-[680px]
          lg:max-h-[1100px]
        "
      >
        <HeroBackground />

        <div
          className="
            relative z-10
            mx-auto w-full
            max-w-[var(--site-width)]
            px-4 pb-8 pt-[90px]
            sm:px-6
            md:px-8
            lg:flex lg:h-full lg:items-center
            lg:px-6 lg:pb-4 lg:pt-[110px]
            xl:px-8
          "
        >
          {/* Desktop layout */}
          <DesktopHero />

          {/* Tablet layout */}
          <TabletHero />

          {/* Mobile layout */}
          <MobileHero />
        </div>
      </section>
    </>
  );
}

/* =========================================================
   SCROLL INDICATOR
========================================================= */

/* =========================================================
   BACKGROUND — with preload hint
========================================================= */

function HeroBackground() {
  return (
    <>
      {/* Desktop background */}
      <div
        aria-hidden
        className="
          absolute inset-0
          hidden lg:block
        "
      >
        <Image
          src="/assets/images/herodesktop.webp"
          alt=""
          fill
          quality={75}
          loading="eager"
          fetchPriority="high"
          sizes="100vw"
          className="
            object-cover object-center
            opacity-[0.42] saturate-[0.75]
          "
        />
      </div>

      {/* Mobile / Tablet background */}
      <div
        aria-hidden
        className="
          absolute inset-0
          lg:hidden
        "
      >
        <Image
          src="/assets/images/heromobile.webp"
          alt=""
          fill
          quality={70}
          loading="eager"
          fetchPriority="high"
          sizes="100vw"
          className="
            object-cover object-center
            opacity-[0.44]
          "
        />
      </div>

      {/* Luxury radial wash */}
      <div
        aria-hidden
        className="
          pointer-events-none absolute inset-0
          bg-[radial-gradient(ellipse_at_center,rgba(255,253,248,0.06)_0%,rgba(245,242,234,0.22)_50%,rgba(241,234,223,0.42)_100%)]
        "
      />

      {/* Bottom fade for scroll indicator */}
      <div
        aria-hidden
        className="
          pointer-events-none absolute bottom-0 left-0 right-0
          hidden h-28
          bg-gradient-to-t from-[var(--brand-ivory)]/60 to-transparent
          lg:block
        "
      />
    </>
  );
}

/* =========================================================
   DESKTOP LAYOUT  (≥1024px)
========================================================= */

function DesktopHero() {
  return (
    <div
      className="
        hidden w-full
        lg:block
      "
    >
      <div
        className="
          mx-auto
          grid w-full max-w-[1400px]
          grid-cols-[155px_minmax(0,1fr)_155px]
          items-center gap-5
          xl:grid-cols-[180px_minmax(0,1fr)_180px]
          xl:gap-6
          2xl:grid-cols-[195px_minmax(0,1fr)_195px]
        "
      >
        {/* LEFT SERVICE RAIL */}
        <nav aria-label="Services left" className="flex flex-col gap-4">
          <ServiceCard service={services[0]} index={0} />
          <ServiceCard service={services[1]} index={1} />
        </nav>

        {/* CENTER */}
        <div className="flex min-w-0 flex-col items-center">
          <MainHero />
          <div className="mt-4 w-[min(640px,86%)]">
            <TrustDock />
          </div>
        </div>

        {/* RIGHT SERVICE RAIL */}
        <nav aria-label="Services right" className="flex flex-col gap-4">
          <ServiceCard service={services[2]} index={2} />
          <ServiceCard service={services[3]} index={3} />
        </nav>
      </div>
    </div>
  );
}

/* =========================================================
   MAIN HERO CARD
========================================================= */

function MainHero() {
  return (
    <div
      className="
        clay-surface-strong
        hero-main-shell
        w-full
        rounded-[42px] p-[9px]
        xl:rounded-[48px] xl:p-[10px]
      "
    >
      <div
        className="
          clay-inset
          h-full
          rounded-[34px] p-[8px]
          xl:rounded-[39px]
        "
      >
        <div
          className="
            grid h-full min-h-0 min-w-0
            grid-cols-[44%_56%] gap-[8px]
          "
        >
          <HeroCopy />
          <HeroImage />
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   HERO COPY — with proper heading hierarchy
========================================================= */

function HeroCopy() {
  return (
    <div
      className="
        clay-dark
        relative flex min-w-0
        flex-col justify-center
        overflow-hidden
        rounded-[27px]
        px-[clamp(22px,2.8vw,44px)] py-6
      "
    >
      {/* Decorative volume */}
      <div
        aria-hidden
        className="
          pointer-events-none absolute -left-16 -top-20
          h-[200px] w-[200px] rounded-full
          bg-white/[0.02]
          shadow-[inset_14px_14px_30px_rgba(255,255,255,0.025),inset_-14px_-14px_28px_rgba(0,0,0,0.12)]
        "
      />

      <div className="relative z-10">
        {/* Eyebrow */}
        <div className="mb-[clamp(14px,2.2vh,24px)] flex items-center gap-3">
          <span
            className="
              flex h-10 w-10 shrink-0 items-center justify-center
              rounded-[14px]
              bg-white/[0.06]
              shadow-[inset_2px_2px_3px_rgba(255,255,255,0.08),inset_-2px_-2px_5px_rgba(0,0,0,0.13)]
            "
            aria-hidden
          >
            <Crown
              size={18}
              strokeWidth={1.6}
              className="text-[var(--brand-gold)]"
            />
          </span>

          <span
            className="
              font-brand-sans text-[10px] font-bold uppercase
              tracking-[0.12em] text-[var(--brand-gold)]
              xl:text-[11px]
            "
          >
            London Craftsmanship
          </span>
        </div>

        {/* H1 — single h1 for SEO */}
        <h1
          id="hero-heading"
          className="
            font-brand-display
            text-[clamp(34px,3.2vw,54px)]
            font-semibold leading-[1.05]
            tracking-[-0.025em]
            text-[var(--brand-ivory-50)]
          "
        >
          Where Luxury
          <br />
          Meets
          <br />
          <span className="text-[var(--brand-gold-300)]">Craftsmanship</span>
        </h1>

        {/* Accent bar */}
        <div
          aria-hidden
          className="
            my-[clamp(14px,2vh,22px)]
            h-[3px] w-11 rounded-full
            bg-[var(--brand-gold)]
          "
        />

        {/* Description */}
        <p
          className="
            max-w-[340px] font-brand-sans
            text-[clamp(11px,0.95vw,14.5px)]
            font-medium leading-[1.7]
            text-white/70
          "
        >
          Bespoke sofa, commercial interiors &amp; expert restoration —
          handcrafted in London with premium materials.
        </p>

        {/* CTAs */}
        <div className="mt-[clamp(16px,2.4vh,28px)] flex flex-wrap gap-3">
          <ClayButton
            href="/contact-us"
            variant="gold"
            size="md"
            showArrow
            aria-label="Start your bespoke sofa project"
          >
            Start Your Project
          </ClayButton>

          <ClayButton
            href="/gallery"
            variant="navy"
            size="md"
            showArrow
            aria-label="View our sofa gallery"
          >
            Our Work
          </ClayButton>
        </div>

        {/* Social proof micro-element */}
        <div className="mt-[clamp(14px,2vh,22px)] flex items-center gap-2.5">
          <div className="flex -space-x-1.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                size={11}
                fill="var(--brand-gold)"
                strokeWidth={0}
                className="text-[var(--brand-gold)]"
              />
            ))}
          </div>
          <span className="font-brand-sans text-[9px] font-semibold text-white/50 xl:text-[10px]">
            Trusted by 200+ London clients
          </span>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   HERO IMAGE
========================================================= */

function HeroImage() {
  return (
    <div
      className="
        clay-inset
        relative min-w-0 overflow-hidden
        rounded-[27px] p-[6px]
      "
    >
      <div className="relative h-full overflow-hidden rounded-[22px]">
        <Image
          src="/assets/site/4.webp"
          alt="Luxury bespoke sofa handcrafted in our London workshop, featuring premium Italian leather upholstery"
          fill
          loading="eager"
          fetchPriority="high"
          sizes="(min-width: 1280px) 38vw, (min-width: 1024px) 32vw, 100vw"
          className="object-cover object-left"
        />

        {/* Image overlay */}
        <div
          aria-hidden
          className="
            pointer-events-none absolute inset-0
            bg-[linear-gradient(135deg,rgba(18,37,62,0.1),transparent_40%)]
          "
        />
      </div>
    </div>
  );
}

/* =========================================================
   SERVICE CARD — with stagger animation classes
========================================================= */

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = service.icon;

  return (
    <Link
      href={service.href}
      aria-label={`${service.title} — ${service.subtitle}`}
      className={`
        clay-surface
        group relative
        flex min-h-[180px] w-full flex-col
        rounded-[28px] p-3.5
        transition-all duration-300
        hover:-translate-y-[3px]
        hover:shadow-[var(--shadow-clay-lg)]
        focus-visible:outline-2 focus-visible:outline-offset-4
        focus-visible:outline-[var(--brand-gold)]
          
        hero-card-stagger-${index}
      `}
    >
      {/* Top row */}
      <div className="flex items-center justify-between">
        <span
          className="
            clay-icon-inset
            flex h-[44px] w-[44px] shrink-0
            items-center justify-center
            rounded-[15px]
          "
        >
          <Icon
            size={20}
            strokeWidth={1.5}
            className="text-[var(--brand-gold)]"
            aria-hidden
          />
        </span>

        <span
          className="
            clay-icon
            flex h-8 w-8 items-center justify-center
            rounded-full
            text-[var(--brand-gold-700)]
            transition-transform duration-300
            group-hover:translate-x-[3px]
          "
          aria-hidden
        >
          <MoveRight size={12} strokeWidth={1.8} />
        </span>
      </div>

      {/* Bottom */}
      <div
        className="
          mt-3 grid min-h-0 flex-1
          grid-cols-[1fr_56px] items-end gap-2
          xl:grid-cols-[1fr_66px]
        "
      >
        <div className="min-w-0 pb-1">
          <span
            className="
              block
              font-brand-display text-[13px] font-semibold
              leading-[1.14] text-[var(--brand-navy)]
              xl:text-[14px]
            "
          >
            {service.title}
          </span>

          <p
            className="
              mt-1.5 font-brand-sans text-[8px]
              font-semibold leading-[1.4]
              text-[var(--brand-text-muted)]
              xl:text-[9px]
            "
          >
            {service.subtitle}
          </p>
        </div>

        {/* Thumbnail */}
        <div
          className="
            clay-inset
            relative h-[62px] w-20 overflow-hidden
            rounded-[18px] p-[4px]
            xl:h-[90px]
          "
        >
          <div className="relative h-full overflow-hidden rounded-[14px]">
            <Image
              src={service.image}
              alt={`${service.title} example`}
              fill
              sizes="70px"
              loading="lazy"
              className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>
      </div>
    </Link>
  );
}

/* =========================================================
   TRUST DOCK
========================================================= */

function TrustDock() {
  return (
    <div
      role="region"
      aria-label="Our credentials"
      className="
        clay-surface-strong mt-3
        rounded-[26px] p-[6px]
      "
    >
      <div
        className="
          clay-inset
          grid grid-cols-3
          rounded-[20px] px-2 py-3
        "
      >
        {trustItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className={`
                flex min-w-0 items-center
                justify-center gap-2.5 px-2
                ${index ? "border-l border-black/[0.07]" : ""}
              `}
            >
              <span
                className="
                  clay-icon
                  flex h-[40px] w-[40px] shrink-0
                  items-center justify-center
                  rounded-[14px]
                "
              >
                <Icon
                  size={18}
                  strokeWidth={1.4}
                  className="text-[var(--brand-gold)]"
                  aria-hidden
                />
              </span>

              <div className="min-w-0">
                <div
                  className="
                    font-brand-display text-[11px]
                    font-semibold leading-tight
                    xl:text-[12px]
                  "
                >
                  {item.title}
                </div>
                <div
                  className="
                    mt-0.5 font-brand-sans text-[8px]
                    font-semibold text-[var(--brand-text-muted)]
                  "
                >
                  {item.subtitle}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* =========================================================
   TABLET LAYOUT  (≥640px & <1024px)
========================================================= */

function TabletHero() {
  return (
    <div
      className="
        hidden w-full
        sm:block lg:hidden
      "
    >
      {/* Main hero card */}
      <TabletMainHero />

      {/* Services grid — 2x2 */}
      <nav aria-label="Our services" className="mt-5 grid grid-cols-2 gap-4">
        {services.map((service) => (
          <TabletServiceCard key={service.title} service={service} />
        ))}
      </nav>

      {/* Trust */}
      <div className="mt-5">
        <TabletTrust />
      </div>
    </div>
  );
}

/* =========================================================
   TABLET MAIN HERO
========================================================= */

function TabletMainHero() {
  return (
    <div
      className="
        clay-surface-strong
        rounded-[36px] p-[8px]
      "
    >
      <div className="clay-inset rounded-[29px] p-[7px]">
        <div className="grid grid-cols-[45%_55%] gap-[7px]">
          {/* Copy side */}
          <div
            className="
              clay-dark
              relative flex flex-col justify-center
              overflow-hidden rounded-[23px]
              px-6 py-7
            "
          >
            <div className="relative z-10">
              {/* Eyebrow */}
              <div className="mb-4 flex items-center gap-2.5">
                <span
                  className="
                    flex h-9 w-9 shrink-0 items-center justify-center
                    rounded-[12px] bg-white/[0.06]
                  "
                >
                  <Crown
                    size={16}
                    strokeWidth={1.6}
                    className="text-[var(--brand-gold)]"
                  />
                </span>
                <span className="font-brand-sans text-[9px] font-bold uppercase tracking-[0.12em] text-[var(--brand-gold)]">
                  London Craftsmanship
                </span>
              </div>

              <h1
                id="hero-heading"
                className="
                  font-brand-display text-[clamp(28px,4.5vw,40px)]
                  font-semibold leading-[1.06]
                  tracking-[-0.02em]
                  text-[var(--brand-ivory-50)]
                  sm:block lg:hidden
                "
              >
                Where Luxury
                <br />
                Meets{" "}
                <span className="text-[var(--brand-gold-300)]">
                  Craftsmanship
                </span>
              </h1>

              <div
                aria-hidden
                className="my-4 h-[2.5px] w-10 rounded-full bg-[var(--brand-gold)]"
              />

              <p className="max-w-[280px] font-brand-sans text-[11px] font-medium leading-[1.65] text-white/65">
                Bespoke sofa, commercial interiors &amp; expert restoration,
                handcrafted in London.
              </p>

              <div className="mt-5 flex flex-wrap gap-2.5">
                <ClayButton
                  href="/contact-us"
                  variant="gold"
                  size="sm"
                  showArrow
                >
                  Start Your Project
                </ClayButton>
                <ClayButton href="/gallery" variant="navy" size="sm" showArrow>
                  View Our Work
                </ClayButton>
              </div>

              {/* Stars */}
              <div className="mt-4 flex items-center gap-2">
                <div className="flex -space-x-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      size={10}
                      fill="var(--brand-gold)"
                      strokeWidth={0}
                      className="text-[var(--brand-gold)]"
                    />
                  ))}
                </div>
                <span className="font-brand-sans text-[8px] font-semibold text-white/45">
                  200+ happy clients
                </span>
              </div>
            </div>
          </div>

          {/* Image side */}
          <div className="clay-inset relative overflow-hidden rounded-[23px] p-[5px]">
            <div className="relative h-full min-h-[380px] overflow-hidden rounded-[19px]">
              <Image
                src="/assets/site/5.webp"
                alt="Luxury handcrafted sofa by Sofa N More London"
                fill
                loading="eager"
                fetchPriority="high"
                sizes="(min-width: 640px) 55vw, 100vw"
                className="object-cover object-center"
              />

              {/* Badge */}
              <div
                className="
                  clay-surface-soft
                  absolute left-3 top-3 z-20
                  flex items-center gap-2
                  rounded-[14px] border border-white/75
                  px-3 py-2
                "
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-[10px] bg-[var(--brand-gold)] text-white">
                  <Crown size={12} strokeWidth={1.8} />
                </span>
                <div className="flex flex-col">
                  <span className="font-brand-sans text-[9px] font-extrabold uppercase text-[var(--brand-navy)]">
                    Bespoke
                  </span>
                  <span className="font-brand-sans text-[7.5px] font-semibold text-[var(--brand-text-muted)]">
                    Made to Measure
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   TABLET SERVICE CARD
========================================================= */

function TabletServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;

  return (
    <Link
      href={service.href}
      aria-label={`${service.title} — ${service.description}`}
      className="
        clay-surface
        group relative
        flex min-h-[130px] flex-col
        rounded-[26px] p-4
        transition-all duration-300
        hover:-translate-y-[2px]
        focus-visible:outline-2 focus-visible:outline-offset-4
        focus-visible:outline-[var(--brand-gold)]
      "
    >
      <div className="flex items-center justify-between">
        <span className="clay-icon-inset flex h-11 w-11 items-center justify-center rounded-[14px]">
          <Icon
            size={20}
            strokeWidth={1.5}
            className="text-[var(--brand-gold)]"
          />
        </span>
        <span className="clay-icon flex h-8 w-8 items-center justify-center rounded-full transition-transform duration-300 group-hover:translate-x-1">
          <MoveRight size={12} className="text-[var(--brand-gold-700)]" />
        </span>
      </div>

      <div className="mt-3 grid flex-1 grid-cols-[1fr_60px] items-end gap-3">
        <div>
          <span className="block font-brand-display text-[14px] font-semibold leading-tight text-[var(--brand-navy)]">
            {service.title}
          </span>
          <p className="mt-1.5 font-brand-sans text-[9px] font-semibold leading-[1.4] text-[var(--brand-text-muted)]">
            {service.subtitle}
          </p>
        </div>

        <div className="clay-inset relative h-[60px] overflow-hidden rounded-[16px] p-[4px]">
          <div className="relative h-full overflow-hidden rounded-[12px]">
            <Image
              src={service.image}
              alt={`${service.title} preview`}
              fill
              sizes="60px"
              loading="lazy"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>
      </div>
    </Link>
  );
}

/* =========================================================
   TABLET TRUST
========================================================= */

function TabletTrust() {
  return (
    <div
      role="region"
      aria-label="Our credentials"
      className="clay-surface-strong rounded-[26px] p-[6px]"
    >
      <div className="clay-inset grid grid-cols-3 rounded-[20px] px-2 py-3.5">
        {trustItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className={`
                flex items-center justify-center gap-2.5 px-3
                ${index ? "border-l border-black/[0.07]" : ""}
              `}
            >
              <span className="clay-icon flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px]">
                <Icon
                  size={18}
                  strokeWidth={1.4}
                  className="text-[var(--brand-gold)]"
                />
              </span>
              <div>
                <div className="font-brand-display text-[12px] font-semibold leading-tight">
                  {item.title}
                </div>
                <div className="mt-0.5 font-brand-sans text-[8px] font-semibold text-[var(--brand-text-muted)]">
                  {item.subtitle}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
/* =========================================================
   MOBILE LAYOUT  (<640px)
========================================================= */

function MobileHero() {
  return (
    <div className="space-y-5 -mt-16 sm:hidden">
      <MobileHeroLogo />
      <MobileHeroMain />

      <nav aria-label="Our services" className="grid grid-cols-2 gap-3.5">
        {services.map((service) => (
          <MobileServiceCard key={service.title} service={service} />
        ))}
      </nav>

      <MobileTrust />
      <MobileStickyBar />
    </div>
  );
}

function MobileHeroLogo() {
  return (
    <div className="relative flex justify-center pb-2" aria-label="Sofa N More">
      <div
        className="
          clay-surface-strong
          relative rounded-[30px] p-[7px]
        "
      >
        <div
          className="
            clay-inset
            relative flex h-[68px] w-[228px]
            items-center justify-center
            overflow-hidden rounded-[24px]
          "
        >
          <div
            aria-hidden
            className="
              pointer-events-none absolute inset-0
              bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.64),transparent_58%)]
            "
          />

          <div className="relative h-[54px] w-[190px]">
            <Image
              src="/assets/images/Sofa_Logo.webp"
              alt="Sofa N More"
              fill
              loading="eager"
              sizes="190px"
              className="object-contain drop-shadow-[0_4px_10px_rgba(18,37,62,0.12)]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   MOBILE HERO MAIN
========================================================= */

function MobileHeroMain() {
  return (
    <div className="clay-surface-strong rounded-[32px] p-[7px]">
      <div className="clay-inset rounded-[26px] p-[6px]">
        <div
          className="
            relative min-h-[500px] overflow-hidden
            rounded-[21px] bg-[var(--brand-ivory-100)]
          "
        >
          {/* Image background */}
          <Image
            src="/assets/site/5.webp"
            alt="Bespoke luxury sofa by Sofa N More, handcrafted in London"
            fill
            loading="eager"
            fetchPriority="high"
            sizes="100vw"
            className="object-cover object-center"
          />

          <div
            aria-hidden
            className="
              pointer-events-none absolute inset-0
              bg-[linear-gradient(180deg,rgba(7,20,33,0.08)_0%,rgba(7,20,33,0.18)_36%,rgba(7,20,33,0.88)_100%)]
            "
          />

          <div
            aria-hidden
            className="
              pointer-events-none absolute inset-0
              bg-[radial-gradient(circle_at_26%_18%,rgba(255,253,248,0.26),transparent_34%)]
            "
          />

          {/* Top badge */}
          <div
            className="
              clay-surface-soft
              absolute left-3 top-3 z-20
              flex items-center gap-2
              rounded-[14px] px-2.5 py-2
            "
          >
            <span className="clay-icon-inset flex h-7 w-7 items-center justify-center rounded-[10px]">
              <Landmark size={13} className="text-[var(--brand-gold)]" />
            </span>
            <span className="font-brand-sans text-[7.5px] font-bold leading-[1.25]">
              Handcrafted
              <br />
              in London
            </span>
          </div>

          {/* Copy */}
          <div
            className="
              relative z-10
              flex min-h-[500px] w-full flex-col
              justify-end px-5 pb-7 pt-[96px]
            "
          >
            <h1
              id="hero-heading"
              className="
                max-w-[260px]
                font-brand-display text-[32px]
                font-semibold leading-[1.04]
                tracking-[-0.02em]
                text-[var(--brand-ivory-50)]
                sm:hidden
              "
            >
              Crafted in
              <br />
              London.
              <br />
              <span className="text-[var(--brand-gold-300)]">
                Made for
                <br />
                Your Space.
              </span>
            </h1>

            <div
              aria-hidden
              className="my-3.5 h-[2px] w-9 bg-[var(--brand-gold)]"
            />

            <p
              className="
                max-w-[245px] font-brand-sans text-[10px]
                font-semibold leading-[1.6]
                text-white/78
              "
            >
              Bespoke sofa, commercial interiors &amp; expert restoration.
            </p>

            {/* Stars */}
            <div className="mt-3.5 flex items-center gap-1.5">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    size={9}
                    fill="var(--brand-gold)"
                    strokeWidth={0}
                    className="text-[var(--brand-gold)]"
                  />
                ))}
              </div>
              <span className="font-brand-sans text-[7px] font-semibold text-white/68">
                200+ clients
              </span>
            </div>

            {/* CTAs */}
            <div className="mt-5 space-y-3">
              <ClayButton
                href="/contact-us"
                variant="navy"
                size="md"
                fullWidth
                showArrow
                ariaLabel="Start your bespoke sofa project"
                className="!min-h-[44px] !justify-between !rounded-[15px] !px-4 !text-[10px]"
              >
                Start Your Project
              </ClayButton>

              <ClayButton
                href="/gallery"
                variant="gold"
                size="md"
                fullWidth
                showArrow
                ariaLabel="View our sofa gallery"
                className="!min-h-[44px] !justify-between !rounded-[15px] !px-4 !text-[10px]"
              >
                View Our Work
              </ClayButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   MOBILE SERVICE CARD
========================================================= */

function MobileServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;

  return (
    <Link
      href={service.href}
      aria-label={`${service.title} — ${service.description}`}
      className="
        clay-surface
        group relative
        flex flex-col
        rounded-[24px] p-3.5
        transition-all duration-300
        active:scale-[0.97]
        focus-visible:outline-2 focus-visible:outline-offset-3
        focus-visible:outline-[var(--brand-gold)]
      "
    >
      {/* Image */}
      <div className="clay-inset relative w-full overflow-hidden rounded-[16px] p-[3px]">
        <div
          className="relative w-full overflow-hidden rounded-[13px]"
          style={{ aspectRatio: "4 / 3" }}
        >
          <Image
            src={service.image}
            alt={`${service.title} preview`}
            fill
            sizes="45vw"
            loading="lazy"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </div>

      {/* Content */}
      <div className="mt-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <span className="clay-icon-inset flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px]">
            <Icon
              size={16}
              strokeWidth={1.5}
              className="text-[var(--brand-gold)]"
            />
          </span>
          <div>
            <span className="block font-brand-display text-[12px] font-semibold leading-tight">
              {service.title}
            </span>
            <p className="mt-1 font-brand-sans text-[7.5px] font-semibold text-[var(--brand-text-muted)]">
              {service.subtitle}
            </p>
          </div>
        </div>

        <span className="clay-icon flex h-7 w-7 shrink-0 items-center justify-center rounded-full">
          <MoveRight size={11} className="text-[var(--brand-gold-700)]" />
        </span>
      </div>
    </Link>
  );
}

/* =========================================================
   MOBILE TRUST
========================================================= */

function MobileTrust() {
  return (
    <div
      role="region"
      aria-label="Our credentials"
      className="clay-surface-strong rounded-[25px] p-[6px]"
    >
      <div className="clay-inset grid grid-cols-3 rounded-[19px] px-2 py-4">
        {trustItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className={`
                flex flex-col items-center px-1.5 text-center
                ${index ? "border-l border-black/[0.06]" : ""}
              `}
            >
              <span className="clay-icon flex h-10 w-10 items-center justify-center rounded-[13px]">
                <Icon size={17} className="text-[var(--brand-gold)]" />
              </span>
              <span className="mt-2.5 font-brand-display text-[10px] font-semibold">
                {item.title}
              </span>
              <span className="mt-0.5 font-brand-sans text-[7px] font-semibold text-[var(--brand-text-muted)]">
                {item.subtitle}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* =========================================================
   MOBILE STICKY BAR
========================================================= */

function MobileStickyBar() {
  return (
    <div
      aria-hidden
      className="
        mobile-sticky-cta
        fixed bottom-0 left-0 right-0 z-50
        translate-y-full
        border-t border-white/50
        bg-[var(--brand-ivory)]/95
        px-4 py-3
         
        transition-transform duration-500
        sm:hidden
      "
    >
      <div className="flex gap-2.5">
        <Link
          href="/contact-us"
          className="
            snm-button snm-button--gold snm-button--sm snm-button--full
            justify-center
          "
        >
          <span className="snm-button__label">Get a Free Quote</span>
          <MoveRight size={12} className="snm-button__arrow" />
        </Link>
        <Link
          href="tel:+447400577844"
          className="
            snm-button snm-button--navy snm-button--sm
            justify-center px-4
          "
          aria-label="Call us"
        >
          <Phone size={14} />
        </Link>
      </div>
    </div>
  );
}
