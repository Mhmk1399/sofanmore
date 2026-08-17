import { randomBytes, scrypt, timingSafeEqual } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);
const KEY_LENGTH = 64;

export async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("base64url");
  const derivedKey = (await scryptAsync(password, salt, KEY_LENGTH)) as Buffer;

  return `scrypt:v1:${salt}:${derivedKey.toString("base64url")}`;
}

export async function verifyPassword(password: string, storedHash: string) {
  const [scheme, version, salt, hash] = storedHash.split(":");

  if (scheme !== "scrypt" || version !== "v1" || !salt || !hash) {
    return false;
  }

  const expected = Buffer.from(hash, "base64url");
  const derivedKey = (await scryptAsync(password, salt, expected.length)) as Buffer;

  return (
    expected.length === derivedKey.length && timingSafeEqual(expected, derivedKey)
  );
}
