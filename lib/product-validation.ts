import { ApiProblem, validationError, type FieldErrors } from "@/lib/api-response";

type UnknownRecord = Record<string, unknown>;

export type ValidatedProductInput = {
  productCode: number;
  name: string;
  imageUrl: string;
  imageStorageKey?: string;
  description: string;
};

function isRecord(value: unknown): value is UnknownRecord {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function cleanText(value: unknown, field: string, errors: FieldErrors, max = 160) {
  if (typeof value !== "string") {
    errors[field] = "Enter text.";
    return "";
  }

  return value
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

function cleanMultilineText(
  value: unknown,
  field: string,
  errors: FieldErrors,
  max = 1400,
) {
  if (typeof value !== "string") {
    errors[field] = "Enter text.";
    return "";
  }

  return value
    .replace(/\r\n/g, "\n")
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, " ")
    .replace(/[ \t]+/g, " ")
    .trim()
    .slice(0, max);
}

function validateProductCode(value: unknown, errors: FieldErrors) {
  if (value === null || value === undefined || value === "") {
    errors.productCode = "Enter a product code.";
    return 0;
  }

  const normalized =
    typeof value === "number" ? value : Number(String(value).trim());

  if (!Number.isFinite(normalized)) {
    errors.productCode = "Use a valid product code.";
    return 0;
  }

  if (!Number.isInteger(normalized)) {
    errors.productCode = "Use a whole product code.";
    return normalized;
  }

  if (normalized < 1000) {
    errors.productCode = "Product code must be 1000 or higher.";
  } else if (normalized > 999999999) {
    errors.productCode = "Use a shorter product code.";
  }

  return normalized;
}

function validateImageUrl(value: unknown, errors: FieldErrors) {
  const imageUrl = cleanText(value, "imageUrl", errors, 600);

  if (!imageUrl) {
    errors.imageUrl = "Add an image URL.";
    return "";
  }

  if (imageUrl.startsWith("/")) {
    if (!/^\/[A-Za-z0-9._~:/?#\[\]@!$&'()*+,;=%-]+$/.test(imageUrl)) {
      errors.imageUrl = "Use a valid image path.";
    }

    return imageUrl;
  }

  try {
    const url = new URL(imageUrl);

    if (url.protocol !== "http:" && url.protocol !== "https:") {
      errors.imageUrl = "Use a valid image URL.";
      return "";
    }

    return url.toString().slice(0, 600);
  } catch {
    errors.imageUrl = "Use a valid image URL.";
    return "";
  }
}

function validateImageStorageKey(value: unknown, errors: FieldErrors) {
  if (value === null || value === undefined || value === "") {
    return undefined;
  }

  const imageStorageKey = cleanText(value, "imageStorageKey", errors, 600);

  if (
    imageStorageKey &&
    !/^product-uploads\/[0-9]{4}\/[0-9]{2}\/[A-Fa-f0-9]{48}\.[A-Za-z0-9]+$/.test(
      imageStorageKey,
    )
  ) {
    errors.imageStorageKey = "Use a valid uploaded product image.";
  }

  return imageStorageKey || undefined;
}

export function validateProductInput(input: unknown): ValidatedProductInput {
  const errors: FieldErrors = {};

  if (!isRecord(input)) {
    throw validationError({ body: "Use a valid JSON object." });
  }

  const productCode = validateProductCode(input.productCode, errors);
  const name = cleanText(input.name, "name", errors, 160);
  const imageUrl = validateImageUrl(input.imageUrl, errors);
  const imageStorageKey = validateImageStorageKey(
    input.imageStorageKey,
    errors,
  );
  const description = cleanMultilineText(
    input.description,
    "description",
    errors,
    1400,
  );

  if (!name) {
    errors.name = "Enter a product name.";
  } else if (name.length < 2) {
    errors.name = "Use at least 2 characters.";
  }

  if (!description) {
    errors.description = "Enter a product description.";
  } else if (description.length < 10) {
    errors.description = "Use at least 10 characters.";
  }

  if (Object.keys(errors).length > 0) {
    throw validationError(errors);
  }

  return {
    productCode,
    name,
    imageUrl,
    ...(imageStorageKey ? { imageStorageKey } : {}),
    description,
  };
}

export function validateProductImageUpload(input: {
  fileName: string;
  mimeType: string;
  sizeBytes: number;
}) {
  const errors: FieldErrors = {};
  const fileName = cleanText(input.fileName, "file", errors, 180);
  const mimeType = input.mimeType.trim().toLowerCase();
  const allowedMimeTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
  const extension = fileName.split(".").pop()?.toLowerCase() || "";

  if (!fileName) {
    errors.file = "Choose a product image.";
  }

  if (!Number.isInteger(input.sizeBytes) || input.sizeBytes < 1) {
    errors.file = "Use a valid image size.";
  } else if (input.sizeBytes > 10 * 1024 * 1024) {
    errors.file = "Product image must be 10MB or smaller.";
  }

  if (!allowedMimeTypes.has(mimeType)) {
    errors.file = "Product image must be JPG, PNG or WebP.";
  }

  if (!["jpg", "jpeg", "png", "webp"].includes(extension)) {
    errors.file = "Product image must use a valid image extension.";
  }

  if (Object.keys(errors).length > 0) {
    throw validationError(errors);
  }

  return {
    safeName: fileName,
    mimeType,
  };
}

export function validateProductObjectId(value: string) {
  if (!/^[a-fA-F0-9]{24}$/.test(value)) {
    throw new ApiProblem("VALIDATION_ERROR", "Use a valid product id.", 400, {
      productId: "Use a valid product id.",
    });
  }

  return value;
}
