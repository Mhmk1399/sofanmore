import { handleApiError, ok } from "@/lib/api-response";
import { readJsonBody } from "@/lib/http";
import { assertLeadAdmin } from "@/lib/lead-admin";
import { createProduct, listProducts } from "@/lib/product-repository";
import { validateProductInput } from "@/lib/product-validation";
import { assertSameOrigin } from "@/lib/security";

function parseProductListQuery(searchParams: URLSearchParams) {
  const search = searchParams.get("search")?.trim() || "";

  return {
    ...(search ? { search: search.slice(0, 120) } : {}),
  };
}

export async function GET(request: Request) {
  try {
    await assertLeadAdmin(request);

    const query = parseProductListQuery(new URL(request.url).searchParams);
    const result = await listProducts(query);

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
    const input = validateProductInput(body);
    const result = await createProduct(input);

    return ok(result, {
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    return handleApiError(error);
  }
}
