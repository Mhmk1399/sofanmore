"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Armchair,
  Building2,
  ChevronDown,
  ChevronRight,
  Crown,
  Folder,
  FolderOpen,
  Hammer,
  Home,
  Images,
  Layers,
  Mail,
  Menu,
  MoveRight,
  Palette,
  Phone,
  Wrench,
  X,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";
import type { Dispatch, ReactNode, SetStateAction } from "react";

import { useCallback, useEffect, useRef, useState } from "react";

import ClayButton from "../ui/ClayButton";

/* =========================================================
   TYPES
========================================================= */

type ServiceGroup = {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  href: string;
  image: string;
  links: {
    label: string;
    href: string;
  }[];
};

type MobilePanel = "main" | "services" | "service-detail";

type MobileTab = {
  label: string;
  icon: LucideIcon;
  href: string;
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
    href: "/faq",
  },
];

const mobileTabs: MobileTab[] = [
  {
    label: "Menu",
    icon: Menu,
    href: "#menu",
  },
  {
    label: "Home",
    icon: Home,
    href: "/",
  },
  {
    label: "Projects",
    icon: Folder,
    href: "/projects",
  },
  {
    label: "Workshop",
    icon: Wrench,
    href: "/workshop",
  },
  {
    label: "Gallery",
    icon: Images,
    href: "/gallery",
  },
  {
    label: "Services",
    icon: Layers,
    href: "/services",
  },
  {
    label: "Contact",
    icon: FolderOpen,
    href: "/contact-us",
  },
];

/* =========================================================
   HELPERS
========================================================= */

function isPathActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

/* =========================================================
   ROOT
========================================================= */

