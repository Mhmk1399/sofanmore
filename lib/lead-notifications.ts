import type { LeadDocument } from "@/models/lead";

export type LeadNotifier = {
  notifyNewLead(lead: LeadDocument): Promise<void>;
};

class DevelopmentLeadNotifier implements LeadNotifier {
  async notifyNewLead(lead: LeadDocument) {
    if (process.env.NODE_ENV !== "production") {
      console.info("New lead notification skipped in development", {
        leadId: lead._id?.toHexString(),
        service: lead.service,
        sourcePage: lead.sourcePage,
        attachmentCount: lead.attachmentCount,
      });
    }
  }
}

export function getLeadNotifier(): LeadNotifier {
  return new DevelopmentLeadNotifier();
}

export async function notifyNewLead(lead: LeadDocument) {
  await getLeadNotifier().notifyNewLead(lead);
}
