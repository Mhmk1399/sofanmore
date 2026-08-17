import { createHmac, timingSafeEqual } from "crypto";
import { ObjectId } from "mongodb";

export const AUTH_COOKIE_NAME = "snm_session";
export const AUTH_SESSION_TTL_SECONDS = 7 * 24 * 60 * 60;

type SessionPayload = {
  userId: string;
  exp: number;
};

const DEVELOPMENT_AUTH_SECRET = "development-only-change-auth-session-secret";

function getAuthSecret() {
  const secret = process.env.AUTH_SESSION_SECRET;

  if (secret && secret.length >= 32) {
    return secret;
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error("AUTH_SESSION_SECRET must be at least 32 characters.");
  }

  return DEVELOPMENT_AUTH_SECRET;
}

function base64UrlJson(value: unknown) {
  return Buffer.from(JSON.stringify(value)).toString("base64url");
}

function sign(value: string) {
  return createHmac("sha256", getAuthSecret()).update(value).digest("base64url");
}

function verifySignature(value: string, signature: string) {
  const expected = Buffer.from(sign(value), "base64url");
  const received = Buffer.from(signature, "base64url");

  return (
    expected.length === received.length && timingSafeEqual(expected, received)
  );
}

export function createAuthSessionToken(userId: string) {
  const payload: SessionPayload = {
    userId,
    exp: Math.floor(Date.now() / 1000) + AUTH_SESSION_TTL_SECONDS,
  };
  const encodedPayload = base64UrlJson(payload);

  return `${encodedPayload}.${sign(encodedPayload)}`;
}

export function readAuthSessionToken(request: Request) {
  const cookieHeader = request.headers.get("cookie") || "";
  const cookies = cookieHeader.split(";").map((cookie) => cookie.trim());
  const sessionCookie = cookies.find((cookie) =>
    cookie.startsWith(`${AUTH_COOKIE_NAME}=`),
  );

  if (!sessionCookie) return "";

  return decodeURIComponent(sessionCookie.slice(AUTH_COOKIE_NAME.length + 1));
}

export function verifyAuthSessionToken(token: string) {
  if (!token) return null;

  const [encodedPayload, signature] = token.split(".");

  if (!encodedPayload || !signature || !verifySignature(encodedPayload, signature)) {
    return null;
  }

  try {
    const payload = JSON.parse(
      Buffer.from(encodedPayload, "base64url").toString("utf8"),
    ) as Partial<SessionPayload>;

    if (
      typeof payload.userId !== "string" ||
      !ObjectId.isValid(payload.userId) ||
      typeof payload.exp !== "number" ||
      payload.exp < Math.floor(Date.now() / 1000)
    ) {
      return null;
    }

    return {
      userId: payload.userId,
      exp: payload.exp,
    };
  } catch {
    return null;
  }
}

function serializeCookie(input: {
  value: string;
  maxAge: number;
}) {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";

  return `${AUTH_COOKIE_NAME}=${encodeURIComponent(
    input.value,
  )}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${input.maxAge}${secure}`;
}

export function createAuthSessionCookie(userId: string) {
  return serializeCookie({
    value: createAuthSessionToken(userId),
    maxAge: AUTH_SESSION_TTL_SECONDS,
  });
}

export function clearAuthSessionCookie() {
  return serializeCookie({
    value: "",
    maxAge: 0,
  });
}
