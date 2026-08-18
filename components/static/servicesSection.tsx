"use client";

import Image from "next/image";
import Link from "next/link";

import { ChevronLeft, ChevronRight, MoveRight } from "lucide-react";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import type { PointerEvent as ReactPointerEvent } from "react";

/* =========================================================
   TYPES
========================================================= */

type Service = {
  title: string;
  shortDescription: string;
  cta: string;
  image: string;
  href: string;
};

type Position = -2 | -1 | 0 | 1 | 2;

type SlotElements = {
  layout: HTMLDivElement;
  motion: HTMLDivElement;
  resize: HTMLDivElement;
  scale: HTMLDivElement;
};

type MotionSnapshot = {
  rect: DOMRect;
  opacity: number;
  position: Position;
};

const CAROUSEL_DURATION = 540;

const CAROUSEL_EASING = "cubic-bezier(0.16, 1, 0.3, 1)";

/* Finish resizing before translation settles to avoid a late size change. */
const CAROUSEL_RESIZE_DURATION = 340;

const CAROUSEL_RESIZE_EASING = "cubic-bezier(0.22, 1, 0.36, 1)";

/* =========================================================
   DATA
========================================================= */

const services: Service[] = [
  {
    title: "Bespoke sofa",
    shortDescription:
      "Made-to-measure sofa handcrafted in London, tailored to your space and style.",
    cta: "Explore Bespoke",
    image: "/assets/images/bespokesofa.webp",
    href: "/services/bespoke-sofas",
  },

  {
    title: "Repair & Restoration",
    shortDescription:
      "Expert care and reupholstery that gives treasured sofa new life while preserving its character.",
    cta: "Explore Restoration",
    image: "/assets/images/Repair.webp",
    href: "/services/sofa-repair-restoration",
  },

  {
    title: "All Services",
    shortDescription:
      "",
    cta: "Explore Our Services",
    image: "/assets/images/Staging.webp",
    href: "/services",
  },

  {
    title: "Interior Design",
    shortDescription:
      "Tailored residential and commercial interiors combining elegant design, functionality and craftsmanship.",
    cta: "Explore Interiors",
    image: "/assets/images/Interior.webp",
    href: "/services/interior-design",
  },

  {
    title: "Commercial sofa",
    shortDescription:
      "Premium ergonomic sofa solutions designed for stylish, functional and productive workspaces.",
    cta: "Explore Office sofa",
    image: "/assets/images/Office.webp",
    href: "/services/commercial-sofas",
  },
];

/* =========================================================
   HELPERS
========================================================= */

function wrapIndex(index: number) {
  return (index + services.length) % services.length;
}

function getPosition(index: number, activeIndex: number): Position {
  let difference = index - activeIndex;

  if (difference > 2) {
    difference -= services.length;
  }

  if (difference < -2) {
    difference += services.length;
  }

  return difference as Position;
}

function shouldIgnoreDragStart(target: EventTarget | null) {
  return target instanceof Element && Boolean(target.closest("[data-no-drag]"));
}

/* =========================================================
   ROOT
========================================================= */

