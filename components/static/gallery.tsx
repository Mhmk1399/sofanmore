"use client";

import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type {
  MouseEvent as ReactMouseEvent,
  PointerEvent as ReactPointerEvent,
  ReactNode,
} from "react";
import ClayButton from "../ui/ClayButton";

/* =========================================================
   TYPES
========================================================= */

type GalleryCategory =
  | "All"
  | "Bespoke Furniture"
  | "Interiors"
  | "Restoration"
  | "Commercial";

type GalleryItem = {
  id: number;
  title: string;
  category: Exclude<GalleryCategory, "All">;
  image: string;
  alt: string;
};

/* =========================================================
   DATA
========================================================= */

const categories: GalleryCategory[] = [
  "All",
  "Bespoke Furniture",
  "Interiors",
  "Restoration",
  "Commercial",
];

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: "Mayfair Residence",
    category: "Bespoke Furniture",
    image: "/assets/images/1.webp",
    alt: "Luxury bespoke navy sofa in London interior",
  },
  {
    id: 2,
    title: "Chelsea Curved Sofa",
    category: "Interiors",
    image: "/assets/images/2.webp",
    alt: "Curved ivory bespoke sofa interior",
  },
  {
    id: 3,
    title: "Fine Upholstery Detail",
    category: "Restoration",
    image: "/assets/images/3.webp",
    alt: "Close-up upholstery craftsmanship",
  },
  {
    id: 4,
    title: "Blue Curve Collection",
    category: "Bespoke Furniture",
    image: "/assets/images/4.webp",
    alt: "Deep navy bespoke curved sofa",
  },
  {
    id: 5,
    title: "Hand Restoration",
    category: "Restoration",
    image: "/assets/images/5.webp",
    alt: "Furniture restoration craftsmanship",
  },
  {
    id: 6,
    title: "Dining Composition",
    category: "Interiors",
    image: "/assets/images/6.webp",
    alt: "Luxury bespoke dining interior",
  },
  {
    id: 7,
    title: "Kensington Living Room",
    category: "Interiors",
    image: "/assets/images/7.webp",
    alt: "Elegant London living room",
  },
  {
    id: 8,
    title: "Hospitality Lounge",
    category: "Commercial",
    image: "/assets/images/4.webp",
    alt: "Luxury hospitality interior",
  },
  {
    id: 9,
    title: "Executive Office",
    category: "Commercial",
    image: "/assets/images/2.webp",
    alt: "Executive office furniture",
  },
  {
    id: 10,
    title: "Premium Texture",
    category: "Restoration",
    image: "/assets/images/7.webp",
    alt: "Premium upholstery texture",
  },
  {
    id: 11,
    title: "Sculpted Armchair",
    category: "Bespoke Furniture",
    image: "/assets/images/3.webp",
    alt: "Luxury sculptural armchair",
  },
  {
    id: 12,
    title: "Belgravia Project",
    category: "Interiors",
    image: "/assets/images/6.webp",
    alt: "Completed luxury London interior",
  },
];

