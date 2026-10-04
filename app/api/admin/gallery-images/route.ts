import { revalidatePath } from "next/cache";

import { handleApiError, ok } from "@/lib/api-response";
import { galleryPageValue } from "@/lib/gallery-pagination";
import { createGalleryImage, listGalleryImages } from "@/lib/gallery-image-repository";
import { validateGalleryImageInput } from "@/lib/gallery-image-validation";
import { readJsonBody } from "@/lib/http";
import { assertLeadAdmin } from "@/lib/lead-admin";
import { assertSameOrigin } from "@/lib/security";
import { galleryServices, type GalleryService } from "@/models/gallery-image";

const services = new Set<string>(galleryServices);
const noStore = { "Cache-Control": "no-store" };

export async function GET(request: Request) {
  try {
    await assertLeadAdmin(request);
    const params = new URL(request.url).searchParams;
    const serviceValue = params.get("service") || "";
    const activeValue = params.get("active");
    const result = await listGalleryImages({
      ...(params.get("search")?.trim() ? { search: params.get("search")!.trim().slice(0, 120) } : {}),
      ...(services.has(serviceValue) ? { service: serviceValue as GalleryService } : {}),
      ...(activeValue === "true" ? { active: true } : activeValue === "false" ? { active: false } : {}),
      page: galleryPageValue(params.get("page"), 1, 10_000, "Page"),
      limit: galleryPageValue(params.get("limit"), 12, 48, "Limit"),
    });
    return ok(result, { headers: noStore });
  } catch (error) { return handleApiError(error, { headers: noStore }); }
}

export async function POST(request: Request) {
  try {
    assertSameOrigin(request);
    await assertLeadAdmin(request);
    const result = await createGalleryImage(validateGalleryImageInput(await readJsonBody(request)));
    revalidatePath("/gallery");
    return ok(result, { headers: noStore });
  } catch (error) { return handleApiError(error, { headers: noStore }); }
}
