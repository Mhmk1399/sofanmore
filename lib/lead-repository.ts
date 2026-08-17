import { randomBytes } from "crypto";
import { MongoServerError, ObjectId } from "mongodb";

import { ApiProblem } from "@/lib/api-response";
import {
  COMPLETE_UPLOAD_TTL_HOURS,
  PENDING_UPLOAD_TTL_HOURS,
  uploadValidationError,
} from "@/lib/lead-config";
import { ensureLeadIndexes, getLeadCollections, getMongoClient } from "@/lib/mongodb";
import {
  getIpHash,
  getUploadSessionHash,
  normalizeUserAgent,
} from "@/lib/security";
import { headUploadedObject } from "@/lib/upload-storage";
import type {
  ValidatedLeadSubmissionInput,
  ValidatedUploadSignInput,
} from "@/lib/lead-validation";
import type { LeadAttachmentDocument, LeadDocument } from "@/models/lead";

function createUploadToken() {
  return randomBytes(32).toString("base64url");
}

function addHours(date: Date, hours: number) {
  return new Date(date.getTime() + hours * 60 * 60 * 1000);
}

function isDuplicateKeyError(error: unknown) {
  return error instanceof MongoServerError && error.code === 11000;
}

export async function createPendingUpload(input: {
  upload: ValidatedUploadSignInput;
  storageKey: string;
  request: Request;
}) {
  await ensureLeadIndexes();

  const { uploads } = await getLeadCollections();
  const now = new Date();
  const document: LeadAttachmentDocument = {
    uploadToken: createUploadToken(),
    uploadSessionHash: getUploadSessionHash(input.upload.uploadSessionId),
    originalName: input.upload.fileName,
    safeName: input.upload.safeName,
    storageKey: input.storageKey,
    mimeType: input.upload.mimeType,
    sizeBytes: input.upload.sizeBytes,
    service: input.upload.service,
    status: "PENDING",
    ipHash: getIpHash(input.request),
    userAgent: normalizeUserAgent(input.request),
    expiresAt: addHours(now, PENDING_UPLOAD_TTL_HOURS),
    createdAt: now,
    updatedAt: now,
  };

  await uploads.insertOne(document);

  return document;
}

export async function completeUpload(input: {
  uploadToken: string;
  request: Request;
}) {
  await ensureLeadIndexes();

  const { uploads } = await getLeadCollections();
  const upload = await uploads.findOne({ uploadToken: input.uploadToken });

  if (!upload) {
    throw new ApiProblem("UPLOAD_INVALID", "Upload token is invalid.", 400, {
      uploadToken: "Upload token is invalid.",
    });
  }

  if (upload.status === "ATTACHED") {
    throw new ApiProblem(
      "UPLOAD_INVALID",
      "This upload is already attached to a lead.",
      400,
      { uploadToken: "This upload is already attached." },
    );
  }

  if (upload.status === "COMPLETE") {
    return upload;
  }

  if (upload.status !== "PENDING" || !upload.expiresAt || upload.expiresAt < new Date()) {
    throw new ApiProblem("UPLOAD_INVALID", "Upload token has expired.", 400, {
      uploadToken: "Upload token has expired.",
    });
  }

  if (
    upload.ipHash !== getIpHash(input.request) ||
    upload.userAgent !== normalizeUserAgent(input.request)
  ) {
    throw new ApiProblem("UPLOAD_INVALID", "Upload ownership is invalid.", 400, {
      uploadToken: "Upload ownership is invalid.",
    });
  }

  let objectHead: Awaited<ReturnType<typeof headUploadedObject>>;

  try {
    objectHead = await headUploadedObject(upload.storageKey);
  } catch {
    throw new ApiProblem(
      "UPLOAD_INCOMPLETE",
      "Upload is not complete yet.",
      400,
      { uploadToken: "Upload is not available in storage yet." },
    );
  }

  const uploadError = uploadValidationError({
    fileName: upload.originalName,
    mimeType: objectHead.mimeType || upload.mimeType,
    sizeBytes: objectHead.sizeBytes,
    service: upload.service,
  });

  if (uploadError || objectHead.mimeType !== upload.mimeType) {
    await uploads.updateOne(
      { uploadToken: input.uploadToken },
      {
        $set: {
          status: "FAILED",
          updatedAt: new Date(),
          expiresAt: addHours(new Date(), COMPLETE_UPLOAD_TTL_HOURS),
        },
      },
    );

    throw new ApiProblem("UPLOAD_INVALID", "Uploaded file is invalid.", 400, {
      uploadToken: uploadError || "Uploaded file metadata does not match.",
    });
  }

  const now = new Date();
  const updateResult = await uploads.updateOne(
    { uploadToken: input.uploadToken, status: "PENDING" },
    {
      $set: {
        status: "COMPLETE",
        sizeBytes: objectHead.sizeBytes,
        mimeType: objectHead.mimeType,
        etag: objectHead.etag,
        completedAt: now,
        expiresAt: addHours(now, COMPLETE_UPLOAD_TTL_HOURS),
        updatedAt: now,
      },
    },
  );

  if (updateResult.modifiedCount !== 1) {
    const refreshed = await uploads.findOne({ uploadToken: input.uploadToken });

    if (refreshed?.status === "COMPLETE") {
      return refreshed;
    }

    throw new ApiProblem("UPLOAD_FAILED", "Upload could not be completed.", 500);
  }

  const completedUpload = await uploads.findOne({ uploadToken: input.uploadToken });

  if (!completedUpload) {
    throw new ApiProblem("UPLOAD_FAILED", "Upload could not be completed.", 500);
  }

  return completedUpload;
}

