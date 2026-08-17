import { createHash } from "crypto";

import { ApiProblem } from "@/lib/api-response";

const DEVELOPMENT_HASH_SECRET = "development-only-change-ip-hash-secret";

function getHashSecret() {
  const secret = process.env.IP_HASH_SECRET;

  if (secret && secret.length >= 32) {
    return secret;
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error("IP_HASH_SECRET must be at least 32 characters.");
  }

  return DEVELOPMENT_HASH_SECRET;
}

export function hashWithServerSecret(value: string, purpose: string) {
  return createHash("sha256")
    .update(`${getHashSecret()}:${purpose}:${value}`)
    .digest("hex");
}

export function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const forwardedIp = forwardedFor?.split(",")[0]?.trim();

  return (
    forwardedIp ||
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

export function getIpHash(request: Request) {
  return hashWithServerSecret(getClientIp(request), "ip");
}

export function getUploadSessionHash(uploadSessionId: string) {
  return hashWithServerSecret(uploadSessionId, "upload-session");
}

export function normalizeUserAgent(request: Request) {
  const value = request.headers.get("user-agent") || "";
  return value.replace(/[\u0000-\u001f\u007f]/g, "").slice(0, 400);
}

function getConfiguredOrigins() {
  const origins = new Set<string>();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const extraOrigins = process.env.ALLOWED_FORM_ORIGINS;

  for (const candidate of [
    siteUrl,
    ...(extraOrigins ? extraOrigins.split(",") : []),
  ]) {
    const trimmed = candidate?.trim();

    if (!trimmed) continue;

    try {
      origins.add(new URL(trimmed).origin);
    } catch {
      // Ignore malformed optional environment values.
    }
  }

  return origins;
}

export function assertSameOrigin(request: Request) {
  const originHeader = request.headers.get("origin");

  if (!originHeader) {
    return;
  }

  let requestOrigin: string;

  try {
    requestOrigin = new URL(originHeader).origin;
  } catch {
    throw new ApiProblem(
      "VALIDATION_ERROR",
      "Invalid request origin.",
      403,
    );
  }

  const allowedOrigins = getConfiguredOrigins();
  const forwardedHost = request.headers.get("x-forwarded-host");
  const host = forwardedHost || request.headers.get("host");
  const forwardedProto = request.headers.get("x-forwarded-proto");
  const requestUrl = new URL(request.url);

  if (host) {
    const proto = forwardedProto || requestUrl.protocol.replace(":", "");
    allowedOrigins.add(`${proto}://${host}`);
  }

  allowedOrigins.add(requestUrl.origin);

  if (!allowedOrigins.has(requestOrigin)) {
    throw new ApiProblem(
      "VALIDATION_ERROR",
      "This form can only be submitted from Sofa N More.",
      403,
    );
  }
}
