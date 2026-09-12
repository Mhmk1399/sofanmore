"use client";

import dynamic from "next/dynamic";
import { Building2, Camera, Sparkles, Sofa } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Spinner,
  type SelectOption,
} from "@/components/lead-capture/ClayFormControls";

type ServiceFormKey =
  | "bespoke-sofa"
  | "commercial-sofa"
  | "interior-design"
  | "sofa-repair";

type ServiceChoice = {
  key: ServiceFormKey;
  label: string;
  eyebrow: string;
  summary: string;
  icon: typeof Sofa;
};

const serviceChoices: ServiceChoice[] = [
  {
    key: "bespoke-sofa",
    label: "Bespoke sofa",
    eyebrow: "Made to measure",
    summary: "A sofa designed around your home, measurements and references.",
    icon: Sofa,
  },
  {
    key: "commercial-sofa",
    label: "Commercial sofas",
    eyebrow: "Venue seating",
    summary: "Brief us on hospitality, office, retail or contract seating.",
    icon: Building2,
  },
  {
    key: "interior-design",
    label: "Interior design",
    eyebrow: "Whole space",
    summary: "Share the space, direction, plans and inspiration.",
    icon: Sparkles,
  },
  {
    key: "sofa-repair",
    label: "Sofa repair",
    eyebrow: "Photo assessment",
    summary: "Upload photos and tell us what needs attention.",
    icon: Camera,
  },
];

const serviceOptions = serviceChoices.map((choice) => ({
  label: choice.label,
  value: choice.key,
})) satisfies SelectOption[];

const BespokeSofaLeadForm = dynamic(
  () => import("@/components/lead-capture/BespokeSofaLeadForm"),
  { loading: FormLoadingState },
);

const CommercialSofaLeadForm = dynamic(
  () => import("@/components/lead-capture/CommercialSofaLeadForm"),
  { loading: FormLoadingState },
);

const InteriorDesignLeadForm = dynamic(
  () => import("@/components/lead-capture/InteriorDesignLeadForm"),
  { loading: FormLoadingState },
);

const SofaRepairLeadForm = dynamic(
  () => import("@/components/lead-capture/SofaRepairLeadForm"),
  { loading: FormLoadingState },
);

function FormLoadingState() {
  return (
    <div className="relative bg-[var(--brand-ivory)] px-3 py-8 sm:px-5 lg:px-7">
      <div className="mx-auto max-w-[var(--site-width)]">
        <div className="clay-surface-strong rounded-[30px] p-[6px] sm:rounded-[38px] sm:p-[8px]">
          <div className="clay-inset flex min-h-[360px] items-center justify-center rounded-[24px] bg-[#F5EDE1] px-5 py-12 sm:rounded-[30px] lg:rounded-[36px]">
            <div className="flex flex-col items-center gap-4 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--brand-navy)] text-[var(--brand-gold)]">
                <Spinner />
              </span>
              <p className="font-brand-sans text-[12px] font-bold uppercase tracking-[0.18em] text-[var(--brand-gold-700)]">
                Loading form
              </p>
              <p className="max-w-[320px] font-brand-sans text-[13px] font-semibold leading-[1.6] text-[var(--brand-text-muted)]">
                Preparing the selected Sofa N More enquiry form.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SelectedLeadForm({ selected }: { selected: ServiceFormKey }) {
  if (selected === "commercial-sofa") {
    return <CommercialSofaLeadForm />;
  }

  if (selected === "interior-design") {
    return <InteriorDesignLeadForm />;
  }

  if (selected === "sofa-repair") {
    return <SofaRepairLeadForm />;
  }

  return <BespokeSofaLeadForm />;
}

export default function HomeServiceLeadChooser() {
  const [selected, setSelected] = useState<ServiceFormKey | null>(null);

  const formRef = useRef<HTMLDivElement>(null);
  const shouldScrollToForm = useRef(false);

  const handleServiceSelect = (key: ServiceFormKey) => {
    // اگر همان گزینه دوباره کلیک شد هم اسکرول انجام شود
    if (selected === key) {
      formRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      return;
    }

    shouldScrollToForm.current = true;
    setSelected(key);
  };

  useEffect(() => {
    if (!selected || !shouldScrollToForm.current) return;

    shouldScrollToForm.current = false;

    requestAnimationFrame(() => {
      formRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }, [selected]);

  return (
    <section
      id="home-project-enquiry"
      className="bg-[var(--brand-ivory)] px-3 py-12 sm:px-5 lg:px-8"
    >
      <div className="mx-auto max-w-[var(--site-width)]">
        <div className="clay-surface-strong  p-[7px]">
          <div className="rounded-[26px]     py-8 sm:px-8 lg:px-12 lg:py-12">
            {/* Main heading */}
            <div className="mx-auto max-w-[700px] px-8 text-center">
              <p className="font-brand-sans text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--brand-gold-700)]">
                Start your enquiry
              </p>

              <h2 className="mt-2 font-brand-display text-[26px] font-semibold leading-tight text-[var(--brand-navy)] sm:text-[42px]">
                Tell us about your project.
              </h2>

              <p className="mx-auto mt-3 max-w-[520px] font-brand-sans text-[13px] md:text-base leading-6 text-[var(--brand-text-muted)]">
                First, choose what you need. We’ll show you the right questions
                for your project.
              </p>
            </div>

            {/* First form question */}
            <fieldset className="mx-auto px-4 mt-9 max-w-[950px]">
              <legend className="mb-3 font-brand-sans text-[13px] font-bold text-[var(--brand-navy)]">
                What can we help you with?
              </legend>

              <div className="grid grid-cols-2  gap-2 lg:grid-cols-4">
                {serviceChoices.map((choice) => {
                  const Icon = choice.icon;
                  const active = selected === choice.key;

                  return (
                    <button
                      key={choice.key}
                      type="button"
                      onClick={() => handleServiceSelect(choice.key)}
                      aria-pressed={active}
                      className={[
                        "flex min-h-[64px] items-center gap-3 rounded-[16px]",
                        "border px-4 py-3 text-left transition-all duration-200",
                        active
                          ? "border-[var(--brand-navy)] bg-[var(--brand-navy)] text-white shadow-[0_8px_20px_rgba(18,37,62,.14)]"
                          : "border-[#dfd2c0] bg-white/45 text-[var(--brand-navy)] hover:border-[var(--brand-gold)] hover:bg-white/70",
                      ].join(" ")}
                    >
                      <span
                        className={[
                          "flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
                          active
                            ? "bg-[var(--brand-gold)] text-[var(--brand-navy)]"
                            : "bg-white/70 text-[var(--brand-gold-700)]",
                        ].join(" ")}
                      >
                        <Icon size={17} strokeWidth={1.6} />
                      </span>

                      <span className="text-[11px] md:text-sm font-bold">
                        {choice.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            {/* Form */}
            {selected && (
              <div
                ref={formRef}
                className="mt-8 scroll-mt-[110px] border-t border-[#d8c9b5]/60 pt-8"
              >
                <SelectedLeadForm selected={selected} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
