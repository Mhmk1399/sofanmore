import {
  Armchair,
  Check,
  Hammer,
  Layers3,
  Minus,
  Scissors,
  Sofa,
} from "lucide-react";

const restorationServices = [
  {
    title: "Complete Sofa Reupholstery",
    text: "Renew worn or outdated upholstery across the sofa with new materials and a refreshed finish.",
    icon: Scissors,
  },
  {
    title: "Fabric & Upholstery Replacement",
    text: "Replace existing upholstery where a sofa needs a substantial visual and material renewal.",
    icon: Sofa,
  },
  {
    title: "Foam & Comfort Replacement",
    text: "Renew tired, collapsed or uncomfortable seating foam and internal comfort components where appropriate.",
    icon: Armchair,
  },
  {
    title: "Wood & Frame Restoration",
    text: "Assess and restore suitable wooden or structural areas that need professional attention.",
    icon: Hammer,
  },
  {
    title: "Combined Sofa Restoration",
    text: "Address upholstery, comfort and structural areas together as one coordinated restoration project.",
    icon: Layers3,
  },
];

const goodFit = [
  "The complete sofa or a substantial section needs reupholstery",
  "Several cushions or seating areas have lost their comfort",
  "Foam needs meaningful replacement or renewal",
  "Wooden or structural sections need restoration",
  "The sofa needs a combination of upholstery, comfort and restoration work",
  "It is a bespoke, older, high-quality or much-loved sofa worth preserving",
];

const smallRepairs = [
  "One very small cosmetic hole",
  "A minor isolated scratch",
  "A simple patch-only repair",
  "Very small spot repairs where the rest of the sofa needs no work",
];

export function SofaRestorationQualificationSection() {
  return (
    <section
      aria-labelledby="restoration-qualification-title"
      className="px-4 py-8 sm:px-6 sm:py-10 lg:px-8"
    >
      <div className="mx-auto grid max-w-[var(--site-width)] gap-5 border-b border-[var(--brand-navy)]/15 pb-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
        <h2
          id="restoration-qualification-title"
          className="font-brand-display text-[28px] font-semibold leading-tight text-[var(--brand-navy)] sm:text-[34px]"
        >
          Best Suited to Substantial Sofa Restoration
        </h2>
        <div className="space-y-3 font-brand-sans text-[14px] leading-relaxed text-[var(--brand-text-muted)]">
          <p>
            Our workshop focuses on complete or substantial sofa reupholstery
            and restoration projects.
          </p>
          <p>
            We are best suited to sofas that need significant upholstery
            renewal, foam or comfort replacement, wood or frame restoration, or
            a combination of several types of work.
          </p>
          <p>
            For isolated cosmetic issues such as a single small hole, minor
            scratch or simple spot patch, our workshop may not always be the
            most suitable option.
          </p>
          <p className="font-semibold text-[var(--brand-navy)]">
            Send us photographs first and we can assess whether the project is a
            good fit.
          </p>
        </div>
      </div>
    </section>
  );
}

export function SofaRestorationServicesSection() {
  return (
    <section
      id="restoration-services"
      aria-labelledby="restoration-services-title"
      className="scroll-mt-28 px-4 py-8 sm:px-6 sm:py-10 lg:px-8"
    >
      <div className="mx-auto max-w-[var(--site-width)]">
        <h2
          id="restoration-services-title"
          className="max-w-[850px] font-brand-display text-[30px] font-semibold leading-tight text-[var(--brand-navy)] sm:text-[38px]"
        >
          Sofa Reupholstery &amp; Major Restoration Services in London
        </h2>
        <div className="mt-5 max-w-[960px] space-y-3 font-brand-sans text-[14px] leading-relaxed text-[var(--brand-text-muted)]">
          <p>
            Our sofa restoration service is designed for projects where the sofa
            needs meaningful work rather than a small cosmetic repair.
          </p>
          <p>
            Depending on the sofa and its condition, a restoration project may
            include complete reupholstery, replacement upholstery, foam and
            comfort renewal, restoration of suitable wooden or structural
            elements, or several of these services combined.
          </p>
          <p>
            The exact scope is agreed after we review the sofa, its condition
            and what you want to preserve or improve.
          </p>
        </div>
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {restorationServices.map(({ title, text, icon: Icon }) => (
            <article
              key={title}
              className="clay-surface-soft min-w-0 rounded-lg p-5"
            >
              <div className="flex items-start gap-3">
                <Icon
                  aria-hidden="true"
                  size={22}
                  strokeWidth={1.5}
                  className="mt-0.5 shrink-0 text-[var(--brand-gold-700)]"
                />
                <h3 className="font-brand-display text-[21px] font-semibold leading-snug text-[var(--brand-navy)]">
                  {title}
                </h3>
              </div>
              <p className="mt-3 font-brand-sans text-[14px] leading-relaxed text-[var(--brand-text-muted)]">
                {text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SofaRestorationGoodFitSection() {
  return (
    <section
      id="restoration-suitability"
      aria-labelledby="restoration-suitability-title"
      className="scroll-mt-28 px-4 py-10 sm:px-6 sm:py-12 lg:px-8"
    >
      <div className="mx-auto max-w-[var(--site-width)] border-y border-[var(--brand-navy)]/15 py-8">
        <h2
          id="restoration-suitability-title"
          className="max-w-[850px] font-brand-display text-[30px] font-semibold leading-tight text-[var(--brand-navy)] sm:text-[38px]"
        >
          Is Your Sofa a Good Fit for Our Restoration Service?
        </h2>
        <div className="mt-7 grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <h3 className="font-brand-sans text-[15px] font-bold text-[var(--brand-navy)]">
              Our service may be a good fit if:
            </h3>
            <ul className="mt-4 space-y-3">
              {goodFit.map((text) => (
                <li
                  key={text}
                  className="flex items-start gap-3 font-brand-sans text-[14px] leading-relaxed text-[var(--brand-text-muted)]"
                >
                  <Check
                    aria-hidden="true"
                    size={18}
                    className="mt-0.5 shrink-0 text-[var(--brand-gold-700)]"
                  />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-brand-sans text-[15px] font-bold text-[var(--brand-navy)]">
              Our workshop may not be the best fit for:
            </h3>
            <ul className="mt-4 space-y-3">
              {smallRepairs.map((text) => (
                <li
                  key={text}
                  className="flex items-start gap-3 font-brand-sans text-[14px] leading-relaxed text-[var(--brand-text-muted)]"
                >
                  <Minus
                    aria-hidden="true"
                    size={18}
                    className="mt-0.5 shrink-0"
                  />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-7 font-brand-sans text-[14px] font-semibold leading-relaxed text-[var(--brand-navy)]">
          If you are unsure, send photographs and we can assess the project
          first.
        </p>
      </div>
    </section>
  );
}
