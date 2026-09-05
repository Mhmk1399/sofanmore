"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { AlertCircle, CheckCircle2, Info, X } from "lucide-react";

 
/* =========================================================
   TYPES
========================================================= */

export type ToastVariant = "success" | "error" | "info";

export type ToastInput = {
  title: string;
  message?: string;
  variant?: ToastVariant;
  durationMs?: number;
};

type ToastItem = ToastInput & {
  id: string;
  variant: ToastVariant;
};

type ToastEventDetail = ToastInput;

type ToastTheme = {
  shell: string;
  inner: string;
  iconShell: string;
  iconColor: string;
  titleColor: string;
  messageColor: string;
  accent: string;
  close: string;
  label: string;
};

/* =========================================================
   CONSTANTS
========================================================= */

const TOAST_EVENT_NAME = "sofanmore-toast";

const DEFAULT_TOAST_DURATION_MS = 5200;

/* =========================================================
   DISPATCH
========================================================= */

export function dispatchToast(toast: ToastInput) {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(
    new CustomEvent<ToastEventDetail>(TOAST_EVENT_NAME, {
      detail: toast,
    }),
  );
}

/* =========================================================
   HOOK
========================================================= */

export function useToast() {
  return useMemo(
    () => ({
      success(title: string, message?: string, durationMs?: number) {
        dispatchToast({
          title,
          message,
          durationMs,
          variant: "success",
        });
      },

      error(title: string, message?: string, durationMs?: number) {
        dispatchToast({
          title,
          message,
          durationMs,
          variant: "error",
        });
      },

      info(title: string, message?: string, durationMs?: number) {
        dispatchToast({
          title,
          message,
          durationMs,
          variant: "info",
        });
      },

      show(toast: ToastInput) {
        dispatchToast(toast);
      },
    }),
    [],
  );
}

/* =========================================================
   HELPERS
========================================================= */

function createToastId() {
  return `toast:${Date.now().toString(36)}:${Math.random()
    .toString(36)
    .slice(2)}`;
}

/* =========================================================
   STATUS THEME
========================================================= */

function getToastTheme(variant: ToastVariant): ToastTheme {
  if (variant === "success") {
    return {
      shell: `
        border-[#779879]/25
        bg-[#E8F0E6]
        text-[#244B2D]

        shadow-[
          0_12px_28px_rgba(47,77,50,0.13),
          inset_1px_1px_2px_rgba(255,255,255,0.85)
        ]
      `,

      inner: `
        border-[#779879]/12
        bg-[#F3F8F1]
      `,

      iconShell: `
        border-[#779879]/20
        bg-[#DFEBDD]

        shadow-[
          inset_3px_3px_7px_rgba(75,109,78,0.10),
          inset_-3px_-3px_7px_rgba(255,255,255,0.78)
        ]
      `,

      iconColor: "text-[#41704A]",

      titleColor: "text-[#244B2D]",

      messageColor: "text-[#526B57]",

      accent: "bg-[#719275]",

      close: `
        bg-[#DDE8DA]
        text-[#49674E]
        hover:bg-[#D2E0CF]
      `,

      label: "Success",
    };
  }

  if (variant === "error") {
    return {
      shell: `
        border-[#C98D87]/25
        bg-[#F6E8E4]
        text-[#7A302C]

        shadow-[
          0_12px_28px_rgba(116,48,43,0.13),
          inset_1px_1px_2px_rgba(255,255,255,0.82)
        ]
      `,

      inner: `
        border-[#C98D87]/14
        bg-[#FCF3F0]
      `,

      iconShell: `
        border-[#C98D87]/20
        bg-[#F0DBD6]

        shadow-[
          inset_3px_3px_7px_rgba(132,67,61,0.09),
          inset_-3px_-3px_7px_rgba(255,255,255,0.78)
        ]
      `,

      iconColor: "text-[#A64B44]",

      titleColor: "text-[#7A302C]",

      messageColor: "text-[#805B57]",

      accent: "bg-[#C06D65]",

      close: `
        bg-[#EEDBD7]
        text-[#8B4B46]
        hover:bg-[#E6CFCB]
      `,

      label: "Attention",
    };
  }

  return {
    shell: `
      border-[var(--brand-gold)]/22
      bg-[#F4ECDE]
      text-[var(--brand-navy)]

      shadow-[
        0_12px_28px_rgba(101,75,42,0.13),
        inset_1px_1px_2px_rgba(255,255,255,0.84)
      ]
    `,

    inner: `
      border-[var(--brand-gold)]/10
      bg-[#FFF9EF]
    `,

    iconShell: `
      border-[var(--brand-gold)]/18
      bg-[#EFE2CC]

      shadow-[
        inset_3px_3px_7px_rgba(126,89,46,0.09),
        inset_-3px_-3px_7px_rgba(255,255,255,0.8)
      ]
    `,

    iconColor: "text-[var(--brand-gold-700)]",

    titleColor: "text-[var(--brand-navy)]",

    messageColor: "text-[var(--brand-text-muted)]",

    accent: "bg-[var(--brand-gold)]",

    close: `
      bg-[#EDE1CE]
      text-[var(--brand-navy)]/65
      hover:bg-[#E4D5BE]
    `,

    label: "Information",
  };
}

/* =========================================================
   ICON
========================================================= */

function ToastIcon({ variant }: { variant: ToastVariant }) {
  if (variant === "success") {
    return <CheckCircle2 size={19} strokeWidth={1.7} />;
  }

  if (variant === "error") {
    return <AlertCircle size={19} strokeWidth={1.7} />;
  }

  return <Info size={19} strokeWidth={1.7} />;
}

