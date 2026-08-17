import { emptyOk, handleApiError } from "@/lib/api-response";
import { readJsonBody } from "@/lib/http";
import { scheduleOrphanUploadCleanup } from "@/lib/lead-cleanup";
import { trackLeadEvent } from "@/lib/lead-analytics";
import { completeUpload } from "@/lib/lead-repository";
import { validateUploadCompleteInput } from "@/lib/lead-validation";
import { assertSameOrigin } from "@/lib/security";

export async function POST(request: Request) {
  try {
    assertSameOrigin(request);
    scheduleOrphanUploadCleanup();

    const body = await readJsonBody(request);
    const input = validateUploadCompleteInput(body);
    const upload = await completeUpload({
      uploadToken: input.uploadToken,
      request,
    });

    trackLeadEvent({
      eventName: "UPLOAD_COMPLETED",
      service: upload.service,
      fileCount: 1,
    });

    return emptyOk();
  } catch (error) {
    return handleApiError(error);
  }
}
