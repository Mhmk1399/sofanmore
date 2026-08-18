import { ArrowDownRight } from "lucide-react";

type ServiceStickyCtaProps = {
  href: `#${string}`;
  label: string;
  note?: string;
};

export default function ServiceStickyCta({
  href,
  label,
  note = "Project enquiry",
}: ServiceStickyCtaProps) {
  return (
    <aside
      aria-label="Service enquiry shortcut"
      className="
        pointer-events-none fixed inset-x-3
        bottom-[calc(98px+env(safe-area-inset-bottom))]
        z-[850] flex justify-start
        print:hidden
        sm:bottom-[calc(132px+env(safe-area-inset-bottom))]
        md:bottom-24
        lg:inset-x-auto lg:bottom-7 lg:left-7
      "
    >
      <a
        href={href}
        className="
          pointer-events-auto group inline-flex max-w-[calc(100vw-112px)]
          items-center gap-2 rounded-full border border-white/75
          bg-[#FFFDF8]/82 px-3.5 py-2.5
          font-brand-sans text-[10px] font-bold uppercase
          tracking-[0.14em] text-[var(--brand-navy)]
          shadow-[0_16px_34px_rgba(18,37,62,0.13),inset_2px_2px_4px_rgba(255,255,255,0.72),inset_-2px_-2px_5px_rgba(118,82,38,0.08)]
          backdrop-blur-xl transition-transform duration-300
          ease-[var(--ease-clay)]
          hover:-translate-y-[2px]
          focus-visible:outline-2 focus-visible:outline-offset-4
          focus-visible:outline-[var(--brand-gold)]
          motion-reduce:transition-none
          sm:max-w-none sm:px-4 sm:py-3
        "
      >
        <span
          aria-hidden
          className="
            flex h-7 w-7 shrink-0 items-center justify-center rounded-full
            bg-[var(--brand-navy)] text-[var(--brand-gold)]
            shadow-[inset_1px_1px_3px_rgba(255,255,255,0.12)]
          "
        >
          <ArrowDownRight
            size={15}
            strokeWidth={1.8}
            className="transition-transform duration-300 group-hover:translate-x-[1px] group-hover:translate-y-[1px]"
          />
        </span>
        <span className="min-w-0">
          <span className="block truncate text-[8px] text-[var(--brand-gold-700)]">
            {note}
          </span>
          <span className="block truncate">{label}</span>
        </span>
      </a>
    </aside>
  );
}
