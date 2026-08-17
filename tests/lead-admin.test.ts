import { describe, expect, it } from "vitest";

import { ApiProblem } from "@/lib/api-response";
import {
  assertLeadAdmin,
  MAX_LEAD_ADMIN_PAGE_SIZE,
  parseLeadAnalyticsQuery,
  parseLeadListQuery,
  validateLeadObjectId,
  validateLeadStatusPatch,
} from "@/lib/lead-admin";

function expectValidationProblem(callback: () => unknown) {
  try {
    callback();
  } catch (error) {
    expect(error).toBeInstanceOf(ApiProblem);
    return error as ApiProblem;
  }

  throw new Error("Expected validation to fail.");
}

async function expectAsyncValidationProblem(callback: () => Promise<unknown>) {
  try {
    await callback();
  } catch (error) {
    expect(error).toBeInstanceOf(ApiProblem);
    return error as ApiProblem;
  }

  throw new Error("Expected validation to fail.");
}

describe("lead admin query validation", () => {
  it("parses list filters with safe pagination", () => {
    const query = parseLeadListQuery(
      new URLSearchParams({
        page: "2",
        limit: "500",
        service: "CONTACT_ENQUIRY",
        status: "CONTACTED",
        q: "NW2",
        dateFrom: "2026-08-01",
        dateTo: "2026-08-17",
      }),
    );

    expect(query).toEqual({
      page: 2,
      limit: MAX_LEAD_ADMIN_PAGE_SIZE,
      service: "CONTACT_ENQUIRY",
      status: "CONTACTED",
      search: "NW2",
      dateFrom: new Date("2026-08-01T00:00:00.000Z"),
      dateTo: new Date("2026-08-17T23:59:59.999Z"),
    });
  });

  it("parses analytics date filters", () => {
    const query = parseLeadAnalyticsQuery(
      new URLSearchParams({
        from: "2026-08-01",
        to: "2026-08-17",
        search: "Ava",
      }),
    );

    expect(query.search).toBe("Ava");
    expect(query.dateFrom?.toISOString()).toBe("2026-08-01T00:00:00.000Z");
    expect(query.dateTo?.toISOString()).toBe("2026-08-17T23:59:59.999Z");
  });

  it("rejects invalid list filters and status patches", () => {
    const invalidService = expectValidationProblem(() =>
      parseLeadListQuery(new URLSearchParams({ service: "BAD_SERVICE" })),
    );
    const invalidPatch = expectValidationProblem(() =>
      validateLeadStatusPatch({ status: "ARCHIVED" }),
    );

    expect(invalidService.fieldErrors).toMatchObject({
      service: "Choose a valid service.",
    });
    expect(invalidPatch.fieldErrors).toMatchObject({
      status: "Choose a valid status.",
    });
  });

  it("rejects invalid date ranges", () => {
    const problem = expectValidationProblem(() =>
      parseLeadListQuery(
        new URLSearchParams({
          dateFrom: "2026-08-17",
          dateTo: "2026-08-01",
        }),
      ),
    );

    expect(problem.fieldErrors).toMatchObject({
      dateFrom: "Start date must be before end date.",
    });
  });

  it("validates lead ids", () => {
    expect(validateLeadObjectId("64a7f2b0831a22d7644d132a").toHexString()).toBe(
      "64a7f2b0831a22d7644d132a",
    );

    const problem = expectValidationProblem(() => validateLeadObjectId("nope"));

    expect(problem.fieldErrors).toMatchObject({
      leadId: "Use a valid lead id.",
    });
  });
});

describe("lead admin auth", () => {
  it("rejects unauthenticated admin requests", async () => {
    const problem = await expectAsyncValidationProblem(() =>
      assertLeadAdmin(new Request("http://localhost/api/leads")),
    );

    expect(problem.code).toBe("UNAUTHORIZED");
  });
});