async function validateCompletedUploads(input: {
  uploadTokens: string[];
  uploadSessionId?: string;
  service: ValidatedLeadSubmissionInput["service"];
  request: Request;
}) {
  if (input.uploadTokens.length === 0) {
    return [];
  }

  if (!input.uploadSessionId) {
    throw new ApiProblem(
      "UPLOAD_INVALID",
      "Upload session is required.",
      400,
      { uploadSessionId: "Upload session is required." },
    );
  }

  const { uploads } = await getLeadCollections();
  const uploadSessionHash = getUploadSessionHash(input.uploadSessionId);
  const documents = await uploads
    .find({ uploadToken: { $in: input.uploadTokens } })
    .toArray();
  const byToken = new Map(
    documents.map((document) => [document.uploadToken, document]),
  );
  const orderedDocuments: LeadAttachmentDocument[] = [];
  const now = new Date();
  const requestUserAgent = normalizeUserAgent(input.request);

  for (const uploadToken of input.uploadTokens) {
    const upload = byToken.get(uploadToken);

    if (!upload) {
      throw new ApiProblem("UPLOAD_INVALID", "Upload token is invalid.", 400, {
        uploadTokens: "One or more upload tokens are invalid.",
      });
    }

    if (upload.status !== "COMPLETE") {
      throw new ApiProblem(
        "UPLOAD_INCOMPLETE",
        "Please wait for every file upload to finish.",
        400,
        { uploadTokens: "One or more uploads are incomplete." },
      );
    }

    if (upload.leadId) {
      throw new ApiProblem(
        "UPLOAD_INVALID",
        "Upload is already attached to another lead.",
        400,
        { uploadTokens: "One or more uploads were already used." },
      );
    }

    if (
      upload.uploadSessionHash !== uploadSessionHash ||
      upload.service !== input.service ||
      upload.userAgent !== requestUserAgent ||
      (upload.expiresAt && upload.expiresAt <= now)
    ) {
      throw new ApiProblem("UPLOAD_INVALID", "Upload ownership is invalid.", 400, {
        uploadTokens: "One or more uploads do not belong to this submission.",
      });
    }

    const uploadError = uploadValidationError({
      fileName: upload.originalName,
      mimeType: upload.mimeType,
      sizeBytes: upload.sizeBytes,
      service: upload.service,
    });

    if (uploadError) {
      throw new ApiProblem("UPLOAD_INVALID", "Uploaded file is invalid.", 400, {
        uploadTokens: uploadError,
      });
    }

    orderedDocuments.push(upload);
  }

  return orderedDocuments;
}

