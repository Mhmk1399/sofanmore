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
  accessKeyId: string;
  secretAccessKey: string;
  prefix: string;
};

const globalForS3 = globalThis as typeof globalThis & {
  uploadStorageClient?: S3Client;
};

function firstEnv(names: string[]) {
  for (const name of names) {
    const value = process.env[name]?.trim();

    if (value) return value;
  }

  return undefined;
}

function requiredEnv(name: string, aliases: string[] = []) {
  const value = firstEnv([name, ...aliases]);

  if (!value) {
    throw new Error(`${name} is required for uploads.`);
  }

  return value;
}

export function getUploadStorageConfig(): UploadStorageConfig {
  const bucket = requiredEnv("S3_BUCKET", ["AWS_S3_BUCKET", "UPLOAD_BUCKET"]);
  const region = requiredEnv("S3_REGION", [
    "AWS_REGION",
    "NEXT_PUBLIC_S3_REGION",
    "UPLOAD_REGION",
  ]);
  const prefix = (process.env.S3_PREFIX?.trim() || "Image").replace(
    /^\/+|\/+$/g,
    "",
  );

  if (
    !/^[a-z0-9][a-z0-9.-]{1,61}[a-z0-9]$/.test(bucket) ||
    bucket.includes("..")
  ) {
    throw new Error("S3_BUCKET must be a valid Amazon S3 bucket name.");
  }

  if (!/^[a-z0-9-]+$/.test(region)) {
    throw new Error("S3_REGION must be a valid AWS region.");
  }

  if (!prefix || !/^[A-Za-z0-9][A-Za-z0-9._/-]*$/.test(prefix)) {
    throw new Error("S3_PREFIX must be a valid S3 key prefix.");
  }

  return {
    bucket,
    region,
    accessKeyId: requiredEnv("ACCESS_KEY_ID", [
      "AWS_ACCESS_KEY_ID",
      "UPLOAD_ACCESS_KEY_ID",
    ]),
    secretAccessKey: requiredEnv("SECRET_ACCESS_KEY", [
      "AWS_SECRET_ACCESS_KEY",
      "UPLOAD_SECRET_ACCESS_KEY",
    ]),
    prefix,
  };
}

export function getUploadStorageClient() {
  if (!globalForS3.uploadStorageClient) {
    const config = getUploadStorageConfig();

    globalForS3.uploadStorageClient = new S3Client({
      region: config.region,
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

function datedRandomKey(prefix: string, extension: string) {
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, "0");
  const randomPart = randomBytes(24).toString("hex");

  return `${prefix}/${year}/${month}/${randomPart}.${extension}`;
}

function withStoragePrefix(storageKey: string) {
  const prefix = (process.env.S3_PREFIX?.trim() || "Image").replace(
    /^\/+|\/+$/g,
    "",
  );

  return `${prefix}/${storageKey}`;
}

export function createStorageKey(input: {
  service: LeadService;
  safeName: string;
  mimeType: string;
}) {
  const extension =
    getFileExtension(input.safeName) || defaultExtensionForMime(input.mimeType);

  return withStoragePrefix(
    datedRandomKey(`lead-uploads/${servicePath(input.service)}`, extension),
  );
}

export function createProjectImageStorageKey(input: {
  safeName: string;
  mimeType: string;
}) {
  const extension =
    getFileExtension(input.safeName) || defaultExtensionForMime(input.mimeType);

  return withStoragePrefix(datedRandomKey("project-uploads", extension));
}

export async function uploadObject(input: {
  storageKey: string;
  mimeType: string;
  body: Buffer | Uint8Array;
}) {
  const config = getUploadStorageConfig();
  const client = getUploadStorageClient();

  await client.send(
    new PutObjectCommand({
      Bucket: config.bucket,
      Key: input.storageKey,
      ContentType: input.mimeType,
      Body: input.body,
    }),
  );
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
  const config = getUploadStorageConfig();
  const encodedStorageKey = storageKey
    .split("/")
    .map((part) => encodeURIComponent(part))
    .join("/");

  return `https://${config.bucket}.s3.${config.region}.amazonaws.com/${encodedStorageKey}`;
}
