export type ApiErrorCode =
  | "VALIDATION_ERROR"
  | "UPLOAD_INVALID"
  | "UPLOAD_INCOMPLETE"
  | "UPLOAD_FAILED"
  | "DUPLICATE_SUBMISSION"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "CONFLICT"
  | "NOT_FOUND"
  | "SERVER_ERROR";

export type FieldErrors = Record<string, string>;

export type ApiErrorBody = {
  ok: false;
  code: ApiErrorCode;
  message: string;
  fieldErrors?: FieldErrors;
};

export type ApiSuccessBody<T extends object = object> = {
  ok: true;
} & T;

export class ApiProblem extends Error {
  readonly code: ApiErrorCode;
  readonly status: number;
  readonly fieldErrors?: FieldErrors;

  constructor(
    code: ApiErrorCode,
    message: string,
    status = 400,
    fieldErrors?: FieldErrors,
  ) {
    super(message);
    this.name = "ApiProblem";
    this.code = code;
    this.status = status;
    this.fieldErrors = fieldErrors;
  }
}

export function ok<T extends object>(
  body: T,
  init?: ResponseInit,
) {
  return Response.json({ ok: true, ...body } satisfies ApiSuccessBody<T>, {
    status: 200,
    ...init,
  });
}

export function emptyOk(init?: ResponseInit) {
  return Response.json({ ok: true } satisfies ApiSuccessBody, {
    status: 200,
    ...init,
  });
}

export function errorResponse(problem: ApiProblem) {
  const body: ApiErrorBody = {
    ok: false,
    code: problem.code,
    message: problem.message,
  };

  if (problem.fieldErrors && Object.keys(problem.fieldErrors).length > 0) {
    body.fieldErrors = problem.fieldErrors;
  }

  return Response.json(body, { status: problem.status });
}

export function validationError(
  fieldErrors: FieldErrors,
  message = "Please check the highlighted fields.",
) {
  return new ApiProblem("VALIDATION_ERROR", message, 400, fieldErrors);
}

export function handleApiError(error: unknown) {
  if (error instanceof ApiProblem) {
    return errorResponse(error);
  }

  console.error("Lead capture API error", error);

  return errorResponse(
    new ApiProblem(
      "SERVER_ERROR",
      "Something went wrong. Please try again.",
      500,
    ),
  );
}
