import { ApiProblem } from "@/lib/api-response";

export const MAX_JSON_BODY_BYTES = 64 * 1024;

export async function readJsonBody<T = unknown>(
  request: Request,
  maxBytes = MAX_JSON_BODY_BYTES,
): Promise<T> {
  const contentType = request.headers.get("content-type") || "";

  if (!contentType.toLowerCase().includes("application/json")) {
    throw new ApiProblem(
      "VALIDATION_ERROR",
      "Send JSON with the application/json content type.",
      415,
      { body: "Expected application/json." },
    );
  }

  const contentLength = Number(request.headers.get("content-length") || 0);

  if (Number.isFinite(contentLength) && contentLength > maxBytes) {
    throw new ApiProblem(
      "VALIDATION_ERROR",
      "The request is too large.",
      413,
      { body: "The request payload is too large." },
    );
  }

  if (!request.body) {
    throw new ApiProblem("VALIDATION_ERROR", "Missing request body.", 400, {
      body: "Request body is required.",
    });
  }

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let received = 0;

  while (true) {
    const { done, value } = await reader.read();

    if (done) break;
    if (!value) continue;

    received += value.byteLength;

    if (received > maxBytes) {
      throw new ApiProblem(
        "VALIDATION_ERROR",
        "The request is too large.",
        413,
        { body: "The request payload is too large." },
      );
    }

    chunks.push(value);
  }

  const body = new Uint8Array(received);
  let offset = 0;

  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }

  const text = new TextDecoder().decode(body);

  try {
    return JSON.parse(text) as T;
  } catch {
    throw new ApiProblem("VALIDATION_ERROR", "Invalid JSON payload.", 400, {
      body: "Request body must be valid JSON.",
    });
  }
}
