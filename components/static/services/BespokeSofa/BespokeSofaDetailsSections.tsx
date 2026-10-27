import { Landmark, PackageX, Ruler, Scaling } from "lucide-react";

import ClayButton from "@/components/ui/ClayButton";

const bespokePromises = [
  { label: "Made to Measure", icon: Ruler },
  { label: "London Workshop", icon: Landmark },
  { label: "Built to Your Dimensions", icon: Scaling },
  { label: "No Ready-Made Stock", icon: PackageX },
];

export function BespokeSofaTrustBar() {
  return (
    <div className="px-3 pb-4 sm:px-5 lg:px-7">
      <ul
        aria-label="Our bespoke sofa service"
        className="mx-auto grid max-w-[var(--site-width)] grid-cols-2 gap-x-4 gap-y-5 border-y border-[var(--brand-navy)]/10 py-6 lg:grid-cols-4"
      >
        {bespokePromises.map(({ label, icon: Icon }) => (
          <li
            key={label}
            className="flex min-w-0 items-center justify-center gap-2.5"
          >
            <Icon
              aria-hidden="true"
              className="h-5 w-5 shrink-0 text-[var(--brand-gold-700)]"
              strokeWidth={1.5}
            />
            <span className="font-brand-sans text-[12px] font-semibold leading-snug text-[var(--brand-navy)] sm:text-[14px]">
              {label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function MadeToMeasureSofasSection() {
  return (
    <section
      aria-labelledby="made-to-measure-heading"
      className="px-3 py-10 sm:px-5 sm:py-12 lg:px-7 lg:py-16"
    >
      <div className="mx-auto grid max-w-[var(--site-width)] gap-6 border-y border-[var(--brand-navy)]/10 py-8 sm:py-10 lg:grid-cols-2 lg:gap-16 lg:py-12">
        <h2
          id="made-to-measure-heading"
          className="max-w-[580px] font-brand-display text-[30px] font-semibold leading-[1.12] text-[var(--brand-navy)] sm:text-[38px] lg:text-[44px]"
        >
          Custom Made &amp; Made-to-Measure Sofas in London
        </h2>
        <div className="max-w-[640px] space-y-4 font-brand-sans text-[14px] font-medium leading-[1.8] text-[var(--brand-text-muted)] lg:text-[15px]">
          <p>
            At Sofa N More, we design and build bespoke sofas in London for
            homes and spaces where standard sizes, fixed proportions and
            ready-made designs simply do not work.
          </p>
          <p>
            From made-to-measure sofas designed around the proportions of your
            room to custom chairs, benches and statement seating, every project
            starts with your space, your exact requirements and the way you want
            the finished piece to look and feel.
          </p>
          <p>
            Choose the dimensions, configuration, comfort, materials, fabric and
            finish to create a custom sofa made specifically for your space.
          </p>
        </div>
      </div>
    </section>
  );
}

export function CustomSofaMakersSection() {
  return (
    <section
      aria-labelledby="custom-sofa-makers-heading"
      className="px-3 py-10 sm:px-5 sm:py-12 lg:px-7 lg:py-16"
    >
      <div className="mx-auto grid max-w-[var(--site-width)] gap-6 border-b border-[var(--brand-navy)]/10 pb-10 lg:grid-cols-2 lg:gap-16 lg:pb-14">
        <div>
          <h2
            id="custom-sofa-makers-heading"
            className="max-w-[580px] font-brand-display text-[30px] font-semibold leading-[1.12] text-[var(--brand-navy)] sm:text-[38px] lg:text-[44px]"
          >
            Custom Sofa Makers in London
          </h2>
          <div className="mt-6">
            <ClayButton
              href="#bespoke-sofa-enquiry"
              variant="navy"
              size="md"
              showArrow
              className="max-w-full !min-w-0 !whitespace-normal"
            >
              Discuss Your Bespoke Sofa
            </ClayButton>
          </div>
        </div>
        <div className="max-w-[640px] space-y-4 font-brand-sans text-[14px] font-medium leading-[1.8] text-[var(--brand-text-muted)] lg:text-[15px]">
          <p>
            Our North West London workshop designs and handcrafts custom sofas
            around each client&apos;s individual requirements.
          </p>
          <p>
            From the frame proportions and exact dimensions to seating comfort,
            upholstery and finishing details, every piece is developed
            specifically for the space where it will be used.
          </p>
          <p>
            You can start with room photographs, approximate measurements,
            inspiration images or your own design idea.
          </p>
        </div>
      </div>
    </section>
  );
}
