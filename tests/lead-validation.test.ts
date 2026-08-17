import { describe, expect, it } from "vitest";

import { ApiProblem } from "@/lib/api-response";
import {
  COMMERCIAL_UPLOAD_COUNT,
  COMMERCIAL_UPLOAD_SIZE_BYTES,
  INTERIOR_UPLOAD_COUNT,
  INTERIOR_UPLOAD_SIZE_BYTES,
  MAX_UPLOAD_COUNT,
  MAX_UPLOAD_SIZE_BYTES,
  uploadValidationError,
} from "@/lib/lead-config";
import { validateLeadSubmissionInput } from "@/lib/lead-validation";

function contactPayload(overrides: Record<string, unknown> = {}) {
  const base = {
    service: "CONTACT_ENQUIRY",
    contact: {
      name: "Lena Brooks",
      email: "lena@example.com",
      phone: "+44 7400 577844",
    },
    serviceData: {
      enquiryType: "general",
    },
    message:
      "I would like to talk through a sofa project and understand the next step.",
    uploadTokens: [],
    privacyConsent: true,
    marketingConsent: false,
    idempotencyKey: "lead:test-contact-enquiry-12345",
    sourcePage: "/contact-us",
    formStartedAt: Date.now() - 5000,
  };

  return {
    ...base,
    ...overrides,
    contact: {
      ...base.contact,
      ...((overrides.contact as Record<string, unknown> | undefined) || {}),
    },
    serviceData: {
      ...base.serviceData,
      ...((overrides.serviceData as Record<string, unknown> | undefined) || {}),
    },
  };
}

function commercialPayload(overrides: Record<string, unknown> = {}) {
  const base = {
    service: "COMMERCIAL_SOFA",
    contact: {
      name: "Ava Patel",
      email: "ava@restaurant.example",
      phone: "+44 7400 577844",
      postcode: "NW1 6XE",
    },
    serviceData: {
      companyName: "North Room Hospitality",
      venueType: "restaurant",
      projectType: "banquette-seating",
      projectStage: "design-stage",
      approximateQuantity: 18,
      hasFloorPlan: true,
      dimensionsKnown: true,
      widthCm: 820,
      depthCm: 460,
      heightCm: 310,
      targetInstallationDate: "2026-10-15",
    },
    message:
      "We need banquette and booth seating for a restaurant refurbishment with a measured floor plan attached.",
    uploadTokens: [],
    privacyConsent: true,
    marketingConsent: false,
    idempotencyKey: "lead:test-commercial-brief-12345",
    sourcePage: "/services/commercial-sofas",
    formStartedAt: Date.now() - 5000,
  };

  return {
    ...base,
    ...overrides,
    contact: {
      ...base.contact,
      ...((overrides.contact as Record<string, unknown> | undefined) || {}),
    },
    serviceData: {
      ...base.serviceData,
      ...((overrides.serviceData as Record<string, unknown> | undefined) || {}),
    },
  };
}

function interiorPayload(overrides: Record<string, unknown> = {}) {
  const base = {
    service: "INTERIOR_DESIGN",
    contact: {
      name: "Maya Clarke",
      email: "maya@example.com",
      phone: "+44 7400 577844",
      postcode: "SW1A 1AA",
    },
    serviceData: {
      projectType: "residential",
      needs: ["complete-interior", "bespoke-sofa-integration"],
      projectStage: "planning",
      approximateSpaceSize: "Open-plan living and dining room, around 42sqm",
      styleDirection: "Warm modern with quiet materials and layered lighting",
      preferredContactMethod: "either",
    },
    message:
      "We want to rethink the living space layout, finishes and bespoke sofa direction before renovation starts.",
    uploadTokens: [],
    privacyConsent: true,
    marketingConsent: false,
    idempotencyKey: "lead:test-interior-brief-12345",
    sourcePage: "/services/interior-design",
    formStartedAt: Date.now() - 5000,
  };

  return {
    ...base,
    ...overrides,
    contact: {
      ...base.contact,
      ...((overrides.contact as Record<string, unknown> | undefined) || {}),
    },
    serviceData: {
      ...base.serviceData,
      ...((overrides.serviceData as Record<string, unknown> | undefined) || {}),
    },
  };
}