function buildLeadDocument(input: {
  lead: ValidatedLeadSubmissionInput;
  request: Request;
  leadId: ObjectId;
  now: Date;
}): LeadDocument {
  const { lead, request, leadId, now } = input;

  return {
    _id: leadId,
    service: lead.service,
    status: "NEW",
    name: lead.contact.name,
    ...(lead.contact.email ? { email: lead.contact.email } : {}),
    phone: lead.contact.phone,
    ...(lead.contact.postcode ? { postcode: lead.contact.postcode } : {}),
    ...(lead.message ? { message: lead.message } : {}),
    ...(lead.sourcePage ? { sourcePage: lead.sourcePage } : {}),
    ...(lead.referrer ? { referrer: lead.referrer } : {}),
    ...(lead.utm?.source ? { utmSource: lead.utm.source } : {}),
    ...(lead.utm?.medium ? { utmMedium: lead.utm.medium } : {}),
    ...(lead.utm?.campaign ? { utmCampaign: lead.utm.campaign } : {}),
    ...(lead.utm?.term ? { utmTerm: lead.utm.term } : {}),
    ...(lead.utm?.content ? { utmContent: lead.utm.content } : {}),
    serviceData: lead.serviceData,
    consentPrivacy: lead.privacyConsent,
    consentMarketing: lead.marketingConsent,
    idempotencyKey: lead.idempotencyKey,
    ipHash: getIpHash(request),
    userAgent: normalizeUserAgent(request),
    attachmentCount: lead.uploadTokens.length,
    createdAt: now,
    updatedAt: now,
  };
}

export async function createLeadWithAttachments(input: {
  lead: ValidatedLeadSubmissionInput;
  request: Request;
}) {
  await ensureLeadIndexes();

  const client = await getMongoClient();
  const { leads, uploads } = await getLeadCollections();
  const existingLead = await leads.findOne(
    { idempotencyKey: input.lead.idempotencyKey },
    { projection: { _id: 1 } },
  );

  if (existingLead?._id) {
    return {
      leadId: existingLead._id.toHexString(),
      duplicate: true,
      lead: undefined,
    };
  }

  const completedUploads = await validateCompletedUploads({
    uploadTokens: input.lead.uploadTokens,
    uploadSessionId: input.lead.uploadSessionId,
    service: input.lead.service,
    request: input.request,
  });
  const session = client.startSession();
  const leadId = new ObjectId();
  const now = new Date();
  const leadDocument = buildLeadDocument({
    lead: input.lead,
    request: input.request,
    leadId,
    now,
  });

  try {
    await session.withTransaction(async () => {
      const duplicateLead = await leads.findOne(
        { idempotencyKey: input.lead.idempotencyKey },
        { projection: { _id: 1 }, session },
      );

      if (duplicateLead?._id) {
        throw new ApiProblem(
          "DUPLICATE_SUBMISSION",
          duplicateLead._id.toHexString(),
          409,
        );
      }

      await leads.insertOne(leadDocument, { session });

      if (completedUploads.length > 0) {
        const uploadSessionHash = getUploadSessionHash(
          input.lead.uploadSessionId || "",
        );
        const updateResult = await uploads.updateMany(
          {
            uploadToken: { $in: input.lead.uploadTokens },
            uploadSessionHash,
            status: "COMPLETE",
            service: input.lead.service,
            leadId: { $exists: false },
          },
          {
            $set: {
              leadId,
              status: "ATTACHED",
              attachedAt: now,
              updatedAt: now,
            },
            $unset: { expiresAt: "" },
          },
          { session },
        );

        if (updateResult.modifiedCount !== completedUploads.length) {
          throw new ApiProblem(
            "UPLOAD_INVALID",
            "One or more uploads could not be attached.",
            400,
            { uploadTokens: "One or more uploads could not be attached." },
          );
        }
      }
    });
  } catch (error) {
    if (error instanceof ApiProblem && error.code === "DUPLICATE_SUBMISSION") {
      return {
        leadId: error.message,
        duplicate: true,
        lead: undefined,
      };
    }

    if (isDuplicateKeyError(error)) {
      const duplicateLead = await leads.findOne(
        { idempotencyKey: input.lead.idempotencyKey },
        { projection: { _id: 1 } },
      );

      if (duplicateLead?._id) {
        return {
          leadId: duplicateLead._id.toHexString(),
          duplicate: true,
          lead: undefined,
        };
      }
    }

    throw error;
  } finally {
    await session.endSession();
  }

  return {
    leadId: leadId.toHexString(),
    duplicate: false,
    lead: leadDocument,
  };
}
