import { MongoServerError, ObjectId, type Filter } from "mongodb";

import { ApiProblem } from "@/lib/api-response";
import { ensureGalleryImageIndexes, getGalleryImageCollections } from "@/lib/mongodb";
import type { ValidatedGalleryImageInput } from "@/lib/gallery-image-validation";
import { deleteUploadedObject, isOwnedGalleryStorageKey } from "@/lib/upload-storage";
import type { GalleryImageDocument, GalleryService } from "@/models/gallery-image";

export type SerializedGalleryImage = {
  id: string;
  url: string;
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
  storageKey?: string;
  createdAt: string;
  updatedAt: string;
};

export function serializeGalleryImage(image: GalleryImageDocument): SerializedGalleryImage {
  return {
    id: image._id?.toHexString() || "",
    url: image.url,
    ...(image.storageKey ? { storageKey: image.storageKey } : {}),
    alt: image.alt,
    description: image.description,
    code: image.code,
    service: image.service,
    active: Boolean(image.active),
    sortOrder: image.sortOrder || 0,
    ...(image.width ? { width: image.width } : {}),
    ...(image.height ? { height: image.height } : {}),
    ...(image.mimeType ? { mimeType: image.mimeType } : {}),
    ...(image.storedBytes ? { storedBytes: image.storedBytes } : {}),
    ...(image.originalBytes ? { originalBytes: image.originalBytes } : {}),
    createdAt: image.createdAt.toISOString(),
    updatedAt: image.updatedAt.toISOString(),
  };
}

export function toPublicGalleryImage(image: SerializedGalleryImage) {
  const { id, url, alt, description, code, service, sortOrder, width, height } = image;
  return { id, url, alt, description, code, service, sortOrder, ...(width ? { width } : {}), ...(height ? { height } : {}) };
}

function conflict(error: unknown): never {
  if (error instanceof MongoServerError && error.code === 11000) {
    throw new ApiProblem("CONFLICT", "This gallery code is already used.", 409, {
      code: "This gallery code is already used.",
    });
  }
  throw error;
}

export type GalleryPagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasMore: boolean;
};

function pagination(page: number, limit: number, total: number): GalleryPagination {
  const totalPages = Math.max(1, Math.ceil(total / limit));
  return { page, limit, total, totalPages, hasMore: page < totalPages };
}

export async function listActiveGalleryImages(
  service?: GalleryService,
  options: { page?: number; limit?: number } = {},
) {
  await ensureGalleryImageIndexes();
  const { galleryImages } = await getGalleryImageCollections();
  const page = options.page ?? 1;
  const limit = options.limit ?? 16;
  const filter: Filter<GalleryImageDocument> = { active: true, ...(service ? { service } : {}) };
  const [docs, total] = await Promise.all([
    galleryImages.find(filter).sort({ sortOrder: 1, createdAt: -1, _id: 1 }).skip((page - 1) * limit).limit(limit).toArray(),
    galleryImages.countDocuments(filter),
  ]);
  return {
    images: docs.map(serializeGalleryImage).map(toPublicGalleryImage),
    pagination: pagination(page, limit, total),
  };
}

export async function listGalleryImages(query: { search?: string; service?: GalleryService; active?: boolean; page?: number; limit?: number } = {}) {
  await ensureGalleryImageIndexes();
  const { galleryImages } = await getGalleryImageCollections();
  const filter: Filter<GalleryImageDocument> = {};
  if (query.service) filter.service = query.service;
  if (query.active !== undefined) filter.active = query.active;
  if (query.search) {
    const escaped = query.search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(escaped, "i");
    const number = Number(query.search);
    filter.$or = [{ alt: regex }, { description: regex }];
    if (Number.isInteger(number)) filter.$or.push({ code: number });
  }
  const page = query.page ?? 1;
  const limit = query.limit ?? 12;
  const [images, total, active, inactive] = await Promise.all([
    galleryImages.find(filter).sort({ updatedAt: -1, _id: -1 }).skip((page - 1) * limit).limit(limit).toArray(),
    galleryImages.countDocuments(filter),
    galleryImages.countDocuments({ active: true }),
    galleryImages.countDocuments({ active: false }),
  ]);
  return { images: images.map(serializeGalleryImage), pagination: pagination(page, limit, total), counts: { active, inactive, all: active + inactive } };
}

