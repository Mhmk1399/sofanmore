import JournalSection from "@/components/static/JournalSection";
import { Metadata } from "next/types";
export const metadata: Metadata = {
  title: "Sofa N More Journal | Bespoke Furniture, Interiors & Craftsmanship",

  description:
    "Explore the Sofa N More journal for bespoke furniture inspiration, London craftsmanship, interior design ideas, upholstery advice and furniture restoration stories.",
};
const page = () => {
  return (
    <main>
      <JournalSection />
    </main>
  );
};

export default page;
