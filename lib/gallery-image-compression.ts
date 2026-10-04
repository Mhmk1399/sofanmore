import sharp from "sharp";

import { ApiProblem } from "@/lib/api-response";

export const GALLERY_MAX_PIXELS = 40_000_000;

export function visualImageDimensions(
  width: number,
  height: number,
  orientation?: number,
) {
  return orientation && orientation >= 5 && orientation <= 8
    ? { width: height, height: width }
    : { width, height };
}

export async function compressGalleryImage(original: Buffer) {
  try {
    const source = sharp(original, {
      animated: true,
      failOn: "warning",
      limitInputPixels: GALLERY_MAX_PIXELS,
      sequentialRead: true,
    });
    const metadata = await source.metadata();
    if (!metadata.width || !metadata.height || !metadata.format) throw new Error("Missing image metadata");
    if ((metadata.pages || 1) > 1) {
      throw new ApiProblem("VALIDATION_ERROR", "Animated images are not supported.", 400);
    }
    if (metadata.width * metadata.height > GALLERY_MAX_PIXELS) {
      throw new ApiProblem("VALIDATION_ERROR", "Image dimensions are too large.", 400);
    }
    const detectedMime =
      metadata.format === "jpeg" ? "image/jpeg" :
      metadata.format === "png" ? "image/png" :
      metadata.format === "webp" ? "image/webp" : "";
    if (!detectedMime) {
      throw new ApiProblem("VALIDATION_ERROR", "Decoded image must be JPG, PNG or WebP.", 400);
    }

    const body = await sharp(original, {
      failOn: "warning",
      limitInputPixels: GALLERY_MAX_PIXELS,
      sequentialRead: true,
    }).autoOrient().keepIccProfile().webp({ lossless: true, effort: 5 }).toBuffer();
    const selectedMetadata = await sharp(body, { limitInputPixels: GALLERY_MAX_PIXELS }).metadata();
    const dimensions = { width: selectedMetadata.width || metadata.width, height: selectedMetadata.height || metadata.height };
    const storedBytes = body.length;
    return {
      body,
      mimeType: "image/webp" as const,
      extension: "webp" as const,
      sourceMimeType: detectedMime,
      width: dimensions.width,
      height: dimensions.height,
      originalBytes: original.length,
      storedBytes,
      savingsPercent: Math.round((1 - storedBytes / original.length) * 1000) / 10,
    };
  } catch (error) {
    if (error instanceof ApiProblem) throw error;
    throw new ApiProblem("VALIDATION_ERROR", "The file could not be decoded as a safe image.", 400, {
      file: "Choose a valid, non-animated JPG, PNG or WebP image.",
    });
  }
}
