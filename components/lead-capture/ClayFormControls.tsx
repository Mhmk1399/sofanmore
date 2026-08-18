"use client";

import Link from "next/link";
import {
  AlertTriangle,
  CalendarDays,
  Camera,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  FileText,
  Image as ImageIcon,
  Loader2,
  RefreshCw,
  UploadCloud,
  X,
} from "lucide-react";
import {
  type ChangeEvent,
  type DragEvent,
  type InputHTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

export type SelectOption = {
  label: string;
  value: string;
};

export type UploadItemStatus =
  | "queued"
  | "signing"
  | "uploading"
  | "completing"
  | "complete"
  | "failed";

export type UploadItem = {
  id: string;
  file: File;
  previewUrl: string;
  progress: number;
  status: UploadItemStatus;
  error?: string;
  uploadToken?: string;
};

type FieldChromeProps = {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
  variant?: "default" | "admin";
};

function describedBy(id: string, error?: string, hint?: string) {
  return [error ? `${id}-error` : "", hint ? `${id}-hint` : ""]
    .filter(Boolean)
    .join(" ");
}

function FieldChrome({
  id,
  label,
  required,
  error,
  hint,
  children,
  variant = "default",
}: FieldChromeProps) {
  const isAdmin = variant === "admin";

  return (
    <div className="min-w-0">
      <label
        htmlFor={id}
        className={`block font-brand-sans font-bold uppercase tracking-[0.12em] text-[var(--brand-navy)] ${
          isAdmin ? "text-[10px] text-[var(--brand-navy)]/70" : "text-[11px]"
        }`}
      >
        {label}
        {required && (
          <span className="ml-1 text-[var(--brand-gold-700)]">*</span>
        )}
      </label>

      <div className={isAdmin ? "mt-1.5" : "mt-2"}>{children}</div>

      {hint && !error && (
        <p
          id={`${id}-hint`}
          className="mt-2 font-brand-sans text-[10px] font-semibold leading-[1.45] text-[var(--brand-text-muted)]"
        >
          {hint}
        </p>
      )}

      {error && (
        <p
          id={`${id}-error`}
          className="mt-2 flex items-start gap-1.5 font-brand-sans text-[10px] font-bold leading-[1.45] text-[#9b2c2c]"
        >
          <AlertTriangle
            className="mt-[1px] shrink-0"
            size={12}
            strokeWidth={2}
            aria-hidden
          />
          {error}
        </p>
      )}
    </div>
  );
}

const fieldShellClass =
  "clay-inset rounded-[18px] p-[3px] transition-shadow duration-200 focus-within:shadow-[inset_5px_5px_12px_rgba(115,84,50,0.12),inset_-5px_-5px_12px_rgba(255,255,255,0.92),0_0_0_3px_rgba(215,160,74,0.22)]";

const fieldClass =
  "block w-full rounded-[15px] border-0 bg-white/25 font-brand-sans text-[14px] font-semibold text-[var(--brand-navy)] outline-none transition-colors placeholder:text-[var(--brand-text-muted)]/55 focus:bg-white/40 disabled:cursor-not-allowed disabled:opacity-55";

export type ClayInputProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  hint?: string;
  required?: boolean;
  disabled?: boolean;
  type?: InputHTMLAttributes<HTMLInputElement>["type"];
  autoComplete?: string;
  inputMode?: InputHTMLAttributes<HTMLInputElement>["inputMode"];
  min?: number;
  max?: number;
  placeholder?: string;
};

export function ClayInput({
  id,
  label,
  value,
  onChange,
  error,
  hint,
  required,
  disabled,
  type = "text",
  autoComplete,
  inputMode,
  min,
  max,
  placeholder,
}: ClayInputProps) {
  return (
    <FieldChrome
      id={id}
      label={label}
      required={required}
      error={error}
      hint={hint}
    >
      <div
        className={`${fieldShellClass} ${
          error ? "ring-2 ring-[#9b2c2c]/20" : ""
        }`}
      >
        <input
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          type={type}
          min={min}
          max={max}
          placeholder={placeholder}
          autoComplete={autoComplete}
          inputMode={inputMode}
          required={required}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy(id, error, hint) || undefined}
          className={`${fieldClass} h-[52px] px-4 sm:h-[54px] sm:px-5`}
        />
      </div>
    </FieldChrome>
  );
}

type ClayTextareaProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  hint?: string;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
  placeholder?: string;
};

export function ClayTextarea({
  id,
  label,
  value,
  onChange,
  error,
  hint,
  required,
  disabled,
  rows = 6,
  placeholder,
}: ClayTextareaProps) {
  return (
    <FieldChrome
      id={id}
      label={label}
      required={required}
      error={error}
      hint={hint}
    >
      <div
        className={`${fieldShellClass} ${
          error ? "ring-2 ring-[#9b2c2c]/20" : ""
        }`}
      >
        <textarea
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          rows={rows}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy(id, error, hint) || undefined}
          className={`${fieldClass} min-h-[132px] resize-none px-4 py-4 sm:min-h-[140px] sm:px-5`}
        />
      </div>
    </FieldChrome>
  );
}

