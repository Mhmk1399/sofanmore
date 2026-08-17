"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Armchair,
  Building2,
  ChevronDown,
  ChevronRight,
  Crown,
  FolderOpen,
  Hammer,
  Home,
  Layers,
  Mail,
  Menu,
  MoveRight,
  Palette,
  Phone,
  Sparkles,
  Wrench,
  X,
} from "lucide-react";

import { useCallback, useEffect, useRef, useState } from "react";
import ClayButton from "../ui/ClayButton";
import { FaPhotoFilm } from "react-icons/fa6";

/* =========================================================
   TYPES
========================================================= */

type ServiceGroup = {
  title: string;
  subtitle: string;
  icon: typeof Armchair;
  href: string;
  image: string;
  links: { label: string; href: string }[];
};

/* =========================================================
   DATA
========================================================= */

const serviceGroups: ServiceGroup[] = [
  {
    title: "Bespoke Sofas",
    subtitle: "Made for your space",
    icon: Armchair,
    href: "/services/bespoke-sofas",
    image: "/assets/images/1.webp",

    links: [
      {
        label: "Made-to-Measure Sofas",
        href: "/services/bespoke-sofas#made-to-measure-sofas",
      },
      {
        label: "Corner & Modular Sofas",
        href: "/services/bespoke-sofa#corner-modular-sofas",
      },
      {
        label: "Chairs & Armchairs",
        href: "/services/bespoke-sofas#chairs-armchairs",
      },
      {
        label: "Beds & Headboards",
        href: "/services/bespoke-sofa#beds-headboards",
      },
      {
        label: "Benches & Ottomans",
        href: "/services/bespoke-sofas#benches-ottomans",
      },
    ],
  },

  {
    title: "Commercial Sofas",
    subtitle: "Built for business",
    icon: Building2,
    href: "/services/commercial-sofas",
    image: "/assets/images/2.webp",

    links: [
      {
        label: "Restaurant & Café Seating",
        href: "/services/commercial-sofas#restaurant-cafe-seating",
      },
      {
        label: "Banquette Seating",
        href: "/services/commercial-sofas#banquette-seating",
      },
      {
        label: "Office Seating",
        href: "/services/commercial-sofas#office-seating",
      },
      {
        label: "Hotel & Hospitality Seating",
        href: "/services/commercial-sofas#hotel-hospitality-seating",
      },
    ],
  },

  {
    title: "Interior Design",
    subtitle: "Complete environments",
    icon: Palette,
    href: "/services/interior-design",
    image: "/assets/images/3.webp",

    links: [
      {
        label: "Residential Interior Design",
        href: "/services/interior-design#residential",
      },
      {
        label: "Commercial Interior Design",
        href: "/services/interior-design#commercial",
      },
      {
        label: "Restaurant & Café Interiors",
        href: "/services/interior-design#restaurant-cafe",
      },
      {
        label: "Interior Styling",
        href: "/services/interior-design#interior-styling",
      },
    ],
  },

  {
    title: "Repair & Restoration",
    subtitle: "Expert craftsmanship",
    icon: Hammer,
    href: "/services/sofa-repair-restoration",
    image: "/assets/images/4.webp",

    links: [
      {
        label: "Sofa Repair & Restoration",
        href: "/services/sofa-repair-restoration#sofa-restoration",
      },
      {
        label: "Sofa Reupholstery",
        href: "/services/sofa-repair-restoration#sofa-reupholstery",
      },
      {
        label: "Cushion Refilling",
        href: "/services/sofa-repair-restoration#cushion-refilling",
      },
      {
        label: "Commercial Upholstery",
        href: "/services/sofa-repair-restoration#commercial-upholstery",
      },
      {
        label: "Before & After Projects",
        href: "/services/sofa-repair-restoration#before-after-projects",
      },
    ],
  },
];

const navLinks = [
  { label: "Gallery", href: "/gallery" },
  { label: "Workshop", href: "/workshop" },
  { label: "Blog", href: "/blog" },
  { label: "About Us", href: "/about-us" },

  { label: "Contact", href: "/contact-us" },
  { label: "Faq", href: "/faqs" },
];

