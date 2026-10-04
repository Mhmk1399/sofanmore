import { describe, expect, it } from "vitest";
import sharp from "sharp";

import { compressGalleryImage, visualImageDimensions } from "@/lib/gallery-image-compression";

describe("lossless WebP normalization", () => {
  it("reports EXIF-rotated orientations using visual dimensions", () => {
    expect(visualImageDimensions(4032, 3024, 6)).toEqual({
      width: 3024,
      height: 4032,
    });
    expect(visualImageDimensions(4032, 3024, 1)).toEqual({
      width: 4032,
      height: 3024,
    });
  });

  it("reports the visual dimensions of a real EXIF-rotated JPEG", async () => {
    const width = 120;
    const height = 80;
    const pixels = Buffer.alloc(width * height * 3);
    for (let index = 0; index < pixels.length; index += 1) {
      pixels[index] = (index * 31 + Math.floor(index / 17)) % 256;
    }
    const rotatedJpeg = await sharp(pixels, {
      raw: { width, height, channels: 3 },
    })
      .withMetadata({ orientation: 6 })
      .jpeg({ quality: 65 })
      .toBuffer();
    const result = await compressGalleryImage(rotatedJpeg);
    expect(result.sourceMimeType).toBe("image/jpeg");
    expect(result.mimeType).toBe("image/webp");
    expect(result.extension).toBe("webp");
    expect((await sharp(result.body).metadata()).format).toBe("webp");
    expect({ width: result.width, height: result.height }).toEqual({
      width: height,
      height: width,
    });
  });
});
