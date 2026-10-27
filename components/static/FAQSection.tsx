"use client";

import { Armchair, Building2, Landmark, Minus, Plus } from "lucide-react";
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
    question: "Do you offer fully upholstery?",
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
    id: 6,
    question: "Is your upholstery water-resistant and fire-retardant?",
    answer:
      "Yes. The sofas we make can be specified with water-resistant upholstery and fire-retardant materials, with suitable fabric choices discussed during the design process.",
  },
  {
    id: 7,
    question: "What is the typical timeline for a bespoke project?",
    answer:
      "Timelines vary depending on scope and complexity. We provide a more accurate estimate once the project requirements are discussed.",
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
  id = "faq",
  items = defaultFaqs,
  title = "Frequently Asked Questions",
  intro = "Find answers to common questions about our upholstery, interior design, restoration and London-based craftsmanship.",
  contactHref = "/contact-us",
  contactLabel = "Contact Our Team",
}: {
  id?: string;
  items?: FAQItem[];
  title?: string;
  intro?: string;
  contactHref?: string;
  contactLabel?: string;
}) {
  const headingId = useId();
  const [openItem, setOpenItem] = useState<number | null>(items[0]?.id ?? null);
  const toggle = useCallback((itemId: number) => {
    setOpenItem((current) => (current === itemId ? null : itemId));
  }, []);

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className="relative scroll-mt-28 bg-[var(--brand-ivory)] px-3 py-12 sm:px-5 sm:py-14 lg:px-8 lg:py-20"
    >
      <div className="mx-auto grid max-w-[1320px] gap-8 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:items-start lg:gap-12">
        <header className="min-w-0 lg:sticky lg:top-28">
          <p className="font-brand-sans text-[12px] font-bold uppercase text-[var(--brand-gold-700)]">
            FAQs
          </p>
          <h2
            id={headingId}
            className="mt-4 max-w-[460px] font-brand-display text-[32px] font-semibold leading-[1.1] text-[var(--brand-navy)] sm:text-[40px] lg:text-[46px]"
          >
            {title}
          </h2>
          <p className="mt-5 max-w-[460px] font-brand-sans text-[14px] font-medium leading-[1.75] text-[var(--brand-text-muted)]">
            {intro}
          </p>
          <div className="mt-6">
            <ClayButton
              href={contactHref}
              variant="navy"
              size="md"
              showArrow
              className="max-w-full !min-w-0 !whitespace-normal [&_.snm-button__label]:py-2 [&_.snm-button__label]:leading-snug"
            >
              {contactLabel}
            </ClayButton>
          </div>
          <ul
            className="mt-8 flex w-full gap-x-2 gap-y-4"
            aria-label="Our service"
          >
            {trustItems.map(({ title: trustTitle, icon: Icon }) => (
              <li key={trustTitle} className="flex items-center gap-2">
                <Icon
                  aria-hidden="true"
                  size={14}
                  strokeWidth={1.5}
                  className="shrink-0 text-[var(--brand-gold-700)]"
                />
                <span className=" lg:text-nowrap font-brand-sans text-[11px] font-semibold leading-snug text-[var(--brand-navy)]">
                  {trustTitle}
                </span>
              </li>
            ))}
          </ul>
        </header>
        <div className="min-w-0 space-y-3">
          {items.map((faq) => (
            <FAQItem
              key={faq.id}
              faq={faq}
              open={openItem === faq.id}
              onToggle={toggle}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const FAQItem = memo(function FAQItem({
  faq,
  open,
  onToggle,
}: {
  faq: FAQItem;
  open: boolean;
  onToggle: (id: number) => void;
}) {
  const reactId = useId();
  const buttonId = `faq-btn-${reactId}`;
  const panelId = `faq-panel-${reactId}`;
  const Icon = open ? Minus : Plus;

  return (
    <div className="clay-surface overflow-hidden rounded-[16px]">
      <h3>
        <button
          id={buttonId}
          type="button"
          onClick={() => onToggle(faq.id)}
          aria-expanded={open}
          aria-controls={panelId}
          className="flex min-h-[52px] w-full items-center justify-between gap-3 px-4 py-4 text-left focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[var(--brand-gold-700)] sm:min-h-[60px] sm:px-5"
        >
          <span className="flex min-w-0 items-start gap-2.5">
            <span
              aria-hidden="true"
              className="shrink-0 font-brand-sans text-[14px] font-semibold text-[var(--brand-gold-700)]"
            >
              {faq.id}.
            </span>
            <span className="font-brand-sans text-[14px] font-semibold leading-[1.45] text-[var(--brand-navy)]">
              {faq.question}
            </span>
          </span>
          <span
            aria-hidden="true"
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${open ? "bg-[var(--brand-navy)] text-[var(--brand-gold)]" : "clay-icon text-[var(--brand-gold-700)]"}`}
          >
            <Icon size={15} strokeWidth={2} />
          </span>
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        hidden={!open}
        className="px-4 pb-5 sm:px-5"
      >
        <p className="font-brand-sans text-[14px] font-medium leading-[1.75] text-[var(--brand-text-muted)]">
          {faq.answer}
        </p>
      </div>
    </div>
  );
});
