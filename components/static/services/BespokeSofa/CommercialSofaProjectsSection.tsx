import { Building2 } from "lucide-react";

import ClayButton from "@/components/ui/ClayButton";

export default function CommercialSofaProjectsSection() {
  return (
    <section
      aria-labelledby="commercial-bespoke-heading"
      className="px-3 py-8 sm:px-5 sm:py-10 lg:px-7"
    >
      <div className="mx-auto flex max-w-[var(--site-width)] flex-col gap-6 border-y border-[var(--brand-navy)]/10 py-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:py-10">
        <div className="flex min-w-0 items-start gap-4">
          <Building2
            aria-hidden="true"
            className="mt-1 h-7 w-7 shrink-0 text-[var(--brand-gold-700)]"
            strokeWidth={1.5}
          />
          <div className="min-w-0">
            <p className="font-brand-sans text-[12px] font-bold uppercase text-[var(--brand-gold-700)]">
              Commercial &amp; Hospitality
            </p>
            <h2
              id="commercial-bespoke-heading"
              className="mt-3 font-brand-display text-[28px] font-semibold leading-[1.15] text-[var(--brand-navy)] sm:text-[34px]"
            >
              Need Bespoke Seating for a Business?
            </h2>
            <p className="mt-4 max-w-[760px] font-brand-sans text-[14px] font-medium leading-[1.8] text-[var(--brand-text-muted)]">
              We also design and manufacture made-to-measure sofas, banquette
              seating, booths and fixed seating for restaurants, caf&eacute;s,
              offices and hospitality spaces.
            </p>
          </div>
        </div>
        <ClayButton
          href="/services/commercial-sofas"
          variant="navy"
          size="md"
          showArrow
          className="max-w-full shrink-0 !min-w-0 !whitespace-normal lg:self-center"
        >
          Explore Commercial Seating
        </ClayButton>
      </div>
    </section>
  );
}
