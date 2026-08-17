import { handleApiError, ok } from "@/lib/api-response";
import { readJsonBody } from "@/lib/http";
import { assertLeadAdmin, parseLeadListQuery } from "@/lib/lead-admin";
import { listLeads } from "@/lib/lead-admin-repository";
import { scheduleOrphanUploadCleanup } from "@/lib/lead-cleanup";
import { trackLeadEvent } from "@/lib/lead-analytics";
import { notifyNewLead } from "@/lib/lead-notifications";
import { createLeadWithAttachments } from "@/lib/lead-repository";
import { validateLeadSubmissionInput } from "@/lib/lead-validation";
import { assertSameOrigin } from "@/lib/security";

export async function GET(request: Request) {
  try {
    await assertLeadAdmin(request);
    scheduleOrphanUploadCleanup();

    const query = parseLeadListQuery(new URL(request.url).searchParams);
    const result = await listLeads(query);

    return ok(result, {
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    assertSameOrigin(request);
    scheduleOrphanUploadCleanup();

    const body = await readJsonBody(request);
    const leadInput = validateLeadSubmissionInput(body);
    const result = await createLeadWithAttachments({
      lead: leadInput,
      request,
    });

    trackLeadEvent({
      eventName: "LEAD_SUBMITTED",
      service: leadInput.service,
      sourcePage: leadInput.sourcePage,
      fileCount: leadInput.uploadTokens.length,
    });

    if (!result.duplicate && result.lead) {
      try {
        await notifyNewLead(result.lead);
      } catch (error) {
        console.error("Lead notification failed", {
          leadId: result.leadId,
          error,
        });
      }
    }

    return ok({ leadId: result.leadId });
  } catch (error) {
    return handleApiError(error);
  }
}
