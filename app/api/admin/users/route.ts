import { ApiProblem, handleApiError, ok } from "@/lib/api-response";
import { assertLeadAdmin } from "@/lib/lead-admin";
import { listUsers } from "@/lib/user-repository";
import { USER_ROLES, type UserRole } from "@/models/user";

function parseUserListQuery(searchParams: URLSearchParams) {
  const search = searchParams.get("search")?.trim() || "";
  const role = searchParams.get("role")?.trim() || "";

  if (role && !(USER_ROLES as readonly string[]).includes(role)) {
    throw new ApiProblem("VALIDATION_ERROR", "Choose a valid role.", 400, {
      role: "Choose a valid role.",
    });
  }

  return {
    ...(search ? { search: search.slice(0, 120) } : {}),
    ...(role ? { role: role as UserRole } : {}),
  };
}

export async function GET(request: Request) {
  try {
    await assertLeadAdmin(request);

    const query = parseUserListQuery(new URL(request.url).searchParams);
    const result = await listUsers(query);

    return ok(result, {
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    return handleApiError(error);
  }
}
