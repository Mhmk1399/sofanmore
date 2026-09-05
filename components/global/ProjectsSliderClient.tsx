"use client";

import Image from "next/image";
import Link from "next/link";

import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  GripHorizontal,
  Hash,
  MapPin,
} from "lucide-react";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import type {
  KeyboardEvent,
  PointerEvent as ReactPointerEvent,
  ReactNode,
} from "react";

import type {
  ProjectSliderItem,
} from "./ProjectsSliderSection";

/* =========================================================
   TYPES
========================================================= */

type ProjectsSliderClientProps = {
  projects: ProjectSliderItem[];
};

type DragState = {
  active: boolean;
  moved: boolean;

  pointerId: number | null;

  startX: number;
  currentX: number;

  startScrollLeft: number;
  targetScrollLeft: number;

  startIndex: number;
};

/* =========================================================
   CONSTANTS
========================================================= */

const NAVIGATION_DURATION = 480;

const DRAG_START_THRESHOLD = 5;

const DRAG_NAVIGATION_THRESHOLD = 50;

const DRAG_FOLLOW_FACTOR = 0.27;

/* =========================================================
   HELPERS
========================================================= */

function clamp(
  value: number,
  min: number,
  max: number,
) {
  return Math.min(
    Math.max(value, min),
    max,
  );
}

function easeOutQuint(
  progress: number,
) {
  return (
    1 -
    Math.pow(
      1 - progress,
      5,
    )
  );
}

/* =========================================================
   ROOT
========================================================= */

