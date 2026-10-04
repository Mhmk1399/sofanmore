import { ApiProblem, validationError, type FieldErrors } from "@/lib/api-response";
import { galleryServices, type GalleryService } from "@/models/gallery-image";
import { isOwnedGalleryStorageKey } from "@/lib/upload-storage";

type RecordValue = Record<string, unknown>;

export type ValidatedGalleryImageInput = {
  url?: string;
  storageKey?: string;
  alt?: string;
  description?: string;
  code?: number;
  service?: GalleryService;
  active?: boolean;
  sortOrder?: number;
  width?: number;
  height?: number;
  mimeType?: string;
  storedBytes?: number;
  originalBytes?: number;
};

const galleryServiceSet = new Set<string>(galleryServices);
const allowedMimeTypes = new Set(["image/jpeg", "image/png", "image/webp"]);

function isRecord(value: unknown): value is RecordValue {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function text(value: unknown, field: string, errors: FieldErrors, max: number) {
  if (typeof value !== "string") {
    errors[field] = "Enter text.";
    return "";
  }
  return value
    .replace(/\r\n/g, "\n")
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, " ")
    .trim()
    .slice(0, max);
}

function imageUrl(value: unknown, errors: FieldErrors) {
  const output = text(value, "url", errors, 600);
  if (!output) {
    errors.url = "Add an image URL.";
    return "";
  }
  if (output.startsWith("/")) {
    if (!/^\/[A-Za-z0-9._~:/?#\[\]@!$&'()*+,;=%-]+$/.test(output)) {
      errors.url = "Use a valid image path.";
    }
    return output;
  }
  try {
    const parsed = new URL(output);
    if (!['http:', 'https:'].includes(parsed.protocol)) throw new Error();
    return parsed.toString().slice(0, 600);
  } catch {
    errors.url = "Use a valid HTTP image URL.";
    return "";
  }
}

function ownedStorageKey(value: unknown, errors: FieldErrors) {
  if (value === undefined || value === null || value === "") return undefined;
  const output = text(value, "storageKey", errors, 600);
  if (!isOwnedGalleryStorageKey(output)) {
    errors.storageKey = "Use a valid gallery upload key.";
  }
  return output || undefined;
}

function integer(value: unknown, field: string, errors: FieldErrors, min = 1) {
  const output = typeof value === "number" ? value : Number(String(value).trim());
  if (!Number.isInteger(output) || output < min || output > 999999999) {
    errors[field] = `Use a whole number ${min} or higher.`;
    return undefined;
  }
  return output;
}

export function validateGalleryImageInput(
  input: unknown,
  mode: "create" | "update" = "create",
) {
  if (!isRecord(input)) throw validationError({ body: "Use a valid JSON object." });
  const errors: FieldErrors = {};
  const output: ValidatedGalleryImageInput = {};
  const has = (field: string) => Object.prototype.hasOwnProperty.call(input, field);

  if (mode === "create" || has("url")) output.url = imageUrl(input.url, errors);
  if (mode === "create" || has("storageKey")) {
    output.storageKey = ownedStorageKey(input.storageKey, errors) || "";
  }
  if (mode === "create" || has("alt")) {
    output.alt = text(input.alt, "alt", errors, 180);
    if (!output.alt) errors.alt = "Add useful image alt text.";
  }
  if (mode === "create" || has("description")) {
    output.description = text(input.description, "description", errors, 1000);
    if (!output.description || output.description.length < 10) {
      errors.description = "Add a useful description of at least 10 characters.";
    }
  }
  if (mode === "create" || has("code")) output.code = integer(input.code, "code", errors);
  if (mode === "create" || has("service")) {
    const service = text(input.service, "service", errors, 80);
    if (!galleryServiceSet.has(service)) errors.service = "Choose a valid service.";
    else output.service = service as GalleryService;
  }
  if (mode === "create" || has("active")) {
    if (typeof input.active !== "boolean") errors.active = "Use true or false.";
    else output.active = input.active;
  }
  if (mode === "create" || has("sortOrder")) {
    output.sortOrder = integer(input.sortOrder ?? 0, "sortOrder", errors, 0);
  }
  for (const field of ["width", "height", "storedBytes", "originalBytes"] as const) {
    if (has(field)) output[field] = integer(input[field], field, errors);
  }
  if (has("mimeType")) {
    const mimeType = text(input.mimeType, "mimeType", errors, 80).toLowerCase();
    if (!allowedMimeTypes.has(mimeType)) errors.mimeType = "Use a supported image format.";
    else output.mimeType = mimeType;
  }

  if (Object.keys(errors).length) throw validationError(errors);
  return output;
}

export function validateGalleryObjectId(value: string) {
  if (!/^[a-fA-F0-9]{24}$/.test(value)) {
    throw new ApiProblem("VALIDATION_ERROR", "Use a valid gallery image id.", 400, {
      galleryImageId: "Use a valid gallery image id.",
    });
  }
  return value;
}

export function validateGalleryUpload(input: { fileName: string; mimeType: string; sizeBytes: number }) {
  const errors: FieldErrors = {};
  const fileName = text(input.fileName, "file", errors, 180);
  const mimeType = input.mimeType.trim().toLowerCase();
  const extension = fileName.split(".").pop()?.toLowerCase() || "";
  if (!fileName) errors.file = "Choose an image.";
  if (!allowedMimeTypes.has(mimeType) || !["jpg", "jpeg", "png", "webp"].includes(extension)) {
    errors.file = "Use a JPG, PNG or WebP image.";
  }
  if (!Number.isInteger(input.sizeBytes) || input.sizeBytes < 1 || input.sizeBytes > 9 * 1024 * 1024) {
    errors.file = "Image must be 9MB or smaller.";
  }
  if (Object.keys(errors).length) throw validationError(errors);
  return { fileName, mimeType };
}

export function assertDecodedGalleryMimeType(declared: string, detected: string) {
  if (declared !== detected) {
    throw new ApiProblem("VALIDATION_ERROR", "The file type does not match its decoded image format.", 400, {
      file: "Choose a JPG, PNG or WebP with the correct file type.",
    });
  }
}
