import GoogleReviewsSection from "@/components/global/GoogleReviewsSection";
import RelatedProjectsSection from "@/components/global/RelatedProjectsSection";
import CommercialSofaLeadForm from "@/components/lead-capture/CommercialSofaLeadForm";
import ServiceStickyCta from "@/components/static/services/ServiceStickyCta";

import FAQSection from "../../FAQSection";
import CommercialSeatingIntroSection from "./CommercialSeatingIntroSection";
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
    question: "What is bespoke commercial seating?",
    answer:
      "Bespoke commercial seating is designed and made specifically for a business space rather than selected from standard ready-made furniture. Dimensions, layout, configuration, upholstery and finishing details can be developed around the venue and the way the seating will be used.",
  },

  {
    id: 2,
    question: "Do you make bespoke commercial sofas in London?",
    answer:
      "Yes. Sofa N More designs and manufactures bespoke commercial sofas and seating through our North West London workshop for restaurants, cafés, hotels, offices and other commercial spaces.",
  },

  {
    id: 3,
    question: "Can you make restaurant seating to exact dimensions?",
    answer:
      "Yes. Restaurant sofas, banquettes, booths and other upholstered seating can be developed around your floor plan, available dimensions, customer flow and seating requirements.",
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
    question: "Do you make bespoke seating for hotels and hospitality spaces?",
    answer:
      "Yes. Bespoke sofas, chairs and upholstered seating can be developed for hotel lobbies, lounges, reception areas, bars and other hospitality spaces.",
  },

  {
    id: 8,
    question: "Do you make custom office seating and sofas?",
    answer:
      "Yes. Custom office seating and sofas can be developed for reception areas, breakout zones, informal meeting areas and workplace lounges.",
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
    question: "Can you specify upholstery suitable for commercial use?",
    answer:
      "Material and upholstery requirements depend on the venue, intended use and project specification. Tell us about your commercial requirements and we can discuss suitable material options and any relevant performance requirements before production.",
  },
  {
    id: 13,
    question: "Can you work from floor plans and venue measurements?",
    answer:
      "Yes. Floor plans, approximate measurements, site photographs and design references are useful starting points for a bespoke commercial seating project.",
  },
] satisfies CommercialSofasFaqItem[];
export default function CommercialSofasPageContent() {
  return (
    <main
      id="webpage"
      className="
        overflow-hidden
        lg:flow-root
        lg:overflow-clip
        bg-[var(--brand-ivory)]
      "
    >
      <ServiceStickyCta
        href="#commercial-sofa-enquiry"
        label="Get Quote"
        note="Commercial seating"
        heroId="service"
        hideWhileFormVisible
        showContactActions
      />
      <CommercialSofasHero id="service" />
      <CommercialSeatingIntroSection />
      <CommercialSofaSolutionsSection />
      <RelatedProjectsSection
        service="COMMERCIAL_SOFA"
        id="commercial-projects"
        title="Recent Commercial Seating Projects in London"
      />
      <CommercialSofasRealBusinessSpacesSection />
      <WhyChooseCommercialSofasSection />
      <CommercialSofaProcessSection />
      <RestaurantCafeCommercialSofasSection id="restaurant-cafe-seating" />
      <HotelHospitalityCommercialSofasSection id="hotel-hospitality-seating" />
      <OfficeWorkspaceCommercialSofasSection id="office-seating" />
      <CommercialSofasMadeInLondonSection />
      <CommercialSofaLeadForm projectsHref="#commercial-projects" />
      <GoogleReviewsSection variant="commercial" />
      <FAQSection
        id="faq"
        items={commercialSofasFaqs}
        title="Commercial Seating FAQ"
        intro="Find answers to common questions about bespoke commercial sofas, restaurant seating, banquettes, booths, office seating and made-to-measure commercial projects."
        contactHref="#commercial-sofa-enquiry"
        contactLabel="Request a Commercial Seating Quote"
      />
      <CommercialSofasFinalCTASection />
    </main>
  );
}
