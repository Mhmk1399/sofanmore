"use client";

import { ArrowDownRight, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site";

type ServiceStickyCtaProps = {
  href: `#${string}`;
  label: string;
  note?: string;
  heroId?: string;
  hideWhileFormVisible?: boolean;
  showContactActions?: boolean;
};

export default function ServiceStickyCta({
  href,
  label,
  note = "Project enquiry",
  heroId,
  hideWhileFormVisible = false,
  showContactActions = false,
}: ServiceStickyCtaProps) {
  const [isHidden, setIsHidden] = useState(Boolean(heroId));

  useEffect(() => {
    if (!window.IntersectionObserver || (!heroId && !hideWhileFormVisible))
      return;

    const ids = [
      heroId,
      hideWhileFormVisible ? href.slice(1) : undefined,
    ].filter((id): id is string => Boolean(id));
    const visibility = new Map<string, boolean>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries)
        visibility.set(entry.target.id, entry.isIntersecting);
      setIsHidden([...visibility.values()].some(Boolean));
    });

    for (const id of ids) {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    }

    return () => observer.disconnect();
  }, [heroId, hideWhileFormVisible, href]);

  if (isHidden) return null;

  return (
    <aside
      aria-label="Service enquiry shortcut"
      className="
        pointer-events-none fixed inset-x-3
        bottom-[calc(98px+env(safe-area-inset-bottom))]
        z-[850] flex items-center justify-start gap-2
        print:hidden
        sm:bottom-[calc(132px+env(safe-area-inset-bottom))]
        md:bottom-24
        lg:inset-x-auto lg:bottom-7 lg:left-7
      "
    >
      <a
        href={href}
        aria-label={`${note}: ${label}`}
        className={`
          pointer-events-auto group inline-flex
          items-center rounded-full border border-white/75
          bg-[#FFFDF8]/82 font-brand-sans font-bold uppercase
          tracking-normal text-[var(--brand-navy)]
          shadow-[0_16px_34px_rgba(18,37,62,0.13),inset_2px_2px_4px_rgba(255,255,255,0.72),inset_-2px_-2px_5px_rgba(118,82,38,0.08)]
          backdrop-blur-xl transition-transform duration-300
          ease-[var(--ease-clay)]
          hover:-translate-y-[2px]
          focus-visible:outline-2 focus-visible:outline-offset-4
          focus-visible:outline-[var(--brand-gold)]
          motion-reduce:transition-none
          ${
            showContactActions
              ? "min-h-11 max-w-[calc(100vw-216px)] gap-1 !bg-[var(--brand-navy)] px-2 py-2 text-[11px] !text-white lg:max-w-none lg:gap-2 lg:px-4 lg:py-3 lg:text-[13px]"
              : "max-w-[calc(100vw-112px)] gap-2 px-3.5 py-2.5 text-[13px] sm:max-w-none sm:px-4 sm:py-3"
          }
        `}
      >
        <span
          aria-hidden
          className={`
            ${showContactActions ? "hidden lg:flex" : "flex"} h-7 w-7 shrink-0 items-center justify-center rounded-full
            bg-[var(--brand-navy)] text-[var(--brand-gold)]
            shadow-[inset_1px_1px_3px_rgba(255,255,255,0.12)]
          `}
        >
          <ArrowDownRight
            size={15}
            strokeWidth={1.8}
            className="transition-transform duration-300 group-hover:translate-x-[1px] group-hover:translate-y-[1px]"
          />
        </span>
        <span className="min-w-0">
          <span
            className={`${showContactActions ? "hidden lg:block lg:text-[var(--brand-gold)]" : "block"} truncate text-[11px] text-[var(--brand-gold-700)]`}
          >
            {note}
          </span>
          <span className="block truncate">{label}</span>
        </span>
      </a>
      {showContactActions && (
        <>
          <a
            href={siteConfig.phoneHref}
            title="Call Sofa N More"
            aria-label="Call Sofa N More"
            className="clay-surface-strong pointer-events-auto inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[var(--brand-navy)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-gold)] lg:hidden"
          >
            <Phone aria-hidden="true" size={18} strokeWidth={1.8} />
          </a>
          <a
            href={`https://wa.me/${siteConfig.whatsappNumber.replace(/\D/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Message Sofa N More on WhatsApp"
            aria-label="Message Sofa N More on WhatsApp"
            className="clay-surface-strong pointer-events-auto inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[#128C7E] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-gold)] lg:hidden"
          >
            <FaWhatsapp aria-hidden="true" size={20} />
          </a>
        </>
      )}
    </aside>
  );
}