type ClaySelectProps = {
  id: string;
  label: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  hint?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
};

export function ClaySelect({
  id,
  label,
  options,
  value,
  onChange,
  error,
  hint,
  required,
  disabled,
  placeholder = "Select",
}: ClaySelectProps) {
  const listboxId = `${id}-listbox`;
  const buttonRef = useRef<HTMLButtonElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(() =>
    Math.max(
      options.findIndex((option) => option.value === value),
      0,
    ),
  );
  const selectedOption = options.find((option) => option.value === value);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (
        rootRef.current &&
        !rootRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  function openList() {
    const selectedIndex = options.findIndex((option) => option.value === value);

    setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0);
    setOpen(true);
  }

  function commitOption(index: number) {
    const option = options[index];

    if (!option) return;

    onChange(option.value);
    setActiveIndex(index);
    setOpen(false);
    buttonRef.current?.focus();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (disabled) return;

    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (!open) {
        openList();
        return;
      }

      setActiveIndex((currentIndex) => {
        const offset = event.key === "ArrowDown" ? 1 : -1;
        return (currentIndex + offset + options.length) % options.length;
      });
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();

      if (open) {
        commitOption(activeIndex);
      } else {
        openList();
      }
    }

    if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
    }
  }

  return (
    <FieldChrome
      id={id}
      label={label}
      required={required}
      error={error}
      hint={hint}
    >
      <div ref={rootRef} className={`relative ${open ? "z-[80]" : "z-0"}`}>
        <div
          className={`${fieldShellClass} ${
            error ? "ring-2 ring-[#9b2c2c]/20" : ""
          }`}
        >
          <button
            ref={buttonRef}
            id={id}
            type="button"
            role="combobox"
            disabled={disabled}
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-controls={listboxId}
            aria-activedescendant={
              open ? `${id}-option-${activeIndex}` : undefined
            }
            aria-invalid={Boolean(error)}
            aria-describedby={describedBy(id, error, hint) || undefined}
            onClick={() => {
              if (open) {
                setOpen(false);
              } else {
                openList();
              }
            }}
            onKeyDown={handleKeyDown}
            className={`${fieldClass} flex h-[52px] items-center justify-between gap-3 px-4 text-left sm:h-[54px] sm:px-5`}
          >
            <span
              className={
                selectedOption
                  ? "truncate"
                  : "truncate text-[var(--brand-text-muted)]/65"
              }
            >
              {selectedOption?.label || placeholder}
            </span>
            <ChevronDown
              aria-hidden
              size={17}
              strokeWidth={1.8}
              className={`shrink-0 text-[var(--brand-gold-700)] transition-transform duration-200 ${
                open ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {open && (
          <div
            id={listboxId}
            role="listbox"
            aria-labelledby={id}
            data-lenis-prevent
            onWheel={(event) => event.stopPropagation()}
            onTouchMove={(event) => event.stopPropagation()}
            className="absolute left-0 right-0 top-[calc(100%+8px)] z-[90] max-h-[260px] overflow-auto rounded-[22px] border border-white/80 bg-[linear-gradient(145deg,#fffefa,#eadccb)] p-2 shadow-[var(--shadow-clay-lg)]"
          >
            {options.map((option, index) => {
              const selected = option.value === value;
              const active = index === activeIndex;

              return (
                <button
                  key={option.value}
                  id={`${id}-option-${index}`}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => commitOption(index)}
                  className={`flex min-h-11 w-full items-center justify-between gap-3 rounded-[15px] px-3.5 py-2.5 text-left font-brand-sans text-[12px] font-bold transition-colors ${
                    active
                      ? "bg-[var(--brand-gold)]/14 text-[var(--brand-navy)]"
                      : "text-[var(--brand-text-muted)]"
                  }`}
                >
                  <span>{option.label}</span>
                  {selected && (
                    <Check
                      aria-hidden
                      size={14}
                      strokeWidth={2}
                      className="text-[var(--brand-gold-700)]"
                    />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </FieldChrome>
  );
}

type ClayDatePickerProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  hint?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  variant?: "default" | "admin";
};

const monthFormatter = new Intl.DateTimeFormat("en-GB", {
  month: "long",
  year: "numeric",
});

const displayDateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

const weekdayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function parseIsoDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;

  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  return date;
}

function formatIsoDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function sameCalendarDay(left: Date | null, right: Date) {
  return Boolean(
    left &&
      left.getFullYear() === right.getFullYear() &&
      left.getMonth() === right.getMonth() &&
      left.getDate() === right.getDate(),
  );
}

function getCalendarDays(displayMonth: Date) {
  const year = displayMonth.getFullYear();
  const month = displayMonth.getMonth();
  const firstOfMonth = new Date(year, month, 1);
  const mondayFirstOffset = (firstOfMonth.getDay() + 6) % 7;

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(year, month, 1 - mondayFirstOffset + index);

    return {
      date,
      inDisplayMonth: date.getMonth() === month,
    };
  });
}

export function ClayDatePicker({
  id,
  label,
  value,
  onChange,
  error,
  hint,
  required,
  disabled,
  placeholder = "Select date",
  variant = "default",
}: ClayDatePickerProps) {
  const calendarId = `${id}-calendar`;
  const buttonRef = useRef<HTMLButtonElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const selectedDate = parseIsoDate(value);
  const [open, setOpen] = useState(false);
  const [displayMonth, setDisplayMonth] = useState(
    () => selectedDate || new Date(),
  );
  const isAdmin = variant === "admin";
  const days = getCalendarDays(displayMonth);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (
        rootRef.current &&
        !rootRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  function changeMonth(offset: number) {
    setDisplayMonth(
      (current) => new Date(current.getFullYear(), current.getMonth() + offset, 1),
    );
  }

  function openCalendar() {
    if (selectedDate) {
      setDisplayMonth(selectedDate);
    }

    setOpen(true);
  }

  function chooseDate(date: Date) {
    onChange(formatIsoDate(date));
    setOpen(false);
    buttonRef.current?.focus();
  }

  const displayValue = selectedDate
    ? displayDateFormatter.format(selectedDate)
    : placeholder;

  return (
    <FieldChrome
      id={id}
      label={label}
      required={required}
      error={error}
      hint={hint}
      variant={variant}
    >
      <div ref={rootRef} className={`relative ${open ? "z-[80]" : "z-0"}`}>
        <div
          className={
            isAdmin
              ? `rounded-xl border border-white/60 bg-white/50 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_0_0_1px_rgba(255,255,255,0.5)_inset] transition-all focus-within:bg-white/70 ${
                  error ? "ring-2 ring-[#9b2c2c]/20" : ""
                }`
              : `${fieldShellClass} ${error ? "ring-2 ring-[#9b2c2c]/20" : ""}`
          }
        >
          <button
            ref={buttonRef}
            id={id}
            type="button"
            disabled={disabled}
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-controls={calendarId}
            aria-describedby={describedBy(id, error, hint) || undefined}
            onClick={() => {
              if (open) {
                setOpen(false);
              } else {
                openCalendar();
              }
            }}
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                event.preventDefault();
                setOpen(false);
              }
            }}
            className={
              isAdmin
                ? "flex h-[40px] w-full items-center justify-between gap-2 rounded-xl border-0 bg-transparent px-3 text-left font-brand-sans text-[12px] font-semibold text-[var(--brand-navy)] outline-none transition-colors placeholder:text-[var(--brand-text-muted)]/50 disabled:cursor-not-allowed disabled:opacity-55"
                : `${fieldClass} flex h-[52px] items-center justify-between gap-3 px-4 text-left sm:h-[54px] sm:px-5`
            }
          >
            <span
              className={
                selectedDate
                  ? "truncate"
                  : "truncate text-[var(--brand-text-muted)]/65"
              }
            >
              {displayValue}
            </span>
            <CalendarDays
              aria-hidden
              size={isAdmin ? 14 : 17}
              strokeWidth={1.8}
              className={
                isAdmin
                  ? "shrink-0 text-[var(--brand-text-muted)]"
                  : "shrink-0 text-[var(--brand-gold-700)]"
              }
            />
          </button>
        </div>

        {open && (
          <div
            id={calendarId}
            role="dialog"
            aria-label={`${label} calendar`}
            data-lenis-prevent
            onWheel={(event) => event.stopPropagation()}
            onTouchMove={(event) => event.stopPropagation()}
            className={`absolute left-0 top-[calc(100%+8px)] z-[95] w-full overflow-hidden border ${
              isAdmin
                ? "min-w-[270px] rounded-xl border-gray-200 bg-white p-2.5 shadow-[0_12px_40px_rgba(0,0,0,0.15)] sm:min-w-[286px]"
                : "min-w-[286px] rounded-[22px] border-white/80 bg-[linear-gradient(145deg,#fffefa,#eadccb)] p-3 shadow-[var(--shadow-clay-lg)] sm:min-w-[318px]"
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                aria-label="Previous month"
                onClick={() => changeMonth(-1)}
                className={
                  isAdmin
                    ? "flex h-8 w-8 items-center justify-center rounded-lg border border-black/[0.06] bg-white/55 text-[var(--brand-navy)] transition-colors hover:bg-white/80"
                    : "clay-inset flex h-9 w-9 items-center justify-center rounded-full text-[var(--brand-navy)] transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-gold)]"
                }
              >
                <ChevronLeft size={16} strokeWidth={1.9} />
              </button>
              <p className="font-brand-sans text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--brand-navy)]">
                {monthFormatter.format(displayMonth)}
              </p>
              <button
                type="button"
                aria-label="Next month"
                onClick={() => changeMonth(1)}
                className={
                  isAdmin
                    ? "flex h-8 w-8 items-center justify-center rounded-lg border border-black/[0.06] bg-white/55 text-[var(--brand-navy)] transition-colors hover:bg-white/80"
                    : "clay-inset flex h-9 w-9 items-center justify-center rounded-full text-[var(--brand-navy)] transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-gold)]"
                }
              >
                <ChevronRight size={16} strokeWidth={1.9} />
              </button>
            </div>

            <div className={`${isAdmin ? "mt-2" : "mt-3"} grid grid-cols-7 gap-1`}>
              {weekdayLabels.map((day) => (
                <span
                  key={day}
                  className="flex h-6 items-center justify-center font-brand-sans text-[8.5px] font-bold uppercase tracking-[0.08em] text-[var(--brand-text-muted)]"
                >
                  {day}
                </span>
              ))}
              {days.map(({ date, inDisplayMonth }) => {
                const selected = sameCalendarDay(selectedDate, date);
                const today = sameCalendarDay(new Date(), date);

                return (
                  <button
                    key={formatIsoDate(date)}
                    type="button"
                    onClick={() => chooseDate(date)}
                    className={`flex aspect-square items-center justify-center font-brand-sans font-bold transition-colors ${
                      selected
                        ? "bg-[var(--brand-navy)] text-white"
                        : inDisplayMonth
                          ? "bg-white/24 text-[var(--brand-navy)] hover:bg-[var(--brand-gold)]/14"
                          : "text-[var(--brand-text-muted)]/38 hover:bg-white/18"
                    } ${
                      isAdmin
                        ? "min-h-8 rounded-lg text-[11px]"
                        : "min-h-9 rounded-[12px] text-[12px]"
                    } ${today && !selected ? "ring-1 ring-[var(--brand-gold)]/55" : ""}`}
                  >
                    {date.getDate()}
                  </button>
                );
              })}
            </div>

            <div
              className={`${isAdmin ? "mt-2 pt-2" : "mt-3 pt-3"} flex items-center justify-between border-t border-[var(--brand-navy)]/8`}
            >
              <button
                type="button"
                onClick={() => {
                  onChange("");
                  setOpen(false);
                  buttonRef.current?.focus();
                }}
                className="font-brand-sans text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--brand-text-muted)] transition-colors hover:text-[var(--brand-navy)]"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={() => chooseDate(new Date())}
                className={
                  isAdmin
                    ? "rounded-lg bg-[var(--brand-navy)] px-3 py-1.5 font-brand-sans text-[10px] font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[var(--brand-navy)]/90"
                    : "rounded-full bg-[var(--brand-gold)]/18 px-3 py-2 font-brand-sans text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--brand-navy)] transition-colors hover:bg-[var(--brand-gold)]/28"
                }
              >
                Today
              </button>
            </div>
          </div>
        )}
      </div>
    </FieldChrome>
  );
}

