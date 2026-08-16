import FAQSection from "../FAQSection";
import BespokeSofasServiceSection from "./BespokeSofasServiceSection";
import CommercialSofasServiceSection from "./CommercialSofasServiceSection";
import ConnectedServicesSection from "./ConnectedServicesSection";
import DesignedAroundUseSection from "./DesignedAroundUseSection";
import HowYourProjectBeginsSection from "./HowYourProjectBeginsSection";
import InteriorDesignServiceSection from "./InteriorDesignServiceSection";
import NorthWestLondonServiceAreaSection from "./NorthWestLondonServiceAreaSection";
import ServicesHero from "./ServicesHero";
import SofaRepairServiceSection from "./SofaRepairServiceSection";
import WhichServiceIsRightSection from "./WhichServiceIsRightSection";

export type ServicesFaqItem = {
  id: number;
  question: string;
  answer: string;
};

export const servicesFaqs = [
  {
    id: 1,
    question: "What sofa services do you provide in North West London?",
    answer:
      "Sofa N More provides four core services: bespoke sofas and made-to-measure seating, commercial sofas and contract seating, residential and commercial interior design, and sofa repair and restoration. Each service has a dedicated page explaining the relevant project types, process and next steps.",
  },

  {
    id: 2,
    question: "Do you provide sofa repair in Cricklewood?",
    answer:
      "Yes. Sofa repair and restoration enquiries can be submitted from Cricklewood and surrounding North West London areas. Send photographs of the complete sofa, close-ups of the affected areas and your postcode so the project can be assessed.",
  },

  {
    id: 3,
    question: "Which areas around Cricklewood do you cover?",
    answer:
      "We welcome suitable project enquiries from Cricklewood, Staples Corner, Brent Cross, Neasden, Dollis Hill, Hendon, Golders Green and other nearby North West London areas. Collection, delivery, measuring and installation arrangements depend on the project and postcode.",
  },

  {
    id: 4,
    question: "Do you make bespoke sofas near Cricklewood?",
    answer:
      "Yes. Our bespoke sofa service is available for suitable residential projects in Cricklewood and across North West London. Dimensions, configuration, comfort, upholstery and visible details can be developed around the room and agreed specification.",
  },

  {
    id: 5,
    question:
      "Do you make commercial sofas for restaurants, cafés and offices?",
    answer:
      "Yes. Commercial projects can include bespoke sofas, banquettes, booths and upholstered seating for restaurants, cafés, hotels, offices, reception areas and hospitality spaces.",
  },

  {
    id: 6,
    question: "Do you provide interior design in North West London?",
    answer:
      "Yes. Interior design is available for suitable residential and commercial projects where layout, colour, materials, atmosphere and bespoke seating need to work together.",
  },

  {
    id: 7,
    question: "Can I send photographs, measurements or a floor plan?",
    answer:
      "Yes. Photographs, approximate measurements, sketches, floor plans and inspiration images can all make the first conversation more useful. You do not need a completed design before contacting us.",
  },

  {
    id: 8,
    question: "Can I visit the Sofa N More workshop?",
    answer:
      "Please contact the team before travelling to confirm whether a workshop visit or consultation is appropriate and available for your project.",
  },

  {
    id: 9,
    question: "How much does a bespoke sofa or sofa service cost?",
    answer:
      "Pricing depends on the selected service and project scope. Dimensions, configuration, materials, quantity, complexity, the condition of an existing sofa, access, delivery and installation requirements may all affect the quotation.",
  },

  {
    id: 10,
    question: "How long does a project take?",
    answer:
      "Timescales vary according to the service, project complexity, design approval, material availability, workshop capacity and delivery requirements. A relevant proposed schedule can be discussed after the project scope has been understood.",
  },

  {
    id: 11,
    question: "Do you provide delivery and installation?",
    answer:
      "Delivery and installation requirements can be discussed as part of the individual project and included in the agreed scope where applicable. The postcode, access conditions and any associated costs should be confirmed in the quotation.",
  },

  {
    id: 12,
    question: "Where is Sofa N More based?",
    answer:
      "Sofa N More is based at Unit G19, Atlas Business Centre, Oxgate Lane, Staples Corner West, London NW2 7HJ, close to Cricklewood and Brent Cross. Please contact the team before travelling.",
  },
] satisfies ServicesFaqItem[];

export default function ServicesPageContent() {
  return (
    <main id="webpage" className="overflow-hidden bg-[var(--brand-ivory)]">
      <ServicesHero />
      <ConnectedServicesSection id="services" />
      <BespokeSofasServiceSection />
      <CommercialSofasServiceSection />
      <InteriorDesignServiceSection />
      <SofaRepairServiceSection />
      <NorthWestLondonServiceAreaSection id="north-west-london-services" />
      <WhichServiceIsRightSection />
      <DesignedAroundUseSection />
      <HowYourProjectBeginsSection />
      <FAQSection id="faq" items={servicesFaqs} />
    </main>
  );
}
