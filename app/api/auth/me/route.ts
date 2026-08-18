import { ObjectId } from "mongodb";

import { ApiProblem, handleApiError, ok } from "@/lib/api-response";
import { validateProfilePatchInput } from "@/lib/auth-validation";
import { readAuthSessionToken, verifyAuthSessionToken } from "@/lib/auth-session";
import { readJsonBody } from "@/lib/http";
import { assertSameOrigin } from "@/lib/security";
import { getAuthenticatedUser, updateOwnProfile } from "@/lib/user-repository";

export async function GET(request: Request) {
  try {
    const user = await getAuthenticatedUser(request);

    return ok(
      { user },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(request: Request) {
  try {
    assertSameOrigin(request);

    const session = verifyAuthSessionToken(readAuthSessionToken(request));

    if (!session) {
      throw new ApiProblem("UNAUTHORIZED", "Please log in.", 401);
    }

    const body = await readJsonBody(request);
    const patch = validateProfilePatchInput(body);
    const result = await updateOwnProfile(new ObjectId(session.userId), patch);

    return ok(result, {
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    return handleApiError(error);
  }
}
