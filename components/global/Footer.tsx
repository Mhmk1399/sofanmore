import Link from "next/link";
import {
  Crown,
  Diamond,
  Landmark,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";
import {
  FaInstagram,
  FaLinkedinIn,
  FaFacebookF,
  FaPinterest,
} from "react-icons/fa6";
import type { LucideIcon } from "lucide-react";
import ClayButton from "../ui/ClayButton";

/* =========================================================
   TYPES
========================================================= */

type FooterLink = { label: string; href: string };
type FooterColumn = { title: string; links: FooterLink[] };
type TrustItem = { title: string; subtitle: string; icon: LucideIcon };

/* =========================================================
   DATA
========================================================= */

const columns: FooterColumn[] = [
  {
    title: "Our Services",
    links: [
      { label: "All services", href: "/services" },
      { label: "Bespoke sofa", href: "/services/bespoke-sofa" },
      { label: "Commercial sofa", href: "/services/commercial-sofas" },
      { label: "Interior Design & Staging", href: "/services/interior-design" },
      {
        label: "Repair & Restoration",
        href: "/services/sofa-repair-restoration",
      },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "About Us", href: "/about-us" },
      { label: "Contact Us", href: "/contact-us" },
      { label: "Blog", href: "/blog" },
      { label: "Gallery", href: "/gallery" },
    ],
  },
  {
    title: "Information",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
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

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com", icon: FaInstagram },
  { label: "LinkedIn", href: "https://linkedin.com", icon: FaLinkedinIn },
  { label: "Pinterest", href: "https://pinterest.com", icon: FaPinterest }, // swap for Pinterest icon if you have one
  { label: "Facebook", href: "https://facebook.com", icon: FaFacebookF },
];

/* =========================================================
   ROOT
========================================================= */

export default function Footer() {
  return (
    <footer
      className="
        clay-footer-section
        relative
        overflow-hidden
        bg-[var(--brand-ivory)]
        px-4 py-10
        sm:px-6
        lg:px-10 lg:py-14
      "
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      {/* Decorative claymorphism spheres */}
      <ClayDecorations />

      {/* Main footer shell */}
      <div
        className="
          clay-surface-strong
          relative z-10
          mx-auto
          max-w-[var(--site-width)]
          rounded-[38px]
          p-[9px]
          lg:rounded-[46px]
          lg:p-[11px]
        "
      >
        <div
          className="
            clay-inset
            overflow-hidden
            rounded-[31px]
            lg:rounded-[38px]
          "
        >
          {/* UPPER SECTION — brand + columns + CTA */}
          <div
            className="
              relative
              grid grid-cols-1 gap-8
              px-6 py-8
              sm:grid-cols-2
              md:grid-cols-3
              lg:grid-cols-[1.35fr_1fr_1fr_1fr_1.15fr]
              lg:gap-6
              lg:px-10 lg:py-11
              xl:gap-8
            "
          >
            {/* Brand column */}
            <BrandColumn />

            {/* Link columns */}
            {columns.map((column) => (
              <LinkColumn key={column.title} column={column} />
            ))}

            {/* Get in Touch CTA */}
            <GetInTouchColumn />
          </div>

          {/* Decorative divider dot */}
          <div className="relative flex justify-center">
            <span
              aria-hidden
              className="
                h-1.5 w-1.5 -translate-y-[3px]
                rounded-full
                bg-[var(--brand-gold)]
                shadow-[0_0_10px_rgba(215,160,74,0.5)]
              "
            />
          </div>

          {/* MIDDLE SECTION — trust dock */}
          <div
            className="
              relative
              border-t border-[var(--brand-cream-dark)]/20
              px-6 py-6
              lg:px-10 lg:py-7
            "
          >
            <FooterTrustDock />
          </div>

          {/* BOTTOM SECTION — copyright + socials */}
          <div
            className="
              relative
              flex flex-col
              items-center justify-between
              gap-4
              border-t border-[var(--brand-cream-dark)]/20
              px-6 py-5
              sm:flex-row
              lg:px-10 lg:py-6
            "
          >
            <p
              className="
                font-brand-sans text-[11px] font-medium
                text-[var(--brand-text-muted)]
              "
            >
              © {new Date().getFullYear()} Sofa N More. All rights reserved.
            </p>

            <SocialLinks />
          </div>
        </div>
      </div>
    </footer>
  );
}

/* =========================================================
   BRAND COLUMN
========================================================= */

function BrandColumn() {
  return (
    <div className="flex flex-col">
      {/* Logo */}
      <Link
        href="/"
        aria-label="Sofa N More — Home"
        className="
          group inline-flex flex-col
          transition-transform duration-300
          hover:scale-[1.02]
        "
      >
        <Crown
          size={22}
          strokeWidth={1.4}
          className="
            mb-[-2px] self-start
            text-[var(--brand-gold)]
            transition-transform duration-500
            group-hover:-translate-y-[2px]
          "
        />
        <span
          className="
            font-brand-display text-[26px]
            font-semibold leading-tight
            text-[var(--brand-navy)]
            lg:text-[28px]
          "
        >
          Sofa N More
        </span>
        <span
          className="
            mt-1 font-brand-sans text-[9px]
            font-bold uppercase tracking-[0.35em]
            text-[var(--brand-gold-700)]
          "
        >
          London
        </span>
      </Link>

      {/* Description */}
      <p
        className="
          mt-5 max-w-[240px]
          font-brand-sans text-[12px] font-medium
          leading-[1.7] text-[var(--brand-text-muted)]
        "
      >
        Bespoke sofa and interior solutions, handcrafted in London for
        exceptional spaces.
      </p>

      {/* Contact card */}
      <div
        className="
          clay-surface-soft
          mt-6
          rounded-[22px] p-4
          lg:mt-7
        "
      >
        <ContactRow icon={MapPin} text="London, United Kingdom" />
        <ContactRow
          icon={Phone}
          text="+44 20 7946 0880"
          href="tel:+442079460880"
        />
        <ContactRow
          icon={Mail}
          text="hello@sofanmore.co.uk"
          href="mailto:hello@sofanmore.co.uk"
        />
      </div>
    </div>
  );
}

/* =========================================================
   CONTACT ROW
========================================================= */

function ContactRow({
  icon: Icon,
  text,
  href,
}: {
  icon: LucideIcon;
  text: string;
  href?: string;
}) {
  const content = (
    <>
      <span
        className="
          clay-icon-inset
          flex h-7 w-7 shrink-0 items-center justify-center
          rounded-[9px]
        "
      >
        <Icon
          size={12}
          strokeWidth={1.8}
          className="text-[var(--brand-gold)]"
        />
      </span>
      <span
        className="
          font-brand-sans text-[11px] font-medium
          text-[var(--brand-navy)]
        "
      >
        {text}
      </span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className="
          group flex items-center gap-2.5
          py-1.5 transition-colors duration-200
          hover:text-[var(--brand-gold-700)]
        "
      >
        {content}
      </a>
    );
  }

  return <div className="flex items-center gap-2.5 py-1.5">{content}</div>;
}

