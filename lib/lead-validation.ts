import {
  COMPLETE_UPLOAD_TTL_HOURS,
  MAX_SERVICE_DATA_FIELDS,
  MIN_LEAD_COMPLETION_MS,
  getLeadUploadPolicy,
  leadServiceDefinitions,
  sanitizeFileName,
  uploadValidationError,
  type ServiceFieldDefinition,
} from "@/lib/lead-config";
import { validationError, type FieldErrors } from "@/lib/api-response";
import {
  LEAD_SERVICES,
  type LeadContact,
  type LeadService,
  type LeadServiceData,
  type LeadUtm,
} from "@/models/lead";

type UnknownRecord = Record<string, unknown>;

export type ValidatedUploadSignInput = {
  fileName: string;
  safeName: string;
  mimeType: string;
  sizeBytes: number;
  service: LeadService;
  uploadSessionId: string;
};

export type ValidatedUploadCompleteInput = {
  uploadToken: string;
};

export type ValidatedLeadSubmissionInput = {
  service: LeadService;
  contact: LeadContact;
  serviceData: LeadServiceData;
  message?: string;
  uploadTokens: string[];
  uploadSessionId?: string;
  privacyConsent: true;
  marketingConsent: boolean;
  idempotencyKey: string;
  sourcePage?: string;
  referrer?: string;
  utm?: LeadUtm;
};

