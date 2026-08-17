"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const SHOW_AFTER_SCROLL = 92;

export default function MobileFloatingLogo() {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");
  const shouldWaitForScroll = pathname === "/";
  const [hasScrolledPastLogo, setHasScrolledPastLogo] = useState(false);

  const isVisible = !shouldWaitForScroll || hasScrolledPastLogo;

  useEffect(() => {
    if (!shouldWaitForScroll) {
      return;
    }

    let frameId: number | null = null;

    const updateVisibility = () => {
      frameId = null;
      setHasScrolledPastLogo(window.scrollY > SHOW_AFTER_SCROLL);
    };

    const handleScroll = () => {
      if (frameId === null) {
        frameId = window.requestAnimationFrame(updateVisibility);
      }
    };

    frameId = window.requestAnimationFrame(updateVisibility);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
      window.removeEventListener("scroll", handleScroll);
    };
  }, [shouldWaitForScroll]);

  if (isAdminRoute) {
    return null;
  }

  return (
    <div
      aria-hidden={!isVisible}
      className={`
        fixed left-1/2 top-[calc(env(safe-area-inset-top)+10px)]
        z-[1000] isolate sm:hidden
        transition-[opacity,transform,filter] duration-500
        ease-[var(--ease-clay)]
        will-change-transform
        motion-reduce:transition-none
        ${
          isVisible
            ? "pointer-events-auto -translate-x-1/2 translate-y-0 scale-100 opacity-100 blur-0"
            : "pointer-events-none -translate-x-1/2 -translate-y-4 scale-[0.92] opacity-0 blur-[2px]"
        }
      `}
    >
      <Link
        href="/"
        aria-label="Sofa N More home"
        tabIndex={isVisible ? 0 : -1}
        className="
          group block rounded-full
          focus-visible:outline-2 focus-visible:outline-offset-4
          focus-visible:outline-[var(--brand-gold)]
        "
      >
        <span
          className="
            clay-surface-strong
            relative block rounded-full p-[5px]
            shadow-[0_18px_42px_rgba(18,37,62,0.18),7px_9px_18px_rgba(128,91,48,0.18),inset_2px_2px_4px_rgba(255,255,255,0.74),inset_-2px_-2px_5px_rgba(118,82,38,0.08)]
            backdrop-blur-xl
            transition-transform duration-300 ease-[var(--ease-clay)]
            group-active:scale-[0.97]
          "
        >
          <span
            className="
              clay-inset
              relative flex h-[48px] w-[188px]
              items-center justify-center
              overflow-hidden rounded-full
            "
          >
            <span
              aria-hidden
              className="
                pointer-events-none absolute inset-[3px]
                rounded-full
                bg-[linear-gradient(180deg,rgba(255,255,255,0.58),rgba(255,250,243,0.1)_48%,rgba(188,129,43,0.08))]
              "
            />

            <span
              aria-hidden
              className="
                absolute bottom-[5px] h-[3px] w-10
                rounded-full bg-[var(--brand-gold)]
                shadow-[0_2px_8px_rgba(188,129,43,0.38)]
              "
            />

            <span className="relative h-[36px] w-[142px]">
              <Image
                src="/assets/images/Sofa_Logo.webp"
                alt=""
                fill
                sizes="142px"
                className="
                  object-contain
                  drop-shadow-[0_4px_10px_rgba(18,37,62,0.14)]
                "
              />
            </span>
          </span>
        </span>
      </Link>
    </div>
  );
}