/* =========================================================
   LINK COLUMN
========================================================= */

function LinkColumn({ column }: { column: FooterColumn }) {
  return (
    <div className="flex flex-col">
      {/* Title with bullet */}
      <div className="mb-5 flex items-center gap-2">
        <span
          aria-hidden
          className="
            h-1.5 w-1.5 rounded-full
            bg-[var(--brand-gold)]
            shadow-[0_0_6px_rgba(215,160,74,0.4)]
          "
        />
        <h3
          className="
            font-brand-display text-[15px]
            font-semibold text-[var(--brand-navy)]
          "
        >
          {column.title}
        </h3>
      </div>

      {/* Links */}
      <nav aria-label={column.title}>
        <ul className="space-y-3">
          {column.links.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="
                  group inline-flex items-center
                  font-brand-sans text-[12px] font-medium
                  text-[var(--brand-navy)]/85
                  transition-all duration-200
                  hover:text-[var(--brand-gold-700)]
                  focus-visible:outline-2
                  focus-visible:outline-offset-2
                  focus-visible:outline-[var(--brand-gold)]
                "
              >
                <span
                  aria-hidden
                  className="
                    -translate-x-1 opacity-0
                    text-[var(--brand-gold)]
                    transition-all duration-200
                    group-hover:mr-1.5
                    group-hover:translate-x-0
                    group-hover:opacity-100
                  "
                >
                  →
                </span>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

/* =========================================================
   GET IN TOUCH COLUMN
========================================================= */

function GetInTouchColumn() {
  return (
    <div className="flex flex-col">
      {/* Title */}
      <div className="mb-5 flex items-center gap-2">
        <span
          aria-hidden
          className="
            h-1.5 w-1.5 rounded-full
            bg-[var(--brand-gold)]
            shadow-[0_0_6px_rgba(215,160,74,0.4)]
          "
        />
        <h3
          className="
            font-brand-display text-[15px]
            font-semibold text-[var(--brand-navy)]
          "
        >
          Get in Touch
        </h3>
      </div>

      <p
        className="
          mb-6 max-w-[220px]
          font-brand-sans text-[12px] font-medium
          leading-[1.65] text-[var(--brand-text-muted)]
        "
      >
        Let&apos;s create something extraordinary together.
      </p>

      {/* CTA Button */}
      <ClayButton
        href="/contact"
        ariaLabel="Start your project"
        variant="gold"
        size="lg"
        fullWidth
        showArrow
        className="max-w-[220px] !justify-between"
      >
        Start Your Project
      </ClayButton>
    </div>
  );
}

/* =========================================================
   TRUST DOCK
========================================================= */

function FooterTrustDock() {
  return (
    <div
      role="region"
      aria-label="Our credentials"
      className="
        clay-surface-soft
        mx-auto max-w-[560px]
        rounded-[999px]
        px-4 py-4
        sm:px-8
      "
    >
      <div className="grid grid-cols-3 gap-2">
        {trustItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className={`
                flex flex-col items-center justify-center gap-2 px-2
                text-center
                ${index ? "border-l border-[var(--brand-cream-dark)]/25" : ""}
              `}
            >
              <Icon
                size={22}
                strokeWidth={1.35}
                className="text-[var(--brand-gold)]"
                aria-hidden
              />
              <div>
                <div
                  className="
                    font-brand-display text-[11px]
                    font-semibold leading-tight
                    text-[var(--brand-navy)]
                    sm:text-[12px]
                  "
                >
                  {item.title}
                </div>
                <div
                  className="
                    font-brand-sans text-[9px]
                    font-medium text-[var(--brand-text-muted)]
                    sm:text-[10px]
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
   SOCIAL LINKS
========================================================= */

function SocialLinks() {
  return (
    <div className="flex items-center gap-2.5">
      {socialLinks.map((social) => {
        const Icon = social.icon;
        return (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            className="
              clay-social-icon
              group
              flex h-10 w-10
              items-center justify-center
              rounded-full
              transition-all duration-300
              hover:-translate-y-[2px]
              focus-visible:outline-2
              focus-visible:outline-offset-3
              focus-visible:outline-[var(--brand-gold)]
            "
          >
            <Icon
              size={15}
              strokeWidth={1.6}
              className="
                text-[var(--brand-text-muted)]
                transition-colors duration-300
                group-hover:text-[var(--brand-gold)]
              "
            />
          </a>
        );
      })}
    </div>
  );
}

/* =========================================================
   DECORATIVE CLAY SPHERES
========================================================= */

function ClayDecorations() {
  return (
    <>
      {/* Top-left sphere */}
      <div
        aria-hidden
        className="
          clay-sphere
          absolute -left-6 top-6
          h-24 w-24
          lg:-left-2 lg:top-12
          lg:h-32 lg:w-32
        "
      >
        <div className="clay-sphere-shadow" />
        <div className="clay-sphere-ball" />
      </div>

      {/* Bottom-left sphere with ring */}
      <div
        aria-hidden
        className="
          clay-sphere z-9999999999
          absolute -left-8 bottom-16
          h-32 w-32
          lg:left-4 lg:bottom-24
          lg:h-44 lg:w-44
        "
      >
        <div className="clay-sphere-ring" />
        <div className="clay-sphere-ball" />
      </div>

      {/* Right sphere */}
      <div
        aria-hidden
        className="
          clay-sphere z-9999999999
          absolute -right-6 bottom-20
          h-24 w-24
          lg:-right-4 lg:bottom-28
          lg:h-32 lg:w-32
        "
      >
        <div className="clay-sphere-shadow" />
        <div className="clay-sphere-ball clay-sphere-ball--gold" />
      </div>
    </>
  );
}
