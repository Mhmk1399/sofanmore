import { ApiProblem, handleApiError, ok } from "@/lib/api-response";
import { assertLeadAdmin } from "@/lib/lead-admin";
import { sanitizeFileName } from "@/lib/lead-config";
import {
  createProjectImageStorageKey,
  getPublicUploadUrl,
  uploadObject,
} from "@/lib/upload-storage";
import { validateProjectImageUpload } from "@/lib/project-validation";
import { assertSameOrigin } from "@/lib/security";

const noStoreHeaders = {
  "Cache-Control": "no-store",
};

export async function POST(request: Request) {
  try {
    assertSameOrigin(request);
    await assertLeadAdmin(request);

    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      throw new ApiProblem("VALIDATION_ERROR", "Choose a project image.", 400, {
        file: "Choose a project image.",
      });
    }

    const input = validateProjectImageUpload({
      fileName: file.name,
      mimeType: file.type,
      sizeBytes: file.size,
    });
    const storageKey = createProjectImageStorageKey({
      safeName: sanitizeFileName(input.safeName),
      mimeType: input.mimeType,
    });
    const imageUrl = getPublicUploadUrl(storageKey);

    if (!imageUrl) {
      throw new ApiProblem(
        "UPLOAD_FAILED",
        "UPLOAD_PUBLIC_BASE_URL is required for project image uploads.",
        500,
      );
    }

    await uploadObject({
      storageKey,
      mimeType: input.mimeType,
      body: Buffer.from(await file.arrayBuffer()),
    });

    return ok(
      {
        imageUrl,
        imageStorageKey: storageKey,
      },
      { headers: noStoreHeaders },
    );
  } catch (error) {
    return handleApiError(error);
  }
}
