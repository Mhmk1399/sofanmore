import FAQSection from "../../FAQSection";
import SofaRepairLeadForm from "@/components/lead-capture/SofaRepairLeadForm";
import BeforeYouReplaceSection from "./BeforeYouReplaceSection";
import MoreThanAppearanceSection from "./MoreThanAppearanceSection";
import RepairRestoreReplaceSection from "./RepairRestoreReplaceSection";
import RestoreTheSofaYouKnowSection from "./RestoreTheSofaYouKnowSection";
import SofaRepairHero from "./SofaRepairHero";
import SofaRepairLondonBaseSection from "./SofaRepairLondonBaseSection";
import SofaRestorationChangingInteriorsSection from "./SofaRestorationChangingInteriorsSection";
import SofaRestorationProcessSection from "./SofaRestorationProcessSection";
import SofaTypesRepairSection from "./SofaTypesRepairSection";
import WhatSofaRestorationMeansSection from "./WhatSofaRestorationMeansSection";
import SofaRepairFinalCTASection from "./SofaRepairFinalCTASection";

export type SofaRepairFaqItem = {
  id: number;
  question: string;
  answer: string;
};

export const sofaRepairFaqs = [
  {
    id: 1,
    question: "Do you provide sofa repair in London?",
    answer:
      "Yes. Sofa N More provides sofa repair and restoration services in London for worn, damaged and older pieces that may benefit from professional attention.",
  },

  {
    id: 2,
    question: "Can an old sofa be restored?",
    answer:
      "Potentially, yes. Whether restoration is appropriate depends on the condition of the sofa, the work required and what you want to preserve or improve. Send us photographs and details of the piece so the project can be assessed.",
  },

  {
    id: 3,
    question: "Is it worth repairing an old sofa?",
    answer:
      "It can be. A sofa may be worth repairing when you still like its design, it fits the room particularly well, it is a bespoke or well-made piece, or it has personal significance. The extent of the required restoration should also be considered before deciding.",
  },

  {
    id: 4,
    question: "Should I repair my sofa or buy a new one?",
    answer:
      "That depends on the sofa. If you no longer like the design or the piece is unsuitable for your space, replacement may make more sense. If you still value the sofa and the required restoration is appropriate, preserving the existing piece may be the better option. An assessment can help clarify the decision.",
  },

  {
    id: 5,
    question: "Can you restore a bespoke sofa?",
    answer:
      "Bespoke sofas can be considered for restoration. Because made-to-measure pieces may have been designed around a specific space, preserving the original dimensions can be particularly valuable.",
  },

  {
    id: 6,
    question: "Can you restore older or vintage sofas?",
    answer:
      "Sofa N More works with older and worn pieces as part of its repair and restoration service. The appropriate approach depends on the individual piece and its condition.",
  },

  {
    id: 7,
    question: "Can you match the original look of my sofa?",
    answer:
      "The achievable result depends on the sofa, its existing materials, condition and the restoration required. Where preserving the original character is important, let us know at the beginning of the project so this can form part of the assessment.",
  },

  {
    id: 8,
    question: "How much does sofa repair cost in London?",
    answer:
      "The cost depends on the condition of the sofa and the work required. Rather than giving a generic figure that may not reflect your project, we recommend sending photographs and details so the scope can be assessed first.",
  },

  {
    id: 9,
    question: "How long does sofa restoration take?",
    answer:
      "Timescales vary according to the condition of the sofa and the extent of the agreed restoration work. A more relevant timeframe can be discussed after the project has been assessed.",
  },

  {
    id: 10,
    question: "How do I get a sofa repair quote?",
    answer:
      "Start by contacting Sofa N More with photographs of the complete sofa and close-ups of the areas that need attention. Include a short description of the issue and what you would like to achieve. We can then advise you on the appropriate next step.",
  },

  {
    id: 11,
    question:
      "Can water-resistant and fire-retardant upholstery be used during restoration?",
    answer:
      "Where suitable, new upholstery for a restoration project can be discussed with water-resistant and fire-retardant fabric options. The right material depends on the sofa, the restoration approach and how the piece will be used.",
  },
] satisfies SofaRepairFaqItem[];

export default function SofaRepairPageContent() {
  return (
    <main id="webpage" className="overflow-hidden bg-[var(--brand-ivory)]">
      <SofaRepairHero id="service" />
      <BeforeYouReplaceSection />
      <SofaTypesRepairSection id="sofa-restoration" />
      <WhatSofaRestorationMeansSection />
      <RepairRestoreReplaceSection />
      <SofaRestorationProcessSection />
      <RestoreTheSofaYouKnowSection />
      <SofaRestorationChangingInteriorsSection />
      <SofaRepairLondonBaseSection />
      <MoreThanAppearanceSection id="before-after-projects" />
      <SofaRepairLeadForm />
      <SofaRepairFinalCTASection />

      <FAQSection id="faq" items={sofaRepairFaqs} />
    </main>
  );
}
