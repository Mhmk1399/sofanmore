"use client";
import Image from "next/image";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Crown,
  Diamond,
  Landmark,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import ClayButton from "../ui/ClayButton";

/* =========================================================
   TYPES
========================================================= */

type FooterLink = {
  label: string;
  href: string;
};

type FooterColumn = {
  title: string;
  links: FooterLink[];
};

type TrustItem = {
  title: string;
  subtitle: string;
  icon: LucideIcon;
};

/* =========================================================
   DATA
========================================================= */

const columns: FooterColumn[] = [
  {
    title: "Our Services",
    links: [
      {
        label: "All Services",
        href: "/services",
      },
      {
        label: "Bespoke Sofas",
        href: "/services/bespoke-sofas",
      },
      {
        label: "Commercial Sofas",
        href: "/services/commercial-sofas",
      },
      {
        label: "Interior Design",
        href: "/services/interior-design",
      },
      {
        label: "Repair & Restoration",
        href: "/services/sofa-repair-restoration",
      },
    ],
  },

  {
    title: "Explore",
    links: [
      {
        label: "Projects",
        href: "/projects",
      },

      {
        label: "Workshop",
        href: "/workshop",
      },
      {
        label: "Gallery",
        href: "/gallery",
      },
      {
        label: "About Us",
        href: "/about-us",
      },
      {
        label: "Contact Us",
        href: "/contact-us",
      },
      {
        label: "Blog",
        href: "/blog",
      },
    ],
  },

  {
    title: "Information",
    links: [
      {
        label: "FAQ",
        href: "/faqs",
      },
      {
        label: "Service Area",
        href: "/services#north-west-london-services",
      },
      {
        label: "Privacy Policy",
        href: "/privacy-policy",
      },
      {
        label: "Terms & Conditions",
        href: "/terms-and-conditions",
      },
      {
        label: "Sitemap",
        href: "/sitemap.xml",
      },
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

/* =========================================================
   ROOT
========================================================= */

export default function Footer() {
  const pathname = usePathname();

  if (pathname === "/login") {
    return null;
  }

  return (
    <footer
      aria-labelledby="footer-heading"
      className="
        relative

        bg-[var(--brand-ivory)]

        px-3
        pb-[calc(105px+env(safe-area-inset-bottom))]
        pt-8

        sm:px-5
        sm:pb-10
        sm:pt-10

        lg:px-8
        lg:pb-24
        lg:pt-12
      "
    >
      <h2 id="footer-heading" className="sr-only">
        Sofa N More Footer
      </h2>

      {/* =====================================================
          ONE CLAY SHELL ONLY
      ====================================================== */}

      <div
        className="
          clay-surface-soft

          mx-auto
          max-w-[var(--site-width)]

          overflow-hidden

          rounded-[28px]

          border
          border-white/70

          sm:rounded-[32px]

          lg:rounded-[36px]
        "
      >
        {/* ===================================================
            MAIN FOOTER
        ==================================================== */}

        <div
          className="
            grid
            gap-8

            bg-[#FFFDF8]/55

            px-5
            py-7

            sm:grid-cols-2
            sm:px-7
            sm:py-8

            lg:grid-cols-[1.4fr_0.8fr_0.8fr_0.7fr_1fr]
            lg:gap-8
            lg:px-9
            lg:py-10

            xl:gap-10
          "
        >
          <BrandColumn />

          {columns.map((column) => (
            <LinkColumn key={column.title} column={column} />
          ))}

          <GetInTouchColumn />
        </div>

        {/* ===================================================
            TRUST STRIP
        ==================================================== */}

        <div
          className="
            border-t
            border-[var(--brand-navy)]/[0.06]

            px-5
            py-5

            sm:px-7

            lg:px-9
          "
        >
          <FooterTrustDock />
        </div>

        {/* ===================================================
            BOTTOM
        ==================================================== */}

        <div
          className="
            flex
            flex-col

            items-center
            justify-between

            gap-4

            border-t
            border-[var(--brand-navy)]/[0.07]

            bg-[#F2E9DD]/55

            px-5
            py-4

            sm:flex-row
            sm:px-7

            lg:px-9
          "
        >
          <div
            className="
              flex
              flex-col

              items-center
              gap-1

              sm:items-start
            "
          >
            <p
              className="
                font-brand-sans

                text-[9px]
                font-medium

                text-[var(--brand-text-muted)]

                sm:text-[10px]
              "
            >
              © {new Date().getFullYear()} Sofa N More. All rights reserved.
            </p>

            <p
              className="
                font-brand-sans

                text-[7px]
                font-semibold

                text-[var(--brand-text-muted)]/70

                sm:text-[8px]
              "
            >
              Bespoke sofas, interiors and restoration in London.
            </p>
          </div>

          <SocialLinks />
        </div>
      </div>
    </footer>
  );
}

/* =========================================================
   BRAND
========================================================= */

function BrandColumn() {
  return (
    <div>
      {/* LOGO */}

      <Link
        href="/"
        aria-label="Sofa N More — Home"
        className="
          inline-flex
          flex-col

          focus-visible:outline-2
          focus-visible:outline-offset-4
          focus-visible:outline-[var(--brand-gold)]
        "
      >
        <Crown
          size={20}
          strokeWidth={1.4}
          className="
            mb-[-1px]

            text-[var(--brand-gold)]
          "
        />

        <Image
          src={"https://sofanmore.s3.eu-west-2.amazonaws.com/Image/Sofa_Logo.webp"}
          height={200}
          width={200}
          alt="logo"
        />
      </Link>

      {/* DESCRIPTION */}

      <p
        className="
          mt-4

          max-w-[290px]

          font-brand-sans

          text-[10px]
          font-medium
          leading-[1.7]

          text-[var(--brand-text-muted)]

          sm:text-[11px]
        "
      >
        Bespoke sofas, commercial seating, interior design and professional sofa
        repair from our North West London workshop.
      </p>

      {/* =================================================
          CONTACT DETAILS

          No clay shadow here.
      ================================================== */}

      <address
        className="
          mt-5

          max-w-[310px]

          not-italic

          rounded-[17px]

          border
          border-[var(--brand-navy)]/[0.07]

          bg-[#F3EADF]/70

          px-3.5
          py-3
        "
      >
        <ContactRow icon={MapPin} text="London NW2 7HJ" />

        <ContactRow
          icon={Phone}
          text="+44 7400 577844"
          href="tel:+447400577844"
        />

        <ContactRow
          icon={Mail}
          text="info@sofanmore.co.uk"
          href="mailto:info@sofanmore.co.uk"
        />
      </address>
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
          flex
          h-7
          w-7

          shrink-0

          items-center
          justify-center

          rounded-[9px]

          bg-[var(--brand-navy)]

          text-[var(--brand-gold)]
        "
      >
        <Icon size={11} strokeWidth={1.6} />
      </span>

      <span
        className="
          font-brand-sans

          text-[9px]
          font-semibold
          leading-[1.4]

          text-[var(--brand-navy)]

          sm:text-[10px]
        "
      >
        {text}
      </span>
    </>
  );

  if (!href) {
    return (
      <div
        className="
          flex
          items-center

          gap-2.5

          py-1.5
        "
      >
        {content}
      </div>
    );
  }

  return (
    <a
      href={href}
      className="
        flex
        items-center

        gap-2.5

        py-1.5

        transition-colors
        duration-150

        hover:text-[var(--brand-gold-700)]

        focus-visible:outline-2
        focus-visible:outline-offset-2
        focus-visible:outline-[var(--brand-gold)]
      "
    >
      {content}
    </a>
  );
}

/* =========================================================
   LINK COLUMN
========================================================= */

function LinkColumn({ column }: { column: FooterColumn }) {
  return (
    <div>
      {/* TITLE */}

      <div
        className="
          mb-4

          flex
          items-center

          gap-2
        "
      >
        <span
          aria-hidden
          className="
            h-1.5
            w-1.5

            rounded-full

            bg-[var(--brand-gold)]
          "
        />

        <h3
          className="
            font-brand-display

            text-[14px]
            font-semibold

            text-[var(--brand-navy)]
          "
        >
          {column.title}
        </h3>
      </div>

      {/* LINKS */}

      <nav aria-label={column.title}>
        <ul className="space-y-2.5">
          {column.links.map((link) => (
            <li key={link.label}>
              <FooterLinkItem href={link.href}>{link.label}</FooterLinkItem>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

/* =========================================================
   FOOTER LINK
========================================================= */

function FooterLinkItem({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="
        group

        inline-flex
        items-center

        gap-1.5

        font-brand-sans

        text-[10px]
        font-medium

        text-[var(--brand-navy)]/75

        transition-colors
        duration-150

        hover:text-[var(--brand-gold-700)]

        focus-visible:outline-2
        focus-visible:outline-offset-2
        focus-visible:outline-[var(--brand-gold)]
      "
    >
      <span
        aria-hidden
        className="
          h-1
          w-1

          rounded-full

          bg-[var(--brand-gold)]

          opacity-0

          transition-opacity
          duration-150

          group-hover:opacity-100
        "
      />

      {children}
    </Link>
  );
}

/* =========================================================
   CONTACT CTA
========================================================= */

function GetInTouchColumn() {
  return (
    <div>
      <div
        className="
          mb-4

          flex
          items-center

          gap-2
        "
      >
        <span
          aria-hidden
          className="
            h-1.5
            w-1.5

            rounded-full

            bg-[var(--brand-gold)]
          "
        />

        <h3
          className="
            font-brand-display

            text-[14px]
            font-semibold

            text-[var(--brand-navy)]
          "
        >
          Start a Project
        </h3>
      </div>

      <p
        className="
          max-w-[230px]

          font-brand-sans

          text-[10px]
          font-medium
          leading-[1.65]

          text-[var(--brand-text-muted)]

          sm:text-[11px]
        "
      >
        Tell us about your sofa, repair, commercial seating or interior project.
      </p>

      <div className="mt-5">
        <ClayButton
          href="/contact-us"
          ariaLabel="Start your project with Sofa N More"
          variant="gold"
          size="md"
          fullWidth
          showArrow
          className="max-w-[220px]"
        >
          Start Your Project
        </ClayButton>
      </div>

      {/* DIRECT CALL */}

      <a
        href="tel:+447400577844"
        className="
          mt-3

          inline-flex
          items-center

          gap-2

          font-brand-sans

          text-[8px]
          font-bold
          uppercase

          tracking-[0.08em]

          text-[var(--brand-navy)]/65

          transition-colors
          duration-150

          hover:text-[var(--brand-gold-700)]
        "
      >
        <Phone
          size={11}
          strokeWidth={1.6}
          className="
            text-[var(--brand-gold)]
          "
        />
        Call +44 7400 577844
      </a>
    </div>
  );
}

/* =========================================================
   TRUST STRIP
========================================================= */

function FooterTrustDock() {
  return (
    <div
      role="region"
      aria-label="Our credentials"
      className="
        mx-auto

        max-w-[680px]

        overflow-hidden

        rounded-[18px]

        bg-[var(--brand-navy)]
      "
    >
      <div
        className="
          grid
          grid-cols-3
        "
      >
        {trustItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className={`
                  flex
                  min-h-[76px]

                  items-center
                  justify-center

                  gap-2.5

                  px-2
                  py-3

                  text-center

                  sm:px-4

                  ${index ? "border-l border-white/10" : ""}
                `}
            >
              <Icon
                size={17}
                strokeWidth={1.35}
                className="
                    hidden

                    shrink-0

                    text-[var(--brand-gold)]

                    sm:block
                  "
                aria-hidden
              />

              <div>
                <div
                  className="
                      font-brand-display

                      text-[10px]
                      font-semibold
                      leading-tight

                      text-white

                      sm:text-[12px]
                    "
                >
                  {item.title}
                </div>

                <div
                  className="
                      mt-0.5

                      font-brand-sans

                      text-[7px]
                      font-medium

                      text-white/50

                      sm:text-[9px]
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
   SOCIALS
========================================================= */

function SocialLinks() {
  return (
    <div
      className="
        flex
        items-center

        gap-2
      "
    >
      <SocialLink
        href="https://www.instagram.com/sofa_n_more_london/"
        label="Instagram"
      >
        <InstagramIcon />
      </SocialLink>

      <SocialLink
        href="https://www.facebook.com/people/sofa_n_more_/100091997793795/"
        label="Facebook"
      >
        <FacebookIcon />
      </SocialLink>
    </div>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="
        flex
        h-9
        w-9

        items-center
        justify-center

        rounded-full

        border
        border-[var(--brand-navy)]/[0.08]

        bg-[#FFFDF8]/75

        text-[var(--brand-text-muted)]

        transition-[color,transform,background-color]
        duration-150

        hover:-translate-y-[1px]
        hover:bg-white
        hover:text-[var(--brand-gold-700)]

        focus-visible:outline-2
        focus-visible:outline-offset-2
        focus-visible:outline-[var(--brand-gold)]
      "
    >
      {children}
    </a>
  );
}

/* =========================================================
   LIGHTWEIGHT SOCIAL SVG
========================================================= */

function InstagramIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      width="15"
      height="15"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />

      <circle cx="12" cy="12" r="4" />

      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      width="15"
      height="15"
      fill="currentColor"
    >
      <path d="M13.6 22v-8.7h2.9l.45-3.4H13.6V7.72c0-.98.27-1.65 1.68-1.65h1.8V3.03c-.31-.04-1.38-.13-2.63-.13-2.6 0-4.38 1.59-4.38 4.5v2.5H7.12v3.4h2.95V22h3.53Z" />
    </svg>
  );
}
