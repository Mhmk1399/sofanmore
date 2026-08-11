"use client";

import Link from "next/link";
import { MoveRight } from "lucide-react";

import type { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from "react";

type ClayButtonVariant = "gold" | "navy" | "ivory" | "outline";

type ClayButtonSize = "sm" | "md" | "lg";

type ClayButtonProps = {
  children: ReactNode;

  href?: string;

  onClick?: MouseEventHandler<HTMLButtonElement>;

  variant?: ClayButtonVariant;

  size?: ClayButtonSize;

  fullWidth?: boolean;

  disabled?: boolean;

  loading?: boolean;

  showArrow?: boolean;

  startIcon?: ReactNode;

  endIcon?: ReactNode;

  className?: string;

  target?: "_blank" | "_self";

  ariaLabel?: string;

  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
};

export default function ClayButton({
  children,

  href,

  onClick,

  variant = "gold",

  size = "md",

  fullWidth = false,

  disabled = false,

  loading = false,

  showArrow = false,

  startIcon,

  endIcon,

  className = " ",

  target,

  ariaLabel,

  type = "button",
}: ClayButtonProps) {
  const classes = [
    "snm-button",
    `snm-button--${variant}`,
    `snm-button--${size}`,

    fullWidth ? "snm-button--full" : "",

    disabled || loading ? "snm-button--disabled" : "",

    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {loading ? (
        <span className="snm-button__loader" aria-hidden="true" />
      ) : (
        startIcon && <span className="snm-button__icon">{startIcon}</span>
      )}

      <span className="snm-button__label">
        {loading ? "Please wait..." : children}
      </span>

      {!loading && (
        <>
          {endIcon && (
            <span className="snm-button__icon snm-button__icon--end">
              {endIcon}
            </span>
          )}

          {!endIcon && showArrow && (
            <span className="snm-button__arrow">
              <MoveRight size={17} strokeWidth={1.8} />
            </span>
          )}
        </>
      )}
    </>
  );

  /*
   * LINK MODE
   */
  if (href && !disabled && !loading) {
    return (
      <Link
        href={href}
        target={target}
        aria-label={ariaLabel}
        className={classes}
      >
        {content}
      </Link>
    );
  }

  /*
   * BUTTON MODE
   */
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      aria-busy={loading}
      className={classes}
    >
      {content}
    </button>
  );
}