// Mobile bottom bar quick tabs
const mobileTabs = [
  { label: "Menu", icon: Menu, href: "#menu" },
  { label: "Home", icon: Home, href: "/" },
  { label: "Workshop", icon: Wrench, href: "/workshop" },

  { label: "Gallery", href: "/gallery", icon: FaPhotoFilm },
  { label: "Services", icon: Layers, href: "/services" },
  { label: "Contact", icon: FolderOpen, href: "/contact-us" },
  // { label: "About", icon: Info, href: "/about-us" },
  // { label: "Blog", icon: Menu, href: "/blog" },
];

/* =========================================================
   ROOT
========================================================= */

export default function Navbar() {
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobilePanel, setMobilePanel] = useState<
    "main" | "services" | "service-detail"
  >("main");
  const [activeServiceIdx, setActiveServiceIdx] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [activeGroup, setActiveGroup] = useState(0);
  const navbarRef = useRef<HTMLElement>(null);
  const megaTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  const closeNavigation = useCallback(() => {
    setMegaOpen(false);
    setMobileOpen(false);
    setMobilePanel("main");
  }, []);

  // Close on route change
  useEffect(() => {
    const frameId = window.requestAnimationFrame(closeNavigation);

    return () => window.cancelAnimationFrame(frameId);
  }, [pathname, closeNavigation]);

  // Scroll
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ESC
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") closeNavigation();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeNavigation]);

  // Outside click desktop
  useEffect(() => {
    function handlePointerDown(e: PointerEvent) {
      if (navbarRef.current && !navbarRef.current.contains(e.target as Node)) {
        setMegaOpen(false);
      }
    }
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  // Mobile scroll lock
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Mega hover intent
  function handleMegaEnter() {
    if (megaTimeout.current) clearTimeout(megaTimeout.current);
    setMegaOpen(true);
  }
  function handleMegaLeave() {
    megaTimeout.current = setTimeout(() => setMegaOpen(false), 280);
  }

  // Mobile tab handler
  function handleMobileTab(tab: (typeof mobileTabs)[number]) {
    if (tab.label === "Menu") {
      setMobileOpen(true);
      setMobilePanel("main");
      return;
    }
    if (tab.label === "Services") {
      setMobileOpen(true);
      setMobilePanel("services");
      return;
    }
    closeNavigation();
  }
  if (pathname === "/login") {
    return null;
  }
  return (
    <>
      {/* =====================================================
          DESKTOP NAVBAR (top fixed)
      ====================================================== */}
      <header
        ref={navbarRef}
        className="
          fixed inset-x-0 top-0
          z-[200]
          hidden
          px-3 pt-3
          sm:px-5
          lg:block lg:px-8 lg:pt-4
        "
      >
        <DesktopBar
          scrolled={scrolled}
          megaOpen={megaOpen}
          setMegaOpen={setMegaOpen}
          closeNavigation={closeNavigation}
          handleMegaEnter={handleMegaEnter}
          handleMegaLeave={handleMegaLeave}
        />

        <DesktopMegaMenu
          open={megaOpen}
          close={closeNavigation}
          activeGroup={activeGroup}
          setActiveGroup={setActiveGroup}
          onMouseEnter={handleMegaEnter}
          onMouseLeave={handleMegaLeave}
        />
      </header>

      {/* =====================================================
          MOBILE DYNAMIC ISLAND (bottom fixed)
      ====================================================== */}
      <MobileDynamicIsland
        tabs={mobileTabs}
        mobileOpen={mobileOpen}
        mobilePanel={mobilePanel}
        setMobilePanel={setMobilePanel}
        activeServiceIdx={activeServiceIdx}
        setActiveServiceIdx={setActiveServiceIdx}
        onTabPress={handleMobileTab}
        close={closeNavigation}
        pathname={pathname}
      />
    </>
  );
}

/* =========================================================
   DESKTOP BAR
========================================================= */

function DesktopBar({
  scrolled,
  megaOpen,
  setMegaOpen,
  closeNavigation,
  handleMegaEnter,
  handleMegaLeave,
}: {
  scrolled: boolean;
  megaOpen: boolean;
  setMegaOpen: React.Dispatch<React.SetStateAction<boolean>>;
  closeNavigation: () => void;
  handleMegaEnter: () => void;
  handleMegaLeave: () => void;
}) {
  return (
    <div
      className={`
        navbar-bar
        relative z-30 mx-auto
        flex items-center justify-between
        max-w-[var(--site-width)]
        rounded-[29px] px-7
        transition-all duration-500
        ${
          scrolled
            ? "h-[72px] clay-surface-strong navbar-scrolled"
            : "h-[82px] clay-surface-strong"
        }
      `}
    >
      <Logo close={closeNavigation} />

      <nav
        aria-label="Main navigation"
        className="flex items-center gap-1 xl:gap-2"
      >
        <DesktopLink href={navLinks[0].href}>{navLinks[0].label}</DesktopLink>

        <div onMouseEnter={handleMegaEnter} onMouseLeave={handleMegaLeave}>
          <button
            type="button"
            aria-expanded={megaOpen}
            aria-haspopup="true"
            onClick={() => setMegaOpen((v) => !v)}
            className={`
              navbar-link group
              flex h-10 items-center gap-1.5
              rounded-[13px] px-3.5
              font-brand-sans   font-semibold
              uppercase tracking-[0.07em]
              transition-all duration-300
              ${
                megaOpen
                  ? "bg-white/30 text-[var(--brand-gold-700)] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.04)]"
                  : "text-[var(--brand-navy)] hover:text-[var(--brand-gold-700)]"
              }
            `}
          >
            Services
            <ChevronDown
              size={14}
              strokeWidth={1.8}
              className={`transition-transform duration-300 ${megaOpen ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        {navLinks.slice(1).map((link) => (
          <DesktopLink key={link.label} href={link.href}>
            {link.label}
          </DesktopLink>
        ))}
      </nav>

      <ClayButton href="tel:+4407400577844" variant="navy" size="lg">
        Call +44 074005 77844
      </ClayButton>
    </div>
  );
}

/* =========================================================
   LOGO
========================================================= */

function Logo({ close }: { close: () => void }) {
  return (
    <Link
      href="/"
      onClick={close}
      className="group shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-gold)]"
      aria-label="Sofa N More — Home"
    >
      <div className="flex flex-col items-center">
        <Crown
          size={21}
          strokeWidth={1.4}
          className="mb-[-2px] text-[var(--brand-gold)] transition-transform duration-500 group-hover:-translate-y-[1px] group-hover:scale-110"
        />
        <span className="font-brand-display text-[22px] font-semibold tracking-[0.035em]">
          SOFA N MORE
        </span>
        <span className="mt-[1px] flex items-center gap-1.5 font-brand-sans text-[6px] font-bold uppercase tracking-[0.31em] text-[var(--brand-gold-700)]">
          <span
            aria-hidden
            className="h-px w-4 bg-gradient-to-r from-transparent to-[var(--brand-gold)]"
          />
          London
          <span
            aria-hidden
            className="h-px w-4 bg-gradient-to-l from-transparent to-[var(--brand-gold)]"
          />
        </span>
      </div>
    </Link>
  );
}

/* =========================================================
   DESKTOP LINK
========================================================= */

function DesktopLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="
        navbar-link relative flex h-10 items-center
        rounded-[13px] px-3.5
        font-brand-sans text-[11px] font-semibold uppercase tracking-[0.07em]
        text-[var(--brand-navy)] transition-all duration-300
        hover:bg-white/25 hover:text-[var(--brand-gold-700)]
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-gold)]
      "
    >
      {children}
    </Link>
  );
}

/* =========================================================
   DESKTOP MEGA MENU
========================================================= */

function DesktopMegaMenu({
  open,
  close,
  activeGroup,
  setActiveGroup,
  onMouseEnter,
  onMouseLeave,
}: {
  open: boolean;
  close: () => void;
  activeGroup: number;
  setActiveGroup: (i: number) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  const active = serviceGroups[activeGroup];

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`
        absolute left-1/2 top-[calc(100%-2px)]
        w-[calc(100%-4rem)] max-w-[1340px]
        -translate-x-1/2 pt-3
        ${open ? "pointer-events-auto" : "pointer-events-none"}
      `}
    >
      <div
        className={`
          clay-surface-strong rounded-[34px] p-[8px]
          transition-all duration-400
          ${open ? "translate-y-0 scale-100 opacity-100" : "-translate-y-4 scale-[0.97] opacity-0"}
        `}
        role="region"
        aria-label="Services menu"
      >
        <div className="clay-inset rounded-[27px] p-3">
          <div className="grid grid-cols-[280px_1fr] gap-3">
            <div className="flex flex-col gap-1.5">
              {serviceGroups.map((group, idx) => {
                const Icon = group.icon;
                const isActive = idx === activeGroup;
                return (
                  <button
                    key={group.title}
                    type="button"
                    onPointerEnter={() => setActiveGroup(idx)}
                    onFocus={() => setActiveGroup(idx)}
                    onClick={() => setActiveGroup(idx)}
                    className={`
                      group flex items-center gap-3
                      rounded-[18px] px-3.5 py-3 text-left
                      transition-colors duration-100
                      ${isActive ? "clay-surface mega-tab-active" : "hover:bg-white/30"}
                    `}
                  >
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] transition-colors duration-100 ${isActive ? "clay-icon-inset" : "bg-white/20"}`}
                    >
                      <Icon
                        size={20}
                        strokeWidth={1.5}
                        className={`transition-colors duration-100 ${isActive ? "text-[var(--brand-gold)]" : "text-[var(--brand-text-muted)] group-hover:text-[var(--brand-gold)]"}`}
                      />
                    </span>
                    <div className="min-w-0">
                      <div
                        className={`font-brand-display text-[14px] font-semibold leading-tight transition-colors duration-100 ${isActive ? "text-[var(--brand-navy)]" : "text-[var(--brand-navy)]/80"}`}
                      >
                        {group.title}
                      </div>
                      <div className="mt-0.5 font-brand-sans text-[9px] font-semibold text-[var(--brand-text-muted)]">
                        {group.subtitle}
                      </div>
                    </div>
                    <MoveRight
                      size={14}
                      className={`ml-auto shrink-0 text-[var(--brand-gold)] transition-[opacity,transform] duration-100 ${isActive ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0"}`}
                    />
                  </button>
                );
              })}
            </div>

            <div className="clay-surface-soft grid grid-cols-[1fr_200px] gap-4 rounded-[23px] p-5">
              <div>
                <div className="mb-4 flex items-center gap-2.5">
                  <Sparkles size={14} className="text-[var(--brand-gold)]" />
                  <span className="font-brand-sans text-[9px] font-bold uppercase tracking-[0.1em] text-[var(--brand-gold-700)]">
                    {active.title}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-0.5">
                  {active.links.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={close}
                      className="mega-subcategory-link group/link flex items-center justify-between rounded-[12px] border border-transparent px-3 py-2.5 font-brand-sans text-[12px] font-medium text-[var(--brand-text-muted)] hover:text-[var(--brand-navy)]"
                    >
                      {link.label}
                      <MoveRight
                        size={12}
                        className="text-[var(--brand-gold)] opacity-0 transition-all duration-200 group-hover/link:translate-x-1 group-hover/link:opacity-100"
                      />
                    </Link>
                  ))}
                </div>
                <Link
                  href={active.href}
                  onClick={close}
                  className="mt-4 inline-flex items-center gap-2 rounded-[12px] px-3 py-2 font-brand-sans text-[10px] font-bold uppercase tracking-[0.06em] text-[var(--brand-gold-700)] transition-all duration-300 hover:bg-[var(--brand-gold)]/10"
                >
                  View all {active.title}
                  <MoveRight size={13} />
                </Link>
              </div>
              <div className="clay-inset relative overflow-hidden rounded-[20px] p-[5px]">
                <div className="relative h-full min-h-[200px] overflow-hidden rounded-[16px]">
                  <Image
                    src={active.image}
                    alt={`${active.title} preview`}
                    fill
                    sizes="200px"
                    className="object-cover object-center transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between gap-5 rounded-[18px] bg-white/20 px-5 py-3">
            <div className="flex items-center gap-3">
              <span className="clay-icon flex h-9 w-9 items-center justify-center rounded-[12px]">
                <Phone
                  size={15}
                  strokeWidth={1.5}
                  className="text-[var(--brand-gold)]"
                />
              </span>
              <div>
                <div className="font-brand-sans text-[10px] font-bold text-[var(--brand-navy)]">
                  Need help choosing?
                </div>
                <div className="font-brand-sans text-[9px] font-medium text-[var(--brand-text-muted)]">
                  Our team is ready to assist
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Link
                href="tel:+447400577844"
                onClick={close}
                className="snm-button snm-button--ivory snm-button--sm gap-2"
              >
                <Phone size={13} />
                <span className="snm-button__label">Call Us</span>
              </Link>
              <Link
                href="/contact-us"
                onClick={close}
                className="snm-button snm-button--gold snm-button--sm"
              >
                <span className="snm-button__label">Start Your Project</span>
                <MoveRight size={13} className="snm-button__arrow" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   MOBILE DYNAMIC ISLAND
