import { ApiProblem, handleApiError, ok } from "@/lib/api-response";
import { readJsonBody } from "@/lib/http";
import { assertLeadAdmin } from "@/lib/lead-admin";
import { assertSameOrigin } from "@/lib/security";
import { deleteUploadedObject, isOwnedGalleryStorageKey } from "@/lib/upload-storage";

const noStore = { "Cache-Control": "no-store" };

export async function POST(request: Request) {
  try {
    assertSameOrigin(request);
    await assertLeadAdmin(request);
    const body = await readJsonBody(request);
    const storageKey =
      body && typeof body === "object" && !Array.isArray(body) &&
      typeof (body as Record<string, unknown>).storageKey === "string"
        ? (body as Record<string, string>).storageKey
        : "";
    if (!isOwnedGalleryStorageKey(storageKey)) {
      throw new ApiProblem("VALIDATION_ERROR", "Use a valid staged gallery upload.", 400);
    }
    await deleteUploadedObject(storageKey);
    return ok({ discardedStorageKey: storageKey }, { headers: noStore });
  } catch (error) {
    return handleApiError(error, { headers: noStore });
  }
}
