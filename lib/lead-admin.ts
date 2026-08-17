import { ObjectId } from "mongodb";

import { ApiProblem } from "@/lib/api-response";
import { getAuthenticatedUser } from "@/lib/user-repository";
import {
  LEAD_SERVICES,
  LEAD_STATUSES,
  type LeadService,
  type LeadStatus,
} from "@/models/lead";

export const DEFAULT_LEAD_ADMIN_PAGE_SIZE = 25;
export const MAX_LEAD_ADMIN_PAGE_SIZE = 100;

export type LeadListQuery = {
  page: number;
  limit: number;
  service?: LeadService;
  status?: LeadStatus;
  search?: string;
  dateFrom?: Date;
  dateTo?: Date;
};

export type LeadAnalyticsQuery = Pick<
  LeadListQuery,
  "service" | "status" | "search" | "dateFrom" | "dateTo"
>;

export async function assertLeadAdmin(request: Request) {
  const user = await getAuthenticatedUser(request);

  if (user?.role === "ADMIN") {
    return;
  }

  if (user) {
    throw new ApiProblem(
      "FORBIDDEN",
      "Admin access is required.",
      403,
    );
  }

  throw new ApiProblem(
    "UNAUTHORIZED",
    "Lead admin authentication is required.",
    401,
  );
}

function parsePositiveInt(value: string | null, fallback: number) {
  if (!value) return fallback;

  const parsed = Number(value);

  if (!Number.isInteger(parsed) || parsed < 1) {
    return fallback;
  }

  return parsed;
}

function parseIsoDateParam(
  value: string | null,
  field: "dateFrom" | "dateTo",
  endOfDay = false,
) {
  if (!value) return undefined;

  const trimmed = value.trim();

  if (!/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    throw new ApiProblem("VALIDATION_ERROR", "Use a valid date.", 400, {
      [field]: "Use YYYY-MM-DD.",
    });
  }

  const parsed = new Date(`${trimmed}T00:00:00.000Z`);

  if (
    Number.isNaN(parsed.getTime()) ||
    parsed.toISOString().slice(0, 10) !== trimmed
  ) {
    throw new ApiProblem("VALIDATION_ERROR", "Use a valid date.", 400, {
      [field]: "Use a valid date.",
    });
  }

  if (endOfDay) {
    parsed.setUTCHours(23, 59, 59, 999);
  }

  return parsed;
}

function parseLeadFilters(searchParams: URLSearchParams) {
  const service = searchParams.get("service")?.trim();
  const status = searchParams.get("status")?.trim();
  const search =
    searchParams.get("q")?.trim() || searchParams.get("search")?.trim();
  const dateFrom = parseIsoDateParam(
    searchParams.get("dateFrom") || searchParams.get("from"),
    "dateFrom",
  );
  const dateTo = parseIsoDateParam(
    searchParams.get("dateTo") || searchParams.get("to"),
    "dateTo",
    true,
  );

  if (service && !(LEAD_SERVICES as readonly string[]).includes(service)) {
    throw new ApiProblem("VALIDATION_ERROR", "Choose a valid service.", 400, {
      service: "Choose a valid service.",
    });
  }

  if (status && !(LEAD_STATUSES as readonly string[]).includes(status)) {
    throw new ApiProblem("VALIDATION_ERROR", "Choose a valid status.", 400, {
      status: "Choose a valid status.",
    });
  }

  if (dateFrom && dateTo && dateFrom > dateTo) {
    throw new ApiProblem("VALIDATION_ERROR", "Use a valid date range.", 400, {
      dateFrom: "Start date must be before end date.",
    });
  }

  return {
    ...(service ? { service: service as LeadService } : {}),
    ...(status ? { status: status as LeadStatus } : {}),
    ...(search ? { search: search.slice(0, 120) } : {}),
    ...(dateFrom ? { dateFrom } : {}),
    ...(dateTo ? { dateTo } : {}),
  };
}

export function parseLeadListQuery(searchParams: URLSearchParams): LeadListQuery {
  const page = parsePositiveInt(searchParams.get("page"), 1);
  const requestedLimit = parsePositiveInt(
    searchParams.get("limit"),
    DEFAULT_LEAD_ADMIN_PAGE_SIZE,
  );
  const limit = Math.min(requestedLimit, MAX_LEAD_ADMIN_PAGE_SIZE);

  return {
    page,
    limit,
    ...parseLeadFilters(searchParams),
  };
}

export function parseLeadAnalyticsQuery(
  searchParams: URLSearchParams,
): LeadAnalyticsQuery {
  return parseLeadFilters(searchParams);
}

export function validateLeadObjectId(value: string) {
  if (!ObjectId.isValid(value)) {
    throw new ApiProblem("VALIDATION_ERROR", "Use a valid lead id.", 400, {
      leadId: "Use a valid lead id.",
    });
  }

  return new ObjectId(value);
}

export function validateLeadStatusPatch(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new ApiProblem("VALIDATION_ERROR", "Use a valid JSON object.", 400, {
      body: "Use a valid JSON object.",
    });
  }

  const status = (value as Record<string, unknown>).status;

  if (
    typeof status !== "string" ||
    !(LEAD_STATUSES as readonly string[]).includes(status)
  ) {
    throw new ApiProblem("VALIDATION_ERROR", "Choose a valid status.", 400, {
      status: "Choose a valid status.",
    });
  }

  return status as LeadStatus;
}
