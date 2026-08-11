"use client";

import { Headphones, Mail, MessageCircle, PhoneCall, Plus } from "lucide-react";

import { useEffect, useRef, useState } from "react";

/* =========================================================
   TYPES
========================================================= */

type FloatingContactMenuProps = {
  phone: string;
  whatsapp: string;
  email: string;

  whatsappMessage?: string;

  position?: "left" | "right";

  /*
   * اگر Bottom Navigation موبایل داری،
   * این مقدار باعث می‌شود دکمه بالاتر از آن قرار بگیرد.
   */
  mobileAboveBottomNav?: boolean;
};

type ContactAction = {
  id: string;
  label: string;
  description: string;
  href: string;
  icon: typeof PhoneCall;
  external?: boolean;
};

/* =========================================================
   COMPONENT
========================================================= */

export default function FloatingContactMenu({
  phone,
  whatsapp,
  email,

  whatsappMessage = "Hello Sofa N More, I'd like to discuss a project.",

  position = "right",

  mobileAboveBottomNav = true,
}: FloatingContactMenuProps) {
  const [open, setOpen] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);

  /* =======================================================
     NORMALIZED LINKS
  ======================================================== */

  const cleanPhone = phone.replace(/[^\d+]/g, "");

  const cleanWhatsapp = whatsapp.replace(/[^\d]/g, "");

  const actions: ContactAction[] = [
    {
      id: "call",

      label: "Call Us",

      description: "Speak with our team",

      href: `tel:${cleanPhone}`,

      icon: PhoneCall,
    },

    {
      id: "whatsapp",

      label: "WhatsApp",

      description: "Start a conversation",

      href: `https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(
        whatsappMessage,
      )}`,

      icon: MessageCircle,

      external: true,
    },

    {
      id: "email",

      label: "Email Us",

      description: "Tell us about your project",

      href: `mailto:${email}`,

      icon: Mail,
    },
  ];

  /* =======================================================
     CLOSE ON OUTSIDE CLICK
  ======================================================== */

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  /* =======================================================
     ESCAPE
  ======================================================== */

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  /* =======================================================
     RENDER
  ======================================================== */

  return (
    <div
      ref={rootRef}
      className={`
        fixed
        pointer-events-none
        z-[250]
        flex
        flex-col
        items-end

        ${
          position === "right"
            ? `
              right-4
              sm:right-5
              lg:right-7
            `
            : `
              left-4
              items-start
              sm:left-5
              lg:left-7
            `
        }

        ${
          mobileAboveBottomNav
            ? `
              bottom-[calc(88px+env(safe-area-inset-bottom))]
              md:bottom-6
            `
            : `
              bottom-[calc(16px+env(safe-area-inset-bottom))]
              md:bottom-6
            `
        }
      `}
    >
      {/* ===================================================
          ACTIONS
      ==================================================== */}

      <div
        id="floating-contact-actions"
        className={`
          mb-3
          flex
          flex-col
          gap-2.5

          ${position === "right" ? "items-end" : "items-start"}

          ${open ? "pointer-events-auto" : "pointer-events-none"}
        `}
      >
        {actions.map((action, index) => (
          <ContactActionItem
            key={action.id}
            action={action}
            index={index}
            total={actions.length}
            open={open}
            position={position}
            close={() => setOpen(false)}
          />
        ))}
      </div>

      {/* ===================================================
          MAIN BUTTON
      ==================================================== */}

      <div className="pointer-events-auto relative">
        {/* ambient glow */}

        <div
          aria-hidden
          className={`
            pointer-events-none
            absolute
            inset-[-10px]
            rounded-full
            bg-[var(--brand-gold)]/10
            blur-xl
            transition-opacity
            duration-500

            ${open ? "opacity-100" : "opacity-0"}
          `}
        />

        {/* ivory outer clay frame */}

        <div
          className="
            clay-surface-strong
            relative
            rounded-full
            p-[5px]
          "
        >
          <button
            type="button"
            aria-label={open ? "Close contact options" : "Open contact options"}
            aria-expanded={open}
            aria-controls="floating-contact-actions"
            onClick={() => setOpen((current) => !current)}
            className="
              clay-dark
              group
              relative
              flex
              h-[54px]
              w-[54px]
              items-center
              justify-center
              overflow-hidden
              rounded-full
              text-[var(--brand-gold)]
              outline-none
              transition-all
              duration-300
              ease-[cubic-bezier(0.22,1,0.36,1)]

              hover:-translate-y-[2px]

              focus-visible:ring-2
              focus-visible:ring-[var(--brand-gold)]
              focus-visible:ring-offset-2
              focus-visible:ring-offset-[var(--brand-ivory)]

              sm:h-[58px]
              sm:w-[58px]

              lg:h-[62px]
              lg:w-[62px]
            "
          >
            {/* subtle highlight */}

            <span
              aria-hidden
              className="
                pointer-events-none
                absolute
                left-[18%]
                right-[18%]
                top-[8%]
                h-[28%]
                rounded-full
                bg-white/[0.06]
                blur-[5px]
              "
            />

            {/* icon */}

            <span
              className={`
                relative z-10
                flex
                items-center
                justify-center
                transition-all
                duration-500
                ease-[cubic-bezier(0.22,1,0.36,1)]

                ${open ? "rotate-45 scale-110" : "rotate-0 scale-100"}
              `}
            >
              {open ? (
                <Plus size={24} strokeWidth={1.6} />
              ) : (
                <Headphones size={24} strokeWidth={1.55} />
              )}
            </span>
          </button>
        </div>

        {/* gold notification dot */}

        <span
          aria-hidden
          className="
            pointer-events-none
            absolute
            right-[1px]
            top-[1px]
            z-30
            h-[11px]
            w-[11px]
            rounded-full
            border-2
            border-[var(--brand-ivory-50)]
            bg-[var(--brand-gold)]
            shadow-[0_3px_8px_rgba(168,109,31,0.35)]
          "
        />
      </div>
    </div>
  );
}

