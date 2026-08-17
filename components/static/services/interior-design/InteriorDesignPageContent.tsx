import FAQSection from "../../FAQSection";
import InteriorDesignLeadForm from "@/components/lead-capture/InteriorDesignLeadForm";
import BespokeInteriorDesignPhilosophySection from "./BespokeInteriorDesignPhilosophySection";
import BespokeSofasInteriorIntegrationSection from "./BespokeSofasInteriorIntegrationSection";
import CommercialInteriorDesignSection from "./CommercialInteriorDesignSection";
import DesignedAroundYourSpaceSection from "./DesignedAroundYourSpaceSection";
import InteriorDesignFinalCTASection from "./InteriorDesignFinalCTASection";
import InteriorDesignHero from "./InteriorDesignHero";
import InteriorDesignLondonBaseSection from "./InteriorDesignLondonBaseSection";
import InteriorDesignProcessSection from "./InteriorDesignProcessSection";
import InteriorDesignProjectsGallerySection from "./InteriorDesignProjectsGallerySection";
import InteriorDesignServicesSection from "./InteriorDesignServicesSection";
import RestaurantCafeInteriorsSection from "./RestaurantCafeInteriorsSection";

export type InteriorDesignFaqItem = {
  id: number;
  question: string;
  answer: string;
};

export const interiorDesignFaqs = [
  {
    id: 1,
    question: "Do you provide interior design services in London?",
    answer:
      "Yes. Sofa N More provides interior design services for residential and commercial spaces in London, with each project developed around the individual requirements of the client and space.",
  },

  {
    id: 2,
    question: "Do you work on residential interiors?",
    answer:
      "Yes. Residential interior design projects can be developed around the layout, visual direction, colour, materials and bespoke sofa requirements of the home.",
  },

  {
    id: 3,
    question: "Do you design commercial interiors?",
    answer:
      "Yes. Sofa N More works with commercial spaces as well as residential projects. Commercial interior projects may include environments such as restaurants, cafés, hospitality spaces and workplaces.",
  },

  {
    id: 4,
    question: "Can you design a bespoke sofa as part of my interior?",
    answer:
      "Yes. One advantage of working with Sofa N More is the ability to consider a bespoke sofa as part of the wider interior rather than treating it as a separate purchase. Dimensions, shape, upholstery and styling can be developed around the room and design direction.",
  },

  {
    id: 5,
    question: "Can you help if I do not know exactly what style I want?",
    answer:
      "Yes. You do not need to arrive with a finished concept. Reference images, colours, spaces you like and even examples of what you do not like can help establish the direction. The design process can then turn those preferences into a more coherent interior concept.",
  },

  {
    id: 6,
    question: "Can you redesign just one room?",
    answer:
      "The appropriate scope depends on the project. If you are considering a living room, reception space or another individual area, contact us with the details and we can discuss the most suitable approach.",
  },

  {
    id: 7,
    question: "Do you offer restaurant and café interior design?",
    answer:
      "Yes. Commercial interior design can include restaurants and cafés, with particular consideration given to atmosphere, layout, seating and the overall experience of the space.",
  },

  {
    id: 8,
    question: "Can bespoke seating be included in a restaurant project?",
    answer:
      "Yes. Bespoke sofas, banquettes, booths and other upholstered seating can be developed around the restaurant layout and wider interior concept.",
  },

  {
    id: 9,
    question: "How much does interior design cost?",
    answer:
      "Interior design costs vary according to the size of the space, the scope of the service, project complexity and the level of design involvement required. Once we understand the project, the appropriate scope and quotation can be discussed.",
  },

  {
    id: 10,
    question: "How long does an interior design project take?",
    answer:
      "Timescales depend on the scale and complexity of the project and the agreed scope of work. A more relevant schedule can be discussed once the requirements of your project are understood.",
  },

  {
    id: 11,
    question: "Can bespoke sofas in an interior project be waterproof and fire-resistant?",
    answer:
      "Yes. Bespoke sofas and upholstered seating can be specified with water-resistant upholstery and fire-retardant materials, depending on the design, fabric choice and intended use of the space.",
  },
] satisfies InteriorDesignFaqItem[];

export default function InteriorDesignPageContent() {
  return (
    <main
      id="webpage"
      className="
        overflow-hidden
        bg-[var(--brand-ivory)]
      "
    >
      <InteriorDesignHero id="service" />
      <BespokeInteriorDesignPhilosophySection />
      <InteriorDesignServicesSection residentialId="residential" />
      <DesignedAroundYourSpaceSection id="interior-styling" />
      <BespokeSofasInteriorIntegrationSection />
      <InteriorDesignProcessSection />
      <CommercialInteriorDesignSection id="commercial" />
      <RestaurantCafeInteriorsSection id="restaurant-cafe" />
      <InteriorDesignLondonBaseSection />
      <InteriorDesignProjectsGallerySection />
      <InteriorDesignLeadForm />
      <FAQSection id="faq" items={interiorDesignFaqs} />
      <InteriorDesignFinalCTASection />
    </main>
  );
}
