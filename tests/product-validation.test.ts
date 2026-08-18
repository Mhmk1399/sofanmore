import { describe, expect, it } from "vitest";

import { ApiProblem } from "@/lib/api-response";
import {
  validateProductInput,
  validateProductImageUpload,
  validateProductObjectId,
} from "@/lib/product-validation";

function expectValidationProblem(callback: () => unknown) {
  try {
    callback();
  } catch (error) {
    expect(error).toBeInstanceOf(ApiProblem);
    return error as ApiProblem;
  }

  throw new Error("Expected validation to fail.");
}

describe("product validation", () => {
  it("accepts local and absolute image URLs", () => {
    expect(
      validateProductInput({
        productCode: 1001,
        name: "Curved Velvet Sofa",
        imageUrl: "/assets/images/1.webp",
        description: "A compact curved velvet sofa for refined interiors.",
      }),
    ).toMatchObject({
      productCode: 1001,
      name: "Curved Velvet Sofa",
      imageUrl: "/assets/images/1.webp",
    });

    expect(
      validateProductInput({
        productCode: "1002",
        name: "Commercial Banquette",
        imageUrl: "https://example.com/products/banquette.webp",
        description: "A made-to-measure commercial banquette seating product.",
      }).imageUrl,
    ).toBe("https://example.com/products/banquette.webp");
  });

  it("rejects missing and invalid product details", () => {
    const problem = expectValidationProblem(() =>
      validateProductInput({
        productCode: 999,
        name: "A",
        imageUrl: "javascript:alert(1)",
        description: "Short",
      }),
    );

    expect(problem.fieldErrors).toMatchObject({
      productCode: "Product code must be 1000 or higher.",
      name: "Use at least 2 characters.",
      imageUrl: "Use a valid image URL.",
      description: "Use at least 10 characters.",
    });
  });

  it("requires a whole product code", () => {
    const missing = expectValidationProblem(() =>
      validateProductInput({
        name: "Commercial Banquette",
        imageUrl: "/assets/images/banquette.webp",
        description: "A made-to-measure commercial banquette seating product.",
      }),
    );

    expect(missing.fieldErrors).toMatchObject({
      productCode: "Enter a product code.",
    });

    const decimal = expectValidationProblem(() =>
      validateProductInput({
        productCode: 1200.5,
        name: "Commercial Banquette",
        imageUrl: "/assets/images/banquette.webp",
        description: "A made-to-measure commercial banquette seating product.",
      }),
    );

    expect(decimal.fieldErrors).toMatchObject({
      productCode: "Use a whole product code.",
    });
  });

  it("validates uploaded product images", () => {
    expect(
      validateProductImageUpload({
        fileName: "sofa-product.webp",
        mimeType: "image/webp",
        sizeBytes: 1024,
      }),
    ).toMatchObject({
      safeName: "sofa-product.webp",
      mimeType: "image/webp",
    });

    const problem = expectValidationProblem(() =>
      validateProductImageUpload({
        fileName: "sofa-product.pdf",
        mimeType: "application/pdf",
        sizeBytes: 11 * 1024 * 1024,
      }),
    );

    expect(problem.fieldErrors?.file).toBeTruthy();
  });

  it("validates product object ids", () => {
    expect(validateProductObjectId("64a7f2b0831a22d7644d132a")).toBe(
      "64a7f2b0831a22d7644d132a",
    );

    const problem = expectValidationProblem(() =>
      validateProductObjectId("not-a-product-id"),
    );

    expect(problem.fieldErrors).toMatchObject({
      productId: "Use a valid product id.",
    });
  });
});