export default function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(2);

  const [isDragging, setIsDragging] = useState(false);

  const [motionRevision, setMotionRevision] = useState(0);

  const stageRef = useRef<HTMLDivElement>(null);

  const cardsTrackRef = useRef<HTMLDivElement>(null);

  const slotElementsRef = useRef(new Map<number, SlotElements>());

  const motionSnapshotRef = useRef(new Map<number, MotionSnapshot>());

  const dragFrameRef = useRef<number | null>(null);

  const pendingDragXRef = useRef(0);

  const pointerRef = useRef<{
    id: number;
    startX: number;
    startTime: number;
  } | null>(null);

  const suppressClickRef = useRef(false);

  const suppressClickTimerRef = useRef<number | null>(null);

  const positionedServices = useMemo(
    () =>
      services.map((service, index) => ({
        service,
        index,
        position: getPosition(index, activeIndex),
      })),
    [activeIndex],
  );

  const registerSlot = useCallback(
    (index: number, elements: SlotElements | null) => {
      if (elements) {
        slotElementsRef.current.set(index, elements);
      } else {
        slotElementsRef.current.delete(index);
      }
    },
    [],
  );

  useEffect(() => {
    const slotElements = slotElementsRef.current;

    return () => {
      if (dragFrameRef.current !== null) {
        cancelAnimationFrame(dragFrameRef.current);
      }

      if (suppressClickTimerRef.current !== null) {
        window.clearTimeout(suppressClickTimerRef.current);
      }

      slotElements.forEach(({ motion, resize }) => {
        motion.getAnimations().forEach((animation) => animation.cancel());
        resize.getAnimations().forEach((animation) => animation.cancel());
      });
    };
  }, []);

  /* =======================================================
     GPU MOTION / FLIP ENGINE
  ======================================================== */

  function commitDragX(value: number) {
    pendingDragXRef.current = value;

    if (dragFrameRef.current !== null) {
      cancelAnimationFrame(dragFrameRef.current);
      dragFrameRef.current = null;
    }

    if (cardsTrackRef.current) {
      cardsTrackRef.current.style.transform = `translate3d(${value}px, 0, 0)`;
    }
  }

  function scheduleDragX(value: number) {
    pendingDragXRef.current = value;

    if (dragFrameRef.current !== null) {
      return;
    }

    dragFrameRef.current = requestAnimationFrame(() => {
      dragFrameRef.current = null;

      if (cardsTrackRef.current) {
        cardsTrackRef.current.style.transform = `translate3d(${pendingDragXRef.current}px, 0, 0)`;
      }
    });
  }

  function pauseMotionAnimations() {
    slotElementsRef.current.forEach(({ motion, resize }) => {
      motion.getAnimations().forEach((animation) => {
        if (animation.playState === "running") {
          animation.pause();
        }
      });

      resize.getAnimations().forEach((animation) => {
        if (animation.playState === "running") {
          animation.pause();
        }
      });
    });
  }

  function captureMotionSnapshot() {
    const snapshot = new Map<number, MotionSnapshot>();

    slotElementsRef.current.forEach(({ layout, scale }, index) => {
      snapshot.set(index, {
        rect: scale.getBoundingClientRect(),
        opacity: Number.parseFloat(getComputedStyle(layout).opacity) || 0,
        position: getPosition(index, activeIndex),
      });
    });

    /*
     * Measure first, then cancel. The next layout effect starts
     * a new animation from the exact on-screen position, so rapid
     * clicks never stack several transitions on top of each other.
     */
    slotElementsRef.current.forEach(({ motion, resize }) => {
      motion.getAnimations().forEach((animation) => animation.cancel());
      resize.getAnimations().forEach((animation) => animation.cancel());
    });

    motionSnapshotRef.current = snapshot;
  }

  function animateTo(index: number) {
    captureMotionSnapshot();

    /*
     * Drag reset is immediate. FLIP recreates the current visual
     * position and performs one single compositor-only animation.
     */
    commitDragX(0);

    setActiveIndex(wrapIndex(index));
    setMotionRevision((current) => current + 1);
  }

  useLayoutEffect(() => {
    const snapshot = motionSnapshotRef.current;

    if (snapshot.size === 0) {
      return;
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    positionedServices.forEach(({ index, position }) => {
      const previous = snapshot.get(index);
      const elements = slotElementsRef.current.get(index);

      if (!previous || !elements) {
        return;
      }

      const finalRect = elements.scale.getBoundingClientRect();

      if (finalRect.width === 0 || finalRect.height === 0) {
        return;
      }

      const previousCenterX = previous.rect.left + previous.rect.width / 2;
      const previousCenterY = previous.rect.top + previous.rect.height / 2;
      const finalCenterX = finalRect.left + finalRect.width / 2;
      const finalCenterY = finalRect.top + finalRect.height / 2;

      const deltaX = previousCenterX - finalCenterX;
      const deltaY = previousCenterY - finalCenterY;

      const startResizeX = previous.rect.width / finalRect.width;
      const startResizeY = previous.rect.height / finalRect.height;

      if (!Number.isFinite(startResizeX) || !Number.isFinite(startResizeY)) {
        return;
      }

      /*
       * FLIP owns translation only. The nested scale layer keeps its
       * Tailwind transform untouched, so animation cleanup can never
       * reveal a slightly different scale at the end of the movement.
       */
      const startTransform = `translate3d(${deltaX}px, ${deltaY}px, 0)`;
      const endTransform = "translate3d(0, 0, 0)";

      const hasTranslation =
        Math.abs(deltaX) > 0.5 ||
        Math.abs(deltaY) > 0.5 ||
        Math.abs(previous.opacity - 1) > 0.01;

      const hasResize =
        Math.abs(startResizeX - 1) > 0.002 ||
        Math.abs(startResizeY - 1) > 0.002;

      if (reduceMotion || (!hasTranslation && !hasResize)) {
        return;
      }

      const crossesLoopBoundary = Math.abs(previous.position - position) >= 3;

      if (hasTranslation) {
        const keyframes: Keyframe[] = crossesLoopBoundary
          ? [
              {
                transform: startTransform,
                opacity: previous.opacity,
                offset: 0,
              },
              {
                transform: `translate3d(${deltaX + (previous.position < 0 ? -64 : 64)}px, ${deltaY}px, 0)`,
                opacity: 0,
                offset: 0.28,
              },
              {
                transform: `translate3d(${position < 0 ? -64 : 64}px, 0, 0)`,
                opacity: 0,
                offset: 0.32,
              },
              {
                transform: endTransform,
                opacity: 1,
                offset: 1,
              },
            ]
          : [
              {
                transform: startTransform,
                opacity: previous.opacity,
              },
              {
                transform: endTransform,
                opacity: 1,
              },
            ];

        const translationAnimation = elements.motion.animate(keyframes, {
          duration: CAROUSEL_DURATION,
          easing: CAROUSEL_EASING,
          fill: "both",
        });

        translationAnimation.addEventListener(
          "finish",
          () => {
            /* Translation returns to the static identity transform. */
            translationAnimation.cancel();
          },
          { once: true },
        );
      }

      if (hasResize) {
        const resizeAnimation = elements.resize.animate(
          [
            {
              transform: `scale3d(${startResizeX}, ${startResizeY}, 1)`,
            },
            {
              transform: "scale3d(1, 1, 1)",
            },
          ],
          {
            duration: CAROUSEL_RESIZE_DURATION,
            easing: CAROUSEL_RESIZE_EASING,
            fill: "both",
          },
        );

        resizeAnimation.addEventListener(
          "finish",
          () => {
            /* The final static transform is identity on this layer. */
            resizeAnimation.cancel();
          },
          { once: true },
        );
      }
    });

    motionSnapshotRef.current = new Map();
  }, [motionRevision, positionedServices]);

  /* =======================================================
     NAVIGATION
  ======================================================== */

  function goNext() {
    animateTo(activeIndex + 1);
  }

  function goPrev() {
    animateTo(activeIndex - 1);
  }

  function goTo(index: number) {
    if (index !== activeIndex) {
      animateTo(index);
    }
  }

  /* =======================================================
     DRAG ENGINE
  ======================================================== */

  function getResistedDrag(deltaX: number) {
    const stageWidth = stageRef.current?.clientWidth ?? 400;
    const resistanceDistance = Math.max(180, stageWidth * 0.55);

    return deltaX / (1 + Math.abs(deltaX) / resistanceDistance);
  }

  function handlePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }

    if (shouldIgnoreDragStart(event.target)) {
      return;
    }

    pauseMotionAnimations();

    pointerRef.current = {
      id: event.pointerId,
      startX: event.clientX,
      startTime: event.timeStamp,
    };

    event.currentTarget.setPointerCapture(event.pointerId);

    commitDragX(0);

    setIsDragging(true);
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    const pointer = pointerRef.current;

    if (!pointer || pointer.id !== event.pointerId) {
      return;
    }

    const deltaX = event.clientX - pointer.startX;

    /* Coalesce high-frequency pointer events into one GPU update per frame. */
    scheduleDragX(getResistedDrag(deltaX));
  }

  function finishDrag(
    event: ReactPointerEvent<HTMLDivElement>,
    cancelled = false,
  ) {
    const pointer = pointerRef.current;

    if (!pointer || pointer.id !== event.pointerId) {
      return;
    }

    const deltaX = event.clientX - pointer.startX;
    const elapsed = Math.max(event.timeStamp - pointer.startTime, 1);
    const velocity = deltaX / elapsed;
    const stageWidth = stageRef.current?.clientWidth ?? 400;
    const threshold = Math.min(90, Math.max(38, stageWidth * 0.08));
    const dragged = Math.abs(deltaX) > 8;

    /* Make sure the final pointer coordinate is included in the snapshot. */
    commitDragX(getResistedDrag(deltaX));

    if (dragged) {
      suppressClickRef.current = true;

      if (suppressClickTimerRef.current !== null) {
        window.clearTimeout(suppressClickTimerRef.current);
      }

      suppressClickTimerRef.current = window.setTimeout(() => {
        suppressClickRef.current = false;
        suppressClickTimerRef.current = null;
      }, 300);
    }

    let nextIndex = activeIndex;

    if (!cancelled) {
      if (deltaX < -threshold || velocity < -0.55) {
        nextIndex = wrapIndex(activeIndex + 1);
      } else if (deltaX > threshold || velocity > 0.55) {
        nextIndex = wrapIndex(activeIndex - 1);
      }
    }

    pointerRef.current = null;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    setIsDragging(false);

    /* Also animates a short drag back to the current card when no slide wins. */
    animateTo(nextIndex);
  }

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="
        relative
        overflow-hidden
        bg-[var(--brand-ivory)]
        px-0
        pt-14

 
        lg:pt-16
      "
    >
      <ServicesBackground />

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-[var(--site-width)]
        "
      >
        <ServicesHeader />

        {/* =============================================
            STAGE
        ============================================== */}

        <div
          ref={stageRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={(event) => finishDrag(event)}
          onPointerCancel={(event) => finishDrag(event, true)}
          onClickCapture={(event) => {
            if (suppressClickRef.current) {
              event.preventDefault();
              event.stopPropagation();

              suppressClickRef.current = false;

              if (suppressClickTimerRef.current !== null) {
                window.clearTimeout(suppressClickTimerRef.current);
                suppressClickTimerRef.current = null;
              }
            }
          }}
          className={`
            relative
            mt-8
            h-[580px]
            w-full
            overflow-hidden
            overscroll-x-contain
            select-none
            touch-pan-y

            lg:h-[470px]

            ${isDragging ? "cursor-grabbing" : "lg:cursor-grab"}
          `}
        >
          <div
            ref={cardsTrackRef}
            className="
              absolute
              inset-0
              transform-gpu
              will-change-transform
              [backface-visibility:hidden]
            "
          >
            {positionedServices.map(({ service, index, position }) => (
              <CarouselSlot
                key={service.title}
                service={service}
                serviceIndex={index}
                position={position}
                onRegister={registerSlot}
                onSelect={() => goTo(index)}
              />
            ))}
          </div>

          {/* DESKTOP PREV */}

          <button
            type="button"
            data-no-drag
            onPointerDown={(event) => event.stopPropagation()}
            onClick={goPrev}
            aria-label="Previous service"
            className="
              clay-icon
              absolute
              left-[2%]
              top-[45%]
              z-50
              hidden
              h-[56px]
              w-[56px]
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              text-[var(--brand-gold-700)]
              transition-transform
              duration-300
              hover:-translate-y-[calc(50%+3px)]

              lg:flex
            "
          >
            <ChevronLeft size={21} strokeWidth={1.6} />
          </button>

          {/* DESKTOP NEXT */}

          <button
            type="button"
            data-no-drag
            onPointerDown={(event) => event.stopPropagation()}
            onClick={goNext}
            aria-label="Next service"
            className="
              clay-icon
              absolute
              right-[2%]
              top-[45%]
              z-50
              hidden
              h-[56px]
              w-[56px]
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              text-[var(--brand-gold-700)]
              transition-transform
              duration-300
              hover:-translate-y-[calc(50%+3px)]

              lg:flex
            "
          >
            <ChevronRight size={21} strokeWidth={1.6} />
          </button>
        </div>

        <Pagination activeIndex={activeIndex} onChange={goTo} />
      </div>
    </section>
  );
}