/* =========================================================
   ACTION ITEM
========================================================= */

function ContactActionItem({
  action,
  index,
  total,
  open,
  position,
  close,
}: {
  action: ContactAction;

  index: number;

  total: number;

  open: boolean;

  position: "left" | "right";

  close: () => void;
}) {
  const Icon = action.icon;

  /*
   * موقع باز شدن از پایین به بالا کمی stagger می‌کنیم.
   * موقع بسته شدن ترتیب برعکس می‌شود.
   */

  const delay = open ? index * 55 : (total - index - 1) * 30;

  return (
    <a
      href={action.href}
      target={action.external ? "_blank" : undefined}
      rel={action.external ? "noopener noreferrer" : undefined}
      tabIndex={open ? 0 : -1}
      aria-label={action.label}
      onClick={close}
      style={{
        transitionDelay: `${delay}ms`,
      }}
      className={`
        group
        flex
        items-center
        gap-2
        transition-all
        duration-500
        ease-[cubic-bezier(0.22,1,0.36,1)]
        motion-reduce:transition-none

        ${position === "right" ? "flex-row" : "flex-row-reverse"}

        ${
          open
            ? `
              translate-y-0
              scale-100
              opacity-100
            `
            : `
              translate-y-5
              scale-[0.92]
              opacity-0
            `
        }
      `}
    >
      {/* ===============================================
          LABEL
      ================================================ */}

      <div
        className="
          clay-surface-strong
          hidden
          min-w-[165px]
          rounded-[18px]
          px-4
          py-2.5

          sm:block
        "
      >
        <div className={position === "right" ? "text-right" : "text-left"}>
          <div
            className="
              font-brand-sans
              text-[11px]
              font-bold
              text-[var(--brand-navy)]
            "
          >
            {action.label}
          </div>

          <div
            className="
              mt-[2px]
              font-brand-sans
              text-[8px]
              font-medium
              text-[var(--brand-text-muted)]
            "
          >
            {action.description}
          </div>
        </div>
      </div>

      {/* ===============================================
          ICON BUTTON
      ================================================ */}

      <div
        className="
          clay-surface-strong
          rounded-full
          p-[4px]
          transition-transform
          duration-300

          group-hover:-translate-y-[2px]
          group-active:scale-[0.96]
        "
      >
        <div
          className="
            clay-icon-inset
            flex
            h-[46px]
            w-[46px]
            items-center
            justify-center
            rounded-full

            sm:h-[48px]
            sm:w-[48px]

            lg:h-[50px]
            lg:w-[50px]
          "
        >
          <Icon
            size={19}
            strokeWidth={1.55}
            className="
              text-[var(--brand-gold-700)]
              transition-transform
              duration-300
              group-hover:scale-110
            "
          />
        </div>
      </div>

      {/* ===============================================
          MOBILE LABEL
      ================================================ */}

      <span
        className="
          clay-surface-soft
          whitespace-nowrap
          rounded-full
          px-3
          py-2
          font-brand-sans
          text-[9px]
          font-bold
          text-[var(--brand-navy)]

          sm:hidden
        "
      >
        {action.label}
      </span>
    </a>
  );
}
