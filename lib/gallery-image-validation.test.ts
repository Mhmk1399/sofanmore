import { describe, expect, it } from "vitest";

import { assertDecodedGalleryMimeType, validateGalleryImageInput, validateGalleryUpload } from "@/lib/gallery-image-validation";

describe("gallery image validation", () => {
  it("accepts a complete gallery record", () => {
    const value = validateGalleryImageInput({
      url: "https://example.com/image.webp",
      alt: "A tailored blue sofa in a bright living room",
      description: "A tailored bespoke sofa with deep blue upholstery and softly curved arms.",
      code: 2001,
      service: "BESPOKE_SOFA",
      active: true,
      sortOrder: 0,
    });
    expect(value.code).toBe(2001);
    expect(value.service).toBe("BESPOKE_SOFA");
  });

  it("rejects an unknown service and unsafe owned key", () => {
    expect(() => validateGalleryImageInput({
      url: "https://example.com/image.webp", alt: "Useful alt text",
      description: "A complete description for the gallery image.", code: 20,
      service: "OTHER", active: true, sortOrder: 0, storageKey: "project-uploads/file.webp",
    })).toThrow();
  });

  it("enforces the nine megabyte upload limit", () => {
    expect(() => validateGalleryUpload({ fileName: "large.jpg", mimeType: "image/jpeg", sizeBytes: 9 * 1024 * 1024 + 1 })).toThrow();
  });

  it("rejects a declared MIME type that differs from decoded pixels", () => {
    expect(() => assertDecodedGalleryMimeType("image/jpeg", "image/png")).toThrow(
      "does not match",
    );
  });
});
