"use client";

import { Armchair, Building2, Landmark, } from "lucide-react";
import { memo, useCallback, useLayoutEffect, useRef, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
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

const faqs: FAQItem[] = [
  {
    id: 1,
    question: "Do you offer fully bespoke furniture?",
    answer:
      "Yes. We create made-to-measure sofas, chairs, benches and other furniture pieces tailored to your style, dimensions and functional needs.",
  },
  {
    id: 2,
    question: "Can you restore or repair existing furniture?",
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
      "Timelines vary depending on scope and complexity, but most bespoke furniture pieces are completed within 4–8 weeks from design approval.",
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

export default function FAQSection() {
  const [desktopOpen, setDesktopOpen] = useState<number | null>(2);
  const [mobileOpen, setMobileOpen] = useState<number | null>(1);

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="
        relative overflow-hidden bg-[var(--brand-ivory)]
        px-3 py-12 sm:px-5 sm:py-14 lg:px-8 lg:py-20
      "
    >
      <FAQBackground />

      {/* DESKTOP */}
      <div className="relative z-10 hidden lg:block">
        <DesktopFAQ openItem={desktopOpen} setOpenItem={setDesktopOpen} />
      </div>

      {/* MOBILE */}
      <div className="relative z-10 lg:hidden">
        <MobileFAQ openItem={mobileOpen} setOpenItem={setMobileOpen} />
      </div>
    </section>
  );
}

/* =========================================================
   DESKTOP
========================================================= */

function DesktopFAQ({
  openItem,
  setOpenItem,
}: {
  openItem: number | null;
  setOpenItem: Dispatch<SetStateAction<number | null>>;
}) {
  const toggle = useCallback(
    (id: number) => {
      setOpenItem((current) => (current === id ? null : id));
    },
    [setOpenItem],
  );

  return (
    <div className="clay-surface-strong relative mx-auto max-w-[1320px] rounded-[50px] p-[11px]">
      <div className="clay-inset relative rounded-[40px] p-[10px]">
        <div className="grid h-[600px] grid-cols-[0.72fr_1.28fr] gap-[10px]">
          <DesktopIntro />

          <div className="clay-surface-strong min-h-0 rounded-[34px] p-[9px]">
            <div className="clay-inset flex h-full min-h-0 flex-col gap-3 overflow-y-auto overscroll-contain rounded-[27px] p-4 pr-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {faqs.map((faq) => (
                <FAQAccordionItem
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
    </div>
  );
}

/* =========================================================
   DESKTOP INTRO
========================================================= */

function DesktopIntro() {
  return (
    <div className="clay-surface-soft relative flex flex-col justify-between rounded-[34px] px-9 py-9 xl:px-11 xl:py-10">
      <div>
        <div className="mb-4">
          <span className="font-brand-sans text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--brand-gold-700)]">
            FAQs
          </span>
          <div className="mt-2 h-[2px] w-10 rounded-full bg-[var(--brand-gold)]" />
        </div>

        <h2
          id="faq-heading"
          className="max-w-[360px] font-brand-display text-[48px] font-semibold leading-[0.98] tracking-[-0.035em] text-[var(--brand-navy)] xl:text-[55px]"
        >
          Frequently
          <br />
          Asked
          <br />
          Questions
        </h2>

        <div className="my-5 h-[2px] w-11 bg-[var(--brand-gold)]" />

        <p className="max-w-[365px] font-brand-sans text-[12px] font-medium leading-[1.65] text-[var(--brand-text-muted)] xl:text-[13px]">
          Find answers to common questions about our bespoke furniture, interior
          design, restoration and London-based craftsmanship.
        </p>

        <div className="my-5 h-px w-10 bg-[var(--brand-gold)]/50" />

        <p className="max-w-[330px] font-brand-sans text-[11px] font-medium leading-[1.55] text-[var(--brand-text-muted)]">
          If you need more information, our team is always happy to help.
        </p>

        <div className="mt-5">
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

      {/* TRUST CARDS */}
      <div className="mt-7 grid grid-cols-3 gap-3">
        {trustItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="clay-surface flex min-h-[122px] flex-col items-center justify-center rounded-[20px] px-2 py-3 text-center"
            >
              <span className="clay-icon-inset flex h-11 w-11 items-center justify-center rounded-[14px]">
                <Icon
                  size={20}
                  strokeWidth={1.4}
                  className="text-[var(--brand-gold)]"
                />
              </span>
              <span className="mt-3 whitespace-pre-line font-brand-sans text-[8px] font-semibold leading-[1.3] text-[var(--brand-navy)] xl:text-[9px]">
                {item.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* =========================================================
   ACCORDION ITEM — Ultra-light animation
   
   Strategy for zero-lag on weak devices:
   • Only animate `opacity` + `transform` (GPU composited)
   • Height change uses grid-rows trick with minimal duration
   • Icon rotation via transform (not swapping icons during animation)
   • contain: layout style — helps browser skip unnecessary work
   • Short durations: 200ms open, 150ms close
========================================================= */

const FAQAccordionItem = memo(function FAQAccordionItem({
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
  const contentRef = useRef<HTMLDivElement>(null);
  const [answerHeight, setAnswerHeight] = useState(0);

  useLayoutEffect(() => {
    const element = contentRef.current;

    if (!element) {
      return;
    }

    const nextHeight = element.scrollHeight;
    setAnswerHeight((currentHeight) =>
      currentHeight === nextHeight ? currentHeight : nextHeight,
    );
  }, [desktop, faq.answer, open]);

  return (
    <div
      className={`
        clay-surface overflow-hidden
        ${desktop ? "rounded-[20px]" : "rounded-[17px]"}
      `}
      style={{ contain: "layout style" }}
    >
      {/* QUESTION BUTTON */}
      <button
        type="button"
        onClick={() => onToggle(faq.id)}
        aria-expanded={open}
        className={`
          flex w-full items-center justify-between gap-4 text-left
          ${desktop ? "min-h-[66px] px-5 py-3" : "min-h-[52px] px-3.5 py-2.5"}
        `}
      >
        <div className="flex min-w-0 items-start gap-3">
          <span
            className={`
              shrink-0 font-brand-display font-semibold text-[var(--brand-navy)]
              ${desktop ? "text-[14px]" : "text-[10px]"}
            `}
          >
            {faq.id}.
          </span>
          <span
            className={`
              font-brand-sans font-semibold leading-[1.35] text-[var(--brand-navy)]
              ${desktop ? "text-[13px]" : "text-[10px]"}
            `}
          >
            {faq.question}
          </span>
        </div>

        {/* Toggle icon — single element, GPU-only rotation */}
        <span
          className={`
            flex shrink-0 items-center justify-center rounded-full
            transition-[transform,background-color,color] duration-150 ease-out
            will-change-transform
            ${desktop ? "h-9 w-9" : "h-7 w-7"}
            ${
              open
                ? "rotate-180 bg-[linear-gradient(145deg,#d9a34c,#a97020)] text-white shadow-[3px_4px_8px_rgba(120,74,20,0.22),inset_1px_1px_2px_rgba(255,255,255,0.32)]"
                : "rotate-0 clay-icon text-[var(--brand-gold-700)]"
            }
          `}
        >
          {/* Single icon that rotates — avoids DOM swap during animation */}
          <svg
            width={desktop ? 16 : 12}
            height={desktop ? 16 : 12}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="will-change-transform"
          >
            {/* Horizontal line (always visible) */}
            <line x1="5" y1="12" x2="19" y2="12" />
            {/* Vertical line — fades via opacity */}
            <line
              x1="12"
              y1="5"
              x2="12"
              y2="19"
              className="origin-center transition-opacity duration-150 ease-out"
              style={{ opacity: open ? 0 : 1 }}
            />
          </svg>
        </span>
      </button>

      {/* ANSWER — grid-rows for smooth height, short duration */}
      <div
        className={`
          overflow-hidden
          transition-[height] duration-[100ms]
          ease-[cubic-bezier(0.22,1,0.36,1)]
          motion-reduce:transition-none
        `}
        style={{ height: open ? answerHeight : 0 }}
      >
        <div ref={contentRef}>
          <div
            className={`
              transition-[opacity,transform] duration-[90ms] ease-out
              motion-reduce:transition-none
              ${open ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"}
              ${desktop ? "px-4 pb-4" : "px-2.5 pb-2.5"}
            `}
          >
            <div
              className={`
                clay-inset rounded-[16px]
                ${desktop ? "px-6 py-5" : "px-4 py-3.5"}
              `}
            >
              <div className="mb-4 h-px w-12 bg-[var(--brand-gold)]/55" />
              <p
                className={`
                  font-brand-sans font-medium text-[var(--brand-text-muted)]
                  ${desktop ? "text-[12px] leading-[1.7]" : "text-[9px] leading-[1.55]"}
                `}
              >
                {faq.answer}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

/* =========================================================
   MOBILE
========================================================= */

function MobileFAQ({
  openItem,
  setOpenItem,
}: {
  openItem: number | null;
  setOpenItem: Dispatch<SetStateAction<number | null>>;
}) {
  const toggle = useCallback(
    (id: number) => {
      setOpenItem((current) => (current === id ? null : id));
    },
    [setOpenItem],
  );

  return (
    <div className="clay-surface-strong relative mx-auto max-w-[430px] overflow-visible rounded-[38px] p-[7px]">
      <div className="clay-inset relative overflow-hidden rounded-[31px] p-[7px]">
        <div className="clay-surface-soft relative flex h-[690px] flex-col rounded-[26px] px-4 pb-5 pt-7 min-[390px]:h-[720px]">
          {/* Notch detail */}
          <div
            aria-hidden
            className="clay-inset absolute left-1/2 top-3 h-[6px] w-12 -translate-x-1/2 rounded-full"
          />

          {/* HEADER */}
          <div className="pt-3">
            <span className="font-brand-sans text-[8px] font-bold uppercase tracking-[0.18em] text-[var(--brand-gold-700)]">
              FAQs
            </span>
            <div className="mt-1.5 h-[2px] w-7 bg-[var(--brand-gold)]" />

            <h2 className="mt-3 font-brand-display text-[31px] font-semibold leading-[0.98] tracking-[-0.035em] text-[var(--brand-navy)] min-[390px]:text-[34px]">
              Frequently
              <br />
              Asked Questions
            </h2>

            <p className="mt-3 max-w-[290px] font-brand-sans text-[9px] font-medium leading-[1.5] text-[var(--brand-text-muted)]">
              Find answers about our bespoke furniture, interiors and London
              craftsmanship.
            </p>
          </div>

          {/* FAQ LIST */}
          <div className="mt-5 min-h-0 flex-1 space-y-2.5 overflow-y-auto overscroll-contain pr-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {faqs.map((faq) => (
              <FAQAccordionItem
                key={faq.id}
                faq={faq}
                open={openItem === faq.id}
                onToggle={toggle}
              />
            ))}
          </div>

          {/* CTA */}
          <div className="mt-4 shrink-0">
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
    </div>
  );
}

/* =========================================================
   BACKGROUND
========================================================= */

function FAQBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#fffdf8_0%,#f7efe5_55%,#f2e8d9_100%)]" />

      {/* Desktop left arch */}
      <div className="absolute -left-[80px] top-[35px] hidden h-[470px] w-[290px] rounded-t-[150px] border-[26px] border-[var(--brand-ivory-50)] border-b-0 shadow-[var(--shadow-clay-inset)] lg:block" />
      <div className="absolute -left-[25px] top-[85px] hidden h-[340px] w-[185px] rounded-t-[95px] border-[15px] border-[var(--brand-cream)] border-b-0 opacity-65 lg:block" />

      {/* Gold ring */}
      <div className="absolute bottom-[72px] left-[3%] hidden h-[150px] w-[150px] lg:block">
        <div className="clay-sphere-ring" />
      </div>

      {/* Left sphere */}
      <div className="clay-sphere absolute bottom-[66px] left-[5%] hidden h-[110px] w-[110px] lg:block">
        <div className="clay-sphere-shadow" />
        <div className="clay-sphere-ball" />
      </div>

      {/* Bottom podium */}
      <div className="clay-surface-soft absolute -bottom-[60px] left-1/2 hidden h-[115px] w-[720px] -translate-x-1/2 rounded-[50%] lg:block" />

      {/* Right sphere */}
      <div className="clay-sphere absolute bottom-[58px] right-[1%] hidden h-[82px] w-[82px] lg:block">
        <div className="clay-sphere-shadow" />
        <div className="clay-sphere-ball" />
      </div>
    </div>
  );
}
