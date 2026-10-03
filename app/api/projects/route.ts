import { ApiProblem, handleApiError, ok } from "@/lib/api-response";
import { listPublishedProjectCards } from "@/lib/project-repository";
import { projectServices, type ProjectService } from "@/models/project";

const serviceSet = new Set<string>(projectServices);

export async function GET(request: Request) {
  try {
    const searchParams = new URL(request.url).searchParams;
    const service = searchParams.get("service")?.trim() || "";
    if (!serviceSet.has(service)) {
      throw new ApiProblem(
        "VALIDATION_ERROR",
        "Select a valid project service.",
        400,
        { service: "A valid service is required." },
      );
    }

    const limitValue = searchParams.get("limit");
    const limit = limitValue === null ? 6 : Number(limitValue);
    if (!Number.isInteger(limit) || limit < 1 || limit > 24) {
      throw new ApiProblem(
        "VALIDATION_ERROR",
        "Limit must be a whole number between 1 and 24.",
        400,
        { limit: "Use a whole number between 1 and 24." },
      );
    }

    const result = await listPublishedProjectCards(
      service as ProjectService,
      limit,
    );
    return ok(result, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600",
      },
    });
  } catch (error) {
    return handleApiError(error);
  }
}
