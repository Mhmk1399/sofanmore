import { afterEach, describe, expect, it } from "vitest";

import { ApiProblem, handleApiError } from "@/lib/api-response";
import { isOwnedGalleryStorageKey } from "@/lib/upload-storage";

const originalPrefix = process.env.S3_PREFIX;

afterEach(() => {
  if (originalPrefix === undefined) delete process.env.S3_PREFIX;
  else process.env.S3_PREFIX = originalPrefix;
});

describe("gallery security boundaries", () => {
  it("recognizes only exact gallery-owned keys under the configured prefix", () => {
    process.env.S3_PREFIX = "Image";
    const digest = "a".repeat(48);
    expect(isOwnedGalleryStorageKey(`Image/gallery-images/2026/10/${digest}.webp`)).toBe(true);
    expect(isOwnedGalleryStorageKey(`Other/gallery-images/2026/10/${digest}.webp`)).toBe(false);
    expect(isOwnedGalleryStorageKey(`Image/project-uploads/2026/10/${digest}.webp`)).toBe(false);
    expect(isOwnedGalleryStorageKey(`Image/gallery-images/2026/10/../${digest}.webp`)).toBe(false);
  });

  it("applies no-store to admin-style error responses", async () => {
    const response = handleApiError(
      new ApiProblem("UNAUTHORIZED", "Authentication required.", 401),
      { headers: { "Cache-Control": "no-store" } },
    );
    expect(response.status).toBe(401);
    expect(response.headers.get("Cache-Control")).toBe("no-store");
    await expect(response.json()).resolves.toMatchObject({ ok: false, code: "UNAUTHORIZED" });
  });
});
