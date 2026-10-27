import { PackageCheck } from "lucide-react";

export default function CommercialSeatingIntroSection() {
  return (
    <section
      aria-labelledby="commercial-contract-seating-heading"
      className="px-3 py-9 sm:px-5 sm:py-11 lg:px-7 lg:py-14"
    >
      <div className="mx-auto grid max-w-[var(--site-width)] gap-6 border-y border-[var(--brand-navy)]/10 py-8 lg:grid-cols-2 lg:gap-14 lg:py-10">
        <div>
          <h2
            id="commercial-contract-seating-heading"
            className="max-w-[620px] font-brand-display text-[30px] font-semibold leading-[1.12] text-[var(--brand-navy)] sm:text-[38px] lg:text-[44px]"
          >
            Bespoke Commercial &amp; Contract Seating in London
          </h2>
          <p className="mt-6 flex max-w-[540px] items-start gap-2.5 font-brand-sans text-[13px] font-medium leading-[1.7] text-[var(--brand-text-muted)]">
            <PackageCheck
              aria-hidden="true"
              size={19}
              strokeWidth={1.5}
              className="mt-0.5 shrink-0 text-[var(--brand-gold-700)]"
            />
            Delivery and installation can form part of the agreed project scope.
          </p>
        </div>
        <div className="space-y-4 font-brand-sans text-[14px] font-medium leading-[1.8] text-[var(--brand-text-muted)]">
          <p>
            Sofa N More creates made-to-measure commercial seating for
            businesses that need more than standard furniture.
          </p>
          <p>
            From restaurant seating, banquettes and booths to commercial sofas,
            upholstered chairs, office seating and hospitality furniture, each
            project is designed around your floor plan, dimensions, intended use
            and visual direction.
          </p>
          <p>
            Every seating solution is developed specifically for the business
            and manufactured through our London workshop.
          </p>
        </div>
      </div>
    </section>
  );
}
