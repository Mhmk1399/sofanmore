import { ApiProblem } from "@/lib/api-response";

export function galleryPageValue(value: string | null, fallback: number, maximum: number, label: string) {
  if (value === null) return fallback;
  if (!/^\d+$/.test(value)) throw new ApiProblem("VALIDATION_ERROR", `${label} must be a whole number.`, 400);
  const number = Number(value);
  if (number < 1 || number > maximum) throw new ApiProblem("VALIDATION_ERROR", `${label} must be between 1 and ${maximum}.`, 400);
  return number;
}
