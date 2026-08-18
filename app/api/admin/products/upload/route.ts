import { ApiProblem, handleApiError, ok } from "@/lib/api-response";
import { assertLeadAdmin } from "@/lib/lead-admin";
import { sanitizeFileName } from "@/lib/lead-config";
import {
  createProductImageStorageKey,
  getPublicUploadUrl,
  uploadObject,
} from "@/lib/upload-storage";
import { validateProductImageUpload } from "@/lib/product-validation";
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
      throw new ApiProblem("VALIDATION_ERROR", "Choose a product image.", 400, {
        file: "Choose a product image.",
      });
    }

    const input = validateProductImageUpload({
      fileName: file.name,
      mimeType: file.type,
      sizeBytes: file.size,
    });
    const storageKey = createProductImageStorageKey({
      safeName: sanitizeFileName(input.safeName),
      mimeType: input.mimeType,
    });
    const imageUrl = getPublicUploadUrl(storageKey);

    if (!imageUrl) {
      throw new ApiProblem(
        "UPLOAD_FAILED",
        "UPLOAD_PUBLIC_BASE_URL is required for product image uploads.",
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
