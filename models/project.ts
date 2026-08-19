import type { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";

export const projectServices = [
  "BESPOKE_SOFA",
  "COMMERCIAL_SOFA",
  "INTERIOR_DESIGN",
  "SOFA_REPAIR_RESTORATION",
] as const;

export type ProjectService = (typeof projectServices)[number];

export type ProjectImage = {
  id: string;
  url: string;
  storageKey?: string;
  alt: string;
  sortOrder: number;
};

export type ProjectDocument = {
  _id?: ObjectId;
  projectCode: number;
  title: string;
  slug: string;
  service: ProjectService;
  coverImageUrl: string;
  coverImageStorageKey?: string;
  images: ProjectImage[];
  excerpt: string;
  brief?: string;
  approach?: string;
  details?: string;
  result?: string;
  locationLabel?: string;
  featured: boolean;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
};

const projectImageSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
    },
    url: {
      type: String,
      required: true,
      trim: true,
      maxlength: 600,
    },
    storageKey: {
      type: String,
      trim: true,
      maxlength: 600,
    },
    alt: {
      type: String,
      required: true,
      trim: true,
      maxlength: 180,
    },
    sortOrder: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
  },
  { _id: false },
);

const projectSchema = new Schema(
  {
    projectCode: {
      type: Number,
      required: true,
      min: 1000,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 160,
      index: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 180,
      index: true,
    },
    service: {
      type: String,
      required: true,
      enum: projectServices,
      index: true,
    },
    coverImageUrl: {
      type: String,
      required: true,
      trim: true,
      maxlength: 600,
    },
    coverImageStorageKey: {
      type: String,
      trim: true,
      maxlength: 600,
    },
    images: {
      type: [projectImageSchema],
      default: [],
    },
    excerpt: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },
    brief: {
      type: String,
      trim: true,
      maxlength: 4000,
    },
    approach: {
      type: String,
      trim: true,
      maxlength: 4000,
    },
    details: {
      type: String,
      trim: true,
      maxlength: 4000,
    },
    result: {
      type: String,
      trim: true,
      maxlength: 4000,
    },
    locationLabel: {
      type: String,
      trim: true,
      maxlength: 120,
    },
    featured: {
      type: Boolean,
      default: false,
      index: true,
    },
    published: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  {
    collection: "projects",
    timestamps: true,
  },
);

projectSchema.index({ projectCode: 1 }, { unique: true });
projectSchema.index({ slug: 1 }, { unique: true });
projectSchema.index({ service: 1, createdAt: -1 });
projectSchema.index({ featured: 1, published: 1, createdAt: -1 });
projectSchema.index({ published: 1, createdAt: -1 });
projectSchema.index({ createdAt: -1 });
projectSchema.index({ title: 1, createdAt: -1 });

export const Project =
  mongoose.models.Project || mongoose.model("Project", projectSchema);
