import { handleApiError, ok } from "@/lib/api-response";
import { readJsonBody } from "@/lib/http";
import {
  assertLeadAdmin,
  validateLeadObjectId,
  validateLeadStatusPatch,
} from "@/lib/lead-admin";
import {
  deleteLead,
  getLeadById,
  updateLeadStatus,
} from "@/lib/lead-admin-repository";

type LeadRouteContext = {
  params: Promise<{
    leadId: string;
  }>;
};

const noStoreHeaders = {
  "Cache-Control": "no-store",
};

export async function GET(request: Request, context: LeadRouteContext) {
  try {
    await assertLeadAdmin(request);

    const { leadId } = await context.params;
    const result = await getLeadById(validateLeadObjectId(leadId));

    return ok(result, { headers: noStoreHeaders });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(request: Request, context: LeadRouteContext) {
  try {
    await assertLeadAdmin(request);

    const { leadId } = await context.params;
    const body = await readJsonBody(request);
    const status = validateLeadStatusPatch(body);
    const result = await updateLeadStatus(validateLeadObjectId(leadId), status);

    return ok(result, { headers: noStoreHeaders });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(request: Request, context: LeadRouteContext) {
  try {
    await assertLeadAdmin(request);

    const { leadId } = await context.params;
    const result = await deleteLead(validateLeadObjectId(leadId));

    return ok(result, { headers: noStoreHeaders });
  } catch (error) {
    return handleApiError(error);
  }
}
