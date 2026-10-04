import { describe, expect, it } from "vitest";
import { galleryPageValue } from "@/lib/gallery-pagination";

describe("gallery pagination validation", () => {
  it("uses the default when a value is omitted", () => {
    expect(galleryPageValue(null, 16, 24, "Limit")).toBe(16);
  });

  it("accepts bounded positive whole numbers", () => {
    expect(galleryPageValue("24", 16, 24, "Limit")).toBe(24);
  });

  it.each(["0", "25", "1.5", "-1", "nope"])("rejects invalid value %s", (value) => {
    expect(() => galleryPageValue(value, 16, 24, "Limit")).toThrow();
  });
});
