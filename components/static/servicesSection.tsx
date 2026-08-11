"use client";

import Image from "next/image";
import Link from "next/link";

import { ChevronLeft, ChevronRight, MoveRight } from "lucide-react";

import { useMemo, useRef, useState } from "react";

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

/* =========================================================
   DATA
========================================================= */

const services: Service[] = [
  {
    title: "Bespoke Furniture",
    shortDescription:
      "Made-to-measure furniture handcrafted in London, tailored to your space and style.",
    cta: "Explore Bespoke",
    image: "/assets/images/bespokesofa.webp",
    href: "/services/bespoke-furniture",
  },

  {
    title: "Repair & Restoration",
    shortDescription:
      "Expert care and reupholstery that gives treasured furniture new life while preserving its character.",
    cta: "Explore Restoration",
    image: "/assets/images/Repair.webp",
    href: "/services/repair-restoration",
  },

  {
    title: "Home Staging",
    shortDescription:
      "Thoughtfully styled interiors designed to maximise your property's appeal for sale or rental.",
    cta: "Explore Home Staging",
    image: "/assets/images/Staging.webp",
    href: "/services/home-staging",
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
    title: "Office Furniture",
    shortDescription:
      "Premium ergonomic furniture solutions designed for stylish, functional and productive workspaces.",
    cta: "Explore Office Furniture",
    image: "/assets/images/Office.webp",
    href: "/services/office-furniture",
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

  const stageRef = useRef<HTMLDivElement>(null);

  const pointerRef = useRef<{
    id: number;
    startX: number;
    startTime: number;
  } | null>(null);

  const suppressClickRef = useRef(false);

  const positionedServices = useMemo(
    () =>
      services.map((service, index) => ({
        service,
        index,
        position: getPosition(index, activeIndex),
      })),
    [activeIndex],
  );

  /* =======================================================
     NAVIGATION
  ======================================================== */

  function goNext() {
    setActiveIndex((current) => wrapIndex(current + 1));
  }

  function goPrev() {
    setActiveIndex((current) => wrapIndex(current - 1));
  }

  function goTo(index: number) {
    setActiveIndex(index);
  }

  /* =======================================================
     DRAG ENGINE
  ======================================================== */

  function handlePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }

    if (shouldIgnoreDragStart(event.target)) {
      return;
    }

    pointerRef.current = {
      id: event.pointerId,
      startX: event.clientX,
      startTime: performance.now(),
    };

    event.currentTarget.setPointerCapture(event.pointerId);

    stageRef.current?.style.setProperty("--drag-x", "0px");

    setIsDragging(true);
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    const pointer = pointerRef.current;

    if (!pointer || pointer.id !== event.pointerId) {
      return;
    }

    const deltaX = event.clientX - pointer.startX;

    /*
     * No React state update here.
     * Direct CSS variable update keeps drag
     * extremely smooth even on slower devices.
     */

    stageRef.current?.style.setProperty("--drag-x", `${deltaX}px`);
  }

  function finishDrag(
    event: ReactPointerEvent<HTMLDivElement>,
    cancelled = false,
  ) {
    const pointer = pointerRef.current;

    if (!pointer) return;

    const deltaX = event.clientX - pointer.startX;

    const elapsed = Math.max(performance.now() - pointer.startTime, 1);

    const velocity = deltaX / elapsed;

    const stageWidth = stageRef.current?.clientWidth ?? 400;

    const threshold = Math.min(90, Math.max(38, stageWidth * 0.08));

    const dragged = Math.abs(deltaX) > 8;

    if (dragged) {
      suppressClickRef.current = true;

      window.setTimeout(() => {
        suppressClickRef.current = false;
      }, 250);
    }

    if (!cancelled) {
      if (deltaX < -threshold || velocity < -0.55) {
        goNext();
      } else if (deltaX > threshold || velocity > 0.55) {
        goPrev();
      }
    }

    pointerRef.current = null;

    setIsDragging(false);

    /*
     * Wait until transition class is restored,
     * then animate drag offset back to zero.
     */

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        stageRef.current?.style.setProperty("--drag-x", "0px");
      });
    });
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
        py-14

        sm:py-16

        lg:py-16
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
            }
          }}
          className={`
            relative
            mt-8
            h-[580px]
            w-full
            overflow-hidden
            select-none
            touch-pan-y

             
            lg:h-[480px]

          

            ${isDragging ? "cursor-grabbing" : "lg:cursor-grab"}
          `}
        >
          {positionedServices.map(({ service, index, position }) => (
            <CarouselSlot
              key={service.title}
              service={service}
              serviceIndex={index}
              position={position}
              isDragging={isDragging}
              onSelect={() => goTo(index)}
            />
          ))}

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
        From bespoke furniture to complete interiors and expert restoration,
        discover services crafted around the way you live and work.
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
  isDragging,
  onSelect,
}: {
  service: Service;
  serviceIndex: number;
  position: Position;
  isDragging: boolean;
  onSelect: () => void;
}) {
  return (
    <div
      className={`
        absolute
        transition-[left,top,width,height,opacity,transform]
        duration-700
        ease-[cubic-bezier(0.22,1,0.36,1)]
        will-change-transform

        ${getSlotClasses(position)}
      `}
    >
      {/* DRAG TRANSLATION LAYER */}

      <div
        className={`
          h-full
          w-full

          ${
            isDragging
              ? "transition-none"
              : "transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
          }
        `}
        style={{
          transform: "translate3d(var(--drag-x, 0px), 0, 0)",
        }}
      >
        <ServiceCard
          service={service}
          serviceIndex={serviceIndex}
          position={position}
          onSelect={onSelect}
        />
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
        scale-100
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
        scale-[0.98]
        opacity-100

        lg:left-[18%]
        lg:top-[30px]
        lg:h-[460px]
        lg:w-[22%]
        lg:scale-[0.96]
      `;

    case 1:
      return `
        left-[90%]
        top-[18px]
        z-20
        h-[535px]
        w-[82%]
        scale-[0.98]
        opacity-100

        lg:left-[60%]
        lg:top-[30px]
        lg:h-[460px]
        lg:w-[22%]
        lg:scale-[0.96]
      `;

    case -2:
      return `
        -left-[170%]
        top-[35px]
        z-10
        h-[500px]
        w-[82%]
        scale-[0.94]
        opacity-0

        lg:left-[4%]
        lg:top-[65px]
        lg:h-[390px]
        lg:w-[15%]
        lg:scale-[0.9]
        lg:opacity-100
      `;

    case 2:
      return `
        left-[180%]
        top-[35px]
        z-10
        h-[500px]
        w-[82%]
        scale-[0.94]
        opacity-0

        lg:left-[81%]
        lg:top-[65px]
        lg:h-[390px]
        lg:w-[15%]
        lg:scale-[0.9]
        lg:opacity-100
      `;
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
            sizes="
              (max-width: 1023px) 82vw,
              (max-width: 1400px) 24vw,
              360px
            "
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
        gap-3

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
          top-[-66px]
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

      <div
        className="
          clay-surface-soft
          absolute
          -bottom-[55px]
          -left-[80px]
          hidden
          h-[120px]
          w-[300px]
          rounded-[50%]

          lg:block
        "
      />

      <div
        className="
          clay-surface-soft
          absolute
          -bottom-[4px]
          left-[8px]
          hidden
          h-[70px]
          w-[205px]
          rounded-[50%]

          lg:block
        "
      />
    </div>
  );
}
