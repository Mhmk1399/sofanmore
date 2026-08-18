"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, GripHorizontal, Hash } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import type {
  KeyboardEvent,
  PointerEvent as ReactPointerEvent,
  ReactNode,
} from "react";

import { ProjectProduct } from "./ProjectsSliderSection";

/* =========================================================
   TYPES
========================================================= */

type ProjectsSliderClientProps = {
  projects: ProjectProduct[];
};

type DragState = {
  active: boolean;
  pointerId: number | null;
  startX: number;
  lastX: number;
  moved: boolean;
};

/* =========================================================
   ROOT
========================================================= */

export default function ProjectsSliderClient({
  projects,
}: ProjectsSliderClientProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);

  const dragRef = useRef<DragState>({
    active: false,
    pointerId: null,
    startX: 0,
    lastX: 0,
    moved: false,
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  /* =======================================================
     GET SLIDES
  ======================================================= */

  const getSlides = useCallback(() => {
    const container = sliderRef.current;

    if (!container) {
      return [];
    }

    return Array.from(
      container.querySelectorAll<HTMLElement>("[data-project-slide]"),
    );
  }, []);

  /* =======================================================
     SCROLL TO INDEX
  ======================================================= */

  const scrollToIndex = useCallback(
    (index: number, behavior: ScrollBehavior = "smooth") => {
      const container = sliderRef.current;

      if (!container) {
        return;
      }

      const slides = getSlides();
      const target = slides[index];

      if (!target) {
        return;
      }

      container.scrollTo({
        left: target.offsetLeft,
        behavior,
      });
    },
    [getSlides],
  );

  /* =======================================================
     FIND NEAREST SLIDE
  ======================================================= */

  const findNearestIndex = useCallback(() => {
    const container = sliderRef.current;

    if (!container) {
      return 0;
    }

    const slides = getSlides();

    if (!slides.length) {
      return 0;
    }

    const scrollLeft = container.scrollLeft;

    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    slides.forEach((slide, index) => {
      const distance = Math.abs(slide.offsetLeft - scrollLeft);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    return closestIndex;
  }, [getSlides]);

  /* =======================================================
     PREVIOUS / NEXT
  ======================================================= */

  const goPrevious = useCallback(() => {
    const currentIndex = findNearestIndex();
    const nextIndex =
      currentIndex <= 0 ? projects.length - 1 : currentIndex - 1;

    scrollToIndex(nextIndex);
  }, [findNearestIndex, projects.length, scrollToIndex]);

  const goNext = useCallback(() => {
    const currentIndex = findNearestIndex();
    const nextIndex =
      currentIndex >= projects.length - 1 ? 0 : currentIndex + 1;

    scrollToIndex(nextIndex);
  }, [findNearestIndex, projects.length, scrollToIndex]);

  /* =======================================================
     SCROLL ACTIVE STATE
  ======================================================= */

  useEffect(() => {
    const container = sliderRef.current;

    if (!container) {
      return;
    }

    function updateActiveSlide() {
      frameRef.current = null;

      const closestIndex = findNearestIndex();

      setActiveIndex((current) =>
        current === closestIndex ? current : closestIndex,
      );
    }

    function handleScroll() {
      if (frameRef.current !== null) {
        return;
      }

      frameRef.current = window.requestAnimationFrame(updateActiveSlide);
    }

    container.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      container.removeEventListener("scroll", handleScroll);

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, [findNearestIndex]);

  /* =======================================================
     DESKTOP MOUSE DRAG

     Mouse only.
     Touch remains native for mobile horizontal swipe.
  ======================================================= */

  function handlePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") {
      return;
    }

    if (event.button !== 0) {
      return;
    }

    const container = sliderRef.current;

    if (!container) {
      return;
    }

    dragRef.current = {
      active: true,
      pointerId: event.pointerId,
      startX: event.clientX,
      lastX: event.clientX,
      moved: false,
    };

    container.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    const drag = dragRef.current;

    if (!drag.active || event.pointerType !== "mouse") {
      return;
    }

    const deltaX = event.clientX - drag.startX;

    drag.lastX = event.clientX;

    if (!drag.moved && Math.abs(deltaX) < 6) {
      return;
    }

    drag.moved = true;

    if (!isDragging) {
      setIsDragging(true);
    }

    event.preventDefault();
  }

  function finishPointerDrag(event: ReactPointerEvent<HTMLDivElement>) {
    const drag = dragRef.current;
    const container = sliderRef.current;

    if (!drag.active || event.pointerType !== "mouse") {
      return;
    }

    const deltaX = drag.lastX - drag.startX;

    dragRef.current.active = false;

    if (
      container &&
      drag.pointerId !== null &&
      container.hasPointerCapture(drag.pointerId)
    ) {
      container.releasePointerCapture(drag.pointerId);
    }

    if (drag.moved) {
      const threshold = container
        ? Math.max(48, container.clientWidth * 0.1)
        : 56;

      if (Math.abs(deltaX) >= threshold) {
        if (deltaX < 0) {
          goNext();
        } else {
          goPrevious();
        }
      } else {
        const closestIndex = findNearestIndex();
        scrollToIndex(closestIndex, "smooth");
      }
    }

    dragRef.current = {
      active: false,
      pointerId: null,
      startX: 0,
      lastX: 0,
      moved: false,
    };

    setIsDragging(false);
  }

  /* =======================================================
     KEYBOARD
  ======================================================= */

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goNext();
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goPrevious();
    }
  }

  if (!projects.length) {
    return null;
  }

  return (
    <div className="relative">
      {/* ===================================================
          LIGHT CLAY FRAME
      ==================================================== */}

      <div
        className="
          relative

          rounded-[28px]

          border
          border-white/80

          bg-[#EEE6DA]

          p-[6px]

          shadow-[
            0_12px_28px_rgba(82,58,33,0.10),
            inset_1px_1px_2px_rgba(255,255,255,0.90),
            inset_-1px_-1px_2px_rgba(98,70,40,0.05)
          ]

          sm:rounded-[34px]
          sm:p-[7px]

          lg:rounded-[40px]
        "
      >
        {/* ===============================================
            INNER RECESSED SURFACE
        ================================================ */}

        <div
          className="
            overflow-hidden

            rounded-[22px]

            border
            border-[var(--brand-navy)]/[0.055]

            bg-[#E6DCCF]

            p-[4px]

            shadow-[
              inset_2px_2px_5px_rgba(93,66,38,0.07),
              inset_-2px_-2px_5px_rgba(255,255,255,0.65)
            ]

            sm:rounded-[28px]

            lg:rounded-[34px]
          "
        >
          {/* =============================================
              SLIDER
          ============================================== */}

          <div
            ref={sliderRef}
            role="region"
            aria-roledescription="carousel"
            aria-label="Selected Sofa N More projects"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={finishPointerDrag}
            onPointerCancel={finishPointerDrag}
            className={`
              flex

              snap-x
              snap-mandatory

              gap-2.5
              sm:gap-3

              overflow-x-auto
              overflow-y-hidden

              rounded-[19px]

              overscroll-x-contain
              scroll-smooth

              [scrollbar-width:none]
              [&::-webkit-scrollbar]:hidden

              ${
                isDragging
                  ? `
                    select-none
                    lg:cursor-grabbing
                  `
                  : `
                    lg:cursor-grab
                  `
              }
            `}
          >
            {projects.map((project, index) => (
              <ProjectSlide
                key={project.id}
                project={project}
                index={index}
                total={projects.length}
                priority={index === 0}
                active={index === activeIndex}
                dragging={isDragging}
              />
            ))}
          </div>
        </div>

        {/* ===============================================
            DESKTOP FLOATING NAV ONLY
        ================================================ */}

        <div
          className="
            pointer-events-none

            absolute
            inset-y-0
            left-0
            right-0

            z-20

            hidden
            items-center
            justify-between

            px-4

            lg:flex
            lg:px-5
            xl:px-6
          "
        >
          <div className="pointer-events-auto">
            <SliderControl label="Previous project" onClick={goPrevious}>
              <ArrowLeft size={15} strokeWidth={1.6} />
            </SliderControl>
          </div>

          <div className="pointer-events-auto">
            <SliderControl label="Next project" onClick={goNext} featured>
              <ArrowRight size={15} strokeWidth={1.6} />
            </SliderControl>
          </div>
        </div>

        {/* ===============================================
            SMALL CLAY GRIP
        ================================================ */}

        <div
          aria-hidden
          className="
            pointer-events-none

            absolute

            bottom-[-13px]
            left-1/2

            hidden

            h-[27px]
            min-w-[74px]

            -translate-x-1/2

            items-center
            justify-center

            rounded-full

            border
            border-white/80

            bg-[#EEE5D8]

            text-[var(--brand-navy)]/35

            shadow-[
              0_5px_12px_rgba(78,55,31,0.10),
              inset_1px_1px_2px_rgba(255,255,255,0.85)
            ]

            lg:flex
          "
        >
          <GripHorizontal size={17} strokeWidth={1.4} />
        </div>
      </div>

      {/* ===================================================
          PROGRESS / HINT
      ==================================================== */}

      <div
        className="
          mt-6

          flex
          items-center
          justify-between

          gap-4

          px-1

          sm:mt-7
          sm:px-2
        "
      >
        <div
          className="
            flex
            min-w-0
            flex-1

            items-center

            gap-3

            sm:gap-4
          "
        >
          <span
            className="
              shrink-0

              font-brand-sans

              text-[9px]
              font-bold

              tracking-[0.08em]

              text-[var(--brand-navy)]
            "
          >
            {String(activeIndex + 1).padStart(2, "0")}

            <span
              className="
                mx-1.5

                text-[var(--brand-text-muted)]/35
              "
            >
              /
            </span>

            <span
              className="
                text-[var(--brand-text-muted)]/55
              "
            >
              {String(projects.length).padStart(2, "0")}
            </span>
          </span>

          <div
            className="
              relative

              h-[5px]
              max-w-[280px]
              flex-1

              overflow-hidden

              rounded-full

              bg-[#E1D7CA]

              shadow-[
                inset_1px_1px_3px_rgba(79,57,33,0.10),
                inset_-1px_-1px_2px_rgba(255,255,255,0.75)
              ]
            "
          >
            <span
              aria-hidden
              className="
                absolute
                inset-y-0
                left-0

                rounded-full

                bg-[var(--brand-gold)]

                transition-[width]
                duration-300
              "
              style={{
                width: `${((activeIndex + 1) / projects.length) * 100}%`,
              }}
            />
          </div>
        </div>

        <span
          className="
            hidden

            items-center
            gap-1.5

            font-brand-sans

            text-[7px]
            font-bold
            uppercase

            tracking-[0.12em]

            text-[var(--brand-text-muted)]/60

            lg:flex
          "
        >
          <GripHorizontal size={12} />
          Drag to explore
        </span>
      </div>

      {/* ===================================================
          MOBILE DOTS
      ==================================================== */}

      <div
        className="
          mt-4

          flex
          items-center
          justify-center

          gap-1.5

          lg:hidden
        "
      >
        {projects.map((project, index) => {
          const active = index === activeIndex;

          return (
            <button
              key={project.id}
              type="button"
              aria-label={`Go to project ${index + 1}`}
              aria-current={active ? "true" : undefined}
              onClick={() => scrollToIndex(index)}
              className={`
                h-[6px]

                rounded-full

                border
                border-white/60

                shadow-[
                  inset_1px_1px_2px_rgba(75,52,30,0.09),
                  inset_-1px_-1px_2px_rgba(255,255,255,0.70)
                ]

                transition-[width,background-color]
                duration-200

                ${
                  active
                    ? `
                      w-6

                      bg-[var(--brand-gold)]
                    `
                    : `
                      w-[6px]

                      bg-[#DED4C7]
                    `
                }
              `}
            />
          );
        })}
      </div>
    </div>
  );
}

/* =========================================================
   PROJECT SLIDE
========================================================= */

function ProjectSlide({
  project,
  index,
  total,
  priority,
  active,
  dragging,
}: {
  project: ProjectProduct;
  index: number;
  total: number;
  priority: boolean;
  active: boolean;
  dragging: boolean;
}) {
  return (
    <article
      data-project-slide
      aria-label={`${project.name}, project ${index + 1} of ${total}`}
      className={`
        group
        relative

        min-w-[88%]

        snap-start

        overflow-hidden

        rounded-[17px]

        border

        bg-[var(--brand-navy)]

        transition-[transform,opacity,box-shadow,border-color]
        duration-500
        ease-[cubic-bezier(0.22,1,0.36,1)]

        sm:min-w-[74%]
        sm:rounded-[23px]

        lg:min-w-[58%]

        xl:min-w-[52%]

        ${
          active
            ? `
              border-white/24

              opacity-100

              shadow-[
                0_18px_42px_rgba(9,23,37,0.18),
                0_3px_10px_rgba(9,23,37,0.10)
              ]

              lg:-translate-y-[2px]
              lg:scale-[1]
            `
            : `
              border-white/14

              opacity-[0.92]

              shadow-[
                0_10px_24px_rgba(9,23,37,0.10)
              ]

              lg:translate-y-[4px]
              lg:scale-[0.982]
            `
        }
      `}
    >
      {/* =================================================
          IMAGE
      ================================================== */}

      <div
        className="
          relative

          aspect-[4/5]

          overflow-hidden

          sm:aspect-[16/11]

          lg:aspect-[16/10]
        "
      >
        <Image
          src={project.imageUrl}
          alt={project.name}
          fill
          priority={priority}
          draggable={false}
          sizes="(max-width: 640px) 88vw, (max-width: 1024px) 74vw, (max-width: 1280px) 58vw, 52vw"
          className={`
            pointer-events-none
            select-none

            object-cover
            object-center

            [will-change:transform]

            transition-[transform,opacity]
            duration-700
            ease-[cubic-bezier(0.22,1,0.36,1)]

            ${
              active
                ? `
                  scale-[1.015]
                  opacity-100
                `
                : `
                  scale-[1.002]
                  opacity-[0.92]
                `
            }

            ${
              !dragging
                ? active
                  ? `
                    lg:group-hover:scale-[1.04]
                  `
                  : `
                    lg:group-hover:scale-[1.022]
                  `
                : ""
            }
          `}
        />

        {/* ===============================================
            BASE OVERLAY
        ================================================ */}

        <div
          aria-hidden
          className="
            pointer-events-none

            absolute
            inset-0

            bg-gradient-to-t

            from-[#091725]/95
            via-[#091725]/18
            to-transparent
          "
        />

        {/* ===============================================
            INACTIVE DARKENING
        ================================================ */}

        <div
          aria-hidden
          className={`
            pointer-events-none

            absolute
            inset-0

            bg-[#091725]/20

            transition-opacity
            duration-500
            ease-[cubic-bezier(0.22,1,0.36,1)]

            ${
              active
                ? `
                  opacity-0
                `
                : `
                  opacity-100
                `
            }
          `}
        />

        {/* ===============================================
            TOP LIGHT SHEEN
        ================================================ */}

        <div
          aria-hidden
          className={`
            pointer-events-none

            absolute
            inset-x-0
            top-0

            h-[32%]

            bg-gradient-to-b
            from-white/[0.12]
            to-transparent

            transition-opacity
            duration-500

            ${
              active
                ? `
                  opacity-100
                `
                : `
                  opacity-50
                `
            }
          `}
        />

        {/* ===============================================
            TOP META
        ================================================ */}

        <div
          className={`
            pointer-events-none

            absolute

            inset-x-0
            top-0

            flex
            items-start
            justify-between

            gap-4

            p-4

            transition-[opacity,transform]
            duration-500
            ease-[cubic-bezier(0.22,1,0.36,1)]

            sm:p-5

            lg:p-6

            ${
              active
                ? `
                  translate-y-0
                  opacity-100
                `
                : `
                  translate-y-[3px]
                  opacity-[0.9]
                `
            }
          `}
        >
          <span
            className="
              font-brand-sans

              text-[8px]
              font-bold
              uppercase

              tracking-[0.16em]

              text-white/65
            "
          >
            Project {String(index + 1).padStart(2, "0")}
            <span
              className="
                mx-1.5
                text-white/25
              "
            >
              /
            </span>
            {String(total).padStart(2, "0")}
          </span>

          <span
            className="
              inline-flex
              items-center

              gap-1.5

              rounded-full

              border
              border-white/25

              bg-[#F1E7D9]/90

              px-2.5
              py-1.5

              font-brand-sans

              text-[7px]
              font-bold
              uppercase

              tracking-[0.1em]

              text-[var(--brand-navy)]

              shadow-[
                0_4px_10px_rgba(0,0,0,0.10),
                inset_1px_1px_1px_rgba(255,255,255,0.80)
              ]
            "
          >
            <Hash
              size={9}
              strokeWidth={1.8}
              className="text-[var(--brand-gold-700)]"
            />

            {project.productCode}
          </span>
        </div>

        {/* ===============================================
            CONTENT
        ================================================ */}

        <div
          className={`
            pointer-events-none

            absolute

            inset-x-0
            bottom-0

            p-4

            transition-[opacity,transform]
            duration-500
            ease-[cubic-bezier(0.22,1,0.36,1)]

            sm:p-6

            lg:p-7

            ${
              active
                ? `
                  translate-y-0
                  opacity-100
                `
                : `
                  translate-y-[5px]
                  opacity-[0.9]
                `
            }
          `}
        >
          <div
            className="
              max-w-[620px]
            "
          >
            <div
              className="
                mb-3

                flex
                items-center

                gap-2
              "
            >
              <span
                aria-hidden
                className={`
                  h-px
                  w-6

                  bg-[var(--brand-gold)]

                  transition-[opacity,width]
                  duration-500
                  ease-[cubic-bezier(0.22,1,0.36,1)]

                  ${
                    active
                      ? `
                        opacity-100
                      `
                      : `
                        opacity-70
                      `
                  }
                `}
              />

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
                Sofa N More Project
              </span>
            </div>

            <h3
              className={`
                max-w-[560px]

                font-brand-display

                text-[27px]
                font-medium
                leading-[1.02]

                tracking-[-0.035em]

                text-white

                transition-[opacity,transform]
                duration-500
                ease-[cubic-bezier(0.22,1,0.36,1)]

                sm:text-[34px]

                lg:text-[40px]

                ${
                  active
                    ? `
                      opacity-100
                    `
                    : `
                      opacity-[0.94]
                    `
                }
              `}
            >
              {project.name}
            </h3>

            <p
              className={`
                mt-3

                line-clamp-3

                max-w-[560px]

                font-brand-sans

                text-[9px]
                font-medium
                leading-[1.65]

                text-white/65

                transition-[opacity]
                duration-500
                ease-[cubic-bezier(0.22,1,0.36,1)]

                sm:text-[10px]

                lg:text-[11px]

                ${
                  active
                    ? `
                      opacity-100
                    `
                    : `
                      opacity-[0.82]
                    `
                }
              `}
            >
              {project.description}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   SLIDER CONTROL — DESKTOP FLOATING
========================================================= */

function SliderControl({
  label,
  onClick,
  children,
  featured = false,
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
  featured?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`
        flex

        h-11
        w-11

        items-center
        justify-center

        rounded-[15px]

        border

        transition-[transform,background-color,color,box-shadow]
        duration-200

        hover:-translate-y-[1px]
        active:scale-[0.95]

        ${
          featured
            ? `
              border-[var(--brand-navy)]/85

              bg-[var(--brand-navy)]
              text-[var(--brand-gold)]

              shadow-[
                0_12px_24px_rgba(18,37,62,0.16),
                0_2px_8px_rgba(18,37,62,0.10),
                inset_1px_1px_1px_rgba(255,255,255,0.09)
              ]

              hover:bg-[#0B1929]
            `
            : `
              border-white/80

              bg-[#F2E9DD]
              text-[var(--brand-navy)]

              shadow-[
                0_10px_22px_rgba(77,55,32,0.12),
                0_2px_6px_rgba(77,55,32,0.08),
                inset_1px_1px_2px_rgba(255,255,255,0.90),
                inset_-1px_-1px_2px_rgba(90,64,36,0.05)
              ]

              hover:bg-[#F7EFE5]
            `
        }
      `}
    >
      {children}
    </button>
  );
}
