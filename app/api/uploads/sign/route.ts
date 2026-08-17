import { handleApiError, ok } from "@/lib/api-response";
import { readJsonBody } from "@/lib/http";
import { scheduleOrphanUploadCleanup } from "@/lib/lead-cleanup";
import { UPLOAD_SIGNED_URL_TTL_SECONDS } from "@/lib/lead-config";
import { trackLeadEvent } from "@/lib/lead-analytics";
import { createPendingUpload } from "@/lib/lead-repository";
import { validateUploadSignInput } from "@/lib/lead-validation";
import { assertSameOrigin } from "@/lib/security";
import { createStorageKey, signUploadUrl } from "@/lib/upload-storage";

export async function POST(request: Request) {
  try {
    assertSameOrigin(request);
    scheduleOrphanUploadCleanup();

    const body = await readJsonBody(request);
    const upload = validateUploadSignInput(body);
    const storageKey = createStorageKey({
      service: upload.service,
      safeName: upload.safeName,
      mimeType: upload.mimeType,
    });
    const pendingUpload = await createPendingUpload({
      upload,
      storageKey,
      request,
    });
    const signedUpload = await signUploadUrl({
      storageKey,
      mimeType: upload.mimeType,
    });

    trackLeadEvent({
      eventName: "UPLOAD_SIGNED",
      service: upload.service,
      fileCount: 1,
    });

    return ok({
      uploadToken: pendingUpload.uploadToken,
      uploadUrl: signedUpload.uploadUrl,
      storageKey,
      expiresIn: UPLOAD_SIGNED_URL_TTL_SECONDS,
      requiredHeaders: signedUpload.requiredHeaders,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
