import {
  MongoServerError,
  ObjectId,
  type Collection,
  type Filter,
} from "mongodb";

import { ApiProblem } from "@/lib/api-response";
import { ensureProductIndexes, getProductCollections } from "@/lib/mongodb";
import type { ValidatedProductInput } from "@/lib/product-validation";
import { deleteUploadedObject } from "@/lib/upload-storage";
import type { ProductDocument } from "@/models/product";

export type SerializedProduct = {
  id: string;
  productCode: number;
  name: string;
  imageUrl: string;
  imageStorageKey?: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export type ProductListQuery = {
  search?: string;
};

function serializeProduct(product: ProductDocument): SerializedProduct {
  return {
    id: product._id?.toHexString() || "",
    productCode: product.productCode,
    name: product.name,
    imageUrl: product.imageUrl,
    ...(product.imageStorageKey
      ? { imageStorageKey: product.imageStorageKey }
      : {}),
    description: product.description,
    createdAt: product.createdAt.toISOString(),
    updatedAt: product.updatedAt.toISOString(),
  };
}

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function buildProductFilter(query: ProductListQuery) {
  const filter: Filter<ProductDocument> = {};

  if (query.search) {
    const normalizedSearch = query.search.trim();
    const regex = new RegExp(escapeRegex(normalizedSearch), "i");
    const numericSearch = Number(normalizedSearch);

    filter.$or = [{ name: regex }, { description: regex }, { imageUrl: regex }];

    if (Number.isInteger(numericSearch)) {
      filter.$or.push({ productCode: numericSearch });
    }
  }

  return filter;
}

async function findLatestProductCode(products: Collection<ProductDocument>) {
  const latest = await products
    .find({ productCode: { $gte: 1000 } })
    .sort({ productCode: -1 })
    .limit(1)
    .next();

  return latest?.productCode ?? null;
}

function throwProductCodeConflict(error: unknown): never {
  if (error instanceof MongoServerError && error.code === 11000) {
    throw new ApiProblem(
      "CONFLICT",
      "This product code is already used.",
      409,
      {
        productCode: "This product code is already used.",
      },
    );
  }

  throw error;
}

export async function listProducts(query: ProductListQuery = {}) {
  await ensureProductIndexes();

  const { products } = await getProductCollections();
  const filter = buildProductFilter(query);
  const [total, documents, latestCode] = await Promise.all([
    products.countDocuments(filter),
    products.find(filter).sort({ createdAt: -1 }).limit(200).toArray(),
    findLatestProductCode(products),
  ]);

  return {
    products: documents.map(serializeProduct),
    total,
    latestCode,
  };
}

export async function createProduct(input: ValidatedProductInput) {
  await ensureProductIndexes();

  const { products } = await getProductCollections();
  const now = new Date();
  const document: ProductDocument = {
    productCode: input.productCode,
    name: input.name,
    imageUrl: input.imageUrl,
    ...(input.imageStorageKey
      ? { imageStorageKey: input.imageStorageKey }
      : {}),
    description: input.description,
    createdAt: now,
    updatedAt: now,
  };
  let result;

  try {
    result = await products.insertOne(document);
  } catch (error) {
    throwProductCodeConflict(error);
  }

  return {
    product: serializeProduct({ ...document, _id: result.insertedId }),
  };
}

export async function getProductById(productId: ObjectId) {
  await ensureProductIndexes();

  const { products } = await getProductCollections();
  const product = await products.findOne({ _id: productId });

  if (!product) {
    throw new ApiProblem("NOT_FOUND", "Product was not found.", 404);
  }

  return {
    product: serializeProduct(product),
  };
}

export async function updateProduct(
  productId: ObjectId,
  input: ValidatedProductInput,
) {
  await ensureProductIndexes();

  const { products } = await getProductCollections();
  const existing = await products.findOne({ _id: productId });

  if (!existing) {
    throw new ApiProblem("NOT_FOUND", "Product was not found.", 404);
  }

  const result = await products.findOneAndUpdate(
    { _id: productId },
    {
      $set: {
        productCode: input.productCode,
        name: input.name,
        imageUrl: input.imageUrl,
        ...(input.imageStorageKey
          ? { imageStorageKey: input.imageStorageKey }
          : {}),
        description: input.description,
        updatedAt: new Date(),
      },
      ...(!input.imageStorageKey ? { $unset: { imageStorageKey: "" } } : {}),
    },
    { returnDocument: "after" },
  ).catch(throwProductCodeConflict);

  if (!result) {
    throw new ApiProblem("NOT_FOUND", "Product was not found.", 404);
  }

  if (
    existing.imageStorageKey &&
    existing.imageStorageKey !== input.imageStorageKey
  ) {
    await deleteUploadedObject(existing.imageStorageKey).catch((error) => {
      console.warn("Could not delete replaced product image", {
        storageKey: existing.imageStorageKey,
        error,
      });
    });
  }

  return {
    product: serializeProduct(result),
  };
}

export async function deleteProduct(productId: ObjectId) {
  await ensureProductIndexes();

  const { products } = await getProductCollections();
  const product = await products.findOne({ _id: productId });

  if (!product) {
    throw new ApiProblem("NOT_FOUND", "Product was not found.", 404);
  }

  const result = await products.deleteOne({ _id: productId });

  if (result.deletedCount !== 1) {
    throw new ApiProblem("NOT_FOUND", "Product was not found.", 404);
  }

  if (product.imageStorageKey) {
    await deleteUploadedObject(product.imageStorageKey).catch((error) => {
      console.warn("Could not delete product image object", {
        storageKey: product.imageStorageKey,
        error,
      });
    });
  }

  return {
    deletedProductId: productId.toHexString(),
  };
}
