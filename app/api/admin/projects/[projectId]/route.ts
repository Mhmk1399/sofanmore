import { ObjectId } from "mongodb";

import { handleApiError, ok } from "@/lib/api-response";
import { readJsonBody } from "@/lib/http";
import { assertLeadAdmin } from "@/lib/lead-admin";
import {
  deleteProject,
  getProjectById,
  updateProject,
} from "@/lib/project-repository";
import {
  validateProjectInput,
  validateProjectObjectId,
} from "@/lib/project-validation";
import { assertSameOrigin } from "@/lib/security";

type ProjectRouteContext = {
  params: Promise<{
    projectId: string;
  }>;
};

const noStoreHeaders = {
  "Cache-Control": "no-store",
};

function toProjectObjectId(value: string) {
  return new ObjectId(validateProjectObjectId(value));
}

export async function GET(request: Request, context: ProjectRouteContext) {
  try {
    await assertLeadAdmin(request);

    const { projectId } = await context.params;
    const result = await getProjectById(toProjectObjectId(projectId));

    return ok(result, { headers: noStoreHeaders });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(request: Request, context: ProjectRouteContext) {
  try {
    assertSameOrigin(request);
    await assertLeadAdmin(request);

    const { projectId } = await context.params;
    const body = await readJsonBody(request);
    const input = validateProjectInput(body, "update");
    const result = await updateProject(toProjectObjectId(projectId), input);

    return ok(result, { headers: noStoreHeaders });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(request: Request, context: ProjectRouteContext) {
  try {
    assertSameOrigin(request);
    await assertLeadAdmin(request);

    const { projectId } = await context.params;
    const result = await deleteProject(toProjectObjectId(projectId));

    return ok(result, { headers: noStoreHeaders });
  } catch (error) {
    return handleApiError(error);
  }
}