/* =========================================================
   HEADER
========================================================= */

function ServicesHeader() {
  return (
    <div
      className="
        relative
        z-20
        mx-auto
        max-w-[720px]
        px-6
        text-center
      "
    >
      <div
        className="
          mb-3
          flex
          items-center
          justify-center
          gap-3
        "
      >
        <span
          className="
            hidden
            h-1
            w-1
            rounded-full
            bg-[var(--brand-gold)]

            sm:block
          "
        />

        <span
          className="
            font-brand-sans
            text-[9px]
            font-bold
            uppercase
            tracking-[0.30em]
            text-[var(--brand-gold-700)]

            sm:text-[10px]

            lg:text-[11px]
          "
        >
          Our Services
        </span>

        <span
          className="
            hidden
            h-1
            w-1
            rounded-full
            bg-[var(--brand-gold)]

            sm:block
          "
        />
      </div>

      <h2
        id="services-heading"
        className="
          font-brand-display
          text-[35px]
          font-semibold
          leading-[0.98]
          tracking-[-0.035em]
          text-[var(--brand-navy)]

          sm:text-[42px]

          lg:text-[50px]

          xl:text-[54px]
        "
      >
        Expertise for
        <br className="sm:hidden" />
        <span className="sm:ml-[0.22em]">Every Space</span>
        <span className="text-[var(--brand-gold)]">.</span>
      </h2>

      <p
        className="
          mx-auto
          mt-4
          max-w-[620px]
          font-brand-sans
          text-[11px]
          font-medium
          leading-[1.55]
          text-[var(--brand-text-muted)]

          sm:text-[12px]

          lg:text-[13px]
        "
      >
        From bespoke sofa to complete interiors and expert restoration, discover
        services crafted around the way you live and work.
      </p>
    </div>
  );
}

