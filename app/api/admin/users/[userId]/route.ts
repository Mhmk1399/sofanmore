import { ObjectId } from "mongodb";

import { ApiProblem, handleApiError, ok } from "@/lib/api-response";
import { validateUserPatchInput } from "@/lib/auth-validation";
import { readJsonBody } from "@/lib/http";
import { assertLeadAdmin } from "@/lib/lead-admin";
import { assertSameOrigin } from "@/lib/security";
import { deleteUser, updateUser } from "@/lib/user-repository";

type UserRouteContext = {
  params: Promise<{
    userId: string;
  }>;
};

const noStoreHeaders = {
  "Cache-Control": "no-store",
};

function validateUserObjectId(value: string) {
  if (!ObjectId.isValid(value)) {
    throw new ApiProblem("VALIDATION_ERROR", "Use a valid user id.", 400, {
      userId: "Use a valid user id.",
    });
  }

  return new ObjectId(value);
}

export async function PATCH(request: Request, context: UserRouteContext) {
  try {
    assertSameOrigin(request);
    await assertLeadAdmin(request);

    const { userId } = await context.params;
    const body = await readJsonBody(request);
    const patch = validateUserPatchInput(body);
    const result = await updateUser(validateUserObjectId(userId), patch);

    return ok(result, { headers: noStoreHeaders });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(request: Request, context: UserRouteContext) {
  try {
    assertSameOrigin(request);
    await assertLeadAdmin(request);

    const { userId } = await context.params;
    const result = await deleteUser(validateUserObjectId(userId));

    return ok(result, { headers: noStoreHeaders });
  } catch (error) {
    return handleApiError(error);
  }
}
