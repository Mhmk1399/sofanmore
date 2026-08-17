import {
  DeleteObjectCommand,
  HeadObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomBytes } from "crypto";

import {
  UPLOAD_SIGNED_URL_TTL_SECONDS,
  defaultExtensionForMime,
  getFileExtension,
} from "@/lib/lead-config";
import type { LeadService } from "@/models/lead";

type UploadStorageConfig = {
  bucket: string;
  region: string;
  endpoint?: string;
  accessKeyId: string;
  secretAccessKey: string;
  publicBaseUrl?: string;
  forcePathStyle: boolean;
};

const globalForS3 = globalThis as typeof globalThis & {
  uploadStorageClient?: S3Client;
};

function requiredEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} is required for uploads.`);
  }

  return value;
}

export function getUploadStorageConfig(): UploadStorageConfig {
  const endpoint = process.env.UPLOAD_ENDPOINT || undefined;

  return {
    bucket: requiredEnv("UPLOAD_BUCKET"),
    region: requiredEnv("UPLOAD_REGION"),
    endpoint,
    accessKeyId: requiredEnv("UPLOAD_ACCESS_KEY_ID"),
    secretAccessKey: requiredEnv("UPLOAD_SECRET_ACCESS_KEY"),
    publicBaseUrl: process.env.UPLOAD_PUBLIC_BASE_URL,
    forcePathStyle: process.env.UPLOAD_FORCE_PATH_STYLE === "true",
  };
}

export function getUploadStorageClient() {
  if (!globalForS3.uploadStorageClient) {
    const config = getUploadStorageConfig();

    globalForS3.uploadStorageClient = new S3Client({
      region: config.region,
      endpoint: config.endpoint,
      forcePathStyle: config.forcePathStyle,
      credentials: {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
      },
    });
  }

  return globalForS3.uploadStorageClient;
}

function servicePath(service: LeadService) {
  return service.toLowerCase().replaceAll("_", "-");
}

export function createStorageKey(input: {
  service: LeadService;
  safeName: string;
  mimeType: string;
}) {
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, "0");
  const extension =
    getFileExtension(input.safeName) || defaultExtensionForMime(input.mimeType);
  const randomPart = randomBytes(24).toString("hex");

  return `lead-uploads/${servicePath(input.service)}/${year}/${month}/${randomPart}.${extension}`;
}

export async function signUploadUrl(input: {
  storageKey: string;
  mimeType: string;
}) {
  const config = getUploadStorageConfig();
  const client = getUploadStorageClient();
  const command = new PutObjectCommand({
    Bucket: config.bucket,
    Key: input.storageKey,
    ContentType: input.mimeType,
  });

  const uploadUrl = await getSignedUrl(client, command, {
    expiresIn: UPLOAD_SIGNED_URL_TTL_SECONDS,
  });

  return {
    uploadUrl,
    requiredHeaders: {
      "Content-Type": input.mimeType,
    },
  };
}

export async function headUploadedObject(storageKey: string) {
  const config = getUploadStorageConfig();
  const client = getUploadStorageClient();
  const result = await client.send(
    new HeadObjectCommand({
      Bucket: config.bucket,
      Key: storageKey,
    }),
  );

  return {
    sizeBytes: result.ContentLength || 0,
    mimeType: (result.ContentType || "").split(";")[0].trim().toLowerCase(),
    etag: result.ETag?.replaceAll('"', ""),
  };
}

export async function deleteUploadedObject(storageKey: string) {
  const config = getUploadStorageConfig();
  const client = getUploadStorageClient();

  await client.send(
    new DeleteObjectCommand({
      Bucket: config.bucket,
      Key: storageKey,
    }),
  );
}

export function getPublicUploadUrl(storageKey: string) {
  const baseUrl = process.env.UPLOAD_PUBLIC_BASE_URL?.replace(/\/$/, "");

  if (!baseUrl) {
    return undefined;
  }

  return `${baseUrl}/${storageKey
    .split("/")
    .map((part) => encodeURIComponent(part))
    .join("/")}`;
}
