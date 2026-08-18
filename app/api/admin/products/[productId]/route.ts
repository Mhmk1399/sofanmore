import { ObjectId } from "mongodb";

import { handleApiError, ok } from "@/lib/api-response";
import { readJsonBody } from "@/lib/http";
import { assertLeadAdmin } from "@/lib/lead-admin";
import {
  deleteProduct,
  getProductById,
  updateProduct,
} from "@/lib/product-repository";
import {
  validateProductInput,
  validateProductObjectId,
} from "@/lib/product-validation";
import { assertSameOrigin } from "@/lib/security";

type ProductRouteContext = {
  params: Promise<{
    productId: string;
  }>;
};

const noStoreHeaders = {
  "Cache-Control": "no-store",
};

function toProductObjectId(value: string) {
  return new ObjectId(validateProductObjectId(value));
}

export async function GET(request: Request, context: ProductRouteContext) {
  try {
    await assertLeadAdmin(request);

    const { productId } = await context.params;
    const result = await getProductById(toProductObjectId(productId));

    return ok(result, { headers: noStoreHeaders });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(request: Request, context: ProductRouteContext) {
  try {
    assertSameOrigin(request);
    await assertLeadAdmin(request);

    const { productId } = await context.params;
    const body = await readJsonBody(request);
    const input = validateProductInput(body);
    const result = await updateProduct(toProductObjectId(productId), input);

    return ok(result, { headers: noStoreHeaders });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(request: Request, context: ProductRouteContext) {
  try {
    assertSameOrigin(request);
    await assertLeadAdmin(request);

    const { productId } = await context.params;
    const result = await deleteProduct(toProductObjectId(productId));

    return ok(result, { headers: noStoreHeaders });
  } catch (error) {
    return handleApiError(error);
  }
}
