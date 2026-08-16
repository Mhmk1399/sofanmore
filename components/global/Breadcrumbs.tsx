"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";

type BreadcrumbItem = {
  label: string;
  href: string;
  isCurrent: boolean;
  isLinkable: boolean;
};

const segmentLabels: Record<string, string> = {
  "about-us": "About Us",
  blog: "Blog",
  "contact-us": "Contact Us",
  faqs: "FAQs",
  faq: "FAQs",
  services: "Services",
  "bespoke-sofa": "Bespoke Sofa",
  "commercial-sofas": "Commercial Sofas",
  "interior-design": "Interior Design",
  gallery: "Gallery",
  portfolio: "Portfolio",
};

const disabledLinks = new Set(["/services"]);
const SCROLL_TRIGGER = 20;

function subscribeToScroll(callback: () => void) {
  let frameId: number | null = null;

  const update = () => {
    frameId = null;
    callback();
  };

  const handleScroll = () => {
    if (frameId === null) {
      frameId = window.requestAnimationFrame(update);
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  window.addEventListener("resize", handleScroll);

  return () => {
    if (frameId !== null) {
      window.cancelAnimationFrame(frameId);
    }

    window.removeEventListener("scroll", handleScroll);
    window.removeEventListener("resize", handleScroll);
  };
}

function getScrollSnapshot() {
  return window.scrollY > SCROLL_TRIGGER;
}

function getServerScrollSnapshot() {
  return false;
}

function formatSegment(segment: string) {
  let decodedSegment = segment;

  try {
    decodedSegment = decodeURIComponent(segment);
  } catch {
    decodedSegment = segment;
  }

  if (segmentLabels[decodedSegment]) return segmentLabels[decodedSegment];

  return decodedSegment
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function buildBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const segments = pathname.replace(/\/+$/, "").split("/").filter(Boolean);

  return [
    {
      label: "Home",
      href: "/",
      isCurrent: segments.length === 0,
      isLinkable: true,
    },
    ...segments.map((segment, index) => {
      const href = `/${segments.slice(0, index + 1).join("/")}`;
      const isCurrent = index === segments.length - 1;

      return {
        label: formatSegment(segment),
        href,
        isCurrent,
        isLinkable: !isCurrent && !disabledLinks.has(href),
      };
    }),
  ];
}

export default function Breadcrumbs() {
  const pathname = usePathname();
  const isScrolled = useSyncExternalStore(
    subscribeToScroll,
    getScrollSnapshot,
    getServerScrollSnapshot,
  );

  if (!pathname || pathname === "/") return null;

  const breadcrumbs = buildBreadcrumbs(pathname);

  return (
    <div
      className={`
        pointer-events-none fixed inset-x-0
        top-[calc(env(safe-area-inset-top)+72px)]
        z-[950] px-3
        transition-[top,transform,opacity]
        duration-300 ease-[var(--ease-clay)]
        sm:px-5
        lg:z-[195] lg:px-8
        ${isScrolled ? "lg:top-[88px]" : "lg:top-[100px]"}
      `}
    >
      <div className="mx-auto flex max-w-[var(--site-width)] justify-center lg:justify-start">
        <nav
          aria-label="Breadcrumb"
          className="
            pointer-events-auto
            max-w-[calc(100vw-32px)]
            touch-pan-x overflow-x-auto
            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
            lg:max-w-full
          "
        >
          <ol
            className={`
              clay-surface-soft
              flex w-max items-center gap-1
              rounded-full border border-white/70
              px-2.5 py-1.5
              font-brand-sans text-[7px] font-bold
              text-[var(--brand-text-muted)]
              shadow-[0_10px_24px_rgba(18,37,62,0.10)]
              backdrop-blur-md
              transition-[transform,padding,font-size,box-shadow]
              duration-300 ease-[var(--ease-clay)]
              origin-top
              min-[380px]:text-[8px]
              lg:origin-top-left lg:px-4 lg:py-2.5 lg:text-[11px]
              ${
                isScrolled
                  ? "lg:scale-[0.94] lg:px-3.5 lg:py-2 lg:text-[10px] lg:shadow-[0_8px_18px_rgba(18,37,62,0.09)]"
                  : "lg:scale-100"
              }
            `}
          >
            {breadcrumbs.map((item, index) => (
              <li
                key={item.href}
                className="flex shrink-0 items-center gap-1.5 whitespace-nowrap"
              >
                {index > 0 && (
                  <span aria-hidden className="text-[var(--brand-gold-700)]/70">
                    /
                  </span>
                )}

                {item.isLinkable ? (
                  <Link
                    href={item.href}
                    className="
                      rounded-full px-1
                      transition-colors duration-200
                      hover:text-[var(--brand-gold-700)]
                      focus-visible:outline-2
                      focus-visible:outline-offset-2
                      focus-visible:outline-[var(--brand-gold)]
                    "
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    aria-current={item.isCurrent ? "page" : undefined}
                    className={`
                      rounded-full px-1
                      ${
                        item.isCurrent
                          ? "text-[var(--brand-navy)]"
                          : "text-[var(--brand-text-muted)]"
                      }
                    `}
                  >
                    {item.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  );
}
