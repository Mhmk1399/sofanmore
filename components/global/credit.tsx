import type { ComponentPropsWithoutRef, CSSProperties } from "react";
import styles from "./credit.module.css";

export type CheetahNovaCreditTheme = "dark" | "light" | "auto";
export type CheetahNovaCreditVariant = "signature" | "pill" | "minimal";
export type CheetahNovaCreditSize = "sm" | "md" | "lg";

type NativeAnchorProps = Omit<
  ComponentPropsWithoutRef<"a">,
  "children" | "dangerouslySetInnerHTML" | "href" | "color"
>;

export interface CheetahNovaCreditProps extends NativeAnchorProps {
  /** Your actual, absolute website URL. Intentionally has no guessed default. */
  href: string;
  text?: string;
  brandName?: string;
  /** A URL/path to your image. Put the supplied logo in /public. */
  logoSrc?: string;
  /** Empty by default: the adjacent brand name already identifies the logo. */
  logoAlt?: string;
  showLogo?: boolean;
  /** Image box width/height in CSS pixels. */
  logoSize?: number;
  theme?: CheetahNovaCreditTheme;
  variant?: CheetahNovaCreditVariant;
  size?: CheetahNovaCreditSize;
  layout?: "stacked" | "inline";
  brandDir?: "ltr" | "rtl" | "auto";
  textColor?: string;
  brandColor?: string;
  accentColor?: string;
  backgroundColor?: string;
  borderColor?: string;
  /** Numbers are interpreted as pixels, as with ordinary React styles. */
  borderRadius?: CSSProperties["borderRadius"];
  gap?: CSSProperties["gap"];
  fontFamily?: CSSProperties["fontFamily"];
  showArrow?: boolean;
  animated?: boolean;
}

type CreditStyle = CSSProperties & {
  [key: `--cn-${string}`]: string | number | undefined;
};

const logoSizes: Record<CheetahNovaCreditSize, number> = {
  sm: 36,
  md: 48,
  lg: 56,
};

function cssLength(value: string | number | undefined): string | undefined {
  return typeof value === "number" ? `${value}px` : value;
}

function linkRel(rel: string | undefined, target: string | undefined) {
  const tokens = rel?.trim().split(/\s+/).filter(Boolean) ?? [];

  if (
    target?.toLowerCase() === "_blank" &&
    !tokens.some((token) => token.toLowerCase() === "noopener")
  ) {
    tokens.push("noopener");
  }

  return tokens.length ? tokens.join(" ") : undefined;
}

/**
 * A small, server-renderable footer signature. No hooks or client boundary.
 *
 * Renders a real <a href>. Its default rel is omitted (or just noopener when
 * target="_blank"). To qualify a placement, pass rel="sponsored" or
 * rel="nofollow" explicitly. No component can guarantee ranking credit.
 */
export function CheetahNovaCredit({
  href,
  text = "Powered by",
  brandName = "CheetahNova",
  logoSrc = "/assets/images/brand-logo.webp",
  logoAlt = "",
  showLogo = true,
  logoSize,
  theme = "dark",
  variant = "signature",
  size = "md",
  layout = "stacked",
  dir = "ltr",
  brandDir = "ltr",
  textColor,
  brandColor,
  accentColor,
  backgroundColor,
  borderColor,
  borderRadius,
  gap,
  fontFamily,
  showArrow = true,
  animated = true,
  className,
  style,
  target,
  rel,
  ...anchorProps
}: CheetahNovaCreditProps) {
  const imageSize =
    logoSize !== undefined && Number.isFinite(logoSize)
      ? Math.max(1, logoSize)
      : logoSizes[size];

  const creditStyle: CreditStyle = {
    "--cn-logo-size": `${imageSize}px`,
    "--cn-text": textColor,
    "--cn-brand": brandColor,
    "--cn-accent": accentColor,
    "--cn-background": backgroundColor,
    "--cn-border": borderColor,
    "--cn-radius": cssLength(borderRadius),
    "--cn-gap": cssLength(gap),
    "--cn-font-family": fontFamily,
    ...style,
  };

  return (
    <a
      {...anchorProps}
      href={href}
      target={target}
      rel={linkRel(rel, target)}
      dir={dir}
      className={[styles.root, className].filter(Boolean).join(" ")}
      style={creditStyle}
      data-theme={theme}
      data-variant={variant}
      data-size={size}
      data-layout={layout}
      data-animated={animated}
    >
      {showLogo && (
        // A tiny portable brand asset: native img avoids requiring Next/Image
        // configuration when this component is copied into different projects.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className={styles.logo}
          src={logoSrc}
          alt={logoAlt}
          width={imageSize}
          height={imageSize}
          loading="lazy"
          decoding="async"
        />
      )}

      <span className={styles.copy}>
        {text && <span className={styles.prefix}>{text} </span>}
        <span className={styles.brand}>
          <bdi dir={brandDir}>{brandName}</bdi>
        </span>
      </span>

      {showArrow && (
        <svg
          className={styles.arrow}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="M7 17 17 7M7 7h10v10"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </a>
  );
}

export default CheetahNovaCredit;
