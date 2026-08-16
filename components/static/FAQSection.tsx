"use client";

import { Armchair, Building2, Landmark } from "lucide-react";
import { memo, useCallback, useId, useState } from "react";
import ClayButton from "@/components/ui/ClayButton";

/* =========================================================
   TYPES
========================================================= */

type FAQItem = {
  id: number;
  question: string;
  answer: string;
};

type TrustItem = {
  title: string;
  icon: typeof Landmark;
};

/* =========================================================
   DATA
========================================================= */

const defaultFaqs: FAQItem[] = [
  {
    id: 1,
    question: "Do you offer fully bespoke sofa?",
    answer:
      "Yes. We create made-to-measure sofas, chairs, benches and other sofa pieces tailored to your style, dimensions and functional needs.",
  },
  {
    id: 2,
    question: "Can you restore or repair existing sofa?",
    answer:
      "Yes. Our workshop offers expert repair, reupholstery and restoration services, carefully preserving the character and quality of each piece.",
  },
  {
    id: 3,
    question: "Do you work on both residential and commercial projects?",
    answer:
      "Yes. We work across private homes, offices, hospitality spaces and other commercial interiors throughout London.",
  },
  {
    id: 4,
    question: "Can I visit your showroom or workshop?",
    answer:
      "Yes. You are welcome to visit our NW London showroom and explore our craftsmanship, materials and bespoke design options.",
  },
  {
    id: 5,
    question: "Do you provide interior design and home staging services?",
    answer:
      "Yes. We offer tailored interior design and home staging solutions to help elevate residential and commercial spaces.",
  },
  {
    id: 7,
    question: "What is the typical timeline for a bespoke project?",
    answer:
      "Timelines vary depending on scope and complexity, but most bespoke sofa pieces are completed within 4–8 weeks from design approval.",
  },
  {
    id: 8,
    question: "Do you offer delivery and installation?",
    answer:
      "Yes. We provide professional white-glove delivery and installation across London and surrounding areas.",
  },
];

const trustItems: TrustItem[] = [
  { title: "Handcrafted\nin London", icon: Landmark },
  { title: "Bespoke\nSolutions", icon: Armchair },
  { title: "Residential &\nCommercial", icon: Building2 },
];

/* =========================================================
   ROOT
========================================================= */

export default function FAQSection({
  items = defaultFaqs,
}: {
  items?: FAQItem[];
}) {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="relative overflow-hidden bg-[var(--brand-ivory)] px-3 py-12 sm:px-5 sm:py-14 lg:px-8 lg:py-20"
    >
      {/* بک‌گراند خیلی ساده */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#fffdf8_0%,#f7efe5_55%,#f2e8d9_100%)]"
      />

      <div className="relative z-10 hidden lg:block">
        <DesktopFAQ items={items} />
      </div>

      <div className="relative z-10 lg:hidden">
        <MobileFAQ items={items} />
      </div>
    </section>
  );
}

/* =========================================================
   DESKTOP
========================================================= */

