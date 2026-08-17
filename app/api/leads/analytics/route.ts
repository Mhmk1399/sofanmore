import { handleApiError, ok } from "@/lib/api-response";
import { assertLeadAdmin, parseLeadAnalyticsQuery } from "@/lib/lead-admin";
import { getLeadAnalytics } from "@/lib/lead-admin-repository";
import { scheduleOrphanUploadCleanup } from "@/lib/lead-cleanup";

export async function GET(request: Request) {
  try {
    await assertLeadAdmin(request);
    scheduleOrphanUploadCleanup();

    const query = parseLeadAnalyticsQuery(new URL(request.url).searchParams);
    const result = await getLeadAnalytics(query);

    return ok(result, {
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    return handleApiError(error);
  }
}
