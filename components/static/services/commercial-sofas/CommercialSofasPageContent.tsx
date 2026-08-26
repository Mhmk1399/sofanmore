import CommercialSofaLeadForm from "@/components/lead-capture/CommercialSofaLeadForm";
import ServiceStickyCta from "@/components/static/services/ServiceStickyCta";

import FAQSection from "../../FAQSection";
import CommercialProjectsGallerySection from "./CommercialProjectsGallerySection";
import CommercialSofaProcessSection from "./CommercialSofaProcessSection";
import CommercialSofasFinalCTASection from "./CommercialSofasFinalCTASection";
import CommercialSofasHero from "./CommercialSofasHero";
import CommercialSofasMadeInLondonSection from "./CommercialSofasMadeInLondonSection";
import CommercialSofaSolutionsSection from "./CommercialSofaSolutionsSection";
import CommercialSofasRealBusinessSpacesSection from "./CommercialSofasRealBusinessSpacesSection";
import HotelHospitalityCommercialSofasSection from "./HotelHospitalityCommercialSofasSection";
import OfficeWorkspaceCommercialSofasSection from "./OfficeWorkspaceCommercialSofasSection";
import RestaurantCafeCommercialSofasSection from "./RestaurantCafeCommercialSofasSection";
import WhyChooseCommercialSofasSection from "./WhyChooseCommercialSofasSection";

export type CommercialSofasFaqItem = {
  id: number;
  question: string;
  answer: string;
};

export const commercialSofasFaqs = [
  {
    id: 1,
    question: "What is a commercial sofa?",
    answer:
      "A commercial sofa is designed for use within a business or hospitality environment such as a restaurant, café, hotel, office, reception area or shared space. A bespoke commercial sofa can be developed around the specific dimensions, layout, visual direction and use requirements of the project.",
  },

  {
    id: 2,
    question: "Do you make bespoke commercial sofas in London?",
    answer:
      "Yes. Sofa N More creates bespoke sofas in London and can develop commercial seating around the individual requirements of a business space.",
  },

  {
    id: 3,
    question: "Can you make restaurant sofas to specific dimensions?",
    answer:
      "Yes. Made-to-measure dimensions are particularly useful for restaurants and cafés where seating may need to work with a precise wall run, corner, booth layout or floor plan.",
  },

  {
    id: 4,
    question: "Do you create restaurant banquette seating?",
    answer:
      "Commercial seating projects can include bespoke banquettes, booths and fixed upholstered seating developed around the available space and design brief.",
  },

  {
    id: 5,
    question: "What is the difference between a sofa and banquette seating?",
    answer:
      "A conventional sofa is generally a freestanding seating piece. Banquette seating is typically designed around a specific area of the room and may be fixed against a wall, positioned within a booth or built around the architecture of the space.",
  },

  {
    id: 6,
    question: "Can I choose the upholstery and colour?",
    answer:
      "Yes. Upholstery, colour, texture and finishing details can form part of the bespoke design process so the seating can work with the wider interior direction.",
  },

  {
    id: 7,
    question: "Do you make bespoke sofas for hotels?",
    answer:
      "Yes. Bespoke sofas can be developed for hotel lobbies, lounges, reception areas, bars and other hospitality spaces.",
  },

  {
    id: 8,
    question: "Do you make office sofas?",
    answer:
      "Yes. Custom office sofas can be developed for reception areas, breakout zones, informal meeting areas and workplace lounges.",
  },

  {
    id: 9,
    question: "How much do bespoke commercial sofas cost?",
    answer:
      "The cost depends on factors including dimensions, quantity, design complexity, upholstery, materials and installation requirements. Once the project requirements are understood, a quote can be prepared around the specification.",
  },

  {
    id: 10,
    question: "How long does a commercial sofa project take?",
    answer:
      "Timescales depend on the scale of the project, design complexity, quantity, material selection and installation requirements. A more accurate project schedule can be provided after the brief and specification have been agreed.",
  },

  {
    id: 11,
    question: "Can you deliver and install commercial sofas?",
    answer:
      "Delivery and installation can form part of the agreed project scope.",
  },

  {
    id: 12,
    question: "Can commercial sofas be waterproof and fire-resistant?",
    answer:
      "Commercial sofas can be specified with water-resistant upholstery and fire-retardant materials where suitable for the project. Fabric performance, cleaning requirements and intended use are discussed before production.",
  },
] satisfies CommercialSofasFaqItem[];
export default function CommercialSofasPageContent() {
  return (
    <main
      id="webpage"
      className="
        overflow-hidden
        bg-[var(--brand-ivory)]
      "
    >
      <ServiceStickyCta
        href="#commercial-sofa-enquiry"
        label="Send Commercial Brief"
        note="Business project"
      />
      <CommercialSofasHero id="service" />
      <CommercialSofasRealBusinessSpacesSection />
      <CommercialSofaSolutionsSection />
      <WhyChooseCommercialSofasSection />
      <CommercialSofaProcessSection />
      <RestaurantCafeCommercialSofasSection id="restaurant-cafe-seating" />
      <HotelHospitalityCommercialSofasSection id="hotel-hospitality-seating" />
      <OfficeWorkspaceCommercialSofasSection id="office-seating" />
      <CommercialSofasMadeInLondonSection />
       <CommercialSofaLeadForm />
      <FAQSection id="faq" items={commercialSofasFaqs} />
      <CommercialSofasFinalCTASection />
    </main>
  );
}
