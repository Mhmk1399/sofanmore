import { AlertTriangle } from "lucide-react";

export default function FormSubmissionError({
  id,
  fieldErrors = {},
  submitError,
}: {
  id: string;
  fieldErrors?: Record<string, string | undefined>;
  submitError?: string;
}) {
  const firstFieldError = Object.values(fieldErrors).find(Boolean);
  const message = submitError || firstFieldError;
  if (!message) return null;

  return (
    <p
      id={id}
      role="alert"
      aria-atomic="true"
      data-form-submission-error
      className="mt-3 flex w-full items-start justify-center gap-2 font-brand-sans text-[13px] font-semibold leading-relaxed text-[#9b2c2c]"
    >
      <AlertTriangle aria-hidden="true" size={16} className="mt-0.5 shrink-0" />
      <span>
        {!submitError && "Please check the highlighted fields. "}
        {message}
      </span>
    </p>
  );
}