function isRecord(value: unknown): value is UnknownRecord {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function cleanText(value: string, maxLength: number) {
  return value
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function cleanMultilineText(value: string, maxLength: number) {
  return value
    .replace(/\r\n/g, "\n")
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, " ")
    .replace(/[ \t]+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function optionalCleanString(
  value: unknown,
  field: string,
  errors: FieldErrors,
  maxLength: number,
) {
  if (value == null || value === "") {
    return undefined;
  }

  if (typeof value !== "string") {
    errors[field] = "Enter text.";
    return undefined;
  }

  const cleaned = cleanText(value, maxLength);

  if (!cleaned) {
    return undefined;
  }

  return cleaned;
}

function requiredCleanString(
  value: unknown,
  field: string,
  errors: FieldErrors,
  message: string,
  maxLength: number,
) {
  const cleaned = optionalCleanString(value, field, errors, maxLength);

  if (!cleaned && !errors[field]) {
    errors[field] = message;
  }

  return cleaned || "";
}

function isLeadService(value: unknown): value is LeadService {
  return (
    typeof value === "string" &&
    (LEAD_SERVICES as readonly string[]).includes(value)
  );
}

function normalizeEmail(value: unknown, errors: FieldErrors) {
  const email = optionalCleanString(value, "email", errors, 254)?.toLowerCase();

  if (!email) {
    return undefined;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    errors.email = "Enter a valid email address.";
    return undefined;
  }

  return email;
}

function normalizePhone(value: unknown, errors: FieldErrors) {
  const phone = requiredCleanString(
    value,
    "phone",
    errors,
    "Enter a phone number.",
    32,
  );

  if (!phone) {
    return "";
  }

  if (!/^\+?[0-9][0-9\s().-]{6,30}$/.test(phone)) {
    errors.phone = "Enter a valid phone number.";
    return "";
  }

  return phone.replace(/\s+/g, " ");
}

function normalizePostcode(value: unknown, field: string, errors: FieldErrors) {
  const postcode = optionalCleanString(value, field, errors, 20)?.toUpperCase();

  if (!postcode) {
    return undefined;
  }

  if (!/^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/.test(postcode)) {
    errors[field] = "Enter a valid UK postcode.";
    return undefined;
  }

  return postcode.replace(/\s+/, " ");
}

function validateUploadSessionId(
  value: unknown,
  errors: FieldErrors,
  field = "uploadSessionId",
) {
  const uploadSessionId = requiredCleanString(
    value,
    field,
    errors,
    "Upload session is required.",
    128,
  );

  if (
    uploadSessionId &&
    !/^[A-Za-z0-9._:-]{16,128}$/.test(uploadSessionId)
  ) {
    errors[field] = "Use a valid upload session id.";
  }

  return uploadSessionId;
}

function validateUploadToken(
  value: unknown,
  field: string,
  errors: FieldErrors,
) {
  if (typeof value !== "string") {
    errors[field] = "Use a valid upload token.";
    return "";
  }

  const token = value.trim();

  if (!/^[A-Za-z0-9_-]{24,160}$/.test(token)) {
    errors[field] = "Use a valid upload token.";
    return "";
  }

  return token;
}

function validateUrlLike(
  value: unknown,
  field: string,
  errors: FieldErrors,
) {
  const cleaned = optionalCleanString(value, field, errors, 500);

  if (!cleaned) {
    return undefined;
  }

  if (cleaned.startsWith("/")) {
    return cleaned;
  }

  try {
    const url = new URL(cleaned);

    if (url.protocol !== "http:" && url.protocol !== "https:") {
      errors[field] = "Use a valid URL.";
      return undefined;
    }

    return url.toString().slice(0, 500);
  } catch {
    errors[field] = "Use a valid URL.";
    return undefined;
  }
}

function validateUtm(value: unknown, errors: FieldErrors) {
  if (value == null) {
    return undefined;
  }

  if (!isRecord(value)) {
    errors.utm = "Use valid tracking data.";
    return undefined;
  }

  const utm: LeadUtm = {};
  const map = {
    source: "source",
    medium: "medium",
    campaign: "campaign",
    term: "term",
    content: "content",
  } as const;

  for (const [inputKey, outputKey] of Object.entries(map)) {
    const cleaned = optionalCleanString(
      value[inputKey],
      `utm.${inputKey}`,
      errors,
      120,
    );

    if (cleaned) {
      utm[outputKey as keyof LeadUtm] = cleaned;
    }
  }

  return Object.keys(utm).length ? utm : undefined;
}

function normalizeGenericServiceValue(
  value: unknown,
  field: string,
  errors: FieldErrors,
) {
  if (value == null) {
    return null;
  }

  if (typeof value === "string") {
    return cleanText(value, 500);
  }

  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (Array.isArray(value)) {
    const items = value
      .map((item) => (typeof item === "string" ? cleanText(item, 120) : ""))
      .filter(Boolean)
      .slice(0, 12);

    return items;
  }

  errors[field] = "Use a valid value.";
  return null;
}

function validateServiceData(
  service: LeadService,
  value: unknown,
  errors: FieldErrors,
) {
  if (value == null) {
    return {};
  }

  if (!isRecord(value)) {
    errors.serviceData = "Use valid service details.";
    return {};
  }

  const entries = Object.entries(value);

  if (entries.length > MAX_SERVICE_DATA_FIELDS) {
    errors.serviceData = `Use ${MAX_SERVICE_DATA_FIELDS} fields or fewer.`;
  }

  const definitionMap = new Map<string, ServiceFieldDefinition>(
    leadServiceDefinitions[service].fields.map((field) => [field.key, field]),
  );
  const serviceData: LeadServiceData = {};

  for (const [key, rawValue] of entries.slice(0, MAX_SERVICE_DATA_FIELDS)) {
    const fieldPath = `serviceData.${key}`;

    if (!/^[A-Za-z][A-Za-z0-9_]{0,63}$/.test(key)) {
      errors[fieldPath] = "Use a valid field name.";
      continue;
    }

    const definition = definitionMap.get(key);

    if (!definition) {
      const valueForUnknownField = normalizeGenericServiceValue(
        rawValue,
        fieldPath,
        errors,
      );

      if (valueForUnknownField !== "" && !errors[fieldPath]) {
        serviceData[key] = valueForUnknownField;
      }

      continue;
    }

    if (rawValue == null || rawValue === "") {
      if (definition.required) {
        errors[fieldPath] = "This field is required.";
      }
      continue;
    }

    if (definition.type === "text") {
      if (typeof rawValue !== "string") {
        errors[fieldPath] = "Enter text.";
        continue;
      }

      const cleaned = cleanText(rawValue, definition.maxLength || 300);

      if (
        definition.allowedValues &&
        !(definition.allowedValues as readonly string[]).includes(cleaned)
      ) {
        errors[fieldPath] = "Choose a valid option.";
        continue;
      }

      if (cleaned) {
        serviceData[key] = cleaned;
      }
    }

    if (definition.type === "number") {
      const number =
        typeof rawValue === "number" ? rawValue : Number(String(rawValue));

      if (!Number.isFinite(number)) {
        errors[fieldPath] = "Enter a number.";
        continue;
      }

      if (definition.min != null && number < definition.min) {
        errors[fieldPath] = `Use ${definition.min} or more.`;
        continue;
      }

      if (definition.max != null && number > definition.max) {
        errors[fieldPath] = `Use ${definition.max} or less.`;
        continue;
      }

      if (definition.integer && !Number.isInteger(number)) {
        errors[fieldPath] = "Enter a whole number.";
        continue;
      }

      serviceData[key] = number;
    }

    if (definition.type === "boolean") {
      if (typeof rawValue !== "boolean") {
        errors[fieldPath] = "Choose yes or no.";
        continue;
      }

      serviceData[key] = rawValue;
    }

    if (definition.type === "multiText") {
      if (!Array.isArray(rawValue)) {
        errors[fieldPath] = "Use a valid list.";
        continue;
      }

      const items = rawValue
        .map((item) =>
          typeof item === "string"
            ? cleanText(item, definition.maxLength || 120)
            : "",
        )
        .filter(Boolean)
        .slice(0, definition.maxItems || 12);

      if (
        definition.allowedValues &&
        items.some(
          (item) => !(definition.allowedValues as readonly string[]).includes(item),
        )
      ) {
        errors[fieldPath] = "Choose valid options.";
        continue;
      }

      serviceData[key] = items;
    }

    if (definition.type === "date") {
      if (typeof rawValue !== "string") {
        errors[fieldPath] = "Enter a date.";
        continue;
      }

      const cleaned = cleanText(rawValue, 20);

      if (!/^\d{4}-\d{2}-\d{2}$/.test(cleaned)) {
        errors[fieldPath] = "Enter a valid date.";
        continue;
      }

      const parsed = new Date(`${cleaned}T00:00:00.000Z`);

      if (
        Number.isNaN(parsed.getTime()) ||
        parsed.toISOString().slice(0, 10) !== cleaned
      ) {
        errors[fieldPath] = "Enter a valid date.";
        continue;
      }

      serviceData[key] = cleaned;
    }
  }

  return serviceData;
}

export function validateUploadSignInput(
  input: unknown,
): ValidatedUploadSignInput {
  const errors: FieldErrors = {};

  if (!isRecord(input)) {
    throw validationError({ body: "Use a valid JSON object." });
  }

  const service = input.service;

  if (!isLeadService(service)) {
    errors.service = "Choose a valid service.";
  }

  const fileName = requiredCleanString(
    input.fileName,
    "fileName",
    errors,
    "File name is required.",
    180,
  );
  const mimeType = requiredCleanString(
    input.mimeType,
    "mimeType",
    errors,
    "File type is required.",
    120,
  ).toLowerCase();
  const sizeBytes =
    typeof input.sizeBytes === "number"
      ? input.sizeBytes
      : Number(input.sizeBytes);
  const uploadSessionId = validateUploadSessionId(input.uploadSessionId, errors);

  if (!Number.isInteger(sizeBytes)) {
    errors.sizeBytes = "Use a valid file size.";
  }

  if (fileName && mimeType && Number.isInteger(sizeBytes)) {
    const uploadError = uploadValidationError({
      fileName,
      mimeType,
      sizeBytes,
      service: isLeadService(service) ? service : undefined,
    });

    if (uploadError) {
      errors.file = uploadError;
    }
  }

  if (Object.keys(errors).length > 0 || !isLeadService(service)) {
    throw validationError(errors);
  }

  return {
    fileName,
    safeName: sanitizeFileName(fileName),
    mimeType,
    sizeBytes,
    service,
    uploadSessionId,
  };
}

export function validateUploadCompleteInput(
  input: unknown,
): ValidatedUploadCompleteInput {
  const errors: FieldErrors = {};

  if (!isRecord(input)) {
    throw validationError({ body: "Use a valid JSON object." });
  }

  const uploadToken = validateUploadToken(
    input.uploadToken,
    "uploadToken",
    errors,
  );

  if (Object.keys(errors).length > 0) {
    throw validationError(errors);
  }

  return { uploadToken };
}

export function validateLeadSubmissionInput(
  input: unknown,
): ValidatedLeadSubmissionInput {
  const errors: FieldErrors = {};

  if (!isRecord(input)) {
    throw validationError({ body: "Use a valid JSON object." });
  }

  if (typeof input.honeypot === "string" && input.honeypot.trim()) {
    throw validationError({ honeypot: "Leave this field empty." });
  }

  const formStartedAt =
    typeof input.formStartedAt === "number"
      ? input.formStartedAt
      : Number(input.formStartedAt);
  const now = Date.now();

  if (!Number.isFinite(formStartedAt)) {
    errors.formStartedAt = "Form start time is required.";
  } else if (formStartedAt > now + 60 * 1000) {
    errors.formStartedAt = "Use a valid form start time.";
  } else if (now - formStartedAt < MIN_LEAD_COMPLETION_MS) {
    errors.formStartedAt = "Please take a moment before submitting.";
  }

  const service = input.service;

  if (!isLeadService(service)) {
    errors.service = "Choose a valid service.";
  }

  const uploadPolicy = isLeadService(service)
    ? getLeadUploadPolicy(service)
    : getLeadUploadPolicy();

  const contact = isRecord(input.contact) ? input.contact : {};

  if (!isRecord(input.contact)) {
    errors.contact = "Use valid contact details.";
  }

  const name = requiredCleanString(
    contact.name,
    "name",
    errors,
    "Enter your name.",
    120,
  );
  const email = normalizeEmail(contact.email, errors);
  const phone = normalizePhone(contact.phone, errors);
  const postcode = normalizePostcode(contact.postcode, "postcode", errors);
  const message =
    typeof input.message === "string"
      ? cleanMultilineText(input.message, 2000)
      : undefined;
  const uploadTokens: string[] = [];

  if (input.uploadTokens != null) {
    if (!Array.isArray(input.uploadTokens)) {
      errors.uploadTokens = "Use a valid upload token list.";
    } else if (input.uploadTokens.length > uploadPolicy.maxFiles) {
      errors.uploadTokens = `Upload ${uploadPolicy.maxFiles} files or fewer.`;
    } else {
      const seenTokens = new Set<string>();

      input.uploadTokens.forEach((token, index) => {
        const field = `uploadTokens.${index}`;
        const parsed = validateUploadToken(token, field, errors);

        if (!parsed) return;

        if (seenTokens.has(parsed)) {
          errors[field] = "Upload tokens must be unique.";
          return;
        }

        seenTokens.add(parsed);
        uploadTokens.push(parsed);
      });
    }
  }

  let uploadSessionId: string | undefined;

  if (uploadTokens.length > 0) {
    uploadSessionId = validateUploadSessionId(input.uploadSessionId, errors);
  } else if (input.uploadSessionId != null && input.uploadSessionId !== "") {
    uploadSessionId = validateUploadSessionId(input.uploadSessionId, errors);
  }

  const privacyConsent = input.privacyConsent ?? input.consentPrivacy;

  if (privacyConsent !== true) {
    errors.privacyConsent = "Privacy consent is required.";
  }

  const marketingConsent =
    input.marketingConsent ?? input.consentMarketing ?? false;

  if (typeof marketingConsent !== "boolean") {
    errors.marketingConsent = "Choose yes or no.";
  }

  const idempotencyKey = requiredCleanString(
    input.idempotencyKey,
    "idempotencyKey",
    errors,
    "Idempotency key is required.",
    160,
  );

  if (idempotencyKey && !/^[A-Za-z0-9._:-]{16,160}$/.test(idempotencyKey)) {
    errors.idempotencyKey = "Use a valid idempotency key.";
  }

  const sourcePage = validateUrlLike(input.sourcePage, "sourcePage", errors);
  const referrer = validateUrlLike(input.referrer, "referrer", errors);
  const utm = validateUtm(input.utm, errors);
  const serviceData = isLeadService(service)
    ? validateServiceData(service, input.serviceData, errors)
    : {};

  if (service === "CONTACT_ENQUIRY") {
    if (!email && !errors.email) {
      errors.email = "Enter an email address.";
    }

    if (!message || message.length < 10) {
      errors.message = "Share at least 10 characters in your message.";
    }
  }

  if (service === "COMMERCIAL_SOFA") {
    if (!email && !errors.email) {
      errors.email = "Enter a work email address.";
    }

    if (!message || message.length < 20) {
      errors.message = "Share at least 20 characters about the project.";
    }

    if (serviceData.dimensionsKnown === true) {
      for (const key of ["widthCm", "depthCm"] as const) {
        if (typeof serviceData[key] !== "number") {
          errors[`serviceData.${key}`] = "Enter this measurement.";
        }
      }
    }
  }

  if (service === "INTERIOR_DESIGN") {
    if (!email && !errors.email) {
      errors.email = "Enter an email address.";
    }

    if (!message || message.length < 20) {
      errors.message = "Share at least 20 characters about the space.";
    }
  }

  if (service === "SOFA_REPAIR_RESTORATION") {
    if (uploadTokens.length < 1 && !errors.uploadTokens) {
      errors.uploadTokens = "Upload at least one photo.";
    }
  }

  if (Object.keys(errors).length > 0 || !isLeadService(service)) {
    throw validationError(errors);
  }

  return {
    service,
    contact: {
      name,
      ...(email ? { email } : {}),
      phone,
      ...(postcode ? { postcode } : {}),
    },
    serviceData,
    ...(message ? { message } : {}),
    uploadTokens,
    ...(uploadSessionId ? { uploadSessionId } : {}),
    privacyConsent: true,
    marketingConsent: Boolean(marketingConsent),
    idempotencyKey,
    ...(sourcePage ? { sourcePage } : {}),
    ...(referrer ? { referrer } : {}),
    ...(utm ? { utm } : {}),
  };
}

export function getCompletedUploadExpiry() {
  return new Date(Date.now() + COMPLETE_UPLOAD_TTL_HOURS * 60 * 60 * 1000);
}
