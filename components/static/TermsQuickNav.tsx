"use client";

import { ChevronDown, FileText } from "lucide-react";

import { useState } from "react";

type TermsNavItem = {
  id: string;
  number: string;
  label: string;
};

export default function TermsQuickNav({
  items,
}: {
  items: readonly TermsNavItem[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="
        mx-auto
        max-w-[var(--site-width)]

        overflow-hidden

        rounded-[20px]

        border
        border-[var(--brand-navy)]/[0.07]

        bg-[#F3EBE1]
      "
    >
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-controls="terms-mobile-navigation"
        className="
          flex
          min-h-[58px]
          w-full

          items-center
          justify-between

          gap-4

          px-4

          text-left
        "
      >
        <span
          className="
            flex
            items-center
            gap-3
          "
        >
          <span
            className="
              flex
              h-8
              w-8

              items-center
              justify-center

              rounded-[10px]

              bg-[var(--brand-navy)]

              text-[var(--brand-gold)]
            "
          >
            <FileText size={14} strokeWidth={1.5} />
          </span>

          <span>
            <span
              className="
                block

                font-brand-sans

                text-[13px]
                font-bold
                uppercase

                tracking-[0.13em]

                text-[var(--brand-gold-700)]
              "
            >
              Quick navigation
            </span>

            <span
              className="
                mt-0.5
                block

                font-brand-display

                text-[14px]
                font-semibold

                text-[var(--brand-navy)]
              "
            >
              Terms Contents
            </span>
          </span>
        </span>

        <ChevronDown
          size={16}
          strokeWidth={1.6}
          className={`
            shrink-0

            text-[var(--brand-navy)]

            transition-transform
            duration-150

            ${open ? "rotate-180" : ""}
          `}
        />
      </button>

      {open && (
        <nav
          id="terms-mobile-navigation"
          aria-label="Terms and conditions sections"
          className="
            border-t
            border-[var(--brand-navy)]/[0.07]

            px-2
            py-2
          "
        >
          <ul
            className="
              grid
              gap-0.5

              sm:grid-cols-2
            "
          >
            {items.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className="
                    flex
                    min-h-[42px]

                    items-center

                    gap-2.5

                    rounded-[11px]

                    px-3

                    font-brand-sans

                    text-[12px]
                    font-semibold

                    text-[var(--brand-text-muted)]

                    active:bg-white/50
                  "
                >
                  <span
                    className="
                      w-5

                      shrink-0

                      text-[13px]
                      font-bold

                      text-[var(--brand-gold-700)]
                    "
                  >
                    {item.number}
                  </span>

                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