function repairPayload(overrides: Record<string, unknown> = {}) {
  const base = {
    service: "SOFA_REPAIR_RESTORATION",
    contact: {
      name: "Noah Ellis",
      phone: "+44 7400 577844",
      postcode: "NW2 7HJ",
      email: "",
    },
    serviceData: {
      itemType: "sofa",
      issues: ["worn-upholstery", "sagging-cushions"],
      approximateAge: "10-20-years",
      transportPreference: "need-collection",
    },
    message: "",
    uploadTokens: ["repair_upload_token_primary_" + "a".repeat(32)],
    uploadSessionId: "upload:test-repair-session-12345",
    privacyConsent: true,
    marketingConsent: false,
    idempotencyKey: "lead:test-repair-brief-12345",
    sourcePage: "/services/sofa-repair-restoration",
    formStartedAt: Date.now() - 5000,
  };

  return {
    ...base,
    ...overrides,
    contact: {
      ...base.contact,
      ...((overrides.contact as Record<string, unknown> | undefined) || {}),
    },
    serviceData: {
      ...base.serviceData,
      ...((overrides.serviceData as Record<string, unknown> | undefined) || {}),
    },
  };
}

function expectValidationProblem(callback: () => unknown) {
  try {
    callback();
  } catch (error) {
    expect(error).toBeInstanceOf(ApiProblem);
    return error as ApiProblem;
  }

  throw new Error("Expected validation to fail.");
}

describe("contact lead validation", () => {
  it("stores contact enquiries as leads", () => {
    const result = validateLeadSubmissionInput(contactPayload());

    expect(result.service).toBe("CONTACT_ENQUIRY");
    expect(result.contact.name).toBe("Lena Brooks");
    expect(result.contact.email).toBe("lena@example.com");
    expect(result.contact.phone).toBe("+44 7400 577844");
    expect(result.message).toContain("sofa project");
    expect(result.serviceData.enquiryType).toBe("general");
  });

  it("requires an email and useful contact message", () => {
    const problem = expectValidationProblem(() =>
      validateLeadSubmissionInput(
        contactPayload({
          contact: { email: "" },
          message: "Hi",
        }),
      ),
    );

    expect(problem.fieldErrors).toMatchObject({
      email: "Enter an email address.",
      message: "Share at least 10 characters in your message.",
    });
  });

  it("rejects contact uploads and invalid contact service data", () => {
    const problem = expectValidationProblem(() =>
      validateLeadSubmissionInput(
        contactPayload({
          serviceData: { enquiryType: "quote-now" },
          uploadTokens: ["contact_upload_token_primary_" + "a".repeat(32)],
        }),
      ),
    );

    expect(problem.fieldErrors).toMatchObject({
      "serviceData.enquiryType": "Choose a valid option.",
      uploadTokens: "Upload 0 files or fewer.",
    });
  });
});

describe("commercial lead validation", () => {
  it("keeps commercial company details in serviceData", () => {
    const result = validateLeadSubmissionInput(commercialPayload());

    expect(result.service).toBe("COMMERCIAL_SOFA");
    expect(result.contact.email).toBe("ava@restaurant.example");
    expect(result.serviceData.companyName).toBe("North Room Hospitality");
    expect(result.serviceData.projectType).toBe("banquette-seating");
    expect(result.serviceData.approximateQuantity).toBe(18);
    expect(result.serviceData.hasFloorPlan).toBe(true);
    expect(result.serviceData.dimensionsKnown).toBe(true);
    expect(result.serviceData.widthCm).toBe(820);
    expect(result.serviceData.depthCm).toBe(460);
  });

  it("requires commercial work email and a useful message", () => {
    const problem = expectValidationProblem(() =>
      validateLeadSubmissionInput(
        commercialPayload({
          contact: { email: "" },
          message: "Too short",
        }),
      ),
    );

    expect(problem.fieldErrors).toMatchObject({
      email: "Enter a work email address.",
      message: "Share at least 20 characters about the project.",
    });
  });

  it("rejects invalid commercial serviceData options", () => {
    const problem = expectValidationProblem(() =>
      validateLeadSubmissionInput(
        commercialPayload({
          serviceData: {
            venueType: "warehouse",
            projectType: "loose-chairs",
            approximateQuantity: 2.5,
            targetInstallationDate: "2026-02-30",
          },
        }),
      ),
    );

    expect(problem.fieldErrors).toMatchObject({
      "serviceData.venueType": "Choose a valid option.",
      "serviceData.projectType": "Choose a valid option.",
      "serviceData.approximateQuantity": "Enter a whole number.",
      "serviceData.targetInstallationDate": "Enter a valid date.",
    });
  });

  it("requires commercial width and depth when dimensions are known", () => {
    const problem = expectValidationProblem(() =>
      validateLeadSubmissionInput(
        commercialPayload({
          serviceData: {
            dimensionsKnown: true,
            widthCm: undefined,
            depthCm: undefined,
          },
        }),
      ),
    );

    expect(problem.fieldErrors).toMatchObject({
      "serviceData.widthCm": "Enter this measurement.",
      "serviceData.depthCm": "Enter this measurement.",
    });
  });

  it("enforces the commercial upload count", () => {
    const uploadTokens = Array.from(
      { length: COMMERCIAL_UPLOAD_COUNT + 1 },
      (_, index) => `commercial_upload_token_${index}_${"a".repeat(32)}`,
    );
    const problem = expectValidationProblem(() =>
      validateLeadSubmissionInput(
        commercialPayload({
          uploadTokens,
          uploadSessionId: "upload:test-commercial-session-12345",
        }),
      ),
    );

    expect(problem.fieldErrors).toMatchObject({
      uploadTokens: `Upload ${COMMERCIAL_UPLOAD_COUNT} files or fewer.`,
    });
  });
});