========================================================= */

function MobileDynamicIsland({
  tabs,
  mobileOpen,
  mobilePanel,
  setMobilePanel,
  activeServiceIdx,
  setActiveServiceIdx,
  onTabPress,
  close,
  pathname,
}: {
  tabs: typeof mobileTabs;
  mobileOpen: boolean;
  mobilePanel: "main" | "services" | "service-detail";
  setMobilePanel: React.Dispatch<
    React.SetStateAction<"main" | "services" | "service-detail">
  >;
  activeServiceIdx: number;
  setActiveServiceIdx: React.Dispatch<React.SetStateAction<number>>;
  onTabPress: (tab: (typeof mobileTabs)[number]) => void;
  close: () => void;
  pathname: string;
}) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-[300] lg:hidden">
      {/* ===================================================
          BACKDROP (when expanded)
      ==================================================== */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close menu"
          onClick={close}
          className="
            fixed inset-0 z-[298]
            bg-[rgba(7,18,30,0.45)]
            backdrop-blur-[8px]
            animate-fadeIn
          "
        />
      )}

      {/* ===================================================
          EXPANDED PANEL (slides up from island)
      ==================================================== */}
      <div
        className={`
          fixed inset-x-0 bottom-0 z-[299]
          transition-all duration-500
          ${
            mobileOpen
              ? "pointer-events-auto translate-y-0 opacity-100"
              : "pointer-events-none translate-y-full opacity-0"
          }
        `}
      >
        <div
          className="
            island-panel
            mx-3 mb-[88px]
            max-h-[calc(100dvh-140px)]
            overflow-hidden
            rounded-[32px]
          "
          role="dialog"
          aria-modal="true"
          aria-label="Navigation"
        >
          {/* Outer clay shell */}
          <div className="clay-surface-strong rounded-[32px] p-[7px]">
            <div className="clay-inset overflow-hidden rounded-[26px]">
              {/* Panel content — slides between views */}
              <div
                data-lenis-prevent
                className="relative overflow-y-auto overscroll-contain"
                style={{ maxHeight: "calc(100dvh - 200px)" }}
              >
                {mobilePanel === "main" && (
                  <IslandMainPanel
                    close={close}
                    setMobilePanel={setMobilePanel}
                  />
                )}

                {mobilePanel === "services" && (
                  <IslandServicesPanel
                    setMobilePanel={setMobilePanel}
                    setActiveServiceIdx={setActiveServiceIdx}
                    close={close}
                  />
                )}

                {mobilePanel === "service-detail" && (
                  <IslandServiceDetail
                    group={serviceGroups[activeServiceIdx]}
                    setMobilePanel={setMobilePanel}
                    close={close}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===================================================
          DYNAMIC ISLAND BAR (always visible)
      ==================================================== */}
      <div className="island-safe-area relative z-[301] px-3 pb-2">
        <div
          className={`
            island-bar
            clay-surface-strong
            mx-auto flex max-w-[420px]
            items-center justify-around
            transition-all duration-500
            ${
              mobileOpen
                ? "rounded-[22px] px-2 py-2"
                : "rounded-[28px] px-3 py-2.5"
            }
          `}
        >
          {tabs.map((tab) => {
            const isActive =
              tab.label === "Menu"
                ? mobileOpen
                : tab.label === "Services"
                  ? mobileOpen && mobilePanel === "services"
                  : pathname === tab.href;

            return (
              <IslandTab
                key={tab.label}
                tab={tab}
                isActive={isActive}
                onPress={() => {
                  if (tab.label === "Menu" && mobileOpen) {
                    close();
                  } else {
                    onTabPress(tab);
                  }
                }}
                isMobileOpen={mobileOpen}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   ISLAND TAB BUTTON
========================================================= */

function IslandTab({
  tab,
  isActive,
  onPress,
  isMobileOpen,
}: {
  tab: (typeof mobileTabs)[number];
  isActive: boolean;
  onPress: () => void;
  isMobileOpen: boolean;
}) {
  const Icon = tab.icon;
  const isMenu = tab.label === "Menu";

  return (
    <button
      type="button"
      onClick={onPress}
      aria-label={tab.label}
      aria-expanded={isMenu ? isMobileOpen : undefined}
      className={`
        island-tab
        group relative
        flex flex-col items-center justify-center
        gap-[3px]
        rounded-[16px]
        px-3 py-2
        transition-all duration-300
        active:scale-90

        ${isActive ? "island-tab-active" : ""}
      `}
    >
      {/* Active indicator dot */}
      <span
        className={`
          absolute -top-[2px] left-1/2
          h-[3px] w-[3px] -translate-x-1/2
          rounded-full bg-[var(--brand-gold)]
          transition-all duration-300
          ${isActive ? "scale-100 opacity-100" : "scale-0 opacity-0"}
        `}
      />

      {/* Icon */}
      <span className="relative">
        {isMenu && isMobileOpen ? (
          <X
            size={20}
            strokeWidth={1.7}
            className="text-[var(--brand-gold)] transition-transform duration-300"
          />
        ) : (
          <Icon
            size={20}
            strokeWidth={1.5}
            className={`
              transition-all duration-300
              ${
                isActive
                  ? "text-[var(--brand-gold)] scale-110"
                  : "text-[var(--brand-navy)]/60 group-hover:text-[var(--brand-navy)]"
              }
            `}
          />
        )}
      </span>

      {/* Label */}
      <span
        className={`
          font-brand-sans text-[8px] font-bold
          uppercase tracking-[0.06em]
          transition-colors duration-300
          ${
            isActive
              ? "text-[var(--brand-gold-700)]"
              : "text-[var(--brand-text-muted)]"
          }
        `}
      >
        {isMenu && isMobileOpen ? "Close" : tab.label}
      </span>
    </button>
  );
}

/* =========================================================
   ISLAND — MAIN PANEL
========================================================= */

function IslandMainPanel({
  close,
  setMobilePanel,
}: {
  close: () => void;
  setMobilePanel: React.Dispatch<
    React.SetStateAction<"main" | "services" | "service-detail">
  >;
}) {
  return (
    <div className="island-panel-enter p-3">
      {/* Header */}
      <div className="mb-3 flex items-center gap-3 px-2 pt-1">
        <Crown size={16} className="text-[var(--brand-gold)]" />
        <span className="font-brand-display text-[16px] font-semibold text-[var(--brand-navy)]">
          Menu
        </span>
      </div>

      {/* Navigation links */}
      <div className="space-y-0.5">
        {navLinks.map((link) => (
          <IslandNavLink key={link.label} href={link.href} close={close}>
            {link.label}
          </IslandNavLink>
        ))}

        {/* Services row — opens services panel */}
        <button
          type="button"
          onClick={() => setMobilePanel("services")}
          className="
            clay-surface-soft
            group flex w-full min-h-[56px]
            items-center justify-between
            rounded-[18px] px-4
            transition-all duration-300
            active:scale-[0.98]
          "
        >
          <div className="flex items-center gap-3">
            <span className="clay-icon-inset flex h-9 w-9 items-center justify-center rounded-[11px]">
              <Layers size={16} className="text-[var(--brand-gold)]" />
            </span>
            <div className="text-left">
              <span className="font-brand-sans text-[13px] font-bold text-[var(--brand-navy)]">
                All Services
              </span>
              <span className="block font-brand-sans text-[8px] font-semibold text-[var(--brand-text-muted)]">
                4 categories · 20 services
              </span>
            </div>
          </div>
          <ChevronRight
            size={16}
            className="text-[var(--brand-gold)] transition-transform duration-300 group-hover:translate-x-1"
          />
        </button>
      </div>

      {/* Divider */}
      <div
        aria-hidden
        className="mx-3 my-3 h-px bg-gradient-to-r from-transparent via-[var(--brand-cream-dark)]/30 to-transparent"
      />

      {/* Contact strip */}
      <div className="flex items-center justify-center gap-4 px-2 py-1">
        <Link
          href="tel:+447400577844"
          onClick={close}
          className="flex items-center gap-1.5 font-brand-sans text-[10px] font-semibold text-[var(--brand-text-muted)]"
        >
          <Phone size={11} className="text-[var(--brand-gold)]" />
          +44 7400 577844
        </Link>
        <span
          aria-hidden
          className="h-3 w-px bg-[var(--brand-cream-dark)]/40"
        />
        <Link
          href="mailto:info@sofanmore.co.uk"
          onClick={close}
          className="flex items-center gap-1.5 font-brand-sans text-[10px] font-semibold text-[var(--brand-text-muted)]"
        >
          <Mail size={11} className="text-[var(--brand-gold)]" />
          info@sofanmore.co.uk
        </Link>
      </div>

      {/* CTA */}
      <div className="mt-2  ">
        <Link
          href="tel:+4407400577844"
          onClick={close}
          className="snm-button snm-button--gold snm-button--md snm-button--full justify-center"
        >
          <span className="snm-button__label">Call Us</span>
          <MoveRight size={14} className="snm-button__arrow" />
        </Link>
      </div>
    </div>
  );
}

/* =========================================================
   ISLAND — SERVICES PANEL
========================================================= */

function IslandServicesPanel({
  setMobilePanel,
  setActiveServiceIdx,
  close,
}: {
  setMobilePanel: React.Dispatch<
    React.SetStateAction<"main" | "services" | "service-detail">
  >;
  setActiveServiceIdx: React.Dispatch<React.SetStateAction<number>>;
  close: () => void;
}) {
  return (
    <div className="island-panel-enter p-3">
      {/* Back + header */}
      <div className="mb-3 flex items-center gap-2 px-1">
        <button
          type="button"
          onClick={() => setMobilePanel("main")}
          className="
            clay-icon
            flex h-8 w-8 items-center justify-center
            rounded-[10px]
            transition-transform duration-300
            active:scale-90
          "
          aria-label="Back to menu"
        >
          <ChevronDown size={14} className="rotate-90" />
        </button>
        <span className="font-brand-display text-[15px] font-semibold text-[var(--brand-navy)]">
          Our Services
        </span>
      </div>

      {/* Service cards — 2x2 grid */}
      <div className="grid grid-cols-2 gap-2.5">
        {serviceGroups.map((group, idx) => {
          const Icon = group.icon;
          return (
            <button
              key={group.title}
              type="button"
              onClick={() => {
                setActiveServiceIdx(idx);
                setMobilePanel("service-detail");
              }}
              className="
                clay-surface-soft
                group relative flex flex-col
                rounded-[22px] p-3.5
                text-left
                transition-all duration-300
                active:scale-[0.96]
              "
            >
              {/* Image preview */}
              <div className="clay-inset relative mb-3 h-[70px] overflow-hidden rounded-[16px] p-[3px]">
                <div className="relative h-full overflow-hidden rounded-[13px]">
                  <Image
                    src={group.image}
                    alt={group.title}
                    fill
                    sizes="45vw"
                    className="object-cover transition-transform duration-500 group-active:scale-105"
                  />
                </div>
              </div>

              {/* Icon */}
              <span className="clay-icon-inset flex h-9 w-9 items-center justify-center rounded-[11px]">
                <Icon
                  size={16}
                  strokeWidth={1.5}
                  className="text-[var(--brand-gold)]"
                />
              </span>

              {/* Text */}
              <div className="mt-2.5">
                <div className="font-brand-display text-[12px] font-semibold leading-tight">
                  {group.title}
                </div>
                <div className="mt-1 font-brand-sans text-[7.5px] font-semibold text-[var(--brand-text-muted)]">
                  {group.subtitle}
                </div>
              </div>

              {/* Count */}
              <div className="mt-2 font-brand-sans text-[7px] font-bold uppercase tracking-[0.08em] text-[var(--brand-gold)]">
                {group.links.length} services
                <ChevronRight size={9} className="ml-0.5 inline" />
              </div>
            </button>
          );
        })}
      </div>

      {/* Quick CTA */}
      <div className="mt-3">
        <Link
          href="/contact-us"
          onClick={close}
          className="snm-button snm-button--gold snm-button--sm snm-button--full justify-center"
        >
          <span className="snm-button__label">Start Your Project</span>
          <MoveRight size={12} className="snm-button__arrow" />
        </Link>
      </div>
    </div>
  );
}

/* =========================================================
   ISLAND — SERVICE DETAIL PANEL
========================================================= */

function IslandServiceDetail({
  group,
  setMobilePanel,
  close,
}: {
  group: ServiceGroup;
  setMobilePanel: React.Dispatch<
    React.SetStateAction<"main" | "services" | "service-detail">
  >;
  close: () => void;
}) {
  const Icon = group.icon;

  return (
    <div className="island-panel-enter p-3">
      {/* Back + header */}
      <div className="mb-3 flex items-center gap-2 px-1">
        <button
          type="button"
          onClick={() => setMobilePanel("services")}
          className="
            clay-icon
            flex h-8 w-8 items-center justify-center
            rounded-[10px]
            transition-transform duration-300
            active:scale-90
          "
          aria-label="Back to services"
        >
          <ChevronDown size={14} className="rotate-90" />
        </button>
        <span className="font-brand-display text-[15px] font-semibold text-[var(--brand-navy)]">
          {group.title}
        </span>
      </div>

      {/* Hero image */}
      <div className="clay-inset relative mb-4 overflow-hidden rounded-[20px] p-[5px]">
        <div className="relative h-[140px] overflow-hidden rounded-[16px]">
          <Image
            src={group.image}
            alt={group.title}
            fill
            sizes="90vw"
            className="object-cover object-center"
          />
          {/* Overlay */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-[var(--brand-navy)]/40 to-transparent"
          />
          {/* Badge */}
          <div className="absolute bottom-3 left-3 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[var(--brand-gold)] text-white shadow-lg">
              <Icon size={15} strokeWidth={1.6} />
            </span>
            <div>
              <div className="font-brand-sans text-[11px] font-bold text-white">
                {group.title}
              </div>
              <div className="font-brand-sans text-[8px] font-semibold text-white/70">
                {group.subtitle}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Service links */}
      <div className="space-y-1">
        {group.links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            onClick={close}
            className="
              group/link
              clay-surface-soft
              flex min-h-[48px] items-center
              justify-between
              rounded-[15px] px-4
              font-brand-sans text-[12px] font-semibold
              text-[var(--brand-navy)]
              transition-all duration-200
              active:scale-[0.98]
            "
          >
            {link.label}
            <MoveRight
              size={14}
              className="
                text-[var(--brand-gold)]
                transition-transform duration-200
                group-active/link:translate-x-1
              "
            />
          </Link>
        ))}
      </div>

      {/* View all CTA */}
      <div className="mt-3">
        <Link
          href={group.href}
          onClick={close}
          className="snm-button snm-button--gold snm-button--sm snm-button--full justify-center"
        >
          <span className="snm-button__label">View All {group.title}</span>
          <MoveRight size={12} className="snm-button__arrow" />
        </Link>
      </div>
    </div>
  );
}

/* =========================================================
   ISLAND NAV LINK
========================================================= */

function IslandNavLink({
  href,
  children,
  close,
}: {
  href: string;
  children: React.ReactNode;
  close: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={close}
      className="
        flex min-h-[50px] items-center
        rounded-[16px] px-4
        font-brand-sans text-[13px] font-bold
        text-[var(--brand-navy)]
        transition-all duration-200
        active:bg-white/25
        hover:bg-white/30
        focus-visible:outline-2
        focus-visible:outline-[var(--brand-gold)]
      "
    >
      {children}
    </Link>
  );
}
