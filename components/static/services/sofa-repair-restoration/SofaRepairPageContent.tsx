import GoogleReviewsSection from "@/components/global/GoogleReviewsSection";
import RelatedProjectsSection from "@/components/global/RelatedProjectsSection";
import FAQSection from "../../FAQSection";
import SofaRepairLeadForm from "@/components/lead-capture/SofaRepairLeadForm";
import ServiceStickyCta from "@/components/static/services/ServiceStickyCta";
import BeforeYouReplaceSection from "./BeforeYouReplaceSection";
import RepairRestoreReplaceSection from "./RepairRestoreReplaceSection";
import SofaRepairHero from "./SofaRepairHero";
import SofaRepairLondonBaseSection from "./SofaRepairLondonBaseSection";
import SofaRestorationChangingInteriorsSection from "./SofaRestorationChangingInteriorsSection";
import SofaRestorationProcessSection from "./SofaRestorationProcessSection";
import SofaTypesRepairSection from "./SofaTypesRepairSection";
import WhatSofaRestorationMeansSection from "./WhatSofaRestorationMeansSection";
import SofaRepairFinalCTASection from "./SofaRepairFinalCTASection";
import {
  SofaRestorationQualificationSection,
  SofaRestorationServicesSection,
  SofaRestorationGoodFitSection,
} from "./SofaRestorationServiceSections";

export type SofaRepairFaqItem = {
  id: number;
  question: string;
  answer: string;
};

export const sofaRepairFaqs = [
  {
    id: 1,
    question: "Do you provide sofa reupholstery in London?",
    answer:
      "Yes. Sofa N More provides professional sofa reupholstery and substantial restoration through our North West London workshop for sofas that are worth preserving and renewing.",
  },
  {
    id: 2,
    question: "What type of sofa repair projects do you take on?",
    answer:
      "Our workshop is best suited to substantial projects such as complete reupholstery, upholstery replacement, foam and comfort renewal, wood or frame restoration and combined restoration work. For very small cosmetic spot repairs, we may not always be the most suitable service.",
  },
  {
    id: 3,
    question: "Do you replace sofa foam and cushions?",
    answer:
      "Yes, where suitable for the project. We can assess tired or collapsed seating and discuss foam or comfort renewal as part of a sofa refurbishment or restoration project.",
  },
  {
    id: 4,
    question: "Can you restore wooden parts of a sofa?",
    answer:
      "Suitable wooden or frame sections can be assessed as part of the restoration. Send photographs showing the complete sofa and the areas that need attention so we can determine what work may be appropriate.",
  },
  {
    id: 5,
    question: "Can you completely reupholster a sofa?",
    answer:
      "Yes. Where the sofa is suitable, complete reupholstery can renew the material and appearance while preserving the proportions and characteristics of the existing piece.",
  },
  {
    id: 6,
    question: "How much does sofa reupholstery cost in London?",
    answer:
      "The cost depends on the sofa size, condition, upholstery material, amount of work required, foam or comfort requirements and whether structural or wooden areas also need restoration. Send photographs and project details so the scope can be assessed before a tailored quotation is discussed.",
  },
  {
    id: 7,
    question: "Is it worth reupholstering an old sofa?",
    answer:
      "It can be, particularly when the sofa is well made, fits the room well, has personal value or would be difficult to replace with something of similar quality and proportions.",
  },
  {
    id: 8,
    question:
      "Do you repair small holes, scratches or isolated cosmetic damage?",
    answer:
      "Our workshop mainly focuses on substantial reupholstery and restoration projects rather than very small cosmetic spot repairs. Send a photograph if you are unsure and we can confirm whether the project is suitable.",
  },
  {
    id: 9,
    question: "How do I get a sofa restoration quote?",
    answer:
      "Send clear photographs of the complete sofa, close-ups of the areas that need attention and a short description of what you would like to improve. We will review the starting point before discussing the most suitable next step.",
  },
] satisfies SofaRepairFaqItem[];

export default function SofaRepairPageContent() {
  return (
    <main id="webpage" className="overflow-hidden lg:flow-root lg:overflow-clip bg-[var(--brand-ivory)]">
      <ServiceStickyCta
        href="#sofa-repair-enquiry"
        label="Send Photos"
        note="Sofa assessment"
        heroId="service"
        hideWhileFormVisible
        showContactActions
      />
      <SofaRepairHero id="service" />
      <SofaRestorationQualificationSection />
      <SofaRestorationServicesSection />
      <RelatedProjectsSection
        service="SOFA_REPAIR_RESTORATION"
        id="before-after-projects"
        title="Recent Sofa Reupholstery & Restoration Work"
      />
      <SofaRestorationGoodFitSection />
      <SofaRestorationProcessSection />
      <BeforeYouReplaceSection />
      <SofaTypesRepairSection id="sofa-restoration" />
      <WhatSofaRestorationMeansSection />
      <RepairRestoreReplaceSection />
      <SofaRestorationChangingInteriorsSection />
      <SofaRepairLondonBaseSection />
      <GoogleReviewsSection variant="restoration" />
      <SofaRepairLeadForm />
      <FAQSection
        id="faq"
        title="Sofa Reupholstery & Restoration FAQ"
        intro="Find answers about sofa reupholstery, foam replacement, restoration, major repairs and our London workshop assessment process."
        contactHref="#sofa-repair-enquiry"
        contactLabel="Send Photos for Assessment"
        items={sofaRepairFaqs}
      />
      <SofaRepairFinalCTASection />
    </main>
  );
}
