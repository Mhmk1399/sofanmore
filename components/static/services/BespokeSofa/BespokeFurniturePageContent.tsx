import GoogleReviewsSection from "@/components/global/GoogleReviewsSection";
import RelatedProjectsSection from "@/components/global/RelatedProjectsSection";
import BespokeSofaLeadForm from "@/components/lead-capture/BespokeSofaLeadForm";
import ServiceStickyCta from "@/components/static/services/ServiceStickyCta";
import FAQSection from "../../FAQSection";
import BespokesofaHero from "./bespoke-sofaHero";
import {
  BespokeSofaTrustBar,
  CustomSofaMakersSection,
  MadeToMeasureSofasSection,
} from "./BespokeSofaDetailsSections";
import BespokeSofasWeCanCreateSection from "./BespokeSofasWeCanCreateSection";
import CommercialSofaProjectsSection from "./CommercialSofaProjectsSection";
import CustomsofaForYourSpaceSection from "./CustomFurnitureForYourSpaceSection";
import WhyChooseBespokeSofasSection from "./WhyChooseBespokeSofasSection";

export type BespokesofaFaqItem = {
  id: number;
  question: string;
  answer: string;
};

export const bespokesofaFaqs = [
  {
    id: 1,
    question: "What is a bespoke sofa?",
    answer:
      "A bespoke sofa is designed and made specifically for an individual customer and space rather than produced to a fixed ready-made specification. Dimensions, proportions, comfort, fabric and finishing details can all be developed around your requirements.",
  },
  {
    id: 2,
    question: "Can you make a sofa to exact dimensions?",
    answer:
      "Yes. Made-to-measure dimensions are one of the main reasons clients choose a bespoke sofa. Send us the measurements, photographs and requirements of your space and we can develop suitable proportions for the project.",
  },
  {
    id: 3,
    question: "Do you make custom sofas in London?",
    answer:
      "Yes. Our bespoke sofas are developed and handcrafted through our North West London workshop for residential and selected commercial projects.",
  },
  {
    id: 4,
    question: "What is the difference between a bespoke and ready-made sofa?",
    answer:
      "A ready-made sofa is produced in predetermined sizes and specifications. A bespoke sofa is designed around your individual space, dimensions, seating requirements, fabric preferences and finishing details.",
  },
  {
    id: 5,
    question: "Can I choose the fabric and finish?",
    answer:
      "Yes. Fabric, materials, colour, upholstery details and finishing options can be selected as part of the bespoke design process.",
  },
  {
    id: 6,
    question: "Can you make custom corner or unusual-size sofas?",
    answer:
      "Yes. Bespoke construction allows us to explore corner sofas, unusual proportions and other custom configurations where standard furniture may not fit the available space.",
  },
  {
    id: 7,
    question: "How much does a bespoke sofa cost?",
    answer:
      "The cost depends on the dimensions, configuration, materials, fabric, construction requirements and finishing details. Once we understand your project, we can provide a tailored quotation.",
  },
  {
    id: 8,
    question: "How long does a made-to-measure sofa take?",
    answer:
      "Lead time depends on the design, size, materials and current workshop schedule. We confirm the expected timeline once the specification and scope have been agreed.",
  },
  {
    id: 9,
    question: "Do you deliver bespoke sofas in London?",
    answer:
      "Yes. Delivery arrangements are discussed as part of the project and depend on the finished piece, access requirements and delivery location.",
  },
  {
    id: 10,
    question: "Do you make bespoke sofas for businesses?",
    answer:
      "Yes. We also create bespoke sofas and commercial seating for restaurants, caf\u00e9s, offices and hospitality spaces. Larger commercial seating projects are handled through our dedicated Commercial Sofas service.",
  },
  {
    id: 11,
    question: "Can I send photos and measurements before requesting a quote?",
    answer:
      "Yes. Room photographs, approximate measurements, access information and inspiration images are useful starting points and can be uploaded with your enquiry.",
  },
  {
    id: 12,
    question: "Can I visit your London workshop?",
    answer:
      "Yes. Suitable projects can be discussed at our North West London workshop, where we can review requirements, materials and next steps.",
  },
] satisfies BespokesofaFaqItem[];

export default function BespokesofaPageContent() {
  return (
    <main id="webpage" className="mt-6 overflow-hidden lg:flow-root lg:overflow-clip bg-[var(--brand-ivory)]">
      <ServiceStickyCta
        href="#bespoke-sofa-enquiry"
        label="Bespoke Sofa Quote"
        heroId="service"
        hideWhileFormVisible
      />
      <BespokesofaHero id="service" />
      <BespokeSofaTrustBar />
      <MadeToMeasureSofasSection />
      <RelatedProjectsSection service="BESPOKE_SOFA" />
      <CustomsofaForYourSpaceSection id="made-to-measure-sofas" />
      <BespokeSofasWeCanCreateSection />
      <CustomSofaMakersSection />
      <WhyChooseBespokeSofasSection />
      <CommercialSofaProjectsSection />
      <GoogleReviewsSection variant="bespoke" />
      <FAQSection
        id="faq"
        items={bespokesofaFaqs}
        title="Bespoke Sofa FAQ"
        contactHref="#bespoke-sofa-enquiry"
        contactLabel="Request a Bespoke Sofa Quote"
        intro="Find answers to common questions about bespoke sofas, custom dimensions, fabrics, pricing and our London workshop."
      />
      <BespokeSofaLeadForm defaultProjectType="single-sofa" />
    </main>
  );
}