export default function ProjectsSliderClient({
  projects,
}: ProjectsSliderClientProps) {
  const sliderRef =
    useRef<HTMLDivElement>(null);

  const navigationFrameRef =
    useRef<number | null>(
      null,
    );

  const dragFrameRef =
    useRef<number | null>(
      null,
    );

  const scrollFrameRef =
    useRef<number | null>(
      null,
    );

  const dragRef =
    useRef<DragState>({
      active: false,
      moved: false,

      pointerId: null,

      startX: 0,
      currentX: 0,

      startScrollLeft: 0,
      targetScrollLeft: 0,

      startIndex: 0,
    });

  const [activeIndex, setActiveIndex] =
    useState(0);

  const [isDragging, setIsDragging] =
    useState(false);

  const [isAnimating, setIsAnimating] =
    useState(false);

  /* =======================================================
     GET SLIDES
  ======================================================= */

  const getSlides =
    useCallback(() => {
      const container =
        sliderRef.current;

      if (!container) {
        return [];
      }

      return Array.from(
        container.querySelectorAll<HTMLElement>(
          "[data-project-slide]",
        ),
      );
    }, []);

  /* =======================================================
     CANCEL NAVIGATION
  ======================================================= */

  const cancelNavigation =
    useCallback(() => {
      if (
        navigationFrameRef.current ===
        null
      ) {
        return;
      }

      window.cancelAnimationFrame(
        navigationFrameRef.current,
      );

      navigationFrameRef.current =
        null;

      setIsAnimating(false);
    }, []);

  /* =======================================================
     CANCEL DRAG
  ======================================================= */

  const cancelDragFrame =
    useCallback(() => {
      if (
        dragFrameRef.current ===
        null
      ) {
        return;
      }

      window.cancelAnimationFrame(
        dragFrameRef.current,
      );

      dragFrameRef.current =
        null;
    }, []);

  /* =======================================================
     FIND NEAREST
  ======================================================= */

  const findNearestIndex =
    useCallback(() => {
      const container =
        sliderRef.current;

      const slides =
        getSlides();

      if (
        !container ||
        !slides.length
      ) {
        return 0;
      }

      let closestIndex = 0;

      let closestDistance =
        Number.POSITIVE_INFINITY;

      slides.forEach(
        (slide, index) => {
          const distance =
            Math.abs(
              slide.offsetLeft -
                container.scrollLeft,
            );

          if (
            distance <
            closestDistance
          ) {
            closestDistance =
              distance;

            closestIndex =
              index;
          }
        },
      );

      return closestIndex;
    }, [getSlides]);

  /* =======================================================
     ONE ANIMATION ENGINE

     Used by:
     - arrows
     - keyboard
     - dots
     - mouse release
  ======================================================= */

  const animateToIndex =
    useCallback(
      (
        index: number,
        duration =
          NAVIGATION_DURATION,
      ) => {
        const container =
          sliderRef.current;

        const slides =
          getSlides();

        const target =
          slides[index];

        if (
          !container ||
          !target
        ) {
          return;
        }

        cancelNavigation();
        cancelDragFrame();

        const startLeft =
          container.scrollLeft;

        const targetLeft =
          target.offsetLeft;

        const distance =
          targetLeft -
          startLeft;

        if (
          Math.abs(distance) < 1
        ) {
          container.scrollLeft =
            targetLeft;

          setActiveIndex(index);

          return;
        }

        setIsAnimating(true);

        const startTime =
          performance.now();

        function frame(
          currentTime: number,
        ) {
          const currentContainer =
            sliderRef.current;

          if (!currentContainer) {
            navigationFrameRef.current =
              null;

            setIsAnimating(false);

            return;
          }

          const progress =
            Math.min(
              (currentTime -
                startTime) /
                duration,
              1,
            );

          const eased =
            easeOutQuint(
              progress,
            );

          currentContainer.scrollLeft =
            startLeft +
            distance * eased;

          if (progress < 1) {
            navigationFrameRef.current =
              window.requestAnimationFrame(
                frame,
              );

            return;
          }

          currentContainer.scrollLeft =
            targetLeft;

          navigationFrameRef.current =
            null;

          setActiveIndex(index);
          setIsAnimating(false);
        }

        navigationFrameRef.current =
          window.requestAnimationFrame(
            frame,
          );
      },
      [
        cancelDragFrame,
        cancelNavigation,
        getSlides,
      ],
    );

  /* =======================================================
     NAVIGATION
  ======================================================= */

  const goPrevious =
    useCallback(() => {
      if (
        activeIndex <= 0
      ) {
        return;
      }

      animateToIndex(
        activeIndex - 1,
      );
    }, [
      activeIndex,
      animateToIndex,
    ]);

  const goNext =
    useCallback(() => {
      if (
        activeIndex >=
        projects.length - 1
      ) {
        return;
      }

      animateToIndex(
        activeIndex + 1,
      );
    }, [
      activeIndex,
      animateToIndex,
      projects.length,
    ]);

  /* =======================================================
     SCROLL STATE

     Primarily for native mobile swipe.
  ======================================================= */

  useEffect(() => {
    const container =
      sliderRef.current;

    if (!container) {
      return;
    }

    function update() {
      scrollFrameRef.current =
        null;

      const nextIndex =
        findNearestIndex();

      setActiveIndex(
        (current) =>
          current === nextIndex
            ? current
            : nextIndex,
      );
    }

    function handleScroll() {
      if (
        scrollFrameRef.current !==
        null
      ) {
        return;
      }

      scrollFrameRef.current =
        window.requestAnimationFrame(
          update,
        );
    }

    container.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      },
    );

    return () => {
      container.removeEventListener(
        "scroll",
        handleScroll,
      );

      if (
        scrollFrameRef.current !==
        null
      ) {
        window.cancelAnimationFrame(
          scrollFrameRef.current,
        );
      }
    };
  }, [findNearestIndex]);

  /* =======================================================
     SMOOTH MOUSE FOLLOW
  ======================================================= */

  const startDragFrame =
    useCallback(() => {
      if (
        dragFrameRef.current !==
        null
      ) {
        return;
      }

      function frame() {
        const container =
          sliderRef.current;

        const drag =
          dragRef.current;

        if (!container) {
          dragFrameRef.current =
            null;

          return;
        }

        const difference =
          drag.targetScrollLeft -
          container.scrollLeft;

        container.scrollLeft +=
          difference *
          DRAG_FOLLOW_FACTOR;

        if (
          drag.active &&
          Math.abs(difference) >
            0.35
        ) {
          dragFrameRef.current =
            window.requestAnimationFrame(
              frame,
            );

          return;
        }

        dragFrameRef.current =
          null;
      }

      dragFrameRef.current =
        window.requestAnimationFrame(
          frame,
        );
    }, []);

  /* =======================================================
     MOUSE DOWN

     Mouse only.
     Touch keeps native browser swipe.
  ======================================================= */

  function handlePointerDown(
    event: ReactPointerEvent<HTMLDivElement>,
  ) {
    if (
      event.pointerType !==
        "mouse" ||
      event.button !== 0
    ) {
      return;
    }

    const container =
      sliderRef.current;

    if (!container) {
      return;
    }

    cancelNavigation();
    cancelDragFrame();

    dragRef.current = {
      active: true,
      moved: false,

      pointerId:
        event.pointerId,

      startX:
        event.clientX,

      currentX:
        event.clientX,

      startScrollLeft:
        container.scrollLeft,

      targetScrollLeft:
        container.scrollLeft,

      startIndex:
        findNearestIndex(),
    };

    container.setPointerCapture(
      event.pointerId,
    );
  }

  /* =======================================================
     MOUSE MOVE
  ======================================================= */

  function handlePointerMove(
    event: ReactPointerEvent<HTMLDivElement>,
  ) {
    const container =
      sliderRef.current;

    const drag =
      dragRef.current;

    if (
      !container ||
      !drag.active ||
      event.pointerType !==
        "mouse"
    ) {
      return;
    }

    drag.currentX =
      event.clientX;

    const deltaX =
      event.clientX -
      drag.startX;

    if (
      !drag.moved &&
      Math.abs(deltaX) <
        DRAG_START_THRESHOLD
    ) {
      return;
    }

    if (!drag.moved) {
      drag.moved = true;

      setIsDragging(true);
    }

    event.preventDefault();

    const maxScroll =
      Math.max(
        0,
        container.scrollWidth -
          container.clientWidth,
      );

    drag.targetScrollLeft =
      clamp(
        drag.startScrollLeft -
          deltaX * 0.9,

        0,
        maxScroll,
      );

    startDragFrame();
  }

  /* =======================================================
     MOUSE RELEASE
  ======================================================= */

  function finishPointerDrag(
    event: ReactPointerEvent<HTMLDivElement>,
  ) {
    const container =
      sliderRef.current;

    const drag =
      dragRef.current;

    if (
      !drag.active ||
      event.pointerType !==
        "mouse"
    ) {
      return;
    }

    const deltaX =
      drag.currentX -
      drag.startX;

    const startIndex =
      drag.startIndex;

    const moved =
      drag.moved;

    drag.active = false;

    if (
      container &&
      drag.pointerId !== null &&
      container.hasPointerCapture(
        drag.pointerId,
      )
    ) {
      container.releasePointerCapture(
        drag.pointerId,
      );
    }

    cancelDragFrame();

    setIsDragging(false);

    dragRef.current = {
      active: false,
      moved: false,

      pointerId: null,

      startX: 0,
      currentX: 0,

      startScrollLeft:
        container?.scrollLeft ??
        0,

      targetScrollLeft:
        container?.scrollLeft ??
        0,

      startIndex,
    };

    if (!moved) {
      return;
    }

    let targetIndex =
      startIndex;

    if (
      deltaX <
      -DRAG_NAVIGATION_THRESHOLD
    ) {
      targetIndex =
        Math.min(
          startIndex + 1,
          projects.length - 1,
        );
    }

    if (
      deltaX >
      DRAG_NAVIGATION_THRESHOLD
    ) {
      targetIndex =
        Math.max(
          startIndex - 1,
          0,
        );
    }

    animateToIndex(
      targetIndex,
    );
  }

  /* =======================================================
     KEYBOARD
  ======================================================= */

  function handleKeyDown(
    event:
      KeyboardEvent<HTMLDivElement>,
  ) {
    if (
      event.key ===
      "ArrowRight"
    ) {
      event.preventDefault();

      goNext();

      return;
    }

    if (
      event.key ===
      "ArrowLeft"
    ) {
      event.preventDefault();

      goPrevious();
    }
  }

  /* =======================================================
     CLEANUP
  ======================================================= */

  useEffect(() => {
    return () => {
      cancelNavigation();
      cancelDragFrame();

      if (
        scrollFrameRef.current !==
        null
      ) {
        window.cancelAnimationFrame(
          scrollFrameRef.current,
        );
      }
    };
  }, [
    cancelDragFrame,
    cancelNavigation,
  ]);

  if (!projects.length) {
    return null;
  }

  const hasMultiple =
    projects.length > 1;

  /* =======================================================
     UI
  ======================================================= */

  return (
    <div
      className="
        relative
      "
    >
      {/* ===================================================
          LIGHT CLAY OUTER SHELL

          NO black container.
          NO blur.
          NO backdrop-filter.
      ==================================================== */}

      <div
        className="
          relative

          rounded-[28px]

          border
          border-white/80

          bg-[#EDE4D8]

          p-[5px]

          shadow-[0_9px_24px_rgba(73,52,30,0.075),inset_1px_1px_2px_rgba(255,255,255,0.88)]

          sm:rounded-[33px]
          sm:p-[6px]

          lg:rounded-[36px]
        "
      >
        {/* =================================================
            RECESSED TRACK
        ================================================== */}

        <div
          className="
            overflow-hidden

            rounded-[23px]

            border
            border-[var(--brand-navy)]/[0.045]

            bg-[#E5DACD]

            p-[4px]

            shadow-[inset_1px_1px_4px_rgba(83,59,34,0.06),inset_-1px_-1px_3px_rgba(255,255,255,0.55)]

            sm:rounded-[28px]
          "
        >
          {/* ===============================================
              SLIDER
          ================================================ */}

          <div
            ref={sliderRef}
            role="region"
            aria-roledescription="carousel"
            aria-label="Selected Sofa N More projects"
            tabIndex={0}
            onKeyDown={
              handleKeyDown
            }
            onPointerDown={
              handlePointerDown
            }
            onPointerMove={
              handlePointerMove
            }
            onPointerUp={
              finishPointerDrag
            }
            onPointerCancel={
              finishPointerDrag
            }
            className={`
              flex

              gap-2.5

              overflow-x-auto
              overflow-y-hidden

              rounded-[20px]

              [scrollbar-width:none]

              [&::-webkit-scrollbar]:hidden

              ${
                isDragging
                  ? `
                    cursor-grabbing
                    select-none
                  `
                  : `
                    cursor-grab
                  `
              }

              ${
                isDragging ||
                isAnimating
                  ? `
                    snap-none
                  `
                  : `
                    snap-x
                    snap-mandatory
                  `
              }
            `}
          >
            {projects.map(
              (
                project,
                index,
              ) => (
                <ProjectSlide
                  key={
                    project.id
                  }
                  project={
                    project
                  }
                  index={index}
                  priority={
                    index === 0
                  }
                  active={
                    index ===
                    activeIndex
                  }
                  dragging={
                    isDragging
                  }
                />
              ),
            )}
          </div>
        </div>

        {/* =================================================
            FLOATING NAVIGATION

            Inside image area visually,
            but independent from slides.
        ================================================== */}

        {hasMultiple && (
          <div
            className="
              absolute

              right-3
              top-3

              z-20

              sm:right-4
              sm:top-4
            "
          >
            <div
              className="
                flex
                items-center

                gap-1

                rounded-[15px]

                border
                border-white/80

                bg-[#F1E8DC]

                p-[4px]

                shadow-[0_5px_14px_rgba(55,39,24,0.12),inset_1px_1px_1px_rgba(255,255,255,0.9)]
              "
            >
              <SliderControl
                label="Previous project"
                onClick={
                  goPrevious
                }
                disabled={
                  activeIndex ===
                  0
                }
              >
                <ArrowLeft
                  size={14}
                  strokeWidth={
                    1.7
                  }
                />
              </SliderControl>

              <span
                aria-hidden
                className="
                  h-5
                  w-px

                  bg-[var(--brand-navy)]/10
                "
              />

              <SliderControl
                label="Next project"
                onClick={
                  goNext
                }
                disabled={
                  activeIndex ===
                  projects.length -
                    1
                }
                featured
              >
                <ArrowRight
                  size={14}
                  strokeWidth={
                    1.7
                  }
                />
              </SliderControl>
            </div>
          </div>
        )}
      </div>

      {/* ===================================================
          BOTTOM STATUS
      ==================================================== */}

      <div
        className="
          mt-5

          flex
          items-center
          justify-between

          gap-4

          px-1

          sm:mt-6
          sm:px-2
        "
      >
        {/* ===============================================
            COUNTER + PROGRESS
        ================================================ */}

        <div
          className="
            flex
            min-w-0
            flex-1

            items-center

            gap-3
          "
        >
          <span
            className="
              shrink-0

              font-brand-sans

              text-[13px]
              font-bold

              tracking-[0.09em]

              text-[var(--brand-navy)]
            "
          >
            {String(
              activeIndex + 1,
            ).padStart(
              2,
              "0",
            )}

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
              {String(
                projects.length,
              ).padStart(
                2,
                "0",
              )}
            </span>
          </span>

          <div
            className="
              relative

              h-[4px]
              max-w-[250px]
              flex-1

              overflow-hidden

              rounded-full

              bg-[#DDD3C6]

              shadow-[inset_1px_1px_2px_rgba(76,54,31,0.09)]
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
                width: `${
                  ((activeIndex +
                    1) /
                    projects.length) *
                  100
                }%`,
              }}
            />
          </div>
        </div>

        {/* ===============================================
            DESKTOP DRAG HINT
        ================================================ */}

        {hasMultiple && (
          <div
            className="
              hidden

              shrink-0

              items-center

              gap-1.5

              font-brand-sans

              text-[13px]
              font-bold
              uppercase

              tracking-[0.08em]

              text-[var(--brand-navy)]/70

              lg:flex
            "
          >
            <GripHorizontal
              size={12}
              strokeWidth={1.5}
            />

            
          </div>
        )}
      </div>

      {/* ===================================================
          MOBILE DOTS
      ==================================================== */}

      {hasMultiple && (
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
          {projects.map(
            (
              project,
              index,
            ) => {
              const active =
                index ===
                activeIndex;

              return (
                <button
                  key={
                    project.id
                  }
                  type="button"
                  aria-label={`Go to project ${
                    index + 1
                  }`}
                  aria-current={
                    active
                      ? "true"
                      : undefined
                  }
                  onClick={() =>
                    animateToIndex(
                      index,
                    )
                  }
                  className={`
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center

                    rounded-full

                    transition-colors
                    duration-200
                  `}
                >
                  <span
                    aria-hidden
                    className={`
                      rounded-full

                      transition-[width,background-color]
                      duration-200

                      ${
                        active
                          ? `
                            h-[6px]
                            w-7
                            bg-[var(--brand-gold)]
                          `
                          : `
                            h-[7px]
                            w-[7px]
                            bg-[var(--brand-navy)]/28
                          `
                      }
                    `}
                  />
                </button>
              );
            },
          )}
        </div>
      )}
    </div>
  );
}

/* =========================================================
   PROJECT SLIDE
========================================================= */

function ProjectSlide({
  project,
  index,
  priority,
  active,
  dragging,
}: {
  project: ProjectSliderItem;

  index: number;

  priority: boolean;

  active: boolean;

  dragging: boolean;
}) {
  return (
    <article
      data-project-slide
      aria-label={`Project ${project.projectCode}: ${project.title}`}
      className="
        group

        relative

        flex

        min-w-[82%]

        snap-start

        flex-col

        overflow-hidden

        rounded-[18px]

        border
        border-white/80

        bg-[#F7F1E8]

        shadow-[0_4px_12px_rgba(75,53,30,0.055)]

        sm:min-w-[58%]
        sm:rounded-[22px]

        lg:min-w-[42%]

        xl:min-w-[36%]
      "
    >
      {/* =================================================
          IMAGE

          NO black background.
          NO dark full-card overlay.
      ================================================== */}

      <div
        className="
          relative

          aspect-[16/11]

          shrink-0

          overflow-hidden

          bg-[#DED4C7]

          sm:aspect-[16/10]

          lg:aspect-[6/4]
        "
      >
        <Image
          src={project.coverImageUrl}
          alt={project.title}
          fill
          priority={priority}
          draggable={false}
          quality={78}
          sizes="(max-width: 639px) 82vw, (max-width: 1023px) 58vw, (max-width: 1279px) 42vw, 36vw"
          className={`
            pointer-events-none

            select-none

            object-contain
            object-center

            transition-[transform,opacity]
            duration-500
            ease-out

            ${
              active
                ? "opacity-100"
                : "opacity-[0.96]"
            }

            ${
              !dragging
                ? `
                  lg:group-hover:scale-[1.01]
                `
                : ""
            }
          `}
        />

        {/* ===============================================
            PROJECT CODE

            Light clay chip instead of dark overlay.
        ================================================ */}

        <div
          className="
            absolute

            left-3
            top-3

            sm:left-4
            sm:top-4
          "
        >
          <span
            className="
              inline-flex
              h-8

              items-center

              gap-1.5

              rounded-[11px]

              border
              border-white/80

              bg-[#FFF8EC]

              px-3

              font-brand-sans

              text-[12px]
              font-bold
              uppercase

              tracking-[0.08em]

              text-[var(--brand-navy)]

              shadow-[0_4px_12px_rgba(0,0,0,0.16),inset_1px_1px_1px_rgba(255,255,255,0.9)]
            "
          >
            <Hash
              size={9}
              strokeWidth={1.7}
              className="
                text-[var(--brand-gold-700)]
              "
            />

            {
              project.projectCode
            }
          </span>
        </div>
      </div>

      {/* =================================================
          CONTENT SURFACE
      ================================================== */}

      <div
        className="
          flex
          flex-1
          flex-col

          px-3.5
          pb-3.5
          pt-3.5

          sm:px-5
          sm:pb-4

          lg:px-5
          lg:pb-5
          lg:pt-4
        "
      >
        {/* ===============================================
            SERVICE + LOCATION
        ================================================ */}

        <div
          className="
            flex
            flex-wrap

            items-center

            gap-x-3
            gap-y-1.5
          "
        >
          {project.serviceLabel && (
            <span
              className="
                font-brand-sans

                text-[11px]
                font-bold
                uppercase

                tracking-[0.09em]

                text-[#7a4b08]
              "
            >
              {
                project.serviceLabel
              }
            </span>
          )}

          {project.locationLabel && (
            <>
              <span
                aria-hidden
                className="
                  h-1
                  w-1

                  rounded-full

                  bg-[var(--brand-navy)]/15
                "
              />

              <span
                className="
                  inline-flex
                  items-center

                  gap-1

                  font-brand-sans

                  text-[11px]
                  font-bold

                  text-[var(--brand-navy)]
                "
              >
                <MapPin
                  size={9}
                  strokeWidth={1.5}
                  className="
                    text-[var(--brand-gold-700)]
                  "
                />

                {
                  project.locationLabel
                }
              </span>
            </>
          )}
        </div>

        {/* TITLE */}

        <h3
          className="
            mt-2

            line-clamp-1

            font-brand-display

            text-[21px]
            font-medium
            leading-[1.08]

            tracking-[-0.03em]

            text-[var(--brand-navy)]

 
            lg:text-[22px]
          "
        >
          {project.title}
        </h3>

        {/* EXCERPT */}

        <p
          className="
            mt-2.5

            line-clamp-2

            max-w-[590px]

            font-brand-sans

            text-[11px]
            font-medium
            leading-[1.75]

            text-[var(--brand-text-muted)]

            sm:text-[13px]

            lg:text-[12px]
          "
        >
          {project.excerpt}
        </p>

        {/* ===============================================
            CARD FOOTER
        ================================================ */}

        <div
          className="
            mt-auto

            flex
            min-h-[42px]

            items-end
            justify-between

            gap-3

            border-t
            border-[var(--brand-navy)]/[0.065]

            pt-4
          "
        >
          <span
            className="
              font-brand-sans

              text-[13px]
              font-bold
              uppercase

              tracking-[0.08em]

              text-[var(--brand-navy)]/72
            "
          >
            Project{" "}
            {String(
              index + 1,
            ).padStart(
              2,
              "0",
            )}
          </span>

          {project.slug ? (
            <Link
              href={`/projects/${project.slug}`}
              draggable={false}
              onPointerDown={(event) => {
                event.stopPropagation();
              }}
              onClick={(event) => {
                event.stopPropagation();
              }}
              className="
                inline-flex
                min-h-11
                items-center

                gap-1.5

                rounded-full

                px-1.5

                font-brand-sans

                text-[13px]
                font-bold
                uppercase

                tracking-[0.08em]

                text-[var(--brand-navy)]

                transition-colors
                duration-150

                hover:text-[var(--brand-gold-700)]

                focus-visible:outline-2
                focus-visible:outline-offset-2
                focus-visible:outline-[var(--brand-gold)]
              "
            >
              View Project

              <ArrowUpRight
                size={11}
                strokeWidth={1.7}
                className="
                  text-[var(--brand-gold-700)]
                "
              />
            </Link>
          ) : (
            <span
              className="
                font-brand-sans

                text-[13px]
                font-bold
                uppercase

                tracking-[0.08em]

                text-[var(--brand-gold-700)]
              "
            >
              Selected Work
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   NAVIGATION CONTROL
========================================================= */

function SliderControl({
  label,
  onClick,
  children,
  disabled = false,
  featured = false,
}: {
  label: string;

  onClick: () => void;

  children: ReactNode;

  disabled?: boolean;

  featured?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={`
        flex

        h-9
        w-9

        items-center
        justify-center

        rounded-[11px]

        border

        transition-[transform,background-color,color,opacity]
        duration-100

        active:scale-[0.93]

        disabled:cursor-default
        disabled:opacity-30

        ${
          featured
            ? `
              border-[var(--brand-navy)]/80

              bg-[var(--brand-navy)]

              text-[var(--brand-gold)]
            `
            : `
              border-white/80

              bg-[#F7F0E6]

              text-[var(--brand-navy)]
            `
        }
      `}
    >
      {children}
    </button>
  );
}