export async function getGalleryImageById(id: ObjectId) {
  await ensureGalleryImageIndexes();
  const { galleryImages } = await getGalleryImageCollections();
  const image = await galleryImages.findOne({ _id: id });
  if (!image) throw new ApiProblem("NOT_FOUND", "Gallery image was not found.", 404);
  return { image: serializeGalleryImage(image) };
}

export async function createGalleryImage(input: ValidatedGalleryImageInput) {
  if (!input.url || !input.alt || !input.description || !input.code || !input.service) {
    throw new ApiProblem("VALIDATION_ERROR", "Please complete all required fields.", 400);
  }
  await ensureGalleryImageIndexes();
  const { galleryImages } = await getGalleryImageCollections();
  const now = new Date();
  const document: GalleryImageDocument = {
    url: input.url,
    ...(input.storageKey ? { storageKey: input.storageKey } : {}),
    alt: input.alt,
    description: input.description,
    code: input.code,
    service: input.service,
    active: input.active ?? true,
    sortOrder: input.sortOrder ?? 0,
    ...(input.width ? { width: input.width } : {}),
    ...(input.height ? { height: input.height } : {}),
    ...(input.mimeType ? { mimeType: input.mimeType } : {}),
    ...(input.storedBytes ? { storedBytes: input.storedBytes } : {}),
    ...(input.originalBytes ? { originalBytes: input.originalBytes } : {}),
    createdAt: now,
    updatedAt: now,
  };
  try {
    const result = await galleryImages.insertOne(document);
    return { image: serializeGalleryImage({ ...document, _id: result.insertedId }) };
  } catch (error) { conflict(error); }
}

export async function updateGalleryImage(id: ObjectId, input: ValidatedGalleryImageInput) {
  await ensureGalleryImageIndexes();
  const { galleryImages } = await getGalleryImageCollections();
  const before = await galleryImages.findOne({ _id: id });
  if (!before) throw new ApiProblem("NOT_FOUND", "Gallery image was not found.", 404);
  const set: Record<string, unknown> = { ...input, updatedAt: new Date() };
  if (input.storageKey === "") delete set.storageKey;
  let after;
  try {
    after = await galleryImages.findOneAndUpdate(
      { _id: id },
      { $set: set, ...(input.storageKey === "" ? { $unset: { storageKey: "" } } : {}) },
      { returnDocument: "after" },
    );
  } catch (error) { conflict(error); }
  if (!after) throw new ApiProblem("NOT_FOUND", "Gallery image was not found.", 404);

  let cleanupWarning: string | undefined;
  if (before.storageKey && before.storageKey !== after.storageKey && isOwnedGalleryStorageKey(before.storageKey)) {
    try { await deleteUploadedObject(before.storageKey); }
    catch (error) {
      console.warn("Gallery image replacement cleanup failed", { storageKey: before.storageKey, error });
      cleanupWarning = "The image was saved, but the previous S3 object could not be removed.";
    }
  }
  return { image: serializeGalleryImage(after), ...(cleanupWarning ? { cleanupWarning } : {}) };
}

export async function deleteGalleryImage(id: ObjectId) {
  await ensureGalleryImageIndexes();
  const { galleryImages } = await getGalleryImageCollections();
  const image = await galleryImages.findOneAndDelete({ _id: id });
  if (!image) throw new ApiProblem("NOT_FOUND", "Gallery image was not found.", 404);
  let cleanupWarning: string | undefined;
  if (image.storageKey && isOwnedGalleryStorageKey(image.storageKey)) {
    try { await deleteUploadedObject(image.storageKey); }
    catch (error) {
      console.warn("Gallery image delete cleanup failed", { storageKey: image.storageKey, error });
      cleanupWarning = "The database record was removed, but the S3 object could not be deleted.";
    }
  }
  return { deletedGalleryImageId: id.toHexString(), ...(cleanupWarning ? { cleanupWarning } : {}) };
}
