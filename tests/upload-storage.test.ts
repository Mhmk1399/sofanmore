import { afterEach, beforeEach, describe, expect, it } from "vitest";

import {
  createProjectImageStorageKey,
  createStorageKey,
  getPublicUploadUrl,
  getUploadStorageConfig,
} from "@/lib/upload-storage";

const envNames = [
  "S3_BUCKET",
  "S3_REGION",
  "S3_PREFIX",
  "ACCESS_KEY_ID",
  "SECRET_ACCESS_KEY",
  "AWS_S3_BUCKET",
  "AWS_REGION",
  "AWS_ACCESS_KEY_ID",
  "AWS_SECRET_ACCESS_KEY",
  "UPLOAD_BUCKET",
  "UPLOAD_REGION",
  "UPLOAD_ACCESS_KEY_ID",
  "UPLOAD_SECRET_ACCESS_KEY",
] as const;

const originalEnv = Object.fromEntries(
  envNames.map((name) => [name, process.env[name]]),
);

describe("Amazon S3 upload storage", () => {
  beforeEach(() => {
    for (const name of envNames) delete process.env[name];

    process.env.S3_BUCKET = "sofanmore";
    process.env.S3_REGION = "eu-west-2";
    process.env.S3_PREFIX = "Image";
    process.env.ACCESS_KEY_ID = "test-access-key";
    process.env.SECRET_ACCESS_KEY = "test-secret-key";
  });

  afterEach(() => {
    for (const name of envNames) {
      const value = originalEnv[name];

      if (value === undefined) delete process.env[name];
      else process.env[name] = value;
    }
  });

  it("reads the native AWS configuration", () => {
    expect(getUploadStorageConfig()).toEqual({
      bucket: "sofanmore",
      region: "eu-west-2",
      prefix: "Image",
      accessKeyId: "test-access-key",
      secretAccessKey: "test-secret-key",
    });
  });

  it("creates lead and project keys below the configured Image prefix", () => {
    expect(
      createStorageKey({
        service: "COMMERCIAL_SOFA",
        safeName: "floor-plan.pdf",
        mimeType: "application/pdf",
      }),
    ).toMatch(
      /^Image\/lead-uploads\/commercial-sofa\/\d{4}\/\d{2}\/[a-f0-9]{48}\.pdf$/,
    );

    expect(
      createProjectImageStorageKey({
        safeName: "cover.webp",
        mimeType: "image/webp",
      }),
    ).toMatch(/^Image\/project-uploads\/\d{4}\/\d{2}\/[a-f0-9]{48}\.webp$/);
  });

  it("derives the regional S3 URL without a public base URL", () => {
    expect(getPublicUploadUrl("Image/project-uploads/a file.webp")).toBe(
      "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/project-uploads/a%20file.webp",
    );
  });

  it("keeps the previous upload variable names as migration aliases", () => {
    delete process.env.S3_BUCKET;
    delete process.env.S3_REGION;
    delete process.env.ACCESS_KEY_ID;
    delete process.env.SECRET_ACCESS_KEY;
    process.env.UPLOAD_BUCKET = "legacy-bucket";
    process.env.UPLOAD_REGION = "eu-central-1";
    process.env.UPLOAD_ACCESS_KEY_ID = "legacy-access";
    process.env.UPLOAD_SECRET_ACCESS_KEY = "legacy-secret";

    expect(getUploadStorageConfig()).toMatchObject({
      bucket: "legacy-bucket",
      region: "eu-central-1",
      accessKeyId: "legacy-access",
      secretAccessKey: "legacy-secret",
    });
  });
});