describe("interior design lead validation", () => {
  it("stores interior project details in serviceData", () => {
    const result = validateLeadSubmissionInput(interiorPayload());

    expect(result.service).toBe("INTERIOR_DESIGN");
    expect(result.contact.email).toBe("maya@example.com");
    expect(result.serviceData.projectType).toBe("residential");
    expect(result.serviceData.needs).toEqual([
      "complete-interior",
      "bespoke-sofa-integration",
    ]);
    expect(result.serviceData.projectStage).toBe("planning");
    expect(result.serviceData.approximateSpaceSize).toContain("42sqm");
    expect(result.serviceData.styleDirection).toContain("Warm modern");
    expect(result.serviceData.preferredContactMethod).toBe("either");
  });

  it("requires an interior email address and useful space message", () => {
    const problem = expectValidationProblem(() =>
      validateLeadSubmissionInput(
        interiorPayload({
          contact: { email: "" },
          message: "Too short",
        }),
      ),
    );

    expect(problem.fieldErrors).toMatchObject({
      email: "Enter an email address.",
      message: "Share at least 20 characters about the space.",
    });
  });

  it("rejects invalid interior serviceData options", () => {
    const problem = expectValidationProblem(() =>
      validateLeadSubmissionInput(
        interiorPayload({
          serviceData: {
            projectType: "warehouse",
            needs: ["complete-interior", "garden-room"],
            projectStage: "finished",
            preferredContactMethod: "carrier",
          },
        }),
      ),
    );

    expect(problem.fieldErrors).toMatchObject({
      "serviceData.projectType": "Choose a valid option.",
      "serviceData.needs": "Choose valid options.",
      "serviceData.projectStage": "Choose a valid option.",
      "serviceData.preferredContactMethod": "Choose a valid option.",
    });
  });

  it("enforces the interior upload count", () => {
    const uploadTokens = Array.from(
      { length: INTERIOR_UPLOAD_COUNT + 1 },
      (_, index) => `interior_upload_token_${index}_${"a".repeat(32)}`,
    );
    const problem = expectValidationProblem(() =>
      validateLeadSubmissionInput(
        interiorPayload({
          uploadTokens,
          uploadSessionId: "upload:test-interior-session-12345",
        }),
      ),
    );

    expect(problem.fieldErrors).toMatchObject({
      uploadTokens: `Upload ${INTERIOR_UPLOAD_COUNT} files or fewer.`,
    });
  });
});

describe("sofa repair lead validation", () => {
  it("stores repair details in serviceData with optional email and message", () => {
    const result = validateLeadSubmissionInput(repairPayload());

    expect(result.service).toBe("SOFA_REPAIR_RESTORATION");
    expect(result.contact.email).toBeUndefined();
    expect(result.message).toBeUndefined();
    expect(result.serviceData.itemType).toBe("sofa");
    expect(result.serviceData.issues).toEqual([
      "worn-upholstery",
      "sagging-cushions",
    ]);
    expect(result.serviceData.approximateAge).toBe("10-20-years");
    expect(result.serviceData.transportPreference).toBe("need-collection");
    expect(result.uploadTokens).toHaveLength(1);
  });

  it("requires repair postcode, item type, and at least one photo", () => {
    const problem = expectValidationProblem(() =>
      validateLeadSubmissionInput(
        repairPayload({
          contact: { postcode: "" },
          serviceData: { itemType: undefined },
          uploadTokens: [],
          uploadSessionId: "",
        }),
      ),
    );

    expect(problem.fieldErrors).toMatchObject({
      postcode: "Enter a valid UK postcode.",
      "serviceData.itemType": "This field is required.",
      uploadTokens: "Upload at least one photo.",
    });
  });

  it("rejects unconfirmed repair issue options", () => {
    const problem = expectValidationProblem(() =>
      validateLeadSubmissionInput(
        repairPayload({
          serviceData: {
            itemType: "loveseat",
            issues: ["worn-upholstery", "frame-issue", "spring-issue"],
            approximateAge: "antique",
            transportPreference: "courier",
          },
        }),
      ),
    );

    expect(problem.fieldErrors).toMatchObject({
      "serviceData.itemType": "Choose a valid option.",
      "serviceData.issues": "Choose valid options.",
      "serviceData.approximateAge": "Choose a valid option.",
      "serviceData.transportPreference": "Choose a valid option.",
    });
  });

  it("enforces the repair upload count", () => {
    const uploadTokens = Array.from(
      { length: MAX_UPLOAD_COUNT + 1 },
      (_, index) => `repair_upload_token_${index}_${"a".repeat(32)}`,
    );
    const problem = expectValidationProblem(() =>
      validateLeadSubmissionInput(repairPayload({ uploadTokens })),
    );

    expect(problem.fieldErrors).toMatchObject({
      uploadTokens: `Upload ${MAX_UPLOAD_COUNT} files or fewer.`,
    });
  });
});