type ClayRadioGroupProps = {
  label: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  hint?: string;
  required?: boolean;
  disabled?: boolean;
  name: string;
};

export function ClayRadioGroup({
  label,
  options,
  value,
  onChange,
  error,
  hint,
  required,
  disabled,
  name,
}: ClayRadioGroupProps) {
  const groupId = useId();

  return (
    <div>
      <div
        id={`${groupId}-label`}
        className="font-brand-sans text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--brand-navy)]"
      >
        {label}
        {required && (
          <span className="ml-1 text-[var(--brand-gold-700)]">*</span>
        )}
      </div>

      <div
        role="radiogroup"
        aria-labelledby={`${groupId}-label`}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy(groupId, error, hint) || undefined}
        className="mt-2 grid gap-2 sm:grid-cols-2"
      >
        {options.map((option) => {
          const selected = option.value === value;

          return (
            <label
              key={option.value}
              className={`clay-inset flex min-h-[46px] cursor-pointer items-center gap-3 rounded-[17px] p-[3px] transition-transform duration-200 ${
                disabled ? "cursor-not-allowed opacity-55" : "hover:-translate-y-0.5"
              }`}
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={selected}
                onChange={() => onChange(option.value)}
                required={required}
                disabled={disabled}
                className="sr-only"
              />
              <span
                className={`flex h-full min-h-[40px] w-full items-center gap-3 rounded-[14px] px-3.5 font-brand-sans text-[12px] font-bold ${
                  selected
                    ? "bg-[var(--brand-navy)] text-white shadow-[inset_2px_2px_3px_rgba(255,255,255,0.08)]"
                    : "bg-white/22 text-[var(--brand-navy)]"
                }`}
              >
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                    selected
                      ? "border-[var(--brand-gold)] bg-[var(--brand-gold)] text-[var(--brand-navy)]"
                      : "border-[var(--brand-navy)]/18 bg-white/45"
                  }`}
                >
                  {selected && <Check size={12} strokeWidth={2.4} />}
                </span>
                {option.label}
              </span>
            </label>
          );
        })}
      </div>

      {hint && !error && (
        <p
          id={`${groupId}-hint`}
          className="mt-2 font-brand-sans text-[10px] font-semibold leading-[1.45] text-[var(--brand-text-muted)]"
        >
          {hint}
        </p>
      )}

      {error && (
        <p
          id={`${groupId}-error`}
          className="mt-2 flex items-start gap-1.5 font-brand-sans text-[10px] font-bold leading-[1.45] text-[#9b2c2c]"
        >
          <AlertTriangle className="mt-[1px] shrink-0" size={12} aria-hidden />
          {error}
        </p>
      )}
    </div>
  );
}

type ClayCheckboxProps = {
  id: string;
  label: ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
  hint?: string;
  required?: boolean;
  disabled?: boolean;
};

export function ClayCheckbox({
  id,
  label,
  checked,
  onChange,
  error,
  hint,
  required,
  disabled,
}: ClayCheckboxProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className={`clay-inset flex cursor-pointer items-start gap-3 rounded-[18px] p-[3px] ${
          disabled ? "cursor-not-allowed opacity-55" : ""
        } ${error ? "ring-2 ring-[#9b2c2c]/20" : ""}`}
      >
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          required={required}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy(id, error, hint) || undefined}
          className="sr-only"
        />
        <span className="flex min-h-[44px] w-full items-start gap-3 rounded-[15px] bg-white/24 px-3.5 py-3 font-brand-sans text-[11px] font-semibold leading-[1.55] text-[var(--brand-navy)]">
          <span
            aria-hidden
            className={`mt-[1px] flex h-5 w-5 shrink-0 items-center justify-center rounded-[7px] border transition-colors ${
              checked
                ? "border-[var(--brand-gold)] bg-[var(--brand-gold)] text-[var(--brand-navy)]"
                : "border-[var(--brand-navy)]/16 bg-white/55"
            }`}
          >
            {checked && <Check size={13} strokeWidth={2.5} />}
          </span>
          <span>{label}</span>
        </span>
      </label>

      {hint && !error && (
        <p
          id={`${id}-hint`}
          className="mt-2 font-brand-sans text-[10px] font-semibold leading-[1.45] text-[var(--brand-text-muted)]"
        >
          {hint}
        </p>
      )}

      {error && (
        <p
          id={`${id}-error`}
          className="mt-2 flex items-start gap-1.5 font-brand-sans text-[10px] font-bold leading-[1.45] text-[#9b2c2c]"
        >
          <AlertTriangle className="mt-[1px] shrink-0" size={12} aria-hidden />
          {error}
        </p>
      )}
    </div>
  );
}

type ClayCheckboxGroupProps = {
  label: string;
  options: SelectOption[];
  values: string[];
  onChange: (values: string[]) => void;
  error?: string;
  hint?: string;
  disabled?: boolean;
};

export function ClayCheckboxGroup({
  label,
  options,
  values,
  onChange,
  error,
  hint,
  disabled,
}: ClayCheckboxGroupProps) {
  const groupId = useId();
  const selectedValues = new Set(values);

  function toggleValue(value: string, checked: boolean) {
    if (value === "none" && checked) {
      onChange(["none"]);
      return;
    }

    const nextValues = new Set(values.filter((item) => item !== "none"));

    if (checked) {
      nextValues.add(value);
    } else {
      nextValues.delete(value);
    }

    onChange([...nextValues]);
  }

  return (
    <div>
      <div
        id={`${groupId}-label`}
        className="font-brand-sans text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--brand-navy)]"
      >
        {label}
      </div>

      <div
        role="group"
        aria-labelledby={`${groupId}-label`}
        aria-describedby={describedBy(groupId, error, hint) || undefined}
        className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-3"
      >
        {options.map((option) => (
          <label
            key={option.value}
            className={`clay-inset flex min-h-[44px] cursor-pointer rounded-[16px] p-[3px] ${
              disabled ? "cursor-not-allowed opacity-55" : "hover:-translate-y-0.5"
            } transition-transform duration-200`}
          >
            <input
              type="checkbox"
              value={option.value}
              checked={selectedValues.has(option.value)}
              disabled={disabled}
              onChange={(event) =>
                toggleValue(option.value, event.target.checked)
              }
              className="sr-only"
            />
            <span
              className={`flex w-full items-center gap-2.5 rounded-[13px] px-3 font-brand-sans text-[11px] font-bold ${
                selectedValues.has(option.value)
                  ? "bg-[var(--brand-navy)] text-white"
                  : "bg-white/24 text-[var(--brand-navy)]"
              }`}
            >
              <span
                className={`flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-[6px] ${
                  selectedValues.has(option.value)
                    ? "bg-[var(--brand-gold)] text-[var(--brand-navy)]"
                    : "border border-[var(--brand-navy)]/16 bg-white/55"
                }`}
              >
                {selectedValues.has(option.value) && (
                  <Check size={11} strokeWidth={2.4} />
                )}
              </span>
              {option.label}
            </span>
          </label>
        ))}
      </div>

      {hint && !error && (
        <p
          id={`${groupId}-hint`}
          className="mt-2 font-brand-sans text-[10px] font-semibold leading-[1.45] text-[var(--brand-text-muted)]"
        >
          {hint}
        </p>
      )}

      {error && (
        <p
          id={`${groupId}-error`}
          className="mt-2 flex items-start gap-1.5 font-brand-sans text-[10px] font-bold leading-[1.45] text-[#9b2c2c]"
        >
          <AlertTriangle className="mt-[1px] shrink-0" size={12} aria-hidden />
          {error}
        </p>
      )}
    </div>
  );
}

type FormSectionProps = {
  eyebrow?: string;
  title: string;
  children: ReactNode;
};

export function FormSection({ eyebrow, title, children }: FormSectionProps) {
  return (
    <section className="border-t border-[var(--brand-navy)]/8 pt-5 first:border-t-0 first:pt-0">
      <div className="mb-4">
        {eyebrow && (
          <p className="font-brand-sans text-[8px] font-bold uppercase tracking-[0.2em] text-[var(--brand-gold-700)]">
            {eyebrow}
          </p>
        )}
        <h3 className="mt-1 font-brand-display text-[23px] font-semibold leading-[1.08] text-[var(--brand-navy)] sm:text-[26px]">
          {title}
        </h3>
      </div>
      {children}
    </section>
  );
}

function formatFileSize(bytes: number) {
  if (bytes >= 1024 * 1024) {
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  }

  return `${Math.max(bytes / 1024, 1).toFixed(0)} KB`;
}

function uploadStatusLabel(status: UploadItemStatus) {
  if (status === "complete") return "Uploaded";
  if (status === "failed") return "Failed";
  if (status === "queued") return "Queued";
  if (status === "completing") return "Finishing";
  if (status === "signing") return "Preparing";
  return "Uploading";
}

function isPdfFile(file: File) {
  return file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
}

type UploadProgressItemProps = {
  item: UploadItem;
  disabled?: boolean;
  onRetry: (id: string) => void;
  onRemove: (id: string) => void;
};

export function UploadProgressItem({
  item,
  disabled,
  onRetry,
  onRemove,
}: UploadProgressItemProps) {
  const loading =
    item.status === "queued" ||
    item.status === "signing" ||
    item.status === "uploading" ||
    item.status === "completing";

  return (
    <div className="clay-surface-soft rounded-[20px] p-[5px]">
      <div className="flex min-w-0 gap-3 rounded-[16px] bg-white/18 p-3">
        {isPdfFile(item.file) ? (
          <div
            aria-label={`${item.file.name} PDF`}
            role="img"
            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[14px] bg-[var(--brand-navy)] text-[var(--brand-gold)] shadow-[inset_2px_2px_5px_rgba(255,255,255,0.08)]"
          >
            <FileText size={25} strokeWidth={1.6} />
          </div>
        ) : (
          <div
            role="img"
            aria-label={item.file.name}
            className="h-16 w-16 shrink-0 overflow-hidden rounded-[14px] bg-[#e7dac9] bg-cover bg-center shadow-[inset_3px_3px_8px_rgba(115,84,50,0.14),inset_-3px_-3px_8px_rgba(255,255,255,0.85)]"
            style={{ backgroundImage: `url(${item.previewUrl})` }}
          />
        )}

        <div className="min-w-0 flex-1">
          <div className="flex min-w-0 items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate font-brand-sans text-[12px] font-bold text-[var(--brand-navy)]">
                {item.file.name}
              </p>
              <p className="mt-1 font-brand-sans text-[10px] font-bold text-[var(--brand-gold-700)]">
                {Math.max(Math.min(item.progress, 100), 0)}%
              </p>
              <p className="mt-1 font-brand-sans text-[10px] font-semibold text-[var(--brand-text-muted)]">
                {formatFileSize(item.file.size)} · {uploadStatusLabel(item.status)}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-1.5">
              {item.status === "failed" && (
                <button
                  type="button"
                  onClick={() => onRetry(item.id)}
                  disabled={disabled}
                  aria-label={`Retry ${item.file.name}`}
                  className="clay-inset flex h-8 w-8 items-center justify-center rounded-full text-[var(--brand-gold-700)] transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-gold)] disabled:opacity-50"
                >
                  <RefreshCw size={14} strokeWidth={1.8} />
                </button>
              )}

              <button
                type="button"
                onClick={() => onRemove(item.id)}
                disabled={disabled || loading}
                aria-label={`Remove ${item.file.name}`}
                className="clay-inset flex h-8 w-8 items-center justify-center rounded-full text-[var(--brand-navy)] transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-gold)] disabled:opacity-50"
              >
                <X size={14} strokeWidth={1.9} />
              </button>
            </div>
          </div>

          <div className="mt-3 h-2 overflow-hidden rounded-full bg-[var(--brand-navy)]/8">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                item.status === "failed"
                  ? "bg-[#9b2c2c]"
                  : "bg-[var(--brand-gold)]"
              }`}
              style={{ width: `${Math.max(Math.min(item.progress, 100), 4)}%` }}
            />
          </div>

          {item.error && (
            <p className="mt-2 font-brand-sans text-[10px] font-bold leading-[1.45] text-[#9b2c2c]">
              {item.error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

type ClayFileDropzoneProps = {
  id: string;
  label: string;
  items: UploadItem[];
  error?: string;
  disabled?: boolean;
  accept: string;
  maxFiles: number;
  headline?: string;
  hint?: string;
  buttonLabel?: string;
  cameraButtonLabel?: string;
  cameraCapture?: boolean | "user" | "environment";
  onFilesSelected: (files: File[]) => void;
  onRetry: (id: string) => void;
  onRemove: (id: string) => void;
};

export function ClayFileDropzone({
  id,
  label,
  items,
  error,
  disabled,
  accept,
  maxFiles,
  headline = "Project images",
  hint,
  buttonLabel = "Choose Images",
  cameraButtonLabel,
  cameraCapture,
  onFilesSelected,
  onRetry,
  onRemove,
}: ClayFileDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const [dragState, setDragState] = useState<"idle" | "active" | "reject">(
    "idle",
  );

  function readInputFiles(event: ChangeEvent<HTMLInputElement>) {
    onFilesSelected(Array.from(event.target.files || []));
    event.target.value = "";
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragState("idle");

    if (disabled) return;

    onFilesSelected(Array.from(event.dataTransfer.files || []));
  }

  function handleDragOver(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();

    if (disabled) return;

    const acceptsPdf = accept.includes("application/pdf") || accept.includes(".pdf");
    const hasUnsupportedItem = Array.from(event.dataTransfer.items || []).some(
      (item) =>
        item.kind === "file" &&
        !item.type.startsWith("image/") &&
        !(acceptsPdf && item.type === "application/pdf"),
    );

    setDragState(hasUnsupportedItem ? "reject" : "active");
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <label
          htmlFor={id}
          className="font-brand-sans text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--brand-navy)]"
        >
          {label}
        </label>
        <span className="font-brand-sans text-[10px] font-bold text-[var(--brand-text-muted)]">
          {items.length}/{maxFiles}
        </span>
      </div>

      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-describedby={error ? `${id}-error` : `${id}-hint`}
        aria-disabled={disabled}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDrop={handleDrop}
        onDragEnter={handleDragOver}
        onDragOver={handleDragOver}
        onDragLeave={() => setDragState("idle")}
        className={`clay-inset mt-2 rounded-[22px] p-[5px] transition-transform duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-gold)] ${
          disabled ? "cursor-not-allowed opacity-55" : "cursor-pointer"
        } ${dragState === "active" ? "-translate-y-0.5 ring-2 ring-[var(--brand-gold)]/25" : ""} ${
          dragState === "reject" ? "ring-2 ring-[#9b2c2c]/25" : ""
        }`}
      >
        <div className="flex min-h-[138px] flex-col items-center justify-center rounded-[18px] bg-white/22 px-4 py-5 text-center">
          <span className="clay-surface-strong flex h-12 w-12 items-center justify-center rounded-full text-[var(--brand-gold-700)]">
            {dragState === "reject" ? (
              <AlertTriangle size={20} strokeWidth={1.7} />
            ) : (
              <UploadCloud size={21} strokeWidth={1.7} />
            )}
          </span>
          <p className="mt-3 font-brand-display text-[20px] font-semibold leading-[1.12] text-[var(--brand-navy)]">
            {headline}
          </p>
          <p
            id={`${id}-hint`}
            className="mt-2 max-w-[360px] font-brand-sans text-[11px] font-semibold leading-[1.6] text-[var(--brand-text-muted)]"
          >
            {hint || `JPG, PNG, or WebP. Up to ${maxFiles} files, 10MB each.`}
          </p>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            <button
              type="button"
              disabled={disabled}
              onClick={(event) => {
                event.stopPropagation();
                inputRef.current?.click();
              }}
              className="snm-button snm-button--ivory snm-button--sm"
            >
              <span className="snm-button__icon">
                <ImageIcon size={14} strokeWidth={1.8} />
              </span>
              <span className="snm-button__label">{buttonLabel}</span>
            </button>

            {cameraCapture && cameraButtonLabel && (
              <button
                type="button"
                disabled={disabled}
                onClick={(event) => {
                  event.stopPropagation();
                  cameraInputRef.current?.click();
                }}
                className="snm-button snm-button--ivory snm-button--sm"
              >
                <span className="snm-button__icon">
                  <Camera size={14} strokeWidth={1.8} />
                </span>
                <span className="snm-button__label">{cameraButtonLabel}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <input
        ref={inputRef}
        id={id}
        type="file"
        multiple
        accept={accept}
        disabled={disabled}
        onChange={readInputFiles}
        className="sr-only"
      />

      {cameraCapture && (
        <input
          ref={cameraInputRef}
          type="file"
          accept={accept}
          capture={cameraCapture}
          disabled={disabled}
          onChange={readInputFiles}
          className="sr-only"
        />
      )}

      {error && (
        <p
          id={`${id}-error`}
          className="mt-2 flex items-start gap-1.5 font-brand-sans text-[10px] font-bold leading-[1.45] text-[#9b2c2c]"
        >
          <AlertTriangle className="mt-[1px] shrink-0" size={12} aria-hidden />
          {error}
        </p>
      )}

      {items.length > 0 && (
        <div className="mt-4 grid gap-3">
          {items.map((item) => (
            <UploadProgressItem
              key={item.id}
              item={item}
              disabled={disabled}
              onRetry={onRetry}
              onRemove={onRemove}
            />
          ))}
        </div>
      )}
    </div>
  );
}

type FormErrorStateProps = {
  title?: string;
  message?: string;
};

export function FormErrorState({
  title = "We couldn't send your project.",
  message = "Your information is still on this page. Please try again or contact Sofa N More directly.",
}: FormErrorStateProps) {
  return (
    <div
      role="alert"
      className="clay-surface-soft rounded-[22px] p-[5px]"
    >
      <div className="flex gap-3 rounded-[18px] bg-white/20 p-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#9b2c2c]/10 text-[#9b2c2c]">
          <AlertTriangle size={18} strokeWidth={1.8} />
        </span>
        <div>
          <p className="font-brand-display text-[21px] font-semibold leading-[1.15] text-[var(--brand-navy)]">
            {title}
          </p>
          <p className="mt-2 font-brand-sans text-[11px] font-semibold leading-[1.6] text-[var(--brand-text-muted)]">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}

type FormSuccessStateProps = {
  leadId?: string;
  title?: string;
  message?: string;
  eyebrow?: string;
  action?: {
    href: string;
    label: string;
  };
};

export function FormSuccessState({
  leadId,
  title = "Thank You - We've Received Your Sofa Project.",
  message = "Our team can now review your requirements and uploaded images. We'll use the contact details you provided to discuss the next step.",
  eyebrow = "Project received",
  action,
}: FormSuccessStateProps) {
  return (
    <div className="clay-surface-strong rounded-[30px] p-[7px]">
      <div className="clay-inset rounded-[24px] px-5 py-8 text-center sm:px-8 sm:py-10">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--brand-navy)] text-[var(--brand-gold)] shadow-[inset_2px_2px_3px_rgba(255,255,255,0.08)]">
          <CheckCircle2 size={28} strokeWidth={1.6} />
        </span>
        <p className="mt-6 font-brand-sans text-[8px] font-bold uppercase tracking-[0.22em] text-[var(--brand-gold-700)]">
          {eyebrow}
        </p>
        <h3 className="mx-auto mt-3 max-w-[620px] font-brand-display text-[34px] font-semibold leading-[1.03] text-[var(--brand-navy)] sm:text-[44px]">
          {title}
        </h3>
        <p className="mx-auto mt-4 max-w-[620px] font-brand-sans text-[12px] font-semibold leading-[1.75] text-[var(--brand-text-muted)] sm:text-[13px]">
          {message}
        </p>
        {leadId && (
          <p className="mx-auto mt-5 inline-flex rounded-full bg-[var(--brand-gold)]/12 px-4 py-2 font-brand-sans text-[10px] font-bold uppercase tracking-[0.13em] text-[var(--brand-gold-700)]">
            Reference {leadId.slice(-8).toUpperCase()}
          </p>
        )}
        {action && (
          <div className="mt-6 flex justify-center">
            <Link
              href={action.href}
              className="snm-button snm-button--navy snm-button--md"
            >
              <span className="snm-button__label">{action.label}</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export function Spinner() {
  return (
    <Loader2
      aria-hidden
      size={17}
      strokeWidth={2}
      className="animate-spin"
    />
  );
}
