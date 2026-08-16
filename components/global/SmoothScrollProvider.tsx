"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";

function getCurrentHashTarget() {
  const hash = window.location.hash;
  if (!hash || hash.length <= 1) return null;

  const rawId = hash.slice(1);

  try {
    return document.getElementById(decodeURIComponent(rawId));
  } catch {
    return document.getElementById(rawId);
  }
}

function getAnchorOffset(target: HTMLElement) {
  const scrollMarginTop = Number.parseFloat(
    window.getComputedStyle(target).scrollMarginTop,
  );

  if (!Number.isNaN(scrollMarginTop) && scrollMarginTop > 0) return 0;

  return window.matchMedia("(min-width: 1024px)").matches ? -104 : -92;
}

export default function SmoothScrollProvider() {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  const scrollToCurrentHash = useCallback(() => {
    const lenis = lenisRef.current;
    if (!lenis) return false;

    lenis.resize();

    const target = getCurrentHashTarget();
    if (!target) return false;

    lenis.scrollTo(target, {
      offset: getAnchorOffset(target),
      force: true,
    });

    return true;
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      anchors: true,
      lerp: 0.11,
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 1,
      wheelMultiplier: 0.92,
      stopInertiaOnNavigate: true,
      respectReducedMotion: true,
      prevent: (node) => node.hasAttribute("data-lenis-prevent"),
    });

    lenisRef.current = lenis;

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;

    let cancelled = false;

    const frameId = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        if (cancelled) return;

        if (scrollToCurrentHash()) return;

        lenis.resize();
        lenis.scrollTo(0, {
          immediate: true,
          force: true,
        });
      });
    });

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frameId);
    };
  }, [pathname, scrollToCurrentHash]);

  useEffect(() => {
    let frameId: number | null = null;

    function handleHashChange() {
      if (frameId !== null) window.cancelAnimationFrame(frameId);

      frameId = window.requestAnimationFrame(() => {
        frameId = null;
        scrollToCurrentHash();
      });
    }

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      if (frameId !== null) window.cancelAnimationFrame(frameId);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [scrollToCurrentHash]);

  return null;
}
