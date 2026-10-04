import { ApiProblem, handleApiError, ok } from "@/lib/api-response";
import { compressGalleryImage } from "@/lib/gallery-image-compression";
import { assertDecodedGalleryMimeType, validateGalleryUpload } from "@/lib/gallery-image-validation";
import { assertLeadAdmin } from "@/lib/lead-admin";
import { createGalleryImageStorageKey, getPublicUploadUrl, uploadObject } from "@/lib/upload-storage";
import { assertSameOrigin } from "@/lib/security";

const noStore = { "Cache-Control": "no-store" };

export async function POST(request: Request) {
  try {
    assertSameOrigin(request);
    await assertLeadAdmin(request);
    const formData = await request.formData();
    const file = formData.get("file");
    if (!(file instanceof File)) {
      throw new ApiProblem("VALIDATION_ERROR", "Choose a gallery image.", 400, { file: "Choose a gallery image." });
    }
    const declared = validateGalleryUpload({ fileName: file.name, mimeType: file.type, sizeBytes: file.size });
    const receipt = await compressGalleryImage(Buffer.from(await file.arrayBuffer()));
    assertDecodedGalleryMimeType(declared.mimeType, receipt.sourceMimeType);
    const storageKey = createGalleryImageStorageKey(receipt.extension);
    await uploadObject({ storageKey, mimeType: receipt.mimeType, body: receipt.body });
    return ok({
      url: getPublicUploadUrl(storageKey),
      storageKey,
      mimeType: receipt.mimeType,
      width: receipt.width,
      height: receipt.height,
      originalBytes: receipt.originalBytes,
      storedBytes: receipt.storedBytes,
      savingsPercent: receipt.savingsPercent,
      qualityPreserved: true,
      convertedToWebp: true,
    }, { headers: noStore });
  } catch (error) { return handleApiError(error, { headers: noStore }); }
}