export default function Navbar() {
  const pathname = usePathname();

  const [megaOpen, setMegaOpen] = useState(false);

  const [mobileOpen, setMobileOpen] = useState(false);

  const [mobilePanel, setMobilePanel] = useState<MobilePanel>("main");

  const [activeServiceIdx, setActiveServiceIdx] = useState(0);

  const [activeGroup, setActiveGroup] = useState(0);

  const [scrolled, setScrolled] = useState(false);

  const navbarRef = useRef<HTMLElement>(null);

  const megaTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scrolledRef = useRef(false);

  /* =======================================================
     CLOSE
  ======================================================= */

  const closeNavigation = useCallback(() => {
    setMegaOpen(false);
    setMobileOpen(false);
    setMobilePanel("main");
  }, []);

  /* =======================================================
     CLOSE AFTER ROUTE CHANGE
  ======================================================= */

  useEffect(() => {
    closeNavigation();
  }, [pathname, closeNavigation]);

  /* =======================================================
     DESKTOP SCROLL STATE
  ======================================================= */

  useEffect(() => {
    let frameId = 0;

    const update = () => {
      frameId = 0;

      const next = window.scrollY > 24;

      if (next === scrolledRef.current) {
        return;
      }

      scrolledRef.current = next;
      setScrolled(next);
    };

    const handleScroll = () => {
      if (frameId) return;

      frameId = window.requestAnimationFrame(update);
    };

    update();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);

      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  /* =======================================================
     ESC
  ======================================================= */

  useEffect(() => {
    if (!megaOpen && !mobileOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeNavigation();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [megaOpen, mobileOpen, closeNavigation]);

  /* =======================================================
     DESKTOP OUTSIDE CLICK
  ======================================================= */

  useEffect(() => {
    if (!megaOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      const navbar = navbarRef.current;

      if (navbar && !navbar.contains(event.target as Node)) {
        setMegaOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [megaOpen]);

  /* =======================================================
     ROBUST MOBILE SCROLL LOCK

     Important for:
     iOS Safari
     Android Chrome
     Lenis-style smooth scrolling
  ======================================================= */

  useEffect(() => {
    if (!mobileOpen) return;

    const body = document.body;
    const html = document.documentElement;

    const scrollY = window.scrollY;

    const previous = {
      bodyPosition: body.style.position,

      bodyTop: body.style.top,

      bodyLeft: body.style.left,

      bodyRight: body.style.right,

      bodyWidth: body.style.width,

      bodyOverflow: body.style.overflow,

      htmlOverflow: html.style.overflow,

      htmlOverscroll: html.style.overscrollBehavior,
    };

    /*
      position: fixed is much more
      reliable than overflow:hidden alone
      on iOS Safari.
    */

    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";

    html.style.overflow = "hidden";
    html.style.overscrollBehavior = "none";

    return () => {
      body.style.position = previous.bodyPosition;

      body.style.top = previous.bodyTop;

      body.style.left = previous.bodyLeft;

      body.style.right = previous.bodyRight;

      body.style.width = previous.bodyWidth;

      body.style.overflow = previous.bodyOverflow;

      html.style.overflow = previous.htmlOverflow;

      html.style.overscrollBehavior = previous.htmlOverscroll;

      window.scrollTo(0, scrollY);
    };
  }, [mobileOpen]);

  /* =======================================================
     CLEAN TIMER
  ======================================================= */

  useEffect(() => {
    return () => {
      if (megaTimeout.current) {
        clearTimeout(megaTimeout.current);
      }
    };
  }, []);

  /* =======================================================
     DESKTOP MEGA MENU
  ======================================================= */

  function handleMegaEnter() {
    if (megaTimeout.current) {
      clearTimeout(megaTimeout.current);
    }

    setMegaOpen(true);
  }

  function handleMegaLeave() {
    if (megaTimeout.current) {
      clearTimeout(megaTimeout.current);
    }

    megaTimeout.current = setTimeout(() => {
      setMegaOpen(false);
    }, 200);
  }

  /* =======================================================
     MOBILE PANEL TRIGGERS
  ======================================================= */

  function handleMobileMenu() {
    if (mobileOpen && mobilePanel === "main") {
      closeNavigation();
      return;
    }

    setMobilePanel("main");
    setMobileOpen(true);
  }

  function handleMobileServices() {
    if (
      mobileOpen &&
      (mobilePanel === "services" || mobilePanel === "service-detail")
    ) {
      closeNavigation();
      return;
    }

    setMobilePanel("services");
    setMobileOpen(true);
  }

  if (pathname === "/login") {
    return null;
  }

  return (
    <>
      {/* ===============================================
          DESKTOP
      ================================================ */}

      <header
        ref={navbarRef}
        className="
          fixed
          inset-x-0
          top-0

          z-[200]

          hidden

          px-3
          pt-3

          sm:px-5

          lg:block
          lg:px-8
          lg:pt-4
        "
      >
        <DesktopBar
          pathname={pathname}
          scrolled={scrolled}
          megaOpen={megaOpen}
          setMegaOpen={setMegaOpen}
          closeNavigation={closeNavigation}
          handleMegaEnter={handleMegaEnter}
          handleMegaLeave={handleMegaLeave}
        />

        {megaOpen && (
          <DesktopMegaMenu
            close={closeNavigation}
            activeGroup={activeGroup}
            setActiveGroup={setActiveGroup}
            onMouseEnter={handleMegaEnter}
            onMouseLeave={handleMegaLeave}
          />
        )}
      </header>

      {/* ===============================================
          MOBILE
      ================================================ */}

      <MobileDynamicIsland
        pathname={pathname}
        mobileOpen={mobileOpen}
        mobilePanel={mobilePanel}
        setMobilePanel={setMobilePanel}
        activeServiceIdx={activeServiceIdx}
        setActiveServiceIdx={setActiveServiceIdx}
        close={closeNavigation}
        openMenu={handleMobileMenu}
        openServices={handleMobileServices}
      />
    </>
  );
}

/* =========================================================
   DESKTOP BAR
========================================================= */

function DesktopBar({
  pathname,
  scrolled,
  megaOpen,
  setMegaOpen,
  closeNavigation,
  handleMegaEnter,
  handleMegaLeave,
}: {
  pathname: string;
  scrolled: boolean;
  megaOpen: boolean;

  setMegaOpen: Dispatch<SetStateAction<boolean>>;

  closeNavigation: () => void;

  handleMegaEnter: () => void;
  handleMegaLeave: () => void;
}) {
  const servicesActive = pathname.startsWith("/services");

  return (
    <div
      className={`
        navbar-bar
        clay-surface-soft

        relative
        z-30

        mx-auto

        flex
        max-w-[var(--site-width)]

        items-center
        justify-between

        rounded-[27px]

        border
        border-white/70

        px-7

        ${scrolled ? "h-[70px]" : "h-[78px]"}
      `}
    >
      <Logo close={closeNavigation} />

      <nav
        aria-label="Main navigation"
        className="
    flex
    items-center

    gap-0.5

    xl:gap-1
  "
      >
        {/* =====================================================
      SERVICES — FIRST ITEM
  ====================================================== */}

        <div
          onMouseEnter={handleMegaEnter}
          onMouseLeave={handleMegaLeave}
          className="
      flex
      items-center
    "
        >
          <Link
            href="/services"
            onClick={closeNavigation}
            className={`
        navbar-link

        flex
        h-10
        items-center

        rounded-l-[13px]

        px-3.5

        font-brand-sans

        text-[11px]
        font-semibold

        uppercase
        tracking-[0.07em]

        transition-colors
        duration-150

        ${
          servicesActive || megaOpen
            ? `
              bg-white/35
              text-[var(--brand-gold-700)]
            `
            : `
              text-[var(--brand-navy)]
              hover:text-[var(--brand-gold-700)]
            `
        }
      `}
          >
            Services
          </Link>

          <button
            type="button"
            aria-haspopup="true"
            aria-expanded={megaOpen}
            aria-label={megaOpen ? "Close services menu" : "Open services menu"}
            onClick={() => setMegaOpen((current) => !current)}
            className={`
        flex
        h-10
        w-8

        items-center
        justify-center

        rounded-r-[13px]

        transition-colors
        duration-150

        ${
          servicesActive || megaOpen
            ? `
              bg-white/35
              text-[var(--brand-gold-700)]
            `
            : `
              text-[var(--brand-navy)]/60
              hover:text-[var(--brand-gold-700)]
            `
        }
      `}
          >
            <ChevronDown
              size={13}
              strokeWidth={1.8}
              className={`
          transition-transform
          duration-150

          ${megaOpen ? "rotate-180" : ""}
        `}
            />
          </button>
        </div>

        {/* =====================================================
      GALLERY
  ====================================================== */}

        <DesktopLink href="/gallery" active={pathname === "/gallery"}>
          Gallery
        </DesktopLink>

        {/* =====================================================
      REST
  ====================================================== */}

        {navLinks.slice(1).map((link) => (
          <DesktopLink
            key={link.label}
            href={link.href}
            active={pathname === link.href}
          >
            {link.label}
          </DesktopLink>
        ))}
      </nav>

      <ClayButton href="tel:+447400577844" variant="navy" size="md">
        Call +44 7400 577844
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
      aria-label="Sofa N More — Home"
      className="
        shrink-0

        focus-visible:outline-2
        focus-visible:outline-offset-4
        focus-visible:outline-[var(--brand-gold)]
      "
    >
      <div
        className="
          flex
          flex-col
          items-center
        "
      >
        <Crown
          size={19}
          strokeWidth={1.35}
          className="
            mb-[-1px]
            text-[var(--brand-gold)]
          "
        />

        <span
          className="
            font-brand-display

            text-[21px]
            font-semibold

            tracking-[0.035em]

            text-[var(--brand-navy)]
          "
        >
          SOFA N MORE
        </span>

        <span
          className="
            mt-[1px]

            font-brand-sans

            text-[6px]
            font-bold
            uppercase

            tracking-[0.31em]

            text-[var(--brand-gold-700)]
          "
        >
          London
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
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`
        navbar-link

        flex
        h-10
        items-center

        rounded-[13px]

        px-3.5

        font-brand-sans

        text-[11px]
        font-semibold

        uppercase
        tracking-[0.07em]

        transition-colors
        duration-150

        ${
          active
            ? `
              bg-white/35
              text-[var(--brand-gold-700)]
            `
            : `
              text-[var(--brand-navy)]

              hover:bg-white/20
              hover:text-[var(--brand-gold-700)]
            `
        }

        focus-visible:outline-2
        focus-visible:outline-offset-2
        focus-visible:outline-[var(--brand-gold)]
      `}
    >
      {children}
    </Link>
  );
}

/* =========================================================
   DESKTOP MEGA MENU
========================================================= */

function DesktopMegaMenu({
  close,
  activeGroup,
  setActiveGroup,
  onMouseEnter,
  onMouseLeave,
}: {
  close: () => void;
  activeGroup: number;

  setActiveGroup: (index: number) => void;

  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  const active = serviceGroups[activeGroup];

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="
        absolute

        left-1/2
        top-[calc(100%-2px)]

        w-[calc(100%-4rem)]
        max-w-[1320px]

        -translate-x-1/2

        pt-2
      "
    >
      <div
        role="region"
        aria-label="Services menu"
        className="
          clay-surface-soft

          overflow-hidden

          rounded-[30px]

          border
          border-white/75

          p-2

          animate-fadeIn
        "
      >
        <div
          className="
            rounded-[24px]

            border
            border-white/60

            bg-[#FFFDF8]/95

            p-3
          "
        >
          <div
            className="
              grid
              grid-cols-[265px_1fr]
              gap-3
            "
          >
            {/* LEFT SERVICE GROUPS */}

            <div
              className="
                flex
                flex-col
                gap-1
              "
            >
              {serviceGroups.map((group, index) => {
                const Icon = group.icon;

                const isActive = index === activeGroup;

                return (
                  <button
                    key={group.title}
                    type="button"
                    onMouseEnter={() => setActiveGroup(index)}
                    onFocus={() => setActiveGroup(index)}
                    onClick={() => setActiveGroup(index)}
                    className={`
                        flex
                        items-center

                        gap-3

                        rounded-[16px]

                        border

                        px-3
                        py-2.5

                        text-left

                        transition-colors
                        duration-100

                        ${
                          isActive
                            ? `
                              border-[var(--brand-gold)]/15
                              bg-[#F3E9DC]
                            `
                            : `
                              border-transparent
                              hover:bg-[#F7F0E7]
                            `
                        }
                      `}
                  >
                    <span
                      className={`
                          flex
                          h-9
                          w-9

                          shrink-0

                          items-center
                          justify-center

                          rounded-[11px]

                          ${
                            isActive
                              ? `
                                bg-[var(--brand-navy)]
                                text-[var(--brand-gold)]
                              `
                              : `
                                bg-[var(--brand-navy)]/[0.05]
                                text-[var(--brand-text-muted)]
                              `
                          }
                        `}
                    >
                      <Icon size={16} strokeWidth={1.5} />
                    </span>

                    <div className="min-w-0">
                      <div
                        className="
                            font-brand-display

                            text-[13px]
                            font-semibold
                            leading-tight

                            text-[var(--brand-navy)]
                          "
                      >
                        {group.title}
                      </div>

                      <div
                        className="
                            mt-0.5

                            font-brand-sans

                            text-[8px]
                            font-semibold

                            text-[var(--brand-text-muted)]
                          "
                      >
                        {group.subtitle}
                      </div>
                    </div>

                    <ChevronRight
                      size={13}
                      className={`
                          ml-auto

                          ${
                            isActive
                              ? `
                                text-[var(--brand-gold)]
                                opacity-100
                              `
                              : `
                                opacity-0
                              `
                          }
                        `}
                    />
                  </button>
                );
              })}
            </div>

            {/* ACTIVE SERVICE */}

            <div
              className="
                grid
                grid-cols-[1fr_210px]

                gap-5

                rounded-[20px]

                border
                border-[var(--brand-navy)]/[0.06]

                bg-white/45

                p-5
              "
            >
              <div>
                <div
                  className="
                    flex
                    items-start
                    justify-between

                    gap-4
                  "
                >
                  <div>
                    <span
                      className="
                        font-brand-sans

                        text-[7px]
                        font-bold
                        uppercase

                        tracking-[0.15em]

                        text-[var(--brand-gold-700)]
                      "
                    >
                      Explore Service
                    </span>

                    <h3
                      className="
                        mt-1.5

                        font-brand-display

                        text-[21px]
                        font-semibold

                        text-[var(--brand-navy)]
                      "
                    >
                      {active.title}
                    </h3>

                    <p
                      className="
                        mt-1

                        font-brand-sans

                        text-[9px]
                        font-medium

                        text-[var(--brand-text-muted)]
                      "
                    >
                      {active.subtitle}
                    </p>
                  </div>

                  <Link
                    href={active.href}
                    onClick={close}
                    prefetch={false}
                    className="
                      flex
                      items-center

                      gap-1.5

                      rounded-full

                      px-3
                      py-2

                      font-brand-sans

                      text-[8px]
                      font-bold
                      uppercase

                      tracking-[0.07em]

                      text-[var(--brand-gold-700)]

                      transition-colors
                      duration-150

                      hover:bg-[var(--brand-gold)]/[0.08]
                    "
                  >
                    View Service
                    <MoveRight size={11} />
                  </Link>
                </div>

                <div
                  className="
                    mt-4

                    grid
                    grid-cols-2

                    gap-x-3
                    gap-y-1
                  "
                >
                  {active.links.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      prefetch={false}
                      onClick={close}
                      className="
                          flex
                          min-h-[42px]

                          items-center
                          justify-between

                          rounded-[11px]

                          border
                          border-transparent

                          px-3

                          font-brand-sans

                          text-[11px]
                          font-medium

                          text-[var(--brand-text-muted)]

                          transition-colors
                          duration-150

                          hover:border-[var(--brand-navy)]/[0.05]
                          hover:bg-[#F6EFE6]
                          hover:text-[var(--brand-navy)]
                        "
                    >
                      <span>{link.label}</span>

                      <MoveRight
                        size={11}
                        className="
                            shrink-0
                            text-[var(--brand-gold)]
                          "
                      />
                    </Link>
                  ))}
                </div>
              </div>

              {/* IMAGE ALSO LINKS */}

              <Link
                href={active.href}
                onClick={close}
                prefetch={false}
                className="
                  relative

                  min-h-[205px]

                  overflow-hidden

                  rounded-[17px]

                  border
                  border-white/80

                  bg-[#EEE5D8]
                "
              >
                <Image
                  src={active.image}
                  alt={`${active.title} preview`}
                  fill
                  sizes="210px"
                  className="
                    object-cover
                    object-center
                  "
                />

                <div
                  aria-hidden
                  className="
                    absolute
                    inset-x-0
                    bottom-0

                    h-1/2

                    bg-gradient-to-t
                    from-[var(--brand-navy)]/35
                    to-transparent
                  "
                />

                <span
                  className="
                    absolute
                    bottom-3
                    left-3

                    font-brand-sans

                    text-[8px]
                    font-bold
                    uppercase

                    tracking-[0.1em]

                    text-white
                  "
                >
                  Explore
                </span>
              </Link>
            </div>
          </div>

          {/* BOTTOM */}

          <div
            className="
              mt-3

              flex
              items-center
              justify-between

              gap-5

              border-t
              border-[var(--brand-navy)]/[0.07]

              px-2
              pt-3
            "
          >
            <div
              className="
                flex
                items-center
                gap-3
              "
            >
              <span
                className="
                  flex
                  h-8
                  w-8

                  items-center
                  justify-center

                  rounded-[10px]

                  bg-[var(--brand-navy)]
                  text-[var(--brand-gold)]
                "
              >
                <Phone size={13} strokeWidth={1.5} />
              </span>

              <div>
                <p
                  className="
                    font-brand-sans

                    text-[9px]
                    font-bold

                    text-[var(--brand-navy)]
                  "
                >
                  Need help choosing?
                </p>

                <p
                  className="
                    mt-0.5

                    font-brand-sans

                    text-[8px]
                    font-medium

                    text-[var(--brand-text-muted)]
                  "
                >
                  Speak directly with our team.
                </p>
              </div>
            </div>

            <div
              className="
                flex
                items-center
                gap-2
              "
            >
              <ClayButton
                href="tel:+447400577844"
                variant="ivory"
                size="sm"
                startIcon={<Phone size={12} />}
              >
                Call Us
              </ClayButton>

              <ClayButton href="/contact-us" variant="gold" size="sm" showArrow>
                Start Your Project
              </ClayButton>
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
  pathname,
  mobileOpen,
  mobilePanel,
  setMobilePanel,
  activeServiceIdx,
  setActiveServiceIdx,
  close,
  openMenu,
  openServices,
}: {
  pathname: string;

  mobileOpen: boolean;

  mobilePanel: MobilePanel;

  setMobilePanel: Dispatch<SetStateAction<MobilePanel>>;

  activeServiceIdx: number;

  setActiveServiceIdx: Dispatch<SetStateAction<number>>;

  close: () => void;

  openMenu: () => void;

  openServices: () => void;
}) {
  const [islandTouched, setIslandTouched] = useState(false);
  return (
    /*
      VERY IMPORTANT:

      The wrapper itself cannot receive
      touches. Only actual children can.

      This prevents an invisible fixed layer
      from blocking links/content on mobile.
    */
    <div
      className="
        pointer-events-none

        fixed
        inset-x-0
        bottom-0

        z-[300]

        lg:hidden
      "
    >
      {/* ===============================================
          OPEN STATE
      ================================================ */}

      {mobileOpen && (
        <>
          {/* BACKDROP */}

          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={close}
            className="
              pointer-events-auto

              fixed
              inset-0

              z-[298]

              cursor-default

              touch-none

              bg-[rgba(7,18,30,0.48)]

              animate-fadeIn
            "
          />

          {/* PANEL */}

          <div
            className="
              pointer-events-auto

              fixed
              inset-x-0
              bottom-0

              z-[299]

              island-panel-enter
            "
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-label="Sofa N More navigation"
              className="
                island-panel

                mx-3
                mb-[82px]

                max-h-[calc(100dvh-112px)]

                overflow-hidden

                rounded-[25px]

                border
                border-white/70

                bg-[#FFFDF8]
              "
            >
              <div
                data-lenis-prevent
                className="
                  relative

                  overflow-y-auto
                  overscroll-contain

                  [-webkit-overflow-scrolling:touch]
                "
                style={{
                  maxHeight: "calc(100dvh - 130px)",
                }}
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
        </>
      )}

      {/* ===============================================
          ALWAYS VISIBLE ISLAND
      ================================================ */}

      <div
        className="
    pointer-events-auto

    island-safe-area

    relative
    z-[301]

    px-2.5
    pb-2
  "
      >
        {/* =====================================================
      DYNAMIC ISLAND SHELL

      Slightly grows while touched.
      No blur / no heavy animation.
  ====================================================== */}

        <div
          onTouchStart={() => setIslandTouched(true)}
          onTouchEnd={() => setIslandTouched(false)}
          onTouchCancel={() => setIslandTouched(false)}
          className={`
      island-bar
      clay-surface-soft

      mx-auto
      max-w-[430px]

      rounded-[24px]

      border
      border-white/70

      p-1.5

      transition-transform
      duration-150

      ease-[var(--ease-clay)]

      ${
        islandTouched
          ? `
            scale-[1.018]
          `
          : `
            scale-100
          `
      }
    `}
        >
          {/* ===================================================
        HORIZONTAL TAB TRACK

        Important:
        - never wraps
        - native finger scrolling
        - no visible scrollbar
        - smooth momentum on iOS
    ==================================================== */}

          <div
            className="
        flex
        w-full

        items-stretch

        gap-0.5

        overflow-x-auto
        overflow-y-hidden

        overscroll-x-contain

        scroll-smooth

        snap-x
        snap-proximity

        [-webkit-overflow-scrolling:touch]

        [scrollbar-width:none]

        [&::-webkit-scrollbar]:hidden
      "
          >
            {mobileTabs.map((tab) => {
              const serviceTab = tab.label === "Services";

              const menuTab = tab.label === "Menu";

              const active = menuTab
                ? mobileOpen && mobilePanel === "main"
                : serviceTab
                  ? pathname.startsWith("/services") ||
                    (mobileOpen &&
                      (mobilePanel === "services" ||
                        mobilePanel === "service-detail"))
                  : isPathActive(pathname, tab.href);

              if (menuTab) {
                return (
                  <IslandActionTab
                    key={tab.label}
                    label={
                      mobileOpen && mobilePanel === "main" ? "Close" : "Menu"
                    }
                    icon={mobileOpen && mobilePanel === "main" ? X : Menu}
                    active={active}
                    onClick={openMenu}
                    expanded={mobileOpen && mobilePanel === "main"}
                  />
                );
              }

              if (serviceTab) {
                return (
                  <IslandActionTab
                    key={tab.label}
                    label="Services"
                    icon={Layers}
                    active={active}
                    onClick={openServices}
                    expanded={
                      mobileOpen &&
                      (mobilePanel === "services" ||
                        mobilePanel === "service-detail")
                    }
                  />
                );
              }

              return (
                <IslandLinkTab
                  key={tab.label}
                  tab={tab}
                  active={active}
                  close={close}
                  mobileOpen={mobileOpen}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   REAL MOBILE LINK TAB
========================================================= */

function IslandLinkTab({
  tab,
  active,
  close,
  mobileOpen,
}: {
  tab: MobileTab;
  active: boolean;
  close: () => void;
  mobileOpen: boolean;
}) {
  const Icon = tab.icon;

  return (
    <Link
      href={tab.href}
      prefetch
      aria-label={tab.label}
      aria-current={active ? "page" : undefined}
      /*
        Only close manually when the user
        is already on the same destination.

        For a different route, let Next.js
        navigate first. The pathname effect
        closes the menu automatically.

        This avoids unmounting the Link
        before navigation.
      */
      onClick={active && mobileOpen ? close : undefined}
      className={`
        island-tab

        relative
  shrink-0
        flex
        min-h-[52px]
        
snap-center
        flex-col

        items-center
        justify-center

        gap-[1px]

        rounded-[14px]

        px-1
        py-1.5

        transition-transform
        duration-100

        active:scale-[0.95]

        ${active ? "island-tab-active" : ""}
      `}
    >
      {active && (
        <span
          aria-hidden
          className="
            absolute

            left-1/2
            top-[3px]

            h-[2px]
            w-[14px]

            -translate-x-1/2

            rounded-full

            bg-[var(--brand-gold)]
          "
        />
      )}

      <Icon
        size={18}
        strokeWidth={1.5}
        className={
          active
            ? `
              text-[var(--brand-gold)]
            `
            : `
              text-[var(--brand-navy)]/60
            `
        }
      />

      <span
        className={`
          max-w-full

          truncate

          font-brand-sans

          text-[6.5px]
          font-bold
          uppercase

          tracking-[0.035em]

          ${
            active
              ? `
                text-[var(--brand-gold-700)]
              `
              : `
                text-[var(--brand-text-muted)]
              `
          }
        `}
      >
        {tab.label}
      </span>
    </Link>
  );
}

/* =========================================================
   MENU / SERVICES ACTION TAB
========================================================= */

function IslandActionTab({
  label,
  icon: Icon,
  active,
  expanded,
  onClick,
}: {
  label: string;
  icon: LucideIcon;
  active: boolean;
  expanded: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-haspopup="dialog"
      aria-expanded={expanded}
      className={`
        island-tab

        relative

        flex
        min-h-[52px]
         shrink-0

  snap-center

        flex-col

        items-center
        justify-center

        gap-[1px]

        rounded-[14px]

        px-1
        py-1.5

        transition-transform
        duration-100

        active:scale-[0.95]

        ${active ? "island-tab-active" : ""}
      `}
    >
      {active && (
        <span
          aria-hidden
          className="
            absolute

            left-1/2
            top-[3px]

            h-[2px]
            w-[14px]

            -translate-x-1/2

            rounded-full

            bg-[var(--brand-gold)]
          "
        />
      )}

      <Icon
        size={18}
        strokeWidth={1.5}
        className={
          active
            ? `
              text-[var(--brand-gold)]
            `
            : `
              text-[var(--brand-navy)]/60
            `
        }
      />

      <span
        className={`
          max-w-full

          truncate

          font-brand-sans

          text-[6.5px]
          font-bold
          uppercase

          tracking-[0.035em]

          ${
            active
              ? `
                text-[var(--brand-gold-700)]
              `
              : `
                text-[var(--brand-text-muted)]
              `
          }
        `}
      >
        {label}
      </span>
    </button>
  );
}

/* =========================================================
   MOBILE MAIN MENU
========================================================= */

function IslandMainPanel({
  close,
  setMobilePanel,
}: {
  close: () => void;

  setMobilePanel: Dispatch<SetStateAction<MobilePanel>>;
}) {
  return (
    <div className="p-3">
      {/* HEADER */}

      <MobilePanelHeader title="Menu" close={close} />

      {/* LINKS */}

      <nav
        aria-label="Mobile navigation"
        className="
          overflow-hidden

          rounded-[17px]

          border
          border-[var(--brand-navy)]/[0.06]

          bg-[#F8F2EA]
        "
      >
        {navLinks.map((link, index) => (
          <IslandNavLink
            key={link.label}
            href={link.href}
            close={close}
            bordered={index > 0}
          >
            {link.label}
          </IslandNavLink>
        ))}
      </nav>

      {/* SERVICES */}

      <button
        type="button"
        onClick={() => setMobilePanel("services")}
        className="
          mt-2

          flex
          min-h-[58px]
          w-full

          items-center
          justify-between

          rounded-[17px]

          border
          border-[var(--brand-gold)]/15

          bg-[#F1E7DA]

          px-3.5

          text-left

          transition-transform
          duration-100

          active:scale-[0.985]
        "
      >
        <div
          className="
            flex
            items-center

            gap-3
          "
        >
          <span
            className="
              flex
              h-9
              w-9

              items-center
              justify-center

              rounded-[10px]

              bg-[var(--brand-navy)]

              text-[var(--brand-gold)]
            "
          >
            <Layers size={15} strokeWidth={1.5} />
          </span>

          <div>
            <span
              className="
                block

                font-brand-sans

                text-[12px]
                font-bold

                text-[var(--brand-navy)]
              "
            >
              Explore Services
            </span>

            <span
              className="
                mt-0.5
                block

                font-brand-sans

                text-[7.5px]
                font-semibold

                text-[var(--brand-text-muted)]
              "
            >
              Bespoke, commercial, interiors and restoration
            </span>
          </div>
        </div>

        <ChevronRight
          size={15}
          className="
            text-[var(--brand-gold)]
          "
        />
      </button>

      {/* CONTACT */}

      <div
        className="
          mt-3

          grid
          grid-cols-2

          gap-2
        "
      >
        <a
          href="tel:+447400577844"
          onClick={close}
          className="
            flex
            min-h-[42px]

            items-center
            justify-center

            gap-1.5

            rounded-[12px]

            border
            border-[var(--brand-navy)]/[0.06]

            bg-white/55

            font-brand-sans

            text-[8px]
            font-bold

            text-[var(--brand-navy)]
          "
        >
          <Phone
            size={11}
            className="
              text-[var(--brand-gold)]
            "
          />
          Call Us
        </a>

        <a
          href="mailto:info@sofanmore.co.uk"
          onClick={close}
          className="
            flex
            min-h-[42px]

            items-center
            justify-center

            gap-1.5

            rounded-[12px]

            border
            border-[var(--brand-navy)]/[0.06]

            bg-white/55

            font-brand-sans

            text-[8px]
            font-bold

            text-[var(--brand-navy)]
          "
        >
          <Mail
            size={11}
            className="
              text-[var(--brand-gold)]
            "
          />
          Email Us
        </a>
      </div>

      <div className="mt-2">
        <ClayButton
          href="/contact-us"
          variant="gold"
          size="sm"
          fullWidth
          showArrow
        >
          Start Your Project
        </ClayButton>
      </div>
    </div>
  );
}

/* =========================================================
   MOBILE SERVICES
========================================================= */

function IslandServicesPanel({
  setMobilePanel,
  setActiveServiceIdx,
  close,
}: {
  setMobilePanel: Dispatch<SetStateAction<MobilePanel>>;

  setActiveServiceIdx: Dispatch<SetStateAction<number>>;

  close: () => void;
}) {
  return (
    <div className="p-3">
      <PanelBackHeader
        title="Our Services"
        onBack={() => setMobilePanel("main")}
        close={close}
      />

      <div
        className="
          grid
          grid-cols-2

          gap-2
        "
      >
        {serviceGroups.map((group, index) => {
          const Icon = group.icon;

          return (
            <button
              key={group.title}
              type="button"
              onClick={() => {
                setActiveServiceIdx(index);

                setMobilePanel("service-detail");
              }}
              className="
                  flex
                  flex-col

                  rounded-[17px]

                  border
                  border-[var(--brand-navy)]/[0.06]

                  bg-[#F7F0E7]

                  p-2.5

                  text-left

                  transition-transform
                  duration-100

                  active:scale-[0.975]
                "
            >
              <div
                className="
                    relative

                    mb-2.5

                    h-[66px]

                    overflow-hidden

                    rounded-[12px]

                    bg-[#EDE4D7]
                  "
              >
                <Image
                  src={group.image}
                  alt={group.title}
                  fill
                  sizes="45vw"
                  className="
                      object-cover
                    "
                />
              </div>

              <span
                className="
                    flex
                    h-8
                    w-8

                    items-center
                    justify-center

                    rounded-[9px]

                    bg-[var(--brand-navy)]

                    text-[var(--brand-gold)]
                  "
              >
                <Icon size={14} strokeWidth={1.5} />
              </span>

              <div className="mt-2">
                <div
                  className="
                      font-brand-display

                      text-[11px]
                      font-semibold
                      leading-tight

                      text-[var(--brand-navy)]
                    "
                >
                  {group.title}
                </div>

                <div
                  className="
                      mt-1

                      font-brand-sans

                      text-[7px]
                      font-semibold

                      text-[var(--brand-text-muted)]
                    "
                >
                  {group.subtitle}
                </div>
              </div>

              <div
                className="
                    mt-2

                    flex
                    items-center

                    font-brand-sans

                    text-[6.5px]
                    font-bold
                    uppercase

                    tracking-[0.08em]

                    text-[var(--brand-gold-700)]
                  "
              >
                Explore
                <ChevronRight size={9} />
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-3">
        <ClayButton
          href="/services"
          variant="ivory"
          size="sm"
          fullWidth
          showArrow
        >
          View All Services
        </ClayButton>
      </div>

      <div className="mt-2">
        <ClayButton
          href="/contact-us"
          variant="gold"
          size="sm"
          fullWidth
          showArrow
        >
          Start Your Project
        </ClayButton>
      </div>
    </div>
  );
}

/* =========================================================
   SERVICE DETAIL
========================================================= */

function IslandServiceDetail({
  group,
  setMobilePanel,
  close,
}: {
  group: ServiceGroup;

  setMobilePanel: Dispatch<SetStateAction<MobilePanel>>;

  close: () => void;
}) {
  const Icon = group.icon;

  return (
    <div className="p-3">
      <PanelBackHeader
        title={group.title}
        onBack={() => setMobilePanel("services")}
        close={close}
      />

      {/* IMAGE */}

      <Link
        href={group.href}
        prefetch={false}
        className="
          relative

          mb-3

          block
          h-[125px]

          overflow-hidden

          rounded-[16px]

          bg-[#EDE4D7]
        "
      >
        <Image
          src={group.image}
          alt={group.title}
          fill
          sizes="90vw"
          className="
            object-cover
            object-center
          "
        />

        <div
          aria-hidden
          className="
            absolute
            inset-0

            bg-gradient-to-t

            from-[var(--brand-navy)]/45
            via-transparent
            to-transparent
          "
        />

        <div
          className="
            absolute
            bottom-3
            left-3

            flex
            items-center

            gap-2
          "
        >
          <span
            className="
              flex
              h-8
              w-8

              items-center
              justify-center

              rounded-[9px]

              bg-[var(--brand-gold)]

              text-[var(--brand-navy)]
            "
          >
            <Icon size={14} strokeWidth={1.6} />
          </span>

          <div>
            <div
              className="
                font-brand-sans

                text-[10px]
                font-bold

                text-white
              "
            >
              {group.title}
            </div>

            <div
              className="
                font-brand-sans

                text-[7px]
                font-semibold

                text-white/70
              "
            >
              {group.subtitle}
            </div>
          </div>
        </div>
      </Link>

      {/* LINKS */}

      <div
        className="
          overflow-hidden

          rounded-[16px]

          border
          border-[var(--brand-navy)]/[0.06]

          bg-[#F7F0E7]
        "
      >
        {group.links.map((link, index) => (
          <Link
            key={link.label}
            href={link.href}
            prefetch={false}
            onClick={() => {
              /*
                  Defer closing by one task so
                  Next Link processes the click
                  before the panel unmounts.
                */

              window.setTimeout(close, 0);
            }}
            className={`
                flex
                min-h-[47px]

                items-center
                justify-between

                px-3.5

                font-brand-sans

                text-[10.5px]
                font-semibold

                text-[var(--brand-navy)]

                ${
                  index
                    ? `
                      border-t
                      border-[var(--brand-navy)]/[0.06]
                    `
                    : ""
                }
              `}
          >
            {link.label}

            <MoveRight
              size={12}
              className="
                  shrink-0

                  text-[var(--brand-gold)]
                "
            />
          </Link>
        ))}
      </div>

      <div className="mt-3">
        <ClayButton
          href={group.href}
          variant="gold"
          size="sm"
          fullWidth
          showArrow
        >
          View All {group.title}
        </ClayButton>
      </div>
    </div>
  );
}

/* =========================================================
   MOBILE PANEL HEADER
========================================================= */

function MobilePanelHeader({
  title,
  close,
}: {
  title: string;
  close: () => void;
}) {
  return (
    <div
      className="
        mb-3

        flex
        items-center
        justify-between

        border-b
        border-[var(--brand-navy)]/[0.07]

        px-1
        pb-3
      "
    >
      <div
        className="
          flex
          items-center

          gap-2.5
        "
      >
        <span
          className="
            flex
            h-8
            w-8

            items-center
            justify-center

            rounded-[9px]

            bg-[var(--brand-navy)]

            text-[var(--brand-gold)]
          "
        >
          <Crown size={14} strokeWidth={1.5} />
        </span>

        <div>
          <span
            className="
              block

              font-brand-display

              text-[14px]
              font-semibold
              leading-tight

              text-[var(--brand-navy)]
            "
          >
            Sofa N More
          </span>

          <span
            className="
              mt-0.5
              block

              font-brand-sans

              text-[6px]
              font-bold
              uppercase

              tracking-[0.15em]

              text-[var(--brand-gold-700)]
            "
          >
            {title}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={close}
        aria-label="Close navigation"
        className="
          flex
          h-9
          w-9

          items-center
          justify-center

          rounded-[10px]

          bg-[var(--brand-navy)]/[0.06]

          text-[var(--brand-navy)]

          transition-transform
          duration-100

          active:scale-90
        "
      >
        <X size={16} strokeWidth={1.6} />
      </button>
    </div>
  );
}

/* =========================================================
   BACK HEADER
========================================================= */

function PanelBackHeader({
  title,
  onBack,
  close,
}: {
  title: string;
  onBack: () => void;
  close: () => void;
}) {
  return (
    <div
      className="
        mb-3

        flex
        items-center
        justify-between
      "
    >
      <div
        className="
          flex
          items-center
          gap-2
        "
      >
        <button
          type="button"
          onClick={onBack}
          aria-label="Go back"
          className="
            flex
            h-9
            w-9

            items-center
            justify-center

            rounded-[10px]

            border
            border-[var(--brand-navy)]/[0.07]

            bg-[#F3E9DC]

            text-[var(--brand-navy)]

            transition-transform
            duration-100

            active:scale-90
          "
        >
          <ChevronDown size={13} className="rotate-90" />
        </button>

        <span
          className="
            font-brand-display

            text-[14px]
            font-semibold

            text-[var(--brand-navy)]
          "
        >
          {title}
        </span>
      </div>

      <button
        type="button"
        onClick={close}
        aria-label="Close navigation"
        className="
          flex
          h-9
          w-9

          items-center
          justify-center

          rounded-[10px]

          bg-[var(--brand-navy)]/[0.06]

          text-[var(--brand-navy)]

          transition-transform
          duration-100

          active:scale-90
        "
      >
        <X size={15} />
      </button>
    </div>
  );
}

/* =========================================================
   MOBILE NAV LINK
========================================================= */

function IslandNavLink({
  href,
  children,
  close,
  bordered = false,
}: {
  href: string;
  children: ReactNode;
  close: () => void;
  bordered?: boolean;
}) {
  return (
    <Link
      href={href}
      prefetch={false}
      onClick={() => {
        /*
          Don't synchronously unmount
          the Link before Next handles
          its own click.
        */

        window.setTimeout(close, 0);
      }}
      className={`
        flex
        min-h-[47px]

        items-center
        justify-between

        px-3.5

        font-brand-sans

        text-[11px]
        font-bold

        text-[var(--brand-navy)]

        transition-colors
        duration-100

        active:bg-[#F1E7DA]

        ${
          bordered
            ? `
              border-t
              border-[var(--brand-navy)]/[0.06]
            `
            : ""
        }

        focus-visible:outline-2
        focus-visible:outline-[var(--brand-gold)]
      `}
    >
      <span>{children}</span>

      <ChevronRight
        size={12}
        className="
          text-[var(--brand-gold)]
        "
      />
    </Link>
  );
}
