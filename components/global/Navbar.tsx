"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Armchair,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Building2,
  ChevronDown,
  ChevronRight,
  Crown,
  Folder,
  Hammer,
  Home,
  Images,
  Mail,
  Menu,
  MessageCircle,
  Phone,
  UserRound,
  Wrench,
  X,
  Palette,
  CircleHelp,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import type {
  CSSProperties,
  MouseEvent as ReactMouseEvent,
  MutableRefObject,
} from "react";
import { createPortal } from "react-dom";
import styles from "./Navbar.module.css";

type ServiceGroup = {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  href: string;
  image: string;
  links: { label: string; href: string }[];
};
type MobilePanel = "main" | "services" | "service-detail";
type NavItem = { label: string; href: string; icon: LucideIcon };
type ScrollMemory = { left: number; pathname: string };

export type NavbarProps = {
  /** Extra breathing room ABOVE the device safe area, in CSS pixels. */
  bottomGap?: number;
  /** Disable the small dock's blur for an entirely opaque surface. */
  glass?: boolean;
};

const DESKTOP_QUERY = "(min-width: 1024px)";
const PHONE = "+447400577844";
const EMAIL = "info@sofanmore.co.uk";
const LOGO =
  "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/Sofa_Logo.webp";

const serviceGroups: ServiceGroup[] = [
  {
    title: "Bespoke Sofas",
    subtitle: "Made for your space",
    icon: Armchair,
    href: "/services/bespoke-sofas",
    image:
      "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/bespoke-sofa-london-sofa-n-more.webp",

    links: [
      {
        label: "Made-to-Measure Sofas",
        href: "/services/bespoke-sofas#made-to-measure-sofas",
      },
      {
        label: "Corner & Modular Sofas",
        href: "/services/bespoke-sofas#corner-modular-sofas",
      },
      {
        label: "Chairs & Armchairs",
        href: "/services/bespoke-sofas#chairs-armchairs",
      },
      {
        label: "Beds & Headboards",
        href: "/services/bespoke-sofas#beds-headboards",
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
    image: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/25.webp",

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
    image: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/48.webp",

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
    image: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/Repair.webp",

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
  {
    label: "Gallery",
    href: "/gallery",
  },
  {
    label: "Projects",
    href: "/projects",
  },
  {
    label: "Workshop",
    href: "/workshop",
  },

  {
    label: "About Us",
    href: "/about-us",
  },
  {
    label: "Contact",
    href: "/contact-us",
  },
  {
    label: "Blog",
    href: "/blog",
  },
  {
    label: "FAQ",
    href: "/faqs",
  },
];

const menuItems: NavItem[] = [
  { label: "Home", href: "/", icon: Home },
  { label: "Gallery", href: "/gallery", icon: Images },
  { label: "Projects", href: "/projects", icon: Folder },
  { label: "Workshop", href: "/workshop", icon: Wrench },
  { label: "About us", href: "/about-us", icon: UserRound },
  { label: "Contact", href: "/contact-us", icon: MessageCircle },
  { label: "Blog", href: "/blog", icon: BookOpen },
  { label: "FAQ", href: "/faqs", icon: CircleHelp },
];

const dockItems: NavItem[] = [
  { label: "Home", href: "/", icon: Home },
  { label: "Services", href: "/services", icon: Armchair },
  { label: "Projects", href: "/projects", icon: Folder },
  { label: "Gallery", href: "/gallery", icon: Images },
  { label: "Workshop", href: "/workshop", icon: Wrench },
  { label: "Sign in", href: "/login", icon: UserRound },
  { label: "Contact", href: "/contact-us", icon: MessageCircle },
];

function cx(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

function isPathActive(pathname: string, href: string) {
  return href === "/"
    ? pathname === "/"
    : pathname === href || pathname.startsWith(href + "/");
}

function isPlainNavigation(event: ReactMouseEvent<HTMLAnchorElement>) {
  return (
    !event.defaultPrevented &&
    event.button === 0 &&
    !event.metaKey &&
    !event.ctrlKey &&
    !event.shiftKey &&
    !event.altKey
  );
}

function dockVariables(bottomGap: number): CSSProperties {
  const gap = Number.isFinite(bottomGap) ? Math.max(8, bottomGap) : 14;
  return { "--nav-bottom-gap": gap + "px" } as CSSProperties;
}

export default function Navbar({ bottomGap = 14, glass = true }: NavbarProps) {
  const pathname = usePathname() ?? "/";
  // Unmount the controllers too, so /login never keeps a stale scroll lock.
  if (isPathActive(pathname, "/login")) return null;

  return (
    <>
      <DesktopNavigation pathname={pathname} />
      <MobileNavigation
        pathname={pathname}
        bottomGap={bottomGap}
        glass={glass}
      />
    </>
  );
}

/** Place after your footer if the layout does not already reserve dock space. */
export function NavbarBottomSpace({
  bottomGap = 14,
}: Pick<NavbarProps, "bottomGap">) {
  const pathname = usePathname() ?? "/";
  if (isPathActive(pathname, "/login")) return null;
  return (
    <div
      aria-hidden="true"
      className={styles.bottomSpace}
      style={dockVariables(bottomGap)}
    />
  );
}

function DesktopNavigation({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const megaRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLElement>(null);
  const hoverOpenedRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const megaId = useId();
  const megaHelpId = useId();
  const active = serviceGroups[activeGroup];

  const cancelClose = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = null;
  }, []);
  const close = useCallback(() => {
    cancelClose();
    hoverOpenedRef.current = false;
    setOpen(false);
  }, [cancelClose]);

  useEffect(() => {
    close();
  }, [pathname, close]);
  useEffect(() => cancelClose, [cancelClose]);

  useEffect(() => {
    const desktop = window.matchMedia(DESKTOP_QUERY);
    let frame = 0;
    const update = () => {
      frame = 0;
      if (desktop.matches) setScrolled(window.scrollY > 24);
    };
    const onScroll = () => {
      if (desktop.matches && !frame)
        frame = window.requestAnimationFrame(update);
    };
    const onResize = () => {
      if (!desktop.matches) close();
      update();
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    desktop.addEventListener("change", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      desktop.removeEventListener("change", onResize);
      window.cancelAnimationFrame(frame);
    };
  }, [close]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) close();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        triggerRef.current?.focus({ preventScroll: true });
      }
    };
    const onFocus = (event: FocusEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) close();
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("focusin", onFocus);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("focusin", onFocus);
    };
  }, [open, close]);

  function openOnHover() {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches)
      return;
    cancelClose();
    if (!open) {
      hoverOpenedRef.current = true;
      setOpen(true);
    }
  }

  function scheduleClose() {
    cancelClose();
    timerRef.current = setTimeout(() => {
      const focused = document.activeElement;
      if (megaRef.current?.contains(focused) || triggerRef.current === focused)
        return;
      setOpen(false);
    }, 180);
  }

  function navigate(event: ReactMouseEvent<HTMLAnchorElement>) {
    if (isPlainNavigation(event)) close();
  }

  return (
    <header
      className={cx(styles.theme, styles.desktop, "font-brand-sans")}
      ref={headerRef}
      dir="ltr"
    >
      <div className={styles.desktopBar} data-scrolled={scrolled}>
        <Link
          href="/"
          className={styles.logo}
          aria-label="Sofa N More — Home"
          onClick={navigate}
        >
          <Crown size={17} strokeWidth={1.5} aria-hidden="true" />
          <Image
            src={LOGO}
            width={100}
            height={38}
            alt="Sofa N More"
            className={styles.logoImage}
          />
        </Link>
        <nav className={styles.desktopLinks} aria-label="Main navigation">
          <div
            className={styles.servicesTrigger}
            onMouseEnter={openOnHover}
            onMouseLeave={scheduleClose}
          >
            <Link
              href="/services"
              onClick={navigate}
              className={styles.desktopLink}
              aria-current={
                isPathActive(pathname, "/services") ? "page" : undefined
              }
            >
              Services
            </Link>
            <button
              type="button"
              ref={triggerRef}
              aria-expanded={open}
              aria-controls={megaId}
              aria-label={
                open ? "Close services navigation" : "Open services navigation"
              }
              className={styles.disclosureButton}
              onClick={() => {
                cancelClose();
                // First click confirms a hover-open disclosure instead of closing it.
                if (hoverOpenedRef.current) {
                  hoverOpenedRef.current = false;
                  // Hover and click can be batched before `open` commits.
                  setOpen(true);
                  return;
                }
                hoverOpenedRef.current = false;
                setOpen((value) => !value);
              }}
              onKeyDown={(event) => {
                if (event.key === "ArrowDown") {
                  event.preventDefault();
                  cancelClose();
                  hoverOpenedRef.current = false;
                  setOpen(true);
                  window.requestAnimationFrame(() =>
                    megaRef.current
                      ?.querySelector<HTMLAnchorElement>("a")
                      ?.focus(),
                  );
                }
              }}
            >
              <ChevronDown
                size={14}
                aria-hidden="true"
                className={open ? styles.chevronOpen : undefined}
              />
            </button>
          </div>
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={navigate}
              className={styles.desktopLink}
              aria-current={
                isPathActive(pathname, item.href) ? "page" : undefined
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className={styles.desktopActions}>
          <Link
            href="/login"
            className={styles.signIn}
            aria-label="Sign in or create a Sofa N More account"
          >
            <UserRound size={17} aria-hidden="true" />
            <span>Sign in</span>
          </Link>
          <a
            href={"tel:" + PHONE}
            className={styles.callButton}
            aria-label="Call +44 7400 577844"
          >
            <Phone size={16} aria-hidden="true" />
            <span>+44 7400 577844</span>
          </a>
        </div>
      </div>
      {open && (
        <div
          id={megaId}
          ref={megaRef}
          className={styles.megaPosition}
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
          onFocus={cancelClose}
          onBlur={(event) => {
            if (
              !headerRef.current?.contains(event.relatedTarget as Node | null)
            )
              close();
          }}
        >
          <div
            className={styles.megaMenu}
            role="region"
            aria-label="Our services"
          >
            <div className={styles.megaCategories}>
              <p className={styles.eyebrow}>Our expertise</p>
              <p id={megaHelpId} className={styles.srOnly}>
                Press Right Arrow to explore a category’s links. Press Left
                Arrow to return.
              </p>
              {serviceGroups.map((group, index) => {
                const Icon = group.icon;
                return (
                  <Link
                    key={group.href}
                    href={group.href}
                    prefetch={false}
                    onClick={navigate}
                    data-service-category="true"
                    aria-describedby={megaHelpId}
                    onMouseEnter={() => setActiveGroup(index)}
                    onFocus={() => setActiveGroup(index)}
                    onKeyDown={(event) => {
                      if (event.key === "ArrowRight") {
                        event.preventDefault();
                        setActiveGroup(index);
                        window.requestAnimationFrame(() =>
                          detailsRef.current
                            ?.querySelector<HTMLAnchorElement>("a")
                            ?.focus(),
                        );
                      }
                    }}
                    className={styles.megaCategory}
                    data-selected={activeGroup === index}
                    aria-current={
                      isPathActive(pathname, group.href) ? "page" : undefined
                    }
                  >
                    <span className={styles.categoryIcon}>
                      <Icon size={21} strokeWidth={1.65} aria-hidden="true" />
                    </span>
                    <span>
                      <strong>{group.title}</strong>
                      <small>{group.subtitle}</small>
                    </span>
                    <ChevronRight size={16} aria-hidden="true" />
                  </Link>
                );
              })}
              <Link
                href="/services"
                className={styles.textLink}
                onClick={navigate}
              >
                View all services <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
            <div className={styles.megaDetails}>
              <p className={styles.eyebrow}>{active.subtitle}</p>
              <h2 className={cx(styles.megaTitle, "font-brand-display")}>
                {active.title}
              </h2>
              <nav
                ref={detailsRef}
                aria-label={active.title}
                onKeyDown={(event) => {
                  if (event.key === "ArrowLeft") {
                    event.preventDefault();
                    megaRef.current
                      ?.querySelectorAll<HTMLAnchorElement>(
                        "[data-service-category]",
                      )
                      [activeGroup]?.focus();
                  }
                }}
              >
                {active.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    prefetch={false}
                    onClick={navigate}
                    className={styles.detailLink}
                  >
                    <span>{link.label}</span>
                    <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                ))}
              </nav>
              <Link
                href={active.href}
                onClick={navigate}
                className={styles.textLink}
              >
                Explore {active.title.toLowerCase()}{" "}
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
            <div className={styles.megaFeature}>
              <div className={styles.megaImage}>
                <Image
                  src={active.image}
                  alt={active.title}
                  fill
                  sizes="(min-width: 1280px) 300px, 240px"
                />
              </div>
              <p>Let’s make it yours.</p>
              <Link
                href="/contact-us"
                onClick={navigate}
                className={styles.primaryLink}
              >
                Start your project <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

/** Fixed-body lock with exact style restoration; release before Next handles a link. */
function lockPageScroll() {
  const body = document.body;
  const html = document.documentElement;
  const x = window.scrollX;
  const y = window.scrollY;
  const saved = {
    position: body.style.position,
    top: body.style.top,
    left: body.style.left,
    right: body.style.right,
    width: body.style.width,
    overflow: body.style.overflow,
    htmlOverflow: html.style.overflow,
    overscroll: html.style.overscrollBehavior,
  };
  body.style.position = "fixed";
  body.style.top = -y + "px";
  body.style.left = -x + "px";
  body.style.right = "0";
  body.style.width = "100%";
  body.style.overflow = "hidden";
  html.style.overflow = "hidden";
  html.style.overscrollBehavior = "none";
  let released = false;
  return () => {
    if (released) return;
    released = true;
    Object.assign(body.style, {
      position: saved.position,
      top: saved.top,
      left: saved.left,
      right: saved.right,
      width: saved.width,
      overflow: saved.overflow,
    });
    html.style.overflow = saved.htmlOverflow;
    html.style.overscrollBehavior = saved.overscroll;
    const previousBehavior = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";
    window.scrollTo(x, y);
    html.style.scrollBehavior = previousBehavior;
  };
}

function MobileNavigation({
  pathname,
  bottomGap,
  glass,
}: Required<NavbarProps> & { pathname: string }) {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [panel, setPanel] = useState<MobilePanel>("main");
  const [groupIndex, setGroupIndex] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const unlockRef = useRef<(() => void) | null>(null);
  const memoryRef = useRef<ScrollMemory>({ left: 0, pathname: "" });
  const dialogId = useId();
  const titleId = useId();
  const group = serviceGroups[groupIndex];

  const close = useCallback((restoreFocus = true) => {
    if (!restoreFocus) openerRef.current = null;
    // Synchronous unlock matters for same-page #anchors and Next scroll restoration.
    unlockRef.current?.();
    unlockRef.current = null;
    if (dialogRef.current?.open) dialogRef.current.close();
    setOpen(false);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    close(false);
  }, [pathname, close]);

  useEffect(() => {
    const desktop = window.matchMedia(DESKTOP_QUERY);
    const onChange = () => {
      if (desktop.matches) close(false);
    };
    desktop.addEventListener("change", onChange);
    return () => desktop.removeEventListener("change", onChange);
  }, [close]);

  useEffect(() => {
    if (!open || !mounted) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    const unlock = lockPageScroll();
    unlockRef.current = unlock;
    if (!dialog.open) dialog.showModal();
    return () => {
      unlock();
      if (unlockRef.current === unlock) unlockRef.current = null;
      if (dialog.open) dialog.close();
    };
  }, [open, mounted]);

  useEffect(() => {
    if (!open) return;
    if (contentRef.current) contentRef.current.scrollTop = 0;
    headingRef.current?.focus({ preventScroll: true });
  }, [open, panel, groupIndex]);

  useEffect(() => {
    if (open || !openerRef.current) return;
    const frame = window.requestAnimationFrame(() => {
      const opener = openerRef.current;
      if (opener?.isConnected && opener.getClientRects().length)
        opener.focus({ preventScroll: true });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [open]);

  function openPanel(next: "main" | "services", trigger: HTMLElement) {
    if (
      open &&
      (panel === next || (next === "services" && panel === "service-detail"))
    ) {
      close();
      return;
    }
    if (!open) openerRef.current = trigger;
    setPanel(next);
    setOpen(true);
  }

  function navigate(event: ReactMouseEvent<HTMLAnchorElement>) {
    if (isPlainNavigation(event)) close(false);
  }

  const title =
    panel === "main"
      ? "Menu"
      : panel === "services"
        ? "Our services"
        : group.title;
  const dockProps = {
    pathname,
    panel,
    open,
    dialogId,
    memoryRef,
    onMenu: (trigger: HTMLElement) => openPanel("main", trigger),
    onServices: (trigger: HTMLElement) => openPanel("services", trigger),
    navigate,
  };

  if (!mounted) return null;

  return createPortal(
    <div
      className={cx(styles.theme, styles.mobileRoot, "font-brand-sans")}
      dir="ltr"
      data-glass={glass ? "on" : "off"}
      style={dockVariables(bottomGap)}
    >
      <div
        className={styles.dockPosition}
        data-hidden={open}
        aria-hidden={open ? true : undefined}
      >
        <MobileDock {...dockProps} visible={!open} />
      </div>
      <dialog
        ref={dialogRef}
        id={dialogId}
        className={styles.mobileDialog}
        aria-labelledby={titleId}
        onCancel={(event) => {
          event.preventDefault();
          close();
        }}
        onClose={() => {
          if (!dialogRef.current?.open) close();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
      >
        {open && (
          <div className={styles.modalStack}>
            <section className={styles.sheet}>
              <header className={styles.sheetHeader}>
                {panel === "main" ? (
                  <span className="shrink-0">
                    <Image
                      src={LOGO}
                      width={100}
                      height={38}
                      alt="Sofa N More"
                      className={styles.logoImage}
                    />
                  </span>
                ) : (
                  <button
                    type="button"
                    className={styles.iconButton}
                    aria-label={
                      panel === "service-detail"
                        ? "Back to services"
                        : "Back to main menu"
                    }
                    onClick={() =>
                      setPanel(panel === "service-detail" ? "services" : "main")
                    }
                  >
                    <ArrowLeft size={20} aria-hidden="true" />
                  </button>
                )}
                <div className={styles.sheetTitle}>
                  <span className={styles.eyebrow}>Sofa N More</span>
                  <h2
                    id={titleId}
                    tabIndex={-1}
                    ref={headingRef}
                    className="font-brand-display"
                  >
                    {title}
                  </h2>
                </div>
                <button
                  type="button"
                  className={styles.iconButton}
                  aria-label="Close navigation"
                  onClick={() => close()}
                >
                  <X size={21} aria-hidden="true" />
                </button>
              </header>
              <div
                ref={contentRef}
                className={styles.sheetContent}
                data-lenis-prevent="true"
              >
                {panel === "main" && (
                  <>
                    <button
                      type="button"
                      className={styles.servicesCard}
                      onClick={() => setPanel("services")}
                    >
                      <span className={styles.servicesCardIcon}>
                        <Armchair
                          size={27}
                          strokeWidth={1.5}
                          aria-hidden="true"
                        />
                      </span>
                      <span>
                        <strong>Explore our services</strong>
                        <small>
                          Bespoke furniture, interiors & restoration
                        </small>
                      </span>
                      <ArrowRight size={20} aria-hidden="true" />
                    </button>
                    <nav
                      className={styles.menuGrid}
                      aria-label="Explore Sofa N More"
                    >
                      {menuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            prefetch={false}
                            onClick={navigate}
                            className={styles.menuLink}
                            aria-current={
                              isPathActive(pathname, item.href)
                                ? "page"
                                : undefined
                            }
                          >
                            <Icon
                              size={19}
                              strokeWidth={1.7}
                              aria-hidden="true"
                            />
                            <span>{item.label}</span>
                            <ChevronRight size={14} aria-hidden="true" />
                          </Link>
                        );
                      })}
                    </nav>
                    <Link
                      href="/login"
                      prefetch={false}
                      onClick={navigate}
                      className={styles.accountLink}
                    >
                      <span className={styles.accountIcon}>
                        <UserRound size={20} aria-hidden="true" />
                      </span>
                      <span>
                        <strong>Your account</strong>
                        <small>Sign in or create an account</small>
                      </span>
                      <ArrowRight size={17} aria-hidden="true" />
                    </Link>
                    <div className={styles.contactRow}>
                      <a href={"tel:" + PHONE} onClick={navigate}>
                        <Phone size={17} aria-hidden="true" />
                        Call us
                      </a>
                      <a href={"mailto:" + EMAIL} onClick={navigate}>
                        <Mail size={17} aria-hidden="true" />
                        Email us
                      </a>
                    </div>
                    <Link
                      href="/contact-us"
                      prefetch={false}
                      onClick={navigate}
                      className={styles.primaryLink}
                    >
                      Start your project{" "}
                      <ArrowRight size={18} aria-hidden="true" />
                    </Link>
                  </>
                )}
                {panel === "services" && (
                  <>
                    <div className={styles.serviceGrid}>
                      {serviceGroups.map((item, index) => {
                        const Icon = item.icon;
                        return (
                          <button
                            key={item.href}
                            type="button"
                            className={styles.serviceTile}
                            onClick={() => {
                              setGroupIndex(index);
                              setPanel("service-detail");
                            }}
                          >
                            <span className={styles.serviceImage}>
                              <Image
                                src={item.image}
                                alt=""
                                fill
                                sizes="(max-width: 520px) 42vw, 205px"
                              />
                              <span className={styles.tileIcon}>
                                <Icon
                                  size={18}
                                  strokeWidth={1.7}
                                  aria-hidden="true"
                                />
                              </span>
                            </span>
                            <strong className="font-brand-display">
                              {item.title}
                            </strong>
                            <span className={styles.serviceSubtitle}>
                              {item.subtitle}
                            </span>
                            <span className={styles.exploreLabel}>
                              Explore{" "}
                              <ArrowRight size={15} aria-hidden="true" />
                            </span>
                          </button>
                        );
                      })}
                    </div>
                    <Link
                      href="/services"
                      prefetch={false}
                      onClick={navigate}
                      className={styles.secondaryLink}
                    >
                      View all services{" "}
                      <ArrowRight size={17} aria-hidden="true" />
                    </Link>
                    <Link
                      href="/contact-us"
                      prefetch={false}
                      onClick={navigate}
                      className={styles.primaryLink}
                    >
                      Start your project{" "}
                      <ArrowRight size={18} aria-hidden="true" />
                    </Link>
                  </>
                )}
                {panel === "service-detail" && (
                  <>
                    <Link
                      href={group.href}
                      prefetch={false}
                      onClick={navigate}
                      className={styles.detailHero}
                      aria-label={"Explore " + group.title}
                    >
                      <Image
                        src={group.image}
                        alt={group.title}
                        fill
                        sizes="(max-width: 520px) 90vw, 440px"
                      />
                      <span>
                        {group.subtitle}
                        <ArrowRight size={22} aria-hidden="true" />
                      </span>
                    </Link>
                    <nav
                      className={styles.serviceLinks}
                      aria-label={group.title}
                    >
                      {group.links.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          prefetch={false}
                          onClick={navigate}
                          className={styles.detailLink}
                        >
                          <span>{link.label}</span>
                          <ArrowRight size={17} aria-hidden="true" />
                        </Link>
                      ))}
                    </nav>
                    <Link
                      href={group.href}
                      prefetch={false}
                      onClick={navigate}
                      className={styles.primaryLink}
                    >
                      Explore {group.title.toLowerCase()}{" "}
                      <ArrowRight size={17} aria-hidden="true" />
                    </Link>
                  </>
                )}
              </div>
            </section>
            <MobileDock {...dockProps} visible />
          </div>
        )}
      </dialog>
    </div>,
    document.body,
  );
}

function MobileDock({
  pathname,
  panel,
  open,
  visible,
  dialogId,
  memoryRef,
  onMenu,
  onServices,
  navigate,
}: {
  pathname: string;
  panel: MobilePanel;
  open: boolean;
  visible: boolean;
  dialogId: string;
  memoryRef: MutableRefObject<ScrollMemory>;
  onMenu: (trigger: HTMLElement) => void;
  onServices: (trigger: HTMLElement) => void;
  navigate: (event: ReactMouseEvent<HTMLAnchorElement>) => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const closeMenu = open && panel === "main";

  useEffect(() => {
    const track = trackRef.current;
    const frame = frameRef.current;
    if (!visible || !track || !frame) return;
    let animationFrame = 0;
    let initialized = false;

    const updateEdges = () => {
      animationFrame = 0;
      const max = track.scrollWidth - track.clientWidth;
      frame.dataset.atStart = String(track.scrollLeft <= 2);
      frame.dataset.atEnd = String(track.scrollLeft >= max - 2);
    };
    const onScroll = () => {
      // Native momentum owns the gesture. No React state, touchmove or drag loop.
      if (!initialized) return;
      memoryRef.current.left = track.scrollLeft;
      if (!animationFrame)
        animationFrame = window.requestAnimationFrame(updateEdges);
    };
    const initialize = () => {
      // A newly mounted modal has no box until its parent calls showModal().
      // The same guard covers a desktop-first load followed by a mobile resize.
      if (!track.clientWidth) return;
      track.scrollLeft = memoryRef.current.left;
      if (memoryRef.current.pathname !== pathname) {
        memoryRef.current.pathname = pathname;
        const active = track.querySelector<HTMLElement>(
          "[data-route-active='true']",
        );
        if (active) {
          const itemBox = active.getBoundingClientRect();
          const trackBox = track.getBoundingClientRect();
          if (itemBox.left < trackBox.left || itemBox.right > trackBox.right) {
            track.scrollLeft +=
              itemBox.left -
              trackBox.left -
              (track.clientWidth - itemBox.width) / 2;
          }
        }
      }
      memoryRef.current.left = track.scrollLeft;
      initialized = true;
      updateEdges();
    };
    const initializeFrame = window.requestAnimationFrame(initialize);
    track.addEventListener("scroll", onScroll, { passive: true });
    const observer = new ResizeObserver(() =>
      initialized ? updateEdges() : initialize(),
    );
    observer.observe(track);
    return () => {
      track.removeEventListener("scroll", onScroll);
      observer.disconnect();
      window.cancelAnimationFrame(initializeFrame);
      window.cancelAnimationFrame(animationFrame);
    };
  }, [visible, pathname, memoryRef]);

  return (
    <nav
      className={styles.dock}
      aria-label={open ? "Navigation shortcuts" : "Mobile navigation"}
    >
      <button
        type="button"
        className={styles.menuButton}
        aria-label={closeMenu ? "Close menu" : "Open main menu"}
        aria-controls={dialogId}
        aria-haspopup="dialog"
        aria-expanded={open && panel === "main"}
        onClick={(event) => onMenu(event.currentTarget)}
      >
        {closeMenu ? (
          <X size={22} strokeWidth={1.8} aria-hidden="true" />
        ) : (
          <Menu size={22} strokeWidth={1.8} aria-hidden="true" />
        )}
        <span>{closeMenu ? "Close" : "Menu"}</span>
      </button>
      <span className={styles.dockDivider} aria-hidden="true" />
      <div className={styles.trackFrame} ref={frameRef}>
        <div
          className={styles.dockTrack}
          ref={trackRef}
          data-lenis-prevent="true"
        >
          {dockItems.map((item) => {
            const Icon = item.icon;
            const routeActive = isPathActive(pathname, item.href);
            if (item.href === "/services") {
              const expanded = open && panel !== "main";
              return (
                <button
                  key={item.href}
                  type="button"
                  className={styles.dockItem}
                  data-active={expanded || (!open && routeActive)}
                  data-route-active={routeActive}
                  aria-expanded={expanded}
                  aria-controls={dialogId}
                  aria-haspopup="dialog"
                  onClick={(event) => onServices(event.currentTarget)}
                >
                  <span className={styles.dockIcon}>
                    <Icon size={22} strokeWidth={1.7} aria-hidden="true" />
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            }
            return (
              <Link
                key={item.href}
                href={item.href}
                prefetch={false}
                onClick={navigate}
                className={styles.dockItem}
                data-active={!open && routeActive}
                data-route-active={routeActive}
                aria-current={routeActive ? "page" : undefined}
              >
                <span className={styles.dockIcon}>
                  <Icon size={21} strokeWidth={1.7} aria-hidden="true" />
                </span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
