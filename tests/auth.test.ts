import { ObjectId } from "mongodb";
import { describe, expect, it } from "vitest";

import { ApiProblem } from "@/lib/api-response";
import { hashPassword, verifyPassword } from "@/lib/auth-password";
import {
  createAuthSessionCookie,
  createAuthSessionToken,
  verifyAuthSessionToken,
} from "@/lib/auth-session";
import {
  passwordStrengthErrors,
  validateLoginInput,
  validateSignupInput,
  validateUserPatchInput,
} from "@/lib/auth-validation";

function expectValidationProblem(callback: () => unknown) {
  try {
    callback();
  } catch (error) {
    expect(error).toBeInstanceOf(ApiProblem);
    return error as ApiProblem;
  }

  throw new Error("Expected validation to fail.");
}

describe("auth validation", () => {
  it("normalizes signup phones and requires strong passwords", () => {
    const valid = validateSignupInput({
      name: "Ava Admin",
      phone: "+44 (0) 7123 456789",
      password: "SofaNMore!2026",
    });

    expect(valid).toMatchObject({
      name: "Ava Admin",
      phoneNormalized: "+4407123456789",
    });

    const problem = expectValidationProblem(() =>
      validateSignupInput({
        name: "A",
        phone: "123",
        password: "weak",
      }),
    );

    expect(problem.fieldErrors).toMatchObject({
      name: "Use at least 2 characters.",
      phone: "Enter a valid phone number.",
    });
    expect(problem.fieldErrors?.password).toContain("Use at least 10 characters.");
  });

  it("accepts login passwords without strength checks", () => {
    expect(
      validateLoginInput({
        phone: "07123 456789",
        password: "legacy",
      }),
    ).toMatchObject({
      phoneNormalized: "07123456789",
      password: "legacy",
    });
  });

  it("validates user admin patches", () => {
    expect(validateUserPatchInput({ role: "ADMIN" })).toEqual({
      role: "ADMIN",
    });
    expect(validateUserPatchInput({ isActive: false })).toEqual({
      isActive: false,
    });

    const emptyPatch = expectValidationProblem(() => validateUserPatchInput({}));
    const invalidRole = expectValidationProblem(() =>
      validateUserPatchInput({ role: "OWNER" }),
    );

    expect(emptyPatch.fieldErrors).toMatchObject({
      body: "Choose something to update.",
    });
    expect(invalidRole.fieldErrors).toMatchObject({
      role: "Choose a valid role.",
    });
  });

  it("reports password strength issues clearly", () => {
    expect(passwordStrengthErrors("SofaNMore!2026")).toEqual([]);
    expect(passwordStrengthErrors("password")).toEqual(
      expect.arrayContaining([
        "Use at least 10 characters.",
        "Add an uppercase letter.",
        "Add a number.",
        "Add a symbol.",
      ]),
    );
  });
});

describe("auth password and sessions", () => {
  it("hashes and verifies passwords", async () => {
    const hash = await hashPassword("SofaNMore!2026");

    expect(hash).toMatch(/^scrypt:v1:/);
    await expect(verifyPassword("SofaNMore!2026", hash)).resolves.toBe(true);
    await expect(verifyPassword("WrongPassword!2026", hash)).resolves.toBe(false);
  });

  it("signs tamper-resistant session tokens and cookies", () => {
    const previousSecret = process.env.AUTH_SESSION_SECRET;
    const userId = new ObjectId().toHexString();

    process.env.AUTH_SESSION_SECRET =
      "test-auth-session-secret-with-more-than-32-chars";

    const token = createAuthSessionToken(userId);
    const session = verifyAuthSessionToken(token);

    expect(session?.userId).toBe(userId);
    expect(verifyAuthSessionToken(`${token}tampered`)).toBeNull();
    expect(createAuthSessionCookie(userId)).toContain("HttpOnly");

    if (previousSecret == null) {
      delete process.env.AUTH_SESSION_SECRET;
    } else {
      process.env.AUTH_SESSION_SECRET = previousSecret;
    }
  });
});
