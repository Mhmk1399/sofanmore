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
  | "Bespoke sofa"
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
  "Bespoke sofa",
  "Interiors",
  "Restoration",
  "Commercial",
];

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: "Mayfair Residence",
    category: "Bespoke sofa",
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
    category: "Bespoke sofa",
    image: "/assets/images/4.webp",
    alt: "Deep navy bespoke curved sofa",
  },
  {
    id: 5,
    title: "Hand Restoration",
    category: "Restoration",
    image: "/assets/images/5.webp",
    alt: "Sofa restoration craftsmanship",
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
    alt: "Executive office sofa",
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
    category: "Bespoke sofa",
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

  const filteredItems = useMemo(() => {
    if (activeCategory === "All") {
      return galleryItems;
    }

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
      if (current === null || filteredItems.length === 0) {
        return null;
      }

      return (current + 1) % filteredItems.length;
    });
  }, [filteredItems.length]);

  const previousImage = useCallback(() => {
    setLightboxIndex((current) => {
      if (current === null || filteredItems.length === 0) {
        return null;
      }

      return (current - 1 + filteredItems.length) % filteredItems.length;
    });
  }, [filteredItems.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeLightbox();
      }

      if (event.key === "ArrowRight") {
        nextImage();
      }

      if (event.key === "ArrowLeft") {
        previousImage();
      }
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;

      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxIndex, closeLightbox, nextImage, previousImage]);

  function handleCategoryChange(category: GalleryCategory) {
    setActiveCategory(category);
    setLightboxIndex(null);
  }

  return (
    <>
      <section
        id="gallery"
        aria-label="Sofa N More gallery"
        className="
          bg-[var(--brand-ivory)]
          px-3
          py-9

          sm:px-5
          sm:py-11

          lg:px-8
          lg:py-14
        "
      >
        <div className="mx-auto max-w-[var(--site-width)]">
          {/* ===============================================
              ONE CLAY SHELL ONLY
          ================================================ */}

          <div
            className="
              clay-surface-soft

              rounded-[28px]

              p-4

              sm:rounded-[32px]
              sm:p-5

              lg:rounded-[36px]
              lg:p-6
            "
          >
            {/* ===============================================
                HEADER
            ================================================ */}

            <GalleryHeader />

            {/* ===============================================
                FILTERS
            ================================================ */}

            <div className="mt-6">
              <GalleryFilters
                activeCategory={activeCategory}
                onChange={handleCategoryChange}
              />
            </div>

            {/* ===============================================
                GRID
            ================================================ */}

            <GalleryGrid items={filteredItems} onOpen={openLightbox} />
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
   HEADER
========================================================= */

function GalleryHeader() {
  return (
    <header
      className="
        flex
        flex-col
        gap-5

        lg:flex-row
        lg:items-end
        lg:justify-between
        lg:gap-10
      "
    >
      <div>
        <span
          className="
            font-brand-sans

            text-[8px]
            font-bold
            uppercase

            tracking-[0.24em]

            text-[var(--brand-gold-700)]

            sm:text-[9px]
          "
        >
          Our Work
        </span>

        <h2
          className="
            mt-2.5

            font-brand-display

            text-[34px]
            font-semibold
            leading-[0.98]

            tracking-[-0.035em]

            text-[var(--brand-navy)]

            sm:text-[40px]

            lg:text-[46px]
          "
        >
          Crafted Spaces.
          <br />
          Made to Inspire
          <span className="text-[var(--brand-gold)]">.</span>
        </h2>
      </div>

      <div
        className="
          max-w-[480px]

          lg:text-right
        "
      >
        <p
          className="
            font-brand-sans

            text-[11px]
            font-medium
            leading-[1.7]

            text-[var(--brand-text-muted)]

            sm:text-[12px]
          "
        >
          Explore bespoke sofas, restored pieces and considered interiors
          created by Sofa N More.
        </p>

      
      </div>
    </header>
  );
}

/* =========================================================
   FILTERS
========================================================= */

function GalleryFilters({
  activeCategory,
  onChange,
}: {
  activeCategory: GalleryCategory;
  onChange: (category: GalleryCategory) => void;
}) {
  return (
    <div
      className="
        -mx-1
        overflow-x-auto

        pb-1

        [scrollbar-width:none]

        [&::-webkit-scrollbar]:hidden
      "
    >
      <div
        className="
          flex
          min-w-max
          items-center
          gap-2

          px-1
        "
      >
        {categories.map((category) => {
          const active = activeCategory === category;

          return (
            <ClayButton
              key={category}
              type="button"
              size="sm"
              variant={active ? "navy" : "ivory"}
              onClick={() => onChange(category)}
              ariaLabel={`Show ${category} projects`}
              className="
                whitespace-nowrap
                !shadow-none
              "
            >
              {category}
            </ClayButton>
          );
        })}
      </div>
    </div>
  );
}

/* =========================================================
   GRID
========================================================= */

function GalleryGrid({
  items,
  onOpen,
}: {
  items: GalleryItem[];
  onOpen: (index: number) => void;
}) {
  return (
    <div
      className="
        mt-5

        grid
        grid-cols-2
        gap-2.5

        md:grid-cols-3

        lg:grid-cols-4
        lg:gap-3
      "
    >
      {items.map((item, index) => (
        <GalleryTile key={item.id} item={item} index={index} onOpen={onOpen} />
      ))}
    </div>
  );
}

/* =========================================================
   TILE
========================================================= */

function GalleryTile({
  item,
  index,
  onOpen,
}: {
  item: GalleryItem;
  index: number;
  onOpen: (index: number) => void;
}) {
  return (
    <button
      type="button"
      aria-label={`Open ${item.title}`}
      onClick={() => onOpen(index)}
      className="
        group

        relative
        overflow-hidden

        rounded-[18px]

        border
        border-white/55

        bg-[var(--brand-ivory-50)]

        p-[4px]

        text-left

        shadow-[0_7px_18px_rgba(70,50,30,0.07)]

        transition-transform
        duration-200

        hover:-translate-y-[1px]

        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-[var(--brand-gold)]
        focus-visible:ring-offset-2

        sm:rounded-[20px]
      "
    >
      <div
        className="
          relative

          aspect-[4/3]

          overflow-hidden

          rounded-[14px]

          bg-[#E8E0D4]

          sm:rounded-[16px]
        "
      >
        <Image
          src={item.image}
          alt={item.alt}
          fill
          draggable={false}
          sizes="
            (max-width: 767px) 50vw,
            (max-width: 1023px) 33vw,
            25vw
          "
          className="
            object-cover
            object-center

            transition-transform
            duration-500
            ease-out

            group-hover:scale-[1.025]
          "
        />

        {/* single, lightweight overlay */}

        <div
          className="
            absolute
            inset-0

            bg-[linear-gradient(180deg,transparent_55%,rgba(8,20,35,0.58)_100%)]
          "
        />

        <div
          className="
            absolute
            inset-x-0
            bottom-0

            p-3
          "
        >
          <span
            className="
              font-brand-sans

              text-[6px]
              font-bold
              uppercase

              tracking-[0.15em]

              text-[var(--brand-gold)]

              sm:text-[7px]
            "
          >
            {item.category}
          </span>

          <h3
            className="
              mt-0.5

              font-brand-display

              text-[13px]
              font-semibold
              leading-[1.1]

              text-white

              sm:text-[15px]
            "
          >
            {item.title}
          </h3>
        </div>
      </div>
    </button>
  );
}

/* =========================================================
   LIGHTBOX
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
  const [visible, setVisible] = useState(false);

  const imageRef = useRef<HTMLDivElement>(null);

  const backdropRef = useRef<HTMLDivElement>(null);

  const pointerRef = useRef<{
    id: number;
    startX: number;
  } | null>(null);

  const current = items[currentIndex];

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setVisible(true);
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  const close = useCallback(() => {
    setVisible(false);

    window.setTimeout(() => {
      onClose();
    }, 160);
  }, [onClose]);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
      }
    }

    window.addEventListener("keydown", handleEscape, { capture: true });

    return () => {
      window.removeEventListener("keydown", handleEscape, { capture: true });
    };
  }, [close]);

  function handleBackdropClick(event: ReactMouseEvent<HTMLDivElement>) {
    if (event.target === backdropRef.current) {
      close();
    }
  }

  /* =======================================================
     SIMPLE SWIPE
  ======================================================= */

  function handlePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if ((event.target as HTMLElement).closest("[data-lightbox-control]")) {
      return;
    }

    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }

    pointerRef.current = {
      id: event.pointerId,
      startX: event.clientX,
    };

    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerUp(event: ReactPointerEvent<HTMLDivElement>) {
    const pointer = pointerRef.current;

    if (!pointer || pointer.id !== event.pointerId) {
      return;
    }

    const delta = event.clientX - pointer.startX;

    pointerRef.current = null;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    if (delta < -55) {
      onNext();
    }

    if (delta > 55) {
      onPrevious();
    }
  }

  const lightbox = (
    <div
      ref={backdropRef}
      data-lenis-prevent
      role="dialog"
      aria-modal="true"
      aria-label="Gallery image viewer"
      onClick={handleBackdropClick}
      className={`
        fixed
        inset-0
        z-[1800]

        flex
        items-center
        justify-center

        bg-[rgba(7,15,25,0.86)]

        px-3
        py-16

        transition-opacity
        duration-150

        ${visible ? "opacity-100" : "opacity-0"}
      `}
    >
      {/* ===============================================
          TOP INFO
      ================================================ */}

      <div
        className="
          absolute
          left-4
          right-4
          top-4

          z-20

          flex
          items-start
          justify-between

          gap-4

          sm:left-6
          sm:right-6
          sm:top-5
        "
      >
        <div>
          <span
            className="
              font-brand-sans

              text-[7px]
              font-bold
              uppercase

              tracking-[0.16em]

              text-[var(--brand-gold)]
            "
          >
            {current.category}
          </span>

          <h3
            className="
              mt-1

              font-brand-display

              text-[17px]
              font-semibold

              text-white

              sm:text-[20px]
            "
          >
            {current.title}
          </h3>
        </div>

        <LightboxControlButton label="Close gallery" onClick={close}>
          <X size={17} strokeWidth={1.7} />
        </LightboxControlButton>
      </div>

      {/* ===============================================
          IMAGE
      ================================================ */}

      <div
        ref={imageRef}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => {
          pointerRef.current = null;
        }}
        onClick={(event) => event.stopPropagation()}
        className={`
          relative

          w-full
          max-w-[1100px]

          select-none
          touch-pan-y

          transition-[opacity,transform]
          duration-200
          ease-out

          ${visible ? "scale-100 opacity-100" : "scale-[0.985] opacity-0"}
        `}
      >
        {/* one lightweight clay frame */}

        <div
          className="
            rounded-[22px]

            border
            border-white/45

            bg-[#F4EDE3]

            p-[5px]

            shadow-[0_12px_34px_rgba(0,0,0,0.18)]

            sm:rounded-[26px]
            sm:p-[6px]
          "
        >
          <div
            className="
              relative

              aspect-[16/10]

              overflow-hidden

              rounded-[17px]

              bg-[#DED5C8]

              sm:rounded-[21px]
            "
          >
            <Image
              key={current.id}
              src={current.image}
              alt={current.alt}
              fill
              priority
              draggable={false}
              sizes="100vw"
              className="
                pointer-events-none

                object-contain
                object-center
              "
            />
          </div>
        </div>
      </div>

      {/* ===============================================
          DESKTOP NAV
      ================================================ */}

      <div
        className="
          pointer-events-none

          absolute
          inset-x-5
          top-1/2

          hidden

          -translate-y-1/2

          items-center
          justify-between

          lg:flex
        "
      >
        <LightboxControlButton
          label="Previous image"
          onClick={onPrevious}
          className="pointer-events-auto"
        >
          <ChevronLeft size={21} strokeWidth={1.5} />
        </LightboxControlButton>

        <LightboxControlButton
          label="Next image"
          onClick={onNext}
          className="pointer-events-auto"
        >
          <ChevronRight size={21} strokeWidth={1.5} />
        </LightboxControlButton>
      </div>

      {/* ===============================================
          MOBILE NAV + COUNTER
      ================================================ */}

      <div
        className="
          absolute
          bottom-4
          left-1/2

          z-20

          flex
          -translate-x-1/2

          items-center
          gap-3

          lg:hidden
        "
      >
        <LightboxControlButton label="Previous image" onClick={onPrevious}>
          <ChevronLeft size={17} strokeWidth={1.6} />
        </LightboxControlButton>

        <span
          aria-live="polite"
          className="
            min-w-[64px]

            text-center

            font-brand-sans

            text-[10px]
            font-bold

            text-white/70
          "
        >
          {String(currentIndex + 1).padStart(2, "0")}
          {" / "}
          {String(items.length).padStart(2, "0")}
        </span>

        <LightboxControlButton label="Next image" onClick={onNext}>
          <ChevronRight size={17} strokeWidth={1.6} />
        </LightboxControlButton>
      </div>

      {/* desktop counter */}

      <div
        className="
          absolute
          bottom-5
          left-1/2

          hidden
          -translate-x-1/2

          font-brand-sans

          text-[10px]
          font-bold
          tracking-[0.08em]

          text-white/55

          lg:block
        "
      >
        {String(currentIndex + 1).padStart(2, "0")}
        {" / "}
        {String(items.length).padStart(2, "0")}
      </div>
    </div>
  );

  return createPortal(lightbox, document.body);
}

/* =========================================================
   LIGHTBOX CONTROL
========================================================= */

function LightboxControlButton({
  label,
  onClick,
  children,
  className = "",
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
  className?: string;
}) {
  return (
    <button
      data-lightbox-control
      type="button"
      aria-label={label}
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
      onPointerDown={(event) => event.stopPropagation()}
      className={`
        flex
        h-10
        w-10

        items-center
        justify-center

        rounded-full

        border
        border-white/20

        bg-[rgba(245,242,234,0.92)]

        text-[var(--brand-navy)]

        shadow-[0_5px_14px_rgba(0,0,0,0.12)]

        transition-transform
        duration-150

        hover:scale-[1.04]
        active:scale-[0.96]

        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-[var(--brand-gold)]

        ${className}
      `}
    >
      {children}
    </button>
  );
}