/* =========================================================
   ROOT
========================================================= */

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const filteredItems = useMemo(() => {
    if (activeCategory === "All") return galleryItems;
    return galleryItems.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const nextImage = useCallback(() => {
    setLightboxIndex((current) => {
      if (current === null) return null;
      return (current + 1) % filteredItems.length;
    });
  }, [filteredItems.length]);

  const previousImage = useCallback(() => {
    setLightboxIndex((current) => {
      if (current === null) return null;
      return (current - 1 + filteredItems.length) % filteredItems.length;
    });
  }, [filteredItems.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowRight") nextImage();
      if (event.key === "ArrowLeft") previousImage();
    }

    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxIndex, closeLightbox, nextImage, previousImage]);

  function handleCategoryChange(category: GalleryCategory) {
    if (category === activeCategory || isAnimating) return;
    setIsAnimating(true);
    setActiveCategory(category);
    setTimeout(() => setIsAnimating(false), 400);
  }

  return (
    <>
      <section
        id="gallery"
        aria-labelledby="gallery-heading"
        className="
          relative overflow-hidden bg-[var(--brand-ivory)]
          px-3 py-10 sm:px-5 sm:py-12 lg:px-8 lg:py-14
        "
      >
        <GalleryBackground />

        <div className="relative z-10 mx-auto max-w-[var(--site-width)]">
          <div className="clay-surface-strong rounded-[32px] p-[7px] lg:rounded-[40px] lg:p-[9px]">
            <div className="clay-inset rounded-[26px] p-4 sm:p-5 lg:rounded-[33px] lg:p-6">
              {/* DESKTOP */}
              <div className="hidden grid-cols-[245px_minmax(0,1fr)] gap-6 lg:grid xl:grid-cols-[265px_minmax(0,1fr)] xl:gap-7">
                <DesktopIntro />
                <div className="min-w-0">
                  <GalleryFilters
                    activeCategory={activeCategory}
                    onChange={handleCategoryChange}
                  />
                  <div
                    className={`transition-all duration-400 ${
                      isAnimating
                        ? "scale-[0.98] opacity-0"
                        : "scale-100 opacity-100"
                    }`}
                  >
                    <DesktopGallery
                      items={filteredItems}
                      onOpen={openLightbox}
                    />
                  </div>
                </div>
              </div>

              {/* MOBILE */}
              <div className="lg:hidden">
                <MobileIntro />
                <div className="mt-5">
                  <GalleryFilters
                    activeCategory={activeCategory}
                    onChange={handleCategoryChange}
                    mobile
                  />
                </div>
                <div
                  className={`transition-all duration-400 ${
                    isAnimating
                      ? "scale-[0.98] opacity-0"
                      : "scale-100 opacity-100"
                  }`}
                >
                  <MobileGallery items={filteredItems} onOpen={openLightbox} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <GalleryLightbox
          items={filteredItems}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onNext={nextImage}
          onPrevious={previousImage}
        />
      )}
    </>
  );
}

/* =========================================================
   DESKTOP INTRO
========================================================= */

