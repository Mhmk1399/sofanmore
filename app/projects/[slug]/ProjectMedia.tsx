"use client";

import Image from "next/image";

import { ArrowLeft, ArrowRight, Expand, X } from "lucide-react";

import { createPortal } from "react-dom";

import { useCallback, useEffect, useRef, useState } from "react";

/* =========================================================
   TYPE
========================================================= */

export type ProjectMediaItem = {
  id: string;

  url: string;

  alt: string;

  label?: string;
};

/* =========================================================
   HERO MEDIA
========================================================= */

export function ProjectHeroMedia({
  images,
  projectTitle,
}: {
  images: ProjectMediaItem[];

  projectTitle: string;
}) {
  const [open, setOpen] = useState(false);

  const triggerRef = useRef<HTMLButtonElement>(null);

  if (!images.length) {
    return null;
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Open ${projectTitle} image full screen`}
        className="
          group

          relative

          block
          w-full

          rounded-[28px]

          border
          border-white/80

          bg-[#EADFD2]

          p-[6px]

          text-left

          shadow-[0_16px_36px_rgba(75,53,31,0.10),inset_1px_1px_2px_rgba(255,255,255,0.88),inset_-1px_-1px_2px_rgba(88,61,34,0.05)]

          sm:rounded-[34px]
          sm:p-[7px]

          lg:rounded-[38px]
        "
      >
        <span
          className="
            relative

            block

            aspect-[5/4]

            overflow-hidden

            rounded-[23px]

            bg-[#DDD2C4]

            shadow-[inset_2px_2px_5px_rgba(61,43,26,0.07),inset_-2px_-2px_5px_rgba(255,255,255,0.55)]

            sm:rounded-[28px]
          "
        >
          <Image
            src={images[0].url}
            alt={images[0].alt}
            fill
            priority
            draggable={false}
            sizes="(max-width: 1023px) 94vw, 54vw"
            className="
              object-cover

              transition-transform
              duration-500
              ease-out

              lg:group-hover:scale-[1.015]
            "
          />

          {/* CHEAP GRADIENT */}

          <span
            aria-hidden
            className="
              absolute
              inset-0

              bg-gradient-to-t

              from-[#091725]/35

              via-transparent

              to-transparent
            "
          />

          {/* OPEN CONTROL */}

          <span
            className="
              absolute

              bottom-3
              right-3

              flex
              items-center

              gap-2

              rounded-[14px]

              border
              border-white/75

              bg-[#F2E8DB]

              px-3
              py-2

              font-brand-sans

              text-[8px]
              font-bold
              uppercase

              tracking-[0.1em]

              text-[var(--brand-navy)]

              shadow-[0_5px_12px_rgba(0,0,0,0.13),inset_1px_1px_1px_rgba(255,255,255,0.85)]

              sm:bottom-4
              sm:right-4
            "
          >
            <Expand
              size={12}
              strokeWidth={1.6}
              className="
                text-[var(--brand-gold-700)]
              "
            />
            View Full Image
          </span>
        </span>
      </button>

      {open && (
        <ProjectLightbox
          images={images}
          initialIndex={0}
          projectTitle={projectTitle}
          onClose={() => setOpen(false)}
          returnFocusRef={triggerRef}
        />
      )}
    </>
  );
}

/* =========================================================
   PROJECT GALLERY
========================================================= */

export function ProjectGallery({
  images,
  projectTitle,
}: {
  images: ProjectMediaItem[];

  projectTitle: string;
}) {
  /*
    Index zero is cover image.
    Gallery begins at index one.
  */

  const gallery = images.slice(1);

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const triggerRefs = useRef<Map<number, HTMLButtonElement>>(new Map());

  if (!gallery.length) {
    return null;
  }

  return (
    <>
      <div
        className="
          grid

          gap-3

          sm:grid-cols-2

          lg:grid-cols-12
          lg:auto-rows-[260px]
        "
      >
        {gallery.map((image, galleryIndex) => {
          /*
              +1 because global index 0
              is the cover image.
            */

          const imageIndex = galleryIndex + 1;

          return (
            <GalleryTile
              key={image.id}
              image={image}
              index={galleryIndex}
              buttonRef={(node) => {
                if (node) {
                  triggerRefs.current.set(imageIndex, node);
                } else {
                  triggerRefs.current.delete(imageIndex);
                }
              }}
              onOpen={() => setOpenIndex(imageIndex)}
            />
          );
        })}
      </div>

      {openIndex !== null && (
        <ProjectLightbox
          images={images}
          initialIndex={openIndex}
          projectTitle={projectTitle}
          onClose={() => setOpenIndex(null)}
          returnFocusRef={{
            current: triggerRefs.current.get(openIndex) ?? null,
          }}
        />
      )}
    </>
  );
}

/* =========================================================
   GALLERY TILE
========================================================= */

function GalleryTile({
  image,
  index,
  onOpen,
  buttonRef,
}: {
  image: ProjectMediaItem;

  index: number;

  onOpen: () => void;

  buttonRef: (node: HTMLButtonElement | null) => void;
}) {
  const layoutClass = getGalleryLayout(index);

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={onOpen}
      aria-label={`Open ${image.alt} full screen`}
      className={`
        group

        relative

        min-h-[270px]

        overflow-hidden

        rounded-[22px]

        border
        border-white/80

        bg-[#E9DED0]

        p-[5px]

        text-left

        shadow-[0_8px_20px_rgba(77,55,32,0.075),inset_1px_1px_1px_rgba(255,255,255,0.85)]

        sm:min-h-[300px]

        lg:min-h-0

        ${layoutClass}
      `}
    >
      <span
        className="
          relative

          block
          h-full
          min-h-[260px]
          w-full

          overflow-hidden

          rounded-[17px]

          bg-[#DDD2C5]

          lg:min-h-0
        "
      >
        <Image
          src={image.url}
          alt={image.alt}
          fill
          draggable={false}
          sizes="(max-width: 639px) 94vw, (max-width: 1023px) 46vw, 55vw"
          className="
            object-cover

            transition-transform
            duration-500
            ease-out

            lg:group-hover:scale-[1.018]
          "
        />

        <span
          aria-hidden
          className="
            absolute
            inset-0

            bg-gradient-to-t

            from-[#091725]/40

            via-transparent

            to-transparent

            opacity-70

            transition-opacity

            lg:group-hover:opacity-100
          "
        />

        {/* NUMBER */}

        <span
          className="
            absolute

            left-3
            top-3

            rounded-full

            border
            border-white/20

            bg-[#0B1929]/65

            px-2.5
            py-1.5

            font-brand-sans

            text-[7px]
            font-bold

            tracking-[0.1em]

            text-white/75
          "
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* EXPAND */}

        <span
          className="
            absolute

            bottom-3
            right-3

            flex
            h-9
            w-9

            items-center
            justify-center

            rounded-[12px]

            border
            border-white/75

            bg-[#F2E8DB]

            text-[var(--brand-navy)]

            shadow-[0_4px_10px_rgba(0,0,0,0.13),inset_1px_1px_1px_rgba(255,255,255,0.85)]
          "
        >
          <Expand size={14} strokeWidth={1.6} />
        </span>
      </span>
    </button>
  );
}

/* =========================================================
   GALLERY LAYOUT
========================================================= */

function getGalleryLayout(index: number) {
  const position = index % 5;

  if (position === 0) {
    return `
      lg:col-span-7
      lg:row-span-2
    `;
  }

  if (position === 1 || position === 2) {
    return `
      lg:col-span-5
      lg:row-span-1
    `;
  }

  return `
    lg:col-span-6
    lg:row-span-1
  `;
}

/* =========================================================
   LIGHTBOX
========================================================= */

function ProjectLightbox({
  images,
  initialIndex,
  projectTitle,
  onClose,
  returnFocusRef,
}: {
  images: ProjectMediaItem[];

  initialIndex: number;

  projectTitle: string;

  onClose: () => void;

  returnFocusRef: {
    current: HTMLButtonElement | null;
  };
}) {
  const [index, setIndex] = useState(initialIndex);

  const closeRef = useRef<HTMLButtonElement>(null);

  const current = images[index];

  /* =======================================================
     PREVIOUS
  ======================================================= */

  const previous = useCallback(() => {
    setIndex((currentIndex) =>
      currentIndex <= 0 ? images.length - 1 : currentIndex - 1,
    );
  }, [images.length]);

  /* =======================================================
     NEXT
  ======================================================= */

  const next = useCallback(() => {
    setIndex((currentIndex) =>
      currentIndex >= images.length - 1 ? 0 : currentIndex + 1,
    );
  }, [images.length]);

  /* =======================================================
     BODY LOCK
  ======================================================= */

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  /* =======================================================
     KEYBOARD
  ======================================================= */

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();

        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();

        previous();

        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();

        next();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    closeRef.current?.focus();

    return () => {
      window.removeEventListener("keydown", handleKeyDown);

      returnFocusRef.current?.focus();
    };
  }, [next, onClose, previous, returnFocusRef]);

  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${projectTitle} image viewer`}
      data-lenis-prevent
      className="
        fixed
        inset-0

        z-[9999]

        flex
        flex-col

        bg-[#07111C]/[0.98]
      "
    >
      {/* =================================================
          TOP BAR
      ================================================== */}

      <div
        className="
          relative
          z-20

          flex
          shrink-0

          items-center
          justify-between

          gap-4

          px-3
          py-3

          sm:px-5
        "
      >
        <div
          className="
            min-w-0
          "
        >
          <p
            className="
              font-brand-sans

              text-[7px]
              font-bold
              uppercase

              tracking-[0.15em]

              text-[var(--brand-gold)]
            "
          >
            Project Gallery
          </p>

          <p
            className="
              mt-1

              truncate

              font-brand-sans

              text-[10px]
              font-semibold

              text-white/70

              sm:text-[11px]
            "
          >
            {projectTitle}
          </p>
        </div>

        <div
          className="
            flex
            shrink-0

            items-center

            gap-2
          "
        >
          {/* COUNTER */}

          <span
            className="
              rounded-full

              border
              border-white/10

              bg-white/[0.06]

              px-3
              py-2

              font-brand-sans

              text-[8px]
              font-bold

              text-white/65
            "
          >
            {String(index + 1).padStart(2, "0")}

            <span
              className="
                mx-1

                text-white/25
              "
            >
              /
            </span>

            {String(images.length).padStart(2, "0")}
          </span>

          {/* CLOSE */}

          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close full screen image"
            className="
              flex
              h-10
              w-10

              items-center
              justify-center

              rounded-[13px]

              border
              border-white/10

              bg-white/[0.07]

              text-white

              transition-colors

              hover:bg-white/[0.12]
            "
          >
            <X size={18} strokeWidth={1.6} />
          </button>
        </div>
      </div>

      {/* =================================================
          MAIN IMAGE
      ================================================== */}

      <div
        className="
          relative

          min-h-0
          flex-1

          px-3

          sm:px-16

          lg:px-24
        "
      >
        <div
          className="
            relative

            h-full
            w-full
          "
        >
          <Image
            key={current.id}
            src={current.url}
            alt={current.alt}
            fill
            priority
            draggable={false}
            sizes="100vw"
            className="
              select-none

              object-contain
            "
          />
        </div>

        {/* ===============================================
            DESKTOP PREVIOUS
        ================================================ */}

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={previous}
              aria-label="Previous project image"
              className="
                absolute

                left-4
                top-1/2

                hidden

                h-11
                w-11

                -translate-y-1/2

                items-center
                justify-center

                rounded-[14px]

                border
                border-white/10

                bg-white/[0.07]

                text-white

                transition-colors

                hover:bg-white/[0.13]

                sm:flex
              "
            >
              <ArrowLeft size={18} strokeWidth={1.6} />
            </button>

            {/* NEXT */}

            <button
              type="button"
              onClick={next}
              aria-label="Next project image"
              className="
                absolute

                right-4
                top-1/2

                hidden

                h-11
                w-11

                -translate-y-1/2

                items-center
                justify-center

                rounded-[14px]

                border
                border-white/10

                bg-white/[0.07]

                text-white

                transition-colors

                hover:bg-white/[0.13]

                sm:flex
              "
            >
              <ArrowRight size={18} strokeWidth={1.6} />
            </button>
          </>
        )}
      </div>

      {/* =================================================
          BOTTOM
      ================================================== */}

      <div
        className="
          relative
          z-20

          shrink-0

          px-3
          pb-[calc(12px+env(safe-area-inset-bottom))]
          pt-3

          sm:px-5
          sm:pb-5
        "
      >
        {/* CAPTION */}

        <div
          className="
            mx-auto

            max-w-[760px]

            text-center
          "
        >
          <p
            className="
              font-brand-sans

              text-[9px]
              font-semibold
              leading-[1.5]

              text-white/55
            "
          >
            {current.alt}
          </p>
        </div>

        {/* MOBILE CONTROLS */}

        {images.length > 1 && (
          <div
            className="
              mt-3

              flex
              items-center
              justify-center

              gap-2

              sm:hidden
            "
          >
            <button
              type="button"
              onClick={previous}
              aria-label="Previous image"
              className="
                flex
                h-10
                w-12

                items-center
                justify-center

                rounded-[12px]

                border
                border-white/10

                bg-white/[0.07]

                text-white
              "
            >
              <ArrowLeft size={17} />
            </button>

            <button
              type="button"
              onClick={next}
              aria-label="Next image"
              className="
                flex
                h-10
                w-12

                items-center
                justify-center

                rounded-[12px]

                border
                border-white/10

                bg-white/[0.07]

                text-white
              "
            >
              <ArrowRight size={17} />
            </button>
          </div>
        )}

        {/* THUMBNAILS */}

        {images.length > 1 && (
          <div
            className="
              mx-auto
              mt-3

              flex
              max-w-[760px]

              gap-1.5

              overflow-x-auto

              pb-1

              [scrollbar-width:none]

              [&::-webkit-scrollbar]:hidden
            "
          >
            {images.map((image, imageIndex) => {
              const active = imageIndex === index;

              return (
                <button
                  key={image.id}
                  type="button"
                  onClick={() => setIndex(imageIndex)}
                  aria-label={`View image ${imageIndex + 1}`}
                  aria-current={active ? "true" : undefined}
                  className={`
                      relative

                      h-12
                      w-16

                      shrink-0

                      overflow-hidden

                      rounded-[8px]

                      border

                      transition-opacity

                      ${
                        active
                          ? `
                            border-[var(--brand-gold)]
                            opacity-100
                          `
                          : `
                            border-white/10
                            opacity-40

                            hover:opacity-75
                          `
                      }
                    `}
                >
                  <Image
                    src={image.url}
                    alt=""
                    fill
                    sizes="64px"
                    className="
                        object-cover
                      "
                  />
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>,

    document.body,
  );
}