describe("commercial upload policy", () => {
  it("rejects uploads for contact enquiries", () => {
    expect(
      uploadValidationError({
        fileName: "contact-photo.jpg",
        mimeType: "image/jpeg",
        sizeBytes: 1024,
        service: "CONTACT_ENQUIRY",
      }),
    ).toBe("Contact enquiry does not accept file uploads.");
  });

  it("allows commercial PDF floor plans up to 15MB", () => {
    expect(
      uploadValidationError({
        fileName: "floor-plan.pdf",
        mimeType: "application/pdf",
        sizeBytes: COMMERCIAL_UPLOAD_SIZE_BYTES,
        service: "COMMERCIAL_SOFA",
      }),
    ).toBeNull();
  });

  it("rejects oversized commercial files", () => {
    expect(
      uploadValidationError({
        fileName: "floor-plan.pdf",
        mimeType: "application/pdf",
        sizeBytes: COMMERCIAL_UPLOAD_SIZE_BYTES + 1,
        service: "COMMERCIAL_SOFA",
      }),
    ).toContain("15MB");
  });

  it("keeps PDF uploads out of the bespoke sofa form", () => {
    expect(
      uploadValidationError({
        fileName: "floor-plan.pdf",
        mimeType: "application/pdf",
        sizeBytes: 1024,
        service: "BESPOKE_SOFA",
      }),
    ).toContain("Bespoke sofa uploads");
  });
});

describe("interior upload policy", () => {
  it("allows interior PDF references up to 15MB", () => {
    expect(
      uploadValidationError({
        fileName: "interior-plan.pdf",
        mimeType: "application/pdf",
        sizeBytes: INTERIOR_UPLOAD_SIZE_BYTES,
        service: "INTERIOR_DESIGN",
      }),
    ).toBeNull();
  });

  it("allows interior image references up to 15MB", () => {
    expect(
      uploadValidationError({
        fileName: "room-reference.webp",
        mimeType: "image/webp",
        sizeBytes: INTERIOR_UPLOAD_SIZE_BYTES,
        service: "INTERIOR_DESIGN",
      }),
    ).toBeNull();
  });

  it("rejects unsupported interior reference formats", () => {
    expect(
      uploadValidationError({
        fileName: "room-reference.heic",
        mimeType: "image/heic",
        sizeBytes: 1024,
        service: "INTERIOR_DESIGN",
      }),
    ).toContain("Interior design uploads");
  });
});

describe("sofa repair upload policy", () => {
  it("allows repair photos up to 10MB", () => {
    expect(
      uploadValidationError({
        fileName: "sofa-damage.jpg",
        mimeType: "image/jpeg",
        sizeBytes: MAX_UPLOAD_SIZE_BYTES,
        service: "SOFA_REPAIR_RESTORATION",
      }),
    ).toBeNull();
  });

  it("rejects PDFs for repair photo assessment", () => {
    expect(
      uploadValidationError({
        fileName: "repair-notes.pdf",
        mimeType: "application/pdf",
        sizeBytes: 1024,
        service: "SOFA_REPAIR_RESTORATION",
      }),
    ).toContain("Sofa repair and restoration uploads");
  });

  it("rejects unsupported repair photo formats", () => {
    expect(
      uploadValidationError({
        fileName: "sofa-damage.heic",
        mimeType: "image/heic",
        sizeBytes: 1024,
        service: "SOFA_REPAIR_RESTORATION",
      }),
    ).toContain("Sofa repair and restoration uploads");
  });
});
