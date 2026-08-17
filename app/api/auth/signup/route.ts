import { handleApiError, ok } from "@/lib/api-response";
import { createAuthSessionCookie } from "@/lib/auth-session";
import { validateSignupInput } from "@/lib/auth-validation";
import { readJsonBody } from "@/lib/http";
import { assertSameOrigin } from "@/lib/security";
import { createUserAccount } from "@/lib/user-repository";

export async function POST(request: Request) {
  try {
    assertSameOrigin(request);

    const body = await readJsonBody(request);
    const input = validateSignupInput(body);
    const user = await createUserAccount(input);

    return ok(
      { user },
      {
        headers: {
          "Set-Cookie": createAuthSessionCookie(user.id),
          "Cache-Control": "no-store",
        },
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}
