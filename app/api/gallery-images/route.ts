import { ApiProblem, handleApiError, ok } from "@/lib/api-response";
import { listActiveGalleryImages } from "@/lib/gallery-image-repository";
import { galleryServices, type GalleryService } from "@/models/gallery-image";
import { galleryPageValue } from "@/lib/gallery-pagination";

const services = new Set<string>(galleryServices);
const DEFAULT_LIMIT = 16;
const MAX_LIMIT = 24;

export async function GET(request: Request) {
  try {
    const params = new URL(request.url).searchParams;
    const value = params.get("service")?.trim() || "";
    if (value && !services.has(value)) {
      throw new ApiProblem("VALIDATION_ERROR", "Choose a valid gallery service.", 400);
    }
    const service = services.has(value) ? (value as GalleryService) : undefined;
    const page = galleryPageValue(params.get("page"), 1, 10_000, "Page");
    const limit = galleryPageValue(params.get("limit"), DEFAULT_LIMIT, MAX_LIMIT, "Limit");
    const result = await listActiveGalleryImages(service, { page, limit });
    return ok(result, { headers: { "Cache-Control": "public, max-age=60, stale-while-revalidate=300" } });
  } catch (error) {
    return handleApiError(error);
  }
}
