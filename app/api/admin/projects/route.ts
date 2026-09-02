import { revalidatePath } from "next/cache";

import { handleApiError, ok } from "@/lib/api-response";
import { readJsonBody } from "@/lib/http";
import { assertLeadAdmin } from "@/lib/lead-admin";
import { createProject, listProjects } from "@/lib/project-repository";
import { validateProjectInput } from "@/lib/project-validation";
import { assertSameOrigin } from "@/lib/security";
import { projectServices, type ProjectService } from "@/models/project";

const projectServiceSet = new Set<string>(projectServices);

function parseBooleanFilter(value: string | null) {
  if (value === "true") return true;
  if (value === "false") return false;
  return undefined;
}

function parseProjectListQuery(searchParams: URLSearchParams) {
  const search = searchParams.get("search")?.trim() || "";
  const service = searchParams.get("service")?.trim() || "";

  return {
    ...(search ? { search: search.slice(0, 120) } : {}),
    ...(projectServiceSet.has(service) ? { service: service as ProjectService } : {}),
    ...(parseBooleanFilter(searchParams.get("published")) !== undefined
      ? { published: parseBooleanFilter(searchParams.get("published")) }
      : {}),
    ...(parseBooleanFilter(searchParams.get("featured")) !== undefined
      ? { featured: parseBooleanFilter(searchParams.get("featured")) }
      : {}),
  };
}

export async function GET(request: Request) {
  try {
    await assertLeadAdmin(request);

    const query = parseProjectListQuery(new URL(request.url).searchParams);
    const result = await listProjects(query);

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
    await assertLeadAdmin(request);

    const body = await readJsonBody(request);
    const input = validateProjectInput(body, "create");
    const result = await createProject(input);

    revalidatePath("/projects");
    revalidatePath(`/projects/${result.project.slug}`);
    revalidatePath("/sitemap.xml");

    return ok(result, {
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    return handleApiError(error);
  }
}
