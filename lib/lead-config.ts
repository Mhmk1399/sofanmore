import type { LeadService } from "@/models/lead";

export const MAX_UPLOAD_COUNT = 8;
export const MAX_UPLOAD_SIZE_BYTES = 10 * 1024 * 1024;
export const COMMERCIAL_UPLOAD_COUNT = 10;
export const COMMERCIAL_UPLOAD_SIZE_BYTES = 15 * 1024 * 1024;
export const INTERIOR_UPLOAD_COUNT = 10;
export const INTERIOR_UPLOAD_SIZE_BYTES = 15 * 1024 * 1024;
export const UPLOAD_SIGNED_URL_TTL_SECONDS = 15 * 60;
export const PENDING_UPLOAD_TTL_HOURS = 24;
export const COMPLETE_UPLOAD_TTL_HOURS = 48;
export const MIN_LEAD_COMPLETION_MS = 3000;
export const MAX_SERVICE_DATA_FIELDS = 24;

export const allowedUploadTypes = [
  { mimeType: "image/jpeg", extensions: ["jpg", "jpeg"] },
  { mimeType: "image/png", extensions: ["png"] },
  { mimeType: "image/webp", extensions: ["webp"] },
  { mimeType: "image/heic", extensions: ["heic"] },
  { mimeType: "image/heif", extensions: ["heif"] },
  { mimeType: "application/pdf", extensions: ["pdf"] },
] as const;

export type ServiceFieldDefinition = {
  key: string;
  label: string;
  type: "text" | "number" | "boolean" | "multiText" | "date";
  required?: boolean;
  allowedValues?: readonly string[];
  maxLength?: number;
  min?: number;
  max?: number;
  integer?: boolean;
  maxItems?: number;
};

export const bespokeSofaProjectTypes = [
  "single-sofa",
  "corner-sofa",
  "modular-sofa",
  "armchair",
  "bench-ottoman",
  "other",
] as const;

export const bespokeSofaSpaceTypes = [
  "living-room",
  "apartment",
  "house",
  "office",
  "hospitality",
  "other",
] as const;

export const bespokeSofaConfigurations = [
  "straight",
  "corner",
  "chaise",
  "modular",
  "curved",
  "not-sure",
] as const;

export const bespokeSofaUpholsteryPreferences = [
  "fabric",
  "velvet",
  "leather",
  "not-sure",
  "other",
] as const;

export const bespokeSofaComfortPreferences = [
  "soft",
  "medium",
  "firm",
  "not-sure",
] as const;

export const bespokeSofaAccessRestrictions = [
  "none",
  "narrow-doorway",
  "stairs",
  "lift",
  "tight-hallway",
  "not-sure",
] as const;

export const commercialSofaVenueTypes = [
  "restaurant",
  "cafe",
  "hotel",
  "office",
  "hospitality",
  "retail",
  "other",
] as const;

export const commercialSofaProjectTypes = [
  "bespoke-sofas",
  "banquette-seating",
  "booth-seating",
  "reception-seating",
  "breakout-seating",
  "reupholstery",
  "not-sure",
] as const;

export const commercialSofaProjectStages = [
  "early-idea",
  "design-stage",
  "tender-quote",
  "ready-to-proceed",
  "refurbishment",
] as const;

export const interiorDesignProjectTypes = [
  "residential",
  "commercial",
  "restaurant-cafe",
  "hotel-hospitality",
  "office",
  "other",
] as const;

export const interiorDesignNeeds = [
  "complete-interior",
  "single-room",
  "space-planning",
  "colour-materials",
  "bespoke-sofa-integration",
  "commercial-seating",
  "styling",
  "not-sure",
] as const;

export const interiorDesignProjectStages = [
  "just-exploring",
  "planning",
  "property-secured",
  "renovation-underway",
  "ready-to-start",
] as const;

export const interiorPreferredContactMethods = [
  "phone",
  "email",
  "either",
] as const;

export const repairItemTypes = [
  "sofa",
  "armchair",
  "chair",
  "cushions",
  "banquette-commercial",
  "other",
] as const;

export const repairIssueTypes = [
  "worn-upholstery",
  "tear-damage",
  "sagging-cushions",
  "loss-of-comfort",
  "staining",
  "general-restoration",
  "not-sure",
  "other",
] as const;

export const repairApproximateAges = [
  "under-5-years",
  "5-10-years",
  "10-20-years",
  "20-plus-years",
  "unknown",
] as const;

export const repairTransportPreferences = [
  "can-drop-off",
  "need-collection",
  "not-sure",
] as const;

export const contactEnquiryTypes = ["general"] as const;

