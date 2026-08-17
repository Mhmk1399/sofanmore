"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AlertCircle, CheckCircle2, Info, X } from "lucide-react";

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

const TOAST_EVENT_NAME = "sofanmore-toast";
const DEFAULT_TOAST_DURATION_MS = 5200;

export function dispatchToast(toast: ToastInput) {
  if (typeof window === "undefined") return;

  window.dispatchEvent(
    new CustomEvent<ToastEventDetail>(TOAST_EVENT_NAME, {
      detail: toast,
    }),
  );
}

export function useToast() {
  return useMemo(
    () => ({
      success(title: string, message?: string, durationMs?: number) {
        dispatchToast({ title, message, durationMs, variant: "success" });
      },
      error(title: string, message?: string, durationMs?: number) {
        dispatchToast({ title, message, durationMs, variant: "error" });
      },
      info(title: string, message?: string, durationMs?: number) {
        dispatchToast({ title, message, durationMs, variant: "info" });
      },
      show(toast: ToastInput) {
        dispatchToast(toast);
      },
    }),
    [],
  );
}

function createToastId() {
  return `toast:${Date.now().toString(36)}:${Math.random()
    .toString(36)
    .slice(2)}`;
}

function toastIcon(variant: ToastVariant) {
  if (variant === "success") return <CheckCircle2 size={18} strokeWidth={1.8} />;
  if (variant === "error") return <AlertCircle size={18} strokeWidth={1.8} />;

  return <Info size={18} strokeWidth={1.8} />;
}

function variantClass(variant: ToastVariant) {
  if (variant === "success") {
    return "border-[#6f9874]/35 bg-[#eef7ef]/92 text-[#245b31]";
  }

  if (variant === "error") {
    return "border-red-200 bg-red-50/94 text-red-900";
  }

  return "border-[#d7a04a]/38 bg-[#fff7e4]/94 text-[var(--brand-navy)]";
}

export default function ToastProvider() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismissToast = useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  useEffect(() => {
    function handleToast(event: Event) {
      const toastEvent = event as CustomEvent<ToastEventDetail>;
      const detail = toastEvent.detail;

      if (!detail?.title) return;

      const toast: ToastItem = {
        id: createToastId(),
        title: detail.title,
        message: detail.message,
        durationMs: detail.durationMs ?? DEFAULT_TOAST_DURATION_MS,
        variant: detail.variant || "info",
      };

      setToasts((current) => [toast, ...current].slice(0, 4));

      if (toast.durationMs && toast.durationMs > 0) {
        window.setTimeout(() => dismissToast(toast.id), toast.durationMs);
      }
    }

    window.addEventListener(TOAST_EVENT_NAME, handleToast);

    return () => {
      window.removeEventListener(TOAST_EVENT_NAME, handleToast);
    };
  }, [dismissToast]);

  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      aria-relevant="additions"
      className="pointer-events-none fixed right-3 top-3 z-[5000] flex w-[calc(100vw-24px)] max-w-[420px] flex-col gap-3 sm:right-5 sm:top-5 sm:w-full"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          role={toast.variant === "error" ? "alert" : "status"}
          className={`pointer-events-auto rounded-[24px] border p-[5px] shadow-[var(--shadow-clay-lg)] backdrop-blur-xl ${variantClass(
            toast.variant,
          )}`}
        >
          <div className="flex items-start gap-3 rounded-[19px] bg-white/26 px-4 py-3">
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-[14px] bg-white/36">
              {toastIcon(toast.variant)}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-brand-sans text-[13px] font-extrabold leading-[1.35]">
                {toast.title}
              </span>
              {toast.message && (
                <span className="mt-1 block font-brand-sans text-[11px] font-semibold leading-[1.55] opacity-78">
                  {toast.message}
                </span>
              )}
            </span>
            <button
              type="button"
              onClick={() => dismissToast(toast.id)}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/30 transition-colors hover:bg-white/48"
              aria-label="Dismiss notification"
            >
              <X size={15} strokeWidth={1.9} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
