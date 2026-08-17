import { emptyOk, handleApiError } from "@/lib/api-response";
import { clearAuthSessionCookie } from "@/lib/auth-session";
import { assertSameOrigin } from "@/lib/security";

export async function POST(request: Request) {
  try {
    assertSameOrigin(request);

    return emptyOk({
      headers: {
        "Set-Cookie": clearAuthSessionCookie(),
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    return handleApiError(error);
  }
}
