import BespokeSofaLeadForm from "@/components/lead-capture/BespokeSofaLeadForm";
import ServiceStickyCta from "@/components/static/services/ServiceStickyCta";
import FAQSection from "../../FAQSection";
import BespokesofaHero from "./bespoke-sofaHero";
import BespokeProcessSection from "./BespokeProcessSection";
import BespokeSofasWeCanCreateSection from "./BespokeSofasWeCanCreateSection";
import CommercialSofaProjectsSection from "./CommercialSofaProjectsSection";
import CustomsofaForYourSpaceSection from "./CustomFurnitureForYourSpaceSection";
import SeeWhatWeCreateSection from "./SeeWhatWeCreateSection";
import WhyChooseBespokeSofasSection from "./WhyChooseBespokeSofasSection";

export type BespokesofaFaqItem = {
  id: number;
  question: string;
  answer: string;
};

export const bespokesofaFaqs = [
  {
    id: 1,

    question: "What does bespoke sofa mean?",

    answer:
      "Bespoke sofa is created specifically for an individual customer or project rather than being produced to a fixed standard specification. Dimensions, design details, materials and finishes can be adapted around the requirements of the space.",
  },

  {
    id: 2,

    question: "Can you make sofa to specific dimensions?",

    answer:
      "Yes. Custom dimensions are one of the main reasons clients choose bespoke sofa. Share the measurements and requirements of your space with us and we can explore the appropriate proportions for your project.",
  },

  {
    id: 3,

    question: "Can I choose the fabric and finish?",

    answer:
      "Yes. Fabric, colour and finishing choices can form part of the bespoke design process, allowing the finished sofa to work with your wider interior.",
  },

  {
    id: 4,

    question: "Do you make bespoke sofas?",

    answer:
      "Yes. Sofa N More creates custom and made-to-measure sofas in London, with dimensions and design details developed around the individual project.",
  },

  {
    id: 5,

    question: "How much does bespoke sofa cost?",

    answer:
      "The cost of bespoke sofa depends on factors including the type and size of the piece, construction, materials, upholstery and complexity of the design. Once we understand your requirements, we can prepare a quote based on the specification of your project.",
  },

  {
    id: 6,

    question: "How long does bespoke sofa take to make?",

    answer:
      "Timescales vary depending on the design, materials and complexity of the project. We can provide a more accurate indication once the specification and requirements have been discussed.",
  },

  {
    id: 7,

    question: "Do you deliver bespoke sofa?",

    answer:
      "Yes. Delivery and installation can form part of the Sofa N More service.",
  },

  {
    id: 8,

    question: "Do you make sofa for commercial projects?",

    answer:
      "Yes. Sofa N More also works on sofa for commercial environments. Visit our Commercial sofa page to learn more about solutions for restaurants, cafés, offices and hospitality spaces.",
  },

  {
    id: 9,

    question: "Are your bespoke sofas waterproof and fire-resistant?",

    answer:
      "The sofas we make can be specified with water-resistant upholstery and fire-retardant materials. Fabric choice, finish and intended use are discussed during the bespoke design process.",
  },
] satisfies BespokesofaFaqItem[];

export default function BespokesofaPageContent() {
  return (
    <main
      id="webpage"
      className="
        overflow-hidden mt-6
        bg-[var(--brand-ivory)]
      "
    >
      <ServiceStickyCta
        href="#bespoke-sofa-enquiry"
        label="Request Bespoke Sofa"
      />
      <BespokesofaHero id="service" />
      <CustomsofaForYourSpaceSection id="made-to-measure-sofas" />
      <BespokeSofasWeCanCreateSection />
      <WhyChooseBespokeSofasSection />
      <BespokeProcessSection />

      <CommercialSofaProjectsSection />
      <SeeWhatWeCreateSection />
      <FAQSection id="faq" items={bespokesofaFaqs} />
      <BespokeSofaLeadForm />
    </main>
  );
}
