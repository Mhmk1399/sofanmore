import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

import { handleApiError, ok } from "@/lib/api-response";
import { deleteGalleryImage, getGalleryImageById, updateGalleryImage } from "@/lib/gallery-image-repository";
import { validateGalleryImageInput, validateGalleryObjectId } from "@/lib/gallery-image-validation";
import { readJsonBody } from "@/lib/http";
import { assertLeadAdmin } from "@/lib/lead-admin";
import { assertSameOrigin } from "@/lib/security";

type Context = { params: Promise<{ galleryImageId: string }> };
const noStore = { "Cache-Control": "no-store" };
async function id(context: Context) {
  return new ObjectId(validateGalleryObjectId((await context.params).galleryImageId));
}

export async function GET(request: Request, context: Context) {
  try {
    await assertLeadAdmin(request);
    return ok(await getGalleryImageById(await id(context)), { headers: noStore });
  } catch (error) { return handleApiError(error, { headers: noStore }); }
}

export async function PATCH(request: Request, context: Context) {
  try {
    assertSameOrigin(request);
    await assertLeadAdmin(request);
    const result = await updateGalleryImage(await id(context), validateGalleryImageInput(await readJsonBody(request), "update"));
    revalidatePath("/gallery");
    return ok(result, { headers: noStore });
  } catch (error) { return handleApiError(error, { headers: noStore }); }
}

export async function DELETE(request: Request, context: Context) {
  try {
    assertSameOrigin(request);
    await assertLeadAdmin(request);
    const result = await deleteGalleryImage(await id(context));
    revalidatePath("/gallery");
    return ok(result, { headers: noStore });
  } catch (error) { return handleApiError(error, { headers: noStore }); }
}