export const leadServiceDefinitions = {
  CONTACT_ENQUIRY: {
    label: "Contact enquiry",
    fields: [
      {
        key: "enquiryType",
        label: "Enquiry type",
        type: "text",
        allowedValues: contactEnquiryTypes,
        maxLength: 80,
      },
    ],
  },
  BESPOKE_SOFA: {
    label: "Bespoke sofa",
    fields: [
      {
        key: "projectType",
        label: "Project type",
        type: "text",
        required: true,
        allowedValues: bespokeSofaProjectTypes,
        maxLength: 80,
      },
      {
        key: "spaceType",
        label: "Space type",
        type: "text",
        required: true,
        allowedValues: bespokeSofaSpaceTypes,
        maxLength: 80,
      },
      {
        key: "dimensionsKnown",
        label: "Dimensions known",
        type: "boolean",
      },
      {
        key: "widthCm",
        label: "Width in cm",
        type: "number",
        min: 1,
        max: 2000,
      },
      {
        key: "depthCm",
        label: "Depth in cm",
        type: "number",
        min: 1,
        max: 2000,
      },
      {
        key: "heightCm",
        label: "Height in cm",
        type: "number",
        min: 1,
        max: 2000,
      },
      {
        key: "configuration",
        label: "Configuration",
        type: "text",
        allowedValues: bespokeSofaConfigurations,
        maxLength: 80,
      },
      {
        key: "upholsteryPreference",
        label: "Upholstery preference",
        type: "text",
        allowedValues: bespokeSofaUpholsteryPreferences,
        maxLength: 80,
      },
      {
        key: "comfortPreference",
        label: "Comfort preference",
        type: "text",
        allowedValues: bespokeSofaComfortPreferences,
        maxLength: 80,
      },
      {
        key: "accessRestrictions",
        label: "Access restrictions",
        type: "multiText",
        allowedValues: bespokeSofaAccessRestrictions,
        maxItems: 6,
        maxLength: 80,
      },
    ],
  },
  COMMERCIAL_SOFA: {
    label: "Commercial sofa",
    fields: [
      {
        key: "companyName",
        label: "Company name",
        type: "text",
        required: true,
        maxLength: 160,
      },
      {
        key: "venueType",
        label: "Venue type",
        type: "text",
        required: true,
        allowedValues: commercialSofaVenueTypes,
        maxLength: 80,
      },
      {
        key: "projectType",
        label: "Project type",
        type: "text",
        required: true,
        allowedValues: commercialSofaProjectTypes,
        maxLength: 120,
      },
      {
        key: "projectStage",
        label: "Project stage",
        type: "text",
        allowedValues: commercialSofaProjectStages,
        maxLength: 120,
      },
      {
        key: "approximateQuantity",
        label: "Approximate quantity",
        type: "number",
        min: 1,
        max: 10000,
        integer: true,
      },
      {
        key: "hasFloorPlan",
        label: "Has floor plan",
        type: "boolean",
      },
      {
        key: "dimensionsKnown",
        label: "Dimensions known",
        type: "boolean",
      },
      {
        key: "widthCm",
        label: "Width in cm",
        type: "number",
        min: 1,
        max: 100000,
      },
      {
        key: "depthCm",
        label: "Depth in cm",
        type: "number",
        min: 1,
        max: 100000,
      },
      {
        key: "heightCm",
        label: "Height in cm",
        type: "number",
        min: 1,
        max: 100000,
      },
      {
        key: "targetInstallationDate",
        label: "Target installation date",
        type: "date",
      },
    ],
  },
  INTERIOR_DESIGN: {
    label: "Interior design",
    fields: [
      {
        key: "projectType",
        label: "Project type",
        type: "text",
        required: true,
        allowedValues: interiorDesignProjectTypes,
        maxLength: 120,
      },
      {
        key: "needs",
        label: "Project needs",
        type: "multiText",
        allowedValues: interiorDesignNeeds,
        maxItems: 8,
        maxLength: 120,
      },
      {
        key: "projectStage",
        label: "Project stage",
        type: "text",
        allowedValues: interiorDesignProjectStages,
        maxLength: 120,
      },
      {
        key: "approximateSpaceSize",
        label: "Approximate space size",
        type: "text",
        maxLength: 120,
      },
      {
        key: "styleDirection",
        label: "Style direction",
        type: "text",
        maxLength: 240,
      },
      {
        key: "preferredContactMethod",
        label: "Preferred contact method",
        type: "text",
        allowedValues: interiorPreferredContactMethods,
        maxLength: 80,
      },
    ],
  },
  SOFA_REPAIR_RESTORATION: {
    label: "Sofa repair and restoration",
    fields: [
      {
        key: "itemType",
        label: "Item type",
        type: "text",
        required: true,
        allowedValues: repairItemTypes,
        maxLength: 120,
      },
      {
        key: "issues",
        label: "Issues",
        type: "multiText",
        allowedValues: repairIssueTypes,
        maxItems: 8,
        maxLength: 120,
      },
      {
        key: "approximateAge",
        label: "Approximate age",
        type: "text",
        allowedValues: repairApproximateAges,
        maxLength: 80,
      },
      {
        key: "transportPreference",
        label: "Transport preference",
        type: "text",
        allowedValues: repairTransportPreferences,
        maxLength: 80,
      },
    ],
  },
} satisfies Record<
  LeadService,
  {
    label: string;
    fields: readonly ServiceFieldDefinition[];
  }
>;