/* =========================================================
   SLOT
========================================================= */

function CarouselSlot({
  service,
  serviceIndex,
  position,
  onRegister,
  onSelect,
}: {
  service: Service;
  serviceIndex: number;
  position: Position;
  onRegister: (index: number, elements: SlotElements | null) => void;
  onSelect: () => void;
}) {
  const layoutRef = useRef<HTMLDivElement>(null);

  const motionRef = useRef<HTMLDivElement>(null);

  const resizeRef = useRef<HTMLDivElement>(null);

  const scaleRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const layout = layoutRef.current;
    const motion = motionRef.current;
    const resize = resizeRef.current;
    const scale = scaleRef.current;

    if (!layout || !motion || !resize || !scale) {
      return;
    }

    onRegister(serviceIndex, { layout, motion, resize, scale });

    return () => {
      onRegister(serviceIndex, null);
    };
  }, [onRegister, serviceIndex]);

  return (
    <div
      ref={layoutRef}
      className={`
        absolute
        transition-opacity
        duration-300
        ease-out

        ${getSlotClasses(position)}
      `}
    >
      {/* FLIP TRANSLATION LAYER */}

      <div
        ref={motionRef}
        className="
          h-full
          w-full
          transform-gpu
          will-change-transform
          [backface-visibility:hidden]
        "
      >
        {/*
         * RESIZE CORRECTION LAYER
         *
         * Geometry changes finish earlier than the slide translation, so a
         * card never keeps growing after it has visually reached its slot.
         */}
        <div
          ref={resizeRef}
          className="
            w-full
            origin-center
            transform-gpu
            will-change-transform
            [backface-visibility:hidden]
          "
        >
          {/*
           * STATIC SCALE LAYER
           *
           * Tailwind owns this transform permanently. FLIP never replaces
           * it, so cancelling an animation cannot cause a final scale pop.
           */}
          <div
            ref={scaleRef}
            className={`
              w-full
              origin-center
              transform-gpu
              transition-none
              [backface-visibility:hidden]

              ${getSlotScaleClasses(position)}
            `}
          >
            <ServiceCard
              service={service}
              serviceIndex={serviceIndex}
              position={position}
              onSelect={onSelect}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   SLOT POSITIONING
========================================================= */

function getSlotClasses(position: Position) {
  switch (position) {
    case 0:
      return `
        left-[5%]
        top-0
        z-30
        h-[550px]
        w-[82%]
        opacity-100

        lg:left-[38%]
        lg:top-0
        lg:h-[515px]
        lg:w-[24%]
      `;

    case -1:
      return `
        -left-[78%]
        top-[18px]
        z-20
        h-[535px]
        w-[82%]
        opacity-100

        lg:left-[18%]
        lg:top-[30px]
        lg:h-[460px]
        lg:w-[22%]
      `;

    case 1:
      return `
        left-[90%]
        top-[18px]
        z-20
        h-[535px]
        w-[82%]
        opacity-100

        lg:left-[60%]
        lg:top-[30px]
        lg:h-[460px]
        lg:w-[22%]
      `;

    case -2:
      return `
        -left-[170%]
        top-[35px]
        z-10
        h-[500px]
        w-[82%]
        opacity-0

        lg:left-[4%]
        lg:top-[65px]
        lg:h-[390px]
        lg:w-[15%]
        lg:opacity-100
      `;

    case 2:
      return `
        left-[180%]
        top-[35px]
        z-10
        h-[500px]
        w-[82%]
        opacity-0

        lg:left-[81%]
        lg:top-[65px]
        lg:h-[390px]
        lg:w-[15%]
        lg:opacity-100
      `;
  }
}

function getSlotScaleClasses(position: Position) {
  switch (position) {
    case 0:
      return "scale-100";

    case -1:
    case 1:
      return "scale-[0.98] lg:scale-[0.96]";

    case -2:
    case 2:
      return "scale-[0.94] lg:scale-[0.9]";
  }
}

/* =========================================================
   CARD
========================================================= */

function ServiceCard({
  service,
  serviceIndex,
  position,
  onSelect,
}: {
  service: Service;
  serviceIndex: number;
  position: Position;
  onSelect: () => void;
}) {
  const isActive = position === 0;

  const isSide = Math.abs(position) === 1;

  const isEdge = Math.abs(position) === 2;

  return (
    <article
      onDoubleClick={onSelect}
      className="
        clay-surface-strong
        flex
        h-fit
        w-full
        flex-col
        overflow-hidden
        rounded-[30px]
        p-[8px]

        lg:rounded-[28px]
      "
    >
      {/* =============================================
          IMAGE
      ============================================== */}

      <button
        type="button"
        onClick={() => {
          if (!isActive) {
            onSelect();
          }
        }}
        aria-label={`Select ${service.title}`}
        className={`
          clay-inset
          relative
          shrink-0
          overflow-hidden
          p-[5px]

          h-[295px]
          rounded-[25px]

          ${
            isActive ? "lg:h-[205px]" : isSide ? "lg:h-[175px]" : "lg:h-[135px]"
          }

          ${isActive ? "lg:rounded-[24px]" : "lg:rounded-[21px]"}
        `}
      >
        <div
          className={`
            relative
            h-full
            overflow-hidden
            rounded-[20px]

            ${isActive ? "ring-1 ring-[var(--brand-gold)]/60" : ""}
          `}
        >
          <Image
            src={service.image}
            alt={service.title}
            fill
            draggable={false}
            sizes="(max-width: 1023px) 82vw, (max-width: 1400px) 24vw, 360px"
            className="
              pointer-events-none
              object-cover
              object-center
            "
          />
        </div>
      </button>

      {/* =============================================
          CONTENT
      ============================================== */}

      <div
        className="
          flex
          min-h-0
          flex-1
          flex-col
          px-4
          pb-4
          pt-4

          lg:px-3
          lg:pb-3
          lg:pt-3

          xl:px-4
          xl:pb-4
        "
      >
        {/* NUMBER */}

        <div
          className="
            flex
            items-center
            gap-2
          "
        >
          <span
            className={`
              font-brand-display
              font-medium
              text-[var(--brand-gold-700)]

              ${
                isActive
                  ? "text-[17px]"
                  : isSide
                    ? "text-[14px]"
                    : "text-[10px]"
              }
            `}
          >
            {String(serviceIndex + 1).padStart(2, "0")}
          </span>

          <span
            className={`
              h-px
              bg-[var(--brand-gold)]

              ${isActive ? "w-7" : isSide ? "w-5" : "w-3"}
            `}
          />
        </div>

        {/* TITLE */}

        <h3
          className={`
            mt-1
            font-brand-display
            font-semibold
            leading-[1.02]
            tracking-[-0.025em]
            text-[var(--brand-navy)]

            text-[24px]

            ${
              isActive
                ? "lg:text-[27px] xl:text-[30px]"
                : isSide
                  ? "lg:text-[20px] xl:text-[22px]"
                  : "lg:text-[13px] xl:text-[14px]"
            }
          `}
        >
          {service.title}
        </h3>

        {/* DESCRIPTION */}

        <p
          className={`
            mt-3
            font-brand-sans
            font-medium
            leading-[1.55]
            text-[var(--brand-text-muted)]

            text-[10px]

            ${
              isActive
                ? "lg:text-[11px]"
                : isSide
                  ? "lg:text-[9px]"
                  : "lg:line-clamp-3 lg:text-[7px]"
            }
          `}
        >
          {service.shortDescription}
        </p>

        <div
          className="
           
            pt-4
          "
        >
          <div
            className="
              mb-3
              h-px
              w-10
              bg-[var(--brand-gold)]/50
            "
          />

          <div
            className="
              flex
              items-center
              justify-between
              gap-2
            "
          >
            <Link
              href={service.href}
              className={`
                font-brand-display
                font-semibold
                text-[var(--brand-navy)]
                transition-colors
                hover:text-[var(--brand-gold-700)]

                ${
                  isActive
                    ? "text-[11px]"
                    : isSide
                      ? "text-[9px]"
                      : "text-[7px]"
                }
              `}
            >
              {isEdge ? "Explore Service" : service.cta}
            </Link>

            <Link
              href={service.href}
              aria-label={service.cta}
              className={`
                clay-icon
                flex
                shrink-0
                items-center
                justify-center
                rounded-full
                text-[var(--brand-gold-700)]

                ${isActive ? "h-11 w-11" : isSide ? "h-9 w-9" : "h-7 w-7"}
              `}
            >
              <MoveRight
                size={isActive ? 15 : isSide ? 13 : 10}
                strokeWidth={1.7}
              />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   PAGINATION
========================================================= */

function Pagination({
  activeIndex,
  onChange,
}: {
  activeIndex: number;
  onChange: (index: number) => void;
}) {
  return (
    <div
      className="
        relative
        z-20
        mt-1
        flex
        items-center
        justify-center
         

        lg:mt-3
      "
    >
      {services.map((service, index) => {
        const active = index === activeIndex;

        return (
          <button
            key={service.title}
            type="button"
            onClick={() => onChange(index)}
            aria-label={`Show ${service.title}`}
            aria-current={active}
            className={`
                flex h-11 min-w-11 items-center justify-center
                rounded-full
                transition-all
                duration-300
              `}
          >
            <span
              aria-hidden
              className={`
                rounded-full
                transition-all
                duration-300
                ${
                  active
                    ? "h-[5px] w-9 bg-[var(--brand-gold)] shadow-[0_2px_7px_rgba(168,109,31,0.28)]"
                    : "h-[7px] w-[7px] border border-[var(--brand-navy)]/30 bg-[var(--brand-ivory-50)]"
                }
              `}
            />
          </button>
        );
      })}
    </div>
  );
}

/* =========================================================
   FULL SECTION BACKGROUND
========================================================= */

function ServicesBackground() {
  return (
    <div
      aria-hidden
      className="
        pointer-events-none
        absolute
        inset-0
        overflow-hidden
      "
    >
      {/* full ivory wash */}

      <div
        className="
          absolute
          inset-0
          bg-[linear-gradient(180deg,#fffdf8_0%,#f7efe4_48%,#f3eadc_100%)]
        "
      />

      {/* =============================================
          MOBILE CENTRAL ARCH
      ============================================== */}

      <div
        className="
          clay-inset
          absolute
          left-1/2
          top-[-95px]
          h-[390px]
          w-[390px]
          -translate-x-1/2
          rounded-t-[195px]
          opacity-70

          sm:h-[470px]
          sm:w-[470px]
          sm:rounded-t-[235px]

          lg:hidden
        "
      />

      <div
        className="
          absolute
          left-1/2
          top-[-1px]
          h-[320px]
          w-[320px]
          -translate-x-1/2
          rounded-t-[160px]
          border-[18px]
          border-[var(--brand-ivory-50)]
          border-b-0

          sm:h-[390px]
          sm:w-[390px]
          sm:rounded-t-[195px]

          lg:hidden
        "
      />

      {/* =============================================
          DESKTOP LEFT ARCH
      ============================================== */}

      <div
        className="
          absolute
          -left-[105px]
          -top-[120px]
          hidden
          h-[560px]
          w-[350px]
          rounded-t-[180px]
          border-[28px]
          border-[var(--brand-ivory-50)]
          border-b-0
          shadow-[var(--shadow-clay-inset)]

          lg:block
        "
      />

      <div
        className="
          absolute
          -left-[42px]
          -top-[55px]
          hidden
          h-[420px]
          w-[235px]
          rounded-t-[120px]
          border-[18px]
          border-[var(--brand-cream)]
          border-b-0
          opacity-70

          lg:block
        "
      />

      {/* =============================================
          DESKTOP RIGHT ARCH
      ============================================== */}

      <div
        className="
          absolute
          -right-[120px]
          -top-[130px]
          hidden
          h-[575px]
          w-[365px]
          rounded-t-[190px]
          border-[30px]
          border-[var(--brand-ivory-50)]
          border-b-0
          shadow-[var(--shadow-clay-inset)]

          lg:block
        "
      />

      <div
        className="
          absolute
          -right-[45px]
          -top-[55px]
          hidden
          h-[430px]
          w-[235px]
          rounded-t-[120px]
          border-[18px]
          border-[var(--brand-cream)]
          border-b-0
          opacity-70

          lg:block
        "
      />

      {/* =============================================
          RIGHT SPHERE
      ============================================== */}

      <div
        className="
          clay-sphere
          absolute
          right-[1%]
          top-[130px]
          hidden
          h-[145px]
          w-[145px]

          lg:block
        "
      >
        <div className="clay-sphere-shadow" />
        <div className="clay-sphere-ball" />
      </div>

      {/* =============================================
          LEFT LOWER PODIUM
      ============================================== */}

   

     
    </div>
  );
}
