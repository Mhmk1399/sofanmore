"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowRight,
  ArrowUpRight,
  Crown,
  Diamond,
  Landmark,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import styles from "./Footer.module.css";

type FooterLink = { label: string; href: string };
type FooterSection = {
  title: string;
  links: FooterLink[];
  key: "services" | "explore" | "information";
};

const sections: FooterSection[] = [
  {
    key: "services",
    title: "Our Services",
    links: [
      { label: "All Services", href: "/services" },
      { label: "Bespoke Sofas", href: "/services/bespoke-sofas" },
      { label: "Commercial Sofas", href: "/services/commercial-sofas" },
      { label: "Interior Design", href: "/services/interior-design" },
      {
        label: "Repair & Restoration",
        href: "/services/sofa-repair-restoration",
      },
    ],
  },
  {
    key: "explore",
    title: "Explore",
    links: [
      { label: "Projects", href: "/projects" },
      { label: "Workshop", href: "/workshop" },
      { label: "Gallery", href: "/gallery" },
      { label: "About Us", href: "/about-us" },
      { label: "Contact Us", href: "/contact-us" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    key: "information",
    title: "Information",
    links: [
      { label: "FAQ", href: "/faqs" },
      {
        label: "Service Area",
        href: "/services#north-west-london-services",
      },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms-and-conditions" },
      { label: "Sitemap", href: "/sitemap.xml" },
    ],
  },
];

const credentials: { title: string; subtitle: string; icon: LucideIcon }[] = [
  { title: "Handcrafted", subtitle: "in London", icon: Landmark },
  { title: "12+ Years", subtitle: "Experience", icon: ShieldCheck },
  { title: "Premium", subtitle: "Materials", icon: Diamond },
];

const PHONE = "+44 7400 577844";
const PHONE_HREF = "tel:+447400577844";
const EMAIL = "info@sofanmore.co.uk";
const EMAIL_HREF = "mailto:info@sofanmore.co.uk";
const LOGO =
  "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/Sofa_Logo.webp";

export default function Footer() {
  const pathname = usePathname();

  // Preserve the previous footer behavior on account/login screens.
  if (pathname === "/login" || pathname?.startsWith("/login/")) return null;

  return (
    <footer className={styles.footer} aria-label="Sofa N More footer">
      <div className={styles.shell}>
        {/* Premium CTA: CSS-only decoration, no blur, no animation library. */}
        <section className={styles.hero} aria-labelledby="footer-cta-heading">
          <div className={styles.heroContent}>
            <p className={styles.kicker}>
              <span className={styles.kickerMark} aria-hidden="true" />
              Sofa N More · North West London
            </p>
            <h2
              id="footer-cta-heading"
              className={`${styles.heroTitle} font-brand-display`}
            >
              Comfort, crafted <em>around you.</em>
            </h2>
            <p className={styles.heroDescription}>
              Bespoke sofas, considered interiors and expert restoration,
              thoughtfully made for the spaces you love.
            </p>
          </div>
          <div className={styles.heroActions}>
            <Link
              href="/contact-us"
              prefetch={false}
              className={styles.primaryAction}
            >
              Start Your Project
              <ArrowUpRight aria-hidden="true" size={18} strokeWidth={1.8} />
            </Link>
            <Link
              href="/projects"
              prefetch={false}
              className={styles.secondaryAction}
            >
              See Our Projects
              <ArrowRight aria-hidden="true" size={17} strokeWidth={1.7} />
            </Link>
          </div>
          <span className={styles.heroRing} aria-hidden="true" />
        </section>

        <div className={styles.mainGrid}>
          <div className={styles.brand}>
            <Link
              href="/"
              prefetch={false}
              className={styles.logoLink}
              aria-label="Sofa N More — Home"
            >
              <Crown
                aria-hidden="true"
                className={styles.crown}
                size={19}
                strokeWidth={1.4}
              />
              <Image
                src={LOGO}
                alt="Sofa N More"
                width={144}
                height={144}
                sizes="144px"
                loading="lazy"
                className={styles.logoImage}
              />
            </Link>
            <p className={styles.brandDescription}>
              Upholstery, commercial seating, interior design and professional
              sofa repair from our North West London workshop.
            </p>
          </div>

          {sections.map((section) => (
            <nav
              key={section.key}
              aria-label={section.title}
              className={`${styles.linkSection} ${section.key === "information" ? styles.informationSection : ""}`}
            >
              <h3 className={styles.sectionTitle}>{section.title}</h3>
              <ul className={styles.linkList}>
                {section.links.map((item) => (
                  <li key={item.href}>
                    {item.href.endsWith(".xml") ? (
                      <a href={item.href}>{item.label}</a>
                    ) : (
                      <Link href={item.href} prefetch={false}>
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <section
            className={styles.contactCard}
            aria-labelledby="footer-contact-heading"
          >
            <h3 id="footer-contact-heading" className={styles.sectionTitle}>
              Get in Touch
            </h3>
            <p className={styles.contactIntro}>
              Have a project in mind? We&apos;d love to hear about it.
            </p>
            <address className={styles.address}>
              <ContactLink icon={Mail} href={EMAIL_HREF} label={EMAIL} />
              <ContactLink icon={Phone} href={PHONE_HREF} label={PHONE} />
              <div className={styles.contactRow}>
                <MapPin aria-hidden="true" size={16} strokeWidth={1.7} />
                <span>London NW2 7HJ</span>
              </div>
            </address>
          </section>
        </div>

        <ul className={styles.trustStrip} aria-label="Our credentials">
          {credentials.map(({ title, subtitle, icon: Icon }) => (
            <li key={title} className={styles.trustItem}>
              <span className={styles.trustIcon}>
                <Icon aria-hidden="true" size={18} strokeWidth={1.5} />
              </span>
              <span className={styles.trustCopy}>
                <strong>{title}</strong>
                <span>{subtitle}</span>
              </span>
            </li>
          ))}
        </ul>

        <div className={styles.bottomBar}>
          <div className={styles.copyright}>
            <p>
              © {new Date().getFullYear()} Sofa N More. All rights reserved.
            </p>
            <p>Upholstery, interiors &amp; restoration in London.</p>
          </div>
          <div className={styles.socialLinks} aria-label="Follow Sofa N More">
            <a
              href="https://www.instagram.com/sofa_n_more_london/"
              className={styles.socialLink}
              aria-label="Instagram (opens in a new tab)"
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramIcon />
            </a>
            <a
              href="https://www.facebook.com/people/sofa_n_more_/100091997793795/"
              className={styles.socialLink}
              aria-label="Facebook (opens in a new tab)"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FacebookIcon />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function ContactLink({
  icon: Icon,
  href,
  label,
}: {
  icon: LucideIcon;
  href: string;
  label: string;
}) {
  return (
    <a href={href} className={styles.contactRow}>
      <Icon aria-hidden="true" size={16} strokeWidth={1.7} />
      <span>{label}</span>
      <ArrowUpRight
        aria-hidden="true"
        size={15}
        strokeWidth={1.5}
        className={styles.contactArrow}
      />
    </a>
  );
}

function InstagramIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
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
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="currentColor"
    >
      <path d="M13.6 22v-8.7h2.9l.45-3.4H13.6V7.72c0-.98.27-1.65 1.68-1.65h1.8V3.03c-.31-.04-1.38-.13-2.63-.13-2.6 0-4.38 1.59-4.38 4.5v2.5H7.12v3.4h2.95V22h3.53Z" />
    </svg>
  );
}