const dangerousExtensions = new Set([
  "bat",
  "cmd",
  "com",
  "dll",
  "exe",
  "html",
  "htm",
  "js",
  "mjs",
  "php",
  "ps1",
  "sh",
  "svg",
  "vbs",
]);

export const leadUploadPolicies = {
  DEFAULT: {
    maxFiles: MAX_UPLOAD_COUNT,
    maxSizeBytes: MAX_UPLOAD_SIZE_BYTES,
    allowedMimeTypes: allowedUploadTypes.map((item) => item.mimeType),
    description: "JPG, PNG, WebP, HEIC, HEIF, or PDF",
  },
  CONTACT_ENQUIRY: {
    maxFiles: 0,
    maxSizeBytes: MAX_UPLOAD_SIZE_BYTES,
    allowedMimeTypes: [],
    description: "no uploads",
  },
  BESPOKE_SOFA: {
    maxFiles: MAX_UPLOAD_COUNT,
    maxSizeBytes: MAX_UPLOAD_SIZE_BYTES,
    allowedMimeTypes: ["image/jpeg", "image/png", "image/webp"],
    description: "JPG, PNG, or WebP",
  },
  COMMERCIAL_SOFA: {
    maxFiles: COMMERCIAL_UPLOAD_COUNT,
    maxSizeBytes: COMMERCIAL_UPLOAD_SIZE_BYTES,
    allowedMimeTypes: [
      "image/jpeg",
      "image/png",
      "image/webp",
      "application/pdf",
    ],
    description: "JPG, PNG, WebP, or PDF",
  },
  INTERIOR_DESIGN: {
    maxFiles: INTERIOR_UPLOAD_COUNT,
    maxSizeBytes: INTERIOR_UPLOAD_SIZE_BYTES,
    allowedMimeTypes: [
      "image/jpeg",
      "image/png",
      "image/webp",
      "application/pdf",
    ],
    description: "JPG, PNG, WebP, or PDF",
  },
  SOFA_REPAIR_RESTORATION: {
    maxFiles: MAX_UPLOAD_COUNT,
    maxSizeBytes: MAX_UPLOAD_SIZE_BYTES,
    allowedMimeTypes: ["image/jpeg", "image/png", "image/webp"],
    description: "JPG, PNG, or WebP",
  },
} satisfies Record<
  LeadService | "DEFAULT",
  {
    maxFiles: number;
    maxSizeBytes: number;
    allowedMimeTypes: readonly string[];
    description: string;
  }
>;

export function getLeadUploadPolicy(service?: LeadService) {
  return service ? leadUploadPolicies[service] : leadUploadPolicies.DEFAULT;
}

export function getFileExtension(fileName: string) {
  const name = fileName.trim().toLowerCase();
  const dotIndex = name.lastIndexOf(".");

  if (dotIndex < 0 || dotIndex === name.length - 1) {
    return "";
  }

  return name.slice(dotIndex + 1);
}

export function sanitizeFileName(fileName: string) {
  const nameOnly = fileName.split(/[\\/]/).pop() || "upload";
  const collapsed = nameOnly
    .normalize("NFKD")
    .replace(/[^\w.\- ]+/g, "_")
    .replace(/\s+/g, " ")
    .replace(/_+/g, "_")
    .trim();

  return (collapsed || "upload").slice(0, 140);
}

export function uploadValidationError(input: {
  fileName: string;
  mimeType: string;
  sizeBytes: number;
  service?: LeadService;
}) {
  const mimeType = input.mimeType.trim().toLowerCase();
  const extension = getFileExtension(input.fileName);
  const match = allowedUploadTypes.find((item) => item.mimeType === mimeType);
  const uploadPolicy = getLeadUploadPolicy(input.service);
  const allowedMimeTypesForService = new Set(uploadPolicy.allowedMimeTypes);

  if (!input.fileName || input.fileName.length > 180) {
    return "Use a valid file name.";
  }

  if (uploadPolicy.allowedMimeTypes.length === 0) {
    return `${leadServiceDefinitions[input.service || "CONTACT_ENQUIRY"]?.label || "Lead"} does not accept file uploads.`;
  }

  if (!Number.isInteger(input.sizeBytes) || input.sizeBytes < 1) {
    return "Use a valid file size.";
  }

  if (input.sizeBytes > uploadPolicy.maxSizeBytes) {
    return `Each file must be ${Math.floor(uploadPolicy.maxSizeBytes / 1024 / 1024)}MB or smaller.`;
  }

  if (!match) {
    return "This file type is not supported.";
  }

  if (!allowedMimeTypesForService.has(mimeType)) {
    return `${leadServiceDefinitions[input.service || "BESPOKE_SOFA"]?.label || "Lead"} uploads must be ${uploadPolicy.description} files.`;
  }

  if (!extension || dangerousExtensions.has(extension)) {
    return "This file extension is not allowed.";
  }

  if (!(match.extensions as readonly string[]).includes(extension)) {
    return "The file extension does not match the file type.";
  }

  return null;
}

export function defaultExtensionForMime(mimeType: string) {
  return (
    allowedUploadTypes.find((item) => item.mimeType === mimeType)?.extensions[0] ||
    "bin"
  );
}
