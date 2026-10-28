"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useEffect, useRef, type KeyboardEvent } from "react";
import { createPortal } from "react-dom";

const DIALOG_FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export type LeadSuccessDialogProps = {
  id: string;
  successLeadId?: string;
  successTitle?: string;
  successMessage?: string;
  successEyebrow?: string;
  successAction?: { href: string; label: string };
  onVisible?: (leadId: string) => void;
};

export default function LeadSuccessDialog({
  id,
  successLeadId,
  successTitle,
  successMessage,
  successEyebrow,
  successAction,
  onVisible,
}: LeadSuccessDialogProps) {
  const successDialogRef = useRef<HTMLDivElement>(null);
  const portalRoot = typeof document === "undefined" ? null : document.body;

  useEffect(() => {
    if (!successLeadId || !portalRoot) return;

    const previousFocus =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    onVisible?.(successLeadId);
    successDialogRef.current?.focus();
    return () => {
      if (previousFocus?.isConnected)
        previousFocus.focus({ preventScroll: true });
    };
  }, [onVisible, portalRoot, successLeadId]);

  useEffect(() => {
    if (!successLeadId) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [successLeadId]);

  function handleSuccessDialogKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Tab") return;

    const dialog = event.currentTarget;
    const focusableElements = Array.from(
      dialog.querySelectorAll<HTMLElement>(DIALOG_FOCUSABLE_SELECTOR),
    ).filter((element) => element.getAttribute("aria-hidden") !== "true");

    if (focusableElements.length === 0) {
      event.preventDefault();
      dialog.focus();
      return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
      return;
    }

    if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  }

  const successConfirmationDialog =
    successLeadId && portalRoot
      ? createPortal(
          <div
            className="fixed inset-0 z-[6000] flex items-center justify-center px-3 sm:px-5"
            role="presentation"
            data-lenis-prevent
            data-lead-confirmation-modal="true"
            data-gtm-event="lead_confirmation_view"
            data-lead-id={successLeadId}
            style={{
              paddingTop: "calc(18px + env(safe-area-inset-top))",
              paddingBottom: "calc(18px + env(safe-area-inset-bottom))",
            }}
          >
            <div
              aria-hidden
              className="absolute inset-0 bg-[var(--brand-navy)]/42 backdrop-blur-[6px]"
            />
            <div
              ref={successDialogRef}
              role="dialog"
              aria-modal="true"
              aria-live="polite"
              aria-labelledby={`${id}-success-title`}
              aria-describedby={
                successMessage
                  ? `${id}-success-description`
                  : `${id}-success-note`
              }
              tabIndex={-1}
              onKeyDown={handleSuccessDialogKeyDown}
              className="clay-surface-strong relative z-10 w-full max-w-[720px] overflow-auto rounded-[28px] p-[6px] shadow-[0_28px_70px_rgba(7,26,48,0.28)] outline-none sm:rounded-[34px]"
              style={{
                maxHeight:
                  "calc(100dvh - 36px - env(safe-area-inset-top) - env(safe-area-inset-bottom))",
              }}
            >
              <div className="rounded-[22px] bg-[#F8EFE4]/96 px-5 py-8 text-center sm:rounded-[28px] sm:px-8 sm:py-10">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--brand-navy)] text-[var(--brand-gold)]">
                  <CheckCircle2 size={25} strokeWidth={1.7} />
                </span>

                <p className="mt-5 font-brand-sans text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--brand-gold-700)]">
                  {successEyebrow || "Request received"}
                </p>

                <h3
                  id={`${id}-success-title`}
                  className="mx-auto mt-2 max-w-[560px] font-brand-display text-[28px] font-semibold leading-[1.06] text-[var(--brand-navy)] sm:text-[38px]"
                >
                  {successTitle || "Thank you. Your request was sent."}
                </h3>

                {successMessage && (
                  <p
                    id={`${id}-success-description`}
                    className="mx-auto mt-4 max-w-[560px] font-brand-sans text-[13px] font-semibold leading-[1.65] text-[var(--brand-text-muted)] sm:text-[14px]"
                  >
                    {successMessage}
                  </p>
                )}

                <p
                  id={`${id}-success-note`}
                  className="mx-auto mt-4 max-w-[440px] font-brand-sans text-[12px] font-bold leading-[1.55] text-[var(--brand-text-muted)]"
                >
                  Your request is confirmed. The form will return empty in a few
                  seconds.
                </p>

                {successAction && (
                  <div className="mt-6">
                    <Link
                      href={successAction.href}
                      className="snm-button snm-button--navy snm-button--lg"
                    >
                      <span className="snm-button__label">
                        {successAction.label}
                      </span>
                      <span className="snm-button__icon">
                        <ArrowRight size={16} strokeWidth={1.8} />
                      </span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>,
          portalRoot,
        )
      : null;

  return successConfirmationDialog;
}
