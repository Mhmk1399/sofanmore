import { describe, expect, it } from "vitest";

import { ApiProblem } from "@/lib/api-response";
import { validateProfilePatchInput } from "@/lib/auth-validation";

function expectValidationProblem(callback: () => unknown) {
  try {
    callback();
  } catch (error) {
    expect(error).toBeInstanceOf(ApiProblem);
    return error as ApiProblem;
  }

  throw new Error("Expected validation to fail.");
}

describe("profile validation", () => {
  it("accepts profile name and phone updates", () => {
    expect(
      validateProfilePatchInput({
        name: "Admin User",
        phone: "+44 7700 900123",
      }),
    ).toMatchObject({
      name: "Admin User",
      phone: "+44 7700 900123",
      phoneNormalized: "+447700900123",
    });
  });

  it("requires current password when changing password", () => {
    const problem = expectValidationProblem(() =>
      validateProfilePatchInput({
        newPassword: "StrongPass123!",
      }),
    );

    expect(problem.fieldErrors).toMatchObject({
      currentPassword: "Enter your current password.",
    });
  });

  it("does not require a password when only profile details change", () => {
    expect(
      validateProfilePatchInput({
        name: "Updated Admin",
        phone: "+44 7700 900999",
        currentPassword: "BrowserAutofilled123!",
      }),
    ).toMatchObject({
      name: "Updated Admin",
      phoneNormalized: "+447700900999",
    });
  });

  it("requires strong new passwords", () => {
    const problem = expectValidationProblem(() =>
      validateProfilePatchInput({
        currentPassword: "OldPass123!",
        newPassword: "weak",
      }),
    );

    expect(problem.fieldErrors?.newPassword).toContain(
      "Use at least 10 characters.",
    );
  });
});