function DesktopIntro() {
  return (
    <div className="relative flex h-full min-h-[470px] flex-col px-2 py-3">
      <div>
        <span className="font-brand-sans text-[9px] font-bold uppercase tracking-[0.27em] text-[var(--brand-gold-700)]">
          Our Work
        </span>

        <h2
          id="gallery-heading"
          className="mt-3 font-brand-display text-[38px] font-semibold leading-[0.98] tracking-[-0.035em] text-[var(--brand-navy)] xl:text-[43px]"
        >
          Crafted Spaces.
          <br />
          Made to Inspire
          <span className="text-[var(--brand-gold)]">.</span>
        </h2>

        <div className="mt-4 h-[2px] w-10 bg-[var(--brand-gold)]" />

        <p className="mt-5 max-w-[215px] font-brand-sans text-[11px] font-medium leading-[1.65] text-[var(--brand-text-muted)] xl:text-[12px]">
          Explore a selection of bespoke furniture, restored pieces and
          beautifully considered interiors crafted by Sofa N More.
        </p>

        <a
          href="/gallery"
          className="mt-5 inline-flex items-center gap-2 font-brand-sans text-[11px] font-bold text-[var(--brand-navy)] transition-colors hover:text-[var(--brand-gold-700)]"
        >
          View Full Gallery
          <ArrowRight
            size={13}
            strokeWidth={1.7}
            className="text-[var(--brand-gold)]"
          />
        </a>
      </div>

      <div aria-hidden className="absolute bottom-0 left-0 h-[190px] w-[185px]">
        <div className="clay-surface-soft absolute bottom-0 left-0 h-[150px] w-[140px] rounded-t-[50%] p-[7px]">
          <div className="clay-inset h-full rounded-t-[50%]" />
        </div>
        <div className="clay-sphere absolute bottom-[2px] left-[6px] h-[75px] w-[75px]">
          <div className="clay-sphere-shadow" />
          <div className="clay-sphere-ball" />
        </div>
        <div className="absolute bottom-3 left-[47px] h-[100px] w-[100px]">
          <div className="clay-sphere-ring" />
        </div>
        <div className="clay-sphere absolute bottom-[3px] left-[91px] h-[22px] w-[22px]">
          <div className="clay-sphere-ball clay-sphere-ball--gold" />
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   MOBILE INTRO
========================================================= */

function MobileIntro() {
  return (
    <div>
      <span className="font-brand-sans text-[8px] font-bold uppercase tracking-[0.26em] text-[var(--brand-gold-700)]">
        Our Work
      </span>

      <h2 className="mt-2.5 font-brand-display text-[34px] font-semibold leading-[0.98] tracking-[-0.035em] text-[var(--brand-navy)] min-[390px]:text-[37px]">
        Crafted Spaces.
        <br />
        Made to Inspire
        <span className="text-[var(--brand-gold)]">.</span>
      </h2>

      <div className="mt-3 h-[2px] w-9 bg-[var(--brand-gold)]" />

      <p className="mt-4 max-w-[310px] font-brand-sans text-[10px] font-medium leading-[1.6] text-[var(--brand-text-muted)]">
        Explore bespoke furniture, restored pieces and beautifully considered
        interiors crafted by Sofa N More.
      </p>

      <a
        href="/gallery"
        className="mt-4 inline-flex items-center gap-2 font-brand-sans text-[10px] font-bold text-[var(--brand-navy)]"
      >
        View Full Gallery
        <ArrowRight size={12} className="text-[var(--brand-gold)]" />
      </a>
    </div>
  );
}

/* =========================================================
   FILTERS
========================================================= */

function GalleryFilters({
  activeCategory,
  onChange,
  mobile = false,
}: {
  activeCategory: GalleryCategory;
  onChange: (category: GalleryCategory) => void;
  mobile?: boolean;
}) {
  return (
    <div
      className={
        mobile
          ? "-mx-1 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          : "mb-3 flex justify-end"
      }
    >
      <div
        className={`flex items-center gap-2 ${mobile ? "min-w-max px-1" : ""}`}
      >
        {categories.map((category) => {
          const active = category === activeCategory;
          return (
            <ClayButton
              key={category}
              ariaLabel={`Select ${category}`}
              size="sm"
              variant="ivory"
              type="button"
              onClick={() => onChange(category)}
              className={`
                whitespace-nowrap rounded-full font-brand-sans font-bold transition-all duration-300
                ${mobile ? "px-3 py-2 text-[8px]" : "px-4 py-2 text-[9px] xl:px-5"}
                ${
                  active
                    ? "clay-dark text-[var(--brand-gold-200)]"
                    : "clay-surface-strong text-[var(--brand-navy)] hover:-translate-y-[1px]"
                }
              `}
            >
              {category === "Bespoke Furniture"
                ? mobile
                  ? "Bespoke"
                  : "Bespoke Furniture"
                : category}
            </ClayButton>
          );
        })}
      </div>
    </div>
  );
}

/* =========================================================
   DESKTOP GALLERY
========================================================= */

function DesktopGallery({
  items,
  onOpen,
}: {
  items: GalleryItem[];
  onOpen: (index: number) => void;
}) {
  const mosaic = items.length >= 8;

  return (
    <div
      className={`
        grid min-w-0 gap-2.5
        ${
          mosaic
            ? "grid-cols-4 grid-flow-row-dense auto-rows-[105px] xl:auto-rows-[112px]"
            : "grid-cols-3 auto-rows-[145px]"
        }
      `}
    >
      {items.map((item, index) => (
        <GalleryTile
          key={item.id}
          item={item}
          index={index}
          onOpen={onOpen}
          className={
            mosaic ? getDesktopTileClass(index) : "col-span-1 row-span-1"
          }
          featured={activeMosaicFeature(index, mosaic)}
        />
      ))}
    </div>
  );
}

function getDesktopTileClass(index: number) {
  const positions = [
    "col-span-1 row-span-2",
    "col-span-2 row-span-1",
    "col-span-1 row-span-1",
    "col-span-2 row-span-1",
    "col-span-1 row-span-1",
    "col-span-1 row-span-1",
    "col-span-2 row-span-1",
    "col-span-1 row-span-1",
    "col-span-1 row-span-1",
    "col-span-1 row-span-1",
    "col-span-1 row-span-1",
    "col-span-1 row-span-1",
  ];
  return positions[index] ?? "col-span-1 row-span-1";
}

function activeMosaicFeature(index: number, mosaic: boolean) {
  return mosaic && index === 3;
}

/* =========================================================
   MOBILE GALLERY
========================================================= */

function MobileGallery({
  items,
  onOpen,
}: {
  items: GalleryItem[];
  onOpen: (index: number) => void;
}) {
  return (
    <div className="mt-3 grid grid-cols-2 auto-rows-[96px] gap-2 min-[390px]:auto-rows-[106px]">
      {items.map((item, index) => (
        <GalleryTile
          key={item.id}
          item={item}
          index={index}
          onOpen={onOpen}
          featured={index === 4}
          className={getMobileTileClass(index)}
        />
      ))}
    </div>
  );
}

function getMobileTileClass(index: number) {
  if (index === 4 || index === 9) return "col-span-2 row-span-1";
  return "col-span-1 row-span-1";
}

/* =========================================================
   SHARED TILE
========================================================= */

function GalleryTile({
  item,
  index,
  onOpen,
  className,
  featured = false,
}: {
  item: GalleryItem;
  index: number;
  onOpen: (index: number) => void;
  className: string;
  featured?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={`Open ${item.title}`}
      onClick={() => onOpen(index)}
      className={`
        clay-surface-strong group relative min-h-0 min-w-0 overflow-hidden
        rounded-[18px] p-[4px] text-left transition-transform duration-300
        hover:-translate-y-[2px] lg:rounded-[21px] lg:p-[5px]
        ${className}
      `}
    >
      <div className="clay-inset relative h-full w-full overflow-hidden rounded-[14px] lg:rounded-[17px]">
        <Image
          src={item.image}
          alt={item.alt}
          fill
          draggable={false}
          sizes="(max-width: 1023px) 50vw, 25vw"
          className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.045]"
        />

        <div
          className={`
            absolute inset-0 transition-opacity duration-400
            ${
              featured
                ? "bg-[linear-gradient(180deg,rgba(9,24,40,0.04)_25%,rgba(9,24,40,0.78)_100%)]"
                : "bg-[linear-gradient(180deg,transparent_45%,rgba(9,24,40,0.52)_100%)] opacity-0 group-hover:opacity-100"
            }
          `}
        />

        <div
          className={`
            absolute inset-x-0 bottom-0 z-10 p-3 transition-all duration-400
            ${
              featured
                ? "translate-y-0 opacity-100"
                : "translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
            }
          `}
        >
          <span className="font-brand-sans text-[7px] font-bold uppercase tracking-[0.17em] text-[var(--brand-gold)] lg:text-[8px]">
            {item.category}
          </span>

          <div className="mt-1 flex items-end justify-between gap-2">
            <h3 className="font-brand-display text-[13px] font-semibold leading-[1.05] text-white lg:text-[17px]">
              {item.title}
            </h3>

            <span className="clay-surface-strong hidden h-8 w-8 shrink-0 items-center justify-center rounded-full text-[var(--brand-navy)] lg:flex">
              <ArrowRight size={12} />
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}

/* =========================================================
   LIGHTBOX — Light & Smooth Animations
========================================================= */

function GalleryLightbox({
  items,
  currentIndex,
  onClose,
  onNext,
  onPrevious,
}: {
  items: GalleryItem[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  const pointerRef = useRef<{
    id: number;
    startX: number;
    currentX: number;
  } | null>(null);

  const current = items[currentIndex];
  const show = isVisible && !isClosing;

  /* ---------- Entry ---------- */
  useEffect(() => {
    // single rAF is enough — keeps it snappy
    requestAnimationFrame(() => setIsVisible(true));
  }, []);

  /* ---------- Reset loaded on slide change ---------- */
  useEffect(() => {
    setImageLoaded(false);
  }, [currentIndex]);

  /* ---------- Animated close ---------- */
  const handleClose = useCallback(() => {
    setIsClosing(true);
    setIsVisible(false);
    // shorter unmount wait → feels instant
    setTimeout(onClose, 200);
  }, [onClose]);

  /* ---------- Backdrop click ---------- */
  function handleBackdropClick(e: ReactMouseEvent<HTMLDivElement>) {
    if (e.target === backdropRef.current) handleClose();
  }

  /* ---------- Escape override for animated close ---------- */
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
      }
    }
    window.addEventListener("keydown", onKey, { capture: true });
    return () =>
      window.removeEventListener("keydown", onKey, { capture: true });
  }, [handleClose]);

  /* ===============================================
     SWIPE
  ================================================ */

  function handlePointerDown(e: ReactPointerEvent<HTMLDivElement>) {
    if ((e.target as HTMLElement).closest("[data-lightbox-control]")) return;
    if (e.pointerType === "mouse" && e.button !== 0) return;

    pointerRef.current = {
      id: e.pointerId,
      startX: e.clientX,
      currentX: e.clientX,
    };
    e.currentTarget.setPointerCapture(e.pointerId);

    if (e.pointerType !== "mouse") {
      imageContainerRef.current?.style.setProperty("transition", "none");
    }
  }

  function handlePointerMove(e: ReactPointerEvent<HTMLDivElement>) {
    const p = pointerRef.current;
    if (!p || p.id !== e.pointerId || e.pointerType === "mouse") return;

    p.currentX = e.clientX;
    const d = p.currentX - p.startX;
    const el = imageContainerRef.current;
    if (!el) return;

    const s = Math.max(0.97, 1 - Math.abs(d) / 2000);
    const o = Math.max(0.5, 1 - Math.abs(d) / 450);
    el.style.transform = `translate3d(${d}px,0,0) scale(${s})`;
    el.style.opacity = `${o}`;
  }

  function handlePointerEnd(e: ReactPointerEvent<HTMLDivElement>) {
    const p = pointerRef.current;
    if (!p) return;

    const d = e.clientX - p.startX;
    pointerRef.current = null;

    if (e.currentTarget.hasPointerCapture(e.pointerId))
      e.currentTarget.releasePointerCapture(e.pointerId);

    const el = imageContainerRef.current;
    if (!el) return;

    const snap =
      "transform 260ms cubic-bezier(.25,.46,.45,.94), opacity 180ms ease";
    el.style.transition = snap;

    if (Math.abs(d) > 55) {
      const dir = d < 0 ? -1 : 1;
      el.style.transform = `translate3d(${dir * -70}px,0,0) scale(.97)`;
      el.style.opacity = "0";

      setTimeout(() => {
        dir === -1 ? onNext() : onPrevious();

        el.style.transition = "none";
        el.style.transform = `translate3d(${dir * 50}px,0,0) scale(.98)`;
        el.style.opacity = "0";

        requestAnimationFrame(() => {
          el.style.transition =
            "transform 300ms cubic-bezier(.25,.46,.45,.94), opacity 220ms ease";
          el.style.transform = "translate3d(0,0,0) scale(1)";
          el.style.opacity = "1";
        });
      }, 140);
      return;
    }

    el.style.transform = "translate3d(0,0,0) scale(1)";
    el.style.opacity = "1";
  }

  /* ===============================================
     NAV ANIMATION (button clicks)
  ================================================ */

  function animateNav(direction: "next" | "prev") {
    const el = imageContainerRef.current;
    if (!el) {
      direction === "next" ? onNext() : onPrevious();
      return;
    }

    const dir = direction === "next" ? -1 : 1;

    el.style.transition =
      "transform 180ms cubic-bezier(.25,.46,.45,.94), opacity 120ms ease";
    el.style.transform = `translate3d(${dir * 40}px,0,0) scale(.98)`;
    el.style.opacity = "0.4";

    setTimeout(() => {
      direction === "next" ? onNext() : onPrevious();

      el.style.transition = "none";
      el.style.transform = `translate3d(${dir * -35}px,0,0) scale(.99)`;
      el.style.opacity = "0.4";

      requestAnimationFrame(() => {
        el.style.transition =
          "transform 280ms cubic-bezier(.25,.46,.45,.94), opacity 200ms ease";
        el.style.transform = "translate3d(0,0,0) scale(1)";
        el.style.opacity = "1";
      });
    }, 120);
  }

  /* ===============================================
     RENDER
  ================================================ */

  const lightbox = (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Gallery image viewer"
      ref={backdropRef}
      onClick={handleBackdropClick}
      className={`
        fixed inset-0 z-[1800] isolate flex flex-col items-center justify-center
        backdrop-blur-[12px]
        transition-[background-color] duration-200 ease-out
        ${show ? "bg-[rgba(5,12,20,0.90)]" : "bg-[rgba(5,12,20,0)]"}
      `}
    >
      {/* ===== TOP BAR ===== */}
      <div
        className={`
          pointer-events-none absolute left-0 right-0 top-0 z-[60]
          flex items-center justify-between
          px-4 py-3 sm:px-6 sm:py-4 lg:px-8 lg:py-5
          transition-all duration-200 ease-out
          ${show ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"}
        `}
      >
        {/* Left: title pill */}
        <div className="pointer-events-auto">
          <div className="clay-surface-strong flex items-center gap-2.5 rounded-full px-4 py-2 shadow-[0_6px_18px_rgba(0,0,0,0.25)]">
            <span className="font-brand-sans text-[8px] font-bold uppercase tracking-[0.14em] text-[var(--brand-gold)] sm:text-[9px]">
              {current.category}
            </span>
            <span className="h-3 w-px bg-[var(--brand-navy)]/15" />
            <span className="font-brand-display text-[12px] font-semibold text-[var(--brand-navy)] sm:text-[13px]">
              {current.title}
            </span>
          </div>
        </div>

        {/* Right: counter + close */}
        <div className="pointer-events-auto flex items-center gap-2">
          <div className="clay-inset hidden items-center justify-center rounded-full px-3.5 py-2 font-brand-sans text-[10px] font-bold text-[var(--brand-navy)] sm:flex">
            {String(currentIndex + 1).padStart(2, "0")} /{" "}
            {String(items.length).padStart(2, "0")}
          </div>

          <LightboxControlButton
            label="Close gallery"
            onClick={handleClose}
            size="md"
          >
            <X size={17} strokeWidth={1.8} />
          </LightboxControlButton>
        </div>
      </div>

      {/* ===== SIDE NAV — Desktop ===== */}
      <div
        className={`
          pointer-events-none absolute inset-y-0 left-0 z-[60]
          hidden items-center pl-5 lg:flex xl:pl-8
          transition-all duration-200 ease-out delay-[40ms]
          ${show ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"}
        `}
      >
        <LightboxControlButton
          label="Previous image"
          onClick={() => animateNav("prev")}
          size="lg"
          className="pointer-events-auto"
        >
          <ChevronLeft size={22} strokeWidth={1.5} />
        </LightboxControlButton>
      </div>

      <div
        className={`
          pointer-events-none absolute inset-y-0 right-0 z-[60]
          hidden items-center pr-5 lg:flex xl:pr-8
          transition-all duration-200 ease-out delay-[40ms]
          ${show ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"}
        `}
      >
        <LightboxControlButton
          label="Next image"
          onClick={() => animateNav("next")}
          size="lg"
          className="pointer-events-auto"
        >
          <ChevronRight size={22} strokeWidth={1.5} />
        </LightboxControlButton>
      </div>

      {/* ===== IMAGE ===== */}
      <div
        ref={imageContainerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        className={`
          relative
          w-[min(92vw,430px)] md:w-[min(86vw,720px)]
          lg:w-[min(76vw,1000px)] xl:w-[min(72vw,1100px)]
          touch-pan-y select-none will-change-transform
          transition-all duration-[220ms] ease-out
          ${show ? "scale-100 opacity-100 translate-y-0" : "scale-[0.97] opacity-0 translate-y-2"}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="clay-surface-strong relative overflow-hidden rounded-[20px] p-[5px] shadow-[0_16px_48px_rgba(0,0,0,0.35),0_6px_18px_rgba(0,0,0,0.18)] sm:rounded-[24px] sm:p-[6px] lg:rounded-[28px] lg:p-[7px]">
          <div className="clay-inset relative overflow-hidden rounded-[16px] sm:rounded-[20px] lg:rounded-[23px]">
            <div
              className="relative w-full overflow-hidden rounded-[14px] sm:rounded-[18px] lg:rounded-[21px]"
              style={{ aspectRatio: "16 / 10" }}
            >
              <Image
                key={current.id}
                src={current.image}
                alt={current.alt}
                fill
                priority
                draggable={false}
                sizes="100vw"
                onLoad={() => setImageLoaded(true)}
                className={`
                  pointer-events-none object-cover object-center
                  transition-opacity duration-300
                  ${imageLoaded ? "opacity-100" : "opacity-0"}
                `}
              />

              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-[var(--brand-ivory)]">
                  <div className="h-7 w-7 animate-spin rounded-full border-2 border-[var(--brand-gold)]/20 border-t-[var(--brand-gold)]" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ===== BOTTOM BAR — Mobile ===== */}
      <div
        className={`
          pointer-events-none absolute bottom-0 left-0 right-0 z-[60]
          flex items-center justify-center px-4 pb-4 pt-3 lg:hidden
          transition-all duration-200 ease-out delay-[50ms]
          ${show ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="clay-surface-strong pointer-events-auto flex items-center gap-1.5 rounded-full p-[4px] shadow-[0_8px_28px_rgba(0,0,0,0.3)]">
          <LightboxControlButton
            label="Previous image"
            onClick={() => animateNav("prev")}
            size="md"
          >
            <ChevronLeft size={17} strokeWidth={1.6} />
          </LightboxControlButton>

          <div
            aria-live="polite"
            className="clay-inset flex h-10 min-w-[68px] items-center justify-center rounded-full px-3.5 font-brand-sans text-[10px] font-bold tracking-wide text-[var(--brand-navy)]"
          >
            {String(currentIndex + 1).padStart(2, "0")} /{" "}
            {String(items.length).padStart(2, "0")}
          </div>

          <LightboxControlButton
            label="Next image"
            onClick={() => animateNav("next")}
            size="md"
          >
            <ChevronRight size={17} strokeWidth={1.6} />
          </LightboxControlButton>
        </div>
      </div>
    </div>
  );

  return createPortal(lightbox, document.body);
}

/* =========================================================
   LIGHTBOX CONTROL BUTTON
========================================================= */

function LightboxControlButton({
  label,
  onClick,
  children,
  size = "md",
  className = "",
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizeMap = { sm: "h-9 w-9", md: "h-11 w-11", lg: "h-14 w-14" };

  return (
    <button
      data-lightbox-control
      type="button"
      aria-label={label}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onPointerDown={(e) => e.stopPropagation()}
      className={`
        clay-surface-strong flex items-center justify-center rounded-full
        text-[var(--brand-navy)]
        shadow-[0_8px_22px_rgba(0,0,0,0.18),inset_2px_2px_4px_rgba(255,255,255,0.6),inset_-2px_-2px_5px_rgba(94,65,31,0.07)]
        transition-transform duration-150 ease-out
        hover:scale-[1.06]
        active:scale-[0.96]
        focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-gold)]
        ${sizeMap[size]}
        ${className}
      `}
    >
      {children}
    </button>
  );
}

/* =========================================================
   BACKGROUND
========================================================= */

function GalleryBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#fffdf8_0%,var(--brand-ivory)_62%,#efe5d7_100%)]" />
      <div className="clay-sphere absolute -right-[42px] top-[34%] hidden h-[110px] w-[110px] lg:block">
        <div className="clay-sphere-shadow" />
        <div className="clay-sphere-ball" />
      </div>
    </div>
  );
}
