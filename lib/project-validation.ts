import { randomUUID } from "crypto";

import { ApiProblem, validationError, type FieldErrors } from "@/lib/api-response";
import { projectServices, type ProjectImage, type ProjectService } from "@/models/project";

type UnknownRecord = Record<string, unknown>;

export type ValidatedProjectInput = {
  projectCode?: number;
  title?: string;
  service?: ProjectService;
  coverImageUrl?: string;
  coverImageStorageKey?: string;
  images?: ProjectImage[];
  excerpt?: string;
  brief?: string;
  approach?: string;
  details?: string;
  result?: string;
  locationLabel?: string;
  featured?: boolean;
  published?: boolean;
};

export type ValidatedProjectCreateInput = Required<
  Pick<
    ValidatedProjectInput,
    "projectCode" | "title" | "service" | "coverImageUrl" | "excerpt"
  >
> &
  Omit<ValidatedProjectInput, "projectCode" | "title" | "service" | "coverImageUrl" | "excerpt">;

const projectServiceSet = new Set<string>(projectServices);

function isRecord(value: unknown): value is UnknownRecord {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function cleanText(
  value: unknown,
  field: string,
  errors: FieldErrors,
  max = 160,
) {
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

function cleanOptionalText(
  value: unknown,
  field: string,
  errors: FieldErrors,
  max: number,
) {
  if (value === null || value === undefined || value === "") return undefined;
  const cleaned = cleanText(value, field, errors, max);
  return cleaned || undefined;
}

function cleanMultilineText(
  value: unknown,
  field: string,
  errors: FieldErrors,
  max = 4000,
) {
  if (value === null || value === undefined || value === "") return undefined;
  if (typeof value !== "string") {
    errors[field] = "Enter text.";
    return undefined;
  }

  const cleaned = value
    .replace(/\r\n/g, "\n")
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, " ")
    .replace(/[ \t]+/g, " ")
    .trim()
    .slice(0, max);

  return cleaned || undefined;
}

export function createProjectSlug(value: string) {
  const slug = value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-")
    .slice(0, 180);

  return slug || `project-${randomUUID().slice(0, 8)}`;
}

function validateProjectCode(value: unknown, errors: FieldErrors) {
  if (value === null || value === undefined || value === "") {
    errors.projectCode = "Enter a project code.";
    return undefined;
  }

  const normalized =
    typeof value === "number" ? value : Number(String(value).trim());

  if (!Number.isFinite(normalized)) {
    errors.projectCode = "Use a valid project code.";
    return undefined;
  }

  if (!Number.isInteger(normalized)) {
    errors.projectCode = "Use a whole project code.";
    return undefined;
  }

  if (normalized < 1000) {
    errors.projectCode = "Project code must be 1000 or higher.";
  } else if (normalized > 999999999) {
    errors.projectCode = "Use a shorter project code.";
  }

  return normalized;
}

function validateUrlField(value: unknown, field: string, errors: FieldErrors) {
  const urlValue = cleanText(value, field, errors, 600);

  if (!urlValue) {
    errors[field] = "Add an image URL.";
    return "";
  }

  if (urlValue.startsWith("/")) {
    if (!/^\/[A-Za-z0-9._~:/?#\[\]@!$&'()*+,;=%-]+$/.test(urlValue)) {
      errors[field] = "Use a valid image path.";
    }

    return urlValue;
  }

  try {
    const url = new URL(urlValue);

    if (url.protocol !== "http:" && url.protocol !== "https:") {
      errors[field] = "Use a valid image URL.";
      return "";
    }

    return url.toString().slice(0, 600);
  } catch {
    errors[field] = "Use a valid image URL.";
    return "";
  }
}

function validateStorageKey(
  value: unknown,
  field: string,
  errors: FieldErrors,
) {
  if (value === null || value === undefined || value === "") return undefined;

  const storageKey = cleanText(value, field, errors, 600);

  if (
    storageKey &&
    !/^(?:[A-Za-z0-9][A-Za-z0-9._-]*\/)*project-uploads\/[0-9]{4}\/[0-9]{2}\/[A-Fa-f0-9]{48}\.[A-Za-z0-9]+$/.test(
      storageKey,
    )
  ) {
    errors[field] = "Use a valid uploaded project image.";
  }

  return storageKey || undefined;
}

function validateProjectImage(value: unknown, index: number, errors: FieldErrors) {
  if (!isRecord(value)) {
    errors[`images.${index}`] = "Use a valid project image.";
    return null;
  }

  const id =
    cleanOptionalText(value.id, `images.${index}.id`, errors, 80) ||
    randomUUID();
  const url = validateUrlField(value.url, `images.${index}.url`, errors);
  const storageKey = validateStorageKey(
    value.storageKey,
    `images.${index}.storageKey`,
    errors,
  );
  const alt = cleanText(value.alt, `images.${index}.alt`, errors, 180);
  const sortOrderValue =
    value.sortOrder === null || value.sortOrder === undefined || value.sortOrder === ""
      ? index
      : Number(value.sortOrder);

  if (!alt) errors[`images.${index}.alt`] = "Add image alt text.";
  if (!Number.isInteger(sortOrderValue) || sortOrderValue < 0) {
    errors[`images.${index}.sortOrder`] = "Use a valid image order.";
  }

  if (!url) return null;

  return {
    id,
    url,
    ...(storageKey ? { storageKey } : {}),
    alt,
    sortOrder: Number.isInteger(sortOrderValue) && sortOrderValue >= 0 ? sortOrderValue : index,
  };
}

function validateImages(value: unknown, errors: FieldErrors) {
  if (value === null || value === undefined || value === "") return [];
  if (!Array.isArray(value)) {
    errors.images = "Use a valid image list.";
    return [];
  }
  if (value.length > 24) {
    errors.images = "Use 24 project images or fewer.";
  }

  return value
    .slice(0, 24)
    .map((item, index) => validateProjectImage(item, index, errors))
    .filter((item): item is ProjectImage => Boolean(item))
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

function validateBoolean(value: unknown, field: string, errors: FieldErrors) {
  if (value === null || value === undefined || value === "") return undefined;
  if (typeof value === "boolean") return value;
  errors[field] = "Use true or false.";
  return undefined;
}

function validateService(value: unknown, errors: FieldErrors) {
  const service = cleanText(value, "service", errors, 80);
  if (!projectServiceSet.has(service)) {
    errors.service = "Choose a valid service.";
    return undefined;
  }
  return service as ProjectService;
}

export function validateProjectInput(
  input: unknown,
  mode: "create" | "update" = "create",
): ValidatedProjectInput {
  const errors: FieldErrors = {};

  if (!isRecord(input)) {
    throw validationError({ body: "Use a valid JSON object." });
  }

  const output: ValidatedProjectInput = {};
  const has = (field: string) => Object.prototype.hasOwnProperty.call(input, field);

  if (mode === "create" || has("projectCode")) {
    const projectCode = validateProjectCode(input.projectCode, errors);
    if (projectCode !== undefined) output.projectCode = projectCode;
  }

  if (mode === "create" || has("title")) {
    const title = cleanText(input.title, "title", errors, 160);
    if (!title) errors.title = "Enter a project title.";
    else if (title.length < 2) errors.title = "Use at least 2 characters.";
    output.title = title;
  }

  if (mode === "create" || has("service")) {
    const service = validateService(input.service, errors);
    if (service) output.service = service;
  }

  if (mode === "create" || has("coverImageUrl")) {
    const coverImageUrl = validateUrlField(input.coverImageUrl, "coverImageUrl", errors);
    if (coverImageUrl) output.coverImageUrl = coverImageUrl;
  }

  if (mode === "create" || has("coverImageStorageKey")) {
    const storageKey = validateStorageKey(
      input.coverImageStorageKey,
      "coverImageStorageKey",
      errors,
    );
    if (storageKey || mode === "update") output.coverImageStorageKey = storageKey || "";
  }

  if (mode === "create" || has("images")) {
    output.images = validateImages(input.images, errors);
  }

  if (mode === "create" || has("excerpt")) {
    const excerpt = cleanText(input.excerpt, "excerpt", errors, 500);
    if (!excerpt) errors.excerpt = "Enter a project excerpt.";
    else if (excerpt.length < 10) errors.excerpt = "Use at least 10 characters for the excerpt.";
    output.excerpt = excerpt;
  }

  for (const field of ["brief", "approach", "details", "result"] as const) {
    if (mode === "create" || has(field)) {
      const value = cleanMultilineText(input[field], field, errors, 4000);
      if (value || mode === "update") output[field] = value || "";
    }
  }

  if (mode === "create" || has("locationLabel")) {
    const locationLabel = cleanOptionalText(input.locationLabel, "locationLabel", errors, 120);
    if (locationLabel || mode === "update") output.locationLabel = locationLabel || "";
  }

  if (mode === "create" || has("featured")) {
    const featured = validateBoolean(input.featured, "featured", errors);
    output.featured = featured ?? false;
  }

  if (mode === "create" || has("published")) {
    const published = validateBoolean(input.published, "published", errors);
    output.published = published ?? false;
  }

  if (output.featured === true && output.published === true) {
    errors.publishing = "Choose either Published or Featured, not both.";
  }

  if (Object.keys(errors).length > 0) {
    throw validationError(errors);
  }

  return output;
}

export function validateProjectImageUpload(input: {
  fileName: string;
  mimeType: string;
  sizeBytes: number;
}) {
  const errors: FieldErrors = {};
  const fileName = cleanText(input.fileName, "file", errors, 180);
  const mimeType = input.mimeType.trim().toLowerCase();
  const allowedMimeTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
  const extension = fileName.split(".").pop()?.toLowerCase() || "";

  if (!fileName) errors.file = "Choose a project image.";

  if (!Number.isInteger(input.sizeBytes) || input.sizeBytes < 1) {
    errors.file = "Use a valid image size.";
  } else if (input.sizeBytes > 10 * 1024 * 1024) {
    errors.file = "Project image must be 10MB or smaller.";
  }

  if (!allowedMimeTypes.has(mimeType)) {
    errors.file = "Project image must be JPG, PNG or WebP.";
  }

  if (!["jpg", "jpeg", "png", "webp"].includes(extension)) {
    errors.file = "Project image must use a valid image extension.";
  }

  if (Object.keys(errors).length > 0) {
    throw validationError(errors);
  }

  return {
    safeName: fileName,
    mimeType,
  };
}

export function validateProjectObjectId(value: string) {
  if (!/^[a-fA-F0-9]{24}$/.test(value)) {
    throw new ApiProblem("VALIDATION_ERROR", "Use a valid project id.", 400, {
      projectId: "Use a valid project id.",
    });
  }

  return value;
}
