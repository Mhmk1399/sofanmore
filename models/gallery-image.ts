import type { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";

import { projectServices, type ProjectService } from "@/models/project";

export { projectServices as galleryServices } from "@/models/project";
export type GalleryService = ProjectService;

export type GalleryImageDocument = {
  _id?: ObjectId;
  url: string;
  storageKey?: string;
  alt: string;
  description: string;
  code: number;
  service: GalleryService;
  active: boolean;
  sortOrder: number;
  width?: number;
  height?: number;
  mimeType?: string;
  storedBytes?: number;
  originalBytes?: number;
  createdAt: Date;
  updatedAt: Date;
};

const galleryImageSchema = new Schema(
  {
    url: { type: String, required: true, trim: true, maxlength: 600 },
    storageKey: { type: String, trim: true, maxlength: 600 },
    alt: { type: String, required: true, trim: true, maxlength: 180 },
    description: { type: String, required: true, trim: true, maxlength: 1000 },
    code: { type: Number, required: true, min: 1, index: true },
    service: { type: String, required: true, enum: projectServices, index: true },
    active: { type: Boolean, required: true, default: true, index: true },
    sortOrder: { type: Number, required: true, min: 0, default: 0 },
    width: { type: Number, min: 1 },
    height: { type: Number, min: 1 },
    mimeType: { type: String, trim: true, maxlength: 80 },
    storedBytes: { type: Number, min: 1 },
    originalBytes: { type: Number, min: 1 },
  },
  { collection: "gallery_images", timestamps: true },
);

galleryImageSchema.index({ code: 1 }, { unique: true });
galleryImageSchema.index({ active: 1, service: 1, sortOrder: 1, createdAt: -1 });
galleryImageSchema.index({ service: 1, active: 1, updatedAt: -1 });
galleryImageSchema.index({ updatedAt: -1 });

export const GalleryImage =
  mongoose.models.GalleryImage ||
  mongoose.model("GalleryImage", galleryImageSchema);
