import { handleApiError, ok } from "@/lib/api-response";
import { getAuthenticatedUser } from "@/lib/user-repository";

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
