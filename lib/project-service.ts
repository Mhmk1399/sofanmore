import type { ProjectService } from "@/models/project";

export const projectServiceLabels: Record<ProjectService, string> = {
  BESPOKE_SOFA: "Bespoke sofa",
  COMMERCIAL_SOFA: "Commercial sofa",
  INTERIOR_DESIGN: "Interior design",
  SOFA_REPAIR_RESTORATION: "Repair and restoration",
};

export const projectServiceRoutes: Record<ProjectService, string> = {
  BESPOKE_SOFA: "/services/bespoke-sofas",
  COMMERCIAL_SOFA: "/services/commercial-sofas",
  INTERIOR_DESIGN: "/services/interior-design",
  SOFA_REPAIR_RESTORATION: "/services/sofa-repair-restoration",
};