const DesktopFAQ = memo(function DesktopFAQ({ items }: { items: FAQItem[] }) {
  const [openItem, setOpenItem] = useState<number | null>(2);

  const toggle = useCallback((id: number) => {
    setOpenItem((current) => (current === id ? null : id));
  }, []);

  return (
    <div className="clay-surface-strong mx-auto max-w-[1320px] rounded-[40px] p-3">
      <div className="grid grid-cols-[0.75fr_1.25fr] gap-4 rounded-[32px] p-3">
        {/* Intro */}
        <div className="clay-surface-soft sticky top-6 flex h-[560px] flex-col justify-between rounded-[28px] px-8 py-9">
          <div>
            <span className="font-brand-sans text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--brand-gold-700)]">
              FAQs
            </span>
            <div className="mt-2 h-[2px] w-10 rounded-full bg-[var(--brand-gold)]" />

            <h2
              id="faq-heading"
              className="mt-5 max-w-[340px] font-brand-display text-[46px] font-semibold leading-[0.98] tracking-[-0.035em] text-[var(--brand-navy)]"
            >
              Frequently
              <br />
              Asked
              <br />
              Questions
            </h2>

            <p className="mt-5 max-w-[340px] font-brand-sans text-[13px] font-medium leading-[1.65] text-[var(--brand-text-muted)]">
              Find answers to common questions about our bespoke sofa, interior
              design, restoration and London-based craftsmanship.
            </p>

            <div className="mt-6">
              <ClayButton
                href="/contact"
                variant="navy"
                size="md"
                showArrow
                fullWidth
                ariaLabel="Contact our team"
              >
                Contact Our Team
              </ClayButton>
            </div>
          </div>

          {/* Trust items - ساده‌تر */}
          <div className="grid grid-cols-3 gap-2.5">
            {trustItems.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="clay-surface flex flex-col items-center justify-center rounded-[18px] px-2 py-3 text-center"
                >
                  <span className="clay-icon-inset flex h-10 w-10 items-center justify-center rounded-[12px]">
                    <Icon
                      size={18}
                      strokeWidth={1.4}
                      className="text-[var(--brand-gold)]"
                    />
                  </span>
                  <span className="mt-2.5 whitespace-pre-line font-brand-sans text-[8px] font-semibold leading-[1.3] text-[var(--brand-navy)]">
                    {item.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Accordion list */}
        <div className="clay-surface-strong rounded-[28px] p-3">
          <div className="flex flex-col gap-2.5 rounded-[22px] p-3">
            {items.map((faq) => (
              <FAQItem
                key={faq.id}
                faq={faq}
                open={openItem === faq.id}
                onToggle={toggle}
                desktop
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

/* =========================================================
   MOBILE
========================================================= */

const MobileFAQ = memo(function MobileFAQ({ items }: { items: FAQItem[] }) {
  const [openItem, setOpenItem] = useState<number | null>(1);

  const toggle = useCallback((id: number) => {
    setOpenItem((current) => (current === id ? null : id));
  }, []);

  return (
    <div className="clay-surface-strong mx-auto max-w-[430px] rounded-[32px] p-2">
      <div className="clay-surface-soft rounded-[26px] px-4 pb-5 pt-6">
        <span className="font-brand-sans text-[8px] font-bold uppercase tracking-[0.18em] text-[var(--brand-gold-700)]">
          FAQs
        </span>
        <div className="mt-1.5 h-[2px] w-7 bg-[var(--brand-gold)]" />

        <h2 className="mt-3 font-brand-display text-[30px] font-semibold leading-[0.98] tracking-[-0.035em] text-[var(--brand-navy)]">
          Frequently
          <br />
          Asked Questions
        </h2>

        <p className="mt-3 max-w-[280px] font-brand-sans text-[9px] font-medium leading-[1.5] text-[var(--brand-text-muted)]">
          Find answers about our bespoke sofa, interiors and London
          craftsmanship.
        </p>

        <div className="mt-5 space-y-2">
          {items.map((faq) => (
            <FAQItem
              key={faq.id}
              faq={faq}
              open={openItem === faq.id}
              onToggle={toggle}
            />
          ))}
        </div>

        <div className="mt-5">
          <ClayButton
            href="/contact"
            variant="navy"
            size="md"
            fullWidth
            showArrow
            ariaLabel="Still have questions? Contact our team"
          >
            Still Have Questions?
          </ClayButton>
        </div>
      </div>
    </div>
  );
});

/* =========================================================
   FAQ ITEM (بدون انیمیشن)
========================================================= */

const FAQItem = memo(function FAQItem({
  faq,
  open,
  onToggle,
  desktop = false,
}: {
  faq: FAQItem;
  open: boolean;
  onToggle: (id: number) => void;
  desktop?: boolean;
}) {
  const reactId = useId();
  const buttonId = `faq-btn-${reactId}`;
  const panelId = `faq-panel-${reactId}`;

  return (
    <div
      className={`clay-surface overflow-hidden ${
        desktop ? "rounded-[18px]" : "rounded-[15px]"
      }`}
    >
      <button
        id={buttonId}
        type="button"
        onClick={() => onToggle(faq.id)}
        aria-expanded={open}
        aria-controls={panelId}
        className={`flex w-full items-center justify-between gap-3 text-left ${
          desktop ? "min-h-[60px] px-4 py-3" : "min-h-[48px] px-3.5 py-2.5"
        }`}
      >
        <span className="flex min-w-0 items-start gap-2.5">
          <span
            className={`shrink-0 font-brand-display font-semibold text-[var(--brand-navy)] ${
              desktop ? "text-[14px]" : "text-[10px]"
            }`}
          >
            {faq.id}.
          </span>
          <span
            className={`font-brand-sans font-semibold leading-[1.35] text-[var(--brand-navy)] ${
              desktop ? "text-[13px]" : "text-[10px]"
            }`}
          >
            {faq.question}
          </span>
        </span>

        {/* آیکون ساده + / − */}
        <span
          className={`flex shrink-0 items-center justify-center rounded-full ${
            desktop ? "h-8 w-8" : "h-7 w-7"
          } ${
            open
              ? "bg-[linear-gradient(145deg,#d9a34c,#a97020)] text-white"
              : "clay-icon text-[var(--brand-gold-700)]"
          }`}
        >
          <svg
            width={desktop ? 14 : 12}
            height={desktop ? 14 : 12}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            {!open && <line x1="12" y1="5" x2="12" y2="19" />}
          </svg>
        </span>
      </button>

      {/* محتوا - بدون انیمیشن */}
      {open && (
        <div
          id={panelId}
          role="region"
          aria-labelledby={buttonId}
          className={desktop ? "px-4 pb-4" : "px-3.5 pb-3"}
        >
          <div
            className={`clay-inset rounded-[14px] ${
              desktop ? "px-5 py-4" : "px-3.5 py-3"
            }`}
          >
            <p
              className={`font-brand-sans font-medium text-[var(--brand-text-muted)] ${
                desktop
                  ? "text-[12px] leading-[1.7]"
                  : "text-[9px] leading-[1.55]"
              }`}
            >
              {faq.answer}
            </p>
          </div>
        </div>
      )}
    </div>
  );
});
