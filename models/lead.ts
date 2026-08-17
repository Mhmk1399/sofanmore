import type { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";

export const LEAD_SERVICES = [
  "CONTACT_ENQUIRY",
  "BESPOKE_SOFA",
  "COMMERCIAL_SOFA",
  "INTERIOR_DESIGN",
  "SOFA_REPAIR_RESTORATION",
] as const;

export type LeadService = (typeof LEAD_SERVICES)[number];

export const LEAD_STATUSES = [
  "NEW",
  "CONTACTED",
  "QUALIFIED",
  "QUOTED",
  "WON",
  "LOST",
  "SPAM",
] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number];

export const ATTACHMENT_STATUSES = [
  "PENDING",
  "COMPLETE",
  "ATTACHED",
  "FAILED",
] as const;

export type AttachmentStatus = (typeof ATTACHMENT_STATUSES)[number];

export type LeadServiceDataValue =
  | string
  | number
  | boolean
  | string[]
  | null;

export type LeadServiceData = Record<string, LeadServiceDataValue>;

export type LeadContact = {
  name: string;
  email?: string;
  phone: string;
  postcode?: string;
};

export type LeadUtm = {
  source?: string;
  medium?: string;
  campaign?: string;
  term?: string;
  content?: string;
};

export type LeadDocument = {
  _id?: ObjectId;
  service: LeadService;
  status: LeadStatus;
  name: string;
  email?: string;
  phone: string;
  postcode?: string;
  message?: string;
  sourcePage?: string;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  serviceData: LeadServiceData;
  consentPrivacy: boolean;
  consentMarketing: boolean;
  idempotencyKey: string;
  ipHash?: string;
  userAgent?: string;
  attachmentCount: number;
  statusUpdatedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type LeadAttachmentDocument = {
  _id?: ObjectId;
  leadId?: ObjectId;
  uploadToken: string;
  uploadSessionHash: string;
  originalName: string;
  safeName: string;
  storageKey: string;
  mimeType: string;
  sizeBytes: number;
  width?: number;
  height?: number;
  service: LeadService;
  status: AttachmentStatus;
  ipHash?: string;
  userAgent?: string;
  etag?: string;
  completedAt?: Date;
  attachedAt?: Date;
  expiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
};

const leadSchema = new Schema(
  {
    service: {
      type: String,
      enum: LEAD_SERVICES,
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: LEAD_STATUSES,
      required: true,
      default: "NEW",
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      maxlength: 254,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      maxlength: 32,
    },
    postcode: {
      type: String,
      trim: true,
      uppercase: true,
      maxlength: 20,
      index: true,
    },
    message: {
      type: String,
      trim: true,
      maxlength: 2000,
    },
    sourcePage: {
      type: String,
      maxlength: 500,
    },
    referrer: {
      type: String,
      maxlength: 500,
    },
    utmSource: {
      type: String,
      maxlength: 120,
    },
    utmMedium: {
      type: String,
      maxlength: 120,
    },
    utmCampaign: {
      type: String,
      maxlength: 120,
    },
    utmTerm: {
      type: String,
      maxlength: 120,
    },
    utmContent: {
      type: String,
      maxlength: 120,
    },
    serviceData: {
      type: Schema.Types.Mixed,
      default: {},
    },
    consentPrivacy: {
      type: Boolean,
      required: true,
    },
    consentMarketing: {
      type: Boolean,
      default: false,
    },
    idempotencyKey: {
      type: String,
      required: true,
      unique: true,
      index: true,
      maxlength: 160,
    },
    ipHash: {
      type: String,
      maxlength: 128,
    },
    userAgent: {
      type: String,
      maxlength: 400,
    },
    attachmentCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    statusUpdatedAt: {
      type: Date,
    },
  },
  {
    collection: "leads",
    timestamps: true,
  },
);

leadSchema.index({ service: 1, status: 1, createdAt: -1 });
leadSchema.index({ postcode: 1, createdAt: -1 }, { sparse: true });
leadSchema.index({ createdAt: -1 });

const leadAttachmentSchema = new Schema(
  {
    leadId: {
      type: Schema.Types.ObjectId,
      ref: "Lead",
      index: true,
    },
    uploadToken: {
      type: String,
      required: true,
      unique: true,
      index: true,
      maxlength: 160,
    },
    uploadSessionHash: {
      type: String,
      required: true,
      index: true,
      maxlength: 128,
    },
    originalName: {
      type: String,
      required: true,
      maxlength: 180,
    },
    safeName: {
      type: String,
      required: true,
      maxlength: 140,
    },
    storageKey: {
      type: String,
      required: true,
      maxlength: 500,
    },
    mimeType: {
      type: String,
      required: true,
      maxlength: 120,
    },
    sizeBytes: {
      type: Number,
      required: true,
      min: 1,
    },
    width: {
      type: Number,
      min: 1,
    },
    height: {
      type: Number,
      min: 1,
    },
    service: {
      type: String,
      enum: LEAD_SERVICES,
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: ATTACHMENT_STATUSES,
      required: true,
      default: "PENDING",
      index: true,
    },
    ipHash: {
      type: String,
      maxlength: 128,
    },
    userAgent: {
      type: String,
      maxlength: 400,
    },
    etag: {
      type: String,
      maxlength: 160,
    },
    completedAt: {
      type: Date,
    },
    attachedAt: {
      type: Date,
    },
    expiresAt: {
      type: Date,
      index: true,
    },
  },
  {
    collection: "lead_uploads",
    timestamps: true,
  },
);

leadAttachmentSchema.index({ uploadSessionHash: 1, status: 1, createdAt: -1 });
leadAttachmentSchema.index({ leadId: 1, createdAt: -1 }, { sparse: true });
leadAttachmentSchema.index({ expiresAt: 1 }, { sparse: true });

export const Lead =
  mongoose.models.Lead || mongoose.model("Lead", leadSchema);

export const LeadAttachment =
  mongoose.models.LeadAttachment ||
  mongoose.model("LeadAttachment", leadAttachmentSchema);
