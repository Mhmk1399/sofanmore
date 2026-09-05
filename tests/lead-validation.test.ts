import { describe, expect, it } from "vitest";

import { ApiProblem } from "../lib/api-response";
import { validateLeadSubmissionInput } from "../lib/lead-validation";

const startedAt = Date.now() - 5000;

function basePayload() {
  return {
    contact: {
      name: "Test User",
      phone: "+44 7400 577844",
    },
    privacyConsent: true,
    marketingConsent: false,
    idempotencyKey: "lead:test:123456789",
    formStartedAt: startedAt,
  };
}

describe("validateLeadSubmissionInput", () => {
  it("accepts the current minimal bespoke sofa form payload", () => {
    const result = validateLeadSubmissionInput({
      ...basePayload(),
      service: "BESPOKE_SOFA",
      serviceData: {
        projectType: "single-sofa",
        spaceType: "living-room",
        dimensionsKnown: false,
      },
      uploadTokens: [],
    });

    expect(result.service).toBe("BESPOKE_SOFA");
    expect(result.contact.postcode).toBeUndefined();
  });

  it("accepts the current minimal commercial sofa form payload", () => {
    const result = validateLeadSubmissionInput({
      ...basePayload(),
      service: "COMMERCIAL_SOFA",
      contact: {
        ...basePayload().contact,
        email: "trade@example.com",
      },
      serviceData: {
        venueType: "restaurant",
      },
      message: "We need seating for a new restaurant opening soon.",
      uploadTokens: [],
    });

    expect(result.serviceData).toEqual({ venueType: "restaurant" });
  });

  it("accepts the current minimal interior design form payload", () => {
    const result = validateLeadSubmissionInput({
      ...basePayload(),
      service: "INTERIOR_DESIGN",
      contact: {
        ...basePayload().contact,
        email: "client@example.com",
      },
      serviceData: {
        projectType: "residential",
      },
      message: "We want to make the living space feel calmer and more premium.",
      uploadTokens: [],
    });

    expect(result.contact.email).toBe("client@example.com");
  });

  it("accepts the current minimal sofa repair form payload without postcode", () => {
    const result = validateLeadSubmissionInput({
      ...basePayload(),
      service: "SOFA_REPAIR_RESTORATION",
      serviceData: {
        itemType: "sofa",
      },
      uploadTokens: ["abcdefghijklmnopqrstuvwxyz"],
      uploadSessionId: "upload:test:123456789",
    });

    expect(result.serviceData).toEqual({ itemType: "sofa" });
    expect(result.uploadTokens).toHaveLength(1);
  });

  it("still rejects repair submissions without a photo", () => {
    expect(() =>
      validateLeadSubmissionInput({
        ...basePayload(),
        service: "SOFA_REPAIR_RESTORATION",
        serviceData: {
          itemType: "sofa",
        },
        uploadTokens: [],
      }),
    ).toThrow(ApiProblem);
  });
});