/* =========================================================
   PROVIDER
========================================================= */

export default function ToastProvider() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  /*
    Keep timer IDs so they can be
    properly cancelled.
  */

  const timersRef = useRef<Map<string, number>>(new Map());

  /* =======================================================
     DISMISS
  ======================================================= */

  const dismissToast = useCallback((id: string) => {
    const timer = timersRef.current.get(id);

    if (timer) {
      globalThis.clearTimeout(timer);

      timersRef.current.delete(id);
    }

    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  /* =======================================================
     EVENT LISTENER
  ======================================================= */

  useEffect(() => {
    function handleToast(event: Event) {
      const toastEvent = event as CustomEvent<ToastEventDetail>;

      const detail = toastEvent.detail;

      if (!detail?.title) {
        return;
      }

      const toast: ToastItem = {
        id: createToastId(),

        title: detail.title,

        message: detail.message,

        durationMs: detail.durationMs ?? DEFAULT_TOAST_DURATION_MS,

        variant: detail.variant ?? "info",
      };

      setToasts((current) => [toast, ...current].slice(0, 4));

      if (toast.durationMs && toast.durationMs > 0) {
        const timer = window.setTimeout(() => {
          dismissToast(toast.id);
        }, toast.durationMs);

        timersRef.current.set(toast.id, timer);
      }
    }

    window.addEventListener(TOAST_EVENT_NAME, handleToast);

    return () => {
      window.removeEventListener(TOAST_EVENT_NAME, handleToast);
    };
  }, [dismissToast]);

  /* =======================================================
     CLEANUP
  ======================================================= */

  useEffect(() => {
    const timers = timersRef.current;

    return () => {
      timers.forEach((timer) => {
        window.clearTimeout(timer);
      });

      timers.clear();
    };
  }, []);

  if (toasts.length === 0) {
    return null;
  }

  return (
    <div
      data-toast-root
      aria-live="polite"
      aria-relevant="additions"
      className="
        pointer-events-none

        fixed

        inset-x-3
        top-3

        z-[5000]

        flex
        flex-col

        items-end

        gap-2.5

        sm:left-auto
        sm:right-5
        sm:top-5
        sm:w-[400px]
      "
    >
      {toasts.map((toast) => (
        <ToastCard key={toast.id} toast={toast} onDismiss={dismissToast} />
      ))}
    </div>
  );
}

/* =========================================================
   TOAST CARD
========================================================= */

function ToastCard({
  toast,
  onDismiss,
}: {
  toast: ToastItem;

  onDismiss: (id: string) => void;
}) {
  const theme = getToastTheme(toast.variant);

  return (
    <div
      role={toast.variant === "error" ? "alert" : "status"}
      className={`
        pointer-events-auto

        relative

        w-full

        overflow-hidden

        rounded-[22px]

        border

        p-[4px]

        ${theme.shell}
      `}
    >
      {/* ===============================================
          STATUS ACCENT
      ================================================ */}

      <span
        aria-hidden
        className={`
          absolute

          bottom-4
          left-[4px]
          top-4

          w-[3px]

          rounded-full

          ${theme.accent}
        `}
      />

      {/* ===============================================
          INNER CLAY SURFACE
      ================================================ */}

      <div
        className={`
          relative

          flex
          items-start

          gap-3

          rounded-[18px]

          border

          px-3.5
          py-3.5

          sm:px-4

          ${theme.inner}
        `}
      >
        {/* =============================================
            ICON
        ============================================== */}

        <span
          aria-hidden
          className={`
            flex
            h-10
            w-10

            shrink-0

            items-center
            justify-center

            rounded-[13px]

            border

            ${theme.iconShell}
            ${theme.iconColor}
          `}
        >
          <ToastIcon variant={toast.variant} />
        </span>

        {/* =============================================
            TEXT
        ============================================== */}

        <div
          className="
            min-w-0
            flex-1

            pt-[1px]
          "
        >
          {/* MICRO LABEL */}

          <span
            className={`
              block

              font-brand-sans

              text-[6.5px]
              font-extrabold
              uppercase

              tracking-[0.16em]

              opacity-55

              ${theme.titleColor}
            `}
          >
            {theme.label}
          </span>

          {/* TITLE */}

          <p
            className={`
              mt-1

              font-brand-sans

              text-[12px]
              font-extrabold
              leading-[1.35]

              sm:text-[13px]

              ${theme.titleColor}
            `}
          >
            {toast.title}
          </p>

          {/* MESSAGE */}

          {toast.message && (
            <p
              className={`
                mt-1.5

                max-w-[310px]

                font-brand-sans

                text-[13px]
                font-semibold
                leading-[1.55]

                sm:text-[10.5px]

                ${theme.messageColor}
              `}
            >
              {toast.message}
            </p>
          )}
        </div>

        {/* =============================================
            CLOSE
        ============================================== */}

        <button
          type="button"
          onClick={() => onDismiss(toast.id)}
          aria-label="Dismiss notification"
          className={`
            flex
            h-8
            w-8

            shrink-0

            items-center
            justify-center

            rounded-full

            transition-[
              background-color,
              transform,
              color
            ]

            duration-150

            active:scale-90

            ${theme.close}
          `}
        >
          <X size={14} strokeWidth={1.8} />
        </button>
      </div>
    </div>
  );
}
