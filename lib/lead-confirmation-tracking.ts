import {
  leadServiceDefinitions,
  type ServiceFieldDefinition,
} from "@/lib/lead-config";
import type { LeadService } from "@/models/lead";

const confirmationForms = {
  sofa_repair_restoration: {
    formId: "sofa_repair_form",
    service: "SOFA_REPAIR_RESTORATION",
  },
  bespoke_sofa: { formId: "bespoke_sofa_form", service: "BESPOKE_SOFA" },
  commercial_sofa: {
    formId: "commercial_sofa_form",
    service: "COMMERCIAL_SOFA",
  },
  interior_design: {
    formId: "interior_design_form",
    service: "INTERIOR_DESIGN",
  },
  contact_enquiry: { formId: "contact_form", service: "CONTACT_ENQUIRY" },
} as const satisfies Record<string, { formId: string; service: LeadService }>;

export type LeadTrackingService = keyof typeof confirmationForms;

export type LeadConfirmationSnapshot = {
  serviceData: Readonly<Record<string, unknown>>;
  photoCount: number;
};

export function buildLeadConfirmationEvent(
  service: LeadTrackingService,
  snapshot: LeadConfirmationSnapshot,
  pageHref: string,
) {
  const form = confirmationForms[service];
  const fields: readonly ServiceFieldDefinition[] =
    leadServiceDefinitions[form.service].fields;
  const option = (key: string) => {
    const definition = fields.find((field) => field.key === key);
    const allowed =
      definition && "allowedValues" in definition
        ? definition.allowedValues
        : [];
    const value = snapshot.serviceData[key];
    return typeof value === "string" && allowed?.includes(value) ? value : "";
  };
  const page = new URL(pageHref);
  // Query strings and fragments can contain personal details. Never copy them to analytics.
  const pageLocation = page.origin + page.pathname;
  const virtualPath =
    page.pathname + "?lead_confirmation=" + service + "&lead_status=success";

  return {
    event: "lead_confirmation_view",
    lead_service: service,
    form_id: form.formId,
    lead_status: "success",
    page_path: page.pathname,
    page_location: pageLocation,
    virtual_page_path: virtualPath,
    virtual_page_title: "Lead confirmation - " + service,
    // Empty values prevent GTM retaining another form's dimensions.
    sofa_type:
      service === "sofa_repair_restoration"
        ? option("itemType")
        : service === "bespoke_sofa"
          ? option("projectType")
          : "",
    repair_type:
      service === "sofa_repair_restoration" ? option("projectScope") : "",
    material_preference: option("upholsteryPreference"),
    collection_required:
      (
        {
          "need-collection": "yes",
          "can-drop-off": "no",
          "not-sure": "not-sure",
        } as Record<string, string>
      )[option("transportPreference")] || "",
    has_photos: snapshot.photoCount > 0 ? "yes" : "no",
    project_type: option("projectType"),
    venue_type: option("venueType"),
    project_stage: option("projectStage"),
    preferred_contact_method: option("preferredContactMethod"),
    enquiry_type: option("enquiryType"),
  };
}
