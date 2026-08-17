import type { LeadService } from "@/models/lead";

export type LeadEventName =
  | "UPLOAD_SIGNED"
  | "UPLOAD_COMPLETED"
  | "LEAD_SUBMITTED";

export type LeadAnalyticsEvent = {
  eventName: LeadEventName;
  service: LeadService;
  sourcePage?: string;
  fileCount?: number;
};

export function trackLeadEvent(event: LeadAnalyticsEvent) {
  if (process.env.NODE_ENV !== "production") {
    console.info("Lead analytics event", event);
  }
}
