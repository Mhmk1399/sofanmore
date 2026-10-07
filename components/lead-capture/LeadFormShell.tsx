"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, Send, Sofa } from "lucide-react";
import {
  useEffect,
  useRef,
  type FormEvent,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";

import { Spinner } from "@/components/lead-capture/ClayFormControls";
import { useToast } from "@/components/ui/ToastProvider";

const DIALOG_FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

type LeadFormShellProps = {
  id: string;
  eyebrow: string;
  title: ReactNode;
  intro: ReactNode;
  icon?: ReactNode;
  children: ReactNode;
  successLeadId?: string;
  successTitle?: string;
  successMessage?: string;
  successEyebrow?: string;
  successAction?: {
    href: string;
    label: string;
  };
  submitError?: string;
  errorTitle?: string;
  isSubmitting: boolean;
  canSubmit: boolean;
  footerNote?: string;
  submitLabel: string;
  loadingLabel: string;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export default function LeadFormShell({
  id,
  eyebrow,
  title,
  intro,
  icon,
  children,
  successLeadId,
  successTitle,
  successMessage,
  successEyebrow,
  successAction,
  submitError,
  errorTitle,
  isSubmitting,
  canSubmit,
  footerNote,
  submitLabel,
  loadingLabel,
  onSubmit,
}: LeadFormShellProps) {
  const toast = useToast();
  const lastSuccessLeadId = useRef("");
  const lastSubmitError = useRef("");
  const successDialogRef = useRef<HTMLDivElement>(null);
  const portalRoot = typeof document === "undefined" ? null : document.body;

  useEffect(() => {
    if (!successLeadId) {
      lastSuccessLeadId.current = "";
      return;
    }

    if (lastSuccessLeadId.current === successLeadId) return;

    lastSuccessLeadId.current = successLeadId;
    toast.success(successTitle || "Request sent.", successMessage);
  }, [successLeadId, successMessage, successTitle, toast]);

  useEffect(() => {
    if (!submitError) {
      lastSubmitError.current = "";
      return;
    }

    if (lastSubmitError.current === submitError) return;

    lastSubmitError.current = submitError;
    toast.error(errorTitle || "Request could not be sent.", submitError);
  }, [errorTitle, submitError, toast]);

  useEffect(() => {
    if (!successLeadId || !portalRoot) return;

    successDialogRef.current?.focus();
  }, [portalRoot, successLeadId]);

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

  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="relative scroll-mt-[calc(104px+env(safe-area-inset-top))] overflow-hidden bg-[var(--brand-ivory)] px-3 py-8 sm:px-5 sm:py-10 lg:scroll-mt-[118px] lg:px-7 lg:py-12"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#FFFDF8_0%,#F5F2EA_55%,#EEE2D3_100%)]"
      />

      <div className="relative z-10 mx-auto max-w-[var(--site-width)]">
        <div className="clay-surface-strong rounded-[30px] p-[6px] sm:rounded-[38px] sm:p-[8px] lg:rounded-[44px]">
          <div className="clay-inset relative rounded-[24px] bg-[#F5EDE1] px-4 py-5 sm:rounded-[30px] sm:px-6 sm:py-6 lg:rounded-[36px] lg:px-8 lg:py-8">
            <div
              aria-hidden
              className="pointer-events-none absolute right-[-90px] top-[-120px] h-[260px] w-[260px] rounded-full border border-[var(--brand-gold)]/18"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute bottom-[-150px] left-[8%] h-[270px] w-[270px] rounded-full border border-white/70"
            />

            <div className="relative z-10">
              <div className="mx-auto max-w-[780px] text-center">
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--brand-navy)] text-[var(--brand-gold)] shadow-[inset_2px_2px_5px_rgba(255,255,255,0.08)]">
                  {icon || <Sofa size={21} strokeWidth={1.5} />}
                </span>
                <p className="mt-4 font-brand-sans text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--brand-gold-700)]">
                  {eyebrow}
                </p>
                <h2
                  id={`${id}-heading`}
                  className="mx-auto mt-2 font-brand-display text-[20px] font-bold leading-[1.04] text-[var(--brand-navy)]  lg:text-[48px]"
                >
                  {title}
                </h2>
                <div className="mx-auto mt-3 max-w-[620px] font-brand-sans text-[12px] font-semibold leading-[1.65] text-[var(--brand-text-muted)] sm:text-[13px]">
                  {intro}
                </div>
              </div>

              <div className="relative z-20 mt-7 min-w-0 sm:mt-8">
                <div className="mx-auto max-w-[1180px]">
                  <form
                    onSubmit={onSubmit}
                    className="space-y-6 lg:space-y-7"
                    noValidate
                    aria-hidden={successLeadId ? true : undefined}
                    inert={successLeadId ? true : undefined}
                  >
                    {children}

                    <div className="sticky bottom-3 z-20 rounded-[24px] bg-[var(--brand-ivory)]/86 p-[5px] shadow-[0_16px_34px_rgba(76,54,30,0.16)] backdrop-blur lg:static lg:bg-transparent lg:p-0 lg:shadow-none">
                      <div className="clay-surface-strong rounded-[21px] p-[5px]">
                        <div className="flex flex-col gap-3 rounded-[17px] bg-white/18 p-3 sm:items-center sm:justify-between">
                          {footerNote && (
                            <p className="font-brand-sans text-[13px] font-bold leading-[1.55] text-[var(--brand-text-muted)]">
                              {footerNote}
                            </p>
                          )}
                          <button
                            type="submit"
                            disabled={!canSubmit || isSubmitting}
                            aria-busy={isSubmitting}
                            className="snm-button snm-button--gold snm-button--lg snm-button--full sm:min-w-[310px] lg:min-w-[360px] disabled:pointer-events-none disabled:opacity-55"
                          >
                            <span className="snm-button__icon">
                              {isSubmitting ? (
                                <Spinner />
                              ) : (
                                <Send size={16} strokeWidth={1.8} />
                              )}
                            </span>
                            <span className="snm-button__label">
                              {isSubmitting ? loadingLabel : submitLabel}
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>

                  {successConfirmationDialog}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
